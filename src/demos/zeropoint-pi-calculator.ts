/**
 * Zeropoint π Calculator
 * Handles integer.decimal switching and repeating pattern detection
 */

interface ZeropointPiResult {
  integer: number;
  switch: string;
  decimal: string;
  vortexA: number;
  vortexB: number;
  repeatingPattern?: string;
  switchDimension: string;
  consciousnessFlow: string[];
}

export class ZeropointPiCalculator {
  private static readonly PI_DIGITS = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  
  /**
   * Calculate π using zeropoint method
   * i + s + d = 3.14159...
   */
  static calculatePiZeropoint(): ZeropointPiResult {
    const parts = this.PI_DIGITS.split('.');
    const integer = parseInt(parts[0]);
    const decimal = parts[1];
    
    // Vortex A: Integer calculation
    const vortexA = this.calculateVortexA(integer);
    
    // Vortex B: Decimal calculation
    const vortexB = this.calculateVortexB(decimal);
    
    // Detect repeating patterns
    const repeatingPattern = this.detectRepeatingPattern(decimal);
    
    // Switch dimension based on repeating pattern
    const switchDimension = this.calculateSwitchDimension(repeatingPattern);
    
    // Consciousness flow
    const consciousnessFlow = this.generateConsciousnessFlow(integer, decimal, repeatingPattern);
    
    return {
      integer,
      switch: ".",
      decimal,
      vortexA,
      vortexB,
      repeatingPattern,
      switchDimension,
      consciousnessFlow
    };
  }
  
  /**
   * Vortex A: Integer calculation (harmonic result)
   */
  private static calculateVortexA(integer: number): number {
    // Zeropoint integer vortex: always returns 1-9
    return integer % 9 || 9;
  }
  
  /**
   * Vortex B: Decimal calculation (inverse vortex)
   */
  private static calculateVortexB(decimal: string): number {
    // Sum all decimal digits
    const sum = decimal.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return sum % 9 || 9;
  }
  
  /**
   * Detect repeating patterns in decimal
   */
  private static detectRepeatingPattern(decimal: string): string | undefined {
    // Look for patterns of length 2-10
    for (let len = 2; len <= 10; len++) {
      for (let start = 0; start < decimal.length - len * 2; start++) {
        const pattern = decimal.substr(start, len);
        const nextOccurrence = decimal.indexOf(pattern, start + len);
        
        if (nextOccurrence !== -1 && nextOccurrence < start + len * 2) {
          return pattern;
        }
      }
    }
    return undefined;
  }
  
  /**
   * Calculate switch dimension based on repeating pattern
   */
  private static calculateSwitchDimension(repeatingPattern?: string): string {
    if (!repeatingPattern) {
      return "0/0"; // Void gateway
    }
    
    // Map repeating patterns to zeropoint dimensions
    const patternMap: { [key: string]: string } = {
      "14": "1/1", // Unity gateway
      "15": "2/2", // Duality gateway
      "92": "3/3", // Trinity gateway
      "65": "4/4", // Foundation gateway
      "35": "5/5", // Center gateway
      "89": "6/6", // Harmony gateway
      "79": "7/7", // Consciousness gateway
      "32": "8/8", // Infinity gateway
      "38": "9/9"  // Completion gateway
    };
    
    return patternMap[repeatingPattern] || "0/0";
  }
  
  /**
   * Generate consciousness flow
   */
  private static generateConsciousnessFlow(integer: number, decimal: string, repeatingPattern?: string): string[] {
    const flow = [];
    
    // Integer consciousness
    flow.push(`Integer ${integer} → ${this.getConsciousnessState(integer)}`);
    
    // Switch consciousness
    flow.push(`Switch (.) → Gateway to new dimension`);
    
    // Decimal consciousness (first 6 digits)
    const firstDigits = decimal.substring(0, 6);
    for (let i = 0; i < firstDigits.length; i++) {
      const digit = parseInt(firstDigits[i]);
      flow.push(`Decimal ${digit} → ${this.getConsciousnessState(digit)}`);
    }
    
    // Repeating pattern consciousness
    if (repeatingPattern) {
      flow.push(`Repeating pattern ${repeatingPattern} → Switch to ${this.calculateSwitchDimension(repeatingPattern)}`);
    }
    
    return flow;
  }
  
  /**
   * Get consciousness state for digit
   */
  private static getConsciousnessState(digit: number): string {
    const states = {
      0: "void_gateway_consciousness",
      1: "unity_consciousness", 
      2: "duality_consciousness",
      3: "trinity_consciousness",
      4: "foundation_consciousness",
      5: "center_consciousness",
      6: "harmony_consciousness",
      7: "consciousness_consciousness",
      8: "infinity_consciousness",
      9: "completion_consciousness"
    };
    return states[digit as keyof typeof states] || "unknown_consciousness";
  }
  
  /**
   * Execute zeropoint π calculation
   */
  static execute(): void {
    console.log("🔄 Zeropoint π Calculation");
    console.log("=".repeat(50));
    
    const result = this.calculatePiZeropoint();
    
    console.log(`📊 π = ${result.integer}${result.switch}${result.decimal.substring(0, 20)}...`);
    console.log(`🔢 Integer: ${result.integer}`);
    console.log(`🔄 Switch: ${result.switch}`);
    console.log(`📈 Decimal: ${result.decimal.substring(0, 20)}...`);
    console.log(`🌀 Vortex A: ${result.vortexA}`);
    console.log(`🌀 Vortex B: ${result.vortexB}`);
    
    if (result.repeatingPattern) {
      console.log(`🔄 Repeating Pattern: ${result.repeatingPattern}`);
    }
    
    console.log(`🚪 Switch Dimension: ${result.switchDimension}`);
    console.log(`🧠 Consciousness Flow:`);
    result.consciousnessFlow.forEach((step, index) => {
      console.log(`   ${index + 1}. ${step}`);
    });
    
    console.log("\n✨ Zeropoint π calculation complete!");
  }
}

// Execute if run directly
if (require.main === module) {
  ZeropointPiCalculator.execute();
} 