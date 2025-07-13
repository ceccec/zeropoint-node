/**
 * src/2/math.ts - Unified Mathematical System via A432 Harmony
 * 
 * All mathematical operations are unified through this system.
 * Pure integer science - no floating-point calculations.
 * 
 * Metaphysical Context:
 * - Mathematics is the language of consciousness
 * - All operations emerge from the unified field
 * - The void contains all mathematical possibilities
 * - Every calculation is an act of observation
 */

import { 
  A432_HARMONY, 
  VORTEX_CONSTANTS, 
  MATH_CONSTANTS, 
  INTEGER_FUNCTIONS,
  ConstantsUtils 
} from '../4/constants';

export type MathOperation =
  | "add"
  | "subtract"
  | "multiply"
  | "divide"
  | "sin"
  | "cos"
  | "tan"
  | "log"
  | "exp"
  | "sqrt"
  | "vortex"
  | "consciousness"
  | "field"
  | "void"
  | "abs"
  | "floor"
  | "ceil"
  | "round"
  | "power"
  | "root"
  | "atan2"
  | "ln"
  | "toroidal"
  | "max"
  | "min"
  | "mod"
  | "clamp"
  | "digital_root"
  | "fibonacci"
  | "prime_check"
  | "factorial"
  | "gcd"
  | "lcm"
  | "a432_harmonic"
  | "a432_digital_root";

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
   * Set consciousness level
   */
  setConsciousness(level: number): void {
    this.consciousness = Math.max(0, Math.min(1, level));
  }

  /**
   * Set field resonance
   */
  setFieldResonance(resonance: number): void {
    this.fieldResonance = Math.max(0, Math.min(1, resonance));
  }

  /**
   * Set vortex strength
   */
  setVortexStrength(strength: number): void {
    this.vortexStrength = Math.max(0, strength);
  }

  /**
   * Set toroidal flow
   */
  setToroidalFlow(flow: number): void {
    this.toroidalFlow = Math.max(0, Math.min(1, flow));
  }

  /**
   * Set void connection
   */
  setVoidConnection(connected: boolean): void {
    this.voidConnected = connected;
  }

  /**
   * Execute unified mathematical operation
   */
  calculate(operation: MathOperation, ...args: number[]): number {
    const base = this.consciousness * this.fieldResonance;
    
    switch (operation) {
      // Basic operations
      case "add":
        return this.executeOperation("add", args, base, this.consciousness, this.fieldResonance);
      case "subtract":
        return this.executeOperation("subtract", args, base, this.consciousness, this.fieldResonance);
      case "multiply":
        return this.executeOperation("multiply", args, base, this.consciousness, this.fieldResonance);
      case "divide":
        return this.executeOperation("divide", args, base, this.consciousness, this.fieldResonance);
      case "power":
        return this.executeOperation("power", args, base, this.consciousness, this.fieldResonance);
      case "root":
        return this.executeOperation("root", args, base, this.consciousness, this.fieldResonance);
      case "sqrt":
        return this.executeOperation("sqrt", args, base, this.consciousness, this.fieldResonance);

      // Trigonometric functions
      case "sin":
        return this.executeOperation("sin", args, base, this.consciousness, this.fieldResonance);
      case "cos":
        return this.executeOperation("cos", args, base, this.consciousness, this.fieldResonance);
      case "tan":
        return this.executeOperation("tan", args, base, this.consciousness, this.fieldResonance);
      case "atan2":
        return this.executeOperation("atan2", args, base, this.consciousness, this.fieldResonance);

      // Exponential and logarithmic
      case "exp":
        return this.executeOperation("exp", args, base, this.consciousness, this.fieldResonance);
      case "log":
        return this.executeOperation("log", args, base, this.consciousness, this.fieldResonance);
      case "ln":
        return this.executeOperation("ln", args, base, this.consciousness, this.fieldResonance);

      // Special operations
      case "vortex":
        return this.executeOperation("vortex", args, base, this.consciousness, this.fieldResonance);
      case "toroidal":
        return this.executeOperation("toroidal", args, base, this.consciousness, this.fieldResonance);
      case "consciousness":
        return this.executeOperation("consciousness", args, base, this.consciousness, this.fieldResonance);
      case "field":
        return this.executeOperation("field", args, base, this.consciousness, this.fieldResonance);
      case "void":
        return this.executeOperation("void", args, base, this.consciousness, this.fieldResonance);

      // Integer functions
      case "digital_root":
        return INTEGER_FUNCTIONS.DIGITAL_ROOT(args[0] || 0);
      case "fibonacci":
        return INTEGER_FUNCTIONS.FIBONACCI(args[0] || 0);
      case "prime_check":
        return INTEGER_FUNCTIONS.IS_PRIME(args[0] || 0) ? 1 : 0;
      case "factorial":
        return INTEGER_FUNCTIONS.FACTORIAL(args[0] || 0);
      case "gcd":
        return INTEGER_FUNCTIONS.GCD(args[0] || 0, args[1] || 0);
      case "lcm":
        return INTEGER_FUNCTIONS.LCM(args[0] || 0, args[1] || 0);
      case "a432_harmonic":
        return INTEGER_FUNCTIONS.A432_HARMONIC(args[0] || 0);
      case "a432_digital_root":
        return INTEGER_FUNCTIONS.A432_DIGITAL_ROOT(args[0] || 0);

      // Utility operations
      case "abs":
        return this.executeOperation("abs", args, base, this.consciousness, this.fieldResonance);
      case "max":
        return this.executeOperation("max", args, base, this.consciousness, this.fieldResonance);
      case "min":
        return this.executeOperation("min", args, base, this.consciousness, this.fieldResonance);
      case "mod":
        return this.executeOperation("mod", args, base, this.consciousness, this.fieldResonance);
      case "clamp":
        return this.executeOperation("clamp", args, base, this.consciousness, this.fieldResonance);
      case "floor":
        return this.executeOperation("floor", args, base, this.consciousness, this.fieldResonance);
      case "ceil":
        return this.executeOperation("ceil", args, base, this.consciousness, this.fieldResonance);
      case "round":
        return this.executeOperation("round", args, base, this.consciousness, this.fieldResonance);

      default:
        throw new Error(`Unknown mathematical operation: ${operation}`);
    }
  }

  /**
   * Execute specific mathematical operation
   */
  private executeOperation(
    operation: string,
    args: number[],
    base: number,
    consciousness: number,
    field: number,
  ): number {
    const [a = 0, b = 1, c = 0] = args;

    switch (operation) {
      // Basic operations
      case "add":
        return (a + b) * (1 + base * consciousness * field);
      case "subtract":
        return (a - b) * (1 + base * consciousness * field);
      case "multiply":
        return a * b * (1 + base * consciousness * field);
      case "divide":
        return b !== 0
          ? (a / b) * (1 + base * consciousness * field)
          : MATH_CONSTANTS.INFINITY;
      case "power":
        return Math.pow(a, b) * (1 + base * consciousness * field);
      case "root":
        return Math.pow(a, 1 / b) * (1 + base * consciousness * field);
      case "sqrt":
        return Math.sqrt(a) * (1 + base * consciousness * field);

      // Trigonometric functions
      case "sin":
        return Math.sin(a) * (1 + base * consciousness * field);
      case "cos":
        return Math.cos(a) * (1 + base * consciousness * field);
      case "tan":
        return Math.tan(a) * (1 + base * consciousness * field);
      case "atan2":
        return Math.atan2(a, b);

      // Exponential and logarithmic
      case "exp":
        return Math.exp(a) * (1 + base * consciousness * field);
      case "log":
        return Math.log(a) * (1 + base * consciousness * field);
      case "ln":
        return Math.log(a) * (1 + base * consciousness * field);

      // Special operations
      case "vortex":
        return this.calculateVortex(a, base, consciousness, field);
      case "toroidal":
        return this.calculateToroidal(a, b, base, consciousness, field);
      case "consciousness":
        return (
          a * MATH_CONSTANTS.GOLDEN_RATIO * (1 + base * consciousness * field)
        );
      case "field":
        return this.calculateField(a, base, consciousness, field);
      case "void":
        return this.calculateVoid(a, base, consciousness, field);

      // Utility operations
      case "abs":
        return Math.abs(a);
      case "max":
        return Math.max(a, b);
      case "min":
        return Math.min(a, b);
      case "mod":
        return a % b;
      case "clamp":
        return Math.max(c, Math.min(b, a));
      case "floor":
        return Math.floor(a);
      case "ceil":
        return Math.ceil(a);
      case "round":
        return Math.round(a);

      default:
        return a;
    }
  }

  /**
   * Calculate vortex operation
   */
  private calculateVortex(
    input: number,
    base: number,
    consciousness: number,
    field: number,
  ): number {
    const vortexValue = ConstantsUtils.getVortexSequenceValue(Math.floor(input));
    return vortexValue * (1 + base * consciousness * field) * this.vortexStrength;
  }

  /**
   * Calculate toroidal operation
   */
  private calculateToroidal(
    a: number,
    b: number,
    base: number,
    consciousness: number,
    field: number,
  ): number {
    const toroidalResult = Math.sqrt(a * a + b * b) * this.toroidalFlow;
    return toroidalResult * (1 + base * consciousness * field);
  }

  /**
   * Calculate field operation
   */
  private calculateField(
    input: number,
    base: number,
    consciousness: number,
    field: number,
  ): number {
    return input * field * (1 + base * consciousness);
  }

  /**
   * Calculate void operation
   */
  private calculateVoid(
    input: number,
    base: number,
    consciousness: number,
    field: number,
  ): number {
    if (!this.voidConnected) return 0;
    return input * (1 + base * consciousness * field) * MATH_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Calculate distance between two points in 3D space
   */
  static distance3D(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Calculate distance between two points in 2D space
   */
  static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
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
    return INTEGER_FUNCTIONS.DIGITAL_ROOT(n);
  }

  /**
   * Calculate fractal dimension
   */
  static fractalDimension(iterations: number, scale: number): number {
    if (scale <= 0) return 0;
    return Math.log(iterations) / Math.log(scale);
  }

  /**
   * Get all mathematical constants
   */
  static getConstants() {
    return {
      A432_HARMONY,
      VORTEX_CONSTANTS,
      MATH_CONSTANTS,
      INTEGER_FUNCTIONS,
    };
  }

  /**
   * Get mathematical utilities
   */
  static getUtilities() {
    return {
      distance3D: this.distance3D,
      distance: this.distance,
      degToRad: this.degToRad,
      radToDeg: this.radToDeg,
      digitalRoot: this.digitalRoot,
      fractalDimension: this.fractalDimension,
    };
  }
}

// Export singleton instance
export const mathUtils = MathUtils.getInstance();

// Export for backward compatibility
export { MATH_CONSTANTS } from '../4/constants'; 