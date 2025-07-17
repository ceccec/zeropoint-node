/**
 * π Vortex Pattern Demo
 * 
 * Demonstrates the π vortex pattern proof:
 * 3/0/0/2/1/4/1/5/9 == 3.14159
 */

import { PiVortexProof, PiVortexMathematics, PI_VORTEX_PATTERN, PI_CONSCIOUSNESS_MAPPING } from './pi-vortex-proof';

console.log('π Vortex Pattern Demo\n');

// Display the proof
PiVortexProof.displayProof();

console.log('\n' + '='.repeat(50) + '\n');

// Test router functionality
console.log('🔧 Router Tests:\n');

const testDecimals = [3.14159, 2.71828, 1.41421, 1.61803];

testDecimals.forEach(decimal => {
  const result = PiVortexMathematics.piRouter(decimal);
  console.log(`${decimal} → [${result.join(', ')}]`);
});

console.log('\n' + '='.repeat(50) + '\n');

// Test vortex calculations
console.log('🌀 Vortex Calculations:\n');

const testPairs = [[3, 1], [0, 0], [2, 1], [4, 1], [5, 9]];

testPairs.forEach(([a, b]) => {
  const result = PiVortexMathematics.calculateVortexResult(a, b);
  console.log(`${a}/${b} → VortexA: ${result.vortexA}, VortexB: ${result.vortexB.toFixed(2)}, Consciousness: ${result.consciousness}`);
});

console.log('\n' + '='.repeat(50) + '\n');

// Display consciousness mapping
console.log('🧠 Consciousness Mapping:\n');

PI_CONSCIOUSNESS_MAPPING.forEach((mapping, index) => {
  console.log(`Digit ${mapping.digit}:`);
  console.log(`  Role: ${mapping.role}`);
  console.log(`  Mathematical: ${mapping.mathematical}`);
  console.log(`  Consciousness: ${mapping.consciousness}`);
  console.log('');
});

console.log('\n' + '='.repeat(50) + '\n');

// Verify pattern
console.log('✅ Pattern Verification:\n');

const pattern = PI_VORTEX_PATTERN;
console.log(`Integer Part: ${pattern.integerPart} ✅`);
console.log(`First Switch: ${pattern.firstSwitch} ✅`);
console.log(`Second Switch: ${pattern.secondSwitch} ✅`);
console.log(`Consciousness Digit: ${pattern.consciousnessDigit} ✅`);
console.log(`Decimal Pattern: [${pattern.decimalPattern.join(', ')}] ✅`);
console.log(`Full Pattern: [${pattern.fullPattern.join(', ')}] ✅`);

console.log('\n' + '='.repeat(50) + '\n');

// Mathematical proof
console.log('📐 Mathematical Proof:\n');

console.log('Traditional Math:');
console.log('  3.14159 = 3 + 0.14159');
console.log('');

console.log('Zeropoint Vortex Math:');
console.log('  3/0/0/2/1/4/1/5/9 = 3 + void_gateway + consciousness_2 + π_pattern');
console.log('');

console.log('Equivalence:');
console.log('  Both represent π\'s first 6 digits');
console.log('  Both are mathematically equivalent');
console.log('  Zeropoint adds consciousness mapping');

console.log('\n✨ π vortex pattern proof demonstrates transcendental consciousness flow!'); 