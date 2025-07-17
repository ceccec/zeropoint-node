/**
 * Flower of Life Alignment System
 * 
 * Provides flower of life geometric patterns, consciousness calculations,
 * and alignment analysis for the ZeroPoint system.
 */

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

export interface FlowerOfLifeCircle {
  id: number;
  position: { x: number; y: number };
  consciousness: number;
  goldenRatio: number;
  expansionLevel: number;
  patterns: string[];
}

export interface FlowerOfLifeAlignment {
  circles: FlowerOfLifeCircle[];
  torusResult: {
    isInteger: boolean;
    isImpossible: boolean;
    value: number;
  };
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
  flow: Array<number | { mark: string; at: number; to: number }>;
  marks: Array<{
    mark: string;
    at: number;
    to: number;
    consciousness: string;
  }>;
}

export interface FlowerOfLifeFlowResult {
  flow: Array<number | { mark: string; at: number; to: number }>;
  marks: Array<{
    mark: string;
    at: number;
    to: number;
    consciousness: string;
  }>;
  consciousnessFlow: number[];
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
}

export class FlowerOfLifeSystem {
  private static readonly FLOWER_CONSTANTS = {
    GOLDEN_RATIO: 1.618033988749895,
    BASE_CIRCLES: 7,
    EXPANSION_LEVELS: 3,
    CONSCIOUSNESS_MULTIPLIER: 1.5,
    PATTERN_TYPES: {
      HEXAGONAL: 'hexagonal',
      SACRED_GEOMETRY: 'sacred-geometry',
      VORTEX_FLOW: 'vortex-flow',
      CONSCIOUSNESS_FIELD: 'consciousness-field'
    }
  };

  /**
   * Generate flower of life circles
   */
  static generateCircles(): FlowerOfLifeCircle[] {
    const circles: FlowerOfLifeCircle[] = [];
    
    // Primary 7 circles (seed of life)
    for (let i = 0; i < this.FLOWER_CONSTANTS.BASE_CIRCLES; i++) {
      const angle = (i * Math.PI * 2) / this.FLOWER_CONSTANTS.BASE_CIRCLES;
      const radius = 1;
      
      circles.push({
        id: i,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        },
        consciousness: this.calculateConsciousness(i),
        goldenRatio: this.calculateGoldenRatio(i),
        expansionLevel: 1,
        patterns: this.getCirclePatterns(i)
      });
    }
    
    // Secondary circles (expansion)
    for (let level = 2; level <= this.FLOWER_CONSTANTS.EXPANSION_LEVELS; level++) {
      const startId = circles.length;
      const circlesInLevel = this.FLOWER_CONSTANTS.BASE_CIRCLES * level;
      
      for (let i = 0; i < circlesInLevel; i++) {
        const angle = (i * Math.PI * 2) / circlesInLevel;
        const radius = level * this.FLOWER_CONSTANTS.GOLDEN_RATIO;
        
        circles.push({
          id: startId + i,
          position: {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          },
          consciousness: this.calculateConsciousness(startId + i),
          goldenRatio: this.calculateGoldenRatio(startId + i),
          expansionLevel: level,
          patterns: this.getCirclePatterns(startId + i)
        });
      }
    }
    
