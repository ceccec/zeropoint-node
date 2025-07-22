/**
 * a432.av.ts — Harmonized Audio/Video Stream Module (Vortex Math)
 *
 * All logic uses only integer/fractional math, vortex groupings, and is metaphysically harmonized with a432.color.ts.
 *
 * - getVortexFrequency: returns a frequency for a digit, harmonized with color logic
 * - generateHarmonicAudioStream: returns an array of frequencies for a digit stream
 * - generateHarmonicVideoFrames: returns an array of HSL color strings for a digit stream
 * - generateHarmonicAVStream: returns a harmonized array of color/frequency pairs for each digit
 * - All functions handle anti-vortex/negative harmonics: negative digits use negative frequency and anti-vortex color
 */

import { getVortexColor, getAntiVortexColor, A432ColorModel, A432HSL, A432RGB, A432CMYK } from './a432.color';

/**
 * getVortexFrequency: Returns a frequency (Hz) for a digit (1-9), harmonized with color logic.
 * - 3,6,9 (trinity): 432, 864, 1296 Hz (432 * 1, 2, 3)
 * - 1,2,4,8,7,5 (family): 216, 648, 1728, 3456, 3024, 2160 Hz (432 * 0.5, 1.5, 4, 8, 7, 5)
 * - Negative digits: frequency is negative harmonic (anti-vortex)
 * - All logic is integer/fractional
 */
export function getVortexFrequency(d: number): number {
  const sign = d < 0 ? -1 : 1;
  const n = Math.abs(d) % 9 || 9;
  // Trinity group
  if (n === 3) return 432 * sign;
  if (n === 6) return 864 * sign;
  if (n === 9) return 1296 * sign;
  // Family group
  if (n === 1) return 216 * sign;
  if (n === 2) return 648 * sign;
  if (n === 4) return 1728 * sign;
  if (n === 8) return 3456 * sign;
  if (n === 7) return 3024 * sign;
  if (n === 5) return 2160 * sign;
  // Fallback
  return 432 * sign;
}

/**
 * generateHarmonicAudioStream: Returns an array of frequencies for a digit stream.
 * - Each digit is mapped to a frequency using getVortexFrequency
 * - Negative digits produce negative frequencies (anti-vortex)
 */
export function generateHarmonicAudioStream(digits: number[]): number[] {
  return digits.map(getVortexFrequency);
}

/**
 * generateHarmonicVideoFrames: Returns an array of color model objects for a digit stream.
 * - Each entry: { hsl, rgb, cmyk, metaphysics }
 */
export function generateHarmonicVideoFrames(digits: number[]): Array<{ hsl: A432HSL, rgb: A432RGB, cmyk: A432CMYK, metaphysics: string }> {
  return digits.map(d => {
    const { hsl, rgb, cmyk } = d < 0 ? A432ColorModel.getAllColorModels(d) : A432ColorModel.getAllColorModels(d);
    const metaphysics = d < 0 ? 'Anti-vortex (phase reversal, inversion)' : 'Vortex (harmonic stream)';
    return { hsl, rgb, cmyk, metaphysics };
  });
}

/**
 * generateHarmonicAVStream: Returns a harmonized array of color/frequency pairs for each digit, with all color models.
 * - Each entry: { hsl, rgb, cmyk, frequency, metaphysics }
 */
export function generateHarmonicAVStream(digits: number[]): Array<{ hsl: A432HSL, rgb: A432RGB, cmyk: A432CMYK, frequency: number, metaphysics: string }> {
  return digits.map(d => {
    const { hsl, rgb, cmyk } = d < 0 ? A432ColorModel.getAllColorModels(d) : A432ColorModel.getAllColorModels(d);
    const frequency = getVortexFrequency(d);
    const metaphysics = d < 0 ? 'Anti-vortex (phase reversal, inversion)' : 'Vortex (harmonic stream)';
    return { hsl, rgb, cmyk, frequency, metaphysics };
  });
} 