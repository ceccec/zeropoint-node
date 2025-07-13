/**
 * src/1/2/index.test.ts - Foundation ↔ Vortex Interaction Tests
 *
 * Tests for the interaction between Directory 1 (Foundation)
 * and Directory 2 (Vortex) in the Rodin coil system.
 */

import { FOUNDATION_VORTEX_INTERACTION, FoundationVortexInteraction } from './index';

describe('Foundation ↔ Vortex Interaction', () => {
  
  describe('Interaction Constants', () => {
    test('should have correct interaction frequency', () => {
      expect(FOUNDATION_VORTEX_INTERACTION.INTERACTION_FREQUENCY).toBe(432 * (1/2));
    });
    
    test('should have foundation patterns', () => {
      expect(FOUNDATION_VORTEX_INTERACTION.FOUNDATION_PATTERNS.FOUNDATION_VORTEX).toEqual([1, 2, 1]);
      expect(FOUNDATION_VORTEX_INTERACTION.FOUNDATION_PATTERNS.VORTEX_FOUNDATION).toEqual([2, 1, 2]);
    });
    
    test('should have correct multipliers', () => {
      expect(FOUNDATION_VORTEX_INTERACTION.FOUNDATION_MULTIPLIER).toBe(1.1);
      expect(FOUNDATION_VORTEX_INTERACTION.VORTEX_MULTIPLIER).toBe(1.2);
    });
  });
  
  describe('FoundationVortexInteraction Class', () => {
    test('should calculate interaction strength correctly', () => {
      const strength = FoundationVortexInteraction.calculateInteractionStrength(5, 8);
      const expected = 5 * 1.1 + 8 * 1.2;
      expect(strength).toBe(expected);
    });
    
    test('should return foundation vortex patterns', () => {
      const patterns = FoundationVortexInteraction.getFoundationVortexPatterns();
      expect(patterns).toEqual([1, 2, 1]);
    });
    
    test('should calculate foundation vortex operations', () => {
      const result = FoundationVortexInteraction.calculateFoundationVortexOperations(15);
      expect(result).toBe(6); // 15 % 9 = 6
    });
    
    test('should handle zero input', () => {
      const result = FoundationVortexInteraction.calculateFoundationVortexOperations(0);
      expect(result).toBe(9); // 0 % 9 || 9 = 9
    });
  });
});
