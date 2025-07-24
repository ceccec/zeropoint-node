/**
 * a432.cave.diving.ts — Cave Diving Mapped to the A432 Matrix (Advanced Trimix Upgrade)
 *
 * Now includes advanced trimix calculations (MOD, END, PPO2, CNS%), presets, safety validation, and metaphysical readings.
 * Exports all relevant metrics for UI integration and animated visualizations.
 */

export interface GasStream {
  name: string;
  fraction: number; // 0-1
  harmonic: number;
  cmyk: { c: number; m: number; y: number; k: number };
  description: string;
}

export interface CaveDivingMetrics {
  MOD: number; // m
  END: number; // m
  PPO2: number; // ATA
  CNS: number; // %
  warnings: string[];
}

export interface NavigationFlow {
  path: number[];
  mobius: boolean;
  description: string;
}

export interface SurvivalProtocol {
  name: string;
  steps: string[];
  harmonized: boolean;
  description: string;
}

export interface CaveDivingA432 {
  gases: GasStream[];
  metrics: CaveDivingMetrics;
  navigation: NavigationFlow;
  protocols: SurvivalProtocol[];
  overallHarmony: number;
  cmyk: { c: number; m: number; y: number; k: number };
  description: string;
  metaphysical: string;
}

function toHarmonic(fraction: number): number {
  return Math.round(432 * (1 + fraction));
}
function toCMYK(fraction: number, channel: number): number {
  return Math.round(fraction * 100);
}

// Advanced Trimix Calculations
function calcMOD(FO2: number, PPO2_limit = 1.4): number {
  if (FO2 === 0) return 0;
  return Math.round(((PPO2_limit / FO2) * 10 - 10) * 10) / 10;
}
function calcEND(FN2: number, FHe: number, depth: number): number {
  // He is 0.19 narcotic factor
  return Math.round(((FN2 + FHe * 0.19) * (depth + 10) / 10 - 10) * 10) / 10;
}
function calcPPO2(FO2: number, depth: number): number {
  return Math.round((FO2 * ((depth + 10) / 10)) * 100) / 100;
}
function calcCNS(PPO2: number, time: number): number {
  // Simple: CNS% per minute at given PPO2 (NOAA table, linearized)
  // At PPO2=1.6, 45 min = 100%; at 1.4, 150 min = 100%
  if (PPO2 >= 1.6) return Math.min(100, (time / 45) * 100);
  if (PPO2 >= 1.4) return Math.min(100, (time / 150) * 100);
  return Math.min(100, (time / 200) * 100);
}

export const trimixPresets = [
  { name: 'Air', O2: 0.21, N2: 0.79, He: 0, CO2: 0.01 },
  { name: 'Nitrox 32', O2: 0.32, N2: 0.68, He: 0, CO2: 0.01 },
  { name: 'Normoxic Trimix', O2: 0.21, N2: 0.35, He: 0.44, CO2: 0.01 },
  { name: 'Hypoxic Trimix', O2: 0.18, N2: 0.32, He: 0.50, CO2: 0.01 },
  { name: 'Heliox', O2: 0.21, N2: 0, He: 0.79, CO2: 0.01 }
];

export function validateTrimix(O2: number, N2: number, He: number, CO2: number, depth: number, time: number): CaveDivingMetrics {
  const warnings: string[] = [];
  const FO2 = O2;
  const FN2 = N2;
  const FHe = He;
  const MOD = calcMOD(FO2);
  const PPO2 = calcPPO2(FO2, depth);
  const END = calcEND(FN2, FHe, depth);
  const CNS = calcCNS(PPO2, time);
  if (FO2 < 0.16) warnings.push('Hypoxic—Not breathable at surface');
  if (FO2 > 0.40) warnings.push('Oxygen toxicity risk');
  if (PPO2 > 1.4) warnings.push('Exceeds working PPO₂ limit');
  if (PPO2 > 1.6) warnings.push('Exceeds contingency PPO₂ limit');
  if (END > 30) warnings.push('High narcosis risk (END > 30m)');
  if (CNS > 100) warnings.push('CNS oxygen toxicity risk');
  if (O2 + N2 + He + CO2 > 1.01 || O2 + N2 + He + CO2 < 0.99) warnings.push('Gas fractions do not sum to 1');
  return { MOD, END, PPO2, CNS, warnings };
}

