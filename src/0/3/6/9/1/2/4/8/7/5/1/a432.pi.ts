/**
 * a432.pi.ts
 *
 * Default π-based stream source pattern for the A432 system.
 * All color, audio, video, and Mobius streams originate from π-based harmonic flows.
 *
 * Metaphysical Principle: All streams are born from the infinite circle. Pi is the source, the pattern, the flow—every color, every sound, every twist, every dimension is a resonance of π.
 */
import { A432_FREQUENCY as A432, digitalRoot, rodinVortexCycle, a432HSLFromRoot, a432TrinityProduct } from './a432';

export const PI = Math.PI;

/**
 * Generate a pi-based numeric stream: [π, 2π, 3π, ...]
 */
export function piStream(length: number): number[] {
  return Array.from({length}, (_, i) => PI * (i + 1));
}

/**
 * Generate a pi-based harmonic frequency stream: [A432 * π, A432 * 2π, ...]
 */
export function piHarmonicStream(length: number): number[] {
  return Array.from({length}, (_, i) => A432 * PI * (i + 1));
}

/**
 * Generate a pi-based color stream using trigonometric mapping.
 * t in [0,1] (normalized position in stream)
 * Returns array of {r,g,b} in [0,1]
 */
export function piColorStream(length: number): {r: number, g: number, b: number}[] {
  return Array.from({length}, (_, i) => {
    const t = i / (length - 1);
    // Harmonic fractions
    const HALF = 1/2, TWO_THIRDS = 2/3, FOUR_THIRDS = 4/3;
    return {
      r: HALF + HALF * Math.sin(PI * t),
      g: HALF + HALF * Math.sin(PI * t + 2*PI/3),
      b: HALF + HALF * Math.sin(PI * t + 4*PI/3)
    };
  });
}

/**
 * Generate a pi-based Mobius twist stream (angles in degrees)
 */
export function piMobiusTwistStream(length: number): number[] {
  // Each twist is a multiple of π radians (180°)
  return Array.from({length}, (_, i) => (i + 1) * 180);
}

/**
 * Generate a pi-based Mobius surface parameter stream
 */
export function piMobiusSurfaceStream(length: number): {twist: number, orientation: string}[] {
  return Array.from({length}, (_, i) => ({
    twist: (i + 1) * PI,
    orientation: i % 2 === 0 ? 'left' : 'right'
  }));
}

/**
 * Documentation: How to use pi-based streams as the default source for all A432 flows.
 *
 * - Use piStream or piHarmonicStream as the base for frequency, phase, or time in color/audio/video generation.
 * - Use piColorStream to generate color flows that are inherently circular and infinite.
 * - Use piMobiusTwistStream and piMobiusSurfaceStream to parameterize Mobius strip logic with π.
 * - Compose these streams recursively for infinite, interdimensional, self-similar flows.
 */

/**
 * piDigitalRootStream(length): returns array of digital roots for [π, 2π, ...]
 */
export function piDigitalRootStream(length: number): number[] {
  return Array.from({length}, (_, i) => digitalRoot(Math.round(PI * (i + 1))));
}

/**
 * piRodinVortexStream(length): returns array of harmonic Rodin vortex cycles for each π multiple
 * (always uses 1 cycle, polarity +1)
 */
export function piRodinVortexStream(length: number): number[][] {
  return Array.from({length}, () => rodinVortexCycle(1, 1));
}

/**
 * piA432ColorStream(length): returns array of A432 HSL colors for digital roots of π multiples
 */
export function piA432ColorStream(length: number) {
  return Array.from({length}, (_, i) => {
    const root = digitalRoot(Math.round(PI * (i + 1)));
    return a432HSLFromRoot(root);
  });
}

/**
 * piTrinityProductStream(length): returns array of harmonic trinity products for each π multiple
 * (always uses polarity +1)
 */
export function piTrinityProductStream(length: number): number[] {
  return Array.from({length}, () => a432TrinityProduct(1));
}

/**
 * piRecursiveJourneyStream(length): returns array of {step, pi, digitalRoot, color, rodin, trinityProduct} for each π multiple
 * (rodin and trinityProduct are harmonic projections)
 */
export function piRecursiveJourneyStream(length: number) {
  return Array.from({length}, (_, i) => {
    const piVal = PI * (i + 1);
    const root = digitalRoot(Math.round(piVal));
    return {
      step: i + 1,
      pi: piVal,
      digitalRoot: root,
      color: a432HSLFromRoot(root),
      rodin: rodinVortexCycle(1, 1),
      trinityProduct: a432TrinityProduct(1)
    };
  });
}

/**
 * Canonical array of pi digits (0-9) for endless harmonic streaming
 * First 1000 digits of pi (excluding the decimal point)
 * Source: https://oeis.org/A000796 (first 1000 digits)
 */
