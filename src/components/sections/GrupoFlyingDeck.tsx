'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';

type CompanyKey = 'flying' | 'rinno' | 'nid' | 'ogdi';

type CompanyMedia = { type: 'image'; src: string } | { type: 'vimeo'; id: string };

/** Cor-assinatura de cada casa — também são as paradas do degradê da linha.
    `site: null` = a Flying é a casa; o CTA dela leva ao nosso DNA. */
const COMPANIES: {
  key: CompanyKey;
  color: string;
  media: CompanyMedia;
  logo: string;
  logoSize: string;
  logoPosition: string;
  site: string | null;
}[] = [
  {
    key: 'flying',
    color: '#7E52FF', // roxo Flying
    media: {
      type: 'image',
      /* O Sky Pool saiu do acervo novo — piscina do Dado Vila Mariana no lugar. */
      src: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Dado_Vila_Mariana_Piscina_HR.jpg',
    },
    logo: '/cases/logo-flying.png',
    logoSize: 'min(80%, 300px)',
    logoPosition: 'center 51%',
    site: null,
  },
  {
    key: 'rinno',
    color: '#FF3D8A', // rosa Rinno
    /* O filme Grand Canal — o mesmo do card da Rinno no DNA. */
    media: { type: 'vimeo', id: '1206807894' },
    logo: '/cases/logo-rinno.png',
    logoSize: 'min(76%, 300px)',
    logoPosition: 'center',
    site: 'https://rinnofilms.com.br',
  },
  {
    key: 'nid',
    color: '#FF8A3D', // laranja NID
    media: {
      type: 'image',
      /* Arquivo local escolhido pelo Vitor (2026-08-05). */
      src: '/imagem-nid.jpg',
    },
    logo: '/cases/logo-nid.png',
    logoSize: 'min(64%, 250px)',
    logoPosition: 'center',
    site: 'https://nidstudio.com.br',
  },
  {
    key: 'ogdi',
    color: '#0F7C8C', // azul petróleo Open Group
    media: { type: 'image', src: '/CONSTRUCAO.png' },
    logo: '/cases/logo-ogdi.png',
    logoSize: 'min(64%, 250px)',
    logoPosition: 'center',
    site: 'https://ogdi.com.br',
  },
];

const EASE_CLASS = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/**
 * CTA leve para o site de cada casa, na cor dela: as externas abrem em nova
 * aba (seta inclinada); a Flying é a casa, então o convite leva ao nosso DNA.
 */
