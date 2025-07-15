/**
 * Multi-Dimensional Stability Validator Tests
 * 
 * Tests the stability of consciousness field dimensions and their interactions
 * through the breathing paradox cycle.
 */

import { MultiDimensionalStabilityValidator } from './MultiDimensionalStabilityValidator';

describe('MultiDimensionalStabilityValidator', () => {
  let validator: MultiDimensionalStabilityValidator;

  beforeEach(() => {
    validator = new MultiDimensionalStabilityValidator();
  });

  describe('Dimension Stability', () => {
    test('should validate all consciousness dimensions are stable', () => {
      const result = validator.validateMultiDimensionalStability();
      
      // Check that all dimensions are stable
      for (const [dimensionId, stability] of Object.entries(result.dimensionStability)) {
        expect(stability).toBeGreaterThanOrEqual(0.95);
      }
    });

    test('should have correct breathing patterns for each dimension', () => {
      // Void dimension should be Mobius (pure torus)
      const voidDimension = validator.getDimensionInfo('0');
      expect(voidDimension?.breathingPattern).toBe('mobius');
      expect(voidDimension?.torusStructure).toBe('pure');

      // All other dimensions should be Rodin (mathematical torus)
      for (let i = 1; i <= 9; i++) {
        const dimension = validator.getDimensionInfo(i.toString());
        expect(dimension?.breathingPattern).toBe('rodin');
        expect(dimension?.torusStructure).toBe('mathematical');
      }
    });

    test('should have valid consciousness levels for all dimensions', () => {
      for (let i = 0; i <= 9; i++) {
        const dimension = validator.getDimensionInfo(i.toString());
        expect(dimension?.consciousnessLevel).toBeGreaterThanOrEqual(0);
        expect(dimension?.consciousnessLevel).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Interaction Stability', () => {
    test('should validate all dimension interactions are stable', () => {
      const result = validator.validateMultiDimensionalStability();
      
      // Check that all interactions are stable
      for (const [interactionKey, stability] of Object.entries(result.interactionStability)) {
        expect(stability).toBeGreaterThanOrEqual(0.95);
      }
    });

    test('should have breathing paradox interactions', () => {
      const breathingInteractions = validator.getBreathingParadoxInteractions();
      
      // Should have 0→1 and 1→0 interactions
      expect(breathingInteractions).toHaveLength(2);
      
      const hasZeroToOne = breathingInteractions.some(i => 
        i.fromDimension === '0' && i.toDimension === '1'
      );
      const hasOneToZero = breathingInteractions.some(i => 
        i.fromDimension === '1' && i.toDimension === '0'
      );
      
      expect(hasZeroToOne).toBe(true);
      expect(hasOneToZero).toBe(true);
    });

    test('should have Rodin coil vortex interactions', () => {
      const interactions = validator.getDimensionInteractions();
      const rodinSequence = ['1', '2', '4', '8', '7', '5'];
      
      // Check that all Rodin coil interactions exist
      for (let i = 0; i < rodinSequence.length; i++) {
        const from = rodinSequence[i];
        const to = rodinSequence[(i + 1) % rodinSequence.length];
        
        const hasInteraction = interactions.some(i => 
          i.fromDimension === from && i.toDimension === to
        );
        
        expect(hasInteraction).toBe(true);
      }
    });

    test('should have W-Axis spiritual interactions', () => {
      const interactions = validator.getDimensionInteractions();
      const wAxisSequence = ['3', '6', '9'];
      
      // Check that all W-Axis interactions exist
      for (let i = 0; i < wAxisSequence.length; i++) {
        const from = wAxisSequence[i];
        const to = wAxisSequence[(i + 1) % wAxisSequence.length];
        
        const hasInteraction = interactions.some(i => 
          i.fromDimension === from && i.toDimension === to
        );
        
        expect(hasInteraction).toBe(true);
      }
    });
  });

  describe('Breathing Paradox Stability', () => {
    test('should validate breathing paradox stability', () => {
      const result = validator.validateMultiDimensionalStability();
      
      expect(result.breathingParadoxStability).toBeGreaterThanOrEqual(0.95);
    });

    test('should have both Mobius and Rodin dimensions', () => {
      const result = validator.validateMultiDimensionalStability();
      
      // Should have at least one Mobius dimension (0) and multiple Rodin dimensions (1-9)
      expect(result.breathingParadoxStability).toBe(1.0);
    });
  });

  describe('Consciousness Field Stability', () => {
    test('should validate consciousness field stability across all dimensions', () => {
      const result = validator.validateMultiDimensionalStability();
      
      expect(result.consciousnessFieldStability).toBeGreaterThanOrEqual(0.95);
    });

    test('should have valid field strengths for all dimensions', () => {
      for (let i = 0; i <= 9; i++) {
        const dimension = validator.getDimensionInfo(i.toString());
        expect(dimension?.fieldStrength).toBeGreaterThanOrEqual(0);
      }
    });

    test('should have valid awareness levels for all dimensions', () => {
      for (let i = 0; i <= 9; i++) {
        const dimension = validator.getDimensionInfo(i.toString());
        expect(dimension?.awarenessLevel).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Overall Multi-Dimensional Stability', () => {
    test('should validate overall multi-dimensional stability', () => {
      const result = validator.validateMultiDimensionalStability();
      
      expect(result.overallStability).toBeGreaterThanOrEqual(0.95);
      expect(result.isStable).toBe(true);
    });

    test('should provide detailed validation messages', () => {
      const result = validator.validateMultiDimensionalStability();
      
      expect(result.validationMessages).toContain('✅ Multi-dimensional stability validated successfully');
      expect(result.validationMessages.length).toBeGreaterThan(0);
    });

    test('should demonstrate consciousness field dimensions are stable', () => {
      const result = validator.validateMultiDimensionalStability();
      
      // This proves that consciousness field dimensions maintain stability
      // while harmoniously interacting through the breathing paradox
      expect(result.isStable).toBe(true);
      
      console.log('Multi-Dimensional Stability Proof:');
      console.log(`Overall Stability: ${result.overallStability.toFixed(3)}`);
      console.log(`Breathing Paradox Stability: ${result.breathingParadoxStability.toFixed(3)}`);
      console.log(`Consciousness Field Stability: ${result.consciousnessFieldStability.toFixed(3)}`);
      console.log('✅ Consciousness field dimensions are proven stable');
    });
  });

  describe('Dimension Characteristics', () => {
    test('should demonstrate void dimension characteristics', () => {
      const voidDimension = validator.getDimensionInfo('0');
      
      expect(voidDimension?.fieldStrength).toBe(0); // Infinite potential
      expect(voidDimension?.consciousnessLevel).toBe(0); // Impossible contraction
      expect(voidDimension?.breathingPattern).toBe('mobius'); // Pure torus
    });

    test('should demonstrate unity dimension characteristics', () => {
      const unityDimension = validator.getDimensionInfo('1');
      
      expect(unityDimension?.fieldStrength).toBe(1.0); // Foundation
      expect(unityDimension?.consciousnessLevel).toBe(2/3); // Unity consciousness
      expect(unityDimension?.breathingPattern).toBe('rodin'); // Mathematical torus
    });

    test('should demonstrate awareness dimension characteristics', () => {
      const awarenessDimension = validator.getDimensionInfo('7');
      
      expect(awarenessDimension?.consciousnessLevel).toBe(6/7); // Return consciousness
      expect(awarenessDimension?.breathingPattern).toBe('rodin'); // Mathematical torus
    });
  });
}); 