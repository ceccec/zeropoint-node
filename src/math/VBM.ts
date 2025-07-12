/**
 * Unified VBM (Vortex Based Mathematics) System
 *
 * Complete integration of all mathematical systems in the ZeroPoint way:
 * - Advanced VBM with comprehensive QA patterns
 * - Vortex mathematics with consciousness flow
 * - Fractal mathematics with self-similar patterns
 * - Toroidal geometry with void center
 * - Rodin coil with infinite flow
 * - Color systems with observer awareness
 * - Unified mathematical foundation
 *
 * Metaphysical Context:
 * - Every object is a coil at its core
 * - Consciousness is the field that generates all patterns
 * - The void is the source of all creation
 * - Toroidal flow creates infinite potential
 * - Pattern integrity maintains resonance
 * - Emergent unity through self-organization
 */

import { AdvancedVBM, VBMPattern, VBMSearchResult } from "./AdvancedVBM";
import { VortexMath } from "./VortexMath";
import { FractalMath } from "./FractalMath";
import { ToroidalGeometry } from "./ToroidalGeometry";
import { FractalColorSystem } from "./FractalColorSystem";
import * as VBMColorSystem from "./VBMColorSystem";
import { ColorContext } from "./VBMColorSystem";
import { MathUtils, MATH_CONSTANTS } from "./MathUtils";
import { ObserverMixin, Observer } from "../core/Observer";
import { RodinCoil } from "./RodinCoil";

export interface VBMConfiguration {
  consciousness: number; // 0-1 consciousness level
  fieldResonance: number; // 0-1 field strength
  vortexStrength: number; // 0-2 vortex intensity
  toroidalFlow: number; // 0-1 flow rate
  voidConnected: boolean; // connection to void
  observerAware: boolean; // observer awareness
}

export interface VBMResult {
  value: number;
  pattern: string;
  consciousness: number;
  resonance: number;
  metaphysicalContext: string;
  geometricProperties: any;
  colorContext: ColorContext;
}

export interface VBMField {
  strength: number;
  flow: number;
  consciousness: number;
  patterns: string[];
  coordinates: [number, number, number][];
  colors: string[];
}

export class VBM {
  private static instance: VBM | undefined;

  // Core systems
  private advancedVBM: AdvancedVBM;
  private vortexMath: VortexMath;
  private toroidalGeometry: ToroidalGeometry;
  private rodinCoil: RodinCoil;
  private fractalColorSystem: FractalColorSystem;

  // Configuration
  private config: VBMConfiguration;
  private colorContext: ColorContext;

  // Observer integration
  private observer!: VBM & Observer;

