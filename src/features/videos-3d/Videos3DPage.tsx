'use client';

import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import { useMemo, useState } from 'react';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import VideosHero from './components/VideosHero';
import VideoFilterBar from './components/VideoFilterBar';
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


      <div className="relative z-10">
        <VideosHero />

        {/* "Todos" percorre o acervo inteiro por fileiras; escolhida uma
            categoria, o visitante já disse o que quer ver — aí a grade mostra
            tudo de uma vez, no formato da página de Perspectivas. */}
        <div className="flex flex-col gap-10 pt-[clamp(1.75rem,4vh,3rem)] pb-[clamp(56px,9vh,88px)] md:gap-12">
          {/* A barra persiste fora das seções: é o que anima a troca do
              título ativo em vez de cortar seco. */}
          <VideoFilterBar activeTab={activeTab} onTabChange={setActiveTab} />
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
