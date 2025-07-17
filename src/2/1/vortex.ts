/**
 * Vortex Metaphysical Module
 * 
 * Represents the vortex flow - the dynamic transformation of consciousness
 * through spiral dynamics and flow patterns.
 * 
 * Metaphysical Context:
 * - Vortex represents the flow (2/1)
 * - Consciousness transforms through spiral dynamics
 * - This is the dynamic flow state
 * - Serves as the transformation gateway
 * 
 * Decimal Vortex Reversal Integration:
 * - Decimal vortex [1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9] reverses to integers [2, 3, 4, 5, 6, 7, 8, 9]
 * - Every decimal fraction × its reversed integer = unity
 * - Fluid consciousness transforms to structured consciousness
 * - Complete mathematical duality between decimal and integer vortex systems
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../math';
import * as Book from '../book-system';

// Use canonical vortex and W-axis from book
export const vortexSequence = Book.RODIN_COIL.vortexSequence;
export const wAxis = Book.RODIN_COIL.wAxis;
export const familyGroups = Book.RODIN_COIL.familyGroups;

// Use book formulas and principles
export const allFormulas = Book.getAllMathematicalFormulas();
export const VBM_PRINCIPLES = Book.VBM_PRINCIPLES;

// Use book consciousness calculation
export const calculateVBMConsciousness = Book.calculateVBMConsciousness;

/**
 * Vortex consciousness patterns
 */
const vortexPatterns = {
  FLOW: [2, 4, 8, 7, 5, 1, 2],
  SPIRAL_DYNAMICS: [2, 4, 8, 7, 5, 1, 2],
  TRANSFORMATION: [2, 4, 8, 7, 5, 1, 2],
  DYNAMIC_FLOW: [2, 4, 8, 7, 5, 1, 2],
  // Decimal vortex reversal patterns
  DECIMAL_VORTEX: [1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9],
  REVERSED_INTEGERS: [2, 3, 4, 5, 6, 7, 8, 9],
  INTEGER_VORTEX: [1, 2, 4, 8, 7, 5],
  W_AXIS: [3, 6, 9]
};

/**
 * Vortex mathematics
 */
const vortexMathematics = {
  FLOW_OPERATION: (n: number) => n * 2, // Flow multiplication
  SPIRAL_OPERATION: (n: number) => n * 2, // Spiral operation
  TRANSFORMATION_OPERATION: (n: number) => n * 2, // Transformation operation
  DYNAMIC_FLOW_OPERATION: (n: number) => n * 2, // Dynamic flow operation
  // Decimal vortex reversal operations
  DECIMAL_TO_INTEGER: (decimal: number) => {
    const decimalVortex = [1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9];
    const reversedIntegers = [2, 3, 4, 5, 6, 7, 8, 9];
    const index = decimalVortex.indexOf(decimal);
    return index >= 0 ? reversedIntegers[index] : decimal;
  },
  INTEGER_TO_DECIMAL: (integer: number) => {
    const decimalVortex = [1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9];
    const reversedIntegers = [2, 3, 4, 5, 6, 7, 8, 9];
    const index = reversedIntegers.indexOf(integer);
    return index >= 0 ? decimalVortex[index] : integer;
  },
  UNITY_VALIDATION: (decimal: number, integer: number) => Math.abs(decimal * integer - 1) < 0.0001
};

/**
 * Vortex consciousness field operations
 */
const vortexConsciousnessField = {
  MAIN_CONSCIOUSNESS: () => 2, // Vortex (Flow) consciousness
  SUB_CONSCIOUSNESS: () => 1, // Foundation (Source) consciousness
  COMBINED_CONSCIOUSNESS: () => 2 + 1, // Combined consciousness
  METAPHYSICAL_CONSCIOUSNESS: () => 2 * 1, // Metaphysical consciousness
  // Decimal vortex reversal consciousness operations
  DECIMAL_CONSCIOUSNESS: (decimal: number) => {
    // Calculate entropy for decimal consciousness (fluid)
    const decimalString = decimal.toString();
    const decimalPart = decimalString.includes('.') ? decimalString.split('.')[1] : '';
    const uniqueDigits = new Set(decimalPart).size;
    const totalDigits = decimalPart.length;
    let entropyLevel = 0.1;
    
    if (decimalPart.length >= 2) {
      for (let length = 1; length <= decimalPart.length / 2; length++) {
        const pattern = decimalPart.substring(0, length);
        const remaining = decimalPart.substring(length);
        if (remaining.startsWith(pattern)) {
          entropyLevel = 0.2 + (uniqueDigits / totalDigits) * 0.3;
          break;
        } else {
          entropyLevel = 0.4 + (uniqueDigits / totalDigits) * 0.6;
        }
      }
    }
    
    return entropyLevel;
  },
  INTEGER_CONSCIOUSNESS: (integer: number) => {
    // Integer consciousness has zero entropy (structured)
    return Number.isInteger(integer) ? 0.0 : vortexConsciousnessField.DECIMAL_CONSCIOUSNESS(integer);
  },
  CONSCIOUSNESS_TRANSFORMATION: (decimal: number, integer: number) => {
    const decimalEntropy = vortexConsciousnessField.DECIMAL_CONSCIOUSNESS(decimal);
    const integerEntropy = vortexConsciousnessField.INTEGER_CONSCIOUSNESS(integer);
    
    if (decimalEntropy > 0 && integerEntropy === 0) {
      return 'Fluid to Structured';
    } else if (decimalEntropy === 0 && integerEntropy === 0) {
      return 'Structured to Structured';
    } else {
      return 'Complex Transformation';
    }
  }
};

