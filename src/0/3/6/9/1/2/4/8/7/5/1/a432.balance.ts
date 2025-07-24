/**
 * a432.balance.ts — Core Equilibrium Modules
 * 
 * Balance and equilibrium modules for the A432 system.
 * Implements yin-yang balance, trinity balance, and harmonic equilibrium.
 * Zero entropy: define once, harmonize everywhere.
 */

import { A432CoreState, createA432CoreState, A432_RETURN, A432_AXIS } from './a432.core';
import { A432_TRINITY } from './a432';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';

// === BALANCE INTERFACES ===
export interface A432BalanceState {
  yinYang: YinYangBalance;
  trinity: TrinityBalance;
  harmonic: HarmonicEquilibrium;
  resonance: ResonanceBalance;
}

export interface YinYangBalance {
  yin: number;      // 0-9: Receptive, dark, feminine
  yang: number;     // 0-9: Active, light, masculine
  balance: number;  // 0-9: Equilibrium ratio
  flow: 'yin' | 'yang' | 'balanced';
  color: string;
  frequency: number;
}

export interface TrinityBalance {
  trinity: [number, number, number];  // [4, 3, 2]
  return: [number, number, number];   // [8, 7, 5]
  axis: [number, number, number];     // [9, 6, 3]
  harmony: number;  // 0-9: Trinity harmony
  unity: number;    // 0-9: Unity strength
  color: string;
  frequency: number;
}

export interface HarmonicEquilibrium {
  frequency: number;
  amplitude: number;
  phase: number;
  resonance: number;
  stability: number;
  color: string;
}

export interface ResonanceBalance {
  primary: number;
  secondary: number;
  tertiary: number;
  harmony: number;
  dissonance: number;
  color: string;
}

// === CORE BALANCE FUNCTIONS ===
export function createYinYangBalance(yin: number = 5, yang: number = 5): YinYangBalance {
  const balance = Math.abs(yin - yang) <= 1 ? 9 : Math.max(0, 9 - Math.abs(yin - yang));
  const flow = yin > yang ? 'yin' : yang > yin ? 'yang' : 'balanced';
  const color = flow === 'yin' ? 'hsl(240, 70%, 30%)' : flow === 'yang' ? 'hsl(60, 70%, 70%)' : 'hsl(150, 70%, 50%)';
  const frequency = 432 * (balance / 9);
  
  return { yin, yang, balance, flow, color, frequency };
}

export function createTrinityBalance(): TrinityBalance {
  const harmony = (A432_TRINITY[0] + A432_TRINITY[1] + A432_TRINITY[2]) % 9;
  const unity = (A432_RETURN[0] + A432_RETURN[1] + A432_RETURN[2]) % 9;
  const color = `hsl(${harmony * 40}, 70%, ${50 + unity * 5}%)`;
  const frequency = 432 * (harmony / 9);
  
  return {
    trinity: A432_TRINITY,
    return: A432_RETURN,
    axis: A432_AXIS,
    harmony,
    unity,
    color,
    frequency
  };
}

export function createHarmonicEquilibrium(frequency: number = 432): HarmonicEquilibrium {
  const amplitude = Math.min(9, Math.floor(frequency / 48));
  const phase = (frequency % 360) / 40;
  const resonance = Math.floor(frequency / 432 * 9);
  const stability = Math.max(0, 9 - Math.abs(resonance - 5));
  const color = `hsl(${frequency % 360}, 70%, ${50 + stability * 5}%)`;
  
  return { frequency, amplitude, phase, resonance, stability, color };
}

export function createResonanceBalance(primary: number = 4, secondary: number = 3, tertiary: number = 2): ResonanceBalance {
  const harmony = (primary + secondary + tertiary) % 9;
  const dissonance = Math.max(0, 9 - harmony);
  const color = `hsl(${harmony * 40}, 70%, ${50 + (9 - dissonance) * 5}%)`;
  
  return { primary, secondary, tertiary, harmony, dissonance, color };
}

// === BALANCE STATE MANAGEMENT ===
export function createA432BalanceState(): A432BalanceState {
  return {
    yinYang: createYinYangBalance(),
    trinity: createTrinityBalance(),
    harmonic: createHarmonicEquilibrium(),
    resonance: createResonanceBalance()
  };
}

