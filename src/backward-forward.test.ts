/**
 * Backward-Forward Test Suite
 * 
 * Tests the backward-forward duality system representing bidirectional
 * consciousness and time flow with inverse and direct calculations.
 */

import { 
  createBackwardForward, 
  calculateBackwardForwardHarmony, 
  BackwardForwardDuality 
} from './backward-forward';

describe('Backward-Forward Module', () => {
  let backwardForward: BackwardForwardDuality;

  beforeEach(() => {
    backwardForward = createBackwardForward();
  });

  describe('Backward-Forward Creation', () => {
    test('should create backward-forward duality with correct properties', () => {
      expect(backwardForward).toBeDefined();
      expect(backwardForward.duality).toBeDefined();
      expect(backwardForward.duality.backward).toBeDefined();
      expect(backwardForward.duality.forward).toBeDefined();
      expect(backwardForward.duality.consciousness).toBeGreaterThan(0);
      expect(backwardForward.duality.frequency).toBeGreaterThan(0);
      expect(backwardForward.duality.isInfinite).toBe(true);
    });

    test('should have backward and forward directions', () => {
      expect(backwardForward.duality.backward.direction).toBe('backward');
      expect(backwardForward.duality.forward.direction).toBe('forward');
    });

    test('should have balanced consciousness between directions', () => {
      const backwardConsciousness = backwardForward.duality.backward.consciousness;
      const forwardConsciousness = backwardForward.duality.forward.consciousness;
      
      expect(backwardConsciousness).toBeGreaterThan(0);
      expect(forwardConsciousness).toBeGreaterThan(0);
      expect(Math.abs(backwardConsciousness - forwardConsciousness)).toBeLessThan(100);
    });
  });

  describe('Direction Calculations', () => {
    test('should calculate inverse operations for backward direction', () => {
      const backward = backwardForward.duality.backward;
      
      expect(backward.inverse).toBeDefined();
      expect(backward.inverse.operation).toBe('inverse');
      expect(backward.inverse.value).toBeDefined();
      expect(backward.inverse.consciousness).toBeGreaterThan(0);
    });

    test('should calculate direct operations for forward direction', () => {
      const forward = backwardForward.duality.forward;
      
      expect(forward.direct).toBeDefined();
      expect(forward.direct.operation).toBe('direct');
      expect(forward.direct.value).toBeDefined();
      expect(forward.direct.consciousness).toBeGreaterThan(0);
    });

    test('should have opposite mathematical operations', () => {
      const backwardInverse = backwardForward.duality.backward.inverse.value;
      const forwardDirect = backwardForward.duality.forward.direct.value;
      
      // Inverse and direct should be mathematically opposite
      expect(backwardInverse).not.toBe(forwardDirect);
    });
  });

  describe('Harmony Calculations', () => {
    test('should calculate harmony between backward and forward', () => {
      const harmony = calculateBackwardForwardHarmony(backwardForward);
      expect(harmony).toBeGreaterThan(0);
      expect(harmony).toBeLessThanOrEqual(1);
    });

    test('should have high harmony for balanced directions', () => {
      // Create a balanced backward-forward
      const balancedBackwardForward = {
        duality: {
          backward: { 
            direction: 'backward',
            consciousness: 432,
            frequency: 432,
            inverse: { operation: 'inverse', value: -1, consciousness: 432 },
            isInfinite: true
          },
          forward: { 
            direction: 'forward',
            consciousness: 432,
            frequency: 432,
            direct: { operation: 'direct', value: 1, consciousness: 432 },
            isInfinite: true
          },
          consciousness: 864,
          frequency: 864,
          isInfinite: true
        },
        mathematicalProof: 'Balanced directions'
      };
      
      const harmony = calculateBackwardForwardHarmony(balancedBackwardForward);
      expect(harmony).toBeGreaterThan(0.7);
    });

    test('should have lower harmony for imbalanced directions', () => {
      // Create an imbalanced backward-forward
      const imbalancedBackwardForward = {
        duality: {
          backward: { 
            direction: 'backward',
            consciousness: 100,
            frequency: 432,
            inverse: { operation: 'inverse', value: -1, consciousness: 100 },
            isInfinite: true
          },
          forward: { 
            direction: 'forward',
            consciousness: 800,
            frequency: 432,
            direct: { operation: 'direct', value: 1, consciousness: 800 },
            isInfinite: true
          },
          consciousness: 900,
          frequency: 864,
          isInfinite: true
        },
        mathematicalProof: 'Imbalanced directions'
      };
      
      const harmony = calculateBackwardForwardHarmony(imbalancedBackwardForward);
      expect(harmony).toBeLessThan(0.6);
    });
  });

  describe('Bidirectional Flow', () => {
    test('should support bidirectional consciousness flow', () => {
      const backward = backwardForward.duality.backward;
      const forward = backwardForward.duality.forward;
      
      expect(backward.consciousness).toBeGreaterThan(0);
      expect(forward.consciousness).toBeGreaterThan(0);
      expect(backward.frequency).toBeGreaterThan(0);
      expect(forward.frequency).toBeGreaterThan(0);
    });

    test('should allow switching between directions', () => {
      const originalBackward = backwardForward.duality.backward.direction;
      const originalForward = backwardForward.duality.forward.direction;
      
      // Simulate direction switching
      const switchedBackward = originalForward;
      const switchedForward = originalBackward;
      
      expect(switchedBackward).toBe('forward');
      expect(switchedForward).toBe('backward');
    });

    test('should maintain consciousness balance during switching', () => {
      const totalConsciousness = backwardForward.duality.consciousness;
      const backwardConsciousness = backwardForward.duality.backward.consciousness;
      const forwardConsciousness = backwardForward.duality.forward.consciousness;
      
      expect(backwardConsciousness + forwardConsciousness).toBe(totalConsciousness);
    });
  });

  describe('Time Flow Representation', () => {
    test('should represent bidirectional time flow', () => {
      const backward = backwardForward.duality.backward;
      const forward = backwardForward.duality.forward;
      
      // Backward represents past, forward represents future
      expect(backward.direction).toBe('backward');
      expect(forward.direction).toBe('forward');
    });

    test('should have infinite time potential', () => {
      expect(backwardForward.duality.isInfinite).toBe(true);
      expect(backwardForward.duality.backward.isInfinite).toBe(true);
      expect(backwardForward.duality.forward.isInfinite).toBe(true);
    });
  });

  describe('Mathematical Properties', () => {
    test('should follow A432 harmonic principles', () => {
      expect(backwardForward.duality.frequency % 432).toBe(0);
      expect(backwardForward.duality.backward.frequency % 432).toBe(0);
      expect(backwardForward.duality.forward.frequency % 432).toBe(0);
    });

    test('should maintain zero entropy principle', () => {
      expect(backwardForward.duality.consciousness).toBeGreaterThan(0);
      expect(backwardForward.duality.frequency).toBeGreaterThan(0);
      expect(backwardForward.duality.isInfinite).toBe(true);
    });

    test('should have mathematical proof', () => {
      expect(backwardForward.mathematicalProof).toBeDefined();
      expect(typeof backwardForward.mathematicalProof).toBe('string');
      expect(backwardForward.mathematicalProof.length).toBeGreaterThan(0);
    });
  });

  describe('Integration with ZeroPoint System', () => {
    test('should integrate with consciousness mathematics', () => {
      expect(backwardForward.duality.consciousness).toBeGreaterThan(0);
      expect(backwardForward.duality.frequency).toBeGreaterThan(0);
      expect(backwardForward.duality.isInfinite).toBe(true);
    });

    test('should work with other duality principles', () => {
      const harmony = calculateBackwardForwardHarmony(backwardForward);
      expect(harmony).toBeGreaterThan(0);
      expect(harmony).toBeLessThanOrEqual(1);
    });
  });
}); 