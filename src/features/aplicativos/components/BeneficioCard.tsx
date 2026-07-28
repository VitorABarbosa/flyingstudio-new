'use client';

import BeneficioIcon from './BeneficioIcon';
import type { BeneficioIconKey } from '../types/aplicativos.types';

type BeneficioCardProps = {
  icon: BeneficioIconKey;
  title: string;
  description: string;
};

/**
 * Card de vantagem.
 *
 * Sem altura máxima e sem o `pb-32` de antes: o card era dimensionado para um
 * texto de exemplo e cortaria a descrição real. Agora a altura vem do conteúdo,
 * e o `h-full` no grid mantém os quatro alinhados.
 */
export default function BeneficioCard({ icon, title, description }: BeneficioCardProps) {
  return (
    <article className="flex h-full w-full flex-col rounded-[28px] bg-[var(--theme-surface)] px-7 pt-7 pb-8 shadow-[0_16px_45px_var(--theme-border-soft)]">
      <span
        className="mb-5 flex size-[58px] items-center justify-center rounded-full text-[var(--theme-accent)]"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 14%, transparent)' }}
      >
        <BeneficioIcon icon={icon} />
      </span>

      <h3 className="font-['Outfit'] text-[22px] leading-tight font-semibold text-[var(--theme-text)] md:text-[26px]">
        {title}
      </h3>

      <p className="mt-3 font-['Outfit'] text-[15px] leading-[1.65] text-[var(--theme-muted)]">
        {description}
      </p>
    </article>
  );
}
