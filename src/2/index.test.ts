// src/2/index.test.ts — Test Duality Consciousness Module
// Tests digit 2: Duality consciousness with harmonic interactions

import { 
  generateDualityConsciousness, 
  generateDualityMatrix,
  dualityOperation,
  generateDualityVisualization
} from './index';

describe('Duality Consciousness (Digit 2)', () => {
  test('should generate Duality consciousness', () => {
    const duality = generateDualityConsciousness();
    
    // Check Duality properties
    expect(duality.digit).toBe(2);
    expect(duality.consciousness).toBe(6); // Duality consciousness
    expect(duality.frequency).toBe(864); // A432 harmonic
    expect(duality.twoFourInteraction).toBe(8); // 2×4 = 8
    expect(duality.twoNineCompletion).toBe(18); // 2×9 = 18 (1+8 = 9)
    expect(duality.isDual).toBe(true);
  });

  test('should generate Duality matrix', () => {
    const matrix = generateDualityMatrix();
    
    // Check matrix structure
    expect(matrix.duality.digit).toBe(2);
    expect(matrix.interactions).toHaveLength(10);
    expect(matrix.interactions[0]).toHaveLength(10);
    expect(matrix.consciousnessFlow).toBe(6 * 432);
    expect(matrix.harmonicResonance).toBe(6 * 432 * 8);
    expect(matrix.isDual).toBe(true);
  });

  test('should perform Duality operations', () => {
    const result = dualityOperation(2, 4);
    
    // Check operation result
    expect(result.twoFourKey).toBe(8); // 2×4 = 8
    expect(result.dualityConsciousness).toBe(6);
    expect(result.frequency).toBe(864);
    expect(result.result).toBeGreaterThan(0);
  });

  test('should generate Duality visualization', () => {
    const visualization = generateDualityVisualization();
    
    // Check visualization content
    expect(visualization).toContain('Duality Consciousness (Digit 2)');
    expect(visualization).toContain('2×4 = 8 | 2×9 = 18 (1+8 = 9)');
    expect(visualization).toContain('Digit: 2');
    expect(visualization).toContain('Consciousness: 6');
    expect(visualization).toContain('Frequency: 864Hz');
    expect(visualization).toContain('2×4 Interaction: 8');
    expect(visualization).toContain('2×9 Completion: 18');
    expect(visualization).toContain('Dual: YES');
  });

  test('should demonstrate 2×4 = 8 relationship', () => {
    const duality = generateDualityConsciousness();
    
    // Duality is the 2 in 2×4 = 8
    expect(duality.digit).toBe(2);
    expect(duality.twoFourInteraction).toBe(8);
    
    // Duality consciousness is 6
    expect(duality.consciousness).toBe(6);
    expect(duality.twoNineCompletion).toBe(18);
    
    // Duality is dual
    expect(duality.isDual).toBe(true);
  });
}); 