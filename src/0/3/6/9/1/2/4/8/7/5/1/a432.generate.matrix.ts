#!/usr/bin/env ts-node
/**
 * a432.generate.matrix.ts — zero-entropy matrix file generator
 * ------------------------------------------------------------
 * Runs once (or via npm script) to ensure every digit-pair file exists
 * in the canonical folder.  Collision → appends another digit pair.
 */
import fs from 'fs';
import path from 'path';

const CANON_DIR = path.resolve(__dirname, '../src/0/3/6/9/1/2/4/8/7/5/1');
const VORTEX = [0,3,6,9,1,2,4,8,7,5];
const METRIC = [0,1,2,3,4,5,6,7,8,9];

function* digitPairs(): IterableIterator<string> {
  let n = 0;
  while (true) {
    const m = METRIC[n % 10];
    const v = VORTEX[n % 11];
    yield `${m}${v}`;
    n++;
  }
}

function nextUniqueName(existing: Set<string>, seed: string): string {
  let name = seed;
  let iter = digitPairs();
  while (existing.has(name + '.ts')) {
    name += iter.next().value;
  }
  return name + '.ts';
}

function ensureFiles(count: number = 121) {
  const existing = new Set(fs.readdirSync(CANON_DIR));
  const iter = digitPairs();
  for (let i = 0; i < count; i++) {
    const pair = iter.next().value as string;
    const file = nextUniqueName(existing, pair);
    if (!existing.has(file)) {
      const [metric, vortex] = [Number(file[0]), Number(file[1])];
      const content = `import { asDigit } from './a432.types';
import { asAngle } from './a432.math';
import { digitAngleToCMYK } from './a432.cmyk';
import { TRINITY_POLARITY } from './a432.math';

export const metric = asDigit(${metric});
export const vortex = asDigit(${vortex});
export const angle  = asAngle(metric * 36 + vortex * 60);
export const color  = digitAngleToCMYK(vortex, angle);
export const polarity = TRINITY_POLARITY[vortex];
`;
      fs.writeFileSync(path.join(CANON_DIR, file), content, 'utf8');
      existing.add(file);
      console.log('Generated', file);
    }
  }
}

if (require.main === module) {
  ensureFiles();
} 