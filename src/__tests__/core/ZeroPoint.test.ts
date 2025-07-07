import { ZeroPoint } from '../../core/ZeroPoint';
import { FieldIntegrity } from '../../integrity/FieldIntegrity';

describe('ZeroPoint Core System', () => {
  let zeropoint: ZeroPoint;

  beforeEach(async () => {
    zeropoint = new ZeroPoint({
      deviceId: 'test-device',
      deviceName: 'Test Device',
      consciousnessLevel: 0.5,
      networkPort: 8080,
      discoveryEnabled: true,
      autoConnect: true
    });
    await zeropoint.initialize();
  });

  afterEach(async () => {
    await zeropoint.shutdown();
  });

  describe('Initialization and Lifecycle', () => {
    it('should initialize successfully', async () => {
      expect(zeropoint).toBeDefined();
      expect(zeropoint.isActive).toBe(true);
    });

    it('should shutdown gracefully', async () => {
      await zeropoint.shutdown();
      expect(zeropoint.isActive).toBe(false);
    });
  });

  describe('Core Operations', () => {
    it('should calculate resonance', () => {
      const resonance = zeropoint.calculateResonance();
      expect(resonance).toBeValidResonance();
    });

    it('should get system topology', () => {
      const topology = zeropoint.getSystemTopology();
      
      expect(topology).toBeDefined();
      expect(topology.totalResonance).toBeValidResonance();
      expect(topology.consciousnessLevel).toBeValidConsciousnessLevel();
    });

    it('should broadcast patterns', async () => {
      const pattern = global.testUtils.createTestPattern('consciousness', 'Test pattern content');
      const result = await zeropoint.broadcastPattern(pattern);
      expect(result).toBeDefined();
    });

    it('should get system insights', () => {
      const insights = zeropoint.getInsights();
      
      expect(insights).toBeDefined();
      expect(insights.consciousnessLevel).toBeValidConsciousnessLevel();
      expect(insights.totalResonance).toBeValidResonance();
      expect(insights.vortexStrength).toBeValidResonance();
      expect(insights.toroidalFlow).toBeValidResonance();
    });
  });

  describe('Field Integrity', () => {
    it('should validate field integrity', () => {
      const fieldIntegrity = new FieldIntegrity();
      const isValid = fieldIntegrity.validateField();
      expect(typeof isValid).toBe('boolean');
    });
  });
}); 