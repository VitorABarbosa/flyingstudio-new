'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CasesEcosystemRings from './CasesEcosystemRings';
import { EASE } from '../lib/animations';

const wordVariants: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: index * 0.05, ease: EASE },
  }),
};

const chunkText = (chunks: ReactNode) =>
  Array.isArray(chunks) ? chunks.join('') : typeof chunks === 'string' ? chunks : '';

export default function CasesIntro() {
  const t = useTranslations('CasesPage.intro');
  let wordIndex = 0;

  // Divide o trecho em palavras, cada uma subindo de dentro da própria máscara
  const renderWords = (chunks: ReactNode, className: string) =>
    chunkText(chunks)
      .split(' ')
      .filter(Boolean)
      .map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={wordVariants}
            custom={wordIndex++}
            className={`inline-block ${className}`}
          >
            {index < words.length - 1 ? `${word} ` : word}
          </motion.span>
        </span>
      ));

  return (
    <section className="mx-auto grid min-h-[820px] w-full max-w-[1718px] items-center gap-16 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-[minmax(0,759px)_minmax(0,1fr)] lg:gap-24">
      <CasesEcosystemRings />
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-[640px] text-[clamp(48px,5vw,96px)] leading-[1.2] font-semibold tracking-[-0.03em] text-[var(--theme-text)] lg:justify-self-end"
      >
        {t.rich('statement', {
          strong: (chunks) => <>{renderWords(chunks, '')}</>,
          muted: (chunks) => <>{renderWords(chunks, 'font-light text-[var(--theme-muted)]')}</>,
        })}
      </motion.p>
    </section>
  );
}
