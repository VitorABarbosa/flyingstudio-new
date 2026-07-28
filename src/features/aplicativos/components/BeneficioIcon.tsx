import type { BeneficioIconKey } from '../types/aplicativos.types';

/**
 * Ícones das vantagens — traçados lucide desenhados inline, como em
 * `DnaPilarIcon`. Inline e em `currentColor` porque os PNGs anteriores exigiam
 * dois arquivos por ícone (claro e escuro) e não acompanhavam a accent do tema.
 */
export default function BeneficioIcon({ icon }: { icon: BeneficioIconKey }) {
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
      {/* Sob medida: paleta. */}
      {icon === 'palette' && (
        <>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.83-.44-1.12a1.6 1.6 0 0 1-.44-1.13 1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.96 6.01 17.46 2 12 2Z" />
          <circle cx="8.5" cy="7.5" r=".6" fill="currentColor" />
          <circle cx="13.5" cy="6.5" r=".6" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".6" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".6" fill="currentColor" />
        </>
      )}

      {/* Qualquer dispositivo: monitor + celular. */}
      {icon === 'devices' && (
        <>
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8" />
          <path d="M10 19v-3" />
          <path d="M7 19h5" />
          <rect width="6" height="10" x="16" y="12" rx="2" />
        </>
      )}

      {/* Experiência memorável: brilho. */}
      {icon === 'sparkles' && (
        <>
          <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </>
      )}

      {/* Ferramenta do corretor no estande: tela de apresentação. */}
      {icon === 'presentation' && (
        <>
          <path d="M2 3h20" />
          <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
          <path d="m7 21 5-5 5 5" />
        </>
      )}
    </svg>
  );
}
