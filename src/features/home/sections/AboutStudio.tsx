'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, type CSSProperties, type MouseEvent } from 'react';
import { revealItem } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';

/**
 * "Sobre nós" — a lâmpada do invisível (estrutura fiel ao Lamp original):
 * a lâmpada acende e alarga no scroll, a imagem se revela sob o facho e o
 * cursor complementa com um facho orgânico. Todas as superfícies escuras
 * usam var(--theme-bg) — sem emenda com o resto do site.
 */

const STAT_KEYS = ['s1', 's2', 's3'] as const;

const REVEAL_IMAGE = '/home/hero/HERO_02.jpg';

/**
 * Tinta das duas revelações — a da luz e a do cursor. Precisa ser a MESMA:
 * é ela que define o teto de brilho de cada camada, então valores diferentes
 * faziam o facho do cursor revelar mais forte que a lâmpada e "acender" de
 * novo o que já estava revelado ao passar por cima.
 */
const REVEAL_TINT = 'color-mix(in srgb, var(--theme-bg) 55%, transparent)';

/**
 * Máscara da revelação que acende junto com a lâmpada.
 * A queda é escalonada em vez de linear: uma rampa de dois segmentos tem
 * quebra de inclinação nas pontas e o olho lê isso como borda — e como a
 * elipse é bem mais larga que alta, essa borda fica quase horizontal no
 * topo, atravessando a tela. A cauda longa até 88% dissolve o limite.
 * Máximo 88%: acima disso a elipse (rx 55%) passaria das laterais e voltaria
 * a encostar na borda ainda opaca.
 */
const ELLIPSE_MASK =
  'radial-gradient(ellipse 55% 42% at 50% 42%, #000 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.8) 34%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 79%, transparent 88%)';

/**
 * Coreografia de entrada da lâmpada. Um gatilho por peça, mas com atrasos
 * encadeados para ler como um gesto só: as asas abrem para os lados, a linha
 * cresce, os halos acendem, a imagem emerge sob a luz e os textos sobem.
 * amount baixo para começar quando a seção ainda está chegando na viewport.
 */
const LAMP_VIEWPORT = { once: true, amount: 0.15 };

/** Abertura: asas e linha crescendo para os lados. */
const openTransition = { delay: 0.25, duration: 0.9, ease: 'easeInOut' as const };
/** Acender: os halos entram depois da abertura e demoram mais a firmar. */
const glowTransition = { delay: 0.5, duration: 1.1, ease: 'easeOut' as const };
/** A imagem só emerge depois que há luz para revelá-la. */
const revealTransition = { delay: 0.75, duration: 1.3, ease: 'easeInOut' as const };

/** Textos entram por último, em cascata, sob a luz já formada. */
const contentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
};

