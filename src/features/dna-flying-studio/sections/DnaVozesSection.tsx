'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DnaVozVideo from '../components/DnaVozVideo';
import { dnaVozes, dnaVozesFullVideoUrl } from '../data/dnaData';
import { EASE, sectionAnimation, SPRING_SOFT } from '../lib/animations';

const LINE_BASE_COLOR = 'color-mix(in srgb, var(--theme-accent) 18%, transparent)';

const textBlock = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const videoBlock = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING_SOFT },
};

const nodeDot = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { ...SPRING_SOFT, delay: 0.15 } },
};

/**
 * "Vozes do DNA": jornada vertical com os 5 pilares culturais do vídeo do
 * dia dos funcionários. Uma linha central se desenha acompanhando o scroll
 * e conecta pergunta → quote → depoimento em vídeo, alternando os lados.
 */
export default function DnaVozesSection() {
  const t = useTranslations('DnaPage.vozes');
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // A linha cresce presa ao scroll (com inércia de mola para fluidez).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.7', 'end 0.75'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      /*
        `amount` é uma fração da PRÓPRIA seção, e esta tem mais de 3000px (são
        cinco depoimentos). Os 0.2 do padrão exigiam ~600px visíveis antes de
        disparar — ou seja, a seção ficava invisível durante meia rolagem.
        `some` dispara assim que a borda de cima entra na tela.
      */
      viewport={{ once: true, amount: 'some' }}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1592px] px-4 md:px-6">
        <div className="mx-auto max-w-[1180px] text-center">
          <span className="text-[24px] font-bold uppercase tracking-[0.04em] text-[var(--theme-accent)]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-1 text-[40px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 text-[16px] leading-[1.65] text-[var(--theme-muted)] md:text-[22px]">
            {t('description')}
          </p>
        </div>

        <div ref={timelineRef} className="relative mt-14 md:mt-24">
          {/* Trilho da linha (apagado) + linha viva que se desenha no scroll. */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[10px] w-[2px] md:left-1/2 md:-translate-x-1/2"
            style={{ backgroundColor: LINE_BASE_COLOR }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[10px] w-[2px] origin-top bg-[var(--theme-accent)] shadow-[0_0_14px_1px_color-mix(in_srgb,var(--theme-accent)_60%,transparent)] md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineProgress }}
          />

          <div className="flex flex-col gap-20 md:gap-36">
            {dnaVozes.map((voz, index) => {
              const number = String(index + 1).padStart(2, '0');
              const videoOnLeft = index % 2 === 1;

              return (
                <motion.div
                  key={voz.key}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative pl-10 md:pl-0"
                >
                  {/* Nó da linha: acende quando o pilar entra em cena. */}
                  <motion.span
                    variants={nodeDot}
                    aria-hidden="true"
                    className="absolute top-[6px] left-[10px] z-10 flex size-[22px] -translate-x-1/2 items-center justify-center rounded-full bg-[var(--theme-accent)] shadow-[0_0_18px_3px_color-mix(in_srgb,var(--theme-accent)_55%,transparent)] md:top-[10px] md:left-1/2"
                  >
                    <span className="size-[8px] rounded-full bg-[var(--theme-accent-contrast)]" />
                  </motion.span>

                  <div className="grid items-center gap-8 md:grid-cols-2 md:gap-20">
                    <motion.div
                      variants={textBlock}
                      className={`md:px-4 ${videoOnLeft ? 'md:order-2 md:text-left' : 'md:text-right'}`}
                    >
                      <span className="text-[15px] font-bold tracking-[0.1em] text-[var(--theme-accent)]">
                        {number} · {t(`items.${voz.key}.eyebrow`)}
                      </span>

                      <h3 className="mt-3 text-[26px] leading-[1.2] font-semibold text-[var(--theme-text)] md:text-[40px]">
                        {t(`items.${voz.key}.question`)}
                      </h3>

                      <blockquote className="mt-5 md:mt-7">
                        <p className="text-[18px] leading-[1.45] font-medium text-[var(--theme-accent)] italic md:text-[24px]">
                          “{t(`items.${voz.key}.quote`)}”
                        </p>
                      </blockquote>
                    </motion.div>

                    <motion.div variants={videoBlock} className={videoOnLeft ? 'md:order-1' : ''}>
                      <DnaVozVideo voz={voz} title={t(`items.${voz.key}.question`)} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* A linha morre aqui: bolinha final cravada na borda do trilho. */}
          <div aria-hidden="true" className="relative h-[80px] md:h-[120px]">
            <span className="absolute bottom-0 left-[10px] size-[16px] -translate-x-1/2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_18px_3px_color-mix(in_srgb,var(--theme-accent)_55%,transparent)] md:left-1/2" />
          </div>
        </div>

        {/* Fecho da jornada: o convite final + vídeo completo. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-8 text-center md:mt-10"
        >
          <p className="mx-auto max-w-[820px] text-[20px] leading-[1.5] font-semibold text-[var(--theme-text)] md:text-[30px]">
            {t('closing')}
          </p>

          <a
            href={dnaVozesFullVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[44px] max-h-[56px] items-center justify-center gap-2 rounded-full bg-[var(--theme-btn-default)] px-[clamp(20px,2vw,32px)] py-[clamp(10px,1vw,16px)] text-[clamp(14px,1vw,16px)] text-[var(--theme-btn-text-default)] transition-transform duration-200 hover:scale-105 md:mt-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 4.5v15l13-7.5-13-7.5z" />
            </svg>
            {t('ctaLabel')}
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
