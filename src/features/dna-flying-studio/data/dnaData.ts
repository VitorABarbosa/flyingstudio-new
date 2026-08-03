import type {
  DnaCompany,
  DnaEssenciaSlideKey,
  DnaPartnerLogo,
  DnaPilar,
  DnaVoz,
} from '../types/dna.types';

export const dnaEssenciaSlideKeys: DnaEssenciaSlideKey[] = [
  'cultura',
  'proposito',
  'manifesto',
];

export const dnaPilares: DnaPilar[] = [
  { key: 'missao', icon: 'rocket' },
  { key: 'visao', icon: 'telescope' },
  { key: 'valores', icon: 'dna' },
];

// Cortes dos depoimentos do dia dos funcionários (Vimeo).
// O CTA final aponta para o vídeo completo no YouTube.
export const dnaVozesFullVideoUrl = 'https://www.youtube.com/watch?v=dfs0MTIjM0Y';

export const dnaVozes: DnaVoz[] = [
  { key: 'transformacao', vimeoId: '1207529911' },
  { key: 'pertencimento', vimeoId: '1207529873' },
  { key: 'pluralidade', vimeoId: '1207529803' },
  { key: 'impacto', vimeoId: '1207529764' },
  { key: 'proposito', vimeoId: '1207529728' },
];

export const dnaQgImage = {
  src: '/home/sobre/sobre-office-01.png',
  alt: 'Escritório da Flying Studio na Berrini',
};

export const dnaHistoriaImages = [
  { id: 'office-1', src: '/home/sobre/sobre-office-01.png' },
  { id: 'office-2', src: '/home/sobre/sobre-office-02.png' },
  { id: 'office-3', src: '/home/footer/foto-empresa.jpg' },
];

// Cores de identidade oficiais de cada empresa do grupo.
export const dnaCompanies: DnaCompany[] = [
  {
    key: 'flying',
    photoSrc: '/home/footer/foto-empresa.jpg',
    logoSrc: '/home/nosso-grupo/logos/flying-studio.png',
    logoWidth: 1920,
    logoHeight: 353,
    color: '#7e52ff',
  },
  {
    key: 'rinno',
    photoSrc: '/home/nosso-grupo/cosmopolitan-oxe.jpg',
    // Concept film Grupo Macuco — Grand Canal Residence, do acervo de Vídeos.
    videoVimeoId: '1206807894',
    logoSrc: '/home/nosso-grupo/logos/rinno-films.png',
    logoWidth: 1920,
    logoHeight: 378,
    color: '#ff00a4',
    siteUrl: 'https://rinnofilms.com.br',
  },
  {
    key: 'nid',
    photoSrc:
      'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_R00.jpg',
    logoSrc: '/home/nosso-grupo/logos/nid.png',
    logoWidth: 291,
    logoHeight: 83,
    color: '#ff9226',
    siteUrl: 'https://nid.com.br',
  },
  {
    key: 'ogdi',
    photoSrc: '/CONSTRUCAO.png',
    logoSrc: '/brand/OGDI_COMPLETO_BRANCO.png',
    logoWidth: 2400,
    logoHeight: 1792,
    logoDisplayHeight: 64,
    color: '#005f73',
    siteUrl: 'https://ogdi.com.br',
  },
];

export const dnaGrupoMotherPhoto = {
  src: '/home/footer/foto-empresa.jpg',
  alt: 'Estúdio da Flying Studio',
};

export const dnaPartnerLogos: DnaPartnerLogo[] = [
  { id: 'ascen', src: '/home/parceiros/partner-ascen.png' },
  { id: 'cury', src: '/home/parceiros/partner-cury.png' },
  { id: 'msh', src: '/home/parceiros/partner-msh.png' },
  { id: 'zats', src: '/home/parceiros/partner-zats.png' },
  { id: 'sulplan', src: '/home/parceiros/partner-sulplan.png' },
  { id: 'artesano', src: '/home/parceiros/partner-artesano.png' },
  { id: 'logica', src: '/home/parceiros/partner-logica.png' },
  { id: 'rsf', src: '/home/parceiros/partner-rsf.png' },
  { id: 'tarraf', src: '/home/parceiros/partner-tarraf.png' },
];
