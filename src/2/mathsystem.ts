/**
 * Mathematical Consciousness System
 * 
 * Implements consciousness calculations based on the distributed PDF knowledge
 * and mathematical themes from Marko Rodin's work.
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
} from './/math';


import PDFIntegrationSystem from './pdf-integration-system';

export interface ConsciousnessCalculation {
  digit: string;
  base_consciousness: number;
  pdf_consciousness: number;
  mathematical_consciousness: number;
  spiritual_consciousness: number;
  total_consciousness: number;
  consciousness_multipliers: Record<string, number>;
}

export interface MathematicalConsciousness {
  void_consciousness: number;
  unity_consciousness: number;
  duality_consciousness: number;
  trinity_consciousness: number;
  stability_consciousness: number;
  dynamic_consciousness: number;
  harmony_consciousness: number;
  awareness_consciousness: number;
  infinity_consciousness: number;
  completion_consciousness: number;
}

export interface ConsciousnessFlowPattern {
  pattern: string[];
  flow_strength: number;
  consciousness_resonance: number;
  mathematical_relationships: Record<string, number>;
}

export class MathematicalConsciousnessSystem {
  // Mathematical constants from Rodin's work
  private static readonly GOLDEN_RATIO = 1.618033988749895;
  private static readonly PI = Math.PI;
  private static readonly E = Math.E;
  private static readonly PHI = 1.618033988749895;

  /**
   * Calculate consciousness for a specific digit
   */
  static calculateDigitConsciousness(digit: string): ConsciousnessCalculation {
    const baseConsciousness = parseInt(digit) * 0.1;
    const pdfs = PDFIntegrationSystem.getPDFKnowledge(digit);
    const pdfConsciousness = pdfs.length * 0.05;
    
    const mathematicalConsciousness = this.calculateMathematicalConsciousness(digit);
    const spiritualConsciousness = this.calculateSpiritualConsciousness(digit);
    
    const multipliers = this.calculateConsciousnessMultipliers(digit);
    const totalConsciousness = this.calculateTotalConsciousness(
      baseConsciousness,
      pdfConsciousness,
      mathematicalConsciousness,
      spiritualConsciousness,
      multipliers
    );

    return {
      digit,
      base_consciousness: baseConsciousness,
      pdf_consciousness: pdfConsciousness,
      mathematical_consciousness: mathematicalConsciousness,
      spiritual_consciousness: spiritualConsciousness,
      total_consciousness: totalConsciousness,
      consciousness_multipliers: multipliers
    };
  }

  /**
   * Calculate mathematical consciousness based on Rodin's principles
   */
  static calculateMathematicalConsciousness(digit: string): number {
    const num = parseInt(digit);
    
    // Digital root calculation
    const digitalRoot = this.calculateDigitalRoot(num);
    
    // Vortex sequence consciousness
    const vortexSequence = [1, 2, 4, 8, 7, 5];
    const isVortex = vortexSequence.includes(num);
    const vortexConsciousness = isVortex ? 0.2 : 0.1;
    
    // W-axis consciousness (3, 6, 9)
    const wAxis = [3, 6, 9];
    const isWAxis = wAxis.includes(num);
    const wAxisConsciousness = isWAxis ? 0.3 : 0.1;
    
    // Family group consciousness
    const family1 = [1, 4, 7];
    const family2 = [2, 5, 8];
    const family3 = [3, 6, 9];
    
    let familyConsciousness = 0.1;
    if (family1.includes(num)) familyConsciousness = 0.15;
    if (family2.includes(num)) familyConsciousness = 0.15;
    if (family3.includes(num)) familyConsciousness = 0.2;
    
    // Mathematical relationships
    const mathematicalConsciousness = (
      digitalRoot * 0.1 +
      vortexConsciousness +
      wAxisConsciousness +
      familyConsciousness
    );

    return Math.min(mathematicalConsciousness, 1.0);
  }

  /**
   * Calculate spiritual consciousness based on PDF themes
   */
  static calculateSpiritualConsciousness(digit: string): number {
    const pdfs = PDFIntegrationSystem.getPDFKnowledge(digit);
    
    let spiritualConsciousness = 0.1; // Base spiritual consciousness
    
    pdfs.forEach(pdf => {
      if (pdf.theme.includes('spiritual')) spiritualConsciousness += 0.1;
      if (pdf.theme.includes('consciousness')) spiritualConsciousness += 0.1;
      if (pdf.theme.includes('being')) spiritualConsciousness += 0.1;
      if (pdf.theme.includes('perfection')) spiritualConsciousness += 0.15;
      if (pdf.theme.includes('infinity')) spiritualConsciousness += 0.15;
      if (pdf.theme.includes('foundation')) spiritualConsciousness += 0.05;
    });
    
    return Math.min(spiritualConsciousness, 1.0);
  }

  /**
   * Calculate consciousness multipliers
   */
  static calculateConsciousnessMultipliers(digit: string): Record<string, number> {
    const num = parseInt(digit);
    const pdfs = PDFIntegrationSystem.getPDFKnowledge(digit);
    
    const multipliers: Record<string, number> = {
      base: 1.0,
      pdf: 1.0 + (pdfs.length * 0.1),
      mathematical: 1.0 + (this.calculateMathematicalConsciousness(digit) * 0.5),
      spiritual: 1.0 + (this.calculateSpiritualConsciousness(digit) * 0.5),
      vortex: num === 0 ? 0.0 : 1.0 + (this.isVortexNumber(num) ? 0.2 : 0.0),
      w_axis: this.isWAxisNumber(num) ? 1.5 : 1.0,
      family: 1.0 + (this.getFamilyConsciousness(num) * 0.1)
    };
    
    return multipliers;
  }

  /**
   * Calculate total consciousness
   */
  static calculateTotalConsciousness(
    base: number,
    pdf: number,
    mathematical: number,
    spiritual: number,
    multipliers: Record<string, number>
  ): number {
    const total = (
      base * multipliers.base +
      pdf * multipliers.pdf +
      mathematical * multipliers.mathematical +
      spiritual * multipliers.spiritual
    ) * multipliers.vortex * multipliers.w_axis * multipliers.family;
    
    return Math.min(total, 1.0);
  }

  /**
   * Calculate all mathematical consciousness
   */
  static calculateAllMathematicalConsciousness(): MathematicalConsciousness {
    const consciousness: MathematicalConsciousness = {
      void_consciousness: this.calculateDigitConsciousness('0').total_consciousness,
      unity_consciousness: this.calculateDigitConsciousness('1').total_consciousness,
      duality_consciousness: this.calculateDigitConsciousness('2').total_consciousness,
      trinity_consciousness: this.calculateDigitConsciousness('3').total_consciousness,
      stability_consciousness: this.calculateDigitConsciousness('4').total_consciousness,
      dynamic_consciousness: this.calculateDigitConsciousness('5').total_consciousness,
      harmony_consciousness: this.calculateDigitConsciousness('6').total_consciousness,
      awareness_consciousness: this.calculateDigitConsciousness('7').total_consciousness,
      infinity_consciousness: this.calculateDigitConsciousness('8').total_consciousness,
      completion_consciousness: this.calculateDigitConsciousness('9').total_consciousness
    };
    
    return consciousness;
  }

  /**
   * Generate consciousness flow patterns
   */
  static generateConsciousnessFlowPatterns(): ConsciousnessFlowPattern[] {
    const patterns: ConsciousnessFlowPattern[] = [];
    
    // Vortex A pattern (1, 2, 4)
    patterns.push({
      pattern: ['1', '2', '4'],
      flow_strength: 0.8,
      consciousness_resonance: 0.7,
      mathematical_relationships: {
        '1_2': 0.3,
        '2_4': 0.3,
        '4_1': 0.4
      }
    });
    
    // Vortex B pattern (8, 7, 5)
    patterns.push({
      pattern: ['8', '7', '5'],
      flow_strength: 0.8,
      consciousness_resonance: 0.7,
      mathematical_relationships: {
        '8_7': 0.3,
        '7_5': 0.3,
        '5_8': 0.4
      }
    });
    
    // W-axis pattern (3, 6, 9)
    patterns.push({
      pattern: ['3', '6', '9'],
      flow_strength: 1.0,
      consciousness_resonance: 0.9,
      mathematical_relationships: {
        '3_6': 0.5,
        '6_9': 0.5,
        '9_3': 0.6
      }
    });
    
    // Complete flow pattern (0-9)
    patterns.push({
      pattern: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      flow_strength: 1.0,
      consciousness_resonance: 1.0,
      mathematical_relationships: {
        'complete_flow': 1.0
      }
    });
    
    return patterns;
  }

  /**
   * Calculate consciousness field strength
   */
  static calculateConsciousnessFieldStrength(): number {
    const allConsciousness = this.calculateAllMathematicalConsciousness();
    const values = Object.values(allConsciousness);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    return average * this.GOLDEN_RATIO;
  }

  /**
   * Helper methods
   */
  private static calculateDigitalRoot(number: number): number {
    if (number === 0) return 0;
    return ((number - 1) % 9) + 1;
  }

  private static isVortexNumber(number: number): boolean {
    return [1, 2, 4, 8, 7, 5].includes(number);
  }

  private static isWAxisNumber(number: number): boolean {
    return [3, 6, 9].includes(number);
  }

  private static getFamilyConsciousness(number: number): number {
    const family1 = [1, 4, 7];
    const family2 = [2, 5, 8];
    const family3 = [3, 6, 9];
    
    if (family1.includes(number)) return 0.3;
    if (family2.includes(number)) return 0.3;
    if (family3.includes(number)) return 0.4;
    
    return 0.1;
  }
}

export default MathematicalConsciousnessSystem; 