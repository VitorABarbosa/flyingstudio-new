'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DSbravePointIcon from '../components/DSbravePointIcon';
import { dsbraveExplainerPoints } from '../data/dsbraveData';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';

export default function DSbraveExplainerSection() {
  const t = useTranslations('DSbravePage.explainer');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        <div className="mx-auto max-w-[1180px] text-center">
          <span className="text-[24px] font-bold uppercase text-[var(--theme-accent)]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-2 text-[34px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 text-[16px] leading-[1.65] text-[var(--theme-muted)] md:text-[22px]">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
          {dsbraveExplainerPoints.map((point) => (
            <article
              key={point.key}
              className="rounded-[28px] bg-[var(--theme-surface)] p-8 text-center shadow-[0_16px_45px_var(--theme-border-soft)]"
            >
              <span
                className="mx-auto flex size-[58px] items-center justify-center rounded-full text-[var(--theme-accent)]"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--theme-accent) 14%, transparent)',
                }}
              >
                <DSbravePointIcon icon={point.icon} />
              </span>

              <h3 className="mt-5 text-[26px] leading-[1.15] font-semibold text-[var(--theme-text)]">
                {t(`points.${point.key}.title`)}
              </h3>
              <p className="mx-auto mt-3 max-w-[360px] text-[15px] leading-[1.6] text-[var(--theme-muted)]">
                {t(`points.${point.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
