'use client';

import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import { useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import VideosHero from './components/VideosHero';
import VideoCarouselSection from './components/VideoCarouselSection';
import VideoGridSection from './components/VideoGridSection';
import RinnoCtaSection from './components/RinnoCtaSection';
import { videoSections } from './data/videosData';
import type { VideoCategoryId } from './types/videos.types';

export default function Videos3DPage() {
  const [activeTab, setActiveTab] = useState<VideoCategoryId>('todos');

  const filteredSections = useMemo(() => {
    if (activeTab === 'todos') return videoSections;
    return videoSections.filter((section) => section.id === activeTab);
  }, [activeTab]);

  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <Header />

      <div className="relative z-10">
        <VideosHero activeTab={activeTab} onTabChange={setActiveTab} />

        {/* "Todos" percorre o acervo inteiro por fileiras; escolhida uma
            categoria, o visitante já disse o que quer ver — aí a grade mostra
            tudo de uma vez, no formato da página de Perspectivas. */}
        <div className="flex flex-col gap-10 pb-[clamp(56px,9vh,88px)] md:gap-12">
          {activeTab === 'todos'
            ? filteredSections.map((section) => (
                <VideoCarouselSection key={section.id} section={section} />
              ))
            : filteredSections.map((section) => (
                <VideoGridSection key={section.id} section={section} />
              ))}

          <RinnoCtaSection />
        </div>

        <ServiceBridgeCta page="videos3d" />

        <FooterReveal />
      </div>
    </main>
  );
}
