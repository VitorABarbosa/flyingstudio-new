'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import GrupoFlyingDeck from '@/components/sections/GrupoFlyingDeck';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';

/**
 * Nosso Grupo como cortina de ponta a ponta — a mesma mecânica de expansão
 * da cortina de serviços. A cortina em si (as quatro casas e a linha neon)
 * vive em `GrupoFlyingDeck`, compartilhada com a página Sobre Nós.
 */
export default function GrupoFlying() {
  const t = useTranslations('Home.grupo');

  return (
    /* Respiro menor embaixo que em cima: Parceiros é o fecho de Nosso Grupo
       (as casas e depois quem confia nelas), não uma seção à parte. */
    <section className="relative w-full overflow-hidden bg-[var(--theme-bg)] pt-[clamp(4rem,10vh,7rem)] pb-[clamp(2.5rem,5vh,4rem)] transition-colors duration-200">
      {/* Cabeçalho no trilho editorial padrão. */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,5vw,5rem)]"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        <div className="flex flex-wrap items-end justify-between gap-[24px]">
          <div>
            <motion.p
              variants={revealItem}
              className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-medium tracking-[0.28em] uppercase text-[var(--theme-accent)]"
            >
              {t('eyebrow')}
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-[16px] font-semibold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05] text-[var(--theme-text)]"
            >
              {t('titleStart')}{' '}
              <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
            </motion.h2>
          </div>
          <motion.p
            variants={revealItem}
            className="max-w-[58ch] text-justify text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] text-[var(--theme-muted)]"
          >
            {t('narrative')}
          </motion.p>
        </div>
      </motion.div>

      {/* A cortina: quase ponta a ponta, como o container do hero (1840px). */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
        className="relative z-10 mx-auto mt-[clamp(2.5rem,6vh,4rem)] w-full max-w-[1840px] px-[16px] md:px-[24px]"
      >
        <motion.div variants={revealItem}>
          <GrupoFlyingDeck />
        </motion.div>

        <motion.div variants={revealItem} className="mt-[clamp(2rem,5vh,3rem)] flex justify-center">
          <Link
            href={futurePageHrefs.cases}
            className="group inline-flex items-baseline gap-[8px] font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.15rem)] font-semibold text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            {t('cta')}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="translate-y-[1px] transition-transform duration-300 group-hover:translate-x-[4px]"
            >
              <path
                d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
