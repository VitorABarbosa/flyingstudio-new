'use client';

import { motion, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';

type ServiceKey = 'images3d' | 'videos3d' | 'tour360' | 'apps' | 'dsbrave';

/** Conteúdo vivo do preview de cada serviço (null = sem preview). */
type ServicePreview =
  | { kind: 'images'; images: string[] }
  | { kind: 'vimeo'; id: string }
  | { kind: 'iframe'; src: string }
  | null;

type ServiceItem = {
  key: ServiceKey;
  href: string;
  preview: ServicePreview;
};

const SERVICES: ServiceItem[] = [
  {
    key: 'images3d',
    href: '/imagens-3d',
    preview: {
      kind: 'images',
      /* Acervo hospedado: 2 renders por categoria da galeria (1 de plantas),
         intercalados para o baralho variar de tema a cada carta. */
      images: [
        // Externas
        'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Ousy_The_One_Tucuruvi_Sky_Pool_HR.jpg',
        // Fachadas
        'https://img.flyingstudio.com.br/site-flying/FACHADAS/ProHidro_Carlos_Reinaldo_Fachada_Noturna_HR.jpg',
        // Internas
        'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Gourmet_HR.jpg',
        // Loteamentos
        'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Heliponto_HR.jpg',
        // Geral
        'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
        // Plantas humanizadas
        'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR.jpg',
        // Externas
        'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Livigno_Piscina_HR.jpg',
        // Fachadas
        'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Portaria_HR.jpg',
        // Internas
        'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Coworking_HR.jpg',
        // Loteamentos
        'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fotomonatgem_HR.jpg',
        // Geral
        'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Playground_HR.jpg',
      ],
    },
  },
  {
    key: 'videos3d',
    href: '/videos-3d',
    preview: { kind: 'vimeo', id: '1198821118' },
  },
  {
    key: 'tour360',
    href: '/tour-virtual-360',
    preview: { kind: 'iframe', src: 'https://flyingstudio.com.br/vr/vr-nortis-arte-concreta/' },
  },
  {
    key: 'apps',
    href: '/aplicativos',
    preview: { kind: 'iframe', src: 'https://flyingstudio.com.br/mirage-clubedecampo/' },
  },
  {
    key: 'dsbrave',
    href: '/dsbrave',
    preview: null,
  },
];

const MIN_DRAG_DISTANCE = 50;

/**
 * Pilha de renders arrastável: arraste (ou clique) a carta do topo para
 * mandá-la para o fundo e revelar a próxima.
 */
function DraggableStack({ images }: { images: string[] }) {
  const [cards, setCards] = useState(() => images.map((src, index) => ({ id: index, src })));
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const advance = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCards((previous) => [...previous.slice(1), previous[0]]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const distance = Math.hypot(
      info.point.x - dragStartPos.current.x,
      info.point.y - dragStartPos.current.y,
    );
    if (distance >= MIN_DRAG_DISTANCE) {
      advance();
    }
  };

  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center">
      {cards.map((card, index) => {
        const isTop = index === 0;
        /* O leque mostra no máximo 3 níveis atrás do topo — com muitas cartas
           no baralho, as demais ficam empilhadas atrás da última visível. */
        const depth = Math.min(index, 3);
        return (
          <motion.div
            key={card.id}
            className="absolute w-[260px] cursor-grab overflow-hidden rounded-[14px] border border-[var(--theme-border-soft)] bg-[#0b0a10] shadow-[0_25px_50px_-16px_rgba(0,0,0,0.5)] active:cursor-grabbing"
            style={{ zIndex: 50 - index, aspectRatio: '4/3' }}
            animate={{
              x: depth * -12,
              y: depth * -8,
              rotate: index === 0 ? 0 : -(2 + depth * 3),
              scale: 1,
              transition: { duration: 0.5 },
            }}
            drag={isTop && !isAnimating}
            dragElastic={0.2}
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTap={isTop ? advance : undefined}
            whileHover={isTop ? { scale: 1.04, transition: { duration: 0.2 } } : {}}
            whileDrag={{
              scale: 1.08,
              rotate: 0,
              zIndex: 100,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              transition: { duration: 0.1 },
            }}
          >
            <Image
              src={card.src}
              alt=""
              fill
              sizes="260px"
              className="pointer-events-none object-cover"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ServicesIndex() {
  const t = useTranslations('Home.services');
  // Linha sob o mouse agora — o preview de vídeo monta/desmonta com isso
  // (sair da linha pausa; voltar recomeça do zero).
  const [hoveredKey, setHoveredKey] = useState<ServiceKey | null>(null);
  // Iframes pesados (tour/app) montam no primeiro hover e permanecem.
  const [activated, setActivated] = useState<Partial<Record<ServiceKey, boolean>>>({});

  const activate = (key: ServiceKey) => {
    setHoveredKey(key);
    setActivated((value) => (value[key] ? value : { ...value, [key]: true }));
  };

  return (
    <section
      id="tecnologia-artistica-3d"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] pt-[clamp(5rem,12vh,9rem)] pb-[clamp(1.5rem,4vh,3rem)] transition-colors duration-200"
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,5vw,5rem)]"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        <div className="flex flex-wrap items-end justify-between gap-[24px]">
          <div>
            <motion.p
              variants={revealItem}
              className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-medium tracking-[0.28em] uppercase text-[var(--theme-accent)]"
            >
              {t('eyebrow')}
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-[16px] font-semibold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05] text-[var(--theme-text)]"
            >
              {t('titleStart')}{' '}
              <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
            </motion.h2>
          </div>
          <motion.p
            variants={revealItem}
            className="max-w-[38ch] text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] text-[var(--theme-muted)]"
          >
            {t('intro')}
          </motion.p>
        </div>

        <motion.ul variants={revealItem} className="mt-[clamp(3rem,7vh,5rem)]">
          {SERVICES.map((service, index) => (
            <li
              key={service.key}
              onMouseEnter={() => activate(service.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => activate(service.key)}
              className={`group relative border-t border-[var(--theme-border-soft)] transition-colors duration-300 hover:border-[var(--theme-accent)] focus-within:border-[var(--theme-accent)] ${
                index === SERVICES.length - 1 ? 'border-b' : ''
              }`}
            >
              <Link
                href={service.href}
                className="block py-[clamp(1.5rem,3.5vh,2.5rem)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
              >
                <div className="flex items-center justify-between gap-[24px]">
                  <span className="font-semibold tracking-[-0.02em] text-[clamp(1.7rem,3.8vw,3.4rem)] leading-[1.05] text-[var(--theme-text)] transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[14px] group-hover:text-[var(--theme-accent)] group-focus-within:text-[var(--theme-accent)]">
                    {t(`items.${service.key}.name`)}
                  </span>
                  <span className="flex shrink-0 items-center gap-[12px]">
                    <span className="hidden text-[12px] tracking-[0.2em] uppercase text-[var(--theme-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:block">
                      {t('linkHint')}
                    </span>
                    <span className="flex size-[48px] items-center justify-center rounded-full border border-[var(--theme-border-soft)] text-[var(--theme-text)] transition-all duration-300 group-hover:border-[var(--theme-accent)] group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-contrast)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
                      >
                        <path
                          d="M3 13 13 3M5 3h8v8"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </div>

                {/* Expansão conceitual — abre para baixo no hover/foco */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="max-w-[62ch] translate-y-[12px] pt-[18px] pb-[6px] pl-[14px] opacity-0 transition-[opacity,transform] delay-75 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <span className="text-[12px] font-medium tracking-[0.24em] uppercase text-[var(--theme-accent)]">
                        {t(`items.${service.key}.tagline`)}
                      </span>
                      <p className="mt-[8px] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.6] text-[var(--theme-muted)]">
                        {t(`items.${service.key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Preview vivo — interativo, some ao tirar o mouse */}
              {service.preview ? (
                <div
                  className={`pointer-events-none absolute top-1/2 z-20 hidden opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:opacity-100 lg:block ${
                    service.preview.kind === 'images'
                      ? 'right-[20%] -translate-y-1/2'
                      : `${service.preview.kind === 'vimeo' ? 'right-[16%]' : 'right-[12%]'} w-[420px] -translate-y-[68%] scale-[0.97] overflow-hidden rounded-[18px] border border-[var(--theme-border-soft)] bg-[#0b0a10] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] group-hover:scale-100`
                  }`}
                >
                  {service.preview.kind === 'images' ? (
                    <DraggableStack images={service.preview.images} />
                  ) : null}

                  {service.preview.kind === 'vimeo' ? (
                    <div className="relative aspect-video w-full">
                      {hoveredKey === service.key ? (
                        <iframe
                          src={`https://player.vimeo.com/video/${service.preview.id}?background=1&autoplay=1&muted=1&loop=1&dnt=1`}
                          title={t(`items.${service.key}.name`)}
                          allow="autoplay; fullscreen"
                          className="pointer-events-none h-full w-full border-0"
                        />
                      ) : null}
                    </div>
                  ) : null}

                  {service.preview.kind === 'iframe' ? (
                    <div className="relative aspect-video w-full">
                      {activated[service.key] ? (
                        <iframe
                          src={service.preview.src}
                          title={t(`items.${service.key}.name`)}
                          loading="lazy"
                          className="h-full w-full border-0"
                        />
                      ) : null}
                      <span className="pointer-events-none absolute bottom-[12px] left-[12px] z-10 rounded-full bg-[rgba(11,10,16,0.72)] px-[12px] py-[6px] text-[11px] text-[rgba(255,255,255,0.75)] backdrop-blur-[8px]">
                        {t('liveExample')}
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
