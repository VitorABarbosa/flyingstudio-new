import type { DnaVoz } from '../types/dna.types';

type DnaVozVideoProps = {
  voz: DnaVoz;
  title: string;
};

/**
 * Player do corte de depoimento no Vimeo. O iframe usa loading="lazy",
 * então cada player só é carregado quando o pilar se aproxima do viewport.
 */
export default function DnaVozVideo({ voz, title }: DnaVozVideoProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-black shadow-[0_18px_50px_var(--theme-border-soft)]">
      <iframe
        src={`https://player.vimeo.com/video/${voz.vimeoId}?dnt=1&title=0&byline=0&portrait=0`}
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
