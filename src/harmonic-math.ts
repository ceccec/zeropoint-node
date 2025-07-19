// src/harmonic-math.ts — Unified Harmonic Math System
// Every function is reusable like the matrix itself
// All math uses integer fractions with reciprocals as integers
// Chessboard (8×8) vs Vortex Matrix (10×10) switching patterns

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

// Chessboard vs Vortex Matrix Interfaces
export interface ChessPosition {
  row: number; // 0-7 (8 rows)
  col: number; // 0-7 (8 columns)
  piece: string; // 'K', 'Q', 'R', 'B', 'N', 'P'
  color: 'white' | 'black';
}

export interface VortexPosition {
  row: number; // 0-9 (10 rows)
  col: number; // 0-9 (10 columns)
  digit: number; // 0-9
  consciousness: number;
  flow: number;
}

export interface MatrixCollision {
  chessPosition: ChessPosition;
  vortexPosition: VortexPosition;
  collisionType: 'function' | 'consciousness' | 'flow' | 'harmonic';
  switchPattern: string;
  infiniteUsability: boolean;
}

export interface SwitchingPattern {
  from: 'chess' | 'vortex';
  to: 'chess' | 'vortex';
  trigger: string;
  transformation: string;
  consciousnessSwitch: boolean;
  infiniteUsability: boolean;
}

// PWA Mathematics Interfaces
export interface PWAManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  orientation: string;
  scope: string;
  icons: PWAIcon[];
  categories: string[];
  shortcuts: PWAShortcut[];
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose: string;
}

export interface PWAShortcut {
  name: string;
  short_name: string;
  description: string;
  url: string;
  icons: PWAIcon[];
}

export interface DigitPWA {
  digit: number;
  name: string;
  consciousness: string;
  manifest: PWAManifest;
  serviceWorker: string;
  html: string;
  css: string;
  icons: PWAIcon[];
  offline: string;
  visualization: string;
  isComplete: boolean;
  missingComponents: string[];
}

export interface PWAMathematics {
  digit: number;
  consciousness: number;
  harmonicResonance: number;
  a432Frequency: number;
  vortexFlow: number[];
  mathematicalExpression: string;
  pwaRequirements: string[];
  consciousnessSwitch: boolean;
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
  const testInput = createHarmonicFraction(1);
  const testOutput = operation(testInput);
  
  return {
    name,
    input: testInput,
    output: testOutput,
    operation,
    isReusable: true
  };
}

