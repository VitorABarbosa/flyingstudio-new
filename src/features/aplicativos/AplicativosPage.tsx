'use client';

import { useState } from 'react';
import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import Header from '@/components/layout/Header';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import { scrollToElement } from '@/lib/scroll-to-element';
import AplicativosHero from './components/AplicativosHero';
import ExperimenteSection from './components/ExperimenteSection';
import ProjetosPersonalizadosSection from './components/ProjetosPersonalizadosSection';
import BeneficiosSection from './components/BeneficiosSection';
import { appProjectCards } from './data/aplicativosData';

export default function AplicativosPage() {
  /* A escolha vive aqui porque duas seções dependem dela: a vitrine marca o
     card ativo e a demonstração carrega o aplicativo correspondente. */
  const [activeProjectId, setActiveProjectId] = useState(appProjectCards[0].id);
  const activeProject =
    appProjectCards.find((item) => item.id === activeProjectId) ?? appProjectCards[0];

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
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
        <AplicativosHero />

        <div className="flex flex-col gap-8 pt-8 pb-12 md:gap-12 md:pb-16">
          <ProjetosPersonalizadosSection
            activeProjectId={activeProjectId}
            onSelectProject={handleSelectProject}
          />
          <ExperimenteSection
            appUrl={activeProject.appUrl}
            appLabel={`${activeProject.client} — ${activeProject.project}`}
          />
          <BeneficiosSection />
        </div>

        <ServiceBridgeCta page="apps" />

        <FooterReveal />
      </div>
    </main>
  );
}
