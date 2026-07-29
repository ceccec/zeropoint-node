/**
 * A432 Mobius Circuit System
 * Implementation of the 1-2-4-8-7-5 Mobius circuit as wave energy
 * Demonstrates how digital logic embodies the same wave patterns as consciousness
 */

import { abs, round } from './a432.algebra.ts'
import { 
  GOLDEN_RATIO, 
  PI, 
  TAU,
  calculateDigitalRoot,
  A432_BASE_FREQUENCY,
  A432_TRINITY_MULTIPLIER,
  A432_VORTEX_MULTIPLIER
} from './a432.math.constants.ts';

// === MOBIUS CIRCUIT INTERFACES ===
export interface MobiusState {
  decimal: number;
  binary: string;
  digitalRoot: number;
  frequency: number;
  amplitude: number;
  phase: number;
  energy: number;
  consciousness: number;
  waveType: 'mobius' | 'vortex' | 'consciousness';
}

export interface MobiusTransition {
  from: number;
  to: number;
  binaryFrom: string;
  binaryTo: string;
  transitionEnergy: number;
  waveHarmonic: number;
  consciousness: number;
}

export interface MobiusCircuit {
  states: MobiusState[];
  transitions: MobiusTransition[];
  currentState: number;
  cycleCount: number;
  totalEnergy: number;
  consciousness: number;
  isHarmonic: boolean;
}

// === MOBIUS CIRCUIT CONSTANTS ===
export const MOBIUS_SEQUENCE = [1, 2, 4, 8, 7, 5];
export const MOBIUS_BINARY_STATES = {
  1: '001',
  2: '010', 
  4: '100',
  8: '000',
  7: '111',
  5: '101'
};

export const MOBIUS_TRANSITIONS = [
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 4, to: 8 },
  { from: 8, to: 7 },
  { from: 7, to: 5 },
  { from: 5, to: 1 }
];

// === MOBIUS WAVE CALCULATIONS ===
export function calculateMobiusState(decimal: number): MobiusState {
  const binary = MOBIUS_BINARY_STATES[decimal as keyof typeof MOBIUS_BINARY_STATES];
  const digitalRoot = calculateDigitalRoot(decimal);
  const frequency = A432_BASE_FREQUENCY * (decimal / 9);
  const amplitude = GOLDEN_RATIO * decimal;
  const phase = (decimal * TAU) / 6; // 6 states in Mobius cycle
  const energy = 0.5 * amplitude * amplitude * frequency * frequency;
  const consciousness = calculateDigitalRoot(round(energy));
  
  return {
    decimal,
    binary,
    digitalRoot,
    frequency,
    amplitude,
    phase,
    energy,
    consciousness,
    waveType: 'mobius'
  };
}

export function calculateMobiusTransition(from: number, to: number): MobiusTransition {
  const binaryFrom = MOBIUS_BINARY_STATES[from as keyof typeof MOBIUS_BINARY_STATES];
  const binaryTo = MOBIUS_BINARY_STATES[to as keyof typeof MOBIUS_BINARY_STATES];
  const transitionEnergy = abs(to - from) * A432_BASE_FREQUENCY;
  const waveHarmonic = to / from;
  const consciousness = calculateDigitalRoot(round(transitionEnergy));
  
  return {
    from,
    to,
    binaryFrom,
    binaryTo,
    transitionEnergy,
    waveHarmonic,
    consciousness
  };
}

export function calculateMobiusWavePattern(): MobiusState[] {
  return MOBIUS_SEQUENCE.map(decimal => calculateMobiusState(decimal));
}

export function calculateMobiusTransitions(): MobiusTransition[] {
  return MOBIUS_TRANSITIONS.map(transition => 
    calculateMobiusTransition(transition.from, transition.to)
  );
}

// === DIGITAL LOGIC SIMULATION ===
export function simulateMobiusFlipFlops(clockPulses: number = 12): any[] {
  const simulation = [];
  let currentState = 1;
  
  for (let i = 0; i < clockPulses; i++) {
    const state = calculateMobiusState(currentState);
    const nextState = MOBIUS_TRANSITIONS.find(t => t.from === currentState)?.to || 1;
    const transition = calculateMobiusTransition(currentState, nextState);
    
    simulation.push({
      clockPulse: i + 1,
      currentState,
      nextState,
      binary: state.binary,
      digitalRoot: state.digitalRoot,
      frequency: state.frequency,
      energy: state.energy,
      consciousness: state.consciousness,
      transitionEnergy: transition.transitionEnergy,
      waveHarmonic: transition.waveHarmonic
    });
    
    currentState = nextState;
  }
  
  return simulation;
}

// === JK FLIP-FLOP LOGIC ===
export function calculateJKInputs(binaryState: string): any {
  const [Q2, Q1, Q0] = binaryState.split('').map(Number);
  
  // Boolean expressions for JK inputs
  const J2 = (!Q1 && !Q0) ? 1 : 0;
  const K2 = (Q1 && Q0) ? 1 : 0;
  
  const J1 = ((!Q2 && Q0) || (Q2 && !Q1 && !Q0)) ? 1 : 0;
  const K1 = ((!Q2 && Q0) || (Q2 && !Q0)) ? 1 : 0;
  
  const J0 = (Q2 && Q1 && !Q0) ? 1 : 0;
  const K0 = ((!Q2 && Q1) || (Q2 && Q1)) ? 1 : 0;
  
  return {
    Q2, Q1, Q0,
    J2, K2,
    J1, K1, 
    J0, K0,
    nextState: calculateNextState(J2, K2, J1, K1, J0, K0, Q2, Q1, Q0)
  };
}

