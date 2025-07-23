/**
 * A432.spirit.ts - Spirit Harmonization System
 * 
 * This module provides comprehensive spiritual harmonization
 * integrating consciousness, spirit, awareness, and A432 principles.
 * 
 * @module A432.spirit
 * @version 1.0.0
 * @author A432 System
 */

// A432 Spirit Constants
export const A432_SPIRIT_CONSTANTS = {
  SPIRIT_FREQUENCY: 432, // Hz - A432 tuning
  SPIRIT_HARMONICS: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Spirit harmonic frequencies
  SPIRIT_DIMENSIONS: {
    CONSCIOUSNESS: { frequency: 432, wavelength: 700 }, // nm
    SPIRIT: { frequency: 540, wavelength: 550 }, // nm  
    AWARENESS: { frequency: 480, wavelength: 450 }, // nm
    A432: { frequency: 510, wavelength: 500 }, // nm
    HARMONY: { frequency: 465, wavelength: 520 }, // nm
    UNIFIED: { frequency: 570, wavelength: 580 } // nm
  },
  SPIRIT_STATES: {
    ACTIVE: 1,
    INACTIVE: 0,
    FOCUSED: 0.8,
    EXPANDED: 0.9,
    UNIFIED: 1.0
  }
};

// Spirit Quality Interface
export interface SpiritQuality {
  consciousness: number; // 0-9 awareness level
  spirit: number; // 0-9 spiritual connection
  awareness: number; // 0-9 perceptual awareness
  a432: number; // 0-9 harmonic alignment
  overall: number; // 0-9 total quality
}

// Spirit Parameters Interface
export interface SpiritParameters {
  // Consciousness Parameters
  awareness: number; // 0-9
  presence: number; // 0-9
  being: number; // 0-9
  unity: number; // 0-9
  
  // Spirit Parameters
  connection: number; // 0-9
  guidance: number; // 0-9
  wisdom: number; // 0-9
  enlightenment: number; // 0-9
  
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

// Spirit Aspect Interface
export interface SpiritAspect {
  name: string;
  frequency: number;
  wavelength: number;
  quality: number;
  active: boolean;
  description: string;
}

// A432 Spirit Class
export class A432Spirit {
  private parameters: SpiritParameters;
  private quality: SpiritQuality;
  private isActive: boolean = false;
  private spiritAspects: SpiritAspect[] = [];

