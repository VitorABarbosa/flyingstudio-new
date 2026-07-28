'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import {
  staggerContainer,
  revealText,
  revealItem,
  buttonHover,
  pressTap,
} from '../lib/animations';

/**
 * Topo de Junte-se a Nós — só tipografia, centrada, sobre as linhas fluidas
 * da marca (a mesma textura do hero do DNA). Sem foto: o assunto aqui é o
 * convite, e a página é deliberadamente objetiva (convite → currículo). Um
 * halo em accent atrás do título dá profundidade sem depender de imagem.
 */
export default function JunteSeANosHero() {
  const t = useTranslations('JunteSeANos.hero');

  return (
    <section className="relative isolate w-full overflow-hidden bg-[var(--theme-bg)]">
      {/* As linhas fluidas são a textura da marca — mesmo ajuste do DNA. */}
      <LinhasFluidas
        className="pointer-events-none absolute inset-0 z-0"
        opacity={0.12}
        scale={1.4}
        fps={32}
        fadeEdges={20}
      />

      {/* Halo de luz atrás do título. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-140px] left-1/2 h-[440px] w-[min(760px,90vw)] -translate-x-1/2 rounded-full opacity-55 blur-[110px]"
        style={{
          background:
            'radial-gradient(closest-side, var(--theme-accent-glow-soft), transparent)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 pt-[clamp(4.5rem,14vh,8.5rem)] pb-[clamp(2.5rem,8vh,5rem)] text-center md:px-6"
      >
        <motion.p
          variants={revealText}
          className="flex items-center gap-[12px] font-['Outfit'] text-[clamp(0.7rem,0.85vw,0.82rem)] font-semibold tracking-[0.3em] text-[var(--theme-accent)] uppercase"
        >
          <span className="hr-live-dot" aria-hidden="true" />
          {t('label')}
        </motion.p>

        <motion.h1
          variants={revealText}
          className="mt-[clamp(1rem,2.5vh,1.75rem)] font-['Outfit'] text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-[var(--theme-text)]"
        >
          {t('title')}
          <span className="text-[var(--theme-accent)]">.</span>
        </motion.h1>

        <motion.p
          variants={revealText}
          className="mt-[clamp(1.25rem,3vh,2rem)] max-w-[58ch] font-['Outfit'] text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-[var(--theme-muted)]"
        >
          {t('description')}
        </motion.p>

        <motion.a
          variants={revealItem}
          href="#banco-talentos"
          whileHover={buttonHover}
          whileTap={pressTap}
          className="mt-[clamp(1.75rem,4vh,2.5rem)] inline-flex items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[30px] py-[16px] font-['Outfit'] text-[15px] leading-none font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
        >
          {t('cta')}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2v12M3.5 9.5L8 14l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
