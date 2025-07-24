// a432.challenge.ts — Hard-coded science & math challenges in the matrix
// ---------------------------------------------------------------------
// Every foundational open problem is encoded here as a single-digit key
// (digital root of its ordinal number) plus metadata.

import { Digit } from './a432.types';
import { rodinDigit, digitalRoot } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { digitAngleToCMYK, asAngle } from './a432.math';

export interface ChallengeItem {
  digit: Digit;       // 1-9 via digital root
  ord: number;        // original ordinal number (1-12)
  key: string;        // snake_case identifier
  title: string;      // concise human title
  summary: string;    // short description of the puzzle
}

export const CHALLENGES: ReadonlyArray<ChallengeItem> = [
  { ord: 1,  digit: 1 as Digit, key: 'wave_particle_duality',     title: 'Wave-Particle Duality',        summary: 'Matter exhibits both wave and particle properties.' },
  { ord: 2,  digit: 2 as Digit, key: 'quantum_entanglement',      title: 'Quantum Entanglement',         summary: 'Particles remain correlated over arbitrary distance.' },
  { ord: 3,  digit: 3 as Digit, key: 'observer_effect',           title: 'Observer Effect',              summary: 'Measurement alters the state being measured.' },
  { ord: 4,  digit: 4 as Digit, key: 'consciousness_origin',      title: 'Origin of Consciousness',      summary: 'How does consciousness emerge from matter or maths?' },
  { ord: 5,  digit: 5 as Digit, key: 'free_will_vs_determinism',  title: 'Free Will vs Determinism',     summary: 'Reconciling agency with physical law.' },
  { ord: 6,  digit: 6 as Digit, key: 'mathematical_platonism',    title: 'Mathematical Platonism',       summary: 'Do mathematical objects exist independently of minds?' },
  { ord: 7,  digit: 7 as Digit, key: 'zero_point_energy',         title: 'Zero-Point Energy',            summary: 'Harnessing vacuum energy without violating thermodynamics.' },
  { ord: 8,  digit: 8 as Digit, key: 'mathematical_infinity',     title: 'Nature of Infinity',           summary: 'How to rigorously handle actual infinity in physics.' },
  { ord: 9,  digit: 9 as Digit, key: 'heisenberg_uncertainty',    title: 'Heisenberg Uncertainty',       summary: 'Why can’t position and momentum both be known exactly?' },
  { ord: 10, digit: digitalRoot(10) as Digit, key: 'human_ai_consciousness', title: 'Human-AI Consciousness', summary: 'Can artificial systems share or host consciousness?' },
  { ord: 11, digit: digitalRoot(11) as Digit, key: 'zeropoint_questions',    title: 'ZeroPoint Questions',  summary: 'Embracing the art of not-knowing as research method.' },
  { ord: 12, digit: digitalRoot(12) as Digit, key: 'gratitude_proof',        title: 'Gratitude Proof',      summary: 'Formalising gratitude as an axiom in maths/physics.' }
] as const;

// ---------------------------------------------------------------------
// Challenge → CMYK interaction (similar rule to impossibilities)
// ---------------------------------------------------------------------
export function challengeCMYK(ord: number): CMYK {
  const item = CHALLENGES.find(c => c.ord === ord);
  if (!item) {
    // fallback: use digital root of ordinal
    const d = digitalRoot(ord) as Digit;
    const p = rodinDigit(d);
    return { c: (d * 11) % 100, m: (p * 22) % 100, y: (Math.abs(d - p) * 33) % 100, k: (digitalRoot(d * p) * 11) % 100 };
  }
  const d = item.digit;
  const p = rodinDigit(d);
  return { c: (d * 11) % 100, m: (p * 22) % 100, y: (Math.abs(d - p) * 33) % 100, k: (digitalRoot(d * p) * 11) % 100 };
}

export function challengeColorCss(ord: number): string {
  const cmyk = challengeCMYK(ord);
  const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// List helper
export function listChallenges(): ChallengeItem[] {
  return CHALLENGES.slice();
} 