import { calculateVBMConsciousness } from './book-system';

// Book Reference System
// Provides canonical source/derivation for every number, color, and sound
// Following documented metaphysical principles

export interface BookReference {
  value: number;
  source: string;
  derivation: string;
  a432_ratio: string;
}

export interface ColorReference {
  color: string;
  frequency: number;
  consciousness: number;
  book_source: string;
  a432_derivation: string;
}

export interface SoundReference {
  frequency: number;
  consciousness: number;
  book_source: string;
  a432_derivation: string;
}

export class BookReferenceSystem {
  private readonly A432 = 432;
  private readonly GOLDEN_RATIO = 432 / 267; // Book-approved φ
  private readonly PI = 432 / 137; // Book-approved π
  
  // Get canonical reference for any number
  public getNumberReference(value: number): BookReference {
    const digit = Math.abs(Math.floor(value)) % 10;
    const vbmResult = calculateVBMConsciousness(digit);
    return {
      value,
      source: `Book System - Digit ${digit}`,
      derivation: `A432-based consciousness calculation for digit ${digit}`,
      a432_ratio: this.calculateA432Ratio(value)
    };
  }
  
  // Get canonical reference for any color
  public getColorReference(color: string, consciousness: number): ColorReference {
    // Use hue from HSL if possible, else default to A432
    const hue_match = color.match(/hsl\((\d+)/);
    let frequency = this.A432;
    if (hue_match) {
      const hue = parseInt(hue_match[1]);
      frequency = this.A432 * (hue / 360);
    }
    const digit = Math.abs(Math.floor(consciousness)) % 10;
    return {
      color,
      frequency,
      consciousness,
      book_source: `Book System - Consciousness ${consciousness} (Digit ${digit})`,
      a432_derivation: `A432 × (${consciousness}/5) = ${frequency} Hz`
    };
  }
  
  // Get canonical reference for any sound
  public getSoundReference(frequency: number, consciousness: number): SoundReference {
    const digit = Math.abs(Math.floor(consciousness)) % 10;
    return {
      frequency,
      consciousness,
      book_source: `Book System - Consciousness ${consciousness} (Digit ${digit})`,
      a432_derivation: `A432 × (${consciousness}/5) = ${frequency} Hz`
    };
  }
  
  // Calculate A432 ratio for any value
  private calculateA432Ratio(value: number): string {
    if (value === 0) return "0 (Void)";
    if (value === this.A432) return "1:1 (A432 Root)";
    if (Math.abs(value - this.GOLDEN_RATIO * this.A432) < 0.001) return `${this.GOLDEN_RATIO}:1 (Golden Ratio)`;
    if (Math.abs(value - this.PI * this.A432) < 0.001) return `${this.PI}:1 (Pi Ratio)`;
    const ratio = value / this.A432;
    return `${ratio.toFixed(4)}:1 (Custom A432 Ratio)`;
  }
  
  // Get all canonical constants
  public getCanonicalConstants(): BookReference[] {
    return [
      {
        value: this.A432,
        source: "Book System - A432 Foundation",
        derivation: "Spiritual tuning fork frequency",
        a432_ratio: "1:1 (A432 Root)"
      },
      {
        value: this.GOLDEN_RATIO,
        source: "Book System - Golden Ratio",
        derivation: "432/267 (A432-based φ approximation)",
        a432_ratio: `${this.GOLDEN_RATIO}:1 (Golden Ratio)`
      },
      {
        value: this.PI,
        source: "Book System - Pi Approximation",
        derivation: "432/137 (A432-based π approximation)",
        a432_ratio: `${this.PI}:1 (Pi Ratio)`
      }
    ];
  }
  
  // Get consciousness multipliers for all digits
  public getConsciousnessMultipliers(): BookReference[] {
    const multipliers: BookReference[] = [];
    for (let digit = 0; digit <= 9; digit++) {
      const vbmResult = calculateVBMConsciousness(digit);
      multipliers.push({
        value: vbmResult.consciousness,
        source: `Book System - Digit ${digit}`,
        derivation: `Canonical consciousness multiplier for digit ${digit}`,
        a432_ratio: `${vbmResult.consciousness}/5:1 (Consciousness Ratio)`
      });
    }
    return multipliers;
  }
  
  // Trace any harmonic effect back to its book-based formula
  public traceHarmonicEffect(effect: any): string {
    if (typeof effect === 'number') {
      const reference = this.getNumberReference(effect);
      return `Value ${effect} → ${reference.source} → ${reference.derivation}`;
    }
    if (effect.frequency) {
      const reference = this.getSoundReference(effect.frequency, effect.consciousness || 1);
      return `Frequency ${effect.frequency}Hz → ${reference.book_source} → ${reference.a432_derivation}`;
    }
    if (effect.color) {
      const reference = this.getColorReference(effect.color, effect.consciousness || 1);
      return `Color ${effect.color} → ${reference.book_source} → ${reference.a432_derivation}`;
    }
    return "Unknown effect - cannot trace to book source";
  }
}

// Export singleton instance
export const bookReference = new BookReferenceSystem(); 