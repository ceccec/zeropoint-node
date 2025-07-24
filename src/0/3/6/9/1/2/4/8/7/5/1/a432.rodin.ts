// @ts-nocheck
/**
 * a432.rodin.ts — Science & Math extraction from the Rodin book
 * -----------------------------------------------------------------
 * This module scans every plain-text chapter chunk under the project
 * (directories like src/*/chunks/*.txt) and extracts lines that look
 * mathematical: ones containing numbers, equations, ratios, degrees,
 * frequency references, etc.  The goal is to keep the raw science/math
 * content handy for further analysis while avoiding manual copy-paste.
 *
 * Usage
 *   import { extractRodinMath, getRodinMathLines } from './a432.rodin';
 *   const lines = await getRodinMathLines();
 *   console.log(lines.slice(0, 20));
 *
 * Run directly:
 *   npx ts-node src/.../a432.rodin.ts > rodin-math.txt
 *
 * Notes
 * • Uses only Node built-ins (fs, path) to stay dependency-free.
 * • Filtering heuristic: a line is considered mathematical if it
 *   contains a digit OR one of the symbols: %,°,=,+,-,*,/,^.
 * • You can post-process the returned lines with regex, a432.math helpers, etc.
 */

import { promises as fs } from 'fs';
import path from 'path';

/** Root directory of the repository (assumed two levels up from this file). */
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', '..', '..', '..', '..');

/** True when executed directly via `ts-node a432.rodin.ts` */
const IS_CLI = require.main === module;

/** Regex flagging a line as math/science (contains digits or math symbols). */
const MATH_REGEX = /[0-9]|[%°=+\-*/^]/;

/**
 * Recursively walk a directory collecting .txt files inside a `chunks` folder.
 */
async function collectChunkFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Only recurse if still within reasonable depth
      files.push(...await collectChunkFiles(p));
    } else if (entry.isFile() && entry.name.endsWith('.txt') && (dir.includes('chunks') || dir.includes('rodin-knowledge'))) {
      files.push(p);
    }
  }
  return files;
}

/**
 * Read a file and return the lines that satisfy MATH_REGEX.
 */
async function extractMathLinesFromFile(file: string): Promise<string[]> {
  const raw = await fs.readFile(file, 'utf8');
  return raw.split(/\r?\n/).filter(line => MATH_REGEX.test(line));
}

/**
 * Returns a flat array of all math/science lines across every chunk file.
 */
export async function getRodinMathLines(): Promise<string[]> {
  const chunkFiles = await collectChunkFiles(PROJECT_ROOT + '/src');
  const all: string[] = [];
  for (const f of chunkFiles) {
    const lines = await extractMathLinesFromFile(f);
    all.push(...lines.map(l => l.trim()));
  }
  return all;
}

/**
 * Groups the math lines by their originating file for easier context.
 */
export interface FileMath {
  file: string;
  lines: string[];
}

export async function extractRodinMath(): Promise<FileMath[]> {
  const chunkFiles = await collectChunkFiles(PROJECT_ROOT + '/src');
  const result: FileMath[] = [];
  for (const f of chunkFiles) {
    const lines = await extractMathLinesFromFile(f);
    if (lines.length) result.push({ file: path.relative(PROJECT_ROOT, f), lines });
  }
  return result;
}

// ------------------------------------------------------------------
// CLI: print all math lines (with source file headers) to stdout
// ------------------------------------------------------------------
if (IS_CLI) {
  (async () => {
    const grouped = await extractRodinMath();
    for (const g of grouped) {
      console.log(`# ${g.file}`);
      g.lines.forEach(ln => console.log(ln));
      console.log();
    }
  })().catch(err => {
    console.error(err);
    process.exit(1);
  });
} 