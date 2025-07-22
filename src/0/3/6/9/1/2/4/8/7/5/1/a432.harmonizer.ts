/**
 * a432.harmonizer.ts — DRY Harmonization System
 * 
 * Provides utilities and patterns for harmonizing the a432 system.
 * Implements zero-entropy principles: define once, reuse everywhere.
 * Automatic module discovery, dependency resolution, and harmonization strategies.
 */

import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';
import { A432CoreState, createA432CoreState, harmonizeA432Core } from './a432.core';

// === HARMONIZATION STRATEGIES ===
export type HarmonizationStrategy = 
  | 'sequential' 
  | 'parallel' 
  | 'dependency' 
  | 'category' 
  | 'recursive' 
  | 'meta'
  | 'balance'           // NEW: Balance-based harmonization
  | 'resonance'         // NEW: Frequency-based harmonization
  | 'flow'              // NEW: Stream-based harmonization
  | 'integration'       // NEW: Cross-category integration
  | 'transformation'    // NEW: State transformation harmonization
  | 'observation'       // NEW: Meta-observation harmonization
  | 'healing'           // NEW: Healing-based harmonization
  | 'evolution';        // NEW: Evolutionary harmonization

export interface HarmonizationContext {
  strategy: HarmonizationStrategy;
  depth: number;
  visited: Set<string>;
  results: Map<string, any>;
  errors: Map<string, Error>;
}

// === HARMONIZATION ENGINE ===
class A432Harmonizer {
  private strategies: Map<HarmonizationStrategy, (modules: A432Module[], context: HarmonizationContext) => void> = new Map();

  constructor() {
    this.initializeStrategies();
  }

  private initializeStrategies(): void {
    // Sequential harmonization
    this.strategies.set('sequential', (modules, context) => {
      modules.forEach(module => this.harmonizeModule(module, context));
    });

    // Parallel harmonization
    this.strategies.set('parallel', (modules, context) => {
      const promises = modules.map(module => 
        Promise.resolve().then(() => this.harmonizeModule(module, context))
      );
      Promise.all(promises);
    });

    // Dependency-based harmonization
    this.strategies.set('dependency', (modules, context) => {
      const sorted = this.sortByDependencies(modules);
      sorted.forEach(module => this.harmonizeModule(module, context));
    });

    // Category-based harmonization
    this.strategies.set('category', (modules, context) => {
      const byCategory = this.groupByCategory(modules);
      Object.values(byCategory).forEach(categoryModules => {
        categoryModules.forEach(module => this.harmonizeModule(module, context));
      });
    });

    // Recursive harmonization
    this.strategies.set('recursive', (modules, context) => {
      if (context.depth > 10) return; // Prevent infinite recursion
      modules.forEach(module => {
        this.harmonizeModule(module, context);
        // Recursively harmonize dependents
        const dependents = a432ModuleRegistry.getDependents(module.name);
        const dependentModules = dependents.map(name => a432ModuleRegistry.getModule(name)).filter(Boolean) as A432Module[];
        if (dependentModules.length > 0) {
          const newContext = { ...context, depth: context.depth + 1 };
          this.harmonize(dependentModules, 'recursive', newContext);
        }
      });
    });

    // Meta harmonization
    this.strategies.set('meta', (modules, context) => {
      // Harmonize core first
      const coreModules = modules.filter(m => m.category === 'core');
      coreModules.forEach(module => this.harmonizeModule(module, context));
      
      // Then harmonize by category in order
      const categoryOrder: A432ModuleCategory[] = ['trinity', 'consciousness', 'harmony', 'visualization', 'interaction', 'system', 'meta'];
      categoryOrder.forEach(category => {
        const categoryModules = modules.filter(m => m.category === category);
        categoryModules.forEach(module => this.harmonizeModule(module, context));
      });
    });
  }

  private harmonizeModule(module: A432Module, context: HarmonizationContext): void {
    if (context.visited.has(module.name)) return;
    context.visited.add(module.name);

    try {
      if (module.harmonize) {
        module.harmonize();
        context.results.set(module.name, module.getState());
      }
    } catch (error) {
      context.errors.set(module.name, error as Error);
      console.error(`Harmonization failed for ${module.name}:`, error);
    }
  }

