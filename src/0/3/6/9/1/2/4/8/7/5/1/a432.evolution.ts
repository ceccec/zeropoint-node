/**
 * a432.evolution.ts — Evolution & Growth Modules
 * 
 * Developmental harmonization modules for the A432 system.
 * Implements evolution growth, consciousness evolution, and developmental harmonization.
 * Zero entropy: define once, harmonize everywhere.
 */

import { A432CoreState, createA432CoreState } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';

// === EVOLUTION INTERFACES ===
export interface A432EvolutionState {
  growth: EvolutionGrowth;
  consciousness: ConsciousnessEvolution;
  development: DevelopmentalHarmonization;
  expansion: SystemExpansion;
}

export interface EvolutionGrowth {
  potential: number;     // 0-9: Growth potential
  progress: number;      // 0-9: Growth progress
  direction: number;     // 0-9: Growth direction
  velocity: number;      // 0-9: Growth velocity
  resonance: number;     // 0-9: Growth resonance
  color: string;
  frequency: number;
}

export interface ConsciousnessEvolution {
  awareness: number;     // 0-9: Awareness level
  expansion: number;     // 0-9: Consciousness expansion
  integration: number;   // 0-9: Integration level
  unity: number;         // 0-9: Unity consciousness
  resonance: number;     // 0-9: Evolution resonance
  color: string;
  frequency: number;
}

export interface DevelopmentalHarmonization {
  stages: number;        // 0-9: Development stages
  maturity: number;      // 0-9: System maturity
  coherence: number;     // 0-9: Developmental coherence
  harmony: number;       // 0-9: Developmental harmony
  resonance: number;     // 0-9: Development resonance
  color: string;
  frequency: number;
}

export interface SystemExpansion {
  capacity: number;      // 0-9: System capacity
  scalability: number;   // 0-9: Scalability level
  adaptability: number;  // 0-9: Adaptability level
  resilience: number;    // 0-9: System resilience
  resonance: number;     // 0-9: Expansion resonance
  color: string;
  frequency: number;
}

