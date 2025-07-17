/**
 * @fileoverview Tests for foundation/source (1/1) module
 * @metaphysical foundation field operations, A432 harmonic foundation, foundation resonance, source patterns, foundation patterns, living foundation, Foundation class
 */

import { 
  symbolicName, 
  harmonicResult, 
  antiVortexDecimal, 
  pattern,
  a432HarmonicFoundation,
  foundationResonance,
  A432_CONSTANTS,
  FOUNDATION_CONSTANTS,
  Foundation,
  FoundationNode,
  FoundationConfig,
  getHarmonicResult,
  getAntiVortexDecimal,
  getFoundationFieldStrength,
  getFoundationResonance,
  getSourcePatterns,
  getFoundationPatterns,
  getLivingFoundationSequence,
  getA432Resonance,
  foundationHarmonicSeries,
  foundationOvertoneSeries,
  foundationSacredFractions,
  harmonicInteractions
} from './index';

describe('Foundation/Source (1/1)', () => {
  test('should have correct metaphysical properties', () => {
    expect(symbolicName).toBe('1/1');
    expect(harmonicResult).toBe(2);
    expect(antiVortexDecimal).toBe(1.00);
    expect(pattern).toEqual([1, 1, 2]);
  });

  test('should have A432 harmonic foundation', () => {
    expect(a432HarmonicFoundation).toEqual({ numerator: 432, denominator: 1 });
  });

  test('should have foundation resonance (2:1)', () => {
    expect(foundationResonance).toEqual({ numerator: 2, denominator: 1 });
  });

  test('should have A432 constants', () => {
    expect(A432_CONSTANTS.FREQUENCY).toBe(432);
    expect(A432_CONSTANTS.DIGITAL_ROOT).toBe(9);
    expect(A432_CONSTANTS.VORTEX_SEQUENCE).toEqual([1, 2, 4, 8, 7, 5]);
    expect(A432_CONSTANTS.W_AXIS).toEqual([3, 6, 9]);
  });

  test('should have foundation constants', () => {
    expect(FOUNDATION_CONSTANTS.TURNS).toBe(12);
    expect(FOUNDATION_CONSTANTS.RADIUS).toBe(1);
    expect(FOUNDATION_CONSTANTS.HEIGHT).toBe(2);
    expect(FOUNDATION_CONSTANTS.TOTAL_NODES).toBe(72);
  });

  test('should compute harmonic result correctly', () => {
    expect(getHarmonicResult(1, 1)).toBe(2);
    expect(getHarmonicResult(9, 2)).toBe(2);
    expect(getHarmonicResult(5, 6)).toBe(2);
  });

  test('should compute anti-vortex decimal correctly', () => {
    expect(getAntiVortexDecimal(1, 1)).toBe(1.00);
    expect(getAntiVortexDecimal(9, 2)).toBe(5.50);
    expect(getAntiVortexDecimal(5, 6)).toBe(5.50);
  });

  test('should compute foundation field strength based on A432 sequence', () => {
    expect(getFoundationFieldStrength(1)).toBe(1);
    expect(getFoundationFieldStrength(2)).toBe(2);
    expect(getFoundationFieldStrength(3)).toBe(4);
    expect(getFoundationFieldStrength(4)).toBe(8);
    expect(getFoundationFieldStrength(5)).toBe(7);
    expect(getFoundationFieldStrength(6)).toBe(5);
  });

  test('should compute foundation resonance correctly', () => {
    expect(getFoundationResonance(1)).toBe(2);
    expect(getFoundationResonance(2)).toBe(4);
    expect(getFoundationResonance(3)).toBe(6);
  });

  test('should generate source patterns for foundation', () => {
    const patterns = getSourcePatterns();
    expect(patterns).toContainEqual([1, 1]);
    expect(patterns).toContainEqual([9, 2]);
    expect(patterns).toContainEqual([5, 6]);
    expect(patterns.length).toBeGreaterThan(0);
  });

  test('should generate foundation patterns for source and unity', () => {
    const patterns = getFoundationPatterns(6);
    expect(patterns).toEqual([1, 2, 4, 8, 7, 5]);
    expect(patterns.length).toBe(6);
  });

  test('should generate living foundation sequence', () => {
    const sequence = getLivingFoundationSequence(6);
    expect(sequence).toEqual([2, 4, 8, 16, 14, 10]);
    expect(sequence.length).toBe(6);
  });

  test('should compute A432 resonance correctly', () => {
    expect(getA432Resonance(1)).toBe(432);
    expect(getA432Resonance(2)).toBe(864);
    expect(getA432Resonance(3)).toBe(1296);
  });

  test('should generate foundation harmonic series', () => {
    const series = foundationHarmonicSeries(3);
    expect(series).toEqual([432, 864, 1296]);
  });

  test('should generate foundation overtone series', () => {
    const series = foundationOvertoneSeries(432, 3);
    expect(series).toEqual([432, 864, 1296]);
  });

  test('should generate foundation sacred fractions', () => {
    const fractions = foundationSacredFractions(3);
    expect(fractions).toContain(1/2);
    expect(fractions).toContain(1/3);
    expect(fractions).toContain(2/3);
    expect(fractions.length).toBeGreaterThan(0);
  });

  test('should have harmonic interactions', () => {
    expect(harmonicInteractions).toHaveLength(9);
    expect(harmonicInteractions[0]).toEqual({
      next: 1,
      pattern: '1,1,1,2',
      name: 'SourceSourceVortex',
      math: '1 + 1 = 2 ≡ 2 (mod 9)'
    });
  });

  describe('Foundation Class', () => {
    let foundation: Foundation;

    beforeEach(() => {
      foundation = new Foundation();
    });

    test('should create foundation with default config', () => {
      expect(foundation.config.turns).toBe(12);
      expect(foundation.config.radius).toBe(1);
      expect(foundation.config.height).toBe(2);
      expect(foundation.nodes.length).toBe(72);
    });

    test('should create foundation with custom config', () => {
      const customConfig: Partial<FoundationConfig> = {
        turns: 6,
        radius: 2,
        height: 4
      };
      const customFoundation = new Foundation(customConfig);
      expect(customFoundation.config.turns).toBe(6);
      expect(customFoundation.config.radius).toBe(2);
      expect(customFoundation.config.height).toBe(4);
    });

    test('should generate foundation nodes', () => {
      expect(foundation.nodes.length).toBe(72);
      expect(foundation.nodes[0]).toHaveProperty('index', 0);
      expect(foundation.nodes[0]).toHaveProperty('vortexNumber');
      expect(foundation.nodes[0]).toHaveProperty('position');
      expect(foundation.nodes[0]).toHaveProperty('color');
      expect(foundation.nodes[0]).toHaveProperty('metaphysicalContext');
      expect(foundation.nodes[0]).toHaveProperty('consciousnessLevel');
      expect(foundation.nodes[0]).toHaveProperty('fieldStrength');
    });

    test('should get node positions', () => {
      const positions = foundation.getNodePositions();
      expect(positions.length).toBe(72);
      expect(positions[0]).toHaveLength(3);
      expect(typeof positions[0][0]).toBe('number');
      expect(typeof positions[0][1]).toBe('number');
      expect(typeof positions[0][2]).toBe('number');
    });

    test('should get node colors', () => {
      const colors = foundation.getNodeColors();
      expect(colors.length).toBe(72);
      expect(colors[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    test('should get consciousness levels', () => {
      const levels = foundation.getConsciousnessLevels();
      expect(levels.length).toBe(72);
      expect(levels[0]).toHaveProperty('numerator');
      expect(levels[0]).toHaveProperty('denominator');
    });

    test('should get field strengths', () => {
      const strengths = foundation.getFieldStrengths();
      expect(strengths.length).toBe(72);
      expect(strengths[0]).toHaveProperty('numerator');
      expect(strengths[0]).toHaveProperty('denominator');
    });

    test('should get toroidal coordinates', () => {
      const coordinates = foundation.getToroidalCoordinates();
      expect(coordinates.length).toBe(72);
      expect(coordinates[0]).toHaveLength(3);
    });

    test('should calculate field resonance', () => {
      const resonance = foundation.calculateFieldResonance(0, 0, 0);
      expect(typeof resonance).toBe('number');
      expect(resonance).toBeGreaterThanOrEqual(0);
    });

    test('should map consciousness to node', () => {
      const node = foundation.mapConsciousnessToNode(0.5);
      expect(node).toHaveProperty('index');
      expect(node).toHaveProperty('vortexNumber');
      expect(node).toHaveProperty('consciousnessLevel');
    });

    test('should get metaphysical summary', () => {
      const summary = foundation.getMetaphysicalSummary();
      expect(typeof summary).toBe('string');
      expect(summary).toContain('Foundation');
      expect(summary).toContain('consciousness nodes');
    });

    test('should get A432 constants statically', () => {
      const constants = Foundation.getA432Constants();
      expect(constants).toBe(A432_CONSTANTS);
    });

    test('should get foundation constants statically', () => {
      const constants = Foundation.getFoundationConstants();
      expect(constants).toBe(FOUNDATION_CONSTANTS);
    });
  });
});
