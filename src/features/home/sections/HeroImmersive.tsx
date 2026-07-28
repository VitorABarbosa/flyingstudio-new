'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import { revealItem, staggerContainer } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';

/** Vídeo do estúdio que aparece por dentro da palavra "perspectivas". */
const VIMEO_ID = '1208135588';

const TINT =
  'linear-gradient(100deg, rgba(126, 82, 255, 0.6) 0%, rgba(126, 82, 255, 0.15) 45%, rgba(182, 255, 0, 0.3) 100%)';

/**
 * Abertura do hero: a câmera sai de dentro da palavra.
 *
 * A palavra do h1 não é mais pintada com a imagem: ela virou um FURO numa
 * cortina opaca da cor do fundo, e a imagem é uma camada independente atrás.
 * É essa inversão que permite escalar a palavra sem arrastar a imagem junto —
 * com `background-clip: text` os dois seriam o mesmo elemento.
 *
 * No topo da pista o furo cobre a tela (só se vê a imagem); rolando para
 * baixo a câmera recua até a palavra assentar exatamente onde o h1 a coloca.
 */

/** Altura da pista de scroll que o recuo da câmera consome. Quanto menor,
 *  menos scroll o voo consome — ou seja, mais rápida a animação. */
const RUNWAY_VH = 220;
/** Progresso em que o voo acaba — daí em diante o hero está em repouso. */
const FLIGHT_END = 0.86;
/** Avanço da imagem: menor que o da palavra, e é a diferença que dá profundidade. */
const SCENE_ZOOM = 0.55;

/**
 * Ímã do final. Passado este ponto do voo, o scroll é puxado sozinho até o
 * pouso — o usuário dá o impulso e a animação se completa. Rearmado ao voltar,
 * para quem sobe poder atravessar de novo.
 */
const SNAP_FROM = 0.35;
const SNAP_DURATION = 1.9;

/**
 * A abertura é uma vez por sessão, igual ao splash (`fs-splash-seen`). Quem já
 * atravessou o voo e volta para a home — clicando na logo, por exemplo — cai
 * direto no site, sem a pista de scroll e sem o vídeo.
 */
const SESSION_KEY = 'fs-hero-flight-seen';

/** `useLayoutEffect` avisa no SSR; no servidor não há nada para medir mesmo. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/**
 * Curva do ímã. Parte de velocidade zero, acelera no meio e desacelera longo —
 * é isso que tira o tranco. A anterior era uma quártica de saída, que começa
 * na velocidade máxima e por isso dava a sensação de puxão.
 */
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

/**
 * Soma os offsets de layout de `from` até `to`. Usa offsetLeft/offsetTop de
 * propósito: ao contrário de getBoundingClientRect, eles NÃO enxergam
 * transform — e a entrada do h1 anima `y`, então medir por rect devolveria a
 * posição no meio da animação.
 */
