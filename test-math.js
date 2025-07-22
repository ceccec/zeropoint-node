// Test mathematical calculations
function generateVortexA(a, b) {
  const sum = (a + b) % 9;
  return sum === 0 ? 9 : sum;
}

function generateVortexB(a, b) {
  const vortexA = generateVortexA(a, b);
  return (a + b) / vortexA;
}

// Test calculations
console.log('Testing vortex calculations:');
for (let a = 0; a <= 3; a++) {
  for (let b = 0; b <= 3; b++) {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    console.log(`${a}/${b}: VortexA=${vortexA}, VortexB=${vortexB.toFixed(2)}`);
  }
} 