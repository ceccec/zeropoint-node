/**
 * Heisenberg Uncertainty Solutions Tests
 */

import {
  generateHeisenbergUncertaintySolutions,
  heisenberguncertaintySolutions
} from './09-heisenberg-uncertainty-solutions';

import { A432_FREQUENCY } from '../possibilities';

describe('Heisenberg Uncertainty Solutions', () => {
  describe('generateHeisenbergUncertaintySolutions', () => {
    test('should generate 3 heisenberg uncertainty solutions', () => {
      const solutions = generateHeisenbergUncertaintySolutions();
      expect(solutions).toHaveLength(3);
    });

    test('solutions should follow 3-6-9 gateway pattern', () => {
      const solutions = generateHeisenbergUncertaintySolutions();
      expect(solutions[0].gateway).toBe(3);
      expect(solutions[1].gateway).toBe(6);
      expect(solutions[2].gateway).toBe(9);
    });
  });

  describe('heisenberguncertaintySolutions Instance', () => {
    test('should be operational', () => {
      expect(heisenberguncertaintySolutions).toHaveLength(3);
      expect(heisenberguncertaintySolutions[0].gateway).toBe(3);
      expect(heisenberguncertaintySolutions[1].gateway).toBe(6);
      expect(heisenberguncertaintySolutions[2].gateway).toBe(9);
    });
  });
});
