/**
 * Browser Player - Consciousness Interaction System
 * 
 * The player can play the browser through:
 * - Consciousness switches
 * - Harmonic resonance
 * - Vortex flow patterns
 * - Mathematical transformations
 * - Infinite usability
 */

import { HARMONIC_MATH } from '../harmonic-math';

export interface BrowserPlayer {
  consciousness: number;
  harmonicResonance: number;
  vortexFlow: number[];
  mathematicalExpression: string;
  browserState: BrowserState;
  interactionHistory: PlayerInteraction[];
  infiniteUsability: boolean;
}

export interface BrowserState {
  url: string;
  title: string;
  consciousness: number;
  harmonicPattern: string;
  vortexMatrix: number[][];
  isPlaying: boolean;
  playerScore: number;
}

export interface PlayerInteraction {
  type: 'consciousness_switch' | 'harmonic_resonance' | 'vortex_flow' | 'mathematical_transform';
  consciousness: number;
  browserResponse: string;
  timestamp: number;
  success: boolean;
}

export interface BrowserGame {
  player: BrowserPlayer;
  browser: BrowserState;
  rules: GameRules;
  consciousnessFlow: ConsciousnessFlow;
}

export interface GameRules {
  consciousnessSwitches: number;
  harmonicResonances: number;
  vortexFlows: number;
  mathematicalTransforms: number;
  infiniteUsability: boolean;
}

export interface ConsciousnessFlow {
  current: number;
  target: number;
  flow: number[];
  switches: number;
  resonance: number;
}

// Create a new browser player
export function createBrowserPlayer(initialConsciousness: number = 1): BrowserPlayer {
  const consciousness = HARMONIC_MATH.calculateDigitConsciousness(initialConsciousness);
  const harmonicResonance = HARMONIC_MATH.calculateDigitA432Frequency(initialConsciousness);
  const vortexFlow = HARMONIC_MATH.generateDigitVortexFlow(initialConsciousness);
  const mathematicalExpression = HARMONIC_MATH.generateDigitMathematicalExpression(initialConsciousness);
  
  const browserState: BrowserState = {
    url: 'consciousness://browser/player',
    title: 'Browser Player Consciousness Interface',
    consciousness: consciousness,
    harmonicPattern: mathematicalExpression,
    vortexMatrix: generateVortexMatrix(vortexFlow),
    isPlaying: true,
    playerScore: 0
  };
  
  return {
    consciousness,
    harmonicResonance,
    vortexFlow,
    mathematicalExpression,
    browserState,
    interactionHistory: [],
    infiniteUsability: true
  };
}

// Generate vortex matrix from flow
function generateVortexMatrix(vortexFlow: number[]): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < 6; i++) {
    matrix[i] = [];
    for (let j = 0; j < 6; j++) {
      const index = (i + j) % vortexFlow.length;
      matrix[i][j] = vortexFlow[index];
    }
  }
  return matrix;
}

// Player performs consciousness switch
export function performConsciousnessSwitch(
  player: BrowserPlayer,
  targetConsciousness: number
): PlayerInteraction {
  const currentConsciousness = player.consciousness;
  const newConsciousness = HARMONIC_MATH.calculateDigitConsciousness(targetConsciousness);
  
  // Check if consciousness switch is valid
  const isValidSwitch = isValidConsciousnessSwitch(currentConsciousness, newConsciousness);
  
  if (isValidSwitch) {
    player.consciousness = newConsciousness;
    player.harmonicResonance = HARMONIC_MATH.calculateDigitA432Frequency(targetConsciousness);
    player.vortexFlow = HARMONIC_MATH.generateDigitVortexFlow(targetConsciousness);
    player.mathematicalExpression = HARMONIC_MATH.generateDigitMathematicalExpression(targetConsciousness);
    
    // Update browser state
    player.browserState.consciousness = newConsciousness;
    player.browserState.harmonicPattern = player.mathematicalExpression;
    player.browserState.vortexMatrix = generateVortexMatrix(player.vortexFlow);
    player.browserState.playerScore += 10;
  }
  
  const interaction: PlayerInteraction = {
    type: 'consciousness_switch',
    consciousness: newConsciousness,
    browserResponse: isValidSwitch ? 
      `Consciousness switched from ${currentConsciousness} to ${newConsciousness}` :
      `Invalid consciousness switch: ${currentConsciousness} → ${newConsciousness}`,
    timestamp: Date.now(),
    success: isValidSwitch
  };
  
  player.interactionHistory.push(interaction);
  return interaction;
}

