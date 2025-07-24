/**
 * a432.vbm.math.ts — Consolidated mathematics distilled from the Rodin VBM book
 * ---------------------------------------------------------------------------------
 * Pure, hard-coded math (no textual references) derived from the sequences, formulas
 * and ratios repeatedly cited in the Vortex Based Mathematics material.
 * Everything remains integer-based and re-uses helpers from a432.math where possible.
 */

import {
  TRINITY_AXIS,
  RODIN_SEQUENCE,
  kineticShockWaveOfNine,
  fibonacciRoots,
  primeSquaredRoots,
  angleForDigit,
  digitalRoot,
} from './a432.math';

// ——————————————————————————————————————————
// 1. Trinity axis and doubling circuit (already canonical)
// ---------------------------------------------------------
export const VBM_TRINITY = [...TRINITY_AXIS] as const;               // 3-6-9
export const VBM_DOUBLING = [...RODIN_SEQUENCE.slice(0, 6)] as const; // 1-2-4-8-7-5

// ——————————————————————————————————————————
// 2. Shock-wave of nine (3-6-9 repeating)
// ---------------------------------------------------------
export const VBM_SHOCK_WAVE = (length: number): number[] => kineticShockWaveOfNine(length);

// ——————————————————————————————————————————
// 3. Powers of two mod-9 helper (length n)
// ---------------------------------------------------------
export function powersOfTwoMod9(n: number): number[] {
  const seq: number[] = [];
  let x = 1;
  for (let i = 0; i < n; i++) {
    seq.push(x);
    x = (2 * x) % 9;
    if (x === 0) x = 9;
  }
  return seq;
}

// ——————————————————————————————————————————
// 4. Fibonacci & prime-square digital-root helpers (imported)
// ---------------------------------------------------------
export { fibonacciRoots as VBM_FIBONACCI_ROOTS } from './a432.math';
export { primeSquaredRoots as VBM_PRIME_SQR_ROOTS } from './a432.math';

// ——————————————————————————————————————————
// 5. Pyramid number map sequence (chapter on Great Pyramid)
//    14 7 21 49 28 42 35  … repeats symmetrical pattern
// ---------------------------------------------------------
export const VBM_PYRAMID_SEQ = [14, 7, 21, 49, 28, 42, 35] as const;
export function pyramidSeqDigitalRoots(): number[] {
  return VBM_PYRAMID_SEQ.map(digitalRoot);
}

// ——————————————————————————————————————————
// 6. Tesla 3-6-9 frequency cycle references (integer Hz)
// ---------------------------------------------------------
export const VBM_TESLA_FREQUENCIES = [396, 693, 396] as const; // loop 3-6-9 harmonic

// ——————————————————————————————————————————
// 7. Utility: map a numeric sequence to torus angles (60° base)
// ---------------------------------------------------------
export function sequenceToAngles(seq: readonly number[]): number[] {
  return seq.map(angleForDigit);
}

// ——————————————————————————————————————————
// 8. Utility: verify “sum to 9” property
// ---------------------------------------------------------
export function sumsToNine(seq: readonly number[]): boolean {
  const sum = seq.reduce((a, b) => a + b, 0);
  return digitalRoot(sum) === 9;
} 