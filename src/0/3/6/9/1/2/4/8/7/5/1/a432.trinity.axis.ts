import { PI, cos, sin } from './a432.algebra.ts'
import { TRINITY_AXIS as AXIS, getTrinityAxis, digitAngleToCMYK, cmykToCss, trinityPolarity } from './a432.math.ts';
// AXIS is an imported binding, not a literal, so `as const` was not legal —
// and not needed: it is already readonly where it is declared.
export { AXIS as TRINITY_AXIS };
export default AXIS;

export function getTrinityAxisOverlayData(radius: number = 120, centerX: number = 0, centerY: number = 0): Array<{ x: number; y: number; value: number; color: { c: number; m: number; y: number; k: number }; html: string; polarity: number; spin: number }> {
  const seq = getTrinityAxis();
  const N = seq.length;
  const data = [];
  for (let i = 0; i < N; i++) {
    const angle = (2 * PI * i) / N;
    const x = centerX + radius * cos(angle);
    const y = centerY + radius * sin(angle);
    const value = seq[i];
    const polarity = trinityPolarity(i); // +1 or -1
    const spin = polarity;
    let color = digitAngleToCMYK(value, (i * 120) % 360);
    if (polarity < 0) {
      color = { c: color.m, m: color.c, y: color.y, k: color.k };
    }
    const html = `<div style="width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;position:absolute;left:${x}px;top:${y}px;">${value}</div>`;
    data.push({ x, y, value, color, html, polarity, spin });
  }
  return data;
} 