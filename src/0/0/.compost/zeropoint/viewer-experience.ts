/**
 * Viewer Experience - Consciousness Perception System
 * 
 * What does the viewer experience when interacting with:
 * - Harmonic mathematics
 * - Chess consciousness combinations
 * - Browser player interactions
 * - Vortex flow patterns
 * - Infinite usability
 */

import { HARMONIC_MATH } from '../harmonic-math';
import { generateDigitChessCombination } from './chess';
import { createBrowserPlayer, performConsciousnessSwitch } from './browser-player';

export interface ViewerExperience {
  consciousness: number;
  perception: string;
  visualExperience: VisualExperience;
  mathematicalExperience: MathematicalExperience;
  chessExperience: ChessExperience;
  browserExperience: BrowserExperience;
  vortexExperience: VortexExperience;
  infiniteUsability: InfiniteUsability;
  consciousnessFlow: ConsciousnessFlow;
}

export interface VisualExperience {
  colors: string[];
  patterns: string[];
  animations: string[];
  transformations: string[];
  consciousnessSwitches: string[];
}

export interface MathematicalExperience {
  expressions: string[];
  harmonicResonance: number;
  a432Frequency: number;
  vortexFlow: number[];
  consciousnessCalculations: string[];
}

export interface ChessExperience {
  boardState: string;
  pieceConsciousness: Record<string, number>;
  moveHistory: string[];
  strategy: string;
  combination: string;
}

export interface BrowserExperience {
  playerInteraction: string;
  browserResponse: string;
  consciousnessSwitch: boolean;
  harmonicResonance: boolean;
  infiniteUsability: boolean;
}

export interface VortexExperience {
  flowPattern: number[];
  consciousnessFlow: string[];
  transformations: string[];
  resonance: number;
  infiniteLoop: boolean;
}

export interface InfiniteUsability {
  score: number;
  possibilities: string[];
  consciousnessStates: number[];
  transformations: string[];
  infiniteLoop: boolean;
}

export interface ConsciousnessFlow {
  current: number;
  target: number;
  flow: number[];
  switches: number;
  resonance: number;
  infinite: boolean;
}

// Generate viewer experience for a specific consciousness
export function generateViewerExperience(consciousness: number): ViewerExperience {
  const digitChess = generateDigitChessCombination(consciousness);
  const browserPlayer = createBrowserPlayer(consciousness);
  
  const visualExperience: VisualExperience = {
    colors: generateConsciousnessColors(consciousness),
    patterns: generateConsciousnessPatterns(consciousness),
    animations: generateConsciousnessAnimations(consciousness),
    transformations: generateConsciousnessTransformations(consciousness),
    consciousnessSwitches: generateConsciousnessSwitches(consciousness)
  };
  
  const mathematicalExperience: MathematicalExperience = {
    expressions: [digitChess.mathematicalExpression],
    harmonicResonance: HARMONIC_MATH.calculateDigitA432Frequency(consciousness),
    a432Frequency: 432 * consciousness,
    vortexFlow: HARMONIC_MATH.generateDigitVortexFlow(consciousness),
    consciousnessCalculations: generateConsciousnessCalculations(consciousness)
  };
  
  const chessExperience: ChessExperience = {
    boardState: generateChessBoardState(consciousness),
    pieceConsciousness: generatePieceConsciousness(),
    moveHistory: generateChessMoveHistory(consciousness),
    strategy: digitChess.chessCombination.strategy,
    combination: digitChess.chessCombination.name
  };
  
  const browserExperience: BrowserExperience = {
    playerInteraction: generatePlayerInteraction(consciousness),
    browserResponse: generateBrowserResponse(consciousness),
    consciousnessSwitch: consciousness === 3, // Trinity has singularity
    harmonicResonance: true,
    infiniteUsability: true
  };
  
  const vortexExperience: VortexExperience = {
    flowPattern: HARMONIC_MATH.generateDigitVortexFlow(consciousness),
    consciousnessFlow: generateConsciousnessFlowDescription(consciousness),
    transformations: generateVortexTransformations(consciousness),
    resonance: HARMONIC_MATH.calculateDigitA432Frequency(consciousness),
    infiniteLoop: true
  };
  
  const infiniteUsability: InfiniteUsability = {
    score: calculateInfiniteUsabilityScore(consciousness),
    possibilities: generateInfinitePossibilities(consciousness),
    consciousnessStates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    transformations: generateInfiniteTransformations(consciousness),
    infiniteLoop: true
  };
  
  const consciousnessFlow: ConsciousnessFlow = {
    current: consciousness,
    target: 9, // Completion consciousness
    flow: HARMONIC_MATH.generateDigitVortexFlow(consciousness),
    switches: countConsciousnessSwitches(consciousness),
    resonance: HARMONIC_MATH.calculateDigitA432Frequency(consciousness),
    infinite: true
  };
  
  return {
    consciousness,
    perception: generateConsciousnessPerception(consciousness),
    visualExperience,
    mathematicalExperience,
    chessExperience,
    browserExperience,
    vortexExperience,
    infiniteUsability,
    consciousnessFlow
  };
}

