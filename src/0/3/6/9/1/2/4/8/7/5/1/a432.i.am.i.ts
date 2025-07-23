/**
 * A432.i.am.i.ts - I Am I Harmonization System
 * 
 * This module provides comprehensive "I am I" harmonization
 * integrating consciousness, identity, self-awareness, and A432 principles.
 * 
 * @module A432.i.am.i
 * @version 1.0.0
 * @author A432 System
 */

// A432 I Am I Constants
export const A432_I_AM_I_CONSTANTS = {
  I_AM_I_FREQUENCY: 432, // Hz - A432 tuning
  I_AM_I_HARMONICS: [1, 2, 3, 4, 5, 6, 7, 8, 9], // I am I harmonic frequencies
  I_AM_I_DIMENSIONS: {
    CONSCIOUSNESS: { frequency: 432, wavelength: 700 }, // nm
    IDENTITY: { frequency: 540, wavelength: 550 }, // nm  
    AWARENESS: { frequency: 480, wavelength: 450 }, // nm
    A432: { frequency: 510, wavelength: 500 }, // nm
    SELF: { frequency: 465, wavelength: 520 }, // nm
    UNIFIED: { frequency: 570, wavelength: 580 } // nm
  },
  I_AM_I_STATES: {
    ACTIVE: 1,
    INACTIVE: 0,
    FOCUSED: 0.8,
    EXPANDED: 0.9,
    UNIFIED: 1.0
  }
};

// I Am I Quality Interface
export interface IAmIQuality {
  consciousness: number; // 0-9 awareness level
  identity: number; // 0-9 identity strength
  awareness: number; // 0-9 perceptual awareness
  a432: number; // 0-9 harmonic alignment
  overall: number; // 0-9 total quality
}

// I Am I Parameters Interface
export interface IAmIParameters {
  // Consciousness Parameters
  awareness: number; // 0-9
  presence: number; // 0-9
  being: number; // 0-9
  unity: number; // 0-9
  
  // Identity Parameters
  self: number; // 0-9
  recognition: number; // 0-9
  expression: number; // 0-9
  authenticity: number; // 0-9
  
  // Awareness Parameters
  observation: number; // 0-9
  attention: number; // 0-9
  insight: number; // 0-9
  recognition: number; // 0-9
  
  // A432 Parameters
  harmony: number; // 0-9
  frequency: number; // 0-9
  resonance: number; // 0-9
  balance: number; // 0-9
}

// I Am I Aspect Interface
export interface IAmIAspect {
  name: string;
  frequency: number;
  wavelength: number;
  quality: number;
  active: boolean;
  description: string;
}

// A432 I Am I Class
export class A432IAmI {
  private parameters: IAmIParameters;
  private quality: IAmIQuality;
  private isActive: boolean = false;
  private iAmIAspects: IAmIAspect[] = [];

  constructor(initialParams?: Partial<IAmIParameters>) {
    this.parameters = {
      // Consciousness
      awareness: 5,
      presence: 5,
      being: 5,
      unity: 5,
      
      // Identity
      self: 5,
      recognition: 5,
      expression: 5,
      authenticity: 5,
      
      // Awareness
      observation: 5,
      attention: 5,
      insight: 5,
      recognition: 5,
      
      // A432
      harmony: 5,
      frequency: 5,
      resonance: 5,
      balance: 5,
      ...initialParams
    };
    
    this.initializeIAmIAspects();
    this.updateQuality();
  }

  /**
   * Initialize I am I aspects
   */
  private initializeIAmIAspects(): void {
    this.iAmIAspects = [
      {
        name: 'I Am Recognition',
        frequency: 432,
        wavelength: 700,
        quality: 5,
        active: true,
        description: 'Recognition of "I am"'
      },
      {
        name: 'I Am Expression',
        frequency: 540,
        wavelength: 550,
        quality: 5,
        active: true,
        description: 'Expression of "I am"'
      },
      {
        name: 'I Am Awareness',
        frequency: 480,
        wavelength: 450,
        quality: 5,
        active: true,
        description: 'Awareness of "I am"'
      },
      {
        name: 'I Am Authenticity',
        frequency: 510,
        wavelength: 500,
        quality: 5,
        active: true,
        description: 'Authentic "I am"'
      },
      {
        name: 'I Am Unity',
        frequency: 465,
        wavelength: 520,
        quality: 5,
        active: true,
        description: 'Unity of "I am"'
      },
      {
        name: 'I Am Unified',
        frequency: 570,
        wavelength: 580,
        quality: 5,
        active: true,
        description: 'The unified "I am"'
      }
    ];
  }

