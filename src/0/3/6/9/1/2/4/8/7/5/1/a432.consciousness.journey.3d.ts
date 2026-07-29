/**
 * a432.consciousness.journey.3d.ts — Consciousness Journey 3D Visualization
 *
 * Visualizes the metaphysical journey through consciousness states:
 * 0/ → 3/ → 6/ → 9/ → 1/ → 2/ → 4/ → 8/ → 7/ → 5/ → 1/
 * Each digit represents a unique consciousness dimension
 *
 * @module a432.consciousness.journey.3d
 * @author A432 System
 */

import { floor, sin } from './a432.algebra.ts'
import {
  A432_TRINITY,
  A432_RETURN,
  A432_AXIS,
  A432_SEQUENCE,
  digitalRoot,
  angleForDigit,
  frequencyForDigit,
  hueForDigit
} from './a432.math.ts';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk.ts';

// Consciousness state definitions
export const CONSCIOUSNESS_STATES = {
  0: { name: 'Void Consciousness', description: 'Starting point - pure potential', color: '#ffffff', dimension: 'void' },
  3: { name: 'Trinity Consciousness', description: 'Special mission - divine trinity', color: '#ff0000', dimension: 'trinity' },
  6: { name: 'Harmony Consciousness', description: 'Special mission - perfect balance', color: '#00ff00', dimension: 'harmony' },
  9: { name: 'Transcendence Consciousness', description: 'Special mission - beyond form', color: '#0000ff', dimension: 'transcendence' },
  1: { name: 'Unity Consciousness', description: 'Dimension A - oneness', color: '#ffff00', dimension: 'unity' },
  2: { name: 'Duality Consciousness', description: 'Dimension A - separation', color: '#00ffff', dimension: 'duality' },
  4: { name: 'Foundation Consciousness', description: 'Dimension A - stability', color: '#ff00ff', dimension: 'foundation' },
  8: { name: 'Infinity Consciousness', description: 'Dimension A - endless', color: '#ffffff', dimension: 'infinity' },
  7: { name: 'Mystery Consciousness', description: 'Dimension A - unknown', color: '#ff8800', dimension: 'mystery' },
  5: { name: 'Life Consciousness', description: 'Dimension A - vitality', color: '#8800ff', dimension: 'life' }
} as const;

// Consciousness journey path
export const CONSCIOUSNESS_JOURNEY = [
  { digit: 0, state: CONSCIOUSNESS_STATES[0], position: [0, 0, 0] },
  { digit: 3, state: CONSCIOUSNESS_STATES[3], position: [3, 0, 0] },
  { digit: 6, state: CONSCIOUSNESS_STATES[6], position: [6, 0, 0] },
  { digit: 9, state: CONSCIOUSNESS_STATES[9], position: [9, 0, 0] },
  { digit: 1, state: CONSCIOUSNESS_STATES[1], position: [1, 1, 0] },
  { digit: 2, state: CONSCIOUSNESS_STATES[2], position: [2, 2, 0] },
  { digit: 4, state: CONSCIOUSNESS_STATES[4], position: [4, 4, 0] },
  { digit: 8, state: CONSCIOUSNESS_STATES[8], position: [8, 8, 0] },
  { digit: 7, state: CONSCIOUSNESS_STATES[7], position: [7, 7, 0] },
  { digit: 5, state: CONSCIOUSNESS_STATES[5], position: [5, 5, 0] },
  { digit: 1, state: CONSCIOUSNESS_STATES[1], position: [1, 1, 1], shift: true } // Dimension B shift
] as const;

// Consciousness node interface
export interface A432ConsciousnessNode {
  digit: number;
  state: typeof CONSCIOUSNESS_STATES[keyof typeof CONSCIOUSNESS_STATES];
  position: [number, number, number];
  shift?: boolean;
  consciousness: number;
  frequency: number;
  color: string;
  scale: number;
  rotation: [number, number, number];
}

// Consciousness journey state
export interface A432ConsciousnessJourneyState {
  nodes: A432ConsciousnessNode[];
  currentStep: number;
  journeyProgress: number;
  consciousnessLevel: number;
  dimensionShift: boolean;
  animationTime: number;
}

