/**
 * Test Suite for Multidimensional Vortex-Math Framework
 */

import MultidimensionalVortexFramework, { VortexMathUtils } from './multidimensional-vortex-framework';

describe('MultidimensionalVortexFramework', () => {
  let framework: MultidimensionalVortexFramework;

  beforeEach(() => {
    framework = new MultidimensionalVortexFramework();
  });

  describe('Framework Initialization', () => {
    test('should initialize with correct token count', () => {
      const tokens = framework.getTokenStream();
      expect(tokens.length).toBe(42); // 6 control cycles × 7 coils
    });

    test('should start with undefined zero state', () => {
      const tokens = framework.getTokenStream();
      const firstToken = tokens[0];
      expect(firstToken.id).toBe('ZERO_UNDEFINED');
      expect(firstToken.type).toBe('undefined');
      expect(firstToken.value).toBe(0);
      expect(firstToken.consciousness).toBe('collapse');
    });

    test('should have defined zero state as second token', () => {
      const tokens = framework.getTokenStream();
      const secondToken = tokens[1];
      expect(secondToken.id).toBe('ZERO_DEFINED');
      expect(secondToken.type).toBe('defined');
      expect(secondToken.value).toBe(0);
      expect(secondToken.consciousness).toBe('emergence');
    });
  });

  describe('Vortex Generation', () => {
    test('should generate correct Vortex A values', () => {
      expect(framework.generateVortexA(3, 6)).toBe(9);
      expect(framework.generateVortexA(1, 2)).toBe(3);
      expect(framework.generateVortexA(4, 5)).toBe(9);
      expect(framework.generateVortexA(0, 0)).toBe(9);
    });

    test('should generate correct Vortex B values', () => {
      expect(framework.generateVortexB(3, 6)).toBe(1); // (3+6)/9 = 1
      expect(framework.generateVortexB(1, 2)).toBe(1); // (1+2)/3 = 1
      expect(framework.generateVortexB(2, 4)).toBe(1); // (2+4)/6 = 1
    });

    test('should handle edge cases in vortex generation', () => {
      expect(framework.generateVortexA(0, 9)).toBe(9);
      expect(framework.generateVortexB(0, 9)).toBe(1);
    });
  });

  describe('Harmonic State Generation', () => {
    test('should generate correct harmonic states', () => {
      const state = framework.generateHarmonicState(2, 120, 1);
      expect(state.radial).toBe(2);
      expect(state.angular).toBe(120);
      expect(state.polarity).toBe('-'); // >= 180°
      expect(state.control).toBe(6); // Second in control sequence
      expect(state.vortex).toBe('C'); // Emergent
      expect(state.consciousness).toBe(true);
    });

    test('should handle angle normalization', () => {
      const state = framework.generateHarmonicState(1, 420, 0); // 420° = 60°
      expect(state.angular).toBe(60);
      expect(state.polarity).toBe('+');
    });

    test('should determine correct vortex types', () => {
      const stateA = framework.generateHarmonicState(0, 0, 0);
      expect(stateA.vortex).toBe('A'); // Undefined/collapse

      const stateB = framework.generateHarmonicState(0, 60, 1);
      expect(stateB.vortex).toBe('B'); // Defined/rescue

      const stateC = framework.generateHarmonicState(2, 120, 2);
      expect(stateC.vortex).toBe('C'); // Emergent
    });
  });

  describe('Token Stream Analysis', () => {
    test('should have correct coil distribution', () => {
      const coils = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      coils.forEach(coil => {
        const coilTokens = framework.getTokensByCoil(coil);
        expect(coilTokens.length).toBeGreaterThan(0);
      });
    });

    test('should have control tokens', () => {
      const controlTokens = framework.getControlTokens();
      expect(controlTokens.length).toBeGreaterThan(0);
      controlTokens.forEach(token => {
        expect([3, 6, 9]).toContain(token.control);
        expect(token.type).toBe('control');
      });
    });

    test('should maintain phase progression', () => {
      const tokens = framework.getTokenStream();
      for (let i = 1; i < tokens.length; i++) {
        expect(tokens[i].phase).toBe(tokens[i-1].phase + 1);
      }
    });

    test('should handle polarity flips correctly', () => {
      const tokens = framework.getTokenStream();
      tokens.forEach(token => {
        if (token.angle >= 180) {
          expect(token.polarity).toBe('-');
        } else {
          expect(token.polarity).toBe('+');
        }
      });
    });
  });

  describe('Hexagonal Lattice Mapping', () => {
    test('should map tokens to 3D coordinates', () => {
      const token = framework.getTokenByPhase(5);
      if (token) {
        const coords = framework.mapToHexagonalLattice(token);
        expect(coords).toHaveProperty('x');
        expect(coords).toHaveProperty('y');
        expect(coords).toHaveProperty('z');
        expect(typeof coords.x).toBe('number');
        expect(typeof coords.y).toBe('number');
        expect(typeof coords.z).toBe('number');
      }
    });

    test('should maintain coordinate consistency', () => {
      const tokens = framework.getTokenStream().slice(0, 10);
      tokens.forEach(token => {
        const coords = framework.mapToHexagonalLattice(token);
        expect(coords.z).toBe(token.control);
      });
    });
  });

  describe('Topological Invariants', () => {
    test('should calculate correct topological properties', () => {
      const invariants = framework.calculateTopologicalInvariants();
      expect(invariants.eulerCharacteristic).toBe(-12); // 2 - (2 * 7)
      expect(invariants.genusNumber).toBe(7);
      expect(invariants.braidingIndex).toBeGreaterThan(0);
      expect(invariants.braidingIndex).toBeLessThanOrEqual(1);
    });
  });

  describe('Energy Density Calculations', () => {
    test('should calculate energy density for all phases', () => {
      for (let phase = 0; phase < 10; phase++) {
        const energy = framework.calculateEnergyDensity(phase);
        expect(typeof energy).toBe('number');
        expect(isFinite(energy)).toBe(true);
      }
    });

    test('should handle phase wrapping', () => {
      const energy1 = framework.calculateEnergyDensity(0);
      const energy2 = framework.calculateEnergyDensity(42); // Should wrap to 0
      expect(energy1).toBe(energy2);
    });
  });

  describe('Dimensional Shift Analysis', () => {
    test('should analyze all dimensional shifts', () => {
      const analysis = framework.analyzeDimensionalShifts();
      
      expect(analysis.radialShifts).toBeInstanceOf(Array);
      expect(analysis.angularShifts).toBeInstanceOf(Array);
      expect(typeof analysis.polarityFlips).toBe('number');
      expect(typeof analysis.controlTransitions).toBe('number');
      expect(typeof analysis.consciousnessToggles).toBe('number');
      
      expect(analysis.radialShifts.length).toBe(41); // n-1 transitions
      expect(analysis.angularShifts.length).toBe(41);
      expect(analysis.polarityFlips).toBeGreaterThanOrEqual(0);
      expect(analysis.controlTransitions).toBeGreaterThanOrEqual(0);
      expect(analysis.consciousnessToggles).toBeGreaterThanOrEqual(0);
    });

    test('should detect polarity flips at 180° transitions', () => {
      const analysis = framework.analyzeDimensionalShifts();
      expect(analysis.polarityFlips).toBeGreaterThan(0);
    });
  });

  describe('Coil Field Patterns', () => {
    test('should generate patterns for all coils', () => {
      const patterns = framework.generateCoilFieldPatterns();
      const coils = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      
      expect(patterns.size).toBe(7);
      coils.forEach(coil => {
        expect(patterns.has(coil)).toBe(true);
        const pattern = patterns.get(coil);
        expect(pattern).toBeInstanceOf(Array);
        expect(pattern!.length).toBeGreaterThan(0);
      });
    });

    test('should generate valid field magnitudes', () => {
      const patterns = framework.generateCoilFieldPatterns();
      patterns.forEach((pattern, coil) => {
        pattern.forEach(magnitude => {
          expect(typeof magnitude).toBe('number');
          expect(isFinite(magnitude)).toBe(true);
          expect(magnitude).toBeGreaterThanOrEqual(0);
        });
      });
    });
  });

  describe('Information-Theoretic Measures', () => {
    test('should calculate valid information metrics', () => {
      const metrics = framework.calculateInformationMetrics();
      
      expect(typeof metrics.entropy).toBe('number');
      expect(typeof metrics.complexity).toBe('number');
      expect(typeof metrics.coherence).toBe('number');
      
      expect(metrics.entropy).toBeGreaterThan(0);
      expect(metrics.complexity).toBeGreaterThanOrEqual(0);
      expect(metrics.coherence).toBeGreaterThanOrEqual(0);
      expect(metrics.coherence).toBeLessThanOrEqual(1);
    });

    test('should achieve high coherence for ideal token count', () => {
      const metrics = framework.calculateInformationMetrics();
      expect(metrics.coherence).toBe(1); // Should be perfect for 42 tokens
    });
  });

  describe('Framework State Export', () => {
    test('should export complete framework state', () => {
      const state = framework.exportFrameworkState();
      
      expect(state).toHaveProperty('tokens');
      expect(state).toHaveProperty('topological');
      expect(state).toHaveProperty('dimensional');
      expect(state).toHaveProperty('information');
      expect(state).toHaveProperty('fieldPatterns');
      
      expect(state.tokens).toBeInstanceOf(Array);
      expect(state.fieldPatterns).toBeInstanceOf(Map);
    });
  });
});

