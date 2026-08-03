'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { groupCompanies } from '../data/casesData';
import type { CompanyId } from '../types/cases.types';
import { EASE, revealItem, staggerContainer } from '../lib/animations';

export default function CasesEcosystem() {
  const [activeCompany, setActiveCompany] = useState<CompanyId>('ogdi');
  // Empresa anterior e direção da troca: a barra dela se esvazia enquanto a nova se preenche
  const [prevCompany, setPrevCompany] = useState<CompanyId | null>(null);
  const [direction, setDirection] = useState(1);
  const t = useTranslations('CasesPage.ecosystem');

  const selectCompany = (id: CompanyId) => {
    if (id === activeCompany) return;
    const fromIndex = groupCompanies.findIndex((company) => company.id === activeCompany);
    const toIndex = groupCompanies.findIndex((company) => company.id === id);
    setDirection(toIndex > fromIndex ? 1 : -1);
    setPrevCompany(activeCompany);
    setActiveCompany(id);
  };

  return (
    <section className="mx-auto w-full max-w-[1718px] px-4 md:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4"
      >
        {groupCompanies.map((company) => {
          const active = activeCompany === company.id;
          return (
            <motion.button
              key={company.id}
              variants={revealItem}
              type="button"
              onClick={() => selectCompany(company.id)}
              aria-pressed={active}
              className={`relative flex h-[150px] cursor-pointer flex-col items-start justify-between border border-[#6e6e6e] bg-[#272727] p-4 text-left transition-[opacity,filter] duration-300 md:h-[188px] md:p-5 ${active ? 'opacity-100' : 'opacity-30 brightness-75 hover:opacity-55 hover:brightness-90'}`}
            >
              <span className="absolute top-3 right-4 text-[13px] text-white md:text-[15px]">{company.number}</span>
              <span className="flex h-[56px] max-w-[78%] items-center">
                <Image src={company.logo} alt={t(`${company.id}.name`)} width={company.logoWidth} height={company.logoHeight} className="max-h-[44px] w-auto max-w-full object-contain" />
              </span>
              <span className="text-[14px] text-white md:text-[16px]">{t(`${company.id}.name`)}</span>
              {active || prevCompany === company.id ? (
                // A barra anterior se esvazia na direção do movimento enquanto a nova
                // preenche o card a partir da borda por onde "entra"
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-[10px]"
                  style={{
                    backgroundColor: company.accentColor,
                    transformOrigin: active
                      ? direction === 1
                        ? 'left center'
                        : 'right center'
                      : direction === 1
                        ? 'right center'
                        : 'left center',
                  }}
                  initial={{ scaleX: active ? 0 : 1 }}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        className="grid min-h-[230px] items-center gap-6 bg-[#272727] px-6 py-8 md:px-[44px] lg:grid-cols-[minmax(280px,0.75fr)_1.55fr] lg:gap-14"
      >
        {/* key remonta o conteúdo a cada troca, disparando o crossfade */}
        <motion.div
          key={`head-${activeCompany}`}
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[14px] font-semibold text-[#9dff00] md:text-[16px]">{t(`${activeCompany}.eyebrow`)}</span>
          <h2 className="mt-4 max-w-[560px] text-[24px] leading-[1.26] font-semibold text-white md:text-[32px]">
            {t(`${activeCompany}.title`)}
          </h2>
        </motion.div>
        <motion.p
          key={`desc-${activeCompany}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="max-w-[820px] text-[16px] leading-[1.5] text-white md:text-[19px] md:leading-[1.4]"
        >
          {t(`${activeCompany}.description`)}
        </motion.p>
      </motion.div>
    </section>
  );
}
