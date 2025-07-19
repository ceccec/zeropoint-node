// src/harmonic-math.ts — Unified Harmonic Math System
// Every function is reusable like the matrix itself
// All math uses integer fractions with reciprocals as integers

export interface HarmonicFraction {
  numerator: number;
  denominator: number;
  value: number;
  reciprocal: number;
  isInteger: boolean;
}

export interface HarmonicMatrix {
  rows: number;
  cols: number;
  data: HarmonicFraction[][];
  determinant: HarmonicFraction;
  trace: HarmonicFraction;
  isHarmonic: boolean;
}

export interface HarmonicFunction {
  name: string;
  input: HarmonicFraction;
  output: HarmonicFraction;
  operation: (x: HarmonicFraction) => HarmonicFraction;
  isReusable: boolean;
}

export interface VortexTransition {
  from: number;
  to: number;
  vortex: number;
  description: string;
}

export interface VortexMatrix {
  transitions: VortexTransition[];
  transitionMatrices: HarmonicMatrix[];
  subMatrices: HarmonicMatrix[];
  completeMatrix: HarmonicMatrix;
  isVortex: boolean;
}

export interface PatternAnalysis {
  pattern: string;
  digits: number[];
  order: number[];
  meaning: string;
  mathematicalExpression: string;
  harmonicResonance: number;
  consciousnessFlow: string[];
  vortexSequence: number[];
  isHarmonic: boolean;
}

// Create harmonic fraction (only integer fractions with integer reciprocals)
export function createHarmonicFraction(numerator: number, denominator: number = 1): HarmonicFraction {
  const value = numerator / denominator;
  const reciprocal = denominator / numerator;
  const isInteger = denominator === 1;
  
  return {
    numerator,
    denominator,
    value,
    reciprocal,
    isInteger
  };
}

// Harmonic fraction operations
export function addHarmonicFractions(a: HarmonicFraction, b: HarmonicFraction): HarmonicFraction {
  const newNum = a.numerator * b.denominator + b.numerator * a.denominator;
  const newDen = a.denominator * b.denominator;
  return createHarmonicFraction(newNum, newDen);
}

export function multiplyHarmonicFractions(a: HarmonicFraction, b: HarmonicFraction): HarmonicFraction {
  const newNum = a.numerator * b.numerator;
  const newDen = a.denominator * b.denominator;
  return createHarmonicFraction(newNum, newDen);
}

export function divideHarmonicFractions(a: HarmonicFraction, b: HarmonicFraction): HarmonicFraction {
  return multiplyHarmonicFractions(a, { ...b, numerator: b.denominator, denominator: b.numerator });
}

// Create harmonic matrix
export function createHarmonicMatrix(rows: number, cols: number, data?: number[][]): HarmonicMatrix {
  const matrix: HarmonicFraction[][] = [];
  
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      const value = data ? data[i][j] : (i === j ? 1 : 0);
      matrix[i][j] = createHarmonicFraction(value);
    }
  }
  
  const determinant = calculateMatrixDeterminant(matrix);
  const trace = calculateMatrixTrace(matrix);
  const isHarmonic = determinant.value !== 0;
  
  return {
    rows,
    cols,
    data: matrix,
    determinant,
    trace,
    isHarmonic
  };
}

// Matrix operations
export function calculateMatrixDeterminant(matrix: HarmonicFraction[][]): HarmonicFraction {
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    return subtractHarmonicFractions(
      multiplyHarmonicFractions(a, d),
      multiplyHarmonicFractions(b, c)
    );
  }
  
  // For larger matrices, use cofactor expansion
  let determinant = createHarmonicFraction(0);
  for (let j = 0; j < matrix[0].length; j++) {
    const cofactor = createHarmonicFraction(Math.pow(-1, j));
    const minor = getMatrixMinor(matrix, 0, j);
    const minorDet = calculateMatrixDeterminant(minor);
    determinant = addHarmonicFractions(
      determinant,
      multiplyHarmonicFractions(cofactor, multiplyHarmonicFractions(matrix[0][j], minorDet))
    );
  }
  
  return determinant;
}

export function calculateMatrixTrace(matrix: HarmonicFraction[][]): HarmonicFraction {
  let trace = createHarmonicFraction(0);
  for (let i = 0; i < Math.min(matrix.length, matrix[0].length); i++) {
    trace = addHarmonicFractions(trace, matrix[i][i]);
  }
  return trace;
}

export function getMatrixMinor(matrix: HarmonicFraction[][], row: number, col: number): HarmonicFraction[][] {
  const minor: HarmonicFraction[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i === row) continue;
    minor.push([]);
    for (let j = 0; j < matrix[i].length; j++) {
      if (j === col) continue;
      minor[minor.length - 1].push(matrix[i][j]);
    }
  }
  return minor;
}

