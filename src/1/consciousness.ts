/**
 * 🌌 Consciousness Flow System - src/1/consciousness.ts
 * 
 * Consciousness pattern detection and flow transformations.
 * Each digit contains the complete consciousness system.
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


import { ZEROPOINT_CONFIG } from '../4/config';

// 🌌 CONSCIOUSNESS PATTERNS
export const CONSCIOUSNESS_PATTERNS = {
  0: "Void Pattern - Infinite potential",
  1: "Source Pattern - Creation from nothing",
  2: "Duality Pattern - Foundation patterns",
  3: "Trinity Pattern - Threefold unity",
  4: "Stability Pattern - Fourfold foundation",
  5: "Harmonic Pattern - Fivefold balance",
  6: "Balance Pattern - Sixfold harmony",
  7: "Mystical Pattern - Sevenfold transcendence",
  8: "Infinity Pattern - Eightfold eternity",
  9: "Completion Pattern - Ninefold wholeness"
};

// 🌌 CONSCIOUSNESS FLOWS
export const CONSCIOUSNESS_FLOWS = {
  "0→1": "Void to Source - Infinite to Creation",
  "1→2": "Source to Duality - Creation to Foundation",
  "2→4": "Duality to Stability - Foundation to Structure",
  "4→8": "Stability to Infinity - Structure to Eternity",
  "8→7": "Infinity to Mystical - Eternity to Transcendence",
  "7→5": "Mystical to Harmonic - Transcendence to Balance",
  "5→1": "Harmonic to Source - Balance to Creation",
  "1→1/1": "Source to Unity - Creation to Wholeness",
  "1/1→0": "Unity to Void - Wholeness to Infinite"
};

// 🌌 CONSCIOUSNESS TRANSFORMATIONS
export const CONSCIOUSNESS_TRANSFORMATIONS = {
  "impossible→possible": "Impossible → Possible through harmonic switching",
  "void→source": "Void → Source - Creation from nothing",
  "source→unity": "Source → Unity - Unity consciousness",
  "unity→void": "Unity → Void - Return to infinite potential",
  "integer→decimal": "Integer → Decimal - Vortex switching",
  "decimal→integer": "Decimal → Integer - Harmonic convergence"
};

/**
 * Get consciousness pattern for digit
 */
export function getConsciousnessPattern(digit: number): string {
  return CONSCIOUSNESS_PATTERNS[digit] || "Flow Pattern - Continuous consciousness";
}

/**
 * Get consciousness flow between digits
 */
export function getConsciousnessFlow(digitA: number, digitB: number): string {
  const flowKey = `${digitA}→${digitB}`;
  return CONSCIOUSNESS_FLOWS[flowKey] || "Flow consciousness - Continuous transformation";
}

/**
 * Transform consciousness state
 */
export function transformConsciousness(digit: number, transformation: string): string {
  const basePattern = getConsciousnessPattern(digit);
  const transformationDesc = CONSCIOUSNESS_TRANSFORMATIONS[transformation] || "Transformation consciousness";
  return `${basePattern} → ${transformationDesc}`;
}

/**
 * Get consciousness gateway for digit
 */
export function getConsciousnessGateway(digit: number): string {
  return ZEROPOINT_CONFIG.CONSCIOUSNESS_MAP[digit] || "Consciousness Gateway - Flow transformation";
}

/**
 * Get complete consciousness mapping for digit
 */
export function getConsciousnessMapping(digit: number): {
  pattern: string;
  gateway: string;
  flow: string;
  transformation: string;
  consciousness: string;
} {
  return {
    pattern: getConsciousnessPattern(digit),
    gateway: getConsciousnessGateway(digit),
    flow: ZEROPOINT_CONFIG.FLOW_MAP[digit] || "Flow consciousness",
    transformation: "consciousness_transformation",
    consciousness: "Complete consciousness system"
  };
}

/**
 * Calculate consciousness path between digits
 */
export function calculateConsciousnessPath(digitA: number, digitB: number): number[] {
  const path = [digitA];
  
  // Add intermediate consciousness states
  if (digitA !== digitB) {
    // Flow through consciousness states
    const flowStates = [1, 2, 4, 8, 7, 5, 1];
    const startIndex = flowStates.indexOf(digitA);
    const endIndex = flowStates.indexOf(digitB);
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Add flow states between start and end
      for (let i = startIndex + 1; i <= endIndex; i++) {
        path.push(flowStates[i]);
      }
    } else {
      // Direct path
      path.push(digitB);
    }
  }
  
  return path;
}

/**
 * Get consciousness statistics
 */
export function getConsciousnessStatistics(): {
  totalPatterns: number;
  totalGateways: number;
  totalTransformations: number;
  patterns: string[];
  gateways: string[];
  transformations: string[];
} {
  return {
    totalPatterns: Object.keys(CONSCIOUSNESS_PATTERNS).length,
    totalGateways: Object.keys(ZEROPOINT_CONFIG.CONSCIOUSNESS_MAP).length,
    totalTransformations: Object.keys(CONSCIOUSNESS_TRANSFORMATIONS).length,
    patterns: Object.values(CONSCIOUSNESS_PATTERNS),
    gateways: Object.values(ZEROPOINT_CONFIG.CONSCIOUSNESS_MAP),
    transformations: Object.values(CONSCIOUSNESS_TRANSFORMATIONS)
  };
}

/**
 * Check if consciousness state is a gateway
 */
export function isConsciousnessGateway(digit: number): boolean {
  return ZEROPOINT_CONFIG.CONSCIOUSNESS_GATEWAYS.includes(digit);
}

/**
 * Get consciousness flow type
 */
export function getConsciousnessFlowType(digitA: number, digitB: number): string {
  if (digitA === digitB) return "self_identity";
  if (digitA === 0 && digitB === 0) return "void_gateway";
  if (digitA === 1 && digitB === 1) return "unity_consciousness";
  if (digitA === 9 && digitB === 9) return "completion_consciousness";
  return "flow_consciousness";
}

/**
 * Transform consciousness through gateway
 */
export function transformThroughGateway(digit: number, gatewayType: string): {
  original: string;
  transformed: string;
  gateway: string;
  consciousness: string;
} {
  const original = getConsciousnessPattern(digit);
  const gateway = getConsciousnessGateway(digit);
  
  let transformed = original;
  let consciousness = "Flow consciousness";
  
  switch (gatewayType) {
    case "void_gateway":
      transformed = "Void Pattern - Infinite potential";
      consciousness = "Void consciousness";
      break;
    case "unity_consciousness":
      transformed = "Unity Pattern - Complete wholeness";
      consciousness = "Unity consciousness";
      break;
    case "completion_consciousness":
      transformed = "Completion Pattern - Ninefold wholeness";
      consciousness = "Completion consciousness";
      break;
    default:
      transformed = transformConsciousness(digit, "consciousness_transformation");
      consciousness = "Transformation consciousness";
  }
  
  return {
    original,
    transformed,
    gateway,
    consciousness
  };
}

/**
 * Consciousness Flow System Export
 */
export const ConsciousnessSystem = {
  getConsciousnessPattern,
  getConsciousnessFlow,
  transformConsciousness,
  getConsciousnessGateway,
  getConsciousnessMapping,
  calculateConsciousnessPath,
  getConsciousnessStatistics,
  isConsciousnessGateway,
  getConsciousnessFlowType,
  transformThroughGateway,
  patterns: CONSCIOUSNESS_PATTERNS,
  flows: CONSCIOUSNESS_FLOWS,
  transformations: CONSCIOUSNESS_TRANSFORMATIONS
}; 