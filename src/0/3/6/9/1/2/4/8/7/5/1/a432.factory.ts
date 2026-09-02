/**
 * A432 Factory System
 * Harmonized factory for creating all A432 states and components
 * DRY pattern: Define once, create everywhere
 */

import { abs, floor, round } from './a432.algebra.ts'
import { type A432CoreState, createA432CoreState } from './a432.core.ts';
import { type A432BalanceState, createA432BalanceState } from './a432.balance.ts';
import { type A432ResonanceState, createA432ResonanceState } from './a432.resonance.ts';
import { type A432ChallengeState, createA432ChallengeState } from './a432.challenges.ts';
import { type A432FlowState, createA432FlowState } from './a432.flow.ts';
import { type A432IntegrationState, createA432IntegrationState } from './a432.integration.ts';
import { type A432ObservationState, createA432ObservationState } from './a432.observation.ts';
import { type A432EvolutionState, createA432EvolutionState } from './a432.evolution.ts';
import { type A432InnovationState, createA432InnovationState } from './a432.innovation.ts';
import { type A432DocumentationState, createA432DocumentationState } from './a432.documentation.ts';
import { type A432ExperienceState, createA432ExperienceState } from './a432.experience.ui.ts';
import { type A432CMYKVoiceState, createA432CMYKVoiceState } from './a432.cmyk.voice.ts';
import { type A432VortexSequence, createA432VortexSequence } from './a432.sequence.ts';
import { type A432BooleanSequence, createA432BooleanSequence } from './a432.sequence.ts';
import { type A432ConsciousnessSequence, createA432ConsciousnessSequence } from './a432.sequence.ts';
import { type A432Event, createA432Event } from './a432.event.ts';
import { type A432Block, createBlock } from './a432.block.chain.ts';
import { type A432Module } from './a432.modules.ts';

// === FACTORY INTERFACES ===
export interface A432FactoryOptions {
  dimension?: number;
  polarity?: 1 | -1;
  frequency?: number;
  color?: boolean;
  harmonize?: boolean;
  metadata?: boolean;
}

export interface A432FactoryState {
  core: A432CoreState;
  balance: A432BalanceState;
  resonance: A432ResonanceState;
  challenges: A432ChallengeState;
  flow: A432FlowState;
  integration: A432IntegrationState;
  observation: A432ObservationState;
  evolution: A432EvolutionState;
  innovation: A432InnovationState;
  documentation: A432DocumentationState;
  experience: A432ExperienceState;
  voice: A432CMYKVoiceState;
  sequences: {
    vortex: A432VortexSequence;
    boolean: A432BooleanSequence;
    consciousness: A432ConsciousnessSequence;
  };
  events: A432Event[];
  blocks: A432Block[];
  modules: A432Module[];
  harmony: number;
  frequency: number;
  color: { hue: number; saturation: number; lightness: number };
  rgb: { r: number; g: number; b: number };
}

