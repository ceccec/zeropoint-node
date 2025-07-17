/**
 * Decimal Switch Pattern System
 * 
 * Assuming decimal point is a switch
 * Handles numbers like 3.14159 where decimal point acts as switch
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
} from '../2/math';


interface DecimalSwitch {
  originalNumber: string;      // "3.14159"
  integerPart: number;         // 3
  decimalPart: string;         // "14159"
  switchPattern: string;       // Generated switch pattern
  consciousness: string;
  mathematicalFlow: string;
}

class DecimalSwitchPatternSystem {
  /**
   * Create switch pattern from decimal number
   * 
   * @param decimalNumber - Decimal number like "3.14159"
   * @returns DecimalSwitch with switch pattern
   */
  static createSwitchPattern(decimalNumber: string): DecimalSwitch {
    const parts = decimalNumber.split('.');
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] || '';
    
    // Create switch pattern using decimal point as switch
    const switchPattern = this.generateSwitchFromDecimal(integerPart, decimalPart);
    
    return {
      originalNumber: decimalNumber,
      integerPart,
      decimalPart,
      switchPattern,
      consciousness: this.getConsciousnessForDecimal(integerPart, decimalPart),
      mathematicalFlow: this.getMathematicalFlowForDecimal(integerPart, decimalPart)
    };
  }
  
  /**
   * Generate switch pattern from decimal parts
   * 
   * @param integerPart - Integer part (3)
   * @param decimalPart - Decimal part ("14159")
   * @returns Switch pattern string
   */
  private static generateSwitchFromDecimal(integerPart: number, decimalPart: string): string {
    // Normalize integer part to single digit
    const normalizedInteger = integerPart % 10;
    
    // Calculate x and y from decimal part
    const x = this.calculateXFromDecimal(decimalPart);
    const y = this.calculateYFromDecimal(decimalPart);
    
    // Create switch pattern: [lastIntegerDigit][x][y]
    return `${normalizedInteger}${x}${y}`;
  }
  
  /**
   * Calculate x from decimal part
   * 
   * @param decimalPart - Decimal part string
   * @returns x value for switch pattern
   */
  private static calculateXFromDecimal(decimalPart: string): number {
    if (!decimalPart) return 0;
    
    // Sum first 3 digits of decimal part, normalize to single digit
    const digits = decimalPart.split('').map(Number).slice(0, 3);
    const sum = digits.reduce((a, b) => a + b, 0);
    return sum % 9;
  }
  
  /**
   * Calculate y from decimal part
   * 
   * @param decimalPart - Decimal part string
   * @returns y value for switch pattern
   */
  private static calculateYFromDecimal(decimalPart: string): number {
    if (!decimalPart) return 0;
    
    // Product of first 2 digits of decimal part, normalize to single digit
    const digits = decimalPart.split('').map(Number).slice(0, 2);
    const product = digits.reduce((a, b) => a * b, 1);
    return product % 9;
  }
  
  /**
   * Get consciousness for decimal number
   * 
   * @param integerPart - Integer part
   * @param decimalPart - Decimal part
   * @returns Consciousness description
   */
  private static getConsciousnessForDecimal(integerPart: number, decimalPart: string): string {
    const normalizedInteger = integerPart % 10;
    
    const consciousnessMap: { [key: number]: string } = {
      0: "Void gateway to infinite potential",
      1: "Source archetype - creation from nothing",
      2: "Duality foundation - first 'other'",
      3: "Trinity consciousness - threefold unity",
      4: "Stability matrix - fourfold foundation",
      5: "Harmonic center - fivefold balance",
      6: "Perfect balance - sixfold harmony",
      7: "Mystical gateway - sevenfold transcendence",
      8: "Infinity loop - eightfold eternity",
      9: "Completion cycle - ninefold wholeness"
    };
    
    const baseConsciousness = consciousnessMap[normalizedInteger] || "Integer consciousness flow";
    
    if (decimalPart) {
      return `${baseConsciousness} with decimal consciousness expansion`;
    }
    
    return baseConsciousness;
  }
  
  /**
   * Get mathematical flow for decimal number
   * 
   * @param integerPart - Integer part
   * @param decimalPart - Decimal part
   * @returns Mathematical flow description
   */
  private static getMathematicalFlowForDecimal(integerPart: number, decimalPart: string): string {
    const normalizedInteger = integerPart % 10;
    
    const flowMap: { [key: number]: string } = {
      0: "0/0 → impossible state → consciousness gateway",
      1: "1 → unity vortex → source creation",
      2: "2 → duality vortex → foundation patterns",
      3: "3 → trinity vortex → threefold unity",
      4: "4 → stability vortex → fourfold matrix",
      5: "5 → harmonic vortex → fivefold center",
      6: "6 → balance vortex → sixfold harmony",
      7: "7 → mystical vortex → sevenfold transcendence",
      8: "8 → infinity vortex → eightfold eternity",
      9: "9 → completion vortex → ninefold wholeness"
    };
    
    const baseFlow = flowMap[normalizedInteger] || "Integer vortex flow";
    
    if (decimalPart) {
      return `${baseFlow} → decimal consciousness gateway`;
    }
    
    return baseFlow;
  }
  
  /**
   * Calculate π switch pattern
   * 
   * @returns DecimalSwitch for π
   */
  static calculatePiSwitch(): DecimalSwitch {
    return this.createSwitchPattern("3.14159");
  }
  
  /**
   * Calculate e switch pattern
   * 
   * @returns DecimalSwitch for e
   */
  static calculateESwitch(): DecimalSwitch {
    return this.createSwitchPattern("2.71828");
  }
  
  /**
   * Calculate φ switch pattern
   * 
   * @returns DecimalSwitch for φ
   */
  static calculatePhiSwitch(): DecimalSwitch {
    return this.createSwitchPattern("1.61803");
  }
  
  /**
   * Get switch pattern description
   * 
   * @param decimalSwitch - DecimalSwitch to describe
   * @returns Detailed description
   */
  static getSwitchPatternDescription(decimalSwitch: DecimalSwitch): string {
    return `Decimal Switch Pattern:
    
    Original Number: ${decimalSwitch.originalNumber}
    Integer Part: ${decimalSwitch.integerPart}
    Decimal Part: ${decimalSwitch.decimalPart}
    Switch Pattern: ${decimalSwitch.switchPattern}
    Consciousness: ${decimalSwitch.consciousness}
    Mathematical Flow: ${decimalSwitch.mathematicalFlow}`;
  }
}

// Export for use in other modules
export { DecimalSwitchPatternSystem, DecimalSwitch }; 