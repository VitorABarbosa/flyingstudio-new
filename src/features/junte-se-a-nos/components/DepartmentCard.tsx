'use client';

import { motion } from 'framer-motion';
import { cardHover, pressTap } from '../lib/animations';
import type { Department } from '../data/departments';

type DepartmentCardProps = {
  department: Department;
  title: string;
  description: string;
  vagasLabel: string | null;
  actionLabel: string;
};

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Card de departamento (node 2133:6507): titulo, descricao e pilula de acao. */
export default function DepartmentCard({
  department,
  title,
  description,
  vagasLabel,
  actionLabel,
}: DepartmentCardProps) {
  return (
    <motion.div
      whileHover={cardHover}
      whileTap={pressTap}
      className="flex h-full flex-col items-center justify-between gap-6 rounded-[40px] bg-[var(--theme-surface)] px-[32px] pt-[32px] pb-[40px] text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-['Outfit'] text-[28px] leading-[1.2] font-semibold text-[var(--theme-text)] md:text-[40px]">
          {title}
        </h3>
        <p className="font-['Outfit'] text-[15px] leading-[1.5] font-normal text-[var(--theme-muted)] md:text-[16px]">
          {description}
        </p>
      </div>

      <a
        href={department.href}
        className="flex w-full max-w-[280px] items-center justify-center gap-5 rounded-full bg-[var(--theme-surface-alt)] px-[24px] py-[16px] transition-opacity hover:opacity-85"
      >
        {vagasLabel ? (
          <>
            <span className="font-['Outfit'] text-[18px] leading-none font-medium text-[var(--theme-accent)] md:text-[20px]">
              {vagasLabel}
            </span>
            <span aria-hidden="true" className="h-6 w-px bg-[var(--theme-text)]/25" />
          </>
        ) : null}
        <span className="flex items-center gap-2 font-['Outfit'] text-[16px] leading-[1.5] font-medium tracking-[0.32px] text-[var(--theme-text)]">
          {actionLabel}
          <ArrowRight />
        </span>
      </a>
    </motion.div>
  );
}
