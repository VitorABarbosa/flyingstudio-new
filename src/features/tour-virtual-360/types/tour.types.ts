/**
 * Vitrine estática: os cards apresentam os projetos, mas o tour em si não é
 * navegável pelo site — a tecnologia é apresentada em demonstração guiada,
 * sob solicitação. Sem campo de URL: o endereço real não embarca no bundle.
 */
export type TourProjectCard = {
  id: string;
  /** Incorporadora ou construtora — vai em destaque, acima do empreendimento. */
  client: string;
  project: string;
  image: string;
};

export type TourBeneficioIconKey = 'headset' | 'sliders' | 'pointer' | 'globe';

export type TourBenefit = {
  /** Chave do item no namespace Tour360Page.benefits.items. */
  id: string;
  icon: TourBeneficioIconKey;
};
