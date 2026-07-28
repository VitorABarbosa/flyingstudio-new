import type { TourBenefit, TourProjectCard } from '../types/tour.types';

/* Os arquivos de imagem são nomeados em slug (sem espaço nem acento) para não
   virarem URL escapada; o nome de exibição vive em `client`/`project`. */
export const tourProjectCards: TourProjectCard[] = [
  {
    id: 'grupo-lar-4b',
    client: 'Grupo Lar',
    project: '4B',
    image: '/tour/projetos/grupo-lar-4b.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-grupo-lar-4b-rh2/',
  },
  {
    id: 'arch-consolacao',
    client: 'Archtech',
    project: 'Arch Consolação',
    image: '/tour/projetos/archtech-arch-consolacao.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-archtech-consolacao-app/',
  },
  {
    id: 'ascen-rao',
    client: 'Ascen',
    project: 'RAO',
    image: '/tour/projetos/ascen-rao.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-ascen-rao/',
  },
  {
    id: 'elecon-solaris',
    client: 'Elecon',
    project: 'Solaris',
    image: '/tour/projetos/elecon-solaris.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-elecon-braganca-tour-hr/',
  },
  {
    id: 'exkalla-fontelo',
    client: 'Exkalla',
    project: 'Fontelo',
    image: '/tour/projetos/exkalla-fontelo.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-exkalla-fontelo-lazer/',
  },
  {
    id: 'tarraf-almaviva',
    client: 'Tarraf',
    project: 'Almaviva',
    image: '/tour/projetos/tarraf-almaviva.png',
    tourUrl: 'https://flyingstudio.com.br/vr/vr-tarraf-almaviva/',
  },
];

// Título e descrição de cada benefício vêm do i18n
// (Tour360Page.benefits.items.<id>).
export const tourBenefits: TourBenefit[] = [
  { id: '1', icon: 'headset' },
  { id: '2', icon: 'sliders' },
  { id: '3', icon: 'pointer' },
  { id: '4', icon: 'globe' },
];
