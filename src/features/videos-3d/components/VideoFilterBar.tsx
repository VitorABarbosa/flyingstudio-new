'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { videoTabs } from '../data/videosData';
import type { VideoCategoryId } from '../types/videos.types';

const EASE = [0.22, 1, 0.36, 1] as const;

type VideoFilterBarProps = {
  activeTab: VideoCategoryId;
  onTabChange: (tab: VideoCategoryId) => void;
};

/**
 * Filtros dos Filmes em texto puro — mesmo padrão da GalleryFilterBar de
 * Imagens: o filtro ativo É o título — maior e na cor de texto plena — e os
 * demais ficam ao lado, um pouco menores e em cinza. Na troca, o antigo
 * encolhe e apaga enquanto o novo cresce e acende (transição CSS).
 *
 * O componente persiste fora das seções (o estado vive na página), que é o
 * que permite a transição animar em vez de cortar seco.
 */
export default function VideoFilterBar({ activeTab, onTabChange }: VideoFilterBarProps) {
  const t = useTranslations('Videos3DPage');

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className="mx-auto w-full max-w-[1800px] px-4 md:px-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-[clamp(16px,2.2vw,30px)] gap-y-2 border-b border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)] pb-5">
        {videoTabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-pressed={isActive}
              className={`cursor-pointer font-['Outfit'] leading-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:text-[var(--theme-text)] focus-visible:outline-none ${
                isActive
                  ? 'text-[24px] font-semibold text-[var(--theme-accent)] md:text-[34px]'
                  : 'text-[17px] font-normal text-[var(--theme-muted)] hover:text-[var(--theme-text)] md:text-[22px]'
              }`}
            >
              {t(`tabs.${tab.id}`)}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
