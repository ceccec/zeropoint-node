import { VortexMathAdapter } from '../../core/VortexMathAdapter';
import { OperationRegistry } from '../../core/OperationRegistry';

describe('VortexMathAdapter', () => {
  let registry: OperationRegistry;
  let legacyVortexMath: any;
  let adapter: VortexMathAdapter;

  beforeEach(() => {
    registry = new OperationRegistry();
    legacyVortexMath = {
      calculateResonance: jest.fn().mockImplementation((a, b) => (a || 0) * (b || 0)),
      applyVortexTransform: jest.fn().mockImplementation((input) => (input || 0) + 10),
      getVortexStrength: jest.fn().mockReturnValue(3.14),
    };
    adapter = new VortexMathAdapter(legacyVortexMath, registry);
  });

  it('should register legacy methods as operations', () => {
    expect(registry.get('calculateResonance')).toBeDefined();
    expect(registry.get('applyVortexTransform')).toBeDefined();
    expect(registry.get('getVortexStrength')).toBeDefined();
  });

  it('should call legacy methods via operations', () => {
    const calculateResonance = registry.get('calculateResonance')!;
    const applyVortexTransform = registry.get('applyVortexTransform')!;
    const getVortexStrength = registry.get('getVortexStrength')!;

    expect(calculateResonance.execute({}, { a: 2, b: 5 })).toBe(10);
    expect(applyVortexTransform.execute({}, { input: 7 })).toBe(17);
    expect(getVortexStrength.execute({})).toBe(3.14);
  });
}); 