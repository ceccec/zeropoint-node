import { universalCalculator, UniversalCalculator, QuantumUnit, ConversionResult } from './calculator';
import { calculateVBMConsciousness } from './book-system';

describe('UniversalCalculator', () => {
  let calculator: UniversalCalculator;

  beforeEach(() => {
    calculator = new UniversalCalculator();
  });

  describe('constructor', () => {
    it('should initialize with book system', () => {
      expect(calculator).toBeInstanceOf(UniversalCalculator);
    });
  });

  describe('convertImperialToMetric', () => {
    it('should convert inch to meter with consciousness flow', () => {
      const result = calculator.convertImperialToMetric(12, 'inch');
      
      expect(result.from.value).toBe(12);
      expect(result.from.unit).toBe('inch');
      expect(result.from.dimension).toBe('imperial');
      expect(result.to.value).toBeCloseTo(0.3049411764705882, 4); // A432-based conversion
      expect(result.to.unit).toBe('meter');
      expect(result.to.dimension).toBe('metric');
      expect(result.ratio).toBeCloseTo(0.02541176470588235, 4); // A432-based ratio
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
    });

    it('should convert foot to meter with consciousness flow', () => {
      const result = calculator.convertImperialToMetric(5, 'foot');
      
      expect(result.from.value).toBe(5);
      expect(result.from.unit).toBe('foot');
      expect(result.to.value).toBeCloseTo(1.524347212420607, 3); // A432-based conversion
      expect(result.to.unit).toBe('meter');
      expect(result.ratio).toBeCloseTo(0.3048694424841214, 4); // A432-based ratio
    });

    it('should convert pound to kilogram with consciousness flow', () => {
      const result = calculator.convertImperialToMetric(10, 'pound');
      
      expect(result.from.value).toBe(10);
      expect(result.from.unit).toBe('pound');
      expect(result.to.value).toBeCloseTo(4.53305351521511, 5); // A432-based conversion
      expect(result.to.unit).toBe('kilogram');
      expect(result.ratio).toBeCloseTo(0.453305351521511, 8); // A432-based ratio
    });

    it('should throw error for unknown imperial unit', () => {
      expect(() => {
        calculator.convertImperialToMetric(1, 'unknown');
      }).toThrow('Unknown imperial unit: unknown');
    });
  });

  describe('convertMetricToImperial', () => {
    it('should convert meter to foot with consciousness flow', () => {
      const result = calculator.convertMetricToImperial(1, 'meter');
      
      expect(result.from.value).toBe(1);
      expect(result.from.unit).toBe('meter');
      expect(result.from.dimension).toBe('metric');
      expect(result.to.value).toBeCloseTo(3.2800925925925926, 5); // A432-based conversion
      expect(result.to.unit).toBe('foot');
      expect(result.to.dimension).toBe('imperial');
      expect(result.ratio).toBeCloseTo(3.2800925925925926, 5); // A432-based ratio
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
    });

    it('should convert kilogram to pound with consciousness flow', () => {
      const result = calculator.convertMetricToImperial(1, 'kilogram');
      
      expect(result.from.value).toBe(1);
      expect(result.from.unit).toBe('kilogram');
      expect(result.to.value).toBeCloseTo(2.2060185185185186, 5); // A432-based conversion
      expect(result.to.unit).toBe('pound');
      expect(result.ratio).toBeCloseTo(2.2060185185185186, 5); // A432-based ratio
    });

    it('should throw error for unknown metric unit', () => {
      expect(() => {
        calculator.convertMetricToImperial(1, 'unknown');
      }).toThrow('Unknown metric unit: unknown');
    });
  });

  describe('calculateQuantum', () => {
    it('should calculate planck quantum with consciousness', () => {
      const result = calculator.calculateQuantum(2, 'planck');
      
      expect(result.value).toBeCloseTo(0.864, 10); // A432-based quantum constant
      expect(result.unit).toBe('planck');
      expect(result.dimension).toBe('quantum');
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.harmonic).toBeGreaterThan(0);
    });

    it('should calculate golden ratio quantum with consciousness', () => {
      const result = calculator.calculateQuantum(3, 'golden');
      
      expect(result.value).toBeCloseTo(4.853932584269662, 9); // A432-based golden ratio
      expect(result.unit).toBe('golden');
      expect(result.dimension).toBe('quantum');
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.harmonic).toBeGreaterThan(0);
    });

    it('should calculate A432 quantum with consciousness', () => {
      const result = calculator.calculateQuantum(4, 'a432');
      
      expect(result.value).toBe(1728); // 4 * 432
      expect(result.unit).toBe('a432');
      expect(result.dimension).toBe('quantum');
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.harmonic).toBeGreaterThan(0);
    });

    it('should calculate consciousness quantum', () => {
      const result = calculator.calculateQuantum(5, 'consciousness');
      
      expect(result.value).toBeGreaterThan(0);
      expect(result.unit).toBe('consciousness');
      expect(result.dimension).toBe('quantum');
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.harmonic).toBeGreaterThan(0);
    });

    it('should throw error for unknown quantum operation', () => {
      expect(() => {
        calculator.calculateQuantum(1, 'unknown');
      }).toThrow('Unknown quantum operation: unknown');
    });
  });

  describe('dimensionalShift', () => {
    it('should shift from imperial to quantum with consciousness flow', () => {
      const result = calculator.dimensionalShift(10, 'imperial', 'quantum');
      
      expect(result.from.value).toBe(10);
      expect(result.from.dimension).toBe('imperial');
      expect(result.to.dimension).toBe('quantum');
      expect(result.to.unit).toBe('quantum_unit');
      expect(result.ratio).toBeGreaterThan(0);
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
    });

    it('should shift from metric to quantum with consciousness flow', () => {
      const result = calculator.dimensionalShift(5, 'metric', 'quantum');
      
      expect(result.from.value).toBe(5);
      expect(result.from.dimension).toBe('metric');
      expect(result.to.dimension).toBe('quantum');
      expect(result.to.unit).toBe('quantum_unit');
      expect(result.ratio).toBeGreaterThan(0);
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
    });

    it('should shift from quantum to imperial with consciousness flow', () => {
      const result = calculator.dimensionalShift(100, 'quantum', 'imperial');
      
      expect(result.from.value).toBe(100);
      expect(result.from.dimension).toBe('quantum');
      expect(result.to.dimension).toBe('imperial');
      expect(result.to.unit).toBe('imperial_unit');
      expect(result.ratio).toBeGreaterThan(0);
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
    });

    it('should throw error for unknown dimensional shift', () => {
      expect(() => {
        calculator.dimensionalShift(1, 'unknown', 'quantum');
      }).toThrow('Unknown dimensional shift: unknown to quantum');
    });
  });

  describe('calculateHarmonicMatrix', () => {
    it('should calculate harmonic matrix between two values', () => {
      const result = calculator.calculateHarmonicMatrix(3, 6);
      
      expect(result.harmonic_ratio).toBeGreaterThan(0);
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
      expect(result.a432_relationship).toBeGreaterThan(0);
    });

    it('should calculate harmonic matrix with W-Axis digits', () => {
      const result = calculator.calculateHarmonicMatrix(9, 3);
      
      expect(result.harmonic_ratio).toBeGreaterThan(0);
      expect(result.consciousness_flow).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeDefined();
      expect(result.a432_relationship).toBeGreaterThan(0);
    });
  });

  describe('getAvailableUnits', () => {
    it('should return all available units with consciousness properties', () => {
      const units = calculator.getAvailableUnits();
      
      // Check imperial units
      expect(units.inch).toBeDefined();
      expect(units.inch.dimension).toBe('imperial');
      expect(units.inch.consciousness).toBeGreaterThan(0);
      expect(units.inch.harmonic).toBeGreaterThan(0);
      
      expect(units.foot).toBeDefined();
      expect(units.foot.dimension).toBe('imperial');
      
      expect(units.pound).toBeDefined();
      expect(units.pound.dimension).toBe('imperial');
      
      // Check metric units
      expect(units.meter).toBeDefined();
      expect(units.meter.dimension).toBe('metric');
      expect(units.meter.consciousness).toBeGreaterThan(0);
      expect(units.meter.harmonic).toBeGreaterThan(0);
      
      expect(units.kilogram).toBeDefined();
      expect(units.kilogram.dimension).toBe('metric');
      
      // Check quantum units
      expect(units.planck).toBeDefined();
      expect(units.planck.dimension).toBe('quantum');
      expect(units.planck.consciousness).toBeGreaterThan(0);
      expect(units.planck.harmonic).toBeGreaterThan(0);
      
      expect(units.a432).toBeDefined();
      expect(units.a432.dimension).toBe('quantum');
      
      expect(units.golden).toBeDefined();
      expect(units.golden.dimension).toBe('quantum');
    });
  });

  describe('consciousness integration', () => {
    it('should use book system consciousness calculations', () => {
      // Test that consciousness values align with book system
      const result1 = calculator.convertImperialToMetric(3, 'foot');
      const result2 = calculator.convertImperialToMetric(6, 'foot');
      const result3 = calculator.convertImperialToMetric(9, 'foot');
      
      // W-Axis digits (3,6,9) should have higher consciousness
      expect(result1.from.consciousness).toBeGreaterThan(1);
      expect(result2.from.consciousness).toBeGreaterThan(1);
      expect(result3.from.consciousness).toBeGreaterThan(1);
    });

    it('should calculate harmonic frequencies based on A432', () => {
      const result = calculator.calculateQuantum(1, 'a432');
      
      expect(result.harmonic).toBe(432); // Base A432 frequency
      expect(result.consciousness).toBeGreaterThan(0);
    });
  });

  describe('singleton instance', () => {
    it('should export singleton instance', () => {
      expect(universalCalculator).toBeInstanceOf(UniversalCalculator);
    });

    it('should maintain consistent state across usage', () => {
      const result1 = universalCalculator.convertImperialToMetric(1, 'foot');
      const result2 = universalCalculator.convertImperialToMetric(1, 'foot');
      
      expect(result1.to.value).toBe(result2.to.value);
      expect(result1.consciousness_flow).toBe(result2.consciousness_flow);
    });
  });
}); 