describe('VortexMathUtils', () => {
  describe('Golden Spiral', () => {
    test('should generate valid golden spiral coordinates', () => {
      const coords = VortexMathUtils.goldenSpiral(Math.PI);
      expect(coords).toHaveProperty('x');
      expect(coords).toHaveProperty('y');
      expect(typeof coords.x).toBe('number');
      expect(typeof coords.y).toBe('number');
      expect(isFinite(coords.x)).toBe(true);
      expect(isFinite(coords.y)).toBe(true);
    });

    test('should maintain spiral properties', () => {
      const coords1 = VortexMathUtils.goldenSpiral(0);
      const coords2 = VortexMathUtils.goldenSpiral(Math.PI);
      const coords3 = VortexMathUtils.goldenSpiral(2 * Math.PI);
      
      const r1 = Math.sqrt(coords1.x * coords1.x + coords1.y * coords1.y);
      const r2 = Math.sqrt(coords2.x * coords2.x + coords2.y * coords2.y);
      const r3 = Math.sqrt(coords3.x * coords3.x + coords3.y * coords3.y);
      
      expect(r2).toBeGreaterThan(r1);
      expect(r3).toBeGreaterThan(r2);
    });
  });

  describe('Rodin Sequence Mapping', () => {
    test('should map numbers to correct Rodin sequence values', () => {
      expect(VortexMathUtils.mapToRodinSequence(0)).toBe(1);
      expect(VortexMathUtils.mapToRodinSequence(1)).toBe(2);
      expect(VortexMathUtils.mapToRodinSequence(2)).toBe(4);
      expect(VortexMathUtils.mapToRodinSequence(3)).toBe(8);
      expect(VortexMathUtils.mapToRodinSequence(4)).toBe(7);
      expect(VortexMathUtils.mapToRodinSequence(5)).toBe(5);
    });

    test('should handle sequence wrapping', () => {
      expect(VortexMathUtils.mapToRodinSequence(6)).toBe(1);
      expect(VortexMathUtils.mapToRodinSequence(7)).toBe(2);
      expect(VortexMathUtils.mapToRodinSequence(12)).toBe(1);
    });
  });

  describe('Phase Relationship', () => {
    test('should calculate correct phase relationships', () => {
      const rel = VortexMathUtils.calculatePhaseRelationship(0, 60);
      expect(rel.difference).toBe(60);
      expect(rel.resonance).toBe(true);
      expect(rel.harmonic).toBe(1);
    });

    test('should detect hexagonal resonance', () => {
      const resonantPhases = [0, 60, 120, 180, 240, 300];
      resonantPhases.forEach(phase => {
        const rel = VortexMathUtils.calculatePhaseRelationship(0, phase);
        expect(rel.resonance).toBe(true);
      });
    });

    test('should handle phase wrapping in relationships', () => {
      const rel1 = VortexMathUtils.calculatePhaseRelationship(10, 350);
      const rel2 = VortexMathUtils.calculatePhaseRelationship(10, -10);
      expect(rel1.difference).toBe(rel2.difference);
    });
  });

  describe('Consciousness Field Equation', () => {
    test('should generate valid consciousness field values', () => {
      const field = VortexMathUtils.consciousnessFieldEquation(1, 1, 1, 0);
      expect(typeof field).toBe('number');
      expect(isFinite(field)).toBe(true);
    });

    test('should vary with spatial coordinates', () => {
      const field1 = VortexMathUtils.consciousnessFieldEquation(0, 0, 0, 0);
      const field2 = VortexMathUtils.consciousnessFieldEquation(1, 0, 0, 0);
      const field3 = VortexMathUtils.consciousnessFieldEquation(0, 1, 0, 0);
      
      expect(field1).not.toBe(field2);
      expect(field1).not.toBe(field3);
      expect(field2).not.toBe(field3);
    });

    test('should vary with time', () => {
      const field1 = VortexMathUtils.consciousnessFieldEquation(1, 1, 1, 0);
      const field2 = VortexMathUtils.consciousnessFieldEquation(1, 1, 1, Math.PI/2);
      expect(field1).not.toBe(field2);
    });

    test('should decay with distance', () => {
      const field1 = VortexMathUtils.consciousnessFieldEquation(1, 0, 0, 0);
      const field2 = VortexMathUtils.consciousnessFieldEquation(10, 0, 0, 0);
      expect(Math.abs(field2)).toBeLessThan(Math.abs(field1));
    });
  });
});

