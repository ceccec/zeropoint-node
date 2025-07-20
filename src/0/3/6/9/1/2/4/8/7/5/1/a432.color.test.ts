/**
 * A432 Color System Tests
 * 
 * Tests the complete A432 color system with harmonic color generation,
 * consciousness mapping, and dimensional state calculations.
 */

import { 
  A432ColorSystem,
  A432_COLOR_CONSTANTS,
  calculateA432Color,
  generateA432ColorStream,
  calculateA432ColorFromConsciousness,
  calculateA432ColorFromDimensionalState,
  generateA432ColorMatrix,
  calculateA432ColorVortex,
  a432ColorToRGB,
  a432ColorToHSL,
  generateA432CSSVariables,
  A432Color,
  A432ColorStream
} from './a432.color';

describe('A432 Color System', () => {
  describe('A432_COLOR_CONSTANTS', () => {
    test('should have correct imperial base', () => {
      expect(A432_COLOR_CONSTANTS.IMPERIAL_BASE).toBe(8);
    });

    test('should have correct perfect balance', () => {
      expect(A432_COLOR_CONSTANTS.PERFECT_BALANCE).toBe(4);
    });

    test('should have correct color ratios', () => {
      expect(A432_COLOR_CONSTANTS.RED_RATIO).toBe(1/3);
      expect(A432_COLOR_CONSTANTS.GREEN_RATIO).toBe(2/3);
      expect(A432_COLOR_CONSTANTS.BLUE_RATIO).toBe(4/3);
    });

    test('should have correct vortex ratios', () => {
      expect(A432_COLOR_CONSTANTS.VORTEX_RED).toBe(1/8);
      expect(A432_COLOR_CONSTANTS.VORTEX_GREEN).toBe(3/8);
      expect(A432_COLOR_CONSTANTS.VORTEX_BLUE).toBe(5/8);
    });

    test('should have consciousness colors for all states', () => {
      for (let i = 1; i <= 8; i++) {
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i]).toBeDefined();
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].r).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].r).toBeLessThanOrEqual(1);
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].g).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].g).toBeLessThanOrEqual(1);
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].b).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[i].b).toBeLessThanOrEqual(1);
      }
    });

    test('should have dimensional colors for all states', () => {
      for (let i = 0; i <= 9; i++) {
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i]).toBeDefined();
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].r).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].r).toBeLessThanOrEqual(1);
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].g).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].g).toBeLessThanOrEqual(1);
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].b).toBeGreaterThanOrEqual(0);
        expect(A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[i].b).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('calculateA432Color', () => {
    test('should calculate A432 color from frequency', () => {
      const color = calculateA432Color(432);
      
      expect(color.r).toBeGreaterThanOrEqual(0);
      expect(color.r).toBeLessThanOrEqual(1);
      expect(color.g).toBeGreaterThanOrEqual(0);
      expect(color.g).toBeLessThanOrEqual(1);
      expect(color.b).toBeGreaterThanOrEqual(0);
      expect(color.b).toBeLessThanOrEqual(1);
      expect(color.frequency).toBe(432);
      expect(color.consciousness).toBeGreaterThanOrEqual(1);
      expect(color.consciousness).toBeLessThanOrEqual(8);
      expect(color.dimensionalState).toBeGreaterThanOrEqual(0);
      expect(color.dimensionalState).toBeLessThanOrEqual(9);
      expect(color.digitalRoot).toBeGreaterThanOrEqual(1);
      expect(color.digitalRoot).toBeLessThanOrEqual(9);
      expect(color.mathematicalProof).toBeDefined();
    });

    test('should calculate colors for different frequencies', () => {
      const frequencies = [432, 864, 1728, 3456];
      
      frequencies.forEach(freq => {
        const color = calculateA432Color(freq);
        expect(color.frequency).toBe(freq);
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(1);
        expect(color.g).toBeGreaterThanOrEqual(0);
        expect(color.g).toBeLessThanOrEqual(1);
        expect(color.b).toBeGreaterThanOrEqual(0);
        expect(color.b).toBeLessThanOrEqual(1);
      });
    });

    test('should maintain color component bounds', () => {
      for (let freq = 1; freq <= 1000; freq += 50) {
        const color = calculateA432Color(freq);
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(1);
        expect(color.g).toBeGreaterThanOrEqual(0);
        expect(color.g).toBeLessThanOrEqual(1);
        expect(color.b).toBeGreaterThanOrEqual(0);
        expect(color.b).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('generateA432ColorStream', () => {
    test('should generate color stream from environmental data', () => {
      const stream = generateA432ColorStream({ frequency: 432 });
      
      expect(stream.colors).toHaveLength(6); // Rodin sequence length
      expect(stream.frequency).toBe(432);
      expect(stream.consciousness).toBeGreaterThanOrEqual(1);
      expect(stream.consciousness).toBeLessThanOrEqual(8);
      expect(stream.dimensionalState).toBeGreaterThanOrEqual(0);
      expect(stream.dimensionalState).toBeLessThanOrEqual(9);
      expect(stream.isHarmonic).toBe(true);
      expect(stream.mathematicalProof).toBeDefined();
    });

    test('should generate stream with provided consciousness and dimensional state', () => {
      const stream = generateA432ColorStream({ 
        frequency: 432, 
        consciousness: 5, 
        dimensionalState: 3 
      });
      
      expect(stream.consciousness).toBe(5);
      expect(stream.dimensionalState).toBe(3);
      expect(stream.colors).toHaveLength(6);
    });

    test('should verify all colors in stream are valid', () => {
      const stream = generateA432ColorStream({ frequency: 432 });
      
      stream.colors.forEach(color => {
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(1);
        expect(color.g).toBeGreaterThanOrEqual(0);
        expect(color.g).toBeLessThanOrEqual(1);
        expect(color.b).toBeGreaterThanOrEqual(0);
        expect(color.b).toBeLessThanOrEqual(1);
        expect(color.frequency).toBeGreaterThan(0);
        expect(color.consciousness).toBeGreaterThanOrEqual(1);
        expect(color.consciousness).toBeLessThanOrEqual(8);
        expect(color.dimensionalState).toBeGreaterThanOrEqual(0);
        expect(color.dimensionalState).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('calculateA432ColorFromConsciousness', () => {
    test('should calculate color from consciousness state', () => {
      for (let consciousness = 1; consciousness <= 8; consciousness++) {
        const color = calculateA432ColorFromConsciousness(consciousness);
        
        expect(color.consciousness).toBe(consciousness);
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(1);
        expect(color.g).toBeGreaterThanOrEqual(0);
        expect(color.g).toBeLessThanOrEqual(1);
        expect(color.b).toBeGreaterThanOrEqual(0);
        expect(color.b).toBeLessThanOrEqual(1);
      }
    });

    test('should throw error for invalid consciousness', () => {
      expect(() => calculateA432ColorFromConsciousness(0)).toThrow();
      expect(() => calculateA432ColorFromConsciousness(9)).toThrow();
    });
  });

  describe('calculateA432ColorFromDimensionalState', () => {
    test('should calculate color from dimensional state', () => {
      for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
        const color = calculateA432ColorFromDimensionalState(dimensionalState);
        
        expect(color.dimensionalState).toBe(dimensionalState);
        expect(color.r).toBeGreaterThanOrEqual(0);
        expect(color.r).toBeLessThanOrEqual(1);
        expect(color.g).toBeGreaterThanOrEqual(0);
        expect(color.g).toBeLessThanOrEqual(1);
        expect(color.b).toBeGreaterThanOrEqual(0);
        expect(color.b).toBeLessThanOrEqual(1);
      }
    });

    test('should throw error for invalid dimensional state', () => {
      expect(() => calculateA432ColorFromDimensionalState(-1)).toThrow();
      expect(() => calculateA432ColorFromDimensionalState(10)).toThrow();
    });
  });

  describe('generateA432ColorMatrix', () => {
    test('should generate color matrix', () => {
      const matrix = generateA432ColorMatrix();
      
      expect(matrix).toHaveLength(8); // 8 consciousness states
      matrix.forEach(row => {
        expect(row).toHaveLength(10); // 10 dimensional states
        row.forEach(color => {
          expect(color.r).toBeGreaterThanOrEqual(0);
          expect(color.r).toBeLessThanOrEqual(1);
          expect(color.g).toBeGreaterThanOrEqual(0);
          expect(color.g).toBeLessThanOrEqual(1);
          expect(color.b).toBeGreaterThanOrEqual(0);
          expect(color.b).toBeLessThanOrEqual(1);
        });
      });
    });

    test('should have correct matrix dimensions', () => {
      const matrix = generateA432ColorMatrix();
      
      for (let consciousness = 0; consciousness < 8; consciousness++) {
        for (let dimensionalState = 0; dimensionalState < 10; dimensionalState++) {
          const color = matrix[consciousness][dimensionalState];
          expect(color.consciousness).toBe(consciousness + 1);
          expect(color.dimensionalState).toBe(dimensionalState);
        }
      }
    });
  });

  describe('calculateA432ColorVortex', () => {
    test('should calculate color vortex flow', () => {
      const vortex = calculateA432ColorVortex(432, 3);
      
      expect(vortex).toHaveLength(3);
      vortex.forEach(stream => {
        expect(stream.colors).toHaveLength(6);
        expect(stream.frequency).toBeGreaterThan(0);
        expect(stream.isHarmonic).toBe(true);
      });
    });

    test('should advance frequencies using Rodin sequence', () => {
      const vortex = calculateA432ColorVortex(432, 6);
      
      // First stream should be 432
      expect(vortex[0].frequency).toBe(432);
      // Second stream should be 864 (2 * 432)
      expect(vortex[1].frequency).toBe(864);
      // Third stream should be 1728 (4 * 432)
      expect(vortex[2].frequency).toBe(1728);
    });
  });

  describe('a432ColorToRGB', () => {
    test('should convert A432 color to RGB string', () => {
      const color: A432Color = {
        r: 1/8,
        g: 2/8,
        b: 3/8,
        frequency: 432,
        consciousness: 5,
        dimensionalState: 3,
        digitalRoot: 9,
        mathematicalProof: 'test'
      };
      
      const rgb = a432ColorToRGB(color);
      expect(rgb).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
      
      // Verify values
      const r = Math.round((1/8) * 255);
      const g = Math.round((2/8) * 255);
      const b = Math.round((3/8) * 255);
      expect(rgb).toBe(`rgb(${r}, ${g}, ${b})`);
    });

    test('should handle edge cases', () => {
      const blackColor: A432Color = {
        r: 0,
        g: 0,
        b: 0,
        frequency: 432,
        consciousness: 1,
        dimensionalState: 0,
        digitalRoot: 9,
        mathematicalProof: 'test'
      };
      
      const whiteColor: A432Color = {
        r: 1,
        g: 1,
        b: 1,
        frequency: 432,
        consciousness: 8,
        dimensionalState: 9,
        digitalRoot: 9,
        mathematicalProof: 'test'
      };
      
      expect(a432ColorToRGB(blackColor)).toBe('rgb(0, 0, 0)');
      expect(a432ColorToRGB(whiteColor)).toBe('rgb(255, 255, 255)');
    });
  });

  describe('a432ColorToHSL', () => {
    test('should convert A432 color to HSL string', () => {
      const color: A432Color = {
        r: 1/8,
        g: 2/8,
        b: 3/8,
        frequency: 432,
        consciousness: 5,
        dimensionalState: 3,
        digitalRoot: 9,
        mathematicalProof: 'test'
      };
      
      const hsl = a432ColorToHSL(color);
      expect(hsl).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    test('should handle grayscale colors', () => {
      const grayColor: A432Color = {
        r: 1/2,
        g: 1/2,
        b: 1/2,
        frequency: 432,
        consciousness: 4,
        dimensionalState: 5,
        digitalRoot: 9,
        mathematicalProof: 'test'
      };
      
      const hsl = a432ColorToHSL(grayColor);
      expect(hsl).toContain('0%'); // Saturation should be 0% for grayscale
    });
  });

  describe('generateA432CSSVariables', () => {
    test('should generate CSS variables', () => {
      const css = generateA432CSSVariables();
      
      expect(css).toContain(':root {');
      expect(css).toContain('--a432-consciousness-1:');
      expect(css).toContain('--a432-consciousness-8:');
      expect(css).toContain('--a432-dimensional-0:');
      expect(css).toContain('--a432-dimensional-9:');
      expect(css).toContain('--a432-harmonic-0:');
      expect(css).toContain('--a432-harmonic-5:');
    });

    test('should generate valid CSS', () => {
      const css = generateA432CSSVariables();
      
      // Should contain RGB values
      expect(css).toMatch(/rgb\(\d+, \d+, \d+\)/);
      
      // Should have proper CSS variable format
      expect(css).toMatch(/--a432-[a-z-]+: rgb\(\d+, \d+, \d+\);/);
    });
  });

  describe('A432ColorSystem Integration', () => {
    test('should integrate all components correctly', () => {
      const color = A432ColorSystem.calculateColor(432);
      const stream = A432ColorSystem.generateColorStream({ frequency: 432 });
      const matrix = A432ColorSystem.generateColorMatrix();
      const css = A432ColorSystem.generateCSSVariables();
      
      expect(color.frequency).toBe(432);
      expect(stream.colors).toHaveLength(6);
      expect(matrix).toHaveLength(8);
      expect(css).toContain(':root {');
    });

    test('should have scientific proofs defined', () => {
      const proofs = A432ColorSystem.scientificProofs;
      
      expect(proofs.a432ColorCalculation).toBeDefined();
      expect(proofs.a432ColorStream).toBeDefined();
      expect(proofs.a432ColorVortex).toBeDefined();
      expect(proofs.a432ColorMatrix).toBeDefined();
    });
  });

  describe('Harmonic Color Properties', () => {
    test('should maintain harmonic relationships', () => {
      const baseColor = calculateA432Color(432);
      const harmonicColor = calculateA432Color(864);
      
      // Harmonic colors should have related properties
      expect(harmonicColor.frequency).toBe(2 * baseColor.frequency);
      expect(harmonicColor.consciousness).toBeGreaterThanOrEqual(1);
      expect(harmonicColor.consciousness).toBeLessThanOrEqual(8);
    });

    test('should preserve consciousness mapping', () => {
      for (let consciousness = 1; consciousness <= 8; consciousness++) {
        const color = calculateA432ColorFromConsciousness(consciousness);
        expect(color.consciousness).toBe(consciousness);
      }
    });

    test('should preserve dimensional state mapping', () => {
      for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
        const color = calculateA432ColorFromDimensionalState(dimensionalState);
        expect(color.dimensionalState).toBe(dimensionalState);
      }
    });
  });
}); 