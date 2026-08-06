'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
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

/* Destaques curados pelo Vitor (site-flying/HOME_HERO/ no servidor), servidos
   LOCAIS e já otimizados: scripts/preparar-hero-home.mjs baixa os originais e
   gera public/home/hero/0N.jpg em 3840px q85 — de 7-28 MB por slide para
   1-3 MB, sem perda visível e sem depender do servidor remoto no primeiro
   carregamento. As animações alternam entre os quatro movimentos. */
const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    src: '/home/hero/01.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-zoom-in',
  },
  {
    id: 'slide-2',
    src: '/home/hero/02.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-pan-left',
  },
  {
    id: 'slide-3',
    src: '/home/hero/03.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-pan-right',
  },
  {
    id: 'slide-4',
    src: '/home/hero/04.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-zoom-out',
  },
  {
    id: 'slide-5',
    src: '/home/hero/05.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-zoom-in',
  },
  {
    id: 'slide-6',
    src: '/home/hero/06.jpg',
    alt: 'Destaque do acervo Flying Studio',
    animation: 'hero-pan-left',
  },
  {
    id: 'slide-7',
    src: '/home/hero/07.jpg',
    alt: 'Destaque do acervo Flying Studio',
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
  /* Ken Burns (pan/zoom) só no desktop: animar transform numa imagem de
     1840px re-rasteriza a camada acima da resolução exibida — no iPhone
     era memória queimando o tempo todo na home. No celular os slides
     trocam pelo crossfade de sempre, parados. */
  const [kenBurns, setKenBurns] = useState(false);
  const heroVisibleRef = useRef(true);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setKenBurns(window.matchMedia('(min-width: 1024px)').matches);

    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      heroVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* O carrossel só avança com o hero na tela e a aba visível — fora disso
       ficava trocando slide (e decodificando imagem nova) à toa. */
    let timer = 0;
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (document.hidden || !heroVisibleRef.current) {
          schedule(1000);
          return;
        }
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, delay);
    };

    schedule(SLIDE_DURATION_MS);

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
      ref={sectionRef}
      id="hero"
      className="relative z-10 w-full overflow-visible bg-[var(--theme-bg)] transition-colors duration-200"
    >
      {/* Desktop: o canvas de 1920px fiel ao Figma. No celular ele fica
          escondido — escalado a ~20% o hero virava uma faixa de ~190px,
          minúsculo perto das seções empilhadas; abaixo há a versão própria. */}
      <div className="hidden lg:block">
      <SectionScaleFrame designHeight={HERO_HEIGHT} overflow="visible">
        {/* Container da imagem no desenho do Figma (2076:3577): 1840px
            centralizado — 40px de respiro de cada lado, não colado nas
            bordas. Cantos inferiores suavizados (o 99px do Figma pesou). */}
        <div
          className="absolute top-0 left-1/2 w-[1840px] -translate-x-1/2 overflow-hidden rounded-br-[56px] rounded-bl-[56px]"
          style={{ height: `${HERO_IMAGE_HEIGHT}px` }}
        >
          {heroSlides.map((slide, index) => {
            /* iOS Safari mata a aba se as 7 imagens ficarem decodificadas ao
               mesmo tempo ("um problema ocorreu repetidamente") — só a atual
               e as duas vizinhas (anterior p/ crossfade, próxima p/ preload)
               ficam montadas; as demais são divs vazias. */
            const gap = Math.abs(index - currentSlide);
            const distance = Math.min(gap, heroSlides.length - gap);
            const mounted = distance <= 1;

            return (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                {/* <picture>: telas até 1023px (celular DEITADO incluso — 844px
                    passava do corte antigo de 767 e baixava o arquivo cheio)
                    recebem a versão -mobile de ~120 KB; desktop segue no
                    arquivo cheio servido direto, sem otimizador. */}
                {mounted && (
                  <picture>
                    <source
                      media="(max-width: 1023px)"
                      srcSet={slide.src.replace('.jpg', '-mobile.jpg')}
                    />
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="eager"
                      decoding="async"
                      fetchPriority={index === currentSlide ? 'high' : 'auto'}
                      className={`absolute inset-0 h-full w-full object-cover object-bottom ${
                        index === currentSlide && kenBurns ? slide.animation : ''
                      }`}
                    />
                  </picture>
                )}
              </div>
            );
          })}
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
            className="absolute flex items-center justify-center rounded-[40px] border-2 border-white bg-[var(--theme-header-glass)] px-[140px] pt-[12px] pb-[20px] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] lg:backdrop-blur-[9px] lg:backdrop-saturate-[1.25]"
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

          {/* Dots do carrossel — circulos de 10px.
            Ativo: var(--theme-accent) (roxo light / verde-limao dark).
            Inativo: var(--theme-rail-inactive).
            Centralizados em x=982 (mesmo centro do tagline e do botao seta). */}
          <motion.div
            variants={revealItemCentered}
            className="absolute flex items-center gap-[14px]"
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
                  className="flex size-[18px] cursor-pointer items-center justify-center"
                >
                  <span
                    className={`size-[10px] rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-[var(--theme-accent)]' : 'bg-[var(--theme-rail-inactive)]'
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionScaleFrame>
      </div>

      {/* Celular: hero em altura de tela — o MESMO carrossel (estado
          compartilhado com o desktop), com a tagline, os dots e a seta
          dentro da imagem. */}
      <div className="lg:hidden">
        {/* Wrapper SEM clip: é ele que segura a seta montada na borda de
            baixo do hero (metade dentro, metade fora, como no desktop) —
            dentro do container com overflow-hidden ela seria cortada. */}
        <div className="relative">
        <div className="relative h-[clamp(400px,58vh,560px)] w-full overflow-hidden rounded-b-[28px]">
          {heroSlides.map((slide, index) => {
            const gap = Math.abs(index - currentSlide);
            const distance = Math.min(gap, heroSlides.length - gap);
            const mounted = distance <= 1;

            return (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                {/* `loading="lazy"` de propósito: no desktop este bloco é
                    display:none e nunca intersecta — não baixa nada em dobro;
                    no celular o hero está no topo e carrega na hora. */}
                {mounted && (
                  <img
                    src={slide.src.replace('.jpg', '-mobile.jpg')}
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-bottom"
                  />
                )}
              </div>
            );
          })}

          {/* Véu no pé da imagem para a tagline e os dots lerem bem. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/60 via-black/25 to-transparent"
          />

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 px-6 pb-[46px]"
          >
            <motion.div variants={revealItem} className="flex items-center gap-[10px]">
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Ir para o slide ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => setCurrentSlide(index)}
                    className="flex size-[18px] cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`size-[8px] rounded-full transition-colors duration-200 ${
                        isActive ? 'bg-[var(--theme-accent)]' : 'bg-white/45'
                      }`}
                    />
                  </button>
                );
              })}
            </motion.div>

            <motion.div
              variants={revealItem}
              className="flex w-full max-w-[400px] items-center justify-center rounded-[40px] border-2 border-white bg-[var(--theme-header-glass)] px-5 py-2.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)]"
            >
              <p className="text-center font-['Outfit'] text-[13px] leading-[1.35] font-normal tracking-[0.6px] text-[var(--theme-text)]">
                {t('tagline')}
              </p>
            </motion.div>

          </motion.div>
        </div>

        {/* A seta vive na LINHA do limite do hero: âncora no bottom do
            wrapper sem clip, metade sobre a imagem, metade sobre a página.
            A centralização fica no wrapper — o framer é dono do transform
            do botão e atropelaria as classes translate. */}
        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          type="button"
          onClick={handleNextSectionScroll}
          aria-label="Ir para a próxima seção"
          className="flex size-[52px] cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[var(--theme-accent)] shadow-[0px_14px_28px_0px_var(--theme-accent-glow)]"
        >
          <Image
            src="/shared/icons/ui/icon-arrow-down-purple.svg"
            alt=""
            width={18}
            height={18}
            className={`theme-icon-on-accent ${arrowPressed ? 'hero-arrow-nudge' : ''}`}
          />
        </motion.button>
        </div>
        </div>
      </div>
    </section>
  );
}
