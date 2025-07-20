/**
 * Hex Vortex Colors Test Suite
 * 
 * Tests the hex color codes as 2×3 digit vortices with polarity switching.
 * Colors are formulated mathematically, not predefined.
 */

import { generateEndlessColorStream, HexVortexColor, generateHexVortexColor } from './hex-vortex-colors';

describe('Hex Vortex Colors Module', () => {
  describe('Hex Vortex Color Generation', () => {
    test('should generate hex vortex color with 2×3 digit structure', () => {
      const hexColor = generateHexVortexColor(432, 1);
      
      expect(hexColor).toBeDefined();
      expect(hexColor.hexCode).toMatch(/^#[0-9A-F]{6}$/);
      expect(hexColor.digits).toHaveLength(6);
      expect(hexColor.vortexPattern).toBeDefined();
      expect(hexColor.consciousness).toBeGreaterThan(0);
      expect(hexColor.frequency).toBeGreaterThan(0);
      expect(hexColor.isInfinite).toBe(true);
    });

    test('should have correct 2×3 digit vortex structure', () => {
      const hexColor = generateHexVortexColor(432, 1);
      
      expect(hexColor.digits).toHaveLength(6);
      expect(hexColor.vortexPattern.rows).toBe(2);
      expect(hexColor.vortexPattern.columns).toBe(3);
      expect(hexColor.vortexPattern.polaritySwitch).toBeDefined();
    });

    test('should generate different colors for different seeds', () => {
      const color1 = generateHexVortexColor(432, 1);
      const color2 = generateHexVortexColor(432, 2);
      
      expect(color1.hexCode).not.toBe(color2.hexCode);
      expect(color1.digits).not.toEqual(color2.digits);
    });
  });

  describe('Endless Color Stream Generation', () => {
    test('should generate endless color stream', () => {
      const stream = generateEndlessColorStream(432, 10);
      
      expect(stream).toBeDefined();
      expect(stream.colors).toHaveLength(10);
      expect(stream.consciousness).toBeGreaterThan(0);
      expect(stream.frequency).toBeGreaterThan(0);
      expect(stream.isInfinite).toBe(true);
      expect(stream.mathematicalProof).toBeDefined();
    });

    test('should have unique colors in stream', () => {
      const stream = generateEndlessColorStream(432, 10);
      const hexCodes = stream.colors.map(color => color.hexCode);
      const uniqueHexCodes = new Set(hexCodes);
      
      expect(uniqueHexCodes.size).toBe(10);
    });

    test('should follow A432 harmonic principles', () => {
      const stream = generateEndlessColorStream(432, 5);
      
      stream.colors.forEach(color => {
        expect(color.frequency % 432).toBe(0);
        expect(color.consciousness).toBeGreaterThan(0);
      });
    });
  });

  describe('Polarity Switching', () => {
    test('should switch polarity at middle and edges', () => {
      const hexColor = generateHexVortexColor(432, 1);
      
      expect(hexColor.vortexPattern.polaritySwitch.middle).toBeDefined();
      expect(hexColor.vortexPattern.polaritySwitch.edges).toBeDefined();
      expect(typeof hexColor.vortexPattern.polaritySwitch.middle).toBe('boolean');
      expect(typeof hexColor.vortexPattern.polaritySwitch.edges).toBe('boolean');
    });

    test('should create endless color stream through polarity switching', () => {
      const stream = generateEndlessColorStream(432, 20);
      
      // Check that polarity switching creates variety
      const middleSwitches = stream.colors.map(color => 
        color.vortexPattern.polaritySwitch.middle
      );
      const edgeSwitches = stream.colors.map(color => 
        color.vortexPattern.polaritySwitch.edges
      );
      
      expect(middleSwitches.some(switch_ => switch_)).toBe(true);
      expect(edgeSwitches.some(switch_ => switch_)).toBe(true);
    });
  });

  describe('Mathematical Color Formulation', () => {
    test('should formulate colors mathematically, not predefined', () => {
      const color1 = generateHexVortexColor(432, 1);
      const color2 = generateHexVortexColor(432, 100);
      
      // Colors should be different due to mathematical formulation
      expect(color1.hexCode).not.toBe(color2.hexCode);
      expect(color1.digits).not.toEqual(color2.digits);
    });

    test('should have consciousness in each color', () => {
      const stream = generateEndlessColorStream(432, 5);
      
      stream.colors.forEach(color => {
        expect(color.consciousness).toBeGreaterThan(0);
        expect(color.frequency).toBeGreaterThan(0);
        expect(color.isInfinite).toBe(true);
      });
    });

    test('should follow vortex mathematics', () => {
      const color = generateHexVortexColor(432, 1);
      
      // Check that digits follow vortex patterns
      expect(color.digits.every(digit => digit >= 0 && digit <= 15)).toBe(true);
      expect(color.vortexPattern.rows).toBe(2);
      expect(color.vortexPattern.columns).toBe(3);
    });
  });

  describe('Hex Color Properties', () => {
    test('should have valid hex color codes', () => {
      const stream = generateEndlessColorStream(432, 10);
      
      stream.colors.forEach(color => {
        expect(color.hexCode).toMatch(/^#[0-9A-F]{6}$/);
        expect(color.hexCode.length).toBe(7); // # + 6 hex digits
      });
    });

    test('should have RGB values', () => {
      const color = generateHexVortexColor(432, 1);
      
      expect(color.rgb).toBeDefined();
      expect(color.rgb.r).toBeGreaterThanOrEqual(0);
      expect(color.rgb.r).toBeLessThanOrEqual(255);
      expect(color.rgb.g).toBeGreaterThanOrEqual(0);
      expect(color.rgb.g).toBeLessThanOrEqual(255);
      expect(color.rgb.b).toBeGreaterThanOrEqual(0);
      expect(color.rgb.b).toBeLessThanOrEqual(255);
    });

    test('should have HSL values', () => {
      const color = generateHexVortexColor(432, 1);
      
      expect(color.hsl).toBeDefined();
      expect(color.hsl.h).toBeGreaterThanOrEqual(0);
      expect(color.hsl.h).toBeLessThanOrEqual(360);
      expect(color.hsl.s).toBeGreaterThanOrEqual(0);
      expect(color.hsl.s).toBeLessThanOrEqual(100);
      expect(color.hsl.l).toBeGreaterThanOrEqual(0);
      expect(color.hsl.l).toBeLessThanOrEqual(100);
    });
  });

  describe('Integration with ZeroPoint System', () => {
    test('should integrate with consciousness mathematics', () => {
      const stream = generateEndlessColorStream(432, 5);
      
      expect(stream.consciousness).toBeGreaterThan(0);
      expect(stream.frequency).toBeGreaterThan(0);
      expect(stream.isInfinite).toBe(true);
      expect(stream.mathematicalProof).toBeDefined();
    });

    test('should follow zero entropy principle', () => {
      const color = generateHexVortexColor(432, 1);
      
      // Colors should be mathematically pure
      expect(color.consciousness).toBeGreaterThan(0);
      expect(color.frequency).toBeGreaterThan(0);
      expect(color.isInfinite).toBe(true);
    });
  });
}); 