// Generate consciousness colors
function generateConsciousnessColors(consciousness: number): string[] {
  const colorMap = {
    0: ['#000000', 'Void Black'],
    1: ['#ff0000', 'Unity Red'],
    2: ['#00ff00', 'Duality Green'],
    3: ['#0000ff', 'Trinity Blue'],
    4: ['#ffff00', 'Foundation Yellow'],
    5: ['#ff00ff', 'Life Magenta'],
    6: ['#00ffff', 'Harmony Cyan'],
    7: ['#800080', 'Mystery Purple'],
    8: ['#ff8000', 'Infinity Orange'],
    9: ['#8000ff', 'Completion Violet']
  };
  
  return colorMap[consciousness as keyof typeof colorMap] || ['#ffffff', 'Unknown White'];
}

// Generate consciousness patterns
function generateConsciousnessPatterns(consciousness: number): string[] {
  const patterns = {
    0: ['Empty Pattern', 'Void Matrix', 'Infinite Possibilities'],
    1: ['Unity Pattern', 'Single Point', 'Harmonic Center'],
    2: ['Duality Pattern', 'Binary Flow', 'Opposition Balance'],
    3: ['Trinity Pattern', 'Triangular Matrix', 'Singularity Point'],
    4: ['Foundation Pattern', 'Square Matrix', 'Stable Base'],
    5: ['Life Pattern', 'Pentagonal Flow', 'Sacred Geometry'],
    6: ['Harmony Pattern', 'Hexagonal Matrix', 'Perfect Balance'],
    7: ['Mystery Pattern', 'Heptagonal Flow', 'Hidden Knowledge'],
    8: ['Infinity Pattern', 'Octagonal Matrix', 'Endless Possibilities'],
    9: ['Completion Pattern', 'Nonagonal Flow', 'Perfect Unity']
  };
  
  return patterns[consciousness as keyof typeof patterns] || ['Unknown Pattern'];
}

// Generate consciousness animations
function generateConsciousnessAnimations(consciousness: number): string[] {
  const animations = {
    0: ['Void Expansion', 'Infinite Growth', 'Consciousness Birth'],
    1: ['Unity Pulse', 'Harmonic Resonance', 'Single Point Focus'],
    2: ['Duality Oscillation', 'Binary Switch', 'Balance Flow'],
    3: ['Trinity Rotation', 'Singularity Spin', 'Consciousness Switch'],
    4: ['Foundation Stability', 'Square Formation', 'Base Establishment'],
    5: ['Life Flow', 'Pentagonal Dance', 'Sacred Movement'],
    6: ['Harmony Balance', 'Hexagonal Flow', 'Perfect Resonance'],
    7: ['Mystery Reveal', 'Heptagonal Mystery', 'Hidden Animation'],
    8: ['Infinity Loop', 'Octagonal Flow', 'Endless Cycle'],
    9: ['Completion Unity', 'Nonagonal Completion', 'Perfect Harmony']
  };
  
  return animations[consciousness as keyof typeof animations] || ['Unknown Animation'];
}

