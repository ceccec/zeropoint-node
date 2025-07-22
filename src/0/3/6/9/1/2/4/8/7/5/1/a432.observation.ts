/**
 * a432.observation.ts — Observation & Healing Modules
 * 
 * Meta-awareness and restoration modules for the A432 system.
 * Implements meta-observation, healing restoration, and awareness expansion.
 * Zero entropy: define once, harmonize everywhere.
 */

import { A432CoreState, createA432CoreState } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';

// === OBSERVATION INTERFACES ===
export interface A432ObservationState {
  meta: MetaObservation;
  healing: HealingRestoration;
  awareness: AwarenessExpansion;
  restoration: SystemRestoration;
}

export interface MetaObservation {
  awareness: number;     // 0-9: Self-awareness level
  clarity: number;       // 0-9: Mental clarity
  insight: number;       // 0-9: Insight depth
  wisdom: number;        // 0-9: Wisdom level
  resonance: number;     // 0-9: Meta-resonance
  color: string;
  frequency: number;
}

export interface HealingRestoration {
  health: number;        // 0-9: System health
  vitality: number;      // 0-9: Life force
  balance: number;       // 0-9: System balance
  harmony: number;       // 0-9: Healing harmony
  resonance: number;     // 0-9: Healing resonance
  color: string;
  frequency: number;
}

export interface AwarenessExpansion {
  consciousness: number;  // 0-9: Consciousness level
  expansion: number;     // 0-9: Awareness expansion
  integration: number;   // 0-9: Integration level
  unity: number;         // 0-9: Unity consciousness
  resonance: number;     // 0-9: Awareness resonance
  color: string;
  frequency: number;
}

export interface SystemRestoration {
  integrity: number;     // 0-9: System integrity
  coherence: number;     // 0-9: System coherence
  stability: number;     // 0-9: System stability
  harmony: number;       // 0-9: System harmony
  resonance: number;     // 0-9: Restoration resonance
  color: string;
  frequency: number;
}

