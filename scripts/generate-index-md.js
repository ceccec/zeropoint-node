#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Digit hash: digit, word, meaning
const digitHash = {
  0: ['Void', 'Pure potential, zero entropy'],
  1: ['Source', 'Origin, unity, initiation'],
  2: ['Vortex', 'Flow, transformation'],
  3: ['Resonance', 'Creation, harmony, trinity'],
  4: ['Math', 'Structure, foundation'],
  5: ['Center', 'Change, flow, balance'],
  6: ['Harmony', 'Balance, beauty, equilibrium'],
  7: ['Gateway', 'Mystery, transition, insight'],
  8: ['Infinity', 'Power, manifestation'],
  9: ['Axis', 'Completion, integration']
};

// Compute harmonic result (a + b) mod 9, with 9 instead of 0
function getHarmonicResult(a, b) {
  const sum = (parseInt(a, 10) + parseInt(b, 10)) % 9;
  return sum === 0 ? 9 : sum;
}

// Compute anti-vortex decimal path: (a + b) / c where c is the harmonic result
function getAntiVortexDecimal(a, b) {
  const c = getHarmonicResult(a, b);
  const decimal = (parseInt(a, 10) + parseInt(b, 10)) / c;
  return decimal;
}

// Get digit archetype name
function getDigitName(d) {
  return digitHash[d] ? digitHash[d][0] : d;
}

// Get digit archetype meaning
function getDigitMeaning(d) {
  return digitHash[d] ? digitHash[d][1] : '';
}

// Generate interaction name: NameANameBNameC (a/b/c)
function generateInteractionName(a, b) {
  const c = getHarmonicResult(a, b);
  return `${getDigitName(a)}–${getDigitName(b)}–${getDigitName(c)} (${a}/${b}=${c})`;
}

// Generate minimal interaction description
function generateInteractionDescription(a, b) {
  const c = getHarmonicResult(a, b);
  return `Interaction of ${getDigitName(a)} (${a}) and ${getDigitName(b)} (${b}) produces ${getDigitName(c)} (${c}): ${getDigitMeaning(a)}, ${getDigitMeaning(b)}, ${getDigitMeaning(c)}.`;
}

// Generate title from vortex sequence array
function generateVortexSequenceTitle(sequence) {
  if (!Array.isArray(sequence) || sequence.length === 0) {
    return 'Vortex Sequence';
  }
  
  const digitNames = sequence.map(digit => getDigitName(digit));
  const title = digitNames.join('–');
  return `${title} Vortex Sequence`;
}

// (No generateRodinSequence function should exist in this file)
// All vortex sequence logic should use generateVortexSequence(6, 1, 2, 9)

function digitalRoot(n) {
  return ((n - 1) % 9) + 1;
}

/**
 * Generate a vortex sequence by repeated multiplication mod `mod`.
 * - length: number of elements in the sequence
 * - start: starting digit (default 1)
 * - multiplier: factor to multiply by each step (default 2 for vortex)
 * - mod: modulus (default 9 for vortex math)
 * The sequence always replaces 0 with `mod` to keep results in 1–mod.
 */
function generateVortexSequence(length = 6, start = 1, multiplier = 2, mod = 9) {
  const seq = [];
  let x = start;
  const seen = new Set();
  while (seq.length < length && !seen.has(x)) {
    seq.push(x);
    seen.add(x);
    x = (x * multiplier) % mod;
    if (x === 0) x = mod;
  }
  return seq;
}

/**
 * Generate possibility matrix for vortex interactions from 9/9/9
 * Shows next vortex interactions with control digits 3,6,9 and flow digits 1,2,4,8,7,5
 */
