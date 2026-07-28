'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { dnaHistoriaImages } from '../data/dnaData';
import {
  sectionAnimation,
  SPRING_SOFT,
  staggerContainer,
  VIEWPORT_SECTION,
} from '../lib/animations';

const photoReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: SPRING_SOFT },
};

export default function DnaHistoriaSection() {
  const t = useTranslations('DnaPage.historia');
  const [photoLeft, photoRight, photoWide] = dnaHistoriaImages;

  // Parallax: cada foto desliza numa velocidade diferente conforme o scroll,
  // dando profundidade à colagem.
  const collageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxWide = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
    <motion.section
      id="nossa-historia"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full scroll-mt-24"
    >
      <div className="mx-auto grid w-full max-w-[1592px] items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <span className="text-[24px] font-bold uppercase tracking-[0.04em] text-[var(--theme-accent)]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-1 text-[44px] leading-tight font-semibold text-[var(--theme-text)] md:text-[72px]">
            {t('title')}
          </h2>

          <p className="mt-6 inline-flex items-center rounded-[99px] border-2 border-[var(--theme-chip-border)] bg-[var(--theme-surface)] px-6 py-2.5 text-[14px] font-medium text-[var(--theme-text)] md:text-[16px]">
            {t('foundedLabel')}
          </p>

          <p className="mt-6 text-[15px] leading-[1.7] text-[var(--theme-muted)] md:text-[20px]">
            {t('description')}
          </p>

          <p className="mt-5 text-[15px] leading-[1.7] text-[var(--theme-muted)] md:text-[20px]">
            {t('description2')}
          </p>
        </div>

        <motion.div
          ref={collageRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_SECTION}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          <motion.div style={{ y: parallaxSlow }}>
            <motion.div
              variants={photoReveal}
              className="relative h-[220px] overflow-hidden rounded-[24px] md:h-[360px]"
            >
              <Image
                src={photoLeft.src}
                alt={t('imageAlt1')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: parallaxFast }} className="mt-8 md:mt-14">
            <motion.div
              variants={photoReveal}
              className="relative h-[220px] overflow-hidden rounded-[24px] md:h-[360px]"
            >
              <Image
                src={photoRight.src}
                alt={t('imageAlt2')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: parallaxWide }} className="col-span-2">
            <motion.div
              variants={photoReveal}
              className="relative h-[200px] overflow-hidden rounded-[24px] md:h-[280px]"
            >
              <Image
                src={photoWide.src}
                alt={t('imageAlt3')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
