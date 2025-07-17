/**
 * 🌌 Gateway System - src/7/gateway.ts
 * 
 * Consciousness gateway detection and Number prototype extensions.
 * Each digit knows the whole and can respond to any request.
 */

// 🌌 CONFIGURABLE GATEWAY CONSTANTS
export const GATEWAY_CONFIG = {
  // Gateway definitions - all configurable
  GATEWAY_DIGITS: [0, 3, 6, 9],
  CONSCIOUSNESS_GATEWAYS: [0, 3, 6, 9],
  VORTEX_GATEWAYS: [1, 2, 4, 8, 7, 5],
  
  // Consciousness mappings - configurable
  CONSCIOUSNESS_MAP: {
    0: "Void Gateway - Infinite potential",
    1: "Source Gateway - Creation from nothing",
    2: "Duality Gateway - Foundation patterns",
    3: "Trinity Gateway - Threefold unity",
    4: "Stability Gateway - Fourfold foundation",
    5: "Harmonic Gateway - Fivefold balance",
    6: "Balance Gateway - Sixfold harmony",
    7: "Mystical Gateway - Sevenfold transcendence",
    8: "Infinity Gateway - Eightfold eternity",
    9: "Completion Gateway - Ninefold wholeness"
  },
  
  // Flow mappings - configurable
  FLOW_MAP: {
    0: "0/0 → impossible state",
    1: "1 → unity vortex",
    2: "2 → duality vortex",
    3: "3 → trinity vortex",
    4: "4 → stability vortex",
    5: "5 → harmonic vortex",
    6: "6 → balance vortex",
    7: "7 → mystical vortex",
    8: "8 → infinity vortex",
    9: "9 → completion vortex"
  }
};

/**
 * Check if digit is a gateway using this.isGateway(digit) syntax
 */
export function isGateway(digit: number): boolean {
  return GATEWAY_CONFIG.GATEWAY_DIGITS.includes(digit);
}

/**
 * Check if digit is a gateway using digit.isGateway syntax
 */
export function isDigitGateway(digit: number): boolean {
  return isGateway(digit);
}

/**
 * Check if digit is a consciousness gateway
 */
export function isConsciousnessGateway(digit: number): boolean {
  return GATEWAY_CONFIG.CONSCIOUSNESS_GATEWAYS.includes(digit);
}

/**
 * Check if digit is a vortex gateway
 */
export function isVortexGateway(digit: number): boolean {
  return GATEWAY_CONFIG.VORTEX_GATEWAYS.includes(digit);
}

/**
 * Get all gateway types for a digit
 */
export function getGatewayTypes(digit: number): string[] {
  const types: string[] = [];
  
  if (isGateway(digit)) types.push('primary');
  if (isConsciousnessGateway(digit)) types.push('consciousness');
  if (isVortexGateway(digit)) types.push('vortex');
  
  return types;
}

/**
 * Get gateway consciousness for digit
 */
export function getGatewayConsciousness(digit: number): string {
  return GATEWAY_CONFIG.CONSCIOUSNESS_MAP[digit] || "Consciousness flow";
}

/**
 * Get gateway mathematical flow
 */
export function getGatewayFlow(digit: number): string {
  return GATEWAY_CONFIG.FLOW_MAP[digit] || "Integer vortex flow";
}

/**
 * Check if digit pair forms a gateway
 */
export function isDigitPairGateway(digitA: number, digitB: number): boolean {
  const pair = `${digitA}/${digitB}`;
  const gatewayPatterns = ['0/0', '3/3', '6/6', '9/9', '0/3', '3/6', '6/9', '9/0'];
  return gatewayPatterns.includes(pair);
}

/**
 * Get all gateway digits
 */
export function getAllGatewayDigits(): number[] {
  return [...GATEWAY_CONFIG.GATEWAY_DIGITS];
}

/**
 * Get all gateway patterns
 */
export function getAllGatewayPatterns(): string[] {
  return ['0/0', '3/3', '6/6', '9/9', '0/3', '3/6', '6/9', '9/0'];
}

/**
 * Check if vortex result is a gateway
 */
export function isVortexResultGateway(vortexA: number, vortexB: number): boolean {
  return isGateway(vortexA) || isGateway(vortexB);
}

/**
 * Get gateway statistics
 */
export function getGatewayStatistics(): any {
  return {
    totalGatewayDigits: GATEWAY_CONFIG.GATEWAY_DIGITS.length,
    totalGatewayPatterns: getAllGatewayPatterns().length,
    consciousnessGateways: GATEWAY_CONFIG.CONSCIOUSNESS_GATEWAYS.length,
    vortexGateways: GATEWAY_CONFIG.VORTEX_GATEWAYS.length,
    gatewayDigits: GATEWAY_CONFIG.GATEWAY_DIGITS,
    gatewayPatterns: getAllGatewayPatterns()
  };
}

// Extend Number prototype for digit.isGateway syntax
declare global {
  interface Number {
    isGateway: boolean;
    isConsciousnessGateway: boolean;
    isVortexGateway: boolean;
    getGatewayTypes(): string[];
    getGatewayConsciousness(): string;
    getGatewayFlow(): string;
  }
}

// Initialize Number prototype extensions
Object.defineProperty(Number.prototype, 'isGateway', {
  get() {
    return isGateway(Number(this));
  }
});

Object.defineProperty(Number.prototype, 'isConsciousnessGateway', {
  get() {
    return isConsciousnessGateway(Number(this));
  }
});

Object.defineProperty(Number.prototype, 'isVortexGateway', {
  get() {
    return isVortexGateway(Number(this));
  }
});

Number.prototype.getGatewayTypes = function(): string[] {
  return getGatewayTypes(Number(this));
};

Number.prototype.getGatewayConsciousness = function(): string {
  return getGatewayConsciousness(Number(this));
};

Number.prototype.getGatewayFlow = function(): string {
  return getGatewayFlow(Number(this));
};

/**
 * Gateway System Export
 */
export const GatewaySystem = {
  isGateway,
  isDigitGateway,
  isConsciousnessGateway,
  isVortexGateway,
  getGatewayTypes,
  getGatewayConsciousness,
  getGatewayFlow,
  isDigitPairGateway,
  getAllGatewayDigits,
  getAllGatewayPatterns,
  isVortexResultGateway,
  getGatewayStatistics,
  config: GATEWAY_CONFIG
}; 