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
  { src: '/cases/logo-rinno.png', alt: 'Rinno Films', width: 167, height: 33, className: 'h-auto w-[142px] object-contain md:w-[167px]' },
];

export default function CasesFeatured() {
  const t = useTranslations('CasesPage.featured');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={sectionRef} className="relative mt-24 min-h-[720px] w-full overflow-hidden rounded-[20px] md:mt-28 md:min-h-[930px]">
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
        className="relative z-10 mx-auto flex min-h-[720px] w-full max-w-[1718px] flex-col justify-end px-6 py-16 text-white md:min-h-[930px] md:px-0 md:py-[88px]"
      >
        <motion.span variants={revealFromLeft} className="text-[18px] text-[#b6ff00] md:text-[24px]">{t('eyebrow')}</motion.span>
        <motion.h2 variants={revealBlur} className="mt-8 text-[clamp(52px,5.25vw,100px)] leading-[1.05] font-semibold">The One Saúde</motion.h2>
        <motion.p variants={revealItem} className="mt-2 text-[38px] font-extralight md:text-[64px]">OUSY</motion.p>
        <motion.p variants={revealItem} className="mt-5 text-[16px] md:text-[20px]">SÃO PAULO, SP</motion.p>
        <motion.p variants={revealItem} className="mt-9 max-w-[660px] text-[19px] leading-[1.35] md:text-[26px] md:leading-[1.2]">{t('description')}</motion.p>

        <motion.div variants={staggerContainer} className="mt-12 flex flex-wrap items-center gap-8 md:gap-11">
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
          className="group mt-12 inline-flex w-fit items-center gap-3 text-[22px] font-bold text-[#b6ff00] md:absolute md:right-0 md:bottom-[86px] md:mt-0 md:text-[32px]"
        >
          {t('seeComplete')}
          <CasesArrow className="size-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.button>
      </motion.div>
    </section>
  );
}
