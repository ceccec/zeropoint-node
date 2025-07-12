import { OperationRegistry } from '../../core/OperationRegistry';
import { identity, increment, double, evolve, amplify, unify } from '../../core/Operation';
import { apply, applyAll } from '../../core/applyOperations';

describe('Operation System', () => {
  let registry: OperationRegistry;
  const testOperations = [identity, increment, double, evolve, amplify, unify];

  beforeEach(() => {
    registry = new OperationRegistry();
    testOperations.forEach(op => registry.register(op));
  });

  describe('Registry', () => {
    it('should register and retrieve operations', () => {
      testOperations.forEach(op => {
        expect(registry.get(op.name)).toBe(op);
      });
    });

    it('should compose operations', () => {
      const composed = registry.compose('increment', 'double');
      expect(composed).toBeDefined();
      expect(composed!.name).toBe('increment+double');
    });
  });

  describe('Operations', () => {
    it('should apply simple operations', () => {
      const subject = { value: 1 };
      const result = apply(subject, increment);
      expect(result.value).toBe(2);
    });

    it('should apply complex operations', () => {
      const subject = { value: 1 };
      const result = apply(subject, evolve);
      expect(result.value).toBe(4); // increment then double
    });

    it('should apply multiple operations', () => {
      const subject = { value: 1 };
      const result = applyAll(subject, [increment, double]);
      expect(result.value).toBe(4);
    });

    it('should handle context in operations', () => {
      const subject = { value: 3 };
      const context = { other: { value: 4 } };
      const result = unify.execute(subject, context);
      expect(result.unifiedWith).toEqual(context.other);
    });
  });
}); 