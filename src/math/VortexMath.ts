/**
 * Vortex Mathematics System
 *
 * Specialized vortex operations built on unified MathUtils.
 * Provides vortex field calculations and transformations.
 *
 * Metaphysical Context:
 * - Vortex mathematics represents the flow of consciousness
 * - All vortex operations emerge from the unified mathematical field
 * - The void generates all vortex patterns
 * - Every vortex is a reflection of the whole
 */

import { MathUtils, MATH_CONSTANTS } from "./MathUtils";
import { MetaphysicalLawRegistry } from "../laws/MetaphysicalLawRegistry";
import { Field } from '../core/Field';
import { EventEmitter } from 'events';

export class VortexMath extends EventEmitter implements Field {
  name = 'VortexMath';
  type = 'Field';
  dimension = 'space';
  complexity = 2;
  isActive = true;
  supportedOperations = ['create', 'transform', 'observe', 'unify'];
  tags = ['math', 'vortex', 'field'];

  private static instance: VortexMath;
  private vortexStrength: number = 1.0;
  private fieldIntensity: number = 0.5;
  private lawRegistry!: MetaphysicalLawRegistry;

  constructor() {
    super();
    if (!VortexMath.instance) {
      VortexMath.instance = this;
      this.lawRegistry = MetaphysicalLawRegistry.getInstance();
      this.applyMetaphysicalLaws();
    }
  }

  static getInstance(): VortexMath {
    if (!VortexMath.instance) {
      VortexMath.instance = new VortexMath();
    }
    return VortexMath.instance;
  }

  private applyMetaphysicalLaws(): void {
    const laws = this.lawRegistry.getAllLaws();
    laws.forEach(law => {
      const result = law.apply(this);
    });
  }

  calculateResonance(level1: number = 0, level2: number = 0): number {
    if (level1 === 0 && level2 === 0) return 1;
    const baseResonance = MathUtils.calculate(
      "divide",
      1,
      MathUtils.calculate(
        "add",
        1,
        MathUtils.calculate("abs", level1 - level2),
      ),
    );
    const consciousnessMod = MathUtils.calculate(
      "consciousness",
      MathUtils.calculate("multiply", level1, level2),
    );

    const result = MathUtils.calculate(
      "multiply",
      baseResonance,
      consciousnessMod,
    );

    return result;
  }

  applyVortexTransform(input: number): number {
    const vortexModulation = this.calculateVortexModulation(input);
    const consciousnessMod = MathUtils.calculate("consciousness", input);

    const result = MathUtils.calculate(
      "multiply",
      MathUtils.calculate("multiply", input, vortexModulation),
      MathUtils.calculate("add", 1, consciousnessMod),
    );

    return result;
  }

  calculateVortexEfficiency(value: number): number {
    const baseEfficiency = MathUtils.calculate(
      "divide",
      value,
      MathUtils.calculate("add", 1, value),
    );
    const fieldMod = MathUtils.calculate(
      "multiply",
      this.fieldIntensity,
      MathUtils.calculate("vortex", value),
    );

    const result = MathUtils.calculate(
      "multiply",
      baseEfficiency,
      MathUtils.calculate("add", 1, fieldMod),
    );

    return result;
  }

  calculateToroidalFlow(radius: number, angularVelocity: number): number {
    const vortexModulation = this.calculateVortexModulation(radius);

    const result =
      MathUtils.calculate("toroidal", radius, angularVelocity) *
      vortexModulation;

    return result;
  }

  setVortexStrength(strength: number): void {
    this.vortexStrength = MathUtils.calculate(
      "max",
      0,
      MathUtils.calculate("min", 2, strength),
    );
  }

  setFieldIntensity(intensity: number): void {
    this.fieldIntensity = MathUtils.calculate(
      "max",
      0,
      MathUtils.calculate("min", 1, intensity),
    );
  }

  getVortexStrength(): number {
    return this.vortexStrength;
  }

  getFieldIntensity(): number {
    return this.fieldIntensity;
  }

