import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import TourHero from './components/TourHero';
import TourExplainerSection from './components/TourExplainerSection';
import TourProjetosSection from './components/TourProjetosSection';
import TourDemoCta from './components/TourDemoCta';

/**
 * Mesmo modelo das páginas do D.sbrave e de Aplicativos: hero enxuto, o
 * serviço se apresenta (infos + vídeo no notebook + diferenciais em
 * carrossel), projetos como vitrine e o fecho pede a demonstração guiada.
 * Sem tour navegável — a tecnologia é apresentada, não entregue.
 */
export default function TourVirtual360Page() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />


      <div className="relative z-10">
        <TourHero />

        {/* Ritmo vertical padronizado das páginas de serviço: o espaçamento
            (topo pós-hero, entre seções e rodapé) vive SÓ aqui — as seções
            não carregam padding vertical próprio. */}
        <div className="flex flex-col gap-12 pt-12 pb-12 md:gap-16 md:pt-16 md:pb-16">
          <TourExplainerSection />
          <TourProjetosSection />
          <TourDemoCta />
        </div>

        <ServiceBridgeCta page="tour360" />

        <FooterReveal />
      </div>
    </main>
  );
}
