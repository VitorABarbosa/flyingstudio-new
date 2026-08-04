'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import CasesArrow from '../components/CasesArrow';
import { hasCaseDetail } from '../data/caseDetailsData';
import type { CaseProject } from '../types/cases.types';
import { EASE, revealBlur, revealItem, staggerContainer } from '../lib/animations';

/**
 * "Próximo case": o banner do projeto seguinte na ordem do Nosso Grupo, no
 * mesmo formato dos banners da listagem. O banner inteiro é o link — para a
 * página interna quando ela existe, senão de volta à listagem.
 */
export default function CaseDetailNext({ project }: { project: CaseProject }) {
  const t = useTranslations('CasesPage');
  const bannerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const href = hasCaseDetail(project.id)
    ? `${futurePageHrefs.cases}/${project.id}`
    : `${futurePageHrefs.cases}#projetos`;

  return (
    <section className="mx-auto mt-16 w-full max-w-[1718px] px-6 md:mt-24 md:px-0">
      <Link href={href} className="block">
        <article
          ref={bannerRef}
          className="group relative h-[clamp(320px,36vh,400px)] w-full overflow-hidden rounded-[20px]"
        >
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
            className="relative z-10 flex h-full flex-col justify-end p-8 text-white md:p-12"
          >
            <motion.p
              variants={revealItem}
              className="text-[12px] font-semibold tracking-[0.28em] text-[var(--theme-accent)] uppercase md:text-[13px]"
            >
              {t('detail.nextCase')}
            </motion.p>
            <motion.h2 variants={revealBlur} className="mt-2 text-[clamp(26px,2.8vw,44px)] leading-[1.08] font-semibold">
              {project.title}
            </motion.h2>
            <motion.p variants={revealItem} className="mt-1 text-[clamp(17px,1.7vw,28px)] font-extralight">
              {project.company}
            </motion.p>

            <motion.span
              variants={revealItem}
              className="group/cta mt-6 inline-flex w-fit items-center gap-3 text-[16px] font-bold text-[var(--theme-accent)] md:absolute md:right-12 md:bottom-12 md:mt-0 md:text-[20px]"
            >
              {t('projects.seeComplete')}
              <CasesArrow className="size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.span>
          </motion.div>
        </article>
      </Link>
    </section>
  );
}
