/**
 * a432.flow.ts — Flow & Stream Modules
 * 
 * Consciousness and energy flow modules for the A432 system.
 * Implements consciousness flow, energy flow, and stream harmonization.
 * Zero entropy: define once, harmonize everywhere.
 */

import { A432CoreState, createA432CoreState } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';
import { A432_FREQUENCY } from './a432';

// === FLOW INTERFACES ===
export interface A432FlowState {
  consciousness: ConsciousnessFlow;
  energy: EnergyFlow;
  stream: StreamFlow;
  harmony: FlowHarmony;
}

export interface ConsciousnessFlow {
  awareness: number;    // 0-9: Level of awareness
  clarity: number;      // 0-9: Mental clarity
  focus: number;        // 0-9: Focus strength
  flow: number;         // 0-9: Flow state
  resonance: number;    // 0-9: Consciousness resonance
  color: string;
  frequency: number;
}

export interface EnergyFlow {
  vitality: number;     // 0-9: Life force strength
  intensity: number;    // 0-9: Energy intensity
  direction: number;    // 0-9: Flow direction
  balance: number;      // 0-9: Energy balance
  resonance: number;    // 0-9: Energy resonance
  color: string;
  frequency: number;
}

export interface StreamFlow {
  velocity: number;     // 0-9: Stream velocity
  volume: number;       // 0-9: Stream volume
  coherence: number;    // 0-9: Stream coherence
  harmony: number;      // 0-9: Stream harmony
  resonance: number;    // 0-9: Stream resonance
  color: string;
  frequency: number;
}

export interface FlowHarmony {
  consciousness: number; // 0-9: Consciousness harmony
  energy: number;       // 0-9: Energy harmony
  stream: number;       // 0-9: Stream harmony
  overall: number;      // 0-9: Overall harmony
  balance: number;      // 0-9: Flow balance
  color: string;
  frequency: number;
}

