import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import JunteSeANosHero from './components/JunteSeANosHero';
import BancoTalentosSection from './components/BancoTalentosSection';

export default function JunteSeANosPage() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de linhas, que é `fixed` e vive atrás
       de todo o conteúdo — mesmo arranjo das páginas de serviço. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <div className="relative z-10">
        {/* Página deliberadamente objetiva: convite (hero) e cadastro do
            currículo (banco de talentos). Nada de vagas, contagens ou seções
            institucionais — quem chegou aqui veio se candidatar. */}
        <JunteSeANosHero />

        <BancoTalentosSection />

        <FooterReveal />
      </div>
    </main>
  );
}
