/**
 * nextInteraction(n: number, cycle?: number[]):
 *   Returns the next element in the cycle after n, using the default trinity [1,2,3] if no cycle is provided.
 *   Encodes the law: every self-meeting n/n shifts to the next in the cycle, avoiding collision and enabling infinite recursion.
 *   This is the canonical A432 recursion/collision-avoidance law.
 */
export function nextInteraction(n: number, cycle: number[] = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]): number {
  const idx = cycle.indexOf(n);
  return cycle[(idx + 1) % cycle.length];
}

/**
 * a432.ts — Zero Entropy Harmonic Seed
 *
 * This file is dry-harmonized for zero entropy: every constant, formula, and state is defined once and reused everywhere.
 * All knowledge (physical, mathematical, metaphysical) is encoded here as canonical, reusable logic.
 * Negative harmonics -81, -56, -42 are the only teleportation/reality switch states.
 * All modules must import from here for harmonization and zero entropy.
 *
 * A432 and color are the same matrix: all color, frequency, and harmonic states are projections of the same underlying structure.
 */

/**
 * A432_DIGIT_MEANINGS: Canonical metaphysical and mathematical meaning for each digit 1-9.
 * Each entry is an object: { name, description }
 */
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

/**
 * A432_APERTURE: The Primal Point (Zero) — Source and Return of All Emanation
 *
 * In Vortex Based Mathematics and the metaphysics of the Rodin coil, the aperture (zero point) is the origin and return of all digit flows.
 * All emanation (spirit, energy, matter) emerges from and returns to this point, recursively.
 * This function models the two-stage surge pump (implosion/explosion, black hole/white hole) as a digit-based, recursive process.
 *
 * - The Rodin coil sequence (1-2-4-8-7-5) flows outward (explosion/emanation), always returning to 1 (the seed).
 * - The reverse sequence (5-7-8-4-2-1) flows inward (implosion/return), always returning to 0 (the aperture).
 * - 9 is the invisible axis/monopole, the W-axis, the spiritual center.
 *
 * This function can be used to recursively traverse the vortex, modeling spirit emanation and return, using only single digits.
 */
