import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import Header from '@/components/layout/Header';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import DSbraveExplainerSection from './sections/DSbraveExplainerSection';
import DSbraveHero from './sections/DSbraveHero';
import DSbraveModuleSection from './sections/DSbraveModuleSection';
import DSbraveProjectsSection from './sections/DSbraveProjectsSection';

export default function DSbravePage() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <Header />

      <div className="relative z-10">
        <DSbraveHero />

        <div className="flex flex-col gap-12 pt-2 pb-12 md:gap-16 md:pb-16">
          <DSbraveExplainerSection />
          <DSbraveProjectsSection />
          <DSbraveModuleSection />
        </div>

        <ServiceBridgeCta page="dsbrave" />

        <FooterReveal />
      </div>
    </main>
  );
}
