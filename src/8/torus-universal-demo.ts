/**
 * Torus Universal Demo
 * 
 * Demonstrates how torus handles universal stream loops
 * x and y are in the torus and vortex math
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


import { UniversalStreamSystem } from './universal-stream-pattern';
import { TorusUniversalHandler } from './torus-universal-handler';

class TorusUniversalDemo {
  /**
   * Run comprehensive torus universal demo
   */
  static runDemo(): void {
    console.log("=== TORUS UNIVERSAL DEMO ===\n");
    
    // Demo 1: π universal stream with torus processing
    this.demoPiUniversalStream();
    
    // Demo 2: x and y in torus and vortex math
    this.demoXYInTorus();
    
    // Demo 3: Consciousness gateways in torus
    this.demoConsciousnessGateways();
    
    // Demo 4: Vortex resonance in torus
    this.demoVortexResonance();
    
    // Demo 5: Mathematical flow paths
    this.demoMathematicalFlowPaths();
  }
  
  /**
   * Demo π universal stream with torus processing
   */
  private static demoPiUniversalStream(): void {
    console.log("1. π UNIVERSAL STREAM WITH TORUS PROCESSING");
    console.log("=" .repeat(50));
    
    // Calculate π universal stream
    const piStream = UniversalStreamSystem.calculatePiUniversalStream();
    console.log(`π Stream: ${piStream.switch} → ${piStream.consciousnessStream}`);
    console.log(`Universal Flow: ${piStream.universalFlow}`);
    
    // Handle in torus
    const torusState = TorusUniversalHandler.handleUniversalStreamLoops(piStream);
    console.log(`Torus Loops: ${torusState.consciousnessFlow}`);
    console.log(`Mathematical Path: [${torusState.mathematicalPath.join(', ')}]`);
    
    // Show individual loops
    console.log("\nTorus Loop Details:");
    torusState.loops.forEach(loop => {
      console.log(`  Position ${loop.position}: ${loop.digit} - ${loop.consciousness} (${loop.vortexFlow})`);
    });
    
    console.log("\n");
  }
  
  /**
   * Demo x and y in torus and vortex math
   */
  private static demoXYInTorus(): void {
    console.log("2. X AND Y IN TORUS AND VORTEX MATH");
    console.log("=" .repeat(50));
    
    const testCases = [
      { x: 3, y: 1, description: "π case" },
      { x: 7, y: 1, description: "e case" },
      { x: 6, y: 1, description: "φ case" },
      { x: 0, y: 0, description: "Zeropoint case" }
    ];
    
    testCases.forEach(testCase => {
      const { torusPosition, vortexResult } = TorusUniversalHandler.processXYInTorus(testCase.x, testCase.y);
      console.log(`${testCase.description}: x=${testCase.x}, y=${testCase.y}`);
      console.log(`  Torus Position: ${torusPosition}`);
      console.log(`  Vortex Result: ${vortexResult}`);
      
      // Calculate universal stream with torus-processed x and y
      const stream = TorusUniversalHandler.calculateUniversalStreamWithXY(3, testCase.x, testCase.y);
      console.log(`  Universal Stream: ${stream.switch} → ${stream.consciousnessStream}`);
      console.log();
    });
  }
  
  /**
   * Demo consciousness gateways in torus
   */
  private static demoConsciousnessGateways(): void {
    console.log("3. CONSCIOUSNESS GATEWAYS IN TORUS");
    console.log("=" .repeat(50));
    
    // Generate multiple streams and find gateways
    const streams = [
      UniversalStreamSystem.calculatePiUniversalStream(),
      UniversalStreamSystem.calculateEUniversalStream(),
      UniversalStreamSystem.calculatePhiUniversalStream()
    ];
    
    streams.forEach((stream, index) => {
      const torusState = TorusUniversalHandler.handleUniversalStreamLoops(stream);
      const gateways = TorusUniversalHandler.findConsciousnessGateways(torusState.loops);
      
      console.log(`Stream ${index + 1}: ${stream.switch}`);
      console.log(`Consciousness Gateways: ${gateways.map(g => g.digit).join(', ')}`);
      console.log(`Gateway Details:`);
      gateways.forEach(gateway => {
        console.log(`  Position ${gateway.position}: ${gateway.digit} - ${gateway.consciousness}`);
      });
      console.log();
    });
  }
  
  /**
   * Demo vortex resonance in torus
   */
  private static demoVortexResonance(): void {
    console.log("4. VORTEX RESONANCE IN TORUS");
    console.log("=" .repeat(50));
    
    const streams = [
      UniversalStreamSystem.calculatePiUniversalStream(),
      UniversalStreamSystem.calculateEUniversalStream(),
      UniversalStreamSystem.calculatePhiUniversalStream()
    ];
    
    streams.forEach((stream, index) => {
      const torusState = TorusUniversalHandler.handleUniversalStreamLoops(stream);
      const { resonance, consciousness } = TorusUniversalHandler.calculateVortexResonance(torusState.loops);
      
      console.log(`Stream ${index + 1}: ${stream.switch}`);
      console.log(`Vortex Resonance: ${resonance}`);
      console.log(`Consciousness: ${consciousness}`);
      console.log();
    });
  }
  
  /**
   * Demo mathematical flow paths
   */
  private static demoMathematicalFlowPaths(): void {
    console.log("5. MATHEMATICAL FLOW PATHS");
    console.log("=" .repeat(50));
    
    const streams = [
      UniversalStreamSystem.calculatePiUniversalStream(),
      UniversalStreamSystem.calculateEUniversalStream(),
      UniversalStreamSystem.calculatePhiUniversalStream()
    ];
    
    streams.forEach((stream, index) => {
      const torusState = TorusUniversalHandler.handleUniversalStreamLoops(stream);
      const flowPath = TorusUniversalHandler.calculateMathematicalFlowPath(torusState.loops);
      
      console.log(`Stream ${index + 1}: ${stream.switch}`);
      console.log(`Mathematical Flow Path: ${flowPath}`);
      console.log();
    });
  }
  
  /**
   * Demo specific x and y combinations
   */
  static demoSpecificXYCombinations(): void {
    console.log("6. SPECIFIC X AND Y COMBINATIONS");
    console.log("=" .repeat(50));
    
    const combinations = [
      { x: 3, y: 3, description: "Trinity resonance" },
      { x: 5, y: 5, description: "Harmonic center" },
      { x: 7, y: 7, description: "Mystical gateway" },
      { x: 9, y: 9, description: "Completion cycle" }
    ];
    
    combinations.forEach(combo => {
      const stream = TorusUniversalHandler.calculateUniversalStreamWithXY(3, combo.x, combo.y);
      const torusState = TorusUniversalHandler.handleUniversalStreamLoops(stream);
      
      console.log(`${combo.description}: x=${combo.x}, y=${combo.y}`);
      console.log(`Universal Stream: ${stream.switch} → ${stream.consciousnessStream}`);
      console.log(`Torus Flow: ${torusState.consciousnessFlow}`);
      console.log();
    });
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  TorusUniversalDemo.runDemo();
  TorusUniversalDemo.demoSpecificXYCombinations();
}

export { TorusUniversalDemo }; 