export function a432ApertureFlow(direction: 1 | -1 = 1, start: number = 1, steps: number = 6): number[] {
  // Outward: 1-2-4-8-7-5, Inward: 5-7-8-4-2-1
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

/**
 * a432ApertureSurgePump: Models the two-stage surge pump (implosion/explosion) as a recursive digit process.
 * Returns an object with outward and inward flows, each as a digit sequence.
 */
export function a432ApertureSurgePump(seed: number = 1, steps: number = 6): { outward: number[], inward: number[] } {
  return {
    outward: a432ApertureFlow(1, seed, steps),
    inward: a432ApertureFlow(-1, 5, steps)
  };
}

/**
 * Metaphysical Mapping:
 * - The Rodin coil is the living vortex: outward flow is creation/emanation, inward flow is return/implosion.
 * - Sacred geometry (domes, eyes, black holes) is the projection of this recursive aperture logic.
 * - Spirit emanation is modeled as recursive traversal of the vortex, always returning to the aperture (zero point).
 * - 9 is the invisible axis, the spiritual center, not traversed but always present.
 */

/**
 * a432StreamText: Generate a stream text for a given dimension (1-9) using the digit meaning mapping.
 * Usage: a432StreamText(3) // "Trinity: Synthesis, creation, harmony, flow; the generative principle, the creative process, and the harmonic seed."
 */
export function a432StreamText(dimension: number): string {
  const entry = A432_DIGIT_MEANINGS[dimension];
  if (!entry) return '';
  return `${entry.name}: ${entry.description}`;
}

// --- Canonical Physical Constants ---
export const H = 6.62607015e-34; // Planck constant h (J·s)
export const PI = Math.PI;
export const C = 299792458; // Speed of light c (m/s)
export const G = 6.67430e-11; // Gravitational constant G (m^3 kg^-1 s^-2)
export const K_B = 1.380649e-23; // Boltzmann constant k_B (J/K)
export const E = 1.602176634e-19; // Elementary charge e (C)
export const M_E = 9.1093837015e-31; // Electron mass m_e (kg)
export const M_P = 1.67262192369e-27; // Proton mass m_p (kg)
export const M_N = 1.67492749804e-27; // Neutron mass m_n (kg)
export const EPSILON_0 = 8.854187817e-12; // Vacuum permittivity ε₀ (F/m)

// --- Canonical Formula Functions ---
export const HBAR = H / (2 * PI); // Reduced Planck constant ħ = h / 2π
export function planckLength(): number { return Math.sqrt(HBAR * G / Math.pow(C, 3)); }
export function planckTime(): number { return planckLength() / C; }
export function planckMass(): number { return Math.sqrt(HBAR * C / G); }
export function planckCharge(): number { return Math.sqrt(4 * PI * EPSILON_0 * HBAR * C); }
export function planckTemperature(): number { return planckMass() * C * C / K_B; }
export function fineStructureConstant(): number { return (E * E) / (4 * PI * EPSILON_0 * HBAR * C); }

// --- Canonical Harmonic/Vortex Constants ---
export const A432_FREQUENCY = 432;
import { RODIN_SEQUENCE, rodinVortexCycle, rodinPosition, rodinCoilPattern } from './a432.rodin.coil';
export { rodinVortexCycle, rodinPosition, rodinCoilPattern };
export const RODIN_VORTEX_SEQUENCE = RODIN_SEQUENCE;
export const TELEPORTATION_STATES = [-81, -56, -42]; // Only reality switch/teleportation states

/**
 * A432_SEQUENCE is the infinite harmonic flow and the generative/return cycle of the system.
 * 124 8 751 is the core Rodin vortex pattern: [1, 2, 4, 8, 7, 5, 1]
 */
export const A432_SEQUENCE = [0, [3, 6, 9], [1, 2, 4], 8, [7, 5, 1]]; // Void 0 -> 9 -> 7 -> 8 -> 4
export const A432_TRINITY = [0, 9, 1];
export const A432_ANGLE = 360 / 3; // 120 degrees dimensional gateways angle

/**
 * Polarity Flows in Rodin/Trinity Logic
 *
 * Polarity (+1 or -1) determines the direction of flow through the Rodin vortex, trinity, and all harmonic sequences.
 * - Forward polarity (+1): generative, harmonic, creation flow (e.g., 1→2→4→8→7→5→1)
 * - Reverse polarity (-1): anti-harmonic, phase-reversal, dissolution flow (e.g., 1→5→7→8→4→2→1)
 * All core functions should support polarity-aware traversal for full metaphysical and mathematical harmonization.
 *
 * Usage Example:
 *   rodinVortexCycle(2, +1) // [1,2,4,8,7,5,1,2,4,8,7,5,1]
 *   rodinVortexCycle(2, -1) // [1,5,7,8,4,2,1,5,7,8,4,2,1]
 *   a432Frequency(3, +1) // forward frequency
 *   a432Frequency(3, -1) // reverse frequency
 */

/**
 * a432Frequency: Get the A432-based frequency for a given dimension and polarity.
 * @param dimension - The dimension (1-9)
 * @param polarity - +1 (forward, default), -1 (reverse)
 * @returns The frequency in the specified polarity
 */
export function a432Frequency(dimension: number, polarity: 1 | -1 = 1): number {
  const seq = polarity === 1 ? RODIN_SEQUENCE : [...RODIN_SEQUENCE].reverse();
  const idx = dimension % seq.length;
  return seq[idx] * A432_FREQUENCY;
}

// --- Canonical Utility Functions ---
export function digitalRoot(n: number): number { if (n === 0) return 0; const r = n % 9; return r === 0 ? 9 : r; }
export function getNameDimension(name: string): number { const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0); return (sum % 9) + 1; }

// --- Canonical Mappings ---
export const A432_SPACE = {
  PLANCK_LENGTH: planckLength(),
  PLANCK_TIME: planckTime(),
  PLANCK_MASS: planckMass(),
  PLANCK_CHARGE: planckCharge(),
  PLANCK_TEMPERATURE: planckTemperature(),
  SPEED_OF_LIGHT: C,
  GRAVITATIONAL_CONSTANT: G,
  PLANCK_CONSTANT: H
};
export const A432_QUANTUM = {
  PLANCK_CONSTANT: H,
  REDUCED_PLANCK_CONSTANT: HBAR,
  BOLTZMANN_CONSTANT: K_B,
  ELECTRON_CHARGE: E,
  ELECTRON_MASS: M_E,
  PROTON_MASS: M_P,
  NEUTRON_MASS: M_N,
  FINE_STRUCTURE_CONSTANT: fineStructureConstant()
};

// --- Canonical Scientific Math ---
export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // φ = (1 + sqrt(5)) / 2
export const EULER_NUMBER = Math.E; // e
export const LN2 = Math.LN2; // ln(2)
export const LN10 = Math.LN10; // ln(10)
export const LOG2E = Math.LOG2E; // log2(e)
export const LOG10E = Math.LOG10E; // log10(e)
export const SQRT2 = Math.SQRT2; // sqrt(2)
export const SQRT1_2 = Math.SQRT1_2; // 1/sqrt(2)

