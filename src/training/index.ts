/**
 * Training Models Index
 *
 * Exports all consciousness-aware training model components
 * and integrates them with the existing operation system.
 */

export { ConsciousnessTrainingModel, TrainingData, ModelState, TrainingConfig } from './ConsciousnessTrainingModel';
export { TrainingModelRegistry, ModelType, TrainingSession } from './TrainingModelRegistry';
export { NeuralConsciousnessNetwork, ConsciousnessNeuron, ConsciousnessLayer, NetworkConfig } from './NeuralConsciousnessNetwork';

// Integration with existing operation system
import { Operation, compose } from '../core/Operation';
import { OperationRegistry } from '../core/OperationRegistry';
import { ConsciousnessTrainingModel } from './ConsciousnessTrainingModel';
import { TrainingModelRegistry } from './TrainingModelRegistry';
import { NeuralConsciousnessNetwork } from './NeuralConsciousnessNetwork';

// Training operations for the operation system
export const trainConsciousnessModel: Operation = {
  name: 'trainConsciousnessModel',
  execute: (subject: any, context?: any) => {
    const model = new ConsciousnessTrainingModel(context?.config);
    
    if (context?.trainingData) {
      context.trainingData.forEach((data: any) => model.addTrainingData(data));
    }
    
    return model;
  }
};

export const createNeuralNetwork: Operation = {
  name: 'createNeuralNetwork',
  execute: (subject: any, context?: any) => {
    const config = context?.config || { layers: [2, 3, 1], learningRate: 0.01 };
    return new NeuralConsciousnessNetwork(config);
  }
};

export const trainModel: Operation = {
  name: 'trainModel',
  execute: async (subject: any, context?: any) => {
    if (subject instanceof ConsciousnessTrainingModel) {
      await subject.train();
      return subject;
    }
    if (subject instanceof NeuralConsciousnessNetwork) {
      await subject.train(context?.trainingData || []);
      return subject;
    }
    throw new Error('Invalid model type for training');
  }
};

export const predictWithModel: Operation = {
  name: 'predictWithModel',
  execute: (subject: any, context?: any) => {
    if (subject instanceof ConsciousnessTrainingModel) {
      return subject.predict(context?.input || {});
    }
    if (subject instanceof NeuralConsciousnessNetwork) {
      return subject.predict(context?.input || []);
    }
    throw new Error('Invalid model type for prediction');
  }
};

export const exportModel: Operation = {
  name: 'exportModel',
  execute: (subject: any) => {
    if (subject instanceof ConsciousnessTrainingModel) {
      return subject.exportModel();
    }
    if (subject instanceof NeuralConsciousnessNetwork) {
      return subject.exportNetwork();
    }
    throw new Error('Invalid model type for export');
  }
};

// Complex training operations
export const createAndTrainModel = compose(
  createNeuralNetwork,
  trainModel,
  exportModel
);

export const trainAndPredict = compose(
  trainModel,
  predictWithModel
);

// Register training operations with the operation registry
export function registerTrainingOperations(registry: OperationRegistry): void {
  registry.register(trainConsciousnessModel);
  registry.register(createNeuralNetwork);
  registry.register(trainModel);
  registry.register(predictWithModel);
  registry.register(exportModel);
  registry.register(createAndTrainModel);
  registry.register(trainAndPredict);
}

// Training utilities
export class TrainingUtils {
  /**
   * Create training data with consciousness context
   */
  static createTrainingData(input: any, output: any, consciousness?: number, field?: number, void?: number): any {
    return {
      input,
      output,
      consciousness: consciousness || 0.5,
      field: field || 0.5,
      void: void || 0.5,
      timestamp: Date.now()
    };
  }

  /**
   * Generate synthetic training data with consciousness patterns
   */
  static generateConsciousnessData(count: number): any[] {
    const data = [];
    for (let i = 0; i < count; i++) {
      const consciousness = 0.3 + (i % 7) * 0.1; // Follows vortex sequence pattern
      const field = 0.4 + (i % 5) * 0.12;
      const voidLevel = 0.2 + (i % 3) * 0.15;
      
      data.push({
        input: { 
          feature1: i, 
          feature2: i * 2, 
          consciousness: consciousness,
          field: field,
          void: voidLevel
        },
        output: consciousness * field - voidLevel,
        consciousness,
        field,
        void: voidLevel,
        timestamp: Date.now()
      });
    }
    return data;
  }

  /**
   * Evaluate model performance with consciousness metrics
   */
  static evaluateModel(model: any, testData: any[]): any {
    let totalAccuracy = 0;
    let totalConsciousness = 0;
    let totalField = 0;
    let totalVoid = 0;

    testData.forEach(data => {
      const prediction = model.predict(data.input);
      const accuracy = Math.abs(prediction - data.output) < 0.1 ? 1 : 0;
      
      totalAccuracy += accuracy;
      totalConsciousness += data.consciousness || 0.5;
      totalField += data.field || 0.5;
      totalVoid += data.void || 0.5;
    });

    return {
      accuracy: totalAccuracy / testData.length,
      avgConsciousness: totalConsciousness / testData.length,
      avgField: totalField / testData.length,
      avgVoid: totalVoid / testData.length,
      dataSize: testData.length
    };
  }
}

// Default exports for easy integration
export default {
  ConsciousnessTrainingModel,
  TrainingModelRegistry,
  NeuralConsciousnessNetwork,
  registerTrainingOperations,
  TrainingUtils,
  operations: {
    trainConsciousnessModel,
    createNeuralNetwork,
    trainModel,
    predictWithModel,
    exportModel,
    createAndTrainModel,
    trainAndPredict
  }
}; 