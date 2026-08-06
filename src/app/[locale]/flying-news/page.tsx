import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import FlyingNewsPage from '@/features/flying-news/FlyingNewsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('pages.flying-news.title'),
    description: t('pages.flying-news.description'),
  };
}

export default async function FlyingNewsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FlyingNewsPage />;
}