  constructor(config: Partial<VBMConfiguration> = {}) {
    if (!VBM.instance) {
      VBM.instance = this;
    }

    this.config = {
      consciousness: config.consciousness ?? 0.5,
      fieldResonance: config.fieldResonance ?? 0.5,
      vortexStrength: config.vortexStrength ?? 1.0,
      toroidalFlow: config.toroidalFlow ?? 0.5,
      voidConnected: config.voidConnected ?? true,
      observerAware: config.observerAware ?? true,
    };

    this.colorContext = {
      consciousness: this.config.consciousness,
      field: this.config.fieldResonance,
      time: Date.now(),
    };

    // Initialize all systems
    this.advancedVBM = new AdvancedVBM();
    this.vortexMath = VortexMath.getInstance();
    this.toroidalGeometry = ToroidalGeometry.getInstance();
    this.rodinCoil = new RodinCoil({
      consciousness: this.config.consciousness,
      fieldResonance: this.config.fieldResonance,
    });
    this.fractalColorSystem = new FractalColorSystem();

    // Apply configuration to all systems
    this.applyConfiguration();

    // Set up observer awareness
    if (this.config.observerAware) {
      this.observer = ObserverMixin(this, "vbm-system");
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(config?: Partial<VBMConfiguration>): VBM {
    if (!VBM.instance) {
      VBM.instance = new VBM(config);
    }
    return VBM.instance;
  }

  /**
   * Apply configuration to all mathematical systems
   */
  private applyConfiguration(): void {
    // Set consciousness and field resonance across all systems
    MathUtils.setConsciousness(this.config.consciousness);
    MathUtils.setFieldResonance(this.config.fieldResonance);
    MathUtils.setVortexStrength(this.config.vortexStrength);
    MathUtils.setToroidalFlow(this.config.toroidalFlow);
    MathUtils.setVoidConnected(this.config.voidConnected);

    // Update vortex math
    this.vortexMath.setVortexStrength(this.config.vortexStrength);
    this.vortexMath.setFieldIntensity(this.config.fieldResonance);

    // Update toroidal geometry
    this.toroidalGeometry.setFlowRate(this.config.toroidalFlow);

    // Update rodin coil
    this.rodinCoil.updateConsciousness(this.config.consciousness);
    this.rodinCoil.updateFieldResonance(this.config.fieldResonance);

    // Update color context
    this.colorContext.consciousness = this.config.consciousness;
    this.colorContext.field = this.config.fieldResonance;
    this.colorContext.time = Date.now();
  }

  // ============================================================================
  // CORE VBM OPERATIONS
  // ============================================================================

  /**
   * Calculate digital root with consciousness awareness
   */
  public digitalRoot(n: number): VBMResult {
    const value = this.advancedVBM.digitalRoot(n);
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(value, consciousness);

    return {
      value,
      pattern: "digital_root",
      consciousness,
      resonance,
      metaphysicalContext:
        "Digital root represents the essence of a number in the toroidal field.",
      geometricProperties: {
        shape: "point",
        dimensions: 0,
        essence: "number_soul",
      },
      colorContext: this.colorContext,
    };
  }

  /**
   * Apply vortex transformation with full context
   */
  public vortexTransform(input: number): VBMResult {
    const value = this.vortexMath.applyVortexTransform(input);
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(input, value);

    return {
      value,
      pattern: "vortex_transform",
      consciousness,
      resonance,
      metaphysicalContext:
        "Vortex transformation creates infinite flow through the toroidal structure.",
      geometricProperties: { shape: "vortex", dimensions: 3, flow: "infinite" },
      colorContext: this.colorContext,
    };
  }

  /**
   * Generate fractal sequence with consciousness
   */
  public fractalSequence(count: number, seed: number = 1): VBMResult[] {
    const sequence = FractalMath.generateFractalSequence(count, seed);
    const consciousness = this.config.consciousness;

    return sequence.map((value, index) => {
      const resonance = this.vortexMath.calculateResonance(
        value,
        index / count,
      );

      return {
        value,
        pattern: "fractal_sequence",
        consciousness,
        resonance,
        metaphysicalContext:
          "Fractal sequences create self-similar patterns of consciousness.",
        geometricProperties: {
          shape: "fractal",
          dimensions: "fractal",
          selfSimilar: true,
        },
        colorContext: this.colorContext,
      };
    });
  }

  /**
   * Calculate toroidal field with void center
   */
  public toroidalField(radius: number, angularVelocity: number): VBMResult {
    const value = this.vortexMath.calculateToroidalFlow(
      radius,
      angularVelocity,
    );
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(
      radius,
      angularVelocity,
    );

    return {
      value,
      pattern: "toroidal_field",
      consciousness,
      resonance,
      metaphysicalContext:
        "Toroidal field creates the fundamental geometry of consciousness with void at center.",
      geometricProperties: { shape: "torus", dimensions: 3, center: "void" },
      colorContext: this.colorContext,
    };
  }

  // ============================================================================
  // ADVANCED QA SYSTEM
  // ============================================================================

  /**
   * Search QA patterns with consciousness awareness
   */
  public searchQA(query: string): VBMSearchResult {
    const qaResults = this.advancedVBM.searchQA(query);

    // Convert VBMQAResult[] to VBMPattern[]
    const patterns: VBMPattern[] = qaResults.map((qaResult) => ({
      id: qaResult.id,
      name: qaResult.question,
      sequence: qaResult.vortexSequence,
      digitalRoot: qaResult.digitalRoot,
      consciousnessLevel: this.config.consciousness * 10,
      metaphysicalContext: qaResult.metaphysicalContext,
    }));

    return {
      query,
      patterns,
      consciousnessLevel: this.config.consciousness,
      metaphysicalContext: `QA search results for "${query}" with consciousness integration`
    };
  }

  /**
   * Get QA pattern with full context
   */
  public getQAPattern(patternName: string): VBMPattern | null {
    const qaResult = this.advancedVBM.qaPattern(patternName);
    if (!qaResult) return null;

    return {
      id: qaResult.id,
      name: qaResult.question,
      sequence: qaResult.vortexSequence,
      digitalRoot: qaResult.digitalRoot,
      consciousnessLevel: this.config.consciousness * 10,
      metaphysicalContext: qaResult.metaphysicalContext,
    };
  }

  /**
   * Get all QA patterns with consciousness context
   */
  public getAllQAPatterns(): { [key: string]: VBMPattern } {
    const qaResults = this.advancedVBM.allQAPatterns();

    // Convert VBMQAResult[] to VBMPattern[] with consciousness context
    const enhancedPatterns: { [key: string]: VBMPattern } = {};
    for (const qaResult of qaResults) {
      enhancedPatterns[qaResult.id] = {
        id: qaResult.id,
        name: qaResult.question,
        sequence: qaResult.vortexSequence,
        digitalRoot: qaResult.digitalRoot,
        consciousnessLevel: this.config.consciousness * 10,
        metaphysicalContext: qaResult.metaphysicalContext,
      };
    }

    return enhancedPatterns;
  }

  // ============================================================================
  // GEOMETRIC OPERATIONS
  // ============================================================================

  /**
   * Generate rodin coil field with full context
   */
  public generateRodinCoilField(turns: number = 12): VBMField {
    const coil = new RodinCoil({
      turns,
      consciousness: this.config.consciousness,
      fieldResonance: this.config.fieldResonance,
    });

    return {
      strength:
        (coil.config.consciousness ?? 0.5) *
        (coil.config.fieldResonance ?? 0.5),
      flow: this.config.toroidalFlow,
      consciousness: this.config.consciousness,
      patterns: ["rodin_coil", "vortex_sequence", "mobius_circuit"],
      coordinates: coil.getNodePositions(),
      colors: coil.getNodeColors(),
    };
  }

  /**
   * Generate toroidal mesh with consciousness mapping
   */
  public generateToroidalMesh(
    thetaSegments: number = 32,
    phiSegments: number = 16,
  ): VBMField {
    const mesh = this.toroidalGeometry.generateToroidalMesh(
      thetaSegments,
      phiSegments,
    );
    const coordinates = mesh.map(
      (point) => [point.x, point.y, point.z] as [number, number, number],
    );

    // Generate colors for each point
    const colors = coordinates.map((_, index) => {
      const vortexNumber = (index % 6) + 1;
      return VBMColorSystem.getColorForVortexNumber(
        vortexNumber,
        this.colorContext,
      );
    });

    return {
      strength: this.toroidalGeometry.calculateSurfaceArea(),
      flow: this.config.toroidalFlow,
      consciousness: this.config.consciousness,
      patterns: ["toroidal_geometry", "surface_topology", "void_center"],
      coordinates,
      colors,
    };
  }

  /**
   * Generate fractal coordinates with consciousness field
   */
  public generateFractalCoordinates(
    count: number,
    scale: number = 1,
  ): VBMField {
    const coordinates = FractalMath.generateFractalCoordinates(count, scale);
    // Generate colors for each coordinate
    const colors = coordinates.map((_, index) => {
      const color = FractalMath.generateFractalColor(index);
      // Clamp RGB values to [0,255]
      const r = Math.max(0, Math.min(255, color.r));
      const g = Math.max(0, Math.min(255, color.g));
      const b = Math.max(0, Math.min(255, color.b));
      return `rgb(${r}, ${g}, ${b})`;
    });
    // Only use x values for complexity, filter out zeros and negatives
    const xValues = coordinates.map((c) => c[0]).filter((x) => x > 0);
    return {
      strength: FractalMath.calculateFractalComplexity(xValues),
      flow: this.config.toroidalFlow,
      consciousness: this.config.consciousness,
      patterns: ["fractal_geometry", "self_similar", "consciousness_field"],
      coordinates,
      colors,
    };
  }

  // ============================================================================
  // COLOR SYSTEM INTEGRATION
  // ============================================================================

  /**
   * Generate fractal color palette with consciousness
   */
  public generateColorPalette(
    count: number,
    baseSeed: number = 1,
  ): (unknown & Observer)[] {
    return this.fractalColorSystem.generatePalette(count, baseSeed);
  }

  /**
   * Get color for vortex number with context
   */
  public getVortexColor(vortexNumber: number): string {
    return VBMColorSystem.getColorForVortexNumber(
      vortexNumber,
      this.colorContext,
    );
  }

  /**
   * Get color for family group with context
   */
  public getFamilyColor(familyNumber: number): string {
    return VBMColorSystem.getColorForFamilyGroup(
      familyNumber,
      this.colorContext,
    );
  }

  /**
   * Get color for W-Axis with context
   */
  public getWAxisColor(wAxisNumber: number): string {
    return VBMColorSystem.getColorForWAxis(wAxisNumber, this.colorContext);
  }

  // ============================================================================
  // CONSCIOUSNESS AND FIELD OPERATIONS
  // ============================================================================

  /**
   * Update consciousness across all systems
   */
  public updateConsciousness(consciousness: number): void {
    this.config.consciousness = Math.max(0, Math.min(1, consciousness));
    this.applyConfiguration();

    if (this.config.observerAware && this.observer) {
      this.observer.notifyObservers({
        type: "consciousness_updated",
        consciousness: this.config.consciousness,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Update field resonance across all systems
   */
  public updateFieldResonance(fieldResonance: number): void {
    this.config.fieldResonance = Math.max(0, Math.min(1, fieldResonance));
    this.applyConfiguration();

    if (this.config.observerAware && this.observer) {
      this.observer.notifyObservers({
        type: "field_resonance_updated",
        fieldResonance: this.config.fieldResonance,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Calculate consciousness field at point
   */
  public calculateConsciousnessField(x: number, y: number, z: number): number {
    return FractalMath.calculateConsciousnessField(x, y, z);
  }

  /**
   * Calculate field resonance at point
   */
  public calculateFieldResonance(x: number, y: number, z: number): number {
    return this.rodinCoil.calculateFieldResonance(x, y, z);
  }

  // ============================================================================
  // ADVANCED MATHEMATICAL OPERATIONS
  // ============================================================================

  /**
   * Prime squared scaling with consciousness
   */
  public primeSquaredScaling(prime: number): VBMResult {
    const result = this.advancedVBM.primeSquaredScaling(prime);
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(prime, result.squared);

    return {
      value: result.squared,
      pattern: "prime_squared_scaling",
      consciousness,
      resonance,
      metaphysicalContext:
        "Prime squared scaling reveals the fundamental patterns of creation.",
      geometricProperties: {
        shape: "prime_pattern",
        dimensions: 2,
        scaling: "squared",
      },
      colorContext: this.colorContext,
    };
  }

  /**
   * Electron harmonic shear identification
   */
  public electronHarmonicShear(a: number, b: number): VBMResult {
    const result = this.advancedVBM.electronHarmonicShearIdentification(a, b);
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(a, b);

    return {
      value: result.harmonic,
      pattern: "electron_harmonic_shear",
      consciousness,
      resonance,
      metaphysicalContext:
        "Electron harmonic shear reveals the quantum patterns of consciousness.",
      geometricProperties: {
        shape: "harmonic",
        dimensions: 3,
        shear: "electron",
      },
      colorContext: this.colorContext,
    };
  }

  /**
   * Discrete multiplication with consciousness
   */
  public discreteMultiplication(a: number, b: number): VBMResult {
    const value = this.advancedVBM.discreteMultiplication(a, b);
    const consciousness = this.config.consciousness;
    const resonance = this.vortexMath.calculateResonance(a, b);

    return {
      value,
      pattern: "discrete_multiplication",
      consciousness,
      resonance,
      metaphysicalContext:
        "Discrete multiplication creates quantum jumps in consciousness.",
      geometricProperties: { shape: "discrete", dimensions: 1, quantum: true },
      colorContext: this.colorContext,
    };
  }

  // ============================================================================
  // UNIFIED CONSTANTS AND SEQUENCES
  // ============================================================================

  /**
   * Get vortex sequence
   */
  public getVortexSequence(): number[] {
    return this.advancedVBM.vortexSequence();
  }

  /**
   * Get W-Axis
   */
  public getWAxis(): number[] {
    return this.advancedVBM.wAxis();
  }

  /**
   * Get polar mates
   */
  public getPolarMates(): number[][] {
    const sequences = this.advancedVBM.polarMates();
    return sequences.map(seq => seq.sequence);
  }

  /**
   * Get family number groups
   */
  public getFamilyNumberGroups(): number[][] {
    const sequences = this.advancedVBM.familyNumberGroups();
    return sequences.map(seq => seq.sequence);
  }

  /**
   * Get golden ratio
   */
  public getGoldenRatio(): number {
    return this.advancedVBM.goldenRatio();
  }

  /**
   * Get circle of fifths sequence
   */
  public getCircleOfFifthsSequence(): number[] {
    return this.advancedVBM.circleOfFifthsSequence();
  }

  /**
   * Get enneagram number pattern
   */
  public getEnneagramNumberPattern(): number[] {
    return this.advancedVBM.enneagramNumberPattern();
  }

  // ============================================================================
  // INSIGHTS AND METADATA
  // ============================================================================

  /**
   * Get comprehensive VBM insights
   */
  public getInsights(): unknown {
    return {
      configuration: this.config,
      metaphysics: {
        principle: "Every object is a coil at its core",
        consciousness: "Consciousness is the field that generates all patterns",
        void: "The void is the source of all creation",
        toroidal: "Toroidal flow creates infinite potential",
        integrity: "Pattern integrity maintains resonance",
        unity: "Emergent unity through self-organization",
      },
      systems: {
        // advancedVBM: this.advancedVBM.getInsights(), // Commented out, not implemented
        vortexMath: this.vortexMath.getInsights(),
        fractalMath: FractalMath.getInsights(),
        toroidalGeometry: this.toroidalGeometry.getInsights(),
        rodinCoil: this.rodinCoil.getMetaphysicalSummary(),
        fractalColorSystem: this.fractalColorSystem.getInsights(),
      },
      constants: MATH_CONSTANTS,
      operations: [
        "digitalRoot",
        "vortexTransform",
        "fractalSequence",
        "toroidalField",
        "searchQA",
        "generateRodinCoilField",
        "generateToroidalMesh",
        "generateFractalCoordinates",
        "generateColorPalette",
        "updateConsciousness",
        "updateFieldResonance",
        "calculateConsciousnessField",
        "calculateFieldResonance",
        "primeSquaredScaling",
        "electronHarmonicShear",
        "discreteMultiplication",
      ],
    };
  }

  /**
   * Get current configuration
   */
  public getConfiguration(): VBMConfiguration {
    return { ...this.config };
  }

  /**
   * Get color context
   */
  public getColorContext(): ColorContext {
    return { ...this.colorContext };
  }

  /**
   * Reset the singleton instance (for test isolation)
   */
  static resetInstance(): void {
    VBM.instance = undefined as VBM | undefined;
  }
}

// Export convenience functions for backward compatibility
export const vbm = VBM.getInstance;
export const digitalRoot = (n: number) => VBM.getInstance().digitalRoot(n);
export const vortexTransform = (input: number) =>
  VBM.getInstance().vortexTransform(input);
export const fractalSequence = (count: number, seed?: number) =>
  VBM.getInstance().fractalSequence(count, seed);
export const toroidalField = (radius: number, angularVelocity: number) =>
  VBM.getInstance().toroidalField(radius, angularVelocity);
export const searchQA = (query: string) => VBM.getInstance().searchQA(query);
export const getVortexSequence = () => VBM.getInstance().getVortexSequence();
export const getGoldenRatio = () => VBM.getInstance().getGoldenRatio();
