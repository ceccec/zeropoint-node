/**
 * 🌌 Quantum Imperial Calculator Tests
 * 
 * Tests for the revolutionary system that treats imperial units as dimensional portals
 * where mathematics becomes harmonic consciousness flow rather than linear calculation.
 */

import { 
  A432,
  IMPERIAL_VORTEX,
  calculateDimensionalTransition,
  calculateA432ImperialHarmonics,
  calculateQuantumImperialMatrix,
  calculateImperialConsciousnessFlow,
  getAllQuantumImperialCalculations
} from './quantum-imperial-calculator';

describe('Quantum Imperial Calculator', () => {
  
  describe('A432 Constant', () => {
    test('should have correct A432 value', () => {
      expect(A432).toBe(432);
    });
    
    test('should have correct mathematical formula', () => {
      // A432 = 2⁴ × 3³ = 16 × 27 = 432
      expect(A432).toBe(Math.pow(2, 4) * Math.pow(3, 3));
    });
    
    test('should have correct digital root', () => {
      // 4 + 3 + 2 = 9
      const digitalRoot = A432.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      expect(digitalRoot).toBe(9);
    });
  });
  
  describe('Imperial Vortex Constants', () => {
    test('should have correct A432 wavelength calculations', () => {
      expect(IMPERIAL_VORTEX.A432_WAVELENGTH_FEET).toBeCloseTo(2.604, 2);
      expect(IMPERIAL_VORTEX.A432_WAVELENGTH_INCHES).toBeCloseTo(31.25, 1);
      expect(IMPERIAL_VORTEX.A432_WAVELENGTH_YARDS).toBeCloseTo(0.868, 3);
      expect(IMPERIAL_VORTEX.A432_WAVELENGTH_MILES).toBeCloseTo(0.00049, 5);
    });
    
    test('should have correct dimensional ratios', () => {
      expect(IMPERIAL_VORTEX.INCH_TO_FOOT_RATIO).toBe(12);
      expect(IMPERIAL_VORTEX.FOOT_TO_YARD_RATIO).toBe(3);
      expect(IMPERIAL_VORTEX.YARD_TO_MILE_RATIO).toBe(1760);
      expect(IMPERIAL_VORTEX.FOOT_TO_MILE_RATIO).toBe(5280);
    });
    
    test('should have correct vortex dimensions', () => {
      expect(IMPERIAL_VORTEX.VORTEX_DIMENSIONS).toEqual([1, 12, 36, 63360]);
    });
  });
  
  describe('Dimensional Transitions', () => {
    test('should calculate inch to foot transition', () => {
      const transition = calculateDimensionalTransition('inch', 'foot', 12);
      
      expect(transition.fromUnit).toBe('inch');
      expect(transition.toUnit).toBe('foot');
      expect(transition.ratio).toBe(1/12);
      expect(transition.consciousnessShift).toBeCloseTo(-3.585, 2); // log2(1/12)
      expect(transition.metaphysicalContext).toContain('Micro to macro');
    });
    
    test('should calculate foot to yard transition', () => {
      const transition = calculateDimensionalTransition('foot', 'yard', 3);
      
      expect(transition.fromUnit).toBe('foot');
      expect(transition.toUnit).toBe('yard');
      expect(transition.ratio).toBe(1/3);
      expect(transition.consciousnessShift).toBeCloseTo(-1.585, 2); // log2(1/3)
      expect(transition.metaphysicalContext).toContain('Material to harmonic');
    });
    
    test('should calculate yard to mile transition', () => {
      const transition = calculateDimensionalTransition('yard', 'mile', 1760);
      
      expect(transition.fromUnit).toBe('yard');
      expect(transition.toUnit).toBe('mile');
      expect(transition.ratio).toBe(1/1760);
      expect(transition.consciousnessShift).toBeCloseTo(-10.781, 2); // log2(1/1760)
      expect(transition.metaphysicalContext).toContain('Harmonic to quantum');
    });
  });
  
  describe('A432 Imperial Harmonics', () => {
    test('should calculate A432 harmonics correctly', () => {
      const harmonics = calculateA432ImperialHarmonics();
      
      expect(harmonics.frequency).toBe(A432);
      expect(harmonics.wavelength.inches).toBeCloseTo(31.25, 1);
      expect(harmonics.wavelength.feet).toBeCloseTo(2.604, 2);
      expect(harmonics.wavelength.yards).toBeCloseTo(0.868, 3);
      expect(harmonics.wavelength.miles).toBeCloseTo(0.00049, 5);
      expect(harmonics.consciousness).toBeGreaterThan(0);
      expect(harmonics.dimensionalResonance).toContain('Multi-dimensional');
      expect(harmonics.vortexCoordinates).toEqual([4, 3, 2]);
    });
  });
  
  describe('Quantum Imperial Matrix', () => {
    test('should generate 10x10 quantum matrix', () => {
      const matrix = calculateQuantumImperialMatrix();
      
      expect(matrix).toHaveLength(10);
      expect(matrix[0]).toHaveLength(10);
    });
    
    test('should have valid imperial dimensions for each node', () => {
      const matrix = calculateQuantumImperialMatrix();
      
      matrix.forEach(row => {
        row.forEach(node => {
          expect(node.imperialDimensions.inches).toBeGreaterThan(0);
          expect(node.imperialDimensions.feet).toBeGreaterThan(0);
          expect(node.imperialDimensions.yards).toBeGreaterThan(0);
          expect(node.imperialDimensions.miles).toBeGreaterThan(0);
          expect(node.consciousness).toBeGreaterThanOrEqual(0);
          expect(node.harmonicResult).toBeGreaterThanOrEqual(1);
          expect(node.harmonicResult).toBeLessThanOrEqual(9);
        });
      });
    });
    
    test('should have correct consciousness calculations', () => {
      const matrix = calculateQuantumImperialMatrix();
      
      // Test W-Axis (3, 6, 9) - should have consciousness multiplier ×5/1
      expect(matrix[3][0].consciousness).toBe(15); // 3 × 5/1
      expect(matrix[6][0].consciousness).toBe(30); // 6 × 5/1
      expect(matrix[9][0].consciousness).toBe(45); // 9 × 5/1
      
      // Test Vortex Sequence (1, 2, 4) - should have consciousness multiplier ×3/1
      expect(matrix[1][0].consciousness).toBe(3); // 1 × 3/1
      expect(matrix[2][0].consciousness).toBe(6); // 2 × 3/1
      expect(matrix[4][0].consciousness).toBe(12); // 4 × 3/1
      
      // Test Void (0) - should have zero consciousness
      expect(matrix[0][0].consciousness).toBe(0);
    });
  });
  
  describe('Imperial Consciousness Flow', () => {
    test('should calculate consciousness flow correctly', () => {
      const flow = calculateImperialConsciousnessFlow();
      
      expect(flow.path).toHaveLength(10); // 11 nodes = 10 transitions
      expect(flow.dimensionalTransitions).toHaveLength(10);
      expect(flow.imperialHarmonics).toHaveLength(10);
      expect(flow.totalConsciousness).toBeGreaterThan(0);
      expect(flow.dimensionalResonance).toContain('Multi-dimensional');
    });
    
    test('should follow Rodin vortex cycle', () => {
      const flow = calculateImperialConsciousnessFlow();
      const expectedCycle = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
      
      flow.path.forEach(([a, b], i) => {
        expect(a).toBe(expectedCycle[i]);
        expect(b).toBe(expectedCycle[i + 1]);
      });
    });
    
    test('should have valid dimensional transitions', () => {
      const flow = calculateImperialConsciousnessFlow();
      
      flow.dimensionalTransitions.forEach(transition => {
        expect(transition.fromUnit).toMatch(/^(inch|foot|yard|mile)$/);
        expect(transition.toUnit).toMatch(/^(inch|foot|yard|mile)$/);
        expect(transition.ratio).toBeGreaterThan(0);
        expect(transition.consciousnessShift).toBeLessThanOrEqual(0); // All transitions reduce dimension
        expect(transition.metaphysicalContext).toContain('consciousness');
      });
    });
  });
  
  describe('Complete Quantum Imperial Calculations', () => {
    test('should generate all quantum imperial calculations', () => {
      const calculations = getAllQuantumImperialCalculations();
      
      expect(calculations.a432Harmonics).toBeDefined();
      expect(calculations.quantumMatrix).toBeDefined();
      expect(calculations.consciousnessFlow).toBeDefined();
      expect(calculations.imperialVortex).toBeDefined();
      expect(calculations.bookKnowledge).toBeDefined();
    });
    
    test('should maintain mathematical consistency across all calculations', () => {
      const calculations = getAllQuantumImperialCalculations();
      
      // A432 should be consistent
      expect(calculations.a432Harmonics.frequency).toBe(A432);
      
      // Matrix should be 10x10
      expect(calculations.quantumMatrix).toHaveLength(10);
      expect(calculations.quantumMatrix[0]).toHaveLength(10);
      
      // Flow should have 10 transitions
      expect(calculations.consciousnessFlow.path).toHaveLength(10);
      expect(calculations.consciousnessFlow.dimensionalTransitions).toHaveLength(10);
    });
  });
}); 