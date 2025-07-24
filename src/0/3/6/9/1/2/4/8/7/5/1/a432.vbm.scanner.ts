import fs from 'fs/promises';
import path from 'path';

// Path to VBM text
const VBM_FILE = path.resolve(__dirname, 'rodin-knowledge/VBM.txt');
const OUTPUT_JSON = path.resolve(__dirname, 'extracted-vbm-math.json');

// Regexes
const RATIO_RE = /(\d+\s*[:/]\s*\d+)/g;
const EQ_RE = /(\d+[^\n]{0,20}=.{0,20}\d+)/g; // crude equation capture
const ANGLE_RE = /(\d+°)/g;
const FREQ_RE = /(\d+\s*Hz)/gi;
const LONG_INT_RE = /\b\d{3,}\b/g;

interface Extracted {
  kind: 'ratio' | 'equation' | 'angle' | 'frequency' | 'number';
  value: string;
  line: number;
}

(async () => {
  const raw = await fs.readFile(VBM_FILE, 'utf8');
  const lines = raw.split(/\r?\n/);
  const out: Extracted[] = [];
  lines.forEach((line, idx) => {
    const pushMatches = (iter: Iterable<RegExpMatchArray>|null, kind: Extracted['kind']) => {
      if (!iter) return;
      for (const m of iter) {
        out.push({ kind, value: m[0].trim(), line: idx + 1 });
      }
    };
    pushMatches(line.matchAll(RATIO_RE), 'ratio');
    pushMatches(line.matchAll(EQ_RE), 'equation');
    pushMatches(line.matchAll(ANGLE_RE), 'angle');
    pushMatches(line.matchAll(FREQ_RE), 'frequency');
    pushMatches(line.matchAll(LONG_INT_RE), 'number');
  });
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Extracted ${out.length} math tokens -> ${path.relative(process.cwd(), OUTPUT_JSON)}`);
})(); 