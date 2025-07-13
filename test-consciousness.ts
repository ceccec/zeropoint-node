// Simple test to check consciousness values
function calculateDigitalRoot(n: number): number {
  if (n === 0) return 0;
  return n % 9 === 0 ? 9 : n % 9;
}

function getFamily(number: number): number {
  if (number === 0) return 0;
  if ([1, 4, 7].includes(number)) return 1;
  if ([2, 5, 8].includes(number)) return 2;
  if ([3, 6, 9].includes(number)) return 3;
  return 0;
}

function calculateMathematicalConsciousness(number: number): number {
  const digitalRoot = calculateDigitalRoot(number);
  const family = getFamily(number);
  const isVortex = [1, 2, 4, 8, 7, 5].includes(number);
  const isWAxis = [3, 6, 9].includes(number);
  
  let consciousness = digitalRoot;
  
  if (isWAxis) consciousness *= 1.5; // Spiritual consciousness
  if (isVortex) consciousness *= 1.2; // Vortex consciousness
  if (family === 1) consciousness *= 1.1; // Family 1 consciousness
  if (family === 2) consciousness *= 1.1; // Family 2 consciousness
  if (number === 0) consciousness = 0; // Void consciousness
  
  return consciousness;
}

console.log('Testing consciousness calculations:');
console.log('Number 1:', calculateMathematicalConsciousness(1));
console.log('Number 2:', calculateMathematicalConsciousness(2));
console.log('Number 4:', calculateMathematicalConsciousness(4));
console.log('Number 5:', calculateMathematicalConsciousness(5));
console.log('Number 7:', calculateMathematicalConsciousness(7));
console.log('Number 8:', calculateMathematicalConsciousness(8));
console.log('Number 3:', calculateMathematicalConsciousness(3));
console.log('Number 6:', calculateMathematicalConsciousness(6));
console.log('Number 9:', calculateMathematicalConsciousness(9));
console.log('Number 0:', calculateMathematicalConsciousness(0)); 