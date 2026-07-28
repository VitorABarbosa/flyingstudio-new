/**
 * Dados dos 5 cards da seção "Conheça Nosso Grupo".
 *
 * Cada card pode ter um `expanded` opcional descrevendo o conteúdo
 * que aparece quando o card está em hover: lista de empresas
 * (logo + tags de serviços) + CTA "Ver completo".
 *
 * As empresas do grupo (nid, rinno e Flying) são as mesmas em todos os
 * projetos, então o mesmo `grupoExpanded` é reaproveitado por todos os
 * cards — exibindo a mesma animação de entrada em cada um.
 */

export type GrupoCardKey = 'card1' | 'card2' | 'card3' | 'card4' | 'card5';

export type CompanyBlock = {
  id: string;
  /** Path absoluto da logo (PNG/SVG transparente). */
  logoSrc: string;
  /** Dimensões intrínsecas para o next/image. */
  logoWidth: number;
  logoHeight: number;
  /** Altura visual no design (Figma 1920). */
  displayHeight: number;
  /** Lista de tags de serviços (renderizadas como chips brancos). */
  services: string[];
};

export type ExpandedContent = {
  companies: CompanyBlock[];
  ctaLabel: string;
};

export type GrupoCard = {
  key: GrupoCardKey;
  /** Path da imagem estática. Usada se `video` não estiver definido. */
  image?: string;
  /** Path do vídeo em loop. Quando presente, prevalece sobre `image`. */
  video?: string;
  barColor: string;
  expanded?: ExpandedContent;
};

const grupoExpanded: ExpandedContent = {
  companies: [
    {
      id: 'nid',
      logoSrc: '/home/nosso-grupo/logos/nid.png',
      logoWidth: 291,
      logoHeight: 83,
      displayHeight: 32,
      services: [
        'PDV',
        'Apartamento Decorado',
        'Design de Fachada',
        'Design de Interiores de Áreas Comuns',
      ],
    },
    {
      id: 'rinno',
      logoSrc: '/home/nosso-grupo/logos/rinno-films.png',
      logoWidth: 1920,
      logoHeight: 378,
      displayHeight: 31,
      services: ['Filme Conceito', 'Filme Viral', 'Filme Produto'],
    },
    {
      id: 'flying',
      logoSrc: '/home/nosso-grupo/logos/flying-studio.png',
      logoWidth: 1920,
      logoHeight: 353,
      displayHeight: 35,
      services: [
        'Visualização Externa',
        'Visualização Interna',
        'Plantas Humanizadas',
        'Aplicativo Interativo',
      ],
    },
  ],
  ctaLabel: 'Ver completo',
};

export const GRUPO_CARDS: GrupoCard[] = [
  {
    key: 'card1',
    image: '/home/nosso-grupo/cosmopolitan-oxe.jpg',
    barColor: '#7e52ff',
    expanded: grupoExpanded,
  },
  {
    key: 'card2',
    image: '/home/nosso-grupo/the-one-saude-ousy.jpg',
    barColor: '#b6ff00',
    expanded: grupoExpanded,
  },
  {
    key: 'card3',
    video: '/home/nosso-grupo/Video_Loop.mp4',
    barColor: '#ffae52',
    expanded: grupoExpanded,
  },
  {
    key: 'card4',
    image: '/home/nosso-grupo/vita-vila-prudente-engecastro.jpg',
    barColor: '#0023f4',
    expanded: grupoExpanded,
  },
  {
    key: 'card5',
    image: '/home/nosso-grupo/livigno-tavares-rosseti.jpg',
    barColor: '#b6ff00',
    expanded: grupoExpanded,
  },
];
