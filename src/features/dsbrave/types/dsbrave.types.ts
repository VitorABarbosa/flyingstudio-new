export type DSbraveExplainerPointKey = 'unify' | 'guide' | 'desire';

export type DSbravePointIconKey = 'layers' | 'route' | 'home';

export type DSbraveExplainerPoint = {
  key: DSbraveExplainerPointKey;
  icon: DSbravePointIconKey;
};

export type DSbraveIntegrationKey = 'standalone' | 'app';

export type DSbraveIntegration = {
  key: DSbraveIntegrationKey;
  icon: string;
};

export type DSbraveProject = {
  id: string;
  /** Incorporadora ou construtora — vai em destaque, acima do empreendimento. */
  client: string;
  project: string;
  image: string;
};
