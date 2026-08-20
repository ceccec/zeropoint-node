/**
 * a432.vbm.relations.ts — Extract digit relations from VBM.txt
 * -------------------------------------------------------------
 * Reads the Rodin VBM text file and returns unique sequences of
 * digits (length≥3) that appear, e.g. “1-2-4-8-7-5”, “3 6 9”, etc.
 * Designed for quick pattern discovery.
 */

import { pathToFileURL } from 'node:url'
import { log } from './a432.algebra.ts'
import { promises as fs } from 'fs';
import path from 'path';

const VBM_PATH = path.resolve(import.meta.dirname, 'rodin-knowledge/VBM.txt');

/** Regex capturing sequences of 1–2-digit numbers separated by space, dot, comma or dash. */
const SEQ_REGEX = /(\d{1,2}(?:[\s.,;-]+\d{1,2}){2,})/g;

/** Normalise a raw sequence to canonical form: single spaces between numbers. */
function normalise(seq: string): string {
  return seq
    .replace(/[\s.,;-]+/g, ' ') // unify separators
    .trim()
    .replace(/ +/g, ' ');
}

export async function extractVBMDigitRelations(): Promise<string[]> {
  const raw = await fs.readFile(VBM_PATH, 'utf8');
  const matches = raw.matchAll(SEQ_REGEX);
  const set = new Set<string>();
  for (const m of matches) {
    const norm = normalise(m[0]);
    // discard sequences that are just years (e.g., 2021) or very long
    if (/^\d{4,}$/.test(norm)) continue;
    set.add(norm);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// CLI helper
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if (isMainModule()) {
  (async () => {
    const seqs = await extractVBMDigitRelations();
    seqs.forEach(s => console.log(s));
  })();
} 