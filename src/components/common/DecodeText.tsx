'use client';

import { useCallback, useEffect, useRef } from 'react';

/** Glifos que passam antes de cada caractere assentar. */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=%';
/** Intervalo entre trocas de glifo (ms). Abaixo disso vira ruído. */
const SWAP_MS = 45;
/** Atraso entre o assentamento de um caractere e o seguinte (ms). */
const STAGGER_MS = 55;
/** Quanto tempo cada caractere fica embaralhado antes de assentar (ms). */
const HOLD_MS = 420;

type DecodeTextProps = {
  text: string;
  className?: string;
};

/**
 * Título que "decodifica": cada caractere passa por glifos aleatórios e
 * assenta da esquerda para a direita.
 *
 * Cada caractere vive num bloco de largura fixa (`0.68em`). Isso é o que
 * mantém a linha imóvel enquanto os glifos trocam — sem a célula fixa, cada
 * troca mudaria a largura da palavra e a linha inteira tremeria. De quebra, a
 * grade regular é o que dá a leitura de mostrador técnico.
 *
 * Reexecuta ao passar o mouse. Em `prefers-reduced-motion` nasce pronto.
 */
export default function DecodeText({ text, className = '' }: DecodeTextProps) {
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(0);
  const chars = [...text];

  const run = useCallback(() => {
    cancelAnimationFrame(frameRef.current);

    const source = [...text];
    const start = performance.now();
    let lastSwap = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const swap = now - lastSwap >= SWAP_MS;
      if (swap) {
        lastSwap = now;
      }

      let settled = 0;
      source.forEach((char, index) => {
        const el = cellRefs.current[index];
        if (!el) {
          return;
        }
        if (char === ' ') {
          settled += 1;
          return;
        }
        const done = elapsed >= HOLD_MS + index * STAGGER_MS;
        if (done) {
          settled += 1;
          if (el.textContent !== char) {
            el.textContent = char;
            el.style.removeProperty('--scrambling');
          }
          return;
        }
        if (swap) {
          el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          el.style.setProperty('--scrambling', '1');
        }
      });

      if (settled < source.length) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }
    run();
    return () => cancelAnimationFrame(frameRef.current);
  }, [run]);

  return (
    <span
      aria-label={text}
      onPointerEnter={() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          run();
        }
      }}
      className={`inline-flex select-none ${className}`}
    >
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          ref={(el) => {
            cellRefs.current[index] = el;
          }}
          /* Largura fixa: a linha não pode tremer enquanto os glifos trocam. */
          className="inline-block w-[0.68em] text-center"
          style={{
            // Enquanto embaralha, o caractere fica em accent; ao assentar, some.
            color:
              'color-mix(in srgb, var(--theme-accent) calc(var(--scrambling, 0) * 100%), var(--theme-text))',
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}
