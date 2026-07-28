import Image from 'next/image';
import type { CompanyBlock, ExpandedContent } from '../data/nossoGrupoData';

type ExpandedCardContentProps = {
  content: ExpandedContent;
  /** Quando true, mostra o conteúdo (hover ativo). */
  visible: boolean;
  /** Handler do "Ver completo". Por enquanto pode ser opcional. */
  onComplete?: () => void;
};

const SLIDE_DISTANCE_PX = 32;
const STAGGER_MS = 140;
const ENTRANCE_DURATION_MS = 650;
const EXIT_DURATION_MS = 220;
/** Espera o título terminar de subir (600ms) antes do conteúdo começar. */
const INITIAL_DELAY_MS = 550;

function CompanyRow({
  company,
  visible,
  delayMs,
}: {
  company: CompanyBlock;
  visible: boolean;
  delayMs: number;
}) {
  return (
    <div
      className="flex flex-col gap-[12px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(-${SLIDE_DISTANCE_PX}px)`,
        transition: `opacity ${visible ? ENTRANCE_DURATION_MS : EXIT_DURATION_MS}ms ease-out ${
          visible ? delayMs : 0
        }ms, transform ${visible ? ENTRANCE_DURATION_MS : EXIT_DURATION_MS}ms ease-out ${
          visible ? delayMs : 0
        }ms`,
      }}
    >
      <div
        className="relative"
        style={{
          width: `${(company.logoWidth / company.logoHeight) * company.displayHeight}px`,
          height: `${company.displayHeight}px`,
        }}
      >
        <Image
          src={company.logoSrc}
          alt={company.id}
          fill
          className="object-contain"
          sizes="200px"
        />
      </div>

      <div className="flex flex-wrap gap-x-[12px] gap-y-[10px]">
        {company.services.map((service) => (
          <span
            key={service}
            className="inline-flex h-[27px] items-center rounded-[61px] border border-white px-[16px] font-['Outfit'] text-[14px] leading-none font-light text-white"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Conteúdo que aparece no hover do card. Cada bloco entra com fade + slide
 * da esquerda, com stagger entre eles (90ms). Na saída, todos somem juntos
 * mais rápido para liberar visualmente o card.
 */
export default function ExpandedCardContent({
  content,
  visible,
  onComplete,
}: ExpandedCardContentProps) {
  const ctaDelayMs = INITIAL_DELAY_MS + content.companies.length * STAGGER_MS;

  return (
    <div
      className="absolute inset-0 z-10"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="absolute flex flex-col gap-[32px]" style={{ left: '38px', top: '380px' }}>
        {content.companies.map((company, index) => (
          <CompanyRow
            key={company.id}
            company={company}
            visible={visible}
            delayMs={INITIAL_DELAY_MS + index * STAGGER_MS}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="absolute cursor-pointer font-['Outfit'] text-[14px] leading-none font-bold text-white transition-opacity hover:opacity-75"
        style={{
          right: '38px',
          bottom: '32px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : `translateX(-${SLIDE_DISTANCE_PX}px)`,
          transition: `opacity ${visible ? ENTRANCE_DURATION_MS : EXIT_DURATION_MS}ms ease-out ${
            visible ? ctaDelayMs : 0
          }ms, transform ${visible ? ENTRANCE_DURATION_MS : EXIT_DURATION_MS}ms ease-out ${
            visible ? ctaDelayMs : 0
          }ms`,
        }}
      >
        {content.ctaLabel}
      </button>
    </div>
  );
}
