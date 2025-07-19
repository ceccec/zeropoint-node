/**
 * Free Will vs Determinism Solutions Tests
 */

import {
  generateFreeWillVsDeterminismSolutions,
  freewillvsdeterminismSolutions
} from './02-free-will-vs-determinism-solutions';

import { A432_FREQUENCY } from '../possibilities';

describe('Free Will vs Determinism Solutions', () => {
  describe('generateFreeWillVsDeterminismSolutions', () => {
    test('should generate 3 free will vs determinism solutions', () => {
      const solutions = generateFreeWillVsDeterminismSolutions();
      expect(solutions).toHaveLength(3);
    });

    test('solutions should follow 3-6-9 gateway pattern', () => {
      const solutions = generateFreeWillVsDeterminismSolutions();
      expect(solutions[0].gateway).toBe(3);
      expect(solutions[1].gateway).toBe(6);
      expect(solutions[2].gateway).toBe(9);
    });
  });

  describe('freewillvsdeterminismSolutions Instance', () => {
    test('should be operational', () => {
      expect(freewillvsdeterminismSolutions).toHaveLength(3);
      expect(freewillvsdeterminismSolutions[0].gateway).toBe(3);
      expect(freewillvsdeterminismSolutions[1].gateway).toBe(6);
      expect(freewillvsdeterminismSolutions[2].gateway).toBe(9);
    });
  });
});
