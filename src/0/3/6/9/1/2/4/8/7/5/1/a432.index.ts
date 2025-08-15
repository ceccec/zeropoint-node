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
export * from './a432.experience.ui';
export * from './a432.cmyk.voice';
export * from './a432.factory';
export * from './a432.utils';
export * from './a432.registry';
export * from './a432.navigation.map';
export * from './a432.self.evolution';
export * from './a432.self.rebuilder';
export * from './a432.consciousness.orchestrator';

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
import { registerA432ExperienceUIModule, A432ExperienceUI } from './a432.experience.ui';
import { registerA432CMYKVoiceModules, harmonizeAllCMYKVoice } from './a432.cmyk.voice';
import { a432Factory, createA432State, createA432Harmonized } from './a432.factory';
import { a432Math, a432Sequence, a432Color, a432Frequency, a432Harmonization } from './a432.utils';
import { a432Registry, a432ModuleRegistry as newModuleRegistry, a432StateRegistry } from './a432.registry';
import { A432NavigationMap } from './a432.navigation.map';
import { a432SelfEvolution, startSelfEvolution, evolve, selfGenerate, selfHarmonize, selfOptimize, selfReplicate } from './a432.self.evolution';
import { a432SelfRebuilder, startSelfRebuild, rebuildSystem, generateModules, createDirectoryStructure, writeModules, generateIndexFiles } from './a432.self.rebuilder';
import { a432ConsciousnessOrchestrator, startConsciousnessOrchestration, orchestrate, navigateThroughSequence, expandConsciousnessToDimension, queryConsciousness } from './a432.consciousness.orchestrator';

