/**
 * a432.index.ts — Main Entry Point
 * 
 * Main entry point for the A432 system.
 * Exports all core functionality and provides clean public API.
 * Auto-initialization for browser and Node.js environments.
 */

export * from './a432.core';
export * from './a432.modules';
export * from './a432.harmonizer';
export * from './a432.balance';
export * from './a432.resonance';
export * from './a432.challenges';
export * from './a432.flow';
export * from './a432.integration';
export * from './a432.observation';
export * from './a432.evolution';
export * from './a432.documentation';
export * from './a432.innovation';

import { initializeA432Harmonizer, harmonizeA432System } from './a432.harmonizer';
import { a432ModuleRegistry } from './a432.modules';
import { harmonizeA432Core, getA432CoreMeta } from './a432.core';
import { registerA432BalanceModules, harmonizeAllBalance } from './a432.balance';
import { registerA432ResonanceModules, harmonizeAllResonance } from './a432.resonance';
import { registerA432ChallengeModules, harmonizeAllChallenges } from './a432.challenges';
import { registerA432FlowModules, harmonizeAllFlow } from './a432.flow';
import { registerA432IntegrationModules, harmonizeAllIntegration } from './a432.integration';
import { registerA432ObservationModules, harmonizeAllObservation } from './a432.observation';
import { registerA432EvolutionModules, harmonizeAllEvolution } from './a432.evolution';
import { registerA432DocumentationModules, harmonizeAllDocumentation } from './a432.documentation';
import { registerA432InnovationModules, harmonizeAllInnovation } from './a432.innovation';

// === A432 SYSTEM CLASS ===
export class A432System {
  private static instance: A432System;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): A432System {
    if (!A432System.instance) {
      A432System.instance = new A432System();
    }
    return A432System.instance;
  }

  initialize(): void {
    if (this.initialized) return;
    
    // Initialize harmonizer
    initializeA432Harmonizer();
    
    // Register all expansion modules
    registerA432BalanceModules();
    registerA432ResonanceModules();
    registerA432ChallengeModules();
    registerA432FlowModules();
    registerA432IntegrationModules();
    registerA432ObservationModules();
    registerA432EvolutionModules();
    registerA432DocumentationModules();
    registerA432InnovationModules();
    
    this.initialized = true;
    console.log('A432 System initialized with expansion modules');
  }

  harmonize(strategy: string = 'meta'): any {
    return harmonizeA432System(strategy as any);
  }

  getCoreState(): any {
    return harmonizeA432Core();
  }

  getModules(): any[] {
    return a432ModuleRegistry.getAllModules();
  }

  getBalance(): any {
    return harmonizeAllBalance();
  }

  getResonance(): any {
    return harmonizeAllResonance();
  }

  getChallenges(): any {
    return harmonizeAllChallenges();
  }

  getFlow(): any {
    return harmonizeAllFlow();
  }

  getIntegration(): any {
    return harmonizeAllIntegration();
  }

  getObservation(): any {
    return harmonizeAllObservation();
  }

  getEvolution(): any {
    return harmonizeAllEvolution();
  }

  getDocumentation(): any {
    return harmonizeAllDocumentation();
  }

  getInnovation(): any {
    return harmonizeAllInnovation();
  }

  getMeta(): string {
    return getA432CoreMeta();
  }
}

// === SINGLETON INSTANCE ===
export const a432 = A432System.getInstance();

// === CONVENIENCE EXPORTS ===
export const A432 = {
  // Core functions
  core: {
    harmonize: harmonizeA432Core,
    getMeta: getA432CoreMeta
  },
  
  // System functions
  system: {
    initialize: () => a432.initialize(),
    harmonize: (strategy?: string) => a432.harmonize(strategy),
    getCoreState: () => a432.getCoreState(),
    getModules: () => a432.getModules(),
    getMeta: () => a432.getMeta()
  },
  
  // Expansion modules
  balance: {
    harmonize: () => a432.getBalance()
  },
  
  resonance: {
    harmonize: () => a432.getResonance()
  },
  
  challenges: {
    harmonize: () => a432.getChallenges()
  },
  
  flow: {
    harmonize: () => a432.getFlow()
  },
  
  integration: {
    harmonize: () => a432.getIntegration()
  },
  
  observation: {
    harmonize: () => a432.getObservation()
  },
  
  evolution: {
    harmonize: () => a432.getEvolution()
  },

  documentation: {
    harmonize: () => a432.getDocumentation()
  },

  innovation: {
    harmonize: () => a432.getInnovation()
  }
};

export default A432;

// === AUTO-INITIALIZATION ===
if (typeof window !== 'undefined') {
  (window as any).addEventListener('DOMContentLoaded', () => {
    a432.initialize();
  });
} else {
  a432.initialize();
} 