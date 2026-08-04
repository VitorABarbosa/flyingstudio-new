import type { CompanyId } from '../types/cases.types';

/**
 * Logos claras das casas para uso sobre foto/faixa escura — mesmas artes dos
 * banners do Nosso Grupo, com as proporções originais de cada arquivo.
 */
export const companyBannerLogos: Record<
  CompanyId,
  { src: string; alt: string; width: number; height: number }
> = {
  ogdi: { src: '/cases/logo-ogdi.png', alt: 'OGDI', width: 153, height: 58 },
  nid: { src: '/cases/logo-nid.png', alt: 'NID Studio', width: 117, height: 34 },
  flying: { src: '/cases/logo-flying.png', alt: 'Flying Studio', width: 195, height: 25 },
  rinno: { src: '/cases/logo-rinno.png', alt: 'Rinno Films', width: 167, height: 33 },
};
