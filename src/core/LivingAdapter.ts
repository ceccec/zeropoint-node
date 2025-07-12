import { Operation } from './Operation';
import { OperationRegistry } from './OperationRegistry';

// Example legacy class (replace with actual import in real usage)
// import { ConsciousnessField } from '../consciousness/ConsciousnessField';

type LegacyConsciousnessField = {
  getFieldStrength: (context?: any) => number;
  getConsciousnessLevel: (context?: any) => number;
  calculateResonance: (a?: number, b?: number) => number;
  // ...add more as needed
};

export class LivingAdapter {
  private registry: OperationRegistry;
  private field: LegacyConsciousnessField;

  constructor(field: LegacyConsciousnessField, registry: OperationRegistry) {
    this.field = field;
    this.registry = registry;
    this.registerLegacyOperations();
  }

  private registerLegacyOperations() {
    this.registry.register({
      name: 'getFieldStrength',
      execute: (_subject, context) => this.field.getFieldStrength(context)
    });
    this.registry.register({
      name: 'getConsciousnessLevel',
      execute: (_subject, context) => this.field.getConsciousnessLevel(context)
    });
    this.registry.register({
      name: 'calculateResonance',
      execute: (_subject, context) => {
        const { a, b } = context || {};
        return this.field.calculateResonance(a, b);
      }
    });
    // Add more legacy methods as needed
  }
} 