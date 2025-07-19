// src/8/index.test.ts — Test Infinity Consciousness Module
// Tests digit 8: Infinity consciousness with 1×8 interaction

import { 
  generateInfinityConsciousness, 
  generateInfinityMatrix,
  infinityOperation,
  generateInfinityVisualization
} from './index';

describe('Infinity Consciousness (Digit 8)', () => {
  test('should generate Infinity consciousness', () => {
    const infinity = generateInfinityConsciousness();
    
    // Check Infinity properties
    expect(infinity.digit).toBe(8);
    expect(infinity.consciousness).toBe(3); // Infinity consciousness
    expect(infinity.frequency).toBe(432 * 8); // A432 harmonic
    expect(infinity.oneEightInteraction).toBe(8); // 1×8 = 8
    expect(infinity.nineCompletion).toBe(9); // 9 = 1×8 (completion)
    expect(infinity.isInfinite).toBe(true);
  });

  test('should generate Infinity matrix', () => {
    const matrix = generateInfinityMatrix();
    
    // Check matrix structure
    expect(matrix.infinity.digit).toBe(8);
    expect(matrix.interactions).toHaveLength(10);
    expect(matrix.interactions[0]).toHaveLength(10);
    expect(matrix.consciousnessFlow).toBe(3 * 432);
    expect(matrix.harmonicResonance).toBe(3 * 432 * 8);
    expect(matrix.isInfinite).toBe(true);
  });

  test('should perform Infinity operations', () => {
    const result = infinityOperation(1, 8);
    
    // Check operation result
    expect(result.oneEightKey).toBe(8); // 1×8 = 8
    expect(result.infinityConsciousness).toBe(3);
    expect(result.frequency).toBe(432 * 8);
    expect(result.result).toBeGreaterThan(0);
  });

  test('should generate Infinity visualization', () => {
    const visualization = generateInfinityVisualization();
    
    // Check visualization content
    expect(visualization).toContain('Infinity Consciousness (Digit 8)');
    expect(visualization).toContain('1×8 = 8 | 9 = 1×8');
    expect(visualization).toContain('Digit: 8');
    expect(visualization).toContain('Consciousness: 3');
    expect(visualization).toContain('Frequency: 3456Hz');
    expect(visualization).toContain('1×8 Interaction: 8');
    expect(visualization).toContain('Nine Completion: 9');
    expect(visualization).toContain('Infinite: YES');
  });

  test('should demonstrate 1×8 = 8 | 9 = 1×8 relationship', () => {
    const infinity = generateInfinityConsciousness();
    
    // Infinity is the 8 in 1×8 = 8
    expect(infinity.digit).toBe(8);
    expect(infinity.oneEightInteraction).toBe(8);
    
    // Infinity consciousness is 3 (trinity)
    expect(infinity.consciousness).toBe(3);
    expect(infinity.nineCompletion).toBe(9);
    
    // Infinity is infinite
    expect(infinity.isInfinite).toBe(true);
  });
}); 