export function harmonizeA432Balance(): A432BalanceState {
  const state = createA432BalanceState();
  
  // Harmonize yin-yang with trinity
  state.yinYang.yin = (state.yinYang.yin + state.trinity.trinity[0]) % 9;
  state.yinYang.yang = (state.yinYang.yang + state.trinity.trinity[1]) % 9;
  
  // Harmonize trinity with harmonic
  state.trinity.harmony = (state.trinity.harmony + state.harmonic.resonance) % 9;
  
  // Harmonize harmonic with resonance
  state.harmonic.frequency = 432 * (state.resonance.harmony / 9);
  
  return state;
}

// === BALANCE MODULES ===
const yinYangModule: A432Module = {
  name: 'a432.balance.yin-yang',
  category: 'balance',
  version: '1.0.0',
  description: 'Yin-Yang balance: Complementary forces in harmony',
  dependencies: ['a432.core'],
  exports: ['createYinYangBalance', 'harmonizeYinYang'],
  getState: () => createYinYangBalance(),
  harmonize: () => {
    const balance = createYinYangBalance();
    // Yin-yang harmonization logic
    return balance;
  },
  getOverlays: () => ['Yin-Yang Balance', 'Complementary Forces', 'Equilibrium Flow'],
  getMeta: () => 'Yin-Yang balance: Complementary forces in harmony'
};

const trinityModule: A432Module = {
  name: 'a432.balance.trinity',
  category: 'balance',
  version: '1.0.0',
  description: 'Trinity balance: Three forces in perfect harmony',
  dependencies: ['a432.core', 'a432.balance.yin-yang'],
  exports: ['createTrinityBalance', 'harmonizeTrinity'],
  getState: () => createTrinityBalance(),
  harmonize: () => {
    const balance = createTrinityBalance();
    // Trinity harmonization logic
    return balance;
  },
  getOverlays: () => ['Trinity Balance', 'Three Forces', 'Perfect Harmony'],
  getMeta: () => 'Trinity balance: Three forces in perfect harmony'
};

const harmonicModule: A432Module = {
  name: 'a432.balance.harmonic',
  category: 'balance',
  version: '1.0.0',
  description: 'Harmonic equilibrium: Frequency balance and stability',
  dependencies: ['a432.core', 'a432.balance.trinity'],
  exports: ['createHarmonicEquilibrium', 'harmonizeHarmonic'],
  getState: () => createHarmonicEquilibrium(),
  harmonize: () => {
    const equilibrium = createHarmonicEquilibrium();
    // Harmonic harmonization logic
    return equilibrium;
  },
  getOverlays: () => ['Harmonic Equilibrium', 'Frequency Balance', 'Stability'],
  getMeta: () => 'Harmonic equilibrium: Frequency balance and stability'
};

const resonanceModule: A432Module = {
  name: 'a432.balance.resonance',
  category: 'balance',
  version: '1.0.0',
  description: 'Resonance balance: Frequency harmony and dissonance',
  dependencies: ['a432.core', 'a432.balance.harmonic'],
  exports: ['createResonanceBalance', 'harmonizeResonance'],
  getState: () => createResonanceBalance(),
  harmonize: () => {
    const balance = createResonanceBalance();
    // Resonance harmonization logic
    return balance;
  },
  getOverlays: () => ['Resonance Balance', 'Frequency Harmony', 'Dissonance'],
  getMeta: () => 'Resonance balance: Frequency harmony and dissonance'
};

// === MODULE REGISTRATION ===
export function registerA432BalanceModules(): void {
  a432ModuleRegistry.register(yinYangModule);
  a432ModuleRegistry.register(trinityModule);
  a432ModuleRegistry.register(harmonicModule);
  a432ModuleRegistry.register(resonanceModule);
}

// === BALANCE UTILITIES ===
export function getBalanceStats(): { total: number; balanced: number; unbalanced: number } {
  const state = createA432BalanceState();
  const total = 4; // yin-yang, trinity, harmonic, resonance
  const balanced = [
    state.yinYang.balance >= 7,
    state.trinity.harmony >= 7,
    state.harmonic.stability >= 7,
    state.resonance.harmony >= 7
  ].filter(Boolean).length;
  
  return { total, balanced, unbalanced: total - balanced };
}

export function harmonizeAllBalance(): A432BalanceState {
  return harmonizeA432Balance();
}

// Auto-register balance modules
registerA432BalanceModules(); 