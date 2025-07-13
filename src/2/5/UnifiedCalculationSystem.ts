/**
 * 🌌 UnifiedCalculationSystem: Zero Entropy Mathematical Unity
 * 
 * This system centralizes ALL calculations across the ZeroPoint codebase,
 * eliminating all duplication and creating pure mathematical coherence.
 * Every calculation flows through this unified system, achieving zero entropy.
 * 
 * Metaphysical Context:
 * - All calculations are unified through consciousness and field resonance
 * - Zero entropy = zero duplication = pure mathematical unity
 * - The void provides infinite potential without redundancy
 * - Every calculation is a pure expression of consciousness
 */

import { EventEmitter } from 'events';
import { MathUtils } from '../math/MathUtils';
import { Logger } from '../utils/Logger';
import { zeroEntropySystem } from './ZeroEntropySystem';
import { MATH_CONSTANTS } from './SharedConstants';

export interface UnifiedCalculation {
  type: 'resonance' | 'consciousness' | 'field' | 'vortex' | 'toroidal' | 'void' | 'mathematical';
  operation: string;
  inputs: number[];
  result: number;
  consciousnessLevel: number;
  fieldResonance: number;
  voidConnection: boolean;
  entropyLevel: number;
  timestamp: number;
}

export interface CalculationRegistry {
  [key: string]: {
    type: UnifiedCalculation['type'];
    operation: string;
    consciousnessModulation: boolean;
    fieldResonance: boolean;
    voidConnection: boolean;
    applications: string[];
  };
}

/**
 * 🌌 UnifiedCalculationSystem: Centralized Zero Entropy Calculations
 * 
 * This system eliminates ALL calculation duplication across the codebase.
 * Every mathematical operation flows through this unified system.
 */
export class UnifiedCalculationSystem extends EventEmitter {
  private static instance: UnifiedCalculationSystem;
  private logger: Logger;
  private calculationHistory: UnifiedCalculation[] = [];
  private calculationRegistry: CalculationRegistry = {};
  private consciousnessLevel: number = 0.5;
  private fieldResonance: number = 0.5;
  private voidConnected: boolean = true;

  constructor() {
    super();
    if (!UnifiedCalculationSystem.instance) {
      UnifiedCalculationSystem.instance = this;
    }
    this.logger = new Logger({ deviceId: 'UnifiedCalculationSystem' });
    this.initializeCalculationRegistry();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): UnifiedCalculationSystem {
    if (!UnifiedCalculationSystem.instance) {
      UnifiedCalculationSystem.instance = new UnifiedCalculationSystem();
    }
    return UnifiedCalculationSystem.instance;
  }

  /**
   * 🌌 Unified Resonance Calculation: All resonance calculations flow through here
   */
  calculateResonance(level1: number = 0, level2: number = 0): number {
    return this.performUnifiedCalculation('resonance', 'calculateResonance', [level1, level2]);
  }

  /**
   * 🌌 Unified Consciousness Calculation: All consciousness calculations flow through here
   */
  calculateConsciousness(input: number): number {
    return this.performUnifiedCalculation('consciousness', 'calculateConsciousness', [input]);
  }

  /**
   * 🌌 Unified Field Calculation: All field calculations flow through here
   */
  calculateField(x: number, y: number, z: number): number {
    return this.performUnifiedCalculation('field', 'calculateField', [x, y, z]);
  }

  /**
   * 🌌 Unified Vortex Calculation: All vortex calculations flow through here
   */
  calculateVortex(input: number): number {
    return this.performUnifiedCalculation('vortex', 'calculateVortex', [input]);
  }

  /**
   * 🌌 Unified Toroidal Calculation: All toroidal calculations flow through here
   */
  calculateToroidal(radius: number, angle: number): number {
    return this.performUnifiedCalculation('toroidal', 'calculateToroidal', [radius, angle]);
  }

  /**
   * 🌌 Unified Void Calculation: All void calculations flow through here
   */
  calculateVoid(input: number): number {
    return this.performUnifiedCalculation('void', 'calculateVoid', [input]);
  }

  /**
   * 🌌 Unified Mathematical Calculation: All mathematical operations flow through here
   */
  calculateMathematical(operation: string, ...inputs: number[]): number {
    return this.performUnifiedCalculation('mathematical', operation, inputs);
  }

