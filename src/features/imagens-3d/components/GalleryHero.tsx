'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { scrollToElement } from '@/lib/scroll-to-element';
import { galleryCategoryOrder, gallerySections } from '../data/galleryData';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Capa de cada categoria. A chave é o id da seção da galeria — assim o rótulo
 * vem de `sections.<id>.title` e não existe uma segunda lista de nomes para
 * sair de sincronia.
 */
const CATEGORY_COVER: Record<string, string> = {
  geral: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Boulevard_HR.jpg',
  loteamentos: '/imagens-3d/topo/loteamento.png',
  fachadas: '/imagens-3d/topo/fachadas.png',
  'plantas-humanizadas': '/imagens-3d/topo/plantas.png',
  internas: '/imagens-3d/topo/internas.png',
  externas: '/imagens-3d/topo/externas.png',
};

/**
 * Topo da página de Imagens 3D.
 *
 * A imagem manda: banner alto com paralaxe, o título vivendo dentro dele e as
 * capas de categoria subindo por cima da borda de baixo. O contrato com a
 * galeria não mudou — clicar numa capa dispara `gallery-filter-change`.
 */
export default function GalleryHero() {
  const t = useTranslations('Images3DPage');
  const bannerRef = useRef<HTMLDivElement>(null);
  /* As capas seguem a ordem de leitura, não a ordem do acervo. O `filter`
     descarta qualquer id da lista de ordem que não exista mais nas seções. */
  const categories = galleryCategoryOrder
    .map((id) => gallerySections.find((section) => section.id === id))
    .filter((section): section is (typeof gallerySections)[number] => Boolean(section));

  const [activeFilter, setActiveFilter] = useState(categories[0]?.id ?? 'geral');

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  function handleCategoryClick(filter: string) {
    setActiveFilter(filter);
    window.dispatchEvent(new CustomEvent('gallery-filter-change', { detail: { filter } }));
    scrollToElement('galeria-imagens-3d');
  }

  return (
    <section className="relative w-full">
      <div
        ref={bannerRef}
        className="relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden rounded-b-[clamp(24px,3vw,44px)]"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-[1.16]">
          <Image
            src="https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Portaria_B_HR.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_90%]"
          />
        </motion.div>

        {/* Scrim escuro: garante leitura do título em cima de qualquer render,
            claro ou escuro, sem depender da cor do tema. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.05) 72%, transparent 100%)',
          }}
        />

        {/* Título dentro da imagem, alinhado à esquerda: o serviço se apresenta
            sobre a própria obra, não numa faixa separada acima dela. */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1800px] px-6 pb-[clamp(26px,4vh,44px)] md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-[12px] font-['Outfit'] text-[clamp(0.66rem,0.8vw,0.78rem)] font-semibold tracking-[0.3em] text-white/75 uppercase"
          >
            <span className="hr-live-dot" aria-hidden="true" />
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="mt-[clamp(0.5rem,1.5vh,1rem)] font-['Outfit'] text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-[clamp(0.6rem,1.6vh,1rem)] max-w-[52ch] font-['Outfit'] text-[clamp(0.98rem,1.3vw,1.3rem)] leading-[1.55] text-white/80"
          >
            {t('hero.description')}
          </motion.p>
        </div>
      </div>

      {/* Capas de categoria: abaixo do banner, sem invadir a imagem. */}
      <div className="relative z-20 mx-auto mt-[clamp(20px,3vh,34px)] w-full max-w-[1800px] px-4 pb-[clamp(28px,4vh,48px)] md:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {categories.map((section, index) => {
            const isActive = section.id === activeFilter;
            const cover = CATEGORY_COVER[section.id];

            return (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => handleCategoryClick(section.id)}
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 + index * 0.07, ease: EASE }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[18px] shadow-[0_20px_44px_-24px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
              >
                {cover && (
                  <Image
                    src={cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
                    opacity: isActive ? 0.95 : 0.8,
                  }}
                />

                {/* Ativo: anel em accent recortado só na moldura, sem borda
                    fixa ocupando espaço e sem depender de token de borda. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[inherit] ring-2 ring-inset transition-all duration-300 ${
                    isActive
                      ? 'ring-[var(--theme-accent)]'
                      : 'ring-white/0 group-hover:ring-white/30'
                  }`}
                />

                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3.5 pb-3 md:px-4">
                  <span
                    className={`text-left font-['Outfit'] text-[13px] leading-tight font-semibold transition-colors duration-300 md:text-[15px] ${
                      isActive ? 'text-[var(--theme-accent)]' : 'text-white'
                    }`}
                  >
                    {t(`sections.${section.id}.title`)}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`size-[6px] shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--theme-accent)] shadow-[0_0_10px_2px_var(--theme-accent-glow-soft)]'
                        : 'bg-white/0 group-hover:bg-white/60'
                    }`}
                  />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
