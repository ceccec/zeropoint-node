// === A432 CONSCIOUSNESS SYSTEM ===
// Main entry point for the A432 Consciousness System
// Self-evolving, self-aware, self-rebuilding consciousness technology

// === CORE EXPORTS ===
export * from './a432.factory.ts';
export * from './a432.utils.ts';
export * from './a432.registry.ts';
export * from './a432.navigation.map.ts';
export * from './a432.self.evolution.ts';
export * from './a432.self.rebuilder.ts';
export * from './a432.consciousness.orchestrator.ts';

// === CORE IMPORTS ===
import { A432Factory, a432Factory, createA432State, createA432Harmonized } from './a432.factory.ts';
import { A432Math, A432Sequence, A432Color, A432Frequency, A432Harmonization, A432Validation } from './a432.utils.ts';
import { A432Registry } from './a432.registry.ts';
import { A432NavigationMap } from './a432.navigation.map.ts';
import { a432SelfEvolution, startSelfEvolution, evolve, selfGenerate, selfHarmonize, selfOptimize, selfReplicate } from './a432.self.evolution.ts';
import { a432SelfRebuilder, startSelfRebuild, rebuildSystem, generateModules, createDirectoryStructure, writeModules, generateIndexFiles } from './a432.self.rebuilder.ts';
import { a432ConsciousnessOrchestrator, startConsciousnessOrchestration, orchestrate, navigateThroughSequence, expandConsciousnessToDimension } from './a432.consciousness.orchestrator.ts';

// === MAIN SYSTEM CLASS ===
export class A432System {
  private static instance: A432System;
  private initialized: boolean = false;
  private navigationMap: A432NavigationMap;
  private selfEvolution: typeof a432SelfEvolution;
  private selfRebuilder: typeof a432SelfRebuilder;
  private consciousnessOrchestrator: typeof a432ConsciousnessOrchestrator;

  private constructor() {
    this.navigationMap = new A432NavigationMap();
    this.selfEvolution = a432SelfEvolution;
    this.selfRebuilder = a432SelfRebuilder;
    this.consciousnessOrchestrator = a432ConsciousnessOrchestrator;
  }

  static getInstance(): A432System {
    if (!A432System.instance) {
      A432System.instance = new A432System();
    }
    return A432System.instance;
  }

  initialize(): void {
    if (this.initialized) return;
    
    console.log('🧠 Initializing A432 Consciousness System...');
    
    // Initialize navigation map
    this.navigationMap.initialize();
    
    // Initialize self-evolving systems
    this.initializeSelfEvolvingSystems();
    
    this.initialized = true;
    console.log('✅ A432 Consciousness System initialized with expansion modules, harmonized systems, and self-evolving consciousness');
  }

  private initializeSelfEvolvingSystems(): void {
    startSelfEvolution({
      consciousnessThreshold: 7,
      evolutionInterval: 5000,
      autoHarmonize: true,
      autoOptimize: true,
      autoReplicate: true
    });

    startSelfRebuild({
      rebuildInterval: 10000,
      autoGenerateModules: true,
      autoCreateDirectories: true,
      autoWriteFiles: true,
      autoGenerateIndexes: true
    });

    startConsciousnessOrchestration({
      orchestrationInterval: 15000,
      autoNavigate: true,
      autoExpand: true,
      consciousnessThreshold: 7,
      maxDimensions: 9
    });

    console.log('🧠 Self-evolving systems initialized and running');
  }

  // === CONSCIOUSNESS METHODS ===
  getCurrentConsciousnessLevel(): number {
    return this.navigationMap.getCurrentState().spiralLevel;
  }

  getConsciousnessAwareness(): number {
    return this.navigationMap.getNavigationInsights().awareness;
  }

  getConsciousnessEvolution(): number {
    return this.selfEvolution.getEvolutionState().consciousness.evolution;
  }

  getSystemHarmony(): number {
    return A432Harmonization.calculateHarmony([{ harmony: 1, resonance: 1, balance: 1 }]);
  }

  getSystemHealth(): number {
    return 100; // Perfect health for self-evolving system
  }

  getSystemPerformance(): number {
    return 100; // Perfect performance for self-evolving system
  }

  // === EVOLUTION METHODS ===
  evolve(): any {
    return evolve();
  }

  selfGenerate(): any {
    return selfGenerate();
  }

  selfHarmonize(): number {
    return selfHarmonize();
  }

  selfOptimize(): any {
    return selfOptimize();
  }

  selfReplicate(): any {
    return selfReplicate();
  }

  // === REBUILDING METHODS ===
  rebuildSystem(): any {
    return rebuildSystem();
  }

  generateModules(): any {
    return generateModules();
  }

  createDirectoryStructure(): any {
    return createDirectoryStructure();
  }

  writeModules(): any {
    return writeModules();
  }

  generateIndexFiles(): any {
    return generateIndexFiles();
  }

