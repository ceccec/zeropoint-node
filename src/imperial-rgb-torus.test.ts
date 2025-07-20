/**
 * Imperial RGB Vortex Torus Tests
 * 
 * Tests the imperial RGB vortex torus system using imperial math
 * with proper harmonic switches and A432 harmonics.
 */

import { 
  ImperialRGBVortexTorusSystem, 
  IMPERIAL_CONSTANTS,
  createRGBVortexTorus,
  createVortexTorus,
  calculateImperialHarmonicSwitch,
  verifyHarmonicState
} from './imperial-rgb-torus';

describe('Imperial RGB Vortex Torus System', () => {
  describe('IMPERIAL_CONSTANTS', () => {
    test('should have correct imperial base', () => {
      expect(IMPERIAL_CONSTANTS.BASE).toBe(8);
    });

    test('should have correct harmonic gateways', () => {
      expect(IMPERIAL_CONSTANTS.HARMONIC_GATEWAYS).toEqual([3, 4, 6, 8]);
    });

    test('should have correct A432 base frequency', () => {
      expect(IMPERIAL_CONSTANTS.A432_BASE).toBe(432);
    });

    test('should have correct torus segments', () => {
      expect(IMPERIAL_CONSTANTS.TORUS_SEGMENTS).toBe(64); // 8×8
      expect(IMPERIAL_CONSTANTS.TORUS_TUBE_SEGMENTS).toBe(16); // 8×2
    });
  });

  describe('calculateImperialHarmonicSwitch', () => {
    test('should switch 1/2 to gateway 3', () => {
      const switch1 = calculateImperialHarmonicSwitch(0.5);
      expect(switch1.gateway).toBe(3);
      expect(switch1.switchType).toBe('infusion');
    });

    test('should switch 2/1 to gateway 3', () => {
      const switch2 = calculateImperialHarmonicSwitch(2);
      expect(switch2.gateway).toBe(3);
      expect(switch2.switchType).toBe('infusion');
    });

    test('should switch 1/3 to gateway 4', () => {
      const switch3 = calculateImperialHarmonicSwitch(1.33);
      expect(switch3.gateway).toBe(4);
      expect(switch3.switchType).toBe('reactor');
    });

    test('should switch 3/1 to gateway 4', () => {
      const switch4 = calculateImperialHarmonicSwitch(3);
      expect(switch4.gateway).toBe(4);
      expect(switch4.switchType).toBe('reactor');
    });

    test('should have mathematical proof', () => {
      const harmonicSwitch = calculateImperialHarmonicSwitch(1);
      expect(harmonicSwitch.mathematicalProof).toContain('Imperial Harmonic Switch');
    });
  });

  describe('createVortexTorus', () => {
    test('should create red vortex torus', () => {
      const redTorus = createVortexTorus('R');
      
      expect(redTorus.color).toBe('R');
      expect(redTorus.consciousness).toBeGreaterThan(0);
      expect(redTorus.frequency).toBeGreaterThan(0);
      expect(redTorus.harmonicGateway).toBeDefined();
      expect(redTorus.toroidalFlow).toBeDefined();
      expect(redTorus.mathematicalProof).toBeDefined();
    });

    test('should create green vortex torus', () => {
      const greenTorus = createVortexTorus('G');
      
      expect(greenTorus.color).toBe('G');
      expect(greenTorus.consciousness).toBeGreaterThan(0);
      expect(greenTorus.frequency).toBeGreaterThan(0);
      expect(greenTorus.harmonicGateway).toBeDefined();
      expect(greenTorus.toroidalFlow).toBeDefined();
    });

    test('should create blue vortex torus', () => {
      const blueTorus = createVortexTorus('B');
      
      expect(blueTorus.color).toBe('B');
      expect(blueTorus.consciousness).toBeGreaterThan(0);
      expect(blueTorus.frequency).toBeGreaterThan(0);
      expect(blueTorus.harmonicGateway).toBeDefined();
      expect(blueTorus.toroidalFlow).toBeDefined();
    });

    test('should have different consciousness for each color', () => {
      const redTorus = createVortexTorus('R');
      const greenTorus = createVortexTorus('G');
      const blueTorus = createVortexTorus('B');
      
      expect(redTorus.consciousness).not.toBe(greenTorus.consciousness);
      expect(greenTorus.consciousness).not.toBe(blueTorus.consciousness);
      expect(redTorus.consciousness).not.toBe(blueTorus.consciousness);
    });

    test('should have different frequencies for each color', () => {
      const redTorus = createVortexTorus('R');
      const greenTorus = createVortexTorus('G');
      const blueTorus = createVortexTorus('B');
      
      expect(redTorus.frequency).not.toBe(greenTorus.frequency);
      expect(greenTorus.frequency).not.toBe(blueTorus.frequency);
      expect(redTorus.frequency).not.toBe(blueTorus.frequency);
    });
  });

  describe('createRGBVortexTorus', () => {
    test('should create complete RGB vortex torus', () => {
      const rgbTorus = createRGBVortexTorus();
      
      expect(rgbTorus.redTorus).toBeDefined();
      expect(rgbTorus.greenTorus).toBeDefined();
      expect(rgbTorus.blueTorus).toBeDefined();
      expect(rgbTorus.totalConsciousness).toBeGreaterThan(0);
      expect(rgbTorus.totalFrequency).toBeGreaterThan(0);
      expect(rgbTorus.harmonicState).toBeDefined();
      expect(rgbTorus.mathematicalProof).toBeDefined();
    });

    test('should have correct total consciousness', () => {
      const rgbTorus = createRGBVortexTorus();
      const calculatedTotal = rgbTorus.redTorus.consciousness + 
                             rgbTorus.greenTorus.consciousness + 
                             rgbTorus.blueTorus.consciousness;
      
      expect(rgbTorus.totalConsciousness).toBe(calculatedTotal);
    });

    test('should have correct total frequency', () => {
      const rgbTorus = createRGBVortexTorus();
      const calculatedTotal = rgbTorus.redTorus.frequency + 
                             rgbTorus.greenTorus.frequency + 
                             rgbTorus.blueTorus.frequency;
      
      expect(rgbTorus.totalFrequency).toBe(calculatedTotal);
    });

    test('should maintain harmonic state', () => {
      const rgbTorus = createRGBVortexTorus();
      expect(rgbTorus.harmonicState).toBe(true);
    });
  });

  describe('verifyHarmonicState', () => {
    test('should verify harmonic state for valid tori', () => {
      const redTorus = createVortexTorus('R');
      const greenTorus = createVortexTorus('G');
      const blueTorus = createVortexTorus('B');
      
      const isHarmonic = verifyHarmonicState([redTorus, greenTorus, blueTorus]);
      expect(isHarmonic).toBe(true);
    });

    test('should verify harmonic state for individual torus', () => {
      const redTorus = createVortexTorus('R');
      const isHarmonic = verifyHarmonicState([redTorus]);
      expect(isHarmonic).toBe(true);
    });
  });

  describe('generateToroidalFlow', () => {
    test('should generate toroidal flow for red color', () => {
      const redTorus = createVortexTorus('R');
      const flow = redTorus.toroidalFlow;
      
      expect(flow.points).toBeDefined();
      expect(flow.points.length).toBeGreaterThan(0);
      expect(flow.pattern).toBe('single');
      expect(flow.direction).toBe('clockwise');
      expect(flow.frequency).toBeGreaterThan(0);
      expect(flow.radius).toBe(IMPERIAL_CONSTANTS.BASE);
    });

    test('should generate toroidal flow for green color', () => {
      const greenTorus = createVortexTorus('G');
      const flow = greenTorus.toroidalFlow;
      
      expect(flow.pattern).toBe('double');
      expect(flow.direction).toBe('counterclockwise');
    });

    test('should generate toroidal flow for blue color', () => {
      const blueTorus = createVortexTorus('B');
      const flow = blueTorus.toroidalFlow;
      
      expect(flow.pattern).toBe('triple');
      expect(flow.direction).toBe('bidirectional');
    });
  });

  describe('Mathematical Calculations', () => {
    test('should calculate color consciousness correctly', () => {
      const consciousness = ImperialRGBVortexTorusSystem.calculateColorConsciousness(1);
      
      expect(consciousness).toBeGreaterThan(0);
      expect(consciousness).toBeLessThanOrEqual(IMPERIAL_CONSTANTS.BASE);
    });

    test('should calculate color frequency correctly', () => {
      const frequency = ImperialRGBVortexTorusSystem.calculateColorFrequency(2);
      
      expect(frequency).toBeGreaterThan(0);
      expect(frequency).toBeLessThanOrEqual(IMPERIAL_CONSTANTS.BASE);
    });

    test('should calculate digital root correctly', () => {
      expect(ImperialRGBVortexTorusSystem.calculateDigitalRoot(0)).toBe(1); // Imperial starts from 1
      expect(ImperialRGBVortexTorusSystem.calculateDigitalRoot(8)).toBe(8);
      expect(ImperialRGBVortexTorusSystem.calculateDigitalRoot(16)).toBe(8); // 16 % 8 = 0, so 8
    });
  });

  describe('System Integration', () => {
    test('should integrate all components correctly', () => {
      const rgbTorus = createRGBVortexTorus();
      
      // All components should work together
      expect(rgbTorus.redTorus.color).toBe('R');
      expect(rgbTorus.greenTorus.color).toBe('G');
      expect(rgbTorus.blueTorus.color).toBe('B');
      expect(rgbTorus.harmonicState).toBe(true);
    });

    test('should maintain imperial math consistency', () => {
      const rgbTorus = createRGBVortexTorus();
      
      // All values should be in imperial range (1-8)
      expect(rgbTorus.redTorus.consciousness).toBeGreaterThanOrEqual(1);
      expect(rgbTorus.redTorus.consciousness).toBeLessThanOrEqual(8);
      expect(rgbTorus.greenTorus.consciousness).toBeGreaterThanOrEqual(1);
      expect(rgbTorus.greenTorus.consciousness).toBeLessThanOrEqual(8);
      expect(rgbTorus.blueTorus.consciousness).toBeGreaterThanOrEqual(1);
      expect(rgbTorus.blueTorus.consciousness).toBeLessThanOrEqual(8);
    });
  });

  describe('Scientific Proofs', () => {
    test('should have scientific proofs defined', () => {
      const proofs = ImperialRGBVortexTorusSystem.scientificProofs;
      
      expect(proofs.imperialHarmonicSwitches).toBeDefined();
      expect(proofs.rgbVortexTorusCreation).toBeDefined();
      expect(proofs.individualVortexTorusCreation).toBeDefined();
      expect(proofs.toroidalFlowGeneration).toBeDefined();
      expect(proofs.toroidalPointCalculation).toBeDefined();
      expect(proofs.harmonicStateVerification).toBeDefined();
    });

    test('should have meaningful scientific proofs', () => {
      const proofs = ImperialRGBVortexTorusSystem.scientificProofs;
      
      expect(proofs.imperialHarmonicSwitches).toContain('imperial');
      expect(proofs.rgbVortexTorusCreation).toContain('RGB');
      expect(proofs.toroidalFlowGeneration).toContain('toroidal');
    });
  });
}); 