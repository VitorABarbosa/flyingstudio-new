'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ImageBlock from './ImageBlock';
import GalleryLightbox from './GalleryLightbox';
import type { GallerySectionType } from '../types/gallery.types';

type GallerySectionProps = {
  section: GallerySectionType;
};

const INITIAL_VISIBLE_ITEMS = 17;

/**
 * O "Ver mais" revela a galeria em lotes: cada clique acrescenta este número
 * de fileiras, em vez de abrir o restante inteiro de uma vez.
 */
const ROWS_PER_CHUNK = 5;

/* Fileiras de 3 e 4 (antes 2 e 3): com mais imagens dividindo a largura,
   nenhuma combinação de proporções preenche a linha com exatidão — sempre
   sobra folga para o hover revelar — e as linhas ficam naturalmente mais
   baixas. */
const DEFAULT_ROW_SIZES = [3, 4, 3, 4, 3, 4, 3];
/* Fachadas tem 12 imagens: três fileiras cheias de 4, sem sobras. */
const FACHADAS_ROW_SIZES = [4, 4, 4];

/**
 * Depois das 17 imagens iniciais, o restante começa com linha de 4 imagens.
 */
const EXTRA_ROW_SIZES = [4, 3, 4, 3, 4, 3, 4];

/* Alturas em escala de "uma linha cabe confortável na tela": linhas do
   padrão ~metade de um monitor 1080p, e mesmo a linha mais alta (verticais
   comprimidas, ver MAX_ROW_HEIGHT) nunca passa de um viewport. */
const DEFAULT_ROW_HEIGHT = 440;
const ROW_GAP = 12;

/**
 * Largura mínima que cada vizinho preserva quando uma imagem da linha
 * expande — a imagem em hover nunca invade esse espaço.
 */
const MIN_SQUEEZED_WIDTH_BY_ROW_LENGTH: Record<number, number> = {
  2: 220,
  3: 120,
  4: 90,
};

/**
 * Compressão-alvo do estado base: cada container fica com no máximo ~80% da
 * largura natural da própria imagem. É o que garante folga para a expansão
 * no hover — sem isso, linhas com imagens quadradas/verticais cabem inteiras
 * na largura da linha e o hover não teria nada para revelar.
 */
const BASE_COMPRESSION = 0.8;

/**
 * Teto para a altura que uma linha pode atingir ao esticar para comprimir
 * imagens verticais (caso extremo: linha só de verticais). Abaixo de um
 * viewport comum: nenhuma linha sozinha deve passar da tela.
 */
const MAX_ROW_HEIGHT = 760;

/**
 * Multiplicador aplicado a todo flex-grow. Regra do flexbox: se a soma dos
 * grows de uma linha fica abaixo de 1 (ex.: hover deixando um único vizinho
 * vertical, proporção < 1), a linha distribui só essa fração do espaço livre
 * e sobra um vão desalinhado no final. O multiplicador preserva as proporções
 * entre as imagens e garante soma sempre >= 1.
 */
const GROW_SCALE = 10;

/**
 * Proporção usada enquanto a imagem remota ainda não carregou/foi medida.
 * 16:9 é o formato dominante do acervo; quando a real chega, o layout anima
 * suavemente para a proporção correta.
 */
const FALLBACK_ASPECT_RATIO = 16 / 9;

const sectionContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const imagesContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};

const imageAnimation = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
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

function getSectionRowPattern(sectionId: string) {
  if (sectionId === 'fachadas') {
    return FACHADAS_ROW_SIZES;
  }

  return DEFAULT_ROW_SIZES;
}

