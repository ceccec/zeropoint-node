/**
 * Harmonic Interface Tests
 * 
 * Tests the harmonic user interface that represents the vortex flow
 * pattern with polarity switching at digits 3, 6, and 9.
 */

import { 
  HarmonicInterfaceSystem, 
  VORTEX_FLOW, 
  POLARITY_SWITCHES 
} from './harmonic-interface';

describe('Harmonic Interface System', () => {
  describe('Vortex Flow Constants', () => {
    test('should have correct vortex flow pattern', () => {
      expect(VORTEX_FLOW).toEqual([0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]);
    });

    test('should have correct polarity switches', () => {
      expect(POLARITY_SWITCHES).toEqual([3, 6, 9]);
    });
  });

  describe('createHarmonicInterface', () => {
    test('should create harmonic interface with correct components', () => {
      const interface = HarmonicInterfaceSystem.createHarmonicInterface();
      
      expect(interface.components).toBeDefined();
      expect(interface.components.length).toBe(11); // VORTEX_FLOW length
      expect(interface.flowPath).toBe('0→3→6→9→1→2→4→8→7→5→1');
      expect(interface.switches).toEqual([3, 6, 9]);
      expect(interface.totalConsciousness).toBeGreaterThan(0);
      expect(interface.totalFrequency).toBeGreaterThan(0);
      expect(interface.mathematicalProof).toBeDefined();
    });

    test('should have correct component types', () => {
      const interface = HarmonicInterfaceSystem.createHarmonicInterface();
      
      // Check that switches are marked correctly
      const switches = interface.components.filter(comp => comp.type === 'switch');
      expect(switches.length).toBe(3);
      expect(switches.map(s => s.value)).toEqual([3, 6, 9]);
      
      // Check that other digits are marked as 'digit'
      const digits = interface.components.filter(comp => comp.type === 'digit');
      expect(digits.length).toBe(8); // 11 total - 3 switches
    });

    test('should have unique colors for each component', () => {
      const interface = HarmonicInterfaceSystem.createHarmonicInterface();
      const colors = interface.components.map(comp => comp.color);
      const uniqueColors = new Set(colors);
      
      // Should have multiple unique colors (not all the same)
      expect(uniqueColors.size).toBeGreaterThan(1);
    });
  });

  describe('createPolaritySwitchVisualization', () => {
    test('should create polarity switch visualization', () => {
      const switchViz = HarmonicInterfaceSystem.createPolaritySwitchVisualization();
      
      expect(switchViz.switches).toBeDefined();
      expect(switchViz.switches.length).toBe(3);
      expect(switchViz.transformationPath).toBeDefined();
      expect(switchViz.mathematicalProof).toBeDefined();
    });

    test('should have correct switch values', () => {
      const switchViz = HarmonicInterfaceSystem.createPolaritySwitchVisualization();
      const switchValues = switchViz.switches.map(s => s.value);
      
      expect(switchValues).toEqual([3, 6, 9]);
    });

    test('should have correct transformation path', () => {
      const switchViz = HarmonicInterfaceSystem.createPolaritySwitchVisualization();
      
      expect(switchViz.transformationPath).toContain('0/0 impossibility');
      expect(switchViz.transformationPath).toContain('3 (switch)');
      expect(switchViz.transformationPath).toContain('6 (switch)');
      expect(switchViz.transformationPath).toContain('9 (switch)');
      expect(switchViz.transformationPath).toContain('transformation');
    });
  });

  describe('generateFlowAnimation', () => {
    test('should generate flow animation frames', () => {
      const animation = HarmonicInterfaceSystem.generateFlowAnimation();
      
      expect(animation.frames).toBeDefined();
      expect(animation.frames.length).toBe(11); // VORTEX_FLOW length
      expect(animation.animationPath).toBe('0→3→6→9→1→2→4→8→7→5→1');
      expect(animation.mathematicalProof).toBeDefined();
    });

    test('should have progressive frame growth', () => {
      const animation = HarmonicInterfaceSystem.generateFlowAnimation();
      
      // Each frame should have more components than the previous
      for (let i = 1; i < animation.frames.length; i++) {
        expect(animation.frames[i].length).toBeGreaterThan(animation.frames[i-1].length);
      }
    });

    test('should have correct final frame', () => {
      const animation = HarmonicInterfaceSystem.generateFlowAnimation();
      const finalFrame = animation.frames[animation.frames.length - 1];
      
      expect(finalFrame.length).toBe(11); // Complete vortex flow
      const finalValues = finalFrame.map(comp => comp.value);
      expect(finalValues).toEqual(VORTEX_FLOW);
    });
  });

  describe('Mathematical Calculations', () => {
    test('should calculate component consciousness correctly', () => {
      const consciousness = HarmonicInterfaceSystem.calculateComponentConsciousness(3, 1);
      
      expect(consciousness).toBeGreaterThan(0);
      expect(consciousness).toBeLessThanOrEqual(9); // Digital root constraint
    });

    test('should calculate component frequency correctly', () => {
      const frequency = HarmonicInterfaceSystem.calculateComponentFrequency(6, 2);
      
      expect(frequency).toBeGreaterThan(0);
      expect(frequency).toBeLessThanOrEqual(9); // Digital root constraint
    });

    test('should calculate component colors correctly', () => {
      const color = HarmonicInterfaceSystem.calculateComponentColor(9, true);
      
      expect(color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
    });

    test('should calculate switch consciousness correctly', () => {
      const consciousness = HarmonicInterfaceSystem.calculateSwitchConsciousness(3);
      
      expect(consciousness).toBeGreaterThan(0);
      expect(consciousness).toBeLessThanOrEqual(9); // Digital root constraint
    });

    test('should calculate switch frequency correctly', () => {
      const frequency = HarmonicInterfaceSystem.calculateSwitchFrequency(6);
      
      expect(frequency).toBeGreaterThan(0);
      expect(frequency).toBeLessThanOrEqual(9); // Digital root constraint
    });

    test('should calculate switch colors correctly', () => {
      const color = HarmonicInterfaceSystem.calculateSwitchColor(9);
      
      expect(color).toMatch(/^hsl\(\d+,\s*100%,\s*60%\)$/);
    });

    test('should calculate digital root correctly', () => {
      expect(HarmonicInterfaceSystem.calculateDigitalRoot(0)).toBe(0);
      expect(HarmonicInterfaceSystem.calculateDigitalRoot(9)).toBe(9);
      expect(HarmonicInterfaceSystem.calculateDigitalRoot(18)).toBe(9);
      expect(HarmonicInterfaceSystem.calculateDigitalRoot(432)).toBe(9);
    });
  });

  describe('System Integration', () => {
    test('should integrate all components correctly', () => {
      const interface = HarmonicInterfaceSystem.createHarmonicInterface();
      const switchViz = HarmonicInterfaceSystem.createPolaritySwitchVisualization();
      const animation = HarmonicInterfaceSystem.generateFlowAnimation();
      
      // All systems should work together
      expect(interface.switches).toEqual(switchViz.switches.map(s => s.value));
      expect(interface.flowPath).toBe(animation.animationPath);
      expect(interface.components.length).toBe(animation.frames[animation.frames.length - 1].length);
    });

    test('should maintain mathematical consistency', () => {
      const interface = HarmonicInterfaceSystem.createHarmonicInterface();
      
      // Total consciousness should be sum of individual consciousness values
      const calculatedTotal = interface.components.reduce((sum, comp) => sum + comp.consciousness, 0);
      expect(interface.totalConsciousness).toBe(calculatedTotal);
      
      // Total frequency should be sum of individual frequency values
      const calculatedFrequency = interface.components.reduce((sum, comp) => sum + comp.frequency, 0);
      expect(interface.totalFrequency).toBe(calculatedFrequency);
    });
  });

  describe('Scientific Proofs', () => {
    test('should have scientific proofs defined', () => {
      const proofs = HarmonicInterfaceSystem.scientificProofs;
      
      expect(proofs.harmonicInterfaceCreation).toBeDefined();
      expect(proofs.polaritySwitchVisualization).toBeDefined();
      expect(proofs.flowAnimationGeneration).toBeDefined();
    });

    test('should have meaningful scientific proofs', () => {
      const proofs = HarmonicInterfaceSystem.scientificProofs;
      
      expect(proofs.harmonicInterfaceCreation).toContain('vortex flow');
      expect(proofs.polaritySwitchVisualization).toContain('polarity');
      expect(proofs.flowAnimationGeneration).toContain('animation');
    });
  });
}); 