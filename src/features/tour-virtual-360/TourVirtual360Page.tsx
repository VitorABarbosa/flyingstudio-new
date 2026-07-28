'use client';

import { useState } from 'react';
import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import Header from '@/components/layout/Header';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import { scrollToElement } from '@/lib/scroll-to-element';
import TourHero from './components/TourHero';
import TourProjetosSection from './components/TourProjetosSection';
import TourExperienceSection from './components/TourExperienceSection';
import TourBeneficiosSection from './components/TourBeneficiosSection';
import { tourProjectCards } from './data/tourData';

export default function TourVirtual360Page() {
  /* A escolha vive aqui porque duas seções dependem dela: a vitrine marca o
     card ativo e a demonstração carrega o tour correspondente. */
  const [activeTourId, setActiveTourId] = useState(tourProjectCards[0].id);
  const activeTour =
    tourProjectCards.find((item) => item.id === activeTourId) ?? tourProjectCards[0];

  const handleSelectTour = (id: string) => {
    setActiveTourId(id);
    scrollToElement('experimente');
  };

  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <Header />

      <div className="relative z-10">
        <TourHero />

        <div className="flex flex-col gap-8 pt-8 pb-12 md:gap-12 md:pb-16">
          <TourProjetosSection activeTourId={activeTourId} onSelectTour={handleSelectTour} />
          <TourExperienceSection
            tourUrl={activeTour.tourUrl}
            tourLabel={`${activeTour.client} — ${activeTour.project}`}
          />
          <TourBeneficiosSection />
        </div>

        <ServiceBridgeCta page="tour360" />

        <FooterReveal />
      </div>
    </main>
  );
}
