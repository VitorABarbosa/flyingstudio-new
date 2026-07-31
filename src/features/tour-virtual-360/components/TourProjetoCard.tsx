import Image from 'next/image';

type TourProjetoCardProps = {
  client: string;
  project: string;
  image: string;
};

/**
 * Card de projeto — vitrine, não botão. O tour não abre pelo site:
 * a tecnologia é apresentada em demonstração guiada, sob solicitação.
 */
export default function TourProjetoCard({ client, project, image }: TourProjetoCardProps) {
  return (
    <div className="group w-full overflow-hidden rounded-[18px] bg-[var(--theme-panel)] text-left">
      <div className="relative h-[300px] w-full overflow-hidden md:h-[320px] xl:h-[440px]">
        <Image
          src={image}
          alt={`${client} — ${project}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>

      <div className="flex h-[104px] flex-col items-center justify-center px-5 text-center">
        <p className="font-['Outfit'] text-[13px] font-bold tracking-[0.12em] uppercase text-[var(--theme-accent)]/80">
          {client}
        </p>

        <h3 className="mt-1.5 font-['Outfit'] text-[19px] leading-tight font-semibold text-[var(--theme-text-on-dark)] md:text-[22px]">
          {project}
        </h3>
      </div>
    </div>
  );
}
