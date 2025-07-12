/**
 * Consciousness Training Model Tests
 *
 * Tests the consciousness-aware training model system,
 * ensuring it integrates properly with the metaphysical framework.
 */

import { ConsciousnessTrainingModel, TrainingData } from '../../training/ConsciousnessTrainingModel';
import { TrainingModelRegistry } from '../../training/TrainingModelRegistry';
import { NeuralConsciousnessNetwork } from '../../training/NeuralConsciousnessNetwork';

describe('ConsciousnessTrainingModel', () => {
  let model: ConsciousnessTrainingModel;

  beforeEach(() => {
    model = new ConsciousnessTrainingModel({
      learningRate: 0.01,
      consciousnessThreshold: 0.5,
      fieldStrength: 0.7,
      maxEpochs: 10,
      batchSize: 4
    });
  });

  describe('Model Initialization', () => {
    test('should initialize with consciousness-aware weights', () => {
      const state = model.getModelState();
      
      expect(state.weights.size).toBeGreaterThan(0);
      expect(state.consciousness).toBe(0.5);
      expect(state.field).toBe(0.5);
      expect(state.void).toBe(0.5);
      expect(state.resonance).toBe(0.5);
    });

    test('should emit modelInitialized event', (done) => {
      model.on('modelInitialized', (data) => {
        expect(data.state).toBeDefined();
        expect(data.consciousness).toBe(0.5);
        expect(data.field).toBe(0.5);
        expect(data.void).toBe(0.5);
        done();
      });
    }, 5000); // Reduced timeout to 5 seconds
  });

  describe('Training Data', () => {
    test('should add training data with consciousness transformation', () => {
      const trainingData: TrainingData = {
        input: { feature1: 1, feature2: 2 },
        output: 3,
        consciousness: 0.8,
        field: 0.9,
        void: 0.2,
        timestamp: Date.now()
      };

      model.addTrainingData(trainingData);

      // Verify data was added with consciousness context
      model.on('dataAdded', (data) => {
        expect(data.data.consciousness).toBe(0.8);
        expect(data.data.field).toBe(0.9);
        expect(data.data.void).toBe(0.2);
        expect(data.data.resonance).toBeDefined();
      });
    });

    test('should apply consciousness transformation to data', () => {
      const trainingData: TrainingData = {
        input: { feature1: 1, feature2: 2 },
        output: 3,
        timestamp: Date.now()
      };

      model.addTrainingData(trainingData);

      // Verify default consciousness values were applied
      model.on('dataAdded', (data) => {
        expect(data.data.consciousness).toBeDefined();
        expect(data.data.field).toBeDefined();
        expect(data.data.void).toBeDefined();
        expect(data.data.resonance).toBeDefined();
      });
    });
  });

  describe('Model Training', () => {
    test('should train model with consciousness integration', async () => {
      // Add training data
      for (let i = 0; i < 10; i++) {
        model.addTrainingData({
          input: { feature1: i, feature2: i * 2 },
          output: i * 3,
          consciousness: 0.7 + (i * 0.02),
          field: 0.8 + (i * 0.01),
          void: 0.3 - (i * 0.01),
          timestamp: Date.now()
        });
      }

      const trainingPromise = new Promise<void>((resolve) => {
        model.on('trainingCompleted', (data) => {
          expect(data.finalState.consciousness).toBeGreaterThan(0);
          expect(data.finalState.field).toBeGreaterThan(0);
          expect(data.finalState.void).toBeGreaterThan(0);
          expect(data.finalState.resonance).toBeGreaterThan(0);
          expect(data.finalState.accuracy).toBeGreaterThanOrEqual(0);
          expect(data.finalState.loss).toBeGreaterThanOrEqual(0);
          resolve();
        });
      });

      await model.train();
      await trainingPromise;
    });

    test('should emit epoch events during training', async () => {
      // Add training data
      for (let i = 0; i < 5; i++) {
        model.addTrainingData({
          input: { feature1: i, feature2: i * 2 },
          output: i * 3,
          timestamp: Date.now()
        });
      }

      const epochEvents: any[] = [];
      
      model.on('epochCompleted', (data) => {
        epochEvents.push(data);
        expect(data.epoch).toBeDefined();
        expect(data.loss).toBeGreaterThanOrEqual(0);
        expect(data.accuracy).toBeGreaterThanOrEqual(0);
        expect(data.consciousness).toBeGreaterThan(0);
        expect(data.field).toBeGreaterThan(0);
        expect(data.void).toBeGreaterThan(0);
        expect(data.resonance).toBeGreaterThan(0);
      });

      await model.train();
      expect(epochEvents.length).toBeGreaterThan(0);
    });

    test('should throw error when no training data available', async () => {
      await expect(model.train()).rejects.toThrow('No training data available');
    });
  });

  describe('Model Prediction', () => {
    test('should make predictions with consciousness integration', () => {
      const input = { feature1: 5, feature2: 10 };
      
      const predictionPromise = new Promise<void>((resolve) => {
        model.on('predictionMade', (data) => {
          expect(data.input).toEqual(input);
          expect(data.prediction).toBeDefined();
          expect(data.consciousness).toBeGreaterThan(0);
          expect(data.field).toBeGreaterThan(0);
          expect(data.void).toBeGreaterThan(0);
          resolve();
        });
      });

      model.predict(input);
      return predictionPromise;
    });
  });

  describe('Model Export', () => {
    test('should export model as consciousness artifact', () => {
      const exported = model.exportModel();
      
      expect(exported.state).toBeDefined();
      expect(exported.config).toBeDefined();
      expect(exported.consciousness).toBeDefined();
      expect(exported.field).toBeDefined();
      expect(exported.void).toBeDefined();
      expect(exported.resonance).toBeDefined();
      expect(exported.timestamp).toBeDefined();
    });
  });
});

