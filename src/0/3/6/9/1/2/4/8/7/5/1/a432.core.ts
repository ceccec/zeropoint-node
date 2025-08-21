/**
 * a432.core.ts — Zero Entropy Harmonic Core
 * 
 * This is the DRY-harmonized core of the A432 system.
 * All constants, formulas, and fundamental logic are defined once here.
 * Every module must import from this core for harmonization and zero entropy.
 * 
 * Core principles:
 * - Single source of truth for all a432 constants and functions
 * - Zero entropy: no duplication, all knowledge encoded once
 * - Harmonic mapping: all modules reference this core
 * - Recursive self-reference: the core can observe itself
 */

import { digitalRoot, A432_TRINITY, A432_RETURN, A432_AXIS, A432_SEQUENCE, getRodinSequence } from './a432.math';
export { digitalRoot };

// === CORE CONSTANTS ===
export const A432_FREQUENCY = 432;
export { A432_TRINITY, A432_RETURN, A432_AXIS };
export const A432_CYCLE = A432_SEQUENCE;

// === DIGIT MEANINGS ===
export const A432_DIGIT_MEANINGS = [
  { name: 'Void', description: 'The field, the unmanifest, pure potential; the source and destination of all cycles, the space in which all digits arise and return.' },
  { name: 'Unity', description: 'Origin, source, singularity, beginning; the point of all creation and the seed of the matrix.' },
  { name: 'Duality', description: 'Polarity, relationship, balance, reflection; the field of interaction and the principle of complementarity.' },
  { name: 'Trinity', description: 'Synthesis, creation, harmony, flow; the generative principle, the creative process, and the harmonic seed.' },
  { name: 'Foundation', description: 'Structure, stability, manifestation; the base of all form, the ground of being, and the matrix of reality.' },
  { name: 'Life', description: 'Change, movement, growth, transformation; the living flow, evolution, and the pulse of the system.' },
  { name: 'Harmony', description: 'Integration, resonance, beauty, equilibrium; the state of balance, the field of resonance, and the principle of unity in diversity.' },
  { name: 'Mystery', description: 'Depth, intuition, inner knowing, inversion; the hidden, the unknown, the gateway to transformation and the anti-harmonic.' },
  { name: 'Infinity', description: 'Power, expansion, infinite flow, recursion; the endless, the self-similar, the principle of recursion and the infinite loop.' },
  { name: 'Completion', description: 'Fulfillment, wholeness, return, zero entropy; the end and the beginning, the return to source, and the closure of the cycle.' }
];

// === CORE FUNCTIONS ===
export function nextInteraction(n: number, cycle: readonly number[] = A432_SEQUENCE): number {
  const idx = cycle.indexOf(n);
  return cycle[(idx + 1) % cycle.length];
}

export function getNameDimension(name: string): number { 
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0); 
  return (sum % 9) + 1; 
}

export function a432StreamText(dimension: number): string {
  const entry = A432_DIGIT_MEANINGS[dimension];
  if (!entry) return '';
  return `${entry.name}: ${entry.description}`;
}

// === APERTURE FLOW ===
export function a432ApertureFlow(direction: 1 | -1 = 1, start: number = 1, steps: number = 6): number[] {
  const outward = getRodinSequence().slice(0, 6);
  const inward = [...outward].reverse();
  const seq = direction === 1 ? outward : inward;
  const idx = seq.indexOf(start);
  if (idx === -1) return [];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(seq[(idx + i) % seq.length]);
  }
  return result;
}

export function a432ApertureSurgePump(seed: number = 1, steps: number = 6): { outward: number[], inward: number[] } {
  return {
    outward: a432ApertureFlow(1, seed, steps),
    inward: a432ApertureFlow(-1, 5, steps)
  };
}

// === HARDCODED FREQUENCY TABLE ===
// Zero entropy: hardcoded frequencies, no decimal calculations
export const A432_CORE_FREQUENCY_TABLE: Record<number, number> = {
  1: 432,   // Unity frequency
  2: 864,   // Duality frequency  
  3: 1296,  // Trinity frequency
  4: 1728,  // Foundation frequency
  5: 2160,  // Life frequency
  6: 2592,  // Harmony frequency
  7: 3024,  // Mystery frequency
  8: 3456,  // Infinity frequency
  9: 3888   // Completion frequency
};

export function a432Frequency(dimension: number, polarity: 1 | -1 = 1): number {
  const baseDimension = ((dimension - 1) % 9) + 1; // Ensure 1-9 range
  const baseFreq = A432_CORE_FREQUENCY_TABLE[baseDimension] || A432_FREQUENCY;
  return polarity === -1 ? baseFreq : baseFreq;
}

