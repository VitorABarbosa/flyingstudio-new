'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DnaGrupoDeck from '../components/DnaGrupoDeck';
import { dnaCompanies } from '../data/dnaData';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';

export default function DnaGrupoSection() {
  const t = useTranslations('DnaPage.grupo');

  const copy = Object.fromEntries(
    dnaCompanies.map((company) => [
      company.key,
      {
        name: t(`companies.${company.key}.name`),
        role: t(`companies.${company.key}.role`),
        description: t(`companies.${company.key}.description`),
        services: t.raw(`companies.${company.key}.services`) as string[],
      },
    ]),
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1592px] px-4 md:px-6">
        <div className="mx-auto max-w-[1180px] text-center">
          {/* Uma frase, um peso só: o destaque vem da cor, não do tamanho. */}
          <h2 className="text-[40px] leading-tight font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('titlePre')} <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
          </h2>
          <p className="mx-auto mt-5 text-[16px] leading-[1.65] text-[var(--theme-muted)] md:text-[22px]">
            {t('description')}
          </p>
        </div>

        <DnaGrupoDeck
          companies={dnaCompanies}
          copy={copy}
          visitLabel={t('visitLabel')}
          openLabel={t('openLabel')}
          closeLabel={t('closeLabel')}
        />
      </div>
    </motion.section>
  );
}
