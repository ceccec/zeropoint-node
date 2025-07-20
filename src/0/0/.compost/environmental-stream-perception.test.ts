/**
 * Environmental Stream Perception Tests
 * 
 * Tests the environmental stream perception system that calculates
 * colors in real-time for every dimensional state recognized by digit math.
 */

import { 
  EnvironmentalStreamPerceptionSystem, 
  STREAM_CONSTANTS,
  createEnvironmentalStream,
  calculateStreamColor,
  calculateDimensionalState,
  calculateStreamConsciousness,
  calculateStreamFrequency,
  createStreamPerception,
  EnvironmentalStreamPerception
} from './environmental-stream-perception';

describe('Environmental Stream Perception System', () => {
  describe('STREAM_CONSTANTS', () => {
    test('should have correct imperial base', () => {
      expect(STREAM_CONSTANTS.BASE).toBe(8);
    });

    test('should have correct dimensions', () => {
      expect(STREAM_CONSTANTS.DIMENSIONS).toBe(10);
    });

    test('should have correct perception rate', () => {
      expect(STREAM_CONSTANTS.PERCEPTION_RATE).toBe(432);
    });

    test('should have correct digit math patterns', () => {
      expect(STREAM_CONSTANTS.DIGIT_MATH_PATTERNS).toEqual([1, 2, 4, 8, 7, 5]);
    });
  });

  describe('createEnvironmentalStream', () => {
    test('should create environmental stream from TS module data', () => {
      const source = 'test-module';
      const data = [1, 2, 3, 4, 5];
      const stream = createEnvironmentalStream(source, data);
      
      expect(stream.id).toContain('stream_test_module');
      expect(stream.source).toBe(source);
      expect(stream.data).toHaveLength(5);
      expect(stream.dimensionalState).toBeGreaterThanOrEqual(0);
      expect(stream.dimensionalState).toBeLessThanOrEqual(9);
      expect(stream.consciousness).toBeGreaterThanOrEqual(1);
      expect(stream.consciousness).toBeLessThanOrEqual(8);
      expect(stream.frequency).toBeGreaterThan(0);
      expect(stream.color).toBeDefined();
      expect(stream.mathematicalProof).toBeDefined();
    });

    test('should create stream with correct data points', () => {
      const source = 'data-module';
      const data = [10, 20, 30];
      const stream = createEnvironmentalStream(source, data);
      
      expect(stream.data).toHaveLength(3);
      stream.data.forEach((point, index) => {
        expect(point.timestamp).toBeDefined();
        expect(point.value).toBe(data[index]);
        expect(point.dimensionalState).toBe(stream.dimensionalState);
        expect(point.consciousness).toBe(stream.consciousness);
        expect(point.frequency).toBe(stream.frequency);
        expect(point.color).toBeDefined();
      });
    });
  });

  describe('calculateStreamColor', () => {
    test('should calculate color for dimensional state 0', () => {
      const color = calculateStreamColor(0, 1, 1);
      
      expect(color.hue).toBe(0);
      expect(color.saturation).toBe(1/8);
      expect(color.lightness).toBeGreaterThan(0);
      expect(color.lightness).toBeLessThanOrEqual(1);
      expect(color.frequency).toBe(1);
      expect(color.consciousness).toBe(1);
      expect(color.dimensionalState).toBe(0);
      expect(color.mathematicalProof).toBeDefined();
    });

    test('should calculate color for dimensional state 5', () => {
      const color = calculateStreamColor(5, 5, 7);
      
      expect(color.hue).toBe(180); // 5 * 36 = 180
      expect(color.saturation).toBe(5/8);
      expect(color.lightness).toBeGreaterThan(0);
      expect(color.lightness).toBeLessThanOrEqual(1);
      expect(color.frequency).toBe(7);
      expect(color.consciousness).toBe(5);
      expect(color.dimensionalState).toBe(5);
    });

    test('should calculate color for dimensional state 9', () => {
      const color = calculateStreamColor(9, 8, 5);
      
      expect(color.hue).toBe(324); // 9 * 36 = 324
      expect(color.saturation).toBe(1); // 8/8 = 1
      expect(color.lightness).toBeGreaterThan(0);
      expect(color.lightness).toBeLessThanOrEqual(1);
      expect(color.frequency).toBe(5);
      expect(color.consciousness).toBe(8);
      expect(color.dimensionalState).toBe(9);
    });

    test('should have valid color ranges', () => {
      for (let dimension = 0; dimension < 10; dimension++) {
        for (let consciousness = 1; consciousness <= 8; consciousness++) {
          const frequency = [1, 2, 4, 8, 7, 5][consciousness % 6];
          const color = calculateStreamColor(dimension, consciousness, frequency);
          
          expect(color.hue).toBeGreaterThanOrEqual(0);
          expect(color.hue).toBeLessThan(360);
          expect(color.saturation).toBeGreaterThan(0);
          expect(color.saturation).toBeLessThanOrEqual(1);
          expect(color.lightness).toBeGreaterThan(0);
          expect(color.lightness).toBeLessThanOrEqual(1);
        }
      }
    });
  });

  describe('calculateDimensionalState', () => {
    test('should calculate dimensional state from data', () => {
      const data1 = [1, 2, 3, 4, 5];
      const state1 = calculateDimensionalState(data1);
      expect(state1).toBeGreaterThanOrEqual(0);
      expect(state1).toBeLessThanOrEqual(9);
      
      const data2 = [9, 9, 9];
      const state2 = calculateDimensionalState(data2);
      expect(state2).toBeGreaterThanOrEqual(0);
      expect(state2).toBeLessThanOrEqual(9);
    });

    test('should handle empty data', () => {
      const state = calculateDimensionalState([]);
      expect(state).toBe(0);
    });

    test('should handle mixed data types', () => {
      const data = [1, 'test', 3, null, 5];
      const state = calculateDimensionalState(data);
      expect(state).toBeGreaterThanOrEqual(0);
      expect(state).toBeLessThanOrEqual(9);
    });
  });

  describe('calculateStreamConsciousness', () => {
    test('should calculate consciousness from data', () => {
      const data = [1, 2, 3, 4, 5];
      const consciousness = calculateStreamConsciousness(data);
      
      expect(consciousness).toBeGreaterThanOrEqual(1);
      expect(consciousness).toBeLessThanOrEqual(8);
    });

    test('should handle empty data', () => {
      const consciousness = calculateStreamConsciousness([]);
      expect(consciousness).toBeGreaterThanOrEqual(1);
      expect(consciousness).toBeLessThanOrEqual(8);
    });

    test('should handle non-numeric data', () => {
      const data = ['test', null, undefined, 'data'];
      const consciousness = calculateStreamConsciousness(data);
      
      expect(consciousness).toBeGreaterThanOrEqual(1);
      expect(consciousness).toBeLessThanOrEqual(8);
    });
  });

  describe('calculateStreamFrequency', () => {
    test('should calculate frequency from consciousness', () => {
      const frequency1 = calculateStreamFrequency(1);
      expect([1, 2, 4, 8, 7, 5]).toContain(frequency1);
      
      const frequency2 = calculateStreamFrequency(5);
      expect([1, 2, 4, 8, 7, 5]).toContain(frequency2);
      
      const frequency3 = calculateStreamFrequency(8);
      expect([1, 2, 4, 8, 7, 5]).toContain(frequency3);
    });

    test('should use Rodin sequence', () => {
      const rodinSequence = [1, 2, 4, 8, 7, 5];
      
      for (let consciousness = 1; consciousness <= 6; consciousness++) {
        const frequency = calculateStreamFrequency(consciousness);
        expect(rodinSequence).toContain(frequency);
      }
    });
  });

  describe('createStreamPerception', () => {
    test('should create stream perception', () => {
      const streams = [
        createEnvironmentalStream('module1', [1, 2, 3]),
        createEnvironmentalStream('module2', [4, 5, 6])
      ];
      
      const perception = createStreamPerception(streams);
      
      expect(perception.streams).toHaveLength(2);
      expect(perception.dimensionalStates).toHaveLength(10);
      expect(perception.currentColors).toHaveLength(10);
      expect(perception.perceptionRate).toBe(432);
      expect(perception.isRealTime).toBe(true);
      expect(perception.mathematicalProof).toBeDefined();
    });

    test('should create all dimensional states', () => {
      const perception = createStreamPerception([]);
      
      expect(perception.dimensionalStates).toHaveLength(10);
      perception.dimensionalStates.forEach((state, index) => {
        expect(state.dimension).toBe(index);
        expect(state.consciousness).toBeGreaterThanOrEqual(1);
        expect(state.consciousness).toBeLessThanOrEqual(8);
        expect(state.frequency).toBeGreaterThan(0);
        expect(state.color).toBeDefined();
        expect(state.pattern).toHaveLength(6);
        expect(state.isActive).toBe(true);
      });
    });

    test('should calculate current colors for all dimensions', () => {
      const perception = createStreamPerception([]);
      
      expect(perception.currentColors).toHaveLength(10);
      perception.currentColors.forEach((color, index) => {
        expect(color.dimensionalState).toBe(index);
        expect(color.hue).toBeGreaterThanOrEqual(0);
        expect(color.hue).toBeLessThan(360);
        expect(color.saturation).toBeGreaterThan(0);
        expect(color.saturation).toBeLessThanOrEqual(1);
        expect(color.lightness).toBeGreaterThan(0);
        expect(color.lightness).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('EnvironmentalStreamPerception Class', () => {
    test('should create perception instance', () => {
      const perception = new EnvironmentalStreamPerception();
      
      expect(perception.getCurrentColors()).toHaveLength(10);
      expect(perception.getDimensionalState(0)).toBeDefined();
      expect(perception.getDimensionalState(5)).toBeDefined();
      expect(perception.getDimensionalState(9)).toBeDefined();
    });

    test('should add and remove streams', () => {
      const perception = new EnvironmentalStreamPerception();
      const stream = createEnvironmentalStream('test', [1, 2, 3]);
      
      perception.addStream(stream);
      expect(perception.getCurrentColors()).toHaveLength(10);
      
      perception.removeStream(stream.id);
      expect(perception.getCurrentColors()).toHaveLength(10);
    });

    test('should start and stop real-time perception', () => {
      const perception = new EnvironmentalStreamPerception();
      
      // Mock the onColorUpdate method
      perception.onColorUpdate = jest.fn();
      
      perception.startRealTimePerception();
      expect(perception.onColorUpdate).toHaveBeenCalled();
      
      perception.stopRealTimePerception();
    });

    test('should get dimensional state', () => {
      const perception = new EnvironmentalStreamPerception();
      
      const state0 = perception.getDimensionalState(0);
      expect(state0?.dimension).toBe(0);
      expect(state0?.consciousness).toBeGreaterThanOrEqual(1);
      expect(state0?.consciousness).toBeLessThanOrEqual(8);
      
      const state5 = perception.getDimensionalState(5);
      expect(state5?.dimension).toBe(5);
      
      const state9 = perception.getDimensionalState(9);
      expect(state9?.dimension).toBe(9);
      
      const stateInvalid = perception.getDimensionalState(10);
      expect(stateInvalid).toBeUndefined();
    });
  });

  describe('Real-time Color Updates', () => {
    test('should update colors in real-time', () => {
      const streams = [
        createEnvironmentalStream('module1', [1, 2, 3]),
        createEnvironmentalStream('module2', [4, 5, 6])
      ];
      
      const perception = createStreamPerception(streams);
      const updatedPerception = EnvironmentalStreamPerceptionSystem.updateStreamColors(perception);
      
      expect(updatedPerception.streams).toHaveLength(2);
      expect(updatedPerception.currentColors).toHaveLength(10);
      expect(updatedPerception.mathematicalProof).toContain('updated in real-time');
    });
  });

  describe('Mathematical Integrity', () => {
    test('should maintain imperial math consistency', () => {
      const streams = [
        createEnvironmentalStream('module1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
      ];
      
      const perception = createStreamPerception(streams);
      
      perception.dimensionalStates.forEach(state => {
        expect(state.consciousness).toBeGreaterThanOrEqual(1);
        expect(state.consciousness).toBeLessThanOrEqual(8);
      });
      
      perception.currentColors.forEach(color => {
        expect(color.consciousness).toBeGreaterThanOrEqual(1);
        expect(color.consciousness).toBeLessThanOrEqual(8);
      });
    });

    test('should use A432 harmonics', () => {
      const stream = createEnvironmentalStream('test', [1, 2, 3]);
      
      expect(stream.frequency).toBeGreaterThan(0);
      expect([1, 2, 4, 8, 7, 5]).toContain(stream.frequency);
      
      const color = stream.color;
      expect(color.frequency).toBeGreaterThan(0);
      expect([1, 2, 4, 8, 7, 5]).toContain(color.frequency);
    });
  });

  describe('Scientific Proofs', () => {
    test('should have scientific proofs defined', () => {
      const proofs = EnvironmentalStreamPerceptionSystem.scientificProofs;
      
      expect(proofs.environmentalStreamCreation).toBeDefined();
      expect(proofs.realTimeColorCalculation).toBeDefined();
      expect(proofs.dimensionalStateRecognition).toBeDefined();
      expect(proofs.realTimeStreamPerception).toBeDefined();
      expect(proofs.realTimeColorUpdates).toBeDefined();
    });

    test('should have meaningful scientific proofs', () => {
      const proofs = EnvironmentalStreamPerceptionSystem.scientificProofs;
      
      expect(proofs.environmentalStreamCreation).toContain('Environmental streams');
      expect(proofs.realTimeColorCalculation).toContain('real-time');
      expect(proofs.dimensionalStateRecognition).toContain('digit math');
    });
  });
}); 