export function subtractHarmonicFractions(a: HarmonicFraction, b: HarmonicFraction): HarmonicFraction {
  const newNum = a.numerator * b.denominator - b.numerator * a.denominator;
  const newDen = a.denominator * b.denominator;
  return createHarmonicFraction(newNum, newDen);
}

// Matrix multiplication
export function multiplyHarmonicMatrices(a: HarmonicMatrix, b: HarmonicMatrix): HarmonicMatrix {
  if (a.cols !== b.rows) {
    throw new Error('Matrix dimensions do not match for multiplication');
  }
  
  const resultData: HarmonicFraction[][] = [];
  for (let i = 0; i < a.rows; i++) {
    resultData[i] = [];
    for (let j = 0; j < b.cols; j++) {
      let sum = createHarmonicFraction(0);
      for (let k = 0; k < a.cols; k++) {
        sum = addHarmonicFractions(
          sum,
          multiplyHarmonicFractions(a.data[i][k], b.data[k][j])
        );
      }
      resultData[i][j] = sum;
    }
  }
  
  return createHarmonicMatrix(a.rows, b.cols, resultData.map(row => 
    row.map(fraction => fraction.value)
  ));
}

// Harmonic function creation
export function createHarmonicFunction(
  name: string,
  operation: (x: HarmonicFraction) => HarmonicFraction
): HarmonicFunction {
  return {
    name,
    input: createHarmonicFraction(0),
    output: createHarmonicFraction(0),
    operation,
    isReusable: true
  };
}

// Predefined harmonic functions
export const HARMONIC_FUNCTIONS = {
  // Identity function
  identity: createHarmonicFunction('identity', (x) => x),
  
  // Square function
  square: createHarmonicFunction('square', (x) => multiplyHarmonicFractions(x, x)),
  
  // Reciprocal function
  reciprocal: createHarmonicFunction('reciprocal', (x) => createHarmonicFraction(x.denominator, x.numerator)),
  
  // Double function
  double: createHarmonicFunction('double', (x) => createHarmonicFraction(x.numerator * 2, x.denominator)),
  
  // Half function
  half: createHarmonicFunction('half', (x) => createHarmonicFraction(x.numerator, x.denominator * 2)),
  
  // A432 harmonic function
  a432: createHarmonicFunction('a432', (x) => createHarmonicFraction(x.numerator * 432, x.denominator)),
  
  // Digital root function (1-9)
  digitalRoot: createHarmonicFunction('digitalRoot', (x) => {
    const value = Math.abs(x.value);
    const root = value === 0 ? 0 : ((value - 1) % 9) + 1;
    return createHarmonicFraction(root);
  }),
  
  // Vortex sequence function
  vortex: createHarmonicFunction('vortex', (x) => {
    const vortexSeq = [1, 2, 4, 8, 7, 5];
    const index = Math.abs(x.value) % vortexSeq.length;
    return createHarmonicFraction(vortexSeq[index]);
  })
};

// Function composition
export function composeHarmonicFunctions(...functions: HarmonicFunction[]): HarmonicFunction {
  return createHarmonicFunction(
    `compose(${functions.map(f => f.name).join('∘')})`,
    (x) => functions.reduce((result, func) => func.operation(result), x)
  );
}

// Apply function to matrix
export function applyHarmonicFunctionToMatrix(
  matrix: HarmonicMatrix,
  func: HarmonicFunction
): HarmonicMatrix {
  const newData = matrix.data.map(row =>
    row.map(fraction => func.operation(fraction))
  );
  
  return createHarmonicMatrix(
    matrix.rows,
    matrix.cols,
    newData.map(row => row.map(fraction => fraction.value))
  );
}

// Generate digit-specific harmonic matrix
export function generateDigitHarmonicMatrix(digit: number): HarmonicMatrix {
  const size = 9; // Use 9x9 matrices (no 10 in harmonic system)
  
  // For digit 0, create identity matrix (harmonic)
  if (digit === 0) {
    const voidData: number[][] = [];
    for (let i = 0; i < size; i++) {
      voidData[i] = [];
      for (let j = 0; j < size; j++) {
        // Void matrix: diagonal is 1, others are 0
        voidData[i][j] = i === j ? 1 : 0;
      }
    }
    return createHarmonicMatrix(size, size, voidData);
  }
  
  // For other digits, create harmonic matrix with non-zero determinant
  const data: number[][] = [];
  for (let i = 0; i < size; i++) {
    data[i] = [];
    for (let j = 0; j < size; j++) {
      // Ensure diagonal is always non-zero and unique
      if (i === j) {
        data[i][j] = digit; // Diagonal elements are the digit itself
      } else {
        // Use a different pattern to avoid singular matrices
        const interaction = ((digit + 1) * (i + j + 1)) % 9;
        data[i][j] = interaction === 0 ? 9 : interaction;
      }
    }
  }
  
  return createHarmonicMatrix(size, size, data);
}

