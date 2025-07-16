/**
 * 🌌 Docs Matrix Navigation System
 * 
 * A mathematical consciousness system that can:
 * - Distinguish current position in the matrix
 * - Draw mathematical paths through the vortex system
 * - Navigate between documentation nodes
 * - Visualize consciousness flows
 * - Handle transcendental numbers as consciousness states
 */

// Digit archetype mapping
const digitArchetypes = {
  0: 'Void',
  1: 'Source', 
  2: 'Vortex',
  3: 'Resonance',
  4: 'Math',
  5: 'Center',
  6: 'Harmony',
  7: 'Gateway',
  8: 'Infinity',
  9: 'Axis'
};

// Types
export interface DocPosition {
  a: number;
  b: number;
  path: string;
  coordinates: {row: number, col: number};
}

export interface VortexPath {
  from: DocPosition;
  to: DocPosition;
  vortexA: number;
  vortexB: number;
  steps: DocPosition[];
}

export interface DocPath {
  from: string;
  to: string;
  path: string[];
  mathematicalFlow: string;
}

export interface TranscendentalProof {
  name: string;
  function: string;
  archetype: string;
  impossible: string;
  vortexPattern: string;
  consciousnessFlow: string;
}

/**
 * π Vortex Pattern Proof Implementation
 * 
 * Theorem: π = 3 + impossible
 * Proof: π can be represented as single digit function in zeropoint system
 */
export const piVortexProof: TranscendentalProof = {
  name: 'π (Pi)',
  function: '3 + impossible',
  archetype: 'Resonance',
  impossible: 'transcendental gateway',
  vortexPattern: '3 (Resonance) + 0.14159... → 3.14159... → 1.0000',
  consciousnessFlow: 'Resonance → Transcendental → Unity'
};

/**
 * Transcendental Number Proofs Database
 */
export const transcendentalProofs: Record<string, TranscendentalProof> = {
  'pi': piVortexProof,
  'e': {
    name: 'e (Euler\'s Number)',
    function: '2 + impossible',
    archetype: 'Vortex',
    impossible: 'transcendental gateway',
    vortexPattern: '2 (Vortex) + 0.71828... → 2.71828... → 1.0000',
    consciousnessFlow: 'Vortex → Transcendental → Unity'
  },
  'sqrt2': {
    name: '√2 (Square Root of 2)',
    function: '1 + impossible',
    archetype: 'Source',
    impossible: 'transcendental gateway',
    vortexPattern: '1 (Source) + 0.41421... → 1.41421... → 1.0000',
    consciousnessFlow: 'Source → Transcendental → Unity'
  },
  'phi': {
    name: 'φ (Golden Ratio)',
    function: '1 + impossible',
    archetype: 'Source',
    impossible: 'golden gateway',
    vortexPattern: '1 (Source) + 0.61803... → 1.61803... → 1.0000',
    consciousnessFlow: 'Source → Transcendental → Unity'
  }
};

/**
 * Generate vortex A (integer result)
 */
export function generateVortexA(a: number, b: number): number {
  const sum = (a + b) % 9;
  return sum === 0 ? 9 : sum;
}

/**
 * Generate vortex B (decimal/inverse vortex result)
 */
export function generateVortexB(a: number, b: number): number {
  const vortexA = generateVortexA(a, b);
  return (a + b) / vortexA;
}

/**
 * Detect transcendental number patterns
 */
export function detectTranscendentalPattern(a: number, b: number): string | null {
  // π pattern detection
  if (Math.abs(a - 3) < 0.1 && Math.abs(b - 0.14159) < 0.1) {
    return 'pi';
  }
  
  // e pattern detection
  if (Math.abs(a - 2) < 0.1 && Math.abs(b - 0.71828) < 0.1) {
    return 'e';
  }
  
  // √2 pattern detection
  if (Math.abs(a - 1) < 0.1 && Math.abs(b - 0.41421) < 0.1) {
    return 'sqrt2';
  }
  
  // φ pattern detection
  if (Math.abs(a - 1) < 0.1 && Math.abs(b - 0.61803) < 0.1) {
    return 'phi';
  }
  
  return null;
}