export const PI_DIGITS = [
  3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7,1,6,9,3,9,9,3,7,5,1,
  0,5,8,2,0,9,7,4,9,4,4,5,9,2,3,0,7,8,1,6,4,0,6,2,8,6,2,0,8,9,9,8,6,2,8,0,3,4,8,2,5,3,4,2,1,1,7,0,6,7,
  9,8,2,1,4,8,0,8,6,5,1,3,2,8,2,3,0,6,6,4,7,0,9,3,8,4,4,6,0,9,5,5,0,5,8,2,2,3,1,7,2,5,3,5,9,4,0,8,1,2,
  8,4,8,1,1,1,7,4,5,0,2,8,4,1,0,2,7,0,1,9,3,8,5,2,1,1,0,5,5,5,9,6,4,4,6,2,2,9,4,8,9,5,4,9,3,0,3,8,1,9,
  6,4,4,2,8,8,1,0,9,7,5,6,6,5,9,3,3,4,4,6,1,2,8,4,7,5,6,4,8,2,3,3,7,8,6,7,8,3,1,6,5,2,7,1,2,0,1,9,0,9,
  1,4,5,6,4,8,5,6,6,9,2,3,4,6,0,3,4,8,6,1,0,4,5,4,3,2,6,6,4,8,2,1,3,3,9,3,6,0,7,2,6,0,2,4,9,1,4,1,2,7,
  3,7,2,4,5,8,7,0,0,6,6,0,6,3,1,5,5,8,8,1,7,4,8,8,1,5,2,0,9,2,0,9,6,2,8,2,9,2,5,4,0,9,1,7,1,5,3,6,4,3,
  6,7,8,9,2,5,9,0,3,6,0,0,1,1,3,3,0,5,3,0,5,4,8,8,2,0,4,6,6,5,2,1,3,8,4,1,4,6,9,5,1,9,4,1,5,1,1,6,0,9,
  4,3,3,0,5,7,2,7,0,3,6,5,7,5,9,5,9,1,9,5,3,0,9,2,1,8,6,1,1,7,3,8,1,9,3,2,6,1,1,7,9,3,1,0,5,1,1,8,5,4,
  8,0,7,4,4,6,2,3,7,9,9,6,2,7,4,9,5,6,7,3,5,1,8,8,5,7,5,2,7,2,4,8,9,1,2,2,7,9,3,8,1,8,3,0,1,1,9,4,9,1,
  2,9,8,3,3,6,7,3,3,6,2,4,4,0,6,5,6,6,4,3,0,8,6,0,2,1,3,9,4,9,4,6,3,9,5,2,2,4,7,3,7,1,9,0,7,0,2,1,7,9,
  8,6,0,9,4,3,7,0,2,7,7,0,5,3,9,2,1,7,1,7,6,2,9,3,1,7,6,7,5,2,3,8,4,6,7,4,8,1,8,4,6,7,6,6,9,4,0,5,1,3,
  2,0,0,0,5,6,8,1,2,7,1,4,5,2,6,3,5,6,0,8,2,7,7,8,5,7,7,1,3,4,2,7,5,7,7,8,9,6,0,9,1,7,3,6,3,7,1,7,8,7,
  2,1,4,6,8,4,4,0,9,0,1,2,2,4,9,5,3,4,3,0,1,4,6,5,4,9,5,8,5,3,7,1,0,5,0,7,9,2,2,7,9,6,8,9,2,5,8,9,2,3,
  5,4,2,0,1,9,9,5,6,1,1,2,1,2,9,0,2,1,9,6,0,8,6,4,0,3,4,4,1,8,1,5,9,8,1,3,6,2,9,7,7,4,7,7,1,3,0,9,9,6,
  0,5,1,8,7,0,7,2,1,1,3,4,9,9,9,9,9,8,3,7,2,9,7,8,0,4,9,9,5,1,0,5,9,7,3,1,7,3,2,8,1,6,0,9,6,3,1,8,5,9,
  5,0,2,4,4,5,9,4,5,5,3,4,6,9,0,8,3,0,2,6,4,2,5,2,2,3,0,8,2,5,3,3,4,4,6,8,5,0,3,5,2,6,1,9,3,1,1,8,8,1,
  7,1,0,1,0,0,0,3,1,3,7,8,3,8,7,5,2,8,8,6,5,8,7,5,3,3,2,0,8,3,8,1,4,2,0,6,1,7,1,7,7,6,6,9,1,4,7,3,0,3,
  5,9,8,2,5,3,4,9,0,4,2,8,7,5,5,4,6,8,7,3,1,1,5,9,5,6,2,8,6,3,8,8,2,3,5,3,7,8,7,5,9,3,7,5,1,9,5,7,7,8,
  1,8,5,7,7,8,0,5,3,2,1,7,1,2,2,6,8,0,6,6,1,3,0,0,1,9,2,7,8,7,6,6,1,1,1,9,5,9,0,9,2,1,6,4,2,0,1,9,8,9,
  3,8,9,3,0,0,9,4,4,3,9,0,3,0,8,3,6,2,0,6,6,5,6,6,4,3,0,8,6,0,2,1,3,9,4,9,4,6,3,9,5,2,2,4,7,3,7,1,9,0
]; 