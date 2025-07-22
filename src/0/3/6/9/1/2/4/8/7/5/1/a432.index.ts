/**
 * a432.index.ts — Main Entry Point
 * 
 * DRY-harmonized main entry point for the A432 system.
 * Exports all core functionality and provides a clean public API.
 * All modules are harmonized and accessible through this single interface.
 */

// === CORE EXPORTS ===
export * from './a432.core';
export * from './a432.modules';
export * from './a432.harmonizer';

// === SYSTEM INITIALIZATION ===
import { initializeA432Harmonizer, harmonizeA432System } from './a432.harmonizer';
import { a432ModuleRegistry } from './a432.modules';
import { harmonizeA432Core, getA432CoreMeta } from './a432.core';

// === PUBLIC API ===
export class A432System {
  private static instance: A432System;
  private initialized = false;

  private constructor() {}

  static getInstance(): A432System {
    if (!A432System.instance) {
      A432System.instance = new A432System();
    }
    return A432System.instance;
  }

  // === INITIALIZATION ===
  initialize(): void {
    if (this.initialized) return;
    
    initializeA432Harmonizer();
    this.initialized = true;
  }

  // === CORE OPERATIONS ===
  harmonize(strategy: 'sequential' | 'parallel' | 'dependency' | 'category' | 'recursive' | 'meta' = 'meta'): any {
    this.initialize();
    return harmonizeA432System(strategy);
  }

  getCoreState(): any {
    return harmonizeA432Core();
  }

  getCoreMeta(): string {
    return getA432CoreMeta();
  }

  // === MODULE MANAGEMENT ===
  getModules(): any[] {
    return a432ModuleRegistry.getAllModules();
  }

  getModulesByCategory(category: string): any[] {
    return a432ModuleRegistry.getModulesByCategory(category as any);
  }

  getModule(name: string): any {
    return a432ModuleRegistry.getModule(name);
  }

  // === STATISTICS ===
  getStats(): any {
    return a432ModuleRegistry.getModuleStats();
  }

  // === UTILITIES ===
  isInitialized(): boolean {
    return this.initialized;
  }
}

// === GLOBAL INSTANCE ===
export const a432 = A432System.getInstance();

// === CONVENIENCE EXPORTS ===
export const A432 = {
  // Core functions
  frequency: (dimension: number, polarity: 1 | -1 = 1) => import('./a432.core').then(m => m.a432Frequency(dimension, polarity)),
  color: (root: number, polarity: 1 | -1 = 1) => import('./a432.core').then(m => m.a432HSLFromRoot(root, polarity)),
  trinity: () => import('./a432.core').then(m => m.A432_TRINITY),
  cycle: () => import('./a432.core').then(m => m.A432_CYCLE),
  
  // System functions
  harmonize: (strategy?: any) => a432.harmonize(strategy),
  getState: () => a432.getCoreState(),
  getMeta: () => a432.getCoreMeta(),
  getModules: () => a432.getModules(),
  getStats: () => a432.getStats(),
  
  // Module functions
  getModule: (name: string) => a432.getModule(name),
  getModulesByCategory: (category: string) => a432.getModulesByCategory(category),
  
  // Utility functions
  isInitialized: () => a432.isInitialized(),
  initialize: () => a432.initialize()
};

// === DEFAULT EXPORT ===
export default A432;

// === AUTO-INITIALIZATION ===
if (typeof window !== 'undefined') {
  // Browser environment - auto-initialize
  window.addEventListener('DOMContentLoaded', () => {
    a432.initialize();
  });
} else {
  // Node.js environment - auto-initialize
  a432.initialize();
} 