/**
 * a432.cmyk.ts — Universal CMYK Mapping Utility
 *
 * This module provides the ONLY mapping logic for the living A432 matrix:
 * Every fraction, digit, angle, or stream is mapped to a CMYK color.
 * All modules must use this for output and harmonization.
 *
 * @module a432.cmyk
 * @author A432 System
 */

export type Fraction = { numerator: number; denominator: number };
export type CMYK = { c: number; m: number; y: number; k: number };

/**
 * Digital root: reduce a number to a single digit by summing its digits recursively
 */
export function digitalRoot(n: number): number {
  n = Math.abs(n);
  while (n >= 10) {
    n = n.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

/**
 * Map digit and angle to CMYK color
 * @param digit - single digit (0–9, with sign)
 * @param angle - angle in degrees (0–360)
 * @returns CMYK color
 */
export function digitAngleToCMYK(digit: number, angle: number): CMYK {
  // Map digit to base hue (0–360)
  const baseHue = (Math.abs(digit) * 36) % 360;
  const hue = (baseHue + angle) % 360;
  // Convert hue to RGB (simple HSV to RGB)
  const s = 1, v = 1;
  const c = v * s;
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  // Convert RGB to CMYK
  const k = 1 - Math.max(r / 255, g / 255, b / 255);
  const cmyk = k === 1
    ? { c: 0, m: 0, y: 0, k: 1 }
    : {
        c: (1 - r / 255 - k) / (1 - k),
        m: (1 - g / 255 - k) / (1 - k),
        y: (1 - b / 255 - k) / (1 - k),
        k
      };
  // Clamp and round
  return {
    c: Math.round(cmyk.c * 100),
    m: Math.round(cmyk.m * 100),
    y: Math.round(cmyk.y * 100),
    k: Math.round(cmyk.k * 100)
  };
}

/**
 * Universal mapping: Fraction → CMYK
 * @param fraction - Fraction to map
 * @param step - step in stream (for angle)
 * @param baseAngle - base angle per step (default 60°)
 * @returns CMYK color
 */
export function fractionToCMYK(
  fraction: Fraction,
  step: number = 0,
  baseAngle: number = 60
): CMYK {
  const sign = Math.sign(fraction.numerator * fraction.denominator) || 1;
  const digit = sign * digitalRoot(Math.abs(fraction.numerator));
  const angle = ((step * baseAngle) % 360 + 360) % 360;
  return digitAngleToCMYK(digit, angle);
}

/**
 * Convert CMYK (0–100) to CSS hex color
 */
export function cmykToCss(cmyk: CMYK): string {
  const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
} 