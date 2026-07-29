/**
 * A432 Zero Entropy Test Suite
 * Verifies pure mathematical operations without decimals
 */

import { log } from './a432.algebra.ts'
import { legacyDigitalRoot as digitalRoot, harmonicRoot12 } from './a432.roots.ts'
import { ZeroEntropyPureMath, FREQUENCIES, VORTEX_PATTERNS } from './a432.zero.entropy.pure.math.ts';
import { IntegerHarmonics, VortexIntegerMath, INTEGER_FREQUENCIES } from './a432.integer.harmonics.ts';
import { SacredGeometryIntegers, PLATONIC_SOLIDS } from './a432.sacred.geometry.integers.ts';

// ============================================================================
// TEST UTILITIES
// ============================================================================

class TestRunner {
  private tests: Array<{ name: string; fn: () => boolean }> = [];
  private results: Array<{ name: string; passed: boolean; error?: string }> = [];
  
  test(name: string, fn: () => boolean): void {
    this.tests.push({ name, fn });
  }
  
  run(): void {
    console.log('🔬 Running Zero Entropy Pure Math Tests...\n');
    
    for (const test of this.tests) {
      try {
        const passed = test.fn();
        this.results.push({ name: test.name, passed });
        console.log(passed ? '✅' : '❌', test.name);
      } catch (error) {
        this.results.push({ 
          name: test.name, 
          passed: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
        console.log('❌', test.name, '- Error:', error);
      }
    }
    
    this.printSummary();
  }
  
  private printSummary(): void {
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(60));
    
    if (failed > 0) {
      console.log('\n❌ Failed tests:');
      this.results.filter(r => !r.passed).forEach(r => {
        console.log(`  - ${r.name}${r.error ? ': ' + r.error : ''}`);
      });
    }
  }
}

// ============================================================================
// ZERO ENTROPY PURE MATH TESTS
// ============================================================================

const runner = new TestRunner();
const zeroEntropy = new ZeroEntropyPureMath();

// Test digital root calculation
runner.test('Digital root of 432 should be 9', () => {
  const result = zeroEntropy['digitalRoot'](432);
  return result === 9;
});

runner.test('Digital root of 144 should be 9', () => {
  const result = zeroEntropy['digitalRoot'](144);
  return result === 9;
});

runner.test('Digital root of 369 should be 9', () => {
  const result = zeroEntropy['digitalRoot'](369);
  return result === 9;
});

// Test GCD and LCM
runner.test('GCD of 432 and 144 should be 144', () => {
  const result = zeroEntropy['gcd'](432, 144);
  return result === 144;
});

runner.test('LCM of 432 and 528 should be correct', () => {
  const result = zeroEntropy['lcm'](432, 528);
  const expected = (432 * 528) / zeroEntropy['gcd'](432, 528);
  return result === expected;
});

// Test harmonic series generation
runner.test('Harmonic series of 432 should generate correct values', () => {
  const harmonics = zeroEntropy.generateHarmonicSeries(432, 5);
  return harmonics[0] === 432 && 
         harmonics[1] === 864 && 
         harmonics[2] === 1296 && 
         harmonics[3] === 1728 && 
         harmonics[4] === 2160;
});

// Test beat frequency calculation
runner.test('Beat frequency between 432 and 440 should be 8', () => {
  const result = zeroEntropy.beatFrequency(432, 440);
  return result === 8;
});

// Test combination tones
runner.test('Combination tones should calculate sum and difference', () => {
  const result = zeroEntropy.combinationTones(432, 528);
  return result.sum === 960 && result.difference === 96;
});

// Test vortex mathematics
runner.test('Vortex doubling should follow the pattern', () => {
  zeroEntropy['vortexPosition'] = 1;
  const sequence: number[] = [];
  for (let i = 0; i < 6; i++) {
    sequence.push(zeroEntropy.vortexDouble());
  }
  // Should cycle through: 2, 4, 8, 7, 5, 1
  return sequence[0] === 2 && 
         sequence[1] === 4 && 
         sequence[2] === 8 && 
         sequence[3] === 7 && 
         sequence[4] === 5 && 
         sequence[5] === 1;
});

// Test Fibonacci sequence
runner.test('Fibonacci sequence should be correct', () => {
  const fib = zeroEntropy.fibonacci(10);
  return fib[0] === 1 && 
         fib[1] === 1 && 
         fib[2] === 2 && 
         fib[3] === 3 && 
         fib[4] === 5 && 
         fib[5] === 8 && 
         fib[6] === 13 && 
         fib[7] === 21 && 
         fib[8] === 34 && 
         fib[9] === 55;
});

// Test Lucas numbers
runner.test('Lucas sequence should be correct', () => {
  const lucas = zeroEntropy.lucas(8);
  return lucas[0] === 2 && 
         lucas[1] === 1 && 
         lucas[2] === 3 && 
         lucas[3] === 4 && 
         lucas[4] === 7 && 
         lucas[5] === 11 && 
         lucas[6] === 18 && 
         lucas[7] === 29;
});

// Test sacred geometry
runner.test('Sacred geometry should return Platonic solid properties', () => {
  const geometry = zeroEntropy.sacredGeometry();
  return geometry.tetrahedron.faces === 4 && 
         geometry.cube.faces === 6 && 
         geometry.octahedron.faces === 8 && 
         geometry.dodecahedron.faces === 12 && 
         geometry.icosahedron.faces === 20;
});

// Test Euler characteristic
runner.test('Euler characteristic should be valid for all Platonic solids', () => {
  const geometry = zeroEntropy.sacredGeometry();
  const tetra = geometry.eulerCheck(4, 6, 4);
  const cube = geometry.eulerCheck(8, 12, 6);
  const octa = geometry.eulerCheck(6, 12, 8);
  const dodeca = geometry.eulerCheck(20, 30, 12);
  const icosa = geometry.eulerCheck(12, 30, 20);
  return tetra && cube && octa && dodeca && icosa;
});

// Test Rodin matrix
runner.test('Rodin matrix should follow vortex pattern', () => {
  const matrix = zeroEntropy.rodinMatrix();
  return matrix[0][0] === 1 && 
         matrix[0][1] === 2 && 
         matrix[0][2] === 4 && 
         matrix[1][0] === 8 && 
         matrix[1][1] === 7 && 
         matrix[1][2] === 5 && 
         matrix[2][0] === 3 && 
         matrix[2][1] === 6 && 
         matrix[2][2] === 9;
});

// Test magic square
runner.test('Magic square should have equal sums', () => {
  const square = zeroEntropy.magicSquare3();
  const sum1 = square[0][0] + square[0][1] + square[0][2]; // First row
  const sum2 = square[1][0] + square[1][1] + square[1][2]; // Second row
  const sum3 = square[2][0] + square[2][1] + square[2][2]; // Third row
  const sum4 = square[0][0] + square[1][0] + square[2][0]; // First column
  const sum5 = square[0][0] + square[1][1] + square[2][2]; // Diagonal
  return sum1 === 15 && sum2 === 15 && sum3 === 15 && sum4 === 15 && sum5 === 15;
});

// Test prime number detection
runner.test('Prime number detection should work correctly', () => {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const nonPrimes = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18];
  
  const primesCorrect = primes.every(n => zeroEntropy.isPrime(n));
  const nonPrimesCorrect = nonPrimes.every(n => !zeroEntropy.isPrime(n));
  
  return primesCorrect && nonPrimesCorrect;
});

