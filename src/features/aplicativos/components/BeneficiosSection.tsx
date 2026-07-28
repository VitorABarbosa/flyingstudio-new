'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BeneficioCard from './BeneficioCard';
import { beneficiosItems } from '../data/aplicativosData';

const WHATSAPP_CTA_URL =
  'https://wa.me/5511993443369?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Flying%20Studio%20e%20quero%20meu%20Aplicativo!';

const sectionAnimation = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function BeneficiosSection() {
  const t = useTranslations('AplicativosPage.benefits');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionAnimation}
      className="mt-[-45px] w-full pt-12 pb-20 md:pt-16 md:pb-0"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-[34px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('title')}
          </h2>
        </div>

        <div className="mt-14 flex justify-center md:mt-16">
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {beneficiosItems.map((item) => (
              <BeneficioCard
                key={item.id}
                icon={item.icon}
                title={t(`items.${item.id}.title`)}
                description={t(`items.${item.id}.description`)}
              />
            ))}
          </div>
        </div>

        <div className="mt-15 flex justify-center">
          <button
            type="button"
            onClick={() => {
              window.open(WHATSAPP_CTA_URL, '_blank');
            }}
            className="inline-flex max-h-[56px] min-h-[44px] cursor-pointer items-center justify-center rounded-full bg-[var(--theme-btn-default)] px-[clamp(20px,2vw,32px)] py-[clamp(10px,1vw,16px)] text-[clamp(14px,1vw,16px)] text-[var(--theme-btn-text-default)]"
          >
            {t('ctaLabel')}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
