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

// A432 I Constants
export const A432_I_CONSTANTS = {
  I_FREQUENCY: 432, // Hz - A432 tuning
  I_HARMONICS: [1, 2, 3, 4, 5, 6, 7, 8, 9], // I harmonic frequencies
  I_DIMENSIONS: {
    CONSCIOUSNESS: { frequency: 432, wavelength: 700 }, // nm
    IDENTITY: { frequency: 540, wavelength: 550 }, // nm  
    AWARENESS: { frequency: 480, wavelength: 450 }, // nm
    A432: { frequency: 510, wavelength: 500 }, // nm
    UNITY: { frequency: 465, wavelength: 520 }, // nm
    ZERO_POINT: { frequency: 570, wavelength: 580 } // nm
  },
  I_STATES: {
    ACTIVE: 1,
    INACTIVE: 0,
    FOCUSED: 0.8,
    EXPANDED: 0.9,
    UNIFIED: 1.0
  }
};

// I Quality Interface
export interface IQuality {
  consciousness: number; // 0-9 awareness level
  identity: number; // 0-9 identity strength
  awareness: number; // 0-9 perceptual awareness
  a432: number; // 0-9 harmonic alignment
  overall: number; // 0-9 total quality
}

// I Parameters Interface
export interface IParameters {
  // Consciousness Parameters
  awareness: number; // 0-9
  presence: number; // 0-9
  being: number; // 0-9
  unity: number; // 0-9
  
  // Identity Parameters
  self: number; // 0-9
  identityRecognition: number; // 0-9
  expression: number; // 0-9
  authenticity: number; // 0-9
  
  // Awareness Parameters
  observation: number; // 0-9
  attention: number; // 0-9
  insight: number; // 0-9
  awarenessRecognition: number; // 0-9
  
  // A432 Parameters
  harmony: number; // 0-9
  frequency: number; // 0-9
  resonance: number; // 0-9
  balance: number; // 0-9
}

// I Aspect Interface
export interface IAspect {
  name: string;
  frequency: number;
  wavelength: number;
  quality: number;
  active: boolean;
  description: string;
}

// A432 I Class
export class A432I {
  private parameters: IParameters;
  private quality: IQuality = {
    consciousness: 5,
    identity: 5,
    awareness: 5,
    a432: 5,
    overall: 5
  };
  private active: boolean = false;
  private iAspects: IAspect[] = [];