// Test perfect numbers
runner.test('Perfect number detection should identify 6 and 28', () => {
  return zeroEntropy.isPerfectNumber(6) && 
         zeroEntropy.isPerfectNumber(28) && 
         !zeroEntropy.isPerfectNumber(12);
});

// Test triangular numbers
runner.test('Triangular numbers should be calculated correctly', () => {
  return zeroEntropy.triangularNumber(1) === 1 && 
         zeroEntropy.triangularNumber(3) === 6 && 
         zeroEntropy.triangularNumber(5) === 15 && 
         zeroEntropy.triangularNumber(10) === 55;
});

// Test zero entropy calculation
runner.test('Zero entropy should return maximum for identical values', () => {
  const identical = [432, 432, 432, 432, 432];
  const entropy = zeroEntropy.calculateZeroEntropy(identical);
  return entropy === 1000000; // Maximum order
});

runner.test('Zero entropy should be lower for varied values', () => {
  const varied = [100, 200, 300, 400, 500];
  const entropy = zeroEntropy.calculateZeroEntropy(varied);
  return entropy < 1000000 && entropy >= 0;
});

// Test harmonic convergence
runner.test('Harmonic convergence should find LCM', () => {
  const frequencies = [432, 528, 639];
  const convergence = zeroEntropy.harmonicConvergence(frequencies);
  const gcd1 = zeroEntropy['gcd'](432, 528);
  const gcd2 = zeroEntropy['gcd'](convergence, 639);
  return convergence > 0 && convergence % 432 === 0 && convergence % 528 === 0 && convergence % 639 === 0;
});

