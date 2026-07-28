/** Acao do rodape do card: conferir vagas ou cadastrar curriculo. */
export type DepartmentAction = 'check' | 'register';

export type DepartmentKey = 'comercial' | 'arte' | 'tecnologia' | 'talentos';

export type Department = {
  key: DepartmentKey;
  /** Quantidade de vagas abertas; `null` quando o card e de banco de talentos. */
  vagas: number | null;
  action: DepartmentAction;
  /** Ancora/destino do botao do card. */
  href: string;
};

export const departments: Department[] = [
  { key: 'comercial', vagas: 2, action: 'check', href: '#banco-talentos' },
  { key: 'arte', vagas: 6, action: 'check', href: '#banco-talentos' },
  { key: 'tecnologia', vagas: 10, action: 'check', href: '#banco-talentos' },
  { key: 'talentos', vagas: null, action: 'register', href: '#banco-talentos' },
];
