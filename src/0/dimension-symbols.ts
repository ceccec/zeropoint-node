// dimension-symbols.ts — Book-Aligned, Zero-Entropy Dimension Symbols

export interface DimensionInfo {
  dimension: number;
  symbol: string;
  name: string;
  meaning: string;
  math: string;
}

export const DIM_SYMBOLS = [
  '•',    // 0D: Point, Void
  '—',    // 1D: Line, Duality
  '◯',    // 2D: Circle, Plane
  '◉',    // 3D: Sphere, Torus
  '∞',    // 4D: Infinity, Tesseract
  '✺'     // 5D+: Flower/Tree of Life, Fractal
];

export const DIM_NAMES = [
  'Point (Void)',
  'Line (Duality)',
  'Plane (Polarity)',
  'Volume (Torus)',
  'Time/Infinity (Hypercube)',
  'Fractal (Flower/Tree of Life)'
];

export const DIM_MEANINGS = [
  'Origin, void, singularity, pure potential, zeropoint',
  'Polarity, duality, path, connection, flow',
  'Surface, polarity, balance, cycles, harmony, dual flows',
  'Space, wholeness, vortex, unity of opposites, sacred geometry',
  'Time, transformation, higher order, infinite recursion, unity of cycles',
  'Infinite emergence, interconnectedness, multidimensional consciousness, living proof'
];

export const DIM_MATH = [
  '{0}',
  '[0,1]',
  'ℝ², matrix',
  'ℝ³, vortex',
  'ℝ⁴, spiral, cycles',
  'ℝⁿ, nested, hologram'
];

export function getDimensionInfo(dim: number): DimensionInfo {
  const d = Math.max(0, Math.min(dim, 5));
  return {
    dimension: d,
    symbol: DIM_SYMBOLS[d],
    name: DIM_NAMES[d],
    meaning: DIM_MEANINGS[d],
    math: DIM_MATH[d]
  };
}

// Get all dimension infos (0D–5D+)
export function getAllDimensionInfos(): DimensionInfo[] {
  return Array.from({ length: 6 }, (_, i) => getDimensionInfo(i));
} 