import type { DSbraveIntegration, DSbraveProject } from '../types/dsbrave.types';

/**
 * Os 4 módulos oficiais do hub (apresentação institucional "New Era"):
 * Split View, Automação de Lotes, Mapa Interativo de Arredores e
 * Exploração 360°. Texto de cada um no i18n (DSbravePage.module.items);
 * a ordem daqui é a ordem da ficha numerada na página.
 */
export const dsbraveIntegrations: DSbraveIntegration[] = [
  { key: 'splitview', icon: 'split' },
  { key: 'lotes', icon: 'zap' },
  { key: 'mapa', icon: 'map' },
  { key: 'exploracao', icon: 'orbit' },
  { key: 'unify', icon: 'layers' },
  { key: 'guide', icon: 'route' },
  { key: 'desire', icon: 'home' },
  { key: 'standalone', icon: 'airplay' },
  { key: 'app', icon: 'smartphone' },
];

/* Os arquivos de imagem são nomeados em slug (sem espaço nem acento) para não
   virarem URL escapada; o nome de exibição vive em `client`/`project`. */
export const dsbraveProjects: DSbraveProject[] = [
  {
    id: 'bcanton-immersitta',
    client: 'BCanton',
    project: 'Immersitta',
    image: '/dsbrave/projetos/bcanton-immersitta.png',
  },
  {
    id: 'crear-mont-blanc',
    client: 'Crear',
    project: 'Mont Blanc',
    image: '/dsbrave/projetos/crear-mont-blanc.png',
  },
  {
    id: 'granlote-treviso',
    client: 'Granlote',
    project: 'Treviso',
    image: '/dsbrave/projetos/granlote-treviso.png',
  },
  {
    id: 'oxe-cosmopolitan',
    client: 'OXE',
    project: 'Cosmopolitan',
    image: '/dsbrave/projetos/oxe-cosmopolitan.png',
  },
  {
    id: 'talon-atlantis',
    client: 'Talon',
    project: 'Atlantis',
    image: '/dsbrave/projetos/talon-atlantis.png',
  },
];