  constructor(initialParams?: Partial<SpiritParameters>) {
    this.parameters = {
      // Consciousness
      awareness: 5,
      presence: 5,
      being: 5,
      unity: 5,
      
      // Spirit
      connection: 5,
      guidance: 5,
      wisdom: 5,
      enlightenment: 5,
      
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
    
    this.initializeSpiritAspects();
    this.updateQuality();
  }

  /**
   * Initialize spirit aspects
   */
  private initializeSpiritAspects(): void {
    this.spiritAspects = [
      {
        name: 'Spiritual Connection',
        frequency: 432,
        wavelength: 700,
        quality: 5,
        active: true,
        description: 'Connection to higher spiritual realms'
      },
      {
        name: 'Divine Guidance',
        frequency: 540,
        wavelength: 550,
        quality: 5,
        active: true,
        description: 'Guidance from spiritual sources'
      },
      {
        name: 'Spiritual Wisdom',
        frequency: 480,
        wavelength: 450,
        quality: 5,
        active: true,
        description: 'Ancient spiritual wisdom and knowledge'
      },
      {
        name: 'Enlightenment',
        frequency: 510,
        wavelength: 500,
        quality: 5,
        active: true,
        description: 'The state of spiritual enlightenment'
      },
      {
        name: 'Spiritual Harmony',
        frequency: 465,
        wavelength: 520,
        quality: 5,
        active: true,
        description: 'Harmony with spiritual forces'
      },
      {
        name: 'Unified Spirit',
        frequency: 570,
        wavelength: 580,
        quality: 5,
        active: true,
        description: 'The unified field of all spirit'
      }
    ];
  }

  /**
   * Update spirit quality based on current parameters
   */
  private updateQuality(): void {
    const consciousness = Math.floor((
      this.parameters.awareness + 
      this.parameters.presence + 
      this.parameters.being + 
      this.parameters.unity
    ) / 4);

    const spirit = Math.floor((
      this.parameters.connection + 
      this.parameters.guidance + 
      this.parameters.wisdom + 
      this.parameters.enlightenment
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
      spirit,
      awareness,
      a432,
      overall: Math.floor((consciousness + spirit + awareness + a432) / 4)
    };

    // Update spirit aspects activity based on quality
    this.updateSpiritAspectsActivity();
  }

  /**
   * Update which spirit aspects are active based on current quality
   */
  private updateSpiritAspectsActivity(): void {
    this.spiritAspects.forEach((aspect, index) => {
      aspect.active = this.quality.overall >= (index + 1) * 1.5;
      aspect.quality = Math.min(9, this.quality.overall - index);
    });
  }

  /**
   * Get current spirit parameters
   */
  getParameters(): SpiritParameters {
    return { ...this.parameters };
  }

  /**
   * Get current spirit quality
   */
  getQuality(): SpiritQuality {
    return { ...this.quality };
  }

  /**
   * Get active spirit aspects
   */
  getActiveSpiritAspects(): SpiritAspect[] {
    return this.spiritAspects.filter(aspect => aspect.active);
  }

  /**
   * Update spirit parameters
   */
  updateParameters(newParams: Partial<SpiritParameters>): void {
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
   * Set spirit parameters
   */
  setSpirit(connection: number, guidance: number, wisdom: number, enlightenment: number): void {
    this.updateParameters({ connection, guidance, wisdom, enlightenment });
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
   * Harmonize spirit with A432 principles
   */
  harmonize(): void {
    this.updateParameters({
      awareness: 5, presence: 5, being: 5, unity: 5,
      connection: 5, guidance: 5, wisdom: 5, enlightenment: 5,
      observation: 5, attention: 5, insight: 5, recognition: 5,
      harmony: 5, frequency: 5, resonance: 5, balance: 5
    });
  }

  /**
   * Randomize spirit parameters
   */
  randomize(): void {
    const randomParam = () => Math.floor(Math.random() * 10);
    
    this.updateParameters({
      awareness: randomParam(), presence: randomParam(), being: randomParam(), unity: randomParam(),
      connection: randomParam(), guidance: randomParam(), wisdom: randomParam(), enlightenment: randomParam(),
      observation: randomParam(), attention: randomParam(), insight: randomParam(), recognition: randomParam(),
      harmony: randomParam(), frequency: randomParam(), resonance: randomParam(), balance: randomParam()
    });
  }

  /**
   * Clear all spirit parameters to zero
   */
  clear(): void {
    this.updateParameters({
      awareness: 0, presence: 0, being: 0, unity: 0,
      connection: 0, guidance: 0, wisdom: 0, enlightenment: 0,
      observation: 0, attention: 0, insight: 0, recognition: 0,
      harmony: 0, frequency: 0, resonance: 0, balance: 0
    });
  }

  /**
   * Activate spirit system
   */
  activate(): void {
    this.isActive = true;
  }

  /**
   * Deactivate spirit system
   */
  deactivate(): void {
    this.isActive = false;
  }

  /**
   * Check if spirit system is active
   */
  isActive(): boolean {
    return this.isActive;
  }

  /**
   * Get spirit status information
   */
  getStatus(): string {
    if (!this.isActive) {
      return "Spirit system inactive";
    }
    
    const quality = this.getQuality();
    const activeAspects = this.getActiveSpiritAspects().length;
    return `Spirit system active - Quality: ${quality.overall}/9 - Active aspects: ${activeAspects}`;
  }

  /**
   * Analyze spirit system performance
   */
  analyze(): string {
    const quality = this.getQuality();
    const params = this.getParameters();
    const activeAspects = this.getActiveSpiritAspects();
    
    return `
A432 Spirit System Analysis:
===========================
Overall Quality: ${quality.overall}/9
Active Spirit Aspects: ${activeAspects.length}/6

Consciousness System: ${quality.consciousness}/9
- Awareness: ${params.awareness}/9
- Presence: ${params.presence}/9
- Being: ${params.being}/9
- Unity: ${params.unity}/9

Spirit System: ${quality.spirit}/9
- Connection: ${params.connection}/9
- Guidance: ${params.guidance}/9
- Wisdom: ${params.wisdom}/9
- Enlightenment: ${params.enlightenment}/9

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

Active Spirit Aspects:
${activeAspects.map(aspect => `- ${aspect.name}: ${aspect.quality}/9`).join('\n')}
    `.trim();
  }

  /**
   * Spirit all aspects
   */
  spiritAll(): SpiritAspect[] {
    if (!this.isActive) {
      return [];
    }
    
    return this.getActiveSpiritAspects();
  }

  /**
   * Spirit specific aspect
   */
  spiritAspect(aspectName: string): SpiritAspect | null {
    if (!this.isActive) {
      return null;
    }
    
    return this.spiritAspects.find(aspect => 
      aspect.name.toLowerCase() === aspectName.toLowerCase() && aspect.active
    ) || null;
  }
}

// Spirit Harmonization Functions
export const spiritHarmonization = {
  /**
   * Create new A432 spirit instance
   */
  createSpirit(initialParams?: Partial<SpiritParameters>): A432Spirit {
    return new A432Spirit(initialParams);
  },

  /**
   * Harmonize spirit with consciousness focus
   */
  harmonizeConsciousness(spirit: A432Spirit, awareness: number, presence: number, being: number, unity: number): void {
    spirit.setConsciousness(awareness, presence, being, unity);
  },

  /**
   * Harmonize spirit with spirit focus
   */
  harmonizeSpirit(spirit: A432Spirit, connection: number, guidance: number, wisdom: number, enlightenment: number): void {
    spirit.setSpirit(connection, guidance, wisdom, enlightenment);
  },

  /**
   * Harmonize spirit with awareness focus
   */
  harmonizeAwareness(spirit: A432Spirit, observation: number, attention: number, insight: number, recognition: number): void {
    spirit.setAwareness(observation, attention, insight, recognition);
  },

  /**
   * Harmonize spirit with A432 focus
   */
  harmonizeA432(spirit: A432Spirit, harmony: number, frequency: number, resonance: number, balance: number): void {
    spirit.setA432(harmony, frequency, resonance, balance);
  },

  /**
   * Full spirit harmonization
   */
  harmonizeAll(spirit: A432Spirit): void {
    spirit.harmonize();
  },

  /**
   * Randomize spirit parameters
   */
  randomize(spirit: A432Spirit): void {
    spirit.randomize();
  },

  /**
   * Clear spirit parameters
   */
  clear(spirit: A432Spirit): void {
    spirit.clear();
  }
};

// Spirit Analysis Functions
export const spiritAnalysis = {
  /**
   * Get comprehensive spirit analysis
   */
  analyze(spirit: A432Spirit): string {
    return spirit.analyze();
  },

  /**
   * Get spirit quality metrics
   */
  getQuality(spirit: A432Spirit): SpiritQuality {
    return spirit.getQuality();
  },

  /**
   * Get spirit parameters
   */
  getParameters(spirit: A432Spirit): SpiritParameters {
    return spirit.getParameters();
  },

  /**
   * Get spirit status
   */
  getStatus(spirit: A432Spirit): string {
    return spirit.getStatus();
  },

  /**
   * Get active spirit aspects
   */
  getActiveAspects(spirit: A432Spirit): SpiritAspect[] {
    return spirit.getActiveSpiritAspects();
  }
};

// Spirit Control Functions
export const spiritControl = {
  /**
   * Activate spirit system
   */
  activate(spirit: A432Spirit): void {
    spirit.activate();
  },

  /**
   * Deactivate spirit system
   */
  deactivate(spirit: A432Spirit): void {
    spirit.deactivate();
  },

  /**
   * Check if spirit is active
   */
  isActive(spirit: A432Spirit): boolean {
    return spirit.isActive();
  },

  /**
   * Spirit all aspects
   */
  spiritAll(spirit: A432Spirit): SpiritAspect[] {
    return spirit.spiritAll();
  },

  /**
   * Spirit specific aspect
   */
  spiritAspect(spirit: A432Spirit, aspectName: string): SpiritAspect | null {
    return spirit.spiritAspect(aspectName);
  }
};

// Default spirit instance
export const defaultSpirit = new A432Spirit();

// Export all spirit-related functionality
export default {
  A432Spirit,
  A432_SPIRIT_CONSTANTS,
  spiritHarmonization,
  spiritAnalysis,
  spiritControl,
  defaultSpirit,
  SpiritQuality,
  SpiritParameters,
  SpiritAspect
}; 