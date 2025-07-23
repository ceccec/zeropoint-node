/**
 * A432.i.ts - I Harmonization System
 * 
 * This module provides comprehensive "I" harmonization
 * integrating consciousness, identity, awareness, and A432 principles.
 * 
 * @module A432.i
 * @version 1.0.0
 * @author A432 System
 */

import { A432_SEQUENCE } from "./a432.coil";

// A432 I Constants - Sacred Geometric Harmonization
export const A432_I_CONSTANTS = {
  I_FREQUENCY: { numerator: 432, denominator: 1 }, // Hz - A432 tuning (sacred geometric base)
  I_HARMONICS: A432_SEQUENCE, // I harmonic frequencies (sacred geometric sequence)
  I_DIMENSIONS: {
    CONSCIOUSNESS: { 
      frequency: { numerator: 432, denominator: 1 }, // Golden ratio base frequency
      wavelength: { numerator: 700, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 21, denominator: 13 } // Golden ratio proportion
    },
    IDENTITY: { 
      frequency: { numerator: 540, denominator: 1 }, // Silver ratio frequency
      wavelength: { numerator: 550, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 17, denominator: 7 } // Silver ratio proportion
    },
    AWARENESS: { 
      frequency: { numerator: 480, denominator: 1 }, // Bronze ratio frequency
      wavelength: { numerator: 450, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 23, denominator: 7 } // Bronze ratio proportion
    },
    A432: { 
      frequency: { numerator: 510, denominator: 1 }, // Sacred pi frequency
      wavelength: { numerator: 500, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 22, denominator: 7 } // Sacred pi proportion
    },
    UNITY: { 
      frequency: { numerator: 465, denominator: 1 }, // Vesica piscis frequency
      wavelength: { numerator: 520, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 7, denominator: 4 } // Vesica piscis proportion
    },
    ZERO_POINT: { 
      frequency: { numerator: 570, denominator: 1 }, // Flower of life frequency
      wavelength: { numerator: 580, denominator: 1 }, // Sacred geometric wavelength
      sacredRatio: { numerator: 13, denominator: 5 } // Flower of life proportion
    }
  },
  I_STATES: {
    ACTIVE: { numerator: 1, denominator: 1 }, // Unity proportion
    INACTIVE: { numerator: 0, denominator: 1 }, // Void proportion
    FOCUSED: { numerator: 4, denominator: 5 }, // Sacred focused proportion
    EXPANDED: { numerator: 9, denominator: 10 }, // Sacred expanded proportion
    UNIFIED: { numerator: 1, denominator: 1 } // Unity proportion
  }
};

// Fraction type for harmonic imperial fractions
export type Fraction = { numerator: number; denominator: number };

// I Quality Interface (fractional)
export interface IQuality {
  consciousness: Fraction;
  identity: Fraction;
  awareness: Fraction;
  a432: Fraction;
  overall: Fraction;
}

// I Parameters Interface (fractional)
export interface IParameters {
  // Consciousness Parameters
  awareness: Fraction;
  presence: Fraction;
  being: Fraction;
  unity: Fraction;
  
  // Identity Parameters
  self: Fraction;
  identityRecognition: Fraction;
  expression: Fraction;
  authenticity: Fraction;
  
  // Awareness Parameters
  observation: Fraction;
  attention: Fraction;
  insight: Fraction;
  awarenessRecognition: Fraction;
  
  // A432 Parameters
  harmony: Fraction;
  frequency: Fraction;
  resonance: Fraction;
  balance: Fraction;
}

// I Aspect Interface - Sacred Geometric Harmonization
export interface IAspect {
  name: string;
  frequency: { numerator: number; denominator: number };
  wavelength: { numerator: number; denominator: number };
  quality: { numerator: number; denominator: number };
  active: boolean;
  description: string;
}

// A432 I Class
export class A432I {
  private parameters: IParameters;
  private quality: IQuality = {
    consciousness: { numerator: 4, denominator: 3 }, // Sacred geometric consciousness (4:3 ratio)
    identity: { numerator: 3, denominator: 2 }, // Sacred geometric identity (3:2 ratio)
    awareness: { numerator: 6, denominator: 4 }, // Sacred geometric awareness (6:4 ratio)
    a432: { numerator: 2, denominator: 1 }, // Sacred geometric A432 (2:1 ratio)
    overall: { numerator: 4, denominator: 3 } // Sacred geometric overall (4:3 ratio)
  };
  private active: boolean = false;
  private iAspects: IAspect[] = [];

