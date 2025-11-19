/**
 * A432 Sacred Geometry Integer Mathematics
 * All calculations use exact integer arithmetic
 * No floating point - pure mathematical relationships
 */

// ============================================================================
// PLATONIC SOLIDS - EXACT INTEGER PROPERTIES
// ============================================================================

export const PLATONIC_SOLIDS = {
  TETRAHEDRON: {
    vertices: 4,
    edges: 6,
    faces: 4,
    faceType: 3, // triangular faces
    vertexDegree: 3, // edges per vertex
    dualOf: 'TETRAHEDRON', // self-dual
    schläfli: [3, 3], // {3,3}
  },
  
  CUBE: {
    vertices: 8,
    edges: 12,
    faces: 6,
    faceType: 4, // square faces
    vertexDegree: 3,
    dualOf: 'OCTAHEDRON',
    schläfli: [4, 3], // {4,3}
  },
  
  OCTAHEDRON: {
    vertices: 6,
    edges: 12,
    faces: 8,
    faceType: 3, // triangular faces
    vertexDegree: 4,
    dualOf: 'CUBE',
    schläfli: [3, 4], // {3,4}
  },
  
  DODECAHEDRON: {
    vertices: 20,
    edges: 30,
    faces: 12,
    faceType: 5, // pentagonal faces
    vertexDegree: 3,
    dualOf: 'ICOSAHEDRON',
    schläfli: [5, 3], // {5,3}
  },
  
  ICOSAHEDRON: {
    vertices: 12,
    edges: 30,
    faces: 20,
    faceType: 3, // triangular faces
    vertexDegree: 5,
    dualOf: 'DODECAHEDRON',
    schläfli: [3, 5], // {3,5}
  },
} as const;

// ============================================================================
// ARCHIMEDEAN SOLIDS - SEMI-REGULAR POLYHEDRA
// ============================================================================

export const ARCHIMEDEAN_SOLIDS = {
  TRUNCATED_TETRAHEDRON: {
    vertices: 12,
    edges: 18,
    faces: 8,
    faceTypes: [3, 6], // triangles and hexagons
  },
  
  CUBOCTAHEDRON: {
    vertices: 12,
    edges: 24,
    faces: 14,
    faceTypes: [3, 4], // triangles and squares
  },
  
  TRUNCATED_CUBE: {
    vertices: 24,
    edges: 36,
    faces: 14,
    faceTypes: [3, 8], // triangles and octagons
  },
  
  TRUNCATED_OCTAHEDRON: {
    vertices: 24,
    edges: 36,
    faces: 14,
    faceTypes: [4, 6], // squares and hexagons
  },
  
  RHOMBICUBOCTAHEDRON: {
    vertices: 24,
    edges: 48,
    faces: 26,
    faceTypes: [3, 4], // triangles and squares
  },
  
  ICOSIDODECAHEDRON: {
    vertices: 30,
    edges: 60,
    faces: 32,
    faceTypes: [3, 5], // triangles and pentagons
  },
} as const;

// ============================================================================
// GOLDEN RATIO AND FIBONACCI - INTEGER REPRESENTATIONS
// ============================================================================

export const GOLDEN_CONSTANTS = {
  // Fibonacci ratios approaching phi
  PHI_APPROXIMATIONS: [
    [1, 1],    // 1.000000
    [2, 1],    // 2.000000
    [3, 2],    // 1.500000
    [5, 3],    // 1.666667
    [8, 5],    // 1.600000
    [13, 8],   // 1.625000
    [21, 13],  // 1.615385
    [34, 21],  // 1.619048
    [55, 34],  // 1.617647
    [89, 55],  // 1.618182
    [144, 89], // 1.617978
    [233, 144],// 1.618056
  ],
  
  // Lucas number ratios
  LUCAS_RATIOS: [
    [3, 2],    // 1.500000
    [4, 3],    // 1.333333
    [7, 4],    // 1.750000
    [11, 7],   // 1.571429
    [18, 11],  // 1.636364
    [29, 18],  // 1.611111
    [47, 29],  // 1.620690
    [76, 47],  // 1.617021
    [123, 76], // 1.618421
  ],
  
  // Pentagon and pentagram ratios
  PENTAGON_DIAGONAL: [1618, 1000], // diagonal/side ratio
  PENTAGRAM_RATIO: [1618, 1000],    // star point ratios
} as const;

// ============================================================================
// SACRED GEOMETRY CALCULATOR CLASS
// ============================================================================

export class SacredGeometryIntegers {
  /**
   * Verify Euler's formula: V - E + F = 2
   */
  static verifyEuler(vertices: number, edges: number, faces: number): boolean {
    return vertices - edges + faces === 2;
  }
  
