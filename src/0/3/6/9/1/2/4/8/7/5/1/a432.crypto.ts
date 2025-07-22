// a432.crypto.ts — Harmonized Vortex Crypto Module
// All math uses only vortex/trinity numbers and harmonic integer fractions.
// Metaphysical mapping: Crypto = vortex encoding, trinity mapping, metaphysical concealment/revelation

export const CRYPTO_DOC = {
  meaning: 'Crypto: vortex encoding, trinity mapping, metaphysical concealment and revelation, harmonic transformation.',
  axis: 'Crypto is the act of harmonically concealing and revealing information using the living vortex.'
};

// Vortex sequence for digit shifting (1,2,4,8,7,5)
const VORTEX_SEQ = [1,2,4,8,7,5];
const TRINITY = [3,6,9];

/**
 * Canonical vortex-based encode: shifts each digit in the input string by the corresponding vortex sequence value (mod 9, 1-based).
 * Only digits 1-9 are encoded; 0 and non-digits are left unchanged.
 */
export function vortexEncode(input: string): string {
  return input.split('').map((ch, i) => {
    const n = parseInt(ch, 10);
    if (isNaN(n) || n === 0) return ch;
    const shift = VORTEX_SEQ[i % VORTEX_SEQ.length];
    // Shift digit by vortex value, wrap 1-9
    const encoded = ((n + shift - 1) % 9) + 1;
    return encoded.toString();
  }).join('');
}

/**
 * Canonical vortex-based decode: reverses the vortexEncode operation.
 */
export function vortexDecode(input: string): string {
  return input.split('').map((ch, i) => {
    const n = parseInt(ch, 10);
    if (isNaN(n) || n === 0) return ch;
    const shift = VORTEX_SEQ[i % VORTEX_SEQ.length];
    // Reverse shift, wrap 1-9
    const decoded = ((n - shift + 8) % 9) + 1;
    return decoded.toString();
  }).join('');
}

/**
 * Trinity-based mask: maps each digit to its trinity harmonic (3,6,9) for metaphysical concealment.
 */
export function trinityMask(input: string): string {
  return input.split('').map((ch, i) => {
    const n = parseInt(ch, 10);
    if (isNaN(n) || n === 0) return ch;
    return TRINITY[n % 3].toString();
  }).join('');
} 