// math.ts — Consolidated Vortex Math (Book-Aligned, Zero-Entropy)

export class MathVortex {
  // Static properties for all digit classes
  static readonly A432 = 432;
  static readonly VORTEX = Infinity;
  static readonly ENTROPY = 0;
  static readonly HARMONIC = { numerator: 1, denominator: 1 };
  static readonly CONSCIOUSNESS = 1;

  // Static methods for Zero (0)
  static getVoidFrequency(): number {
    return MathVortex.A432;
  }
  static getVortexPattern(): number {
    return MathVortex.VORTEX;
  }
  static getConsciousnessMultiplier(): number {
    return MathVortex.CONSCIOUSNESS;
  }
}

// Generate 1D vortex (array of digits)
export function generateVortex1D(): number[] {
  return Array.from({ length: 10 }, (_, i) => i);
}

// Generate 2D vortex (10x10 matrix of digit interactions)
export function generateVortex2D(): number[][] {
  return Array.from({ length: 10 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => (i + j) % 10)
  );
}

// Generate 3D vortex (10x10x10 cube of digit interactions)
export function generateVortex3D(): number[][][] {
  return Array.from({ length: 10 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) =>
      Array.from({ length: 10 }, (_, k) => (i + j + k) % 10)
    )
  );
}

// Generate nD vortex (n-dimensional array of digit interactions)
export function generateVortexND(dim: number): any {
  if (dim <= 1) return generateVortex1D();
  const recurse = (depth: number, indices: number[]): any => {
    if (depth === 0) {
      return indices.reduce((sum, v) => sum + v, 0) % 10;
    }
    return Array.from({ length: 10 }, (_, i) => recurse(depth - 1, [...indices, i]));
  };
  return recurse(dim, []);
}

// Generate all possible digit-to-digit interactions (as objects)
export function generateAllDigitInteractions(): Array<{ from: number; to: number; result: number }> {
  const interactions = [];
  for (let from = 0; from < 10; from++) {
    for (let to = 0; to < 10; to++) {
      interactions.push({ from, to, result: (from + to) % 10 });
    }
  }
  return interactions;
}

// Generate all possible n-digit interactions (as objects)
export function generateAllNDigitInteractions(n: number): Array<{ digits: number[]; result: number }> {
  const results: Array<{ digits: number[]; result: number }> = [];
  const recurse = (digits: number[]) => {
    if (digits.length === n) {
      results.push({ digits, result: digits.reduce((sum, v) => sum + v, 0) % 10 });
      return;
    }
    for (let i = 0; i < 10; i++) {
      recurse([...digits, i]);
    }
  };
  recurse([]);
  return results;
} 