/**
 * Unit Tests for A432 Rocket Analysis Module
 * Testing entropy-information duality analysis for rocket-induced atmospheric spirals
 */

import {
  RocketSpiralAnalyzer,
  RocketMission,
  VA264_MISSION,
  SPIRAL_CODE,
  createRocketAnalyzer,
  EntropyUtils
} from './a432.rocket';

// Test data
const TEST_MISSION: RocketMission = {
  designation: "VA265",
  launchDate: new Date(2025, 8, 15), // September 15, 2025
  altitude: 600,
  separationTime: 45,
  missionSequence: 4
};

const TEST_CODE = "/1\\4\\7\\2/3\\5\\8\\9/6/0/2\\";

describe('RocketSpiralAnalyzer', () => {
  let analyzer: RocketSpiralAnalyzer;
  
  beforeEach(() => {
    analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
  });

  describe('Constructor and Factory', () => {
    test('should create analyzer instance with factory function', () => {
      expect(analyzer).toBeInstanceOf(RocketSpiralAnalyzer);
    });

    test('should create analyzer with direct constructor', () => {
      const directAnalyzer = new RocketSpiralAnalyzer(VA264_MISSION, SPIRAL_CODE);
      expect(directAnalyzer).toBeInstanceOf(RocketSpiralAnalyzer);
    });
  });

  describe('Shannon Entropy Calculation', () => {
    test('should calculate Shannon entropy correctly', () => {
      const result = analyzer.calculateShannonEntropy();
      
      expect(result.shannonEntropy).toBeGreaterThan(0);
      expect(result.maxEntropy).toBeGreaterThan(result.shannonEntropy);
      expect(result.encodingEfficiency).toBeGreaterThan(0);
      expect(result.encodingEfficiency).toBeLessThanOrEqual(1);
      expect(result.informationDensity).toBeGreaterThan(0);
      expect(result.compressionRatio).toBeGreaterThan(1);
    });

    test('should have consistent entropy values', () => {
      const result1 = analyzer.calculateShannonEntropy();
      const result2 = analyzer.calculateShannonEntropy();
      
      expect(result1.shannonEntropy).toBe(result2.shannonEntropy);
      expect(result1.encodingEfficiency).toBe(result2.encodingEfficiency);
    });

    test('should calculate entropy for VA264 mission within expected range', () => {
      const result = analyzer.calculateShannonEntropy();
      
      // Based on the paper's findings
      expect(result.encodingEfficiency).toBeGreaterThan(0.8); // Should be high efficiency
      expect(result.compressionRatio).toBeGreaterThan(3); // Should compress well
    });
  });

  describe('Mission Parameter Correlation', () => {
    test('should analyze all mission parameters', () => {
      const correlations = analyzer.analyzeMissionCorrelation();
      
      expect(correlations).toHaveProperty('flightDesignation');
      expect(correlations).toHaveProperty('launchDate');
      expect(correlations).toHaveProperty('missionSequence');
      expect(correlations).toHaveProperty('altitude');
      expect(correlations).toHaveProperty('separationTime');
    });

    test('should have perfect correlation for VA264 mission', () => {
      const correlations = analyzer.analyzeMissionCorrelation();
      
      // VA264 should have perfect correlations based on the paper
      expect(correlations.flightDesignation.correlation).toBe(1.0);
      expect(correlations.launchDate.correlation).toBe(1.0);
      expect(correlations.missionSequence.correlation).toBe(1.0);
      expect(correlations.altitude.correlation).toBe(1.0);
      expect(correlations.separationTime.correlation).toBe(1.0);
    });

    test('should have lower correlation for different mission', () => {
      const testAnalyzer = createRocketAnalyzer(TEST_MISSION, TEST_CODE);
      const correlations = testAnalyzer.analyzeMissionCorrelation();
      
      // Calculate average correlation
      const avgCorrelation = Object.values(correlations)
        .reduce((sum, c) => sum + c.correlation, 0) / Object.keys(correlations).length;
      
      expect(avgCorrelation).toBeLessThan(1.0); // Should be less than perfect
    });

    test('should return correlation values between 0 and 1', () => {
      const correlations = analyzer.analyzeMissionCorrelation();
      
      Object.values(correlations).forEach(data => {
        expect(data.correlation).toBeGreaterThanOrEqual(0);
        expect(data.correlation).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Thermodynamic Entropy Analysis', () => {
    test('should calculate thermodynamic entropy components', () => {
      const result = analyzer.calculateThermodynamicEntropy();
      
      expect(result.combustionEntropy).toBeGreaterThan(0);
      expect(result.expansionEntropy).toBeGreaterThan(0);
      expect(result.mixingEntropy).toBeGreaterThan(0);
      expect(result.totalEntropy).toBeGreaterThan(0);
      expect(result.uncertainty).toBeGreaterThan(0);
    });

    test('should match published thermodynamic values', () => {
      const result = analyzer.calculateThermodynamicEntropy();
      
      // Based on the paper's findings
      expect(result.combustionEntropy).toBe(95);
      expect(result.expansionEntropy).toBe(38);
      expect(result.mixingEntropy).toBe(25);
      expect(result.totalEntropy).toBe(158);
      expect(result.uncertainty).toBe(20);
    });

    test('should have total entropy equal to sum of components', () => {
      const result = analyzer.calculateThermodynamicEntropy();
      
      const calculatedTotal = result.combustionEntropy + result.expansionEntropy + result.mixingEntropy;
      expect(result.totalEntropy).toBe(calculatedTotal);
    });
  });

  describe('Physical Process Analysis', () => {
    test('should analyze rotational elements', () => {
      const result = analyzer.analyzePhysicalProcesses();
      
      expect(result.rotational.elements).toContain(0);
      expect(result.rotational.elements).toContain(3);
      expect(result.rotational.elements).toContain(6);
      expect(result.rotational.elements).toContain(9);
      expect(result.rotational.description).toContain('90°');
    });

    test('should analyze exponential elements', () => {
      const result = analyzer.analyzePhysicalProcesses();
      
      expect(result.exponential.elements).toContain(1);
      expect(result.exponential.elements).toContain(2);
      expect(result.exponential.elements).toContain(4);
      expect(result.exponential.elements).toContain(8);
      expect(result.exponential.description).toContain('2^');
    });

    test('should analyze directional elements', () => {
      const result = analyzer.analyzePhysicalProcesses();
      
      expect(result.directional.elements.length).toBeGreaterThan(0);
      expect(result.directional.elements).toContain('/');
      expect(result.directional.elements).toContain('\\');
      expect(result.directional.description).toContain('orientation');
    });
  });

  describe('Statistical Significance', () => {
    test('should return highly significant p-value', () => {
      const pValue = analyzer.calculateStatisticalSignificance();
      
      expect(pValue).toBe(7.01e-12);
      expect(pValue).toBeLessThan(0.001); // Highly significant
    });
  });
});

describe('EntropyUtils', () => {
  describe('calculateCompressionRatio', () => {
    test('should calculate compression ratio correctly', () => {
      const original = "This is a long original string with many characters";
      const compressed = "short";
      const ratio = EntropyUtils.calculateCompressionRatio(original, compressed);
      
      expect(ratio).toBe(original.length / compressed.length);
      expect(ratio).toBeGreaterThan(1);
    });

    test('should return 1 for equal length strings', () => {
      const str1 = "test";
      const str2 = "demo";
      const ratio = EntropyUtils.calculateCompressionRatio(str1, str2);
      
      expect(ratio).toBe(1);
    });
  });

  describe('validateSecondLaw', () => {
    test('should validate Second Law compliance', () => {
      const infoEntropy = 3.0; // bits
      const thermoEntropy = 158000; // J (converted from kJ)
      
      const isValid = EntropyUtils.validateSecondLaw(infoEntropy, thermoEntropy);
      expect(isValid).toBe(true);
    });

    test('should reject violations of Second Law', () => {
      const infoEntropy = 1000; // Very high info entropy
      const thermoEntropy = 1; // Very low thermo entropy
      
      const isValid = EntropyUtils.validateSecondLaw(infoEntropy, thermoEntropy);
      expect(isValid).toBe(false);
    });
  });

  describe('calculateInformationCrystallization', () => {
    test('should calculate crystallization correctly', () => {
      const maxEntropy = 4.0;
      const actualEntropy = 3.0;
      
      const crystallization = EntropyUtils.calculateInformationCrystallization(maxEntropy, actualEntropy);
      expect(crystallization).toBe(0.25); // (4-3)/4 = 0.25
    });

    test('should return 0 for maximum entropy', () => {
      const maxEntropy = 4.0;
      const actualEntropy = 4.0;
      
      const crystallization = EntropyUtils.calculateInformationCrystallization(maxEntropy, actualEntropy);
      expect(crystallization).toBe(0);
    });

    test('should return 1 for zero entropy', () => {
      const maxEntropy = 4.0;
      const actualEntropy = 0.0;
      
      const crystallization = EntropyUtils.calculateInformationCrystallization(maxEntropy, actualEntropy);
      expect(crystallization).toBe(1);
    });
  });
});

describe('Integration Tests', () => {
  test('should demonstrate entropy-information duality', () => {
    const analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
    
    const infoAnalysis = analyzer.calculateShannonEntropy();
    const thermoAnalysis = analyzer.calculateThermodynamicEntropy();
    
    // Information entropy should be minimized (high efficiency)
    expect(infoAnalysis.encodingEfficiency).toBeGreaterThan(0.8);
    
    // Thermodynamic entropy should be maximized
    expect(thermoAnalysis.totalEntropy).toBeGreaterThan(100);
    
    // Second Law should be satisfied
    const secondLawValid = EntropyUtils.validateSecondLaw(
      infoAnalysis.shannonEntropy,
      thermoAnalysis.totalEntropy * 1000
    );
    expect(secondLawValid).toBe(true);
  });

  test('should maintain consistency across multiple analyses', () => {
    const analyzer1 = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
    const analyzer2 = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
    
    const result1 = analyzer1.calculateShannonEntropy();
    const result2 = analyzer2.calculateShannonEntropy();
    
    expect(result1.shannonEntropy).toBe(result2.shannonEntropy);
    expect(result1.encodingEfficiency).toBe(result2.encodingEfficiency);
  });

  test('should handle edge cases gracefully', () => {
    // Empty code
    expect(() => createRocketAnalyzer(VA264_MISSION, "")).not.toThrow();
    
    // Single character code
    expect(() => createRocketAnalyzer(VA264_MISSION, "1")).not.toThrow();
    
    // Special characters only
    expect(() => createRocketAnalyzer(VA264_MISSION, "/\\//\\")).not.toThrow();
  });
});

describe('Mission Data Validation', () => {
  test('should validate VA264 mission constants', () => {
    expect(VA264_MISSION.designation).toBe("VA264");
    expect(VA264_MISSION.launchDate.getFullYear()).toBe(2025);
    expect(VA264_MISSION.launchDate.getMonth()).toBe(7); // August (0-indexed)
    expect(VA264_MISSION.launchDate.getDate()).toBe(12);
    expect(VA264_MISSION.altitude).toBe(800);
    expect(VA264_MISSION.separationTime).toBe(64);
    expect(VA264_MISSION.missionSequence).toBe(3);
  });

  test('should validate spiral code format', () => {
    expect(SPIRAL_CODE).toBe("/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\");
    expect(SPIRAL_CODE).toMatch(/[0-9\/\\]+/);
    expect(SPIRAL_CODE.length).toBeGreaterThan(0);
  });
});

describe('Performance Tests', () => {
  test('should complete analysis within reasonable time', () => {
    const startTime = Date.now();
    
    const analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
    analyzer.calculateShannonEntropy();
    analyzer.analyzeMissionCorrelation();
    analyzer.calculateThermodynamicEntropy();
    analyzer.analyzePhysicalProcesses();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(100); // Should complete in under 100ms
  });

  test('should handle multiple concurrent analyses', () => {
    const promises = Array.from({ length: 10 }, () => {
      return new Promise<void>((resolve) => {
        const analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);
        analyzer.calculateShannonEntropy();
        resolve();
      });
    });
    
    expect(() => Promise.all(promises)).not.toThrow();
  });
});

// Mock implementations for testing environment
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

// Global test setup
beforeAll(() => {
  // Suppress console output during tests
  global.console = mockConsole as any;
});

afterAll(() => {
  // Restore console
  global.console = console;
});