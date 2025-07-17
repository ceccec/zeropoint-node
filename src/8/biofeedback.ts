/**
 * Biofeedback Integration System
 *
 * Provides real-time biofeedback data (heart rate, brainwaves, GSR, etc.)
 * for use in consciousness network, audio frequency generation, and 3D visualization.
 *
 * Features:
 * - Simulated and real device support
 * - Real-time data streaming
 * - Extensible device API
 * - Integration hooks for audio and 3D visualization
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../2/math';


export type BiofeedbackType = 'heartrate' | 'eeg' | 'gsr' | 'breath' | 'custom';

export interface BiofeedbackSample {
  type: BiofeedbackType;
  value: number;
  timestamp: number;
  label?: string;
}

export interface BiofeedbackDevice {
  id: string;
  name: string;
  type: BiofeedbackType;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  onData(callback: (sample: BiofeedbackSample) => void): void;
  isConnected(): boolean;
}

export class SimulatedBiofeedbackDevice implements BiofeedbackDevice {
  id: string;
  name: string;
  type: BiofeedbackType;
  private connected: boolean = false;
  private interval: any = null;
  private callback: ((sample: BiofeedbackSample) => void) | null = null;

  constructor(id: string, name: string, type: BiofeedbackType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  async connect(): Promise<void> {
    this.connected = true;
    this.startSimulation();
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    if (this.interval) clearInterval(this.interval);
  }

  onData(callback: (sample: BiofeedbackSample) => void): void {
    this.callback = callback;
  }

  isConnected(): boolean {
    return this.connected;
  }

  private startSimulation() {
    if (!this.callback) return;
    this.interval = setInterval(() => {
      const now = Date.now();
      let value = 0;
      switch (this.type) {
        case 'heartrate':
          value = 60 + Math.round(Math.random() * 40); // 60-100 bpm
          break;
        case 'eeg':
          value = 8 + Math.random() * 32; // 8-40 Hz (alpha-beta)
          break;
        case 'gsr':
          value = 0.5 + Math.random(); // 0.5-1.5 (arbitrary units)
          break;
        case 'breath':
          value = 10 + Math.random() * 6; // 10-16 breaths/min
          break;
        default:
          value = Math.random();
      }
      this.callback!({ type: this.type, value, timestamp: now });
    }, 1000);
  }
}

export class BiofeedbackManager {
  private devices: BiofeedbackDevice[] = [];
  private listeners: Array<(sample: BiofeedbackSample) => void> = [];

  addDevice(device: BiofeedbackDevice) {
    this.devices.push(device);
    device.onData(sample => this.notifyListeners(sample));
  }

  async connectAll() {
    await Promise.all(this.devices.map(d => d.connect()));
  }

  async disconnectAll() {
    await Promise.all(this.devices.map(d => d.disconnect()));
  }

  onSample(callback: (sample: BiofeedbackSample) => void) {
    this.listeners.push(callback);
  }

  private notifyListeners(sample: BiofeedbackSample) {
    this.listeners.forEach(cb => cb(sample));
  }

  getConnectedDevices(): BiofeedbackDevice[] {
    return this.devices.filter(d => d.isConnected());
  }
}

/**
 * Integration hooks for audio and 3D visualization
 */
export interface BiofeedbackIntegration {
  onBiofeedbackSample(sample: BiofeedbackSample): void;
}

// Example: Integrate with audio frequency generator
export class AudioBiofeedbackIntegration implements BiofeedbackIntegration {
  private audioGenerator: any;
  constructor(audioGenerator: any) {
    this.audioGenerator = audioGenerator;
  }
  onBiofeedbackSample(sample: BiofeedbackSample) {
    // Example: Modulate amplitude or frequency based on heart rate or EEG
    if (sample.type === 'heartrate') {
      this.audioGenerator.setAmplitude(Math.min(1, sample.value / 100));
    } else if (sample.type === 'eeg') {
      this.audioGenerator.setFrequency(432 + sample.value);
    }
  }
}

// Example: Integrate with 3D visualization
export class VisualizationBiofeedbackIntegration implements BiofeedbackIntegration {
  private visualizer: any;
  constructor(visualizer: any) {
    this.visualizer = visualizer;
  }
  onBiofeedbackSample(sample: BiofeedbackSample) {
    // Example: Change color or animation speed based on GSR or breath
    if (sample.type === 'gsr') {
      this.visualizer.setColorIntensity(sample.value);
    } else if (sample.type === 'breath') {
      this.visualizer.setAnimationSpeed(sample.value / 12);
    }
  }
} 