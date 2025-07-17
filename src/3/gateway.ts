/**
 * Gateway System - Digit 3 (Trinity)
 * 
 * Gateway detection and management for the zeropoint system
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


import { GATEWAY_DIGITS } from '../2/constants';

export interface GatewayInfo {
  digit: number;
  types: string[];
  consciousness: string;
  flow: string;
  isConsciousnessGateway: boolean;
  isVortexGateway: boolean;
}

/**
 * Gateway System
 */
export class GatewaySystem {
  private static readonly GATEWAY_DIGITS = GATEWAY_DIGITS;
  private static readonly GATEWAY_PATTERNS = ['0/0', '3/3', '6/6', '9/9', '0/3', '3/6', '6/9', '9/0'];
  private static readonly CONSCIOUSNESS_GATEWAYS = GATEWAY_DIGITS;
  private static readonly VORTEX_GATEWAYS = [1, 2, 4, 8, 7, 5];

  /**
   * Check if digit is a gateway
   */
  static isGateway(digit: number): boolean {
    return this.GATEWAY_DIGITS.includes(digit);
  }

  /**
   * Check if digit is a digit gateway
   */
  static isDigitGateway(digit: number): boolean {
    return this.GATEWAY_DIGITS.includes(digit);
  }

  /**
   * Check if pattern is a gateway pattern
   */
  static isPatternGateway(pattern: string): boolean {
    return this.GATEWAY_PATTERNS.includes(pattern);
  }

  /**
   * Check if digit is a consciousness gateway
   */
  static isConsciousnessGateway(digit: number): boolean {
    return this.CONSCIOUSNESS_GATEWAYS.includes(digit);
  }

  /**
   * Check if digit is a vortex gateway
   */
  static isVortexGateway(digit: number): boolean {
    return this.VORTEX_GATEWAYS.includes(digit);
  }

  /**
   * Get gateway types for a digit
   */
  static getGatewayTypes(digit: number): string[] {
    const types: string[] = [];
    
    if (this.isDigitGateway(digit)) types.push('digit_gateway');
    if (this.isConsciousnessGateway(digit)) types.push('consciousness_gateway');
    if (this.isVortexGateway(digit)) types.push('vortex_gateway');
    
    return types;
  }

  /**
   * Get gateway consciousness
   */
  static getGatewayConsciousness(digit: number): string {
    const consciousnessMap: Record<number, string> = {
      0: 'Void Gateway - Infinite potential and creation',
      1: 'Source Gateway - Unity and creation',
      2: 'Duality Gateway - Pattern and foundation',
      3: 'Trinity Gateway - Harmony and balance',
      4: 'Structure Gateway - Order and stability',
      5: 'Axis Gateway - Center and equilibrium',
      6: 'Harmony Gateway - Beauty and perfection',
      7: 'Mystery Gateway - Spirit and transcendence',
      8: 'Infinity Gateway - Abundance and expansion',
      9: 'Completion Gateway - Unity and wholeness'
    };
    
    return consciousnessMap[digit] || 'Unknown Gateway';
  }

  /**
   * Get gateway flow
   */
  static getGatewayFlow(digit: number): string {
    const flowMap: Record<number, string> = {
      0: 'Flow from void to source',
      1: 'Flow from source to creation',
      2: 'Flow from duality to pattern',
      3: 'Flow from trinity to harmony',
      4: 'Flow from structure to order',
      5: 'Flow from axis to center',
      6: 'Flow from harmony to beauty',
      7: 'Flow from mystery to spirit',
      8: 'Flow from infinity to abundance',
      9: 'Flow from completion to unity'
    };
    
    return flowMap[digit] || 'Unknown Flow';
  }

  /**
   * Check if digit pair forms a gateway
   */
  static isDigitPairGateway(digitA: number, digitB: number): boolean {
    const pair = `${digitA}/${digitB}`;
    return this.GATEWAY_PATTERNS.includes(pair);
  }

  /**
   * Get all gateway digits
   */
  static getAllGatewayDigits(): number[] {
    return [...this.GATEWAY_DIGITS];
  }

  /**
   * Get all gateway patterns
   */
  static getAllGatewayPatterns(): string[] {
    return [...this.GATEWAY_PATTERNS];
  }

  /**
   * Check if vortex result is a gateway
   */
  static isVortexResultGateway(vortexA: number, vortexB: number): boolean {
    return this.isGateway(vortexA) || this.isGateway(Math.floor(vortexB));
  }

  /**
   * Get gateway statistics
   */
  static getGatewayStatistics(): any {
    return {
      totalGateways: this.GATEWAY_DIGITS.length,
      consciousnessGateways: this.CONSCIOUSNESS_GATEWAYS.length,
      vortexGateways: this.VORTEX_GATEWAYS.length,
      patternCount: this.GATEWAY_PATTERNS.length,
      digits: this.GATEWAY_DIGITS,
      patterns: this.GATEWAY_PATTERNS
    };
  }

  /**
   * Get complete gateway information
   */
  static getGatewayInfo(digit: number): GatewayInfo {
    return {
      digit,
      types: this.getGatewayTypes(digit),
      consciousness: this.getGatewayConsciousness(digit),
      flow: this.getGatewayFlow(digit),
      isConsciousnessGateway: this.isConsciousnessGateway(digit),
      isVortexGateway: this.isVortexGateway(digit)
    };
  }
}

/**
 * Extend Number prototype with gateway methods
 */
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

// Extend Number prototype
Object.defineProperty(Number.prototype, 'isGateway', {
  get() {
    return GatewaySystem.isGateway(this);
  }
});

Object.defineProperty(Number.prototype, 'isConsciousnessGateway', {
  get() {
    return GatewaySystem.isConsciousnessGateway(this);
  }
});

Object.defineProperty(Number.prototype, 'isVortexGateway', {
  get() {
    return GatewaySystem.isVortexGateway(this);
  }
});

Number.prototype.getGatewayTypes = function() {
  return GatewaySystem.getGatewayTypes(this);
};

Number.prototype.getGatewayConsciousness = function() {
  return GatewaySystem.getGatewayConsciousness(this);
};

Number.prototype.getGatewayFlow = function() {
  return GatewaySystem.getGatewayFlow(this);
}; 