import { mkdir, readFile, writeFile } from 'node:fs/promises';

const OUT = 'public/assets/media';

const jobs = Object.entries(JSON.parse(await readFile('scripts/images.json', 'utf8')));

await mkdir(OUT, { recursive: true });

let failed = 0;
for (const [name, url] of jobs) {
  const response = await fetch(url);
  if (!response.ok) {
    failed++;
    console.error(`ОШИБКА ${response.status}  ${url}`);
    continue;
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(`${OUT}/${name}`, bytes);
  console.log(`${String(Math.round(bytes.length / 1024)).padStart(5)} КБ  ${name}`);
}

console.log(`\nГотово: ${jobs.length - failed} из ${jobs.length}`);
process.exit(failed ? 1 : 0);
