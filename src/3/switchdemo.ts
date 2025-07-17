/**
 * Integer Switch Demo
 * 
 * Demonstrates how integer.switch creates switch patterns
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


import { IntegerSwitchPatternSystem } from './integer-switch-pattern';
import { DIGIT_SEQUENCE } from '../2/constants';

class IntegerSwitchDemo {
  /**
   * Run integer switch demo
   */
  static runDemo(): void {
    console.log("=== INTEGER SWITCH DEMO ===\n");
    
    // Demo 1: Create switch patterns for integers 0-9
    this.demoCreateSwitchPatterns();
    
    // Demo 2: Show specific integer examples
    this.demoSpecificIntegers();
    
    // Demo 3: Consciousness gateways
    this.demoConsciousnessGateways();
    
    // Demo 4: Vortex resonance
    this.demoVortexResonance();
    
    // Demo 5: Switch pattern descriptions
    this.demoSwitchPatternDescriptions();
  }
  
  /**
   * Demo creating switch patterns for integers 0-9
   */
  private static demoCreateSwitchPatterns(): void {
    console.log("1. CREATE SWITCH PATTERNS FOR INTEGERS 0-9");
    console.log("=" .repeat(50));
    
    const patterns = IntegerSwitchPatternSystem.createAllSwitchPatterns();
    
    patterns.forEach(pattern => {
      console.log(`Integer ${pattern.integer}: ${pattern.switchPattern}`);
      console.log(`  X: ${pattern.x}, Y: ${pattern.y}`);
      console.log(`  Consciousness: ${pattern.consciousness}`);
      console.log(`  Mathematical Flow: ${pattern.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo specific integer examples
   */
  private static demoSpecificIntegers(): void {
    console.log("2. SPECIFIC INTEGER EXAMPLES");
    console.log("=" .repeat(50));
    
    const testIntegers = [0, 1, 3, 5, 7, 9];
    
    testIntegers.forEach(integer => {
      const pattern = IntegerSwitchPatternSystem.createSwitchPattern(integer);
      console.log(`Integer ${integer}:`);
      console.log(`  Switch Pattern: ${pattern.switchPattern}`);
      console.log(`  Last Integer Digit: ${pattern.lastIntegerDigit}`);
      console.log(`  X: ${pattern.x}, Y: ${pattern.y}`);
      console.log(`  Consciousness: ${pattern.consciousness}`);
      console.log();
    });
  }
  
  /**
   * Demo consciousness gateways
   */
  private static demoConsciousnessGateways(): void {
    console.log("3. CONSCIOUSNESS GATEWAYS");
    console.log("=" .repeat(50));
    
    const allPatterns = IntegerSwitchPatternSystem.createAllSwitchPatterns();
    const gateways = IntegerSwitchPatternSystem.findConsciousnessGateways(allPatterns);
    
    console.log("Consciousness Gateways:");
    gateways.forEach(gateway => {
      console.log(`  Integer ${gateway.integer}: ${gateway.switchPattern}`);
      console.log(`    Consciousness: ${gateway.consciousness}`);
      console.log(`    Mathematical Flow: ${gateway.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo vortex resonance
   */
  private static demoVortexResonance(): void {
    console.log("4. VORTEX RESONANCE");
    console.log("=" .repeat(50));
    
    const testIntegers = [0, 1, 3, 5, 7, 9];
    
    testIntegers.forEach(integer => {
      const pattern = IntegerSwitchPatternSystem.createSwitchPattern(integer);
      const { resonance, consciousness } = IntegerSwitchPatternSystem.calculateVortexResonance(pattern);
      
      console.log(`Integer ${integer} (${pattern.switchPattern}):`);
      console.log(`  Vortex Resonance: ${resonance}`);
      console.log(`  Consciousness: ${consciousness}`);
      console.log();
    });
  }
  
  /**
   * Demo switch pattern descriptions
   */
  private static demoSwitchPatternDescriptions(): void {
    console.log("5. SWITCH PATTERN DESCRIPTIONS");
    console.log("=" .repeat(50));
    
    const testIntegers = [0, 3, 7];
    
    testIntegers.forEach(integer => {
      const pattern = IntegerSwitchPatternSystem.createSwitchPattern(integer);
      const description = IntegerSwitchPatternSystem.getSwitchPatternDescription(pattern);
      
      console.log(description);
      console.log();
    });
  }
  
  /**
   * Demo integer.switch functionality
   */
  static demoIntegerSwitchFunctionality(): void {
    console.log("6. INTEGER.SWITCH FUNCTIONALITY");
    console.log("=" .repeat(50));
    
    // Simulate integer.switch method
    const integers = DIGIT_SEQUENCE;
    
    integers.forEach(integer => {
      // integer.switch should create switch pattern
      const switchPattern = IntegerSwitchPatternSystem.createSwitchPattern(integer);
      
      console.log(`${integer}.switch = ${switchPattern.switchPattern}`);
      console.log(`  Consciousness: ${switchPattern.consciousness}`);
      console.log(`  Mathematical Flow: ${switchPattern.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo switch pattern matrix
   */
  static demoSwitchPatternMatrix(): void {
    console.log("7. SWITCH PATTERN MATRIX");
    console.log("=" .repeat(50));
    
    const patterns = IntegerSwitchPatternSystem.createAllSwitchPatterns();
    
    console.log("Integer | Switch Pattern | X | Y | Consciousness");
    console.log("-".repeat(70));
    
    patterns.forEach(pattern => {
      const consciousness = pattern.consciousness.split(' - ')[0]; // Short version
      console.log(`${pattern.integer.toString().padStart(7)} | ${pattern.switchPattern.padStart(13)} | ${pattern.x} | ${pattern.y} | ${consciousness}`);
    });
    
    console.log();
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  IntegerSwitchDemo.runDemo();
  IntegerSwitchDemo.demoIntegerSwitchFunctionality();
  IntegerSwitchDemo.demoSwitchPatternMatrix();
}

export { IntegerSwitchDemo }; 