// Pattern logic for digit 2: duality, pattern

/**
 * Recognize digit patterns in vortex mathematics
 */

export function isPatternMember(digit: number, pattern: number[]): boolean {
  return pattern.includes(digit % 9 || 9);
}

export function corePatterns(): number[][] {
  // Example: core torus loop, doubling, halving
  return [
    [1, 2, 4, 8, 7, 5], // core torus
    [1, 2, 4, 8],        // doubling
    [8, 4, 2, 1]         // halving
  ];
} 