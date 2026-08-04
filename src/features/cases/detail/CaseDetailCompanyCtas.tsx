'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import { groupCompanies } from '../data/casesData';
import type { CompanyId } from '../types/cases.types';
import { revealItem, staggerContainer } from '../lib/animations';

/**
 * O fecho do mosaico: uma pílula por casa participante convidando a conhecer
 * o site de cada uma — ponto na cor da casa, rótulo já existente do Nosso
 * Grupo ("Conhecer a...") e seta ↗ para sites externos (a Flying leva ao
 * nosso DNA, seta reta). No hover, a borda assume a cor da casa.
 */
const COMPANY_SITES: Record<CompanyId, string | null> = {
  ogdi: 'https://ogdi.com.br',
  nid: 'https://nidstudio.com.br',
  flying: null, // a Flying é a casa — o CTA dela leva ao nosso DNA
  rinno: 'https://rinnofilms.com.br',
};

function CtaArrow({ external }: { external: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={
        external
          ? 'transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]'
          : 'transition-transform duration-300 group-hover:translate-x-[2px]'
      }
    >
      {external ? (
        <path
          d="M4 12L12 4M12 4H5.5M12 4v6.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/* A borda vive numa var CSS: base discreta do tema, cor da casa no hover —
   sem inline style disputando com a classe. */
const pillClass = `
  group inline-flex items-center gap-2.5 rounded-full border
  border-[var(--pill-border)] bg-[color-mix(in_srgb,var(--theme-surface)_82%,transparent)]
  px-5 py-2.5 text-[13px] font-medium text-[var(--theme-text)]
  transition-colors duration-300 hover:border-[var(--pill-border-hover)]
  md:px-6 md:py-3 md:text-[14px]
`;

export default function CaseDetailCompanyCtas({ companies }: { companies: CompanyId[] }) {
  const t = useTranslations('CasesPage');

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="mx-auto mt-10 flex w-full max-w-[1718px] flex-wrap items-center justify-center gap-3 px-6 md:mt-12 md:gap-4"
    >
      {companies.map((companyId) => {
        const company = groupCompanies.find((c) => c.id === companyId);
        if (!company) return null;

        const site = COMPANY_SITES[companyId];

        const style = {
          '--pill-border': 'color-mix(in srgb, var(--theme-text) 16%, transparent)',
          '--pill-border-hover': company.accentColor,
        } as CSSProperties;

        const content = (
          <>
            <span
              aria-hidden="true"
              className="size-[8px] shrink-0 rounded-full"
              style={{ backgroundColor: company.accentColor }}
            />
            {t('detail.visitLabel', { name: t(`ecosystem.${companyId}.name`) })}
            <CtaArrow external={Boolean(site)} />
          </>
        );

        return (
          <motion.div key={companyId} variants={revealItem}>
            {site ? (
              <a href={site} target="_blank" rel="noopener noreferrer" className={pillClass} style={style}>
                {content}
              </a>
            ) : (
              <Link href={futurePageHrefs.dna} className={pillClass} style={style}>
                {content}
              </Link>
            )}
          </motion.div>
        );
      })}
    </motion.section>
  );
}
