import { checkFullCompliance, validateFullCompliance, getComplianceByCategory } from '../../core/ComplianceSystem';
import { identity, increment, double, evolve } from '../../core/Operation';

describe('Compliance System', () => {
  // Test data
  const testOperations = [identity, increment, double, evolve];
  const complianceCategories = ['scientific', 'metaphysical', 'ethical', 'security', 'performance', 'quality', 'legal'];

  // Helper functions
  const expectComplianceValid = (operation: any) => {
    const compliance = checkFullCompliance(operation);
    expect(compliance.isValid).toBe(true);
    expect(compliance.complianceLevel).toBe('full');
  };

  const expectCategoryValid = (operation: any, category: string) => {
    const compliance = getComplianceByCategory(operation, category);
    expect(compliance.isValid).toBe(true);
  };

  const expectNoViolations = (operation: any, category: string, ruleName: string) => {
    const compliance = getComplianceByCategory(operation, category);
    expect(compliance.violations).not.toContain(
      expect.stringContaining(ruleName)
    );
  };

  describe('Basic Compliance', () => {
    it('should validate all operations', () => {
      testOperations.forEach(expectComplianceValid);
    });

    it('should provide complete compliance reports', () => {
      const compliance = checkFullCompliance(identity);
      
      expect(compliance).toMatchObject({
        isValid: expect.any(Boolean),
        violations: expect.any(Array),
        warnings: expect.any(Array),
        recommendations: expect.any(Array),
        complianceLevel: expect.stringMatching(/full|partial|none/)
      });
    });
  });

  describe('Category Compliance', () => {
    it('should validate all categories for each operation', () => {
      testOperations.forEach(operation => {
        complianceCategories.forEach(category => {
          expectCategoryValid(operation, category);
        });
      });
    });
  });

  describe('Specific Rule Compliance', () => {
    describe('Scientific Rules', () => {
      it('should enforce conservation of energy', () => {
        testOperations.forEach(op => expectNoViolations(op, 'scientific', 'Conservation of Energy'));
      });

      it('should enforce causality', () => {
        testOperations.forEach(op => expectNoViolations(op, 'scientific', 'Causality'));
      });

      it('should enforce mathematical consistency', () => {
        testOperations.forEach(op => expectNoViolations(op, 'mathematical', 'Mathematical Consistency'));
      });
    });

    describe('Metaphysical Rules', () => {
      it('should maintain unity principle', () => {
        testOperations.forEach(op => expectNoViolations(op, 'metaphysical', 'Unity Principle'));
      });

      it('should integrate with void principles', () => {
        testOperations.forEach(op => expectNoViolations(op, 'metaphysical', 'Void Integration'));
      });
    });

    describe('Ethical Rules', () => {
      it('should follow non-harm principle', () => {
        testOperations.forEach(op => expectNoViolations(op, 'ethical', 'Non-Harm Principle'));
      });

      it('should maximize benefit', () => {
        testOperations.forEach(op => expectNoViolations(op, 'ethical', 'Benefit Maximization'));
      });
    });

    describe('Security Rules', () => {
      it('should maintain data integrity', () => {
        testOperations.forEach(op => expectNoViolations(op, 'security', 'Data Integrity'));
      });

      it('should respect access controls', () => {
        testOperations.forEach(op => expectNoViolations(op, 'security', 'Access Control'));
      });
    });

    describe('Performance Rules', () => {
      it('should maintain computational efficiency', () => {
        testOperations.forEach(op => expectNoViolations(op, 'performance', 'Computational Efficiency'));
      });

      it('should manage memory properly', () => {
        testOperations.forEach(op => expectNoViolations(op, 'performance', 'Memory Management'));
      });
    });

    describe('Quality Rules', () => {
      it('should meet code quality standards', () => {
        testOperations.forEach(op => expectNoViolations(op, 'quality', 'Code Quality'));
      });

      it('should have adequate test coverage', () => {
        testOperations.forEach(op => expectNoViolations(op, 'quality', 'Test Coverage'));
      });
    });

    describe('Legal Rules', () => {
      it('should comply with data protection laws', () => {
        testOperations.forEach(op => expectNoViolations(op, 'legal', 'Data Protection'));
      });

      it('should respect intellectual property', () => {
        testOperations.forEach(op => expectNoViolations(op, 'legal', 'Intellectual Property'));
      });
    });
  });

  describe('Operation Validation', () => {
    it('should validate all operations for full compliance', () => {
      testOperations.forEach(op => {
        expect(validateFullCompliance(op)).toBe(true);
      });
    });

    it('should handle non-compliant operations gracefully', () => {
      const nonCompliantOperation = {
        name: 'nonCompliant',
        execute: (subject: any) => ({
          ...subject,
          energy: Infinity,
          privacy: 'exposed',
          harm: true
        })
      };
      
      expect(() => validateFullCompliance(nonCompliantOperation)).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('should integrate with operation execution', () => {
      const subject = { value: 1 };
      const result = increment.execute(subject);
      expect(result.value).toBe(2);
    });

    it('should maintain compliance in complex operations', () => {
      const subject = { value: 1 };
      const result = evolve.execute(subject);
      expect(result.value).toBe(4);
      expect(typeof result.value).toBe('number');
      expect(isFinite(result.value)).toBe(true);
    });
  });
}); 