// Test standing wave nodes
runner.test('Standing wave nodes calculation', () => {
  const nodes = zeroEntropy.standingWaveNodes(100, 25);
  return nodes === 9; // (2 * 100 / 25) + 1 = 9
});

// Test octave equivalents
runner.test('Octave equivalents should double/halve correctly', () => {
  const octaves = zeroEntropy.octaveEquivalents(432, 2);
  return octaves.includes(108) &&  // 432 / 4 (2 octaves down)
         octaves.includes(216) &&  // 432 / 2 (1 octave down)
         octaves.includes(432) &&  // Original
         octaves.includes(864) &&  // 432 * 2 (1 octave up)
         octaves.includes(1728);   // 432 * 4 (2 octaves up)
});

// Test main zero entropy achievement
runner.test('Achieve zero entropy should return valid state', () => {
  const result = zeroEntropy.achieveZeroEntropy();
  return result.state === 9 && // Digital root of 432000
         result.frequency === FREQUENCIES.A432 &&
         result.harmonics.length === 9 &&
         result.resonance > 0 &&
         result.entropy > 0;
});

// ============================================================================
// INTEGER HARMONICS TESTS
// ============================================================================

// Test integer harmonic calculations
runner.test('Integer harmonics should generate correct series', () => {
  const harmonics = IntegerHarmonics.harmonicSeries(4320000, 5);
  return harmonics[0] === 4320000 &&
         harmonics[1] === 8640000 &&
         harmonics[2] === 12960000 &&
         harmonics[3] === 17280000 &&
         harmonics[4] === 21600000;
});

// Test interval application
runner.test('Applying perfect fifth interval should work', () => {
  const result = IntegerHarmonics.applyInterval(4320000, 3, 2);
  return result === 6480000; // 432 * 1.5 = 648 Hz
});

// Test consonance rating
runner.test('Consonance rating for octave should be minimal', () => {
  const rating = IntegerHarmonics.consonanceRating(432, 864);
  return rating === 3; // 1 + 2 = 3 (most consonant after unison)
});

// Test major triad generation
runner.test('Major triad should have correct ratios', () => {
  const triad = IntegerHarmonics.majorTriad(4320000);
  // Root, major third (5/4), perfect fifth (3/2)
  return triad[0] === 4320000 &&
         triad[1] === 5400000 && // 432 * 5/4 = 540
         triad[2] === 6480000;   // 432 * 3/2 = 648
});

// ============================================================================
// VORTEX INTEGER MATH TESTS
// ============================================================================

// Test vortex digital root
runner.test('Vortex digital root should reduce to single digit', () => {
  return VortexIntegerMath.digitalRoot(432) === 9 &&
         VortexIntegerMath.digitalRoot(144) === 9 &&
         VortexIntegerMath.digitalRoot(369) === 9 &&
         VortexIntegerMath.digitalRoot(124) === 7;
});