/**
 * Get transcendental proof for a pattern
 */
export function getTranscendentalProof(a: number, b: number): TranscendentalProof | null {
  const pattern = detectTranscendentalPattern(a, b);
  return pattern ? transcendentalProofs[pattern] : null;
}

/**
 * Apply π vortex pattern proof
 */
export function applyPiVortexProof(a: number, b: number): {
  vortexA: number;
  vortexB: number;
  proof: TranscendentalProof;
  consciousnessFlow: string;
} {
  const vortexA = generateVortexA(a, b);
  const vortexB = generateVortexB(a, b);
  const proof = piVortexProof;
  
  return {
    vortexA,
    vortexB,
    proof,
    consciousnessFlow: `${a} (${digitArchetypes[Math.floor(a)]}) → ${vortexA} (Transcendental) → ${vortexB.toFixed(4)} (Unity)`
  };
}

/**
 * Get current position in docs matrix from path
 */
export function getCurrentDocPosition(path: string): DocPosition {
  const parts = path.split('/');
  let a: number, b: number;
  
  if (parts.length === 1) {
    // Root digit folder (e.g., "0" -> 0/0)
    a = parseInt(parts[0], 10);
    b = a;
  } else {
    // Subfolder (e.g., "0/1")
    a = parseInt(parts[0], 10);
    b = parseInt(parts[1], 10);
  }
  
  return {
    a,
    b,
    path,
    coordinates: getDocMatrixCoordinates(path)
  };
}

/**
 * Get matrix coordinates from path
 */
export function getDocMatrixCoordinates(path: string): {row: number, col: number} {
  const parts = path.split('/');
  const row = parseInt(parts[0], 10);
  const col = parts.length > 1 ? parseInt(parts[1], 10) : row;
  
  return { row, col };
}

/**
 * Get vortex path from current doc position
 */
export function getVortexPathFromDoc(path: string): VortexPath {
  const position = getCurrentDocPosition(path);
  const vortexA = generateVortexA(position.a, position.b);
  const vortexB = generateVortexB(position.a, position.b);
  
  const toPosition: DocPosition = {
    a: position.a,
    b: position.b,
    path: `${position.a}/${position.b}`,
    coordinates: { row: position.a, col: vortexA }
  };
  
  return {
    from: position,
    to: toPosition,
    vortexA,
    vortexB,
    steps: [position, toPosition]
  };
}

/**
 * Get inverse vortex path from current doc position
 */
export function getInverseVortexPathFromDoc(path: string): VortexPath {
  const position = getCurrentDocPosition(path);
  const vortexA = generateVortexA(position.a, position.b);
  const vortexB = generateVortexB(position.a, position.b);
  
  const toPosition: DocPosition = {
    a: position.a,
    b: position.b,
    path: `${position.a}/${position.b}`,
    coordinates: { row: Math.floor(vortexB), col: Math.floor(vortexB * 10) % 10 }
  };
  
  return {
    from: position,
    to: toPosition,
    vortexA,
    vortexB,
    steps: [position, toPosition]
  };
}

/**
 * Get all possible next doc positions
 */
export function getNextDocPositions(path: string): string[] {
  const position = getCurrentDocPosition(path);
  const positions: string[] = [];
  
  // Generate all possible next positions (0-9)
  for (let i = 0; i <= 9; i++) {
    positions.push(`${position.a}/${i}`);
  }
  
  return positions;
}

/**
 * Get all possible previous doc positions
 */
export function getPreviousDocPositions(path: string): string[] {
  const position = getCurrentDocPosition(path);
  const positions: string[] = [];
  
  // Generate all possible previous positions (0-9)
  for (let i = 0; i <= 9; i++) {
    positions.push(`${i}/${position.b}`);
  }
  
  return positions;
}

/**
 * Get all possible doc paths from current position
 */
