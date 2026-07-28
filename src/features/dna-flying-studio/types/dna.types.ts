export type DnaEssenciaSlideKey = 'cultura' | 'proposito' | 'manifesto';

export type DnaVozKey =
  | 'transformacao'
  | 'pertencimento'
  | 'pluralidade'
  | 'impacto'
  | 'proposito';

export type DnaVoz = {
  key: DnaVozKey;
  /** ID do corte do depoimento no Vimeo. */
  vimeoId: string;
};

export type DnaPilarKey = 'missao' | 'visao' | 'valores';

export type DnaPilar = {
  key: DnaPilarKey;
  /** Ícone lucide renderizado pelo card (rocket | telescope | dna). */
  icon: 'rocket' | 'telescope' | 'dna';
};

export type DnaCompanyKey = 'flying' | 'rinno' | 'nid' | 'ogdi';

export type DnaCompany = {
  key: DnaCompanyKey;
  /** Logo transparente; ausente = placeholder tipográfico com o nome. */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  /** Altura visual da logo no card (px). Default 38; lockups verticais pedem mais. */
  logoDisplayHeight?: number;
  /** Cor de identidade da empresa (barra e lavagem do card). */
  color?: string;
  /** Site institucional da empresa (CTA do card). */
  siteUrl?: string;
  /** Foto de fundo do card da empresa. */
  photoSrc?: string;
  /** Filme de fundo (id Vimeo em modo background). A foto fica por baixo
      enquanto o player carrega. */
  videoVimeoId?: string;
};

export type DnaPartnerLogo = {
  id: string;
  src: string;
};
