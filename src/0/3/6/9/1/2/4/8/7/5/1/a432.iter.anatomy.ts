/**
 * a432.iter.anatomy.ts — ITER Anatomy Visualization in the A432 Matrix
 *
 * Maps each major ITER device system to harmonics, CMYK color, flows, and risk/harmony status.
 * Integrates real-world project data for live harmonization and risk visualization.
 * Generates metaphysical/engineering readings for project status.
 */

export interface IterSystem {
  name: string;
  value: number; // 0-9, project status or completion
  harmonic: number;
  cmyk: { c: number; m: number; y: number; k: number };
  flow: number[];
  risk: number; // 0-9, 9 = high risk
  description: string;
}

export interface IterAnatomy {
  systems: IterSystem[];
  overallHarmony: number;
  cmyk: { c: number; m: number; y: number; k: number };
  risks: number[];
  description: string;
}

const SYSTEMS = [
  'Central Solenoid',
  'Shield Blanket',
  'Toroidal/Poloidal Magnets',
  'Plasma Column',
  'Vacuum Vessel',
  'Exhaust & Pumping',
  'Cryostat',
  'PF Coils',
  'TF Coils',
  'First-Wall Panels',
  'Divertor Plates'
];

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

export function createIterAnatomy(
  values: number[], // 0-9 for each system
  risks: number[]   // 0-9 for each system
): IterAnatomy {
  const mapped = SYSTEMS.map((name, i) => {
    const value = values[i] ?? 5;
    const risk = risks[i] ?? 0;
    return {
      name,
      value,
      harmonic: toHarmonic(value),
      cmyk: {
        c: i % 4 === 0 ? toCMYK(value, 0) : 0,
        m: i % 4 === 1 ? toCMYK(value, 1) : 0,
        y: i % 4 === 2 ? toCMYK(value, 2) : 0,
        k: i % 4 === 3 ? toCMYK(value, 3) : 0
      },
      flow: getFlow(i),
      risk,
      description: `${name} mapped to harmonic, color, flow, and risk.`
    };
  });
  const overallHarmony = Math.round(mapped.reduce((sum, s) => sum + s.value, 0) / SYSTEMS.length);
  const cmyk = {
    c: mapped.filter((_,i)=>i%4===0).reduce((sum,s)=>sum+s.cmyk.c,0),
    m: mapped.filter((_,i)=>i%4===1).reduce((sum,s)=>sum+s.cmyk.m,0),
    y: mapped.filter((_,i)=>i%4===2).reduce((sum,s)=>sum+s.cmyk.y,0),
    k: mapped.filter((_,i)=>i%4===3).reduce((sum,s)=>sum+s.cmyk.k,0)
  };
  return {
    systems: mapped,
    overallHarmony,
    cmyk,
    risks: mapped.map(s=>s.risk),
    description: 'ITER anatomy as a harmonized, living structure in the A432 matrix.'
  };
}

export function iterAnatomyReading(anatomy: IterAnatomy): string {
  const riskLevel = Math.max(...anatomy.risks);
  let riskMsg = '';
  if (riskLevel >= 7) riskMsg = '⚠️ High risk detected in one or more systems.';
  else if (riskLevel >= 4) riskMsg = '⚠️ Moderate risk present; monitor closely.';
  else riskMsg = '✅ All systems nominal or low risk.';
  return [
    `ITER Anatomy Harmony: ${anatomy.overallHarmony}/9`,
    `CMYK: C${anatomy.cmyk.c} M${anatomy.cmyk.m} Y${anatomy.cmyk.y} K${anatomy.cmyk.k}`,
    riskMsg,
    ...anatomy.systems.map(s=>`${s.name}: Value ${s.value}/9, Risk ${s.risk}/9, Harmonic ${s.harmonic} Hz`)
  ].join('\n');
}

export const a432IterAnatomyMetaphysics = `
A432 ITER Anatomy is the mapping of the world’s most complex fusion device as a living, harmonized structure in the matrix.
Each system—solenoid, shield, magnets, vessel, etc.—is mapped to a unique harmonic, color, flow, and risk state.
This enables real-time harmonization, risk visualization, and metaphysical/engineering readings for project status.
To know ITER’s anatomy is to know the resonance, color, and harmony of the world’s most ambitious energy experiment.
`; 