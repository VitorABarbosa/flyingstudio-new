import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import AplicativosHero from './components/AplicativosHero';
import FlyAppExplainerSection from './components/FlyAppExplainerSection';
import ProjetosPersonalizadosSection from './components/ProjetosPersonalizadosSection';
import FlyAppDemoCta from './components/FlyAppDemoCta';

/**
 * Mesmo modelo da página do D.sbrave: hero enxuto, o produto se apresenta
 * (infos + vídeo no laptop + diferenciais em carrossel), projetos como
 * vitrine e o fecho pede a demonstração guiada. Sem aplicativo navegável —
 * decisão de negócio: a tecnologia é apresentada, não entregue.
 */
export default function AplicativosPage() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />


      <div className="relative z-10">
        <AplicativosHero />

        {/* Ritmo vertical padronizado das páginas de serviço: o espaçamento
            (topo pós-hero, entre seções e rodapé) vive SÓ aqui — as seções
            não carregam padding vertical próprio. */}
        <div className="flex flex-col gap-12 pt-12 pb-12 md:gap-16 md:pt-16 md:pb-16">
          <FlyAppExplainerSection />
          <ProjetosPersonalizadosSection />
          <FlyAppDemoCta />
        </div>

        <ServiceBridgeCta page="apps" />

        <FooterReveal />
      </div>
    </main>
  );
}