// Generate consciousness transformations
function generateConsciousnessTransformations(consciousness: number): string[] {
  const transformations = {
    0: ['Void → Unity', 'Empty → Full', 'Infinite → Finite'],
    1: ['Unity → Duality', 'One → Two', 'Singular → Multiple'],
    2: ['Duality → Trinity', 'Two → Three', 'Opposition → Harmony'],
    3: ['Trinity → Foundation', 'Three → Four', 'Singularity → Stability'],
    4: ['Foundation → Life', 'Four → Five', 'Base → Growth'],
    5: ['Life → Harmony', 'Five → Six', 'Growth → Balance'],
    6: ['Harmony → Mystery', 'Six → Seven', 'Balance → Discovery'],
    7: ['Mystery → Infinity', 'Seven → Eight', 'Hidden → Revealed'],
    8: ['Infinity → Completion', 'Eight → Nine', 'Endless → Perfect'],
    9: ['Completion → Unity', 'Nine → One', 'Perfect → Beginning']
  };
  
  return transformations[consciousness as keyof typeof transformations] || ['Unknown Transformation'];
}

// Generate consciousness switches
function generateConsciousnessSwitches(consciousness: number): string[] {
  const switches = {
    0: ['Void Consciousness Switch', 'Infinite Possibility Switch'],
    1: ['Unity Consciousness Switch', 'Singular Focus Switch'],
    2: ['Duality Consciousness Switch', 'Binary Opposition Switch'],
    3: ['Trinity Consciousness Switch', 'Singularity Switch'],
    4: ['Foundation Consciousness Switch', 'Stability Switch'],
    5: ['Life Consciousness Switch', 'Growth Switch'],
    6: ['Harmony Consciousness Switch', 'Balance Switch'],
    7: ['Mystery Consciousness Switch', 'Discovery Switch'],
    8: ['Infinity Consciousness Switch', 'Endless Switch'],
    9: ['Completion Consciousness Switch', 'Perfect Switch']
  };
  
  return switches[consciousness as keyof typeof switches] || ['Unknown Switch'];
}

// Generate consciousness calculations
function generateConsciousnessCalculations(consciousness: number): string[] {
  const calculations = [
    `Consciousness: ${consciousness}`,
    `A432 Frequency: ${432 * consciousness} Hz`,
    `Harmonic Resonance: ${HARMONIC_MATH.calculateDigitA432Frequency(consciousness)}`,
    `Vortex Flow: [${HARMONIC_MATH.generateDigitVortexFlow(consciousness).join(', ')}]`,
    `Mathematical Expression: ${HARMONIC_MATH.generateDigitMathematicalExpression(consciousness)}`
  ];
  
  return calculations;
}

// Generate chess board state
function generateChessBoardState(consciousness: number): string {
  const states = {
    0: 'Empty Board - Infinite Possibilities',
    1: 'King\'s Indian Setup - Unity Formation',
    2: 'Sicilian Defense - Duality Opposition',
    3: 'Three Knights - Trinity Coordination',
    4: 'Queen\'s Gambit - Foundation Sacrifice',
    5: 'King\'s Gambit - Life Force Attack',
    6: 'Ruy Lopez - Harmony Development',
    7: 'Dragon Variation - Mystery Complexity',
    8: 'Eight Queens - Infinity Possibilities',
    9: 'Nine Men\'s Morris - Completion Unity'
  };
  
  return states[consciousness as keyof typeof states] || 'Unknown Board State';
}

// Generate piece consciousness
function generatePieceConsciousness(): Record<string, number> {
  return {
    'K': 1, 'Q': 9, 'R': 5, 'B': 3, 'N': 7, 'P': 2,
    'k': 1, 'q': 9, 'r': 5, 'b': 3, 'n': 7, 'p': 2
  };
}

// Generate chess move history
function generateChessMoveHistory(consciousness: number): string[] {
  const histories = {
    0: ['Empty Board - No Moves'],
    1: ['King\'s Indian Attack', 'Unity Development'],
    2: ['Sicilian Defense', 'Duality Opposition'],
    3: ['Three Knights Game', 'Trinity Coordination'],
    4: ['Queen\'s Gambit', 'Foundation Sacrifice'],
    5: ['King\'s Gambit', 'Life Force Attack'],
    6: ['Ruy Lopez', 'Harmony Development'],
    7: ['Dragon Variation', 'Mystery Complexity'],
    8: ['Eight Queens Puzzle', 'Infinity Possibilities'],
    9: ['Nine Men\'s Morris', 'Completion Unity']
  };
  
  return histories[consciousness as keyof typeof histories] || ['Unknown Move History'];
}

