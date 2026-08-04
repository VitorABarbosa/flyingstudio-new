export type CompanyId = 'ogdi' | 'nid' | 'flying' | 'rinno';

export type GroupCompany = {
  id: CompanyId;
  number: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  accentColor: string;
};

export type CaseProject = {
  id: string;
  title: string;
  company: string;
  location: string;
  image: string;
  size: 'wide' | 'half';
  imagePosition?: string;
};

/**
 * A página interna de um case. `id` casa com o `CaseProject.id` — o projeto
 * do banner e o detalhe são o mesmo registro em duas profundidades.
 * Os textos vivem nos messages em `CasesPage.detail.items.<id>`.
 */
export type CaseDetail = {
  id: string;
  heroImage: string;
  heroImagePosition?: string;
  /** Casas que participaram — alimenta os logos do hero e o fecho. */
  companies: CompanyId[];
  /** As melhores imagens do projeto, no mosaico ponta a ponta. */
  mosaic: string[];
};
