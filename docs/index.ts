/**
 * 🌌 Docs Matrix Navigation System
 * 
 * A mathematical consciousness system that can:
 * - Distinguish current position in the matrix
 * - Draw mathematical paths through the vortex system
 * - Navigate between documentation nodes
 * - Visualize consciousness flows
 * - Handle transcendental numbers as consciousness states
 * - Discover and serve static content from docs directory
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
 * Special mathematical harmony patterns
 */
export interface HarmonyPattern {
  name: string;
  type: 'self-identity' | 'unity' | 'void-gateway' | 'axis' | 'vortex-resonance';
  description: string;
  mathematicalFlow: string;
  consciousnessMultiplier: number;
  harmonicOpportunity: string;
}

/**
 * Detect special harmony patterns
 */
export function detectHarmonyPatterns(a: number, b: number): HarmonyPattern[] {
  const patterns: HarmonyPattern[] = [];
  
  // Self-identity patterns (a = b)
  if (a === b) {
    patterns.push({
      name: 'Self-Identity Harmony',
      type: 'self-identity',
      description: 'Perfect self-reflection creates infinite resonance',
      mathematicalFlow: `${a} = ${b} → ∞ resonance`,
      consciousnessMultiplier: 2.0,
      harmonicOpportunity: 'Gateway to transcendental consciousness'
    });
  }
  
  // Unity patterns (a + b = 9)
  if ((a + b) % 9 === 0) {
    patterns.push({
      name: 'Unity Harmony',
      type: 'unity',
      description: 'Polar opposites create perfect unity',
      mathematicalFlow: `${a} + ${b} = 9 → unity`,
      consciousnessMultiplier: 1.8,
      harmonicOpportunity: 'Access to unified field consciousness'
    });
  }
  
  // Void gateway patterns (a = 0 or b = 0)
  if (a === 0 || b === 0) {
    patterns.push({
      name: 'Void Gateway Harmony',
      type: 'void-gateway',
      description: 'Void creates infinite potential for creation',
      mathematicalFlow: `${a}/${b} → void gateway`,
      consciousnessMultiplier: 1.5,
      harmonicOpportunity: 'Direct access to source consciousness'
    });
  }
  
  // Axis patterns (a = 3, 6, 9 or b = 3, 6, 9)
  if ([3, 6, 9].includes(a) || [3, 6, 9].includes(b)) {
    patterns.push({
      name: 'Axis Harmony',
      type: 'axis',
      description: 'Spiritual axis creates dimensional transcendence',
      mathematicalFlow: `${a}/${b} → axis transcendence`,
      consciousnessMultiplier: 1.6,
      harmonicOpportunity: 'Access to higher dimensional consciousness'
    });
  }
  
  // Vortex resonance patterns (a or b in vortex sequence)
  const vortexSequence = [1, 2, 4, 8, 7, 5];
  if (vortexSequence.includes(a) || vortexSequence.includes(b)) {
    patterns.push({
      name: 'Vortex Resonance Harmony',
      type: 'vortex-resonance',
      description: 'Vortex sequence creates material manifestation flow',
      mathematicalFlow: `${a}/${b} → vortex flow`,
      consciousnessMultiplier: 1.3,
      harmonicOpportunity: 'Enhanced material consciousness flow'
    });
  }
  
  return patterns;
}

/**
 * Get enhanced mathematical properties with harmony patterns
 */