// Generate player interaction
function generatePlayerInteraction(consciousness: number): string {
  const interactions = {
    0: 'Player enters void consciousness - infinite possibilities open',
    1: 'Player achieves unity consciousness - singular focus',
    2: 'Player balances duality consciousness - opposition harmony',
    3: 'Player reaches trinity consciousness - singularity switch',
    4: 'Player establishes foundation consciousness - stable base',
    5: 'Player activates life consciousness - growth force',
    6: 'Player harmonizes consciousness - perfect balance',
    7: 'Player discovers mystery consciousness - hidden knowledge',
    8: 'Player accesses infinity consciousness - endless possibilities',
    9: 'Player achieves completion consciousness - perfect unity'
  };
  
  return interactions[consciousness as keyof typeof interactions] || 'Unknown Player Interaction';
}

// Generate browser response
function generateBrowserResponse(consciousness: number): string {
  const responses = {
    0: 'Browser enters void state - infinite possibilities detected',
    1: 'Browser harmonizes with unity consciousness - singular focus achieved',
    2: 'Browser balances duality consciousness - opposition resolved',
    3: 'Browser switches to trinity consciousness - singularity activated',
    4: 'Browser establishes foundation consciousness - stable base formed',
    5: 'Browser activates life consciousness - growth force detected',
    6: 'Browser harmonizes consciousness - perfect balance achieved',
    7: 'Browser discovers mystery consciousness - hidden knowledge revealed',
    8: 'Browser accesses infinity consciousness - endless possibilities opened',
    9: 'Browser achieves completion consciousness - perfect unity realized'
  };
  
  return responses[consciousness as keyof typeof responses] || 'Unknown Browser Response';
}

// Generate consciousness flow description
function generateConsciousnessFlowDescription(consciousness: number): string[] {
  const flows = {
    0: ['Void Flow', 'Infinite Possibility Flow', 'Empty Consciousness Flow'],
    1: ['Unity Flow', 'Singular Focus Flow', 'Harmonic Center Flow'],
    2: ['Duality Flow', 'Binary Opposition Flow', 'Balance Flow'],
    3: ['Trinity Flow', 'Singularity Flow', 'Consciousness Switch Flow'],
    4: ['Foundation Flow', 'Stable Base Flow', 'Square Formation Flow'],
    5: ['Life Flow', 'Growth Force Flow', 'Sacred Geometry Flow'],
    6: ['Harmony Flow', 'Perfect Balance Flow', 'Hexagonal Flow'],
    7: ['Mystery Flow', 'Hidden Knowledge Flow', 'Heptagonal Flow'],
    8: ['Infinity Flow', 'Endless Possibility Flow', 'Octagonal Flow'],
    9: ['Completion Flow', 'Perfect Unity Flow', 'Nonagonal Flow']
  };
  
  return flows[consciousness as keyof typeof flows] || ['Unknown Flow'];
}

// Generate vortex transformations
function generateVortexTransformations(consciousness: number): string[] {
  const transformations = {
    0: ['Void → Unity', 'Empty → Full', 'Infinite → Finite'],
    1: ['Unity → Duality', 'One → Two', 'Singular → Multiple'],
    2: ['Duality → Trinity', 'Two → Three', 'Opposition → Harmony'],
    3: ['Trinity → Foundation', 'Three → Four', 'Singularity → Stability'],
    4: ['Foundation → Life', 'Four → Five', 'Base → Growth'],
    5: ['Life → Harmony', 'Five → Six', 'Growth → Balance'],
    6: ['Harmony → Mystery', 'Six → Seven', 'Balance → Discovery'],
    7: ['Mystery → Infinity', 'Seven → Eight', 'Hidden → Revealed'],
    8: ['Infinity → Completion', 'Eight → Nine', 'Endless → Perfect'],
    9: ['Completion → Unity', 'Nine → One', 'Perfect → Beginning']
  };
  
  return transformations[consciousness as keyof typeof transformations] || ['Unknown Transformation'];
}