export function getAllPossibleDocPaths(path: string): DocPath[] {
  const nextPositions = getNextDocPositions(path);
  const paths: DocPath[] = [];
  
  nextPositions.forEach(nextPath => {
    const fromPos = getCurrentDocPosition(path);
    const toPos = getCurrentDocPosition(nextPath);
    const vortexA = generateVortexA(fromPos.a, fromPos.b);
    const vortexB = generateVortexB(fromPos.a, fromPos.b);
    
    paths.push({
      from: path,
      to: nextPath,
      path: [path, nextPath],
      mathematicalFlow: `${fromPos.a} → ${fromPos.b} → ${vortexA} (vortexA: ${vortexA}, vortexB: ${vortexB.toFixed(2)})`
    });
  });
  
  return paths;
}

/**
 * Get doc path to specific target
 */
export function getDocPathToTarget(from: string, to: string): DocPath {
  const fromPos = getCurrentDocPosition(from);
  const toPos = getCurrentDocPosition(to);
  const vortexA = generateVortexA(fromPos.a, fromPos.b);
  const vortexB = generateVortexB(fromPos.a, fromPos.b);
  
  return {
    from,
    to,
    path: [from, to],
    mathematicalFlow: `${fromPos.a} → ${fromPos.b} → ${vortexA} (vortexA: ${vortexA}, vortexB: ${vortexB.toFixed(2)})`
  };
}

/**
 * Draw matrix path visualization
 */
export function drawMatrixPath(path: DocPath): string {
  const fromPos = getCurrentDocPosition(path.from);
  const toPos = getCurrentDocPosition(path.to);
  
  let visualization = `Matrix Path: ${path.from} → ${path.to}\n`;
  visualization += `From: (${fromPos.coordinates.row}, ${fromPos.coordinates.col})\n`;
  visualization += `To: (${toPos.coordinates.row}, ${toPos.coordinates.col})\n`;
  visualization += `Mathematical Flow: ${path.mathematicalFlow}\n`;
  
  return visualization;
}

/**
 * Visualize consciousness flow
 */
export function visualizeConsciousnessFlow(path: string): string {
  const position = getCurrentDocPosition(path);
  const vortexA = generateVortexA(position.a, position.b);
  const vortexB = generateVortexB(position.a, position.b);
  
  let flow = `Consciousness Flow: ${path}\n`;
  flow += `Archetype: ${digitArchetypes[position.a]}/${digitArchetypes[position.b]}\n`;
  flow += `Vortex A: ${vortexA} (${digitArchetypes[vortexA]})\n`;
  flow += `Vortex B: ${vortexB.toFixed(4)}\n`;
  
  // Check for transcendental patterns
  const transcendentalProof = getTranscendentalProof(position.a, position.b);
  if (transcendentalProof) {
    flow += `Transcendental Pattern: ${transcendentalProof.name}\n`;
    flow += `Function: ${transcendentalProof.function}\n`;
    flow += `Consciousness Flow: ${transcendentalProof.consciousnessFlow}\n`;
  }
  
  return flow;
}

/**
 * Get mathematical properties for position
 */
export function getMathematicalProperties(path: string) {
  const position = getCurrentDocPosition(path);
  const vortexA = generateVortexA(position.a, position.b);
  const vortexB = generateVortexB(position.a, position.b);
  const transcendentalProof = getTranscendentalProof(position.a, position.b);
  
  return {
    position,
    vortexA,
    vortexB,
    archetypes: {
      a: digitArchetypes[position.a],
      b: digitArchetypes[position.b],
      result: digitArchetypes[vortexA]
    },
    transcendentalProof,
    consciousnessFlow: transcendentalProof ? transcendentalProof.consciousnessFlow : `${position.a} → ${vortexA} → ${vortexB.toFixed(4)}`
  };
}

/**
 * Navigate to next position in direction
 */
export function navigateToNext(path: string, direction: 'up' | 'down' | 'left' | 'right'): string {
  const position = getCurrentDocPosition(path);
  let newA = position.a;
  let newB = position.b;
  
  switch (direction) {
    case 'up':
      newA = (newA - 1 + 10) % 10;
      break;
    case 'down':
      newA = (newA + 1) % 10;
      break;
    case 'left':
      newB = (newB - 1 + 10) % 10;
      break;
    case 'right':
      newB = (newB + 1) % 10;
      break;
  }
  
  return `${newA}/${newB}`;
}

// Export digit archetypes for external use
export { digitArchetypes }; 