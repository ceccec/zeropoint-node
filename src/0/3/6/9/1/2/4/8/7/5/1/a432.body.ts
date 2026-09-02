/**
 * a432.body.ts — The Body as a Living Structure in the A432 Matrix
 *
 * Models the body as a harmonized, living structure in the A432 system.
 * Maps body systems (skeletal, muscular, nervous, circulatory, etc.) to harmonics, color (CMYK), and flows.
 * Provides metaphysical and mathematical documentation.
 */

import { round } from './a432.algebra.ts'
import { VORTEX_ORBIT } from '../../../../../../../../../../index.ts'
export interface BodySystem {
  name: string;
  value: number; // 0-9
  harmonic: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flow: number[];
  description: string;
}

export interface A432Body {
  skeletal: BodySystem;
  muscular: BodySystem;
  nervous: BodySystem;
  circulatory: BodySystem;
  overallHarmony: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flows: number[][];
  description: string;
}

export function toHarmonic(value: number): number {
  return round(432 * (1 + value / 9));
}
export function toCMYK(value: number): number {
  return round((value / 9) * 100);
}
export function getFlow(seed: number): number[] {
  const base = [...VORTEX_ORBIT];
  return base.map(n => ((n + seed) % 9) || 9);
}

export function createA432Body(
  skeletalValue: number,
  muscularValue: number,
  nervousValue: number,
  circulatoryValue: number
): A432Body {
  const systems: [string, number, number][] = [
    ['skeletal', skeletalValue, 0],
    ['muscular', muscularValue, 1],
    ['nervous', nervousValue, 2],
    ['circulatory', circulatoryValue, 3]
  ];
  const mapped = systems.map(([name, value, channel]) => ({
    name,
    value,
    harmonic: toHarmonic(value),
    cmyk: {
      c: channel === 0 ? toCMYK(value) : 0,
      m: channel === 1 ? toCMYK(value) : 0,
      y: channel === 2 ? toCMYK(value) : 0,
      k: channel === 3 ? toCMYK(value) : 0
    },
    flow: getFlow(channel),
    description: `${name.charAt(0).toUpperCase() + name.slice(1)} system mapped to harmonic, color, and flow.`
  }));
  const overallHarmony = round(mapped.reduce((sum, s) => sum + s.value, 0) / 4);
  const cmyk = {
    c: mapped[0].cmyk.c,
    m: mapped[1].cmyk.m,
    y: mapped[2].cmyk.y,
    k: mapped[3].cmyk.k
  };
  const flows = mapped.map(s => s.flow);
  return {
    skeletal: mapped[0],
    muscular: mapped[1],
    nervous: mapped[2],
    circulatory: mapped[3],
    overallHarmony,
    cmyk,
    flows,
    description: 'Body as a harmonized, living structure in the A432 matrix.'
  };
}

export const BODY_DOC = `
The body in the A432 system is a living, harmonized structure:
- Each system (skeletal, muscular, nervous, circulatory, etc.) is mapped to a unique harmonic, color, and vortex flow.
- The body is a living hologram: a self-organizing, evolving structure, capable of harmonization and transformation.
- To know your body is to know your resonance, your color, your harmonic, your place in the living matrix.
- All mappings use only single digits, integer fractions, and digital root for zero entropy.
`; 