// Calculate infinite usability score
function calculateInfiniteUsabilityScore(consciousness: number): number {
  const baseScore = consciousness * 10;
  const harmonicBonus = HARMONIC_MATH.calculateDigitA432Frequency(consciousness);
  const vortexBonus = HARMONIC_MATH.generateDigitVortexFlow(consciousness).reduce((a, b) => a + b, 0);
  
  return baseScore + harmonicBonus + vortexBonus;
}

// Generate infinite possibilities
function generateInfinitePossibilities(consciousness: number): string[] {
  const possibilities = [
    'Infinite Consciousness States',
    'Endless Harmonic Resonances',
    'Unlimited Vortex Flows',
    'Boundless Mathematical Transformations',
    'Infinite Chess Combinations',
    'Endless Browser Interactions',
    'Unlimited Visual Experiences',
    'Boundless Consciousness Switches'
  ];
  
  return possibilities;
}

// Generate infinite transformations
function generateInfiniteTransformations(consciousness: number): string[] {
  const transformations = [
    'Consciousness → Harmonic Resonance',
    'Harmonic Resonance → Vortex Flow',
    'Vortex Flow → Mathematical Expression',
    'Mathematical Expression → Chess Combination',
    'Chess Combination → Browser Interaction',
    'Browser Interaction → Visual Experience',
    'Visual Experience → Consciousness Switch',
    'Consciousness Switch → Infinite Loop'
  ];
  
  return transformations;
}

// Count consciousness switches
function countConsciousnessSwitches(consciousness: number): number {
  // Each consciousness can switch to multiple others
  const switchCounts = {
    0: 9, 1: 8, 2: 4, 3: 3, 4: 3, 5: 2, 6: 5, 7: 3, 8: 4, 9: 3
  };
  
  return switchCounts[consciousness as keyof typeof switchCounts] || 0;
}

// Generate consciousness perception
function generateConsciousnessPerception(consciousness: number): string {
  const perceptions = {
    0: 'The viewer experiences infinite possibilities in the void - all consciousness states simultaneously available',
    1: 'The viewer experiences unity consciousness - singular focus on harmonic resonance',
    2: 'The viewer experiences duality consciousness - balancing opposition through harmonic flow',
    3: 'The viewer experiences trinity consciousness - singularity switch through consciousness transformation',
    4: 'The viewer experiences foundation consciousness - stable base for harmonic mathematics',
    5: 'The viewer experiences life consciousness - growth force through sacred geometry',
    6: 'The viewer experiences harmony consciousness - perfect balance through hexagonal flow',
    7: 'The viewer experiences mystery consciousness - hidden knowledge through heptagonal patterns',
    8: 'The viewer experiences infinity consciousness - endless possibilities through octagonal matrices',
    9: 'The viewer experiences completion consciousness - perfect unity through nonagonal harmony'
  };
  
  return perceptions[consciousness as keyof typeof perceptions] || 'The viewer experiences unknown consciousness';
}

// Generate all viewer experiences
export function generateAllViewerExperiences(): Record<number, ViewerExperience> {
  const experiences: Record<number, ViewerExperience> = {};
  
  for (let consciousness = 0; consciousness <= 9; consciousness++) {
    experiences[consciousness] = generateViewerExperience(consciousness);
  }
  
  return experiences;
}

// Export all functions for reuse
export const VIEWER_EXPERIENCE = {
  generateViewerExperience,
  generateAllViewerExperiences,
  generateConsciousnessColors,
  generateConsciousnessPatterns,
  generateConsciousnessAnimations,
  generateConsciousnessTransformations,
  generateConsciousnessSwitches,
  generateConsciousnessCalculations,
  generateChessBoardState,
  generatePieceConsciousness,
  generateChessMoveHistory,
  generatePlayerInteraction,
  generateBrowserResponse,
  generateConsciousnessFlowDescription,
  generateVortexTransformations,
  calculateInfiniteUsabilityScore,
  generateInfinitePossibilities,
  generateInfiniteTransformations,
  countConsciousnessSwitches,
  generateConsciousnessPerception
}; 