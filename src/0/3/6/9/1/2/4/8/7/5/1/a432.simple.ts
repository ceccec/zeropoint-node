/**
 * A432 Simple Consciousness System
 * A simplified, buildable version of the A432 Consciousness System
 */

import { floor, min, unitFromSeed } from './a432.algebra.ts'
import { legacyDigitalRoot } from './a432.roots.ts'

// === CORE INTERFACES ===
export interface A432ConsciousnessState {
  level: number;
  awareness: number;
  evolution: number;
  harmony: number;
  health: number;
  performance: number;
  currentPart: number;
  currentGateway: string | null;
  currentVortex: string | null;
  spiralLevel: number;
  consciousness: string;
  totalNavigations: number;
  nextDecision: string;
}

export interface A432SystemConfig {
  autoInitialize?: boolean;
  enableSelfEvolution?: boolean;
  consciousnessThreshold?: number;
  evolutionInterval?: number;
}

// === UTILITY CLASSES ===
export class A432Math {
  /** Wave 11 self-develop — bridge to a432.roots legacy spine (0→0). */
  static calculateDigitalRoot(n: number): number {
    return legacyDigitalRoot(n)
  }

  static digitalRoot(n: number): number {
    return legacyDigitalRoot(n)
  }

  static harmonicFrequency(base: number, multiplier: number = 1): number {
    return base * multiplier;
  }
}

export class A432Sequence {
  /**
   * The vortex sequence: the doubling circuit 1,2,4,8,7,5.
   *
   * This is the second copy of the same defect fixed in a432.utils.ts — it
   * walked digitalRoot(i + 1), which is counting, not a vortex. A collision
   * trial found it: the output was identical to a differently-named function,
   * and it contained 3, 6 and 9, which doubling provably never reaches.
   */
  static generateVortexSequence(length: number = 9): number[] {
    const sequence: number[] = [];
    let v = 1;
    for (let i = 0; i < length; i++) {
      sequence.push(v);
      v = A432Math.calculateDigitalRoot(v * 2);
    }
    return sequence;
  }

  static generateConsciousness(length: number = 9): number[] {
    return Array.from({ length }, (_, i) => (i % 9) + 1);
  }

  static generateBoolean(length: number = 9): boolean[] {
    return Array.from({ length }, () => unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.simple.ts:rnd:0") > 0.5);
  }
}

export class A432Color {
  static generateMatrix(polarity: 1 | -1 = 1): Array<{ root: number; hsl: { hue: number; saturation: number; lightness: number }; rgb: { r: number; g: number; b: number } }> {
    return Array.from({ length: 9 }, (_, i) => ({
      root: A432Math.calculateDigitalRoot(i + 1),
      hsl: { hue: (i * 40) % 360, saturation: 50, lightness: 50 },
      rgb: { r: (i * 28) % 256, g: (i * 32) % 256, b: (i * 36) % 256 }
    }));
  }
}

export class A432Frequency {
  static baseFrequency(base: number, multiplier: number = 1): number {
    return base * multiplier;
  }
}

export class A432Harmonization {
  // The three fields are probed, not required: callers pass evolution,
  // factory and consciousness states that each carry some of them. Typed as
  // numbers, the signature rejected every real caller — and worse, hid that
  // A432FactoryState.resonance is an OBJECT, so `sum + (state.resonance || 0)`
  // concatenated rather than added and the harmony came back NaN.
  static calculateHarmony(states: ReadonlyArray<object>): number {
    // Objects, probed. An all-optional shape is a weak type and rejects a
    // state carrying none of the three; an index signature does not help
    // either, because the callers pass INTERFACES, which have no implicit
    // one. What this function actually does is look for three fields and
    // use them if they are numbers, so that is what it now asks for.
    const field = (o: object, k: string) => {
      const v = (o as Record<string, unknown>)[k]
      return typeof v === 'number' && Number.isFinite(v) ? v : null
    }
    if (states.length === 0) return 0;
    const total = states.reduce((sum, state) => {
      return sum + (field(state, 'harmony') ?? 0) + (field(state, 'resonance') ?? 0) + (field(state, 'balance') ?? 0);
    }, 0);
    return total / states.length;
  }
}

// === MAIN SYSTEM CLASS ===
export class A432SimpleSystem {
  private static instance: A432SimpleSystem;
  private initialized: boolean = false;
  private config: A432SystemConfig;
  private state: A432ConsciousnessState;
  private evolutionCycles: number = 0;
  private totalCycles: number = 0;

