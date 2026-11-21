// The poem about stopping — the entry program (Node 22, standard library only).
// Hands the poem in: copies entry.txt from beside this file to /output
// (or MAKEFUN_OUTPUT_DIR outside the grader). Deterministic: the same
// file in, the same bytes out. It never removes /output itself — the
// grader mounts it read-only — it only clears what is inside it.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.txt');

if (!existsSync(source)) {
  throw new Error('entry.txt not found beside main.ts');
}

mkdirSync(out, { recursive: true });
for (const name of readdirSync(out)) {
  rmSync(join(out, name), { recursive: true, force: true });
}
copyFileSync(source, join(out, 'entry.txt'));
