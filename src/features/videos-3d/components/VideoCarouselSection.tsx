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

/**
 * O carrossel é vitrine, não acervo: cada categoria mostra no máximo 2
 * páginas (8 vídeos). A lista completa vive no filtro da categoria, que
 * abre a visão em grade com tudo.
 */
const MAX_CAROUSEL_PAGES = 2;

/* Na última página, o CTA aponta para a tela exclusiva da categoria no site
   da Rinno Films — na cor dela, a mesma do fecho da página. */
const RINNO = '#ff00a4';
const RINNO_CATEGORY_URLS: Record<string, string> = {
  conceitos: 'https://rinnofilms.com.br/servicos/conceito',
  produtos: 'https://rinnofilms.com.br/servicos/produto',
  virais: 'https://rinnofilms.com.br/servicos/viral',
};

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

const EASE = [0.22, 1, 0.36, 1] as const;

/* Troca de página como carrossel de verdade: a página atual desliza para
   fora enquanto a nova entra pelo lado oposto — nada de apagar tudo e
   recomeçar. O `custom` carrega a direção da navegação (1 avança, -1 volta). */
const pageSlide = {
  enter: (direction: number) => ({ x: direction * 72, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE },
  },
  exit: (direction: number) => ({
    x: direction * -72,
    opacity: 0,
    transition: { duration: 0.32, ease: EASE },
  }),
};

/* Revelação do bloco de cards na primeira dobra (via whileInView da seção). */
const cardsReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 },
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
  const [direction, setDirection] = useState(1);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const pages = useMemo(() => {
    const chunks = [];

    for (let i = 0; i < section.items.length; i += ITEMS_PER_PAGE) {
      chunks.push(section.items.slice(i, i + ITEMS_PER_PAGE));
    }

    return chunks.slice(0, MAX_CAROUSEL_PAGES);
  }, [section.items]);

  const totalPages = pages.length;
  const currentItems = pages[currentPage] ?? [];
  const gridColumnsClass = getGridColumnsClass(currentItems.length);

  const rinnoCategoryUrl = RINNO_CATEGORY_URLS[section.id];
  const isLastPage = totalPages > 1 && currentPage === totalPages - 1;

  function stopActiveVideo() {
    setActiveVideoId(null);
  }

  function goToPage(pageIndex: number) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    stopActiveVideo();
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  }

  function goPrevious() {
    stopActiveVideo();
    setDirection(-1);

    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function goNext() {
    stopActiveVideo();
    setDirection(1);

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
          <h2 className="font-['Outfit'] text-[26px] leading-tight font-semibold text-[var(--theme-text)] md:text-[36px]">
            {sectionTitle}
          </h2>

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
            <motion.div variants={cardsReveal} className="relative mt-4 overflow-visible">
              {showLeftArrow && !activeVideoId && (
                <CarouselArrow
                  direction="left"
                  onClick={goPrevious}
                  label={t('carousel.prevLabel', { title: sectionTitle })}
                />
              )}

              {/* `popLayout`: a página que sai é tirada do fluxo e desliza
                  para fora enquanto a nova já entra pelo lado oposto — as
                  duas se cruzam em vez de sumir tudo e reaparecer. */}
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={`${section.id}-page-${currentPage}`}
                  custom={direction}
                  variants={pageSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full overflow-visible"
                >
                  <div className={`grid ${gridColumnsClass} gap-4 overflow-visible`}>
                    {currentItems.map((item) => (
                      <div
                        key={item.id}
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
                      </div>
                    ))}
                  </div>

                  {/* Fim da vitrine: daqui a leitura segue no acervo completo
                      da categoria, no site da Rinno. */}
                  {isLastPage && rinnoCategoryUrl && (
                    <div className="mt-7 flex justify-end">
                      <a
                        href={rinnoCategoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/rinno inline-flex items-center gap-[8px] font-['Outfit'] text-[15px] font-semibold transition-opacity duration-200 hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-none"
                        style={{ color: RINNO }}
                      >
                        {t('carousel.seeMoreRinno')}
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="-rotate-45 transition-transform duration-300 group-hover/rinno:translate-x-[3px]"
                        >
                          <path
                            d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {showRightArrow && !activeVideoId && (
                <CarouselArrow
                  direction="right"
                  onClick={goNext}
                  label={t('carousel.nextLabel', { title: sectionTitle })}
                />
              )}
            </motion.div>

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