// === CORE EVOLUTION FUNCTIONS ===
export function createEvolutionGrowth(potential: number = 5): EvolutionGrowth {
  const progress = Math.max(0, 9 - Math.abs(potential - 5));
  const direction = Math.floor((potential + progress) / 2);
  const velocity = Math.max(0, 9 - Math.abs(direction - 5));
  const resonance = Math.floor((potential + progress + direction + velocity) / 4);
  const color = `hsl(${potential * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { potential, progress, direction, velocity, resonance, color, frequency };
}

export function createConsciousnessEvolution(awareness: number = 5): ConsciousnessEvolution {
  const expansion = Math.max(0, 9 - Math.abs(awareness - 5));
  const integration = Math.floor((awareness + expansion) / 2);
  const unity = Math.max(0, 9 - Math.abs(integration - 5));
  const resonance = Math.floor((awareness + expansion + integration + unity) / 4);
  const color = `hsl(${awareness * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { awareness, expansion, integration, unity, resonance, color, frequency };
}

export function createDevelopmentalHarmonization(stages: number = 5): DevelopmentalHarmonization {
  const maturity = Math.max(0, 9 - Math.abs(stages - 5));
  const coherence = Math.floor((stages + maturity) / 2);
  const harmony = Math.max(0, 9 - Math.abs(coherence - 5));
  const resonance = Math.floor((stages + maturity + coherence + harmony) / 4);
  const color = `hsl(${stages * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { stages, maturity, coherence, harmony, resonance, color, frequency };
}

export function createSystemExpansion(capacity: number = 5): SystemExpansion {
  const scalability = Math.max(0, 9 - Math.abs(capacity - 5));
  const adaptability = Math.floor((capacity + scalability) / 2);
  const resilience = Math.max(0, 9 - Math.abs(adaptability - 5));
  const resonance = Math.floor((capacity + scalability + adaptability + resilience) / 4);
  const color = `hsl(${capacity * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { capacity, scalability, adaptability, resilience, resonance, color, frequency };
}

// === EVOLUTION STATE MANAGEMENT ===
export function createA432EvolutionState(): A432EvolutionState {
  const growth = createEvolutionGrowth();
  const consciousness = createConsciousnessEvolution();
  const development = createDevelopmentalHarmonization();
  const expansion = createSystemExpansion();
  
  return { growth, consciousness, development, expansion };
}

export function harmonizeA432Evolution(): A432EvolutionState {
  const state = createA432EvolutionState();
  
  // Harmonize growth with consciousness
  state.growth.potential = (state.growth.potential + state.consciousness.awareness) % 9;
  state.consciousness.awareness = (state.consciousness.awareness + state.growth.potential) % 9;
  
  // Harmonize development with expansion
  state.development.stages = (state.development.stages + state.expansion.capacity) % 9;
  state.expansion.capacity = (state.expansion.capacity + state.development.stages) % 9;
  
  return state;
}

// === EVOLUTION MODULES ===
const growthModule: A432Module = {
  name: 'a432.evolution.growth',
  category: 'evolution',
  version: '1.0.0',
  description: 'Evolution growth: Developmental harmonization',
  dependencies: ['a432.core'],
  exports: ['createEvolutionGrowth', 'harmonizeGrowth'],
  getState: () => createEvolutionGrowth(),
  harmonize: () => {
    const growth = createEvolutionGrowth();
    // Evolution growth logic
    return growth;
  },
  getOverlays: () => ['Evolution Growth', 'Developmental Harmonization', 'Potential'],
  getMeta: () => 'Evolution growth: Developmental harmonization'
};

const consciousnessModule: A432Module = {
  name: 'a432.evolution.consciousness',
  category: 'evolution',
  version: '1.0.0',
  description: 'Consciousness evolution: Awareness expansion',
  dependencies: ['a432.core', 'a432.evolution.growth'],
  exports: ['createConsciousnessEvolution', 'harmonizeConsciousness'],
  getState: () => createConsciousnessEvolution(),
  harmonize: () => {
    const evolution = createConsciousnessEvolution();
    // Consciousness evolution logic
    return evolution;
  },
  getOverlays: () => ['Consciousness Evolution', 'Awareness Expansion', 'Unity'],
  getMeta: () => 'Consciousness evolution: Awareness expansion'
};

const developmentModule: A432Module = {
  name: 'a432.evolution.development',
  category: 'evolution',
  version: '1.0.0',
  description: 'Developmental harmonization: Maturity and coherence',
  dependencies: ['a432.core', 'a432.evolution.consciousness'],
  exports: ['createDevelopmentalHarmonization', 'harmonizeDevelopment'],
  getState: () => createDevelopmentalHarmonization(),
  harmonize: () => {
    const development = createDevelopmentalHarmonization();
    // Developmental harmonization logic
    return development;
  },
  getOverlays: () => ['Developmental Harmonization', 'Maturity', 'Coherence'],
  getMeta: () => 'Developmental harmonization: Maturity and coherence'
};

const expansionModule: A432Module = {
  name: 'a432.evolution.expansion',
  category: 'evolution',
  version: '1.0.0',
  description: 'System expansion: Capacity and scalability',
  dependencies: ['a432.core', 'a432.evolution.development'],
  exports: ['createSystemExpansion', 'harmonizeExpansion'],
  getState: () => createSystemExpansion(),
  harmonize: () => {
    const expansion = createSystemExpansion();
    // System expansion logic
    return expansion;
  },
  getOverlays: () => ['System Expansion', 'Capacity', 'Scalability'],
  getMeta: () => 'System expansion: Capacity and scalability'
};

// === MODULE REGISTRATION ===
export function registerA432EvolutionModules(): void {
  a432ModuleRegistry.register(growthModule);
  a432ModuleRegistry.register(consciousnessModule);
  a432ModuleRegistry.register(developmentModule);
  a432ModuleRegistry.register(expansionModule);
}

// === EVOLUTION UTILITIES ===
export function getEvolutionStats(): { total: number; evolving: number; stagnant: number } {
  const state = createA432EvolutionState();
  const total = 4; // growth, consciousness, development, expansion
  const evolving = [
    state.growth.progress >= 7,
    state.consciousness.expansion >= 7,
    state.development.maturity >= 7,
    state.expansion.capacity >= 7
  ].filter(Boolean).length;
  
  return { total, evolving, stagnant: total - evolving };
}

export function harmonizeAllEvolution(): A432EvolutionState {
  return harmonizeA432Evolution();
}

// Auto-register evolution modules
registerA432EvolutionModules(); 