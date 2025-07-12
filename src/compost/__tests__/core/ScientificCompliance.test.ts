import { checkScientificCompliance, validateOperation } from '../../core/ScientificCompliance';
import { identity, increment, double, evolve } from '../../core/Operation';

describe('Scientific Compliance', () => {
  const testOperations = [identity, increment, double, evolve];

  describe('Basic Validation', () => {
    it('should validate all operations for scientific compliance', () => {
      testOperations.forEach(op => {
        const compliance = checkScientificCompliance(op);
        expect(compliance.isValid).toBe(true);
      });
    });

    it('should provide scientific compliance reports', () => {
      const compliance = checkScientificCompliance(identity);
      expect(compliance).toMatchObject({
        isValid: expect.any(Boolean),
        violations: expect.any(Array),
        warnings: expect.any(Array),
        recommendations: expect.any(Array)
      });
    });
  });

  describe('Scientific Principles', () => {
    it('should enforce conservation of energy', () => {
      testOperations.forEach(op => {
        const compliance = checkScientificCompliance(op);
        expect(compliance.violations).not.toContain(
          expect.stringContaining('Conservation of Energy')
        );
      });
    });

    it('should enforce causality', () => {
      testOperations.forEach(op => {
        const compliance = checkScientificCompliance(op);
        expect(compliance.violations).not.toContain(
          expect.stringContaining('Causality')
        );
      });
    });

    it('should enforce mathematical consistency', () => {
      testOperations.forEach(op => {
        const compliance = checkScientificCompliance(op);
        expect(compliance.violations).not.toContain(
          expect.stringContaining('Mathematical Consistency')
        );
      });
    });
  });

  describe('Integration', () => {
    it('should integrate with operation execution', () => {
      const subject = { value: 1 };
      const result = increment.execute(subject);
      expect(result.value).toBe(2);
    });

    it('should maintain scientific integrity in complex operations', () => {
      const subject = { value: 1 };
      const result = evolve.execute(subject);
      expect(result.value).toBe(4);
      expect(typeof result.value).toBe('number');
      expect(isFinite(result.value)).toBe(true);
    });
  });
}); 