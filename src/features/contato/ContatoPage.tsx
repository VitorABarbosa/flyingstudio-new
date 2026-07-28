import FooterReveal from '@/components/layout/FooterReveal';
import Header from '@/components/layout/Header';
import ContatoHero from './components/ContatoHero';
import FormularioDadosSection from './components/FormularioDadosSection';

export default function ContatoPage() {
  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <Header />

      <ContatoHero />

      <FormularioDadosSection />

      <FooterReveal />
    </main>
  );
}
