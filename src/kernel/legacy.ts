/**
 * Legacy adapters — keep existing A432 / VBM callers working.
 * Kernel default: digitalRoot(0)→9 · VORTEX_SEQUENCE.
 * Legacy: digitalRoot(0)→0 · consciousness 03691248751.
 */

import {
  LEGACY_CONSCIOUSNESS_SEQUENCE,
  VORTEX_ORBIT,
  VORTEX_SEQUENCE,
  digitalRoot as kernelDigitalRoot,
} from '../0/index.ts'

/** VBM / older zeropoint: 0 stays 0. */
export function legacyDigitalRoot(n: number): number {
  if (n === 0) return 0
  return kernelDigitalRoot(n)
}

/** a432.math-style base-12 reduction used in some modules (unchanged semantics). */
export function legacyHarmonicRoot12(n: number): number {
  if (n === 0) return 0
  const r = n % 12
  return r === 0 ? 12 : r
}

export function legacyConsciousnessSequence(): readonly number[] {
  return LEGACY_CONSCIOUSNESS_SEQUENCE
}

export function kernelVortexSequence(): readonly number[] {
  return VORTEX_SEQUENCE
}

export function rodinOrbit(): readonly number[] {
  return VORTEX_ORBIT
}

/** Map legacy consciousness index onto kernel vortex digit (same digits, different spine). */
export function mapLegacyDigitToKernel(digit: number): number {
  if (digit === 0) return 9
  return kernelDigitalRoot(digit)
}
