'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CasesArrow from '../components/CasesArrow';
import { EASE, popIn, revealBlur, revealFromLeft, revealItem, staggerContainer } from '../lib/animations';

const partnerLogos = [
  { src: '/cases/logo-nid.png', alt: 'NID Studio', width: 117, height: 34, className: 'h-auto w-[96px] object-contain md:w-[117px]' },
  { src: '/cases/logo-flying.png', alt: 'Flying Studio', width: 195, height: 25, className: 'h-auto w-[160px] object-contain md:w-[195px]' },
  { src: '/cases/logo-rinno.png', alt: 'Rinno Filmes', width: 167, height: 33, className: 'h-auto w-[142px] object-contain md:w-[167px]' },
];

export default function CasesFeatured() {
  const t = useTranslations('CasesPage.featured');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={sectionRef} className="relative mt-16 min-h-[540px] w-full overflow-hidden rounded-[20px] md:mt-20 md:min-h-[680px]">
      {/* Parallax sutil + zoom de entrada na imagem */}
      <motion.div
        className="absolute inset-[-8%_0]"
        style={{ y: imageY }}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image src="/cases/the-one-featured.jpg" alt={t('imageAlt')} fill className="object-cover object-[center_45%]" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/15" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 mx-auto flex min-h-[540px] w-full max-w-[1718px] flex-col justify-end px-6 py-12 text-white md:min-h-[680px] md:px-0 md:py-16"
      >
        <motion.span variants={revealFromLeft} className="text-[14px] text-[#b6ff00] md:text-[17px]">{t('eyebrow')}</motion.span>
        <motion.h2 variants={revealBlur} className="mt-5 text-[clamp(36px,3.8vw,64px)] leading-[1.05] font-semibold">The One Saúde</motion.h2>
        <motion.p variants={revealItem} className="mt-2 text-[26px] font-extralight md:text-[40px]">OUSY</motion.p>
        <motion.p variants={revealItem} className="mt-4 text-[14px] md:text-[16px]">SÃO PAULO, SP</motion.p>
        <motion.p variants={revealItem} className="mt-6 max-w-[620px] text-[16px] leading-[1.5] md:text-[19px] md:leading-[1.4]">{t('description')}</motion.p>

        <motion.div variants={staggerContainer} className="mt-8 flex flex-wrap items-center gap-6 md:gap-8">
          {partnerLogos.map((logo) => (
            <motion.div key={logo.src} variants={popIn}>
              <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={logo.className} />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={revealItem}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="group mt-8 inline-flex w-fit items-center gap-3 text-[17px] font-bold text-[#b6ff00] md:absolute md:right-0 md:bottom-[56px] md:mt-0 md:text-[22px]"
        >
          {t('seeComplete')}
          <CasesArrow className="size-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.button>
      </motion.div>
    </section>
  );
}
