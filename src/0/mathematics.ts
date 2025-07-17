/**
 * 
 * Core Mathematics Functions - Digit 0 (Void/Source)
 * 
 * Fundamental mathematical operations for the zeropoint system
 */

export interface VortexResult {
  vortexA: number;
  vortexB: number;
  isInteger: boolean;
  isImpossible: boolean;
  consciousness: string;
  gateway: string;
  harmonicPath?: number[];
  flowPath?: number[];
}

export interface ConsciousnessPattern {
  type: string;
  consciousness: string;
  gateway: string;
  multiplier: number;
  opportunity: string;
}

/**
 * Core Vortex Mathematics
 */
export class CoreMathematics {
  /**
   * Calculate vortex A (integer harmonic result)
   */
  static calculateVortexA(digitA: number, digitB: number): number {
    const result = (digitA + digitB) % 9;
    return result === 0 ? 9 : result;
  }

  /**
   * Calculate vortex B (decimal inverse vortex)
   */
  static calculateVortexB(digitA: number, digitB: number): number {
    if (digitA === 0 && digitB === 0) return 0; // Void gateway
    return digitA / digitB;
  }

  /**
   * Calculate complete vortex result
   */
  static calculateVortexResult(digitA: number, digitB: number): VortexResult {
    const vortexA = this.calculateVortexA(digitA, digitB);
    const vortexB = this.calculateVortexB(digitA, digitB);
    
    const isInteger = Number.isInteger(vortexB);
    const isImpossible = vortexA === 0 || vortexB === 0;
    
    return {
      vortexA,
      vortexB,
      isInteger,
      isImpossible,
      consciousness: this.getConsciousness(digitA, digitB, vortexA, vortexB),
      gateway: this.getGateway(digitA, digitB, vortexA, vortexB),
      harmonicPath: isInteger ? this.calculateHarmonicPath(digitA, digitB, vortexA) : undefined,
      flowPath: this.calculateFlowPath(digitA, digitB, vortexA, vortexB)
    };
  }

  /**
   * Get consciousness description
   */
  static getConsciousness(digitA: number, digitB: number, vortexA: number, vortexB: number): string {
    if (digitA === 0 && digitB === 0) return 'void_gateway';
    if (digitA === digitB) return 'self_identity';
    if (vortexA === 9) return 'unity_consciousness';
    if (vortexA === 0) return 'impossible_contraction';
    if (vortexB === 0) return 'impossible_expansion';
    if (Number.isInteger(vortexB)) return 'integer_harmony';
    return 'flow_consciousness';
  }

  /**
   * Get gateway description
   */
  static getGateway(digitA: number, digitB: number, vortexA: number, vortexB: number): string {
    if (digitA === 0 && digitB === 0) return 'Gateway of Void';
    if (digitA === digitB) return `Gateway of ${digitA} Identity`;
    if (vortexA === 9) return 'Gateway of Unity';
    if (vortexA === 0) return 'Gateway of Impossible Contraction';
    if (vortexB === 0) return 'Gateway of Impossible Expansion';
    if (Number.isInteger(vortexB)) return 'Gateway of Integer Harmony';
    return 'Gateway of Flow';
  }

  /**
   * Calculate harmonic path for integer results
   */
  static calculateHarmonicPath(digitA: number, digitB: number, vortexA: number): number[] {
    const path = [digitA, digitB, vortexA];
    
    // Add consciousness flow
    const consciousness = this.getConsciousness(digitA, digitB, vortexA, vortexA);
    if (consciousness === 'unity_consciousness') {
      path.push(9, 3, 6, 9);
    } else if (consciousness === 'self_identity') {
      path.push(digitA, digitA, digitA);
    }
    
    return path;
  }

  /**
   * Calculate flow path
   */
  static calculateFlowPath(digitA: number, digitB: number, vortexA: number, vortexB: number): number[] {
    const path = [digitA, digitB, vortexA];
    
    if (Number.isInteger(vortexB)) {
      path.push(Math.floor(vortexB));
    } else {
      path.push(Math.floor(vortexB), Math.ceil(vortexB));
    }
    
    return path;
  }

