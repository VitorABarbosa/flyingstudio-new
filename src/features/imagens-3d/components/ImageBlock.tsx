'use client';

import { useEffect, useRef, useState } from 'react';

/** Tentativas extras quando o otimizador falha em servir a imagem. */
const MAX_LOAD_RETRIES = 4;

/* Larguras servidas ao navegador. Precisam existir em `deviceSizes` do Next
   (padrão: 640, 750, 828, 1080, 1200, 1920, 2048, 3840). */
const RESPONSIVE_WIDTHS = [828, 1200, 1920] as const;

/**
 * O acervo é remoto e em resolução de trabalho — cada arquivo passa de 25 MB.
 * Nada disso pode chegar ao navegador: o que vai no `src` é o otimizador do
 * Next, que baixa o original uma vez e devolve AVIF/WebP na largura pedida.
 *
 * A proporção sobrevive ao redimensionamento, então `naturalWidth/Height` — de
 * onde sai a proporção usada pelo mosaico — continua correta.
 */
export function optimized(src: string, width: number) {
  if (!src.startsWith('http')) {
    return src;
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=70`;
}

type Props = {
  src: string;
  title?: string;
  className?: string;
  isHovered?: boolean;
  onAspectRatioChange?: (ratio: number) => void;
};

export default function ImageBlock({
  src,
  title,
  className = '',
  isHovered = false,
  onAspectRatioChange,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  function reportAspectRatio() {
    const img = imgRef.current;

    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    onAspectRatioChange?.(img.naturalWidth / img.naturalHeight);
  }

  function handleLoad() {
    setIsLoaded(true);
    reportAspectRatio();
  }

  /**
   * O primeiro pedido de uma imagem do acervo pode falhar: o otimizador ainda
   * está baixando o original de ~28 MB (ou a fila está cheia) e responde erro
   * — e um <img> quebrado não tenta de novo sozinho. Remontamos com espera
   * crescente; na retentativa o original já costuma estar em cache.
   */
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
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setLoadAttempt(0);

    // Imagem que veio do cache dispara `load` antes da hidratação — mede aqui.
    if (imgRef.current?.complete && imgRef.current.naturalWidth) {
      setIsLoaded(true);
      reportAspectRatio();
    } else {
      setIsLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    /* Enquanto a imagem não chega, o painel pulsa como skeleton — e uma
       imagem que falhou fica invisível (painel liso) em vez do ícone
       quebrado do navegador, enquanto o retry trabalha. */
    <div
      className={`
        relative h-full w-full overflow-hidden
        bg-[var(--theme-panel)]
        ${isLoaded ? '' : 'animate-pulse'}
        ${className}
      `}
    >
      {/* O container é uma janela centrada sobre a imagem em proporção
          natural: quando ele alarga, revela mais imagem pelos dois lados.
          A imagem em si nunca muda de escala — sem zoom. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          key={loadAttempt}
          ref={imgRef}
          src={optimized(src, 1920)}
          srcSet={
            src.startsWith('http')
              ? RESPONSIVE_WIDTHS.map((w) => `${optimized(src, w)} ${w}w`).join(', ')
              : undefined
          }
          sizes="(max-width: 768px) 100vw, 70vw"
          alt={title ?? ''}
          draggable={false}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleLoadError}
          className={`
            pointer-events-none select-none
            h-full w-auto min-w-full max-w-none flex-none
            object-cover object-center
            transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>

      {/* Nome do cliente/projeto: presença discreta — identifica a obra sem
          competir com a imagem. */}
      <div
        className={`
          pointer-events-none
          absolute inset-x-0 bottom-0 z-30
          flex h-[72px] items-end
          bg-gradient-to-t from-black/50 via-black/20 to-transparent
          px-5 pb-4
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }
        `}
      >
        <p
          className="
            text-left
            font-['Outfit']
            text-[12px]
            font-medium
            leading-tight
            tracking-[0.04em]
            text-white/75
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
}
