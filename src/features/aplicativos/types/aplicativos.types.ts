export type AppProjectCard = {
  id: string;
  /** Incorporadora ou construtora — o destaque em cima do card. */
  client: string;
  /** Nome do empreendimento. */
  project: string;
  image: string;
  /** Aplicativo que o card carrega na seção "Veja com os próprios olhos". */
  appUrl: string;
};

export type BeneficioIconKey = 'palette' | 'devices' | 'sparkles' | 'presentation';

export type BeneficioItem = {
  /** Chave do item no namespace AplicativosPage.benefits.items. */
  id: string;
  icon: BeneficioIconKey;
};