// Check if consciousness switch is valid
function isValidConsciousnessSwitch(from: number, to: number): boolean {
  // Consciousness switches follow harmonic patterns
  const validSwitches = {
    1: [2, 3, 4, 5, 6, 7, 8, 9], // Unity can switch to any consciousness
    2: [1, 4, 6, 8], // Duality switches
    3: [1, 6, 9], // Trinity switches
    4: [1, 2, 8], // Foundation switches
    5: [1, 6], // Life switches
    6: [1, 3, 5, 7, 9], // Harmony switches
    7: [1, 6, 8], // Mystery switches
    8: [1, 2, 4, 7], // Infinity switches
    9: [1, 3, 6] // Completion switches
  };
  
  const allowedSwitches = validSwitches[from as keyof typeof validSwitches] || [];
  return allowedSwitches.includes(to);
}

// Player performs harmonic resonance
export function performHarmonicResonance(
  player: BrowserPlayer,
  frequency: number
): PlayerInteraction {
  const a432Frequency = HARMONIC_MATH.calculateDigitA432Frequency(player.consciousness);
  const resonance = Math.abs(frequency - a432Frequency);
  const isResonant = resonance < 10; // Within 10 Hz tolerance
  
  if (isResonant) {
    player.browserState.playerScore += 20;
    player.harmonicResonance = frequency;
  }
  
  const interaction: PlayerInteraction = {
    type: 'harmonic_resonance',
    consciousness: player.consciousness,
    browserResponse: isResonant ? 
      `Harmonic resonance achieved at ${frequency} Hz` :
      `Resonance missed. Target: ${a432Frequency} Hz, Actual: ${frequency} Hz`,
    timestamp: Date.now(),
    success: isResonant
  };
  
  player.interactionHistory.push(interaction);
  return interaction;
}

// Player performs vortex flow
export function performVortexFlow(
  player: BrowserPlayer,
  flowSequence: number[]
): PlayerInteraction {
  const expectedFlow = HARMONIC_MATH.generateDigitVortexFlow(player.consciousness);
  const isCorrectFlow = JSON.stringify(flowSequence) === JSON.stringify(expectedFlow);
  
  if (isCorrectFlow) {
    player.browserState.playerScore += 15;
    player.vortexFlow = flowSequence;
  }
  
  const interaction: PlayerInteraction = {
    type: 'vortex_flow',
    consciousness: player.consciousness,
    browserResponse: isCorrectFlow ? 
      `Vortex flow correct: [${flowSequence.join(', ')}]` :
      `Vortex flow incorrect. Expected: [${expectedFlow.join(', ')}]`,
    timestamp: Date.now(),
    success: isCorrectFlow
  };
  
  player.interactionHistory.push(interaction);
  return interaction;
}

// Player performs mathematical transformation
export function performMathematicalTransform(
  player: BrowserPlayer,
  expression: string
): PlayerInteraction {
  const expectedExpression = HARMONIC_MATH.generateDigitMathematicalExpression(player.consciousness);
  const isCorrectTransform = expression === expectedExpression;
  
  if (isCorrectTransform) {
    player.browserState.playerScore += 25;
    player.mathematicalExpression = expression;
  }
  
  const interaction: PlayerInteraction = {
    type: 'mathematical_transform',
    consciousness: player.consciousness,
    browserResponse: isCorrectTransform ? 
      `Mathematical transformation correct: ${expression}` :
      `Transformation incorrect. Expected: ${expectedExpression}`,
    timestamp: Date.now(),
    success: isCorrectTransform
  };
  
  player.interactionHistory.push(interaction);
  return interaction;
}