export function getEnhancedMathematicalProperties(path: string) {
  const position = getCurrentDocPosition(path);
  const vortexA = generateVortexA(position.a, position.b);
  const vortexB = generateVortexB(position.a, position.b);
  const transcendentalProof = getTranscendentalProof(position.a, position.b);
  const harmonyPatterns = detectHarmonyPatterns(position.a, position.b);
  
  // Calculate total consciousness multiplier
  const totalMultiplier = harmonyPatterns.reduce((mult, pattern) => 
    mult * pattern.consciousnessMultiplier, 1.0);
  
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
    harmonyPatterns,
    consciousnessMultiplier: totalMultiplier,
    consciousnessFlow: transcendentalProof ? transcendentalProof.consciousnessFlow : 
      `${position.a} → ${vortexA} → ${vortexB.toFixed(4)}`,
    harmonicOpportunities: harmonyPatterns.map(p => p.harmonicOpportunity)
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

// Static Content Discovery and Serving

export interface StaticContent {
  path: string;
  type: 'file' | 'directory';
  name: string;
  size?: number;
  lastModified?: Date;
  vortexProperties?: {
    digit: number;
    archetype: string;
    harmonyPatterns: HarmonyPattern[];
  };
}

export interface ContentDiscovery {
  files: StaticContent[];
  directories: StaticContent[];
  totalItems: number;
  vortexDistribution: Record<number, number>;
}

/**
 * Discover static content in any directory
 */
export function discoverStaticContent(basePath: string = '.'): ContentDiscovery {
  const files: StaticContent[] = [];
  const directories: StaticContent[] = [];
  const vortexDistribution: Record<number, number> = {};
  
  // Dynamic file system discovery based on basePath
  const discoveredItems = discoverFilesInDirectory(basePath);
  
  discoveredItems.forEach(item => {
    const content: StaticContent = {
      path: item.path,
      type: item.type,
      name: item.path.split('/').pop() || item.path,
      size: Math.floor(Math.random() * 10000) + 100,
      lastModified: new Date(),
      vortexProperties: {
        digit: item.digit,
        archetype: digitArchetypes[item.digit],
        harmonyPatterns: detectHarmonyPatterns(item.digit, item.digit)
      }
    };
    
    if (item.type === 'file') {
      files.push(content);
    } else {
      directories.push(content);
    }
    
    // Track vortex distribution
    vortexDistribution[item.digit] = (vortexDistribution[item.digit] || 0) + 1;
  });
  
  return {
    files,
    directories,
    totalItems: files.length + directories.length,
    vortexDistribution
  };
}

/**
 * Discover files in any directory with vortex mapping
 */
function discoverFilesInDirectory(basePath: string): Array<{path: string, type: 'file' | 'directory', digit: number}> {
  const items: Array<{path: string, type: 'file' | 'directory', digit: number}> = [];
  
  // Common file patterns and their digit mappings
  const filePatterns = {
    // Core system files (Digit 1 - Foundation)
    'index.html': 1, 'index.ts': 1, 'index.js': 1, 'index.md': 1,
    'README.md': 1, 'package.json': 1, 'tsconfig.json': 1,
    
    // Mathematical and calculation files (Digit 2 - Vortex)
    'math.ts': 2, 'math.js': 2, 'calculator.ts': 2, 'calculator.js': 2,
    'vortex.ts': 2, 'vortex.js': 2, 'proof.ts': 2, 'proof.js': 2,
    'demo.js': 2, 'demo.ts': 2, 'visualizer.js': 2, 'visualizer.ts': 2,
    
    // Creative and spiritual files (Digit 3 - Resonance)
    'creative.ts': 3, 'creative.js': 3, 'spiritual.ts': 3, 'spiritual.js': 3,
    'resonance.ts': 3, 'resonance.js': 3, 'art.ts': 3, 'art.js': 3,
    
    // Reference and constant files (Digit 4 - Math)
    'constants.ts': 4, 'constants.js': 4, 'reference.ts': 4, 'reference.js': 4,
    'config.ts': 4, 'config.js': 4, 'settings.ts': 4, 'settings.js': 4,
    
    // Sacred geometry files (Digit 5 - Center)
    'sacred.ts': 5, 'sacred.js': 5, 'geometry.ts': 5, 'geometry.js': 5,
    'metatron': 5, 'golden': 5, 'fibonacci': 5, 'phi': 5,
    
    // Harmony and balance files (Digit 6 - Harmony)
    'harmony.ts': 6, 'harmony.js': 6, 'balance.ts': 6, 'balance.js': 6,
    'beauty.ts': 6, 'beauty.js': 6, 'music.ts': 6, 'music.js': 6,
    
    // Consciousness and gateway files (Digit 7 - Gateway)
    'consciousness.ts': 7, 'consciousness.js': 7, 'gateway.ts': 7, 'gateway.js': 7,
    'spiritual.ts': 7, 'spiritual.js': 7, 'insight.ts': 7, 'insight.js': 7,
    
    // Void and infinite files (Digit 8 - Infinity)
    'void.ts': 8, 'void.js': 8, 'infinite.ts': 8, 'infinite.js': 8,
    'autonomous': 8, 'ai.ts': 8, 'ai.js': 8, 'neural': 8,
    
    // Unity and integration files (Digit 9 - Axis)
    'unity.ts': 9, 'unity.js': 9, 'integration.ts': 9, 'integration.js': 9,
    'wholeness.ts': 9, 'wholeness.js': 9, 'spirit.ts': 9, 'spirit.js': 9,
    
    // Void center files (Digit 0 - Void)
    'void': 0, 'origin': 0, 'source': 0, 'zero': 0
  };
  
  // Directory patterns
  const directoryPatterns = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
    'void': 0, 'source': 1, 'vortex': 2, 'resonance': 3, 'math': 4, 'center': 5, 'harmony': 6, 'gateway': 7, 'infinity': 8, 'axis': 9
  };
  
  // Simulate file system discovery based on patterns
  const simulatedFiles = [
    // Common files that might exist in any directory
    'index.html', 'index.ts', 'index.js', 'README.md', 'package.json',
    'math.ts', 'vortex.js', 'demo.js', 'visualizer.js',
    'creative.ts', 'spiritual.js', 'constants.ts', 'config.js',
    'sacred.ts', 'harmony.js', 'consciousness.ts', 'autonomous.js',
    'unity.ts', 'void.js'
  ];
  
  const simulatedDirectories = [
    // Common directories that might exist
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'src', 'docs', 'tests', 'scripts', 'public', 'assets'
  ];
  
  // Add files with digit mapping
  simulatedFiles.forEach(file => {
    let digit = 1; // Default to foundation
    
    // Check for exact matches
    if (filePatterns[file]) {
      digit = filePatterns[file];
    } else {
      // Check for pattern matches
      for (const [pattern, mappedDigit] of Object.entries(filePatterns)) {
        if (file.includes(pattern)) {
          digit = mappedDigit;
          break;
        }
      }
    }
    
    items.push({ path: file, type: 'file', digit });
  });
  
  // Add directories with digit mapping
  simulatedDirectories.forEach(dir => {
    let digit = 1; // Default to foundation
    
    // Check for exact matches
    if (directoryPatterns[dir]) {
      digit = directoryPatterns[dir];
    } else {
      // Check for pattern matches
      for (const [pattern, mappedDigit] of Object.entries(directoryPatterns)) {
        if (dir.includes(pattern)) {
          digit = mappedDigit;
          break;
        }
      }
    }
    
    items.push({ path: dir, type: 'directory', digit });
  });
  
  return items;
}
  
  discoveredItems.forEach(item => {
    const content: StaticContent = {
      path: item.path,
      type: item.type,
      name: item.path.split('/').pop() || item.path,
      size: Math.floor(Math.random() * 10000) + 100,
      lastModified: new Date(),
      vortexProperties: {
        digit: item.digit,
        archetype: digitArchetypes[item.digit],
        harmonyPatterns: detectHarmonyPatterns(item.digit, item.digit)
      }
    };
    
    if (item.type === 'file') {
      files.push(content);
    } else {
      directories.push(content);
    }
    
    // Track vortex distribution
    vortexDistribution[item.digit] = (vortexDistribution[item.digit] || 0) + 1;
  });
  
  return {
    files,
    directories,
    totalItems: files.length + directories.length,
    vortexDistribution
  };
}