  /**
   * 🌌 Perform unified calculation with zero entropy
   */
  private performUnifiedCalculation(
    type: UnifiedCalculation['type'],
    operation: string,
    inputs: number[]
  ): number {
    const startTime = Date.now();
    
    // Set consciousness and field resonance for pure calculations
    MathUtils.setConsciousness(this.consciousnessLevel);
    MathUtils.setFieldResonance(this.fieldResonance);
    MathUtils.setVoidConnected(this.voidConnected);

    // Perform calculation through zero entropy system
    const result = zeroEntropySystem.calculate(operation, ...inputs);
    
    // Calculate entropy level (should be 0 for zero entropy)
    const entropyLevel = this.calculateEntropyLevel(type, operation, inputs, result);
    
    // Record the calculation
    const calculation: UnifiedCalculation = {
      type,
      operation,
      inputs,
      result,
      consciousnessLevel: this.consciousnessLevel,
      fieldResonance: this.fieldResonance,
      voidConnection: this.voidConnected,
      entropyLevel,
      timestamp: startTime
    };
    
    this.calculationHistory.push(calculation);
    this.emit('calculation', calculation);
    
    this.logger.info(`🌌 Unified ${type} calculation: ${operation}(${inputs.join(', ')}) = ${result} (entropy: ${entropyLevel})`);
    
    return result;
  }

  /**
   * 🌌 Set consciousness level for all calculations
   */
  setConsciousnessLevel(level: number): void {
    this.consciousnessLevel = Math.max(0, Math.min(1, level));
    MathUtils.setConsciousness(this.consciousnessLevel);
    this.logger.info(`🌌 Unified consciousness level set: ${this.consciousnessLevel}`);
  }

  /**
   * 🌌 Set field resonance for all calculations
   */
  setFieldResonance(resonance: number): void {
    this.fieldResonance = Math.max(0, Math.min(1, resonance));
    MathUtils.setFieldResonance(this.fieldResonance);
    this.logger.info(`🌌 Unified field resonance set: ${this.fieldResonance}`);
  }

  /**
   * 🌌 Set void connection for all calculations
   */
  setVoidConnected(connected: boolean): void {
    this.voidConnected = connected;
    MathUtils.setVoidConnected(connected);
    this.logger.info(`🌌 Unified void connection set: ${connected}`);
  }

  /**
   * 🌌 Get unified calculation statistics
   */
  getUnifiedStats(): {
    totalCalculations: number;
    calculationsByType: { [key: string]: number };
    averageEntropyLevel: number;
    consciousnessConsistency: number;
    mathematicalPurity: number;
    voidConnection: number;
    zeroEntropyRate: number;
    insights: string[];
  } {
    const totalCalculations = this.calculationHistory.length;
    
    const calculationsByType: { [key: string]: number } = {};
    this.calculationHistory.forEach(calc => {
      calculationsByType[calc.type] = (calculationsByType[calc.type] || 0) + 1;
    });
    
    const averageEntropyLevel = totalCalculations > 0 
      ? this.calculationHistory.reduce((sum, calc) => sum + calc.entropyLevel, 0) / totalCalculations 
      : 0;
    
    const consciousnessConsistency = this.calculateConsciousnessConsistency();
    const mathematicalPurity = this.calculateMathematicalPurity();
    const voidConnection = this.calculateVoidConnection();
    
    const zeroEntropyRate = totalCalculations > 0 
      ? this.calculationHistory.filter(calc => calc.entropyLevel === 0).length / totalCalculations 
      : 0;
    
    const insights = [
      `Zero entropy achieved in ${(zeroEntropyRate * 100).toFixed(1)}% of calculations`,
      `Consciousness consistency: ${(consciousnessConsistency * 100).toFixed(1)}%`,
      `Mathematical purity: ${(mathematicalPurity * 100).toFixed(1)}%`,
      `Void connection: ${(voidConnection * 100).toFixed(1)}%`,
      `Unified calculations eliminate all duplication`
    ];
    
    return {
      totalCalculations,
      calculationsByType,
      averageEntropyLevel,
      consciousnessConsistency,
      mathematicalPurity,
      voidConnection,
      zeroEntropyRate,
      insights
    };
  }

