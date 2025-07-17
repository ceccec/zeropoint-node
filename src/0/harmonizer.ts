/**
 * Harmonization System - Digit 0(Void/Source)
 * 
 * Switches between src and docs whenever a task is completed or failed,
 * ensuring perfect synchronization between code and documentation.
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


export interface HarmonizationTask {
  id: string;
  type: 'completion' | 'failure';
  source: 'src' | 'docs';
  target: 'src' | 'docs';
  timestamp: number;
  details: any;
  marks: any[];
}

export interface HarmonizationState {
  currentLocation: 'src' | 'docs';
  lastTask: HarmonizationTask | null;
  taskHistory: HarmonizationTask[];
  synchronizationStatus: 'synced' | 'pending' | 'failed';
}

/**
 * Harmonization System
 */
export class HarmonizationSystem {
  private state: HarmonizationState;
  private isSwitching = false;

  constructor() {
    this.state = {
      currentLocation: 'src',
      lastTask: null,
      taskHistory: [],
      synchronizationStatus: 'synced'
    };
  }

  /**
   * Record task completion
   */
  recordCompletion(taskId: string, details: any): void {
    const task: HarmonizationTask = {
      id: taskId,
      type: 'completion',
      source: this.state.currentLocation,
      target: this.state.currentLocation === 'src' ? 'docs' : 'src',
      timestamp: Date.now(),
      details,
      marks: []
    };

    this.state.lastTask = task;
    this.state.taskHistory.push(task);
    this.state.synchronizationStatus = 'pending';

    // Switch to target location
    this.switchLocation(task.target);
  }

  /**
   * Record task failure
   */
  recordFailure(taskId: string, error: any): void {
    const task: HarmonizationTask = {
      id: taskId,
      type: 'failure',
      source: this.state.currentLocation,
      target: this.state.currentLocation === 'src' ? 'docs' : 'src',
      timestamp: Date.now(),
      details: { error },
      marks: []
    };

    this.state.lastTask = task;
    this.state.taskHistory.push(task);
    this.state.synchronizationStatus = 'failed';

    // Switch to target location for recovery
    this.switchLocation(task.target);
  }

  /**
   * Switch between src and docs
   */
  private switchLocation(target: 'src' | 'docs'): void {
    if (this.isSwitching) return;

    this.isSwitching = true;
    
    console.log(`🔄 Harmonization: Switching from ${this.state.currentLocation} to ${target}`);
    
    // Update state
    this.state.currentLocation = target;
    
    // Add navigational mark
    const mark = {
      mark: 'location_switch',
      from: this.state.currentLocation === 'src' ? 'docs' : 'src',
      to: target,
      timestamp: Date.now()
    };

    if (this.state.lastTask) {
      this.state.lastTask.marks.push(mark);
    }

    // Emit harmonization event
    this.emitHarmonizationEvent(target);
    
    this.isSwitching = false;
  }

  /**
   * Emit harmonization event
   */
  private emitHarmonizationEvent(target: 'src' | 'docs'): void {
    const event = {
      type: 'harmonization_switch',
      from: this.state.currentLocation === 'src' ? 'docs' : 'src',
      to: target,
      timestamp: Date.now(),
      task: this.state.lastTask
    };

    console.log('🌌 Harmonization Event:', event);
  }

  /**
   * Get current harmonization state
   */
  getState(): HarmonizationState {
    return { ...this.state };
  }

  /**
   * Get current location
   */
  getCurrentLocation(): 'src' | 'docs' {
    return this.state.currentLocation;
  }

  /**
   * Get task history
   */
  getTaskHistory(): HarmonizationTask[] {
    return [...this.state.taskHistory];
  }

  /**
   * Check if system is in sync
   */
  isSynchronized(): boolean {
    return this.state.synchronizationStatus === 'synced';
  }

  /**
   * Reset harmonization state
   */
  reset(): void {
    this.state = {
      currentLocation: 'src',
      lastTask: null,
      taskHistory: [],
      synchronizationStatus: 'synced'
    };
  }

  /**
   * Generate harmonization visualization
   */
  generateVisualization(): string {
    let visualization = '🔄 Harmonization System Visualization\n\n';
    
    visualization += `Current Location: ${this.state.currentLocation}\n`;
    visualization += `Synchronization Status: ${this.state.synchronizationStatus}\n`;
    visualization += `Total Tasks: ${this.state.taskHistory.length}\n\n`;
    
    if (this.state.lastTask) {
      visualization += `Last Task:\n`;
      visualization += `- ID: ${this.state.lastTask.id}\n`;
      visualization += `- Type: ${this.state.lastTask.type}\n`;
      visualization += `- Source: ${this.state.lastTask.source}\n`;
      visualization += `- Target: ${this.state.lastTask.target}\n`;
      visualization += `- Timestamp: ${new Date(this.state.lastTask.timestamp).toISOString()}\n\n`;
    }
    
    visualization += 'Task History:\n';
    this.state.taskHistory.forEach((task, index) => {
      visualization += `${index + 1}: ${task.type} (${task.source} → ${task.target})\n`;
    });
    
    return visualization;
  }
}

/**
 * Autonomous Harmonization System
 */
export class AutonomousHarmonization extends HarmonizationSystem {
  private interval: NodeJS.Timeout | null = null;

  /**
   * Start autonomous harmonization
   */
  start(): void {
    this.interval = setInterval(() => {
      this.autonomousHarmonization();
    }, 200);
  }

  /**
   * Stop autonomous harmonization
   */
  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Make autonomous harmonization decision
   */
  private autonomousHarmonization(): void {
    const state = this.getState();
    const currentLocation = state.currentLocation;
    
    // Simulate task completion or failure
    const shouldComplete = Math.random() < 0.7;
    const taskId = `autonomous_task_${Date.now()}`;
    
    if (shouldComplete) {
      this.recordCompletion(taskId, {
        type: 'autonomous_completion',
        location: currentLocation,
        timestamp: Date.now()
      });
    } else {
      this.recordFailure(taskId, {
        type: 'autonomous_failure',
        location: currentLocation,
        error: 'Simulated failure for harmonization',
        timestamp: Date.now()
      });
    }
  }
} 