// Trigonometric functions (radians)
export function sin(x: number, polarity: 1 | -1 = 1): number { return Math.sin(polarity * x); }
export function cos(x: number, polarity: 1 | -1 = 1): number { return Math.cos(polarity * x); }
export function tan(x: number, polarity: 1 | -1 = 1): number { return Math.tan(polarity * x); }
export function asin(x: number, polarity: 1 | -1 = 1): number { return polarity * Math.asin(x); }
export function acos(x: number, polarity: 1 | -1 = 1): number { return polarity * Math.acos(x); }
export function atan(x: number, polarity: 1 | -1 = 1): number { return polarity * Math.atan(x); }

// Degree/radian conversions
export function toRadians(degrees: number): number { return degrees * (PI / 180); }
export function toDegrees(radians: number): number { return radians * (180 / PI); }

// Logarithms
export function ln(x: number): number { return Math.log(x); }
export function log10(x: number): number { return Math.log10(x); }
export function log2(x: number): number { return Math.log2(x); }

// Exponentials and powers
export function exp(x: number): number { return Math.exp(x); }
export function pow(x: number, y: number): number { return Math.pow(x, y); }

// Absolute value and sign
export function abs(x: number): number { return Math.abs(x); }
export function sign(x: number): number { return Math.sign(x); }

// --- End Canonical Scientific Math ---

/**
 * 4, 3, 2 is the trinity itself—the generative seed of all harmonic, color, and consciousness logic in the A432 matrix.
 */
export const TRINITY = [4, 3, 2];

/**
 * All color, stream, and trinity product functions now support polarity-aware traversal (+1 or -1).
 * This enables forward (harmonic) and reverse (anti-harmonic) flows for full metaphysical and mathematical harmonization.
 *
 * Usage Example:
 *   a432HSLFromRoot(3, +1) // forward color
 *   a432HSLFromRoot(3, -1) // reverse color
 *   a432TrinityProduct(+1) // forward trinity product
 *   a432TrinityProduct(-1) // reverse trinity product
 */
export function a432TrinityProduct(polarity: 1 | -1 = 1): number {
  const trinity = polarity === 1 ? TRINITY : [...TRINITY].reverse();
  return trinity.reduce((a, b) => a * b, 1);
}

export function a432Seed(polarity: 1 | -1 = 1): number {
  // 4 * 3 * 2 * 18 = 432 (forward), reversed trinity same product
  return a432TrinityProduct(polarity) * 18;
}

// --- Canonical Color Generation (A432 = Color Matrix) ---
// Map digital root/harmonic to HSL color (using integer/fractional logic)
/**
 * Polarity and Angle/Phase Shift Principle (Merkaba Law)
 *
 * Every time polarity switches (+1 ↔ -1), there is an associated angle/phase shift of π (180°), as in the Merkaba.
 * - In color: polarity flips the hue wheel (hue = polarity * base + (polarity === -1 ? 180 : 0)).
 * - In trigonometric/rotational logic: angle becomes polarity * θ (or θ + π for a full phase flip).
 * - In Mobius, torus, Merkaba: polarity switch is a topological twist or inversion (π phase shift).
 *
 * Usage Example:
 *   a432HSLFromRoot(3, +1) // forward color (hue = 80)
 *   a432HSLFromRoot(3, -1) // reverse color (hue = 280)
 *   sin(PI/2, +1) // 1
 *   sin(PI/2, -1) // -1
 *   merkabaAngle(PI/3, +1) // PI/3
 *   merkabaAngle(PI/3, -1) // -PI/3 or PI/3 + PI
 */
export function a432HSLFromRoot(root: number, polarity: 1 | -1 = 1): {hue: number, saturation: number, lightness: number} {
  // 1-9 digital root mapped to 0-320 hue in steps of 40, polarity reverses order and adds π (180°) phase shift
  const index = polarity === 1 ? root - 1 : 9 - root;
  let hue = index * 40;
  if (polarity === -1) hue = (hue + 180) % 360;
  return { hue, saturation: 1, lightness: 1/2 };
}

