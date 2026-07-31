import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import DSbraveDemoCta from './sections/DSbraveDemoCta';
import DSbraveExplainerSection from './sections/DSbraveExplainerSection';
import DSbraveHero from './sections/DSbraveHero';
import DSbraveProjectsSection from './sections/DSbraveProjectsSection';

export default function DSbravePage() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />


      <div className="relative z-10">
        <DSbraveHero />

        {/* Ritmo vertical padronizado das páginas de serviço: o espaçamento
            (topo pós-hero, entre seções e rodapé) vive SÓ aqui — as seções
            não carregam padding vertical próprio. */}
        <div className="flex flex-col gap-12 pt-12 pb-12 md:gap-16 md:pt-16 md:pb-16">
          <DSbraveExplainerSection />
          <DSbraveProjectsSection />
          <DSbraveDemoCta />
        </div>

        <ServiceBridgeCta page="dsbrave" />

        <FooterReveal />
      </div>
    </main>
  );
}