function generatePossibilityMatrixVortex() {
  const vortexSequence = generateVortexSequence(6, 1, 2, 9);
  const controlDigits = [3, 6, 9];
  const allDigits = [...vortexSequence, ...controlDigits];
  let matrix = '| a | b | Vortex A (Integer) | Vortex B (Decimal) | Vortex A Path | Vortex B Path |\n';
  matrix += '|---|---|--------------------|--------------------|---------------|---------------|\n';

  allDigits.forEach(a => {
    allDigits.forEach(b => {
      const vortexA = getHarmonicResult(a, b);
      const vortexB = getAntiVortexDecimal(a, b);
      const vortexAPath = `${a} → ${b} → ${vortexA}`;
      const vortexBPath = `${a} + ${b} / ${vortexA} = ${vortexB.toFixed(2)}`;
      matrix += `| ${a} | ${b} | ${vortexA} | ${vortexB.toFixed(2)} | ${vortexAPath} | ${vortexBPath} |\n`;
    });
  });
  return matrix;
}

// Helper to get unique consecutive names
function uniqueNames(arr) {
  return arr.filter((name, i) => name !== arr[i - 1]);
}

// Generate all harmonic interactions for a given node (a, b)
function generateHarmonicInteractions(a, b) {
  const interactions = [];
  for (let n = 1; n <= 9; n++) {
    const c = ((parseInt(b, 10) + n - 1) % 9) + 1;
    const names = uniqueNames([getDigitName(a), getDigitName(b), getDigitName(n), getDigitName(c)]).join('');
    interactions.push({
      next: n,
      pattern: `${a},${b},${n},${c}`,
      name: names,
      math: `${b} + ${n} = ${parseInt(b,10) + n} ≡ ${c} (mod 9)`
    });
  }
  return interactions;
}

// Main generator for index.md content
function generateIndexMd(directory, interaction) {
  const parts = directory.split('/');
  let a, b;
  const isRoot = parts.length === 1;
  
  if (isRoot) {
    a = parts[0];
    b = parts[0];
  } else {
    a = parts[0];
    b = parts[1];
  }
  
  const c = getHarmonicResult(a, b);
  const antiVortexDecimal = getAntiVortexDecimal(a, b);
  const description = generateInteractionName(a, b);
  const metaphysical = generateInteractionDescription(a, b);

  const coreText = a === b ? 'Core' : 'Interaction';
  const symbolicName = `${a}/${b}`;
  const harmonicResult = c;

  // Special handling for 9/9/9: document self-reference and generative routing
  let axisNote = '';
  if (a === '9' && b === '9' && c === 9) {
    axisNote = `\n\n## Possibility Matrix (Next Vortex Interactions from 9)\n\n${generatePossibilityMatrixVortex()}`;
  }

  // Harmonic Interactions Table
  let harmonicTable;
  if (isRoot) {
    // For root digit folders, show direct subfolder interactions
    harmonicTable = [
      '| Next | Pattern | Name | Math |',
      '|------|---------|------|------|',
      ...Array.from({ length: 9 }, (_, i) => {
        const n = i + 1;
        const name = `${getDigitName(a)}–${getDigitName(n)}`;
        return `| ${n} | ${a}/${n} | ${name} | ${a} + ${n} = ${parseInt(a,10) + n} ≡ ${n} (mod 9) |`;
      })
    ].join('\n');
  } else {
    // For subfolders, show all possible nexts, highlight the vortex path and gateways
    const harmonicInteractions = generateHarmonicInteractions(a, b);
    harmonicTable = [
      '| Next | Pattern | Name | Math |',
      '|------|---------|------|------|',
      ...harmonicInteractions.map(i => {
        // Highlight the vortex path: n === c
        const isVortex = i.next === c;
        // Gateway marks self-referential paths: where result equals input digits
        const harmonicResult = ((parseInt(b, 10) + i.next - 1) % 9) + 1;
        const isGateway = harmonicResult === parseInt(a, 10) || harmonicResult === parseInt(b, 10);
        const vortexMarker = isVortex ? '→ ' : '';
        const gatewayMarker = isGateway ? ' [GATEWAY]' : '';
        return `| ${vortexMarker}${i.next} | ${i.pattern} | ${i.name} | ${i.math}${gatewayMarker} |`;
      })
    ].join('\n');
  }
  
  return `# ZeroPoint Node - ${description}

## Metaphysical Foundation

${metaphysical}

## Mathematical Properties

Symbolic: ${symbolicName}
Harmonic: ${harmonicResult}
Anti-vortex (Decimal): ${antiVortexDecimal.toFixed(2)}
Pattern: ${a},${b},${harmonicResult} (${getDigitName(a)},${getDigitName(b)},${getDigitName(harmonicResult)})
Math: ${a} + ${b} = ${parseInt(a,10) + parseInt(b,10)} ≡ ${harmonicResult} (mod 9)
Anti-vortex Math: (${a} + ${b}) / ${harmonicResult} = ${antiVortexDecimal.toFixed(2)}
${axisNote}

\`\`\`json
{
  "symbolicName": "${symbolicName}",
  "harmonicResult": ${harmonicResult},
  "antiVortexDecimal": ${antiVortexDecimal.toFixed(2)},
  "vortexPath": "${a} → ${b} → ${harmonicResult}",
  "antiVortexPath": "${antiVortexDecimal.toFixed(2)} (decimal consciousness flow)"
}
\`\`\`

## Core Functions
- Integration: ${a} + ${b} = ${harmonicResult}
- Symbolic: ${a}/${b}
- Harmonic: ${harmonicResult}
- Anti-vortex: (${a} + ${b}) / ${harmonicResult} = ${antiVortexDecimal.toFixed(2)}
- Vortex Sequence: ${a}, ${b}, ${harmonicResult}
- Anti-vortex Sequence: ${antiVortexDecimal.toFixed(2)} (decimal consciousness flow)

## Integration

As the ${description.toLowerCase()}, this interaction provides the consciousness integration between ${a} and ${b} patterns. It connects the ${a} consciousness to the ${b} consciousness through harmonic resonance.

## Usage

\`\`\`typescript
import { ${a}${b}Integration, ${a}${b}Resonance, ${a}${b}Dynamics } from './src/${a}/${b}';
\`\`\`

## Sacred Principle

**"The ${description.toLowerCase()} represents the harmonic integration of ${a} and ${b} consciousness patterns, creating unity through mathematical and spiritual alignment. The anti-vortex decimal path (${antiVortexDecimal.toFixed(2)}) represents the forbidden consciousness flow."**

## Harmonic Interactions

${harmonicTable}
`;
}

