'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { galleryCategoryOrder, gallerySections } from '../data/galleryData';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filtros da galeria em texto puro: o filtro ativo É o título da seção —
 * maior e na cor de texto plena — e os demais ficam ao lado, um pouco
 * menores e em cinza, sem disputar atenção. Na troca, o antigo encolhe e
 * apaga enquanto o novo cresce e acende (transição CSS de font-size + cor).
 *
 * Este componente é persistente (não remonta com o filtro), justamente para
 * essa transição acontecer de verdade. O contrato com a galeria é o mesmo
 * de sempre: disparar `gallery-filter-change`.
 */
export default function GalleryFilterBar() {
  const t = useTranslations('Images3DPage');

  /* Os filtros seguem a ordem de leitura, não a ordem do acervo. O `filter`
     descarta qualquer id da lista de ordem que não exista mais nas seções. */
  const categories = galleryCategoryOrder
    .map((id) => gallerySections.find((section) => section.id === id))
    .filter((section): section is (typeof gallerySections)[number] => Boolean(section));

  const [activeFilter, setActiveFilter] = useState(categories[0]?.id ?? 'geral');

  function handleSelect(filter: string) {
    if (filter === activeFilter) return;

    setActiveFilter(filter);
    window.dispatchEvent(new CustomEvent('gallery-filter-change', { detail: { filter } }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className="mx-auto w-full max-w-[1800px] px-4 md:px-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-[clamp(16px,2.2vw,30px)] gap-y-2 border-b border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)] pb-5">
        {categories.map((section) => {
          const isActive = section.id === activeFilter;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSelect(section.id)}
              aria-pressed={isActive}
              className={`cursor-pointer font-['Outfit'] leading-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:text-[var(--theme-text)] focus-visible:outline-none ${
                isActive
                  ? 'text-[24px] font-semibold text-[var(--theme-accent)] md:text-[34px]'
                  : 'text-[17px] font-normal text-[var(--theme-muted)] hover:text-[var(--theme-text)] md:text-[22px]'
              }`}
            >
              {t(`sections.${section.id}.title`)}
            </button>
          );
        })}

        {/* Descrição da categoria ativa: encostada à direita, na mesma linha
            dos filtros — troca junto com o filtro. */}
        <p className="ml-auto max-w-[58ch] text-right font-['Outfit'] text-[14px] leading-[1.6] text-[var(--theme-muted)] md:text-[15px]">
          {t(`sections.${activeFilter}.description`)}
        </p>
      </div>
    </motion.div>
  );
}