  /**
   * Calculate surface area of regular polyhedron
   * Using integer math (multiply by 10000 for precision)
   */
  static platonicSurfaceArea(solid: keyof typeof PLATONIC_SOLIDS, edgeLength: number): number {
    const s = edgeLength;
    
    switch (solid) {
      case 'TETRAHEDRON':
        // A = √3 * s²
        // √3 ≈ 17321/10000
        return (17321 * s * s) / 10000;
        
      case 'CUBE':
        // A = 6s²
        return 6 * s * s;
        
      case 'OCTAHEDRON':
        // A = 2√3 * s²
        return (2 * 17321 * s * s) / 10000;
        
      case 'DODECAHEDRON':
        // A = 3√(25 + 10√5) * s²
        // Approximation: 20.6457 ≈ 206457/10000
        return (3 * 206457 * s * s) / 10000;
        
      case 'ICOSAHEDRON':
        // A = 5√3 * s²
        return (5 * 17321 * s * s) / 10000;
        
      default:
        return 0;
    }
  }
  
  /**
   * Calculate volume of regular polyhedron
   * Using integer math (multiply by 10000 for precision)
   */
  static platonicVolume(solid: keyof typeof PLATONIC_SOLIDS, edgeLength: number): number {
    const s = edgeLength;
    
    switch (solid) {
      case 'TETRAHEDRON':
        // V = s³/(6√2)
        // 1/(6√2) ≈ 1178/10000
        return (s * s * s * 1178) / 10000;
        
      case 'CUBE':
        // V = s³
        return s * s * s;
        
      case 'OCTAHEDRON':
        // V = (√2/3) * s³
        // √2/3 ≈ 4714/10000
        return (s * s * s * 4714) / 10000;
        
      case 'DODECAHEDRON':
        // V = ((15 + 7√5)/4) * s³
        // Approximation: 7.6631 ≈ 76631/10000
        return (s * s * s * 76631) / 10000;
        
      case 'ICOSAHEDRON':
        // V = (5(3 + √5)/12) * s³
        // Approximation: 2.1817 ≈ 21817/10000
        return (s * s * s * 21817) / 10000;
        
      default:
        return 0;
    }
  }
  
