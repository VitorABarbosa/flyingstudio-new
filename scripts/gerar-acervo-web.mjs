/**
 * Gera as versões WEB do acervo de Perspectivas.
 *
 * O problema que este script resolve: os arquivos em img.flyingstudio.com.br/
 * site-flying/ são os de TRABALHO — média de 21 MB, chegando a 50 MB, até
 * ~70 megapixels. O otimizador de imagem do Next precisa baixar e decodificar
 * esse original inteiro na primeira vez que cada largura é pedida; com a
 * galeria pedindo dezenas de imagens de uma vez, a fila satura e o site fica
 * lento (ou quebra) em todo cache frio.
 *
 * A saída daqui é o mesmo acervo em resolução de tela (máx. 2560px no lado
 * maior, JPEG progressivo q80, sem metadados) — tipicamente 100-60x menor.
 * Com os arquivos web no servidor, o otimizador passa a partir de originais
 * de ~0,5 MB e o custo de cache frio praticamente desaparece.
 *
 * Uso:
 *   node scripts/gerar-acervo-web.mjs
 *
 * Saída:  acervo-web/<PASTA>/<mesmo_nome>.jpg  (espelha o servidor)
 * Depois: subir o CONTEÚDO de acervo-web/ para o servidor como a pasta
 *         site-flying-web/  (ficando .../site-flying-web/EXTERNAS/... etc.)
 *
 * O script é retomável: arquivos já gerados são pulados.
 */

import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ORIGIN = 'https://img.flyingstudio.com.br';
const FOLDERS = ['EXTERNAS', 'FACHADAS', 'LIVING', 'LOTEAMENTOS', 'PLANTAS'];
const OUT_ROOT = path.resolve(process.cwd(), 'acervo-web');

/**
 * Lado maior e qualidade da versão web — calibrados por medição, não por
 * chute: o site serve no máximo 2048px (lightbox), e partindo de um mestre
 * 3840 q85 o resultado final desvia ~2,9/255 da referência sem compressão —
 * o mesmo piso de ruído (~2,6) do WebP q70 que o site já usa hoje. Ou seja:
 * indistinguível do fluxo atual, com o mestre ~15x menor que o original.
 */
const MAX_EDGE = 3840;
const JPEG_QUALITY = 85;
const CONCURRENCY = 3;

async function listFolder(folder) {
  const res = await fetch(`${ORIGIN}/site-flying/${folder}/`);

  if (!res.ok) {
    throw new Error(`Listagem falhou para ${folder}: HTTP ${res.status}`);
  }

  const html = await res.text();

  /* O autoindex devolve hrefs absolutos e já URL-encoded. */
  return [...html.matchAll(/href="(\/site-flying\/[^"]+\.jpe?g)"/gi)].map((m) => m[1]);
}

async function alreadyDone(outPath) {
  try {
    const info = await stat(outPath);
    return info.size > 0;
  } catch {
    return false;
  }
}

async function processOne(href) {
  const decodedName = decodeURIComponent(href.split('/').pop());
  const folder = href.split('/')[2];
  const outDir = path.join(OUT_ROOT, folder);
  const outPath = path.join(outDir, decodedName);

  if (await alreadyDone(outPath)) {
    return { name: `${folder}/${decodedName}`, skipped: true };
  }

  const res = await fetch(ORIGIN + href);

  if (!res.ok) {
    throw new Error(`Download falhou (${res.status}): ${href}`);
  }

  const original = Buffer.from(await res.arrayBuffer());

  const image = sharp(original, { limitInputPixels: false });
  const meta = await image.metadata();

  const output = await image
    .rotate() // aplica orientação EXIF antes de descartar metadados
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: JPEG_QUALITY,
      progressive: true,
      mozjpeg: true,
      /* Sem subamostragem de croma: preserva cor em linhas finas (esquadrias,
         vegetação) — importante porque o arquivo ainda passa pelo WebP. */
      chromaSubsampling: '4:4:4',
    })
    .toBuffer();

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, output);

  return {
    name: `${folder}/${decodedName}`,
    inMb: original.length / 1048576,
    outKb: output.length / 1024,
    dims: `${meta.width}x${meta.height}`,
  };
}

const queue = [];

for (const folder of FOLDERS) {
  queue.push(...(await listFolder(folder)));
}

console.log(`Acervo: ${queue.length} imagens. Gerando versões web (máx. ${MAX_EDGE}px, q${JPEG_QUALITY})...\n`);

let totalIn = 0;
let totalOut = 0;
let done = 0;
let skipped = 0;
const failures = [];

async function worker() {
  while (queue.length > 0) {
    const href = queue.shift();

    try {
      const result = await processOne(href);

      if (result.skipped) {
        skipped += 1;
        continue;
      }

      done += 1;
      totalIn += result.inMb;
      totalOut += result.outKb / 1024;
      console.log(
        `[${String(done).padStart(2, '0')}] ${result.name}  ${result.dims}  ` +
          `${result.inMb.toFixed(1)} MB -> ${Math.round(result.outKb)} KB`
      );
    } catch (error) {
      failures.push({ href, message: error.message });
      console.error(`ERRO ${href}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

console.log('\n--- Resumo ---');
console.log(`Geradas: ${done} | Puladas (já existiam): ${skipped} | Falhas: ${failures.length}`);

if (done > 0) {
  console.log(
    `Tamanho: ${totalIn.toFixed(0)} MB -> ${totalOut.toFixed(0)} MB ` +
      `(${(totalIn / Math.max(totalOut, 0.001)).toFixed(0)}x menor)`
  );
}

if (failures.length > 0) {
  console.log('\nFalhas (rode o script de novo para tentar só elas):');
  failures.forEach((f) => console.log(` - ${f.href}: ${f.message}`));
  process.exitCode = 1;
} else {
  console.log(`\nPronto. Suba o CONTEÚDO de acervo-web/ para o servidor como site-flying-web/`);
}
