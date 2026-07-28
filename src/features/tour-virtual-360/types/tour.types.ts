export type TourProjectCard = {
  id: string;
  /** Incorporadora ou construtora — vai em destaque, acima do empreendimento. */
  client: string;
  project: string;
  image: string;
  /** Tour carregado na seção "Experimente" ao escolher este card. */
  tourUrl: string;
};

export type TourBeneficioIconKey = 'headset' | 'sliders' | 'pointer' | 'globe';

export type TourBenefit = {
  /** Chave do item no namespace Tour360Page.benefits.items. */
  id: string;
  icon: TourBeneficioIconKey;
};
