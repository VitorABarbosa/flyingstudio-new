'use client';

import { useEffect } from 'react';
import { gallerySections } from '@/features/imagens-3d/data/galleryData';

/**
 * Pré-carrega TODOS os mestres do acervo (3840 q85) em segundo plano assim
 * que o visitante entra no site — quando ele clicar no zoom da galeria, a
 * imagem já está no cache do navegador.
 *
 * Cuidados para não atrapalhar ninguém:
 * - só em desktop (mobile/dados móveis ficam de fora, e `saveData` é
 *   respeitado);
 * - começa depois do `load` + um respiro, para nunca competir com o
 *   conteúdo da página;
 * - 2 downloads por vez, em fila — banda sobra para a navegação.
 */
const CONCURRENCY = 2;
const START_DELAY_MS = 3500;

export default function AcervoZoomPrefetch() {
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    const connection = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const urls = [...new Set(gallerySections.flatMap((s) => s.items.map((i) => i.image)))];
    let cancelled = false;
    let index = 0;

    const next = () => {
      if (cancelled || index >= urls.length) return;
      const img = new Image();
      img.onload = next;
      img.onerror = next;
      img.src = urls[index++];
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    const start = () => {
      timer = setTimeout(() => {
        for (let k = 0; k < CONCURRENCY; k++) next();
      }, START_DELAY_MS);
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener('load', start);
    };
  }, []);

  return null;
}