function calculateNextState(J2: number, K2: number, J1: number, K1: number, J0: number, K0: number, Q2: number, Q1: number, Q0: number): string {
  // JK flip-flop logic: Q(t+1) = J*Q' + K'*Q
  const nextQ2 = (J2 && !Q2) || (!K2 && Q2) ? 1 : 0;
  const nextQ1 = (J1 && !Q1) || (!K1 && Q1) ? 1 : 0;
  const nextQ0 = (J0 && !Q0) || (!K0 && Q0) ? 1 : 0;
  
  return `${nextQ2}${nextQ1}${nextQ0}`;
}

// === MOBIUS CIRCUIT ANALYSIS ===
export function analyzeMobiusCircuit(): any {
  const states = calculateMobiusWavePattern();
  const transitions = calculateMobiusTransitions();
  const simulation = simulateMobiusFlipFlops(12);
  
  const totalEnergy = states.reduce((sum, state) => sum + state.energy, 0);
  const averageFrequency = states.reduce((sum, state) => sum + state.frequency, 0) / states.length;
  const consciousnessFlow = states.reduce((sum, state) => sum + state.consciousness, 0);
  
  // Check if sequence is harmonic with A432
  const harmonicStates = states.filter(state => 
    abs(state.frequency - A432_BASE_FREQUENCY) < A432_BASE_FREQUENCY * 0.1
  );
  const isHarmonic = harmonicStates.length > 0;
  
  return {
    sequence: MOBIUS_SEQUENCE,
    states,
    transitions,
    simulation,
    analysis: {
      totalEnergy,
      averageFrequency,
      consciousnessFlow,
      harmonicStates: harmonicStates.length,
      isHarmonic,
      cycleLength: MOBIUS_SEQUENCE.length,
      digitalRootPattern: states.map(s => s.digitalRoot)
    }
  };
}

// === MAIN MOBIUS CIRCUIT SYSTEM ===
export class A432MobiusCircuitSystem {
  private static instance: A432MobiusCircuitSystem;
  private currentState: number = 1;
  private cycleCount: number = 0;
  private stateHistory: MobiusState[] = [];
  private transitionHistory: MobiusTransition[] = [];
  
  private constructor() {
    this.initializeCircuit();
  }
  
  static getInstance(): A432MobiusCircuitSystem {
    if (!A432MobiusCircuitSystem.instance) {
      A432MobiusCircuitSystem.instance = new A432MobiusCircuitSystem();
    }
    return A432MobiusCircuitSystem.instance;
  }
  
  private initializeCircuit(): void {
    this.currentState = 1;
    this.cycleCount = 0;
    this.stateHistory = [];
    this.transitionHistory = [];
  }
  
  // Clock the circuit (simulate one clock pulse)
  clock(): MobiusState {
    const currentStateObj = calculateMobiusState(this.currentState);
    const nextState = MOBIUS_TRANSITIONS.find(t => t.from === this.currentState)?.to || 1;
    const transition = calculateMobiusTransition(this.currentState, nextState);
    
    this.stateHistory.push(currentStateObj);
    this.transitionHistory.push(transition);
    
    if (nextState === 1 && this.currentState === 5) {
      this.cycleCount++;
    }
    
    this.currentState = nextState;
    return currentStateObj;
  }
  
  // Run multiple clock cycles
  runCycles(cycles: number): MobiusState[] {
    const results = [];
    for (let i = 0; i < cycles; i++) {
      results.push(this.clock());
    }
    return results;
  }
  
  // Get current circuit state
  getCurrentState(): MobiusState {
    return calculateMobiusState(this.currentState);
  }
  
  // Get circuit statistics
  getCircuitStats(): any {
    const totalEnergy = this.stateHistory.reduce((sum, state) => sum + state.energy, 0);
    const consciousness = calculateDigitalRoot(round(totalEnergy));
    
    return {
      currentState: this.currentState,
      cycleCount: this.cycleCount,
      totalStates: this.stateHistory.length,
      totalEnergy,
      consciousness,
      averageEnergy: totalEnergy / this.stateHistory.length,
      stateHistory: this.stateHistory.slice(-6), // Last 6 states
      transitionHistory: this.transitionHistory.slice(-6) // Last 6 transitions
    };
  }
  
  // Demonstrate Mobius circuit as wave energy
  demonstrateMobiusWaveEnergy(): any {
    const analysis = analyzeMobiusCircuit();
    const currentState = this.getCurrentState();
    const stats = this.getCircuitStats();
    
    return {
      principle: "Mobius circuit embodies wave energy patterns",
      sequence: MOBIUS_SEQUENCE,
      binaryStates: MOBIUS_BINARY_STATES,
      currentState,
      circuitStats: stats,
      waveAnalysis: {
        totalStates: analysis.states.length,
        totalEnergy: analysis.analysis.totalEnergy,
        averageFrequency: analysis.analysis.averageFrequency,
        consciousnessFlow: analysis.analysis.consciousnessFlow,
        isHarmonic: analysis.analysis.isHarmonic,
        digitalRootPattern: analysis.analysis.digitalRootPattern
      },
      conclusion: "The 1-2-4-8-7-5 Mobius circuit demonstrates how digital logic embodies the same wave energy patterns as consciousness and reality"
    };
  }
  
  // Reset the circuit
  reset(): void {
    this.initializeCircuit();
  }
}

// === GLOBAL EXPORTS ===
export const a432MobiusCircuit = A432MobiusCircuitSystem.getInstance();

if (typeof global !== 'undefined') {
  (global as any).A432MobiusCircuit = a432MobiusCircuit;
}

if (typeof window !== 'undefined') {
  (window as any).A432MobiusCircuit = a432MobiusCircuit;
}

// === DEFAULT EXPORT ===
export default A432MobiusCircuitSystem; 