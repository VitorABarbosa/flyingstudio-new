'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

type LinhasFluidasProps = {
  /**
   * Cor das linhas (qualquer valor valido para `strokeStyle`). Se omitida,
   * usa a accent do tema atual (`--theme-accent-rgb`) com a `opacity`
   * informada, acompanhando a troca claro/escuro automaticamente.
   */
  color?: string;
  /** Opacidade aplicada quando a cor vem do tema (0-1). */
  opacity?: number;
  /**
   * Zoom do padrao. >1 aproxima (linhas maiores, mais espacadas e ondas mais
   * longas); <1 afasta. Escala juntos largura da fita, amplitude, espessura
   * e o comprimento de onda — mantendo o desenho coerente.
   */
  scale?: number;
  /** Quantidade de linhas da "fita". */
  lineCount?: number;
  /** Largura total da fita de linhas (px). */
  ribbonWidth?: number;
  strokeWidth?: number;
  /** Amplitude da onda principal. */
  waveAmplitude?: number;
  twistSpeed?: number;
  complexTwist?: number;
  /** Velocidade da animacao (referencia a 60fps; independente do `fps`). */
  animationSpeed?: number;
  /** Limite de quadros por segundo. Menor = mais leve (padrao 30). */
  fps?: number;
  /**
   * Suaviza o topo e a base com um fade (mask), dissolvendo as linhas nas
   * bordas para evitar o "corte seco". Valor em % da altura (ex.: 15 = some
   * nos 15% de cima e nos 15% de baixo). 0 desliga.
   */
  fadeEdges?: number;
  className?: string;
  style?: CSSProperties;
};

const FALLBACK_ACCENT_RGB = '126, 82, 255';

/**
 * Animacao "linhas fluidas" (DNA wave) renderizada em canvas. Preenche 100%
 * do elemento pai — posicione/dimensione via `className`/`style` no consumidor.
 * Pensado para ser reutilizado como fundo decorativo em diversas telas.
 *
 * Respeita `prefers-reduced-motion` (desenha um quadro estatico) e adapta a
 * cor ao tema quando `color` nao e informada.
 */
export default function LinhasFluidas({
  color,
  opacity = 0.5,
  scale = 1,
  lineCount = 16,
  ribbonWidth = 850,
  strokeWidth = 1.5,
  waveAmplitude = 60,
  twistSpeed = 0.0008,
  complexTwist = 0.004,
  animationSpeed = 0.0015,
  fps = 18,
  fadeEdges = 0,
  className,
  style,
}: LinhasFluidasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fade no topo/base via mask, para as linhas se dissolverem nas bordas.
  const fade = Math.min(Math.max(fadeEdges, 0), 50);
  const maskImage =
    fade > 0
      ? `linear-gradient(to bottom, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`
      : undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    /* Celular: canvas decorativo fora do orçamento de memória do Safari no
       iPhone (as linhas mal aparecem na tela pequena) — não desenha. */
    if (window.matchMedia('(max-width: 1023px)').matches) {
      return;
    }

    let frameId = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let strokeColor = color ?? `rgba(${FALLBACK_ACCENT_RGB}, ${opacity})`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const readThemeColor = () => {
      if (color) {
        strokeColor = color;
        return;
      }
      const rgb =
        getComputedStyle(canvas).getPropertyValue('--theme-accent-rgb').trim() ||
        FALLBACK_ACCENT_RGB;
      strokeColor = `rgba(${rgb}, ${opacity})`;
    };

    // Zoom: amplia tamanhos e estica os comprimentos de onda (frequencias / scale).
    const ribbon = ribbonWidth * scale;
    const amp = waveAmplitude * scale;
    const mainFreq = 0.0015 / scale;
    const twistFreq = twistSpeed / scale;
    const complexFreq = complexTwist / scale;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth * scale;
      const centerY = height / 2;

      for (let i = 0; i < lineCount; i++) {
        const lineOffset = (i - lineCount / 2) * (ribbon / lineCount);
        ctx.beginPath();
        for (let x = -400; x <= width + 400; x += 5) {
          const mainWave = Math.sin(x * mainFreq + time * 0.8) * amp;
          const twistAngle =
            x * twistFreq + Math.sin(x * complexFreq + time * 0.3) * 1.5 + time;
          const twistY = lineOffset * Math.cos(twistAngle);
          const offsetX = lineOffset * Math.sin(twistAngle) * 0.5;
          const finalX = x + offsetX;
          const finalY = centerY + mainWave + twistY;
          if (x === -400) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
        ctx.stroke();
      }
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    // rAF roda na taxa do monitor (60/120/144Hz). Limitamos a `fps` redesenhos
    // por segundo e avancamos o tempo proporcional ao tempo real decorrido,
    // assim a velocidade visual fica igual em qualquer taxa.
    const frameInterval = 1000 / fps;
    const baselineFrameMs = 1000 / 60;
    let lastRender = 0;

    let running = false;
    let inViewport = false;

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      if (lastRender === 0) {
        lastRender = now;
        return;
      }
      const elapsed = now - lastRender;
      if (elapsed < frameInterval) {
        return;
      }
      lastRender = now - (elapsed % frameInterval);
      time += animationSpeed * (elapsed / baselineFrameMs);
      render();
    };

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // So anima quando visivel no viewport E com a aba em foco. Fora disso a
    // animacao e pausada (sem custo de CPU) — nao muda nada visualmente, so
    // evita redesenhar o que ninguem esta vendo (alivia o scroll).
    const start = () => {
      if (running || prefersReducedMotion || !inViewport || document.hidden) {
        return;
      }
      running = true;
      lastRender = 0;
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    readThemeColor();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Re-le a cor accent quando o tema (data-theme/class em <html>) muda.
    const themeObserver = new MutationObserver(() => {
      readThemeColor();
      if (!running) {
        render();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    // Pausa/retoma conforme a secao entra/sai da tela. rootMargin antecipa um
    // pouco para nao iniciar com um quadro congelado ao surgir.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? false;
        if (inViewport) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: '120px' },
    );
    intersectionObserver.observe(canvas);

    // Pausa quando a aba vai para segundo plano.
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [
    color,
    opacity,
    scale,
    lineCount,
    ribbonWidth,
    strokeWidth,
    waveAmplitude,
    twistSpeed,
    complexTwist,
    animationSpeed,
    fps,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        maskImage,
        WebkitMaskImage: maskImage,
        ...style,
      }}
    />
  );
}
