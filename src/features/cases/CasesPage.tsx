import FooterReveal from '@/components/layout/FooterReveal';
import CasesHero from './sections/CasesHero';
import CasesIntro from './sections/CasesIntro';
import CasesEcosystem from './sections/CasesEcosystem';
import CasesWordsStrip from './sections/CasesWordsStrip';
import CasesFeatured from './sections/CasesFeatured';
import CasesProjects from './sections/CasesProjects';
import CasesCta from './sections/CasesCta';

export default function CasesPage() {
  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <CasesHero />
      <CasesIntro />
      <CasesEcosystem />

      <CasesWordsStrip />

      <CasesFeatured />
      <CasesProjects />
      <CasesCta />

      <FooterReveal />
    </main>
  );
}
