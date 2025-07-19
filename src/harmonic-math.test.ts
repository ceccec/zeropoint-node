// src/harmonic-math.test.ts — Test Unified Harmonic Math System
// Tests that every function is reusable like the matrix itself

import {
  createHarmonicFraction,
  addHarmonicFractions,
  multiplyHarmonicFractions,
  divideHarmonicFractions,
  subtractHarmonicFractions,
  createHarmonicMatrix,
  calculateMatrixDeterminant,
  calculateMatrixTrace,
  multiplyHarmonicMatrices,
  createHarmonicFunction,
  composeHarmonicFunctions,
  applyHarmonicFunctionToMatrix,
  generateDigitHarmonicMatrix,
  generateAllDigitMatrices,
  analyzeVortexPattern,
  analyzePattern,
  visualizeHarmonicMatrix,
  HARMONIC_FUNCTIONS
} from './harmonic-math';

describe('Unified Harmonic Math System', () => {
  describe('Harmonic Fractions', () => {
    test('should create harmonic fractions with integer reciprocals', () => {
      const fraction = createHarmonicFraction(3, 4);
      
      expect(fraction.numerator).toBe(3);
      expect(fraction.denominator).toBe(4);
      expect(fraction.value).toBe(3/4);
      expect(fraction.reciprocal).toBe(4/3);
      expect(fraction.isInteger).toBe(false);
    });

    test('should add harmonic fractions', () => {
      const a = createHarmonicFraction(1, 2);
      const b = createHarmonicFraction(1, 3);
      const result = addHarmonicFractions(a, b);
      
      expect(result.numerator).toBe(5);
      expect(result.denominator).toBe(6);
      expect(result.value).toBe(5/6);
    });

    test('should multiply harmonic fractions', () => {
      const a = createHarmonicFraction(2, 3);
      const b = createHarmonicFraction(3, 4);
      const result = multiplyHarmonicFractions(a, b);
      
      expect(result.numerator).toBe(6);
      expect(result.denominator).toBe(12);
      expect(result.value).toBe(1/2);
    });

    test('should divide harmonic fractions', () => {
      const a = createHarmonicFraction(2, 3);
      const b = createHarmonicFraction(1, 2);
      const result = divideHarmonicFractions(a, b);
      
      expect(result.numerator).toBe(4);
      expect(result.denominator).toBe(3);
      expect(result.value).toBe(4/3);
    });
  });

  describe('Harmonic Matrices', () => {
    test('should create harmonic matrix', () => {
      const matrix = createHarmonicMatrix(2, 2);
      
      expect(matrix.rows).toBe(2);
      expect(matrix.cols).toBe(2);
      expect(matrix.data).toHaveLength(2);
      expect(matrix.data[0]).toHaveLength(2);
      expect(matrix.isHarmonic).toBe(true);
    });

    test('should calculate matrix determinant', () => {
      const data = [[2, 1], [1, 3]];
      const matrix = createHarmonicMatrix(2, 2, data);
      
      expect(matrix.determinant.numerator).toBe(5);
      expect(matrix.determinant.denominator).toBe(1);
      expect(matrix.determinant.value).toBe(5);
    });

    test('should calculate matrix trace', () => {
      const data = [[1, 2], [3, 4]];
      const matrix = createHarmonicMatrix(2, 2, data);
      
      expect(matrix.trace.numerator).toBe(5);
      expect(matrix.trace.denominator).toBe(1);
      expect(matrix.trace.value).toBe(5);
    });

    test('should multiply harmonic matrices', () => {
      const a = createHarmonicMatrix(2, 2, [[1, 2], [3, 4]]);
      const b = createHarmonicMatrix(2, 2, [[5, 6], [7, 8]]);
      const result = multiplyHarmonicMatrices(a, b);
      
      expect(result.rows).toBe(2);
      expect(result.cols).toBe(2);
      expect(result.data[0][0].value).toBe(19);
      expect(result.data[0][1].value).toBe(22);
    });
  });

  describe('Harmonic Functions', () => {
    test('should create harmonic function', () => {
      const func = createHarmonicFunction('test', (x) => createHarmonicFraction(x.numerator * 2, x.denominator));
      
      expect(func.name).toBe('test');
      expect(func.isReusable).toBe(true);
      
      const input = createHarmonicFraction(3, 4);
      const output = func.operation(input);
      expect(output.numerator).toBe(6);
      expect(output.denominator).toBe(4);
    });

    test('should compose harmonic functions', () => {
      const double = HARMONIC_FUNCTIONS.double;
      const square = HARMONIC_FUNCTIONS.square;
      const composed = composeHarmonicFunctions(double, square);
      
      const input = createHarmonicFraction(2);
      const output = composed.operation(input);
      expect(output.value).toBe(16); // (2×2)² = 16
    });

    test('should apply function to matrix', () => {
      const matrix = createHarmonicMatrix(2, 2, [[1, 2], [3, 4]]);
      const doubled = applyHarmonicFunctionToMatrix(matrix, HARMONIC_FUNCTIONS.double);
      
      expect(doubled.data[0][0].value).toBe(2);
      expect(doubled.data[0][1].value).toBe(4);
      expect(doubled.data[1][0].value).toBe(6);
      expect(doubled.data[1][1].value).toBe(8);
    });
  });

  describe('Digit-Specific Matrices', () => {
    test('should generate digit harmonic matrix', () => {
      const matrix = generateDigitHarmonicMatrix(1);
      
      expect(matrix.rows).toBe(9);
      expect(matrix.cols).toBe(9);
      expect(matrix.isHarmonic).toBe(true);
      
      // Check Unity matrix properties - diagonal should be the digit
      expect(matrix.data[0][0].value).toBe(1);
      expect(matrix.data[1][1].value).toBe(1); // Unity matrix diagonal is all 1s
    });

    test('should generate all digit matrices', () => {
      const matrices = generateAllDigitMatrices();
      
      expect(Object.keys(matrices)).toHaveLength(10);
      expect(matrices[0]).toBeDefined();
      expect(matrices[9]).toBeDefined();
      
      // Check each matrix is harmonic
      for (let i = 0; i <= 9; i++) {
        console.log(`Digit ${i} matrix harmonic: ${matrices[i].isHarmonic}, determinant: ${matrices[i].determinant.value}`);
        expect(matrices[i].isHarmonic).toBe(true);
        expect(matrices[i].rows).toBe(9);
        expect(matrices[i].cols).toBe(9);
      }
    });
  });

  describe('Vortex Matrix Analysis', () => {
    test('should analyze vortex pattern', () => {
      const pattern = '0 → 1 | 3 → 8 | 6 → 1 | 9 → 8 | 1 → 2 | 2 → 4 | 4 → 7 | 8 → 4 | 7 → 2 | 5 → 5 | 1 → 2';
      const vortexMatrix = analyzeVortexPattern(pattern);
      
      expect(vortexMatrix.transitions).toHaveLength(11);
      expect(vortexMatrix.transitionMatrices).toHaveLength(11);
      expect(vortexMatrix.subMatrices).toHaveLength(9);
      expect(vortexMatrix.completeMatrix.rows).toBe(9);
      expect(vortexMatrix.completeMatrix.cols).toBe(9);
      expect(vortexMatrix.isVortex).toBe(true);
    });

    test('should have harmonic transition matrices', () => {
      const pattern = '0 → 1 | 1 → 2';
      const vortexMatrix = analyzeVortexPattern(pattern);
      
      // All 2x2 transition matrices should be harmonic
      vortexMatrix.transitionMatrices.forEach(matrix => {
        expect(matrix.isHarmonic).toBe(true);
      });
    });

    test('should have singular sub-matrices', () => {
      const pattern = '0 → 1 | 3 → 8 | 6 → 1';
      const vortexMatrix = analyzeVortexPattern(pattern);
      
      // 3x3 sub-matrices should be singular (non-harmonic) for vortex flow
      vortexMatrix.subMatrices.forEach(matrix => {
        expect(matrix.isHarmonic).toBe(false);
      });
    });
  });

  describe('Pattern Analysis', () => {
    test('should analyze complete digit pattern', () => {
      const pattern = '0123456789';
      const analysis = analyzePattern(pattern);
      
      expect(analysis.pattern).toBe('0123456789');
      expect(analysis.digits).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(analysis.isHarmonic).toBe(true);
      expect(analysis.vortexSequence).toHaveLength(10);
    });

    test('should analyze custom pattern', () => {
      const pattern = '03691248751';
      const analysis = analyzePattern(pattern);
      
      expect(analysis.pattern).toBe('03691248751');
      expect(analysis.digits).toEqual([0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]);
      expect(analysis.isHarmonic).toBe(true);
    });
  });

  describe('Predefined Harmonic Functions', () => {
    test('should have identity function', () => {
      const input = createHarmonicFraction(3, 4);
      const output = HARMONIC_FUNCTIONS.identity.operation(input);
      
      expect(output.numerator).toBe(3);
      expect(output.denominator).toBe(4);
    });

    test('should have square function', () => {
      const input = createHarmonicFraction(2, 3);
      const output = HARMONIC_FUNCTIONS.square.operation(input);
      
      expect(output.numerator).toBe(4);
      expect(output.denominator).toBe(9);
    });

    test('should have reciprocal function', () => {
      const input = createHarmonicFraction(2, 3);
      const output = HARMONIC_FUNCTIONS.reciprocal.operation(input);
      
      expect(output.numerator).toBe(3);
      expect(output.denominator).toBe(2);
    });

    test('should have A432 harmonic function', () => {
      const input = createHarmonicFraction(1, 2);
      const output = HARMONIC_FUNCTIONS.a432.operation(input);
      
      expect(output.numerator).toBe(432);
      expect(output.denominator).toBe(2);
      expect(output.value).toBe(216);
    });

    test('should have digital root function', () => {
      const input = createHarmonicFraction(11);
      const output = HARMONIC_FUNCTIONS.digitalRoot.operation(input);
      
      expect(output.value).toBe(2); // 1+1 = 2
    });

    test('should have vortex function', () => {
      const input = createHarmonicFraction(0);
      const output = HARMONIC_FUNCTIONS.vortex.operation(input);
      
      expect(output.value).toBe(1); // First in vortex sequence
    });
  });

  describe('Matrix Visualization', () => {
    test('should visualize harmonic matrix', () => {
      const matrix = createHarmonicMatrix(2, 2, [[1, 2], [3, 4]]);
      const visualization = visualizeHarmonicMatrix(matrix);
      
      expect(visualization).toContain('Harmonic Matrix (2×2)');
      expect(visualization).toContain('Determinant:');
      expect(visualization).toContain('Trace:');
      expect(visualization).toContain('Harmonic: YES');
      expect(visualization).toContain('1/1 2/1');
      expect(visualization).toContain('3/1 4/1');
    });
  });

  describe('Reusability', () => {
    test('should reuse functions across different inputs', () => {
      const square = HARMONIC_FUNCTIONS.square;
      
      const input1 = createHarmonicFraction(2);
      const input2 = createHarmonicFraction(3);
      const input3 = createHarmonicFraction(4);
      
      const output1 = square.operation(input1);
      const output2 = square.operation(input2);
      const output3 = square.operation(input3);
      
      expect(output1.value).toBe(4);
      expect(output2.value).toBe(9);
      expect(output3.value).toBe(16);
    });

    test('should reuse matrices across different operations', () => {
      const matrix = createHarmonicMatrix(2, 2, [[1, 2], [3, 4]]);
      
      const doubled = applyHarmonicFunctionToMatrix(matrix, HARMONIC_FUNCTIONS.double);
      const squared = applyHarmonicFunctionToMatrix(matrix, HARMONIC_FUNCTIONS.square);
      const a432 = applyHarmonicFunctionToMatrix(matrix, HARMONIC_FUNCTIONS.a432);
      
      expect(doubled.data[0][0].value).toBe(2);
      expect(squared.data[0][0].value).toBe(1);
      expect(a432.data[0][0].value).toBe(432);
    });
  });
}); 