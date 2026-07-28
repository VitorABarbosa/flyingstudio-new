'use client';

import Image from 'next/image';

type DSbraveProjectCardProps = {
  client: string;
  project: string;
  image: string;
};

export default function DSbraveProjectCard({
  client,
  project,
  image,
}: DSbraveProjectCardProps) {
  return (
    <article className="group w-full overflow-hidden rounded-[18px] bg-[var(--theme-panel)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-[300px] w-full overflow-hidden md:h-[320px] xl:h-[440px]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>

      <div className="flex h-[104px] flex-col items-center justify-center px-5 text-center">
        <p className="font-['Outfit'] text-[13px] font-bold tracking-[0.12em] text-[var(--theme-accent)] uppercase">
          {client}
        </p>

        <h3 className="mt-1.5 font-['Outfit'] text-[19px] leading-tight font-semibold text-[var(--theme-text-on-dark)] md:text-[22px]">
          {project}
        </h3>
      </div>
    </article>
  );
}
