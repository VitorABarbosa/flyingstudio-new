import FooterReveal from '@/components/layout/FooterReveal';
import CasesHero from './sections/CasesHero';
import CasesIntro from './sections/CasesIntro';
import CasesWordsStrip from './sections/CasesWordsStrip';
import CasesProjects from './sections/CasesProjects';
import CasesCta from './sections/CasesCta';

export default function CasesPage() {
  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <CasesHero />
      <CasesIntro />

      <CasesWordsStrip />

      <CasesProjects />
      <CasesCta />

      <FooterReveal />
    </main>
  );
}
