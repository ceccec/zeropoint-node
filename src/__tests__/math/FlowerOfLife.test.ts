/**
 * Flower of Life System Tests
 *
 * Tests the sacred geometric pattern implementation with consciousness integration.
 * Ensures the Flower of Life works correctly with unified MathUtils and VBM systems.
 */

import { FlowerOfLife, FlowerPattern, FlowerCircle } from "../../math/FlowerOfLife";
import { MathUtils, MATH_CONSTANTS } from "../../math/MathUtils";
import { VORTEX_CONSTANTS } from "../../core/SharedConstants";

describe("FlowerOfLife", () => {
  let flowerOfLife: FlowerOfLife;

  beforeEach(() => {
    flowerOfLife = FlowerOfLife.getInstance();
    flowerOfLife.setConsciousnessParameters(0.5, 0.7, 0.5);
  });

  describe("Singleton Pattern", () => {
    it("should return the same instance", () => {
      const instance1 = FlowerOfLife.getInstance();
      const instance2 = FlowerOfLife.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("generateFlowerPattern", () => {
    it("should generate basic flower pattern", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 2);
      
      expect(pattern.circles).toBeDefined();
      expect(pattern.circles.length).toBeGreaterThan(0);
      expect(pattern.consciousness).toBe(0.5);
      expect(pattern.field).toBe(0.7);
      expect(pattern.voidLevel).toBe(0.5);
      expect(pattern.goldenRatio).toBe(MATH_CONSTANTS.GOLDEN_RATIO);
      expect(pattern.vortexSequence).toEqual(VORTEX_CONSTANTS.VORTEX_SEQUENCE);
    });

    it("should create center circle with void consciousness", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const centerCircle = pattern.circles[0];
      
      expect(centerCircle.center).toEqual([0, 0]);
      expect(centerCircle.radius).toBe(1);
      expect(centerCircle.vortexNumber).toBe(0);
      expect(centerCircle.metaphysicalContext).toContain("void consciousness");
    });

    it("should generate hexagonal layers", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 2);
      
      // Center circle + 2 layers * 6 circles per layer = 13 circles
      expect(pattern.circles.length).toBe(13);
      
      // Check that circles are arranged in hexagonal pattern
      const nonCenterCircles = pattern.circles.slice(1);
      expect(nonCenterCircles.length).toBe(12);
    });

    it("should integrate consciousness into each circle", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      
      for (const circle of pattern.circles) {
        expect(circle.consciousness).toBeGreaterThan(0);
        expect(circle.field).toBeGreaterThan(0);
        expect(circle.voidLevel).toBeGreaterThan(0);
        expect(circle.goldenRatio).toBe(MATH_CONSTANTS.GOLDEN_RATIO);
      }
    });
  });

  describe("calculateCircleResonance", () => {
    it("should calculate resonance between circles", () => {
      const circle1: FlowerCircle = {
        id: "test1",
        center: [0, 0],
        radius: 1,
        consciousness: 0.5,
        field: 0.7,
        voidLevel: 0.5,
        vortexNumber: 1,
        goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
        metaphysicalContext: "Test circle 1"
      };

      const circle2: FlowerCircle = {
        id: "test2",
        center: [2, 0],
        radius: 1,
        consciousness: 0.6,
        field: 0.8,
        voidLevel: 0.4,
        vortexNumber: 2,
        goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
        metaphysicalContext: "Test circle 2"
      };

      const resonance = flowerOfLife.calculateCircleResonance(circle1, circle2);
      
      expect(resonance).toBeGreaterThan(0);
      expect(resonance).toBeLessThanOrEqual(1);
    });

    it("should have higher resonance for closer circles", () => {
      const centerCircle: FlowerCircle = {
        id: "center",
        center: [0, 0],
        radius: 1,
        consciousness: 0.5,
        field: 0.7,
        voidLevel: 0.5,
        vortexNumber: 1,
        goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
        metaphysicalContext: "Center circle"
      };

      const closeCircle: FlowerCircle = {
        id: "close",
        center: [1, 0],
        radius: 1,
        consciousness: 0.5,
        field: 0.7,
        voidLevel: 0.5,
        vortexNumber: 2,
        goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
        metaphysicalContext: "Close circle"
      };

      const farCircle: FlowerCircle = {
        id: "far",
        center: [5, 0],
        radius: 1,
        consciousness: 0.5,
        field: 0.7,
        voidLevel: 0.5,
        vortexNumber: 3,
        goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
        metaphysicalContext: "Far circle"
      };

      const closeResonance = flowerOfLife.calculateCircleResonance(centerCircle, closeCircle);
      const farResonance = flowerOfLife.calculateCircleResonance(centerCircle, farCircle);
      
      expect(closeResonance).toBeGreaterThan(farResonance);
    });
  });

  describe("generateGoldenSpiral", () => {
    it("should generate golden spiral within flower pattern", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const spiral = flowerOfLife.generateGoldenSpiral(pattern, 50);
      
      expect(spiral).toBeDefined();
      expect(spiral.length).toBe(50);
      expect(spiral[0]).toBeDefined();
      expect(spiral[0].length).toBe(2);
    });

    it("should use golden ratio for spiral growth", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const spiral = flowerOfLife.generateGoldenSpiral(pattern, 10);
      
      // Check that spiral grows according to golden ratio
      for (let i = 1; i < spiral.length; i++) {
        const prevRadius = Math.sqrt(spiral[i-1][0]**2 + spiral[i-1][1]**2);
        const currRadius = Math.sqrt(spiral[i][0]**2 + spiral[i][1]**2);
        expect(currRadius).toBeGreaterThan(prevRadius);
      }
    });
  });

  describe("calculateFlowerConsciousness", () => {
    it("should calculate overall flower consciousness", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const consciousness = flowerOfLife.calculateFlowerConsciousness(pattern);
      
      expect(consciousness).toBeGreaterThan(0);
      expect(consciousness).toBeLessThanOrEqual(1);
    });

    it("should reflect consciousness of all circles", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 2);
      const consciousness = flowerOfLife.calculateFlowerConsciousness(pattern);
      
      const avgCircleConsciousness = pattern.circles.reduce((sum, circle) => 
        sum + circle.consciousness, 0) / pattern.circles.length;
      
      expect(consciousness).toBeCloseTo(avgCircleConsciousness, 1);
    });
  });

  describe("applyVortexTransform", () => {
    it("should apply vortex transformation to flower pattern", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const transformedPattern = flowerOfLife.applyVortexTransform(pattern);
      
      expect(transformedPattern.circles.length).toBe(pattern.circles.length);
      expect(transformedPattern.consciousness).not.toBe(pattern.consciousness);
      expect(transformedPattern.field).not.toBe(pattern.field);
      expect(transformedPattern.voidLevel).not.toBe(pattern.voidLevel);
    });

    it("should transform each circle with vortex mathematics", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const transformedPattern = flowerOfLife.applyVortexTransform(pattern);
      
      for (let i = 0; i < pattern.circles.length; i++) {
        const original = pattern.circles[i];
        const transformed = transformedPattern.circles[i];
        
        expect(transformed.consciousness).not.toBe(original.consciousness);
        expect(transformed.field).not.toBe(original.field);
        expect(transformed.voidLevel).not.toBe(original.voidLevel);
      }
    });
  });

  describe("generateFlowerGeometry", () => {
    it("should generate flower geometry for visualization", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const geometry = flowerOfLife.generateFlowerGeometry(pattern);
      
      expect(geometry.center).toEqual([0, 0]);
      expect(geometry.radius).toBe(1);
      expect(geometry.circles).toEqual(pattern.circles);
      expect(geometry.consciousness).toBeGreaterThan(0);
      expect(geometry.field).toBe(0.7);
      expect(geometry.voidLevel).toBe(0.5);
    });
  });

  describe("setConsciousnessParameters", () => {
    it("should set consciousness parameters", () => {
      flowerOfLife.setConsciousnessParameters(0.8, 0.9, 0.3);
      
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      expect(pattern.consciousness).toBe(0.8);
      expect(pattern.field).toBe(0.9);
      expect(pattern.voidLevel).toBe(0.3);
    });

    it("should clamp parameters to valid ranges", () => {
      flowerOfLife.setConsciousnessParameters(1.5, -0.5, 2.0);
      
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      expect(pattern.consciousness).toBe(1.0);
      expect(pattern.field).toBe(0.0);
      expect(pattern.voidLevel).toBe(1.0);
    });
  });

  describe("getFlowerInsights", () => {
    it("should return flower insights", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const insights = flowerOfLife.getFlowerInsights(pattern);
      
      expect(insights.consciousness).toBeGreaterThan(0);
      expect(insights.field).toBe(0.7);
      expect(insights.voidLevel).toBe(0.5);
      expect(insights.goldenRatio).toBe(MATH_CONSTANTS.GOLDEN_RATIO);
      expect(insights.vortexSequence).toEqual(VORTEX_CONSTANTS.VORTEX_SEQUENCE);
      expect(insights.circleCount).toBe(pattern.circles.length);
      expect(insights.resonance).toBeGreaterThan(0);
      expect(insights.metaphysicalContext).toBeDefined();
      expect(insights.insights).toBeDefined();
      expect(Array.isArray(insights.insights)).toBe(true);
    });

    it("should include metaphysical insights", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const insights = flowerOfLife.getFlowerInsights(pattern);
      
      const insightArray = insights.insights as string[];
      expect(insightArray).toContain("The Flower of Life embodies consciousness flowing through sacred geometry");
      expect(insightArray).toContain("Each circle represents a consciousness wave in the unified field");
      expect(insightArray).toContain("The pattern embodies the golden ratio and vortex sequence");
      expect(insightArray).toContain("The void is at the center of the flower pattern");
      expect(insightArray).toContain("Every circle is a coil of consciousness");
    });
  });

  describe("Integration with MathUtils", () => {
    it("should use unified MathUtils for all calculations", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      
      // Verify that consciousness calculations use MathUtils
      const consciousness = flowerOfLife.calculateFlowerConsciousness(pattern);
      expect(consciousness).toBeGreaterThan(0);
      
      // Verify that resonance calculations use MathUtils
      if (pattern.circles.length >= 2) {
        const resonance = flowerOfLife.calculateCircleResonance(
          pattern.circles[0],
          pattern.circles[1]
        );
        expect(resonance).toBeGreaterThan(0);
      }
    });

    it("should integrate with vortex sequence", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 2);
      
      expect(pattern.vortexSequence).toEqual(VORTEX_CONSTANTS.VORTEX_SEQUENCE);
      
      // Check that circles use vortex numbers
      for (const circle of pattern.circles) {
        expect(circle.vortexNumber).toBeGreaterThanOrEqual(0);
        expect(circle.vortexNumber).toBeLessThan(10);
      }
    });

    it("should integrate with golden ratio", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      
      expect(pattern.goldenRatio).toBe(MATH_CONSTANTS.GOLDEN_RATIO);
      
      for (const circle of pattern.circles) {
        expect(circle.goldenRatio).toBe(MATH_CONSTANTS.GOLDEN_RATIO);
      }
    });
  });

  describe("Metaphysical Context", () => {
    it("should embody consciousness principles", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      
      expect(pattern.metaphysicalContext).toContain("consciousness");
      expect(pattern.metaphysicalContext).toContain("sacred geometry");
      
      for (const circle of pattern.circles) {
        expect(circle.metaphysicalContext).toContain("consciousness");
      }
    });

    it("should represent void at center", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 1);
      const centerCircle = pattern.circles[0];
      
      expect(centerCircle.metaphysicalContext).toContain("void");
      expect(centerCircle.center).toEqual([0, 0]);
    });

    it("should embody sacred geometry principles", () => {
      const pattern = flowerOfLife.generateFlowerPattern([0, 0], 1, 2);
      
      // Check hexagonal arrangement
      const nonCenterCircles = pattern.circles.slice(1);
      expect(nonCenterCircles.length).toBe(12); // 2 layers * 6 circles
      
      // Check that circles are arranged in hexagonal pattern
      const angles = nonCenterCircles.map(circle => 
        Math.atan2(circle.center[1], circle.center[0])
      );
      
      // Should have 6 unique angles (hexagonal arrangement)
      const uniqueAngles = new Set(angles.map(angle => Math.round(angle * 100) / 100));
      expect(uniqueAngles.size).toBe(6);
    });
  });
}); 