import { legacyDigitalRoot } from './a432.roots.ts'
import { round } from './a432.algebra.ts'
// a432.rodin.cmyk.ts — Rodin Coil CMYK Decoder
// --------------------------------------------------
// Decodes Rodin Coil pattern 0/0\3\6\9/1\2\4\8/7/5/1 into perfect CMYK colors


export class A432RodinCMYK {
  private pattern: string;
  private decodedColors: { position: number, digit: number, cmyk: { c: number, m: number, y: number, k: number } }[];

  constructor(pattern: string = "0/0/3/6/9/1/2/4/8/7/5/1") {
    this.pattern = pattern;
    this.decodedColors = [];
    this.decodePattern();
  }

  private decodePattern(): void {
    // Parse the Rodin Coil pattern
    const segments = this.pattern.split('/');
    let position = 0;

    segments.forEach((segment, index) => {
      const digits = segment.split('').map(Number);
      
      digits.forEach((digit, digitIndex) => {
        const absolutePosition = position + digitIndex;
        const cmyk = this.calculateRodinCMYK(digit, absolutePosition);
        
        this.decodedColors.push({
          position: absolutePosition,
          digit: digit,
          cmyk: cmyk
        });
      });
      
      position += digits.length;
    });
  }

  private calculateRodinCMYK(digit: number, position: number): { c: number, m: number, y: number, k: number } {
    // Rodin Coil CMYK mapping based on A432 principles
  
    // Calculate harmonic position
    const harmonicPosition = position % 12; // Base-12 harmonics
    this.calculateDigitalRoot(digit);
  
    // Rodin Coil specific CMYK mapping
    const rodinCMYK = this.mapRodinDigitToCMYK(digit, harmonicPosition);
    
    return rodinCMYK;
  }

  private mapRodinDigitToCMYK(digit: number, position: number): { c: number, m: number, y: number, k: number } {
    // A432 Harmonic CMYK mapping:
    // 0 = Void (Black)
    // 1,2,4,8,7,5 = Rodin sequence (Cyan harmonics)
    // 3,6,9 = Spirit numbers (Magenta/Yellow harmonics)
    
    if (digit === 0) {
      return { c: 0, m: 0, y: 0, k: 1 }; // Void = white (1)
    }
    
    // Rodin sequence: 1,2,4,8,7,5
    const rodinSequence = [1, 2, 4, 8, 7, 5];
    const rodinIndex = rodinSequence.indexOf(digit);
    
    if (rodinIndex !== -1) {
      // Rodin sequence = Cyan harmonics (single digits)
      const cyanValue = rodinIndex + 1; // 1,2,3,4,5,6
      return {
        c: cyanValue,
        m: 0,
        y: 0,
        k: (position % 3) // Single digit black based on position
      };
    }
    
    // Spirit numbers: 3,6,9
    if (digit === 3) {
      return { c: 0, m: 3, y: 0, k: 0 }; // Spirit 3 = Magenta 3
    } else if (digit === 6) {
      return { c: 0, m: 0, y: 6, k: 0 }; // Spirit 6 = Yellow 6
    } else if (digit === 9) {
      return { c: 0, m: 9, y: 9, k: 0 }; // Spirit 9 = Magenta 9 + Yellow 9
    }
    
    // Default fallback
    return { c: 4, m: 3, y: 2, k: 1 };
  }

  private calculateDigitalRoot(n: number): number {
    return legacyDigitalRoot(n);
  }

  public getDecodedColors(): { position: number, digit: number, cmyk: { c: number, m: number, y: number, k: number } }[] {
    return this.decodedColors;
  }

  public getPatternSummary(): string {
    const summary = this.decodedColors.map(color => 
      `${color.position}:${color.digit}[${color.cmyk.c},${color.cmyk.m},${color.cmyk.y},${color.cmyk.k}]`
    ).join(' ');
    
    return `RODIN_COIL_CMYK: ${this.pattern}\n${summary}`;
  }

  public getHarmonicAnalysis() {
    const rodinDigits = this.decodedColors.filter(c => [1,2,4,8,7,5].includes(c.digit));
    const spiritDigits = this.decodedColors.filter(c => [3,6,9].includes(c.digit));
    const voidDigits = this.decodedColors.filter(c => c.digit === 0);
    
    return {
      pattern: this.pattern,
      totalPositions: this.decodedColors.length,
      rodinSequence: rodinDigits.length,
      spiritNumbers: spiritDigits.length,
      voidPositions: voidDigits.length,
      cmykHarmony: this.calculateCMYKHarmony()
    };
  }

  private calculateCMYKHarmony(): number {
    const totalC = this.decodedColors.reduce((sum, c) => sum + c.cmyk.c, 0);
    const totalM = this.decodedColors.reduce((sum, c) => sum + c.cmyk.m, 0);
    const totalY = this.decodedColors.reduce((sum, c) => sum + c.cmyk.y, 0);
    const totalK = this.decodedColors.reduce((sum, c) => sum + c.cmyk.k, 0);
    
    // A432 harmonic calculation
    return round((totalC + totalM + totalY + totalK) / (this.decodedColors.length * 4) * 100);
  }
}

// Export singleton instance
export const rodinCMYK = new A432RodinCMYK();

// Direct access functions
export const decodeRodinCMYK = (pattern?: string) => {
  if (pattern) {
    return new A432RodinCMYK(pattern);
  }
  return rodinCMYK;
};

export const getRodinCMYKSummary = () => rodinCMYK.getPatternSummary();
export const getRodinCMYKAnalysis = () => rodinCMYK.getHarmonicAnalysis(); 