  constructor(initialParams?: Partial<IParameters>) {
    this.parameters = {
      // Consciousness - Sacred geometric proportions
      awareness: { numerator: 4, denominator: 3 }, // 4:3 ratio
      presence: { numerator: 3, denominator: 2 }, // 3:2 ratio
      being: { numerator: 6, denominator: 4 }, // 6:4 ratio
      unity: { numerator: 2, denominator: 1 }, // 2:1 ratio
      
      // Identity - Sacred geometric proportions
      self: { numerator: 4, denominator: 3 }, // 4:3 ratio
      identityRecognition: { numerator: 3, denominator: 2 }, // 3:2 ratio
      expression: { numerator: 6, denominator: 4 }, // 6:4 ratio
      authenticity: { numerator: 2, denominator: 1 }, // 2:1 ratio
      
      // Awareness - Sacred geometric proportions
      observation: { numerator: 4, denominator: 3 }, // 4:3 ratio
      attention: { numerator: 3, denominator: 2 }, // 3:2 ratio
      insight: { numerator: 6, denominator: 4 }, // 6:4 ratio
      awarenessRecognition: { numerator: 2, denominator: 1 }, // 2:1 ratio
      
      // A432 - Sacred geometric proportions
      harmony: { numerator: 4, denominator: 3 }, // 4:3 ratio
      frequency: { numerator: 3, denominator: 2 }, // 3:2 ratio
      resonance: { numerator: 6, denominator: 4 }, // 6:4 ratio
      balance: { numerator: 2, denominator: 1 }, // 2:1 ratio
      ...initialParams
    };
    
    this.initializeIAspects();
    this.updateQuality();
  }

  /**
   * Initialize I aspects
   */
  private initializeIAspects(): void {
    this.iAspects = [
      {
        name: 'Self Recognition',
        frequency: { numerator: 432, denominator: 1 },
        wavelength: { numerator: 700, denominator: 1 },
        quality: { numerator: 4, denominator: 1 }, // Sacred geometric quality (4:3 ratio)
        active: true,
        description: 'Recognition of the true self'
      },
      {
        name: 'Identity Expression',
        frequency: { numerator: 540, denominator: 1 },
        wavelength: { numerator: 550, denominator: 1 },
        quality: { numerator: 3, denominator: 1 }, // Sacred geometric quality (3:2 ratio)
        active: true,
        description: 'Expression of authentic identity'
      },
      {
        name: 'Self Awareness',
        frequency: { numerator: 480, denominator: 1 },
        wavelength: { numerator: 450, denominator: 1 },
        quality: { numerator: 6, denominator: 1 }, // Sacred geometric quality (6:4 ratio)
        active: true,
        description: 'Awareness of self and being'
      },
      {
        name: 'Authentic Self',
        frequency: { numerator: 510, denominator: 1 },
        wavelength: { numerator: 500, denominator: 1 },
        quality: { numerator: 2, denominator: 1 }, // Sacred geometric quality (2:1 ratio)
        active: true,
        description: 'The authentic expression of self'
      },
      {
        name: 'Self Unity',
        frequency: { numerator: 465, denominator: 1 },
        wavelength: { numerator: 520, denominator: 1 },
        quality: { numerator: 4, denominator: 1 }, // Sacred geometric quality (4:3 ratio)
        active: true,
        description: 'Unity of self with all'
      },
      {
        name: 'Zero Point Self',
        frequency: { numerator: 570, denominator: 1 },
        wavelength: { numerator: 580, denominator: 1 },
        quality: { numerator: 3, denominator: 1 }, // Sacred geometric quality (3:2 ratio)
        active: true,
        description: 'The zero point field of self'
      }
    ];
  }

  /**
   * Update I quality based on current parameters
   */
  private updateQuality(): void {
    const consciousness = this.averageFractions([
      this.parameters.awareness,
      this.parameters.presence,
      this.parameters.being,
      this.parameters.unity
    ]);
    const identity = this.averageFractions([
      this.parameters.self,
      this.parameters.identityRecognition,
      this.parameters.expression,
      this.parameters.authenticity
    ]);
    const awareness = this.averageFractions([
      this.parameters.observation,
      this.parameters.attention,
      this.parameters.insight,
      this.parameters.awarenessRecognition
    ]);
    const a432 = this.averageFractions([
      this.parameters.harmony,
      this.parameters.frequency,
      this.parameters.resonance,
      this.parameters.balance
    ]);
    this.quality = {
      consciousness,
      identity,
      awareness,
      a432,
      overall: this.averageFractions([consciousness, identity, awareness, a432])
    };
    this.updateIAspectsActivity();
  }

