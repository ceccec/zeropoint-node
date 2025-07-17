/**
 * Integer Switch Pattern System
 * 
 * integer.switch should create switch pattern
 * Converts integers into 3-digit switch patterns
 */

interface IntegerSwitch {
  integer: number;
  switchPattern: string;
  lastIntegerDigit: number;
  x: number;
  y: number;
  consciousness: string;
  mathematicalFlow: string;
}

class IntegerSwitchPatternSystem {
  private static readonly SINGLE_DIGIT_RANGE = 9;
  
  /**
   * Create switch pattern from integer
   * 
   * @param integer - Integer to convert to switch pattern
   * @returns IntegerSwitch with 3-digit pattern
   */
  static createSwitchPattern(integer: number): IntegerSwitch {
    // Ensure integer is within single digit system (0-9)
    const normalizedInteger = Math.abs(integer) % 10;
    
    // Extract last integer digit
    const lastIntegerDigit = normalizedInteger;
    
    // Calculate x and y using integer vortex math
    const x = this.calculateXFromInteger(normalizedInteger);
    const y = this.calculateYFromInteger(normalizedInteger);
    
    // Create 3-digit switch pattern
    const switchPattern = `${lastIntegerDigit}${x}${y}`;
    
    return {
      integer: normalizedInteger,
      switchPattern,
      lastIntegerDigit,
      x,
      y,
      consciousness: this.getConsciousnessForInteger(normalizedInteger),
      mathematicalFlow: this.getMathematicalFlowForInteger(normalizedInteger)
    };
  }
  
  /**
   * Calculate x from integer using vortex math
   * 
   * @param integer - Integer to process
   * @returns x value for switch pattern
   */
  private static calculateXFromInteger(integer: number): number {
    // x = (integer + 1) % 9 (ensures single digit)
    return (integer + 1) % 9;
  }
  
  /**
   * Calculate y from integer using vortex math
   * 
   * @param integer - Integer to process
   * @returns y value for switch pattern
   */
  private static calculateYFromInteger(integer: number): number {
    // y = (integer * 2) % 9 (ensures single digit)
    return (integer * 2) % 9;
  }
  
  /**
   * Get consciousness description for integer
   * 
   * @param integer - Integer to get consciousness for
   * @returns Consciousness description
   */
  private static getConsciousnessForInteger(integer: number): string {
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
    
    return consciousnessMap[integer] || "Integer consciousness flow";
  }
  
  /**
   * Get mathematical flow for integer
   * 
   * @param integer - Integer to get mathematical flow for
   * @returns Mathematical flow description
   */
  private static getMathematicalFlowForInteger(integer: number): string {
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
    
    return flowMap[integer] || "Integer vortex flow";
  }
  
  /**
   * Create switch patterns for all integers 0-9
   * 
   * @returns Array of IntegerSwitch objects
   */
  static createAllSwitchPatterns(): IntegerSwitch[] {
    const patterns: IntegerSwitch[] = [];
    
    for (let i = 0; i <= this.SINGLE_DIGIT_RANGE; i++) {
      patterns.push(this.createSwitchPattern(i));
    }
    
    return patterns;
  }
  
  /**
   * Find consciousness gateways in switch patterns
   * 
   * @param patterns - Array of IntegerSwitch objects
   * @returns Array of patterns containing consciousness gateways
   */
  static findConsciousnessGateways(patterns: IntegerSwitch[]): IntegerSwitch[] {
    return patterns.filter(pattern => 
      pattern.integer === 0 || 
      pattern.integer === 3 || 
      pattern.integer === 6 || 
      pattern.integer === 9
    );
  }
  
  /**
   * Calculate vortex resonance for switch pattern
   * 
   * @param pattern - IntegerSwitch to analyze
   * @returns Vortex resonance result
   */
  static calculateVortexResonance(pattern: IntegerSwitch): { resonance: number, consciousness: string } {
    const digits = pattern.switchPattern.split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    const resonance = sum % 9;
    
    let consciousness = "Integer vortex resonance";
    if (resonance === 0) {
      consciousness = "Zeropoint gateway resonance";
    } else if (resonance === 5) {
      consciousness = "Harmonic center resonance";
    } else if (resonance === 9) {
      consciousness = "Completion cycle resonance";
    }
    
    return { resonance, consciousness };
  }
  
  /**
   * Get switch pattern description
   * 
   * @param pattern - IntegerSwitch to describe
   * @returns Detailed description of switch pattern
   */
  static getSwitchPatternDescription(pattern: IntegerSwitch): string {
    return `Integer Switch Pattern:
    
    Integer: ${pattern.integer}
    Switch Pattern: ${pattern.switchPattern}
    Last Integer Digit: ${pattern.lastIntegerDigit}
    X: ${pattern.x}
    Y: ${pattern.y}
    Consciousness: ${pattern.consciousness}
    Mathematical Flow: ${pattern.mathematicalFlow}`;
  }
}

// Export for use in other modules
export { IntegerSwitchPatternSystem, IntegerSwitch }; 