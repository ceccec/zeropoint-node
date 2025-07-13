/**
 * src/2/8/index.test.ts - Vortex ↔ Void Interaction Tests
 *
 * Tests for the interaction between Directory 2 (Vortex)
 * and Directory 8 (Void) in the Rodin coil system.
 */

import { VORTEX_VOID_INTERACTION, VortexVoidInteraction } from './index';

describe('Vortex ↔ Void Interaction', () => {
  
  describe('Interaction Constants', () => {
    test('should have correct interaction frequency', () => {
      expect(VORTEX_VOID_INTERACTION.INTERACTION_FREQUENCY).toBe(432 * (2/8));
    });
    
    test('should have vortex patterns', () => {
      expect(VORTEX_VOID_INTERACTION.VORTEX_PATTERNS.VORTEX_VOID).toEqual([2, 8, 2]);
      expect(VORTEX_VOID_INTERACTION.VORTEX_PATTERNS.VOID_VORTEX).toEqual([8, 2, 8]);
    });
    
    test('should have correct multipliers', () => {
      expect(VORTEX_VOID_INTERACTION.VORTEX_MULTIPLIER).toBe(1.2);
      expect(VORTEX_VOID_INTERACTION.VOID_MULTIPLIER).toBe(1.143);
    });
  });
  
  describe('VortexVoidInteraction Class', () => {
    test('should calculate interaction strength correctly', () => {
      const strength = VortexVoidInteraction.calculateInteractionStrength(5, 8);
      const expected = 5 * 1.2 + 8 * 1.143;
      expect(strength).toBe(expected);
    });
    
    test('should return vortex void patterns', () => {
      const patterns = VortexVoidInteraction.getVortexVoidPatterns();
      expect(patterns).toEqual([2, 8, 2]);
    });
    
    test('should calculate vortex void operations', () => {
      const result = VortexVoidInteraction.calculateVortexVoidOperations(15);
      expect(result).toBe(6); // 15 % 9 = 6
    });
    
    test('should handle zero input', () => {
      const result = VortexVoidInteraction.calculateVortexVoidOperations(0);
      expect(result).toBe(9); // 0 % 9 || 9 = 9
    });
  });
});
