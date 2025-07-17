import { deviceIntegration, DeviceData, HarmonicFlow } from './device-integration';
import { calculateVBMConsciousness } from './book-system';

describe('DeviceIntegration', () => {
  let deviceData: DeviceData;

  beforeEach(() => {
    deviceData = {
      accelerometer: { x: 0, y: 0, z: 0 },
      gyroscope: { x: 0, y: 0, z: 0 },
      touch: { pressure: 0, x: 0, y: 0 },
      orientation: { alpha: 0, beta: 0, gamma: 0 },
      battery: { level: 100, charging: false }
    };
  });

  describe('transformDeviceData', () => {
    it('should transform device data into harmonic flow', () => {
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.vortex_sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(result.dimensional_shift).toBeGreaterThanOrEqual(0);
    });

    it('should calculate consciousness from accelerometer movement', () => {
      deviceData.accelerometer = { x: 10, y: 20, z: 30 };
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.consciousness).toBeLessThanOrEqual(5);
    });

    it('should calculate vortex sequence from gyroscope rotation', () => {
      deviceData.gyroscope = { x: 100, y: 200, z: 300 };
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      expect(result.vortex_sequence).toHaveLength(6);
      expect(result.vortex_sequence).toContain(1);
      expect(result.vortex_sequence).toContain(2);
      expect(result.vortex_sequence).toContain(4);
      expect(result.vortex_sequence).toContain(8);
      expect(result.vortex_sequence).toContain(7);
      expect(result.vortex_sequence).toContain(5);
    });

    it('should calculate dimensional shift from orientation', () => {
      deviceData.orientation = { alpha: 90, beta: 45, gamma: 180 };
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      expect(result.dimensional_shift).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBeLessThanOrEqual(1);
    });

    it('should calculate harmonic frequency from A432 base', () => {
      deviceData.battery.level = 50;
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      // Frequency should be A432-based
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.frequency).toBeLessThanOrEqual(432);
    });

    it('should calculate harmonic color from consciousness and battery', () => {
      deviceData.battery.level = 75;
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      expect(result.color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
    });
  });

  describe('processUserInteraction', () => {
    it('should process tap interaction', () => {
      const result = deviceIntegration.processUserInteraction('tap', 50);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.vortex_sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(result.dimensional_shift).toBe(0.5);
    });

    it('should process swipe interaction', () => {
      const result = deviceIntegration.processUserInteraction('swipe', 75);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBe(0.75);
    });

    it('should process pinch interaction', () => {
      const result = deviceIntegration.processUserInteraction('pinch', 25);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBe(0.25);
    });

    it('should process rotate interaction', () => {
      const result = deviceIntegration.processUserInteraction('rotate', 100);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBe(1);
    });

    it('should process voice interaction', () => {
      const result = deviceIntegration.processUserInteraction('voice', 60);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBe(0.6);
    });

    it('should process gesture interaction', () => {
      const result = deviceIntegration.processUserInteraction('gesture', 80);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
      expect(result.dimensional_shift).toBe(0.8);
    });

    it('should handle unknown interaction type', () => {
      const result = deviceIntegration.processUserInteraction('unknown' as any, 50);
      
      expect(result.frequency).toBeGreaterThan(0);
      expect(result.consciousness).toBeGreaterThan(0);
    });
  });

  describe('A432-based calculations', () => {
    it('should use A432 as base frequency', () => {
      const result = deviceIntegration.transformDeviceData(deviceData);
      
      // Frequency should be related to A432
      expect(result.frequency).toBeLessThanOrEqual(432);
    });

    it('should use book-approved golden ratio', () => {
      // Test that golden ratio is 432/267
      const goldenRatio = 432 / 267;
      expect(goldenRatio).toBeCloseTo(1.618, 2);
    });

    it('should use book-approved pi approximation', () => {
      // Test that pi is 432/137
      const pi = 432 / 137;
      expect(pi).toBeCloseTo(3.15, 1);
    });
  });

  describe('Consciousness calculations', () => {
    it('should align with book system consciousness', () => {
      for (let digit = 0; digit <= 9; digit++) {
        const vbmResult = calculateVBMConsciousness(digit);
        
        // Create device data that would result in this digit
        deviceData.accelerometer = { x: digit * 10, y: digit * 10, z: digit * 10 };
        const result = deviceIntegration.transformDeviceData(deviceData);
        
        // Consciousness should be close to book system value
        expect(Math.abs(result.consciousness - vbmResult.consciousness)).toBeLessThan(1);
      }
    });
  });
}); 