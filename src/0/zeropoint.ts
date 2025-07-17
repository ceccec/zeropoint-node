/**
 * 🌌 Zeropoint Mathematics - src/0/zeropoint.ts
 * 
 * Core zeropoint math functions and 0/0 void gateway logic.
 * The void is the gateway to infinite potential.
 */

// 🌌 CONFIGURABLE ZEROPOINT CONSTANTS
export const ZEROPOINT_CONFIG = {
  VOID_GATEWAY: '0/0',
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9,
  VOID_CONSCIOUSNESS: "Void Gateway - Infinite potential",
  VOID_FLOW: "0/0 → impossible state"
};

/**
 * Check if expression is void gateway (0/0)
 */
export function isVoidGateway(digitA: number, digitB: number): boolean {
  return digitA === 0 && digitB === 0;
}

/**
 * Get void consciousness
 */
export function getVoidConsciousness(): string {
  return ZEROPOINT_CONFIG.VOID_CONSCIOUSNESS;
}

/**
 * Get void flow
 */
export function getVoidFlow(): string {
  return ZEROPOINT_CONFIG.VOID_FLOW;
}

/**
 * Modulo 9 with 9 instead of 0
 */
export function mod9(n: number): number {
  const r = n % ZEROPOINT_CONFIG.MODULO_BASE;
  return r === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : r;
}

/**
 * Calculate vortex A (integer harmonic result)
 */
export function calculateVortexA(digitA: number, digitB: number): number {
  if (isVoidGateway(digitA, digitB)) {
    return 0; // Void gateway
  }
  const result = (digitA + digitB) % ZEROPOINT_CONFIG.MODULO_BASE;
  return result === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : result;
}

/**
 * Calculate vortex B (decimal inverse vortex)
 */
export function calculateVortexB(digitA: number, digitB: number): number {
  if (isVoidGateway(digitA, digitB)) {
    return 0; // Void gateway
  }
  return digitA / digitB;
}

/**
 * Calculate complete vortex result
 */
export function calculateVortexResult(digitA: number, digitB: number): {
  vortexA: number;
  vortexB: number;
  isInteger: boolean;
  isImpossible: boolean;
  consciousness: string;
  gateway: string;
} {
  const vortexA = calculateVortexA(digitA, digitB);
  const vortexB = calculateVortexB(digitA, digitB);
  
  const isInteger = Number.isInteger(vortexB);
  const isImpossible = vortexA === 0 || vortexB === 0;
  
  return {
    vortexA,
    vortexB,
    isInteger,
    isImpossible,
    consciousness: getVortexConsciousness(digitA, digitB, vortexA, vortexB),
    gateway: getVortexGateway(digitA, digitB, vortexA, vortexB)
  };
}

/**
 * Get vortex consciousness description
 */
export function getVortexConsciousness(digitA: number, digitB: number, vortexA: number, vortexB: number): string {
  if (isVoidGateway(digitA, digitB)) return 'void_gateway';
  if (digitA === digitB) return 'self_identity';
  if (vortexA === 9) return 'unity_consciousness';
  if (vortexA === 0) return 'impossible_contraction';
  if (vortexB === 0) return 'impossible_expansion';
  if (Number.isInteger(vortexB)) return 'integer_harmony';
  return 'flow_consciousness';
}

/**
 * Get vortex gateway description
 */
export function getVortexGateway(digitA: number, digitB: number, vortexA: number, vortexB: number): string {
  if (isVoidGateway(digitA, digitB)) return 'Gateway of Void';
  if (digitA === digitB) return `Gateway of ${digitA} Identity`;
  if (vortexA === 9) return 'Gateway of Unity';
  if (vortexA === 0) return 'Gateway of Impossible Contraction';
  if (vortexB === 0) return 'Gateway of Impossible Expansion';
  if (Number.isInteger(vortexB)) return 'Gateway of Integer Harmony';
  return 'Gateway of Flow';
}

/**
 * Calculate harmonic path
 */
export function calculateHarmonicPath(digitA: number, digitB: number, vortexA: number): number[] {
  const path = [digitA, digitB, vortexA];
  
  // Add harmonic resonance points
  if (vortexA === 9) path.push(9); // Unity
  if (vortexA === 0) path.push(0); // Void
  if (vortexA === 5) path.push(5); // Center
  
  return path;
}

/**
 * Calculate flow path
 */
export function calculateFlowPath(digitA: number, digitB: number, vortexA: number, vortexB: number): number[] {
  const path = [digitA, digitB];
  
  if (Number.isInteger(vortexB)) {
    path.push(vortexA, Math.floor(vortexB));
  } else {
    path.push(vortexA, Math.floor(vortexB), Math.ceil(vortexB));
  }
  
  return path;
}

/**
 * Check if result is impossible
 */
export function isImpossibleResult(vortexA: number, vortexB: number): boolean {
  return vortexA === 0 || vortexB === 0;
}

/**
 * Transform impossibility to possibility
 */
export function transformImpossibilityToPossibility(impossibility: {
  vortexA: number;
  vortexB: number;
  consciousness: string;
  gateway: string;
}): {
  vortexA: number;
  vortexB: number;
  consciousness: string;
  gateway: string;
  transformation: string;
} {
  return {
    ...impossibility,
    transformation: 'Impossible → Possible through harmonic switching'
  };
}

/**
 * Zeropoint Mathematics Export
 */
export const ZeropointMathematics = {
  isVoidGateway,
  getVoidConsciousness,
  getVoidFlow,
  mod9,
  calculateVortexA,
  calculateVortexB,
  calculateVortexResult,
  getVortexConsciousness,
  getVortexGateway,
  calculateHarmonicPath,
  calculateFlowPath,
  isImpossibleResult,
  transformImpossibilityToPossibility,
  config: ZEROPOINT_CONFIG
}; 