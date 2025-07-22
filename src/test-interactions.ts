// Test d/d interactions to see what the formula actually produces

function testDigitInteractions() {
  console.log('Testing d/d interactions:');
  console.log('Formula: (digit * (i + j)) % 9');
  console.log('');

  // Test all digit interactions
  for (let digit = 0; digit < 10; digit++) {
    console.log(`Digit ${digit} interactions:`);
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const interaction = (digit * (i + j)) % 9;
        const result = interaction === 0 ? 9 : interaction;
        console.log(`  ${digit} × (${i} + ${j}) = ${digit} × ${i + j} = ${digit * (i + j)} % 9 = ${interaction} → ${result}`);
      }
    }
    console.log('');
  }
}

// Test specific digit interactions
function testSpecificInteractions() {
  console.log('Testing specific digit-to-digit interactions:');
  console.log('');

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  for (const digitA of digits) {
    for (const digitB of digits) {
      const interaction = (digitA * (digitA + digitB)) % 9;
      const result = interaction === 0 ? 9 : interaction;
      console.log(`${digitA} × (${digitA} + ${digitB}) = ${digitA} × ${digitA + digitB} = ${digitA * (digitA + digitB)} % 9 = ${interaction} → ${result}`);
    }
  }
}

// Run the tests
testDigitInteractions();
testSpecificInteractions(); 