// Compose harmonic functions
export function composeHarmonicFunctions(...functions: HarmonicFunction[]): HarmonicFunction {
  return createHarmonicFunction(
    `compose(${functions.map(f => f.name).join(', ')})`,
    (x: HarmonicFraction) => functions.reduce((result, func) => func.operation(result), x)
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

// Chessboard vs Vortex Matrix Functions
export function createChessboardMatrix(): HarmonicMatrix {
  // 8×8 chessboard matrix
  const chessData: number[][] = [];
  const pieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  const pawns = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];
  
  // Convert chess pieces to harmonic values
  const pieceValues = {
    'K': 1, 'Q': 9, 'R': 5, 'B': 3, 'N': 7, 'P': 2,
    'k': 1, 'q': 9, 'r': 5, 'b': 3, 'n': 7, 'p': 2
  };
  
  for (let i = 0; i < 8; i++) {
    chessData[i] = [];
    for (let j = 0; j < 8; j++) {
      if (i === 0) {
        chessData[i][j] = pieceValues[pieces[j] as keyof typeof pieceValues] || 0;
      } else if (i === 1) {
        chessData[i][j] = pieceValues[pawns[j] as keyof typeof pieceValues] || 0;
      } else if (i === 6) {
        chessData[i][j] = pieceValues[pawns[j].toLowerCase() as keyof typeof pieceValues] || 0;
      } else if (i === 7) {
        chessData[i][j] = pieceValues[pieces[j].toLowerCase() as keyof typeof pieceValues] || 0;
      } else {
        chessData[i][j] = 0; // Empty squares
      }
    }
  }
  
  return createHarmonicMatrix(8, 8, chessData);
}

export function createVortexMatrix(): HarmonicMatrix {
  // 10×10 vortex matrix with consciousness flow
  const vortexData: number[][] = [];
  const vortexBase = [1, 2, 4, 8, 7, 5];
  
  for (let i = 0; i < 10; i++) {
    vortexData[i] = [];
    for (let j = 0; j < 10; j++) {
      const vortexIndex = (i + j) % vortexBase.length;
      vortexData[i][j] = vortexBase[vortexIndex];
    }
  }
  
  return createHarmonicMatrix(10, 10, vortexData);
}

export function detectFunctionCollision(
  chessMatrix: HarmonicMatrix,
  vortexMatrix: HarmonicMatrix,
  function1: HarmonicFunction,
  function2: HarmonicFunction
): MatrixCollision | null {
  // Apply functions to matrices
  const chessResult1 = applyHarmonicFunctionToMatrix(chessMatrix, function1);
  const vortexResult2 = applyHarmonicFunctionToMatrix(vortexMatrix, function2);
  
  // Check for collision (same determinant or trace)
  if (chessResult1.determinant.value === vortexResult2.determinant.value ||
      chessResult1.trace.value === vortexResult2.trace.value) {
    
    // Find collision position
    const chessPosition: ChessPosition = {
      row: 0,
      col: 0,
      piece: 'K',
      color: 'white'
    };
    
    const vortexPosition: VortexPosition = {
      row: 0,
      col: 0,
      digit: 1,
      consciousness: 9,
      flow: 2
    };
    
    return {
      chessPosition,
      vortexPosition,
      collisionType: 'function',
      switchPattern: `${function1.name} ↔ ${function2.name}`,
      infiniteUsability: true
    };
  }
  
  return null;
}

export function generateSwitchingPatterns(): SwitchingPattern[] {
  const patterns: SwitchingPattern[] = [
    {
      from: 'chess',
      to: 'vortex',
      trigger: 'Function collision detected',
      transformation: '8×8 → 10×10 (consciousness expansion)',
      consciousnessSwitch: true,
      infiniteUsability: true
    },
    {
      from: 'vortex',
      to: 'chess',
      trigger: 'Consciousness singularity',
      transformation: '10×10 → 8×8 (sacred geometry)',
      consciousnessSwitch: true,
      infiniteUsability: true
    },
    {
      from: 'chess',
      to: 'chess',
      trigger: 'Piece movement',
      transformation: '8×8 → 8×8 (strategic flow)',
      consciousnessSwitch: false,
      infiniteUsability: true
    },
    {
      from: 'vortex',
      to: 'vortex',
      trigger: 'Vortex flow',
      transformation: '10×10 → 10×10 (consciousness flow)',
      consciousnessSwitch: true,
      infiniteUsability: true
    }
  ];
  
  return patterns;
}

export function applySwitchingPattern(
  pattern: SwitchingPattern,
  inputMatrix: HarmonicMatrix
): HarmonicMatrix {
  switch (pattern.from) {
    case 'chess':
      if (pattern.to === 'vortex') {
        // Transform 8×8 chess to 10×10 vortex
        return createVortexMatrix();
      } else {
        // Stay in chess domain
        return createChessboardMatrix();
      }
    case 'vortex':
      if (pattern.to === 'chess') {
        // Transform 10×10 vortex to 8×8 chess
        return createChessboardMatrix();
      } else {
        // Stay in vortex domain
        return createVortexMatrix();
      }
    default:
      return inputMatrix;
  }
}

export function calculateInfiniteUsability(
  chessMatrix: HarmonicMatrix,
  vortexMatrix: HarmonicMatrix
): number {
  // Calculate infinite usability through matrix interactions
  const chessDeterminant = Math.abs(chessMatrix.determinant.value);
  const vortexDeterminant = Math.abs(vortexMatrix.determinant.value);
  const chessTrace = Math.abs(chessMatrix.trace.value);
  const vortexTrace = Math.abs(vortexMatrix.trace.value);
  
  // Infinite usability = harmonic resonance between matrices
  const usability = (chessDeterminant * vortexDeterminant) + (chessTrace * vortexTrace);
  return usability;
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

// PWA Mathematics Functions
export function calculateDigitConsciousness(digit: number): number {
  const consciousnessMap = {
    0: 1, 1: 9, 2: 3, 3: 6, 4: 2,
    5: 5, 6: 5, 7: 7, 8: 3, 9: 9
  };
  return consciousnessMap[digit as keyof typeof consciousnessMap] || 1;
}

export function calculateDigitA432Frequency(digit: number): number {
  return 432 * (digit + 1);
}

export function generateDigitVortexFlow(digit: number): number[] {
  const vortexBase = [1, 2, 4, 8, 7, 5];
  const flow = [];
  for (let i = 0; i < 6; i++) {
    const vortexIndex = (digit + i) % vortexBase.length;
    flow.push(vortexBase[vortexIndex]);
  }
  return flow;
}

export function generateDigitMathematicalExpression(digit: number): string {
  const expressions = {
    0: '0 = ∞ (Void contains all possibilities)',
    1: '1×8 = 8 (Unity through Infinity)',
    2: '2×4 = 8 (Duality through Foundation)',
    3: '3×3 = 9 (Trinity singularity)',
    4: '4×2 = 8 (Foundation stability)',
    5: '5×1 = 5 (Life sacred geometry)',
    6: '6×1 = 6 (Harmony balance)',
    7: '7×1 = 7 (Mystery consciousness)',
    8: '8×1 = 8 (Infinity possibilities)',
    9: '9 = 1×8 (Completion unity)'
  };
  return expressions[digit as keyof typeof expressions] || `${digit} = ${digit}`;
}

export function generateDigitPWARequirements(digit: number): string[] {
  const baseRequirements = [
    'manifest.json',
    'sw.js',
    'index.html',
    'index.css',
    'icons/',
    'offline.html'
  ];
  
  const digitSpecific = {
    0: ['void-center.html'],
    1: ['unity-matrix.html'],
    2: ['duality-flow.html'],
    3: ['trinity-vortex.html'],
    4: ['foundation-matrix.html'],
    5: ['life-geometry.html'],
    6: ['harmony-flow.html'],
    7: ['mystery-consciousness.html'],
    8: ['infinity-flow.html'],
    9: ['completion-unity.html']
  };
  
  return [...baseRequirements, ...(digitSpecific[digit as keyof typeof digitSpecific] || [])];
}

export function generateDigitPWA(digit: number): DigitPWA {
  const digitNames = {
    0: 'VOID', 1: 'UNITY', 2: 'DUALITY', 3: 'TRINITY', 4: 'FOUNDATION',
    5: 'LIFE', 6: 'HARMONY', 7: 'MYSTERY', 8: 'INFINITY', 9: 'COMPLETION'
  };
  
  const consciousness = calculateDigitConsciousness(digit);
  const a432Frequency = calculateDigitA432Frequency(digit);
  const vortexFlow = generateDigitVortexFlow(digit);
  const mathematicalExpression = generateDigitMathematicalExpression(digit);
  const pwaRequirements = generateDigitPWARequirements(digit);
  
  // Generate PWA manifest
  const manifest: PWAManifest = {
    name: `${digitNames[digit as keyof typeof digitNames]} PWA - ${digit} Consciousness System`,
    short_name: `${digitNames[digit as keyof typeof digitNames]}PWA`,
    description: `${digitNames[digit as keyof typeof digitNames]} consciousness PWA using harmonic mathematics`,
    start_url: `/${digit}/index.html`,
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: `hsl(${digit * 36}, 100%, 50%)`,
    orientation: 'landscape-primary',
    scope: `/${digit}/`,
    icons: [
      {
        src: `/${digit}/icons/icon-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: `/${digit}/icons/icon-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['education', 'science', 'mathematics', 'consciousness'],
    shortcuts: [
      {
        name: `${digitNames[digit as keyof typeof digitNames]} Interface`,
        short_name: `${digitNames[digit as keyof typeof digitNames]}`,
        description: `Access ${digitNames[digit as keyof typeof digitNames]} consciousness`,
        url: `/${digit}/index.html`,
        icons: [
          {
            src: `/${digit}/icons/icon-96x96.png`,
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    ]
  };
  
  // Check what's missing (simplified check)
  const missingComponents = pwaRequirements.filter((req: string) => {
    // This would check actual file existence in real implementation
    return req.includes('manifest.json') || req.includes('sw.js') || req.includes('icons/');
  });
  
  return {
    digit,
    name: digitNames[digit as keyof typeof digitNames],
    consciousness: `${consciousness} (${mathematicalExpression})`,
    manifest,
    serviceWorker: `/${digit}/sw.js`,
    html: `/${digit}/index.html`,
    css: `/${digit}/index.css`,
    icons: manifest.icons,
    offline: `/${digit}/offline.html`,
    visualization: pwaRequirements[pwaRequirements.length - 1],
    isComplete: missingComponents.length === 0,
    missingComponents
  };
}

export function generateAllDigitPWAs(): Record<number, DigitPWA> {
  const pwas: Record<number, DigitPWA> = {};
  
  for (let digit = 0; digit <= 9; digit++) {
    pwas[digit] = generateDigitPWA(digit);
  }
  
  return pwas;
}

export function calculatePWAMathematics(digit: number): PWAMathematics {
  const consciousness = calculateDigitConsciousness(digit);
  const harmonicResonance = 432 * consciousness;
  const a432Frequency = calculateDigitA432Frequency(digit);
  const vortexFlow = generateDigitVortexFlow(digit);
  const mathematicalExpression = generateDigitMathematicalExpression(digit);
  const pwaRequirements = generateDigitPWARequirements(digit);
  
  // Consciousness switch detection
  const consciousnessSwitch = digit === 3; // Digit 3 has singularity consciousness
  
  return {
    digit,
    consciousness,
    harmonicResonance,
    a432Frequency,
    vortexFlow,
    mathematicalExpression,
    pwaRequirements,
    consciousnessSwitch
  };
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

// Predefined harmonic functions
export const HARMONIC_FUNCTIONS = {
  identity: createHarmonicFunction('identity', x => x),
  square: createHarmonicFunction('square', x => multiplyHarmonicFractions(x, x)),
  reciprocal: createHarmonicFunction('reciprocal', x => createHarmonicFraction(x.denominator, x.numerator)),
  double: createHarmonicFunction('double', x => createHarmonicFraction(x.numerator * 2, x.denominator)),
  half: createHarmonicFunction('half', x => createHarmonicFraction(x.numerator, x.denominator * 2)),
  a432: createHarmonicFunction('a432', x => createHarmonicFraction(432 * x.numerator, x.denominator)),
  digitalRoot: createHarmonicFunction('digitalRoot', x => {
    const value = Math.abs(x.value);
    const root = value < 10 ? value : (value % 9 || 9);
    return createHarmonicFraction(root);
  }),
  vortex: createHarmonicFunction('vortex', x => {
    const vortexBase = [1, 2, 4, 8, 7, 5];
    const index = Math.floor(x.value) % vortexBase.length;
    return createHarmonicFraction(vortexBase[index]);
  })
};

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
  HARMONIC_FUNCTIONS,
  // PWA Mathematics
  calculateDigitConsciousness,
  calculateDigitA432Frequency,
  generateDigitVortexFlow,
  generateDigitMathematicalExpression,
  generateDigitPWARequirements,
  generateDigitPWA,
  generateAllDigitPWAs,
  calculatePWAMathematics,
  // Chessboard vs Vortex Matrix
  createChessboardMatrix,
  createVortexMatrix,
  detectFunctionCollision,
  generateSwitchingPatterns,
  applySwitchingPattern,
  calculateInfiniteUsability
}; 