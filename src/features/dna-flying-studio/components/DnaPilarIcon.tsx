import type { DnaPilar } from '../types/dna.types';

type DnaPilarIconProps = {
  icon: DnaPilar['icon'];
};

/** Ícones lucide (rocket, telescope, dna) usados nos cards Missão/Visão/Valores. */
export default function DnaPilarIcon({ icon }: DnaPilarIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon === 'rocket' && (
        <>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </>
      )}
      {icon === 'telescope' && (
        <>
          <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
          <path d="m13.56 11.747 4.332-.924" />
          <path d="m16 21-3.105-6.21" />
          <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
          <path d="m6.158 8.633 1.114 4.456" />
          <path d="m8 21 3.105-6.21" />
          <circle cx="12" cy="13" r="2" />
        </>
      )}
      {icon === 'dna' && (
        <>
          <path d="m10 16 1.5 1.5" />
          <path d="m14 8-1.5-1.5" />
          <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
          <path d="m16.5 10.5 1 1" />
          <path d="m17 6-2.891-2.891" />
          <path d="M2 15c6.667-6 13.333 0 20-6" />
          <path d="m20 9 .891.891" />
          <path d="M3.109 14.109 4 15" />
          <path d="m6.5 12.5 1 1" />
          <path d="m7 18 2.891 2.891" />
          <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
        </>
      )}
    </svg>
  );
}
