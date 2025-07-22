/**
 * a432.modules.ts — Modular Registry System
 * 
 * DRY-harmonized module registry for the A432 system.
 * All modules are categorized and managed through this central registry.
 * Provides clean interfaces for module discovery, harmonization, and interaction.
 */

import { A432CoreState, createA432CoreState, harmonizeA432Core, getA432CoreMeta } from './a432.core';

// === MODULE CATEGORIES ===
export type A432ModuleCategory = 
  | 'core' 
  | 'trinity' 
  | 'consciousness' 
  | 'harmony' 
  | 'visualization' 
  | 'interaction' 
  | 'system' 
  | 'meta'
  | 'balance'           // NEW: Equilibrium and balance modules
  | 'resonance'         // NEW: Frequency and resonance modules
  | 'flow'              // NEW: Stream and flow modules
  | 'integration'       // NEW: Cross-module integration
  | 'transformation'    // NEW: State transformation modules
  | 'observation'       // NEW: Meta-observation and monitoring
  | 'healing'           // NEW: Healing and restoration modules
  | 'evolution'         // NEW: Growth and evolution modules
  | 'documentation'     // NEW: Documentation and auto-generation modules
  | 'innovation'        // NEW: Innovation and breakthrough modules
  | 'voice';            // NEW: Voice and audio harmonization modules

// === MODULE INTERFACE ===
export interface A432Module {
  name: string;
  category: A432ModuleCategory;
  version: string;
  description: string;
  dependencies: string[];
  exports: string[];
  getState: () => any;
  harmonize?: () => void;
  getOverlays?: () => string[];
  getMeta?: () => string;
  onEvent?: (event: any) => void;
}

// === MODULE REGISTRY ===
class A432ModuleRegistry {
  private modules: Map<string, A432Module> = new Map();
  private categories: Map<A432ModuleCategory, Set<string>> = new Map();

  constructor() {
    // Initialize category sets
    const categories: A432ModuleCategory[] = ['core', 'trinity', 'consciousness', 'harmony', 'visualization', 'interaction', 'system', 'meta'];
    categories.forEach(cat => this.categories.set(cat, new Set()));
  }

  // === REGISTRATION ===
  register(module: A432Module): void {
    this.modules.set(module.name, module);
    const categorySet = this.categories.get(module.category);
    if (categorySet) {
      categorySet.add(module.name);
    }
  }

  unregister(name: string): boolean {
    const module = this.modules.get(name);
    if (module) {
      const categorySet = this.categories.get(module.category);
      if (categorySet) {
        categorySet.delete(name);
      }
      return this.modules.delete(name);
    }
    return false;
  }

  // === DISCOVERY ===
  getModule(name: string): A432Module | undefined {
    return this.modules.get(name);
  }

  getModulesByCategory(category: A432ModuleCategory): A432Module[] {
    const categorySet = this.categories.get(category);
    if (!categorySet) return [];
    return Array.from(categorySet)
      .map(name => this.modules.get(name))
      .filter((m): m is A432Module => m !== undefined);
  }

  getAllModules(): A432Module[] {
    return Array.from(this.modules.values());
  }

  getCategories(): A432ModuleCategory[] {
    return Array.from(this.categories.keys());
  }

  // === HARMONIZATION ===
  harmonizeAll(): void {
    this.modules.forEach(module => {
      if (module.harmonize) {
        try {
          module.harmonize();
        } catch (error) {
          console.error(`Harmonization failed for module ${module.name}:`, error);
        }
      }
    });
  }

  harmonizeCategory(category: A432ModuleCategory): void {
    const modules = this.getModulesByCategory(category);
    modules.forEach(module => {
      if (module.harmonize) {
        try {
          module.harmonize();
        } catch (error) {
          console.error(`Harmonization failed for module ${module.name}:`, error);
        }
      }
    });
  }

  // === OVERLAYS ===
  getAllOverlays(): string[] {
    const overlays: string[] = [];
    this.modules.forEach(module => {
      if (module.getOverlays) {
        try {
          overlays.push(...module.getOverlays());
        } catch (error) {
          console.error(`Overlay generation failed for module ${module.name}:`, error);
        }
      }
    });
    return overlays;
  }