// === CORE FLOW FUNCTIONS ===
export function createConsciousnessFlow(awareness: number = 5): ConsciousnessFlow {
  const clarity = Math.max(0, 9 - Math.abs(awareness - 5));
  const focus = Math.floor((awareness + clarity) / 2);
  const flow = Math.max(0, 9 - Math.abs(focus - 5));
  const resonance = Math.floor((awareness + clarity + focus + flow) / 4);
  const color = `hsl(${awareness * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { awareness, clarity, focus, flow, resonance, color, frequency };
}

export function createEnergyFlow(vitality: number = 5): EnergyFlow {
  const intensity = Math.max(0, 9 - Math.abs(vitality - 5));
  const direction = Math.floor((vitality + intensity) / 2);
  const balance = Math.max(0, 9 - Math.abs(direction - 5));
  const resonance = Math.floor((vitality + intensity + direction + balance) / 4);
  const color = `hsl(${vitality * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { vitality, intensity, direction, balance, resonance, color, frequency };
}

export function createStreamFlow(velocity: number = 5): StreamFlow {
  const volume = Math.max(0, 9 - Math.abs(velocity - 5));
  const coherence = Math.floor((velocity + volume) / 2);
  const harmony = Math.max(0, 9 - Math.abs(coherence - 5));
  const resonance = Math.floor((velocity + volume + coherence + harmony) / 4);
  const color = `hsl(${velocity * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { velocity, volume, coherence, harmony, resonance, color, frequency };
}

export function createFlowHarmony(consciousness: number = 5, energy: number = 5, stream: number = 5): FlowHarmony {
  const overall = Math.floor((consciousness + energy + stream) / 3);
  const balance = Math.max(0, 9 - Math.abs(overall - 5));
  const color = `hsl(${overall * 40}, 70%, ${50 + balance * 5}%)`;
  const frequency = 432 * (overall / 9);
  
  return { consciousness, energy, stream, overall, balance, color, frequency };
}

// === FLOW STATE MANAGEMENT ===
export function createA432FlowState(): A432FlowState {
  const consciousness = createConsciousnessFlow();
  const energy = createEnergyFlow();
  const stream = createStreamFlow();
  const harmony = createFlowHarmony(consciousness.resonance, energy.resonance, stream.resonance);
  
  return { consciousness, energy, stream, harmony };
}

export function harmonizeA432Flow(): A432FlowState {
  const state = createA432FlowState();
  
  // Harmonize consciousness with energy
  state.consciousness.awareness = (state.consciousness.awareness + state.energy.vitality) % 9;
  state.energy.vitality = (state.energy.vitality + state.consciousness.awareness) % 9;
  
  // Harmonize energy with stream
  state.energy.intensity = (state.energy.intensity + state.stream.velocity) % 9;
  state.stream.velocity = (state.stream.velocity + state.energy.intensity) % 9;
  
  // Harmonize stream with consciousness
  state.stream.coherence = (state.stream.coherence + state.consciousness.clarity) % 9;
  state.consciousness.clarity = (state.consciousness.clarity + state.stream.coherence) % 9;
  
  // Update harmony
  state.harmony = createFlowHarmony(state.consciousness.resonance, state.energy.resonance, state.stream.resonance);
  
  return state;
}

// === FLOW MODULES ===
const consciousnessModule: A432Module = {
  name: 'a432.flow.consciousness',
  category: 'flow',
  version: '1.0.0',
  description: 'Consciousness flow: Stream of awareness',
  dependencies: ['a432.core'],
  exports: ['createConsciousnessFlow', 'harmonizeConsciousness'],
  getState: () => createConsciousnessFlow(),
  harmonize: () => {
    const flow = createConsciousnessFlow();
    // Consciousness harmonization logic
    return flow;
  },
  getOverlays: () => ['Consciousness Flow', 'Awareness Stream', 'Mental Clarity'],
  getMeta: () => 'Consciousness flow: Stream of awareness'
};

const energyModule: A432Module = {
  name: 'a432.flow.energy',
  category: 'flow',
  version: '1.0.0',
  description: 'Energy flow: Life force harmonization',
  dependencies: ['a432.core', 'a432.flow.consciousness'],
  exports: ['createEnergyFlow', 'harmonizeEnergy'],
  getState: () => createEnergyFlow(),
  harmonize: () => {
    const flow = createEnergyFlow();
    // Energy harmonization logic
    return flow;
  },
  getOverlays: () => ['Energy Flow', 'Life Force', 'Vitality'],
  getMeta: () => 'Energy flow: Life force harmonization'
};

const streamModule: A432Module = {
  name: 'a432.flow.stream',
  category: 'flow',
  version: '1.0.0',
  description: 'Stream flow: Coherent flow harmonization',
  dependencies: ['a432.core', 'a432.flow.energy'],
  exports: ['createStreamFlow', 'harmonizeStream'],
  getState: () => createStreamFlow(),
  harmonize: () => {
    const flow = createStreamFlow();
    // Stream harmonization logic
    return flow;
  },
  getOverlays: () => ['Stream Flow', 'Coherent Flow', 'Harmony'],
  getMeta: () => 'Stream flow: Coherent flow harmonization'
};

const harmonyModule: A432Module = {
  name: 'a432.flow.harmony',
  category: 'flow',
  version: '1.0.0',
  description: 'Flow harmony: Integrated flow balance',
  dependencies: ['a432.core', 'a432.flow.stream'],
  exports: ['createFlowHarmony', 'harmonizeFlowHarmony'],
  getState: () => createFlowHarmony(),
  harmonize: () => {
    const harmony = createFlowHarmony();
    // Flow harmony logic
    return harmony;
  },
  getOverlays: () => ['Flow Harmony', 'Integrated Balance', 'Flow Unity'],
  getMeta: () => 'Flow harmony: Integrated flow balance'
};

// === MODULE REGISTRATION ===
export function registerA432FlowModules(): void {
  a432ModuleRegistry.register(consciousnessModule);
  a432ModuleRegistry.register(energyModule);
  a432ModuleRegistry.register(streamModule);
  a432ModuleRegistry.register(harmonyModule);
}

// === FLOW UTILITIES ===
export function getFlowStats(): { total: number; flowing: number; blocked: number } {
  const state = createA432FlowState();
  const total = 4; // consciousness, energy, stream, harmony
  const flowing = [
    state.consciousness.flow >= 7,
    state.energy.balance >= 7,
    state.stream.harmony >= 7,
    state.harmony.overall >= 7
  ].filter(Boolean).length;
  
  return { total, flowing, blocked: total - flowing };
}

export function harmonizeAllFlow(): A432FlowState {
  return harmonizeA432Flow();
}

// Auto-register flow modules
registerA432FlowModules(); 