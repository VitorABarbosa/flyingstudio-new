import type { GallerySectionType } from '../types/gallery.types';

/**
 * O acervo vive no servidor de imagens, nao no repositorio.
 *
 * As URLs apontam para site-flying-web/ — mestres de ~1,8 MB gerados por
 * scripts/gerar-acervo-web.mjs a partir dos originais de trabalho
 * (site-flying/, ate 160 MB), que continuam no servidor mas nao devem ser
 * referenciados por paginas. `ImageBlock` pede a versao redimensionada ao
 * otimizador do Next, que baixa o mestre uma unica vez e serve WebP na
 * largura necessaria. Por isso o dominio precisa estar em
 * `images.remotePatterns` no `next.config.ts`.
 *
 * ARQUIVO GERADO a partir da listagem do servidor — a curadoria de titulos
 * vive no gerador (scripts de sessao) e pode ser ajustada pontualmente aqui.
 */
const rawGallerySections: GallerySectionType[] = [
  {
    id: 'geral',
    items: [
      {
        id: 'geral-02',
        title: 'Archtech | Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Archtech_C_Itu_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-03',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Clube_Entrada_R00.jpg',
      },
      {
        id: 'geral-04',
        title: 'Argo | Seven',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_PIANO%20VISTA%20MAR.jpg',
      },
      {
        id: 'geral-06',
        title: 'Citz | Organique',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Citz_Organique_Acesso_01_R00.jpg',
      },
      {
        id: 'geral-07',
        title: 'Chaincorp | Iperoig',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Chaincorp_Iperoig_Cam_Fachada_01_A_HR.jpg',
      },
      {
        id: 'geral-08',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Clube_Hall_R00.jpg',
      },
      {
        id: 'geral-09',
        title: 'Argo | Seven',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_SUITE%2003.jpg',
      },
      {
        id: 'geral-11',
        title: 'Citz | Organique',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Citz_Organique_Acesso_02_R00.jpg',
      },
      {
        id: 'geral-12',
        title: 'Ecovila | Cerejeira',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_Cerejeira_Fachada_Diu_HR.jpg',
      },
      {
        id: 'geral-13',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Piscina_R00.jpg',
      },
      {
        id: 'geral-14',
        title: 'Argo | Seven',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_VARANDA%2001.jpg',
      },
      {
        id: 'geral-16',
        title: 'Copec | Villa Samantha',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Copec_Villa_Samantha_Caminhada_R01.jpg',
      },
      {
        id: 'geral-17',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_A_HR.jpg',
      },
      {
        id: 'geral-18',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Portaria_R00.jpg',
      },
      {
        id: 'geral-19',
        title: 'Argo | Seven',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_VARANDA%20SUITE%202.jpg',
      },
      {
        id: 'geral-20',
        title: 'Macuco | Grand Canal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR_v2.jpg',
      },
      {
        id: 'geral-21',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Dado_Vila_Mariana_Fachada_Lojas_HR.jpg',
      },
      {
        id: 'geral-22',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_B_HR.jpg',
      },
      {
        id: 'geral-23',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Praca_Quadra_R00.jpg',
      },
      {
        id: 'geral-24',
        title: 'Bacaba | MKL',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Bacaba_MKL_Coworking_HRB.jpg',
      },
      {
        id: 'geral-25',
        title: 'Macuco | Grand Canal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_Grand_Canal_Implantacao_Pavimento_HR_v2.jpg',
      },
      {
        id: 'geral-26',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Dado_Vila_Mariana_Piscina_HR.jpg',
      },
      {
        id: 'geral-27',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_D_HR.jpg',
      },
      {
        id: 'geral-28',
        title: 'Alphaville | Ceará 5',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Ceara_5_Portaria_HR.jpg',
      },
      {
        id: 'geral-29',
        title: 'Canopus | Botucatu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Botucatu_Churrasqueira_HR.jpg',
      },
      {
        id: 'geral-30',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Terreo_HR_v2.jpg',
      },
      {
        id: 'geral-31',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA__BOSQUE_ESPORTES_HR.jpg',
      },
      {
        id: 'geral-32',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovile_Sainte_Helene_Casa_C_Frontal_HR.jpg',
      },
      {
        id: 'geral-33',
        title: 'Alphaville | Guarajuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Guarajuba_Deck_Lagoa_HR.jpg',
      },
      {
        id: 'geral-34',
        title: 'Canopus | Pedro de Toledo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Pedro_de_Toledo_Coworking_HR.jpg',
      },
      {
        id: 'geral-35',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_29%2C33m%C2%B2_Inferior_HR_v2.jpg',
      },
      {
        id: 'geral-36',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_BEACH_LOUNGE_HR.jpg',
      },
      {
        id: 'geral-37',
        title: 'Faal | Peralta',
        image: 'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Faal_Peralta_Fachada_R00.jpg',
      },
      {
        id: 'geral-38',
        title: 'Alphaville | Guarajuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Guarajuba_Deck_Praia_HR.jpg',
      },
      {
        id: 'geral-39',
        title: 'Canopus | Pedro de Toledo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Pedro_de_Toledo_Lobby_HR.jpg',
      },
      {
        id: 'geral-40',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_31%2C91m%C2%B2_Inferior_HR_v2.jpg',
      },
      {
        id: 'geral-41',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Capela_R00.jpg',
      },
      {
        id: 'geral-42',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/GNO_Manhattan_Det_Fachada_R00.jpg',
      },
      {
        id: 'geral-43',
        title: 'Aman | San Pietro',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Aman_San_Pietro_Av_Acesso_HR%20.jpg',
      },
      {
        id: 'geral-45',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Final_13_Amp_R00_v2.jpg',
      },
      {
        id: 'geral-46',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_ESP_CONDOMINIO_HR.jpg',
      },
      {
        id: 'geral-47',
        title: 'GNO | Manhattan',
        image: 'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/GNO_Manhattan_Fachada_R00.jpg',
      },
      {
        id: 'geral-48',
        title: 'Aman | San Pietro',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Aman_San_Pietro_Fotomontagem.jpg',
      },
      {
        id: 'geral-50',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Rooftop_R00_v2.jpg',
      },
      {
        id: 'geral-51',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_ESP_EVENTOS_HR.jpg',
      },
      {
        id: 'geral-52',
        title: 'Herc | Barão de Limeira',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Herc_Barao_Limeira_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-53',
        title: 'FTM | Residencial Itália',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Diurna_HR.jpg',
      },
      {
        id: 'geral-55',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Terreo_R00_v2.jpg',
      },
      {
        id: 'geral-56',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Lounge_Bosque_R00.jpg',
      },
      {
        id: 'geral-57',
        title: 'Integra | Station',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Integra_Station_Fachada_Conceitual_HR.jpg',
      },
      {
        id: 'geral-58',
        title: 'FTM | Residencial Itália',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/FTM_Resisdencial_Italia_Portaria_HR.jpg',
      },
      {
        id: 'geral-60',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_01_HR_v2.jpg',
      },
      {
        id: 'geral-61',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Lounge_Deck_Mirante_R00.jpg',
      },
      {
        id: 'geral-62',
        title: 'IX | Zuquim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/IX_Zuquim_Fachada_Perpetuo_R00.jpg',
      },
      {
        id: 'geral-63',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Beach_Tennis_Fire_Place_B_HR.jpg',
      },
      {
        id: 'geral-65',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_02_HR_v2.jpg',
      },
      {
        id: 'geral-66',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PASSARELA_HR.jpg',
      },
      {
        id: 'geral-67',
        title: 'Macuco | Castell di Felipe',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Macuco_Castell_Di_Felipe_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-68',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Campo_Lazer_C_HR.jpg',
      },
      {
        id: 'geral-70',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Torre_Inferior_C_HR_v2.jpg',
      },
      {
        id: 'geral-71',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PISCINA_DETALHE_HR.jpg',
      },
      {
        id: 'geral-72',
        title: 'MSH | Itaquera',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/MSH_Itaquera_Fachada_Noturna_R00B.jpg',
      },
      {
        id: 'geral-73',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-74',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_VIla_Mariana_Fitness_HR.jpg',
      },
      {
        id: 'geral-75',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Quero_Meu_Ape_Loteamento_HR_v2.jpg',
      },
      {
        id: 'geral-76',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PISTA_HR.jpg',
      },
      {
        id: 'geral-77',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Paes_G_Orissanga_Fachada_A_R01.jpg',
      },
      {
        id: 'geral-78',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Heliponto_HR.jpg',
      },
      {
        id: 'geral-79',
        title: 'Dado | Vila Mariana',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_Vila_Mariana_Hall_HR.jpg',
      },
      {
        id: 'geral-80',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_1%C2%BA_Pavimento_HR_v2.jpg',
      },
      {
        id: 'geral-81',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_VOO_PISCINA_CLUBE_A4.jpg',
      },
      {
        id: 'geral-82',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Carlos_Reinaldo_Voo_Cob_HR.jpg',
      },
      {
        id: 'geral-83',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg',
      },
      {
        id: 'geral-84',
        title: 'Dado | Vila Mariana',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_VIla_Mariana_Jogos_HR.jpg',
      },
      {
        id: 'geral-85',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_4%C2%BA_ao_12%C2%BA_Pavimento_HR_v2.jpg',
      },
      {
        id: 'geral-86',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GNO_Manhattan_Churrasqueira_R00%20.jpg',
      },
      {
        id: 'geral-87',
        title: 'ProHidro | Morumbi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Morumbi_Fachada_HR.jpg',
      },
      {
        id: 'geral-88',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Piscina_Clube_A_HR.jpg',
      },
      {
        id: 'geral-89',
        title: 'Diretiva | DJL4',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Diretiva_DJL4_Spa_A4.jpg',
      },
      {
        id: 'geral-90',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_terreo_HR_v2.jpg',
      },
      {
        id: 'geral-91',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GNO_Manhattan_Portaria_R00.jpg',
      },
      {
        id: 'geral-92',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Washington_Luiz_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-93',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Portaria_A_HR.jpg',
      },
      {
        id: 'geral-94',
        title: 'Engecastro | Oratório',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Engecastro_Oratorio_Coworking_HR.jpg',
      },
      {
        id: 'geral-95',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Implantacao_Rooftop_HR_v2.jpg',
      },
      {
        id: 'geral-96',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Cul_de_Sac_HR.jpg',
      },
      {
        id: 'geral-97',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Washington_Luiz_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-98',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Portaria_B_HR.jpg',
      },
      {
        id: 'geral-99',
        title: 'Exkalla | Vitória Régia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Exkalla_Vitoria_Regia_Closet_HR.jpg',
      },
      {
        id: 'geral-100',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Implantacao_Terreo_HR_v2.jpg',
      },
      {
        id: 'geral-101',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Portaria_HR.jpg',
      },
      {
        id: 'geral-102',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Reacty_Sto_Arcadio_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-103',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Treviso_Voo_Clube_HR.jpg',
      },
      {
        id: 'geral-104',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/GCS_MIRANTE_BOA_VISTA_MIRANTE_DECK_PISCINA_B_HR.jpg',
      },
      {
        id: 'geral-105',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Pavimento_Tipo_HR_v2.jpg',
      },
      {
        id: 'geral-106',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Praca_Fitness_HR.jpg',
      },
      {
        id: 'geral-107',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Reacty_Sto_Arcadio_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-108',
        title: 'IX | Zuquim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/IX_Zuquim_Passeio_Bosque_R00.jpg',
      },
      {
        id: 'geral-109',
        title: 'Indiana | Rua Indiana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Indiana_Rua_Indiana_Sauna_HR.jpg',
      },
      {
        id: 'geral-110',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Tennis_HR.jpg',
      },
      {
        id: 'geral-111',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ticem_G_Garden_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-112',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Campo_HR.jpg',
      },
      {
        id: 'geral-113',
        title: 'Lumy | Ipiranga',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Hall_R00.jpg',
      },
      {
        id: 'geral-114',
        title: 'Holos | Rua Natal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Holos_Rua_Natal_Portaria_HR.jpg',
      },
      {
        id: 'geral-115',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ticem_G_Garden_Fachada_Noturna_R00.jpg',
      },
      {
        id: 'geral-116',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Esp_Zen_HR.jpg',
      },
      {
        id: 'geral-117',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Lavanderia_R00.jpg',
      },
      {
        id: 'geral-118',
        title: 'Lumy | Ipiranga',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Lumy_Ipiranga_Acesso_R00.jpg',
      },
      {
        id: 'geral-119',
        title: 'V2 | The Icon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/V2_THE%20ICON_FACHADA_NOTURNA_CONCEITUAL_HR.jpg',
      },
      {
        id: 'geral-120',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-121',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Pra%C3%A7a_Churras_Gourmet_R00.jpg',
      },
      {
        id: 'geral-122',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Paes_G_Orissanga_Piscina_R00.jpg',
      },
      {
        id: 'geral-123',
        title: 'V2 | The Icon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/V2_THE_ICON_FACHADA_NOTURNA_HR.jpg',
      },
      {
        id: 'geral-124',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
      },
      {
        id: 'geral-125',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Praca_Jardim_Externo_R00.jpg',
      },
      {
        id: 'geral-126',
        title: 'Pagano | Trianon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Pagano_Trianon_Alameda_R01%20.jpg',
      },
      {
        id: 'geral-127',
        title: 'Zabo | Alameda Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Zabo_Alameda_Itu_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'geral-128',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Salao_Festas%20_HR.jpg',
      },
      {
        id: 'geral-129',
        title: 'MF7 | Borges Lagoa',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Borges_Lagoa_Coworking_HR.jpg',
      },
      {
        id: 'geral-130',
        title: 'Pagano | Trianon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Pagano_Trianon_Portaria_A_R00.jpg',
      },
      {
        id: 'geral-131',
        title: 'Zabo | Alameda Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Zabo_Alameda_Itu_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'geral-132',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Voo_Lazer_HR.jpg',
      },
      {
        id: 'geral-133',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bar_Jogos_A4.jpg',
      },
      {
        id: 'geral-134',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Piscina_R01.jpg',
      },
      {
        id: 'geral-135',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Portaria_HR.jpg',
      },
      {
        id: 'geral-136',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bicicletario_Comercial_A4.jpg',
      },
      {
        id: 'geral-137',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Portaria_R01.jpg',
      },
      {
        id: 'geral-138',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Portaria_Not_HR.jpg',
      },
      {
        id: 'geral-139',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bicicletario_Residencial_A4.jpg',
      },
      {
        id: 'geral-140',
        title: 'Phex | Granja',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Praca_do_Fogo_R01.jpg',
      },
      {
        id: 'geral-141',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Praca_Eventos_R00.jpg',
      },
      {
        id: 'geral-142',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Coworking_A4.jpg',
      },
      {
        id: 'geral-143',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Praca_R01.jpg',
      },
      {
        id: 'geral-144',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Prc_Eventos_02_HR.jpg',
      },
      {
        id: 'geral-145',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Festas_A4.jpg',
      },
      {
        id: 'geral-146',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Redario_R00.jpg',
      },
      {
        id: 'geral-147',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Fitness_E_A4.jpg',
      },
      {
        id: 'geral-148',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Webber_Portaria_HR.jpg',
      },
      {
        id: 'geral-149',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Gourmet_A4.jpg',
      },
      {
        id: 'geral-150',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Weber_01_Piscina_Adulto_HR.jpg',
      },
      {
        id: 'geral-151',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Comercial_A4.jpg',
      },
      {
        id: 'geral-152',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Weber_01_Praca_HR.jpg',
      },
      {
        id: 'geral-153',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Comercial_HR.jpg',
      },
      {
        id: 'geral-154',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Boulevard_HR.jpg',
      },
      {
        id: 'geral-155',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Residencial_A4.jpg',
      },
      {
        id: 'geral-156',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Casa_De_Campo_HR.jpg',
      },
      {
        id: 'geral-157',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lounge_Churrasqueira_A4.jpg',
      },
      {
        id: 'geral-158',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/ProHidro_Carlos_Reinaldo_Espelho_Dagua_HR.jpg',
      },
      {
        id: 'geral-159',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Meet_A4.jpg',
      },
      {
        id: 'geral-160',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/ProHidro_Carlos_Reinaldo_Lojas_HR.jpg',
      },
      {
        id: 'geral-161',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Podcast_A4.jpg',
      },
      {
        id: 'geral-162',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Piscina_HR.jpg',
      },
      {
        id: 'geral-163',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Laje_Coworking_R00.jpg',
      },
      {
        id: 'geral-164',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Playground_HR.jpg',
      },
      {
        id: 'geral-165',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Laje_Recepcao_A4.jpg',
      },
      {
        id: 'geral-166',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Portaria_HR.jpg',
      },
      {
        id: 'geral-167',
        title: 'MF7 | Laje',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Recepcao_Publicidade_R00.jpg',
      },
      {
        id: 'geral-168',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Voo_Lazer_HR.jpg',
      },
      {
        id: 'geral-169',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Restaurante_A4.jpg',
      },
      {
        id: 'geral-170',
        title: 'ProHidro | Sorocaba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Sorocaba_Praca_do_Luau_HR.jpg',
      },
      {
        id: 'geral-171',
        title: 'MF7 | Laje',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Laje_Sala_Comercial_01_A4.jpg',
      },
      {
        id: 'geral-172',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Washington_Luiz_Portaria_HR.jpg',
      },
      {
        id: 'geral-173',
        title: 'MSH | Itaquera',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MSH_Itaquera_Churrasqueira_R00.jpg',
      },
      {
        id: 'geral-174',
        title: 'Proxx | Tupã',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Proxx_Tupa_Portaria_HR.jpg',
      },
      {
        id: 'geral-175',
        title: 'MSH | Itaquera',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MSH_Itaquera_Ladder_R00.jpg',
      },
      {
        id: 'geral-176',
        title: 'Quero Meu Apê | Atibaia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Atibaia_Beach_Tennis_HR.jpg',
      },
      {
        id: 'geral-177',
        title: 'Ousy | The One Saúde',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Ousy_Saude_Academia_HR.jpg',
      },
      {
        id: 'geral-178',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Fire_Place_HR.jpg',
      },
      {
        id: 'geral-179',
        title: 'Oxe | Jardim São Paulo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Oxe_Jd_Sao_Paulo_Academia_HR.jpg',
      },
      {
        id: 'geral-180',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_HR.jpg',
      },
      {
        id: 'geral-181',
        title: 'Oxe | Jardim São Paulo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Oxe_JD_Sao_Paulo_Hall_Social_HR.jpg',
      },
      {
        id: 'geral-182',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Portaria_HR.jpg',
      },
      {
        id: 'geral-183',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Reuniao_02_HR.jpg',
      },
      {
        id: 'geral-184',
        title: 'RB2 | São José',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/RB2_Sao_Jose_Lojas_HR.jpg',
      },
      {
        id: 'geral-185',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Reuniao_HR.jpg',
      },
      {
        id: 'geral-186',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'geral-187',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Suite_204_HR.jpg',
      },
      {
        id: 'geral-188',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/REF_Barueri_Lounge_Piscina_R00.jpg',
      },
      {
        id: 'geral-189',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Suite_231_HR.jpg',
      },
      {
        id: 'geral-190',
        title: 'REF Engenharia | Barueri',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/REF_Barueri_Trilha_R00.jpg',
      },
      {
        id: 'geral-191',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Brinquedoteca_HR.jpg',
      },
      {
        id: 'geral-192',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Churrasqueira_HR.jpg',
      },
      {
        id: 'geral-193',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Coworking_Lavanderia_HR.jpg',
      },
      {
        id: 'geral-194',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Playground_HR.jpg',
      },
      {
        id: 'geral-195',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Delivery_HR.jpg',
      },
      {
        id: 'geral-196',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Praca_do_Fogo_HR.jpg',
      },
      {
        id: 'geral-197',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Festas_HR.jpg',
      },
      {
        id: 'geral-198',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Praca_do_Redario_HR.jpg',
      },
      {
        id: 'geral-199',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_01_HR.jpg',
      },
      {
        id: 'geral-200',
        title: 'Seedincorp | VNC',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Seedincorp_VNC_Alameda_Externa_HR.jpg',
      },
      {
        id: 'geral-201',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_03_HR.jpg',
      },
      {
        id: 'geral-202',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Cidade_Jardim_Piscina_Cobertura_HR%20.jpg',
      },
      {
        id: 'geral-203',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_04_HR.jpg',
      },
      {
        id: 'geral-204',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Cidade_Jardim_Piscina_Terreo_HR%20.jpg',
      },
      {
        id: 'geral-205',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Lobby_HR.jpg',
      },
      {
        id: 'geral-206',
        title: 'SR Brasil | Jockey',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Jockey_Acesso_HR.jpg',
      },
      {
        id: 'geral-207',
        title: 'Proxx | Tupã',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Proxx_Tupa_Coworking_HR.jpg',
      },
      {
        id: 'geral-208',
        title: 'Tebas | Anhangabaú',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Tebas_Anhagabau_Piscina_Externa_R00.jpg',
      },
      {
        id: 'geral-209',
        title: 'Quero Meu Apê | Atibaia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Quero_Meu_Ape_Atibaia_Fitness_HR.jpg',
      },
      {
        id: 'geral-210',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Ticem_G_Garden_Piscina_R00.jpg',
      },
      {
        id: 'geral-211',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Brooklyn_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'geral-212',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Bike_Share_HR.jpg',
      },
      {
        id: 'geral-213',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Coworking_HR.jpg',
      },
      {
        id: 'geral-214',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'geral-215',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Fitness_HR.jpg',
      },
      {
        id: 'geral-216',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Gourmet_HR.jpg',
      },
      {
        id: 'geral-217',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Lavanderia_HR.jpg',
      },
      {
        id: 'geral-218',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Lobby_HR.jpg',
      },
      {
        id: 'geral-219',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Mini_Market_HR.jpg',
      },
      {
        id: 'geral-220',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Praca_HR.jpg',
      },
      {
        id: 'geral-221',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Studio_HR.jpg',
      },
      {
        id: 'geral-222',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Brinquedoteca_R00.jpg',
      },
      {
        id: 'geral-223',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Cowoking_R00.jpg',
      },
      {
        id: 'geral-224',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Estudio_Digital_R00.jpg',
      },
      {
        id: 'geral-225',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Gourmet_Pub_R00.jpg',
      },
      {
        id: 'geral-226',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Hall_Social_R00.jpg',
      },
      {
        id: 'geral-227',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Reuniao_R00.jpg',
      },
      {
        id: 'geral-228',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Churrasqueira_R00.jpg',
      },
      {
        id: 'geral-229',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Cidade_Jardim_Living_31A_HR%20.jpg',
      },
      {
        id: 'geral-230',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Cidade_Jardim_Reuniao_HR%20.jpg',
      },
      {
        id: 'geral-231',
        title: 'SR Brasil | Jockey',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Jockey_Suite_Master_HR.jpg',
      },
      {
        id: 'geral-232',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Bicicletario_R00.jpg',
      },
      {
        id: 'geral-233',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Brinquedoteca_R00.jpg',
      },
      {
        id: 'geral-234',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_R00.jpg',
      },
      {
        id: 'geral-235',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Delivery_R00.jpg',
      },
      {
        id: 'geral-236',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Estudio_Podcast_R00.jpg',
      },
      {
        id: 'geral-237',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Fitness_R00.jpg',
      },
      {
        id: 'geral-238',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Gourmet_R00.jpg',
      },
      {
        id: 'geral-239',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Hall_R00.jpg',
      },
      {
        id: 'geral-240',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Salao_Festas_R00.jpg',
      },
      {
        id: 'geral-241',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Sauna_R00.jpg',
      },
      {
        id: 'geral-242',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Spinning_R00.jpg',
      },
      {
        id: 'geral-243',
        title: 'Tebas | Santa Teresa',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tebas_Santa_Teresa_Piscina_Coberta_HR.jpg',
      },
      {
        id: 'geral-244',
        title: 'Terra Dourada | Reserva Bothânica',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Terra_Dourada_Reserva_Bothanica_Festas_HR.jpg',
      },
      {
        id: 'geral-245',
        title: 'Unacorp | Barão',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Unacorp_Barao_Hall_HR.jpg',
      },
      {
        id: 'geral-246',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Macuco_Grand_Canal_Beauty_HR.jpg',
      },
      {
        id: 'geral-247',
        title: 'Casa Viva | Cupecê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Casa_Viva_Cupece_3%C2%BAPavimento_HR.jpg',
      },
      {
        id: 'geral-248',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/GCS_Mirante_Boa_Vista_Implantacao_HR.jpg',
      },
      {
        id: 'geral-249',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Granlote_Boituva_Loteamento_R00.jpg',
      },
      {
        id: 'geral-250',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Granlote_Treviso_Implantacao_Loteamento_HR.jpg',
      },
      {
        id: 'geral-251',
        title: 'Grove | Hearth Stone',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Grove_Hearth_Stone_3800_First_Floor_R00.jpg',
      },
      {
        id: 'geral-252',
        title: 'Integra | Ipês',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Integra_Ipes_Planta_Inferior_Acesso_Garden_Torre_A_HR.jpg',
      },
      {
        id: 'geral-253',
        title: 'Macuco | Castelli di Cecilia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_castelli_di_Cecilia_Lazer_1_R00.jpg',
      },
      {
        id: 'geral-254',
        title: 'San Bo | Vila Coty',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/San_Bo_Vila_Coty_Implantacao_R00.jpg',
      },
      {
        id: 'geral-255',
        title: 'Soedil | Varandas 2',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Soedil_Varandas_2_Planta_Tipo_01_HR.jpg',
      },
      {
        id: 'geral-256',
        title: 'Talon | Atlantis',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Talon_Atlantis_Loteamento_Cotas_HR.jpg',
      },
      {
        id: 'geral-257',
        title: 'Ticem | Indaiatuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ticem_Indaiatuba_Tipo_07_Cobetura_HR.jpg',
      },
      {
        id: 'geral-258',
        title: 'TS | Hits Park',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/TS_HITS_PARK_TIPO_01_Ampliada_HR.jpg',
      },
      {
        id: 'geral-259',
        title: 'TS | Hits Park',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/TS_HITS_PARK_TIPO_01_Dormit%C3%B3rio_HR.jpg',
      },
    ],
  },
  {
    id: 'externas',
    items: [
      {
        id: 'externas-02',
        title: 'Citz | Organique',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Citz_Organique_Acesso_01_R00.jpg',
      },
      {
        id: 'externas-03',
        title: 'Citz | Organique',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Citz_Organique_Acesso_02_R00.jpg',
      },
      {
        id: 'externas-04',
        title: 'Copec | Villa Samantha',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Copec_Villa_Samantha_Caminhada_R01.jpg',
      },
      {
        id: 'externas-05',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Dado_Vila_Mariana_Fachada_Lojas_HR.jpg',
      },
      {
        id: 'externas-06',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Dado_Vila_Mariana_Piscina_HR.jpg',
      },
      {
        id: 'externas-07',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Ecovila_S_Helene_Casa_A_HR.jpg',
      },
      {
        id: 'externas-08',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Ecovila_S_Helene_Casa_B_HR.jpg',
      },
      {
        id: 'externas-09',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA__BOSQUE_ESPORTES_HR.jpg',
      },
      {
        id: 'externas-10',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_BEACH_LOUNGE_HR.jpg',
      },
      {
        id: 'externas-11',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Capela_R00.jpg',
      },
      {
        id: 'externas-12',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_ESP_CONDOMINIO_HR.jpg',
      },
      {
        id: 'externas-13',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_ESP_EVENTOS_HR.jpg',
      },
      {
        id: 'externas-14',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Lounge_Bosque_R00.jpg',
      },
      {
        id: 'externas-15',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_Mirante_Boa_Vista_Lounge_Deck_Mirante_R00.jpg',
      },
      {
        id: 'externas-16',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PASSARELA_HR.jpg',
      },
      {
        id: 'externas-17',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PISCINA_DETALHE_HR.jpg',
      },
      {
        id: 'externas-18',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_PISTA_HR.jpg',
      },
      {
        id: 'externas-19',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GCS_MIRANTE_BOA_VISTA_VOO_PISCINA_CLUBE_A4.jpg',
      },
      {
        id: 'externas-20',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GNO_Manhattan_Churrasqueira_R00%20.jpg',
      },
      {
        id: 'externas-21',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GNO_Manhattan_Det_Fachada_R00.jpg',
      },
      {
        id: 'externas-22',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/GNO_Manhattan_Portaria_R00.jpg',
      },
      {
        id: 'externas-23',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Cul_de_Sac_HR.jpg',
      },
      {
        id: 'externas-24',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Portaria_HR.jpg',
      },
      {
        id: 'externas-25',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Praca_Fitness_HR.jpg',
      },
      {
        id: 'externas-26',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Granlote_Treviso_Tennis_HR.jpg',
      },
      {
        id: 'externas-27',
        title: 'Holos | Rua Natal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Holos_Rua_Natal_Portaria_HR.jpg',
      },
      {
        id: 'externas-28',
        title: 'IX | Zuquim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/IX_Zuquim_Passeio_Bosque_R00.jpg',
      },
      {
        id: 'externas-29',
        title: 'Lumy | Ipiranga',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Lumy_Ipiranga_Acesso_R00.jpg',
      },
      {
        id: 'externas-30',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Paes_G_Orissanga_Piscina_R00.jpg',
      },
      {
        id: 'externas-31',
        title: 'Pagano | Trianon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Pagano_Trianon_Alameda_R01%20.jpg',
      },
      {
        id: 'externas-32',
        title: 'Pagano | Trianon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Pagano_Trianon_Portaria_A_R00.jpg',
      },
      {
        id: 'externas-33',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Piscina_R01.jpg',
      },
      {
        id: 'externas-34',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Portaria_R01.jpg',
      },
      {
        id: 'externas-35',
        title: 'Phex | Granja',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Praca_do_Fogo_R01.jpg',
      },
      {
        id: 'externas-36',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Praca_R01.jpg',
      },
      {
        id: 'externas-37',
        title: 'Phex | Granja',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Phex_Granja_Redario_R00.jpg',
      },
      {
        id: 'externas-38',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Webber_Portaria_HR.jpg',
      },
      {
        id: 'externas-39',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Weber_01_Piscina_Adulto_HR.jpg',
      },
      {
        id: 'externas-40',
        title: 'Plano&Plano | Carlos Weber',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Plano_e_Plano_Carlos_Weber_01_Praca_HR.jpg',
      },
      {
        id: 'externas-41',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Boulevard_HR.jpg',
      },
      {
        id: 'externas-42',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Casa_De_Campo_HR.jpg',
      },
      {
        id: 'externas-43',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/ProHidro_Carlos_Reinaldo_Espelho_Dagua_HR.jpg',
      },
      {
        id: 'externas-44',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/ProHidro_Carlos_Reinaldo_Lojas_HR.jpg',
      },
      {
        id: 'externas-45',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Piscina_HR.jpg',
      },
      {
        id: 'externas-46',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Playground_HR.jpg',
      },
      {
        id: 'externas-47',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Portaria_HR.jpg',
      },
      {
        id: 'externas-48',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Carlos_Reinaldo_Voo_Lazer_HR.jpg',
      },
      {
        id: 'externas-49',
        title: 'ProHidro | Sorocaba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Sorocaba_Praca_do_Luau_HR.jpg',
      },
      {
        id: 'externas-50',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Prohidro_Washington_Luiz_Portaria_HR.jpg',
      },
      {
        id: 'externas-51',
        title: 'Proxx | Tupã',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Proxx_Tupa_Portaria_HR.jpg',
      },
      {
        id: 'externas-52',
        title: 'Quero Meu Apê | Atibaia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Atibaia_Beach_Tennis_HR.jpg',
      },
      {
        id: 'externas-53',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Fire_Place_HR.jpg',
      },
      {
        id: 'externas-54',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Campo_HR.jpg',
      },
      {
        id: 'externas-55',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Esp_Zen_HR.jpg',
      },
      {
        id: 'externas-56',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_HR.jpg',
      },
      {
        id: 'externas-57',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
      },
      {
        id: 'externas-58',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Pedra_do_Sol_Portaria_HR.jpg',
      },
      {
        id: 'externas-59',
        title: 'Quero Meu Apê',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Quero_Meu_Ape_Portaria_HR.jpg',
      },
      {
        id: 'externas-60',
        title: 'RB2 | São José',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/RB2_Sao_Jose_Lojas_HR.jpg',
      },
      {
        id: 'externas-61',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Reacty_Sto_Arcadio_Fotomontagem_HR.jpg',
      },
      {
        id: 'externas-62',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/REF_Barueri_Lounge_Piscina_R00.jpg',
      },
      {
        id: 'externas-63',
        title: 'REF Engenharia | Barueri',
        image: 'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/REF_Barueri_Trilha_R00.jpg',
      },
      {
        id: 'externas-64',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Crespi_Portaria_Not_HR.jpg',
      },
      {
        id: 'externas-65',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Crespi_Praca_Eventos_R00.jpg',
      },
      {
        id: 'externas-66',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Crespi_Prc_Eventos_02_HR.jpg',
      },
      {
        id: 'externas-67',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Churrasqueira_HR.jpg',
      },
      {
        id: 'externas-68',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Playground_HR.jpg',
      },
      {
        id: 'externas-69',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Praca_do_Fogo_HR.jpg',
      },
      {
        id: 'externas-70',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Sancan_Roselandia_Praca_do_Redario_HR.jpg',
      },
      {
        id: 'externas-71',
        title: 'Seedincorp | VNC',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Seedincorp_VNC_Alameda_Externa_HR.jpg',
      },
      {
        id: 'externas-72',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Cidade_Jardim_Piscina_Cobertura_HR%20.jpg',
      },
      {
        id: 'externas-73',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Cidade_Jardim_Piscina_Terreo_HR%20.jpg',
      },
      {
        id: 'externas-74',
        title: 'SR Brasil | Jockey',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/SR_Brasil_Jockey_Acesso_HR.jpg',
      },
      {
        id: 'externas-75',
        title: 'Tebas | Anhangabaú',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Tebas_Anhagabau_Piscina_Externa_R00.jpg',
      },
      {
        id: 'externas-76',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/Ticem_G_Garden_Piscina_R00.jpg',
      },
      {
        id: 'externas-77',
        title: 'V2 | The Icon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/EXTERNAS/V2_THE%20ICON_FACHADA_NOTURNA_CONCEITUAL_HR.jpg',
      },
    ],
  },
  {
    id: 'fachadas',
    items: [
      {
        id: 'fachadas-01',
        title: 'Archtech | Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Archtech_C_Itu_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-02',
        title: 'Chaincorp | Iperoig',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Chaincorp_Iperoig_Cam_Fachada_01_A_HR.jpg',
      },
      {
        id: 'fachadas-03',
        title: 'Citz | Organique',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Citz_Organique_Acesso_01_R00.jpg',
      },
      {
        id: 'fachadas-04',
        title: 'Ecovila | Cerejeira',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_Cerejeira_Fachada_Diu_HR.jpg',
      },
      {
        id: 'fachadas-05',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_A_HR.jpg',
      },
      {
        id: 'fachadas-06',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_B_HR.jpg',
      },
      {
        id: 'fachadas-07',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovila_S_Helene_Casa_D_HR.jpg',
      },
      {
        id: 'fachadas-08',
        title: 'Ecovila | Sainte Hélène',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ecovile_Sainte_Helene_Casa_C_Frontal_HR.jpg',
      },
      {
        id: 'fachadas-09',
        title: 'Faal | Peralta',
        image: 'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Faal_Peralta_Fachada_R00.jpg',
      },
      {
        id: 'fachadas-10',
        title: 'GNO | Manhattan',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/GNO_Manhattan_Det_Fachada_R00.jpg',
      },
      {
        id: 'fachadas-11',
        title: 'GNO | Manhattan',
        image: 'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/GNO_Manhattan_Fachada_R00.jpg',
      },
      {
        id: 'fachadas-12',
        title: 'Herc | Barão de Limeira',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Herc_Barao_Limeira_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'fachadas-13',
        title: 'Integra | Station',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Integra_Station_Fachada_Conceitual_HR.jpg',
      },
      {
        id: 'fachadas-14',
        title: 'IX | Zuquim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/IX_Zuquim_Fachada_Perpetuo_R00.jpg',
      },
      {
        id: 'fachadas-15',
        title: 'Macuco | Castell di Felipe',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Macuco_Castell_Di_Felipe_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-16',
        title: 'MSH | Itaquera',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/MSH_Itaquera_Fachada_Noturna_R00B.jpg',
      },
      {
        id: 'fachadas-17',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Paes_G_Orissanga_Fachada_A_R01.jpg',
      },
      {
        id: 'fachadas-18',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Carlos_Reinaldo_Voo_Cob_HR.jpg',
      },
      {
        id: 'fachadas-19',
        title: 'ProHidro | Morumbi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Morumbi_Fachada_HR.jpg',
      },
      {
        id: 'fachadas-20',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Washington_Luiz_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-21',
        title: 'ProHidro | Washington Luiz',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Prohidro_Washington_Luiz_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'fachadas-22',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Reacty_Sto_Arcadio_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-23',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Reacty_Sto_Arcadio_Fachada_Noturna_HR.jpg',
      },
      {
        id: 'fachadas-24',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ticem_G_Garden_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-25',
        title: 'Ticem | G Garden',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Ticem_G_Garden_Fachada_Noturna_R00.jpg',
      },
      {
        id: 'fachadas-26',
        title: 'V2 | The Icon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/V2_THE%20ICON_FACHADA_NOTURNA_CONCEITUAL_HR.jpg',
      },
      {
        id: 'fachadas-27',
        title: 'V2 | The Icon',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/V2_THE_ICON_FACHADA_NOTURNA_HR.jpg',
      },
      {
        id: 'fachadas-28',
        title: 'Zabo | Alameda Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Zabo_Alameda_Itu_Fachada_Diurna_HR.jpg',
      },
      {
        id: 'fachadas-29',
        title: 'Zabo | Alameda Itu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/FACHADAS/Zabo_Alameda_Itu_Fachada_Noturna_HR.jpg',
      },
    ],
  },
  {
    id: 'loteamentos',
    items: [
      {
        id: 'loteamentos-01',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Clube_Entrada_R00.jpg',
      },
      {
        id: 'loteamentos-02',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Clube_Hall_R00.jpg',
      },
      {
        id: 'loteamentos-03',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Piscina_R00.jpg',
      },
      {
        id: 'loteamentos-04',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Portaria_R00.jpg',
      },
      {
        id: 'loteamentos-05',
        title: 'Alphaville | Aracaju',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Aracaju_Praca_Quadra_R00.jpg',
      },
      {
        id: 'loteamentos-06',
        title: 'Alphaville | Ceará 5',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Ceara_5_Portaria_HR.jpg',
      },
      {
        id: 'loteamentos-07',
        title: 'Alphaville | Guarajuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Guarajuba_Deck_Lagoa_HR.jpg',
      },
      {
        id: 'loteamentos-08',
        title: 'Alphaville | Guarajuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Alphaville_Guarajuba_Deck_Praia_HR.jpg',
      },
      {
        id: 'loteamentos-09',
        title: 'Aman | San Pietro',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Aman_San_Pietro_Av_Acesso_HR%20.jpg',
      },
      {
        id: 'loteamentos-10',
        title: 'Aman | San Pietro',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Aman_San_Pietro_Fotomontagem.jpg',
      },
      {
        id: 'loteamentos-11',
        title: 'Copec | Villa Samantha',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Copec_Villa_Samantha_Caminhada_R01.jpg',
      },
      {
        id: 'loteamentos-12',
        title: 'FTM | Residencial Itália',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/FTM_Resisdencial_Italia_Fachada_Casa_Diurna_HR.jpg',
      },
      {
        id: 'loteamentos-13',
        title: 'FTM | Residencial Itália',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/FTM_Resisdencial_Italia_Portaria_HR.jpg',
      },
      {
        id: 'loteamentos-14',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Beach_Tennis_Fire_Place_B_HR.jpg',
      },
      {
        id: 'loteamentos-15',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Campo_Lazer_C_HR.jpg',
      },
      {
        id: 'loteamentos-16',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Fotomontagem_HR.jpg',
      },
      {
        id: 'loteamentos-17',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Heliponto_HR.jpg',
      },
      {
        id: 'loteamentos-18',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg',
      },
      {
        id: 'loteamentos-19',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Piscina_Clube_A_HR.jpg',
      },
      {
        id: 'loteamentos-20',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Portaria_A_HR.jpg',
      },
      {
        id: 'loteamentos-21',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Portaria_B_HR.jpg',
      },
      {
        id: 'loteamentos-22',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Treviso_Cul_de_Sac_HR.jpg',
      },
      {
        id: 'loteamentos-23',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Treviso_Portaria_HR.jpg',
      },
      {
        id: 'loteamentos-24',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Treviso_Voo_Clube_HR.jpg',
      },
      {
        id: 'loteamentos-25',
        title: 'IX | Zuquim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/IX_Zuquim_Passeio_Bosque_R00.jpg',
      },
      {
        id: 'loteamentos-26',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Campo_HR.jpg',
      },
      {
        id: 'loteamentos-27',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Esp_Zen_HR.jpg',
      },
      {
        id: 'loteamentos-28',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Fotomontagem_HR.jpg',
      },
      {
        id: 'loteamentos-29',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Piscina_Solarium_HR.jpg',
      },
      {
        id: 'loteamentos-30',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Salao_Festas%20_HR.jpg',
      },
      {
        id: 'loteamentos-31',
        title: 'Quero Meu Apê | Pedra do Sol',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Pedra_do_Sol_Voo_Lazer_HR.jpg',
      },
      {
        id: 'loteamentos-32',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Quero_Meu_Ape_Portaria_HR.jpg',
      },
      {
        id: 'loteamentos-33',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Portaria_Not_HR.jpg',
      },
      {
        id: 'loteamentos-34',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Praca_Eventos_R00.jpg',
      },
      {
        id: 'loteamentos-35',
        title: 'Sancan | Crespi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Sancan_Crespi_Prc_Eventos_02_HR.jpg',
      },
    ],
  },
  {
    id: 'internas',
    items: [
      {
        id: 'internas-01',
        title: 'Argo | Seven',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_PIANO%20VISTA%20MAR.jpg',
      },
      {
        id: 'internas-02',
        title: 'Argo | Seven',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_SUITE%2003.jpg',
      },
      {
        id: 'internas-03',
        title: 'Argo | Seven',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_VARANDA%2001.jpg',
      },
      {
        id: 'internas-04',
        title: 'Argo | Seven',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/ARGO_SEVEN_VARANDA%20SUITE%202.jpg',
      },
      {
        id: 'internas-05',
        title: 'Bacaba | MKL',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Bacaba_MKL_Coworking_HRB.jpg',
      },
      {
        id: 'internas-06',
        title: 'Canopus | Botucatu',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Botucatu_Churrasqueira_HR.jpg',
      },
      {
        id: 'internas-07',
        title: 'Canopus | Pedro de Toledo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Pedro_de_Toledo_Coworking_HR.jpg',
      },
      {
        id: 'internas-08',
        title: 'Canopus | Pedro de Toledo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Canopus_Pedro_de_Toledo_Lobby_HR.jpg',
      },
      {
        id: 'internas-15',
        title: 'Dado | Vila Mariana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_VIla_Mariana_Fitness_HR.jpg',
      },
      {
        id: 'internas-16',
        title: 'Dado | Vila Mariana',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_Vila_Mariana_Hall_HR.jpg',
      },
      {
        id: 'internas-17',
        title: 'Dado | Vila Mariana',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Dado_VIla_Mariana_Jogos_HR.jpg',
      },
      {
        id: 'internas-18',
        title: 'Diretiva | DJL4',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Diretiva_DJL4_Spa_A4.jpg',
      },
      {
        id: 'internas-19',
        title: 'Engecastro | Oratório',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Engecastro_Oratorio_Coworking_HR.jpg',
      },
      {
        id: 'internas-20',
        title: 'Exkalla | Vitória Régia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Exkalla_Vitoria_Regia_Closet_HR.jpg',
      },
      {
        id: 'internas-21',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/GCS_MIRANTE_BOA_VISTA_MIRANTE_DECK_PISCINA_B_HR.jpg',
      },
      {
        id: 'internas-22',
        title: 'Indiana | Rua Indiana',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Indiana_Rua_Indiana_Sauna_HR.jpg',
      },
      {
        id: 'internas-23',
        title: 'Lumy | Ipiranga',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Hall_R00.jpg',
      },
      {
        id: 'internas-24',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Lavanderia_R00.jpg',
      },
      {
        id: 'internas-25',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Pra%C3%A7a_Churras_Gourmet_R00.jpg',
      },
      {
        id: 'internas-26',
        title: 'Lumy | Ipiranga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Lumy_Ipiranga_Praca_Jardim_Externo_R00.jpg',
      },
      {
        id: 'internas-27',
        title: 'MF7 | Borges Lagoa',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Borges_Lagoa_Coworking_HR.jpg',
      },
      {
        id: 'internas-28',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bar_Jogos_A4.jpg',
      },
      {
        id: 'internas-29',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bicicletario_Comercial_A4.jpg',
      },
      {
        id: 'internas-30',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Bicicletario_Residencial_A4.jpg',
      },
      {
        id: 'internas-31',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Coworking_A4.jpg',
      },
      {
        id: 'internas-32',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Festas_A4.jpg',
      },
      {
        id: 'internas-33',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Fitness_E_A4.jpg',
      },
      {
        id: 'internas-34',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Gourmet_A4.jpg',
      },
      {
        id: 'internas-35',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Comercial_A4.jpg',
      },
      {
        id: 'internas-36',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Comercial_HR.jpg',
      },
      {
        id: 'internas-37',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lobby_Residencial_A4.jpg',
      },
      {
        id: 'internas-38',
        title: 'MF7 | Cariris',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Lounge_Churrasqueira_A4.jpg',
      },
      {
        id: 'internas-39',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Meet_A4.jpg',
      },
      {
        id: 'internas-40',
        title: 'MF7 | Cariris',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Cariris_Podcast_A4.jpg',
      },
      {
        id: 'internas-41',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Laje_Coworking_R00.jpg',
      },
      {
        id: 'internas-42',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Laje_Recepcao_A4.jpg',
      },
      {
        id: 'internas-43',
        title: 'MF7 | Laje',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Recepcao_Publicidade_R00.jpg',
      },
      {
        id: 'internas-44',
        title: 'MF7 | Laje',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Mf7_Laje_Restaurante_A4.jpg',
      },
      {
        id: 'internas-45',
        title: 'MF7 | Laje',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MF7_Laje_Sala_Comercial_01_A4.jpg',
      },
      {
        id: 'internas-46',
        title: 'MSH | Itaquera',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/MSH_Itaquera_Churrasqueira_R00.jpg',
      },
      {
        id: 'internas-47',
        title: 'MSH | Itaquera',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/MSH_Itaquera_Ladder_R00.jpg',
      },
      {
        id: 'internas-48',
        title: 'Ousy | The One Saúde',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Ousy_Saude_Academia_HR.jpg',
      },
      {
        id: 'internas-49',
        title: 'Oxe | Jardim São Paulo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Oxe_Jd_Sao_Paulo_Academia_HR.jpg',
      },
      {
        id: 'internas-50',
        title: 'Oxe | Jardim São Paulo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Oxe_JD_Sao_Paulo_Hall_Social_HR.jpg',
      },
      {
        id: 'internas-51',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Reuniao_02_HR.jpg',
      },
      {
        id: 'internas-52',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Reuniao_HR.jpg',
      },
      {
        id: 'internas-53',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Suite_204_HR.jpg',
      },
      {
        id: 'internas-54',
        title: 'Pagano | Franca',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Pagano_Franca_Suite_231_HR.jpg',
      },
      {
        id: 'internas-55',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Brinquedoteca_HR.jpg',
      },
      {
        id: 'internas-56',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Coworking_Lavanderia_HR.jpg',
      },
      {
        id: 'internas-57',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Delivery_HR.jpg',
      },
      {
        id: 'internas-58',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Festas_HR.jpg',
      },
      {
        id: 'internas-59',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_01_HR.jpg',
      },
      {
        id: 'internas-60',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_03_HR.jpg',
      },
      {
        id: 'internas-61',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Living_Tipo_04_HR.jpg',
      },
      {
        id: 'internas-62',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Prohidro_Carlos_Reinaldo_Lobby_HR.jpg',
      },
      {
        id: 'internas-63',
        title: 'Proxx | Tupã',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Proxx_Tupa_Coworking_HR.jpg',
      },
      {
        id: 'internas-64',
        title: 'Quero Meu Apê | Atibaia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Quero_Meu_Ape_Atibaia_Fitness_HR.jpg',
      },
      {
        id: 'internas-65',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Brooklyn_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'internas-66',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Bike_Share_HR.jpg',
      },
      {
        id: 'internas-67',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Coworking_HR.jpg',
      },
      {
        id: 'internas-68',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Descanso_Sauna_HR.jpg',
      },
      {
        id: 'internas-69',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Fitness_HR.jpg',
      },
      {
        id: 'internas-70',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Gourmet_HR.jpg',
      },
      {
        id: 'internas-71',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Lavanderia_HR.jpg',
      },
      {
        id: 'internas-72',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Lobby_HR.jpg',
      },
      {
        id: 'internas-73',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Mini_Market_HR.jpg',
      },
      {
        id: 'internas-74',
        title: 'Reacty | Sto. Arcádio',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Praca_HR.jpg',
      },
      {
        id: 'internas-75',
        title: 'Reacty | Sto. Arcádio',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Reacty_Sto_Arcadio_Studio_HR.jpg',
      },
      {
        id: 'internas-76',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Brinquedoteca_R00.jpg',
      },
      {
        id: 'internas-77',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Cowoking_R00.jpg',
      },
      {
        id: 'internas-78',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Estudio_Digital_R00.jpg',
      },
      {
        id: 'internas-79',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Gourmet_Pub_R00.jpg',
      },
      {
        id: 'internas-80',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Hall_Social_R00.jpg',
      },
      {
        id: 'internas-81',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Barueri_Reuniao_R00.jpg',
      },
      {
        id: 'internas-82',
        title: 'REF Engenharia | Barueri',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/REF_Engenharia_Churrasqueira_R00.jpg',
      },
      {
        id: 'internas-83',
        title: 'Sancan | Roselândia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Sancan_Roselandia_Churrasqueira_HR.jpg',
      },
      {
        id: 'internas-84',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Cidade_Jardim_Living_31A_HR%20.jpg',
      },
      {
        id: 'internas-85',
        title: 'SR Brasil | Cidade Jardim',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Cidade_Jardim_Reuniao_HR%20.jpg',
      },
      {
        id: 'internas-86',
        title: 'SR Brasil | Jockey',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/SR_Brasil_Jockey_Suite_Master_HR.jpg',
      },
      {
        id: 'internas-87',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Bicicletario_R00.jpg',
      },
      {
        id: 'internas-88',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Brinquedoteca_R00.jpg',
      },
      {
        id: 'internas-89',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Coworking_Reuniao_Lavanderia_R00.jpg',
      },
      {
        id: 'internas-90',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Delivery_R00.jpg',
      },
      {
        id: 'internas-91',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Estudio_Podcast_R00.jpg',
      },
      {
        id: 'internas-92',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Fitness_R00.jpg',
      },
      {
        id: 'internas-93',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Gourmet_R00.jpg',
      },
      {
        id: 'internas-94',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Hall_R00.jpg',
      },
      {
        id: 'internas-95',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Salao_Festas_R00.jpg',
      },
      {
        id: 'internas-96',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Sauna_R00.jpg',
      },
      {
        id: 'internas-97',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tavares_Rosseti_Livigno_Spinning_R00.jpg',
      },
      {
        id: 'internas-98',
        title: 'Tebas | Santa Teresa',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Tebas_Santa_Teresa_Piscina_Coberta_HR.jpg',
      },
      {
        id: 'internas-99',
        title: 'Terra Dourada | Reserva Bothânica',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/LIVING/Terra_Dourada_Reserva_Bothanica_Festas_HR.jpg',
      },
      {
        id: 'internas-100',
        title: 'Unacorp | Barão',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Unacorp_Barao_Hall_HR.jpg',
      },
      {
        id: 'internas-101',
        title: 'Macuco | Grand Canal',
        image: 'https://img.flyingstudio.com.br/site-flying-web/LIVING/Macuco_Grand_Canal_Beauty_HR.jpg',
      },
    ],
  },
  {
    id: 'plantas-humanizadas',
    items: [
      {
        id: 'plantas-humanizadas-04',
        title: 'Macuco | Grand Canal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_Grand_Canal_Implantacao_Lazer_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-05',
        title: 'Macuco | Grand Canal',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_Grand_Canal_Implantacao_Pavimento_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-06',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Terreo_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-07',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_29%2C33m%C2%B2_Inferior_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-08',
        title: 'Ousy | The One Tucuruvi',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ousy_The_One_Tucuruvi_Tipo_31%2C91m%C2%B2_Inferior_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-09',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Final_13_Amp_R00_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-10',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Rooftop_R00_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-11',
        title: 'Paes G. | Orissanga',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Paes_G_Orissanga_Terreo_R00_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-12',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_01_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-13',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Tipo_02_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-14',
        title: 'ProHidro | Carlos Reinaldo',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Prohidro_Carlos_Reinaldo_Torre_Inferior_C_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-15',
        title: 'Quero Meu Apê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Quero_Meu_Ape_Loteamento_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-16',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_1%C2%BA_Pavimento_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-17',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_4%C2%BA_ao_12%C2%BA_Pavimento_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-18',
        title: 'Reacty | Brooklin',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Reacty_Brooklin_Implantacao_terreo_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-19',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Implantacao_Rooftop_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-20',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Implantacao_Terreo_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-21',
        title: 'Tavares Rosseti | Livigno',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Tavares_Rosseti_Pavimento_Tipo_HR_v2.jpg',
      },
      {
        id: 'plantas-humanizadas-22',
        title: 'Casa Viva | Cupecê',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Casa_Viva_Cupece_3%C2%BAPavimento_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-23',
        title: 'GCS | Mirante Boa Vista',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/GCS_Mirante_Boa_Vista_Implantacao_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-24',
        title: 'Granlote | Boituva',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Granlote_Boituva_Loteamento_R00.jpg',
      },
      {
        id: 'plantas-humanizadas-25',
        title: 'Granlote | Treviso',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Granlote_Treviso_Implantacao_Loteamento_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-26',
        title: 'Grove | Hearth Stone',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Grove_Hearth_Stone_3800_First_Floor_R00.jpg',
      },
      {
        id: 'plantas-humanizadas-27',
        title: 'Integra | Ipês',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Integra_Ipes_Planta_Inferior_Acesso_Garden_Torre_A_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-28',
        title: 'Macuco | Castelli di Cecilia',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Macuco_castelli_di_Cecilia_Lazer_1_R00.jpg',
      },
      {
        id: 'plantas-humanizadas-29',
        title: 'San Bo | Vila Coty',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/San_Bo_Vila_Coty_Implantacao_R00.jpg',
      },
      {
        id: 'plantas-humanizadas-30',
        title: 'Soedil | Varandas 2',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Soedil_Varandas_2_Planta_Tipo_01_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-31',
        title: 'Talon | Atlantis',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Talon_Atlantis_Loteamento_Cotas_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-32',
        title: 'Ticem | Indaiatuba',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/Ticem_Indaiatuba_Tipo_07_Cobetura_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-33',
        title: 'TS | Hits Park',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/TS_HITS_PARK_TIPO_01_Ampliada_HR.jpg',
      },
      {
        id: 'plantas-humanizadas-34',
        title: 'TS | Hits Park',
        image:
          'https://img.flyingstudio.com.br/site-flying-web/PLANTAS/TS_HITS_PARK_TIPO_01_Dormit%C3%B3rio_HR.jpg',
      },
    ],
  },
];