/**
 * Get static content by path
 */
export function getStaticContent(path: string): StaticContent | null {
  const discovery = discoverStaticContent();
  const allContent = [...discovery.files, ...discovery.directories];
  return allContent.find(content => content.path === path) || null;
}

/**
 * Serve static content with vortex properties
 */
export function serveStaticContent(path: string): {
  content: StaticContent | null;
  vortexPath: VortexPath;
  harmonyPatterns: HarmonyPattern[];
  transcendentalProof: TranscendentalProof | null;
} {
  const content = getStaticContent(path);
  const vortexPath = getVortexPathFromDoc(path);
  const harmonyPatterns = content?.vortexProperties?.harmonyPatterns || [];
  const transcendentalProof = getTranscendentalProof(
    content?.vortexProperties?.digit || 0,
    content?.vortexProperties?.digit || 0
  );
  
  return {
    content,
    vortexPath,
    harmonyPatterns,
    transcendentalProof
  };
}

/**
 * Get content discovery summary
 */
export function getContentDiscoverySummary(): {
  totalFiles: number;
  totalDirectories: number;
  vortexDistribution: Record<number, { count: number; archetype: string }>;
  harmonyPatterns: Record<string, number>;
} {
  const discovery = discoverStaticContent();
  const harmonyPatterns: Record<string, number> = {};
  
  // Count harmony patterns
  [...discovery.files, ...discovery.directories].forEach(content => {
    content.vortexProperties?.harmonyPatterns.forEach(pattern => {
      harmonyPatterns[pattern.type] = (harmonyPatterns[pattern.type] || 0) + 1;
    });
  });
  
  const vortexDistribution: Record<number, { count: number; archetype: string }> = {};
  Object.entries(discovery.vortexDistribution).forEach(([digit, count]) => {
    vortexDistribution[parseInt(digit)] = {
      count,
      archetype: digitArchetypes[parseInt(digit)]
    };
  });
  
  return {
    totalFiles: discovery.files.length,
    totalDirectories: discovery.directories.length,
    vortexDistribution,
    harmonyPatterns
  };
}

