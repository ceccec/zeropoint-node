import { VortexMath } from '../math/VortexMath';
import { ToroidalGeometry } from '../math/ToroidalGeometry';
import { globalLogger } from '../utils/Logger';
import { globalCache } from '../utils/Cache';

describe('Basic ZeroPoint Components', () => {
  describe('VortexMath', () => {
    let vortexMath: VortexMath;

    beforeEach(() => {
      vortexMath = new VortexMath();
    });

    it('should calculate vortex field strength', () => {
      const strength = vortexMath.calculateVortexField(1, 1, 1);
      expect(typeof strength).toBe('number');
      expect(strength).toBeGreaterThan(0);
    });

    it('should calculate resonance between consciousness levels', () => {
      const resonance = vortexMath.calculateResonance(0.8, 0.6);
      expect(typeof resonance).toBe('number');
      expect(resonance).toBeGreaterThanOrEqual(0);
      expect(resonance).toBeLessThanOrEqual(1);
    });

    it('should generate vortex patterns', () => {
      const pattern = vortexMath.generateVortexPattern(0.5);
      expect(Array.isArray(pattern)).toBe(true);
      expect(pattern.length).toBeGreaterThan(0);
    });

    it('should provide insights', () => {
      const insights = vortexMath.getInsights();
      expect(insights).toHaveProperty('vortexSequence');
      expect(insights).toHaveProperty('goldenRatio');
      expect(insights).toHaveProperty('metaphysics');
    });
  });

  describe('ToroidalGeometry', () => {
    let toroidalGeometry: ToroidalGeometry;

    beforeEach(() => {
      toroidalGeometry = new ToroidalGeometry();
    });

    it('should calculate surface area', () => {
      const surfaceArea = toroidalGeometry.calculateSurfaceArea();
      expect(typeof surfaceArea).toBe('number');
      expect(surfaceArea).toBeGreaterThan(0);
    });

    it('should calculate volume', () => {
      const volume = toroidalGeometry.calculateVolume();
      expect(typeof volume).toBe('number');
      expect(volume).toBeGreaterThan(0);
    });

    it('should get flow rate', () => {
      const flowRate = toroidalGeometry.getFlowRate();
      expect(typeof flowRate).toBe('number');
    });
  });

  describe('Logger', () => {
    it('should log messages', () => {
      expect(() => {
        globalLogger.info('Test message');
        globalLogger.warn('Test warning');
        globalLogger.error('Test error');
      }).not.toThrow();
    });

    it('should provide metrics', () => {
      const metrics = globalLogger.getMetrics();
      expect(typeof metrics).toBe('object');
    });

    it('should create child loggers', () => {
      const childLogger = globalLogger.child('test', { test: true });
      expect(childLogger).toBeDefined();
      expect(() => childLogger.info('Child test')).not.toThrow();
    });
  });

  describe('Cache', () => {
    beforeEach(() => {
      globalCache.clear();
    });

    it('should set and get values', () => {
      globalCache.set('test-key', 'test-value');
      const value = globalCache.get('test-key');
      expect(value).toBe('test-value');
    });

    it('should handle cache misses', () => {
      const value = globalCache.get('non-existent-key');
      expect(value).toBeNull();
    });

    it('should provide statistics', () => {
      globalCache.set('key1', 'value1');
      globalCache.set('key2', 'value2');
      globalCache.get('key1');
      
      const stats = globalCache.getStats();
      expect(stats.sets).toBe(2);
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBeGreaterThanOrEqual(0);
    });

    it('should support getOrSet', () => {
      const value = globalCache.getOrSet('test-key', () => 'computed-value');
      expect(value).toBe('computed-value');
      
      // Should return cached value on second call
      const cachedValue = globalCache.getOrSet('test-key', () => 'different-value');
      expect(cachedValue).toBe('computed-value');
    });
  });
}); 