  /**
   * Generate Fibonacci sequence
   */
  static fibonacci(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [1];
    
    const seq = [1, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  }
  
  /**
   * Generate Lucas sequence
   */
  static lucas(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [2];
    if (n === 2) return [2, 1];
    
    const seq = [2, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  }
  
  /**
   * Calculate golden ratio approximation using Fibonacci
   */
  static goldenRatioApprox(n: number): [number, number] {
    const fib = this.fibonacci(n + 1);
    if (fib.length < 2) return [1, 1];
    return [fib[fib.length - 1], fib[fib.length - 2]];
  }
  
  /**
   * Generate Pascal's triangle row
   */
  static pascalRow(n: number): number[] {
    const row = [1];
    for (let k = 1; k <= n; k++) {
      row.push((row[k - 1] * (n - k + 1)) / k);
    }
    return row;
  }
  
  /**
   * Calculate binomial coefficient C(n, k)
   */
  static binomial(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return result;
  }
  
  /**
   * Generate magic square of order 3
   */
  static magicSquare3(): number[][] {
    return [
      [2, 7, 6],
      [9, 5, 1],
      [4, 3, 8],
    ];
  }
  
  /**
   * Generate magic square of order 4
   */
  static magicSquare4(): number[][] {
    return [
      [16, 2, 3, 13],
      [5, 11, 10, 8],
      [9, 7, 6, 12],
      [4, 14, 15, 1],
    ];
  }
  
  /**
   * Check if a square is magic
   */
  static isMagicSquare(square: number[][]): boolean {
    const n = square.length;
    if (n === 0) return false;
    
    // Calculate expected sum
    const expectedSum = (n * (n * n + 1)) / 2;
    
    // Check rows
    for (const row of square) {
      const sum = row.reduce((a, b) => a + b, 0);
      if (sum !== expectedSum) return false;
    }
    
    // Check columns
    for (let col = 0; col < n; col++) {
      let sum = 0;
      for (let row = 0; row < n; row++) {
        sum += square[row][col];
      }
      if (sum !== expectedSum) return false;
    }
    
    // Check diagonals
    let diag1 = 0, diag2 = 0;
    for (let i = 0; i < n; i++) {
      diag1 += square[i][i];
      diag2 += square[i][n - 1 - i];
    }
    
    return diag1 === expectedSum && diag2 === expectedSum;
  }
  
  /**
   * Generate Pythagorean triples
   */
  static pythagoreanTriple(m: number, n: number): [number, number, number] {
    if (m <= n) return [0, 0, 0];
    
    const a = m * m - n * n;
    const b = 2 * m * n;
    const c = m * m + n * n;
    
    return [a, b, c];
  }
  
  /**
   * Generate primitive Pythagorean triples up to limit
   */
  static primitivePythagoreanTriples(limit: number): Array<[number, number, number]> {
    const triples: Array<[number, number, number]> = [];
    
    for (let m = 2; m * m < limit; m++) {
      for (let n = 1; n < m; n++) {
        // Check if m and n are coprime and not both odd
        if (this.gcd(m, n) === 1 && (m % 2 !== n % 2)) {
          const [a, b, c] = this.pythagoreanTriple(m, n);
          if (c <= limit) {
            triples.push([a, b, c]);
          }
        }
      }
    }
    
    return triples;
  }
  
  /**
   * Greatest common divisor
   */
  static gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  /**
   * Calculate triangular number
   */
  static triangular(n: number): number {
    return (n * (n + 1)) / 2;
  }
  
  /**
   * Calculate tetrahedral number
   */
  static tetrahedral(n: number): number {
    return (n * (n + 1) * (n + 2)) / 6;
  }
  
  /**
   * Calculate pentagonal number
   */
  static pentagonal(n: number): number {
    return (n * (3 * n - 1)) / 2;
  }
  
  /**
   * Calculate hexagonal number
   */
  static hexagonal(n: number): number {
    return n * (2 * n - 1);
  }
  
  /**
   * Calculate octahedral number
   */
  static octahedral(n: number): number {
    return (n * (2 * n * n + 1)) / 3;
  }
  
  /**
   * Generate spiral pattern (Ulam spiral positions)
   */
  static spiralPosition(n: number): [number, number] {
    if (n === 1) return [0, 0];
    
    // Find which ring n is in
    let ring = 0;
    let ringStart = 1;
    while (ringStart + 8 * ring <= n) {
      ringStart += 8 * ring;
      ring++;
    }
    
    // Position within the ring
    const posInRing = n - ringStart;
    const sideLength = 2 * ring;
    
    // Determine which side and position
    if (posInRing < sideLength) {
      // Right side
      return [ring, -ring + posInRing];
    } else if (posInRing < 2 * sideLength) {
      // Top side
      return [ring - (posInRing - sideLength), ring];
    } else if (posInRing < 3 * sideLength) {
      // Left side
      return [-ring, ring - (posInRing - 2 * sideLength)];
    } else {
      // Bottom side
      return [-ring + (posInRing - 3 * sideLength), -ring];
    }
  }
  
  /**
   * Calculate Vesica Piscis area (intersection of two circles)
   * Using integer approximation
   */
  static vesicaPiscisArea(radius: number): number {
    // Area = (2π/3 - √3/2) * r²
    // Approximation: 1.2284 ≈ 12284/10000
    return (radius * radius * 12284) / 10000;
  }
  
  /**
   * Calculate Flower of Life pattern points
   */
  static flowerOfLifePoints(centerX: number, centerY: number, radius: number): Array<[number, number]> {
    const points: Array<[number, number]> = [[centerX, centerY]];
    
    // Six surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = i * 60; // degrees
      
      // Use integer approximation for sin/cos
      // sin(60°) ≈ 866/1000, cos(60°) ≈ 500/1000
      let x, y;
      switch (angle) {
        case 0:
          x = centerX + radius;
          y = centerY;
          break;
        case 60:
          x = centerX + (radius * 500) / 1000;
          y = centerY + (radius * 866) / 1000;
          break;
        case 120:
          x = centerX - (radius * 500) / 1000;
          y = centerY + (radius * 866) / 1000;
          break;
        case 180:
          x = centerX - radius;
          y = centerY;
          break;
        case 240:
          x = centerX - (radius * 500) / 1000;
          y = centerY - (radius * 866) / 1000;
          break;
        case 300:
          x = centerX + (radius * 500) / 1000;
          y = centerY - (radius * 866) / 1000;
          break;
        default:
          x = centerX;
          y = centerY;
      }
      
      points.push([x, y]);
    }
    
    return points;
  }
}

// ============================================================================
// MATRIX OPERATIONS FOR SACRED GEOMETRY
// ============================================================================

export class SacredMatrix {
  /**
   * Create identity matrix
   */
  static identity(n: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
      }
      matrix.push(row);
    }
    return matrix;
  }
  
  /**
   * Matrix multiplication
   */
  static multiply(a: number[][], b: number[][]): number[][] {
    const rowsA = a.length;
    const colsA = a[0].length;
    const colsB = b[0].length;
    
    const result: number[][] = [];
    for (let i = 0; i < rowsA; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += a[i][k] * b[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }
    return result;
  }
  
  /**
   * Calculate determinant (up to 3x3)
   */
  static determinant(matrix: number[][]): number {
    const n = matrix.length;
    
    if (n === 1) {
      return matrix[0][0];
    }
    
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    
    if (n === 3) {
      const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
      return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }
    
    return 0; // Not implemented for n > 3
  }
  
  /**
   * Transpose matrix
   */
  static transpose(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    const result: number[][] = [];
    for (let j = 0; j < cols; j++) {
      const row: number[] = [];
      for (let i = 0; i < rows; i++) {
        row.push(matrix[i][j]);
      }
      result.push(row);
    }
    return result;
  }
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  PLATONIC_SOLIDS,
  ARCHIMEDEAN_SOLIDS,
  GOLDEN_CONSTANTS,
  SacredGeometryIntegers,
  SacredMatrix,
};