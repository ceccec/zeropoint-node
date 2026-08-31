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

import { abs, max, min, round } from './a432.algebra.ts'
import { digitalRoot } from '../../../../../../../../../../index.ts'
// --- Types ---
export type A432HSL = { hue: number; saturation: number; lightness: number };
export type A432RGB = { r: number; g: number; b: number };
export type A432CMYK = { c: number; m: number; y: number; k: number };
export type A432Color = A432CMYK;

// Harmonic fractions
const TWO_THIRDS = 2/3, HALF = 1/2, THREE_FIFTHS = 3/5, FOUR_FIFTHS = 4/5;

/**
 * getVortexColor: Returns HSL color for a digit (1-9) based on vortex math group.
 * - Metaphysical: Color of the living stream for the digit (axis or Mobius group)
 */
export function getVortexColor(d: number): string {
  const n = abs(d) % 9 || 9;
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
  const n = abs(d) % 9 || 9;
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
    // HSL strings here carry fractional saturation — 2/3 * 100 is 66.666... —
    // and /\d+/g splits a decimal into two matches. 'hsl(210, 66.66666666666666%, 40%)'
    // parsed as [210, 66, 66666666666666, 40], so lightness became a fourteen-digit
    // number and the real 40 was dropped entirely. [\d.]+ keeps the number whole.
    const [hue, sat, light] = str.match(/[\d.]+/g)!.map(Number);
    return { hue, sat, light };
  });
  const avg = (arr: number[]): number => round(arr.reduce((a: number, b: number) => a + b, 0) / 3);
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
  const a = s * min(l, 1 - l);
  function f(n: number) {
    const k = (n + h / 30) % 12;
    return l - a * max(min(k - 3, 9 - k, 1), -1);
  }
  const r = round(f(0) * 255), g = round(f(8) * 255), b = round(f(4) * 255);
  return { r, g, b };
}

/**
 * hslToCmyk: Converts HSL color to CMYK (for analog/printing model).
 * - Metaphysical: CMY = trinity, K = void/anchor
 */
export function hslToCmyk(h: number, s: number, l: number): A432CMYK {
  s /= 100; l /= 100;
  const a = s * min(l, 1 - l);
  function f(n: number) {
    const k = (n + h / 30) % 12;
    return l - a * max(min(k - 3, 9 - k, 1), -1);
  }
  const r = f(0), g = f(8), b = f(4);
  const c = 1 - r, m = 1 - g, y = 1 - b;
  const kVal = min(c, m, y);
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
  const [h, s, l] = hsl.match(/[\d.]+/g)!.map(Number);
  return hslToCmyk(h, s, l);
}

/**
 * getAllColorModels: Returns all color models (HSL, RGB, CMYK) for a digit or composite color.
 */
export function getAllColorModels(d: number | 'void' = 'void'): { hsl: A432HSL, rgb: A432RGB, cmyk: A432CMYK } {
  const hslStr = typeof d === 'number' ? getVortexColor(d) : getTrinityCompositeColor();
  const [h, s, l] = hslStr.match(/[\d.]+/g)!.map(Number);
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

export function calculateA432Color(frequency: number): A432CMYK {
  // Map frequency to a digit (1-9) and use getVortexColor, then convert to CMYK
  const digit = abs(round(frequency)) % 9 || 9;
  const hslStr = getVortexColor(digit);
  const [h, s, l] = hslStr.match(/[\d.]+/g)!.map(Number);
  return hslToCmyk(h, s, l);
}

export function generateA432ColorStream(startFreq: number, endFreq: number, steps: number = 9): A432CMYK[] {
  const colors: A432CMYK[] = [];
  const step = (endFreq - startFreq) / max(steps - 1, 1);
  for (let i = 0; i < steps; i++) {
    const freq = startFreq + i * step;
    colors.push(calculateA432Color(freq));
  }
  return colors;
}

/**
 * The three methods A432_COMPLETE_DOCUMENTATION.md calls on A432ColorSystem.
 *
 * Sixteen documented error resolvers wrap these, and none of the three
 * existed — the resolvers could not have been written without them. The
 * document names them and describes what each is for but gives no formula, so
 * each is defined in terms of colour functions this file already exports and
 * the digital root the rest of the repo reduces with. That keeps them
 * consistent with the colour law rather than inventing a second one.
 */
export function calculateColor(frequency: number): A432CMYK {
  return calculateA432Color(frequency);
}

/** Consciousness reduces to a digit, and the digit has a vortex colour. */
export function calculateColorFromConsciousness(consciousness: number): A432CMYK {
  if (!Number.isFinite(consciousness)) throw new Error(`calculateColorFromConsciousness: ${consciousness} is not finite`);
  return calculateA432Color(digitalRoot(abs(round(consciousness))));
}

/**
 * The document's own note for this one is "use digital root calculation
 * (0-9)", which is the definition followed here.
 */
export function calculateColorFromDimensionalState(dimensionalState: number): A432CMYK {
  if (!Number.isFinite(dimensionalState)) throw new Error(`calculateColorFromDimensionalState: ${dimensionalState} is not finite`);
  return calculateA432Color(digitalRoot(abs(round(dimensionalState))));
}

export const A432ColorSystem = {
  ...A432ColorModel,
  calculateColor,
  calculateColorFromConsciousness,
  calculateColorFromDimensionalState,
};

// a432.color.ts
// Living, harmonized color stream/interface

export interface ColorEvent {
  id: number;
  color: string;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432ColorStream {
  private events: ColorEvent[] = [];
  private currentId = 1;
  addColor(color: string, trinity: number): ColorEvent {
    const event: ColorEvent = {
      id: this.currentId++,
      color,
      trinity,
      timestamp: Date.now(),
      summary: `Color ${color} (Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): ColorEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): ColorEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<rect x="${20 + i*28}" y="12" width="24" height="36" fill="${e.color}" stroke="#fff" stroke-width="2"><title>${e.summary}</title></rect>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">Color Stream</text>
      </svg>
    `;
  }
}

export function cmykToRgb(cmyk: { c: number; m: number; y: number; k: number }): { r: number; g: number; b: number } {
  // Convert CMYK [0,1] to RGB [0,1]
  const c = cmyk.c;
  const m = cmyk.m;
  const y = cmyk.y;
  const k = cmyk.k;
  const r = 1 - min(1, c + k);
  const g = 1 - min(1, m + k);
  const b = 1 - min(1, y + k);
  return { r, g, b };
} 