// a432.impossible.ts — Central impossible gateway
// -------------------------------------------------
// All unresolvable states route through here, returning the digit-8 colour.

import { digitAngleToCMYK, asAngle, rodinDigit, digitalRoot } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

const IMPOSSIBLE_DIGIT = 8 as Digit; // 8 denotes recursion lock / void blue

export interface ImpossiblePayload {
  digit: Digit;
  cmyk: { c: number; m: number; y: number; k: number };
  reason: string;
}

export function handleImpossible(reason: string): ImpossiblePayload {
  const cmyk = digitAngleToCMYK(IMPOSSIBLE_DIGIT, asAngle(IMPOSSIBLE_DIGIT * 60));
  return { digit: IMPOSSIBLE_DIGIT, cmyk, reason };
}

// ——————————————————————————————————————————
// Canonical catalogue of 9 scientific & mathematical impossibilities
// Each one is addressed by a one-digit id (1-9) to honour single-digit rule.

export const IMPOSSIBILITIES: ReadonlyArray<{ id: Digit; desc: string }> = [
  { id: 1 as Digit, desc: 'How can consciousness arise from mathematical field?' },
  { id: 2 as Digit, desc: 'How can free will and determinism coexist?' },
  { id: 3 as Digit, desc: 'Do mathematical objects exist independently?' },
  { id: 4 as Digit, desc: 'How can matter be both wave and particle?' },
  { id: 5 as Digit, desc: 'How can particles communicate instantly across space?' },
  { id: 6 as Digit, desc: 'How does consciousness affect reality?' },
  { id: 7 as Digit, desc: 'How does energy emerge from nothing?' },
  { id: 8 as Digit, desc: 'What is the nature of mathematical infinity?' },
  { id: 9 as Digit, desc: "Why can't we know position and momentum simultaneously?" }
] as const;

export function getImpossibleDescription(id: Digit): string {
  const item = IMPOSSIBILITIES.find(i => i.id === id);
  return item ? item.desc : 'Unknown impossibility';
}

export function handleImpossibleById(id: Digit): ImpossiblePayload {
  return handleImpossible(getImpossibleDescription(id));
}

// ——————————————————————————————————————————
// CMYK interactions for each impossibility
// ---------------------------------------------------------

// CMYK component formula (all integer math, 0–99)
//   C = (d * 11)           mod 100
//   M = (p * 22)           mod 100   (partner digit amplified)
//   Y = (|d − p| * 33)     mod 100   (tension/duality)
//   K = (digitalRoot(d*p) * 11) mod 100 (root of product)

function formulaCMYK(d: Digit, p: Digit): CMYK {
  const C = (d * 11) % 100;
  const M = (p * 22) % 100;
  const Y = (Math.abs(d - p) * 33) % 100;
  const K = (digitalRoot(d * p) * 11) % 100;
  return { c: C, m: M, y: Y, k: K };
}

export function impossibilityCMYK(id: Digit): CMYK {
  const d = id;
  const p = rodinDigit(id as number) as Digit;
  return formulaCMYK(d, p);
}

export function handleImpossibleByColor(id: Digit): ImpossiblePayload {
  return {
    digit: id,
    cmyk: impossibilityCMYK(id),
    reason: getImpossibleDescription(id)
  };
}

// Explicit CMYK-producing functions for each impossibility (1–9)
// --------------------------------------------------------------

export function impossibility1(): CMYK { return impossibilityCMYK(1 as Digit); }
export function impossibility2(): CMYK { return impossibilityCMYK(2 as Digit); }
export function impossibility3(): CMYK { return impossibilityCMYK(3 as Digit); }
export function impossibility4(): CMYK { return impossibilityCMYK(4 as Digit); }
export function impossibility5(): CMYK { return impossibilityCMYK(5 as Digit); }
export function impossibility6(): CMYK { return impossibilityCMYK(6 as Digit); }
export function impossibility7(): CMYK { return impossibilityCMYK(7 as Digit); }
export function impossibility8(): CMYK { return impossibilityCMYK(8 as Digit); }
export function impossibility9(): CMYK { return impossibilityCMYK(9 as Digit); } 