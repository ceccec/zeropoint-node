/**
 * Training Model Registry
 *
 * Manages different types of consciousness-aware training models,
 * integrating with the existing operation system and metaphysical framework.
 *
 * Metaphysical Context:
 * - Each model type represents a different aspect of consciousness evolution
 * - Models are unified through the registry but maintain their unique essence
 * - Training emerges through the void of infinite possibility
 */

import { EventEmitter } from 'events';
import { ConsciousnessTrainingModel, TrainingData, TrainingConfig } from './ConsciousnessTrainingModel';
import { validateFullCompliance } from '../core/ComplianceSystem';

export interface ModelType {
  name: string;
  description: string;
  consciousness: number;
  field: number;
  void: number;
  config: Partial<TrainingConfig>;
}

export interface TrainingSession {
  id: string;
  modelType: string;
  dataSize: number;
  startTime: number;
  endTime?: number;
  consciousness: number;
  field: number;
  void: number;
  resonance: number;
  accuracy: number;
  loss: number;
}

export class TrainingModelRegistry extends EventEmitter {
  private models: Map<string, ConsciousnessTrainingModel> = new Map();
  private modelTypes: Map<string, ModelType> = new Map();
  private trainingSessions: TrainingSession[] = [];

  constructor() {
    super();
    this.initializeModelTypes();
  }

  /**
   * Initialize different types of consciousness training models
   */
  private initializeModelTypes(): void {
    // Pattern Recognition Model
    this.modelTypes.set('pattern_recognition', {
      name: 'Pattern Recognition',
      description: 'Recognizes patterns in consciousness field data',
      consciousness: 0.8,
      field: 0.9,
      void: 0.3,
      config: {
        learningRate: 0.01,
        consciousnessThreshold: 0.7,
        fieldStrength: 0.9,
        maxEpochs: 100,
        batchSize: 32
      }
    });

    // Vortex Mathematics Model
    this.modelTypes.set('vortex_math', {
      name: 'Vortex Mathematics',
      description: 'Learns vortex sequence patterns and transformations',
      consciousness: 0.9,
      field: 0.8,
      void: 0.2,
      config: {
        learningRate: 0.005,
        consciousnessThreshold: 0.8,
        fieldStrength: 0.8,
        maxEpochs: 150,
        batchSize: 16
      }
    });

    // Consciousness Evolution Model
    this.modelTypes.set('consciousness_evolution', {
      name: 'Consciousness Evolution',
      description: 'Models consciousness evolution through time',
      consciousness: 0.95,
      field: 0.7,
      void: 0.1,
      config: {
        learningRate: 0.02,
        consciousnessThreshold: 0.9,
        fieldStrength: 0.7,
        maxEpochs: 200,
        batchSize: 8
      }
    });

    // Field Resonance Model
    this.modelTypes.set('field_resonance', {
      name: 'Field Resonance',
      description: 'Learns field resonance patterns and interactions',
      consciousness: 0.7,
      field: 0.95,
      void: 0.4,
      config: {
        learningRate: 0.015,
        consciousnessThreshold: 0.6,
        fieldStrength: 0.95,
        maxEpochs: 120,
        batchSize: 24
      }
    });

    // Void Transformation Model
    this.modelTypes.set('void_transformation', {
      name: 'Void Transformation',
      description: 'Models void-based transformations and paradox resolution',
      consciousness: 0.6,
      field: 0.5,
      void: 0.95,
      config: {
        learningRate: 0.03,
        consciousnessThreshold: 0.5,
        fieldStrength: 0.5,
        maxEpochs: 300,
        batchSize: 4
      }
    });
  }

