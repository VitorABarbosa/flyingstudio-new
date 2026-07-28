'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import CasesArrow from '../components/CasesArrow';
import { revealBlur, revealItem, staggerContainer } from '../lib/animations';

// Anéis verdes (accent), como no Figma
const RIPPLE_COLOR = 'var(--theme-accent)';
// Ondas simultâneas em cena: nascem no centro, expandem e se dispersam, como gota na piscina
const RIPPLE_COUNT = 5;
// Tempo de cada onda do nascimento até se dissolver na borda
const RIPPLE_DURATION = 11;
// Anéis estáticos exibidos quando o usuário prefere menos movimento
const staticCircleWidths = ['min(92vw,1465px)', 'min(70vw,1108px)', 'min(50vw,778px)', 'min(34vw,517px)'];

export default function CasesCta() {
  const t = useTranslations('CasesPage.cta');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative mx-auto flex min-h-[746px] w-full max-w-[1465px] items-center justify-center overflow-hidden px-5 py-28 text-center md:min-h-[746px]">
      {prefersReducedMotion ? (
        // Sem movimento: anéis estáticos fiéis ao Figma
        staticCircleWidths.map((width) => (
          <div
            key={width}
            aria-hidden="true"
            className="absolute aspect-square rounded-full border"
            style={{ width, borderColor: RIPPLE_COLOR, opacity: 0.09 }}
          />
        ))
      ) : (
        <>
          {/* Ondas de gota na piscina: nascem no centro, expandem e se dispersam em loop */}
          {Array.from({ length: RIPPLE_COUNT }, (_, index) => (
            <motion.div
              key={index}
              aria-hidden="true"
              className="pointer-events-none absolute aspect-square rounded-full border"
              style={{ width: 'min(92vw,1465px)', borderColor: RIPPLE_COLOR }}
              initial={{ scale: 0.05, opacity: 0 }}
              animate={{ scale: [0.05, 1.12], opacity: [0, 0.14, 0.1, 0] }}
              transition={{
                duration: RIPPLE_DURATION,
                delay: index * (RIPPLE_DURATION / RIPPLE_COUNT),
                repeat: Infinity,
                ease: 'easeOut',
                times: [0, 0.1, 0.7, 1],
              }}
            />
          ))}
        </>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h2
          variants={revealBlur}
          className="max-w-[1274px] text-[clamp(52px,5.75vw,110px)] leading-[1.01] font-semibold tracking-[-0.035em] text-[var(--theme-text)]"
        >
          {t.rich('title', { accent: (chunks) => <span className="text-[var(--theme-accent)]">{chunks}</span> })}
        </motion.h2>
        <motion.p variants={revealItem} className="mt-10 max-w-[1036px] text-[18px] leading-[1.45] text-[var(--theme-text)] md:text-[32px] md:leading-[1.2]">
          {t('description')}
        </motion.p>
        <motion.div variants={revealItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={futurePageHrefs.contact}
            className="group mt-14 inline-flex min-h-[64px] items-center gap-6 rounded-full bg-[var(--theme-cta-bg)] px-8 text-[17px] font-medium tracking-[0.02em] text-[var(--theme-cta-text)] md:min-h-[76px] md:text-[20px]"
          >
            {t('button')}
            <CasesArrow className="size-7 -rotate-[36deg] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
