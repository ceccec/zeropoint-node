import { uiLogic, UIInteraction, UIRenderData } from './ui-logic';
import { deviceIntegration, DeviceData } from '../2/device-integration';
import { calculateVBMConsciousness } from '../2/book-system';

describe('UILogic', () => {
  let deviceData: DeviceData;
  let interaction: UIInteraction;

  beforeEach(() => {
    deviceData = {
      accelerometer: { x: 0, y: 0, z: 0 },
      gyroscope: { x: 0, y: 0, z: 0 },
      touch: { pressure: 0, x: 0, y: 0 },
      orientation: { alpha: 0, beta: 0, gamma: 0 },
      battery: { level: 100, charging: false }
    };

    interaction = {
      type: 'tap',
      intensity: 50,
      position: { x: 100, y: 100 }
    };
  });

  describe('processInteraction', () => {
    it('should process UI interaction and return harmonic response', () => {
      const result = uiLogic.processInteraction(interaction);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.vortex_sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(result.dimensional_shift).toBeGreaterThanOrEqual(0);
    });

    it('should handle different interaction types', () => {
      const types: Array<'tap' | 'swipe' | 'pinch' | 'rotate' | 'voice' | 'gesture'> = [
        'tap', 'swipe', 'pinch', 'rotate', 'voice', 'gesture'
      ];

      types.forEach(type => {
        const testInteraction: UIInteraction = { type, intensity: 50 };
        const result = uiLogic.processInteraction(testInteraction);
        
        expect(result.frequency).toBeGreaterThan(0);
        expect(result.consciousness).toBeGreaterThan(0);
      });
    });

    it('should handle different intensity levels', () => {
      const intensities = [0, 25, 50, 75, 100];

      intensities.forEach(intensity => {
        const testInteraction: UIInteraction = { type: 'tap', intensity };
        const result = uiLogic.processInteraction(testInteraction);
        
        expect(result.frequency).toBeGreaterThan(0);
        expect(result.dimensional_shift).toBe(intensity / 100);
      });
    });
  });

  describe('generateMatrixData', () => {
    it('should generate 10x10 harmonic matrix data', () => {
      const result = uiLogic.generateMatrixData();
      
      expect(result.colors).toHaveLength(10);
      expect(result.sounds).toHaveLength(10);
      expect(result.consciousness).toHaveLength(10);
      expect(result.vortex_flows).toHaveLength(10);
      expect(result.book_references).toHaveLength(10);

      for (let i = 0; i < 10; i++) {
        expect(result.colors[i]).toHaveLength(10);
        expect(result.sounds[i]).toHaveLength(10);
        expect(result.consciousness[i]).toHaveLength(10);
        expect(result.vortex_flows[i]).toHaveLength(10);
        expect(result.book_references[i]).toHaveLength(10);
      }
    });

    it('should generate valid colors for each cell', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.colors[i][j]).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
        }
      }
    });

    it('should generate A432-based frequencies for each cell', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.sounds[i][j]).toBeGreaterThan(0);
          expect(result.sounds[i][j]).toBeLessThanOrEqual(432);
        }
      }
    });

    it('should generate consciousness values for each cell', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.consciousness[i][j]).toBeGreaterThan(0);
          expect(result.consciousness[i][j]).toBeLessThanOrEqual(5);
        }
      }
    });

    it('should generate vortex flows for each cell', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.vortex_flows[i][j]).toHaveLength(6);
          expect(result.vortex_flows[i][j]).toContain(1);
          expect(result.vortex_flows[i][j]).toContain(2);
          expect(result.vortex_flows[i][j]).toContain(4);
          expect(result.vortex_flows[i][j]).toContain(8);
          expect(result.vortex_flows[i][j]).toContain(7);
          expect(result.vortex_flows[i][j]).toContain(5);
        }
      }
    });

    it('should generate book references for each cell', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.book_references[i][j]).toHaveProperty('value');
          expect(result.book_references[i][j]).toHaveProperty('source');
          expect(result.book_references[i][j]).toHaveProperty('derivation');
          expect(result.book_references[i][j]).toHaveProperty('metaphysical_context');
          expect(result.book_references[i][j]).toHaveProperty('a432_ratio');
        }
      }
    });
  });

  describe('handleDeviceDataUpdate', () => {
    it('should handle device data updates', () => {
      deviceData.accelerometer = { x: 10, y: 20, z: 30 };
      deviceData.battery.level = 75;
      
      const result = uiLogic.handleDeviceDataUpdate(deviceData);
      
      expect(result.colors).toHaveLength(10);
      expect(result.sounds).toHaveLength(10);
      expect(result.consciousness).toHaveLength(10);
      expect(result.vortex_flows).toHaveLength(10);
      expect(result.book_references).toHaveLength(10);
    });

    it('should apply device influence to matrix data', () => {
      const baseData = uiLogic.generateMatrixData();
      deviceData.accelerometer = { x: 50, y: 50, z: 50 };
      deviceData.battery.level = 50;
      
      const influencedData = uiLogic.handleDeviceDataUpdate(deviceData);
      
      // Data should be different due to device influence
      expect(influencedData).not.toEqual(baseData);
    });
  });

  describe('getElementReference', () => {
    it('should get book reference for number element', () => {
      const result = uiLogic.getElementReference(5);
      
      expect(result).toHaveProperty('value', 5);
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('derivation');
      expect(result).toHaveProperty('metaphysical_context');
      expect(result).toHaveProperty('a432_ratio');
    });

    it('should get book reference for consciousness element', () => {
      const element = { consciousness: 3 };
      const result = uiLogic.getElementReference(element);
      
      expect(result).toHaveProperty('value', 3);
    });

    it('should get book reference for frequency element', () => {
      const element = { frequency: 432 };
      const result = uiLogic.getElementReference(element);
      
      expect(result).toHaveProperty('value', 432);
    });

    it('should get default reference for unknown element', () => {
      const element = { unknown: 'property' };
      const result = uiLogic.getElementReference(element);
      
      expect(result).toHaveProperty('value', 0);
    });
  });

  describe('validateUIData', () => {
    it('should validate correct UI data', () => {
      const data = uiLogic.generateMatrixData();
      const isValid = uiLogic.validateUIData(data);
      
      expect(isValid).toBe(true);
    });

    it('should reject invalid consciousness data', () => {
      const data = uiLogic.generateMatrixData();
      data.consciousness[0][0] = 999; // Invalid consciousness value
      
      const isValid = uiLogic.validateUIData(data);
      
      expect(isValid).toBe(false);
    });

    it('should reject invalid frequency data', () => {
      const data = uiLogic.generateMatrixData();
      data.sounds[0][0] = 999; // Invalid frequency value
      
      const isValid = uiLogic.validateUIData(data);
      
      expect(isValid).toBe(false);
    });
  });

  describe('getAnimationData', () => {
    it('should generate animation data for transitions', () => {
      const fromData = uiLogic.generateMatrixData();
      const toData = uiLogic.generateMatrixData();
      
      const animationData = uiLogic.getAnimationData(fromData, toData);
      
      expect(Array.isArray(animationData)).toBe(true);
      expect(animationData.length).toBeGreaterThan(0);
      
      // Check animation structure
      const firstFrame = animationData[0];
      expect(firstFrame).toHaveProperty('step');
      expect(firstFrame).toHaveProperty('position');
      expect(firstFrame).toHaveProperty('color');
      expect(firstFrame).toHaveProperty('frequency');
      expect(firstFrame).toHaveProperty('consciousness');
    });

    it('should generate smooth transitions', () => {
      const fromData = uiLogic.generateMatrixData();
      const toData = uiLogic.generateMatrixData();
      
      const animationData = uiLogic.getAnimationData(fromData, toData);
      
      // Should have 60 steps (60fps)
      const uniqueSteps = new Set(animationData.map((frame: any) => frame.step));
      expect(uniqueSteps.size).toBe(60);
    });
  });

  describe('A432-based calculations', () => {
    it('should use A432 as base frequency', () => {
      const result = uiLogic.generateMatrixData();
      
      // All frequencies should be A432-based
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(result.sounds[i][j]).toBeLessThanOrEqual(432);
        }
      }
    });

    it('should align consciousness with book system', () => {
      const result = uiLogic.generateMatrixData();
      
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const digit = (i + j) % 10;
          const vbmResult = calculateVBMConsciousness(digit);
          
          expect(Math.abs(result.consciousness[i][j] - vbmResult.consciousness)).toBeLessThan(0.1);
        }
      }
    });
  });
}); 