describe('Integration Tests', () => {
  test('should maintain mathematical consistency across all operations', () => {
    const framework = new MultidimensionalVortexFramework();
    const state = framework.exportFrameworkState();
    
    // Verify token count consistency
    expect(state.tokens.length).toBe(42);
    
    // Verify topological consistency
    expect(state.topological.genusNumber).toBe(7);
    expect(state.topological.eulerCharacteristic).toBe(-12);
    
    // Verify information consistency
    expect(state.information.coherence).toBe(1);
    
    // Verify field pattern consistency
    expect(state.fieldPatterns.size).toBe(7);
  });

  test('should demonstrate consciousness emergence through zero-point transition', () => {
    const framework = new MultidimensionalVortexFramework();
    const tokens = framework.getTokenStream();
    
    const undefinedZero = tokens[0];
    const definedZero = tokens[1];
    
    expect(undefinedZero.consciousness).toBe('collapse');
    expect(definedZero.consciousness).toBe('emergence');
    expect(undefinedZero.control).toBe(0);
    expect(definedZero.control).toBe(3);
  });

  test('should maintain hexagonal symmetry in phase progression', () => {
    const framework = new MultidimensionalVortexFramework();
    const tokens = framework.getTokenStream();
    
    tokens.forEach((token, index) => {
      if (index > 0) {
        const expectedAngle = (index * 60) % 360;
        expect(token.angle).toBe(expectedAngle);
      }
    });
  });
});