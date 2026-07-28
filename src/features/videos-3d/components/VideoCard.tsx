'use client';

import { useEffect, useRef, useState } from 'react';

type VideoCardProps = {
  /** Incorporadora ou construtora — o destaque em accent. */
  client: string;
  /** Nome do empreendimento. */
  project: string;
  subtitle?: string;
  vimeoId: string;
  portrait?: boolean;
  isPlaying?: boolean;
  onPlay?: () => void;
  onClose?: () => void;
  playLabel: string;
  closeLabel: string;
};

/**
 * Cache de capas por id, no escopo do módulo: o mesmo vídeo pode aparecer em
 * mais de uma página do carrossel sem repetir a requisição.
 */
const thumbnailCache = new Map<string, string>();

/**
 * Busca a capa no oEmbed público do Vimeo.
 *
 * É assim que o card tem thumbnail sem nenhum arquivo no repositório: a URL da
 * imagem não é derivável do id do vídeo — depende de um hash que só o Vimeo
 * conhece —, então ou se pergunta a ele, ou se versiona a imagem. Só perguntamos
 * quando o card entra na tela.
 */
function useVimeoThumbnail(vimeoId: string, enabled: boolean) {
  const [url, setUrl] = useState<string | null>(() => thumbnailCache.get(vimeoId) ?? null);

  useEffect(() => {
    if (!enabled || url) {
      return;
    }
    let cancelled = false;
    const endpoint = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&width=960`;

    fetch(endpoint)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        const found = data?.thumbnail_url;
        if (found && !cancelled) {
          thumbnailCache.set(vimeoId, found);
          setUrl(found);
        }
      })
      .catch(() => {
        // Sem capa o card cai no fundo escuro com o título — nada quebra.
      });

    return () => {
      cancelled = true;
    };
  }, [vimeoId, enabled, url]);

  return url;
}

export default function VideoCard({
  client,
  project,
  subtitle,
  vimeoId,
  portrait = false,
  isPlaying = false,
  onPlay,
  onClose,
  playLabel,
  closeLabel,
}: VideoCardProps) {
  const fullTitle = `${client} — ${project}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const thumbnail = useVimeoThumbnail(vimeoId, inView);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative w-full overflow-hidden rounded-[20px] bg-black ${
        portrait ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {isPlaying ? (
        <>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`}
            title={fullTitle}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute top-3 right-3 z-20 flex size-[34px] cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/85"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={playLabel}
          className="absolute inset-0 cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:outline-none focus-visible:ring-inset"
        >
          {thumbnail && (
            /* Capa vinda do CDN do Vimeo: fora do domínio configurado no
               next/image, então <img> mesmo. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              loading="lazy"
            />
          )}

          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 52%, rgba(0,0,0,0.05) 100%)',
            }}
          />

          <span className="absolute top-1/2 left-1/2 flex size-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-[3px] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-contrast)]">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5-13-7.5z" />
            </svg>
          </span>

          <span className="absolute inset-x-0 bottom-0 flex flex-col p-4 md:p-5">
            {subtitle && (
              <span className="font-['Outfit'] text-[9px] font-semibold tracking-[0.24em] text-white/55 uppercase">
                {subtitle}
              </span>
            )}
            <span className="mt-2 font-['Outfit'] text-[15px] leading-tight font-bold tracking-[0.02em] text-[var(--theme-accent)] md:text-[17px]">
              {client}
            </span>
            <span className="font-['Outfit'] text-[13px] leading-tight font-medium text-white md:text-[15px]">
              {project}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
