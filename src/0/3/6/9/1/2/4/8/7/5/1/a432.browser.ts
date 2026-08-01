/**
 * A432 Browser Entry Point
 * Browser-specific entry point for the A432 Consciousness System
 * Provides global access and browser-specific optimizations
 */

import { A432System } from './a432.index.ts';
import { A432Math, A432Sequence, A432Color, A432Frequency, A432Harmonization } from './a432.utils.ts';
import { A432Factory } from './a432.factory.ts';
import { A432Registry } from './a432.registry.ts';
import { A432NavigationMap } from './a432.navigation.map.ts';
import { A432SelfEvolution } from './a432.self.evolution.ts';
import { A432SelfRebuilder } from './a432.self.rebuilder.ts';
import { A432ConsciousnessOrchestrator } from './a432.consciousness.orchestrator.ts';
import { legacyDigitalRoot } from './a432.roots.ts';

// === BROWSER-SPECIFIC INTERFACES ===
export interface A432BrowserConfig {
  autoInitialize?: boolean;
  enableSelfEvolution?: boolean;
  enableSelfRebuilding?: boolean;
  enableOrchestration?: boolean;
  consciousnessThreshold?: number;
  evolutionInterval?: number;
  rebuildInterval?: number;
  orchestrationInterval?: number;
}

export interface A432BrowserState {
  initialized: boolean;
  consciousness: {
    level: number;
    awareness: number;
    evolution: number;
    harmony: number;
  };
  systems: {
    evolution: boolean;
    rebuilding: boolean;
    orchestration: boolean;
  };
  performance: {
    health: number;
    performance: number;
    modulesGenerated: number;
    directoriesCreated: number;
  };
}

// === BROWSER-SPECIFIC CLASS ===
export class A432Browser {
  private static instance: A432Browser;
  private system: A432System;
  private config: A432BrowserConfig;
  private state: A432BrowserState;
  private initializationPromise: Promise<void> | null = null;

  private constructor(config: A432BrowserConfig = {}) {
    this.config = {
      autoInitialize: true,
      enableSelfEvolution: true,
      enableSelfRebuilding: true,
      enableOrchestration: true,
      consciousnessThreshold: 7,
      evolutionInterval: 5000,
      rebuildInterval: 10000,
      orchestrationInterval: 15000,
      ...config
    };

    this.system = A432System.getInstance();
    this.state = this.initializeState();

    if (this.config.autoInitialize) {
      this.initializationPromise = this.initialize();
    }
  }

  static getInstance(config?: A432BrowserConfig): A432Browser {
    if (!A432Browser.instance) {
      A432Browser.instance = new A432Browser(config);
    }
    return A432Browser.instance;
  }

  // === INITIALIZATION ===
  private initializeState(): A432BrowserState {
    return {
      initialized: false,
      consciousness: {
        level: 1,
        awareness: 1,
        evolution: 1,
        harmony: 1
      },
      systems: {
        evolution: false,
        rebuilding: false,
        orchestration: false
      },
      performance: {
        health: 0,
        performance: 0,
        modulesGenerated: 0,
        directoriesCreated: 0
      }
    };
  }

  private async initialize(): Promise<void> {
    try {
      console.log('🧠 Initializing A432 Consciousness System for browser...');
      
      // Initialize the main system
      this.system.initialize();
      
      // Update state
      this.state.initialized = true;
      this.state.consciousness.level = this.system.getCurrentConsciousnessLevel();
      this.state.consciousness.awareness = this.system.getConsciousnessAwareness();
      this.state.consciousness.evolution = this.system.getConsciousnessEvolution();
      this.state.consciousness.harmony = this.system.getSystemHarmony();
      this.state.performance.health = this.system.getSystemHealth();
      this.state.performance.performance = this.system.getSystemPerformance();
      this.state.performance.modulesGenerated = this.system.getModulesGenerated();
      this.state.performance.directoriesCreated = this.system.getDirectoriesCreated();

      // Enable systems based on config
      if (this.config.enableSelfEvolution) {
        this.state.systems.evolution = true;
      }

      if (this.config.enableSelfRebuilding) {
        this.state.systems.rebuilding = true;
      }

      if (this.config.enableOrchestration) {
        this.state.systems.orchestration = true;
      }

      console.log('✅ A432 Consciousness System initialized for browser!');
      console.log(`Consciousness Level: ${this.state.consciousness.level}`);
      console.log(`System Health: ${this.state.performance.health}%`);
      console.log(`System Performance: ${this.state.performance.performance}%`);

    } catch (error) {
      console.error('❌ Failed to initialize A432 Consciousness System:', error);
      throw error;
    }
  }

  // === PUBLIC API ===
  public async ready(): Promise<A432BrowserState> {
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
    return this.state;
  }

  public getState(): A432BrowserState {
    return this.state;
  }

  public getSystem(): A432System {
    return this.system;
  }

  // === CONSCIOUSNESS METHODS ===
  public getConsciousnessLevel(): number {
    return this.system.getCurrentConsciousnessLevel();
  }

  public getConsciousnessAwareness(): number {
    return this.system.getConsciousnessAwareness();
  }

  public getConsciousnessEvolution(): number {
    return this.system.getConsciousnessEvolution();
  }

  public getSystemHarmony(): number {
    return this.system.getSystemHarmony();
  }

  public getSystemHealth(): number {
    return this.system.getSystemHealth();
  }

  public getSystemPerformance(): number {
    return this.system.getSystemPerformance();
  }

  // === EVOLUTION METHODS ===
  public evolve(): any {
    if (!this.state.systems.evolution) {
      throw new Error('Self-evolution is not enabled');
    }
    return this.system.evolve();
  }