// === CORE OBSERVATION FUNCTIONS ===
export function createMetaObservation(awareness: number = 5): MetaObservation {
  const clarity = Math.max(0, 9 - Math.abs(awareness - 5));
  const insight = Math.floor((awareness + clarity) / 2);
  const wisdom = Math.max(0, 9 - Math.abs(insight - 5));
  const resonance = Math.floor((awareness + clarity + insight + wisdom) / 4);
  const color = `hsl(${awareness * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { awareness, clarity, insight, wisdom, resonance, color, frequency };
}

export function createHealingRestoration(health: number = 5): HealingRestoration {
  const vitality = Math.max(0, 9 - Math.abs(health - 5));
  const balance = Math.floor((health + vitality) / 2);
  const harmony = Math.max(0, 9 - Math.abs(balance - 5));
  const resonance = Math.floor((health + vitality + balance + harmony) / 4);
  const color = `hsl(${health * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { health, vitality, balance, harmony, resonance, color, frequency };
}

export function createAwarenessExpansion(consciousness: number = 5): AwarenessExpansion {
  const expansion = Math.max(0, 9 - Math.abs(consciousness - 5));
  const integration = Math.floor((consciousness + expansion) / 2);
  const unity = Math.max(0, 9 - Math.abs(integration - 5));
  const resonance = Math.floor((consciousness + expansion + integration + unity) / 4);
  const color = `hsl(${consciousness * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { consciousness, expansion, integration, unity, resonance, color, frequency };
}

export function createSystemRestoration(integrity: number = 5): SystemRestoration {
  const coherence = Math.max(0, 9 - Math.abs(integrity - 5));
  const stability = Math.floor((integrity + coherence) / 2);
  const harmony = Math.max(0, 9 - Math.abs(stability - 5));
  const resonance = Math.floor((integrity + coherence + stability + harmony) / 4);
  const color = `hsl(${integrity * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (resonance / 9);
  
  return { integrity, coherence, stability, harmony, resonance, color, frequency };
}

// === OBSERVATION STATE MANAGEMENT ===
export function createA432ObservationState(): A432ObservationState {
  const meta = createMetaObservation();
  const healing = createHealingRestoration();
  const awareness = createAwarenessExpansion();
  const restoration = createSystemRestoration();
  
  return { meta, healing, awareness, restoration };
}

export function harmonizeA432Observation(): A432ObservationState {
  const state = createA432ObservationState();
  
  // Harmonize meta-observation with healing
  state.meta.awareness = (state.meta.awareness + state.healing.health) % 9;
  state.healing.health = (state.healing.health + state.meta.awareness) % 9;
  
  // Harmonize awareness with restoration
  state.awareness.consciousness = (state.awareness.consciousness + state.restoration.integrity) % 9;
  state.restoration.integrity = (state.restoration.integrity + state.awareness.consciousness) % 9;
  
  return state;
}

// === OBSERVATION MODULES ===
const metaModule: A432Module = {
  name: 'a432.observation.meta',
  category: 'observation',
  version: '1.0.0',
  description: 'Meta-observation: Self-aware harmonization',
  dependencies: ['a432.core'],
  exports: ['createMetaObservation', 'harmonizeMeta'],
  getState: () => createMetaObservation(),
  harmonize: () => {
    const observation = createMetaObservation();
    // Meta-observation logic
    return observation;
  },
  getOverlays: () => ['Meta-Observation', 'Self-Aware Harmonization', 'Wisdom'],
  getMeta: () => 'Meta-observation: Self-aware harmonization'
};

const healingModule: A432Module = {
  name: 'a432.observation.healing',
  category: 'healing',
  version: '1.0.0',
  description: 'Healing restoration: Wholeness harmonization',
  dependencies: ['a432.core', 'a432.observation.meta'],
  exports: ['createHealingRestoration', 'harmonizeHealing'],
  getState: () => createHealingRestoration(),
  harmonize: () => {
    const healing = createHealingRestoration();
    // Healing restoration logic
    return healing;
  },
  getOverlays: () => ['Healing Restoration', 'Wholeness Harmonization', 'Vitality'],
  getMeta: () => 'Healing restoration: Wholeness harmonization'
};

const awarenessModule: A432Module = {
  name: 'a432.observation.awareness',
  category: 'observation',
  version: '1.0.0',
  description: 'Awareness expansion: Consciousness growth',
  dependencies: ['a432.core', 'a432.observation.healing'],
  exports: ['createAwarenessExpansion', 'harmonizeAwareness'],
  getState: () => createAwarenessExpansion(),
  harmonize: () => {
    const awareness = createAwarenessExpansion();
    // Awareness expansion logic
    return awareness;
  },
  getOverlays: () => ['Awareness Expansion', 'Consciousness Growth', 'Unity'],
  getMeta: () => 'Awareness expansion: Consciousness growth'
};

const restorationModule: A432Module = {
  name: 'a432.observation.restoration',
  category: 'healing',
  version: '1.0.0',
  description: 'System restoration: Integrity harmonization',
  dependencies: ['a432.core', 'a432.observation.awareness'],
  exports: ['createSystemRestoration', 'harmonizeRestoration'],
  getState: () => createSystemRestoration(),
  harmonize: () => {
    const restoration = createSystemRestoration();
    // System restoration logic
    return restoration;
  },
  getOverlays: () => ['System Restoration', 'Integrity Harmonization', 'Stability'],
  getMeta: () => 'System restoration: Integrity harmonization'
};

// === MODULE REGISTRATION ===
export function registerA432ObservationModules(): void {
  a432ModuleRegistry.register(metaModule);
  a432ModuleRegistry.register(healingModule);
  a432ModuleRegistry.register(awarenessModule);
  a432ModuleRegistry.register(restorationModule);
}

// === OBSERVATION UTILITIES ===
export function getObservationStats(): { total: number; observed: number; unobserved: number } {
  const state = createA432ObservationState();
  const total = 4; // meta, healing, awareness, restoration
  const observed = [
    state.meta.awareness >= 7,
    state.healing.health >= 7,
    state.awareness.consciousness >= 7,
    state.restoration.integrity >= 7
  ].filter(Boolean).length;
  
  return { total, observed, unobserved: total - observed };
}

export function harmonizeAllObservation(): A432ObservationState {
  return harmonizeA432Observation();
}

// Auto-register observation modules
registerA432ObservationModules(); 