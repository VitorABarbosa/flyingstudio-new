export type DSbravePointIconKey =
  | 'split'
  | 'zap'
  | 'map'
  | 'orbit'
  | 'layers'
  | 'route'
  | 'home'
  | 'airplay'
  | 'smartphone';

export type DSbraveIntegrationKey =
  | 'splitview'
  | 'lotes'
  | 'mapa'
  | 'exploracao'
  | 'unify'
  | 'guide'
  | 'desire'
  | 'standalone'
  | 'app';

export type DSbraveIntegration = {
  key: DSbraveIntegrationKey;
  icon: DSbravePointIconKey;
};

export type DSbraveProject = {
  id: string;
  /** Incorporadora ou construtora — vai em destaque, acima do empreendimento. */
  client: string;
  project: string;
  image: string;
};
