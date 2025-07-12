
// Legacy void functions
export function createVoid() {
  return { empty: true, potential: Infinity };
}

export const voidConstants = {
  emptiness: 0,
  potential: Infinity,
  space: 'void'
};

export class VoidSystem {
  static generatePotential() {
    return { entropy: 0, information: 0 };
  }
}
