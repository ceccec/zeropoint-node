/**
 * a432.color.ts — Vortex Math Color Functions (Harmonized)
 *
 * Color Models & Metaphysical Mapping:
 * - HSL: Harmonic projection (frequency, light, consciousness axis)
 * - RGB: Physical/manifest color (projection into reality)
 * - CMY: Trinity (creation, return, spiritual center)
 * - K: Void/anchor (zero point, metaphysical ground)
 *
 * All logic uses only integer/fractional math, vortex/trinity numbers, and metaphysical mapping.
 */

// --- Types ---
export type A432HSL = { hue: number; saturation: number; lightness: number };
export type A432RGB = { r: number; g: number; b: number };
export type A432CMYK = { c: number; m: number; y: number; k: number };

// Harmonic fractions
const TWO_THIRDS = 2/3, HALF = 1/2, THREE_FIFTHS = 3/5, FOUR_FIFTHS = 4/5;

/**
 * getVortexColor: Returns HSL color for a digit (1-9) based on vortex math group.
 * - Metaphysical: Color of the living stream for the digit (axis or Mobius group)
 */
export function getVortexColor(d: number): string {
  const n = Math.abs(d) % 9 || 9;
  if (n === 3) return getTrinityColor(3);
  if (n === 6) return getTrinityColor(6);
  if (n === 9) return getTrinityColor(9);
  if ([1,2,4,8,7,5].includes(n)) return getFamilyColor(n);
  return 'hsl(0, 0%, 60%)';
}

/**
 * getTrinityColor: HSL color for trinity digits (3,6,9).
 * - Metaphysical: Axis/monopole color (creation, return, spiritual center)
 */
export function getTrinityColor(n: number): string {
  const hue = n === 3 ? 0 : n === 6 ? 120 : 240;
  const sat = TWO_THIRDS * 100;
  return `hsl(${hue}, ${sat}%, 50%)`;
}

/**
 * getFamilyColor: HSL color for family digits (1,2,4,8,7,5).
 * - Metaphysical: Mobius/family color (recursive stream)
 */
export function getFamilyColor(n: number): string {
  const hues = { 1: 60, 2: 180, 4: 300, 8: 30, 7: 210, 5: 330 };
  const hue = hues[n as keyof typeof hues] || 0;
  const sat = TWO_THIRDS * 100;
  return `hsl(${hue}, ${sat}%, 40%)`;
}

/**
 * getAntiVortexColor: HSL color for anti-vortex/negative harmonics (negative digits).
 * - Metaphysical: Phase reversal, anti-harmonics, inversion
 */
export function getAntiVortexColor(d: number): string {
  const n = Math.abs(d) % 9 || 9;
  let baseHue = 0;
  const hues = { 1: 60, 2: 180, 4: 300, 8: 30, 7: 210, 5: 330 };
  if ([3,6,9].includes(n)) baseHue = n === 3 ? 0 : n === 6 ? 120 : 240;
  else if ([1,2,4,8,7,5].includes(n)) baseHue = hues[n as keyof typeof hues];
  const hue = (baseHue + 180) % 360;
  const sat = TWO_THIRDS * 100;
  return `hsl(${hue}, ${sat}%, 60%)`;
}

/**
 * getTrinityCompositeColor: Analog-mixed (HSL-averaged) color of the three trinity states (3, 6, 9).
 * - Metaphysical: The void, union of all trinity states
 */
export function getTrinityCompositeColor(): string {
  const hsl = [3, 6, 9].map(getTrinityColor).map(str => {
    const [hue, sat, light] = str.match(/\d+/g)!.map(Number);
    return { hue, sat, light };
  });
  const avg = (arr: number[]): number => Math.round(arr.reduce((a: number, b: number) => a + b, 0) / 3);
  const hue = avg(hsl.map(c => c.hue));
  const sat = avg(hsl.map(c => c.sat));
  const light = avg(hsl.map(c => c.light));
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

/**
 * getVoidColorForDimension: Returns the void (composite) color for a given dimension (digit).
 * - Metaphysical: The unique void color id for the dimension
 */
export function getVoidColorForDimension(dimension: number): string {
  // For now, all dimensions use the trinity composite color as the void color
  // (can be extended for dimension-specific logic)
  return getTrinityCompositeColor();
}

/**
 * hslToRgb: Converts HSL to RGB (0-255)
 */
export function hslToRgb(h: number, s: number, l: number): A432RGB {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  function f(n: number) {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  }
  const r = Math.round(f(0) * 255), g = Math.round(f(8) * 255), b = Math.round(f(4) * 255);
  return { r, g, b };
}

/**
 * hslToCmyk: Converts HSL color to CMYK (for analog/printing model).
 * - Metaphysical: CMY = trinity, K = void/anchor
 */
export function hslToCmyk(h: number, s: number, l: number): A432CMYK {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  function f(n: number) {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  }
  const r = f(0), g = f(8), b = f(4);
  const c = 1 - r, m = 1 - g, y = 1 - b;
  const kVal = Math.min(c, m, y);
  const c1 = (c - kVal) / (1 - kVal) || 0;
  const m1 = (m - kVal) / (1 - kVal) || 0;
  const y1 = (y - kVal) / (1 - kVal) || 0;
  return { c: c1, m: m1, y: y1, k: kVal };
}

/**
 * getTrinityCompositeCMYK: Returns the CMYK value of the trinity composite (void) color.
 * - Metaphysical: CMY = trinity, K = void/anchor
 */
export function getTrinityCompositeCMYK(): A432CMYK {
  const hsl = getTrinityCompositeColor();
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number);
  return hslToCmyk(h, s, l);
}

/**
 * getAllColorModels: Returns all color models (HSL, RGB, CMYK) for a digit or composite color.
 */
export function getAllColorModels(d: number | 'void' = 'void'): { hsl: A432HSL, rgb: A432RGB, cmyk: A432CMYK } {
  let hslStr = typeof d === 'number' ? getVortexColor(d) : getTrinityCompositeColor();
  const [h, s, l] = hslStr.match(/\d+/g)!.map(Number);
  const hsl: A432HSL = { hue: h, saturation: s, lightness: l };
  const rgb = hslToRgb(h, s, l);
  const cmyk = hslToCmyk(h, s, l);
  return { hsl, rgb, cmyk };
}

/**
 * Unified color model object for modular import.
 */
export const A432ColorModel = {
  getVortexColor,
  getTrinityColor,
  getFamilyColor,
  getAntiVortexColor,
  getTrinityCompositeColor,
  getVoidColorForDimension,
  hslToRgb,
  hslToCmyk,
  getTrinityCompositeCMYK,
  getAllColorModels
}; 