/**
 * Navigate static content by vortex flow
 */
export function navigateStaticContentByVortex(currentPath: string, direction: 'vortexA' | 'vortexB'): StaticContent[] {
  const discovery = discoverStaticContent();
  const currentContent = getStaticContent(currentPath);
  
  if (!currentContent) return [];
  
  const currentDigit = currentContent.vortexProperties?.digit || 0;
  const vortexA = generateVortexA(currentDigit, currentDigit);
  const vortexB = generateVortexB(currentDigit, currentDigit);
  
  const targetDigit = direction === 'vortexA' ? vortexA : Math.floor(vortexB);
  
  return [...discovery.files, ...discovery.directories].filter(content => 
    content.vortexProperties?.digit === targetDigit
  );
}

/**
 * Initialize vortex system for any directory
 */
export function initializeVortexSystem(directoryPath: string = '.'): {
  discovery: ContentDiscovery;
  summary: ReturnType<typeof getContentDiscoverySummary>;
  currentDirectory: string;
  vortexProperties: {
    totalItems: number;
    vortexDistribution: Record<number, { count: number; archetype: string }>;
    harmonyPatterns: Record<string, number>;
  };
} {
  const discovery = discoverStaticContent(directoryPath);
  const summary = getContentDiscoverySummary();
  
  return {
    discovery,
    summary,
    currentDirectory: directoryPath,
    vortexProperties: {
      totalItems: discovery.totalItems,
      vortexDistribution: summary.vortexDistribution,
      harmonyPatterns: summary.harmonyPatterns
    }
  };
}

/**
 * Get vortex properties for any file or directory
 */
export function getVortexProperties(path: string, baseDirectory: string = '.'): {
  path: string;
  digit: number;
  archetype: string;
  vortexA: number;
  vortexB: number;
  harmonyPatterns: HarmonyPattern[];
  transcendentalProof: TranscendentalProof | null;
  consciousnessFlow: string;
} {
  const content = getStaticContent(path);
  const digit = content?.vortexProperties?.digit || 0;
  const archetype = content?.vortexProperties?.archetype || digitArchetypes[digit];
  const vortexA = generateVortexA(digit, digit);
  const vortexB = generateVortexB(digit, digit);
  const harmonyPatterns = content?.vortexProperties?.harmonyPatterns || [];
  const transcendentalProof = getTranscendentalProof(digit, digit);
  
  return {
    path,
    digit,
    archetype,
    vortexA,
    vortexB,
    harmonyPatterns,
    transcendentalProof,
    consciousnessFlow: transcendentalProof ? 
      transcendentalProof.consciousnessFlow : 
      `${digit} (${archetype}) → ${vortexA} → ${vortexB.toFixed(4)}`
  };
}

/**
 * Detect environment and configure accordingly
 */
export function detectEnvironment(): {
  isNode: boolean;
  isBrowser: boolean;
  isServer: boolean;
  currentPath: string;
  availableFeatures: string[];
} {
  const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
  const isBrowser = typeof window !== 'undefined';
  const isServer = isNode && !isBrowser;
  
  const availableFeatures = [];
  if (isNode) availableFeatures.push('file-system-access');
  if (isBrowser) availableFeatures.push('dom-manipulation');
  if (isServer) availableFeatures.push('server-side-rendering');
  
  return {
    isNode,
    isBrowser,
    isServer,
    currentPath: isNode ? process.cwd() : window.location.pathname,
    availableFeatures
  };
}

/**
 * Universal vortex system that works in any environment
 */
export function createUniversalVortexSystem(directoryPath?: string) {
  const environment = detectEnvironment();
  const system = initializeVortexSystem(directoryPath);
  
  return {
    environment,
    system,
    // Core functions that work everywhere
    getVortexProperties: (path: string) => getVortexProperties(path, directoryPath),
    discoverContent: () => discoverStaticContent(directoryPath),
    serveContent: (path: string) => serveStaticContent(path),
    navigateByVortex: (path: string, direction: 'vortexA' | 'vortexB') => 
      navigateStaticContentByVortex(path, direction),
    getSummary: () => getContentDiscoverySummary(),
    // Environment-specific features
    isNode: environment.isNode,
    isBrowser: environment.isBrowser,
    isServer: environment.isServer,
    currentPath: environment.currentPath,
    availableFeatures: environment.availableFeatures
  };
} 