function CompanySiteCta({
  company,
  className = '',
}: {
  company: (typeof COMPANIES)[number];
  className?: string;
}) {
  const t = useTranslations('Home.grupo');
  const classes = `group/cta inline-flex items-center gap-[6px] font-['Outfit'] text-[13px] font-semibold transition-opacity duration-200 hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-none ${className}`;
  const arrow = (external: boolean) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 group-hover/cta:translate-x-[3px] ${external ? '-rotate-45' : ''}`}
    >
      <path
        d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return company.site ? (
    <a
      href={company.site}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      style={{ color: company.color }}
    >
      {t('visitLabel')}
      {arrow(true)}
    </a>
  ) : (
    <Link href={futurePageHrefs.dna} className={classes} style={{ color: company.color }}>
      {t('visitFlying')}
      {arrow(false)}
    </Link>
  );
}

/**
 * A linha neon que costura as quatro casas: uma onda contínua atravessando o
 * fundo da cortina, em degradê roxo → rosa → laranja → azul petróleo — a
 * mesma essência mudando de cor ao passar por cada empresa. Dois traços:
 * um grosso desfocado (o brilho) e um fino nítido (o filamento).
 */
function NeonThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 560"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="grupo-neon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7E52FF" />
          <stop offset="0.36" stopColor="#FF3D8A" />
          <stop offset="0.68" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#0F7C8C" />
        </linearGradient>
        <filter id="grupo-neon-blur" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <path
        d="M-40 400 C 260 250, 520 470, 800 330 S 1340 180, 1640 300"
        fill="none"
        stroke="url(#grupo-neon)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.55"
        filter="url(#grupo-neon-blur)"
      />
      <path
        d="M-40 400 C 260 250, 520 470, 800 330 S 1340 180, 1640 300"
        fill="none"
        stroke="url(#grupo-neon)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * A cortina do Nosso Grupo: as quatro casas costuradas pela linha neon.
 *
 * Vive fora da home porque a página Sobre Nós mostra a mesma cortina — o
 * texto de cada página é que muda. A cópia das empresas sai sempre de
 * `Home.grupo.companies`, para as duas nunca divergirem.
 */
export default function GrupoFlyingDeck() {
  const t = useTranslations('Home.grupo');
  const [focusedKey, setFocusedKey] = useState<CompanyKey | null>(null);
  /* O deck desktop fica no DOM do celular escondido por CSS — mas `display:
     none` NÃO impede iframe de carregar: o Vimeo tocava em loop invisível no
     iPhone, comendo rede e memória até a aba do Safari morrer. O player só
     monta quando a tela é realmente desktop. */
  const [mountVimeo, setMountVimeo] = useState(false);

  useEffect(() => {
    setMountVimeo(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  return (
    <div className="relative">
      {/* A linha atravessa a TELA inteira, de ponta a ponta — vive fora
          do trilho de 1840px, ancorada na largura da viewport. */}
      <div className="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2">
        <NeonThread />
      </div>

      {/* Desktop: lâminas expansíveis. */}
      <div
        onMouseLeave={() => setFocusedKey(null)}
        className="relative hidden h-[clamp(420px,56vh,560px)] gap-[12px] lg:flex"
      >
        {COMPANIES.map((company, index) => {
          const isFocused = focusedKey === company.key;

          return (
            <article
              key={company.key}
              onMouseEnter={() => setFocusedKey(company.key)}
              onFocus={() => setFocusedKey(company.key)}
              tabIndex={0}
              style={{
                flexGrow: isFocused ? 2.6 : 1,
                flexBasis: 0,
                borderColor: isFocused
                  ? `${company.color}80`
                  : 'color-mix(in srgb, var(--theme-text) 10%, transparent)',
                boxShadow: isFocused
                  ? `0 28px 70px -34px ${company.color}cc`
                  : '0 18px 44px -30px rgba(0,0,0,0.5)',
              }}
              className={`group relative h-full min-w-0 overflow-hidden rounded-[26px] border bg-[#0b0a10] transition-[flex-grow,border-color,box-shadow] duration-700 ${EASE_CLASS} focus-visible:outline-none`}
            >
              {/* Mídia da casa, sempre viva — em repouso ela aparece SÓ
                  pela janela da logo. */}
              <span
                className={`absolute inset-0 transition-transform duration-700 ${EASE_CLASS} ${
                  isFocused ? 'scale-[1.02]' : ''
                }`}
              >
                {company.media.type === 'image' ? (
                  <Image
                    src={company.media.src}
                    alt=""
                    fill
                    sizes="(max-width: 1840px) 45vw, 820px"
                    className="object-cover"
                  />
                ) : mountVimeo ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${company.media.id}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1`}
                    title=""
                    allow="autoplay"
                    loading="lazy"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
                  />
                ) : null}
              </span>

              {/* Véu escuro TRANSLÚCIDO com a LOGO recortada no centro: a
                  mídia aparece inteira por baixo, escurecida — e em cor
                  plena dentro do desenho da logo. Ao abrir, o véu
                  dissolve e a mídia toma o card. */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-500 ${EASE_CLASS} ${
                  isFocused ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  /* Quanto mais fechado o véu, mais a janela da logo salta —
                     é o contraste entre os dois que desenha a marca. */
                  backgroundColor: 'rgba(6, 5, 10, 0.85)',
                  WebkitMaskImage: `url(${company.logo}), linear-gradient(#fff, #fff)`,
                  WebkitMaskRepeat: 'no-repeat, no-repeat',
                  WebkitMaskPosition: `${company.logoPosition}, center`,
                  WebkitMaskSize: `${company.logoSize} auto, 100% 100%`,
                  WebkitMaskComposite: 'xor',
                  maskImage: `url(${company.logo}), linear-gradient(#fff, #fff)`,
                  maskRepeat: 'no-repeat, no-repeat',
                  maskPosition: `${company.logoPosition}, center`,
                  maskSize: `${company.logoSize} auto, 100% 100%`,
                  maskComposite: 'exclude',
                }}
              />

              {/* Fade só no pé do card aberto, para o texto ler bem. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-[55%] transition-opacity duration-500 ${
                  isFocused ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
                }}
              />

              {/* Índice na cor da casa. */}
              <span
                className="absolute top-[24px] left-[24px] font-['Outfit'] text-[13px] font-semibold tracking-[0.18em]"
                style={{ color: company.color }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Lombada: nome em pé enquanto fechada. */}
              <span
                className={`absolute bottom-[26px] left-[24px] rotate-180 font-['Outfit'] text-[clamp(1.1rem,1.5vw,1.45rem)] font-semibold whitespace-nowrap text-white/90 transition-opacity duration-300 [writing-mode:vertical-rl] ${
                  isFocused ? 'opacity-0' : 'opacity-90'
                }`}
              >
                {t(`companies.${company.key}.name`)}
              </span>

              {/* Conteúdo aberto. */}
              <span
                className={`absolute inset-x-[28px] bottom-[28px] block transition-[opacity,transform] duration-500 ${EASE_CLASS} ${
                  isFocused
                    ? 'translate-y-0 opacity-100 [transition-delay:170ms]'
                    : 'translate-y-[14px] opacity-0 [transition-delay:0ms]'
                }`}
              >
                {/* Acima do nome vai o LEMA, não o ramo de atuação: é ele que
                    apresenta a marca. O que cada casa faz está na descrição. */}
                <span
                  className="block font-['Outfit'] text-[11px] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: company.color }}
                >
                  {t(`companies.${company.key}.slogan`)}
                </span>
                <span className="mt-[8px] block font-['Outfit'] text-[clamp(1.7rem,2.4vw,2.4rem)] leading-[1.05] font-semibold whitespace-nowrap text-white">
                  {t(`companies.${company.key}.name`)}
                </span>
                <span className="mt-[12px] block max-w-[42ch] font-['Outfit'] text-[14px] leading-[1.6] text-white/75 md:text-[15px]">
                  {t(`companies.${company.key}.desc`)}
                </span>
                <CompanySiteCta company={company} className="mt-[14px]" />
              </span>
            </article>
          );
        })}
      </div>

      {/* Mobile: casas empilhadas, sempre abertas, com a cor de cada uma. */}
      <div className="relative flex flex-col gap-[12px] lg:hidden">
        {COMPANIES.map((company, index) => (
          <article
            key={company.key}
            style={{
              borderColor: `${company.color}55`,
              background: `linear-gradient(to right, ${company.color}1f, transparent 65%), color-mix(in srgb, var(--theme-surface) 90%, transparent)`,
            }}
            className="relative overflow-hidden rounded-[20px] border p-6 backdrop-blur-[6px]"
          >
            <span
              className="font-['Outfit'] text-[11px] font-semibold tracking-[0.2em]"
              style={{ color: company.color }}
            >
              {String(index + 1).padStart(2, '0')} ·{' '}
              <span className="uppercase">{t(`companies.${company.key}.slogan`)}</span>
            </span>
            <h3 className="mt-2 font-['Outfit'] text-[22px] leading-tight font-semibold text-[var(--theme-text)]">
              {t(`companies.${company.key}.name`)}
            </h3>
            <p className="mt-2 font-['Outfit'] text-[14px] leading-[1.6] text-[var(--theme-muted)]">
              {t(`companies.${company.key}.desc`)}
            </p>
            <CompanySiteCta company={company} className="mt-3" />
          </article>
        ))}
      </div>
    </div>
  );
}
