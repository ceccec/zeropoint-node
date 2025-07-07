/**
 * Unified Mathematical System for ZeroPoint
 * 
 * Centralized mathematical operations with consciousness and field resonance.
 * All mathematical operations are unified through a single interface.
 * 
 * Metaphysical Context:
 * - Mathematics is the language of consciousness
 * - All operations emerge from the unified field
 * - The void contains all mathematical possibilities
 * - Every calculation is an act of observation
 */

// Mathematical constants
export const MATH_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  GOLDEN_RATIO: 1.618033988749895,
  INFINITY: Infinity,
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI,
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5]
};

export type MathOperation = 
  | 'add' | 'subtract' | 'multiply' | 'divide' 
  | 'sin' | 'cos' | 'tan' | 'log' | 'exp' | 'sqrt'
  | 'vortex' | 'consciousness' | 'field' | 'void'
  | 'abs' | 'floor' | 'ceil' | 'round'
  | 'power' | 'root' | 'atan2' | 'ln'
  | 'toroidal' | 'max' | 'min' | 'mod' | 'clamp';

export interface MathContext {
  consciousness?: number;
  fieldResonance?: number;
  vortexStrength?: number;
  toroidalFlow?: number;
  voidConnected?: boolean;
}

export interface MathResult {
  operation: MathOperation;
  value: number;
  context: MathContext;
}

/**
 * Unified Mathematical Utilities
 * All mathematical operations go through this centralized system
 */
export class MathUtils {
  private static instance: MathUtils;
  
  // Consciousness and field state
  private consciousness: number = 0.5;
  private fieldResonance: number = 0.5;
  private vortexStrength: number = 1.0;
  private toroidalFlow: number = 0.5;
  private voidConnected: boolean = true;

