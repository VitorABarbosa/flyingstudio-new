'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import DnaPilarIcon from '../components/DnaPilarIcon';
import { dnaEssenciaSlideKeys, dnaPilares } from '../data/dnaData';
import {
  EASE,
  sectionAnimation,
  SPRING_SOFT,
  staggerContainer,
  staggerItemSpring,
  VIEWPORT_SECTION,
} from '../lib/animations';
import type { DnaEssenciaSlideKey } from '../types/dna.types';

export default function DnaEssenciaSection() {
  const t = useTranslations('DnaPage.essencia');
  const [activeSlide, setActiveSlide] = useState<DnaEssenciaSlideKey>(dnaEssenciaSlideKeys[0]);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1592px] px-4 md:px-6">
        <h2 className="text-center text-[34px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
          {t('titlePre')} <span className="text-[var(--theme-accent)]">Flying Studio</span>
        </h2>

        <div className="mt-8 flex justify-center md:mt-12">
          <div className="flex items-center rounded-[99px] border-2 border-[var(--theme-chip-border)] bg-[var(--theme-surface)] p-[4px] shadow-[0_12px_28px_var(--theme-border-soft)]">
            {dnaEssenciaSlideKeys.map((key) => {
              const active = key === activeSlide;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSlide(key)}
                  aria-pressed={active}
                  className={`relative cursor-pointer rounded-[99px] px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 md:px-8 md:text-[18px] ${
                    active ? 'text-[var(--theme-accent-contrast)]' : 'text-[var(--theme-text)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="essencia-pill"
                      transition={SPRING_SOFT}
                      className="absolute inset-0 rounded-[99px] bg-[var(--theme-accent)]"
                    />
                  )}
                  <span className="relative z-10">{t(`slides.${key}.title`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-8 overflow-hidden rounded-[28px] bg-[var(--theme-surface)] shadow-[0_16px_45px_var(--theme-border-soft)] md:mt-10 md:rounded-[40px]">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-[6px] bg-[var(--theme-accent)] md:w-[8px]"
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex min-h-[280px] flex-col justify-center gap-4 px-8 py-10 md:min-h-[320px] md:gap-5 md:px-20 md:py-14"
            >
              <span className="text-[18px] font-bold uppercase tracking-[0.06em] text-[var(--theme-accent)] md:text-[22px]">
                {t(`slides.${activeSlide}.eyebrow`)} {t(`slides.${activeSlide}.title`)}
              </span>
              <p className="max-w-[1280px] text-[18px] leading-[1.55] font-medium text-[var(--theme-text)] md:text-[26px]">
                {t(`slides.${activeSlide}.description`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_SECTION}
          className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8"
        >
          {dnaPilares.map((pilar) => (
            <motion.article
              key={pilar.key}
              variants={staggerItemSpring}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[var(--theme-surface)] shadow-[0_16px_45px_var(--theme-border-soft)] transition-transform duration-300 hover:-translate-y-1 md:rounded-[32px]"
            >
              <div aria-hidden="true" className="h-[10px] w-full bg-[var(--theme-accent)]" />

              <div className="flex flex-1 flex-col gap-5 px-8 pt-8 pb-10 md:px-10">
                <span
                  className="flex size-[64px] items-center justify-center rounded-full text-[var(--theme-accent)]"
                  style={{
                    backgroundColor:
                      'color-mix(in srgb, var(--theme-accent) 14%, transparent)',
                  }}
                >
                  <DnaPilarIcon icon={pilar.icon} />
                </span>

                <h3 className="text-[30px] leading-[1.2] font-semibold text-[var(--theme-text)] md:text-[38px]">
                  {t(`pilares.${pilar.key}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[var(--theme-muted)] md:text-[16px]">
                  {t(`pilares.${pilar.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
