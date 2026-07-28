'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import VideoCard from './VideoCard';
import type { VideoSectionType } from '../types/videos.types';

type VideoCarouselSectionProps = {
  section: VideoSectionType;
};

const ITEMS_PER_PAGE = 4;

const headerAnimation = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemsAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const pageAnimation = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getGridColumnsClass(totalItems: number) {
  if (totalItems <= 1) return 'grid-cols-1';
  if (totalItems === 2) return 'grid-cols-1 md:grid-cols-2';
  if (totalItems === 3) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
}

/**
 * Seta do carrossel.
 *
 * Cápsula VERTICAL, não círculo. O botão de play dos cards já é um círculo de
 * vidro com accent no hover — repetir a forma aqui fazia os dois se
 * confundirem. Navegação e reprodução são ações diferentes e agora têm
 * silhuetas diferentes.
 *
 * No hover a cápsula se alonga e o accent sobe a partir da borda externa,
 * como uma aba sendo puxada para fora do trilho.
 *
 * A divisa é SVG, não o caractere "←": glifo de seta muda de desenho conforme
 * a fonte e não alinha igual em todo sistema.
 */
function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  label: string;
}) {
  const isLeft = direction === 'left';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group absolute top-1/2 z-[35] -translate-y-1/2 cursor-pointer focus-visible:outline-none ${
        isLeft ? 'left-[-10px] md:left-[-18px]' : 'right-[-10px] md:right-[-18px]'
      }`}
    >
      <span
        className="relative flex h-[74px] w-[38px] items-center justify-center overflow-hidden rounded-full border backdrop-blur-md transition-all duration-300 group-hover:h-[92px] group-focus-visible:ring-2 group-focus-visible:ring-[var(--theme-accent)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--theme-ring-offset)] md:h-[86px] md:w-[42px] md:group-hover:h-[106px]"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--theme-surface) 74%, transparent)',
          borderColor: 'color-mix(in srgb, var(--theme-text) 14%, transparent)',
          boxShadow: '0 18px 40px -22px rgba(0,0,0,0.45)',
        }}
      >
        {/* O accent sobe da borda externa para dentro. `origin` no lado de fora
            é o que dá a leitura de aba sendo puxada. */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 scale-x-0 bg-[var(--theme-accent)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
            isLeft ? 'origin-left' : 'origin-right'
          }`}
        />

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`relative text-[var(--theme-text)] transition-all duration-300 group-hover:text-[var(--theme-accent-contrast)] ${
            isLeft ? 'group-hover:-translate-x-[2px]' : 'group-hover:translate-x-[2px]'
          }`}
        >
          <path
            d={isLeft ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export default function VideoCarouselSection({ section }: VideoCarouselSectionProps) {
  const t = useTranslations('Videos3DPage');
  const sectionTitle = t(`sections.${section.id}.title`);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const pages = useMemo(() => {
    const chunks = [];

    for (let i = 0; i < section.items.length; i += ITEMS_PER_PAGE) {
      chunks.push(section.items.slice(i, i + ITEMS_PER_PAGE));
    }

    return chunks;
  }, [section.items]);

  const totalPages = pages.length;
  const currentItems = pages[currentPage] ?? [];
  const gridColumnsClass = getGridColumnsClass(currentItems.length);

  function stopActiveVideo() {
    setActiveVideoId(null);
  }

  function goToPage(pageIndex: number) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    stopActiveVideo();
    setCurrentPage(pageIndex);
  }

  function goPrevious() {
    stopActiveVideo();

    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function goNext() {
    stopActiveVideo();

    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  }

  const showLeftArrow = totalPages > 1 && currentPage > 0;
  const showRightArrow = totalPages > 1 && currentPage < totalPages - 1;

  return (
    <motion.section
      id={section.id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className={`relative w-full ${activeVideoId ? 'z-[80]' : 'z-10'} `}
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        {/* HEADER */}
        {/* Cabeçalho da categoria: uma linha, não um bloco. O nome do serviço
            já vive no banner — repeti-lo em corpo 64 aqui empurrava os vídeos
            para fora da dobra sem informar nada de novo. */}
        <motion.div
          variants={headerAnimation}
          className="flex flex-col gap-3 border-b border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)] pb-5 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-['Outfit'] text-[11px] font-bold tracking-[0.22em] text-[var(--theme-accent)] uppercase">
              {t(`sections.${section.id}.eyebrow`)}
            </span>
            <h2 className="font-['Outfit'] text-[26px] leading-tight font-semibold text-[var(--theme-text)] md:text-[36px]">
              {sectionTitle}
            </h2>
          </div>

          <p className="max-w-[64ch] font-['Outfit'] text-[14px] leading-[1.6] text-[var(--theme-muted)] md:text-[15px]">
            {t(`sections.${section.id}.description`)}
          </p>
        </motion.div>

        {section.items.length > 0 && (
          <>
            {/* MÁSCARA DA TELA */}
            <AnimatePresence>
              {activeVideoId && (
                <motion.button
                  type="button"
                  aria-label={t('carousel.closeLabel')}
                  onClick={stopActiveVideo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[70] cursor-default bg-[var(--theme-video-mask)] backdrop-blur-md"
                />
              )}
            </AnimatePresence>

            {/* CARDS */}
            <div className="relative mt-4 overflow-visible">
              {showLeftArrow && !activeVideoId && (
                <CarouselArrow
                  direction="left"
                  onClick={goPrevious}
                  label={t('carousel.prevLabel', { title: sectionTitle })}
                />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${section.id}-page-${currentPage}`}
                  variants={itemsAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="w-full overflow-visible"
                >
                  <motion.div
                    variants={pageAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`grid ${gridColumnsClass} gap-4 overflow-visible`}
                  >
                    {currentItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemAnimation}
                        className={`relative w-full overflow-visible ${
                          activeVideoId === item.id ? 'z-[90]' : 'z-0'
                        } `}
                      >
                        <VideoCard
                          client={item.client}
                          project={item.project}
                          subtitle={item.subtitle}
                          vimeoId={item.vimeoId}
                          portrait={item.portrait}
                          isPlaying={activeVideoId === item.id}
                          onPlay={() => setActiveVideoId(item.id)}
                          onClose={() => setActiveVideoId(null)}
                          playLabel={t('carousel.openLabel', {
                            title: `${item.client} — ${item.project}`,
                          })}
                          closeLabel={t('carousel.closeLabel')}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {showRightArrow && !activeVideoId && (
                <CarouselArrow
                  direction="right"
                  onClick={goNext}
                  label={t('carousel.nextLabel', { title: sectionTitle })}
                />
              )}
            </div>

            {/* DOTS */}
            {totalPages > 0 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {pages.map((_, index) => {
                  const isActive = index === currentPage;

                  return (
                    <button
                      key={`${section.id}-dot-${index}`}
                      type="button"
                      aria-label={t('carousel.pageLabel', { page: index + 1 })}
                      onClick={() => goToPage(index)}
                      className={`h-[8px] w-[8px] rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--theme-accent)]'
                          : 'bg-[var(--theme-chip-border)] hover:bg-[var(--theme-border-strong)]'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
}
