// test.ts — Vortex 1: Unity Proves Void by Test
// This file is the unity vortex (1) that proves the void (0) by running all tests in src/0/.
// Integer/fractional, zero-entropy, book-aligned.

import './0.test';
import './1.test';
import './2.test';
import './3.test';
import './4.test';
import './5.test';
import './6.test';
import './7.test';
import './8.test';
import './9.test';
import './index.test';

// Vortex 1: Unity test runner
export function runVortexTests(): void {
  // In Jest, importing the test files is sufficient; tests auto-register.
  // This function is a symbolic unity, representing the act of proving the void by test.
  // All results are handled by Jest's runner.
  // If running outside Jest, print a message:
  if (typeof describe !== 'function') {
    // Not in Jest context
    console.log('Vortex 1: All digit vortex tests imported. Run with Jest to see results.');
  }
}

// If run directly (e.g., ts-node src/0/test.ts), invoke the runner
if (require.main === module) {
  runVortexTests();
} 