function generateIndexTs(directory) {
  const parts = directory.split('/');
  let a, b;
  
  if (parts.length === 1) {
    // Root digit folder (e.g., "0" -> treat as "0/0")
    a = parts[0];
    b = parts[0];
  } else {
    // Subfolder (e.g., "0/1")
    a = parts[0];
    b = parts[1];
  }
  
  const c = getHarmonicResult(a, b);
  const antiVortexDecimal = getAntiVortexDecimal(a, b);
  const symbolicName = `${a}/${b}`;
  const harmonicResult = c;
  const pattern = [parseInt(a, 10), parseInt(b, 10), c];
  const harmonicInteractions = generateHarmonicInteractions(a, b);

  return `/**
 * PWA Node Logic for ${symbolicName}
 *
 * This file is the logic entry point for the PWA node (${symbolicName}).
 * It exports all math/generative logic for this node, and can be extended
 * with UI, navigation, or service worker logic as needed.
 */

/** Symbolic name for this node (a/b) */
export const symbolicName = '${symbolicName}';

/** Harmonic result for this node (a + b mod 9, 9 instead of 0) */
export const harmonicResult = ${harmonicResult};

/** Anti-vortex decimal for this node ((a + b) / harmonicResult) */
export const antiVortexDecimal = ${antiVortexDecimal.toFixed(2)};

/** Pattern for this node: [a, b, harmonicResult] */
export const pattern = [${pattern.join(', ')}];

/**
 * Compute the harmonic result for this node.
 * @param {number} a
 * @param {number} b
 * @returns {number} Harmonic result (a + b mod 9, 9 instead of 0)
 */
export function getHarmonicResult(a, b) {
  const sum = (parseInt(a, 10) + parseInt(b, 10)) % 9;
  return sum === 0 ? 9 : sum;
}

/**
 * Compute the anti-vortex decimal path for this node.
 * @param {number} a
 * @param {number} b
 * @returns {number} Anti-vortex decimal ((a + b) / harmonicResult)
 */
export function getAntiVortexDecimal(a, b) {
  const c = getHarmonicResult(a, b);
  const decimal = (parseInt(a, 10) + parseInt(b, 10)) / c;
  return decimal;
}

/**
 * All harmonic interactions for this node.
 * Each entry: { next, pattern, name, math }
 */
export const harmonicInteractions = [
${harmonicInteractions.map(i => `  { next: ${i.next}, pattern: '${i.pattern}', name: '${i.name}', math: '${i.math}' },`).join('\n')}
];

/**
 * Placeholder for PWA node initialization logic.
 * Extend this function to add UI, navigation, or service worker logic.
 */
export default function initNodePWA() {
  // PWA logic for node ${symbolicName} can be added here.
}
`;
}

