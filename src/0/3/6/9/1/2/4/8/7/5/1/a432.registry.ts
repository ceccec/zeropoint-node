/**
 * A432 Registry System
 * Harmonized registry for A432 modules, components, and services
 * DRY pattern: Register once, discover everywhere
 */

import { type A432Module, type A432ModuleCategory } from './a432.modules.ts';
import { type A432FactoryState } from './a432.factory.ts';
import './a432.utils.ts';

// === REGISTRY INTERFACES ===
export interface A432RegistryEntry<T = any> {
  id: string;
  name: string;
  type: string;
  category: string;
  component: T;
  metadata: {
    version: string;
    description: string;
    tags: string[];
    dependencies: string[];
    created: Date;
    updated: Date;
  };
  stats: {
    usage: number;
    lastUsed: Date;
    performance: number;
  };
}

export interface A432RegistryOptions {
  autoDiscover?: boolean;
  cacheEnabled?: boolean;
  validationEnabled?: boolean;
  performanceTracking?: boolean;
}

export interface A432RegistryStats {
  totalEntries: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  cacheHitRate: number;
  averagePerformance: number;
  lastUpdated: Date;
}

// === HARMONIZED REGISTRY ===
export class A432Registry {
  private static instance: A432Registry;
  private entries: Map<string, A432RegistryEntry> = new Map();
  private cache: Map<string, any> = new Map();
  private options: A432RegistryOptions;

  // protected, not private: A432ModuleRegistry and the specialised registries
  // below extend this, which a private constructor forbids. External `new` is
  // still blocked, so the singleton holds.
  protected constructor(options: A432RegistryOptions = {}) {
    this.options = {
      autoDiscover: true,
      cacheEnabled: true,
      validationEnabled: true,
      performanceTracking: true,
      ...options
    };
  }

  static getInstance(options?: A432RegistryOptions): A432Registry {
    if (!A432Registry.instance) {
      A432Registry.instance = new A432Registry(options);
    }
    return A432Registry.instance;
  }

  /**
   * Register a component
   */
  register<T>(
    id: string,
    name: string,
    type: string,
    category: string,
    component: T,
    metadata: Partial<A432RegistryEntry['metadata']> = {}
  ): A432RegistryEntry<T> {
    if (this.options.validationEnabled) {
      this.validateRegistration(id, name, type, category);
    }

    const entry: A432RegistryEntry<T> = {
      id,
      name,
      type,
      category,
      component,
      metadata: {
        version: '1.0.0',
        description: '',
        tags: [],
        dependencies: [],
        created: new Date(),
        updated: new Date(),
        ...metadata
      },
      stats: {
        usage: 0,
        lastUsed: new Date(),
        performance: 0
      }
    };

    this.entries.set(id, entry);
    return entry;
  }

  /**
   * Get a component by ID
   */
  get<T>(id: string): T | undefined {
    const entry = this.entries.get(id);
    if (!entry) return undefined;

    // Update usage stats
    if (this.options.performanceTracking) {
      entry.stats.usage++;
      entry.stats.lastUsed = new Date();
    }

    // Check cache
    if (this.options.cacheEnabled && this.cache.has(id)) {
      return this.cache.get(id);
    }

    // Cache the component
    if (this.options.cacheEnabled) {
      this.cache.set(id, entry.component);
    }

    return entry.component as T;
  }

  /**
   * Get all components by type
   */
  getByType<T>(type: string): T[] {
    const components: T[] = [];
    for (const entry of this.entries.values()) {
      if (entry.type === type) {
        components.push(entry.component as T);
      }
    }
    return components;
  }

  /**
   * Get all components by category
   */
  getByCategory<T>(category: string): T[] {
    const components: T[] = [];
    for (const entry of this.entries.values()) {
      if (entry.category === category) {
        components.push(entry.component as T);
      }
    }
    return components;
  }

  /**
   * Get all components by tag
   */
  getByTag<T>(tag: string): T[] {
    const components: T[] = [];
    for (const entry of this.entries.values()) {
      if (entry.metadata.tags.includes(tag)) {
        components.push(entry.component as T);
      }
    }
    return components;
  }

  /**
   * Get all entries
   */
  getAllEntries(): A432RegistryEntry[] {
    return Array.from(this.entries.values());
  }