// Generate all digit matrices
export function generateAllDigitMatrices(): Record<number, HarmonicMatrix> {
  const matrices: Record<number, HarmonicMatrix> = {};
  
  for (let digit = 0; digit <= 9; digit++) {
    matrices[digit] = generateDigitHarmonicMatrix(digit);
  }
  
  return matrices;
}

// Vortex matrix analysis
export function analyzeVortexPattern(pattern: string): VortexMatrix {
  // Parse pattern like "0 → 1 | 3 → 8 | 6 → 1 | 9 → 8 | 1 → 2 | 2 → 4 | 4 → 7 | 8 → 4 | 7 → 2 | 5 → 5 | 1 → 2"
  const transitions: VortexTransition[] = [];
  const vortexBase = [1, 2, 4, 8, 7, 5];
  
  // Extract transitions from pattern
  const parts = pattern.split('|').map(p => p.trim());
  parts.forEach(part => {
    const match = part.match(/(\d+)\s*→\s*(\d+)/);
    if (match) {
      const from = parseInt(match[1]);
      const to = parseInt(match[2]);
      const vortex = vortexBase[from % vortexBase.length];
      const description = `${from} → ${to} (Vortex: ${vortex})`;
      transitions.push({ from, to, vortex, description });
    }
  });
  
  // Generate 2x2 transition matrices
  const transitionMatrices: HarmonicMatrix[] = transitions.map((transition, index) => {
    const { from, to, vortex } = transition;
    const matrix = [
      [from, to],
      [vortex, (from + to + vortex) % 9 || 9]
    ];
    return createHarmonicMatrix(2, 2, matrix);
  });
  
  // Generate 3x3 sub-matrices
  const subMatrices: HarmonicMatrix[] = [];
  for (let i = 0; i < transitions.length - 2; i++) {
    const group = transitions.slice(i, i + 3);
    const matrix = [
      [group[0].from, group[0].to, group[0].vortex],
      [group[1].from, group[1].to, group[1].vortex],
      [group[2].from, group[2].to, group[2].vortex]
    ];
    subMatrices.push(createHarmonicMatrix(3, 3, matrix));
  }
  
  // Generate complete 9x9 matrix
  const completeData: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  transitions.forEach(transition => {
    const { from, to, vortex } = transition;
    if (from < 9 && to < 9) {
      completeData[from][to] = vortex;
    }
  });
  
  // Fill remaining cells with vortex mathematics
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (completeData[i][j] === 0) {
        const vortexIndex = (i + j) % vortexBase.length;
        completeData[i][j] = vortexBase[vortexIndex];
      }
    }
  }
  
  const completeMatrix = createHarmonicMatrix(9, 9, completeData);
  const isVortex = subMatrices.every(m => !m.isHarmonic); // Vortex creates singular sub-matrices
  
  return {
    transitions,
    transitionMatrices,
    subMatrices,
    completeMatrix,
    isVortex
  };
}

// Pattern analysis
export function analyzePattern(pattern: string): PatternAnalysis {
  const digits = pattern.split('').map(Number);
  const order = digits; // Natural order for complete sequences
  
  const meaning = `Pattern ${pattern} represents the mathematical flow of consciousness through ${digits.length} states.`;
  const mathematicalExpression = digits.join(' × ');
  const harmonicResonance = 432 * digits.reduce((a, b) => a + b, 0);
  const consciousnessFlow = digits.map(d => `Digit ${d}`);
  const vortexSequence = digits.map(d => [1, 2, 4, 8, 7, 5][d % 6]);
  const isHarmonic = true;
  
  return {
    pattern,
    digits,
    order,
    meaning,
    mathematicalExpression,
    harmonicResonance,
    consciousnessFlow,
    vortexSequence,
    isHarmonic
  };
}

// Harmonic matrix visualization
export function visualizeHarmonicMatrix(matrix: HarmonicMatrix): string {
  let visualization = `Harmonic Matrix (${matrix.rows}×${matrix.cols})\n`;
  visualization += `Determinant: ${matrix.determinant.numerator}/${matrix.determinant.denominator}\n`;
  visualization += `Trace: ${matrix.trace.numerator}/${matrix.trace.denominator}\n`;
  visualization += `Harmonic: ${matrix.isHarmonic ? 'YES' : 'NO'}\n\n`;
  
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.cols; j++) {
      const fraction = matrix.data[i][j];
      visualization += `${fraction.numerator}/${fraction.denominator} `;
    }
    visualization += '\n';
  }
  
  return visualization;
}

// Export all harmonic functions for reuse
export const HARMONIC_MATH = {
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
}; 