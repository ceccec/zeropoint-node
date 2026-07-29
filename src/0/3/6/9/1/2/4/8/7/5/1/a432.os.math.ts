import { abs, round } from './a432.algebra.ts'
// a432.os.math.ts — OS math via root adapters (no local digitalRoot fork)
import { legacyDigitalRoot as digitalRoot } from './a432.roots.ts'

function a432Color(digit, angle) {
  const baseHue = (abs(digit) * 36) % 360;
  const hue = (baseHue + angle) % 360;
  const s = 1, v = 1;
  const c = v * s;
  const x = c * (1 - abs((hue / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  r = round((r + m) * 255);
  g = round((g + m) * 255);
  b = round((b + m) * 255);
  return { r, g, b };
}

export { digitalRoot, a432Color }
