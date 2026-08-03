'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import { scrollToElement } from '@/lib/scroll-to-element';
import {
  revealItem,
  revealItemCentered,
  staggerContainer,
} from '@/features/home/lib/revealAnimation';

type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  animation: string;
};

/* Destaques do acervo (DESTAQUES/DESTAQUES_HEROS_HOME). O hero é a vitrine
   do estúdio, então usa os ORIGINAIS de site-flying/ servidos crus
   (`unoptimized` no <Image>): qualidade máxima absoluta, ao custo de
   12-28 MB por slide — decisão consciente, validada em uso. O resto do site
   segue nas versões -web otimizadas. */
const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    src: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Cartesia_Casa_Do_Poeta_Portaria_R00.jpg',
    alt: 'Cartesia Casa do Poeta — portaria',
    animation: 'hero-pan-right',
  },
  {
    id: 'slide-2',
    src: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/GCS_MIRANTE_BOA_VISTA_ESP_EVENTOS_HR.jpg',
    alt: 'GCS Mirante Boa Vista — espaço de eventos',
    animation: 'hero-pan-left',
  },
  {
    id: 'slide-3',
    src: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PISCINA_DETALHE_HR.jpg',
    alt: 'GCS Mirante Boa Vista — detalhe da piscina',
    animation: 'hero-zoom-in',
  },
  {
    id: 'slide-4',
    src: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Paes_G_Orissanga_Piscina_R00.jpg',
    alt: 'Paes G. Orissanga — piscina',
    animation: 'hero-zoom-out',
  },
];

const SLIDE_DURATION_MS = 5000;
// Faixa cortada do topo do hero para encaixar em monitores 16:9 sem virar fullscreen.
// Reduz a altura total e sobe os elementos da base (tagline, dots, seta) na mesma medida;
// a imagem fica ancorada embaixo (object-bottom), entao o corte acontece no topo.
const HERO_CROP_TOP = 150;
const HERO_HEIGHT = 1078 - HERO_CROP_TOP;
const HERO_IMAGE_HEIGHT = 1036 - HERO_CROP_TOP;
/* Figma 2076:3577: os dots ficam a 84px da base da imagem. */
const HERO_DOTS_TOP = HERO_IMAGE_HEIGHT - 84 - 24;
const HERO_TAGLINE_TOP = 993 - HERO_CROP_TOP;
const HERO_ARROW_TOP = 1039 - HERO_CROP_TOP;

/**
 * Hero clássico da home: carrossel de renders em tela larga com pan/zoom
 * lento, tagline em chip de vidro e seta convidando o scroll — trazido de
 * volta no lugar do hero imersivo com vídeo de voo.
 */
export default function HeroSection() {
  const t = useTranslations('Home.hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrowPressed, setArrowPressed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentSlide]);

  const handleNextSectionScroll = () => {
    setArrowPressed(true);
    scrollToElement('tecnologia-artistica-3d');

    window.setTimeout(() => {
      setArrowPressed(false);
    }, 280);
  };

  return (
    <section
      id="hero"
      className="relative z-10 w-full overflow-visible bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={HERO_HEIGHT} overflow="visible">
        {/* Container da imagem no desenho do Figma (2076:3577): 1840px
            centralizado — 40px de respiro de cada lado, não colado nas
            bordas. Cantos inferiores suavizados (o 99px do Figma pesou). */}
        <div
          className="absolute top-0 left-1/2 w-[1840px] -translate-x-1/2 overflow-hidden rounded-br-[56px] rounded-bl-[56px]"
          style={{ height: `${HERO_IMAGE_HEIGHT}px` }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: index === currentSlide ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                /* Original servido cru, sem otimizador — teste de qualidade máxima */
                unoptimized
                className={`object-cover object-bottom will-change-transform ${
                  index === currentSlide ? slide.animation : ''
                }`}
                sizes="1840px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIRAAAQQCAgMAAAAAAAAAAAAAAQACAxESITFBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amk2la2pJZbADmPkbvaXY7wRkEeRBH2sLEuqLHSiMNe1pa4kgZJGCfPAiIgP/2Q=="
              />
            </div>
          ))}
        </div>

        <motion.div
          className="absolute inset-0"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {/* Chip no MESMO vidro da header (fill translúcido + blur curto com
              saturação), mas com a borda branca de antes. */}
          <motion.div
            variants={revealItem}
            className="absolute flex items-center justify-center rounded-[40px] border-2 border-white bg-[var(--theme-header-glass)] px-[140px] pt-[12px] pb-[20px] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[9px] backdrop-saturate-[1.25]"
            style={{ left: '612px', top: `${HERO_TAGLINE_TOP}px`, width: '740px' }}
          >
            <p className="font-['Outfit'] text-[28px] leading-[1.2] font-normal tracking-[1.4px] whitespace-nowrap text-[var(--theme-text)]">
              {t('tagline')}
            </p>
          </motion.div>

          <motion.button
            variants={revealItem}
            type="button"
            onClick={handleNextSectionScroll}
            className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[var(--theme-accent)] shadow-[0px_18px_36px_0px_var(--theme-accent-glow)] transition-colors duration-200"
            style={{
              left: '947px',
              top: `${HERO_ARROW_TOP}px`,
              width: '70px',
              height: '70px',
            }}
          >
            <Image
              src="/shared/icons/ui/icon-arrow-down-purple.svg"
              alt=""
              width={22}
              height={22}
              className={`theme-icon-on-accent ${arrowPressed ? 'hero-arrow-nudge' : ''}`}
            />
          </motion.button>

          {/* Dots do carrossel — circulos de 12px, pitch 36px.
            Ativo: var(--theme-accent) (roxo light / verde-limao dark).
            Inativo: var(--theme-rail-inactive).
            Centralizados em x=982 (mesmo centro do tagline e do botao seta). */}
          <motion.div
            variants={revealItemCentered}
            className="absolute flex items-center gap-[16px]"
            style={{ top: `${HERO_DOTS_TOP}px`, left: '982px' }}
          >
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Ir para o slide ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => setCurrentSlide(index)}
                  className="flex size-[20px] cursor-pointer items-center justify-center"
                >
                  <span
                    className={`size-[12px] rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-[var(--theme-accent)]' : 'bg-[var(--theme-rail-inactive)]'
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionScaleFrame>
    </section>
  );
}
