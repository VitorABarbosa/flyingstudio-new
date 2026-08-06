'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ImageBlock from '@/features/imagens-3d/components/ImageBlock';
import GalleryLightbox from '@/features/imagens-3d/components/GalleryLightbox';
import { useIsMobileLayout } from '@/lib/useIsMobileLayout';
import type { GalleryItem } from '@/features/imagens-3d/types/gallery.types';

/**
 * O mosaico do case: TODAS as imagens do projeto, das mais impactantes para
 * as demais, de ponta a ponta da tela — a MESMA mecânica da galeria de
 * Perspectivas. Cada fileira comprime as imagens proporcionalmente; no hover,
 * só a imagem apontada expande até a proporção natural (as vizinhas encolhem
 * juntas e nunca crescem); clique abre o zoom.
 *
 * As 4 primeiras fileiras ficam visíveis, a quarta esmaecendo sob um degradê
 * com o "Ver mais" — o mesmo fecho da galeria.
 */

const ROW_SIZES = [3, 4];
const VISIBLE_ROWS = 4;
const ROW_GAP = 12;
const DEFAULT_ROW_HEIGHT = 420;
const MAX_ROW_HEIGHT = 720;
const BASE_COMPRESSION = 0.8;
const GROW_SCALE = 10;
const FALLBACK_ASPECT_RATIO = 16 / 9;
const MIN_SQUEEZED_WIDTH = 100;

const imageAnimation = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function buildRows<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  let index = 0;
  let sizeIndex = 0;

  while (index < items.length) {
    const size = Math.min(ROW_SIZES[sizeIndex % ROW_SIZES.length], items.length - index);
    rows.push(items.slice(index, index + size));
    index += size;
    sizeIndex += 1;
  }

  /* Sobra de 1 imagem no fim viraria um banner sem hover — empresta uma da
     fileira anterior para fechar com pelo menos 2 (regra da galeria). */
  if (rows.length > 1) {
    const lastRow = rows[rows.length - 1];
    const previousRow = rows[rows.length - 2];
    if (lastRow.length === 1 && previousRow.length > 2) {
      const borrowed = previousRow.pop();
      if (borrowed) lastRow.unshift(borrowed);
    }
  }

  return rows;
}

