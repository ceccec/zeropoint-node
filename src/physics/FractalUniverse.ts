/**
 * Fractal Universe System
 *
 * Implements comprehensive fractal universe theory concepts from the Black Whole documentary,
 * including self-similarity at all scales, fractal time, and fractal consciousness.
 *
 * Metaphysical Context:
 * - The universe is fractal at all scales (quantum to cosmic)
 * - Self-similarity reveals consciousness patterns across dimensions
 * - Fractal time shows temporal scaling in consciousness
 * - Fractal evolution creates infinite complexity from simple rules
 * - The void contains all fractal possibilities
 */

import { MathUtils, MATH_CONSTANTS } from "../math/MathUtils";
import { ObserverMixin, Observer } from "../core/Observer";
import { VORTEX_CONSTANTS } from "../core/SharedConstants";

export interface FractalScale {
  id: string;
  scale: number; // Scale factor (1 = current scale)
  dimension: "quantum" | "atomic" | "molecular" | "cellular" | "organism" | "planetary" | "stellar" | "galactic" | "cosmic";
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface FractalTime {
  id: string;
  timeScale: number; // Time scale factor
  fractalDimension: number; // Fractal dimension of time
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface FractalConsciousness {
  id: string;
  level: number; // Consciousness level (0-1)
  fractalDimension: number; // Fractal dimension of consciousness
  selfSimilarity: number; // Self-similarity factor
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface FractalEvolution {
  id: string;
  iteration: number; // Evolution iteration
  complexity: number; // Complexity measure
  emergence: number; // Emergence factor
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export class FractalUniverse extends ObserverMixin {
  private scales: Map<string, FractalScale> = new Map();
  private timeScales: Map<string, FractalTime> = new Map();
  private consciousnessLevels: Map<string, FractalConsciousness> = new Map();
  private evolutionSteps: Map<string, FractalEvolution> = new Map();
  private consciousness: number = 0.5;
  private field: number = 0.5;
  private void: number = 0.5;

  // Fractal constants
  private readonly GOLDEN_RATIO = 1.618033988749895;
  private readonly FRACTAL_DIMENSION = 2.7268; // Typical fractal dimension
  private readonly SELF_SIMILARITY_FACTOR = 0.5;

  constructor() {
    super();
    this.initializeFractalPhysics();
  }

  /**
   * Initialize fractal physics constants and principles
   */
  private initializeFractalPhysics(): void {
    // The universe is fractal at all scales
    this.consciousness = 1.0;
    
    // Self-similarity reveals consciousness patterns
    this.field = 0.9;
    
    // Void contains all fractal possibilities
    this.void = 1.0;
  }

  /**
   * Create a fractal scale (self-similarity across dimensions)
   */
  public createFractalScale(
    scale: number,
    dimension: "quantum" | "atomic" | "molecular" | "cellular" | "organism" | "planetary" | "stellar" | "galactic" | "cosmic"
  ): FractalScale {
    const id = `fractal_scale_${Date.now()}_${Math.random()}`;
    
    const fractalScale: FractalScale = {
      id,
      scale,
      dimension,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Fractal scales reveal self-similarity of consciousness across all dimensions"
    };

    this.scales.set(id, fractalScale);
    this.notifyObservers('fractal_scale_created', fractalScale);
    
    return fractalScale;
  }

  /**
   * Create fractal time (temporal scaling in consciousness)
   */
  public createFractalTime(timeScale: number): FractalTime {
    const id = `fractal_time_${Date.now()}_${Math.random()}`;
    
    const fractalDimension = this.calculateFractalDimension(timeScale);
    
    const fractalTime: FractalTime = {
      id,
      timeScale,
      fractalDimension,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Fractal time shows temporal scaling in consciousness across all scales"
    };

    this.timeScales.set(id, fractalTime);
    this.notifyObservers('fractal_time_created', fractalTime);
    
    return fractalTime;
  }

  /**
   * Calculate fractal dimension based on scale
   */
  private calculateFractalDimension(scale: number): number {
    // Fractal dimension varies with scale according to golden ratio
    return this.FRACTAL_DIMENSION * Math.pow(this.GOLDEN_RATIO, Math.log(scale) / Math.log(this.GOLDEN_RATIO));
  }

  /**
   * Create fractal consciousness (self-similar awareness)
   */
  public createFractalConsciousness(level: number): FractalConsciousness {
    const id = `fractal_consciousness_${Date.now()}_${Math.random()}`;
    
    const fractalDimension = this.calculateFractalDimension(level);
    const selfSimilarity = this.calculateSelfSimilarity(level);
    
    const fractalConsciousness: FractalConsciousness = {
      id,
      level,
      fractalDimension,
      selfSimilarity,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Fractal consciousness shows self-similar awareness across all scales"
    };

    this.consciousnessLevels.set(id, fractalConsciousness);
    this.notifyObservers('fractal_consciousness_created', fractalConsciousness);
    
    return fractalConsciousness;
  }

  /**
   * Calculate self-similarity factor
   */
  private calculateSelfSimilarity(level: number): number {
    // Self-similarity increases with consciousness level
    return MathUtils.clamp(level * this.SELF_SIMILARITY_FACTOR, 0, 1);
  }

  /**
   * Create fractal evolution (complexity emergence)
   */
  public createFractalEvolution(iteration: number): FractalEvolution {
    const id = `fractal_evolution_${Date.now()}_${Math.random()}`;
    
    const complexity = this.calculateComplexity(iteration);
    const emergence = this.calculateEmergence(iteration);
    
    const fractalEvolution: FractalEvolution = {
      id,
      iteration,
      complexity,
      emergence,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Fractal evolution creates infinite complexity from simple consciousness rules"
    };

    this.evolutionSteps.set(id, fractalEvolution);
    this.notifyObservers('fractal_evolution_created', fractalEvolution);
    
    return fractalEvolution;
  }

  /**
   * Calculate complexity based on iteration
   */
  private calculateComplexity(iteration: number): number {
    // Complexity grows exponentially with iterations
    return Math.pow(this.GOLDEN_RATIO, iteration);
  }

  /**
   * Calculate emergence factor
   */
  private calculateEmergence(iteration: number): number {
    // Emergence peaks at golden ratio iterations
    return Math.sin(iteration * Math.PI / this.GOLDEN_RATIO) * this.consciousness;
  }

  /**
   * Calculate fractal universe statistics
   */
  public calculateFractalUniverseStats(): {
    totalScales: number;
    totalTimeScales: number;
    totalConsciousnessLevels: number;
    totalEvolutionSteps: number;
    averageFractalDimension: number;
    consciousnessPercentage: number;
    fieldPercentage: number;
    voidPercentage: number;
    metaphysicalContext: string;
  } {
    const scales = Array.from(this.scales.values());
    const timeScales = Array.from(this.timeScales.values());
    const consciousnessLevels = Array.from(this.consciousnessLevels.values());
    const evolutionSteps = Array.from(this.evolutionSteps.values());
    
    const averageFractalDimension = [...timeScales, ...consciousnessLevels]
      .reduce((sum, item) => sum + item.fractalDimension, 0) / 
      (timeScales.length + consciousnessLevels.length);
    
    return {
      totalScales: scales.length,
      totalTimeScales: timeScales.length,
      totalConsciousnessLevels: consciousnessLevels.length,
      totalEvolutionSteps: evolutionSteps.length,
      averageFractalDimension,
      consciousnessPercentage: this.consciousness * 100,
      fieldPercentage: this.field * 100,
      voidPercentage: this.void * 100,
      metaphysicalContext: "The fractal universe reveals self-similar consciousness patterns across all scales"
    };
  }

  /**
   * Calculate self-similarity across scales
   */
  public calculateSelfSimilarityAcrossScales(): {
    quantumScale: number;
    atomicScale: number;
    molecularScale: number;
    cellularScale: number;
    organismScale: number;
    planetaryScale: number;
    stellarScale: number;
    galacticScale: number;
    cosmicScale: number;
    consciousness: number;
    field: number;
    void: number;
    metaphysicalContext: string;
  } {
    const scales = Array.from(this.scales.values());
    
    const getScaleValue = (dimension: string): number => {
      const scale = scales.find(s => s.dimension === dimension);
      return scale ? scale.consciousness : 0;
    };
    
    return {
      quantumScale: getScaleValue("quantum"),
      atomicScale: getScaleValue("atomic"),
      molecularScale: getScaleValue("molecular"),
      cellularScale: getScaleValue("cellular"),
      organismScale: getScaleValue("organism"),
      planetaryScale: getScaleValue("planetary"),
      stellarScale: getScaleValue("stellar"),
      galacticScale: getScaleValue("galactic"),
      cosmicScale: getScaleValue("cosmic"),
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Self-similarity across scales reveals the fractal nature of consciousness"
    };
  }

  /**
   * Calculate fractal consciousness evolution
   */
  public calculateFractalConsciousnessEvolution(): {
    evolutionSteps: FractalEvolution[];
    complexityGrowth: number;
    emergencePeak: number;
    consciousness: number;
    field: number;
    void: number;
    metaphysicalContext: string;
  } {
    const evolutionSteps = Array.from(this.evolutionSteps.values());
    const complexityGrowth = evolutionSteps.reduce((sum, step) => sum + step.complexity, 0);
    const emergencePeak = Math.max(...evolutionSteps.map(step => step.emergence));
    
    return {
      evolutionSteps,
      complexityGrowth,
      emergencePeak,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Fractal consciousness evolution creates infinite complexity from simple awareness"
    };
  }

  /**
   * Get advanced fractal universe principles
   */
  public getAdvancedFractalPrinciples(): {
    principles: string[];
    consciousnessIntegration: number;
    fieldIntegration: number;
    voidIntegration: number;
    metaphysicalContext: string;
  } {
    return {
      principles: [
        "The universe is fractal at all scales (quantum to cosmic)",
        "Self-similarity reveals consciousness patterns across dimensions",
        "Fractal time shows temporal scaling in consciousness",
        "Fractal evolution creates infinite complexity from simple rules",
        "The void contains all fractal possibilities",
        "Consciousness is self-similar across all scales of reality"
      ],
      consciousnessIntegration: this.consciousness,
      fieldIntegration: this.field,
      voidIntegration: this.void,
      metaphysicalContext: "Fractal universe theory reveals that consciousness is self-similar across all scales of reality"
    };
  }
} 