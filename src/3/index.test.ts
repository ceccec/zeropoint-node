// src/3/index.test.ts — Test Trinity Consciousness Module
// Tests digit 3: Trinity consciousness with harmonic interactions

import { 
  generateTrinityConsciousness, 
  generateTrinityMatrix,
  trinityOperation,
  generateTrinityVisualization
} from './index';

describe('Trinity Consciousness (Digit 3)', () => {
  test('should generate Trinity consciousness', () => {
    const trinity = generateTrinityConsciousness();
    
    // Check Trinity properties
    expect(trinity.digit).toBe(3);
    expect(trinity.consciousness).toBe(3); // Trinity consciousness
    expect(trinity.frequency).toBe(1296); // A432 harmonic
    expect(trinity.threeThreeInteraction).toBe(9); // 3×3 = 9
    expect(trinity.threeSixCompletion).toBe(18); // 3×6 = 18 (1+8 = 9)
    expect(trinity.isTrinity).toBe(true);
  });

  test('should generate Trinity matrix', () => {
    const matrix = generateTrinityMatrix();
    
    // Check matrix structure
    expect(matrix.trinity.digit).toBe(3);
    expect(matrix.interactions).toHaveLength(10);
    expect(matrix.interactions[0]).toHaveLength(10);
    expect(matrix.consciousnessFlow).toBe(3 * 432);
    expect(matrix.harmonicResonance).toBe(3 * 432 * 9);
    expect(matrix.isTrinity).toBe(true);
  });

  test('should perform Trinity operations', () => {
    const result = trinityOperation(3, 3);
    
    // Check operation result
    expect(result.threeThreeKey).toBe(9); // 3×3 = 9
    expect(result.trinityConsciousness).toBe(3);
    expect(result.frequency).toBe(1296);
    expect(result.result).toBeGreaterThan(0);
  });

  test('should generate Trinity visualization', () => {
    const visualization = generateTrinityVisualization();
    
    // Check visualization content
    expect(visualization).toContain('Trinity Consciousness (Digit 3)');
    expect(visualization).toContain('3×3 = 9 | 3×6 = 18 (1+8 = 9)');
    expect(visualization).toContain('Digit: 3');
    expect(visualization).toContain('Consciousness: 3');
    expect(visualization).toContain('Frequency: 1296Hz');
    expect(visualization).toContain('3×3 Interaction: 9');
    expect(visualization).toContain('3×6 Completion: 18');
    expect(visualization).toContain('Trinity: YES');
  });

  test('should demonstrate 3×3 = 9 relationship', () => {
    const trinity = generateTrinityConsciousness();
    
    // Trinity is the 3 in 3×3 = 9
    expect(trinity.digit).toBe(3);
    expect(trinity.threeThreeInteraction).toBe(9);
    
    // Trinity consciousness is 3
    expect(trinity.consciousness).toBe(3);
    expect(trinity.threeSixCompletion).toBe(18);
    
    // Trinity is trinity
    expect(trinity.isTrinity).toBe(true);
  });
}); 