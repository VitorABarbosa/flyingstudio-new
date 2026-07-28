import { setRequestLocale } from 'next-intl/server';
import FlyingNewsPage from '@/features/flying-news/FlyingNewsPage';

export default async function FlyingNewsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FlyingNewsPage />;
}
