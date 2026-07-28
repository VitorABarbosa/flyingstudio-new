'use client';

import { useEffect, useRef } from 'react';

/**
 * ViewportScaler
 *
 * Escala proporcionalmente todo o conteúdo (1920px de largura de design)
 * para caber em qualquer viewport, preservando 100% do layout Figma.
 *
 * scale = window.innerWidth / 1920
 * - Desktop 1920px → scale 1.0 (sem alteração)
 * - Desktop 1440px → scale 0.75
 * - Tablet  768px  → scale 0.40
 * - Mobile  390px  → scale 0.203
 *
 * Como transform: scale() não afeta o layout flow, o wrapper externo
 * recebe altura corrigida = altura real do conteúdo × scale.
 */
export default function ViewportScaler({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const inner = innerRef.current;
      const outer = outerRef.current;
      if (!inner || !outer) return;

      const scale = window.innerWidth / 1920;
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = '0 0';
      outer.style.height = `${inner.scrollHeight * scale}px`;
    }

    update();
    const resizeObserver = new ResizeObserver(() => {
      update();
    });

    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }

    window.addEventListener('resize', update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ width: '100%', overflowX: 'hidden', overflowY: 'visible' }}>
      <div ref={innerRef} style={{ width: '1920px' }}>
        {children}
      </div>
    </div>
  );
}
