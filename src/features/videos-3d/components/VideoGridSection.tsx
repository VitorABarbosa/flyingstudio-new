'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import VideoCard from './VideoCard';
import type { VideoSectionType } from '../types/videos.types';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Categoria única em grade — o formato da página de Perspectivas.
 *
 * Com o filtro em "todos" o acervo é grande demais para uma grade e a leitura
 * é por fileiras (o carrossel). Escolhida UMA categoria, a fileira vira
 * limitação: o visitante já disse o que quer ver, então mostramos tudo de uma
 * vez, sem setas.
 *
 * O número de colunas segue a proporção dos cards: virais são 9:16 e cabem
 * mais por linha que os 16:9 das outras categorias.
 */
export default function VideoGridSection({ section }: { section: VideoSectionType }) {
  const t = useTranslations('Videos3DPage');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const portrait = Boolean(section.items[0]?.portrait);
  const columns = portrait
    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        {/* O título da categoria vive na VideoFilterBar (o filtro ativo É o
            título) — aqui fica só a descrição. */}
        <div className="flex md:justify-end">
          <p className="max-w-[64ch] font-['Outfit'] text-[14px] leading-[1.6] text-[var(--theme-muted)] md:text-[15px]">
            {t(`sections.${section.id}.description`)}
          </p>
        </div>

        {
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className={`mt-8 grid gap-4 md:gap-5 ${columns}`}
          >
            {section.items.map((video) => (
              <motion.div key={video.id} variants={item}>
                <VideoCard
                  client={video.client}
                  project={video.project}
                  subtitle={video.subtitle}
                  vimeoId={video.vimeoId}
                  portrait={video.portrait}
                  isPlaying={activeVideoId === video.id}
                  onPlay={() => setActiveVideoId(video.id)}
                  onClose={() => setActiveVideoId(null)}
                  playLabel={t('carousel.openLabel', {
                    title: `${video.client} — ${video.project}`,
                  })}
                  closeLabel={t('carousel.closeLabel')}
                />
              </motion.div>
            ))}
          </motion.div>
        }
      </div>
    </section>
  );
}
