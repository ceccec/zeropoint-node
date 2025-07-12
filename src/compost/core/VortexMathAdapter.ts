import { Operation } from './Operation';
import { OperationRegistry } from './OperationRegistry';

// Example legacy class (replace with actual import in real usage)
// import { VortexMath } from '../math/VortexMath';

type LegacyVortexMath = {
  calculateResonance: (a?: number, b?: number) => number;
  applyVortexTransform: (input: number) => number;
  getVortexStrength: () => number;
  // ...add more as needed
};

export class VortexMathAdapter {
  private registry: OperationRegistry;
  private vortexMath: LegacyVortexMath;

  constructor(vortexMath: LegacyVortexMath, registry: OperationRegistry) {
    this.vortexMath = vortexMath;
    this.registry = registry;
    this.registerLegacyOperations();
  }

  private registerLegacyOperations() {
    this.registry.register({
      name: 'calculateResonance',
      execute: (_subject, context) => {
        const { a, b } = context || {};
        return this.vortexMath.calculateResonance(a, b);
      }
    });
    this.registry.register({
      name: 'applyVortexTransform',
      execute: (_subject, context) => {
        const { input } = context || {};
        return this.vortexMath.applyVortexTransform(input);
      }
    });
    this.registry.register({
      name: 'getVortexStrength',
      execute: () => this.vortexMath.getVortexStrength()
    });
    // Add more legacy methods as needed
  }
} 