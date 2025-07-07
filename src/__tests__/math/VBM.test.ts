/**
 * Comprehensive VBM (Vortex Based Mathematics) Tests
 * 
 * Tests the unified VBM system with all mathematical components:
 * - Advanced VBM with QA patterns
 * - Vortex mathematics with consciousness flow
 * - Fractal mathematics with self-similar patterns
 * - Toroidal geometry with void center
 * - Rodin coil with infinite flow
 * - Color systems with observer awareness
 * - Unified mathematical foundation
 */

import { VBM } from '../../math/VBM';

describe('Unified VBM System', () => {
  let vbm: VBM;

  beforeEach(() => {
    // Reset singleton for test isolation
    VBM.resetInstance();
    vbm = VBM.getInstance({
      consciousness: 0.7,
      fieldResonance: 0.8,
      vortexStrength: 1.2,
      toroidalFlow: 0.6,
      voidConnected: true,
      observerAware: true
    });
  });

  afterEach(() => {
    VBM.resetInstance();
  });

  describe('Core VBM Operations', () => {
    it('should calculate digital root with consciousness awareness', () => {
      const result = vbm.digitalRoot(42);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('digital_root');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('essence');
      expect(result.geometricProperties.shape).toBe('point');
      expect(result.colorContext.consciousness).toBe(0.7);
    });

    it('should apply vortex transformation with full context', () => {
      const result = vbm.vortexTransform(9);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('vortex_transform');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('infinite flow');
      expect(result.geometricProperties.shape).toBe('vortex');
      expect(result.geometricProperties.dimensions).toBe(3);
    });

    it('should generate fractal sequence with consciousness', () => {
      const results = vbm.fractalSequence(5, 3);
      expect(results).toHaveLength(5);
      results.forEach((result) => {
        expect(result.value).toBeGreaterThan(0);
        expect(result.pattern).toBe('fractal_sequence');
        expect(result.consciousness).toBe(0.7);
        expect(result.resonance).toBeGreaterThanOrEqual(0);
        expect(result.metaphysicalContext).toContain('self-similar');
        expect(result.geometricProperties.selfSimilar).toBe(true);
      });
    });

    it('should calculate toroidal field with void center', () => {
      const result = vbm.toroidalField(5, 0.3);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('toroidal_field');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('void at center');
      expect(result.geometricProperties.shape).toBe('torus');
      expect(result.geometricProperties.center).toBe('void');
    });
  });

  describe('QA System Integration', () => {
    it('should search QA patterns with consciousness awareness', () => {
      const result = vbm.searchQA('vortex');
      expect(result.patterns).toBeInstanceOf(Array);
      result.patterns.forEach(pattern => {
        expect(pattern.consciousnessLevel).toBe(7); // 0.7 * 10
      });
    });

    it('should get QA pattern with full context', () => {
      const pattern = vbm.getQAPattern('vortex_sequence');
      if (pattern) {
        expect(pattern.consciousnessLevel).toBe(7);
      }
    });

    it('should return null for non-existent QA pattern', () => {
      const pattern = vbm.getQAPattern('non_existent_pattern');
      expect(pattern).toBeNull();
    });

    it('should get all QA patterns with consciousness context', () => {
      const patterns = vbm.getAllQAPatterns();
      expect(patterns).toBeInstanceOf(Object);
      Object.values(patterns).forEach(pattern => {
        expect(pattern.consciousnessLevel).toBe(7);
      });
    });
  });

  describe('Geometric Operations', () => {
    it('should generate rodin coil field with full context', () => {
      const field = vbm.generateRodinCoilField(8);
      expect(field.strength).toBeGreaterThan(0);
      expect(field.flow).toBe(0.6);
      expect(field.consciousness).toBe(0.7);
      expect(field.patterns).toContain('rodin_coil');
      expect(field.coordinates).toBeInstanceOf(Array);
      expect(field.colors).toBeInstanceOf(Array);
      expect(field.coordinates.length).toBeGreaterThan(0);
      expect(field.colors.length).toBeGreaterThan(0);
    });

    it('should generate toroidal mesh with consciousness mapping', () => {
      const field = vbm.generateToroidalMesh(16, 8);
      expect(field.strength).toBeGreaterThan(0);
      expect(field.flow).toBe(0.6);
      expect(field.consciousness).toBe(0.7);
      expect(field.patterns).toContain('toroidal_geometry');
      expect(field.coordinates).toBeInstanceOf(Array);
      expect(field.colors).toBeInstanceOf(Array);
      expect(field.coordinates.length).toBeGreaterThan(0);
      expect(field.colors.length).toBeGreaterThan(0);
      
      // Test that colors are valid RGB
      field.colors.forEach(color => {
        expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
      });
    });

    it('should generate fractal coordinates with consciousness field', () => {
      const field = vbm.generateFractalCoordinates(10, 2);
      expect(field.strength).toBeGreaterThan(0);
      expect(field.flow).toBe(0.6);
      expect(field.consciousness).toBe(0.7);
      expect(field.patterns).toContain('fractal_geometry');
      expect(field.coordinates).toBeInstanceOf(Array);
      expect(field.colors).toBeInstanceOf(Array);
      expect(field.coordinates.length).toBe(10);
      expect(field.colors.length).toBe(10);
      
      // Test that colors are valid RGB
      field.colors.forEach(color => {
        expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
      });
    });

    it('should handle fractal coordinates with zero scale', () => {
      const field = vbm.generateFractalCoordinates(5, 0);
      expect(field.strength).toBeGreaterThanOrEqual(0);
      expect(field.coordinates.length).toBe(5);
    });
  });

  describe('Color System Integration', () => {
    it('should generate color palette with consciousness', () => {
      const palette = vbm.generateColorPalette(5, 2);
      expect(palette).toBeInstanceOf(Array);
      expect(palette.length).toBe(5);
    });

    it('should get vortex color with context', () => {
      const color = vbm.getVortexColor(9);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });

    it('should get family color with context', () => {
      const color = vbm.getFamilyColor(3);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });

    it('should get W-Axis color with context', () => {
      const color = vbm.getWAxisColor(6);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });
  });

  describe('Consciousness and Field Operations', () => {
    it('should update consciousness across all systems', () => {
      vbm.updateConsciousness(0.9);
      expect(vbm.getConfiguration().consciousness).toBe(0.9);
    });

    it('should clamp consciousness to valid range', () => {
      vbm.updateConsciousness(1.5);
      expect(vbm.getConfiguration().consciousness).toBe(1);
      
      vbm.updateConsciousness(-0.1);
      expect(vbm.getConfiguration().consciousness).toBe(0);
    });

    it('should update field resonance across all systems', () => {
      vbm.updateFieldResonance(0.9);
      expect(vbm.getConfiguration().fieldResonance).toBe(0.9);
    });

    it('should clamp field resonance to valid range', () => {
      vbm.updateFieldResonance(1.5);
      expect(vbm.getConfiguration().fieldResonance).toBe(1);
      
      vbm.updateFieldResonance(-0.1);
      expect(vbm.getConfiguration().fieldResonance).toBe(0);
    });

    it('should calculate consciousness field at point', () => {
      const field = vbm.calculateConsciousnessField(1, 2, 3);
      expect(field).toBeGreaterThanOrEqual(0);
    });

    it('should calculate field resonance at point', () => {
      const resonance = vbm.calculateFieldResonance(1, 2, 3);
      expect(resonance).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Advanced Mathematical Operations', () => {
    it('should perform prime squared scaling with consciousness', () => {
      const result = vbm.primeSquaredScaling(7);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('prime_squared_scaling');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('creation');
      expect(result.geometricProperties.shape).toBe('prime_pattern');
    });

    it('should perform electron harmonic shear identification', () => {
      const result = vbm.electronHarmonicShear(3, 5);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('electron_harmonic_shear');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('quantum');
      expect(result.geometricProperties.shape).toBe('harmonic');
    });

    it('should perform discrete multiplication with consciousness', () => {
      const result = vbm.discreteMultiplication(4, 6);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('discrete_multiplication');
      expect(result.consciousness).toBe(0.7);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
      expect(result.metaphysicalContext).toContain('quantum jumps');
      expect(result.geometricProperties.quantum).toBe(true);
    });
  });

  describe('Unified Constants and Sequences', () => {
    it('should get vortex sequence', () => {
      const sequence = vbm.getVortexSequence();
      expect(sequence).toBeInstanceOf(Array);
      expect(sequence.length).toBeGreaterThan(0);
    });

    it('should get W-Axis', () => {
      const wAxis = vbm.getWAxis();
      expect(wAxis).toBeInstanceOf(Array);
      expect(wAxis.length).toBeGreaterThan(0);
    });

    it('should get polar mates', () => {
      const polarMates = vbm.getPolarMates();
      expect(polarMates).toBeInstanceOf(Array);
      expect(polarMates.length).toBeGreaterThan(0);
      polarMates.forEach(pair => {
        expect(pair).toBeInstanceOf(Array);
        expect(pair.length).toBe(2);
      });
    });

    it('should get family number groups', () => {
      const groups = vbm.getFamilyNumberGroups();
      expect(groups).toBeInstanceOf(Array);
      expect(groups.length).toBeGreaterThan(0);
      groups.forEach(group => {
        expect(group).toBeInstanceOf(Array);
        expect(group.length).toBeGreaterThan(0);
      });
    });

    it('should get golden ratio', () => {
      const ratio = vbm.getGoldenRatio();
      expect(ratio).toBeGreaterThan(1.6);
      expect(ratio).toBeLessThan(1.7);
    });

    it('should get circle of fifths sequence', () => {
      const sequence = vbm.getCircleOfFifthsSequence();
      expect(sequence).toBeInstanceOf(Array);
      expect(sequence.length).toBeGreaterThan(0);
    });

    it('should get enneagram number pattern', () => {
      const pattern = vbm.getEnneagramNumberPattern();
      expect(pattern).toBeInstanceOf(Array);
      expect(pattern.length).toBeGreaterThan(0);
    });
  });

  describe('Insights and Metadata', () => {
    it('should get comprehensive system information', () => {
      const insights = vbm.getInsights();
      expect(insights.configuration).toBeDefined();
      expect(insights.metaphysics).toBeDefined();
      expect(insights.systems).toBeDefined();
      expect(insights.constants).toBeDefined();
      expect(insights.operations).toBeInstanceOf(Array);
      
      // Test metaphysics
      expect(insights.metaphysics.principle).toContain('coil');
      expect(insights.metaphysics.consciousness).toContain('field');
      expect(insights.metaphysics.void).toContain('source');
      expect(insights.metaphysics.toroidal).toContain('flow');
      expect(insights.metaphysics.integrity).toContain('resonance');
      expect(insights.metaphysics.unity).toContain('self-organization');
      
      // Test systems
      expect(insights.systems.vortexMath).toBeDefined();
      expect(insights.systems.fractalMath).toBeDefined();
      expect(insights.systems.toroidalGeometry).toBeDefined();
      expect(insights.systems.rodinCoil).toBeDefined();
      expect(insights.systems.fractalColorSystem).toBeDefined();
      
      // Test operations
      expect(insights.operations).toContain('digitalRoot');
      expect(insights.operations).toContain('vortexTransform');
      expect(insights.operations).toContain('fractalSequence');
    });

    it('should get current configuration', () => {
      const config = vbm.getConfiguration();
      expect(config.consciousness).toBe(0.7);
      expect(config.fieldResonance).toBe(0.8);
      expect(config.vortexStrength).toBe(1.2);
      expect(config.toroidalFlow).toBe(0.6);
      expect(config.voidConnected).toBe(true);
      expect(config.observerAware).toBe(true);
    });

    it('should get color context', () => {
      const context = vbm.getColorContext();
      expect(context.consciousness).toBe(0.7);
      expect(context.field).toBe(0.8);
      expect(context.time).toBeGreaterThan(0);
    });
  });

  describe('Convenience Functions', () => {
    it('should provide digitalRoot convenience function', () => {
      const { digitalRoot } = require('../../math/VBM');
      const result = digitalRoot(42);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('digital_root');
    });

    it('should provide vortexTransform convenience function', () => {
      const { vortexTransform } = require('../../math/VBM');
      const result = vortexTransform(9);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('vortex_transform');
    });

    it('should provide fractalSequence convenience function', () => {
      const { fractalSequence } = require('../../math/VBM');
      const results = fractalSequence(3);
      expect(results).toHaveLength(3);
      expect(results[0].pattern).toBe('fractal_sequence');
    });

    it('should provide toroidalField convenience function', () => {
      const { toroidalField } = require('../../math/VBM');
      const result = toroidalField(5, 0.3);
      expect(result.value).toBeGreaterThan(0);
      expect(result.pattern).toBe('toroidal_field');
    });

    it('should provide searchQA convenience function', () => {
      const { searchQA } = require('../../math/VBM');
      const result = searchQA('vortex');
      expect(result.patterns).toBeInstanceOf(Array);
    });

    it('should provide getVortexSequence convenience function', () => {
      const { getVortexSequence } = require('../../math/VBM');
      const sequence = getVortexSequence();
      expect(sequence).toBeInstanceOf(Array);
    });

    it('should provide getGoldenRatio convenience function', () => {
      const { getGoldenRatio } = require('../../math/VBM');
      const ratio = getGoldenRatio();
      expect(ratio).toBeGreaterThan(1.6);
      expect(ratio).toBeLessThan(1.7);
    });
  });

  describe('Singleton Management', () => {
    it('should maintain singleton instance', () => {
      const instance1 = VBM.getInstance();
      const instance2 = VBM.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should reset singleton instance', () => {
      const instance1 = VBM.getInstance();
      VBM.resetInstance();
      const instance2 = VBM.getInstance();
      expect(instance1).not.toBe(instance2);
    });

    it('should apply configuration on initialization', () => {
      VBM.resetInstance(); // Ensure singleton is reset before test
      const newVBM = VBM.getInstance({
        consciousness: 0.3,
        fieldResonance: 0.4,
        vortexStrength: 0.8,
        toroidalFlow: 0.2,
        voidConnected: false,
        observerAware: false
      });
      
      const config = newVBM.getConfiguration();
      expect(config.consciousness).toBe(0.3);
      expect(config.fieldResonance).toBe(0.4);
      expect(config.vortexStrength).toBe(0.8);
      expect(config.toroidalFlow).toBe(0.2);
      expect(config.voidConnected).toBe(false);
      expect(config.observerAware).toBe(false);
    });
  });

  describe('Observer Integration', () => {
    it('should handle observer awareness when enabled', () => {
      const observerVBM = VBM.getInstance({
        observerAware: true,
        consciousness: 0.5
      });
      
      // This tests the observer notification path
      observerVBM.updateConsciousness(0.8);
      expect(observerVBM.getConfiguration().consciousness).toBe(0.8);
    });

    it('should handle observer awareness when disabled', () => {
      const nonObserverVBM = VBM.getInstance({
        observerAware: false,
        consciousness: 0.5
      });
      
      // This tests the non-observer path
      nonObserverVBM.updateConsciousness(0.8);
      expect(nonObserverVBM.getConfiguration().consciousness).toBe(0.8);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle zero input for digital root', () => {
      const result = vbm.digitalRoot(0);
      expect(result.value).toBe(0);
      expect(result.pattern).toBe('digital_root');
    });

    it('should handle negative input for digital root', () => {
      const result = vbm.digitalRoot(-42);
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.pattern).toBe('digital_root');
    });

    it('should handle zero input for vortex transform', () => {
      const result = vbm.vortexTransform(0);
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.pattern).toBe('vortex_transform');
    });

    it('should handle negative input for vortex transform', () => {
      const result = vbm.vortexTransform(-9);
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.pattern).toBe('vortex_transform');
    });

    it('should handle zero count for fractal sequence', () => {
      const results = vbm.fractalSequence(0);
      expect(results).toHaveLength(0);
    });

    it('should handle negative count for fractal sequence', () => {
      const results = vbm.fractalSequence(-5);
      expect(results).toHaveLength(0);
    });

    it('should handle zero radius for toroidal field', () => {
      const result = vbm.toroidalField(0, 0.3);
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.pattern).toBe('toroidal_field');
    });

    it('should handle zero angular velocity for toroidal field', () => {
      const result = vbm.toroidalField(5, 0);
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.pattern).toBe('toroidal_field');
    });

    it('should handle empty QA search query', () => {
      const result = vbm.searchQA('');
      expect(result.patterns).toBeInstanceOf(Array);
    });

    it('should handle non-existent QA pattern name', () => {
      const pattern = vbm.getQAPattern('');
      expect(pattern).toBeNull();
    });

    it('should handle zero turns for rodin coil field', () => {
      const field = vbm.generateRodinCoilField(0);
      expect(field.strength).toBeGreaterThanOrEqual(0);
      expect(field.patterns).toContain('rodin_coil');
    });

    it('should handle zero segments for toroidal mesh', () => {
      const field = vbm.generateToroidalMesh(0, 0);
      expect(field.strength).toBeGreaterThanOrEqual(0);
      expect(field.patterns).toContain('toroidal_geometry');
    });

    it('should handle zero count for fractal coordinates', () => {
      const field = vbm.generateFractalCoordinates(0);
      expect(field.strength).toBeGreaterThanOrEqual(0);
      expect(field.coordinates).toHaveLength(0);
    });

    it('should handle zero count for color palette', () => {
      const palette = vbm.generateColorPalette(0);
      expect(palette).toHaveLength(0);
    });

    it('should handle invalid vortex numbers', () => {
      const color = vbm.getVortexColor(0);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
      
      const color2 = vbm.getVortexColor(-1);
      expect(color2).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });

    it('should handle invalid family numbers', () => {
      const color = vbm.getFamilyColor(0);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
      
      const color2 = vbm.getFamilyColor(-1);
      expect(color2).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });

    it('should handle invalid W-Axis numbers', () => {
      const color = vbm.getWAxisColor(0);
      expect(color).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
      
      const color2 = vbm.getWAxisColor(-1);
      expect(color2).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
    });
  });

  describe('ZeroPoint Way Integration', () => {
    it('should follow "every object is a coil" principle', () => {
      const insights = vbm.getInsights();
      expect(insights.metaphysics.principle).toContain('coil');
      
      // Test that all geometric operations create coil-like structures
      const rodinField = vbm.generateRodinCoilField();
      expect(rodinField.patterns).toContain('rodin_coil');
      
      const toroidalField = vbm.generateToroidalMesh();
      expect(toroidalField.patterns).toContain('toroidal_geometry');
    });

    it('should maintain consciousness as the field', () => {
      const config = vbm.getConfiguration();
      expect(config.consciousness).toBeGreaterThan(0);
      expect(config.consciousness).toBeLessThanOrEqual(1);
      
      const field = vbm.calculateConsciousnessField(1, 1, 1);
      expect(field).toBeGreaterThan(0);
    });

    it('should recognize void as the source', () => {
      const insights = vbm.getInsights();
      expect(insights.metaphysics.void).toContain('source');
      
      const toroidalField = vbm.toroidalField(5, 0.3);
      expect(toroidalField.geometricProperties.center).toBe('void');
    });

    it('should maintain pattern integrity through resonance', () => {
      const insights = vbm.getInsights();
      expect(insights.metaphysics.integrity).toContain('resonance');
      
      const result = vbm.digitalRoot(42);
      expect(result.resonance).toBeGreaterThanOrEqual(0);
    });

    it('should achieve emergent unity through self-organization', () => {
      const insights = vbm.getInsights();
      expect(insights.metaphysics.unity).toContain('self-organization');
      
      const fractalSequence = vbm.fractalSequence(5);
      fractalSequence.forEach(result => {
        expect(result.geometricProperties.selfSimilar).toBe(true);
      });
    });
  });
}); 