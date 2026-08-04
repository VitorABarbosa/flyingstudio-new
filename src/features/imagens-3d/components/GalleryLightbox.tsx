'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { GalleryItem } from '../types/gallery.types';

/* Larguras servidas no lightbox — precisam existir em `deviceSizes` do Next. */

/** Tentativas extras quando o otimizador falha em servir a imagem. */
const MAX_LOAD_RETRIES = 4;

type Props = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (direction: number) => void;
};

export default function GalleryLightbox({ items, index, onClose, onStep }: Props) {
  const t = useTranslations('Images3DPage.lightbox');

  const item = items[index];

  /* Mesmo seguro do ImageBlock: se o otimizador falhar (original ainda sendo
     baixado), remonta o <img> com espera crescente em vez de ficar quebrado. */
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setLoadAttempt(0);
    setIsLoaded(false);
  }, [index]);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  function handleLoadError() {
    if (loadAttempt >= MAX_LOAD_RETRIES) return;

    retryTimerRef.current = setTimeout(
      () => {
        setLoadAttempt((current) => current + 1);
      },
      1200 * (loadAttempt + 1)
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onStep(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onStep(-1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onStep]);

  useEffect(() => {
    /* Trava o scroll da página (inclusive o Lenis) enquanto está aberto. */
    const windowWithLenis = window as unknown as {
      __lenis?: { stop?: () => void; start?: () => void };
    };

    windowWithLenis.__lenis?.stop?.();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      windowWithLenis.__lenis?.start?.();
    };
  }, []);

  useEffect(() => {
    /* Pré-carrega as vizinhas para a navegação não esperar download. */
    [1, -1].forEach((direction) => {
      const neighbor = items[(index + direction + items.length) % items.length];

      if (!neighbor) return;

      const preload = new Image();
      preload.src = neighbor.image;
    });
  }, [items, index]);

  if (!item) return null;

  const buttonClass = `
    absolute z-10 flex h-11 w-11 cursor-pointer items-center justify-center
    rounded-full border border-white/15 bg-white/5 text-white/80
    backdrop-blur-md
    transition-colors duration-200
    hover:bg-white/15 hover:text-white
    focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none
  `;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* O zoom de entrada/saída vive neste wrapper — roda uma vez ao abrir e
          ao fechar. A troca de imagem na navegação é só o fade do <img>. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-[86vh] max-w-[92vw] items-center justify-center"
      >
        {/* Spinner discreto enquanto o otimizador prepara a imagem. */}
        {!isLoaded && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/15 border-t-white/70"
          />
        )}

        {/* O mestre 3840 q85 DIRETO do servidor, sem otimizador: a qualidade
            calibrada do acervo chega intacta ao zoom. O AcervoZoomPrefetch
            (no layout) já vem baixando tudo em segundo plano. */}
        <motion.img
          key={`${item.id}-${loadAttempt}`}
          src={item.image}
          onLoad={() => setIsLoaded(true)}
          onError={handleLoadError}
          sizes="92vw"
          alt={item.title}
          draggable={false}
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-h-[86vh] max-w-[92vw] select-none object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        />
      </motion.div>

      {/* Legenda na mesma sutileza dos títulos do mosaico. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
      >
        <p className="font-['Outfit'] text-[13px] font-medium tracking-[0.04em] text-white/75">
          {item.title}
        </p>
      </motion.div>

      <motion.button
        type="button"
        aria-label={t('previous')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        onClick={(event) => {
          event.stopPropagation();
          onStep(-1);
        }}
        className={`${buttonClass} left-3 top-1/2 -translate-y-1/2 md:left-6`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <motion.button
        type="button"
        aria-label={t('next')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        onClick={(event) => {
          event.stopPropagation();
          onStep(1);
        }}
        className={`${buttonClass} right-3 top-1/2 -translate-y-1/2 md:right-6`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <motion.button
        type="button"
        aria-label={t('close')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className={`${buttonClass} right-3 top-3 md:right-6 md:top-6`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>
    </motion.div>,
    document.body
  );
}