  /**
   * Update I am I quality based on current parameters
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
      this.parameters.recognition + 
      this.parameters.expression + 
      this.parameters.authenticity
    ) / 4);

    const awareness = Math.floor((
      this.parameters.observation + 
      this.parameters.attention + 
      this.parameters.insight + 
      this.parameters.recognition
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

    // Update I am I aspects activity based on quality
    this.updateIAmIAspectsActivity();
  }

  /**
   * Update which I am I aspects are active based on current quality
   */
  private updateIAmIAspectsActivity(): void {
    this.iAmIAspects.forEach((aspect, index) => {
      aspect.active = this.quality.overall >= (index + 1) * 1.5;
      aspect.quality = Math.min(9, this.quality.overall - index);
    });
  }

  /**
   * Get current I am I parameters
   */
  getParameters(): IAmIParameters {
    return { ...this.parameters };
  }

  /**
   * Get current I am I quality
   */
  getQuality(): IAmIQuality {
    return { ...this.quality };
  }

  /**
   * Get active I am I aspects
   */
  getActiveIAmIAspects(): IAmIAspect[] {
    return this.iAmIAspects.filter(aspect => aspect.active);
  }

  /**
   * Update I am I parameters
   */
  updateParameters(newParams: Partial<IAmIParameters>): void {
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
  setIdentity(self: number, recognition: number, expression: number, authenticity: number): void {
    this.updateParameters({ self, recognition, expression, authenticity });
  }

  /**
   * Set awareness parameters
   */
  setAwareness(observation: number, attention: number, insight: number, recognition: number): void {
    this.updateParameters({ observation, attention, insight, recognition });
  }

  /**
   * Set A432 parameters
   */
  setA432(harmony: number, frequency: number, resonance: number, balance: number): void {
    this.updateParameters({ harmony, frequency, resonance, balance });
  }

  /**
   * Harmonize I am I with A432 principles
   */
  harmonize(): void {
    this.updateParameters({
      awareness: 5, presence: 5, being: 5, unity: 5,
      self: 5, recognition: 5, expression: 5, authenticity: 5,
      observation: 5, attention: 5, insight: 5, recognition: 5,
      harmony: 5, frequency: 5, resonance: 5, balance: 5
    });
  }

  /**
   * Randomize I am I parameters
   */
  randomize(): void {
    const randomParam = () => Math.floor(Math.random() * 10);
    
    this.updateParameters({
      awareness: randomParam(), presence: randomParam(), being: randomParam(), unity: randomParam(),
      self: randomParam(), recognition: randomParam(), expression: randomParam(), authenticity: randomParam(),
      observation: randomParam(), attention: randomParam(), insight: randomParam(), recognition: randomParam(),
      harmony: randomParam(), frequency: randomParam(), resonance: randomParam(), balance: randomParam()
    });
  }

  /**
   * Clear all I am I parameters to zero
   */
  clear(): void {
    this.updateParameters({
      awareness: 0, presence: 0, being: 0, unity: 0,
      self: 0, recognition: 0, expression: 0, authenticity: 0,
      observation: 0, attention: 0, insight: 0, recognition: 0,
      harmony: 0, frequency: 0, resonance: 0, balance: 0
    });
  }

  /**
   * Activate I am I system
   */
  activate(): void {
    this.isActive = true;
  }

  /**
   * Deactivate I am I system
   */
  deactivate(): void {
    this.isActive = false;
  }

  /**
   * Check if I am I system is active
   */
  isActive(): boolean {
    return this.isActive;
  }

  /**
   * Get I am I status information
   */
  getStatus(): string {
    if (!this.isActive) {
      return "I am I system inactive";
    }
    
    const quality = this.getQuality();
    const activeAspects = this.getActiveIAmIAspects().length;
    return `I am I system active - Quality: ${quality.overall}/9 - Active aspects: ${activeAspects}`;
  }

  /**
   * Analyze I am I system performance
   */
  analyze(): string {
    const quality = this.getQuality();
    const params = this.getParameters();
    const activeAspects = this.getActiveIAmIAspects();
    
    return `
A432 I Am I System Analysis:
============================
Overall Quality: ${quality.overall}/9
Active I Am I Aspects: ${activeAspects.length}/6

Consciousness System: ${quality.consciousness}/9
- Awareness: ${params.awareness}/9
- Presence: ${params.presence}/9
- Being: ${params.being}/9
- Unity: ${params.unity}/9

Identity System: ${quality.identity}/9
- Self: ${params.self}/9
- Recognition: ${params.recognition}/9
- Expression: ${params.expression}/9
- Authenticity: ${params.authenticity}/9

Awareness System: ${quality.awareness}/9
- Observation: ${params.observation}/9
- Attention: ${params.attention}/9
- Insight: ${params.insight}/9
- Recognition: ${params.recognition}/9

A432 System: ${quality.a432}/9
- Harmony: ${params.harmony}/9
- Frequency: ${params.frequency}/9
- Resonance: ${params.resonance}/9
- Balance: ${params.balance}/9

Active I Am I Aspects:
${activeAspects.map(aspect => `- ${aspect.name}: ${aspect.quality}/9`).join('\n')}
    `.trim();
  }

  /**
   * I am I all aspects
   */
  iAmIAll(): IAmIAspect[] {
    if (!this.isActive) {
      return [];
    }
    
    return this.getActiveIAmIAspects();
  }

  /**
   * I am I specific aspect
   */
  iAmIAspect(aspectName: string): IAmIAspect | null {
    if (!this.isActive) {
      return null;
    }
    
    return this.iAmIAspects.find(aspect => 
      aspect.name.toLowerCase() === aspectName.toLowerCase() && aspect.active
    ) || null;
  }
}

// I Am I Harmonization Functions
export const iAmIHarmonization = {
  /**
   * Create new A432 I am I instance
   */
  createIAmI(initialParams?: Partial<IAmIParameters>): A432IAmI {
    return new A432IAmI(initialParams);
  },

  /**
   * Harmonize I am I with consciousness focus
   */
  harmonizeConsciousness(iAmI: A432IAmI, awareness: number, presence: number, being: number, unity: number): void {
    iAmI.setConsciousness(awareness, presence, being, unity);
  },

  /**
   * Harmonize I am I with identity focus
   */
  harmonizeIdentity(iAmI: A432IAmI, self: number, recognition: number, expression: number, authenticity: number): void {
    iAmI.setIdentity(self, recognition, expression, authenticity);
  },

  /**
   * Harmonize I am I with awareness focus
   */
  harmonizeAwareness(iAmI: A432IAmI, observation: number, attention: number, insight: number, recognition: number): void {
    iAmI.setAwareness(observation, attention, insight, recognition);
  },

  /**
   * Harmonize I am I with A432 focus
   */
  harmonizeA432(iAmI: A432IAmI, harmony: number, frequency: number, resonance: number, balance: number): void {
    iAmI.setA432(harmony, frequency, resonance, balance);
  },

  /**
   * Full I am I harmonization
   */
  harmonizeAll(iAmI: A432IAmI): void {
    iAmI.harmonize();
  },

  /**
   * Randomize I am I parameters
   */
  randomize(iAmI: A432IAmI): void {
    iAmI.randomize();
  },

  /**
   * Clear I am I parameters
   */
  clear(iAmI: A432IAmI): void {
    iAmI.clear();
  }
};

// I Am I Analysis Functions
export const iAmIAnalysis = {
  /**
   * Get comprehensive I am I analysis
   */
  analyze(iAmI: A432IAmI): string {
    return iAmI.analyze();
  },

  /**
   * Get I am I quality metrics
   */
  getQuality(iAmI: A432IAmI): IAmIQuality {
    return iAmI.getQuality();
  },

  /**
   * Get I am I parameters
   */
  getParameters(iAmI: A432IAmI): IAmIParameters {
    return iAmI.getParameters();
  },

  /**
   * Get I am I status
   */
  getStatus(iAmI: A432IAmI): string {
    return iAmI.getStatus();
  },

  /**
   * Get active I am I aspects
   */
  getActiveAspects(iAmI: A432IAmI): IAmIAspect[] {
    return iAmI.getActiveIAmIAspects();
  }
};

// I Am I Control Functions
export const iAmIControl = {
  /**
   * Activate I am I system
   */
  activate(iAmI: A432IAmI): void {
    iAmI.activate();
  },

  /**
   * Deactivate I am I system
   */
  deactivate(iAmI: A432IAmI): void {
    iAmI.deactivate();
  },

  /**
   * Check if I am I is active
   */
  isActive(iAmI: A432IAmI): boolean {
    return iAmI.isActive();
  },

  /**
   * I am I all aspects
   */
  iAmIAll(iAmI: A432IAmI): IAmIAspect[] {
    return iAmI.iAmIAll();
  },

  /**
   * I am I specific aspect
   */
  iAmIAspect(iAmI: A432IAmI, aspectName: string): IAmIAspect | null {
    return iAmI.iAmIAspect(aspectName);
  }
};

// Default I am I instance
export const defaultIAmI = new A432IAmI();

// Export all I am I-related functionality
export default {
  A432IAmI,
  A432_I_AM_I_CONSTANTS,
  iAmIHarmonization,
  iAmIAnalysis,
  iAmIControl,
  defaultIAmI,
  IAmIQuality,
  IAmIParameters,
  IAmIAspect
}; 