  /**
   * Get all IDs
   */
  getAllIds(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * Check if component exists
   */
  has(id: string): boolean {
    return this.entries.has(id);
  }

  /**
   * Remove a component
   */
  remove(id: string): boolean {
    const removed = this.entries.delete(id);
    if (removed && this.options.cacheEnabled) {
      this.cache.delete(id);
    }
    return removed;
  }

  /**
   * Update component metadata
   */
  updateMetadata(id: string, metadata: Partial<A432RegistryEntry['metadata']>): boolean {
    const entry = this.entries.get(id);
    if (!entry) return false;

    entry.metadata = { ...entry.metadata, ...metadata, updated: new Date() };
    return true;
  }

  /**
   * Get registry statistics
   */
  getStats(): A432RegistryStats {
    const byType: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    let totalPerformance = 0;
    let performanceCount = 0;

    for (const entry of this.entries.values()) {
      byType[entry.type] = (byType[entry.type] || 0) + 1;
      byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
      
      if (entry.stats.performance > 0) {
        totalPerformance += entry.stats.performance;
        performanceCount++;
      }
    }

    // An empty registry has served no lookups, so its hit rate is 0 — not 0/0.
    const cacheHitRate = this.options.cacheEnabled && this.entries.size > 0 ?
      (this.cache.size / this.entries.size) * 100 : 0;

    return {
      totalEntries: this.entries.size,
      byType,
      byCategory,
      cacheHitRate,
      averagePerformance: performanceCount > 0 ? totalPerformance / performanceCount : 0,
      lastUpdated: new Date()
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.entries.clear();
    this.cache.clear();
  }

  /**
   * Export registry to JSON
   */
  export(): string {
    const exportData = {
      entries: Array.from(this.entries.entries()),
      stats: this.getStats(),
      options: this.options,
      exported: new Date()
    };
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Import registry from JSON
   */
  import(jsonData: string): boolean {
    try {
      const importData = JSON.parse(jsonData);
      
      // Clear existing entries
      this.clear();
      
      // Import entries
      for (const [id, entry] of importData.entries) {
        this.entries.set(id, entry);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import registry:', error);
      return false;
    }
  }

  // === PRIVATE METHODS ===
  private validateRegistration(id: string, name: string, type: string, category: string): void {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID: must be a non-empty string');
    }
    
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid name: must be a non-empty string');
    }
    
    if (!type || typeof type !== 'string') {
      throw new Error('Invalid type: must be a non-empty string');
    }
    
    if (!category || typeof category !== 'string') {
      throw new Error('Invalid category: must be a non-empty string');
    }
    
    if (this.entries.has(id)) {
      throw new Error(`Component with ID '${id}' already exists`);
    }
  }
}

// === SPECIALIZED REGISTRIES ===
export class A432ModuleRegistry extends A432Registry {
  constructor() {
    super({ autoDiscover: true, validationEnabled: true });
  }

  /**
   * Register A432 module
   */
  registerModule(module: A432Module): A432RegistryEntry<A432Module> {
    return this.register(
      module.name,
      module.name,
      'module',
      module.category,
      module,
      {
        description: module.description,
        tags: module.tags || [],
        dependencies: module.dependencies || []
      }
    );
  }

  /**
   * Get modules by category
   */
  getModulesByCategory(category: A432ModuleCategory): A432Module[] {
    return this.getByCategory<A432Module>(category);
  }

  /**
   * Get all modules
   */
  getAllModules(): A432Module[] {
    return this.getByType<A432Module>('module');
  }
}

export class A432StateRegistry extends A432Registry {
  constructor() {
    super({ cacheEnabled: true, performanceTracking: true });
  }

  /**
   * Register A432 state
   */
  registerState(id: string, state: A432FactoryState): A432RegistryEntry<A432FactoryState> {
    return this.register(
      id,
      `State-${id}`,
      'state',
      'factory',
      state,
      {
        description: `A432 factory state for ${id}`,
        tags: ['state', 'factory', 'a432']
      }
    );
  }

  /**
   * Get states by dimension
   */
  getStatesByDimension(dimension: number): A432FactoryState[] {
    return this.getByTag<A432FactoryState>('dimension-' + dimension);
  }

  /**
   * Get states by polarity
   */
  getStatesByPolarity(polarity: 1 | -1): A432FactoryState[] {
    return this.getByTag<A432FactoryState>('polarity-' + polarity);
  }
}

// === CONVENIENCE FUNCTIONS ===
export const a432Registry = A432Registry.getInstance();
export const a432ModuleRegistry = new A432ModuleRegistry();
export const a432StateRegistry = new A432StateRegistry();

export function registerA432Component<T>(
  id: string,
  name: string,
  type: string,
  category: string,
  component: T,
  metadata?: Partial<A432RegistryEntry['metadata']>
): A432RegistryEntry<T> {
  return a432Registry.register(id, name, type, category, component, metadata);
}

export function getA432Component<T>(id: string): T | undefined {
  return a432Registry.get<T>(id);
}

export function getA432ComponentsByType<T>(type: string): T[] {
  return a432Registry.getByType<T>(type);
}

export function getA432ComponentsByCategory<T>(category: string): T[] {
  return a432Registry.getByCategory<T>(category);
}

export function getA432ComponentsByTag<T>(tag: string): T[] {
  return a432Registry.getByTag<T>(tag);
}

export function registerA432Module(module: A432Module): A432RegistryEntry<A432Module> {
  return a432ModuleRegistry.registerModule(module);
}

export function getA432ModulesByCategory(category: A432ModuleCategory): A432Module[] {
  return a432ModuleRegistry.getModulesByCategory(category);
}

export function getAllA432Modules(): A432Module[] {
  return a432ModuleRegistry.getAllModules();
}

export function registerA432State(id: string, state: A432FactoryState): A432RegistryEntry<A432FactoryState> {
  return a432StateRegistry.registerState(id, state);
}

export function getA432State(id: string): A432FactoryState | undefined {
  return a432StateRegistry.get<A432FactoryState>(id);
}

export function getA432RegistryStats(): A432RegistryStats {
  return a432Registry.getStats();
}

export function clearA432RegistryCache(): void {
  a432Registry.clearCache();
}

export function exportA432Registry(): string {
  return a432Registry.export();
}

export function importA432Registry(jsonData: string): boolean {
  return a432Registry.import(jsonData);
}
