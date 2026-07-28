/** Institucionais e documentários são da Rinno Films, não desta página. */
export type VideoCategoryId = 'todos' | 'conceitos' | 'produtos' | 'virais';

export type VideoItem = {
  id: string;
  /** Incorporadora ou construtora — é o destaque em accent no card. */
  client: string;
  /** Nome do empreendimento, logo abaixo do cliente. */
  project: string;
  subtitle?: string;
  /** Id do vídeo no Vimeo. Nenhum arquivo de vídeo vive no repositório. */
  vimeoId: string;
  category: Exclude<VideoCategoryId, 'todos'>;
  /** Formato 9:16 (virais). Sem isto o card é 16:9. */
  portrait?: boolean;
};

export type VideoSectionType = {
  /** Chave da seção no namespace Videos3DPage.sections. */
  id: Exclude<VideoCategoryId, 'todos'>;
  items: VideoItem[];
};

export type VideoFilterTab = {
  /** Chave da aba no namespace Videos3DPage.tabs. */
  id: VideoCategoryId;
  image: string;
};
