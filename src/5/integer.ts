// Integer result detection for digit 5: center, integer harmony

/**
 * Detect integer results in vortex mathematics (digit system)
 */

export function isIntegerVortex(a: number, b: number): boolean {
  const sum = (a + b) % 9 || 9;
  const vortexB = (a + b) / sum;
  return Number.isInteger(vortexB);
}

export function integerPairs(): Array<{a: number, b: number, vortexA: number, vortexB: number}> {
  const pairs = [];
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const vortexA = (a + b) % 9 || 9;
      const vortexB = (a + b) / vortexA;
      if (Number.isInteger(vortexB)) {
        pairs.push({a, b, vortexA, vortexB});
      }
    }
  }
  return pairs;
} 