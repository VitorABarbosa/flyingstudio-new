'use client';

import { useEffect, useState } from 'react';

/**
 * `true` quando o layout empilhado do celular está ativo (abaixo de md/768px).
 * Começa em `false` (SSR) e corrige no primeiro efeito — os consumidores usam
 * isso só para trocar comportamento visual, nunca conteúdo.
 */
export function useIsMobileLayout(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return isMobile;
}
