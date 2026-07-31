import type { DSbravePointIconKey } from '../types/dsbrave.types';

/**
 * Ícones dos módulos do D.sbrave — traçados lucide desenhados inline.
 * Em `currentColor`, o ícone acompanha a accent do tema sem depender de
 * dois arquivos (claro e escuro).
 */
export default function DSbravePointIcon({
  icon,
  size = 30,
}: {
  icon: DSbravePointIconKey;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Split View: dois painéis lado a lado. */}
      {icon === 'split' && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M12 4v16" />
        </>
      )}

      {/* Automação de Lotes: o raio da atualização instantânea. */}
      {icon === 'zap' && <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />}

      {/* Mapa Interativo de Arredores: mapa dobrado com pin. */}
      {icon === 'map' && (
        <>
          <path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
          <path d="M9 4v14" />
          <path d="M15 6v14" />
        </>
      )}

      {/* Exploração 360°: órbita ao redor do ambiente. */}
      {icon === 'orbit' && (
        <>
          <circle cx="12" cy="12" r="3.4" />
          <path d="M20.3 8.6c1 .9 1.5 1.9 1.2 2.8-.6 1.9-4.8 2.4-9.4 1.1S4 8.8 4.6 6.9c.3-.9 1.3-1.5 2.7-1.7" />
          <path d="M3.7 15.4c-1-.9-1.5-1.9-1.2-2.8" />
          <path d="M16.7 18.8c-.3.9-1.3 1.5-2.7 1.7" />
        </>
      )}

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

      {/* Módulo próprio: tela transmitindo de forma independente. */}
      {icon === 'airplay' && (
        <>
          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
          <path d="m12 15 5 6H7Z" />
        </>
      )}

      {/* Dentro do app: o hub embarcado no aplicativo do empreendimento. */}
      {icon === 'smartphone' && (
        <>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
        </>
      )}
    </svg>
  );
}
