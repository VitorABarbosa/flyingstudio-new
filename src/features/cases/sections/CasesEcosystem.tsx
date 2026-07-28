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
              className={`relative flex h-[190px] cursor-pointer flex-col items-start justify-between border border-[#6e6e6e] bg-[#272727] p-5 text-left transition-[opacity,filter] duration-300 md:h-[250px] md:p-[26px] ${active ? 'opacity-100' : 'opacity-30 brightness-75 hover:opacity-55 hover:brightness-90'}`}
            >
              <span className="absolute top-4 right-5 text-[16px] text-white md:text-[20px]">{company.number}</span>
              <span className="flex h-[72px] max-w-[78%] items-center">
                <Image src={company.logo} alt={t(`${company.id}.name`)} width={company.logoWidth} height={company.logoHeight} className="max-h-[58px] w-auto max-w-full object-contain" />
              </span>
              <span className="text-[16px] text-white md:text-[20px]">{t(`${company.id}.name`)}</span>
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
        className="grid min-h-[308px] items-center gap-8 bg-[#272727] px-7 py-10 md:px-[62px] lg:grid-cols-[minmax(300px,0.75fr)_1.55fr] lg:gap-20"
      >
        {/* key remonta o conteúdo a cada troca, disparando o crossfade */}
        <motion.div
          key={`head-${activeCompany}`}
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[18px] font-semibold text-[#9dff00] md:text-[20px]">{t(`${activeCompany}.eyebrow`)}</span>
          <h2 className="mt-6 max-w-[590px] text-[32px] leading-[1.26] font-semibold text-white md:text-[40px]">
            {t(`${activeCompany}.title`)}
          </h2>
        </motion.div>
        <motion.p
          key={`desc-${activeCompany}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="max-w-[875px] text-[18px] leading-[1.4] text-white md:text-[24px] md:leading-[1.26]"
        >
          {t(`${activeCompany}.description`)}
        </motion.p>
      </motion.div>
    </section>
  );
}