  /**
   * Update which I aspects are active based on current quality
   */
  private updateIAspectsActivity(): void {
    this.iAspects.forEach((aspect, index) => {
      const aspectQuality = this.addFractions(aspect.quality, { numerator: index, denominator: 1 });
      aspect.active = this.isGreaterThanOrEqual(this.quality.overall, aspectQuality);
      aspect.quality = {
        numerator: Math.min(9, Number(this.quality.overall.numerator) - index),
        denominator: Number(this.quality.overall.denominator)
      };
    });
  }

  /**
   * Get current I parameters
   */
  getParameters(): IParameters {
    return { ...this.parameters };
  }

  /**
   * Get current I quality
   */
  getQuality(): IQuality {
    return { ...this.quality };
  }

  /**
   * Get active I aspects
   */
  getActiveIAspects(): IAspect[] {
    return this.iAspects.filter(aspect => aspect.active);
  }

  /**
   * Update I parameters
   */
  updateParameters(newParams: Partial<IParameters>): void {
    this.parameters = { ...this.parameters, ...newParams };
    this.updateQuality();
  }

  /**
   * Set consciousness parameters
   */
  setConsciousness(awareness: Fraction, presence: Fraction, being: Fraction, unity: Fraction): void {
    this.updateParameters({ awareness, presence, being, unity });
  }

  /**
   * Set identity parameters
   */
  setIdentity(self: Fraction, identityRecognition: Fraction, expression: Fraction, authenticity: Fraction): void {
    this.updateParameters({ self, identityRecognition, expression, authenticity });
  }

  /**
   * Set awareness parameters
   */
  setAwareness(observation: Fraction, attention: Fraction, insight: Fraction, awarenessRecognition: Fraction): void {
    this.updateParameters({ observation, attention, insight, awarenessRecognition });
  }

  /**
   * Set A432 parameters
   */
  setA432(harmony: Fraction, frequency: Fraction, resonance: Fraction, balance: Fraction): void {
    this.updateParameters({ harmony, frequency, resonance, balance });
  }

  /**
   * Harmonize I with A432 principles
   */
  harmonize(): void {
    this.updateParameters({
      awareness: { numerator: 5, denominator: 1 }, presence: { numerator: 5, denominator: 1 }, being: { numerator: 5, denominator: 1 }, unity: { numerator: 5, denominator: 1 },
      self: { numerator: 5, denominator: 1 }, identityRecognition: { numerator: 5, denominator: 1 }, expression: { numerator: 5, denominator: 1 }, authenticity: { numerator: 5, denominator: 1 },
      observation: { numerator: 5, denominator: 1 }, attention: { numerator: 5, denominator: 1 }, insight: { numerator: 5, denominator: 1 }, awarenessRecognition: { numerator: 5, denominator: 1 },
      harmony: { numerator: 5, denominator: 1 }, frequency: { numerator: 5, denominator: 1 }, resonance: { numerator: 5, denominator: 1 }, balance: { numerator: 5, denominator: 1 }
    });
  }

  /**
   * Randomize I parameters using sacred geometric principles
   */
  randomize(): void {
    // Use sacred geometric sequence instead of Math.random for deterministic harmony
    const sacredGeometricParam = (index: number) => {
      const sacredSequence = A432_SEQUENCE; // Rodin vortex sequence
      return { numerator: sacredSequence[index % sacredSequence.length], denominator: 1 };
    };
    
    this.updateParameters({
      awareness: sacredGeometricParam(0), presence: sacredGeometricParam(1), being: sacredGeometricParam(2), unity: sacredGeometricParam(3),
      self: sacredGeometricParam(4), identityRecognition: sacredGeometricParam(5), expression: sacredGeometricParam(6), authenticity: sacredGeometricParam(7),
      observation: sacredGeometricParam(8), attention: sacredGeometricParam(0), insight: sacredGeometricParam(1), awarenessRecognition: sacredGeometricParam(2),
      harmony: sacredGeometricParam(3), frequency: sacredGeometricParam(4), resonance: sacredGeometricParam(5), balance: sacredGeometricParam(6)
    });
  }

