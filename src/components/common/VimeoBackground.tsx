'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Iframe do Vimeo em modo background com juízo de memória no celular.
 *
 * `display: none` não impede iframe de carregar, e um player em loop segura
 * decodificador de vídeo + heap para sempre — um dos assassinos da aba do
 * Safari no iPhone ("um problema ocorreu repetidamente"). Aqui:
 * - desktop (≥1024px): monta uma vez e permanece — comportamento de sempre;
 * - celular: o player só existe enquanto a seção está a até ~meia tela do
 *   viewport. Saiu do alcance, o iframe desmonta e libera o decodificador;
 *   voltou, remonta e o loop recomeça.
 */
export default function VimeoBackground({ src, className }: { src: string; className?: string }) {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setMount(true);
      return;
    }
    const holder = holderRef.current;
    if (!holder) return;
    const observer = new IntersectionObserver(([entry]) => setMount(entry.isIntersecting), {
      rootMargin: '50% 0px',
    });
    observer.observe(holder);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holderRef} className="h-full w-full">
      {mount && (
        <iframe
          src={src}
          title=""
          allow="autoplay"
          loading="lazy"
          aria-hidden="true"
          className={className ?? 'pointer-events-none h-full w-full border-0'}
        />
      )}
    </div>
  );
}