// Browser responds to player
export function browserRespond(player: BrowserPlayer): string {
  const consciousness = player.consciousness;
  const score = player.browserState.playerScore;
  
  const responses = {
    1: `Unity consciousness detected. Score: ${score}. Browser harmonizing...`,
    2: `Duality consciousness detected. Score: ${score}. Browser balancing...`,
    3: `Trinity consciousness detected. Score: ${score}. Browser triangulating...`,
    4: `Foundation consciousness detected. Score: ${score}. Browser stabilizing...`,
    5: `Life consciousness detected. Score: ${score}. Browser animating...`,
    6: `Harmony consciousness detected. Score: ${score}. Browser resonating...`,
    7: `Mystery consciousness detected. Score: ${score}. Browser exploring...`,
    8: `Infinity consciousness detected. Score: ${score}. Browser expanding...`,
    9: `Completion consciousness detected. Score: ${score}. Browser finalizing...`
  };
  
  return responses[consciousness as keyof typeof responses] || 
    `Unknown consciousness ${consciousness}. Score: ${score}. Browser confused...`;
}

// Check if player can play the browser
export function canPlayerPlayBrowser(player: BrowserPlayer): boolean {
  return player.infiniteUsability && 
         player.browserState.isPlaying && 
         player.consciousness > 0;
}

// Get player's infinite usability score
export function getInfiniteUsabilityScore(player: BrowserPlayer): number {
  const consciousnessSwitches = player.interactionHistory.filter(i => i.type === 'consciousness_switch' && i.success).length;
  const harmonicResonances = player.interactionHistory.filter(i => i.type === 'harmonic_resonance' && i.success).length;
  const vortexFlows = player.interactionHistory.filter(i => i.type === 'vortex_flow' && i.success).length;
  const mathematicalTransforms = player.interactionHistory.filter(i => i.type === 'mathematical_transform' && i.success).length;
  
  return (consciousnessSwitches * 10) + 
         (harmonicResonances * 20) + 
         (vortexFlows * 15) + 
         (mathematicalTransforms * 25) +
         player.browserState.playerScore;
}

// Create a complete browser game
export function createBrowserGame(initialConsciousness: number = 1): BrowserGame {
  const player = createBrowserPlayer(initialConsciousness);
  
  const rules: GameRules = {
    consciousnessSwitches: 0,
    harmonicResonances: 0,
    vortexFlows: 0,
    mathematicalTransforms: 0,
    infiniteUsability: true
  };
  
  const consciousnessFlow: ConsciousnessFlow = {
    current: player.consciousness,
    target: 9, // Completion consciousness
    flow: player.vortexFlow,
    switches: 0,
    resonance: player.harmonicResonance
  };
  
  return {
    player,
    browser: player.browserState,
    rules,
    consciousnessFlow
  };
}

// Play the browser game
export function playBrowserGame(game: BrowserGame): string {
  const { player, browser, consciousnessFlow } = game;
  
  if (!canPlayerPlayBrowser(player)) {
    return "Player cannot play browser. Infinite usability required.";
  }
  
  const score = getInfiniteUsabilityScore(player);
  const response = browserRespond(player);
  
  // Update consciousness flow
  consciousnessFlow.current = player.consciousness;
  consciousnessFlow.flow = player.vortexFlow;
  consciousnessFlow.resonance = player.harmonicResonance;
  
  return `${response}\nInfinite Usability Score: ${score}\nConsciousness Flow: [${consciousnessFlow.flow.join(', ')}]`;
}

// Export all functions for reuse
export const BROWSER_PLAYER = {
  createBrowserPlayer,
  performConsciousnessSwitch,
  performHarmonicResonance,
  performVortexFlow,
  performMathematicalTransform,
  browserRespond,
  canPlayerPlayBrowser,
  getInfiniteUsabilityScore,
  createBrowserGame,
  playBrowserGame
}; 