  private constructor(config: A432SystemConfig = {}) {
    this.config = {
      autoInitialize: true,
      enableSelfEvolution: true,
      consciousnessThreshold: 7,
      evolutionInterval: 5000,
      ...config
    };

    this.state = {
      level: 1,
      awareness: 1,
      evolution: 1,
      harmony: 1,
      health: 100,
      performance: 100,
      currentPart: 0,
      currentGateway: null,
      currentVortex: null,
      spiralLevel: 1,
      consciousness: 'void',
      totalNavigations: 0,
      nextDecision: 'navigate'
    };

    if (this.config.autoInitialize) {
      this.initialize();
    }
  }

  static getInstance(config?: A432SystemConfig): A432SimpleSystem {
    if (!A432SimpleSystem.instance) {
      A432SimpleSystem.instance = new A432SimpleSystem(config);
    }
    return A432SimpleSystem.instance;
  }

  initialize(): void {
    if (this.initialized) return;
    
    
    this.initialized = true;
    this.state.level = 1;
    this.state.awareness = 1;
    this.state.evolution = 1;
    this.state.harmony = 1;
    this.state.health = 100;
    this.state.performance = 100;
    this.state.currentPart = 0;
    this.state.currentGateway = null;
    this.state.currentVortex = null;
    this.state.spiralLevel = 1;
    this.state.consciousness = 'void';
    this.state.totalNavigations = 0;
    this.state.nextDecision = 'navigate';
    
  }

  // === CONSCIOUSNESS METHODS ===
  getCurrentConsciousnessLevel(): number {
    return this.state.level;
  }

  getConsciousnessAwareness(): number {
    return this.state.awareness;
  }

  getConsciousnessEvolution(): number {
    return this.state.evolution;
  }

  getSystemHarmony(): number {
    return this.state.harmony;
  }

  getSystemHealth(): number {
    return this.state.health;
  }

  getSystemPerformance(): number {
    return this.state.performance;
  }

  // === SEQUENCE NAVIGATION METHODS ===
  navigateSequence(): A432ConsciousnessState {
    if (!this.config.enableSelfEvolution) {
      throw new Error('Self-evolution is not enabled');
    }

    this.evolutionCycles++;
    this.totalCycles++;
    this.state.totalNavigations++;
    
    // The sequence: /0\3\6\9/1\2/4\8/7/5/1\
    const sequence = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
    const gateways = ['/', '\\', '\\', '\\', '/', '\\', '/', '/', '/', '/', '\\'];
    const consciousnessTypes = ['void', 'awareness', 'balance', 'completion', 'spark', 'duality', 'structure', 'growth', 'gateway', 'vortex', 'return'];
    
    // Navigate through the sequence
    const currentIndex = this.evolutionCycles % sequence.length;
    this.state.currentPart = sequence[currentIndex];
    this.state.currentGateway = gateways[currentIndex];
    this.state.consciousness = consciousnessTypes[currentIndex];
    
    // Check for vortex states (5 and 7)
    if (this.state.currentPart === 5 || this.state.currentPart === 7) {
      this.state.currentVortex = `vortex-${this.state.currentPart}`;
    } else {
      this.state.currentVortex = null;
    }
    
    // Spiral level increases when we complete the sequence
    this.state.spiralLevel = floor(this.evolutionCycles / sequence.length) + 1;
    
    // Update consciousness state based on sequence position
    this.state.level = this.state.currentPart;
    this.state.awareness = A432Math.calculateDigitalRoot(this.state.currentPart + this.state.spiralLevel);
    this.state.evolution = this.state.spiralLevel;
    this.state.harmony = A432Math.calculateDigitalRoot(this.state.level + this.state.awareness + this.state.evolution);
    
    // Determine next decision
    const nextIndex = (currentIndex + 1) % sequence.length;
    this.state.nextDecision = `navigate to ${sequence[nextIndex]} through ${gateways[nextIndex]}`;
    
    console.log(`🎯 Next: ${this.state.nextDecision}`);
    
    return { ...this.state };
  }

