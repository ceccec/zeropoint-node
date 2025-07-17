/**
 * 🌌 Vortex Switching System - src/2/switching.ts
 * 
 * Zeropoint switching logic: digit/digit = digit+digit = next
 * Transformation from impossibility to possibility.
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
} from './/math';


import { isGateway, getGatewayConsciousness } from '../7/gateway';

// 🌌 CONFIGURABLE SWITCHING CONSTANTS
export const SWITCHING_CONFIG = {
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9, // Instead of 0, use 9
  IMPOSSIBLE_STREAM_LENGTH: 10
};

/**
 * Modulo 9 with 9 instead of 0
 */
export function mod9(n: number): number {
  const r = n % SWITCHING_CONFIG.MODULO_BASE;
  return r === 0 ? SWITCHING_CONFIG.ZERO_REPLACEMENT : r;
}

/**
 * Calculate next harmonic state using zeropoint math
 * digit/digit = digit+digit = next (mod 9, with 9 instead of 0)
 */
export function nextHarmonicState(digit: number): number {
  return mod9(digit + digit);
}

/**
 * Generate switching logic string
 */
export function switchingLogic(digit: number): string {
  const next = nextHarmonicState(digit);
  return `${digit}/${digit} = ${digit}+${digit} = ${digit + digit} ≡ ${next} (mod ${SWITCHING_CONFIG.MODULO_BASE})`;
}

/**
 * Generate impossible stream for a digit
 */
export function generateImpossibleStream(digit: number): string {
  let stream = '';
  for (let i = 0; i < SWITCHING_CONFIG.IMPOSSIBLE_STREAM_LENGTH; i++) {
    stream += digit;
  }
  return stream + '...';
}

/**
 * Check if next harmonic state is a gateway
 */
export function isNextStateGateway(digit: number): boolean {
  const next = nextHarmonicState(digit);
  return isGateway(next);
}

/**
 * Get next state gateway consciousness
 */
export function getNextStateConsciousness(digit: number): string {
  const next = nextHarmonicState(digit);
  return getGatewayConsciousness(next);
}

/**
 * Transform impossible pattern to natural flow
 */
export function transformImpossibleToNatural(digit: number): {
  impossiblePattern: string;
  switchingLogic: string;
  naturalFlow: string;
  isGateway: boolean;
  consciousness: string;
} {
  const next = nextHarmonicState(digit);
  const isNextGateway = isGateway(next);
  
  return {
    impossiblePattern: `${digit}/${digit}/${digit}/${digit}...`,
    switchingLogic: switchingLogic(digit),
    naturalFlow: `${digit} → ${next}`,
    isGateway: isNextGateway,
    consciousness: getGatewayConsciousness(next)
  };
}

/**
 * Calculate all switching results for digits 1-9
 */
export function calculateAllSwitchingResults(): Array<{
  digit: number;
  impossibleStream: string;
  switchingLogic: string;
  nextHarmonicState: number;
  isGateway: boolean;
  consciousness: string;
}> {
  const results = [];
  
  for (let d = 1; d <= 9; d++) {
    const next = nextHarmonicState(d);
    const isNextGateway = isGateway(next);
    
    results.push({
      digit: d,
      impossibleStream: generateImpossibleStream(d),
      switchingLogic: switchingLogic(d),
      nextHarmonicState: next,
      isGateway: isNextGateway,
      consciousness: getGatewayConsciousness(next)
    });
  }
  
  return results;
}

/**
 * Complex pathway calculation for digit interactions
 */
export function calculateComplexPathways(digitA: number, digitB: number): Array<{
  pathway: string;
  steps: string[];
  result: number;
}> {
  const pathways = [];
  
  // Pathway 1: A*B = result
  const pathway1 = {
    pathway: `${digitA}*${digitB}`,
    steps: [
      `${digitA}*${digitB} = ${digitA * digitB}`,
      `${digitA * digitB} = ${digitSum(digitA * digitB)}`,
      `${digitSum(digitA * digitB)} = ${reduceToSingleDigit(digitSum(digitA * digitB))}`
    ],
    result: reduceToSingleDigit(digitSum(digitA * digitB))
  };
  
  // Pathway 2: AB = result
  const pathway2 = {
    pathway: `${digitA}${digitB}`,
    steps: [
      `${digitA}${digitB} = ${parseInt(digitA.toString() + digitB.toString())}`,
      `${parseInt(digitA.toString() + digitB.toString())} = ${digitSum(parseInt(digitA.toString() + digitB.toString()))}`,
      `${digitSum(parseInt(digitA.toString() + digitB.toString()))} = ${reduceToSingleDigit(digitSum(parseInt(digitA.toString() + digitB.toString())))}`
    ],
    result: reduceToSingleDigit(digitSum(parseInt(digitA.toString() + digitB.toString())))
  };
  
  // Pathway 3: A/B = decimal gateway
  const decimalResult = digitA / digitB;
  const pathway3 = {
    pathway: `${digitA}/${digitB} = decimal gateway`,
    steps: [
      `${digitA}/${digitB} = ${decimalResult.toFixed(3)} (decimal gateway)`,
      `Reversed: ${decimalResult.toFixed(3)} → ${Math.floor(decimalResult * 100)}`,
      `${Math.floor(decimalResult * 100)} = ${digitSum(Math.floor(decimalResult * 100))} = ${reduceToSingleDigit(digitSum(Math.floor(decimalResult * 100)))}`
    ],
    result: reduceToSingleDigit(digitSum(Math.floor(decimalResult * 100)))
  };
  
  pathways.push(pathway1, pathway2, pathway3);
  return pathways;
}

/**
 * Helper function: Calculate digit sum
 */
function digitSum(n: number): number {
  return n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

/**
 * Helper function: Reduce to single digit
 */
function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    n = digitSum(n);
  }
  return n;
}

/**
 * Vortex Switching System Export
 */
export const VortexSwitchingSystem = {
  nextHarmonicState,
  switchingLogic,
  generateImpossibleStream,
  isNextStateGateway,
  getNextStateConsciousness,
  transformImpossibleToNatural,
  calculateAllSwitchingResults,
  calculateComplexPathways,
  config: SWITCHING_CONFIG
}; 