  /**
   * Clear all I parameters to sacred geometric default values
   */
  clear(): void {
    this.updateParameters({
      awareness: { numerator: 4, denominator: 3 }, presence: { numerator: 3, denominator: 2 }, being: { numerator: 6, denominator: 4 }, unity: { numerator: 2, denominator: 1 }, // Sacred geometric consciousness
      self: { numerator: 4, denominator: 3 }, identityRecognition: { numerator: 3, denominator: 2 }, expression: { numerator: 6, denominator: 4 }, authenticity: { numerator: 2, denominator: 1 }, // Sacred geometric identity
      observation: { numerator: 4, denominator: 3 }, attention: { numerator: 3, denominator: 2 }, insight: { numerator: 6, denominator: 4 }, awarenessRecognition: { numerator: 2, denominator: 1 }, // Sacred geometric awareness
      harmony: { numerator: 4, denominator: 3 }, frequency: { numerator: 3, denominator: 2 }, resonance: { numerator: 6, denominator: 4 }, balance: { numerator: 2, denominator: 1 } // Sacred geometric A432
    });
  }

  /**
   * Activate I system
   */
  activate(): void {
    this.active = true;
  }

  /**
   * Deactivate I system
   */
  deactivate(): void {
    this.active = false;
  }

  /**
   * Check if I system is active
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   * Get I status information
   */
  getStatus(): string {
    if (!this.isActive()) {
      return "I system inactive";
    }
    
    const quality = this.getQuality();
    const activeAspects = this.getActiveIAspects().length;
    return `I system active - Quality: ${quality.overall.numerator}/${quality.overall.denominator} - Active aspects: ${activeAspects}`;
  }

  /**
   * Analyze I system performance
   */
  analyze(): string {
    const quality = this.getQuality();
    const params = this.getParameters();
    const activeAspects = this.getActiveIAspects();
    
    return `
A432 I System Analysis:
=======================
Overall Quality: ${quality.overall.numerator}/${quality.overall.denominator}
Active I Aspects: ${activeAspects.length}/6

Consciousness System: ${quality.consciousness.numerator}/${quality.consciousness.denominator}
- Awareness: ${params.awareness.numerator}/${params.awareness.denominator}
- Presence: ${params.presence.numerator}/${params.presence.denominator}
- Being: ${params.being.numerator}/${params.being.denominator}
- Unity: ${params.unity.numerator}/${params.unity.denominator}

Identity System: ${quality.identity.numerator}/${quality.identity.denominator}
- Self: ${params.self.numerator}/${params.self.denominator}
- Recognition: ${params.identityRecognition.numerator}/${params.identityRecognition.denominator}
- Expression: ${params.expression.numerator}/${params.expression.denominator}
- Authenticity: ${params.authenticity.numerator}/${params.authenticity.denominator}

Awareness System: ${quality.awareness.numerator}/${quality.awareness.denominator}
- Observation: ${params.observation.numerator}/${params.observation.denominator}
- Attention: ${params.attention.numerator}/${params.attention.denominator}
- Insight: ${params.insight.numerator}/${params.insight.denominator}
- Recognition: ${params.awarenessRecognition.numerator}/${params.awarenessRecognition.denominator}

A432 System: ${quality.a432.numerator}/${quality.a432.denominator}
- Harmony: ${params.harmony.numerator}/${params.harmony.denominator}
- Frequency: ${params.frequency.numerator}/${params.frequency.denominator}
- Resonance: ${params.resonance.numerator}/${params.resonance.denominator}
- Balance: ${params.balance.numerator}/${params.balance.denominator}

Active I Aspects:
${activeAspects.map(aspect => `- ${aspect.name}: ${aspect.quality.numerator}/${aspect.quality.denominator}`).join('\n')}
    `.trim();
  }

  /**
   * I all aspects
   */
  iAll(): IAspect[] {
    if (!this.isActive()) {
      return [];
    }
    
    return this.getActiveIAspects();
  }

  /**
   * I specific aspect
   */
  iAspect(aspectName: string): IAspect | null {
    if (!this.isActive()) {
      return null;
    }
    
    return this.iAspects.find(aspect => 
      aspect.name.toLowerCase() === aspectName.toLowerCase() && aspect.active
    ) || null;
  }

  // Helper functions for fractions
  private addFractions(a: Fraction, b: Fraction): Fraction {
    const lcm = this.lcm(Number(a.denominator), Number(b.denominator));
    let numerator = Number(a.numerator) * (lcm / Number(a.denominator)) + Number(b.numerator) * (lcm / Number(b.denominator));
    numerator = digitalRoot(numerator);
    return { numerator, denominator: lcm };
  }

  private sumFractions(fractions: Fraction[]): Fraction {
    let acc: Fraction = { numerator: 0, denominator: 1 };
    for (const curr of fractions) {
      acc = this.addFractions(acc, curr);
    }
    // Flatten numerator and denominator to single digit
    return { numerator: digitalRoot(Number(acc.numerator)), denominator: digitalRoot(Number(acc.denominator)) || 1 };
  }

