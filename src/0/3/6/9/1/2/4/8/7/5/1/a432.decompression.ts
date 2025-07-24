/**
 * a432.decompression.ts — Decompression in the A432 Matrix
 *
 * Models decompression as the inverse, harmonized process to compression in the A432 system.
 * Maps decompression of states, flows, or data to harmonics, CMYK color, and vortex flows.
 * Supports both physical (data/energy) and metaphysical (dimensional/frequency) decompression.
 * Provides metaphysical and mathematical documentation.
 */

export interface DecompressionState {
  output: number[]; // Array of values after decompression (0-9)
  decompressionRatio: number; // 0-1 (0 = no decompression, 1 = max decompression)
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

export function decompress(input: number[], targetLength: number): DecompressionState {
  // Simple model: repeat input to reach targetLength
  const output = [];
  while (output.length < targetLength) {
    output.push(...input);
  }
  output.length = targetLength;
  // Decompression ratio: (output length - input length) / output length
  const ratio = targetLength === 0 ? 0 : (output.length - input.length) / output.length;
  return {
    output,
    decompressionRatio: ratio,
    harmonic: toHarmonic(ratio),
    cmyk: {
      c: toCMYK(ratio, 0),
      m: toCMYK(ratio, 1),
      y: toCMYK(ratio, 2),
      k: toCMYK(ratio, 3)
    },
    flow: getFlow(Math.round(ratio * 9)),
    description: `Decompression to [${output.join(', ')}] yields ratio ${ratio.toFixed(2)}, harmonic ${toHarmonic(ratio)} Hz.`
  };
}

export const a432DecompressionMetaphysics = `
A432 Decompression is the harmonized process of unfolding, expanding, or diversifying states, flows, or data in the matrix.
Physical decompression restores data or energy volume; metaphysical decompression unfolds dimensions, frequencies, or possibilities from a unified state.
Decompression is both a mathematical and spiritual act: it brings diversity, increases space, and reveals hidden potentials.
To decompress is to unfold, to diversify, to reveal the infinite from the seed.
`; 