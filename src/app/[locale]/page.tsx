import { setRequestLocale } from 'next-intl/server';
import FooterReveal from '@/components/layout/FooterReveal';
import SplashScreen from '@/features/home/components/SplashScreen';
import AboutStudio from '@/features/home/sections/AboutStudio';
import FinalCta from '@/features/home/sections/FinalCta';
import GrupoFlying from '@/features/home/sections/GrupoFlying';
import HeroSection from '@/features/home/sections/HeroSection';
import PartnersRow from '@/features/home/sections/PartnersRow';
import ServicesIndex from '@/features/home/sections/ServicesIndex';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main>
      <SplashScreen />
      <HeroSection />
      <ServicesIndex />
      <AboutStudio />
      <GrupoFlying />
      <PartnersRow />
      <FinalCta />
      <FooterReveal />
    </main>
  );
}
