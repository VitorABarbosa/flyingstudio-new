'use client';

import { useEffect } from 'react';

const DESIGN_WIDTH = 1920;
const MAX_SCALE = 1.25;

/**
 * Atualiza a CSS variable `--design-scale` no elemento raiz com base na
 * largura do viewport. Substitui os ResizeObservers individuais por um
 * único listener global. Sem piso de escala — em mobile o canvas é
 * reduzido proporcionalmente para caber sem corte lateral. Teto em 1.25
 * para evitar elementos gigantes em 4K.
 */
export default function DesignScaleProvider() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const raw = window.innerWidth / DESIGN_WIDTH;
      const clamped = Math.min(raw, MAX_SCALE);
      root.style.setProperty('--design-scale', String(clamped));
    };

    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return null;
}
