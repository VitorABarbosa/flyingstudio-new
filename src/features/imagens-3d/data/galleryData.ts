import type { GallerySectionType } from '../types/gallery.types';

/**
 * O acervo vive no servidor de imagens, nao no repositorio.
 *
 * Os arquivos sao os de trabalho, em resolucao cheia (~28 MB cada), entao
 * nenhum deles vai ao navegador como esta: `ImageBlock` pede a versao
 * redimensionada ao otimizador do Next, que baixa o original uma unica vez e
 * serve AVIF/WebP na largura necessaria. Por isso o dominio precisa estar em
 * `images.remotePatterns` no `next.config.ts`.
 */
export const gallerySections: GallerySectionType[] = [
  {
    id: 'geral',
    items: [
      {
        id: 'geral-01',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Pet_Care_HR.jpg',
      },
      {
        id: 'geral-02',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Macuco_Grand_Canal_Fachada_HR.jpg',
      },
      {
        id: 'geral-03',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Beauty_HR.jpg',
      },
      {
        id: 'geral-04',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Diurna_HR.jpg',
      },
      {
        id: 'geral-05',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR.jpg',
      },
      {
        id: 'geral-06',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Playground_HR.jpg',
      },
      {
        id: 'geral-07',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Fachada_Conceitual_HR.jpg',
      },
      {
        id: 'geral-08',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Gourmet_HR.jpg',
      },
      {
        id: 'geral-09',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Noturna_HR.jpg',
      },
      {
        id: 'geral-10',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR_Bolotario.jpg',
      },
      {
        id: 'geral-11',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Quadra_Coberta_HR.jpg',
      },
      {
        id: 'geral-12',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Fachada_HR.jpg',
      },
      {
        id: 'geral-13',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Jogos_Adulto_HR.jpg',
      },
      {
        id: 'geral-14',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fotomonatgem_2_HR.jpg',
      },
      {
        id: 'geral-15',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Pavimento_HR.jpg',
      },
      {
        id: 'geral-16',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Ousy_The_One_Tucuruvi_Cine_Open_HR.jpg',
      },
      {
        id: 'geral-17',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Portaria_HR.jpg',
      },
      {
        id: 'geral-18',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Massagem_HR.jpg',
      },
      {
        id: 'geral-19',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fotomonatgem_HR.jpg',
      },
      {
        id: 'geral-20',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Terreo_HR.jpg',
      },
      {
        id: 'geral-21',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Ousy_The_One_Tucuruvi_Sky_Pool_HR.jpg',
      },
      {
        id: 'geral-22',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/ProHidro_Carlos_Reinaldo_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-23',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Dormitorio_47m2_HR.jpg',
      },
      {
        id: 'geral-24',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Portaria_HR.jpg',
      },
      {
        id: 'geral-25',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_29%2C33m%C2%B2_Inferior_HR.jpg',
      },
      {
        id: 'geral-26',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Boulevard_HR.jpg',
      },
      {
        id: 'geral-27',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/ProHidro_Carlos_Reinaldo_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-28',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Living_47m2_HR.jpg',
      },
      {
        id: 'geral-29',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Beach_Tennis_Fire_Place_B_HR.jpg',
      },
      {
        id: 'geral-30',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_31%2C91m%C2%B2_Inferior_HR.jpg',
      },
      {
        id: 'geral-31',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/ProHidro_Carlos_Reinaldo_Espelho_Dagua_HR.jpg',
      },
      {
        id: 'geral-32',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Prohidro_Carlos_Reinaldo_Voo_Cob_HR.jpg',
      },
      {
        id: 'geral-33',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Mezanino_Studio_29m2_HR.jpg',
      },
      {
        id: 'geral-34',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Campo_Lazer_C_HR.jpg',
      },
      {
        id: 'geral-35',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_01_HR.jpg',
      },
      {
        id: 'geral-36',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Playground_HR.jpg',
      },
      {
        id: 'geral-37',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-38',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Brinquedoteca_HR.jpg',
      },
      {
        id: 'geral-39',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-40',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_02_HR.jpg',
      },
      {
        id: 'geral-41',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Voo_Lazer_HR.jpg',
      },
      {
        id: 'geral-42',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-43',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_03_HR.jpg',
      },
      {
        id: 'geral-44',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Heliponto_HR.jpg',
      },
      {
        id: 'geral-45',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Torre_Inferior_C_HR.jpg',
      },
      {
        id: 'geral-46',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-47',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-48',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Lobby_HR.jpg',
      },
      {
        id: 'geral-49',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg',
      },
      {
        id: 'geral-50',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_1%C2%BA_Pavimento_HR.jpg',
      },
      {
        id: 'geral-51',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Reacty_Sto_Arcadio_Portaria_HR.jpg',
      },
      {
        id: 'geral-52',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Tavares_Rosseti_Livigno_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-53',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Brooklyn_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'geral-54',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Piscina_Clube_A_HR.jpg',
      },
      {
        id: 'geral-55',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_4%C2%BA_ao_12%C2%BA_Pavimento_HR.jpg',
      },
      {
        id: 'geral-56',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Livigno_Piscina_HR.jpg',
      },
      {
        id: 'geral-57',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Tavares_Rosseti_Livigno_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-58',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Bike_Share_HR.jpg',
      },
      {
        id: 'geral-59',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Portaria_A_HR.jpg',
      },
      {
        id: 'geral-60',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_terreo_HR.jpg',
      },
      {
        id: 'geral-61',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Acqua_Play_HR.jpg',
      },
      {
        id: 'geral-62',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Coworking_HR.jpg',
      },
      {
        id: 'geral-63',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Portaria_B_HR.jpg',
      },
      {
        id: 'geral-64',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Implantacao_Rooftop_HR.jpg',
      },
      {
        id: 'geral-65',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Praca_Maes_HR.jpg',
      },
      {
        id: 'geral-66',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Gourmet_HR.jpg',
      },
      {
        id: 'geral-67',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Esp_Zen_HR.jpg',
      },
      {
        id: 'geral-68',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Implantacao_Terreo_HR.jpg',
      },
      {
        id: 'geral-69',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Voo_Rooftop_HR.jpg',
      },
      {
        id: 'geral-70',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Mini_Market_HR.jpg',
      },
      {
        id: 'geral-71',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-72',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Pavimento_Tipo_HR.jpg',
      },
      {
        id: 'geral-73',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Praca_HR.jpg',
      },
      {
        id: 'geral-74',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
      },
      {
        id: 'geral-75',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_HR.jpg',
      },
      {
        id: 'geral-76',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Salao_Festas%20_HR.jpg',
      },
      {
        id: 'geral-77',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Espaco_Mulher_HR.jpg',
      },
      {
        id: 'geral-78',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Voo_Lazer_HR.jpg',
      },
      {
        id: 'geral-79',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Estudio_Podcast_HR.jpg',
      },
      {
        id: 'geral-80',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Spinning_HR.jpg',
      },
    ],
  },
  {
    id: 'externas',
    items: [
      {
        id: 'externas-01',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Pet_Care_HR.jpg',
      },
      {
        id: 'externas-02',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Playground_HR.jpg',
      },
      {
        id: 'externas-03',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Macuco_Grand_Canal_Quadra_Coberta_HR.jpg',
      },
      {
        id: 'externas-04',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Ousy_The_One_Tucuruvi_Cine_Open_HR.jpg',
      },
      {
        id: 'externas-05',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Ousy_The_One_Tucuruvi_Sky_Pool_HR.jpg',
      },
      {
        id: 'externas-06',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Boulevard_HR.jpg',
      },
      {
        id: 'externas-07',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/ProHidro_Carlos_Reinaldo_Espelho_Dagua_HR.jpg',
      },
      {
        id: 'externas-08',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Playground_HR.jpg',
      },
      {
        id: 'externas-09',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Prohidro_Carlos_Reinaldo_Voo_Lazer_HR.jpg',
      },
      {
        id: 'externas-10',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'externas-11',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Reacty_Sto_Arcadio_Portaria_HR.jpg',
      },
      {
        id: 'externas-12',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Livigno_Piscina_HR.jpg',
      },
      {
        id: 'externas-13',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Acqua_Play_HR.jpg',
      },
      {
        id: 'externas-14',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Praca_Maes_HR.jpg',
      },
      {
        id: 'externas-15',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/EXTERNAS/Tavares_Rosseti_Livigno_Voo_Rooftop_HR.jpg',
      },
    ],
  },
  {
    id: 'fachadas',
    items: [
      {
        id: 'fachadas-01',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Macuco_Grand_Canal_Fachada_HR.jpg',
      },
      {
        id: 'fachadas-02',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Fachada_Conceitual_HR.jpg',
      },
      {
        id: 'fachadas-03',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Fachada_HR.jpg',
      },
      {
        id: 'fachadas-04',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Ousy_The_One_Tucuruvi_Portaria_HR.jpg',
      },
      {
        id: 'fachadas-05',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/ProHidro_Carlos_Reinaldo_Fachada_Noturna_HR.jpg',
      },
      /* Fileiras de 2 precisam de proporção somada >= ~2 para o hover ter o
         que revelar (ver GallerySection): as verticais Reacty/Tavares foram
         intercaladas com horizontais ProHidro, e a fileira de 3 concentra as
         verticais restantes, onde a altura maior as comprime bem. */
      {
        id: 'fachadas-06',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'fachadas-07',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Tavares_Rosseti_Livigno_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'fachadas-08',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-09',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/ProHidro_Carlos_Reinaldo_Fotomontagem_HR.jpg',
      },
      {
        id: 'fachadas-10',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'fachadas-11',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Tavares_Rosseti_Livigno_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-12',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/FACHADAS/Prohidro_Carlos_Reinaldo_Voo_Cob_HR.jpg',
      },
    ],
  },
  {
    id: 'loteamentos',
    items: [
      {
        id: 'loteamentos-01',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Diurna_HR.jpg',
      },
      {
        id: 'loteamentos-02',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Noturna_HR.jpg',
      },
      {
        id: 'loteamentos-03',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fotomonatgem_2_HR.jpg',
      },
      {
        id: 'loteamentos-04',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Fotomonatgem_HR.jpg',
      },
      {
        id: 'loteamentos-05',
        title: 'FTM | Residencial Itália',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/FTM_Resisdencial_Italia_Portaria_HR.jpg',
      },
      {
        id: 'loteamentos-06',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Beach_Tennis_Fire_Place_B_HR.jpg',
      },
      {
        id: 'loteamentos-07',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Campo_Lazer_C_HR.jpg',
      },
      {
        id: 'loteamentos-08',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Fotomontagem_HR.jpg',
      },
      {
        id: 'loteamentos-09',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Heliponto_HR.jpg',
      },
      {
        id: 'loteamentos-10',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg',
      },
      {
        id: 'loteamentos-11',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Piscina_Clube_A_HR.jpg',
      },
      {
        id: 'loteamentos-12',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Portaria_A_HR.jpg',
      },
      {
        id: 'loteamentos-13',
        title: 'Granlote | Boituva',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Portaria_B_HR.jpg',
      },
      {
        id: 'loteamentos-14',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Esp_Zen_HR.jpg',
      },
      {
        id: 'loteamentos-15',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Fotomontagem_HR.jpg',
      },
      {
        id: 'loteamentos-16',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
      },
      {
        id: 'loteamentos-17',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Salao_Festas%20_HR.jpg',
      },
      {
        id: 'loteamentos-18',
        title: 'Quero Meu Apê | Pedra do Sol',
        image: 'https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Voo_Lazer_HR.jpg',
      },
    ],
  },
  {
    id: 'internas',
    items: [
      {
        id: 'internas-01',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Beauty_HR.jpg',
      },
      {
        id: 'internas-02',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Gourmet_HR.jpg',
      },
      {
        id: 'internas-03',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Jogos_Adulto_HR.jpg',
      },
      {
        id: 'internas-04',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Massagem_HR.jpg',
      },
      {
        id: 'internas-05',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Dormitorio_47m2_HR.jpg',
      },
      {
        id: 'internas-06',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Living_47m2_HR.jpg',
      },
      {
        id: 'internas-07',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Ousy_The_One_Tucuruvi_Mezanino_Studio_29m2_HR.jpg',
      },
      {
        id: 'internas-08',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Brinquedoteca_HR.jpg',
      },
      {
        id: 'internas-09',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_03_HR.jpg',
      },
      {
        id: 'internas-10',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Prohidro_Carlos_Reinaldo_Lobby_HR.jpg',
      },
      {
        id: 'internas-11',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Brooklyn_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'internas-12',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Bike_Share_HR.jpg',
      },
      {
        id: 'internas-13',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Coworking_HR.jpg',
      },
      {
        id: 'internas-14',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Gourmet_HR.jpg',
      },
      {
        id: 'internas-15',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Mini_Market_HR.jpg',
      },
      {
        id: 'internas-16',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Reacty_Sto_Arcadio_Praca_HR.jpg',
      },
      {
        id: 'internas-17',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_HR.jpg',
      },
      {
        id: 'internas-18',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Espaco_Mulher_HR.jpg',
      },
      {
        id: 'internas-19',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Estudio_Podcast_HR.jpg',
      },
      {
        id: 'internas-20',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/LIVING/Tavares_Rosseti_Livigno_Spinning_HR.jpg',
      },
    ],
  },
  {
    id: 'plantas-humanizadas',
    items: [
      {
        id: 'plantas-humanizadas-01',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-02',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR_Bolotario.jpg',
      },
      {
        id: 'plantas-humanizadas-03',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Macuco_Grand_Canal_Implantacao_Pavimento_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-04',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Terreo_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-05',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_29%2C33m%C2%B2_Inferior_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-06',
        title: 'Ousy | The One Tucuruvi',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_31%2C91m%C2%B2_Inferior_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-07',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_01_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-08',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_02_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-09',
        title: 'ProHidro | Carlos Reinaldo',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Prohidro_Carlos_Reinaldo_Torre_Inferior_C_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-10',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_1%C2%BA_Pavimento_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-11',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_4%C2%BA_ao_12%C2%BA_Pavimento_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-12',
        title: 'Reacty | Brooklin',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Reacty_Brooklin_Implantacao_terreo_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-13',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Implantacao_Rooftop_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-14',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Implantacao_Terreo_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-15',
        title: 'Tavares Rosseti | Livigno',
        image: 'https://img.flyingstudio.com.br/site-flying/PLANTAS/Tavares_Rosseti_Pavimento_Tipo_HR.jpg',
      },
    ],
  },
];

/**
 * Ordem de leitura das capas no topo da pagina. Separada de `gallerySections`
 * de proposito: aquele array segue a organizacao do acervo, esta e a sequencia
 * em que as categorias se apresentam ao visitante.
 */
export const galleryCategoryOrder = [
  'geral',
  'externas',
  'fachadas',
  'loteamentos',
  'internas',
  'plantas-humanizadas',
] as const;