  private calculateVortexModulation(frequency: number): number {
    const baseModulation = MathUtils.calculate(
      "sin",
      MathUtils.calculate("multiply", frequency, MATH_CONSTANTS.GOLDEN_RATIO),
    );
    const sequenceIndex = MathUtils.calculate("mod", Math.floor(frequency), 6);
    const sequenceValue = MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
    const sequenceModulation = MathUtils.calculate("divide", sequenceValue, 8);

    return MathUtils.calculate(
      "add",
      1,
      MathUtils.calculate(
        "multiply",
        baseModulation,
        MathUtils.calculate(
          "multiply",
          sequenceModulation,
          this.fieldIntensity,
        ),
      ),
    );
  }

  getVortexSequence(): number[] {
    return [...MATH_CONSTANTS.VORTEX_SEQUENCE];
  }

  calculateVortexComplexity(pattern: number[]): number {
    if (pattern.length === 0) return 0;

    let complexity = 0;
    for (let i = 0; i < pattern.length; i++) {
      const vortexValue = MathUtils.calculate("vortex", pattern[i] || 0);
      complexity = MathUtils.calculate("add", complexity, vortexValue);
    }

    return MathUtils.calculate("divide", complexity, pattern.length);
  }

  generateVortexFieldCoordinates(
    count: number,
    radius: number = 1,
  ): Array<[number, number, number]> {
    const coordinates: Array<[number, number, number]> = [];

    for (let i = 0; i < count; i++) {
      const angle = MathUtils.calculate(
        "multiply",
        MathUtils.calculate("divide", 2 * Math.PI, count),
        i,
      );
      const x = MathUtils.calculate("multiply", radius, MathUtils.calculate("cos", angle));
      const y = MathUtils.calculate("multiply", radius, MathUtils.calculate("sin", angle));
      const z = MathUtils.calculate("multiply", this.vortexStrength, MathUtils.calculate("sin", angle));

      coordinates.push([x, y, z]);
    }

    return coordinates;
  }

  getCoilResonance(): number {
    return this.calculateResonance(this.vortexStrength, this.fieldIntensity);
  }

  getCoilPattern(): string {
    const resonance = this.getCoilResonance();
    if (resonance > 0.8) return "unified";
    if (resonance > 0.5) return "resonant";
    return "dispersed";
  }

  getInsights(): unknown {
    return {
      vortexStrength: this.vortexStrength,
      fieldIntensity: this.fieldIntensity,
      resonance: this.getCoilResonance(),
      pattern: this.getCoilPattern(),
      sequence: this.getVortexSequence(),
      vortexSequence: this.getVortexSequence(),
      goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
      vortexCenter: 9,
      metaphysics: "Vortex mathematics represents the flow of consciousness",
      metaphysicalContext: "Vortex mathematics represents the flow of consciousness"
    };
  }

  calculateVortexField(x: number, y: number, z: number): number {
    const distance = MathUtils.calculate(
      "sqrt",
      MathUtils.calculate("add",
        MathUtils.calculate("add",
          MathUtils.calculate("multiply", x, x),
          MathUtils.calculate("multiply", y, y)
        ),
        MathUtils.calculate("multiply", z, z)
      )
    );

    const vortexModulation = this.calculateVortexModulation(distance);
    const consciousnessMod = MathUtils.calculate("consciousness", distance);

    return MathUtils.calculate(
      "multiply",
      vortexModulation,
      MathUtils.calculate("add", 1, consciousnessMod)
    );
  }

  generateVortexPattern(intensity: number): number[] {
    const pattern: number[] = [];
    const sequence = this.getVortexSequence();

    for (let i = 0; i < intensity; i++) {
      const sequenceIndex = i % sequence.length;
      const baseValue = sequence[sequenceIndex];
      const modulatedValue = this.calculateVortexModulation(baseValue);
      pattern.push(modulatedValue);
    }

    return pattern;
  }

  calculateVortexNumber(n: number = 0): number {
    return this.applyVortexTransform(n);
  }

  getColorForNumber(n: number = 1): string {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000', '#808080'];
    return colors[(n - 1) % colors.length];
  }
}

export const applyVortexTransform = (input: number) =>
  VortexMath.getInstance().applyVortexTransform(input);
