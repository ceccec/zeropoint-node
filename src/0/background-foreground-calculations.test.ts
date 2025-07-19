/**
 * Background-Foreground Calculations Test Suite
 * 
 * Tests mathematical calculations for harmonious background and foreground
 * color combinations using vortex color system.
 */

import { 
  createBackgroundForegroundPair, 
  calculateYinYangHarmony, 
  BackgroundForegroundPair 
} from './background-foreground-calculations';

describe('Background-Foreground Calculations Module', () => {
  let bgFgPair: BackgroundForegroundPair;

  beforeEach(() => {
    bgFgPair = createBackgroundForegroundPair(432);
  });

  describe('Background-Foreground Pair Creation', () => {
    test('should create background-foreground pair with correct properties', () => {
      expect(bgFgPair).toBeDefined();
      expect(bgFgPair.background).toBeDefined();
      expect(bgFgPair.foreground).toBeDefined();
      expect(bgFgPair.consciousness).toBeGreaterThan(0);
      expect(bgFgPair.frequency).toBeGreaterThan(0);
      expect(bgFgPair.isInfinite).toBe(true);
      expect(bgFgPair.mathematicalProof).toBeDefined();
    });

    test('should have valid hex color codes', () => {
      expect(bgFgPair.background.hexCode).toMatch(/^#[0-9A-F]{6}$/);
      expect(bgFgPair.foreground.hexCode).toMatch(/^#[0-9A-F]{6}$/);
    });

    test('should have different colors for background and foreground', () => {
      expect(bgFgPair.background.hexCode).not.toBe(bgFgPair.foreground.hexCode);
    });
  });

  describe('Yin-Yang Harmony Calculations', () => {
    test('should calculate harmony between background and foreground', () => {
      const harmony = calculateYinYangHarmony(bgFgPair);
      expect(harmony).toBeGreaterThan(0);
      expect(harmony).toBeLessThanOrEqual(1);
    });

    test('should have high harmony for complementary colors', () => {
      // Create a pair with complementary colors
      const complementaryPair = {
        background: {
          hexCode: '#FF0000',
          rgb: { r: 255, g: 0, b: 0 },
          hsl: { h: 0, s: 100, l: 50 },
          consciousness: 432,
          frequency: 432,
          isInfinite: true
        },
        foreground: {
          hexCode: '#00FFFF',
          rgb: { r: 0, g: 255, b: 255 },
          hsl: { h: 180, s: 100, l: 50 },
          consciousness: 432,
          frequency: 432,
          isInfinite: true
        },
        consciousness: 864,
        frequency: 864,
        isInfinite: true,
        mathematicalProof: 'Complementary colors'
      };
      
      const harmony = calculateYinYangHarmony(complementaryPair);
      expect(harmony).toBeGreaterThan(0.7);
    });

    test('should have lower harmony for clashing colors', () => {
      // Create a pair with clashing colors
      const clashingPair = {
        background: {
          hexCode: '#FF0000',
          rgb: { r: 255, g: 0, b: 0 },
          hsl: { h: 0, s: 100, l: 50 },
          consciousness: 432,
          frequency: 432,
          isInfinite: true
        },
        foreground: {
          hexCode: '#FF00FF',
          rgb: { r: 255, g: 0, b: 255 },
          hsl: { h: 300, s: 100, l: 50 },
          consciousness: 432,
          frequency: 432,
          isInfinite: true
        },
        consciousness: 864,
        frequency: 864,
        isInfinite: true,
        mathematicalProof: 'Clashing colors'
      };
      
      const harmony = calculateYinYangHarmony(clashingPair);
      expect(harmony).toBeLessThan(0.5);
    });
  });

  describe('Mathematical Color Harmony', () => {
    test('should use vortex mathematics for color calculations', () => {
      expect(bgFgPair.background.consciousness).toBeGreaterThan(0);
      expect(bgFgPair.background.frequency).toBeGreaterThan(0);
      expect(bgFgPair.foreground.consciousness).toBeGreaterThan(0);
      expect(bgFgPair.foreground.frequency).toBeGreaterThan(0);
    });

    test('should follow A432 harmonic principles', () => {
      expect(bgFgPair.frequency % 432).toBe(0);
      expect(bgFgPair.background.frequency % 432).toBe(0);
      expect(bgFgPair.foreground.frequency % 432).toBe(0);
    });

    test('should maintain zero entropy principle', () => {
      expect(bgFgPair.consciousness).toBeGreaterThan(0);
      expect(bgFgPair.frequency).toBeGreaterThan(0);
      expect(bgFgPair.isInfinite).toBe(true);
    });
  });

  describe('Color Contrast and Readability', () => {
    test('should have sufficient contrast for readability', () => {
      const bgLuminance = calculateLuminance(bgFgPair.background.rgb);
      const fgLuminance = calculateLuminance(bgFgPair.foreground.rgb);
      const contrastRatio = calculateContrastRatio(bgLuminance, fgLuminance);
      
      expect(contrastRatio).toBeGreaterThan(3); // Minimum for readability
    });

    test('should have balanced consciousness between background and foreground', () => {
      const bgConsciousness = bgFgPair.background.consciousness;
      const fgConsciousness = bgFgPair.foreground.consciousness;
      
      expect(bgConsciousness).toBeGreaterThan(0);
      expect(fgConsciousness).toBeGreaterThan(0);
      expect(Math.abs(bgConsciousness - fgConsciousness)).toBeLessThan(200);
    });
  });

  describe('Dynamic Color Generation', () => {
    test('should generate different pairs for different seeds', () => {
      const pair1 = createBackgroundForegroundPair(432);
      const pair2 = createBackgroundForegroundPair(432, 2);
      
      expect(pair1.background.hexCode).not.toBe(pair2.background.hexCode);
      expect(pair1.foreground.hexCode).not.toBe(pair2.foreground.hexCode);
    });

    test('should maintain harmony across different generations', () => {
      const pairs = [];
      for (let i = 1; i <= 5; i++) {
        pairs.push(createBackgroundForegroundPair(432, i));
      }
      
      pairs.forEach(pair => {
        const harmony = calculateYinYangHarmony(pair);
        expect(harmony).toBeGreaterThan(0.3); // Minimum acceptable harmony
      });
    });
  });

  describe('Integration with ZeroPoint System', () => {
    test('should integrate with consciousness mathematics', () => {
      expect(bgFgPair.consciousness).toBeGreaterThan(0);
      expect(bgFgPair.frequency).toBeGreaterThan(0);
      expect(bgFgPair.isInfinite).toBe(true);
      expect(bgFgPair.mathematicalProof).toBeDefined();
    });

    test('should work with yin-yang duality principle', () => {
      const harmony = calculateYinYangHarmony(bgFgPair);
      expect(harmony).toBeGreaterThan(0);
      expect(harmony).toBeLessThanOrEqual(1);
    });
  });
});

// Helper functions for color calculations
function calculateLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
} 