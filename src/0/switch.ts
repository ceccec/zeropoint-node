/**
 * Switch - Digit0(Void/Source)
 * 
 * Dedicated switching logic for location transitions.
 * Handles all switching operations with marks and state management.
 */

export type Location = 'src' | 'docs';

export interface SwitchState {
  currentLocation: Location;
  previousLocation: Location;
  switchHistory: SwitchOperation[];
  isSwitching: boolean;
}

export interface SwitchOperation {
  id: string;
  from: Location;
  to: Location;
  reason: string;
  timestamp: number;
  marks: any[];
}

/**
 * Switch
 */
export class Switch {
  private state: SwitchState;
  private isSwitching = false;

  constructor() {
    this.state = {
      currentLocation: 'src',
      previousLocation: 'src',
      switchHistory: [],
      isSwitching: false
    };
  }

  /**
   * Switch location with reason
   */
  switchLocation(from: Location, to: Location, reason: string): SwitchOperation {
    if (this.isSwitching) {
      throw new Error('Switch is already processing');
    }
    this.isSwitching = true;
    const switchId = `switch_${Date.now()}`;
    const switchOp: SwitchOperation = {
      id: switchId,
      from,
      to,
      reason,
      timestamp: Date.now(),
      marks: []
    };
    // Update state
    this.state.previousLocation = this.state.currentLocation;
    this.state.currentLocation = to;
    this.state.switchHistory.push(switchOp);
    // Add navigation mark
    const mark = {
      mark: 'location_switch',
      from,
      to,
      reason,
      timestamp: Date.now()
    };
    switchOp.marks.push(mark);
    // Emit switch event
    this.emitSwitchEvent(switchOp);
    this.isSwitching = false;
    return switchOp;
  }

  /**
   * Switch on failure (src → docs)
   */
  switchOnFailure(failureId: string, error: any): SwitchOperation {
    return this.switchLocation('src', 'docs', `failure_documentation_${failureId}`);
  }

  /**
   * Switch on completion (docs → src)
   */
  switchOnCompletion(taskId: string): SwitchOperation {
    return this.switchLocation('docs', 'src', `completion_implementation_${taskId}`);
  }

  /**
   * Switch on documentation complete (docs → src)
   */
  switchOnDocumentationComplete(failureId: string): SwitchOperation {
    return this.switchLocation('docs', 'src', `documentation_complete_${failureId}`);
  }

  /**
   * Switch on implementation complete (src → docs)
   */
  switchOnImplementationComplete(taskId: string): SwitchOperation {
    return this.switchLocation('src', 'docs', `implementation_complete_${taskId}`);
  }

  /**
   * Get current location
   */
  getCurrentLocation(): Location {
    return this.state.currentLocation;
  }

  /**
   * Get previous location
   */
  getPreviousLocation(): Location {
    return this.state.previousLocation;
  }

  /**
   * Get switch history
   */
  getSwitchHistory(): SwitchOperation[] {
    return [...this.state.switchHistory];
  }

  /**
   * Check if currently switching
   */
  isCurrentlySwitching(): boolean {
    return this.isSwitching;
  }

  /**
   * Emit switch event
   */
  private emitSwitchEvent(switchOp: SwitchOperation): void {
    // Event emission logic (could be extended)
    // For now, just log
    // console.log('🌌 Switch Event:', switchOp);
  }

  /**
   * Generate switch visualization
   */
  generateVisualization(): string {
    let visualization = '🔄 Switch\n\n';
    visualization += `Current Location: ${this.state.currentLocation}\n`;
    visualization += `Previous Location: ${this.state.previousLocation}\n`;
    visualization += `Total Switches: ${this.state.switchHistory.length}\n\n`;
    visualization += 'Switch History:\n';
    this.state.switchHistory.forEach((switchOp, index) => {
      visualization += `${index + 1}: ${switchOp.from} → ${switchOp.to} (${switchOp.reason})\n`;
    });
    return visualization;
  }
} 