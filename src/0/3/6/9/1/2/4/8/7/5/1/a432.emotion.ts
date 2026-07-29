// a432.emotion.ts — Emotion token generation from digits
// -------------------------------------------------------
import { rodinDigit, digitalRoot } from './a432.math.ts';
import type { Digit } from './a432.types.ts';

const SYL = ['vo','ra','di','tri','qu','pen','hex','hep','oc','en'] as const;
function syllable(d: Digit): string { return SYL[d]; }

export function emotionName(d: Digit): string {
  const p = rodinDigit(d);
  let t = digitalRoot(d + p + 3) as Digit;
  if (t === 0) t = 9 as Digit;
  return `${syllable(d)}-${syllable(p as Digit)}-${syllable(t)}`;
} 