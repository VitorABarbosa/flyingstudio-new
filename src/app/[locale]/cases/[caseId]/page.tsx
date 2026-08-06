import { getTranslations, setRequestLocale } from 'next-intl/server';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyingstudio.com.br';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; caseId: string }>;
}): Promise<Metadata> {
  const { locale, caseId } = await params;
  const project = caseProjects.find((p) => p.id === caseId);
  const detail = caseDetails[caseId];

  if (!project || !detail) return {};

  const t = await getTranslations({ locale, namespace: 'CasesPage.detail' });
  const title = `${project.title} | ${project.company}`;
  const description = t(`items.${caseId}.heroDescription`);

  const isDefaultLocale = locale === routing.defaultLocale;
  const path = `/cases/${caseId}`;
  const canonicalUrl = isDefaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Flying Studio`,
      description,
      url: canonicalUrl,
      siteName: 'Flying Studio',
      locale: isDefaultLocale ? 'pt_BR' : 'en_US',
      type: 'article',
      /* A capa do case é o próprio hero — imagem real do projeto no share. */
      images: [{ url: detail.heroImage, width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-BR': `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
  };
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
