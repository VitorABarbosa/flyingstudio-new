/**
 * Prepara as PLANTAS NOVAS para o servidor em três versões de uma vez:
 *
 * 1. ORIGINAL REDUZIDA (site-flying/PLANTAS) — alvo <= 20 MB. Se o arquivo já
 *    está no alvo, é COPIADO intacto (zero recompressão). Se está acima, a
 *    qualidade nunca desce de q85; quem cede é a resolução (as originais
 *    chegam a 16.000px — muito além do que qualquer tela usa).
 * 2. VERSÃO WEB (site-flying-web/PLANTAS) — mesma receita do acervo:
 *    3840px, q85, mozjpeg, 4:4:4. É o que o zoom da galeria serve.
 * 3. THUMB (site-flying-thumbs/PLANTAS) — mesma receita das miniaturas:
 *    1920px, q82, mozjpeg, gerada a partir da versão web.
 *
 * Uso:    node scripts/preparar-plantas-novas.mjs
 * Saída:  C:/Users/power/Downloads/PLANTAS-PRONTAS/
 *           site-flying/PLANTAS/ | site-flying-web/PLANTAS/ | site-flying-thumbs/PLANTAS/
 *         (mesmos nomes das pastas do servidor — é só mesclar na raiz)
 */

import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'C:/Users/power/Downloads/PLANTAS/PLANTAS/NOVAS';
const OUT = 'C:/Users/power/Downloads/PLANTAS-PRONTAS';
const TARGET_BYTES = 20 * 1024 * 1024;

/* Escada da original reduzida: tenta manter a resolução cheia; só encolhe o
   lado maior quando nem q85 chega aos 20 MB. Qualidade nunca abaixo de 85. */
const LADDER = [
  { edge: Infinity, quality: 90 },
  { edge: Infinity, quality: 87 },
  { edge: Infinity, quality: 85 },
  { edge: 12000, quality: 85 },
  { edge: 10000, quality: 85 },
  { edge: 8500, quality: 85 },
  { edge: 7000, quality: 85 },
];
/* Acima de ~75 MP nem q85 fica <= 20 MB — pula tentativas fadadas a falhar
   (cada encode dessas gigantes custa vários segundos). */
const MAX_VIABLE_MEGAPIXELS = 75;

const DIRS = {
  original: path.join(OUT, 'site-flying', 'PLANTAS'),
  web: path.join(OUT, 'site-flying-web', 'PLANTAS'),
  thumb: path.join(OUT, 'site-flying-thumbs', 'PLANTAS'),
};

for (const dir of Object.values(DIRS)) await mkdir(dir, { recursive: true });

const mb = (bytes) => (bytes / 1048576).toFixed(1);

async function reduzirOriginal(buffer, meta, outPath) {
  if (buffer.length <= TARGET_BYTES) {
    await writeFile(outPath, buffer);
    return { note: 'copiada intacta', bytes: buffer.length };
  }

  const longest = Math.max(meta.width, meta.height);
  let last = null;

  for (const [i, step] of LADDER.entries()) {
    const scale = Math.min(1, step.edge / longest);
    /* Passo com a mesma resolução de um anterior (edge >= lado maior) só
       difere na qualidade; passos gigantes demais não têm como caber. */
    const scaledMp = (meta.width * scale * meta.height * scale) / 1e6;
    const isLast = i === LADDER.length - 1;
    if (!isLast && scaledMp > MAX_VIABLE_MEGAPIXELS) continue;

    const pipeline = sharp(buffer, { limitInputPixels: false }).rotate();
    if (scale < 1) {
      pipeline.resize({
        width: step.edge,
        height: step.edge,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    const output = await pipeline
      .jpeg({
        quality: step.quality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer();

    last = { output, step };
    if (output.length <= TARGET_BYTES) break;
  }

  await writeFile(outPath, last.output);
  const edgeNote = last.step.edge === Infinity ? 'resolução cheia' : `máx ${last.step.edge}px`;
  return { note: `${edgeNote}, q${last.step.quality}`, bytes: last.output.length };
}

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
console.log(`Plantas novas: ${files.length} arquivos em ${SRC}\n`);

const failures = [];

for (const file of files) {
  /* ".jpg.jpeg" acidental vira um único ".jpg". */
  const outName = file.replace(/(\.jpe?g|\.png)+$/i, '.jpg');
  try {
    const srcPath = path.join(SRC, file);
    const buffer = await readFile(srcPath);
    const meta = await sharp(buffer, { limitInputPixels: false }).metadata();

    const original = await reduzirOriginal(buffer, meta, path.join(DIRS.original, outName));

    /* Web sempre parte do arquivo BRUTO — melhor fonte possível. */
    const web = await sharp(buffer, { limitInputPixels: false })
      .rotate()
      .flatten({ background: '#ffffff' })
      .resize({ width: 3840, height: 3840, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer();
    await writeFile(path.join(DIRS.web, outName), web);

    const thumb = await sharp(web)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
    await writeFile(path.join(DIRS.thumb, outName), thumb);

    console.log(
      `${outName}\n` +
        `  ${meta.width}x${meta.height}  ${mb(buffer.length)} MB -> original ${mb(original.bytes)} MB (${original.note})` +
        ` | web ${mb(web.length)} MB | thumb ${Math.round(thumb.length / 1024)} KB`
    );
  } catch (error) {
    failures.push({ file, message: error.message });
    console.error(`ERRO ${file}: ${error.message}`);
  }
}

console.log(`\n--- Resumo: ${files.length - failures.length} ok, ${failures.length} falhas ---`);
if (failures.length > 0) {
  failures.forEach((f) => console.log(` - ${f.file}: ${f.message}`));
  process.exitCode = 1;
} else {
  console.log(`Pronto. Mescle as três pastas de ${OUT} na raiz do servidor de imagens.`);
}
