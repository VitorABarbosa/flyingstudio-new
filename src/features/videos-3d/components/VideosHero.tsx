'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { videoTabs } from '../data/videosData';
import type { VideoCategoryId } from '../types/videos.types';

const EASE = [0.22, 1, 0.36, 1] as const;

type VideosHeroProps = {
  activeTab: VideoCategoryId;
  onTabChange: (tab: VideoCategoryId) => void;
};

/**
 * Topo da página de Vídeos 3D — mesmo padrão da página de Perspectivas.
 *
 * A imagem manda: banner com paralaxe, o título vivendo dentro dele e as capas
 * de categoria logo abaixo, servindo de filtro. As capas substituíram o
 * componente de abas: agora são o filtro e a vitrine ao mesmo tempo.
 */
export default function VideosHero({ activeTab, onTabChange }: VideosHeroProps) {
  const t = useTranslations('Videos3DPage');
  const bannerRef = useRef<HTMLDivElement>(null);

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section className="relative w-full">
      <div
        ref={bannerRef}
        className="relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden rounded-b-[clamp(24px,3vw,44px)]"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-[1.16]">
          <Image
            src="/videos-3d/banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
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

      {/* Capas de categoria: abaixo do banner, sem invadir a imagem.
          O trilho é mais estreito que o da página de Perspectivas de propósito
          — são quatro capas contra seis, e na largura cheia cada uma ficaria
          maior que as de lá. */}
      <div className="relative z-20 mx-auto mt-[clamp(20px,3vh,34px)] w-full max-w-[1120px] px-4 pb-[clamp(28px,4vh,48px)] md:px-6">
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {videoTabs.map((tab, index) => {
            const isActive = tab.id === activeTab;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 + index * 0.07, ease: EASE }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[16px] shadow-[0_20px_44px_-24px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
              >
                {tab.image && (
                  <Image
                    src={tab.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
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
                  className={`absolute inset-0 rounded-[inherit] ring-2 transition-all duration-300 ring-inset ${
                    isActive
                      ? 'ring-[var(--theme-accent)]'
                      : 'ring-white/0 group-hover:ring-white/30'
                  }`}
                />

                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3 pb-2.5">
                  <span
                    className={`text-left font-['Outfit'] text-[12px] leading-tight font-semibold transition-colors duration-300 md:text-[13px] ${
                      isActive ? 'text-[var(--theme-accent)]' : 'text-white'
                    }`}
                  >
                    {t(`tabs.${tab.id}`)}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`size-[5px] shrink-0 rounded-full transition-all duration-300 ${
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
