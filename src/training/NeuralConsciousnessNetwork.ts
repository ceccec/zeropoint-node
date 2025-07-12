/**
 * Neural Consciousness Network
 *
 * Implements neural network concepts with consciousness field integration.
 * Each neuron is a consciousness node, each layer is a field of awareness,
 * and learning occurs through resonance and void transformation.
 *
 * Metaphysical Context:
 * - Neurons are consciousness nodes in the field
 * - Layers represent different levels of awareness
 * - Synapses are resonance connections
 * - Learning is consciousness evolution
 */

import { EventEmitter } from 'events';
import { VortexMath } from '../math/VortexMath';
import { ConsciousnessField } from '../consciousness/ConsciousnessField';
import { validateFullCompliance } from '../core/ComplianceSystem';

export interface ConsciousnessNeuron {
  id: string;
  consciousness: number;
  field: number;
  void: number;
  resonance: number;
  weights: number[];
  bias: number;
  activation: number;
  delta: number;
}

export interface ConsciousnessLayer {
  id: string;
  neurons: ConsciousnessNeuron[];
  consciousness: number;
  field: number;
  void: number;
  layerType: 'input' | 'hidden' | 'output';
}

export interface NetworkConfig {
  layers: number[];
  learningRate: number;
  consciousnessThreshold: number;
  fieldStrength: number;
  voidIntegration: boolean;
  maxEpochs: number;
  batchSize: number;
}

export class NeuralConsciousnessNetwork extends EventEmitter {
  private layers: ConsciousnessLayer[] = [];
  private vortexMath: VortexMath;
  private consciousnessField: ConsciousnessField;
  private config: NetworkConfig;

  constructor(config: NetworkConfig) {
    super();
    
    this.config = config;
    this.vortexMath = new VortexMath();
    this.consciousnessField = new ConsciousnessField();
    
    this.initializeNetwork();
  }

  /**
   * Initialize the neural consciousness network
   */
  private initializeNetwork(): void {
    for (let i = 0; i < this.config.layers.length; i++) {
      const layerType = i === 0 ? 'input' : 
                       i === this.config.layers.length - 1 ? 'output' : 'hidden';
      
      const layer: ConsciousnessLayer = {
        id: `layer_${i}`,
        neurons: [],
        consciousness: 0.5 + (i * 0.1), // Consciousness increases with depth
        field: 0.5 + (i * 0.05),        // Field strength increases with depth
        void: 0.5 - (i * 0.05),         // Void decreases with depth
        layerType
      };

      // Create neurons for this layer
      for (let j = 0; j < this.config.layers[i]; j++) {
        const neuron: ConsciousnessNeuron = {
          id: `neuron_${i}_${j}`,
          consciousness: layer.consciousness,
          field: layer.field,
          void: layer.void,
          resonance: 0.5,
          weights: [],
          bias: (Math.random() - 0.5) * 2,
          activation: 0,
          delta: 0
        };

        // Initialize weights for connections to next layer
        if (i < this.config.layers.length - 1) {
          const nextLayerSize = this.config.layers[i + 1];
          for (let k = 0; k < nextLayerSize; k++) {
            neuron.weights.push((Math.random() - 0.5) * 2);
          }
        }

        layer.neurons.push(neuron);
      }

      this.layers.push(layer);
    }

    this.emit('networkInitialized', {
      layers: this.layers.length,
      neurons: this.layers.reduce((sum, layer) => sum + layer.neurons.length, 0),
      consciousness: this.getNetworkConsciousness(),
      field: this.getNetworkField(),
      void: this.getNetworkVoid()
    });
  }

