import { notFound } from 'next/navigation';
import FooterReveal from '@/components/layout/FooterReveal';
import FluidParticlesBackground from '@/components/ui/fluid-particles-background';
import CasesCta from '../sections/CasesCta';
import { caseProjects } from '../data/casesData';
import { getCaseDetail, getNextCaseProject } from '../data/caseDetailsData';
import CaseDetailHero from './CaseDetailHero';
import CaseDetailOverview from './CaseDetailOverview';
import CaseDetailMosaic from './CaseDetailMosaic';
import CaseDetailCompanyCtas from './CaseDetailCompanyCtas';
import CaseDetailNext from './CaseDetailNext';

/**
 * A página interna de um case — o molde que todos os próximos seguem:
 * hero no formato dos banners → descritivo de abertura (frase-síntese +
 * ficha técnica + o que cada casa fez, em frases completas) → mosaico
 * ponta a ponta com as melhores imagens (mesma mecânica da galeria) →
 * próximo case → o CTA orbital do Nosso Grupo.
 */
export default function CaseDetailPage({ caseId }: { caseId: string }) {
  const detail = getCaseDetail(caseId);
  const project = caseProjects.find((p) => p.id === caseId);

  if (!detail || !project) {
    notFound();
  }

  return (
    <main id="page-top" className="bg-[var(--theme-bg)]">
      <CaseDetailHero project={project} detail={detail} />

      {/* As linhas fluidas dos serviços na versão do ecossistema: presas à
          seção (absolute) e dissolvendo na base via mask — sem corte seco
          na divisa com o mosaico. */}
      <div className="relative overflow-hidden">
        <FluidParticlesBackground className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_72%,transparent)]" />
        <div className="relative z-10">
          <CaseDetailOverview caseId={caseId} companies={detail.companies} />
        </div>
      </div>

      <CaseDetailMosaic title={project.title} images={detail.mosaic} />
      <CaseDetailCompanyCtas companies={detail.companies} />
      <CaseDetailNext project={getNextCaseProject(caseId)} />
      <CasesCta />
      <FooterReveal />
    </main>
  );
}
