import FooterReveal from '@/components/layout/FooterReveal';
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background';
import Header from '@/components/layout/Header';
import ServiceBridgeCta from '@/components/sections/ServiceBridgeCta';
import GalleryHero from './components/GalleryHero';
import GallerySection from './components/GallerySection';

import { gallerySections } from './data/galleryData';

export default function Images3DPage() {
  return (
    /* Sem `bg` opaco aqui: o `body` já pinta `--theme-bg`, e uma superfície
       opaca no `main` cobriria o campo de partículas, que é `fixed` e vive
       atrás de todo o conteúdo. */
    <main id="page-top" className="relative">
      <FluidParticlesBackground className="z-0" />

      <Header />

      <div className="relative z-10">
        <GalleryHero />

        {/* Só a seção correspondente ao filtro ativo se renderiza; as demais
          devolvem null. O contêiner existe apenas para o respiro da página. */}
        <section
          id="galeria-imagens-3d"
          className="px-4 pt-[clamp(1.25rem,3vh,2.25rem)] pb-[clamp(56px,9vh,88px)] md:px-6 xl:px-10"
        >
          {gallerySections.map((section) => (
            <GallerySection key={section.id} section={section} />
          ))}
        </section>

        <ServiceBridgeCta page="images3d" />

        <FooterReveal />
      </div>
    </main>
  );
}