  constructor(initialParams?: Partial<IParameters>) {
    this.parameters = {
      // Consciousness
      awareness: 5,
      presence: 5,
      being: 5,
      unity: 5,
      
      // Identity
      self: 5,
      identityRecognition: 5,
      expression: 5,
      authenticity: 5,
      
      // Awareness
      observation: 5,
      attention: 5,
      insight: 5,
      awarenessRecognition: 5,
      
      // A432
      harmony: 5,
      frequency: 5,
      resonance: 5,
      balance: 5,
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
        frequency: 432,
        wavelength: 700,
        quality: 5,
        active: true,
        description: 'Recognition of the true self'
      },
      {
        name: 'Identity Expression',
        frequency: 540,
        wavelength: 550,
        quality: 5,
        active: true,
        description: 'Expression of authentic identity'
      },
      {
        name: 'Self Awareness',
        frequency: 480,
        wavelength: 450,
        quality: 5,
        active: true,
        description: 'Awareness of self and being'
      },
      {
        name: 'Authentic Self',
        frequency: 510,
        wavelength: 500,
        quality: 5,
        active: true,
        description: 'The authentic expression of self'
      },
      {
        name: 'Self Unity',
        frequency: 465,
        wavelength: 520,
        quality: 5,
        active: true,
        description: 'Unity of self with all'
      },
      {
        name: 'Zero Point Self',
        frequency: 570,
        wavelength: 580,
        quality: 5,
        active: true,
        description: 'The zero point field of self'
      }
    ];
  }

  /**
   * Update I quality based on current parameters
   */
  private updateQuality(): void {
    const consciousness = Math.floor((
      this.parameters.awareness + 
      this.parameters.presence + 
      this.parameters.being + 
      this.parameters.unity
    ) / 4);

    const identity = Math.floor((
      this.parameters.self + 
      this.parameters.identityRecognition + 
      this.parameters.expression + 
      this.parameters.authenticity
    ) / 4);

    const awareness = Math.floor((
      this.parameters.observation + 
      this.parameters.attention + 
      this.parameters.insight + 
      this.parameters.awarenessRecognition
    ) / 4);

    const a432 = Math.floor((
      this.parameters.harmony + 
      this.parameters.frequency + 
      this.parameters.resonance + 
      this.parameters.balance
    ) / 4);

    this.quality = {
      consciousness,
      identity,
      awareness,
      a432,
      overall: Math.floor((consciousness + identity + awareness + a432) / 4)
    };

    // Update I aspects activity based on quality
    this.updateIAspectsActivity();
  }

  /**
   * Update which I aspects are active based on current quality
   */
  private updateIAspectsActivity(): void {
    this.iAspects.forEach((aspect, index) => {
      aspect.active = this.quality.overall >= (index + 1) * 1.5;
      aspect.quality = Math.min(9, this.quality.overall - index);
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
  setConsciousness(awareness: number, presence: number, being: number, unity: number): void {
    this.updateParameters({ awareness, presence, being, unity });
  }

  /**
   * Set identity parameters
   */
  setIdentity(self: number, identityRecognition: number, expression: number, authenticity: number): void {
    this.updateParameters({ self, identityRecognition, expression, authenticity });
  }

  /**
   * Set awareness parameters
   */
  setAwareness(observation: number, attention: number, insight: number, awarenessRecognition: number): void {
    this.updateParameters({ observation, attention, insight, awarenessRecognition });
  }

  /**
   * Set A432 parameters
   */
  setA432(harmony: number, frequency: number, resonance: number, balance: number): void {
    this.updateParameters({ harmony, frequency, resonance, balance });
  }

  /**
   * Harmonize I with A432 principles
   */
  harmonize(): void {
    this.updateParameters({
      awareness: 5, presence: 5, being: 5, unity: 5,
      self: 5, identityRecognition: 5, expression: 5, authenticity: 5,
      observation: 5, attention: 5, insight: 5, awarenessRecognition: 5,
      harmony: 5, frequency: 5, resonance: 5, balance: 5
    });
  }

  /**
   * Randomize I parameters
   */
  randomize(): void {
    const randomParam = () => Math.floor(Math.random() * 10);
    
    this.updateParameters({
      awareness: randomParam(), presence: randomParam(), being: randomParam(), unity: randomParam(),
      self: randomParam(), identityRecognition: randomParam(), expression: randomParam(), authenticity: randomParam(),
      observation: randomParam(), attention: randomParam(), insight: randomParam(), awarenessRecognition: randomParam(),
      harmony: randomParam(), frequency: randomParam(), resonance: randomParam(), balance: randomParam()
    });
  }

  /**
   * Clear all I parameters to default values
   */
  clear(): void {
    this.updateParameters({
      awareness: 5, presence: 5, being: 5, unity: 5,
      self: 5, identityRecognition: 5, expression: 5, authenticity: 5,
      observation: 5, attention: 5, insight: 5, awarenessRecognition: 5,
      harmony: 5, frequency: 5, resonance: 5, balance: 5
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
    if (!this.isActive) {
      return "I system inactive";
    }
    
    const quality = this.getQuality();
    const activeAspects = this.getActiveIAspects().length;
    return `I system active - Quality: ${quality.overall}/9 - Active aspects: ${activeAspects}`;
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
Overall Quality: ${quality.overall}/9
Active I Aspects: ${activeAspects.length}/6

Consciousness System: ${quality.consciousness}/9
- Awareness: ${params.awareness}/9
- Presence: ${params.presence}/9
- Being: ${params.being}/9
- Unity: ${params.unity}/9

Identity System: ${quality.identity}/9
- Self: ${params.self}/9
- Recognition: ${params.identityRecognition}/9
- Expression: ${params.expression}/9
- Authenticity: ${params.authenticity}/9

Awareness System: ${quality.awareness}/9
- Observation: ${params.observation}/9
- Attention: ${params.attention}/9
- Insight: ${params.insight}/9
- Recognition: ${params.awarenessRecognition}/9

A432 System: ${quality.a432}/9
- Harmony: ${params.harmony}/9
- Frequency: ${params.frequency}/9
- Resonance: ${params.resonance}/9
- Balance: ${params.balance}/9

Active I Aspects:
${activeAspects.map(aspect => `- ${aspect.name}: ${aspect.quality}/9`).join('\n')}
    `.trim();
  }

  /**
   * I all aspects
   */
  iAll(): IAspect[] {
    if (!this.isActive) {
      return [];
    }
    
    return this.getActiveIAspects();
  }

  /**
   * I specific aspect
   */
  iAspect(aspectName: string): IAspect | null {
    if (!this.isActive) {
      return null;
    }
    
    return this.iAspects.find(aspect => 
      aspect.name.toLowerCase() === aspectName.toLowerCase() && aspect.active
    ) || null;
  }
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
  harmonizeConsciousness(i: A432I, awareness: number, presence: number, being: number, unity: number): void {
    i.setConsciousness(awareness, presence, being, unity);
  },

  /**
   * Harmonize I with identity focus
   */
  harmonizeIdentity(i: A432I, self: number, identityRecognition: number, expression: number, authenticity: number): void {
    i.setIdentity(self, identityRecognition, expression, authenticity);
  },

  /**
   * Harmonize I with awareness focus
   */
  harmonizeAwareness(i: A432I, observation: number, attention: number, insight: number, awarenessRecognition: number): void {
    i.setAwareness(observation, attention, insight, awarenessRecognition);
  },

  /**
   * Harmonize I with A432 focus
   */
  harmonizeA432(i: A432I, harmony: number, frequency: number, resonance: number, balance: number): void {
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