function offsetWithin(from: HTMLElement, to: HTMLElement) {
  let node: HTMLElement | null = from;
  let x = 0;
  let y = 0;
  while (node && node !== to) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export default function HeroImmersive() {
  const t = useTranslations('Home.hero');
  const reduceMotion = useReducedMotion();
  const maskId = `hero-portal-${useId().replace(/:/g, '')}`;

  const runwayRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const ambienceRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskBgRef = useRef<SVGRectElement>(null);
  const curtainRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  /** Cópia invisível dentro do h1: segura o layout e serve de régua. */
  const slotRef = useRef<HTMLSpanElement>(null);
  /** Sonda de altura zero: a borda de baixo dela é a baseline real da linha. */
  const baselineRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  /** Geometria resolvida no layout: centro da tela, ponto de fuga, escala máxima. */
  const geo = useRef({ cx: 0, cy: 0, gx: 0, gy: 0, max: 20 });
  /** Último estado publicado do voo, para não escrever no DOM a cada frame. */
  const flying = useRef<boolean | null>(null);
  /** Controle do ímã do final: só dispara uma vez por travessia, e só descendo. */
  const magnetArmed = useRef(true);
  const magnetLive = useRef(false);
  const lastProgress = useRef(0);
  /** Evita reescrever a flag da sessão a cada frame depois do pouso. */
  const seenWritten = useRef(false);

  /**
   * Abertura já vista nesta sessão. Lido num layout effect — antes da pintura —
   * para a volta à home (navegação client-side) nunca chegar a mostrar o vídeo.
   */
  const [flightSeen, setFlightSeen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
        setFlightSeen(true);
      }
    } catch {
      // sessionStorage bloqueado: a abertura simplesmente roda de novo.
    }
  }, []);

  /** Sem pista de scroll, sem vídeo e sem cortina: o hero vira um hero normal. */
  const skipFlight = Boolean(reduceMotion) || flightSeen;

  /**
   * Espelho do skip para o `render`, que é chamado por fora do ciclo do React
   * (pelo listener de scroll do framer) e por isso não enxerga estado.
   */
  const skipRef = useRef(false);
  skipRef.current = skipFlight;

  const word = t('titleWord');

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  /**
   * Procura o ponto mais "gordo" dentro das letras — o maior círculo que cabe
   * no traço. É por ali que a câmera passa; qualquer outro ponto faria o furo
   * esbarrar numa borda fina antes de cobrir a tela.
   */
  const findAnchor = useCallback(
    (
      w: number,
      h: number,
      x0: number,
      baseY: number,
      size: number,
      font: string,
      spacing: string,
    ) => {
      const { cx, cy } = geo.current;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        return { x: cx, y: baseY - size * 0.35, r: Math.max(8, size * 0.06) };
      }

      ctx.font = font;
      if ('letterSpacing' in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = spacing;
      }
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#fff';
      ctx.fillText(word, x0, baseY);

      const data = ctx.getImageData(0, 0, w, h).data;
      const on = (x: number, y: number) =>
        x >= 0 && y >= 0 && x < w && y < h && data[((y * w + x) << 2) + 3] > 120;

      const y0 = Math.max(0, Math.floor(baseY - size * 1.1));
      const y1 = Math.min(h, Math.ceil(baseY + size * 0.3));
      const step = 3;
      const best: Array<[number, number, number]> = [];
      let maxR = 0;

      for (let y = y0; y < y1; y += step) {
        for (let x = 0; x < w; x += step) {
          if (!on(x, y)) {
            continue;
          }
          let r = 0;
          for (let d = 4; d <= 200; d += 4) {
            const k = Math.round(d * 0.7071);
            if (
              on(x + d, y) &&
              on(x - d, y) &&
              on(x, y + d) &&
              on(x, y - d) &&
              on(x + k, y + k) &&
              on(x - k, y + k) &&
              on(x + k, y - k) &&
              on(x - k, y - k)
            ) {
              r = d;
            } else {
              break;
            }
          }
          if (r > 0) {
            best.push([x, y, r]);
            if (r > maxR) {
              maxR = r;
            }
          }
        }
      }

      if (best.length === 0) {
        return { x: cx, y: baseY - size * 0.35, r: Math.max(8, size * 0.06) };
      }

      // Entre os pontos mais grossos, o mais próximo do centro da tela.
      let pick = best[0];
      let dist = Infinity;
      for (const candidate of best) {
        if (candidate[2] < maxR * 0.88) {
          continue;
        }
        const dx = candidate[0] - cx;
        const dy = candidate[1] - cy;
        const dd = dx * dx + dy * dy * 0.25;
        if (dd < dist) {
          dist = dd;
          pick = candidate;
        }
      }
      return { x: pick[0], y: pick[1], r: pick[2] };
    },
    [word],
  );

  const render = useCallback((progress: number) => {
    const group = groupRef.current;
    const scene = sceneRef.current;
    const cover = coverRef.current;
    if (!group || !scene || !cover) {
      return;
    }
    const { cx, cy, gx, gy, max } = geo.current;

    // Invertido em relação ao efeito clássico: começa voando e vai assentando.
    // Sem voo, o hero e desenhado direto no estado de pouso.
    const flight = skipRef.current ? 0 : easeInOut(clamp(1 - progress / FLIGHT_END, 0, 1));
    const scale = max ** flight;
    const tx = (cx - gx) * flight;
    const ty = (cy - gy) * flight;

    group.setAttribute(
      'transform',
      `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) translate(${gx.toFixed(2)} ${gy.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${(-gx).toFixed(2)} ${(-gy).toFixed(2)})`,
    );

    scene.style.transform = `scale(${(1 + SCENE_ZOOM * flight).toFixed(4)})`;
    // No voo máximo a cortina some de vez, para não sobrar resíduo de borda.
    cover.style.opacity = `${clamp((1 - flight) / 0.1, 0, 1)}`;

    if (ambienceRef.current) {
      ambienceRef.current.style.opacity = `${clamp(1 - flight / 0.45, 0, 1)}`;
    }
    if (chromeRef.current) {
      chromeRef.current.style.opacity = `${clamp(1 - flight / 0.22, 0, 1)}`;
    }
    // O indicativo vive enquanto a tela é só vídeo, e sai antes do conteúdo.
    if (hintRef.current) {
      hintRef.current.style.opacity = `${clamp((flight - 0.2) / 0.4, 0, 1)}`;
    }

    /**
     * Header e WhatsApp são `fixed` e vivem fora do hero. Em vez de acoplar os
     * componentes, publico o estado do voo num atributo do <html> e o CSS
     * cuida de tirá-los de cena. Só escreve quando o estado vira.
     */
    const isFlying = flight > 0.01;
    if (flying.current !== isFlying) {
      flying.current = isFlying;
      document.documentElement.dataset.heroFlight = isFlying ? '1' : '0';
    }

    // Atravessou o voo inteiro: nesta sessão a abertura não se repete.
    if (!seenWritten.current && progress >= FLIGHT_END) {
      seenWritten.current = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Sem sessionStorage a abertura continua rodando — nada quebra.
      }
    }

    /**
     * Ímã do final: passado o ponto de virada descendo, o resto do voo se
     * completa sozinho. Só dispara descendo — subindo o usuário está voltando
     * para dentro da palavra de propósito e puxá-lo brigaria com ele.
     */
    const goingDown = progress > lastProgress.current;
    lastProgress.current = progress;
    if (!magnetLive.current) {
      return;
    }
    if (progress < SNAP_FROM - 0.1) {
      magnetArmed.current = true;
      return;
    }
    if (
      !magnetArmed.current ||
      !goingDown ||
      progress <= SNAP_FROM ||
      progress >= FLIGHT_END - 0.02
    ) {
      return;
    }

    magnetArmed.current = false;
    const runway = runwayRef.current;
    if (!runway) {
      return;
    }
    // Pouso: o ponto em que o voo termina e o hero fica em repouso.
    const top = runway.getBoundingClientRect().top + window.scrollY;
    const target = top + FLIGHT_END * (runway.offsetHeight - window.innerHeight);
    // Fora do handler de scroll, senão a chamada briga com o frame em curso.
    requestAnimationFrame(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          duration: SNAP_DURATION,
          easing: easeInOutCubic,
        });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    });
  }, []);

  const layout = useCallback(() => {
    const pin = pinRef.current;
    const svg = svgRef.current;
    const text = textRef.current;
    const maskBg = maskBgRef.current;
    const curtain = curtainRef.current;
    const slot = slotRef.current;
    const baseline = baselineRef.current;
    if (!pin || !svg || !text || !maskBg || !curtain || !slot) {
      return;
    }

    const w = pin.clientWidth;
    const h = pin.clientHeight;
    if (!w || !h) {
      return;
    }

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    for (const rect of [maskBg, curtain]) {
      rect.setAttribute('width', `${w}`);
      rect.setAttribute('height', `${h}`);
    }

    // A palavra do SVG copia exatamente a métrica da palavra do h1.
    const style = getComputedStyle(slot);
    const size = Number.parseFloat(style.fontSize) || 0;
    const spacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
    const font = `${style.fontWeight} ${size}px ${style.fontFamily}`;

    /**
     * A baseline vem MEDIDA do layout: um inline-block vazio e sem altura
     * assenta a borda de baixo exatamente sobre a baseline da linha.
     *
     * E a medida é por offset, não por rect: a entrada do h1 anima `y` de 28
     * a 0, e getBoundingClientRect enxerga esse transform — medir durante a
     * animação devolvia a palavra deslocada para baixo, num valor diferente a
     * cada execução. offsetTop/offsetLeft ignoram transform.
     */
    const x0 = offsetWithin(slot, pin).x;
    const baseY = baseline ? offsetWithin(baseline, pin).y : offsetWithin(slot, pin).y;

    text.setAttribute('x', `${x0}`);
    text.setAttribute('y', `${baseY}`);
    text.setAttribute('font-size', `${size}`);
    text.style.letterSpacing = spacing;

    geo.current = { cx: w / 2, cy: h / 2, gx: x0, gy: baseY, max: 20 };
    const anchor = findAnchor(w, h, x0, baseY, size, font, spacing);

    // Escala para o furo cobrir a tela. Teto proposital: acima de ~55x o
    // rasterizador de máscaras do Chromium desiste.
    const half = Math.sqrt(w * w + h * h) / 2;
    geo.current = {
      cx: w / 2,
      cy: h / 2,
      gx: anchor.x,
      gy: anchor.y,
      max: clamp(half / anchor.r, 14, 55),
    };

    render(scrollYProgress.get());
  }, [findAnchor, render, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, 'change', render);

  /**
   * O layout roda SEMPRE, com voo ou sem voo: e ele que dimensiona o SVG e
   * assenta a palavra do furo em cima da palavra do h1. Sem ele a cortina
   * ficaria com retangulos de tamanho zero — e a palavra sumiria da tela.
   * O que o modo sem voo dispensa e o imã, nao a medicao.
   */
  useEffect(() => {
    layout();
    magnetLive.current = !skipFlight;
    // A fonte muda a métrica dos glifos depois do primeiro layout.
    document.fonts?.ready.then(layout).catch(() => {});

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(layout, 140);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      magnetLive.current = false;
      // Sair da home não pode deixar header e WhatsApp escondidos.
      delete document.documentElement.dataset.heroFlight;
      flying.current = null;
    };
  }, [layout, skipFlight]);

  const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('tecnologia-artistica-3d');
    if (!target) {
      return;
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.25, lerp: 0.09 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      ref={runwayRef}
      className="relative w-full bg-[var(--theme-bg)] transition-colors duration-200"
      style={{ height: skipFlight ? '100svh' : `${RUNWAY_VH}svh` }}
    >
      <div ref={pinRef} className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        {/* Vídeo e cortina existem SEMPRE, com voo ou sem voo: em repouso a
            cortina é o fundo opaco e a palavra é o furo por onde o vídeo
            aparece. Sem eles não há palavra "perspectivas" na tela. */}
        {/* O vídeo: camada própria, independente da palavra. */}
        <div
          ref={sceneRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          {/* Um iframe não tem object-fit. As medidas abaixo o fazem cobrir a
              viewport mantendo 16:9: 100vw de largura com 56.25vw de altura, e
              os mínimos assumem quando a tela fica mais alta que larga. */}
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&muted=1&loop=1&dnt=1`}
            title={t('titleWord')}
            allow="autoplay; fullscreen"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100svh',
              minWidth: '177.78svh',
            }}
          />
          <div className="absolute inset-0" style={{ background: TINT }} />
        </div>

        {/* A cortina: opaca em tudo, menos no furo em forma da palavra. */}
        <div ref={coverRef} className="absolute inset-0 z-10" aria-hidden="true">
          <svg ref={svgRef} className="block h-full w-full">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse">
                {/* Branco mostra a cortina, preto abre o furo. */}
                <rect ref={maskBgRef} x="0" y="0" fill="#fff" />
                <g ref={groupRef}>
                  <text ref={textRef} fill="#000" style={{ fontWeight: 600 }}>
                    {word}
                  </text>
                </g>
              </mask>
            </defs>
            <rect
              ref={curtainRef}
              x="0"
              y="0"
              mask={`url(#${maskId})`}
              style={{ fill: 'var(--theme-bg)' }}
            />
          </svg>
        </div>

        {/* Ondas e vinheta — abrem o ambiente conforme a câmera assenta. */}
        <div ref={ambienceRef} className="absolute inset-0 z-20" aria-hidden="true">
          <LinhasFluidas
            opacity={0.16}
            scale={1.7}
            lineCount={18}
            waveAmplitude={120}
            fps={30}
            fadeEdges={14}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 10%, transparent 40%, rgba(var(--theme-bg-rgb), 0.85) 100%)',
            }}
          />
        </div>

        {/* Indicativo de scroll — existe só enquanto a tela é apenas vídeo. */}
        {skipFlight ? null : (
          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-x-0 bottom-[clamp(1.75rem,5vh,3rem)] z-40 flex flex-col items-center gap-[12px]"
          >
            <span className="text-[11px] tracking-[0.3em] text-white/75 uppercase">
              {t('scrollCue')}
            </span>
            <span className="hr-scroll-line hr-scroll-line--onVideo" aria-hidden="true" />
          </div>
        )}

        <div ref={chromeRef} className="relative z-30 flex h-full w-full flex-col">
          <motion.div
            className="mx-auto flex w-full max-w-[1560px] flex-1 flex-col items-center justify-center px-[clamp(1.5rem,4vw,4rem)] pt-[120px] pb-[140px] text-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.p
              variants={revealItem}
              className="flex items-center gap-[14px] text-[clamp(0.7rem,0.9vw,0.85rem)] font-medium tracking-[0.28em] text-[var(--theme-muted)] uppercase"
            >
              <span className="hr-live-dot" aria-hidden="true" />
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              variants={revealItem}
              className="mt-[clamp(1.5rem,3vh,2.5rem)] text-[clamp(3.2rem,10.5vw,10rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-[var(--theme-text)]"
            >
              {t('titleLine')}
              <br />
              {/* Segura o lugar da palavra no h1 e é a régua do furo. Invisível
                  porque quem a desenha é a máscara, na camada de baixo. */}
              <span ref={slotRef} className="invisible inline-block">
                {word}
              </span>
              {/* Sonda da baseline: inline-block vazio e sem altura assenta a
                  borda de baixo exatamente sobre a baseline da linha. */}
              <span
                ref={baselineRef}
                aria-hidden="true"
                className="inline-block h-0 w-0 overflow-hidden align-baseline"
              />
              <span className="text-[var(--theme-accent)]">.</span>
            </motion.h1>

            <motion.p
              variants={revealItem}
              className="mt-[clamp(1.5rem,3vh,2.5rem)] max-w-[52ch] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.65] text-[var(--theme-muted)]"
            >
              {t('support')}
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-[clamp(2rem,4vh,3.25rem)] flex flex-wrap items-center justify-center gap-[16px]"
            >
              <a
                href="#tecnologia-artistica-3d"
                onClick={handleExploreClick}
                className="inline-flex cursor-pointer items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[32px] py-[16px] text-[15px] font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
              >
                {t('ctaPrimary')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 1v12M2 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center rounded-full border border-[var(--theme-border-strong)] px-[32px] py-[16px] text-[15px] font-medium text-[var(--theme-text)] transition-colors duration-200 hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Rodapé do hero: metadados discretos + indicador de scroll */}
          <motion.div
            className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,5vw,5rem)] pb-[36px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-end justify-between gap-[24px] border-t border-[var(--theme-border-soft)] pt-[24px]">
              <ul className="flex flex-wrap items-center gap-x-[32px] gap-y-[8px] text-[12px] tracking-[0.18em] text-[var(--theme-muted)] uppercase">
                <li>{t('metaLocation')}</li>
                <li className="hidden sm:block">{t('metaSince')}</li>
                <li className="hidden md:block">{t('metaMarket')}</li>
              </ul>
              <div className="flex items-center gap-[14px]">
                <span className="hidden text-[12px] tracking-[0.18em] text-[var(--theme-muted)] uppercase sm:block">
                  {t('scrollCue')}
                </span>
                <span className="hr-scroll-line" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