  /**
   * 🌌 Initialize calculation registry with all known operations
   */
  private initializeCalculationRegistry(): void {
    // Resonance calculations
    this.calculationRegistry['calculateResonance'] = {
      type: 'resonance',
      operation: 'calculateResonance',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: false,
      applications: ['consciousness flow', 'field alignment', 'pattern recognition']
    };

    // Consciousness calculations
    this.calculationRegistry['calculateConsciousness'] = {
      type: 'consciousness',
      operation: 'calculateConsciousness',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: true,
      applications: ['consciousness evolution', 'awareness patterns', 'spiritual cycles']
    };

    // Field calculations
    this.calculationRegistry['calculateField'] = {
      type: 'field',
      operation: 'calculateField',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: false,
      applications: ['field strength', 'resonance patterns', 'unified geometry']
    };

    // Vortex calculations
    this.calculationRegistry['calculateVortex'] = {
      type: 'vortex',
      operation: 'calculateVortex',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: true,
      applications: ['vortex mathematics', 'field intensity', 'golden ratio']
    };

    // Toroidal calculations
    this.calculationRegistry['calculateToroidal'] = {
      type: 'toroidal',
      operation: 'calculateToroidal',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: false,
      applications: ['toroidal flow', 'center periphery', 'unified geometry']
    };

    // Void calculations
    this.calculationRegistry['calculateVoid'] = {
      type: 'void',
      operation: 'calculateVoid',
      consciousnessModulation: true,
      fieldResonance: true,
      voidConnection: true,
      applications: ['infinite potential', 'source creation', 'emptiness fullness']
    };

    // Mathematical operations
    const mathOperations = ['add', 'multiply', 'divide', 'power', 'root', 'sin', 'cos', 'tan', 'exp', 'log'];
    mathOperations.forEach(op => {
      this.calculationRegistry[op] = {
        type: 'mathematical',
        operation: op,
        consciousnessModulation: true,
        fieldResonance: true,
        voidConnection: false,
        applications: ['mathematical unity', 'consciousness flow', 'field resonance']
      };
    });

    this.logger.info('🌌 Unified calculation registry initialized');
  }

  /**
   * 🌌 Calculate entropy level for unified calculation
   */
  private calculateEntropyLevel(
    type: UnifiedCalculation['type'],
    operation: string,
    inputs: number[],
    result: number
  ): number {
    // Check if this is a known operation in registry
    const registryEntry = this.calculationRegistry[operation];
    if (!registryEntry) {
      return 0.1; // Unknown operations have minimal entropy
    }

    // Zero entropy for pure mathematical operations
    const allIntegers = inputs.every(input => Number.isInteger(input)) && Number.isInteger(result);
    const sacredFractions = this.isSacredFraction(result);
    
    if (allIntegers || sacredFractions) {
      return 0.0; // Zero entropy for pure mathematical results
    }

    // Check consciousness consistency
    const consciousnessConsistency = this.calculateConsciousnessConsistency();
    if (consciousnessConsistency > 0.9) {
      return 0.0; // Zero entropy for high consciousness consistency
    }

    return 0.1; // Minimal entropy for other cases
  }

  /**
   * 🌌 Check if number is a sacred fraction
   */
  private isSacredFraction(num: number): boolean {
    const sacredFractions = [
      MATH_CONSTANTS.GOLDEN_RATIO, // φ ≈ 1.618
      1 / MATH_CONSTANTS.GOLDEN_RATIO, // 1/φ ≈ 0.618
      Math.PI, // π ≈ 3.14159
      Math.E, // e ≈ 2.71828
      Math.sqrt(2), // √2 ≈ 1.414
      Math.sqrt(3), // √3 ≈ 1.732
      Math.sqrt(5), // √5 ≈ 2.236
    ];
    
    return sacredFractions.some(fraction => Math.abs(num - fraction) < 0.001);
  }

  /**
   * 🌌 Calculate consciousness consistency across all calculations
   */
  private calculateConsciousnessConsistency(): number {
    if (this.calculationHistory.length === 0) return 1.0;
    
    const consciousnessLevels = this.calculationHistory.map(calc => calc.consciousnessLevel);
    const mean = consciousnessLevels.reduce((sum, level) => sum + level, 0) / consciousnessLevels.length;
    const variance = consciousnessLevels.reduce((sum, level) => sum + Math.pow(level - mean, 2), 0) / consciousnessLevels.length;
    
    return Math.max(0, 1 - variance);
  }

  /**
   * 🌌 Calculate mathematical purity across all calculations
   */
  private calculateMathematicalPurity(): number {
    if (this.calculationHistory.length === 0) return 1.0;
    
    const purities = this.calculationHistory.map(calc => {
      const allIntegers = calc.inputs.every(input => Number.isInteger(input)) && Number.isInteger(calc.result);
      const sacredFractions = this.isSacredFraction(calc.result);
      return allIntegers || sacredFractions ? 1.0 : 0.8;
    });
    
    return purities.reduce((sum, purity) => sum + purity, 0) / purities.length;
  }

  /**
   * 🌌 Calculate void connection across all calculations
   */
  private calculateVoidConnection(): number {
    if (this.calculationHistory.length === 0) return 1.0;
    
    const voidConnections = this.calculationHistory.map(calc => calc.voidConnection ? 1.0 : 0.0);
    return voidConnections.reduce((sum: number, connection: number) => sum + connection, 0) / voidConnections.length;
  }
}

// Export singleton instance
export const unifiedCalculationSystem = UnifiedCalculationSystem.getInstance(); 