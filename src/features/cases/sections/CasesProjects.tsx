'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CasesArrow from '../components/CasesArrow';
import { caseProjects } from '../data/casesData';
import type { CaseProject } from '../types/cases.types';
import { EASE, popIn, revealBlur, revealItem, staggerContainer } from '../lib/animations';

/**
 * Todos os projetos no formato do antigo "Case em destaque": banner de ponta
 * a ponta com parallax, véu escuro pela esquerda, título com construtora e
 * cidade, descrição, as logos das casas envolvidas e o "Ver completo" no
 * canto. A altura é presa à viewport (~44vh) para caberem dois por tela.
 */

const partnerLogos = [
  { src: '/cases/logo-nid.png', alt: 'NID Studio', width: 117, height: 34, className: 'h-auto w-[84px] object-contain md:w-[100px]' },
  { src: '/cases/logo-flying.png', alt: 'Flying Studio', width: 195, height: 25, className: 'h-auto w-[140px] object-contain md:w-[168px]' },
  { src: '/cases/logo-rinno.png', alt: 'Rinno Filmes', width: 167, height: 33, className: 'h-auto w-[124px] object-contain md:w-[144px]' },
];

function CaseBanner({ project }: { project: CaseProject }) {
  const t = useTranslations('CasesPage.projects');
  const bannerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <article ref={bannerRef} className="group relative h-[clamp(400px,44vh,480px)] w-full overflow-hidden rounded-[20px]">
      {/* Parallax sutil + zoom de entrada, herdados do Case em destaque */}
      <motion.div
        className="absolute inset-[-8%_0]"
        style={{ y: imageY }}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          style={{ objectPosition: project.imagePosition }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/15" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-[1718px] flex-col justify-end px-6 py-8 text-white md:px-0 md:py-10"
      >
        <motion.h3 variants={revealBlur} className="text-[clamp(26px,2.8vw,44px)] leading-[1.08] font-semibold">
          {project.title}
        </motion.h3>
        <motion.p variants={revealItem} className="mt-1 text-[clamp(17px,1.7vw,28px)] font-extralight">
          {project.company}
        </motion.p>
        <motion.p variants={revealItem} className="mt-2 text-[13px] md:text-[14px]">
          {project.location}
        </motion.p>
        <motion.p variants={revealItem} className="mt-4 max-w-[620px] text-[14px] leading-[1.5] md:text-[16px] md:leading-[1.45]">
          {t(`items.${project.id}.description`)}
        </motion.p>

        <motion.div variants={staggerContainer} className="mt-5 flex flex-wrap items-center gap-5 md:gap-7">
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
          className="group/cta mt-6 inline-flex w-fit items-center gap-3 text-[16px] font-bold text-[#b6ff00] md:absolute md:right-0 md:bottom-[44px] md:mt-0 md:text-[20px]"
        >
          {t('seeComplete')}
          <CasesArrow className="size-6 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
        </motion.button>
      </motion.div>
    </article>
  );
}

export default function CasesProjects() {
  return (
    <section id="projetos" className="mt-16 flex w-full scroll-mt-20 flex-col gap-5 md:mt-20 md:gap-6">
      {caseProjects.map((project) => (
        <CaseBanner key={project.id} project={project} />
      ))}
    </section>
  );
}
