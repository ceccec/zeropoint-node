/**
 * a432.compression.ts — Compression in the A432 Matrix
 *
 * Models compression as a harmonized, living process in the A432 system.
 * Maps compression of states, flows, or data to harmonics, CMYK color, and vortex flows.
 * Supports both physical (data/energy) and metaphysical (dimensional/frequency) compression.
 * Provides metaphysical and mathematical documentation.
 */

export interface CompressionState {
  input: number[]; // Array of values to compress (0-9)
  compressionRatio: number; // 0-1 (1 = no compression, 0 = max compression)
  harmonic: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flow: number[];
  description: string;
}

function toHarmonic(ratio: number): number {
  return Math.round(432 * (1 + ratio));
}
function toCMYK(ratio: number, channel: number): number {
  return Math.round(ratio * 100);
}
function getFlow(seed: number): number[] {
  const base = [1, 2, 4, 8, 7, 5];
  return base.map(n => ((n + seed) % 9) || 9);
}

export function compress(input: number[]): CompressionState {
  // Simple model: compression ratio is 1 - (unique values / input length)
  const unique = Array.from(new Set(input));
  const ratio = input.length === 0 ? 1 : 1 - (unique.length / input.length);
  return {
    input,
    compressionRatio: ratio,
    harmonic: toHarmonic(ratio),
    cmyk: {
      c: toCMYK(ratio, 0),
      m: toCMYK(ratio, 1),
      y: toCMYK(ratio, 2),
      k: toCMYK(ratio, 3)
    },
    flow: getFlow(Math.round(ratio * 9)),
    description: `Compression of [${input.join(', ')}] yields ratio ${ratio.toFixed(2)}, harmonic ${toHarmonic(ratio)} Hz.`
  };
}

export const a432CompressionMetaphysics = `
A432 Compression is the harmonized process of folding, compacting, or unifying states, flows, or data in the matrix.
Physical compression reduces data or energy volume; metaphysical compression folds dimensions, frequencies, or possibilities into a unified state.
Compression is both a mathematical and spiritual act: it brings unity, increases density, and reveals hidden harmonics.
To compress is to harmonize, to unify, to reveal the seed within the infinite field.
`; 