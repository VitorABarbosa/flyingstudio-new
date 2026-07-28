'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { staggerContainer, revealText, VIEWPORT_ONCE, EASE } from '../lib/animations';

export default function JunteSeANosHero() {
  const t = useTranslations('JunteSeANos.hero');

  return (
    <section className="w-full bg-[var(--theme-bg)]">
      {/* Banner */}
      <div className="relative w-full px-[8px] md:px-[20px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="
            relative h-[200px] w-full overflow-hidden
            [border-bottom-left-radius:80px_60px] [border-bottom-right-radius:80px_60px]
            md:h-[320px]
            xl:h-[400px]
          "
        >
          <Image
            src="/junte-se-a-nos/hero/banner.png"
            alt={t('bannerAlt')}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Titulo */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto flex max-w-[1280px] flex-col items-center px-4 pt-[56px] text-center"
      >
        <motion.span
          variants={revealText}
          className="font-['Outfit'] text-[18px] font-bold tracking-[0.04em] text-[var(--theme-accent)] uppercase md:text-[20px]"
        >
          {t('label')}
        </motion.span>
        <motion.h1
          variants={revealText}
          className="mt-3 font-['Outfit'] text-[32px] leading-[1.2] font-semibold text-[var(--theme-text)] md:text-[48px]"
        >
          {t('title')}
        </motion.h1>
      </motion.div>
    </section>
  );
}
