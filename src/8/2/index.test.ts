/**
 * src/8/2/index.test.ts - Void ↔ Vortex Interaction Tests
 *
 * Tests for the interaction between Directory 8 (Void)
 * and Directory 2 (Vortex) in the Rodin coil system.
 */

import { VOID_VORTEX_INTERACTION, VoidVortexInteraction } from './index';

describe('Void ↔ Vortex Interaction', () => {
  
  describe('Interaction Constants', () => {
    test('should have correct interaction frequency', () => {
      expect(VOID_VORTEX_INTERACTION.INTERACTION_FREQUENCY).toBe(432 * (8/2));
    });
    
    test('should have void patterns', () => {
      expect(VOID_VORTEX_INTERACTION.VOID_PATTERNS.VOID_VORTEX).toEqual([8, 2, 8]);
      expect(VOID_VORTEX_INTERACTION.VOID_PATTERNS.VORTEX_VOID).toEqual([2, 8, 2]);
    });
    
    test('should have correct multipliers', () => {
      expect(VOID_VORTEX_INTERACTION.VOID_MULTIPLIER).toBe(1.143);
      expect(VOID_VORTEX_INTERACTION.VORTEX_MULTIPLIER).toBe(1.2);
    });
  });
  
  describe('VoidVortexInteraction Class', () => {
    test('should calculate interaction strength correctly', () => {
      const strength = VoidVortexInteraction.calculateInteractionStrength(5, 8);
      const expected = 5 * 1.143 + 8 * 1.2;
      expect(strength).toBe(expected);
    });
    
    test('should return void vortex patterns', () => {
      const patterns = VoidVortexInteraction.getVoidVortexPatterns();
      expect(patterns).toEqual([8, 2, 8]);
    });
    
    test('should calculate void vortex operations', () => {
      const result = VoidVortexInteraction.calculateVoidVortexOperations(15);
      expect(result).toBe(6); // 15 % 9 = 6
    });
    
    test('should handle zero input', () => {
      const result = VoidVortexInteraction.calculateVoidVortexOperations(0);
      expect(result).toBe(9); // 0 % 9 || 9 = 9
    });
  });
});
