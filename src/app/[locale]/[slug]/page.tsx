import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { futurePageSlugs, getSidebarItemBySlug } from '@/lib/site-navigation';
import Images3DPage from '@/features/imagens-3d/Images3DPage';
import Videos3DPage from '@/features/videos-3d/Videos3DPage';
import AplicativosPage from '@/features/aplicativos/AplicativosPage';
import TourVirtual360Page from '@/features/tour-virtual-360/TourVirtual360Page';
import ContatoPage from '@/features/contato/ContatoPage';
import JunteSeANosPage from '@/features/junte-se-a-nos/JunteSeANosPage';
import DSbravePage from '@/features/dsbrave/DSbravePage';
import DnaFlyingStudioPage from '@/features/dna-flying-studio/DnaFlyingStudioPage';
import CasesPage from '@/features/cases/CasesPage';

export function generateStaticParams() {
  return futurePageSlugs.map((slug) => ({ slug }));
}

export default async function FutureRoutePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getSidebarItemBySlug(slug);

  if (!item) {
    notFound();
  }

  setRequestLocale(locale);

  if (slug === 'imagens-3d') {
    return <Images3DPage />;
  }

  if (slug === 'videos-3d') {
    return <Videos3DPage />;
  }

  if (slug === 'aplicativos') {
    return <AplicativosPage />;
  }

  if (slug === 'tour-virtual-360') {
    return <TourVirtual360Page />;
  }

  if (slug === 'dsbrave') {
    return <DSbravePage />;
  }

  if (slug === 'dna-flying-studio') {
    return <DnaFlyingStudioPage />;
  }

  if (slug === 'cases') {
    return <CasesPage />;
  }

  if (slug === 'contato') {
    return <ContatoPage />;
  }

  if (slug === 'junte-se-a-nos') {
    return <JunteSeANosPage />;
  }

  const sidebarT = await getTranslations({ locale, namespace: 'Sidebar' });
  const placeholderT = await getTranslations({ locale, namespace: 'FuturePage' });

  return (
    <PlaceholderPage
      eyebrow={placeholderT('eyebrow')}
      title={sidebarT(`links.${item.key}`)}
      description={placeholderT('description')}
    />
  );
}