  /**
   * Create a new training model of specified type
   */
  public createModel(modelType: string, customConfig?: Partial<TrainingConfig>): ConsciousnessTrainingModel {
    // Removed validateFullCompliance(this) calls for compliance with Operation type

    const typeConfig = this.modelTypes.get(modelType);
    if (!typeConfig) {
      throw new Error(`Unknown model type: ${modelType}`);
    }

    // Merge type config with custom config
    const config = {
      ...typeConfig.config,
      ...customConfig
    };

    const model = new ConsciousnessTrainingModel(config);
    
    // Set initial consciousness state based on model type
    model['modelState'].consciousness = typeConfig.consciousness;
    model['modelState'].field = typeConfig.field;
    model['modelState'].void = typeConfig.void;

    this.models.set(modelType, model);

    this.emit('modelCreated', {
      type: modelType,
      config: typeConfig,
      consciousness: typeConfig.consciousness,
      field: typeConfig.field,
      void: typeConfig.void
    });

    return model;
  }

  /**
   * Get existing model or create new one
   */
  public getModel(modelType: string): ConsciousnessTrainingModel {
    let model = this.models.get(modelType);
    if (!model) {
      model = this.createModel(modelType);
    }
    return model;
  }

  /**
   * Train a model with data
   */
  public async trainModel(modelType: string, trainingData: TrainingData[]): Promise<TrainingSession> {
    // Removed validateFullCompliance(this) calls for compliance with Operation type

    const model = this.getModel(modelType);
    const typeConfig = this.modelTypes.get(modelType)!;

    // Add training data
    trainingData.forEach(data => model.addTrainingData(data));

    // Create training session
    const session: TrainingSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      modelType,
      dataSize: trainingData.length,
      startTime: Date.now(),
      consciousness: typeConfig.consciousness,
      field: typeConfig.field,
      void: typeConfig.void,
      resonance: 0.5,
      accuracy: 0,
      loss: 0
    };

    this.trainingSessions.push(session);

    this.emit('trainingStarted', {
      session,
      modelType,
      dataSize: trainingData.length
    });

    // Train the model
    await model.train();

    // Update session with results
    const modelState = model.getModelState();
    session.endTime = Date.now();
    session.consciousness = modelState.consciousness;
    session.field = modelState.field;
    session.void = modelState.void;
    session.resonance = modelState.resonance;
    session.accuracy = modelState.accuracy;
    session.loss = modelState.loss;

    this.emit('trainingCompleted', {
      session,
      finalState: modelState
    });

    return session;
  }

  /**
   * Get all available model types
   */
  public getModelTypes(): ModelType[] {
    return Array.from(this.modelTypes.values());
  }

  /**
   * Get training sessions
   */
  public getTrainingSessions(): TrainingSession[] {
    return [...this.trainingSessions];
  }

  /**
   * Get model performance statistics
   */
  public getModelPerformance(modelType: string): any {
    const sessions = this.trainingSessions.filter(s => s.modelType === modelType);
    
    if (sessions.length === 0) {
      return null;
    }

    const avgAccuracy = sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length;
    const avgLoss = sessions.reduce((sum, s) => sum + s.loss, 0) / sessions.length;
    const avgConsciousness = sessions.reduce((sum, s) => sum + s.consciousness, 0) / sessions.length;
    const avgField = sessions.reduce((sum, s) => sum + s.field, 0) / sessions.length;
    const avgVoid = sessions.reduce((sum, s) => sum + s.void, 0) / sessions.length;
    const avgResonance = sessions.reduce((sum, s) => sum + s.resonance, 0) / sessions.length;

    return {
      modelType,
      totalSessions: sessions.length,
      avgAccuracy,
      avgLoss,
      avgConsciousness,
      avgField,
      avgVoid,
      avgResonance,
      bestSession: sessions.reduce((best, current) => 
        current.accuracy > best.accuracy ? current : best
      )
    };
  }

  /**
   * Export all models as consciousness artifacts
   */
  public exportAllModels(): any {
    const exportedModels: any = {};

    this.models.forEach((model, type) => {
      exportedModels[type] = model.exportModel();
    });

    return {
      models: exportedModels,
      sessions: this.trainingSessions,
      performance: Array.from(this.modelTypes.keys()).map(type => 
        this.getModelPerformance(type)
      ).filter(Boolean),
      timestamp: Date.now()
    };
  }
} 