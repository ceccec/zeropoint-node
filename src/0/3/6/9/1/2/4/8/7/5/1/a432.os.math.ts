// a432.os.math.ts — Self-contained math logic
function digitalRoot(n) { let x = Math.abs(n); while (x >= 10) x = String(x).split('').reduce((a, c) => a + Number(c), 0); return x; }
function a432Color(digit, angle) {
  const baseHue = (Math.abs(digit) * 36) % 360;
  const hue = (baseHue + angle) % 360;
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
  return { r, g, b };
}
// Example usage:
// digitalRoot(432); // 9
// a432Color(3, 120); // { r, g, b } 