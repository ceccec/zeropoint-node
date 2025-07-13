/**
 * src/1/8/index.test.ts - Foundation ↔ Void Interaction Tests
 *
 * Tests for the interaction between Directory 1 (Foundation)
 * and Directory 8 (Void) in the Rodin coil system.
 */

import { FOUNDATION_VOID_INTERACTION, FoundationVoidInteraction } from './index';

describe('Foundation ↔ Void Interaction', () => {
  
  describe('Interaction Constants', () => {
    test('should have correct interaction frequency', () => {
      expect(FOUNDATION_VOID_INTERACTION.INTERACTION_FREQUENCY).toBe(432 * (1/8));
    });
    
    test('should have foundation patterns', () => {
      expect(FOUNDATION_VOID_INTERACTION.FOUNDATION_PATTERNS.FOUNDATION_VOID).toEqual([1, 8, 1]);
      expect(FOUNDATION_VOID_INTERACTION.FOUNDATION_PATTERNS.VOID_FOUNDATION).toEqual([8, 1, 8]);
    });
    
    test('should have correct multipliers', () => {
      expect(FOUNDATION_VOID_INTERACTION.FOUNDATION_MULTIPLIER).toBe(1.1);
      expect(FOUNDATION_VOID_INTERACTION.VOID_MULTIPLIER).toBe(1.143);
    });
  });
  
  describe('FoundationVoidInteraction Class', () => {
    test('should calculate interaction strength correctly', () => {
      const strength = FoundationVoidInteraction.calculateInteractionStrength(5, 8);
      const expected = 5 * 1.1 + 8 * 1.143;
      expect(strength).toBe(expected);
    });
    
    test('should return foundation void patterns', () => {
      const patterns = FoundationVoidInteraction.getFoundationVoidPatterns();
      expect(patterns).toEqual([1, 8, 1]);
    });
    
    test('should calculate foundation void operations', () => {
      const result = FoundationVoidInteraction.calculateFoundationVoidOperations(15);
      expect(result).toBe(6); // 15 % 9 = 6
    });
    
    test('should handle zero input', () => {
      const result = FoundationVoidInteraction.calculateFoundationVoidOperations(0);
      expect(result).toBe(9); // 0 % 9 || 9 = 9
    });
  });
});