export default function CaseDetailMosaic({ title, images }: { title: string; images: string[] }) {
  const t = useTranslations('CasesPage.detail');
  /* Celular: sem mosaico comprimido — cada imagem inteira, empilhada. */
  const isMobile = useIsMobileLayout();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const [rowWidths, setRowWidths] = useState<Record<number, number>>({});

  const rowObserversRef = useRef<Record<number, ResizeObserver>>({});
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items: GalleryItem[] = images.map((src, index) => ({
    id: `mosaic-${index}`,
    title,
    image: src,
  }));

  const rows = buildRows(items);
  const visibleRows = rows.slice(0, VISIBLE_ROWS);
  const extraRows = rows.slice(VISIBLE_ROWS);
  const hasMore = extraRows.length > 0;

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      Object.values(rowObserversRef.current).forEach((observer) => observer.disconnect());
      rowObserversRef.current = {};
    };
  }, []);

  function setRowRef(rowIndex: number, element: HTMLDivElement | null) {
    rowObserversRef.current[rowIndex]?.disconnect();
    delete rowObserversRef.current[rowIndex];
    if (!element) return;

    const updateWidth = () => {
      const width = element.offsetWidth;
      setRowWidths((current) => (current[rowIndex] === width ? current : { ...current, [rowIndex]: width }));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    rowObserversRef.current[rowIndex] = observer;
  }

  function handleRowPointerOver(event: PointerEvent<HTMLDivElement>) {
    /* Em touch não existe hover — expandir no toque atrapalha o scroll. */
    if (event.pointerType === 'touch') return;

    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-mosaic-item-id]');
    if (!target?.dataset.mosaicItemId) return;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredItemId(target.dataset.mosaicItemId);
  }

  function handleRowPointerLeave() {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => setHoveredItemId(null), 160);
  }

  function handleExpand() {
    /* Preserva a posição do scroll — sem isso o Lenis "pula" quando a página
       ganha altura de repente (mesmo seguro da galeria). */
    const currentScrollY = window.scrollY;
    setHoveredItemId(null);
    setIsExpanded(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const windowWithLenis = window as unknown as {
          __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void };
        };
        if (windowWithLenis.__lenis) {
          windowWithLenis.__lenis.scrollTo(currentScrollY, { immediate: true });
          return;
        }
        window.scrollTo({ top: currentScrollY, behavior: 'auto' });
      });
    });
  }

  function renderRow(row: GalleryItem[], globalRowIndex: number) {
    const rowWidth = rowWidths[globalRowIndex] ?? 0;
    const innerWidth = rowWidth - ROW_GAP * (row.length - 1);
    const ratios = row.map((item) => aspectRatios[item.id] ?? FALLBACK_ASPECT_RATIO);
    const totalAspect = ratios.reduce((sum, ratio) => sum + ratio, 0);
    const canExpand = row.length > 1 && innerWidth > 0;

    const rowHeight = canExpand
      ? Math.min(
          MAX_ROW_HEIGHT,
          Math.max(DEFAULT_ROW_HEIGHT, Math.round(innerWidth / (BASE_COMPRESSION * totalAspect)))
        )
      : DEFAULT_ROW_HEIGHT;

    return (
      <motion.div
        ref={(element) => setRowRef(globalRowIndex, element)}
        key={`mosaic-row-${globalRowIndex}`}
        onPointerOver={handleRowPointerOver}
        onPointerLeave={handleRowPointerLeave}
        variants={imageAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        animate={isMobile ? { height: 'auto' } : { height: rowHeight }}
        transition={{ height: { duration: 1.15, ease: [0.22, 1, 0.36, 1] } }}
        className="flex w-full flex-col gap-3 overflow-hidden md:flex-row"
      >
        {row.map((item, itemIndex) => {
          const isHovered = hoveredItemId === item.id;
          const aspectRatio = ratios[itemIndex];

          const naturalWidth = aspectRatio * rowHeight;
          const baseWidth = canExpand ? (innerWidth * aspectRatio) / totalAspect : 0;
          const maxExpandedWidth = innerWidth - MIN_SQUEEZED_WIDTH * (row.length - 1);
          const expandedWidth = Math.max(baseWidth, Math.min(naturalWidth, maxExpandedWidth));
          const shouldExpand = isHovered && canExpand;

          return (
            <motion.div
              key={item.id}
              data-mosaic-item-id={item.id}
              onClick={() => setLightboxIndex(items.findIndex((i) => i.id === item.id))}
              animate={
                isMobile
                  ? { flexGrow: 0, flexBasis: 'auto', flexShrink: 1 }
                  : shouldExpand
                    ? { flexGrow: 0, flexBasis: `${expandedWidth}px`, flexShrink: 0 }
                    : { flexGrow: aspectRatio * GROW_SCALE, flexBasis: '0px', flexShrink: 1 }
              }
              transition={{
                flexGrow: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                flexBasis: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
              }}
              style={isMobile ? { aspectRatio: String(aspectRatio) } : undefined}
              className="h-auto w-full min-w-0 cursor-zoom-in overflow-hidden md:h-full"
            >
              <ImageBlock
                src={item.image}
                title={item.title}
                isHovered={isHovered}
                className="h-full w-full"
                onAspectRatioChange={(ratio) =>
                  setAspectRatios((current) =>
                    current[item.id] && Math.abs(current[item.id] - ratio) < 0.01
                      ? current
                      : { ...current, [item.id]: ratio }
                  )
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <section className="mt-14 w-full md:mt-20">
      {/* Ponta a ponta: sem container, só o gap entre as imagens */}
      <div className="relative">
        <div className="flex w-full flex-col gap-3">
          {visibleRows.map((row, rowIndex) => renderRow(row, rowIndex))}
        </div>

        {isExpanded && hasMore && (
          <div className="mt-3 flex w-full flex-col gap-3">
            {extraRows.map((row, rowIndex) => renderRow(row, visibleRows.length + rowIndex))}
          </div>
        )}

        {/* A última fileira visível esmaece sob o degradê com o convite —
            o mesmo fecho da galeria de Perspectivas. */}
        {!isExpanded && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute inset-x-0 bottom-0 z-40 flex h-[280px] items-end justify-center bg-gradient-to-t from-[var(--theme-bg)] via-[color-mix(in_srgb,var(--theme-bg)_72%,transparent)] to-transparent pb-8"
          >
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleExpand}
              className="cursor-pointer rounded-full border border-[color-mix(in_srgb,var(--theme-text)_16%,transparent)] bg-[var(--theme-surface)] px-7 py-3 font-['Outfit'] text-[14px] font-semibold text-[var(--theme-text)] shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
            >
              {t('seeMore')}
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onStep={(direction) =>
              setLightboxIndex((current) =>
                current === null ? current : (current + direction + items.length) % items.length
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
