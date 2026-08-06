'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { dnaPartnerLogos } from '../data/dnaData';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';
import type { DnaPartnerLogo } from '../types/dna.types';

const MARQUEE_DURATION_S = 36;

// Degrade nas pontas das faixas, como na seção de parceiros da Home:
// os logos somem suavemente nas bordas da tela.
const EDGE_FADE_MASK =
  'linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)';

type MarqueeRowProps = {
  logos: DnaPartnerLogo[];
  reverse?: boolean;
};

function MarqueeRow({ logos, reverse = false }: MarqueeRowProps) {
  /* Fora da tela a faixa PAUSA — duas fileiras de logos animando em loop
     continuavam compondo camadas no iPhone mesmo longe do scroll. */
  const rowRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rowRef, { margin: '25% 0px' });

  return (
    <div
      ref={rowRef}
      className="relative w-full overflow-hidden"
      style={{ maskImage: EDGE_FADE_MASK, WebkitMaskImage: EDGE_FADE_MASK }}
    >
      <motion.div
        className="flex w-max items-center gap-[40px] pr-[40px] md:gap-[72px] md:pr-[72px]"
        animate={inView ? { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] } : undefined}
        transition={{ duration: MARQUEE_DURATION_S, ease: 'linear', repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={`${logo.id}-${index}`}
            src={logo.src}
            alt={logo.id}
            width={160}
            height={40}
            style={logo.h ? { height: `${logo.h}px` } : undefined}
            className={`theme-icon-adaptive w-auto object-contain opacity-70 ${logo.h ? '' : 'h-[32px] md:h-[40px]'}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function DnaParceirosSection() {
  const t = useTranslations('DnaPage.parceiros');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1592px] px-4 md:px-6">
        <p className="text-center text-[20px] font-medium text-[var(--theme-text)] md:text-[24px]">
          {t('titlePre')}{' '}
          <span className="font-semibold text-[var(--theme-accent)]">{t('titleHighlight')}</span>
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col gap-8 md:mt-12 md:gap-10">
        <MarqueeRow logos={dnaPartnerLogos} />
        <MarqueeRow logos={dnaPartnerLogos} reverse />
      </div>
    </motion.section>
  );
}
