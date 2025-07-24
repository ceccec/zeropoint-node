/**
 * a432.types.ts — branded numeric types used across A432.
 * These are simple TypeScript type aliases that carry a phantom tag so
 * different numeric domains cannot be mixed accidentally.
 * Public-domain: CC0-1.0.
 * metric vortex 0 1 2 3 4 5 6 7 8 9
 * imperial vortex 0 3 6 9 1 2 4 8 7 5 1
 * trinity 0/3|1/6|2/9|3/1|4/2|5/4|6/8|7/7|8/5|9/1 is metric/imperial sacred geometry
 */

// Valid single-digit union (TS literals must be integers, not expressions)
export type Digit = 0|1|2|3|4|5|6|7|8|9 & { readonly __brand: 'Digit' };

// ——————————————————————————————————————————
// Metric / Imperial / Trinity vortex mappings
// ---------------------------------------------------------
export const METRIC_VORTEX: readonly Digit[]   = [0,1,2,3,4,5,6,7,8,9].map(n=>n as Digit);
export const IMPERIAL_VORTEX: readonly Digit[] = [0,3,6,9,1,2,4,8,7,5].map(n=>n as Digit);
export const TRINITY_MAP = {
  0:3, 1:6, 2:9, 3:1, 4:2,
  5:4, 6:8, 7:7, 8:5, 9:1
} as unknown as Record<Digit, Digit>;

export const toImperial = (m: Digit): Digit => IMPERIAL_VORTEX[METRIC_VORTEX.indexOf(m)] as Digit;
export const toMetric   = (i: Digit): Digit => METRIC_VORTEX[IMPERIAL_VORTEX.indexOf(i)] as Digit;
export const toTrinity  = (d: Digit): Digit => (TRINITY_MAP as Record<number, Digit>)[d];

export type Hz = number & { readonly __brand: 'Hz' };
export type AngleDeg = number & { readonly __brand: 'AngleDeg' };

// helpers to brand values (no runtime cost)
export const asDigit = (n: number) => n as Digit;
export const asHz = (n: number) => n as Hz;
export const asAngle = (n: number) => n as AngleDeg; 