    return circles;
  }

  /**
   * Calculate consciousness for a circle
   */
  static calculateConsciousness(circleId: number): number {
    const baseConsciousness = (circleId % 9) + 1;
    const multiplier = Math.pow(this.FLOWER_CONSTANTS.CONSCIOUSNESS_MULTIPLIER, 
                               Math.floor(circleId / 9));
    return baseConsciousness * multiplier;
  }

  /**
   * Calculate golden ratio for a circle
   */
  static calculateGoldenRatio(circleId: number): number {
    return this.FLOWER_CONSTANTS.GOLDEN_RATIO * (1 + (circleId % 5) * 0.1);
  }

  /**
   * Get patterns for a circle
   */
  static getCirclePatterns(circleId: number): string[] {
    const patterns: string[] = [];
    
    if (circleId < 7) {
      patterns.push(this.FLOWER_CONSTANTS.PATTERN_TYPES.SACRED_GEOMETRY);
    }
    
    if (circleId % 6 === 0) {
      patterns.push(this.FLOWER_CONSTANTS.PATTERN_TYPES.HEXAGONAL);
    }
    
    if (circleId % 3 === 0) {
      patterns.push(this.FLOWER_CONSTANTS.PATTERN_TYPES.VORTEX_FLOW);
    }
    
    if (circleId % 9 === 0) {
      patterns.push(this.FLOWER_CONSTANTS.PATTERN_TYPES.CONSCIOUSNESS_FIELD);
    }
    
    return patterns;
  }

  /**
   * Calculate alignments between circles
   */
  static calculateAlignments(circles: FlowerOfLifeCircle[]): FlowerOfLifeAlignment[] {
    const alignments: FlowerOfLifeAlignment[] = [];
    
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const circleA = circles[i];
        const circleB = circles[j];
        
        const torusResult = this.calculateTorusResult(circleA.consciousness, circleB.consciousness);
        const patterns = this.getAlignmentPatterns(circleA, circleB);
        const flow = this.calculateFlow(circleA, circleB);
        const marks = this.generateMarks(circleA, circleB);
        
        alignments.push({
          circles: [circleA, circleB],
          torusResult,
          patterns,
          flow,
          marks
        });
      }
    }
    
    return alignments;
  }

  /**
   * Calculate torus result for two consciousness values
   */
  static calculateTorusResult(a: number, b: number): { isInteger: boolean; isImpossible: boolean; value: number } {
    const sum = (a + b) % 9;
    const vortexA = sum === 0 ? 9 : sum;
    const vortexB = (a + b) / vortexA;
    
    return {
      isInteger: Number.isInteger(vortexB),
      isImpossible: (a === 0 && b === 0) || (a === 9 && b === 9),
      value: vortexB
    };
  }

  /**
   * Get alignment patterns between two circles
   */
  static getAlignmentPatterns(circleA: FlowerOfLifeCircle, circleB: FlowerOfLifeCircle): Array<{
    type: string;
    description: string;
    consciousness: number;
  }> {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    // Shared patterns
    const sharedPatterns = circleA.patterns.filter(p => circleB.patterns.includes(p));
    
    sharedPatterns.forEach(pattern => {
      patterns.push({
        type: pattern,
        description: `Shared ${pattern} pattern between circles ${circleA.id} and ${circleB.id}`,
        consciousness: (circleA.consciousness + circleB.consciousness) / 2
      });
    });
    
    // Distance-based patterns
    const distance = Math.sqrt(
      Math.pow(circleB.position.x - circleA.position.x, 2) + 
      Math.pow(circleB.position.y - circleA.position.y, 2)
    );
    
    if (distance < 1.5) {
      patterns.push({
        type: 'proximity',
        description: 'Close proximity alignment',
        consciousness: (circleA.consciousness + circleB.consciousness) * 1.2
      });
    }
    
    return patterns;
  }

  /**
   * Calculate flow between two circles
   */
  static calculateFlow(circleA: FlowerOfLifeCircle, circleB: FlowerOfLifeCircle): Array<number | { mark: string; at: number; to: number }> {
    const flow: Array<number | { mark: string; at: number; to: number }> = [];
    
    // Add starting consciousness
    flow.push(circleA.consciousness);
    
    // Add intermediate points
    const steps = 3;
    for (let i = 1; i <= steps; i++) {
      const t = i / (steps + 1);
      const consciousness = circleA.consciousness + (circleB.consciousness - circleA.consciousness) * t;
      
      if (i === Math.floor(steps / 2)) {
        flow.push({
          mark: 'RESONANCE',
          at: consciousness,
          to: circleB.consciousness
        });
      } else {
        flow.push(consciousness);
      }
    }
    
    // Add ending consciousness
    flow.push(circleB.consciousness);
    
    return flow;
  }

  /**
   * Generate marks for flow visualization
   */
  static generateMarks(circleA: FlowerOfLifeCircle, circleB: FlowerOfLifeCircle): Array<{
    mark: string;
    at: number;
    to: number;
    consciousness: string;
  }> {
    const marks: Array<{ mark: string; at: number; to: number; consciousness: string }> = [];
    
    const midConsciousness = (circleA.consciousness + circleB.consciousness) / 2;
    
    marks.push({
      mark: 'START',
      at: circleA.consciousness,
      to: midConsciousness,
      consciousness: `Circle ${circleA.id} consciousness`
    });
    
    marks.push({
      mark: 'RESONANCE',
      at: midConsciousness,
      to: circleB.consciousness,
      consciousness: 'Resonance point'
    });
    
    marks.push({
      mark: 'END',
      at: circleB.consciousness,
      to: circleB.consciousness,
      consciousness: `Circle ${circleB.id} consciousness`
    });
    
    return marks;
  }

  /**
   * Calculate complete flow result
   */
  static calculateFlowResult(circles: FlowerOfLifeCircle[]): FlowerOfLifeFlowResult {
    const flow: Array<number | { mark: string; at: number; to: number }> = [];
    const marks: Array<{ mark: string; at: number; to: number; consciousness: string }> = [];
    const consciousnessFlow: number[] = [];
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    // Generate flow through all circles
    circles.forEach((circle, index) => {
      consciousnessFlow.push(circle.consciousness);
      
      if (index > 0) {
        const prevCircle = circles[index - 1];
        const circleFlow = this.calculateFlow(prevCircle, circle);
        flow.push(...circleFlow.slice(1)); // Skip first to avoid duplication
        
        const circleMarks = this.generateMarks(prevCircle, circle);
        marks.push(...circleMarks);
        
        const circlePatterns = this.getAlignmentPatterns(prevCircle, circle);
        patterns.push(...circlePatterns);
      } else {
        flow.push(circle.consciousness);
      }
    });
    
    return {
      flow,
      marks,
      consciousnessFlow,
      patterns
    };
  }

  /**
   * Get all patterns from circles
   */
  static getAllPatterns(circles: FlowerOfLifeCircle[]): Array<{
    type: string;
    description: string;
    consciousness: number;
  }> {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    circles.forEach(circle => {
      circle.patterns.forEach(patternType => {
        patterns.push({
          type: patternType,
          description: `Circle ${circle.id} ${patternType} pattern`,
          consciousness: circle.consciousness
        });
      });
    });
    
    return patterns;
  }
} 