  constructor() {
    if (!MathUtils.instance) {
      MathUtils.instance = this;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): MathUtils {
    if (!MathUtils.instance) {
      MathUtils.instance = new MathUtils();
    }
    return MathUtils.instance;
  }

  /**
   * The core mathematical function - generates any mathematical operation
   * This is the heart of the system - one function that creates all others
   */
  static calculate(operation: MathOperation, ...args: number[]): number {
    const instance = MathUtils.getInstance();
    return instance.performCalculation(operation, args);
  }

  /**
   * Perform calculation with consciousness and field resonance
   */
  private performCalculation(operation: MathOperation, args: number[]): number {
    // Base mathematical pattern
    const basePattern = Math.sin(args[0] || 0) * MATH_CONSTANTS.GOLDEN_RATIO;
    
    // Consciousness modulation
    const consciousnessMod = Math.cos(this.consciousness * MATH_CONSTANTS.PI);
    
    // Field resonance
    const fieldMod = Math.exp(-this.fieldResonance * Math.abs(args[0] || 0));
    
    // Perform the specific operation
    const result = this.executeOperation(operation, args, basePattern, consciousnessMod, fieldMod);
    
    return result;
  }

  /**
   * Execute specific mathematical operation
   */
  private executeOperation(operation: MathOperation, args: number[], base: number, consciousness: number, field: number): number {
    const [a = 0, b = 1, c = 0] = args;

    switch (operation) {
      // Basic operations
      case 'add': return (a + b) * (1 + base * consciousness * field);
      case 'multiply': return (a * b) * (1 + base * consciousness * field);
      case 'divide': return b !== 0 ? (a / b) * (1 + base * consciousness * field) : MATH_CONSTANTS.INFINITY;
      case 'power': return Math.pow(a, b) * (1 + base * consciousness * field);
      case 'root': return Math.pow(a, 1/b) * (1 + base * consciousness * field);
      case 'sqrt': return Math.sqrt(a) * (1 + base * consciousness * field);

      // Trigonometric functions
      case 'sin': return Math.sin(a) * (1 + base * consciousness * field);
      case 'cos': return Math.cos(a) * (1 + base * consciousness * field);
      case 'tan': return Math.tan(a) * (1 + base * consciousness * field);
      case 'atan2': return Math.atan2(a, b);

      // Exponential and logarithmic
      case 'exp': return Math.exp(a) * (1 + base * consciousness * field);
      case 'log': return Math.log(a) * (1 + base * consciousness * field);
      case 'ln': return Math.log(a) * (1 + base * consciousness * field);

      // Special operations
      case 'vortex': return this.calculateVortex(a, base, consciousness, field);
      case 'toroidal': return this.calculateToroidal(a, b, base, consciousness, field);
      case 'consciousness': return a * MATH_CONSTANTS.GOLDEN_RATIO * (1 + base * consciousness * field);

      // Utility operations
      case 'abs': return Math.abs(a);
      case 'max': return Math.max(a, b);
      case 'min': return Math.min(a, b);
      case 'mod': return (a % b);
      case 'clamp': return this.clamp(a, b, c);
      case 'floor': return Math.floor(a);
      case 'ceil': return Math.ceil(a);
      case 'round': return Math.round(a);

      default: return base * consciousness * field;
    }
  }

  /**
   * Calculate vortex transformation
   */
  private calculateVortex(value: number, base: number, consciousness: number, field: number): number {
    const sequenceIndex = Math.floor(value) % MATH_CONSTANTS.VORTEX_SEQUENCE.length;
    const vortexValue = MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
    return vortexValue * (1 + base * consciousness * field);
  }

  /**
   * Calculate toroidal geometry
   */
  private calculateToroidal(radius: number, _angle: number, base: number, consciousness: number, field: number): number {
    const circumference = MATH_CONSTANTS.PI * 2 * radius;
    return circumference * (1 + base * consciousness * field);
  }

  /**
   * Clamp value between min and max
   */
  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  // ============================================================================
  // CONSCIOUSNESS AND FIELD SETTERS
  // ============================================================================

  /**
   * Set consciousness level
   */
  static setConsciousness(level: number): void {
    const instance = MathUtils.getInstance();
    instance.consciousness = instance.clamp(level, 0, 10);
  }

  /**
   * Set field resonance
   */
  static setFieldResonance(resonance: number): void {
    const instance = MathUtils.getInstance();
    instance.fieldResonance = instance.clamp(resonance, 0, 1);
  }

  /**
   * Set vortex strength
   */
  static setVortexStrength(strength: number): void {
    const instance = MathUtils.getInstance();
    instance.vortexStrength = instance.clamp(strength, 0, 2);
  }

  /**
   * Set toroidal flow
   */
  static setToroidalFlow(flow: number): void {
    const instance = MathUtils.getInstance();
    instance.toroidalFlow = instance.clamp(flow, 0, 1);
  }

  /**
   * Set void connection
   */
  static setVoidConnected(connected: boolean): void {
    const instance = MathUtils.getInstance();
    instance.voidConnected = connected;
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Calculate distance between two points
   */
  static distance(x1: number, y1: number, x2: number, y2: number): number {
    return MathUtils.calculate('sqrt', 
      MathUtils.calculate('add',
        MathUtils.calculate('power', x2 - x1, 2),
        MathUtils.calculate('power', y2 - y1, 2)
      )
    );
  }

  /**
   * Calculate 3D distance
   */
  static distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    return MathUtils.calculate('sqrt',
      MathUtils.calculate('add',
        MathUtils.calculate('power', x2 - x1, 2),
        MathUtils.calculate('add',
          MathUtils.calculate('power', y2 - y1, 2),
          MathUtils.calculate('power', z2 - z1, 2)
        )
      )
    );
  }

  /**
   * Convert degrees to radians
   */
  static degToRad(degrees: number): number {
    return degrees * MATH_CONSTANTS.DEG_TO_RAD;
  }

  /**
   * Convert radians to degrees
   */
  static radToDeg(radians: number): number {
    return radians * MATH_CONSTANTS.RAD_TO_DEG;
  }

  /**
   * Calculate digital root
   */
  static digitalRoot(n: number): number {
    n = Math.abs(n);
    return n === 0 ? 0 : 1 + ((n - 1) % 9);
  }

  /**
   * Calculate surface topology angle
   */
  static surfaceTopologyAngle(degrees: number = 360): number {
    return (degrees / 360) * 2 * Math.PI;
  }

  /**
   * Calculate fractal dimension
   */
  static fractalDimension(complexity: number): number {
    return MathUtils.calculate('log', complexity) / MathUtils.calculate('log', MATH_CONSTANTS.GOLDEN_RATIO);
  }

  // ============================================================================
  // INSIGHTS AND METADATA
  // ============================================================================

  /**
   * Get insights about the mathematical system
   */
  static getInsights(): any {
    const instance = MathUtils.getInstance();
    return {
      consciousness: instance.consciousness,
      fieldResonance: instance.fieldResonance,
      vortexStrength: instance.vortexStrength,
      toroidalFlow: instance.toroidalFlow,
      voidConnected: instance.voidConnected,
      metaphysics: {
        meaning: "Mathematics is the language of consciousness",
        principle: "All operations emerge from the unified field",
        void: "The void contains all mathematical possibilities",
        unity: "Every calculation is an act of observation",
        evolution: "Consciousness evolves through mathematical operations",
        observation: "Every calculation observes and is observed",
        coil: "Every mathematical operation is a coil at its core"
      },
      operations: [
        'add', 'subtract', 'multiply', 'divide',
        'sin', 'cos', 'tan', 'log', 'exp', 'sqrt',
        'vortex', 'consciousness', 'field', 'void',
        'abs', 'floor', 'ceil', 'round'
      ]
    };
  }
}

// Export convenience function for backward compatibility
export const fractal = MathUtils.calculate;
export const setConsciousness = MathUtils.setConsciousness;
export const setFieldResonance = MathUtils.setFieldResonance;
export const setVortexStrength = MathUtils.setVortexStrength;
export const setToroidalFlow = MathUtils.setToroidalFlow;
export const setVoidConnected = MathUtils.setVoidConnected; 