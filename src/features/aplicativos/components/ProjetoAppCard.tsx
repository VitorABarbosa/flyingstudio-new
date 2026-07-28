'use client';

import Image from 'next/image';

type ProjetoAppCardProps = {
  client: string;
  project: string;
  image: string;
  isActive?: boolean;
  onSelect: () => void;
  label: string;
};

/**
 * Card de projeto. Clicar carrega o aplicativo dele na seção de baixo, então é
 * um botão de verdade — não um card decorativo com `onClick` pendurado.
 */
export default function ProjetoAppCard({
  client,
  project,
  image,
  isActive = false,
  onSelect,
  label,
}: ProjetoAppCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={label}
      className="group w-full cursor-pointer overflow-hidden rounded-[18px] bg-[var(--theme-panel)] text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
    >
      <div className="relative h-[300px] w-full overflow-hidden md:h-[320px] xl:h-[440px]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />

        {/* Ativo: anel em accent recortado na moldura, sem ocupar espaço. */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 ring-2 transition-all duration-300 ring-inset ${
            isActive ? 'ring-[var(--theme-accent)]' : 'ring-white/0 group-hover:ring-white/25'
          }`}
        />
      </div>

      <div className="flex h-[104px] flex-col items-center justify-center px-5 text-center">
        <p
          className={`font-['Outfit'] text-[13px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 ${
            isActive ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-accent)]/80'
          }`}
        >
          {client}
        </p>

        <h3 className="mt-1.5 font-['Outfit'] text-[19px] leading-tight font-semibold text-[var(--theme-text-on-dark)] md:text-[22px]">
          {project}
        </h3>
      </div>
    </button>
  );
}