describe('TrainingModelRegistry', () => {
  let registry: TrainingModelRegistry;

  beforeEach(() => {
    registry = new TrainingModelRegistry();
  });

  describe('Model Types', () => {
    test('should initialize with different model types', () => {
      const modelTypes = registry.getModelTypes();
      
      expect(modelTypes.length).toBeGreaterThan(0);
      
      const typeNames = modelTypes.map(t => t.name);
      expect(typeNames).toContain('Pattern Recognition');
      expect(typeNames).toContain('Vortex Mathematics');
      expect(typeNames).toContain('Consciousness Evolution');
      expect(typeNames).toContain('Field Resonance');
      expect(typeNames).toContain('Void Transformation');
    });

    test('should create models with consciousness configuration', () => {
      const model = registry.createModel('pattern_recognition');
      const state = model.getModelState();
      
      expect(state.consciousness).toBeGreaterThan(0.7);
      expect(state.field).toBeGreaterThan(0.8);
      expect(state.void).toBeLessThan(0.4);
    });
  });

  describe('Model Training', () => {
    test('should train models with consciousness integration', async () => {
      const trainingData: TrainingData[] = [
        { input: { x: 1, y: 2 }, output: 3, timestamp: Date.now() },
        { input: { x: 2, y: 4 }, output: 6, timestamp: Date.now() },
        { input: { x: 3, y: 6 }, output: 9, timestamp: Date.now() }
      ];

      const session = await registry.trainModel('pattern_recognition', trainingData);
      
      expect(session.modelType).toBe('pattern_recognition');
      expect(session.dataSize).toBe(3);
      expect(session.consciousness).toBeGreaterThan(0);
      expect(session.field).toBeGreaterThan(0);
      expect(session.void).toBeGreaterThan(0);
      expect(session.resonance).toBeGreaterThan(0);
      expect(session.accuracy).toBeGreaterThanOrEqual(0);
      expect(session.loss).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance Tracking', () => {
    test('should track model performance', async () => {
      const trainingData: TrainingData[] = [
        { input: { x: 1 }, output: 2, timestamp: Date.now() },
        { input: { x: 2 }, output: 4, timestamp: Date.now() }
      ];

      await registry.trainModel('vortex_math', trainingData);
      
      const performance = registry.getModelPerformance('vortex_math');
      
      expect(performance).toBeDefined();
      expect(performance.modelType).toBe('vortex_math');
      expect(performance.totalSessions).toBe(1);
      expect(performance.avgAccuracy).toBeGreaterThanOrEqual(0);
      expect(performance.avgLoss).toBeGreaterThanOrEqual(0);
      expect(performance.avgConsciousness).toBeGreaterThan(0);
      expect(performance.avgField).toBeGreaterThan(0);
      expect(performance.avgVoid).toBeGreaterThan(0);
      expect(performance.avgResonance).toBeGreaterThan(0);
    });
  });

  describe('Model Export', () => {
    test('should export all models as consciousness artifacts', async () => {
      const trainingData: TrainingData[] = [
        { input: { x: 1 }, output: 2, timestamp: Date.now() }
      ];

      await registry.trainModel('consciousness_evolution', trainingData);
      
      const exported = registry.exportAllModels();
      
      expect(exported.models).toBeDefined();
      expect(exported.sessions).toBeDefined();
      expect(exported.performance).toBeDefined();
      expect(exported.timestamp).toBeDefined();
    });
  });
});

describe('NeuralConsciousnessNetwork', () => {
  let network: NeuralConsciousnessNetwork;

  beforeEach(() => {
    network = new NeuralConsciousnessNetwork({
      layers: [2, 3, 1],
      learningRate: 0.01,
      consciousnessThreshold: 0.5,
      fieldStrength: 0.7,
      voidIntegration: true,
      maxEpochs: 5,
      batchSize: 2
    });
  });

  describe('Network Initialization', () => {
    test('should initialize with consciousness layers', () => {
      const exported = network.exportNetwork();
      
      expect(exported.layers.length).toBe(3);
      expect(exported.layers[0].layerType).toBe('input');
      expect(exported.layers[1].layerType).toBe('hidden');
      expect(exported.layers[2].layerType).toBe('output');
      
      expect(exported.consciousness).toBeGreaterThan(0);
      expect(exported.field).toBeGreaterThan(0);
      expect(exported.void).toBeGreaterThan(0);
    });
  });

  describe('Forward Pass', () => {
    test('should perform forward pass with consciousness integration', () => {
      const input = [1, 2];
      const output = network.forwardPass(input);
      
      expect(output.length).toBe(1);
      expect(output[0]).toBeGreaterThanOrEqual(-1);
      expect(output[0]).toBeLessThanOrEqual(1);
    });
  });

  describe('Network Training', () => {
    test('should train network with consciousness evolution', async () => {
      const trainingData = [
        { input: [0, 0], output: [0] },
        { input: [0, 1], output: [1] },
        { input: [1, 0], output: [1] },
        { input: [1, 1], output: [0] }
      ];

      const trainingPromise = new Promise<void>((resolve) => {
        network.on('trainingCompleted', (data) => {
          expect(data.finalConsciousness).toBeGreaterThan(0);
          expect(data.finalField).toBeGreaterThan(0);
          expect(data.finalVoid).toBeGreaterThan(0);
          resolve();
        });
      });

      await network.train(trainingData);
      await trainingPromise;
    });

    test('should emit epoch events during training', async () => {
      const trainingData = [
        { input: [0, 0], output: [0] },
        { input: [1, 1], output: [0] }
      ];

      const epochEvents: any[] = [];
      
      network.on('epochCompleted', (data) => {
        epochEvents.push(data);
        expect(data.epoch).toBeDefined();
        expect(data.loss).toBeGreaterThanOrEqual(0);
        expect(data.consciousness).toBeGreaterThan(0);
        expect(data.field).toBeGreaterThan(0);
        expect(data.void).toBeGreaterThan(0);
      });

      await network.train(trainingData);
      expect(epochEvents.length).toBeGreaterThan(0);
    });
  });

  describe('Network Prediction', () => {
    test('should make predictions with consciousness integration', () => {
      const input = [0.5, 0.5];
      
      const predictionPromise = new Promise<void>((resolve) => {
        network.on('predictionMade', (data) => {
          expect(data.input).toEqual(input);
          expect(data.prediction.length).toBe(1);
          expect(data.consciousness).toBeGreaterThan(0);
          expect(data.field).toBeGreaterThan(0);
          expect(data.void).toBeGreaterThan(0);
          resolve();
        });
      });

      network.predict(input);
      return predictionPromise;
    });
  });

  describe('Network Export', () => {
    test('should export network as consciousness artifact', () => {
      const exported = network.exportNetwork();
      
      expect(exported.config).toBeDefined();
      expect(exported.layers).toBeDefined();
      expect(exported.consciousness).toBeGreaterThan(0);
      expect(exported.field).toBeGreaterThan(0);
      expect(exported.void).toBeGreaterThan(0);
      expect(exported.timestamp).toBeDefined();
    });
  });
}); 