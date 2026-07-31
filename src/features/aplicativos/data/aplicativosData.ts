import type { AppProjectCard, BeneficioItem } from '../types/aplicativos.types';

/**
 * Projetos em exposição.
 *
 * Os arquivos de imagem usam nome normalizado (sem espaço nem acento) para não
 * depender de codificação de URL em servidor ou CDN. O nome que aparece na tela
 * vive aqui, em `client` e `project` — campos separados porque o card destaca
 * a construtora acima do empreendimento.
 */
export const appProjectCards: AppProjectCard[] = [
  {
    id: 'arch-consolacao',
    client: 'Archtech',
    project: 'Arch Consolação',
    image: '/aplicativos/projetos/archtech-arch-consolacao.png',
  },
  {
    id: 'washington-luiz',
    client: 'Construlike',
    project: 'Washington Luiz',
    image: '/aplicativos/projetos/construlike-washington-luiz.png',
  },
  {
    id: 'the-one-tucuruvi',
    client: 'Ousy',
    project: 'The One Tucuruvi',
    image: '/aplicativos/projetos/ousy-the-one-tucuruvi.png',
  },
  {
    id: 'seven',
    client: 'Argo',
    project: 'Seven',
    image: '/aplicativos/projetos/argo-seven.png',
  },
  {
    id: 'mirage',
    client: 'Construlike',
    project: 'Mirage Clube de Campo',
    image: '/aplicativos/projetos/construlike-mirage-clube-de-campo.png',
  },
  {
    id: 'verde-e-vida',
    client: 'Miro',
    project: 'Verde e Vida',
    image: '/aplicativos/projetos/miro-verde-e-vida.png',
  },
];

// Título e descrição de cada benefício vêm do i18n
// (AplicativosPage.benefits.items.<id>).
export const beneficiosItems: BeneficioItem[] = [
  { id: 'sob-medida', icon: 'palette' },
  { id: 'multiplataforma', icon: 'devices' },
  { id: 'memoravel', icon: 'sparkles' },
  { id: 'corretor', icon: 'presentation' },
];