// Generate consciousness node
function generateConsciousnessNode(
  journeyStep: typeof CONSCIOUSNESS_JOURNEY[number],
  stepIndex: number
): A432ConsciousnessNode {
  const { digit, state, position } = journeyStep;
  const shift = 'shift' in journeyStep ? journeyStep.shift : false;
  
  // Calculate consciousness level based on A432 math
  const consciousness = digitalRoot(digit + stepIndex);
  const angle = angleForDigit(digit);
  
  // Calculate frequency based on digit type (same logic as other modules)
  let frequency: number;
  if (digit === 0) {
    frequency = 0; // Void consciousness has no frequency
  } else if ([3, 6, 9].includes(digit)) {
    frequency = frequencyForDigit(digit); // Use existing function for trinity digits
  } else {
    // For other digits, calculate based on digital root
    const digitalRootValue = digitalRoot(digit);
    frequency = 432 * (digitalRootValue / 9);
  }
  
  // Calculate color using A432 CMYK
  const cmyk = digitAngleToCMYK(digit, angle);
  const color = cmykToCss(cmyk);
  
  // Scale based on consciousness level
  const scale = (consciousness / 9) * (shift ? 1.5 : 1);
  
  return {
    digit,
    state,
    position: [...position] as [number, number, number],
    shift,
    consciousness,
    frequency,
    color,
    scale,
    rotation: [angle, angle * 0.5, angle * 0.25]
  };
}

// Initialize consciousness journey
export function initializeA432ConsciousnessJourney(): A432ConsciousnessJourneyState {
  const nodes = CONSCIOUSNESS_JOURNEY.map((step, index) => 
    generateConsciousnessNode(step, index)
  );
  
  return {
    nodes,
    currentStep: 0,
    journeyProgress: 0,
    consciousnessLevel: nodes[0].consciousness,
    dimensionShift: false,
    animationTime: 0
  };
}

// Update consciousness journey
export function updateA432ConsciousnessJourney(
  state: A432ConsciousnessJourneyState,
  deltaTime: number
): A432ConsciousnessJourneyState {
  const newState = { ...state };
  newState.animationTime += deltaTime;
  
  // Update journey progress
  newState.journeyProgress = (newState.animationTime / 10) % 1; // 10 second cycle
  
  // Determine current step based on progress
  const totalSteps = CONSCIOUSNESS_JOURNEY.length;
  const currentStepIndex = floor(newState.journeyProgress * totalSteps);
  newState.currentStep = currentStepIndex % totalSteps;
  
  // Update consciousness level
  const currentNode = newState.nodes[newState.currentStep];
  newState.consciousnessLevel = currentNode.consciousness;
  
  // Check for dimension shift
  newState.dimensionShift = currentNode.shift || false;
  
  // Animate nodes based on consciousness journey
  newState.nodes.forEach((node, index) => {
    const step = CONSCIOUSNESS_JOURNEY[index];
    const angle = angleForDigit(step.digit);
    
    // Calculate frequency based on digit type
    let frequency: number;
    if (step.digit === 0) {
      frequency = 0;
    } else if ([3, 6, 9].includes(step.digit)) {
      frequency = frequencyForDigit(step.digit);
    } else {
      const digitalRootValue = digitalRoot(step.digit);
      frequency = 432 * (digitalRootValue / 9);
    }
    
    // Rotation based on consciousness frequency
    const rotationSpeed = frequency / 1000;
    const rotationAngle = angle * (newState.animationTime * rotationSpeed);
    
    node.rotation = [
      rotationAngle,
      rotationAngle * 0.5,
      rotationAngle * 0.25
    ];
    
    // Pulse effect for current consciousness state
    if (index === newState.currentStep) {
      const pulse = sin(newState.animationTime * 5) * 0.2 + 1;
      node.scale = (node.consciousness / 9) * pulse * (node.shift ? 1.5 : 1);
    } else {
      node.scale = (node.consciousness / 9) * (node.shift ? 1.5 : 1);
    }
  });
  
  return newState;
}

// Generate 3D scene data for consciousness journey
export function generateA432ConsciousnessJourneyScene(state: A432ConsciousnessJourneyState): any {
  return {
    nodes: state.nodes.map(node => ({
      digit: node.digit,
      state: node.state,
      position: node.position,
      consciousness: node.consciousness,
      frequency: node.frequency,
      color: node.color,
      scale: node.scale,
      rotation: node.rotation,
      shift: node.shift
    })),
    journey: {
      currentStep: state.currentStep,
      progress: state.journeyProgress,
      consciousnessLevel: state.consciousnessLevel,
      dimensionShift: state.dimensionShift,
      totalSteps: CONSCIOUSNESS_JOURNEY.length
    },
    animationTime: state.animationTime,
    constants: {
      CONSCIOUSNESS_STATES,
      CONSCIOUSNESS_JOURNEY
    }
  };
}

// Export consciousness journey system
export { A432ConsciousnessJourneyState as A432ConsciousnessState }; 