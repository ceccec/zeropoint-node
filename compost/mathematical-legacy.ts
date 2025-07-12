
// Legacy mathematical functions
export function calculateGoldenRatio() {
  return 1.618033988749895;
}

export const mathematicalConstants = {
  pi: 3.14159265359,
  e: 2.71828182846,
  phi: 1.618033988749895
};

export class GeometryCalculator {
  static calculateArea(radius) {
    return Math.PI * radius * radius;
  }
}
