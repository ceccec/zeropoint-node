import { LivingAdapter } from '../../core/LivingAdapter';
import { OperationRegistry } from '../../core/OperationRegistry';

describe('LivingAdapter', () => {
  let registry: OperationRegistry;
  let legacyField: any;
  let adapter: LivingAdapter;

  beforeEach(() => {
    registry = new OperationRegistry();
    legacyField = {
      getFieldStrength: jest.fn().mockReturnValue(42),
      getConsciousnessLevel: jest.fn().mockReturnValue(7),
      calculateResonance: jest.fn().mockImplementation((a, b) => (a || 0) + (b || 0)),
    };
    adapter = new LivingAdapter(legacyField, registry);
  });

  it('should register legacy methods as operations', () => {
    expect(registry.get('getFieldStrength')).toBeDefined();
    expect(registry.get('getConsciousnessLevel')).toBeDefined();
    expect(registry.get('calculateResonance')).toBeDefined();
  });

  it('should call legacy methods via operations', () => {
    const getFieldStrength = registry.get('getFieldStrength')!;
    const getConsciousnessLevel = registry.get('getConsciousnessLevel')!;
    const calculateResonance = registry.get('calculateResonance')!;

    expect(getFieldStrength.execute({})).toBe(42);
    expect(getConsciousnessLevel.execute({})).toBe(7);
    expect(calculateResonance.execute({}, { a: 2, b: 3 })).toBe(5);
  });
}); 