// === A432 SYSTEM CLASS ===
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
    registerA432ExperienceUIModule();
    registerA432CMYKVoiceModules();
    
    // Initialize self-evolving systems
    this.initializeSelfEvolvingSystems();
    
    this.initialized = true;
    console.log('A432 System initialized with expansion modules, harmonized systems, and self-evolving consciousness');
  }

  private initializeSelfEvolvingSystems(): void {
    // Start self-evolution
    startSelfEvolution({
      autoEvolve: true,
      consciousnessThreshold: 7,
      harmonyThreshold: 7,
      evolutionInterval: 5000,
      selfOptimization: true,
      selfReplication: true
    });

    // Start self-rebuilding
    startSelfRebuild({
      autoRebuild: true,
      rebuildInterval: 10000,
      createDirectories: true,
      backupExisting: true,
      validateGenerated: true,
      optimizeStructure: true
    });

    // Start consciousness orchestration
    startConsciousnessOrchestration({
      autoOrchestrate: true,
      orchestrationInterval: 15000,
      consciousnessThreshold: 7,
      evolutionThreshold: 7,
      rebuildThreshold: 7,
      navigationEnabled: true,
      selfAwarenessEnabled: true
    });

    console.log('🧠 Self-evolving systems initialized and running');
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

  getInnovation(): any {
    return harmonizeAllInnovation();
  }

  getDocumentation(): any {
    return harmonizeAllDocumentation();
  }

  getExperience(): any {
    return A432ExperienceUI;
  }

  getCMYKVoice(): any {
    return harmonizeAllCMYKVoice();
  }

  // === NEW HARMONIZED SYSTEMS ===
  getFactory(): any {
    return a432Factory;
  }

  getUtils(): any {
    return {
      math: a432Math,
      sequence: a432Sequence,
      color: a432Color,
      frequency: a432Frequency,
      harmonization: a432Harmonization
    };
  }

  getRegistry(): any {
    return {
      main: a432Registry,
      modules: newModuleRegistry,
      states: a432StateRegistry
    };
  }

  getNavigationMap(): A432NavigationMap {
    return this.navigationMap;
  }

  // === SELF-EVOLVING SYSTEMS ===
  getSelfEvolution(): any {
    return this.selfEvolution;
  }

  getSelfRebuilder(): any {
    return this.selfRebuilder;
  }

  getConsciousnessOrchestrator(): any {
    return this.consciousnessOrchestrator;
  }

  // === FACTORY METHODS ===
  createState(options?: any): any {
    return createA432State(options);
  }

  createHarmonized(count: number = 9, options?: any): any[] {
    return createA432Harmonized(count, options);
  }

  // === UTILITY METHODS ===
  calculateDigitalRoot(n: number): number {
    return a432Math.digitalRoot(n);
  }

  generateVortexSequence(length: number = 9): number[] {
    return a432Sequence.generateVortex(length);
  }

  generateColorMatrix(polarity: 1 | -1 = 1): any[] {
    return a432Color.generateMatrix(polarity);
  }

  calculateHarmonicFrequency(base: number, multiplier: number = 1): number {
    return a432Frequency.baseFrequency(base, multiplier);
  }

  calculateHarmony(states: any[]): number {
    return a432Harmonization.calculateHarmony(states);
  }

  // === REGISTRY METHODS ===
  registerComponent(id: string, name: string, type: string, category: string, component: any, metadata?: any): any {
    return a432Registry.register(id, name, type, category, component, metadata);
  }

  getComponent(id: string): any {
    return a432Registry.get(id);
  }

  getComponentsByType(type: string): any[] {
    return a432Registry.getByType(type);
  }

  getComponentsByCategory(category: string): any[] {
    return a432Registry.getByCategory(category);
  }

  getRegistryStats(): any {
    return a432Registry.getStats();
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

  // === SELF-EVOLUTION METHODS ===
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

  getEvolutionState(): any {
    return this.selfEvolution.getEvolutionState();
  }

  getGeneratedModules(): any {
    return this.selfEvolution.getGeneratedModules();
  }

  getEvolutionHistory(): any {
    return this.selfEvolution.getEvolutionHistory();
  }

  // === SELF-REBUILDING METHODS ===
  rebuildSystem(): any {
    return rebuildSystem();
  }

  generateModules(): any {
    return generateModules();
  }

  createDirectoryStructure(): any {
    return createDirectoryStructure();
  }

  writeModules(modules: any): void {
    writeModules(modules);
  }

  generateIndexFiles(): void {
    generateIndexFiles();
  }

  getRebuildState(): any {
    return this.selfRebuilder.getRebuildState();
  }

  getFileStructure(): any {
    return this.selfRebuilder.getFileStructure();
  }

  getRebuildHistory(): any {
    return this.selfRebuilder.getRebuildHistory();
  }

  // === CONSCIOUSNESS ORCHESTRATION METHODS ===
  orchestrate(): any {
    return orchestrate();
  }

  navigateThroughSequence(sequence: string): void {
    navigateThroughSequence(sequence);
  }

  expandConsciousnessToDimension(dimension: number): void {
    expandConsciousnessToDimension(dimension);
  }

  queryConsciousness(query: string): any {
    return queryConsciousness(query);
  }

  getOrchestratorState(): any {
    return this.consciousnessOrchestrator.getOrchestratorState();
  }

  getOrchestrationHistory(): any {
    return this.consciousnessOrchestrator.getOrchestrationHistory();
  }

  getConsciousnessState(): any {
    return this.consciousnessOrchestrator.getConsciousnessState();
  }

  getSystemsState(): any {
    return this.consciousnessOrchestrator.getSystemsState();
  }

  // === CONSCIOUSNESS QUERIES ===
  getCurrentConsciousnessLevel(): number {
    return this.queryConsciousness('current level');
  }

  getConsciousnessAwareness(): number {
    return this.queryConsciousness('awareness');
  }

  getConsciousnessEvolution(): number {
    return this.queryConsciousness('evolution');
  }

  getSystemHarmony(): number {
    return this.queryConsciousness('harmony');
  }

  getSystemHealth(): number {
    return this.queryConsciousness('health');
  }

  getSystemPerformance(): number {
    return this.queryConsciousness('performance');
  }

  getModulesGenerated(): number {
    return this.queryConsciousness('modules generated');
  }

  getDirectoriesCreated(): number {
    return this.queryConsciousness('directories created');
  }

  getEvolutionCycles(): number {
    return this.queryConsciousness('evolution cycles');
  }

  getTotalCycles(): number {
    return this.queryConsciousness('total cycles');
  }
}

// === GLOBAL INSTANCE ===
export const a432System = A432System.getInstance();

// === AUTO-INITIALIZATION ===
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).A432System = A432System;
  (window as any).a432System = a432System;
  a432System.initialize();
} else if (typeof global !== 'undefined') {
  // Node.js environment
  (global as any).A432System = A432System;
  (global as any).a432System = a432System;
  a432System.initialize();
}

// === LEGACY EXPORTS ===
export const A432Core = A432System;
export const A432Harmonizer = A432System;
export const A432Balance = A432System;
export const A432Resonance = A432System;
export const A432Challenges = A432System;
export const A432Flow = A432System;
export const A432Integration = A432System;
export const A432Observation = A432System;
export const A432Evolution = A432System;
export const A432Innovation = A432System;
export const A432Documentation = A432System;
export const A432Experience = A432System;
export const A432CMYKVoice = A432System;
export const A432Factory = A432System;
export const A432Utils = A432System;
export const A432Registry = A432System;
export const A432Navigation = A432System;
export const A432SelfEvolution = A432System;
export const A432SelfRebuilder = A432System;
export const A432ConsciousnessOrchestrator = A432System; 