import type { CSSProperties, ReactNode } from 'react';

type SectionScaleFrameProps = {
  children: ReactNode;
  designHeight: number;
  designWidth?: number;
  className?: string;
  /** Overflow do container externo. Hero usa 'visible' para o brilho do glow. */
  overflow?: 'hidden' | 'visible';
  /** Atributos pass-through (id, ref…) opcionais. */
  id?: string;
  style?: CSSProperties;
};

/**
 * Wrapper de escala fiel ao Figma. Posiciona o conteúdo num canvas de
 * `designWidth × designHeight` (default 1920×N) e aplica
 * `transform: scale(var(--design-scale))` controlado globalmente pelo
 * `DesignScaleProvider`. Sem JS de medição: a escala vem via CSS variable.
 */
export default function SectionScaleFrame({
  children,
  designHeight,
  designWidth = 1920,
  className,
  overflow = 'hidden',
  id,
  style,
}: SectionScaleFrameProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: `calc(${designHeight}px * var(--design-scale))`,
        overflow,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          transform: 'translateX(-50%) scale(var(--design-scale))',
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
