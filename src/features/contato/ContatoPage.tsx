import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import ContatoHero from './components/ContatoHero';
import FormularioDadosSection from './components/FormularioDadosSection';

export default function ContatoPage() {
  return (
    /* Mesma estrutura de Junte-se a Nós: sem `bg` opaco no `main` (o `body` já
       pinta `--theme-bg`), o campo de linhas `fixed` atrás e o conteúdo numa
       camada acima. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <div className="relative z-10">
        <ContatoHero />

        <FormularioDadosSection />

        <FooterReveal />
      </div>
    </main>
  );
}
