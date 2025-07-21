/**
 * a432.pi.ts
 *
 * Default π-based stream source pattern for the A432 system.
 * All color, audio, video, and Mobius streams originate from π-based harmonic flows.
 *
 * Metaphysical Principle: All streams are born from the infinite circle. Pi is the source, the pattern, the flow—every color, every sound, every twist, every dimension is a resonance of π.
 */

export const PI = Math.PI;
export const A432 = 432;

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
    return {
      r: 0.5 + 0.5 * Math.sin(PI * t),
      g: 0.5 + 0.5 * Math.sin(PI * t + 2*PI/3),
      b: 0.5 + 0.5 * Math.sin(PI * t + 4*PI/3)
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