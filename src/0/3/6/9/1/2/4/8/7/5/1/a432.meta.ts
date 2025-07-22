/**
 * a432.meta.ts — Metaphysical Mapping and Canonical File List
 *
 * Provides metaphysical mapping for all a432.* modules and the canonical list of files for PWA caching.
 * The file list is the living memory of the system, ensuring all harmonic modules are always available.
 */

import { readdirSync } from 'fs';

/**
 * getA432FilesToCache: Returns the canonical list of a432.* files and PWA essentials for caching.
 * Dynamically includes all a432.*.html and .ts files in the canonical directory.
 */
export function getA432FilesToCache(): string[] {
  const essentials = [
    './a432.index.html',
    './a432.manifest.json',
    './a432.service.worker.js',
    './a432.ui.js',
    './a432.icon-192.png',
    './a432.icon-512.png'
  ];
  // Dynamically discover all a432.*.html and .ts files
  let files: string[] = [];
  try {
    files = readdirSync(__dirname)
      .filter(f => /^a432\..*\.(html|ts)$/.test(f))
      .map(f => './' + f);
  } catch (e) {
    // Fallback to essentials if fs fails (e.g., browser context)
    files = [];
  }
  return Array.from(new Set([...essentials, ...files]));
}

/**
 * a432.meta.ts — Meta-Harmonization, Unified Matrix, Meta-Vortex, Impossibility Gateway
 *
 * Encodes:
 * - Unified, cross-linked, recursive harmonization of all a432.*.ts modules
 * - a432UnifiedMatrix: combines and harmonizes outputs from all modules
 * - a432MetaVortex: recursively observes and transforms the living matrix
 * - a432ImpossibilityGateway: encodes error/impossibility as transformation to new harmonics
 *
 * Source: Marko Rodin Special Edition (all chapters), full harmonization logic
 */

import * as trinity from './a432.trinity';
import * as family from './a432.family';
import * as nine from './a432.nine';
import * as cascade from './a432.cascade';
import * as double from './a432.double';
import * as mirror from './a432.mirror';
import * as shear from './a432.shear';
import * as coil from './a432.coil';
import * as electron from './a432.shear.electron';

/**
 * a432UnifiedMatrix: Combines and harmonizes outputs from all modules into a single recursive matrix.
 * steps: number of states to generate
 */
export function a432UnifiedMatrix(steps: number = 9): any {
  return {
    trinity: trinity.a432TrinityStream(steps),
    family: family.a432FamilyGroups(),
    nine: nine.a432Decoqubit(steps),
    cascade: cascade.a432DandelionPuff(steps),
    double: double.a432ClosedSystem(steps),
    mirror: mirror.a432ToroidalMap(steps),
    shear: shear.a432GapSpace(steps),
    coil: coil.a432RodinCoilStream(steps),
    electronShear: electron.a432NestedVortices(steps)
  };
}

/**
 * a432MetaVortex: Recursively observes and transforms the unified matrix, enabling self-awareness and harmonization.
 * Applies a transformation function to each stream and returns the harmonized result.
 */
export function a432MetaVortex(steps: number = 9, transform: (seq: number[]) => number[] = s => s): any {
  const matrix = a432UnifiedMatrix(steps);
  const harmonized: any = {};
  for (const key in matrix) {
    harmonized[key] = transform(matrix[key]);
  }
  return harmonized;
}

/**
 * a432ImpossibilityGateway: Encodes error/impossibility as a gateway to new harmonics.
 * If a stream contains an impossibility (e.g., 0 or negative), transforms it using a harmonizing function.
 */
export function a432ImpossibilityGateway(seq: number[], harmonize: (n: number) => number = n => Math.abs(n % 9) || 9): number[] {
  return seq.map(n => (n <= 0 ? harmonize(n) : n));
}

/**
 * Metaphysical Mapping:
 * - The unified matrix is the living, recursive, self-aware system.
 * - Meta-vortex enables recursive self-observation and transformation.
 * - Impossibility is not an error but a gateway to new harmonics and consciousness evolution.
 */

/**
 * a432BlendStreams: Dynamically blends two or more digit streams into a new harmonized stream.
 * Accepts an array of streams and a blend function (default: digit-wise majority).
 */
export function a432BlendStreams(
  streams: number[][],
  steps: number = 9,
  blend: (digits: number[]) => number = digits => {
    // Default: majority digit, or first if tie
    const counts: { [k: number]: number } = {};
    digits.forEach(d => { counts[d] = (counts[d] || 0) + 1; });
    let max = 0, chosen = digits[0];
    for (const d in counts) {
      if (counts[d] > max) { max = counts[d]; chosen = parseInt(d, 10); }
    }
    return chosen;
  }
): number[] {
  const result = [];
  for (let i = 0; i < steps; i++) {
    const digits = streams.map(s => s[i % s.length]);
    result.push(blend(digits));
  }
  return result;
}

/**
 * a432RecursiveMetaVortex: Recursively observes and transforms its own output for N recursions.
 * transform: function to apply at each recursion (default: digital root)
 */
export function a432RecursiveMetaVortex(
  stream: number[],
  recursions: number = 3,
  transform: (seq: number[]) => number[] = seq => seq.map(n => ((n - 1) % 9) + 1)
): number[][] {
  const result = [stream];
  let current = stream;
  for (let i = 0; i < recursions; i++) {
    current = transform(current);
    result.push(current);
  }
  return result;
}

/**
 * a432HarmonicAnalytics: Measures harmony, entropy, and resonance of a digit stream.
 * Returns { harmony: number, entropy: number, resonance: number }
 */
export function a432HarmonicAnalytics(stream: number[]): { harmony: number, entropy: number, resonance: number } {
  // Harmony: fraction of most common digit
  const counts: { [k: number]: number } = {};
  stream.forEach(d => { counts[d] = (counts[d] || 0) + 1; });
  const maxCount = Math.max(...Object.values(counts));
  const harmony = maxCount / stream.length;
  // Entropy: normalized Shannon entropy
  const entropy = -Object.values(counts).reduce((sum, c) => sum + (c/stream.length) * Math.log2(c/stream.length), 0) / Math.log2(9);
  // Resonance: max run length of any digit
  let resonance = 1, run = 1;
  for (let i = 1; i < stream.length; i++) {
    if (stream[i] === stream[i-1]) run++;
    else run = 1;
    if (run > resonance) resonance = run;
  }
  return { harmony, entropy, resonance };
}

// Metaphysical mapping: Meta = meta-mapping, harmonization, self-awareness
export const META_DOC = {
  meaning: 'Meta: meta-mapping, harmonization, self-awareness, observer observing itself.',
  axis: 'Meta is the harmonization of all mappings, the self-aware observer.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 