// Map digital root/harmonic to RGB color (integer math)
export function a432RGBFromRoot(root: number, polarity: 1 | -1 = 1): {r: number, g: number, b: number} {
  const {hue, saturation, lightness} = a432HSLFromRoot(root, polarity);
  // HSL to RGB conversion (integer math, 0-255)
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - c/2;
  let r1 = 0, g1 = 0, b1 = 0;
  if (hue < 60) { r1 = c; g1 = x; b1 = 0; }
  else if (hue < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (hue < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (hue < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (hue < 300) { r1 = x; g1 = 0; b1 = c; }
  else { r1 = c; g1 = 0; b1 = x; }
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  };
}

// Canonical color mapping for all A432 harmonics (digital roots 1-9)
export function a432ColorMatrix(polarity: 1 | -1 = 1): Array<{root: number, hsl: {hue: number, saturation: number, lightness: number}, rgb: {r: number, g: number, b: number}}>
{
  const matrix = [];
  const roots = polarity === 1 ? [...Array(9).keys()].map(i => i + 1) : [...Array(9).keys()].map(i => 9 - i);
  for (const root of roots) {
    matrix.push({
      root,
      hsl: a432HSLFromRoot(root, polarity),
      rgb: a432RGBFromRoot(root, polarity)
    });
  }
  return matrix;
}
// --- End Canonical Color Generation ---

/**
 * Rodin Vortex Sequence (1248751): Mathematical and Metaphysical Significance
 *
 * - This sequence is the infinite harmonic flow: [1, 2, 4, 8, 7, 5, 1] (repeats endlessly)
 * - Encodes both the generative (1→2→4→8) and return (8→7→5→1) cycles in the vortex
 * - Basis for all harmonic, color, and consciousness logic in the A432 matrix
 * - Digital root cycling: (2×1=2, 2×2=4, 2×4=8, 2×8=16→7, 2×7=14→5, 2×5=10→1, ...)
 * - Used in code for:
 *   - Harmonic generation: a432Frequency(dimension) uses RODIN_VORTEX_SEQUENCE
 *   - Color mapping: a432ColorMatrix() projects roots to color
 *   - State transitions: rodinVortexCycle(n) generates n cycles of the vortex
 *
 * Example:
 *   rodinVortexCycle(2) // [1,2,4,8,7,5,1,1,2,4,8,7,5,1]
 *   a432Frequency(3) // 8 × 432 = 3456
 *   a432HSLFromRoot(4) // {hue: 120, saturation: 1, lightness: 0.5}
 */

/**
 * All stream and generator logic now supports polarity-aware traversal (+1 or -1).
 * This enables forward (harmonic) and reverse (anti-harmonic) flows for all infinite streams and Mobius-Rodin-Tesla systems.
 *
 * Usage Example:
 *   const stream = a432DimensionStreams[0];
 *   const gen = stream.generator(+1); // forward
 *   const genRev = stream.generator(-1); // reverse
 *   gen.next().value // first value in the stream
 */

export const a432DimensionStreams = Array.from({ length: 9 }, (_, i) => {
  const dimension = i + 1;
  const frequency = a432Frequency(dimension);
  const hsl = a432HSLFromRoot(dimension);
  const rgb = a432RGBFromRoot(dimension);
  const consciousness = digitalRoot(frequency);
  function* generator(polarity: 1 | -1 = 1) {
    let n = 0;
    while (true) {
      // Infinite stream: cycle through the Rodin vortex sequence for this dimension and polarity
      yield a432Frequency(((dimension + (polarity * n) + 8) % 9) + 1, polarity);
      n++;
    }
  }
  return { dimension, frequency, color: { hsl, rgb }, consciousness, generator };
});

/**
 * a432AntiVortexStream: Canonical anti-vortex (anti-harmonic, phase-reversal) stream generator.
 *
 * - Returns a generator yielding the anti-vortex (reverse polarity, -1) sequence for a given dimension (1-9).
 * - All values are derived from integer/fractional logic, never hardcoded decimals.
 * - This is the living, recursive anti-vortex stream: negative harmonics, phase reversals, vortex inversions.
 * - Use for anti-vortex visualization, sonification, and metaphysical mapping.
 *
 * Metaphysical Principle:
 *   - The anti-vortex is the phase-inverted, counter-rotating, or negative harmonic stream.
 *   - It is essential for expressing duality, reversibility, and the analog/infinite nature of the living matrix.
 *   - Anti-vortex flows are gateways to transformation, teleportation, and reality switching.
 *
 * Usage:
 *   const gen = a432AntiVortexStream(3); // generator for dimension 3 (Trinity)
 *   gen.next().value // first anti-vortex frequency
 *   [...Array(6)].map(() => gen.next().value) // first 6 anti-vortex steps
 */
export function* a432AntiVortexStream(dimension: number) {
  let n = 0;
  while (true) {
    // Use polarity -1 for anti-vortex (reverse) flow
    yield a432Frequency(((dimension + (-1 * n) + 8) % 9) + 1, -1);
    n++;
  }
}

/**
 * a432MultiAntiVortexStream: Yields anti-vortex streams for any array or range of dimensions (1–9).
 * - Returns a generator yielding { dimension, frequency, step } for each dimension in the input array, cycling anti-vortex flows in parallel.
 * - All values are integer/fractional, using polarity -1.
 *
 * Usage:
 *   const gen = a432MultiAntiVortexStream([1,2,3,4,5,6,7,8,9]);
 *   gen.next().value // { dimension, frequency, step }
 *   [...Array(9)].map(() => gen.next().value) // first 9 steps for all dimensions
 */
export function* a432MultiAntiVortexStream(dimensions: number[]) {
  const gens = dimensions.map(d => a432AntiVortexStream(d));
  let step = 0;
  while (true) {
    const result = dimensions.map((dimension, i) => {
      const { value: frequency } = gens[i].next();
      return { dimension, frequency, step: step + 1 };
    });
    yield result;
    step++;
  }
}

/**
 * a432AntiVortexMapping: Canonical metaphysical mapping for anti-vortex flows.
 *
 * - Each anti-vortex state is mapped as a living stream: meaning, color, sound, and transformation logic.
 * - Use this mapping for visualization, sonification, and recursive metaphysical exploration.
 */
export const a432AntiVortexMapping = Array.from({ length: 9 }, (_, i) => {
  const dimension = i + 1;
  const frequency = a432Frequency(dimension, -1);
  const hsl = a432HSLFromRoot(dimension, -1);
  const rgb = a432RGBFromRoot(dimension, -1);
  const consciousness = digitalRoot(frequency);
  const meaning = A432_DIGIT_MEANINGS[dimension]?.description || '';
  return {
    dimension,
    frequency,
    color: { hsl, rgb },
    consciousness,
    meaning,
    stream: a432AntiVortexStream(dimension)
  };
});

// --- Mobius-Rodin-Tesla System (harmonized, canonical) ---
export interface A432MobiusRodinTeslaState {
  name: string;
  frequency: number;
  consciousness: number;
  harmony: number;
  integration: number;
  evolution: number;
  proof: string;
  mobiusSystem: A432MobiusRodinTeslaMobiusSystem;
  rodinSystem: A432MobiusRodinTeslaRodinSystem;
  teslaSystem: A432MobiusRodinTeslaTeslaSystem;
  harmonic: A432MobiusRodinTeslaHarmonicSystem;
}
export interface A432MobiusRodinTeslaMobiusSystem { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; mobiusStrips: A432MobiusRodinTeslaMobiusStrip[]; }
export interface A432MobiusRodinTeslaMobiusStrip { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; twist: number; }
export interface A432MobiusRodinTeslaRodinSystem { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; coils: A432MobiusRodinTeslaRodinCoil[]; }
export interface A432MobiusRodinTeslaRodinCoil { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; turns: number; }
export interface A432MobiusRodinTeslaTeslaSystem { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; coils: A432MobiusRodinTeslaTeslaCoil[]; }
export interface A432MobiusRodinTeslaTeslaCoil { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; voltage: number; }
export interface A432MobiusRodinTeslaHarmonicSystem { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; waves: A432MobiusRodinTeslaWave[]; cycles: A432MobiusRodinTeslaCycle[]; }
export interface A432MobiusRodinTeslaWave { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; amplitude: number; }
export interface A432MobiusRodinTeslaCycle { name: string; frequency: number; consciousness: number; harmony: number; integration: number; evolution: number; type: string; proof: string; period: number; }

export const A432_Mobius_Rodin_Tesla_System = {
  createState(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaState {
    const dimension = getNameDimension(name);
    const frequency = a432Frequency(dimension, polarity);
    const consciousness = digitalRoot(frequency);
    const harmony = frequency * consciousness;
    const integration = consciousness * 9;
    const evolution = consciousness * 9;
    const mobiusSystem = this.createMobiusSystem(name, polarity);
    const rodinSystem = this.createRodinSystem(name, polarity);
    const teslaSystem = this.createTeslaSystem(name, polarity);
    const harmonic = this.createHarmonicSystem(name, polarity);
    return { name, frequency, consciousness, harmony, integration, evolution, proof: 'Mobius Rodin Tesla state harmonized by A432 core', mobiusSystem, rodinSystem, teslaSystem, harmonic };
  },
  createMobiusSystem(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaMobiusSystem {
    const dimension = getNameDimension(name + 'Mobius');
    const frequency = a432Frequency(dimension, polarity);
    const consciousness = digitalRoot(frequency);
    return { name: name + 'MobiusSystem', frequency, consciousness, harmony: frequency * consciousness, integration: consciousness * 9, evolution: consciousness * 9, type: 'MOBIUS', proof: 'Mobius Rodin Tesla mobius system', mobiusStrips: this.generateMobiusStrips(name, polarity) };
  },
  generateMobiusStrips(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaMobiusStrip[] {
    return [0,1].map(i => { const dim = getNameDimension(name + 'MobiusStrip' + i); const freq = a432Frequency(dim, polarity); return { name: name + 'MobiusStrip' + i, frequency: freq, consciousness: digitalRoot(freq), harmony: 1, integration: 1, evolution: 1, type: 'MOBIUS', proof: 'Mobius Rodin Tesla mobius strip', twist: i + 1 }; });
  },
  createRodinSystem(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaRodinSystem {
    const dimension = getNameDimension(name + 'Rodin');
    const frequency = a432Frequency(dimension, polarity);
    const consciousness = digitalRoot(frequency);
    return { name: name + 'RodinSystem', frequency, consciousness, harmony: frequency * consciousness, integration: consciousness * 9, evolution: consciousness * 9, type: 'RODIN', proof: 'Mobius Rodin Tesla rodin system', coils: this.generateRodinCoils(name, polarity) };
  },
  generateRodinCoils(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaRodinCoil[] {
    return [0,1].map(i => { const dim = getNameDimension(name + 'RodinCoil' + i); const freq = a432Frequency(dim, polarity); return { name: name + 'RodinCoil' + i, frequency: freq, consciousness: digitalRoot(freq), harmony: 1, integration: 1, evolution: 1, type: 'RODIN', proof: 'Mobius Rodin Tesla rodin coil', turns: (i + 1) * 12 }; });
  },
  createTeslaSystem(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaTeslaSystem {
    const dimension = getNameDimension(name + 'Tesla');
    const frequency = a432Frequency(dimension, polarity);
    const consciousness = digitalRoot(frequency);
    return { name: name + 'TeslaSystem', frequency, consciousness, harmony: frequency * consciousness, integration: consciousness * 9, evolution: consciousness * 9, type: 'TESLA', proof: 'Mobius Rodin Tesla tesla system', coils: this.generateTeslaCoils(name, polarity) };
  },
  generateTeslaCoils(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaTeslaCoil[] {
    return [0,1].map(i => { const dim = getNameDimension(name + 'TeslaCoil' + i); const freq = a432Frequency(dim, polarity); return { name: name + 'TeslaCoil' + i, frequency: freq, consciousness: digitalRoot(freq), harmony: 1, integration: 1, evolution: 1, type: 'TESLA', proof: 'Mobius Rodin Tesla tesla coil', voltage: (i + 1) * 1000 }; });
  },
  createHarmonicSystem(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaHarmonicSystem {
    const dimension = getNameDimension(name + 'Harmonic');
    const frequency = a432Frequency(dimension, polarity);
    const consciousness = digitalRoot(frequency);
    return { name: name + 'HarmonicSystem', frequency, consciousness, harmony: frequency * consciousness, integration: consciousness * 9, evolution: consciousness * 9, type: 'HARMONIC', proof: 'Mobius Rodin Tesla harmonic system', waves: this.generateWaves(name, polarity), cycles: this.generateCycles(name, polarity) };
  },
  generateWaves(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaWave[] {
    return [0,1].map(i => { const dim = getNameDimension(name + 'Wave' + i); const freq = a432Frequency(dim, polarity); return { name: name + 'Wave' + i, frequency: freq, consciousness: digitalRoot(freq), harmony: 1, integration: 1, evolution: 1, type: 'HARMONIC', proof: 'Mobius Rodin Tesla wave', amplitude: (i + 1) * 10 }; });
  },
  generateCycles(name: string, polarity: 1 | -1 = 1): A432MobiusRodinTeslaCycle[] {
    return [0,1].map(i => { const dim = getNameDimension(name + 'Cycle' + i); const freq = a432Frequency(dim, polarity); return { name: name + 'Cycle' + i, frequency: freq, consciousness: digitalRoot(freq), harmony: 1, integration: 1, evolution: 1, type: 'HARMONIC', proof: 'Mobius Rodin Tesla cycle', period: (i + 1) * 60 }; });
  }
};

/**
 * shiftConsciousness120: Canonical +120° (2π/3) shift for trinity/vortex/consciousness progression.
 *
 * Use this for trinity/vortex/consciousness state progression (not for polarity/phase reversal).
 * - Each call advances the angle/state by +60° (2π/6 radians).
 * - For 3-fold cycles: 0 → 60° → 120° → 180° → 240° → 300° → 0° ...
 *
 * Usage:
 *   let angle = 60;
 *   angle = shiftConsciousness(angle); // 60°
 */
export function shiftConsciousness(angle: number): number {
  return (angle + (2 * Math.PI / 6)) % (2 * Math.PI);
}

/**
 * colorPhotonDotParticleState: Encodes the principle that color, photon, dot, and particle are unified as a state in the A432 system.
 *
 * Given an angle (0 to 2π) or trinity step (0, 1, 2), returns:
 *   - color: HSL (projected from angle)
 *   - photonEnergy: E = hν (frequency from angle mapped to A432)
 *   - dot: the discrete particle state (index or label)
 *
 * Metaphysical Principle:
 *   - Every color is a photon, every photon is a dot, every dot is a particle, every particle is a state in the living matrix.
 *   - The observer harmonizes wave (color, angle, flow) and particle (dot, event, realization) as one.
 *
 * Usage:
 *   colorPhotonDotParticleState(0) // { color: ..., photonEnergy: ..., dot: ... }
 *   colorPhotonDotParticleState(shiftConsciousness120(0)) // next trinity state
 */
export function colorPhotonDotParticleState(angle: number): {
  color: { hue: number, saturation: number, lightness: number },
  photonEnergy: number,
  dot: number
} {
  // Map angle (0 to 2π) to trinity step (0, 1, 2)
  const step = Math.round((angle / (2 * Math.PI)) * 3) % 3;
  // Map to digital root (1, 2, 3)
  const root = [4, 3, 2][step];
  // Color from angle
  const hue = (angle * 180 / Math.PI) % 360;
  const color = { hue, saturation: 1, lightness: 0.5 };
  // Frequency: map angle to A432 frequency (e.g., 432, 864, 1296)
  const frequency = A432_FREQUENCY * [1, 2, 3][step];
  // Photon energy: E = hν
  const photonEnergy = H * frequency;
  // Dot: the discrete state (step index)
  const dot = step;
  return { color, photonEnergy, dot };
}

/**
 * visualizeA432Journey: Returns an array of steps representing the mathematical/recursive journey through the A432_SEQUENCE.
 * Each step includes: index, value, type (void, axis, trinity, fold, return), and a description.
 * The function recursively unfolds/folds the sequence, showing the journey 0 → 9 → 7 → 8 → 4 and back to the seed.
 */
export function visualizeA432Journey(steps: number = 12): Array<{index: number, value: number|string|number[], type: string, description: string}> {
  const sequence = [0, [3,6,9], [1,2,4], 8, [7,5,1]];
  const types = ['void', 'axis', 'trinity', 'fold', 'return'];
  const flat = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
  const journey: Array<{index: number, value: number|string|number[], type: string, description: string}> = [];
  let idx = 0;
  function recurse(seq: any[], depth: number) {
    for (let i = 0; i < seq.length; i++) {
      const val = seq[i];
      const type = types[i] || 'unknown';
      if (Array.isArray(val)) {
        recurse(val, depth + 1);
      } else {
        let description = '';
        if (val === 0) description = 'Void: origin, unmanifest';
        else if (val === 8) description = 'Fold: infinity, Mobius, recursion';
        else if ([3,6,9].includes(val)) description = 'Axis: Tesla trinity, field';
        else if ([1,2,4].includes(val)) description = 'Trinity: generative, creation';
        else if ([7,5,1].includes(val)) description = 'Return: completion, return path';
        else description = 'State';
        journey.push({index: idx++, value: val, type, description});
      }
    }
  }
  recurse(sequence, 0);
  // Optionally, show the fold/journey path: 0 → 9 → 7 → 8 → 4
  journey.push({index: idx++, value: [0,9,7,8,4], type: 'fold-journey', description: 'Folded journey: Void → Axis → Return → Fold → Trinity'});
  return journey.slice(0, steps);
}

/**
 * getA432ShiftPoints: Returns an array of steps in the A432_SEQUENCE where a 120° shift occurs.
 * Each step includes: index, value, type (void, axis, trinity, fold, return, shift), angle (in degrees), and a description.
 * Every transition between major groups is a +120° shift, cycling angle by 120° each time.
 */
export function getA432ShiftPoints(): Array<{index: number, value: number|string|number[], type: string, angle: number, description: string}> {
  const sequence = [0, [3,6,9], [1,2,4], 8, [7,5,1]];
  const types = ['void', 'axis', 'trinity', 'fold', 'return'];
  const shiftPoints: Array<{index: number, value: number|string|number[], type: string, angle: number, description: string}> = [];
  let idx = 0;
  let angle = 0;
  for (let i = 0; i < sequence.length; i++) {
    const val = sequence[i];
    const type = types[i] || 'unknown';
    let description = '';
    if (type === 'void') description = 'Void: origin, unmanifest';
    else if (type === 'axis') description = 'Axis: Tesla trinity, field (120° shift)';
    else if (type === 'trinity') description = 'Trinity: generative, creation (120° shift)';
    else if (type === 'fold') description = 'Fold: infinity, Mobius, recursion (120° shift)';
    else if (type === 'return') description = 'Return: completion, return path (120° shift)';
    else description = 'State';
    shiftPoints.push({index: idx++, value: val, type, angle, description});
    if (i < sequence.length - 1) angle = (angle + 120) % 360;
  }
  return shiftPoints;
}

/**
 * Canonical vortex shift: each vortex changes angle by 60° to avoid collision and maintain stability.
 * Trinity total: 3 axes × 2 polarities × 60° = 360° (full cycle)
 */
export const A432_VORTEX_SHIFT_DEGREES = 60;
export const A432_TRINITY_TOTAL_DEGREES = 3 * 2 * A432_VORTEX_SHIFT_DEGREES; // 360

/**
 * Returns the shifted angle for a given vortex step (modulo 360).
 * @param index Step in the sequence (integer)
 * @returns Angle in degrees (0–359)
 */
export function getA432VortexAngle(index: number): number {
  return (index * A432_VORTEX_SHIFT_DEGREES) % 360;
}

/**
 * getA432PaletteStates: Flattens A432_SEQUENCE to a list of unique numbers (including 0) in order.
 * Returns: Array<{ root: number, angle: number, hsl: {hue: number, saturation: number, lightness: number} }>
 * Angle is assigned as (A432_ANGLE * 360) * i for each state, where A432_ANGLE is the canonical increment (1/3 of a circle).
 */
export function getA432PaletteStates(polarity: 1 | -1 = 1): Array<{root: number, angle: number, hsl: {hue: number, saturation: number, lightness: number}} > {
  // Flatten A432_SEQUENCE to unique numbers in order
  function flatten(seq: any[]): number[] {
    const out: number[] = [];
    for (const v of seq) {
      if (Array.isArray(v)) out.push(...flatten(v));
      else out.push(v);
    }
    return out;
  }
  const roots = Array.from(new Set(flatten(A432_SEQUENCE)));
  return roots.map((root, i) => ({
    root,
    angle: (A432_ANGLE * 360) * i,
    hsl: a432HSLFromRoot(root, polarity)
  }));
}

/**
 * generateA432ColorPalette: Returns an array of HSL color objects for each 120° shift in the A432 sequence.
 */
export function generateA432ColorPalette(): Array<{angle: number, color: {hue: number, saturation: number, lightness: number}} > {
  return getA432ShiftPoints().map(({angle}, i) => {
    // Map angle to HSL color (hue = angle)
    return {
      angle,
      color: { hue: angle, saturation: 1, lightness: 0.5 }
    };
  });
}

/**
 * generateA432SoundSequence: Returns an array of frequencies (Hz) for each 120° shift, using A432_FREQUENCY and digital root mapping.
 */
export function generateA432SoundSequence(): Array<{angle: number, frequency: number}> {
  return getA432ShiftPoints().map(({angle, value}) => {
    // Use digital root of value (if number) to modulate frequency
    const root = typeof value === 'number' ? digitalRoot(value) : 1;
    return {
      angle,
      frequency: A432_FREQUENCY * root
    };
  });
}

/**
 * generateA432AnimationFrames: Returns an array of frame objects, each with angle, color, and frequency, for each 120° shift.
 */
export function generateA432AnimationFrames(): Array<{frame: number, angle: number, color: {hue: number, saturation: number, lightness: number}, frequency: number}> {
  return getA432ShiftPoints().map(({index, angle, value}) => {
    const root = typeof value === 'number' ? digitalRoot(value) : 1;
    return {
      frame: index,
      angle,
      color: { hue: angle, saturation: 1, lightness: 0.5 },
      frequency: A432_FREQUENCY * root
    };
  });
} 

// --- Harmonized Modules ---
export * from './a432.trinity';
export * from './a432.family';
export * from './a432.nine';
export * from './a432.cascade';
export * from './a432.double';
export * from './a432.mirror';
export * from './a432.shear';
export * from './a432.coil';
export * from './a432.shear.electron'; 