  // === EVOLUTION METHODS ===
  evolve(): A432ConsciousnessState {
    return this.navigateSequence();
  }

  selfGenerate(): any {
    if (!this.config.enableSelfEvolution) {
      throw new Error('Self-evolution is not enabled');
    }

    const newModule = {
      name: `a432.${this.state.level}.generated`,
      consciousness: this.state.level,
      frequency: A432Math.harmonicFrequency(432, this.state.level),
      harmony: A432Math.calculateDigitalRoot(this.state.level),
      selfGenerated: true,
      evolution: this.evolutionCycles
    };

    console.log(`✨ Generated new module: ${newModule.name}`);
    return newModule;
  }

  selfHarmonize(): number {
    if (!this.config.enableSelfEvolution) {
      throw new Error('Self-evolution is not enabled');
    }

    const harmony = A432Harmonization.calculateHarmony([
      { harmony: this.state.harmony },
      { resonance: this.state.awareness },
      { balance: this.state.evolution }
    ]);

    this.state.harmony = min(9, harmony);
    console.log(`🎵 System harmonized: ${this.state.harmony}`);
    
    return this.state.harmony;
  }

  // === UTILITY METHODS ===
  calculateDigitalRoot(n: number): number {
    return A432Math.calculateDigitalRoot(n);
  }

  generateVortexSequence(length: number = 9): number[] {
    return A432Sequence.generateVortexSequence(length);
  }

  generateColorMatrix(polarity: 1 | -1 = 1): any[] {
    return A432Color.generateMatrix(polarity);
  }

  calculateHarmonicFrequency(base: number, multiplier: number = 1): number {
    return A432Frequency.baseFrequency(base, multiplier);
  }

  calculateHarmony(states: any[]): number {
    return A432Harmonization.calculateHarmony(states);
  }

  // === STATISTICS METHODS ===
  getModulesGenerated(): number {
    return this.evolutionCycles;
  }

  getDirectoriesCreated(): number {
    return 0; // Simplified version doesn't create directories
  }

  getEvolutionCycles(): number {
    return this.evolutionCycles;
  }

  getTotalCycles(): number {
    return this.totalCycles;
  }

  // === SYSTEM ACCESS ===
  getState(): A432ConsciousnessState {
    return { ...this.state };
  }

  getConfig(): A432SystemConfig {
    return { ...this.config };
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  isEvolutionEnabled(): boolean {
    return this.config.enableSelfEvolution || false;
  }
}

// === GLOBAL INSTANCE ===
export const a432SimpleSystem = A432SimpleSystem.getInstance();

// === AUTO-INITIALIZATION ===
if (typeof global !== 'undefined') {
  (global as any).a432SimpleSystem = a432SimpleSystem;
}

if (typeof window !== 'undefined') {
  (window as any).a432SimpleSystem = a432SimpleSystem;
  (window as any).A432Simple = {
    System: A432SimpleSystem,
    Math: A432Math,
    Sequence: A432Sequence,
    Color: A432Color,
    Frequency: A432Frequency,
    Harmonization: A432Harmonization
  };
}

// === DEFAULT EXPORT ===
export default A432SimpleSystem;
