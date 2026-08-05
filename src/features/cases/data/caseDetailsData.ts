import type { CaseDetail } from '../types/cases.types';
import { CASES_CDN, caseProjects } from './casesData';

/**
 * O MOLDE dos cases internos: cada case do Nosso Grupo ganha página própria
 * em /cases/<id> registrando uma entrada aqui + textos nos messages
 * (`CasesPage.detail.items.<id>`). Nada de layout novo por case — só dados.
 *
 * As imagens vivem no servidor em site-flying-web/CASES/<PROJETO>/ (mestres
 * 3840 q85 gerados por scripts/preparar-conteudo-cases.mjs); as miniaturas do
 * mosaico derivam trocando -web por -thumbs, como na galeria.
 */
export const caseDetails: Record<string, CaseDetail> = {
  'macuco-grand-canal': {
    id: 'macuco-grand-canal',
    heroImage: `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Piscina_HR.jpg`,
    heroImagePosition: 'center 55%',
    companies: ['ogdi', 'nid', 'flying', 'rinno'],
    /* Todas as imagens do projeto — as mais impactantes abrem o mosaico. */
    mosaic: [
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Fachada_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Hall_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Piscina_Voo_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Living_01_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Lounge_Bar_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Salao_De_Festas_01_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Terraco_01_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Gourmet_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Academia_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Cinema_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Spinning_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Pilates_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Massagem_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Beauty_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Gourmet_Externo_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Salao_De_Festas_02_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Sala_Cozinha_Final_04_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Cozinha_Final_5_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Jogos_Adulto_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Jogos_Juvenil_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Interplate_Jogos_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Brinquedoteca_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Espaco_Mae_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Playground_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Quadra_Coberta_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Terraco_Fit_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Pet_Care_HR.jpg`,
      `${CASES_CDN}/MACUCO_GRAND_CANAL/Macuco_Grand_Canal_Portaria_HR.jpg`,
    ],
  },
  'canvas-altino': {
    id: 'canvas-altino',
    heroImage: `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Playground_HR.jpg`,
    heroImagePosition: 'center 55%',
    companies: ['ogdi', 'nid', 'flying', 'rinno'],
    /* Todas as imagens do projeto — as mais impactantes abrem o mosaico. */
    mosaic: [
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Fachada_Diurna_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Piscina_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Fachada_Noturna_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Academia_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Apartamento_Decorado_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Salao_Festas_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Pet_Place_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Churrasqueira_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Brinquedoteca_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Fachada_Conceitual_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Fachada_Noturna_B_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Mini_Market_HR.jpg`,
      `${CASES_CDN}/CANVAS_ALTINO/Canvas_Altino_Bicicletario_HR.jpg`,
    ],
  },
  'the-one-tucuruvi': {
    id: 'the-one-tucuruvi',
    heroImage: `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Sky_Pool_HR.jpg`,
    heroImagePosition: 'center 55%',
    companies: ['ogdi', 'nid', 'flying', 'rinno'],
    /* Todas as imagens do projeto — as mais impactantes abrem o mosaico. */
    mosaic: [
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Fachada_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Sky_Square_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Gourmet_Rooftop_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Lobby_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Living_Studio_29m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Mezanino_Studio_29m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Cine_Open_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Piscina_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Terraco_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Fachada_Conceitual_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Living_47m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Dormitorio_47m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Living_31_91m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Studio_33m2_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Coworking_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Academia_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Gourmet_Com_Churrasqueira_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Salao_De_Festas_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Pet_Care_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Mini_Market_Conveniencia_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Portaria_HR.jpg`,
      `${CASES_CDN}/THE_ONE_TUCURUVI/Ousy_The_One_Tucuruvi_Lavanderia_HR.jpg`,
    ],
  },
  livigno: {
    id: 'livigno',
    heroImage: `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Hall_HR.jpg`,
    heroImagePosition: 'center 50%',
    companies: ['ogdi', 'nid', 'flying', 'rinno'],
    /* Todas as imagens do projeto — as mais impactantes abrem o mosaico. */
    mosaic: [
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Fachada_Diurna_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Livigno_Piscina_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Fireplace_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Espaco_Mulher_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Estudio_Podcast_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Fachada_Noturna_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Voo_Rooftop_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Praca_Maes_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Gourmet_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Cine_Open_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Sauna_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Fitness_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Spinning_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Salao_Festas_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Brinquedoteca_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Acqua_Play_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Playground_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Churrasqueira_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Portaria_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Bicicletario_HR.jpg`,
      `${CASES_CDN}/LIVIGNO/Tavares_Rosseti_Livigno_Delivery_HR.jpg`,
    ],
  },
};

export function getCaseDetail(id: string): CaseDetail | undefined {
  return caseDetails[id];
}

export function hasCaseDetail(id: string): boolean {
  return id in caseDetails;
}

/**
 * O case seguinte na ordem dos banners do Nosso Grupo (circular) — alimenta
 * o "Próximo case" no pé da página interna.
 */
export function getNextCaseProject(id: string) {
  const index = caseProjects.findIndex((project) => project.id === id);
  return caseProjects[(index + 1) % caseProjects.length];
}
