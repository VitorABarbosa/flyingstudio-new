import { describe, expect, it } from 'vitest';
import { caseProjects, groupCompanies } from '../data/casesData';

describe('cases data', () => {
  it('preserva a ordem das quatro empresas do ecossistema', () => {
    expect(groupCompanies.map(({ id }) => id)).toEqual(['ogdi', 'nid', 'flying', 'rinno']);
  });

  it('usa a cor de identidade definida para cada empresa no Figma', () => {
    expect(Object.fromEntries(groupCompanies.map(({ id, accentColor }) => [id, accentColor]))).toEqual({
      ogdi: '#0d506a',
      nid: '#e68643',
      flying: '#7e52ff',
      rinno: '#ff00a9',
    });
  });

  it('exibe os quatro projetos definidos no Figma', () => {
    expect(caseProjects.map(({ title }) => title)).toEqual([
      'The One Saúde',
      'Cosmopolitan',
      'Vita Vila Prudente',
      'Livigno',
    ]);
  });
});
