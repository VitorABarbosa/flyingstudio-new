'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import CaseProjectCard from '../components/CaseProjectCard';
import { caseProjects } from '../data/casesData';
import { revealBlur } from '../lib/animations';

export default function CasesProjects() {
  const t = useTranslations('CasesPage.projects');

  return (
    <section id="projetos" className="relative w-full scroll-mt-20 overflow-hidden pt-28 md:pt-40">
      {/* Ondas fluidas ao fundo, ponta a ponta da tela, inclinadas como a arte do Figma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-12vw] top-[-60px] z-0 h-[760px] rotate-[15deg] md:top-[-120px] md:h-[1080px]"
      >
        <LinhasFluidas className="absolute inset-0" opacity={0.14} scale={1.7} fps={30} fadeEdges={16} />
      </div>

      <div className="relative mx-auto w-full max-w-[1719px] px-4 md:px-6">
      <motion.h2
        variants={revealBlur}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="relative z-10 mx-auto mb-20 max-w-[1230px] text-center text-[clamp(48px,5.2vw,100px)] leading-[1.2] font-semibold tracking-[-0.03em] text-[var(--theme-text)] md:mb-24"
      >
        {t.rich('title', { accent: (chunks) => <span className="text-[var(--theme-accent)]">{chunks}</span> })}
      </motion.h2>
      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {caseProjects.map((project, index) => (
          <CaseProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
}
