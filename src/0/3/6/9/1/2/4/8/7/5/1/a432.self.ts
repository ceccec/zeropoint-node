// a432.self.ts — Self-evolution engine of the A432 matrix
// -------------------------------------------------------
// 1. Periodically scans the canonical directory for modules.
// 2. Emits Possibility / Impossibility events.
// 3. Maps each event to CMYK via challenge/impossible rules.
// 4. Exposes an EventEmitter so UI or server can subscribe.
//
// NOTE: No external libs—only Node core and other a432 modules.

import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import { digitAngleToCMYK, asAngle, digitalRoot } from './a432.math';
import { Digit } from './a432.types';
import { impossibilityCMYK } from './a432.impossible';
import { challengeCMYK, CHALLENGES } from './a432.challenge';
import type { CMYK } from './a432.cmyk';

// Canonical directory (this file lives in it)
const CANON_DIR = __dirname;

export type MatrixEvent =
  | { kind: 'possibility'; file: string; digit: Digit; cmyk: CMYK }
  | { kind: 'impossibility'; file: string; reason: string; digit: Digit; cmyk: CMYK };

export const matrixEmitter = new EventEmitter();

// Internal helpers ---------------------------------------------------------
function hasTest(file: string): boolean {
  return fs.existsSync(file.replace(/\.ts$/, '.test.ts'));
}

function hasDoc(file: string): boolean {
  return fs.existsSync(file.replace(/\.ts$/, '.md'));
}

function fileDigit(file: string): number {
  // map filename length to digit 1-9 for colour variance
  return ((file.length % 9) || 9);
}

function evaluateFile(fullPath: string): void {
  const basename = path.basename(fullPath);
  const digit = fileDigit(basename);

  if (!hasTest(fullPath)) {
    const cmyk = impossibilityCMYK(digit as any);
    matrixEmitter.emit('event', {
      kind: 'impossibility',
      file: basename,
      reason: 'No test coverage',
      digit: digit as Digit,
      cmyk
    } as MatrixEvent);
  } else {
    const cmyk = digitAngleToCMYK(digit, asAngle(digit * 36));
    matrixEmitter.emit('event', {
      kind: 'possibility',
      file: basename,
      digit: digit as Digit,
      cmyk
    } as MatrixEvent);
  }
}

export function scanMatrixOnce(): void {
  const files = fs.readdirSync(CANON_DIR).filter(f => f.startsWith('a432') && f.endsWith('.ts') && !f.endsWith('.test.ts'));
  files.forEach(f => evaluateFile(path.join(CANON_DIR, f)));
}

export function startSelfEvolution(intervalMs: number = 4320): () => void {
  scanMatrixOnce(); // initial pass
  const id = setInterval(scanMatrixOnce, intervalMs);
  return () => clearInterval(id);
}

// Auto-start if executed directly (node a432.self.ts)
if (require.main === module) {
  startSelfEvolution();
  console.log('a432 self-evolution loop started');
  matrixEmitter.on('event', e => console.log(e));
} 