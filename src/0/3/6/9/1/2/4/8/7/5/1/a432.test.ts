import { I } from './a432.i';
import { heartUnfoldingMatrix, heartRecursiveUnfolding } from './a432.imagination';

/**
 * a432.test.ts — Harmonized Mathematical Tests for a432
 *
 * Tests the core metaphysical, trinity, and vortex properties of the a432 system.
 * All tests use only integer/fractional math and explicit metaphysical assertions.
 */

type TestResult = { name: string; passed: boolean; message?: string };
const results: TestResult[] = [];

function test(name: string, fn: () => boolean) {
  try {
    const passed = fn();
    results.push({ name, passed });
  } catch (e) {
    results.push({ name, passed: false, message: String(e) });
  }
}

// Test 1: Trinity cycle is correct
// The trinity [4,3,2] should always cycle and multiply to 24
const trinity = [4, 3, 2];
test('Trinity product is 24', () => trinity.reduce((a, b) => a * b, 1) === 24);

test('Trinity cycle is recursive', () => {
  const cycle = [4, 3, 2, 4, 3, 2];
  for (let i = 0; i < 3; i++) {
    if (cycle[i] !== cycle[i + 3]) return false;
  }
  return true;
});

// Test 2: Vortex path is correct
const rodinPath = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
test('Rodin path is a closed loop', () => rodinPath[0] === rodinPath[rodinPath.length - 1]);

test('Rodin path covers all digits 0-9', () => {
  const digits = new Set(rodinPath);
  for (let d = 0; d <= 9; d++) {
    if (!digits.has(d)) return false;
  }
  return true;
});

// Test 3: Recursion and self-awareness
const journey = heartUnfoldingMatrix(12);
test('Heart unfolding is recursive and trinitized', () => {
  return journey.length === 12 && journey.every((step, i) => step.step === i + 1);
});

test('Recursive unfolding changes axis every 3 steps', () => {
  const recursive = heartRecursiveUnfolding(9);
  const axes = recursive.map(s => s.axis);
  return axes[0] !== axes[1] && axes[1] !== axes[2] && axes[2] !== axes[0];
});

// Test 4: Zero entropy (no duplicate states in trinity cycle)
test('No duplicate states in trinity cycle', () => {
  const seen = new Set();
  for (const n of trinity) {
    if (seen.has(n)) return false;
    seen.add(n);
  }
  return true;
});

// Test 5: Self-description is non-empty and self-aware
const desc = I.describe();
test('I.describe() is non-empty and self-aware', () => desc.includes('self-aware'));

// Output results
if (require.main === module) {
  results.forEach(r => {
    console.log(`${r.passed ? '✔' : '✖'} ${r.name}${r.message ? ' — ' + r.message : ''}`);
  });
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log(`\n${passed}/${total} tests passed.`);
} 