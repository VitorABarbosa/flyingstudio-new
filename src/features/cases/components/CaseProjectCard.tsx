'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { CaseProject } from '../types/cases.types';
import { EASE } from '../lib/animations';

export default function CaseProjectCard({ project, index = 0 }: { project: CaseProject; index?: number }) {
  const t = useTranslations('CasesPage.projects');
  const isWide = project.size === 'wide';

  return (
    <motion.article
      initial={{ opacity: 0, y: 72, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: EASE }}
      className={`group relative w-full overflow-hidden rounded-[4px] ${isWide ? 'h-[560px] md:h-[880px] lg:col-span-2' : 'h-[520px] md:h-[726px]'}`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
        style={{ objectPosition: project.imagePosition }}
        sizes={isWide ? '100vw' : '(max-width: 1024px) 100vw, 50vw'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 md:p-[60px]">
        <div>
          <p className="text-[13px] uppercase tracking-[0.01em] md:text-[20px]">{project.company} - {project.location}</p>
          <h3 className={`mt-4 leading-[1.08] font-semibold ${isWide ? 'text-[44px] md:text-[70px]' : 'text-[38px] md:text-[50px]'}`}>{project.title}</h3>
        </div>
        {/* Oculto no desktop; surge junto com o zoom da imagem no hover do card */}
        <button
          type="button"
          className={`shrink-0 font-bold text-[#b6ff00] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-75 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${isWide ? 'text-[20px] md:text-[32px]' : 'text-[16px] md:text-[24px]'}`}
        >
          {t('seeComplete')}
        </button>
      </div>
    </motion.article>
  );
}
