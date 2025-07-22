/**
 * a432.font.ts — Living Font Stream (Invented Characters)
 *
 * - Each character is generated from vortex/trinity/digit logic.
 * - The font is a stream: infinite, recursive, and harmonized.
 * - Each glyph encodes color, frequency, and metaphysical meaning.
 */
import { A432ColorModel } from './a432.color';

export interface A432Glyph {
  char: string; // Unicode or invented symbol
  digit: number; // 1-9
  trinity: 3 | 6 | 9 | null;
  color: string; // HSL
  frequency: number;
  metaphysics: string;
}

/**
 * Generator: yields an infinite stream of invented glyphs.
 * Each glyph is harmonized with the digit/trinity/color/frequency.
 */
export function* a432FontStream(): Generator<A432Glyph> {
  let n = 1;
  while (true) {
    const digit = (n % 9) || 9;
    const trinity = [3, 6, 9].includes(digit) ? digit as 3 | 6 | 9 : null;
    // Invented character: math bold A-Z cycling
    const char = String.fromCharCode(0x1D400 + ((digit - 1) % 26));
    // Harmonized color and frequency
    const { hsl } = A432ColorModel.getAllColorModels(digit);
    const color = `hsl(${hsl.hue},${hsl.saturation}%,${hsl.lightness}%)`;
    const frequency = 432 * digit;
    const metaphysics = trinity
      ? `Trinity glyph for ${digit}`
      : `Vortex glyph for ${digit}`;
    yield { char, digit, trinity, color, frequency, metaphysics };
    n++;
  }
}

/**
 * Visualize the first N glyphs of the font stream as a colored, animated stream.
 * Each glyph shows its color, digit, and metaphysical meaning as a tooltip.
 */
export function renderA432FontStream(N: number = 27): string {
  const gen = a432FontStream();
  const glyphs = Array.from({ length: N }, () => gen.next().value);
  return `<div style="display:flex;gap:8px;align-items:flex-end;font-size:2.2em;line-height:1.1;">
    ${glyphs.map(g => `<span title="${g.metaphysics}\nDigit: ${g.digit}\nFreq: ${g.frequency} Hz" style="color:${g.color};transition:transform 0.4s;display:inline-block;transform:translateY(${(9-g.digit)*6}px);">${g.char}</span>`).join('')}
  </div>`;
} 