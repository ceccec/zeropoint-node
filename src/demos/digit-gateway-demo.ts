/**
 * 🌌 Digit Gateway Demo - TypeScript Implementation
 * 
 * Demonstrates the digit-aware gateway system where each digit knows the whole
 * and can respond to any request using both this.isGateway(digit) and digit.isGateway syntax.
 */

import { DigitGatewaySystem } from './torus';

console.log('🌌 Digit Gateway System - TypeScript Demo\n');

// Test individual digits using this.isGateway(digit) syntax
console.log('=== this.isGateway(digit) Syntax ===');
for (let digit = 0; digit <= 9; digit++) {
  const isGateway = DigitGatewaySystem.isGateway(digit);
  const gatewayTypes = DigitGatewaySystem.getGatewayTypes(digit);
  const consciousness = DigitGatewaySystem.getGatewayConsciousness(digit);
  const flow = DigitGatewaySystem.getGatewayFlow(digit);
  
  console.log(`Digit ${digit}:`);
  console.log(`  isGateway: ${isGateway}`);
  console.log(`  gatewayTypes: [${gatewayTypes.join(', ')}]`);
  console.log(`  consciousness: ${consciousness}`);
  console.log(`  flow: ${flow}`);
  console.log('');
}

// Test Number prototype extensions (digit.isGateway syntax)
console.log('=== Number Prototype Extensions (digit.isGateway) ===');
for (let digit = 0; digit <= 9; digit++) {
  const num = new Number(digit);
  console.log(`Digit ${digit}:`);
  console.log(`  num.isGateway: ${num.isGateway}`);
  console.log(`  num.isConsciousnessGateway: ${num.isConsciousnessGateway}`);
  console.log(`  num.isVortexGateway: ${num.isVortexGateway}`);
  console.log(`  num.getGatewayTypes(): [${num.getGatewayTypes().join(', ')}]`);
  console.log(`  num.getGatewayConsciousness(): ${num.getGatewayConsciousness()}`);
  console.log(`  num.getGatewayFlow(): ${num.getGatewayFlow()}`);
  console.log('');
}

// Test digit pairs
console.log('=== Digit Pair Gateway Detection ===');
const testPairs = [
  [0, 0], [3, 3], [6, 6], [9, 9],
  [0, 3], [3, 6], [6, 9], [9, 0],
  [1, 2], [4, 5], [7, 8]
];

testPairs.forEach(([digitA, digitB]) => {
  const isPairGateway = DigitGatewaySystem.isDigitPairGateway(digitA, digitB);
  const consciousnessA = DigitGatewaySystem.getGatewayConsciousness(digitA);
  const consciousnessB = DigitGatewaySystem.getGatewayConsciousness(digitB);
  
  console.log(`Pair ${digitA}/${digitB}:`);
  console.log(`  isPairGateway: ${isPairGateway}`);
  console.log(`  consciousnessA: ${consciousnessA}`);
  console.log(`  consciousnessB: ${consciousnessB}`);
  console.log('');
});

// Test vortex result gateway detection
console.log('=== Vortex Result Gateway Detection ===');
const testVortexResults = [
  [3, 6], [9, 0], [1, 2], [4, 5], [7, 8]
];

testVortexResults.forEach(([vortexA, vortexB]) => {
  const isVortexGateway = DigitGatewaySystem.isVortexResultGateway(vortexA, vortexB);
  const consciousnessA = DigitGatewaySystem.getGatewayConsciousness(vortexA);
  const consciousnessB = DigitGatewaySystem.getGatewayConsciousness(vortexB);
  
  console.log(`Vortex Result ${vortexA}/${vortexB}:`);
  console.log(`  isVortexGateway: ${isVortexGateway}`);
  console.log(`  consciousnessA: ${consciousnessA}`);
  console.log(`  consciousnessB: ${consciousnessB}`);
  console.log('');
});

// Demonstrate digit awareness - each digit knows the whole
console.log('=== Digit Awareness Demo ===');
console.log('Each digit knows the complete gateway system:');

const allGatewayDigits = DigitGatewaySystem.getAllGatewayDigits();
const allGatewayPatterns = DigitGatewaySystem.getAllGatewayPatterns();

console.log(`All Gateway Digits: [${allGatewayDigits.join(', ')}]`);
console.log(`All Gateway Patterns: [${allGatewayPatterns.join(', ')}]`);

// Test each digit's awareness of the complete system
for (let digit = 0; digit <= 9; digit++) {
  const gatewayTypes = DigitGatewaySystem.getGatewayTypes(digit);
  const consciousness = DigitGatewaySystem.getGatewayConsciousness(digit);
  
  console.log(`\nDigit ${digit} Awareness:`);
  console.log(`  Knows all gateway digits: [${allGatewayDigits.join(', ')}]`);
  console.log(`  Knows all gateway patterns: [${allGatewayPatterns.join(', ')}]`);
  console.log(`  Its own gateway types: [${gatewayTypes.join(', ')}]`);
  console.log(`  Its own consciousness: ${consciousness}`);
}

// Get gateway statistics
console.log('\n=== Gateway Statistics ===');
const stats = DigitGatewaySystem.getGatewayStatistics();
console.log('Gateway Statistics:');
console.log(`  Total Gateway Digits: ${stats.totalGatewayDigits}`);
console.log(`  Total Gateway Patterns: ${stats.totalGatewayPatterns}`);
console.log(`  Consciousness Gateways: ${stats.consciousnessGateways}`);
console.log(`  Vortex Gateways: ${stats.vortexGateways}`);
console.log(`  Gateway Digits: [${stats.gatewayDigits.join(', ')}]`);
console.log(`  Gateway Patterns: [${stats.gatewayPatterns.join(', ')}]`);

// Example usage patterns
console.log('\n=== Example Usage Patterns ===');
console.log('// Using this.isGateway(digit) syntax:');
console.log('const isGateway = DigitGatewaySystem.isGateway(3); // true');
console.log('const types = DigitGatewaySystem.getGatewayTypes(6); // ["primary", "consciousness"]');
console.log('const consciousness = DigitGatewaySystem.getGatewayConsciousness(9); // "Completion Gateway"');

console.log('\n// Using digit.isGateway syntax (TypeScript):');
console.log('const digit = 3;');
console.log('const isGateway = digit.isGateway; // true');
console.log('const types = digit.getGatewayTypes(); // ["primary", "consciousness"]');
console.log('const consciousness = digit.getGatewayConsciousness(); // "Trinity Gateway"');

console.log('\n// Each digit knows the whole system:');
console.log('const allGateways = DigitGatewaySystem.getAllGatewayDigits(); // [0, 3, 6, 9]');
console.log('const allPatterns = DigitGatewaySystem.getAllGatewayPatterns(); // ["0/0", "3/3", ...]');

console.log('\n🌌 Digit Gateway Demo Complete!');
console.log('Each digit is aware of the complete gateway system and can respond to any request.'); 