import type { CaseProject, GroupCompany } from '../types/cases.types';

export const groupCompanies: GroupCompany[] = [
  { id: 'ogdi', number: '01', logo: '/cases/logo-ogdi.png', logoWidth: 153, logoHeight: 58, accentColor: '#0d506a' },
  { id: 'nid', number: '02', logo: '/cases/logo-nid.png', logoWidth: 187, logoHeight: 53, accentColor: '#e68643' },
  { id: 'flying', number: '03', logo: '/cases/logo-flying.png', logoWidth: 292, logoHeight: 58, accentColor: '#7e52ff' },
  { id: 'rinno', number: '04', logo: '/cases/logo-rinno.png', logoWidth: 277, logoHeight: 55, accentColor: '#ff00a9' },
];

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
    id: 'cosmopolitan',
    title: 'Cosmopolitan',
    company: 'OXE ENGENHARIA',
    location: 'SÃO PAULO, SP',
    image: '/cases/cosmopolitan.jpg',
    size: 'half',
    imagePosition: 'center 48%',
  },
  {
    id: 'vita-vila-prudente',
    title: 'Vita Vila Prudente',
    company: 'ENGECASTRO',
    location: 'SÃO PAULO, SP',
    image: '/cases/vita-vila-prudente.jpg',
    size: 'half',
    imagePosition: 'center 60%',
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
