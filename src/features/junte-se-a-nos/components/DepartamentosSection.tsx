'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { departments } from '../data/departments';
import DepartmentCard from './DepartmentCard';
import {
  staggerContainer,
  revealItem,
  revealText,
  VIEWPORT_ONCE,
  buttonHover,
  pressTap,
} from '../lib/animations';

export default function DepartamentosSection() {
  const t = useTranslations('JunteSeANos.departments');

  return (
    <section className="w-full bg-[var(--theme-bg)] px-4 pt-[56px] pb-[40px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto grid max-w-[1840px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {departments.map((department) => (
          <motion.div key={department.key} variants={revealItem}>
            <DepartmentCard
              department={department}
              title={t(`items.${department.key}.title`)}
              description={t(`items.${department.key}.description`)}
              vagasLabel={
                department.vagas !== null
                  ? t('vagas', { count: department.vagas })
                  : null
              }
              actionLabel={
                department.action === 'register' ? t('register') : t('check')
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Encontre vagas com o seu perfil + Ver Todas as Vagas */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mx-auto mt-12 flex max-w-[1840px] flex-col items-center justify-center gap-6 md:flex-row"
      >
        <motion.p
          variants={revealText}
          className="font-['Outfit'] text-[22px] leading-[1.2] font-medium text-[var(--theme-text)] md:text-[32px]"
        >
          {t('findByProfile')}
        </motion.p>
        <motion.a
          variants={revealText}
          href="#banco-talentos"
          whileHover={buttonHover}
          whileTap={pressTap}
          className="flex items-center gap-2 rounded-full bg-[var(--theme-surface-alt)] px-[24px] py-[16px] font-['Outfit'] text-[16px] font-medium tracking-[0.32px] text-[var(--theme-text)]"
        >
          {t('seeAll')}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
