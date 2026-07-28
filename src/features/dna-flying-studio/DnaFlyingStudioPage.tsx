import FooterReveal from '@/components/layout/FooterReveal';
import Header from '@/components/layout/Header';
import DnaEssenciaSection from './sections/DnaEssenciaSection';
import DnaGrupoSection from './sections/DnaGrupoSection';
import DnaHero from './sections/DnaHero';
import DnaHistoriaSection from './sections/DnaHistoriaSection';
import DnaParceirosSection from './sections/DnaParceirosSection';
import DnaStatementSection from './sections/DnaStatementSection';
import DnaVozesSection from './sections/DnaVozesSection';

export default function DnaFlyingStudioPage() {
  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <Header />
      <DnaHero />
      {/* `pt` curto: o hero agora termina logo depois da seta, e o respiro
          grande de antes deixava a primeira seção fora da dobra. */}
      <div className="flex flex-col gap-16 pt-10 pb-16 md:gap-28 md:pt-14 md:pb-24">
        <DnaHistoriaSection />
        <DnaStatementSection />
        <DnaEssenciaSection />
        <DnaVozesSection />
        <DnaGrupoSection />
        <DnaParceirosSection />
      </div>

      <FooterReveal />
    </main>
  );
}
