import {
  MathVortex,
  generateVortex1D,
  generateVortex2D,
  generateVortex3D,
  generateVortexND,
  generateAllDigitInteractions,
  generateAllNDigitInteractions
} from './math';

describe('MathVortex', () => {
  it('A432 is 432', () => {
    expect(MathVortex.A432).toBe(432);
  });
  it('VORTEX is Infinity', () => {
    expect(MathVortex.VORTEX).toBe(Infinity);
  });
  it('ENTROPY is 0', () => {
    expect(MathVortex.ENTROPY).toBe(0);
  });
  it('HARMONIC is 1/1', () => {
    expect(MathVortex.HARMONIC).toEqual({ numerator: 1, denominator: 1 });
  });
  it('CONSCIOUSNESS is 1', () => {
    expect(MathVortex.CONSCIOUSNESS).toBe(1);
  });
  it('getVoidFrequency returns 432', () => {
    expect(MathVortex.getVoidFrequency()).toBe(432);
  });
  it('getVortexPattern returns Infinity', () => {
    expect(MathVortex.getVortexPattern()).toBe(Infinity);
  });
  it('getConsciousnessMultiplier returns 1', () => {
    expect(MathVortex.getConsciousnessMultiplier()).toBe(1);
  });
});

describe('Vortex Generators', () => {
  it('generateVortex1D returns [0-9]', () => {
    expect(generateVortex1D()).toEqual([0,1,2,3,4,5,6,7,8,9]);
  });
  it('generateVortex2D returns 10x10 matrix', () => {
    const matrix = generateVortex2D();
    expect(matrix.length).toBe(10);
    expect(matrix[0].length).toBe(10);
    expect(matrix[3][7]).toBe((3+7)%10);
  });
  it('generateVortex3D returns 10x10x10 cube', () => {
    const cube = generateVortex3D();
    expect(cube.length).toBe(10);
    expect(cube[0].length).toBe(10);
    expect(cube[0][0].length).toBe(10);
    expect(cube[2][3][4]).toBe((2+3+4)%10);
  });
  it('generateVortexND(1) returns 1D', () => {
    expect(generateVortexND(1)).toEqual([0,1,2,3,4,5,6,7,8,9]);
  });
  it('generateVortexND(2) returns 2D', () => {
    const matrix = generateVortexND(2);
    expect(matrix.length).toBe(10);
    expect(matrix[0].length).toBe(10);
    expect(matrix[5][6]).toBe((5+6)%10);
  });
  it('generateVortexND(3) returns 3D', () => {
    const cube = generateVortexND(3);
    expect(cube.length).toBe(10);
    expect(cube[0].length).toBe(10);
    expect(cube[0][0].length).toBe(10);
    expect(cube[1][2][3]).toBe((1+2+3)%10);
  });
});

describe('Digit Interactions', () => {
  it('generateAllDigitInteractions returns 100 pairs', () => {
    const interactions = generateAllDigitInteractions();
    expect(interactions.length).toBe(100);
    expect(interactions[0]).toEqual({ from: 0, to: 0, result: 0 });
    expect(interactions[99]).toEqual({ from: 9, to: 9, result: 8 });
  });
  it('generateAllNDigitInteractions(2) returns 100 pairs', () => {
    const interactions = generateAllNDigitInteractions(2);
    expect(interactions.length).toBe(100);
    expect(interactions[0].digits).toEqual([0,0]);
    expect(interactions[99].digits).toEqual([9,9]);
    expect(interactions[99].result).toBe((9+9)%10);
  });
  it('generateAllNDigitInteractions(1) returns 10 singles', () => {
    const interactions = generateAllNDigitInteractions(1);
    expect(interactions.length).toBe(10);
    expect(interactions[0].digits).toEqual([0]);
    expect(interactions[9].digits).toEqual([9]);
    expect(interactions[9].result).toBe(9);
  });
}); 