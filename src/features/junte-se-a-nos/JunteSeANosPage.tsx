import FooterReveal from '@/components/layout/FooterReveal';
import Header from '@/components/layout/Header';
import JunteSeANosHero from './components/JunteSeANosHero';
import DepartamentosSection from './components/DepartamentosSection';
import BancoTalentosSection from './components/BancoTalentosSection';

export default function JunteSeANosPage() {
  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <Header />

      <JunteSeANosHero />

      <DepartamentosSection />

      <BancoTalentosSection />

      <FooterReveal />
    </main>
  );
}
