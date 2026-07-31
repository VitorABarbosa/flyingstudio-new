/**
 * Vitrine estática: os cards apresentam os projetos, mas o aplicativo em si
 * não é navegável pelo site — a tecnologia é apresentada em demonstração
 * guiada, sob solicitação. Por isso não existe campo de URL aqui: o endereço
 * real não deve embarcar no bundle.
 */
export type AppProjectCard = {
  id: string;
  /** Incorporadora ou construtora — o destaque em cima do card. */
  client: string;
  /** Nome do empreendimento. */
  project: string;
  image: string;
};

export type BeneficioIconKey = 'palette' | 'devices' | 'sparkles' | 'presentation';

export type BeneficioItem = {
  /** Chave do item no namespace AplicativosPage.benefits.items. */
  id: string;
  icon: BeneficioIconKey;
};
