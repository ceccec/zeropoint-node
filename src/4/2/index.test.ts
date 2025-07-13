/**
 * src/4/2/index.test.ts - Constants ↔ Vortex Interaction Tests
 *
 * Tests for the interaction between Directory 4 (Constants)
 * and Directory 2 (Vortex) in the Rodin coil system.
 */

import { CONSTANTS_VORTEX_INTERACTION, ConstantsVortexInteraction } from './index';

describe('Constants ↔ Vortex Interaction', () => {
  
  describe('Interaction Constants', () => {
    test('should have correct interaction frequency', () => {
      expect(CONSTANTS_VORTEX_INTERACTION.INTERACTION_FREQUENCY).toBe(432 * (4/2));
    });
    
    test('should have constants patterns', () => {
      expect(CONSTANTS_VORTEX_INTERACTION.CONSTANTS_PATTERNS.CONSTANTS_VORTEX).toEqual([4, 2, 4]);
      expect(CONSTANTS_VORTEX_INTERACTION.CONSTANTS_PATTERNS.VORTEX_CONSTANTS).toEqual([2, 4, 2]);
    });
    
    test('should have correct multipliers', () => {
      expect(CONSTANTS_VORTEX_INTERACTION.CONSTANTS_MULTIPLIER).toBe(1.1);
      expect(CONSTANTS_VORTEX_INTERACTION.VORTEX_MULTIPLIER).toBe(1.2);
    });
  });
  
  describe('ConstantsVortexInteraction Class', () => {
    test('should calculate interaction strength correctly', () => {
      const strength = ConstantsVortexInteraction.calculateInteractionStrength(5, 8);
      const expected = 5 * 1.1 + 8 * 1.2;
      expect(strength).toBe(expected);
    });
    
    test('should return constants vortex patterns', () => {
      const patterns = ConstantsVortexInteraction.getConstantsVortexPatterns();
      expect(patterns).toEqual([4, 2, 4]);
    });
    
    test('should calculate constants vortex operations', () => {
      const result = ConstantsVortexInteraction.calculateConstantsVortexOperations(15);
      expect(result).toBe(6); // 15 % 9 = 6
    });
    
    test('should handle zero input', () => {
      const result = ConstantsVortexInteraction.calculateConstantsVortexOperations(0);
      expect(result).toBe(9); // 0 % 9 || 9 = 9
    });
  });
});