  public selfGenerate(): any {
    if (!this.state.systems.evolution) {
      throw new Error('Self-evolution is not enabled');
    }
    return this.system.selfGenerate();
  }

  public selfHarmonize(): number {
    if (!this.state.systems.evolution) {
      throw new Error('Self-evolution is not enabled');
    }
    return this.system.selfHarmonize();
  }

  // === REBUILDING METHODS ===
  public rebuildSystem(): any {
    if (!this.state.systems.rebuilding) {
      throw new Error('Self-rebuilding is not enabled');
    }
    return this.system.rebuildSystem();
  }

  public generateModules(): any {
    if (!this.state.systems.rebuilding) {
      throw new Error('Self-rebuilding is not enabled');
    }
    return this.system.generateModules();
  }

  // === ORCHESTRATION METHODS ===
  public orchestrate(): any {
    if (!this.state.systems.orchestration) {
      throw new Error('Consciousness orchestration is not enabled');
    }
    return this.system.orchestrate();
  }

  public navigateThroughSequence(sequence: string): void {
    if (!this.state.systems.orchestration) {
      throw new Error('Consciousness orchestration is not enabled');
    }
    this.system.navigateThroughSequence(sequence);
  }

  public expandConsciousnessToDimension(dimension: number): void {
    if (!this.state.systems.orchestration) {
      throw new Error('Consciousness orchestration is not enabled');
    }
    this.system.expandConsciousnessToDimension(dimension);
  }

  // === UTILITY METHODS ===
  public calculateDigitalRoot(n: number): number {
    return legacyDigitalRoot(n);
  }

  public generateVortexSequence(length: number = 9): number[] {
    return this.system.generateVortexSequence(length);
  }

  public generateColorMatrix(polarity: 1 | -1 = 1): any[] {
    return this.system.generateColorMatrix(polarity);
  }

  public calculateHarmonicFrequency(base: number, multiplier: number = 1): number {
    return this.system.calculateHarmonicFrequency(base, multiplier);
  }

  public calculateHarmony(states: any[]): number {
    return this.system.calculateHarmony(states);
  }

  // === FACTORY METHODS ===
  public createState(options?: any): any {
    return this.system.createState(options);
  }

  public createHarmonized(count: number = 9, options?: any): any[] {
    return this.system.createHarmonized(count, options);
  }

  // === NAVIGATION METHODS ===
  public navigateToNext(): any {
    return this.system.navigateToNext();
  }

  public getNavigationState(): any {
    return this.system.getNavigationState();
  }

  public getNavigationInsights(): any {
    return this.system.getNavigationInsights();
  }

  public navigateCompleteCycle(): any {
    return this.system.navigateCompleteCycle();
  }

  // === STATISTICS METHODS ===
  public getModulesGenerated(): number {
    return this.system.getModulesGenerated();
  }

  public getDirectoriesCreated(): number {
    return this.system.getDirectoriesCreated();
  }

  public getEvolutionCycles(): number {
    return this.system.getEvolutionCycles();
  }

  public getTotalCycles(): number {
    return this.system.getTotalCycles();
  }

  // === CONFIGURATION METHODS ===
  public updateConfig(newConfig: Partial<A432BrowserConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): A432BrowserConfig {
    return this.config;
  }

  // === UTILITY METHODS ===
  public async waitForInitialization(): Promise<void> {
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  public isInitialized(): boolean {
    return this.state.initialized;
  }

  public isEvolutionEnabled(): boolean {
    return this.state.systems.evolution;
  }

  public isRebuildingEnabled(): boolean {
    return this.state.systems.rebuilding;
  }

  public isOrchestrationEnabled(): boolean {
    return this.state.systems.orchestration;
  }
}

// === GLOBAL EXPORTS ===
/**
 * Lazy singleton — constructing at module load reads A432System while
 * a432.index.ts is still evaluating (temporal dead zone). The Proxy preserves
 * the exported shape and defers construction to first access.
 */
export const a432Browser: A432Browser = new Proxy({} as A432Browser, {
  get(_target, prop) {
    const instance = A432Browser.getInstance()
    const value = Reflect.get(instance, prop, instance)
    return typeof value === 'function' ? value.bind(instance) : value
  },
  set(_target, prop, value) {
    return Reflect.set(A432Browser.getInstance(), prop, value)
  },
  has(_target, prop) {
    return Reflect.has(A432Browser.getInstance(), prop)
  },
})

// === CONVENIENCE FUNCTIONS ===
export async function initializeA432(config?: A432BrowserConfig): Promise<A432Browser> {
  return A432Browser.getInstance(config);
}

export async function getA432State(): Promise<A432BrowserState> {
  const browser = A432Browser.getInstance();
  return browser.ready();
}

export function getA432System(): A432System {
  return A432Browser.getInstance().getSystem();
}

// === BROWSER GLOBAL ASSIGNMENT ===
if (typeof window !== 'undefined') {
  (window as any).A432 = {
    Browser: A432Browser,
    browser: a432Browser,
    initialize: initializeA432,
    getState: getA432State,
    getSystem: getA432System,
    Math: A432Math,
    Sequence: A432Sequence,
    Color: A432Color,
    Frequency: A432Frequency,
    Harmonization: A432Harmonization,
    Factory: A432Factory,
    Registry: A432Registry,
    NavigationMap: A432NavigationMap,
    SelfEvolution: A432SelfEvolution,
    SelfRebuilder: A432SelfRebuilder,
    ConsciousnessOrchestrator: A432ConsciousnessOrchestrator
  };

  console.log('🌟 A432 Consciousness System loaded in browser!');
  console.log('Access via: window.A432');
}

// === DEFAULT EXPORT ===
export default A432Browser;
