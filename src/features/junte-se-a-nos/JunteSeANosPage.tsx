import FooterReveal from '@/components/layout/FooterReveal';
import Header from '@/components/layout/Header';
import JunteSeANosHero from './components/JunteSeANosHero';
import BancoTalentosSection from './components/BancoTalentosSection';

export default function JunteSeANosPage() {
  return (
    /* Fundo no padrão do DNA: bg do tema + linhas fluidas dentro do hero. */
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <Header />

      {/* Página deliberadamente objetiva: convite (hero) e cadastro do
          currículo (banco de talentos). Nada de vagas, contagens ou seções
          institucionais — quem chegou aqui veio se candidatar. */}
      <JunteSeANosHero />

      <BancoTalentosSection />

      <FooterReveal />
    </main>
  );
}
