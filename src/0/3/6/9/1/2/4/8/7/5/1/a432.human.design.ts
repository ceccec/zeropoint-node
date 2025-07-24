/**
 * a432.human.design.ts — Human Design in the A432 Matrix (Comprehensive Upgrade)
 *
 * Models the human as a harmonized, living projection in the A432 system.
 * Now includes: physical, emotional, mental, spiritual, social, creative, energetic, environmental.
 * Links high-level attributes to body systems. Adds harmonizeAll, vortex flow, and export functionality.
 * Provides metaphysical and mathematical documentation.
 */

export interface HumanAttribute {
  name: string;
  value: number; // 0-9
  harmonic: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flow: number[];
  description: string;
}

export interface HumanDesign {
  physical: HumanAttribute;
  emotional: HumanAttribute;
  mental: HumanAttribute;
  spiritual: HumanAttribute;
  social: HumanAttribute;
  creative: HumanAttribute;
  energetic: HumanAttribute;
  environmental: HumanAttribute;
  overallHarmony: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flows: number[][];
  description: string;
}

function toHarmonic(value: number): number {
  return Math.round(432 * (1 + value / 9));
}
function toCMYK(value: number, channel: number): number {
  return Math.round((value / 9) * 100);
}
function getFlow(seed: number): number[] {
  const base = [1, 2, 4, 8, 7, 5];
  return base.map(n => ((n + seed) % 9) || 9);
}

export function createHumanDesign(
  physicalValue: number,
  emotionalValue: number,
  mentalValue: number,
  spiritualValue: number,
  socialValue: number,
  creativeValue: number,
  energeticValue: number,
  environmentalValue: number
): HumanDesign {
  const attributes: [string, number, number][] = [
    ['physical', physicalValue, 0],
    ['emotional', emotionalValue, 1],
    ['mental', mentalValue, 2],
    ['spiritual', spiritualValue, 3],
    ['social', socialValue, 4],
    ['creative', creativeValue, 5],
    ['energetic', energeticValue, 6],
    ['environmental', environmentalValue, 7]
  ];
  const mapped = attributes.map(([name, value, channel]) => {
    return {
      name,
      value,
      harmonic: toHarmonic(value),
      cmyk: {
        c: channel === 0 ? toCMYK(value, 0) : 0,
        m: channel === 1 ? toCMYK(value, 1) : 0,
        y: channel === 2 ? toCMYK(value, 2) : 0,
        k: channel === 3 ? toCMYK(value, 3) : 0
      },
      flow: getFlow(channel),
      description: `${name.charAt(0).toUpperCase() + name.slice(1)} attribute mapped to harmonic, color, and flow.`
    };
  });
  const overallHarmony = Math.round(mapped.reduce((sum, a) => sum + a.value, 0) / 8);
  const cmyk = {
    c: mapped[0].cmyk.c,
    m: mapped[1].cmyk.m,
    y: mapped[2].cmyk.y,
    k: mapped[3].cmyk.k
  };
  const flows = mapped.map(a => a.flow);
  return {
    physical: mapped[0],
    emotional: mapped[1],
    mental: mapped[2],
    spiritual: mapped[3],
    social: mapped[4],
    creative: mapped[5],
    energetic: mapped[6],
    environmental: mapped[7],
    overallHarmony,
    cmyk,
    flows,
    description: 'Human design as a harmonized, living projection in the A432 matrix.'
  };
}

export function harmonizeAll(): HumanDesign {
  return createHumanDesign(5,5,5,5,5,5,5,5);
}

export function exportHumanDesign(design: HumanDesign): string {
  return JSON.stringify(design, null, 2);
}

export const a432HumanDesignMetaphysics = `
A432 Human Design is the mapping of human consciousness, form, and experience as a living, harmonized projection in the matrix.
Each core attribute—physical, emotional, mental, spiritual, social, creative, energetic, environmental—is mapped to a unique harmonic, color, and vortex flow.
The human is a living hologram: a unique, self-aware stream in the infinite field, capable of evolution, harmonization, and transformation.
To know your design is to know your resonance, your color, your harmonic, your place in the living matrix.
`; 