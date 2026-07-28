import type { TourBeneficioIconKey } from '../types/tour.types';

/**
 * Ícones dos benefícios — traçados lucide desenhados inline, como em
 * `BeneficioIcon` (Aplicativos). Os PNGs anteriores viviam em
 * `/aplicativos/beneficios/` — pasta que deixou de existir quando Aplicativos
 * passou a usar SVG — e por isso não carregavam mais. Inline e em
 * `currentColor`, o ícone acompanha a accent do tema sem dois arquivos.
 */
export default function TourBeneficioIcon({ icon }: { icon: TourBeneficioIconKey }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Produto imersivo: óculos de realidade virtual. */}
      {icon === 'headset' && (
        <>
          <path d="M3 7h18a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3.6a2 2 0 0 1-1.7-.95l-1-1.6a2.02 2.02 0 0 0-3.4 0l-1 1.6a2 2 0 0 1-1.7.95H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
          <path d="M6 16v3" />
          <path d="M18 16v3" />
        </>
      )}

      {/* Experiência personalizada: controles ajustáveis. */}
      {icon === 'sliders' && (
        <>
          <path d="M21 4h-7" />
          <path d="M10 4H3" />
          <path d="M21 12h-9" />
          <path d="M8 12H3" />
          <path d="M21 20h-5" />
          <path d="M12 20H3" />
          <path d="M14 2v4" />
          <path d="M8 10v4" />
          <path d="M16 18v4" />
        </>
      )}

      {/* Múltiplas interações: clique com pontos ativos ao redor. */}
      {icon === 'pointer' && (
        <>
          <path d="M14 4.1 12 6" />
          <path d="m5.1 8-2.9-.8" />
          <path d="m6 12-1.9 2" />
          <path d="M7.2 2.2 8 5.1" />
          <path d="M9.04 9.69a.5.5 0 0 1 .65-.65l11 4.5a.5.5 0 0 1-.07.95l-4.35 1.04a1 1 0 0 0-.74.74l-1.04 4.35a.5.5 0 0 1-.95.07Z" />
        </>
      )}

      {/* Novo mundo: o produto ganha um território próprio. */}
      {icon === 'globe' && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </>
      )}
    </svg>
  );
}