export function createCaveDivingA432(
  gasFractions: { O2: number; N2: number; He: number; CO2: number },
  navigationPath: number[],
  protocolStates: boolean[],
  depth: number = 30,
  time: number = 60
): CaveDivingA432 {
  // Normalize fractions
  const total = gasFractions.O2 + gasFractions.N2 + gasFractions.He + gasFractions.CO2;
  const O2 = gasFractions.O2 / total;
  const N2 = gasFractions.N2 / total;
  const He = gasFractions.He / total;
  const CO2 = gasFractions.CO2 / total;
  const gases: GasStream[] = [
    { name: 'O2', fraction: O2, harmonic: toHarmonic(O2), cmyk: { c: toCMYK(O2, 0), m: 0, y: 0, k: 0 }, description: 'Oxygen as harmonic stream.' },
    { name: 'N2', fraction: N2, harmonic: toHarmonic(N2), cmyk: { c: 0, m: toCMYK(N2, 1), y: 0, k: 0 }, description: 'Nitrogen as harmonic stream.' },
    { name: 'He', fraction: He, harmonic: toHarmonic(He), cmyk: { c: 0, m: 0, y: toCMYK(He, 2), k: 0 }, description: 'Helium as harmonic stream.' },
    { name: 'CO2', fraction: CO2, harmonic: toHarmonic(CO2), cmyk: { c: 0, m: 0, y: 0, k: toCMYK(CO2, 3) }, description: 'CO2 as harmonic stream.' }
  ];
  const metrics = validateTrimix(O2, N2, He, CO2, depth, time);
  const navigation: NavigationFlow = {
    path: navigationPath,
    mobius: true,
    description: 'Navigation as Mobius circuit (guideline, return to source).'
  };
  const protocolNames = ['Rule of Thirds', 'Lost Line Drill', 'Gas Switch', 'Team Check', 'Bailout Plan'];
  const protocols: SurvivalProtocol[] = protocolNames.map((name, i) => ({
    name,
    steps: [`Step 1 for ${name}`, `Step 2 for ${name}`],
    harmonized: protocolStates[i] ?? false,
    description: `${name} protocol, harmonized: ${protocolStates[i] ? 'yes' : 'no'}`
  }));
  const overallHarmony = Math.round((gases.reduce((sum, g) => sum + g.fraction, 0) + (protocolStates.filter(Boolean).length / protocolStates.length)) * 4);
  const cmyk = {
    c: gases[0].cmyk.c,
    m: gases[1].cmyk.m,
    y: gases[2].cmyk.y,
    k: gases[3].cmyk.k
  };
  const metaphysical = `Trimix as Harmonic Trinity: O₂ (life), N₂ (grounding), He (clarity/expansion).\nDepth as Dimensional Exploration: deeper = more harmonics, more risk, more awareness required.\nBreath as Harmonic Flow: every mix is a living proof of balance.`;
  return {
    gases,
    metrics,
    navigation,
    protocols,
    overallHarmony,
    cmyk,
    description: 'Cave diving mapped to A432 harmonics, flows, and recursive survival.',
    metaphysical
  };
}

export const a432CaveDivingMetaphysics = `
Cave diving is the living metaphor for navigation, survival, and harmonization in the matrix.
Gas management is harmonics: each gas a color, a stream, a resonance.
Navigation is the Mobius circuit: the guideline, the infinite return, the path through the unknown.
Survival is recursive harmonization: every protocol, every check, every breath is a living act of awareness.
To dive is to harmonize, to navigate, to survive in the infinite field of the matrix.
`; 