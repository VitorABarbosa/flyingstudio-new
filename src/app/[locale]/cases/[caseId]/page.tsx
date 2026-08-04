import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CaseDetailPage from '@/features/cases/detail/CaseDetailPage';
import { caseDetails } from '@/features/cases/data/caseDetailsData';
import { caseProjects } from '@/features/cases/data/casesData';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(caseDetails).map((caseId) => ({ locale, caseId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ caseId: string }>;
}): Promise<Metadata> {
  const { caseId } = await params;
  const project = caseProjects.find((p) => p.id === caseId);

  if (!project) return {};

  return { title: `${project.title} | ${project.company}` };
}

export default async function CaseRoute({
  params,
}: {
  params: Promise<{ locale: string; caseId: string }>;
}) {
  const { locale, caseId } = await params;

  if (!(caseId in caseDetails)) {
    notFound();
  }

  setRequestLocale(locale);

  return <CaseDetailPage caseId={caseId} />;
}