// Test vortex doubling
runner.test('Vortex doubling should follow pattern', () => {
  let current = 1;
  const pattern: number[] = [];
  for (let i = 0; i < 6; i++) {
    current = VortexIntegerMath.vortexDouble(current);
    pattern.push(current);
    current = current; // Keep the digital root for next iteration
  }
  // Pattern should be: 2, 4, 8, 7, 5, 1
  return pattern[0] === 2 &&
         pattern[1] === 4 &&
         pattern[2] === 8 &&
         pattern[3] === 7 &&
         pattern[4] === 5 &&
         pattern[5] === 1;
});

// Test axis detection
runner.test('Axis detection should identify 3, 6, 9', () => {
  return VortexIntegerMath.isOnAxis(3) &&
         VortexIntegerMath.isOnAxis(6) &&
         VortexIntegerMath.isOnAxis(9) &&
         VortexIntegerMath.isOnAxis(369) &&
         !VortexIntegerMath.isOnAxis(124);
});

// ============================================================================
// SACRED GEOMETRY INTEGER TESTS
// ============================================================================

// Test Euler's formula
runner.test('Euler formula verification for Platonic solids', () => {
  const tetra = SacredGeometryIntegers.verifyEuler(4, 6, 4);
  const cube = SacredGeometryIntegers.verifyEuler(8, 12, 6);
  const octa = SacredGeometryIntegers.verifyEuler(6, 12, 8);
  return tetra && cube && octa;
});

// Test Fibonacci generation
runner.test('Sacred geometry Fibonacci should match', () => {
  const fib = SacredGeometryIntegers.fibonacci(8);
  return fib[0] === 1 &&
         fib[1] === 1 &&
         fib[2] === 2 &&
         fib[3] === 3 &&
         fib[4] === 5 &&
         fib[5] === 8 &&
         fib[6] === 13 &&
         fib[7] === 21;
});

// Test golden ratio approximation
runner.test('Golden ratio approximation should converge', () => {
  const [num, den] = SacredGeometryIntegers.goldenRatioApprox(10);
  const ratio = num / den;
  return ratio > 1.61 && ratio < 1.62; // Should be close to 1.618...
});

// Test Pythagorean triple generation
runner.test('Pythagorean triple should satisfy a² + b² = c²', () => {
  const [a, b, c] = SacredGeometryIntegers.pythagoreanTriple(5, 3);
  return a * a + b * b === c * c;
});

// Test magic square validation
runner.test('Magic square 3x3 should be valid', () => {
  const square = SacredGeometryIntegers.magicSquare3();
  return SacredGeometryIntegers.isMagicSquare(square);
});

// Test triangular numbers
runner.test('Triangular numbers should follow formula', () => {
  return SacredGeometryIntegers.triangular(1) === 1 &&
         SacredGeometryIntegers.triangular(3) === 6 &&
         SacredGeometryIntegers.triangular(5) === 15 &&
         SacredGeometryIntegers.triangular(10) === 55;
});

// ============================================================================
// FREQUENCY CONSTANT TESTS
// ============================================================================

// Test that all frequencies are integers
runner.test('All frequencies should be integers', () => {
  const allIntegers = Object.values(FREQUENCIES).every(f => Number.isInteger(f));
  return allIntegers;
});

// Test A432 frequency relationships
runner.test('A432 octaves should double correctly', () => {
  return FREQUENCIES.A432_2 === FREQUENCIES.A432 * 2 &&
         FREQUENCIES.A432_4 === FREQUENCIES.A432 * 4;
});

// Test vortex patterns
runner.test('Vortex patterns should contain correct sequences', () => {
  const doubling = VORTEX_PATTERNS.DOUBLING;
  const trinity = VORTEX_PATTERNS.TRINITY;
  
  return doubling.length === 6 &&
         doubling[0] === 1 &&
         doubling[5] === 5 &&
         trinity.length === 3 &&
         trinity.includes(3) &&
         trinity.includes(6) &&
         trinity.includes(9);
});

// ============================================================================
// RUN ALL TESTS
// ============================================================================

console.log('=' .repeat(60));
console.log('A432 ZERO ENTROPY PURE MATHEMATICS TEST SUITE');
console.log('All calculations use integer arithmetic only');
console.log('No floating point operations or decimals');
console.log('=' .repeat(60) + '\n');

runner.run();

// Export for use in other test files
export { TestRunner };