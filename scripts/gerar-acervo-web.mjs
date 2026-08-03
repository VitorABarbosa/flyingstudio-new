/**
 * Gera as versões WEB do acervo de Perspectivas.
 *
 * O problema que este script resolve: os arquivos de site-flying/ são os de
 * TRABALHO — média de 16 MB, chegando a 160 MB, até ~70 megapixels. O
 * otimizador de imagem do Next precisa baixar e decodificar esse original
 * inteiro na primeira vez que cada largura é pedida; com a galeria pedindo
 * dezenas de imagens de uma vez, a fila satura e o site fica lento (ou
 * quebra) em todo cache frio.
 *
 * A saída daqui é o mesmo acervo em resolução de tela — tipicamente 10-60x
 * menor. Com os arquivos web no servidor, o otimizador passa a partir de
 * mestres de ~1-2 MB e o custo de cache frio praticamente desaparece.
 *
 * Uso (lê o acervo LOCAL, com todas as subpastas — inclusive DESTAQUES/):
 *   node scripts/gerar-acervo-web.mjs "C:\\caminho\\para\\site-flying"
 *
 * Saída:  acervo-web/<MESMA_ESTRUTURA>/<mesmo_nome>.jpg
 *         (.png de origem vira .jpg na saída — ajustar a URL no site)
 * Depois: subir o CONTEÚDO de acervo-web/ para o servidor como a pasta
 *         site-flying-web/  (ficando .../site-flying-web/EXTERNAS/... etc.)
 *
 * O script é retomável: arquivos já gerados são pulados.
 */

import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_ROOT = process.argv[2] ? path.resolve(process.argv[2]) : null;
const OUT_ROOT = path.resolve(process.cwd(), 'acervo-web');

if (!SRC_ROOT) {
  console.error('Uso: node scripts/gerar-acervo-web.mjs "<pasta local site-flying>"');
  process.exit(1);
}

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
const EXTENSOES = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (EXTENSOES.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function alreadyDone(outPath) {
  try {
    const info = await stat(outPath);
    return info.size > 0;
  } catch {
    return false;
  }
}

async function processOne(srcPath) {
  const rel = path.relative(SRC_ROOT, srcPath);
  /* Saída sempre .jpg — PNGs de origem viram JPEG (renders não têm alfa). */
  const relJpg = rel.replace(/\.(png|jpe?g)$/i, '.jpg');
  const outPath = path.join(OUT_ROOT, relJpg);

  if (await alreadyDone(outPath)) {
    return { name: relJpg, skipped: true };
  }

  const original = await readFile(srcPath);

  const image = sharp(original, { limitInputPixels: false });
  const meta = await image.metadata();

  const output = await image
    .rotate() // aplica orientação EXIF antes de descartar metadados
    .flatten({ background: '#ffffff' }) // PNG com alfa não vira fundo preto
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

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, output);

  return {
    name: relJpg,
    inMb: original.length / 1048576,
    outKb: output.length / 1024,
    dims: `${meta.width}x${meta.height}`,
  };
}

const queue = await walk(SRC_ROOT);

console.log(
  `Acervo local: ${queue.length} imagens em ${SRC_ROOT}.\n` +
    `Gerando versões web (máx. ${MAX_EDGE}px, q${JPEG_QUALITY})...\n`
);

let totalIn = 0;
let totalOut = 0;
let done = 0;
let skipped = 0;
const failures = [];

async function worker() {
  while (queue.length > 0) {
    const srcPath = queue.shift();

    try {
      const result = await processOne(srcPath);

      if (result.skipped) {
        skipped += 1;
        continue;
      }

      done += 1;
      totalIn += result.inMb;
      totalOut += result.outKb / 1024;
      console.log(
        `[${String(done).padStart(3, '0')}] ${result.name}  ${result.dims}  ` +
          `${result.inMb.toFixed(1)} MB -> ${Math.round(result.outKb)} KB`
      );
    } catch (error) {
      failures.push({ srcPath, message: error.message });
      console.error(`ERRO ${srcPath}: ${error.message}`);
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
  failures.forEach((f) => console.log(` - ${f.srcPath}: ${f.message}`));
  process.exitCode = 1;
} else {
  console.log(`\nPronto. Suba o CONTEÚDO de acervo-web/ para o servidor como site-flying-web/`);
}
