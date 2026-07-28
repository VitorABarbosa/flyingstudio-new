import { setRequestLocale } from 'next-intl/server';
import FooterReveal from '@/components/layout/FooterReveal';
import Header from '@/components/layout/Header';
import SplashScreen from '@/features/home/components/SplashScreen';
import AboutStudio from '@/features/home/sections/AboutStudio';
import DsbraveShowcase from '@/features/home/sections/DsbraveShowcase';
import FinalCta from '@/features/home/sections/FinalCta';
import HeroImmersive from '@/features/home/sections/HeroImmersive';
import NossoGrupoSection from '@/features/home/sections/NossoGrupoSection';
import PartnersRow from '@/features/home/sections/PartnersRow';
import ServicesIndex from '@/features/home/sections/ServicesIndex';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main>
      <SplashScreen />
      <Header />
      <HeroImmersive />
      <ServicesIndex />
      <DsbraveShowcase />
      <NossoGrupoSection />
      <AboutStudio />
      <PartnersRow />
      <FinalCta />
      <FooterReveal />
    </main>
  );
}