function buildImageRows<T>(items: T[], rowSizes: number[]): T[][] {
  const rows: T[][] = [];

  let currentIndex = 0;
  let rowSizeIndex = 0;

  while (currentIndex < items.length) {
    const nextRowSize = rowSizes[rowSizeIndex % rowSizes.length];
    const rowSize = Math.min(nextRowSize, items.length - currentIndex);

    rows.push(items.slice(currentIndex, currentIndex + rowSize));

    currentIndex += rowSize;
    rowSizeIndex += 1;
  }

  /* Sobra de 1 imagem no fim viraria um banner de largura cheia, sem hover.
     Empresta uma imagem da fileira anterior para fechar com pelo menos 2. */
  if (rows.length > 1) {
    const lastRow = rows[rows.length - 1];
    const previousRow = rows[rows.length - 2];

    if (lastRow.length === 1 && previousRow.length > 2) {
      const borrowed = previousRow.pop();

      if (borrowed) {
        lastRow.unshift(borrowed);
      }
    }
  }

  return rows;
}

export default function GallerySection({ section }: GallerySectionProps) {
  const t = useTranslations('Images3DPage');
  const [activeFilter, setActiveFilter] = useState('geral');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [visibleChunkCount, setVisibleChunkCount] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const [rowWidths, setRowWidths] = useState<Record<number, number>>({});

  const rowObserversRef = useRef<Record<number, ResizeObserver>>({});
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setRowRef(rowIndex: number, element: HTMLDivElement | null) {
    if (rowObserversRef.current[rowIndex]) {
      rowObserversRef.current[rowIndex].disconnect();
      delete rowObserversRef.current[rowIndex];
    }

    if (!element) return;

    const updateWidth = () => {
      const width = element.offsetWidth;

      setRowWidths((current) => {
        if (current[rowIndex] === width) return current;

        return {
          ...current,
          [rowIndex]: width,
        };
      });
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    rowObserversRef.current[rowIndex] = observer;
  }

  useEffect(() => {
    function handleFilter(event: Event) {
      const customEvent = event as CustomEvent<{ filter: string }>;

      setActiveFilter(customEvent.detail.filter);
      setHoveredItemId(null);
      setVisibleChunkCount(1);
      setLightboxIndex(null);
    }

    window.addEventListener('gallery-filter-change', handleFilter);

    return () => {
      window.removeEventListener('gallery-filter-change', handleFilter);

      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }

      Object.values(rowObserversRef.current).forEach((observer) => {
        observer.disconnect();
      });

      rowObserversRef.current = {};
    };
  }, []);

  function clearLeaveTimeout() {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }

  function handleRowPointerOver(event: PointerEvent<HTMLDivElement>) {
    // Em touch não existe hover de verdade — expandir no toque atrapalha o
    // scroll e trava o layout empilhado do mobile.
    if (event.pointerType === 'touch') return;

    const target = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-gallery-item-id]'
    );

    if (!target) return;

    const itemId = target.dataset.galleryItemId;

    if (!itemId) return;

    clearLeaveTimeout();

    setHoveredItemId((current) => {
      if (current === itemId) return current;
      return itemId;
    });
  }

  function handleRowPointerLeave() {
    clearLeaveTimeout();

    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredItemId(null);
    }, 160);
  }

  function handleAspectRatioChange(itemId: string, ratio: number) {
    setImageAspectRatios((current) => {
      const existing = current[itemId];

      if (existing && Math.abs(existing - ratio) < 0.01) return current;

      return {
        ...current,
        [itemId]: ratio,
      };
    });
  }

  function handleShowMoreRows() {
    const currentScrollY = window.scrollY;

    setHoveredItemId(null);
    setVisibleChunkCount((current) => current + 1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const windowWithLenis = window as unknown as {
          __lenis?: {
            scrollTo: (
              target: number,
              options?: {
                immediate?: boolean;
              }
            ) => void;
          };
        };

        if (windowWithLenis.__lenis) {
          windowWithLenis.__lenis.scrollTo(currentScrollY, {
            immediate: true,
          });
          return;
        }

        window.scrollTo({
          top: currentScrollY,
          behavior: 'auto',
        });
      });
    });
  }

  function handleOpenLightbox(itemId: string) {
    const index = section.items.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      setLightboxIndex(index);
    }
  }

  function handleStepLightbox(direction: number) {
    setLightboxIndex((current) => {
      if (current === null) return current;

      return (current + direction + section.items.length) % section.items.length;
    });
  }

  const shouldShowSection = section.id === activeFilter;

  if (!shouldShowSection) {
    return null;
  }

  type GalleryItem = GallerySectionType['items'][number];

  const visibleItems = section.items.slice(0, INITIAL_VISIBLE_ITEMS);
  const extraItems = section.items.slice(INITIAL_VISIBLE_ITEMS);

  /* Todas as fileiras da seção, na sequência definitiva: as 17 primeiras
     imagens seguem o padrão da seção e o restante continua a alternância
     a partir de linha de 4. */
  const allRows: GalleryItem[][] = [
    ...buildImageRows(visibleItems, getSectionRowPattern(section.id)),
    ...(extraItems.length > 0 ? buildImageRows(extraItems, EXTRA_ROW_SIZES) : []),
  ];

  /* Lotes de ROWS_PER_CHUNK fileiras: cada "Ver mais" libera o próximo lote. */
  const rowChunks: GalleryItem[][][] = [];

  for (let index = 0; index < allRows.length; index += ROWS_PER_CHUNK) {
    rowChunks.push(allRows.slice(index, index + ROWS_PER_CHUNK));
  }

  const visibleChunks = rowChunks.slice(0, visibleChunkCount);
  const hasMoreImages = visibleChunkCount < rowChunks.length;

  function renderImageRow(
    row: GalleryItem[],
    rowIndex: number,
    observerIndex: number,
    keyPrefix: string
  ) {
    const patternHeight = DEFAULT_ROW_HEIGHT;
    const rowWidth = rowWidths[observerIndex] ?? 0;

    /* Largura útil da linha (descontando os gaps entre as imagens). */
    const innerWidth = rowWidth - ROW_GAP * (row.length - 1);

    const aspectRatios = row.map(
      (item) => imageAspectRatios[item.id] ?? FALLBACK_ASPECT_RATIO
    );
    const totalAspect = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);

    const canExpand = row.length > 1 && innerWidth > 0;

    /* Linha com imagens quadradas/verticais pode caber inteira na largura —
       aí não haveria o que revelar no hover. A linha estica em altura até
       todo container ficar comprimido (BASE_COMPRESSION do natural). */
    const rowHeight = canExpand
      ? Math.min(
          MAX_ROW_HEIGHT,
          Math.max(
            patternHeight,
            Math.round(innerWidth / (BASE_COMPRESSION * totalAspect))
          )
        )
      : patternHeight;

    const minSqueezedWidth =
      MIN_SQUEEZED_WIDTH_BY_ROW_LENGTH[row.length] ?? 90;

    return (
      <motion.div
        ref={(element) => setRowRef(observerIndex, element)}
        key={`${section.id}-${keyPrefix}-row-${rowIndex}`}
        onPointerOver={handleRowPointerOver}
        onPointerLeave={handleRowPointerLeave}
        variants={imageAnimation}
        animate={{
          height: rowHeight,
        }}
        transition={{
          height: {
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="
          flex w-full flex-col gap-3 overflow-hidden
          md:flex-row
        "
      >
        {row.map((item, itemIndex) => {
          const isHovered = hoveredItemId === item.id;
          const aspectRatio = aspectRatios[itemIndex];

          /* Estado base: cada container recebe fatia proporcional à proporção
             real da imagem — todas ficam comprimidas pelo MESMO fator, cada
             uma mostrando o centro da própria imagem, com espaço reservado
             para expandir. */

          /* Largura em que a imagem aparece inteira nesta altura de linha. */
          const naturalWidth = aspectRatio * rowHeight;
          const baseWidth = canExpand
            ? (innerWidth * aspectRatio) / totalAspect
            : 0;

          /* Hover: expande até a proporção natural, limitado ao espaço da
             linha menos o mínimo dos vizinhos. Nunca abaixo da largura base —
             se a imagem já cabe inteira, o hover não encolhe nada. */
          const maxExpandedWidth =
            innerWidth - minSqueezedWidth * (row.length - 1);
          const expandedWidth = Math.max(
            baseWidth,
            Math.min(naturalWidth, maxExpandedWidth)
          );

          const shouldExpand = isHovered && canExpand;

          /* Só o item em hover muda de valores: ao ganhar largura, ele empurra
             os vizinhos, que dividem o espaço restante na mesma proporção do
             estado base — encolhem juntos e nunca crescem. */
          return (
            <motion.div
              key={item.id}
              data-gallery-item-id={item.id}
              onClick={() => handleOpenLightbox(item.id)}
              variants={imageAnimation}
              animate={
                shouldExpand
                  ? {
                      flexGrow: 0,
                      flexBasis: `${expandedWidth}px`,
                      flexShrink: 0,
                    }
                  : {
                      flexGrow: aspectRatio * GROW_SCALE,
                      flexBasis: '0px',
                      flexShrink: 1,
                    }
              }
              transition={{
                flexGrow: {
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1],
                },
                flexBasis: {
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="
                h-[360px] min-w-0 cursor-zoom-in overflow-hidden
                md:h-full
              "
            >
              <ImageBlock
                src={item.image}
                title={item.title}
                isHovered={isHovered}
                className="h-full w-full"
                onAspectRatioChange={(ratio) =>
                  handleAspectRatioChange(item.id, ratio)
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.section
      id={section.id}
      className="w-full z-10"
      variants={sectionContainer}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        {/* O cabeçalho da categoria (título + descrição) vive inteiro na
            GalleryFilterBar, que persiste acima das seções. */}
        <LayoutGroup id={`gallery-${section.id}`}>
          <div className="relative">
            {visibleChunks.map((chunk, chunkIndex) => (
              <motion.div
                key={`${section.id}-chunk-${chunkIndex}`}
                variants={imagesContainer}
                initial="hidden"
                animate="show"
                className={`${chunkIndex === 0 ? 'mt-6' : 'mt-3'} flex flex-col gap-3`}
              >
                {chunk.map((row, rowIndex) =>
                  renderImageRow(
                    row,
                    rowIndex,
                    chunkIndex * ROWS_PER_CHUNK + rowIndex,
                    `chunk-${chunkIndex}`
                  )
                )}
              </motion.div>
            ))}

            {hasMoreImages && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  pointer-events-auto
                  absolute inset-x-0 bottom-0 z-40
                  flex h-[200px] items-end justify-center
                  bg-gradient-to-t
                  from-[var(--theme-bg)]
                  via-[color-mix(in_srgb,var(--theme-bg)_72%,transparent)]
                  to-transparent
                  pb-8
                "
              >
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={handleShowMoreRows}
                  className="cursor-pointer rounded-full border border-[color-mix(in_srgb,var(--theme-text)_16%,transparent)] bg-[var(--theme-surface)] px-7 py-3 font-['Outfit'] text-[14px] font-semibold text-[var(--theme-text)] shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
                >
                  {t('seeMoreLabel')}
                </button>
              </motion.div>
            )}
          </div>
        </LayoutGroup>

        {/* Fecho da categoria: filete + convite, na mesma leitura do topo. */}
        <motion.div
          variants={imageAnimation}
          className="mt-[clamp(2.5rem,6vh,4rem)] flex flex-col items-center gap-6 border-t border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)] pt-[clamp(1.75rem,4vh,2.75rem)]"
        >
          <p className="max-w-[46ch] text-center font-['Outfit'] text-[clamp(1.05rem,1.7vw,1.5rem)] leading-[1.3] font-semibold text-[var(--theme-text)]">
            {t('ctaHeadline')}
          </p>

          <button
            type="button"
            onClick={() => {
              window.open(
                'https://wa.me/5511993443369?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Flying%20Studio%20e%20quero%20minha%20perspectiva!',
                '_blank'
              );
            }}
            className="inline-flex cursor-pointer items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[30px] py-[16px] font-['Outfit'] text-[15px] leading-none font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            {t('ctaLabel')}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={section.items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onStep={handleStepLightbox}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
