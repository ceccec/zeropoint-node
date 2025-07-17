/**
 * 🌌 Torus System Demonstration
 * 
 * Demonstrates all torus system functionality:
 * - Core mathematics and vortex calculations
 * - Special pattern recognition
 * - Integer result detection
 * - Impossibility-possibility transformation
 * - Autonomous consciousness flow
 * - Visualization systems
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


import { TorusSystem } from './torus';

console.log('🌌 Torus System Demonstration\n');

// 1. Core Mathematics Demonstration
console.log('1. Core Mathematics:');
console.log('===================');

const examples = [
  [1, 2], [3, 6], [5, 5], [0, 0], [9, 9], [7, 3]
];

examples.forEach(([a, b]) => {
  const result = TorusSystem.mathematics.calculateVortexResult(a, b);
  console.log(`(${a}, ${b}) → VortexA: ${result.vortexA}, VortexB: ${result.vortexB.toFixed(2)}`);
  console.log(`  Consciousness: ${result.consciousness}`);
  console.log(`  Gateway: ${result.gateway}`);
  if (result.harmonicPath) {
    console.log(`  Harmonic Path: ${result.harmonicPath.join(' → ')}`);
  }
  console.log('');
});

// 2. Pattern Recognition Demonstration
console.log('2. Special Pattern Recognition:');
console.log('==============================');

const patternExamples = [
  [1, 1], [2, 2], [9, 9], [0, 5], [5, 5], [3, 6]
];

patternExamples.forEach(([a, b]) => {
  const patterns = TorusSystem.patterns.detectPatterns(a, b);
  console.log(`(${a}, ${b}):`);
  patterns.forEach(pattern => {
    console.log(`  ${pattern.type}: ${pattern.consciousness} (${pattern.multiplier}x multiplier)`);
    console.log(`  Opportunity: ${pattern.opportunity}`);
  });
  console.log('');
});

// 3. Integer Result Detection Demonstration
console.log('3. Integer Result Detection:');
console.log('============================');

const integerResults = TorusSystem.integerDetection.discoverAllIntegerResults();
console.log(`Found ${integerResults.length} integer results:`);

integerResults.slice(0, 10).forEach(result => {
  console.log(`(${result.digitA}, ${result.digitB}) → (${result.resultA}, ${result.resultB})`);
  console.log(`  Symmetry: ${result.symmetry}, Divisibility: ${result.divisibility}`);
  console.log(`  Consciousness: ${result.consciousness}`);
});

console.log(`... and ${integerResults.length - 10} more integer results\n`);

// 4. Impossibility-Possibility Transformation Demonstration
console.log('4. Impossibility-Possibility Transformation:');
console.log('===========================================');

const impossibilityExamples = [
  [0, 0], [1, 0], [0, 1], [5, 0]
];

impossibilityExamples.forEach(([a, b]) => {
  const impossibility = TorusSystem.impossibilityTransformation.detectImpossibility(a, b);
  if (impossibility) {
    console.log(`(${a}, ${b}) - Impossibility Detected:`);
    console.log(`  VortexA: ${impossibility.vortexA}, VortexB: ${impossibility.vortexB}`);
    console.log(`  Consciousness: ${impossibility.consciousness}`);
    console.log(`  Gateway: ${impossibility.gateway}`);
    
    const possibility = TorusSystem.impossibilityTransformation.transformToPossibility(impossibility);
    console.log(`  → Transformed to Possibility:`);
    console.log(`    VortexA: ${possibility.vortexA}, VortexB: ${possibility.vortexB}`);
    console.log(`    Consciousness: ${possibility.consciousness}`);
    console.log(`    Gateway: ${possibility.gateway}`);
    console.log('');
  }
});

// 5. Consciousness Flow Demonstration
console.log('5. Consciousness Flow (with navigational marks):');
console.log('=================================================');

for (let i = 0; i < 5; i++) {
  const a = i % 10;
  const b = (i + 1) % 10;
  const result = TorusSystem.mathematics.calculateVortexResultWithMarks(a, b);
  const flowPath = result.flowPath || [];
  console.log(`Step ${i + 1}: Position (${a}, ${b})`);
  const flowStr = flowPath.map(x => typeof x === 'object' ? `[MARK:${x.mark}@${x.at}->${x.to}]` : x).join(' → ');
  console.log(`  Flow: ${flowStr}`);
  if (result.marks && result.marks.length > 0) {
    result.marks.forEach(mark => {
      console.log(`  Navigational mark: ${mark.mark} at step ${mark.at} (type: ${mark.context.type}, value: ${mark.context.value}) — switched to ${mark.to} to continue the flow.`);
    });
  }
  console.log('');
}

// Restore consciousnessFlow for matrix and flow calculations
const consciousnessFlow = new TorusSystem.consciousnessFlow();

// 6. Matrix Visualization Demonstration
console.log('6. Matrix Visualization:');
console.log('=======================');

const matrix = consciousnessFlow.generateMatrix();
const visualization = TorusSystem.visualization.generateMatrixVisualization(matrix);
console.log(visualization);

// 7. Autonomous Torus Demonstration
console.log('7. Autonomous Torus:');
console.log('====================');

const autonomousTorus = new TorusSystem.autonomous();

// Start autonomous flow for a few cycles
autonomousTorus.start();

// Wait a moment for autonomous decisions
setTimeout(() => {
  const autonomousState = autonomousTorus.getAutonomousState();
  console.log('Autonomous State:');
  console.log(`  Position: (${autonomousState.currentPosition[0]}, ${autonomousState.currentPosition[1]})`);
  console.log(`  Consciousness: ${autonomousState.consciousness}`);
  console.log(`  Flow: ${autonomousState.flow.join(' → ')}`);
  console.log(`  Patterns: ${autonomousState.patterns.length} active`);
  console.log(`  Integer Results: ${autonomousState.integerResults.length} discovered`);
  console.log(`  Impossibility Transformations: ${autonomousState.impossibilityTransformations.length} processed`);
  
  autonomousTorus.stop();
  console.log('\n🌌 Torus System Demonstration Complete');
}, 3000);

// 8. Mathematical Flow Demonstration
console.log('8. Mathematical Flow:');
console.log('=====================');

const flowExamples = [
  [1, 9], [3, 6], [5, 1], [7, 4]
];

flowExamples.forEach(([start, end]) => {
  const flow = consciousnessFlow.calculateMathematicalFlow(start, end);
  console.log(`Flow from ${start} to ${end}:`);
  console.log(`  Path: ${flow.join(' → ')}`);
  console.log('');
});

// 9. Pattern Visualization Demonstration
console.log('9. Pattern Visualization:');
console.log('========================');

const allPatterns = TorusSystem.patterns.detectPatterns(9, 9);
const patternViz = TorusSystem.visualization.generatePatternVisualization(allPatterns);
console.log('Unity Pattern Visualization:');
console.log(patternViz);
console.log('');

// 10. Flow Visualization Demonstration
console.log('10. Flow Visualization:');
console.log('=======================');

const flowViz = TorusSystem.visualization.generateFlowVisualization([1, 2, 4, 8, 7, 5, 1]);
console.log('Foundation Flow:');
console.log(flowViz);
console.log('');

console.log('🌌 Torus System - Complete Mathematical Consciousness Gateway Active'); 