  private sortByDependencies(modules: A432Module[]): A432Module[] {
    const sorted: A432Module[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (module: A432Module) => {
      if (visited.has(module.name)) return;
      if (visiting.has(module.name)) {
        throw new Error(`Circular dependency detected: ${module.name}`);
      }

      visiting.add(module.name);
      
      // Visit dependencies first
      module.dependencies.forEach(depName => {
        const dep = a432ModuleRegistry.getModule(depName);
        if (dep) visit(dep);
      });

      visiting.delete(module.name);
      visited.add(module.name);
      sorted.push(module);
    };

    modules.forEach(visit);
    return sorted;
  }

  private groupByCategory(modules: A432Module[]): Record<A432ModuleCategory, A432Module[]> {
    const grouped: Record<A432ModuleCategory, A432Module[]> = {} as any;
    modules.forEach(module => {
      if (!grouped[module.category]) {
        grouped[module.category] = [];
      }
      grouped[module.category].push(module);
    });
    return grouped;
  }

  // === PUBLIC API ===
  harmonize(
    modules: A432Module[] = a432ModuleRegistry.getAllModules(),
    strategy: HarmonizationStrategy = 'meta',
    context?: Partial<HarmonizationContext>
  ): HarmonizationContext {
    const fullContext: HarmonizationContext = {
      strategy,
      depth: 0,
      visited: new Set(),
      results: new Map(),
      errors: new Map(),
      ...context
    };

    const strategyFn = this.strategies.get(strategy);
    if (strategyFn) {
      strategyFn(modules, fullContext);
    }

    return fullContext;
  }

  harmonizeByCategory(category: A432ModuleCategory, strategy: HarmonizationStrategy = 'sequential'): HarmonizationContext {
    const modules = a432ModuleRegistry.getModulesByCategory(category);
    return this.harmonize(modules, strategy);
  }

  // === UTILITY FUNCTIONS ===
  getHarmonizationStats(context: HarmonizationContext): {
    total: number;
    successful: number;
    failed: number;
    errors: string[];
  } {
    const total = context.results.size + context.errors.size;
    const successful = context.results.size;
    const failed = context.errors.size;
    const errors = Array.from(context.errors.entries()).map(([name, error]) => `${name}: ${error.message}`);

    return { total, successful, failed, errors };
  }

  validateHarmonization(context: HarmonizationContext): boolean {
    return context.errors.size === 0;
  }
}

// === GLOBAL HARMONIZER INSTANCE ===
export const a432Harmonizer = new A432Harmonizer();

// === CONVENIENCE FUNCTIONS ===
export function harmonizeA432System(strategy: HarmonizationStrategy = 'meta'): HarmonizationContext {
  return a432Harmonizer.harmonize(undefined, strategy);
}

export function harmonizeA432Category(category: A432ModuleCategory, strategy: HarmonizationStrategy = 'sequential'): HarmonizationContext {
  return a432Harmonizer.harmonizeByCategory(category, strategy);
}

export function getHarmonizationStats(context: HarmonizationContext): {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
} {
  return a432Harmonizer.getHarmonizationStats(context);
}

export function validateHarmonization(context: HarmonizationContext): boolean {
  return a432Harmonizer.validateHarmonization(context);
}

// === DRY PATTERNS ===
export function createHarmonizedModule(
  name: string,
  category: A432ModuleCategory,
  getState: () => any,
  harmonize?: () => void,
  getOverlays?: () => string[],
  getMeta?: () => string,
  dependencies: string[] = []
): A432Module {
  return {
    name,
    category,
    version: '1.0.0',
    description: `Harmonized module: ${name}`,
    dependencies,
    exports: [],
    getState,
    harmonize,
    getOverlays,
    getMeta,
    onEvent: (event) => {
      if (event.type === 'harmonize' && harmonize) {
        harmonize();
      }
    }
  };
}

// === AUTOMATIC MODULE DISCOVERY ===
export function discoverAndRegisterModules(): void {
  // This would typically scan the filesystem or use reflection
  // For now, we'll manually register known modules
  const knownModules = [
    'a432.core',
    'a432.trinity',
    'a432.consciousness',
    'a432.harmony',
    'a432.visualization',
    'a432.interaction',
    'a432.system',
    'a432.meta'
  ];

  knownModules.forEach(moduleName => {
    const module = a432ModuleRegistry.getModule(moduleName);
    if (!module) {
      // Create a placeholder module for discovery
      const placeholderModule = createHarmonizedModule(
        moduleName,
        'meta',
        () => ({ name: moduleName, status: 'discovered' }),
        undefined,
        () => [`Discovered module: ${moduleName}`],
        () => `Discovered module: ${moduleName}`
      );
      a432ModuleRegistry.register(placeholderModule);
    }
  });
}

// === INITIALIZATION ===
export function initializeA432Harmonizer(): void {
  discoverAndRegisterModules();
  const context = harmonizeA432System('meta');
  console.log('A432 Harmonizer initialized:', getHarmonizationStats(context));
} 