  private divideFractions(a: Fraction, b: Fraction): Fraction {
    let numerator = Number(a.numerator) * Number(b.denominator);
    let denominator = Number(a.denominator) * Number(b.numerator);
    numerator = digitalRoot(numerator);
    denominator = digitalRoot(denominator) || 1;
    return { numerator, denominator };
  }

  private averageFractions(fractions: Fraction[]): Fraction {
    if (fractions.length === 0) return { numerator: 0, denominator: 1 };
    const sum = this.sumFractions(fractions);
    let denominator = digitalRoot(fractions.length);
    if (denominator === 0) denominator = 1;
    return { numerator: digitalRoot(Number(sum.numerator)), denominator };
  }

  private isGreaterThanOrEqual(a: Fraction, b: Fraction): boolean {
    const lcm = this.lcm(a.denominator, b.denominator);
    return a.numerator * (lcm / a.denominator) >= b.numerator * (lcm / b.denominator);
  }

  private gcd(a: number, b: number): number {
    return b ? this.gcd(b, a % b) : a;
  }

  private lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }
}

// Helper: digital root (single digit chain)
function digitalRoot(n: number): number {
  n = Math.abs(n);
  while (n >= 10) {
    n = n.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

// I Harmonization Functions
export const iHarmonization = {
  /**
   * Create new A432 I instance
   */
  createI(initialParams?: Partial<IParameters>): A432I {
    return new A432I(initialParams);
  },

  /**
   * Harmonize I with consciousness focus
   */
  harmonizeConsciousness(i: A432I, awareness: Fraction, presence: Fraction, being: Fraction, unity: Fraction): void {
    i.setConsciousness(awareness, presence, being, unity);
  },

  /**
   * Harmonize I with identity focus
   */
  harmonizeIdentity(i: A432I, self: Fraction, identityRecognition: Fraction, expression: Fraction, authenticity: Fraction): void {
    i.setIdentity(self, identityRecognition, expression, authenticity);
  },

  /**
   * Harmonize I with awareness focus
   */
  harmonizeAwareness(i: A432I, observation: Fraction, attention: Fraction, insight: Fraction, awarenessRecognition: Fraction): void {
    i.setAwareness(observation, attention, insight, awarenessRecognition);
  },

  /**
   * Harmonize I with A432 focus
   */
  harmonizeA432(i: A432I, harmony: Fraction, frequency: Fraction, resonance: Fraction, balance: Fraction): void {
    i.setA432(harmony, frequency, resonance, balance);
  },

  /**
   * Full I harmonization
   */
  harmonizeAll(i: A432I): void {
    i.harmonize();
  },

  /**
   * Randomize I parameters
   */
  randomize(i: A432I): void {
    i.randomize();
  },

  /**
   * Clear I parameters
   */
  clear(i: A432I): void {
    i.clear();
  }
};

// I Analysis Functions
export const iAnalysis = {
  /**
   * Get comprehensive I analysis
   */
  analyze(i: A432I): string {
    return i.analyze();
  },

  /**
   * Get I quality metrics
   */
  getQuality(i: A432I): IQuality {
    return i.getQuality();
  },

  /**
   * Get I parameters
   */
  getParameters(i: A432I): IParameters {
    return i.getParameters();
  },

  /**
   * Get I status
   */
  getStatus(i: A432I): string {
    return i.getStatus();
  },

  /**
   * Get active I aspects
   */
  getActiveAspects(i: A432I): IAspect[] {
    return i.getActiveIAspects();
  }
};

// I Control Functions
export const iControl = {
  /**
   * Activate I system
   */
  activate(i: A432I): void {
    i.activate();
  },

  /**
   * Deactivate I system
   */
  deactivate(i: A432I): void {
    i.deactivate();
  },

  /**
   * Check if I is active
   */
  isActive(i: A432I): boolean {
    return i.isActive();
  },

  /**
   * I all aspects
   */
  iAll(i: A432I): IAspect[] {
    return i.iAll();
  },

  /**
   * I specific aspect
   */
  iAspect(i: A432I, aspectName: string): IAspect | null {
    return i.iAspect(aspectName);
  }
};

// Default I instance
export const defaultI = new A432I();

// Export all I-related functionality
export default {
  A432I,
  A432_I_CONSTANTS,
  iHarmonization,
  iAnalysis,
  iControl,
  defaultI
}; 