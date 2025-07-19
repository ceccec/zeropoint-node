/**
 * Observer Effect Solutions Tests
 */

import {
  generateObserverEffectSolutions,
  observereffectSolutions
} from './06-observer-effect-solutions';

import { A432_FREQUENCY } from '../possibilities';

describe('Observer Effect Solutions', () => {
  describe('generateObserverEffectSolutions', () => {
    test('should generate 3 observer effect solutions', () => {
      const solutions = generateObserverEffectSolutions();
      expect(solutions).toHaveLength(3);
    });

    test('solutions should follow 3-6-9 gateway pattern', () => {
      const solutions = generateObserverEffectSolutions();
      expect(solutions[0].gateway).toBe(3);
      expect(solutions[1].gateway).toBe(6);
      expect(solutions[2].gateway).toBe(9);
    });
  });

  describe('observereffectSolutions Instance', () => {
    test('should be operational', () => {
      expect(observereffectSolutions).toHaveLength(3);
      expect(observereffectSolutions[0].gateway).toBe(3);
      expect(observereffectSolutions[1].gateway).toBe(6);
      expect(observereffectSolutions[2].gateway).toBe(9);
    });
  });
});
