import type {
  DSbraveExplainerPoint,
  DSbraveIntegration,
  DSbraveProject,
} from '../types/dsbrave.types';

/** Central em exibição no topo da página. */
export const dsbraveDemoUrl = 'https://flyingstudio.com.br/vr/vr-granlote-treviso-dsbrave/';

export const dsbraveExplainerPoints: DSbraveExplainerPoint[] = [
  { key: 'unify', icon: 'layers' },
  { key: 'guide', icon: 'route' },
  { key: 'desire', icon: 'home' },
];

export const dsbraveIntegrations: DSbraveIntegration[] = [
  { key: 'standalone', icon: '/shared/icons/devices/icon-airplay.svg' },
  { key: 'app', icon: '/shared/icons/devices/icon-smartphone.svg' },
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