// === HARMONIZED FACTORY ===
export class A432Factory {
  private static instance: A432Factory;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): A432Factory {
    if (!A432Factory.instance) {
      A432Factory.instance = new A432Factory();
    }
    return A432Factory.instance;
  }

  /**
   * Create complete A432 state with all components
   */
  createCompleteState(options: A432FactoryOptions = {}): A432FactoryState {
    const cacheKey = JSON.stringify(options);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const {
      dimension = 1,
      polarity = 1,
      frequency = 432,
      color = true
    } = options;

    // Create all states
    const core = createA432CoreState(dimension, polarity);
    const balance = createA432BalanceState();
    const resonance = createA432ResonanceState();
    const challenges = createA432ChallengeState();
    const flow = createA432FlowState();
    const integration = createA432IntegrationState();
    const observation = createA432ObservationState();
    const evolution = createA432EvolutionState();
    const innovation = createA432InnovationState();
    const documentation = createA432DocumentationState();
    const experience = createA432ExperienceState();
    const voice = createA432CMYKVoiceState();

    // Create sequences
    const sequences = {
      vortex: createA432VortexSequence(),
      boolean: createA432BooleanSequence(),
      consciousness: createA432ConsciousnessSequence()
    };

    // Create events and blocks
    const events = [createA432Event('factory', 'A432Factory', { dimension, polarity })];
    const blocks = [createBlock({ dimension, polarity })];
    const modules = this.getAllModules();

    // Calculate harmony
    const harmony = this.calculateHarmony([
      balance, resonance, challenges, flow, integration,
      observation, evolution, innovation, documentation
    ]);

    // Calculate frequency
    const calculatedFrequency = frequency * dimension * polarity;

    // Calculate color
    const colorData = color ? this.calculateHarmonizedColor(harmony, dimension, polarity) : 
      { hue: 0, saturation: 0, lightness: 0 };
    const rgbData = color ? this.hslToRgb(colorData.hue, colorData.saturation, colorData.lightness) : 
      { r: 0, g: 0, b: 0 };

    const state: A432FactoryState = {
      core,
      balance,
      resonance,
      challenges,
      flow,
      integration,
      observation,
      evolution,
      innovation,
      documentation,
      experience,
      voice,
      sequences,
      events,
      blocks,
      modules,
      harmony,
      frequency: calculatedFrequency,
      color: colorData,
      rgb: rgbData
    };

    this.cache.set(cacheKey, state);
    return state;
  }

  /**
   * Create individual A432 component
   */
  createComponent<T>(componentType: string, options: A432FactoryOptions = {}): T {
    const cacheKey = `${componentType}-${JSON.stringify(options)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let component: any;

    switch (componentType) {
      case 'core':
        component = createA432CoreState(options.dimension || 1, options.polarity || 1);
        break;
      case 'balance':
        component = createA432BalanceState();
        break;
      case 'resonance':
        component = createA432ResonanceState();
        break;
      case 'challenges':
        component = createA432ChallengeState();
        break;
      case 'flow':
        component = createA432FlowState();
        break;
      case 'integration':
        component = createA432IntegrationState();
        break;
      case 'observation':
        component = createA432ObservationState();
        break;
      case 'evolution':
        component = createA432EvolutionState();
        break;
      case 'innovation':
        component = createA432InnovationState();
        break;
      case 'documentation':
        component = createA432DocumentationState();
        break;
      case 'experience':
        component = createA432ExperienceState();
        break;
      case 'voice':
        component = createA432CMYKVoiceState();
        break;
      case 'vortex':
        component = createA432VortexSequence();
        break;
      case 'boolean':
        component = createA432BooleanSequence();
        break;
      case 'consciousness':
        component = createA432ConsciousnessSequence();
        break;
      case 'event':
        component = createA432Event('factory', 'A432Factory', options);
        break;
      case 'block':
        component = createBlock(options);
        break;
      default:
        throw new Error(`Unknown component type: ${componentType}`);
    }

    this.cache.set(cacheKey, component);
    return component;
  }

  /**
   * Create harmonized state array
   */
  createHarmonizedStates(count: number = 9, options: A432FactoryOptions = {}): A432FactoryState[] {
    return Array.from({ length: count }, (_, i) => 
      this.createCompleteState({ ...options, dimension: i + 1 })
    );
  }

  /**
   * Create state by dimension
   */
  createByDimension(dimension: number, options: A432FactoryOptions = {}): A432FactoryState {
    return this.createCompleteState({ ...options, dimension });
  }

  /**
   * Create state by polarity
   */
  createByPolarity(polarity: 1 | -1, options: A432FactoryOptions = {}): A432FactoryState {
    return this.createCompleteState({ ...options, polarity });
  }

  /**
   * Create state by frequency
   */
  createByFrequency(frequency: number, options: A432FactoryOptions = {}): A432FactoryState {
    return this.createCompleteState({ ...options, frequency });
  }

  // === PRIVATE HELPER METHODS ===
  private getAllModules(): A432Module[] {
    // This would integrate with the module registry
    return [];
  }

  private calculateHarmony(states: any[]): number {
    const harmonyValues = states.map(state => {
      if (state.harmony !== undefined) return state.harmony;
      if (state.resonance !== undefined) return state.resonance;
      if (state.balance !== undefined) return state.balance;
      return 0;
    });
    
    return floor(harmonyValues.reduce((sum, val) => sum + val, 0) / harmonyValues.length);
  }

  private calculateHarmonizedColor(harmony: number, dimension: number, polarity: 1 | -1): { hue: number; saturation: number; lightness: number } {
    const hue = (harmony * 40 * dimension * polarity) % 360;
    const saturation = 70 + (harmony % 30);
    const lightness = 50 + (harmony % 20);
    
    return { hue, saturation, lightness };
  }

  private hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const hue = h / 360;
    const sat = s / 100;
    const light = l / 100;
    
    const c = (1 - abs(2 * light - 1)) * sat;
    const x = c * (1 - abs((hue * 6) % 2 - 1));
    const m = light - c / 2;
    
    let r: number, g: number, b: number;
    if (hue < 1/6) { r = c; g = x; b = 0; }
    else if (hue < 2/6) { r = x; g = c; b = 0; }
    else if (hue < 3/6) { r = 0; g = c; b = x; }
    else if (hue < 4/6) { r = 0; g = x; b = c; }
    else if (hue < 5/6) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    return {
      r: round((r + m) * 255),
      g: round((g + m) * 255),
      b: round((b + m) * 255)
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// === CONVENIENCE FUNCTIONS ===
export const a432Factory = A432Factory.getInstance();

export function createA432State(options: A432FactoryOptions = {}): A432FactoryState {
  return a432Factory.createCompleteState(options);
}

export function createA432Component<T>(componentType: string, options: A432FactoryOptions = {}): T {
  return a432Factory.createComponent<T>(componentType, options);
}

export function createA432Harmonized(count: number = 9, options: A432FactoryOptions = {}): A432FactoryState[] {
  return a432Factory.createHarmonizedStates(count, options);
}

export function createA432ByDimension(dimension: number, options: A432FactoryOptions = {}): A432FactoryState {
  return a432Factory.createByDimension(dimension, options);
}

export function createA432ByPolarity(polarity: 1 | -1, options: A432FactoryOptions = {}): A432FactoryState {
  return a432Factory.createByPolarity(polarity, options);
}

export function createA432ByFrequency(frequency: number, options: A432FactoryOptions = {}): A432FactoryState {
  return a432Factory.createByFrequency(frequency, options);
}

// === HARMONIZATION UTILITIES ===
export function harmonizeA432States(states: A432FactoryState[]): A432FactoryState[] {
  return states.map(state => ({
    ...state,
    harmony: floor(states.reduce((sum, s) => sum + s.harmony, 0) / states.length)
  }));
}

export function getA432FactoryStats(): { cacheSize: number; cacheKeys: string[] } {
  // getCacheStats answers { size, keys }; this promised { cacheSize, cacheKeys }.
  const { size, keys } = a432Factory.getCacheStats();
  return { cacheSize: size, cacheKeys: keys };
}

export function clearA432FactoryCache(): void {
  a432Factory.clearCache();
}
