/**
 * a432.vbm.science.extract.ts — pull science-oriented sentences from VBM.txt
 */

import fs from 'fs/promises';
import path from 'path';

const VBM = path.resolve(__dirname, 'rodin-knowledge/VBM.txt');
const OUT = path.resolve(__dirname, 'extracted-vbm-science.txt');

const KEYWORDS = [
  'physics', 'energy', 'frequency', 'resonance', 'electron', 'coil', 'torus',
  'vortex', 'inertia', 'field', 'plasma', 'dna', 'pyramid', 'magnet', 'quantum',
  'harmonic', 'over-unity', 'winding', 'wave', 'doubling', 'mod 9', 'poloidal', 'power',
];

(async () => {
  const raw = await fs.readFile(VBM, 'utf8');
  const lines = raw.split(/\r?\n/);
  const out: string[] = [];
  lines.forEach((line, i) => {
    const lLine = line.toLowerCase();
    if (KEYWORDS.some(k => lLine.includes(k))) {
      out.push(`${i+1}: ${line.trim()}`);
    }
  });
  await fs.writeFile(OUT, out.join('\n'), 'utf8');
  console.log(`Science lines: ${out.length} -> ${path.relative(process.cwd(), OUT)}`);
})(); 