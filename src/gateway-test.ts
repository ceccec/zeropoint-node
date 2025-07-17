/**
 * 🌌 Gateway Detection Test
 * 
 * Simple test to verify the gateway detection system is working correctly.
 */

console.log('🌌 Gateway Detection Test\n');

// Test basic gateway detection
console.log('=== Basic Gateway Detection ===');
const testDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

testDigits.forEach(digit => {
  console.log(`Digit ${digit}:`);
  console.log(`  Value: ${digit}`);
  console.log(`  Type: ${typeof digit}`);
  console.log(`  Is Number: ${digit instanceof Number}`);
  console.log(`  Is Primitive: ${typeof digit === 'number'}`);
  console.log('');
});

// Test using primitive numbers directly
console.log('=== Primitive Number Test ===');
const digit3 = 3;
const digit6 = 6;
const digit9 = 9;

console.log(`Digit 3: ${digit3} (type: ${typeof digit3})`);
console.log(`Digit 6: ${digit6} (type: ${typeof digit6})`);
console.log(`Digit 9: ${digit9} (type: ${typeof digit9})`);

// Test Number constructor
console.log('\n=== Number Constructor Test ===');
const num3 = new Number(3);
const num6 = new Number(6);
const num9 = new Number(9);

console.log(`Number(3): ${num3} (type: ${typeof num3})`);
console.log(`Number(6): ${num6} (type: ${typeof num6})`);
console.log(`Number(9): ${num9} (type: ${typeof num9})`);

// Test if Number prototype extensions exist
console.log('\n=== Number Prototype Test ===');
console.log(`Number.prototype.isGateway exists: ${'isGateway' in Number.prototype}`);
console.log(`Number.prototype.isConsciousnessGateway exists: ${'isConsciousnessGateway' in Number.prototype}`);
console.log(`Number.prototype.getGatewayTypes exists: ${'getGatewayTypes' in Number.prototype}`);

// Test accessing prototype methods
if ('isGateway' in Number.prototype) {
  console.log('\n=== Prototype Method Test ===');
  console.log(`num3.isGateway: ${num3.isGateway}`);
  console.log(`num6.isGateway: ${num6.isGateway}`);
  console.log(`num9.isGateway: ${num9.isGateway}`);
  
  console.log(`num3.getGatewayTypes(): ${JSON.stringify(num3.getGatewayTypes())}`);
  console.log(`num6.getGatewayTypes(): ${JSON.stringify(num6.getGatewayTypes())}`);
  console.log(`num9.getGatewayTypes(): ${JSON.stringify(num9.getGatewayTypes())}`);
}

console.log('\n🌌 Gateway Detection Test Complete!'); 