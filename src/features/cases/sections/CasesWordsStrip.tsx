'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE } from '../lib/animations';
import { entryBlur } from '@/lib/entryBlur';

// Cada palavra chega de uma direção: esquerda, cima e direita
const words = [
  { key: 'speed', className: 'text-[var(--theme-muted)]', hidden: { x: -110, y: 0 } },
  { key: 'coherence', className: 'text-[var(--theme-text)]', hidden: { x: 0, y: -90 } },
  { key: 'conversion', className: 'text-[var(--theme-accent)]', hidden: { x: 110, y: 0 } },
] as const;

const wordVariants: Variants = {
  hidden: (custom: { x: number; y: number }) => ({
    x: custom.x,
    y: custom.y,
    opacity: 0,
    filter: entryBlur(10),
  }),
  visible: { x: 0, y: 0, opacity: 1, filter: entryBlur(0) },
};

export default function CasesWordsStrip() {
  const t = useTranslations('CasesPage.words');

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="mx-auto flex w-full max-w-[1718px] flex-col items-center justify-between gap-5 overflow-hidden px-5 py-16 text-center text-[clamp(26px,2.6vw,46px)] leading-[1.2] font-semibold md:flex-row md:px-6 md:py-20"
    >
      {words.map((word, index) => (
        <motion.span
          key={word.key}
          custom={word.hidden}
          variants={wordVariants}
          transition={{ duration: 0.9, delay: index * 0.16, ease: EASE }}
          className={`inline-block ${word.className}`}
        >
          {t(word.key)}
        </motion.span>
      ))}
    </motion.div>
  );
}