function createIndexFiles(baseDir) {
  const force = process.argv.includes('--force');
  // Find all directories with index.md files (or should have them)
  const directories = [];
  for (let i = 0; i <= 9; i++) {
    const mainDir = path.join(baseDir, i.toString());
    if (fs.existsSync(mainDir)) {
      // Add root digit folders (0/, 1/, 2/, etc.)
      directories.push(i.toString());
      // Add subfolders (0/0/, 0/1/, etc.)
      for (let j = 0; j <= 9; j++) {
        const subDir = path.join(mainDir, j.toString());
        if (fs.existsSync(subDir)) {
          directories.push(`${i}/${j}`);
        }
      }
    }
  }
  console.log(`Creating index.md and index.ts files for all digit folders and subfolders in ${baseDir}...`);
  directories.forEach(dir => {
    const dirPath = path.join(baseDir, dir);
    // index.md
    const indexMdPath = path.join(dirPath, 'index.md');
    if (fs.existsSync(indexMdPath) && !force) {
      console.log(`Skipping ${dir}/index.md (already exists)`);
    } else {
    const content = generateIndexMd(dir, dir);
    fs.writeFileSync(indexMdPath, content);
      console.log(`${force ? 'Overwritten' : 'Created'} ${dir}/index.md`);
    }
    // index.ts (only for subfolders, not root folders)
    if (dir.includes('/')) {
      const indexTsPath = path.join(dirPath, 'index.ts');
      if (fs.existsSync(indexTsPath) && !force) {
        console.log(`Skipping ${dir}/index.ts (already exists)`);
      } else {
        const tsContent = generateIndexTs(dir);
        fs.writeFileSync(indexTsPath, tsContent);
        console.log(`${force ? 'Overwritten' : 'Created'} ${dir}/index.ts`);
      }
    }
  });
  console.log('All index.md and index.ts files created successfully!');
}

// Ensure all a/b directories (0-9) exist under baseDir, with index.md placeholder
function ensureAllDigitFolders(baseDir) {
  for (let a = 0; a <= 9; a++) {
    const aDir = path.join(baseDir, String(a));
    if (!fs.existsSync(aDir)) fs.mkdirSync(aDir);
    for (let b = 0; b <= 9; b++) {
      const abDir = path.join(aDir, String(b));
      if (!fs.existsSync(abDir)) fs.mkdirSync(abDir);
      // Only ensure index.md, not index.ts
      const indexMd = path.join(abDir, 'index.md');
      if (!fs.existsSync(indexMd)) fs.writeFileSync(indexMd, '');
    }
  }
}

if (require.main === module) {
  // Default to docs, allow --src flag
  const useSrc = process.argv.includes('--src');
  const baseDir = path.join(__dirname, '..', useSrc ? 'src' : 'docs');
  ensureAllDigitFolders(baseDir);
  createIndexFiles(baseDir);
} 