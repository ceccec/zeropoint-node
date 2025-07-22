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