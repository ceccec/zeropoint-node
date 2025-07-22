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

// === CORE CONSTANTS ===
export const A432_FREQUENCY = 432;
export const A432_TRINITY = [4, 3, 2];
export const A432_RETURN = [8, 7, 5];
export const A432_AXIS = [9, 6, 3];
export const A432_CYCLE = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];

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
export function nextInteraction(n: number, cycle: number[] = A432_CYCLE): number {
  const idx = cycle.indexOf(n);
  return cycle[(idx + 1) % cycle.length];
}

export function digitalRoot(n: number): number { 
  if (n === 0) return 0; 
  const r = n % 9; 
  return r === 0 ? 9 : r; 
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
  const outward = [1, 2, 4, 8, 7, 5];
  const inward = [5, 7, 8, 4, 2, 1];
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

// === FREQUENCY & COLOR ===
export function a432Frequency(dimension: number, polarity: 1 | -1 = 1): number {
  return A432_FREQUENCY * dimension * polarity;
}

export function a432HSLFromRoot(root: number, polarity: 1 | -1 = 1): {hue: number, saturation: number, lightness: number} {
  const hue = (root * 40 * polarity) % 360;
  return { hue, saturation: 70, lightness: 60 };
}

export function a432RGBFromRoot(root: number, polarity: 1 | -1 = 1): {r: number, g: number, b: number} {
  const hsl = a432HSLFromRoot(root, polarity);
  const hue = hsl.hue / 360;
  const sat = hsl.saturation / 100;
  const light = hsl.lightness / 100;
  
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs((hue * 6) % 2 - 1));
  const m = light - c / 2;
  
  let r = 0, g = 0, b = 0;
  if (hue < 1/6) { r = c; g = x; b = 0; }
  else if (hue < 2/6) { r = x; g = c; b = 0; }
  else if (hue < 3/6) { r = 0; g = c; b = x; }
  else if (hue < 4/6) { r = 0; g = x; b = c; }
  else if (hue < 5/6) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
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