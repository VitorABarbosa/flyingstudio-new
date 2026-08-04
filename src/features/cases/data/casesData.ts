import type { CaseProject, GroupCompany } from '../types/cases.types';

export const groupCompanies: GroupCompany[] = [
  { id: 'ogdi', number: '01', logo: '/cases/logo-ogdi.png', logoWidth: 153, logoHeight: 58, accentColor: '#0d506a' },
  { id: 'nid', number: '02', logo: '/cases/logo-nid.png', logoWidth: 187, logoHeight: 53, accentColor: '#e68643' },
  { id: 'flying', number: '03', logo: '/cases/logo-flying.png', logoWidth: 292, logoHeight: 58, accentColor: '#7e52ff' },
  { id: 'rinno', number: '04', logo: '/cases/logo-rinno.png', logoWidth: 277, logoHeight: 55, accentColor: '#ff00a9' },
];

/* Conteúdo dos cases no servidor de imagens — mesma esteira da galeria
   (mestres web 3840 q85; miniaturas derivam trocando -web por -thumbs). */
export const CASES_CDN = 'https://img.flyingstudio.com.br/site-flying-web/CASES';

export const caseProjects: CaseProject[] = [
  {
    id: 'the-one-saude',
    title: 'The One Saúde',
    company: 'OUSY',
    location: 'SÃO PAULO, SP',
    image: '/cases/the-one.jpg',
    size: 'wide',
    imagePosition: 'center 52%',
  },
  {
    id: 'canvas-altino',
    title: 'Canvas Altino',
    company: 'CANVAS',
    location: 'OSASCO, SP',
    image: `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Fachada_Noturna_HR.jpg`,
    size: 'half',
    imagePosition: 'center 42%',
  },
  {
    id: 'the-one-tucuruvi',
    title: 'The One Tucuruvi',
    company: 'OUSY',
    location: 'SÃO PAULO, SP',
    image: `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Sky_Pool_HR.jpg`,
    size: 'half',
    imagePosition: 'center 55%',
  },
  {
    id: 'livigno',
    title: 'Livigno',
    company: 'TAVARES ROSSETE',
    location: 'SÃO PAULO, SP',
    image: '/cases/livigno.jpg',
    size: 'wide',
    imagePosition: 'center 56%',
  },
];