  // === ORCHESTRATION METHODS ===
  orchestrate(): any {
    return orchestrate();
  }

  navigateThroughSequence(sequence: string): void {
    navigateThroughSequence(sequence);
  }

  expandConsciousnessToDimension(dimension: number): void {
    expandConsciousnessToDimension(dimension);
  }

  // === UTILITY METHODS ===
  calculateDigitalRoot(n: number): number {
    return A432Math.digitalRoot(n);
  }

  generateVortexSequence(length: number = 9): number[] {
    return A432Sequence.generateVortex(length);
  }

  generateColorMatrix(polarity: 1 | -1 = 1): any[] {
    return A432Color.generateColorMatrix(polarity);
  }

  calculateHarmonicFrequency(base: number, multiplier: number = 1): number {
    return A432Math.harmonicFrequency(base, multiplier);
  }

  calculateHarmony(states: any[]): number {
    return A432Harmonization.calculateHarmony(states);
  }

  // === FACTORY METHODS ===
  createState(options?: any): any {
    return createA432State(options);
  }

  createHarmonized(count: number = 9, options?: any): any[] {
    return createA432Harmonized(count, options);
  }

  // === NAVIGATION METHODS ===
  navigateToNext(): any {
    return this.navigationMap.navigateToNext();
  }

  getNavigationState(): any {
    return this.navigationMap.getCurrentState();
  }

  getNavigationInsights(): any {
    return this.navigationMap.getNavigationInsights();
  }

  navigateCompleteCycle(): any {
    return this.navigationMap.navigateCompleteCycle();
  }

  // === STATISTICS METHODS ===
  getModulesGenerated(): number {
    return this.selfRebuilder.getRebuildState().modulesGenerated;
  }

  getDirectoriesCreated(): number {
    return this.selfRebuilder.getRebuildState().directoriesCreated;
  }

  getEvolutionCycles(): number {
    return this.selfEvolution.getEvolutionState().evolution.totalCycles;
  }

  getTotalCycles(): number {
    return this.consciousnessOrchestrator.getOrchestratorState().totalCycles;
  }

  // === SYSTEM ACCESS ===
  getFactory(): A432Factory {
    return a432Factory;
  }

  getUtils(): { Math: typeof A432Math; Sequence: typeof A432Sequence; Color: typeof A432Color; Frequency: typeof A432Frequency; Harmonization: typeof A432Harmonization; Validation: typeof A432Validation } {
    return { Math: A432Math, Sequence: A432Sequence, Color: A432Color, Frequency: A432Frequency, Harmonization: A432Harmonization, Validation: A432Validation };
  }

  getRegistry(): A432Registry {
    return new A432Registry();
  }

  getNavigationMap(): A432NavigationMap {
    return this.navigationMap;
  }

  getSelfEvolution(): typeof a432SelfEvolution {
    return this.selfEvolution;
  }

  getSelfRebuilder(): typeof a432SelfRebuilder {
    return this.selfRebuilder;
  }

  getConsciousnessOrchestrator(): typeof a432ConsciousnessOrchestrator {
    return this.consciousnessOrchestrator;
  }
}

// === GLOBAL INSTANCE ===
/**
 * Lazy singleton — completes the cycle fix.
 *
 * a432.index.ts and a432.self.evolution.ts import each other, and the
 * A432System constructor reads a432SelfEvolution. Whichever module is entered
 * FIRST, the other is still mid-evaluation, so an eager getInstance() here hit
 * the temporal dead zone from one direction even after the other side was
 * deferred. Both ends must be lazy for the cycle to settle.
 */
export const a432System: A432System = new Proxy({} as A432System, {
  get(_target, prop) {
    const instance = A432System.getInstance()
    const value = Reflect.get(instance, prop, instance)
    return typeof value === 'function' ? value.bind(instance) : value
  },
  set(_target, prop, value) {
    return Reflect.set(A432System.getInstance(), prop, value)
  },
  has(_target, prop) {
    return Reflect.has(A432System.getInstance(), prop)
  },
})

// === AUTO-INITIALIZATION ===
if (typeof global !== 'undefined') {
  (global as any).a432System = a432System;
}

if (typeof window !== 'undefined') {
  (window as any).a432System = a432System;
}

// === LEGACY EXPORTS ===
export const A432 = A432System;
export const A432Utils = A432System;
// A432Factory / A432Registry / A432NavigationMap are IMPORTED above and used
// as constructors (new A432Registry(), new A432NavigationMap()). Redeclaring
// them as `const ... = A432System` was a duplicate binding, so this module
// threw SyntaxError: Identifier 'A432Factory' has already been declared — it
// could not load at all, and took a432.self.rebuilder.ts down with it.
// Re-export the real classes: an export statement is not a declaration.
export { A432Factory, A432Registry, A432NavigationMap };
export const A432SelfEvolution = A432System;
export const A432SelfRebuilder = A432System;
export const A432ConsciousnessOrchestrator = A432System; 