/**
 * Muda a "cara" do embaralhamento inteiro de uma vez. Se alguma fileira
 * sortear imagens cuja proporcao somada preenche a linha exata (hover sem
 * nada a revelar), basta trocar este numero e todo o baralho e redistribuido.
 */
const SHUFFLE_SEED = 2;

/** PRNG com semente (mulberry32): aleatorio na aparencia, deterministico. */
function createSeededRandom(seed: number) {
  let state = seed;

  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(text: string) {
  let hash = 0;

  for (let index = 0; index < text.length; index++) {
    hash = (Math.imul(hash, 31) + text.charCodeAt(index)) | 0;
  }

  return hash;
}

/** Fisher-Yates com semente — nao muta o array original. */
function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const random = createSeededRandom(seed);
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

/**
 * O acervo acima segue a organizacao por projeto; ao visitante as imagens
 * chegam EMBARALHADAS. Alem da variedade visual, isso evita fileiras onde as
 * proporcoes somadas preenchem a linha com exatidao — nesses casos o hover
 * nao tem o que revelar e a fileira fica sem animacao.
 *
 * O embaralhamento e deterministico (semente por categoria): identico no
 * servidor e no navegador — sem descasamento de hidratacao — e estavel entre
 * visitas.
 */
export const gallerySections: GallerySectionType[] = rawGallerySections.map((section) => ({
  ...section,
  items: shuffleWithSeed(section.items, hashSeed(section.id) ^ SHUFFLE_SEED),
}));

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