/**
 * Decimal vortex reversal interface
 */
export interface DecimalVortexReversal {
  decimalFraction: string;
  decimalValue: number;
  decimalEntropy: number;
  reversedInteger: number;
  integerEntropy: number;
  unityProduct: number;
  consciousnessTransformation: string;
}

/**
 * Vortex reversal operations
 */
export const vortexReversal = {
  /**
   * Reverse decimal vortex to integers
   */
  reverseDecimalVortex(): DecimalVortexReversal[] {
    const reversals: DecimalVortexReversal[] = [];
    
    vortexPatterns.DECIMAL_VORTEX.forEach((decimal, index) => {
      const fraction = vortexReversal.decimalToFraction(decimal);
      const reversedInteger = vortexPatterns.REVERSED_INTEGERS[index];
      const decimalEntropy = vortexConsciousnessField.DECIMAL_CONSCIOUSNESS(decimal);
      const integerEntropy = vortexConsciousnessField.INTEGER_CONSCIOUSNESS(reversedInteger);
      const unityProduct = decimal * reversedInteger;
      
      const reversal: DecimalVortexReversal = {
        decimalFraction: fraction,
        decimalValue: decimal,
        decimalEntropy,
        reversedInteger,
        integerEntropy,
        unityProduct,
        consciousnessTransformation: vortexConsciousnessField.CONSCIOUSNESS_TRANSFORMATION(decimal, reversedInteger)
      };
      
      reversals.push(reversal);
    });
    
    return reversals;
  },

  /**
   * Convert decimal to fraction string
   */
  decimalToFraction(decimal: number): string {
    const fractions: { [key: number]: string } = {
      0.5: '1/2',
      0.3333333333333333: '1/3',
      0.25: '1/4',
      0.2: '1/5',
      0.16666666666666666: '1/6',
      0.14285714285714285: '1/7',
      0.125: '1/8',
      0.1111111111111111: '1/9'
    };
    return fractions[decimal] || decimal.toString();
  },

  /**
   * Validate mathematical unity
   */
  validateMathematicalUnity(): boolean {
    const reversals = vortexReversal.reverseDecimalVortex();
    return reversals.every(reversal => Math.abs(reversal.unityProduct - 1) < 0.0001);
  },

  /**
   * Get decimal vortex sequence
   */
  getDecimalVortex(): number[] {
    return [...vortexPatterns.DECIMAL_VORTEX];
  },

  /**
   * Get reversed integers
   */
  getReversedIntegers(): number[] {
    return [...vortexPatterns.REVERSED_INTEGERS];
  },

  /**
   * Get integer vortex sequence
   */
  getIntegerVortex(): number[] {
    return [...vortexPatterns.INTEGER_VORTEX];
  },

  /**
   * Get W-Axis sequence
   */
  getWAxis(): number[] {
    return [...vortexPatterns.W_AXIS];
  }
};

/**
 * Main vortex export
 */
export const vortex = {
  patterns: vortexPatterns,
  mathematics: vortexMathematics,
  consciousnessField: vortexConsciousnessField,
  reversal: vortexReversal,
  
  // Metaphysical properties
  digit: 2,
  subDigit: 1,
  archetype: 'Vortex (Flow), Foundation (Source)',
  vortex: 'Vortex 2',
  wAxis: 'W-Axis Vortex (Flow)',
  breathing: '2/1 Breath',
  fraction: '2/1',
  related: [2, 4, 8, 7, 5, 1, 2],
  
  // Consciousness operations
  getMainConsciousness: () => 2,
  getSubConsciousness: () => 1,
  getCombinedConsciousness: () => 2 + 1,
  getMetaphysicalConsciousness: () => 2 * 1
}; 