// a432.harmonized.ts
// Harmonized OS registry/router/aggregator for all modules in the A432 system
// All logic is harmonically mapped, extensible, and compatible with the a432 pattern

export interface A432OSModule {
  name: string;
  getState: () => any;
  onEvent?: (event: any) => void;
  overlays?: (() => string)[];
  harmonize?: () => void;
  meta?: () => string;
}

const modules: A432OSModule[] = [];

/**
 * Register a module with the harmonized OS
 */
export function registerModule(module: A432OSModule) {
  modules.push(module);
}

/**
 * Get all registered modules
 */
export function getModules() {
  return modules;
}

/**
 * Get a module by name
 */
export function getModuleByName(name: string): A432OSModule | undefined {
  return modules.find(m => m.name === name);
}

/**
 * Route an event to all modules
 */
export function routeEvent(event: any) {
  modules.forEach(mod => mod.onEvent?.(event));
}

/**
 * Harmonize all modules
 */
export function harmonizeAll() {
  modules.forEach(mod => mod.harmonize?.());
}

/**
 * Aggregate all overlays from all modules
 */
export function getAllOverlays() {
  return modules.flatMap(mod => mod.overlays ? mod.overlays.map(fn => fn()) : []);
}

/**
 * Aggregate all meta-descriptions from all modules
 */
export function getMetaDescriptions() {
  return modules.map(mod => mod.meta?.() || `${mod.name}: No meta description.`);
}

// === Overlay categories and harmonization strategies ===
type OverlayCategory = 'healing' | 'pi' | 'trinity' | 'rodin' | 'consciousness' | 'meta' | string;
interface OverlayEntry {
  category: OverlayCategory;
  render: () => string;
}
const overlayRegistry: OverlayEntry[] = [];

export function registerOverlay(category: OverlayCategory, render: () => string) {
  overlayRegistry.push({ category, render });
}
export function getOverlaysByCategory(category: OverlayCategory) {
  return overlayRegistry.filter(o => o.category === category).map(o => o.render());
}
export function getAllOverlayCategories() {
  return Array.from(new Set(overlayRegistry.map(o => o.category)));
}

// Harmonization strategies
const harmonizationStrategies: { [name: string]: () => void } = {};
export function registerHarmonizationStrategy(name: string, fn: () => void) {
  harmonizationStrategies[name] = fn;
}
export function harmonizeByStrategy(name: string) {
  if (harmonizationStrategies[name]) harmonizationStrategies[name]();
}
export function getAllHarmonizationStrategies() {
  return Object.keys(harmonizationStrategies);
}

// Recursive meta-observation
export function getRecursiveMetaObservation(depth: number = 1): string[] {
  if (depth <= 0) return [];
  const meta = getMetaDescriptions();
  if (depth === 1) return meta;
  // Recursively reference overlays/meta of other modules
  return meta.concat(getRecursiveMetaObservation(depth - 1));
}

/**
 * Refactoring instructions:
 * - Each module should implement the A432OSModule interface.
 * - Register itself with registerModule() on initialization.
 * - Provide overlays and meta-descriptions for universal aggregation.
 * - Use routeEvent and harmonizeAll for system-wide communication and harmonization.
 */ 