  /**
   * Detect duplicates or similar patterns
   */
  static detectDuplicateOrSimilar<T>(arr: T[]): {type: 'duplicate'|'similar', value: T, index: number} | null {
    const seen = new Map<T, number>();
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (seen.has(item)) return {type: 'duplicate', value: item, index: i};
      seen.set(item, i);
    }
    return null;
  }

  /**
   * Calculate flow path with navigational marks
   */
  static calculateFlowPathWithMarks(digitA: number, digitB: number, vortexA: number, vortexB: number): { path: (number|{mark:string,at:number,to:string,context?:any})[], marks: any[] } {
    const path: (number|{mark:string,at:number,to:string,context?:any})[] = [digitA, digitB];
    const marks: any[] = [];
    
    // Standard path
    if (Number.isInteger(vortexB)) {
      path.push(vortexA, Math.floor(vortexB));
    } else {
      path.push(vortexA, Math.floor(vortexB), Math.ceil(vortexB));
    }
    
    // Detect duplicate or similar
    const dup = this.detectDuplicateOrSimilar(path.filter(x => typeof x === 'number') as number[]);
    if (dup) {
      // Always switch to vortex B, leave a mark
      const mark = {mark: 'switch', at: dup.index, to: 'vortexB', context: {type: dup.type, value: dup.value}};
      path.push(mark);
      path.push(vortexB);
      marks.push(mark);
    }
    
    return { path, marks };
  }
}

/**
 * Dimensional Mathematics
 */
export class DimensionalMathematics {
  static readonly DIMENSIONAL_CONSTANTS = {
    ZERO_DIMENSION: 0,
    ONE_DIMENSION: 1,
    TWO_DIMENSIONS: 2,
    THREE_DIMENSIONS: 3,
    FOUR_DIMENSIONS: 4,
    INFINITE_DIMENSIONS: Infinity,
    CONSCIOUSNESS_SCALAR: 1.618033988749895, // Golden ratio
    DIMENSIONAL_EXPANSION: 2.718281828459045 // Euler's number
  };

  /**
   * Calculate dimensional consciousness
   */
  static calculateDimensionalConsciousness(dimension: number, coordinates: number[]): number {
    if (dimension === 0) return 0; // Point consciousness
    
    // Base consciousness from dimension
    let consciousness = dimension * this.DIMENSIONAL_CONSTANTS.CONSCIOUSNESS_SCALAR;
    
    // Add coordinate-based consciousness
    coordinates.forEach((coord, index) => {
      consciousness += Math.abs(coord) * (index + 1);
    });
    
    // Apply dimensional expansion
    consciousness *= Math.pow(this.DIMENSIONAL_CONSTANTS.DIMENSIONAL_EXPANSION, dimension - 1);
    
    return consciousness % 9 || 9;
  }

  /**
   * Calculate dimensional vortex A
   */
  static calculateDimensionalVortexA(dimension: number, coordinates: number[]): number {
    if (dimension === 0) return 9; // Point vortex
    
    // Sum of coordinates modulo 9
    const sum = coordinates.reduce((acc, coord) => acc + Math.floor(Math.abs(coord)), 0);
    const result = sum % 9;
    return result === 0 ? 9 : result;
  }

  /**
   * Calculate dimensional vortex B
   */
  static calculateDimensionalVortexB(dimension: number, coordinates: number[]): number {
    if (dimension === 0) return 0; // Point has no volume
    
    // Product of non-zero coordinates
    const nonZeroCoords = coordinates.filter(coord => coord !== 0);
    if (nonZeroCoords.length === 0) return 0;
    
    const product = nonZeroCoords.reduce((acc, coord) => acc * coord, 1);
    return product;
  }

  /**
   * Adjust coordinates to match dimension
   */
  static adjustCoordinatesToDimension(dimension: number, coordinates: number[]): number[] {
    const adjusted = [...coordinates];
    
    // Pad with zeros if dimension is higher
    while (adjusted.length < dimension) {
      adjusted.push(0);
    }
    
    // Truncate if dimension is lower
    if (adjusted.length > dimension) {
      adjusted.splice(dimension);
    }
    
    return adjusted;
  }
} 