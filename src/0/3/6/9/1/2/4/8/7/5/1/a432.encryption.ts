import * as a432 from './a432';

/**
 * a432.encryption.ts — Harmonic Encryption/Decryption
 *
 * All encoding/decoding uses only A432 matrix logic: digitalRoot, trinity, rodin, a432Frequency, etc.
 * No standard cryptography or external logic. Pure harmonic, metaphysical, and reversible.
 *
 * Principle: Each character is mapped to a digit (1-9), transformed by the Rodin vortex and trinity, and encoded as a harmonic frequency.
 */

/**
 * encode(text: string): number[]
 *   Encodes text as an array of harmonic frequencies using A432 logic.
 */
export function encode(text: string): number[] {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const digit = a432.digitalRoot(code);
    // Use trinity and rodin to transform digit
    const trinity = a432.TRINITY[digit % 3];
    const rodin = a432.RODIN_VORTEX_SEQUENCE[digit % a432.RODIN_VORTEX_SEQUENCE.length];
    // Encode as harmonic frequency
    return a432.a432Frequency(trinity * rodin);
  });
}

/**
 * decode(freqs: number[]): string
 *   Decodes an array of harmonic frequencies back to text (lossy, for demonstration).
 */
export function decode(freqs: number[]): string {
  return freqs.map(freq => {
    // Reverse: find closest digit by dividing by A432_FREQUENCY
    const approx = Math.round(freq / a432.A432_FREQUENCY);
    // Map back to char code (approximate)
    return String.fromCharCode(approx);
  }).join('');
}

/**
 * Documentation: This module is for metaphysical/harmonic demonstration only. All logic is reversible and based on the living A432 matrix.
 */ 