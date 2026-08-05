'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { groupCompanies } from '../data/casesData';
import type { CompanyId } from '../types/cases.types';
import { revealBlur, revealItem, staggerContainer } from '../lib/animations';

/**
 * O descritivo de abertura do case: a frase-síntese à esquerda (palavra-chave
 * no acento do tema), a ficha técnica + narrativa à direita e, fechando a
 * seção, o que cada casa fez — nome na cor da casa e uma frase completa por
 * serviço. Tudo antes do mosaico; a página termina no próximo case.
 */
export default function CaseDetailOverview({
  caseId,
  companies,
}: {
  caseId: string;
  companies: CompanyId[];
}) {
  const t = useTranslations('CasesPage.detail');
  const tCompanies = useTranslations('CasesPage.ecosystem');

  const fichaRows = [
    { key: 'type', value: t(`items.${caseId}.ficha.type`) },
    { key: 'location', value: t(`items.${caseId}.ficha.location`) },
    { key: 'scope', value: t(`items.${caseId}.ficha.scope`) },
  ] as const;

  return (
    <motion.section
      id="case-overview"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mt-14 w-full max-w-[1718px] scroll-mt-28 px-6 md:mt-20 md:px-0"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <motion.h2
          variants={revealBlur}
          className="text-[clamp(28px,3.1vw,56px)] leading-[1.12] font-semibold tracking-[-0.03em] text-[var(--theme-text)]"
        >
          {t.rich(`items.${caseId}.statement`, {
            accent: (chunks) => <span className="font-light text-[var(--theme-accent)]">{chunks}</span>,
          })}
        </motion.h2>

        <div className="flex flex-col justify-center gap-7">
          <motion.dl variants={staggerContainer} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fichaRows.map((row) => (
              <motion.div
                key={row.key}
                variants={revealItem}
                /* Escopo ocupa a linha inteira — o valor é longo */
                className={row.key === 'scope' ? 'sm:col-span-2' : undefined}
              >
                <dt className="text-[13px] text-[var(--theme-muted)] md:text-[14px]">
                  {t(`ficha.${row.key}`)}
                </dt>
                <dd className="mt-0.5 text-[16px] leading-[1.3] text-[var(--theme-text)] md:text-[18px]">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.p
            variants={revealItem}
            className="max-w-[540px] text-justify text-[14px] leading-[1.6] text-[var(--theme-muted)] md:text-[16px] md:leading-[1.55]"
          >
            {t(`items.${caseId}.narrative`)}
          </motion.p>
        </div>
      </div>

      {/* O que cada casa fez — uma frase completa por serviço, com o nome na
          cor da casa. Filete acima para separar da ficha sem pesar. */}
      <motion.div
        variants={staggerContainer}
        className="mt-10 grid gap-7 border-t pt-8 md:mt-12 md:gap-9 md:pt-10"
        style={{
          borderColor: 'color-mix(in srgb, var(--theme-text) 12%, transparent)',
          /* Uma coluna por casa, qualquer que seja o número de casas do case;
             em telas estreitas as colunas quebram sozinhas. */
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        }}
      >
        {companies.map((companyId) => {
          const company = groupCompanies.find((c) => c.id === companyId);
          if (!company) return null;

          return (
            <motion.div key={companyId} variants={revealItem}>
              <p className="flex items-center gap-2.5 text-[14px] font-semibold text-[var(--theme-text)] md:text-[15px]">
                <span
                  aria-hidden="true"
                  className="size-[9px] shrink-0 rounded-full"
                  style={{ backgroundColor: company.accentColor }}
                />
                {tCompanies(`${companyId}.name`)}
              </p>
              <p className="mt-2 text-justify text-[13px] leading-[1.55] text-[var(--theme-muted)] md:text-[15px]">
                {t(`items.${caseId}.services.${companyId}`)}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
