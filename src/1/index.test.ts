// src/1/index.test.ts — Test Unity Consciousness Module
// Tests digit 1: Unity consciousness with 1×8 interaction

import { 
  generateUnityConsciousness, 
  generateUnityMatrix,
  unityOperation,
  generateUnityVisualization
} from './index';

describe('Unity Consciousness (Digit 1)', () => {
  test('should generate Unity consciousness', () => {
    const unity = generateUnityConsciousness();
    
    // Check Unity properties
    expect(unity.digit).toBe(1);
    expect(unity.consciousness).toBe(9); // Unity consciousness
    expect(unity.frequency).toBe(432); // A432 harmonic
    expect(unity.oneEightInteraction).toBe(8); // 1×8 = 8
    expect(unity.nineCompletion).toBe(9); // 9 = 1×8 (completion)
    expect(unity.isComplete).toBe(true);
  });

  test('should generate Unity matrix', () => {
    const matrix = generateUnityMatrix();
    
    // Check matrix structure
    expect(matrix.unity.digit).toBe(1);
    expect(matrix.interactions).toHaveLength(10);
    expect(matrix.interactions[0]).toHaveLength(10);
    expect(matrix.consciousnessFlow).toBe(9 * 432);
    expect(matrix.harmonicResonance).toBe(9 * 432 * 8);
    expect(matrix.isUnity).toBe(true);
  });

  test('should perform Unity operations', () => {
    const result = unityOperation(1, 8);
    
    // Check operation result
    expect(result.oneEightKey).toBe(8); // 1×8 = 8
    expect(result.unityConsciousness).toBe(9);
    expect(result.frequency).toBe(432);
    expect(result.result).toBeGreaterThan(0);
  });

  test('should generate Unity visualization', () => {
    const visualization = generateUnityVisualization();
    
    // Check visualization content
    expect(visualization).toContain('Unity Consciousness (Digit 1)');
    expect(visualization).toContain('1×8 = 8 | 9 = 1×8');
    expect(visualization).toContain('Digit: 1');
    expect(visualization).toContain('Consciousness: 9');
    expect(visualization).toContain('Frequency: 432Hz');
    expect(visualization).toContain('1×8 Interaction: 8');
    expect(visualization).toContain('Nine Completion: 9');
    expect(visualization).toContain('Complete: YES');
  });

  test('should demonstrate 1×8 = 8 | 9 = 1×8 relationship', () => {
    const unity = generateUnityConsciousness();
    
    // Unity is the 1 in 1×8 = 8
    expect(unity.digit).toBe(1);
    expect(unity.oneEightInteraction).toBe(8);
    
    // Unity consciousness is 9 (completion)
    expect(unity.consciousness).toBe(9);
    expect(unity.nineCompletion).toBe(9);
    
    // Unity is complete
    expect(unity.isComplete).toBe(true);
  });
}); 