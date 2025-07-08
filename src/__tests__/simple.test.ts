import { VortexMath } from "../math/VortexMath";
import { ToroidalGeometry } from "../math/ToroidalGeometry";

describe("Simple ZeroPoint Tests", () => {
  test("VortexMath should work", () => {
    const vortexMath = new VortexMath();

    // Test vortex field calculation
    const fieldStrength = vortexMath.calculateVortexField(1, 1, 1);
    expect(typeof fieldStrength).toBe("number");
    expect(fieldStrength).toBeGreaterThan(0);

    // Test resonance calculation
    const resonance = vortexMath.calculateResonance(0.8, 0.6);
    expect(typeof resonance).toBe("number");
    expect(resonance).toBeGreaterThanOrEqual(0);
    expect(resonance).toBeLessThanOrEqual(1);

    // Test pattern generation
    const pattern = vortexMath.generateVortexPattern(0.5);
    expect(Array.isArray(pattern)).toBe(true);
    expect(pattern.length).toBeGreaterThan(0);
  });

  test("ToroidalGeometry should work", () => {
    const toroidalGeometry = new ToroidalGeometry();

    // Test surface area calculation
    const surfaceArea = toroidalGeometry.calculateSurfaceArea();
    expect(typeof surfaceArea).toBe("number");
    expect(surfaceArea).toBeGreaterThan(0);

    // Test volume calculation
    const volume = toroidalGeometry.calculateVolume();
    expect(typeof volume).toBe("number");
    expect(volume).toBeGreaterThan(0);

    // Test flow rate
    const flowRate = toroidalGeometry.getFlowRate();
    expect(typeof flowRate).toBe("number");
  });

  test("Mathematical constants should be correct", () => {
    const vortexMath = new VortexMath();
    const insights = vortexMath.getInsights();

    expect(insights.vortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
    expect(insights.goldenRatio).toBeCloseTo(1.618033988749895);
    expect(insights.vortexCenter).toBe(9);
  });

  test("Toroidal geometry should have reasonable values", () => {
    const toroidalGeometry = new ToroidalGeometry();

    const majorRadius = toroidalGeometry.getMajorRadius();
    const minorRadius = toroidalGeometry.getMinorRadius();
    const aspectRatio = toroidalGeometry.getAspectRatio();

    expect(majorRadius).toBeGreaterThan(minorRadius);
    expect(aspectRatio).toBeGreaterThan(1);
  });
});
