'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { dsbraveIntegrations } from '../data/dsbraveData';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';

const WHATSAPP_CTA_URL =
  'https://wa.me/5511993443369?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Flying%20Studio%20e%20quero%20meu%20D.sbrave!';

export default function DSbraveModuleSection() {
  const t = useTranslations('DSbravePage.module');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full pt-6 pb-20 md:pt-2 md:pb-0"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        <div className="text-center">
          <span className="text-[24px] font-bold uppercase text-[var(--theme-accent)]">
            {t('eyebrow')}
          </span>

          <h2 className="text-[34px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('title')}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2">
          {dsbraveIntegrations.map((integration) => (
            <article
              key={integration.key}
              className="rounded-[28px] bg-[var(--theme-surface)] p-8 text-center shadow-[0_16px_45px_var(--theme-border-soft)]"
            >
              <Image
                src={integration.icon}
                alt=""
                width={64}
                height={64}
                className="theme-icon-adaptive mx-auto object-contain"
              />

              <h3 className="mt-5 text-[30px] font-semibold text-[var(--theme-text)]">
                {t(`items.${integration.key}.title`)}
              </h3>
              <p className="mx-auto mt-4 max-w-[430px] text-[16px] leading-[1.6] text-[var(--theme-muted)]">
                {t(`items.${integration.key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              window.open(WHATSAPP_CTA_URL, '_blank');
            }}
            className="inline-flex min-h-[44px] max-h-[56px] cursor-pointer items-center justify-center rounded-full bg-[var(--theme-btn-default)] px-[clamp(20px,2vw,32px)] py-[clamp(10px,1vw,16px)] text-[clamp(14px,1vw,16px)] text-[var(--theme-btn-text-default)] transition-transform duration-200 hover:scale-105"
          >
            {t('button')}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
