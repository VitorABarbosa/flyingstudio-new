'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import type { CaseDetail, CaseProject } from '../types/cases.types';
import { companyBannerLogos } from './companyLogos';
import { EASE, popIn, revealBlur, revealItem, staggerContainer } from '../lib/animations';

/**
 * Abertura do case interno: a mesma moldura arredondada dos heroes do site,
 * com a linguagem dos banners do Nosso Grupo — foto de ponta a ponta, véu
 * escuro pela esquerda, título + construtora + cidade e as logos de quem
 * participou. O breadcrumb segue o padrão dos demais heroes (acento do tema).
 */
export default function CaseDetailHero({
  project,
  detail,
}: {
  project: CaseProject;
  detail: CaseDetail;
}) {
  const t = useTranslations('CasesPage');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 mx-auto h-[560px] w-[calc(100%-32px)] max-w-[1838px] md:h-[640px] md:w-[calc(100%-82px)]"
    >
      <div className="absolute inset-0 transform-gpu overflow-hidden rounded-b-[48px] [contain:paint] md:rounded-b-[99px]">
        {/* Ken Burns na entrada + parallax no scroll, como nos demais heroes */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Image
            src={detail.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: detail.heroImagePosition }}
            sizes="100vw"
          />
        </motion.div>
        {/* Véu dos banners de case: denso à esquerda, aberto à direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/70 to-transparent" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col px-6 pt-[112px] text-white md:px-14 md:pt-[151px] lg:px-20"
        >
          {/* Breadcrumb no padrão do site: Home › Nosso Grupo › Case */}
          <motion.div
            variants={revealItem}
            className="flex items-center justify-center gap-2 text-center text-[14px] font-medium tracking-[0.04em] md:text-[18px]"
          >
            <Link href="/" className="transition-opacity hover:opacity-70">
              {t('hero.home')}
            </Link>
            <span aria-hidden="true">›</span>
            <Link href={futurePageHrefs.cases} className="transition-opacity hover:opacity-70">
              {t('hero.label')}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-[var(--theme-accent)]">{project.title}</span>
          </motion.div>

          <div className="mt-auto pb-10 md:pb-12">
            <motion.p
              variants={revealItem}
              className="text-[12px] font-semibold tracking-[0.3em] text-[var(--theme-accent)] uppercase md:text-[13px]"
            >
              {t('detail.hero.eyebrow')}
            </motion.p>
            <motion.h1
              variants={revealBlur}
              className="mt-2 text-[clamp(30px,3.2vw,54px)] leading-[1.05] font-semibold tracking-[-0.03em]"
            >
              {project.title}
            </motion.h1>
            <motion.p variants={revealItem} className="mt-1 text-[clamp(16px,1.6vw,25px)] font-extralight">
              {project.company}
            </motion.p>
            <motion.p variants={revealItem} className="mt-3 text-[12px] tracking-[0.08em] md:text-[14px]">
              {project.location}
            </motion.p>
            <motion.p
              variants={revealItem}
              className="mt-4 max-w-[560px] text-[14px] leading-[1.55] text-white/90 md:text-[16px] md:leading-[1.5]"
            >
              {t(`detail.items.${project.id}.heroDescription`)}
            </motion.p>

            {/* Só as casas que participaram deste case */}
            <motion.div variants={staggerContainer} className="mt-6 flex flex-wrap items-center gap-5 md:gap-7">
              {detail.companies.map((company) => {
                const logo = companyBannerLogos[company];
                return (
                  <motion.div key={company} variants={popIn}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-auto w-auto max-h-[24px] object-contain md:max-h-[28px]"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
