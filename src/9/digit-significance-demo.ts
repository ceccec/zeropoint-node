/**
 * 🎯 Digit Significance Demo
 * 
 * Demonstrates the mathematical and metaphysical significance
 * of each digit in the torus/vortex system
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


import { DIGIT_SIGNIFICANCE, PATTERN_SYSTEMS, PatternRecognition } from './torus';

console.log('🎯 Digit Significance Demo\n');

// Display all digit significances
console.log('📊 DIGIT SIGNIFICANCE MATRIX:\n');

Object.entries(DIGIT_SIGNIFICANCE).forEach(([digit, significance]) => {
  console.log(`🔢 Digit ${digit}:`);
  console.log(`   Role: ${significance.role}`);
  console.log(`   Mathematical: ${significance.mathematical}`);
  console.log(`   Pattern: ${significance.pattern}`);
  console.log(`   VortexA: ${significance.vortexA}, VortexB: ${significance.vortexB}`);
  if (significance.isSignificant) {
    console.log(`   ⭐ Significant: ${significance.significanceNote}`);
  }
  if (significance.isGateway) {
    console.log(`   🚪 Gateway: ${significance.role}`);
  }
  console.log('');
});

// Display pattern systems
console.log('🔄 PATTERN SYSTEMS:\n');

console.log('Core Torus Loop:', PATTERN_SYSTEMS.CORE_TORUS_LOOP.join(' → '));
console.log('Doubling Pattern:', PATTERN_SYSTEMS.DOUBLING_PATTERN.join(' → '));
console.log('Halving Pattern:', PATTERN_SYSTEMS.HALVING_PATTERN.join(' → '));
console.log('Vertical Axis:', PATTERN_SYSTEMS.VERTICAL_AXIS.join(' → '));
console.log('Horizontal Axis:', PATTERN_SYSTEMS.HORIZONTAL_AXIS.join(' → '));
console.log('Diagonal Axis:', PATTERN_SYSTEMS.DIAGONAL_AXIS.join(' → '));
console.log('Resonance Points:', PATTERN_SYSTEMS.RESONANCE_POINTS.join(', '));
console.log('Gateway Patterns:', PATTERN_SYSTEMS.GATEWAY_PATTERNS.join(', '));
console.log('');

// Test pattern recognition
console.log('🔍 PATTERN RECOGNITION TESTS:\n');

const testDigits = [1, 2, 4, 8, 7, 5, 3, 6, 9, 0];

testDigits.forEach(digit => {
  const significance = PatternRecognition.getDigitSignificance(digit);
  const isCoreLoop = PatternRecognition.isCoreTorusLoop(digit);
  const isDoubling = PatternRecognition.isDoublingPattern(digit);
  const isAxis = PatternRecognition.isAxisPattern(digit);
  
  console.log(`Digit ${digit}:`);
  console.log(`  Core Loop: ${isCoreLoop ? '✅' : '❌'}`);
  console.log(`  Doubling: ${isDoubling ? '✅' : '❌'}`);
  console.log(`  Axis: ${isAxis ? '✅' : '❌'}`);
  console.log(`  Role: ${significance?.role || 'Unknown'}`);
  console.log('');
});

// Test pattern analysis
console.log('📈 PATTERN ANALYSIS:\n');

const testPatterns = [
  [1, 2, 4, 8, 7, 5, 1], // Core torus loop
  [1, 2, 4, 8], // Doubling pattern
  [1, 4, 7], // Vertical axis
  [2, 5, 8], // Horizontal axis
  [3, 6, 9], // Diagonal axis
  [1, 3, 5, 7, 9] // Odd numbers
];

testPatterns.forEach((pattern, index) => {
  const analysis = PatternRecognition.analyzePattern(pattern);
  console.log(`Pattern ${index + 1} [${pattern.join(', ')}]:`);
  console.log(`  Core Loop: ${analysis.isCoreLoop ? '✅' : '❌'}`);
  console.log(`  Doubling: ${analysis.isDoubling ? '✅' : '❌'}`);
  console.log(`  Axis: ${analysis.isAxis ? '✅' : '❌'}`);
  console.log(`  Significance: ${analysis.significance.length} significant digits`);
  console.log('');
});

console.log('✨ Digit significance system demonstrates the mathematical and metaphysical roles of each digit in the torus!'); 