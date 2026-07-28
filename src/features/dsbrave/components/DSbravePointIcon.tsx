import type { DSbravePointIconKey } from '../types/dsbrave.types';

/**
 * Ícones do "o que é o D.sbrave" — traçados lucide desenhados inline.
 *
 * Os PNGs anteriores eram provisórios e viviam em `/aplicativos/beneficios/`,
 * pasta que deixou de existir quando Aplicativos passou a usar SVG. Inline e em
 * `currentColor`, o ícone acompanha a accent do tema sem depender de dois
 * arquivos (claro e escuro).
 */
export default function DSbravePointIcon({ icon }: { icon: DSbravePointIconKey }) {
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
      {/* Unifica os tours: vários ambientes convergindo para um centro. */}
      {icon === 'layers' && (
        <>
          <path d="M12 2.7 3 7l9 4.3L21 7Z" />
          <path d="m3 12 9 4.3L21 12" />
          <path d="m3 17 9 4.3L21 17" />
        </>
      )}

      {/* Guia a visita: um trajeto marcado entre dois pontos. */}
      {icon === 'route' && (
        <>
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="5" r="3" />
          <path d="M9 19h3a4 4 0 0 0 4-4V9a4 4 0 0 1 4-4" />
        </>
      )}

      {/* Constrói desejo: a casa como destino. */}
      {icon === 'home' && (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.7V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.7" />
          <path d="M10 21v-5.5a2 2 0 0 1 4 0V21" />
        </>
      )}
    </svg>
  );
}