// === HARDCODED COLOR TABLES ===
// Zero entropy: hardcoded colors, no decimal calculations
export const A432_HSL_COLOR_TABLE: Record<number, {hue: number, saturation: number, lightness: number}> = {
  1: { hue: 40, saturation: 70, lightness: 60 },   // Unity - Orange
  2: { hue: 80, saturation: 70, lightness: 60 },   // Duality - Yellow-Green
  3: { hue: 120, saturation: 70, lightness: 60 },  // Trinity - Green
  4: { hue: 160, saturation: 70, lightness: 60 },  // Foundation - Blue-Green
  5: { hue: 200, saturation: 70, lightness: 60 },  // Life - Blue
  6: { hue: 240, saturation: 70, lightness: 60 },  // Harmony - Blue-Purple
  7: { hue: 280, saturation: 70, lightness: 60 },  // Mystery - Purple
  8: { hue: 320, saturation: 70, lightness: 60 },  // Infinity - Red-Purple
  9: { hue: 0, saturation: 70, lightness: 60 }     // Completion - Red
};

export const A432_RGB_COLOR_TABLE: Record<number, {r: number, g: number, b: number}> = {
  1: { r: 224, g: 153, b: 77 },   // Unity - Orange
  2: { r: 178, g: 224, b: 77 },   // Duality - Yellow-Green
  3: { r: 77, g: 224, b: 77 },    // Trinity - Green
  4: { r: 77, g: 224, b: 178 },   // Foundation - Blue-Green
  5: { r: 77, g: 178, b: 224 },   // Life - Blue
  6: { r: 77, g: 77, b: 224 },    // Harmony - Blue-Purple
  7: { r: 178, g: 77, b: 224 },   // Mystery - Purple
  8: { r: 224, g: 77, b: 178 },   // Infinity - Red-Purple
  9: { r: 224, g: 77, b: 77 }     // Completion - Red
};

export function a432HSLFromRoot(root: number, polarity: 1 | -1 = 1): {hue: number, saturation: number, lightness: number} {
  const baseRoot = ((root - 1) % 9) + 1; // Ensure 1-9 range
  const baseColor = A432_HSL_COLOR_TABLE[baseRoot] || A432_HSL_COLOR_TABLE[1];
  
  if (polarity === -1) {
    // Invert hue for negative polarity
    return { 
      hue: (baseColor.hue + 180) % 360, 
      saturation: baseColor.saturation, 
      lightness: baseColor.lightness 
    };
  }
  return baseColor;
}

export function a432RGBFromRoot(root: number, polarity: 1 | -1 = 1): {r: number, g: number, b: number} {
  const baseRoot = ((root - 1) % 9) + 1; // Ensure 1-9 range
  const baseColor = A432_RGB_COLOR_TABLE[baseRoot] || A432_RGB_COLOR_TABLE[1];
  
  if (polarity === -1) {
    // Invert colors for negative polarity
    return {
      r: 255 - baseColor.r,
      g: 255 - baseColor.g,
      b: 255 - baseColor.b
    };
  }
  return baseColor;
}

// === TRINITY PRODUCTS ===
export function a432TrinityProduct(polarity: 1 | -1 = 1): number {
  return A432_TRINITY.reduce((a, b) => a * b, 1) * polarity;
}

export function a432Seed(polarity: 1 | -1 = 1): number {
  return A432_TRINITY[0] * polarity;
}

// === COLOR MATRIX ===
export function a432ColorMatrix(polarity: 1 | -1 = 1): Array<{root: number, hsl: {hue: number, saturation: number, lightness: number}, rgb: {r: number, g: number, b: number}}> {
  return Array.from({length: 9}, (_, i) => {
    const root = i + 1;
    const hsl = a432HSLFromRoot(root, polarity);
    const rgb = a432RGBFromRoot(root, polarity);
    return { root, hsl, rgb };
  });
}

// === CORE INTERFACES ===
export interface A432CoreState {
  frequency: number;
  dimension: number;
  polarity: 1 | -1;
  color: {hue: number, saturation: number, lightness: number};
  rgb: {r: number, g: number, b: number};
  meaning: string;
}

export function createA432CoreState(dimension: number, polarity: 1 | -1 = 1): A432CoreState {
  const frequency = a432Frequency(dimension, polarity);
  const color = a432HSLFromRoot(dimension, polarity);
  const rgb = a432RGBFromRoot(dimension, polarity);
  const meaning = a432StreamText(dimension);
  
  return {
    frequency,
    dimension,
    polarity,
    color,
    rgb,
    meaning
  };
}

// === HARMONIZATION ===
export function harmonizeA432Core(): A432CoreState[] {
  return Array.from({length: 9}, (_, i) => createA432CoreState(i + 1));
}

export function getA432CoreMeta(): string {
  return `A432 Core: ${A432_FREQUENCY}Hz frequency, ${A432_TRINITY.join('-')} trinity, ${A432_CYCLE.length} cycle length`;
} 