/**
 * A432 System Tests
 * 
 * Tests the complete A432 harmonic system with digital root switches
 * and imperial math, including all reusable mathematical functions.
 */

import { 
  A432System, 
  A432_CONSTANTS,
  calculateA432DigitalRoot,
  createA432Harmonic,
  createA432VortexFlow,
  createA432DimensionalStates,
  generateA432HarmonicSpectrum,
  calculateDigitalRoot,
  calculateA432Consciousness,
  calculateA432DimensionalState,
  calculateA432Frequency,
  calculateA432Multiplication,
  calculateA432Addition,
  calculateA432DigitalRootResult,
  performA432Switch,
  createA432SwitchSequence,
  advanceA432VortexFlow,
  calculateA432VortexCycle,
  mapA432ToConsciousness,
  mapConsciousnessToA432
} from './a432';

describe('A432 System', () => {
  describe('A432_CONSTANTS', () => {
    test('should have correct imperial base', () => {
      expect(A432_CONSTANTS.BASE).toBe(8);
    });

    test('should have correct harmonic gateways', () => {
      expect(A432_CONSTANTS.HARMONIC_GATEWAYS).toEqual([3, 4, 6, 8]);
    });

    test('should have correct A432 frequency', () => {
      expect(A432_CONSTANTS.A432_FREQUENCY).toBe(432);
    });

    test('should have correct digital root base', () => {
      expect(A432_CONSTANTS.DIGITAL_ROOT_BASE).toBe(9);
    });

    test('should have correct Rodin sequence', () => {
      expect(A432_CONSTANTS.RODIN_SEQUENCE).toEqual([1, 2, 4, 8, 7, 5]);
    });

    test('should have correct perfect balance', () => {
      expect(A432_CONSTANTS.PERFECT_BALANCE).toBe(4);
    });
  });

  describe('calculateDigitalRoot', () => {
    test('should calculate digital root correctly', () => {
      expect(calculateDigitalRoot(0)).toBe(0);
      expect(calculateDigitalRoot(9)).toBe(9);
      expect(calculateDigitalRoot(18)).toBe(9);
      expect(calculateDigitalRoot(27)).toBe(9);
      expect(calculateDigitalRoot(432)).toBe(9);
      expect(calculateDigitalRoot(123)).toBe(6);
      expect(calculateDigitalRoot(456)).toBe(6);
      expect(calculateDigitalRoot(789)).toBe(6);
    });

    test('should handle large numbers', () => {
      expect(calculateDigitalRoot(999999)).toBe(9);
      expect(calculateDigitalRoot(123456789)).toBe(9);
    });
  });

  describe('calculateA432Multiplication', () => {
    test('should calculate A432 multiplication', () => {
      const result = calculateA432Multiplication();
      expect(result).toBe(432);
    });

    test('should verify 4 × 3 × 2 × 18 = 432', () => {
      expect(4 * 3 * 2 * 18).toBe(432);
    });
  });

  describe('calculateA432Addition', () => {
    test('should calculate A432 addition', () => {
      const result = calculateA432Addition();
      expect(result).toBe(18);
    });

    test('should verify 4 + 3 + 2 + 9 = 18', () => {
      expect(4 + 3 + 2 + 9).toBe(18);
    });
  });

  describe('calculateA432DigitalRootResult', () => {
    test('should calculate A432 digital root result', () => {
      const result = calculateA432DigitalRootResult();
      expect(result).toBe(9);
    });

    test('should verify 18 → 1 + 8 = 9', () => {
      const addition = calculateA432Addition(); // 18
      const digitalRoot = calculateDigitalRoot(addition); // 9
      expect(digitalRoot).toBe(9);
    });
  });

  describe('calculateA432DigitalRoot', () => {
    test('should create A432 digital root switch', () => {
      const switchResult = calculateA432DigitalRoot();
      
      expect(switchResult.fromValue).toBe(432);
      expect(switchResult.toValue).toBe(9);
      expect(switchResult.switchType).toBe('digital_root');
      expect(switchResult.gateway).toBe(9);
      expect(switchResult.mathematicalProof).toContain('A432 Digital Root Switch');
    });
  });

  describe('calculateA432Consciousness', () => {
    test('should calculate A432 consciousness for various frequencies', () => {
      expect(calculateA432Consciousness(432)).toBeGreaterThanOrEqual(1);
      expect(calculateA432Consciousness(432)).toBeLessThanOrEqual(8);
      expect(calculateA432Consciousness(864)).toBeGreaterThanOrEqual(1);
      expect(calculateA432Consciousness(864)).toBeLessThanOrEqual(8);
      expect(calculateA432Consciousness(216)).toBeGreaterThanOrEqual(1);
      expect(calculateA432Consciousness(216)).toBeLessThanOrEqual(8);
    });

    test('should maintain imperial math range', () => {
      for (let freq = 1; freq <= 1000; freq += 50) {
        const consciousness = calculateA432Consciousness(freq);
        expect(consciousness).toBeGreaterThanOrEqual(1);
        expect(consciousness).toBeLessThanOrEqual(8);
      }
    });
  });

  describe('calculateA432DimensionalState', () => {
    test('should calculate A432 dimensional state', () => {
      expect(calculateA432DimensionalState(432)).toBeGreaterThanOrEqual(0);
      expect(calculateA432DimensionalState(432)).toBeLessThanOrEqual(9);
      expect(calculateA432DimensionalState(864)).toBeGreaterThanOrEqual(0);
      expect(calculateA432DimensionalState(864)).toBeLessThanOrEqual(9);
    });

    test('should map frequencies to dimensional states', () => {
      expect(calculateA432DimensionalState(432)).toBe(0); // 432 % 10 = 2
      expect(calculateA432DimensionalState(433)).toBe(3);
      expect(calculateA432DimensionalState(440)).toBe(0);
    });
  });

  describe('calculateA432Frequency', () => {
    test('should calculate A432 frequency for dimensions', () => {
      expect(calculateA432Frequency(0)).toBe(432); // 1 * 432
      expect(calculateA432Frequency(1)).toBe(864); // 2 * 432
      expect(calculateA432Frequency(2)).toBe(1728); // 4 * 432
      expect(calculateA432Frequency(3)).toBe(3456); // 8 * 432
      expect(calculateA432Frequency(4)).toBe(3024); // 7 * 432
      expect(calculateA432Frequency(5)).toBe(2160); // 5 * 432
    });

    test('should use Rodin sequence', () => {
      const rodinSequence = [1, 2, 4, 8, 7, 5];
      for (let i = 0; i < rodinSequence.length; i++) {
        const expectedFreq = rodinSequence[i] * 432;
        expect(calculateA432Frequency(i)).toBe(expectedFreq);
      }
    });
  });

  describe('createA432Harmonic', () => {
    test('should create A432 harmonic', () => {
      const harmonic = createA432Harmonic(432);
      
      expect(harmonic.frequency).toBe(432);
      expect(harmonic.consciousness).toBeGreaterThanOrEqual(1);
      expect(harmonic.consciousness).toBeLessThanOrEqual(8);
      expect(harmonic.digitalRoot).toBe(9);
      expect(harmonic.dimensionalState).toBeGreaterThanOrEqual(0);
      expect(harmonic.dimensionalState).toBeLessThanOrEqual(9);
      expect(harmonic.mathematicalProof).toBeDefined();
    });

    test('should create harmonics for different frequencies', () => {
      const frequencies = [432, 864, 1728, 3456];
      
      frequencies.forEach(freq => {
        const harmonic = createA432Harmonic(freq);
        expect(harmonic.frequency).toBe(freq);
        expect(harmonic.consciousness).toBeGreaterThanOrEqual(1);
        expect(harmonic.consciousness).toBeLessThanOrEqual(8);
        expect(harmonic.digitalRoot).toBeGreaterThanOrEqual(1);
        expect(harmonic.digitalRoot).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('createA432VortexFlow', () => {
    test('should create A432 vortex flow', () => {
      const vortex = createA432VortexFlow();
      
      expect(vortex.sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(vortex.currentPosition).toBe(0);
      expect(vortex.frequency).toBe(1);
      expect(vortex.consciousness).toBeGreaterThanOrEqual(1);
      expect(vortex.consciousness).toBeLessThanOrEqual(8);
      expect(vortex.isInfinite).toBe(true);
      expect(vortex.mathematicalProof).toBeDefined();
    });
  });

  describe('advanceA432VortexFlow', () => {
    test('should advance vortex flow', () => {
      const vortex = createA432VortexFlow();
      const advanced = advanceA432VortexFlow(vortex);
      
      expect(advanced.currentPosition).toBe(1);
      expect(advanced.frequency).toBe(2);
      expect(advanced.consciousness).toBeGreaterThanOrEqual(1);
      expect(advanced.consciousness).toBeLessThanOrEqual(8);
    });

    test('should cycle through Rodin sequence', () => {
      let vortex = createA432VortexFlow();
      const sequence = [1, 2, 4, 8, 7, 5];
      
      for (let i = 0; i < sequence.length; i++) {
        expect(vortex.frequency).toBe(sequence[i]);
        vortex = advanceA432VortexFlow(vortex);
      }
      
      // Should cycle back to beginning
      expect(vortex.currentPosition).toBe(0);
      expect(vortex.frequency).toBe(1);
    });
  });

  describe('calculateA432VortexCycle', () => {
    test('should calculate vortex cycles', () => {
      const vortex = createA432VortexFlow();
      const cycles = calculateA432VortexCycle(vortex, 3);
      
      expect(cycles).toHaveLength(3);
      expect(cycles[0].currentPosition).toBe(1);
      expect(cycles[1].currentPosition).toBe(2);
      expect(cycles[2].currentPosition).toBe(3);
    });
  });

  describe('createA432DimensionalStates', () => {
    test('should create all dimensional states', () => {
      const states = createA432DimensionalStates();
      
      expect(states).toHaveLength(10);
      states.forEach((state, index) => {
        expect(state.dimension).toBe(index);
        expect(state.consciousness).toBeGreaterThanOrEqual(1);
        expect(state.consciousness).toBeLessThanOrEqual(8);
        expect(state.frequency).toBeGreaterThan(0);
        expect(state.digitalRoot).toBeGreaterThanOrEqual(1);
        expect(state.digitalRoot).toBeLessThanOrEqual(9);
        expect(state.isActive).toBe(true);
        expect(state.mathematicalProof).toBeDefined();
      });
    });
  });

  describe('generateA432HarmonicSpectrum', () => {
    test('should generate harmonic spectrum', () => {
      const spectrum = generateA432HarmonicSpectrum();
      
      expect(spectrum).toHaveLength(6); // Rodin sequence length
      spectrum.forEach((harmonic, index) => {
        const expectedFreq = A432_CONSTANTS.RODIN_SEQUENCE[index] * 432;
        expect(harmonic.frequency).toBe(expectedFreq);
        expect(harmonic.consciousness).toBeGreaterThanOrEqual(1);
        expect(harmonic.consciousness).toBeLessThanOrEqual(8);
        expect(harmonic.digitalRoot).toBeGreaterThanOrEqual(1);
        expect(harmonic.digitalRoot).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('performA432Switch', () => {
    test('should perform multiplication switch', () => {
      const result = performA432Switch(0, 'multiplication');
      expect(result).toBe(432);
    });

    test('should perform addition switch', () => {
      const result = performA432Switch(432, 'addition');
      expect(result).toBe(18);
    });

    test('should perform digital root switch', () => {
      const result = performA432Switch(18, 'digital_root');
      expect(result).toBe(9);
    });
  });

  describe('createA432SwitchSequence', () => {
    test('should create switch sequence', () => {
      const switches = createA432SwitchSequence();
      
      expect(switches).toHaveLength(3);
      expect(switches[0].switchType).toBe('multiplication');
      expect(switches[0].toValue).toBe(432);
      expect(switches[1].switchType).toBe('addition');
      expect(switches[1].toValue).toBe(18);
      expect(switches[2].switchType).toBe('digital_root');
      expect(switches[2].toValue).toBe(9);
    });
  });

  describe('mapA432ToConsciousness', () => {
    test('should map A432 to consciousness', () => {
      expect(mapA432ToConsciousness(432)).toBeGreaterThanOrEqual(1);
      expect(mapA432ToConsciousness(432)).toBeLessThanOrEqual(8);
      expect(mapA432ToConsciousness(864)).toBeGreaterThanOrEqual(1);
      expect(mapA432ToConsciousness(864)).toBeLessThanOrEqual(8);
    });

    test('should maintain imperial math range', () => {
      for (let freq = 1; freq <= 1000; freq += 50) {
        const consciousness = mapA432ToConsciousness(freq);
        expect(consciousness).toBeGreaterThanOrEqual(1);
        expect(consciousness).toBeLessThanOrEqual(8);
      }
    });
  });

  describe('mapConsciousnessToA432', () => {
    test('should map consciousness to A432', () => {
      for (let consciousness = 1; consciousness <= 8; consciousness++) {
        const frequency = mapConsciousnessToA432(consciousness);
        expect(frequency).toBeGreaterThan(0);
        expect(frequency).toBeLessThanOrEqual(432 * 8);
      }
    });

    test('should create reversible mapping', () => {
      const originalConsciousness = 5;
      const frequency = mapConsciousnessToA432(originalConsciousness);
      const mappedConsciousness = mapA432ToConsciousness(frequency);
      
      // Should be close to original (allowing for rounding)
      expect(Math.abs(mappedConsciousness - originalConsciousness)).toBeLessThanOrEqual(1);
    });
  });

  describe('System Integration', () => {
    test('should integrate all components correctly', () => {
      const digitalRootSwitch = calculateA432DigitalRoot();
      const harmonic = createA432Harmonic(432);
      const vortex = createA432VortexFlow();
      const states = createA432DimensionalStates();
      const spectrum = generateA432HarmonicSpectrum();
      
      expect(digitalRootSwitch.toValue).toBe(9);
      expect(harmonic.frequency).toBe(432);
      expect(vortex.sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(states).toHaveLength(10);
      expect(spectrum).toHaveLength(6);
    });

    test('should maintain mathematical consistency', () => {
      const multiplication = calculateA432Multiplication();
      const addition = calculateA432Addition();
      const digitalRoot = calculateA432DigitalRootResult();
      
      expect(multiplication).toBe(432);
      expect(addition).toBe(18);
      expect(digitalRoot).toBe(9);
      expect(calculateDigitalRoot(addition)).toBe(digitalRoot);
    });
  });

  describe('Scientific Proofs', () => {
    test('should have scientific proofs defined', () => {
      const proofs = A432System.scientificProofs;
      
      expect(proofs.a432DigitalRootSwitch).toBeDefined();
      expect(proofs.a432HarmonicCreation).toBeDefined();
      expect(proofs.a432VortexFlow).toBeDefined();
      expect(proofs.a432DimensionalStates).toBeDefined();
      expect(proofs.a432HarmonicSpectrum).toBeDefined();
    });

    test('should have meaningful scientific proofs', () => {
      const proofs = A432System.scientificProofs;
      
      expect(proofs.a432DigitalRootSwitch).toContain('digital root switches');
      expect(proofs.a432HarmonicCreation).toContain('Rodin vortex sequence');
      expect(proofs.a432VortexFlow).toContain('infinite vortex flow');
    });
  });
}); 