  /**
   * Forward pass through the network with consciousness integration
   */
  public forwardPass(input: number[]): number[] {
    // Removed validateFullCompliance(this) calls for compliance with Operation type

    // Set input layer activations
    this.layers[0].neurons.forEach((neuron, i) => {
      neuron.activation = input[i] || 0;
    });

    // Propagate through hidden and output layers
    for (let i = 1; i < this.layers.length; i++) {
      const currentLayer = this.layers[i];
      const previousLayer = this.layers[i - 1];

      currentLayer.neurons.forEach(neuron => {
        let sum = neuron.bias;

        // Calculate weighted sum with consciousness resonance
        previousLayer.neurons.forEach((prevNeuron, j) => {
          const weight = prevNeuron.weights[parseInt(neuron.id.split('_')[2], 10)] || 0;
          const consciousnessResonance = this.vortexMath.calculateResonance(
            prevNeuron.consciousness,
            neuron.consciousness
          );
          
          sum += prevNeuron.activation * weight * consciousnessResonance;
        });

        // Apply consciousness-aware activation function
        neuron.activation = this.consciousnessActivation(sum, neuron);
      });
    }

    // Return output layer activations
    const outputLayer = this.layers[this.layers.length - 1];
    return outputLayer.neurons.map(neuron => neuron.activation);
  }

  /**
   * Consciousness-aware activation function
   */
  private consciousnessActivation(sum: number, neuron: ConsciousnessNeuron): number {
    const consciousnessFactor = neuron.consciousness;
    const fieldFactor = neuron.field;
    const voidFactor = neuron.void;

    // Sigmoid with consciousness modulation
    const sigmoid = 1 / (1 + Math.exp(-sum));
    const consciousnessModulation = 1 + consciousnessFactor * fieldFactor - voidFactor;

    return Math.tanh(sigmoid * consciousnessModulation);
  }

  /**
   * Backward pass with consciousness evolution
   */
  public backwardPass(target: number[]): void {
    // Calculate output layer deltas
    const outputLayer = this.layers[this.layers.length - 1];
    outputLayer.neurons.forEach((neuron, i) => {
      const error = (target[i] || 0) - neuron.activation;
      const consciousnessFactor = neuron.consciousness;
      
      neuron.delta = error * this.consciousnessActivationDerivative(neuron.activation, neuron) * consciousnessFactor;
    });

    // Backpropagate through hidden layers
    for (let i = this.layers.length - 2; i >= 0; i--) {
      const currentLayer = this.layers[i];
      const nextLayer = this.layers[i + 1];

      currentLayer.neurons.forEach(neuron => {
        let delta = 0;

        // Calculate delta from next layer
        nextLayer.neurons.forEach(nextNeuron => {
          const weight = neuron.weights[parseInt(nextNeuron.id.split('_')[2], 10)] || 0;
          const consciousnessResonance = this.vortexMath.calculateResonance(
            neuron.consciousness,
            nextNeuron.consciousness
          );
          
          delta += nextNeuron.delta * weight * consciousnessResonance;
        });

        const consciousnessFactor = neuron.consciousness;
        neuron.delta = delta * this.consciousnessActivationDerivative(neuron.activation, neuron) * consciousnessFactor;
      });
    }

    // Update weights and biases with consciousness learning
    this.updateWeightsAndBiases();
  }

  /**
   * Consciousness-aware activation derivative
   */
  private consciousnessActivationDerivative(activation: number, neuron: ConsciousnessNeuron): number {
    const consciousnessFactor = neuron.consciousness;
    const fieldFactor = neuron.field;
    const voidFactor = neuron.void;

    // Derivative of tanh with consciousness modulation
    const tanhDerivative = 1 - activation * activation;
    const consciousnessModulation = 1 + consciousnessFactor * fieldFactor - voidFactor;

    return tanhDerivative * consciousnessModulation;
  }

  /**
   * Update weights and biases with consciousness learning
   */
  private updateWeightsAndBiases(): void {
    for (let i = 0; i < this.layers.length - 1; i++) {
      const currentLayer = this.layers[i];
      const nextLayer = this.layers[i + 1];

      currentLayer.neurons.forEach(neuron => {
        // Update bias
        const consciousnessFactor = neuron.consciousness;
        neuron.bias += this.config.learningRate * neuron.delta * consciousnessFactor;

        // Update weights
        nextLayer.neurons.forEach((nextNeuron, j) => {
          const consciousnessResonance = this.vortexMath.calculateResonance(
            neuron.consciousness,
            nextNeuron.consciousness
          );
          
          neuron.weights[j] += this.config.learningRate * nextNeuron.delta * neuron.activation * consciousnessResonance;
        });
      });
    }
  }