export default function AboutStudio() {
  const t = useTranslations('Home.about');
  const surfaceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = surfaceRef.current;
    if (!node) {
      return;
    }
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      node.style.setProperty('--lx', `${x}px`);
      node.style.setProperty('--ly', `${y}px`);
    });
  };

  return (
    // overflow-clip + clip-margin no lugar de overflow-hidden: a lâmpada tem
    // scale-y-125 e estoura a caixa do .hr-lantern; com hidden ela era
    // guilhotinada na borda. clip deixa a luz vazar sem criar scroll.
    // isolate: sem ele os z-50/z-60 internos disputam no contexto raiz e,
    // por vir depois do Header no DOM, passavam por cima dele.
    <section
      id="sobre"
      className="relative isolate w-full overflow-clip [overflow-clip-margin:180px] bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <div
        ref={surfaceRef}
        onMouseMove={handleMouseMove}
        className="hr-lantern relative flex min-h-[88vh] w-full flex-col items-center"
        style={{ '--lx': '50%', '--ly': '40%' } as CSSProperties}
      >
        {/* ── A lâmpada ───────────────────────────────────────────
            z-50: acima das camadas de revelação (z-20), abaixo do texto
            (z-60) — a luz nunca é encoberta pelo facho do cursor.
            Para isso ela é feita SÓ de luz: o facho é esculpido por
            máscara, não por retângulos opacos cor-do-fundo, que sobre a
            imagem revelada virariam manchas de borda dura. */}
        <div className="pointer-events-none relative isolate z-50 flex min-h-[30rem] w-full flex-1 scale-y-125 items-center justify-center">
          {/* Asa esquerda do facho — o recorte de facho do Lamp original
              (base sumindo para baixo + lado externo sumindo para fora),
              feito por máscara aninhada em vez dos retângulos opacos:
              máscara do pai multiplica com a do filho. */}
          <motion.div
            initial={{ opacity: 0, width: '15rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            viewport={LAMP_VIEWPORT}
            transition={openTransition}
            className="absolute inset-auto right-1/2 h-56 w-[30rem] [mask-image:linear-gradient(to_bottom,#000_calc(100%_-_10rem),transparent_100%)]"
          >
            <div
              className="h-full w-full [mask-image:linear-gradient(to_right,transparent_0,#000_10rem)]"
              style={{
                backgroundImage: `conic-gradient(from 70deg at center top, var(--theme-accent), transparent, transparent)`,
              }}
            />
          </motion.div>

          {/* Asa direita do facho */}
          <motion.div
            initial={{ opacity: 0, width: '15rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            viewport={LAMP_VIEWPORT}
            transition={openTransition}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] [mask-image:linear-gradient(to_bottom,#000_calc(100%_-_10rem),transparent_100%)]"
          >
            <div
              className="h-full w-full [mask-image:linear-gradient(to_left,transparent_0,#000_10rem)]"
              style={{
                backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, var(--theme-accent))`,
              }}
            />
          </motion.div>

          {/* Halos da lâmpada — acendem depois da abertura. A opacidade final
              vem pela variant (e não por classe) porque o framer escreve
              opacity inline e sobrescreveria o utilitário. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={LAMP_VIEWPORT}
            transition={glowTransition}
            className="absolute inset-auto z-30 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[var(--theme-accent)] blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, width: '8rem' }}
            whileInView={{ opacity: 0.25, width: '16rem' }}
            viewport={LAMP_VIEWPORT}
            transition={glowTransition}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[var(--theme-accent)] blur-2xl"
          />
          {/* A linha de luz — pontas dissolvidas, sem corte reto */}
          <motion.div
            initial={{ opacity: 0, width: '15rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            viewport={LAMP_VIEWPORT}
            transition={openTransition}
            className="absolute inset-auto z-40 h-0.5 w-[30rem] -translate-y-[7rem] bg-[var(--theme-accent)] [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)]"
          />
        </div>

        {/* ── Revelação pela luz: acende junto com a lâmpada ────── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={LAMP_VIEWPORT}
          transition={revealTransition}
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            maskImage:
              ELLIPSE_MASK,
            WebkitMaskImage:
              ELLIPSE_MASK,
          }}
        >
          <Image src={REVEAL_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: REVEAL_TINT }} />
        </motion.div>

        {/* ── Revelação orgânica: o cursor como facho complementar ──
            Os dois envelopes dissolvem o facho perto das bordas da seção,
            senão o círculo chega opaco no limite e é cortado em reta. */}
        <div className="hr-lantern-edges-y pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <div className="hr-lantern-edges-x absolute inset-0">
            <div className="hr-lantern-image absolute inset-0">
              <Image src={REVEAL_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ backgroundColor: REVEAL_TINT }} />
            </div>
          </div>
        </div>

        {/* ── Conteúdo sob a luz ────────────────────────────────── */}
        <motion.div
          className="relative z-[60] -mt-[15rem] flex flex-col items-center px-[clamp(1.5rem,5vw,5rem)] pb-[clamp(3rem,7vh,4.5rem)] text-center"
          initial="hidden"
          whileInView="show"
          viewport={LAMP_VIEWPORT}
          variants={contentStagger}
        >
          <motion.p
            variants={revealItem}
            className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-medium tracking-[0.28em] uppercase text-[var(--theme-accent)]"
          >
            {t('eyebrow')}
          </motion.p>

          <motion.h2
            variants={revealItem}
            className="mt-[20px] font-semibold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.08] text-[var(--theme-text)]"
          >
            {t('titleStart')}{' '}
            <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>.
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mt-[20px] max-w-[58ch] text-[clamp(0.95rem,1.15vw,1.15rem)] leading-[1.7] text-[var(--theme-muted)]"
          >
            {t('desc')}
          </motion.p>

          <motion.div variants={revealItem}>
            <Link
              href="/dna-flying-studio"
              className="mt-[clamp(1.75rem,4vh,2.5rem)] inline-flex items-center gap-[10px] rounded-full bg-[var(--theme-accent)] px-[30px] py-[15px] text-[15px] font-medium text-[var(--theme-accent-contrast)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
            >
              {t('cta')}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 13 13 3M5 3h8v8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Fatos reais — régua compacta */}
          <motion.dl
            variants={revealItem}
            className="mt-[clamp(2.25rem,5vh,3.5rem)] flex flex-wrap items-center justify-center gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-[20px] border-t border-[var(--theme-border-soft)] pt-[clamp(1.5rem,3.5vh,2.25rem)]"
          >
            {STAT_KEYS.map((key) => (
              <div key={key} className="text-center">
                <dd className="font-semibold tracking-[-0.01em] text-[clamp(1.25rem,1.9vw,1.8rem)] text-[var(--theme-text)]">
                  {t(`stats.${key}.value`)}
                </dd>
                <dt className="mt-[4px] text-[11px] tracking-[0.18em] uppercase text-[var(--theme-muted)]">
                  {t(`stats.${key}.label`)}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Dica do facho — só onde há cursor */}
        <span className="pointer-events-none absolute right-[clamp(1.5rem,4vw,3rem)] bottom-[22px] z-[60] hidden items-center gap-[10px] text-[11px] tracking-[0.2em] uppercase text-[var(--theme-muted)] lg:flex">
          <span className="hr-live-dot" aria-hidden="true" />
          {t('hint')}
        </span>
      </div>
    </section>
  );
}