  getOverlaysByCategory(category: A432ModuleCategory): string[] {
    const modules = this.getModulesByCategory(category);
    const overlays: string[] = [];
    modules.forEach(module => {
      if (module.getOverlays) {
        try {
          overlays.push(...module.getOverlays());
        } catch (error) {
          console.error(`Overlay generation failed for module ${module.name}:`, error);
        }
      }
    });
    return overlays;
  }

  // === META INFORMATION ===
  getAllMeta(): string[] {
    const meta: string[] = [];
    this.modules.forEach(module => {
      if (module.getMeta) {
        try {
          meta.push(module.getMeta());
        } catch (error) {
          console.error(`Meta generation failed for module ${module.name}:`, error);
        }
      }
    });
    return meta;
  }

  getMetaByCategory(category: A432ModuleCategory): string[] {
    const modules = this.getModulesByCategory(category);
    const meta: string[] = [];
    modules.forEach(module => {
      if (module.getMeta) {
        try {
          meta.push(module.getMeta());
        } catch (error) {
          console.error(`Meta generation failed for module ${module.name}:`, error);
        }
      }
    });
    return meta;
  }

  // === EVENT ROUTING ===
  routeEvent(event: any): void {
    this.modules.forEach(module => {
      if (module.onEvent) {
        try {
          module.onEvent(event);
        } catch (error) {
          console.error(`Event handling failed for module ${module.name}:`, error);
        }
      }
    });
  }

  // === DEPENDENCY MANAGEMENT ===
  getDependencies(name: string): string[] {
    const module = this.modules.get(name);
    return module?.dependencies || [];
  }

  getDependents(name: string): string[] {
    const dependents: string[] = [];
    this.modules.forEach(module => {
      if (module.dependencies.includes(name)) {
        dependents.push(module.name);
      }
    });
    return dependents;
  }

  // === MODULE STATISTICS ===
  getModuleStats(): { total: number; byCategory: Record<A432ModuleCategory, number> } {
    const byCategory: Record<A432ModuleCategory, number> = {} as any;
    this.categories.forEach((set, category) => {
      byCategory[category] = set.size;
    });
    return {
      total: this.modules.size,
      byCategory
    };
  }
}

// === GLOBAL REGISTRY INSTANCE ===
export const a432ModuleRegistry = new A432ModuleRegistry();

// === CONVENIENCE FUNCTIONS ===
export function registerA432Module(module: A432Module): void {
  a432ModuleRegistry.register(module);
}

export function getA432Module(name: string): A432Module | undefined {
  return a432ModuleRegistry.getModule(name);
}

export function getA432ModulesByCategory(category: A432ModuleCategory): A432Module[] {
  return a432ModuleRegistry.getModulesByCategory(category);
}

export function harmonizeA432Modules(): void {
  a432ModuleRegistry.harmonizeAll();
}

export function getA432ModuleStats(): { total: number; byCategory: Record<A432ModuleCategory, number> } {
  return a432ModuleRegistry.getModuleStats();
}

// === CORE MODULE REGISTRATION ===
const coreModule: A432Module = {
  name: 'a432.core',
  category: 'core',
  version: '1.0.0',
  description: 'Zero Entropy Harmonic Core - Single source of truth for all a432 constants and functions',
  dependencies: [],
  exports: ['A432_FREQUENCY', 'A432_TRINITY', 'A432_CYCLE', 'nextInteraction', 'digitalRoot', 'a432Frequency', 'a432HSLFromRoot'],
  getState: () => harmonizeA432Core(),
  harmonize: () => harmonizeA432Core(),
  getOverlays: () => [getA432CoreMeta()],
  getMeta: () => getA432CoreMeta(),
  onEvent: (event) => {
    if (event.type === 'harmonize') {
      harmonizeA432Core();
    }
  }
};

// Register the core module
a432ModuleRegistry.register(coreModule); 