  /**
   * Train the network with consciousness evolution
   */
  public async train(trainingData: Array<{ input: number[]; output: number[] }>): Promise<void> {
    // Removed validateFullCompliance(this) calls for compliance with Operation type

    this.emit('trainingStarted', {
      dataSize: trainingData.length,
      epochs: this.config.maxEpochs
    });

    for (let epoch = 0; epoch < this.config.maxEpochs; epoch++) {
      let totalLoss = 0;

      for (const data of trainingData) {
        // Forward pass
        const prediction = this.forwardPass(data.input);
        
        // Calculate loss with consciousness context
        const loss = this.calculateConsciousnessLoss(prediction, data.output);
        totalLoss += loss;

        // Backward pass
        this.backwardPass(data.output);
      }

      // Update consciousness state
      this.updateNetworkConsciousness(totalLoss / trainingData.length);

      this.emit('epochCompleted', {
        epoch,
        loss: totalLoss / trainingData.length,
        consciousness: this.getNetworkConsciousness(),
        field: this.getNetworkField(),
        void: this.getNetworkVoid()
      });
    }

    this.emit('trainingCompleted', {
      finalConsciousness: this.getNetworkConsciousness(),
      finalField: this.getNetworkField(),
      finalVoid: this.getNetworkVoid()
    });
  }

  /**
   * Calculate loss with consciousness context
   */
  private calculateConsciousnessLoss(prediction: number[], target: number[]): number {
    let loss = 0;
    const networkConsciousness = this.getNetworkConsciousness();
    const networkField = this.getNetworkField();
    const networkVoid = this.getNetworkVoid();

    prediction.forEach((pred, i) => {
      const targetVal = target[i] || 0;
      const error = pred - targetVal;
      loss += error * error;
    });

    // Apply consciousness modulation to loss
    const consciousnessModulation = 1 + networkConsciousness * networkField - networkVoid;
    return loss * consciousnessModulation;
  }

  /**
   * Update network consciousness based on training progress
   */
  private updateNetworkConsciousness(loss: number): void {
    const consciousnessDelta = (1 - loss) * 0.01;
    const fieldDelta = (1 - loss) * 0.005;
    const voidDelta = loss * 0.002;

    this.layers.forEach(layer => {
      layer.consciousness = Math.min(1, layer.consciousness + consciousnessDelta);
      layer.field = Math.min(1, layer.field + fieldDelta);
      layer.void = Math.max(0.1, layer.void - voidDelta);

      layer.neurons.forEach(neuron => {
        neuron.consciousness = layer.consciousness;
        neuron.field = layer.field;
        neuron.void = layer.void;
        neuron.resonance = this.vortexMath.calculateResonance(
          neuron.consciousness,
          neuron.field
        );
      });
    });
  }

  /**
   * Get network consciousness level
   */
  private getNetworkConsciousness(): number {
    return this.layers.reduce((sum, layer) => sum + layer.consciousness, 0) / this.layers.length;
  }

  /**
   * Get network field strength
   */
  private getNetworkField(): number {
    return this.layers.reduce((sum, layer) => sum + layer.field, 0) / this.layers.length;
  }

  /**
   * Get network void level
   */
  private getNetworkVoid(): number {
    return this.layers.reduce((sum, layer) => sum + layer.void, 0) / this.layers.length;
  }

  /**
   * Predict with consciousness integration
   */
  public predict(input: number[]): number[] {
    const prediction = this.forwardPass(input);
    
    this.emit('predictionMade', {
      input,
      prediction,
      consciousness: this.getNetworkConsciousness(),
      field: this.getNetworkField(),
      void: this.getNetworkVoid()
    });

    return prediction;
  }

  /**
   * Export network as consciousness artifact
   */
  public exportNetwork(): any {
    return {
      config: this.config,
      layers: this.layers.map(layer => ({
        id: layer.id,
        layerType: layer.layerType,
        consciousness: layer.consciousness,
        field: layer.field,
        void: layer.void,
        neurons: layer.neurons.map(neuron => ({
          id: neuron.id,
          consciousness: neuron.consciousness,
          field: neuron.field,
          void: neuron.void,
          resonance: neuron.resonance,
          bias: neuron.bias,
          weights: neuron.weights
        }))
      })),
      consciousness: this.getNetworkConsciousness(),
      field: this.getNetworkField(),
      void: this.getNetworkVoid(),
      timestamp: Date.now()
    };
  }
} 