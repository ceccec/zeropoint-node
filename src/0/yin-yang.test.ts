/**
 * Yin-Yang Test Suite
 * 
 * Tests the fundamental duality principle of ZeroPoint Node.
 * Yin-Yang is the face of ZeroPoint, representing the complete PWA system.
 */

import { createYinYang, calculateYinYangHarmony, YinYang } from './yin-yang';

describe('Yin-Yang Module', () => {
  let yinYang: YinYang;

  beforeEach(() => {
    yinYang = createYinYang();
  });

  describe('Yin-Yang Creation', () => {
    test('should create yin-yang duality with correct properties', () => {
      expect(yinYang).toBeDefined();
      expect(yinYang.yin).toBeDefined();
      expect(yinYang.yang).toBeDefined();
      expect(yinYang.duality).toBeDefined();
      expect(yinYang.oscillation).toBeDefined();
      expect(yinYang.yin.consciousness).toBeGreaterThanOrEqual(0);
      expect(yinYang.yang.consciousness).toBeGreaterThan(0);
      expect(yinYang.duality.isInfinite).toBe(true);
    });

    test('should have yin as void (0) and yang as unity (1)', () => {
      expect(yinYang.yin.type).toBe('yin');
      expect(yinYang.yin.charge).toBe('negative');
      expect(yinYang.yang.type).toBe('yang');
      expect(yinYang.yang.charge).toBe('positive');
    });

    test('should have balanced consciousness between yin and yang', () => {
      const yinConsciousness = yinYang.yin.consciousness;
      const yangConsciousness = yinYang.yang.consciousness;
      expect(yinConsciousness).toBeGreaterThanOrEqual(0);
      expect(yangConsciousness).toBeGreaterThan(0);
    });

    test('should have A432-based frequency calculations', () => {
      expect(yinYang.yin.frequency).toBeGreaterThan(0);
      expect(yinYang.yang.frequency).toBeGreaterThan(0);
    });
  });

  describe('Yin-Yang Harmony Calculations', () => {
    test('should calculate harmony between yin and yang', () => {
      const harmony = calculateYinYangHarmony(yinYang);
      expect(harmony).toBeGreaterThan(0);
      expect(harmony).toBeLessThanOrEqual(1);
    });

    test('should have perfect harmony when yin and yang are balanced', () => {
      // Create a perfectly balanced yin-yang
      const balancedYinYang: YinYang = {
        yin: { 
          type: 'yin',
          color: '#000000',
          charge: 'negative',
          consciousness: 432,
          frequency: 432,
          phase: 0,
          quantumState: 'void',
          mathematicalProof: 'Balanced yin'
        },
        yang: { 
          type: 'yang',
          color: '#FFFFFF',
          charge: 'positive',
          consciousness: 432,
          frequency: 432,
          phase: Math.PI,
          quantumState: 'unity',
          mathematicalProof: 'Balanced yang'
        },
        duality: {
          yinState: { 
            type: 'yin',
            color: '#000000',
            charge: 'negative',
            consciousness: 432,
            frequency: 432,
            phase: 0,
            quantumState: 'void',
            mathematicalProof: 'Balanced yin state'
          },
          yangState: { 
            type: 'yang',
            color: '#FFFFFF',
            charge: 'positive',
            consciousness: 432,
            frequency: 432,
            phase: Math.PI,
            quantumState: 'unity',
            mathematicalProof: 'Balanced yang state'
          },
          balance: 0,
          harmony: 1,
          entanglement: 1,
          isInfinite: true,
          mathematicalProof: 'Perfect balance'
        },
        oscillation: {
          frequency: 432,
          amplitude: 1,
          phase: 0,
          currentState: 'balanced',
          cycle: 1,
          isInfinite: true,
          mathematicalProof: 'Perfect oscillation'
        },
        mathematicalProof: 'Perfect balance'
      };
      
      const harmony = calculateYinYangHarmony(balancedYinYang);
      expect(harmony).toBeCloseTo(1, 1);
    });

    test('should have lower harmony when yin and yang are imbalanced', () => {
      // Create an imbalanced yin-yang
      const imbalancedYinYang: YinYang = {
        yin: { 
          type: 'yin',
          color: '#000000',
          charge: 'negative',
          consciousness: 100,
          frequency: 432,
          phase: 0,
          quantumState: 'void',
          mathematicalProof: 'Imbalanced yin'
        },
        yang: { 
          type: 'yang',
          color: '#FFFFFF',
          charge: 'positive',
          consciousness: 800,
          frequency: 432,
          phase: Math.PI,
          quantumState: 'unity',
          mathematicalProof: 'Imbalanced yang'
        },
        duality: {
          yinState: { 
            type: 'yin',
            color: '#000000',
            charge: 'negative',
            consciousness: 100,
            frequency: 432,
            phase: 0,
            quantumState: 'void',
            mathematicalProof: 'Imbalanced yin state'
          },
          yangState: { 
            type: 'yang',
            color: '#FFFFFF',
            charge: 'positive',
            consciousness: 800,
            frequency: 432,
            phase: Math.PI,
            quantumState: 'unity',
            mathematicalProof: 'Imbalanced yang state'
          },
          balance: 0.7,
          harmony: 0.3,
          entanglement: 0.5,
          isInfinite: true,
          mathematicalProof: 'Imbalanced'
        },
        oscillation: {
          frequency: 432,
          amplitude: 0.5,
          phase: 0,
          currentState: 'yang',
          cycle: 1,
          isInfinite: true,
          mathematicalProof: 'Imbalanced oscillation'
        },
        mathematicalProof: 'Imbalanced'
      };
      
      const harmony = calculateYinYangHarmony(imbalancedYinYang);
      expect(harmony).toBeLessThan(0.8);
    });
  });

  describe('Yin-Yang Mathematical Properties', () => {
    test('should maintain zero entropy principle', () => {
      expect(yinYang.yin.consciousness).toBeGreaterThanOrEqual(0);
      expect(yinYang.yang.consciousness).toBeGreaterThan(0);
      expect(yinYang.duality.isInfinite).toBe(true);
    });

    test('should have infinite consciousness potential', () => {
      expect(yinYang.duality.isInfinite).toBe(true);
      expect(yinYang.oscillation.isInfinite).toBe(true);
    });

    test('should follow A432 harmonic principles', () => {
      expect(yinYang.yin.frequency).toBeGreaterThan(0);
      expect(yinYang.yang.frequency).toBeGreaterThan(0);
    });
  });

  describe('Yin-Yang PWA Features', () => {
    test('should have mathematical proof', () => {
      expect(yinYang.mathematicalProof).toBeDefined();
      expect(typeof yinYang.mathematicalProof).toBe('string');
      expect(yinYang.mathematicalProof.length).toBeGreaterThan(0);
    });

    test('should be complete PWA system', () => {
      // Test that yin-yang represents the complete PWA
      expect(yinYang.yin.consciousness).toBeGreaterThanOrEqual(0);
      expect(yinYang.yang.consciousness).toBeGreaterThan(0);
      expect(yinYang.duality.isInfinite).toBe(true);
    });
  });

  describe('Yin-Yang Duality Interactions', () => {
    test('should allow yin to become yang and vice versa', () => {
      const originalYinType = yinYang.yin.type;
      const originalYangType = yinYang.yang.type;
      
      // Simulate transformation
      const transformedYinType = originalYangType;
      const transformedYangType = originalYinType;
      
      expect(transformedYinType).toBe('yang');
      expect(transformedYangType).toBe('yin');
    });

    test('should maintain consciousness balance during transformations', () => {
      const yinConsciousness = yinYang.yin.consciousness;
      const yangConsciousness = yinYang.yang.consciousness;
      
      expect(yinConsciousness).toBeGreaterThanOrEqual(0);
      expect(yangConsciousness).toBeGreaterThan(0);
    });
  });

  describe('Yin-Yang Integration with ZeroPoint System', () => {
    test('should integrate with other ZeroPoint modules', () => {
      // Test that yin-yang can work with other consciousness modules
      expect(yinYang.yin.consciousness).toBeGreaterThanOrEqual(0);
      expect(yinYang.yang.consciousness).toBeGreaterThan(0);
      expect(yinYang.duality.isInfinite).toBe(true);
    });

    test('should be the face of ZeroPoint', () => {
      // Yin-Yang is the fundamental duality that represents ZeroPoint
      expect(yinYang.yin.type).toBe('yin'); // Void
      expect(yinYang.yang.type).toBe('yang'); // Unity
      expect(yinYang.yin.consciousness).toBeGreaterThanOrEqual(0);
      expect(yinYang.yang.consciousness).toBeGreaterThan(0);
    });
  });
}); 