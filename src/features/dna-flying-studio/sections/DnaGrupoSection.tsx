'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import GrupoFlyingDeck from '@/components/sections/GrupoFlyingDeck';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';

/**
 * Nosso Grupo na página Sobre Nós: o título e a descrição são os desta
 * página; a cortina das quatro casas e a linha neon são as mesmas da home
 * (`GrupoFlyingDeck`) — uma cortina só, em dois lugares.
 */
export default function DnaGrupoSection() {
  const t = useTranslations('DnaPage.grupo');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      /* `overflow-hidden` porque a linha neon é ancorada na largura da
         viewport (`w-screen`) e transbordaria o trilho. */
      className="w-full overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1592px] px-4 md:px-6">
        <div className="mx-auto max-w-[1180px] text-center">
          {/* Uma frase, um peso só: o destaque vem da cor, não do tamanho. */}
          <h2 className="text-[40px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('titlePre')} <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
          </h2>
          <p className="mx-auto mt-5 text-justify [text-align-last:center] text-[16px] leading-[1.65] text-[var(--theme-muted)] md:text-[22px]">
            {t('description')}
          </p>
        </div>
      </div>

      {/* A cortina no mesmo trilho da home (1840px). */}
      <div className="relative z-10 mx-auto mt-[clamp(2.5rem,6vh,4rem)] w-full max-w-[1840px] px-[16px] md:px-[24px]">
        <GrupoFlyingDeck />

        {/* Mesmo convite da home: daqui a leitura continua na página do grupo. */}
        <div className="mt-[clamp(2rem,5vh,3rem)] flex justify-center">
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
        </div>
      </div>
    </motion.section>
  );
}
