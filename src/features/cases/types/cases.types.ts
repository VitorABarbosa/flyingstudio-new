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
