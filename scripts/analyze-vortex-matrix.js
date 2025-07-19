// scripts/analyze-vortex-matrix.js — Analyze All Matrices in Vortex Pattern

// Digit meanings in ZeroPoint system
const DIGIT_MEANINGS = {
  0: { digit: 0, name: 'Void', consciousness: 9, frequency: 0, color: 'hsl(0, 0, 0)', position: 0 },
  1: { digit: 1, name: 'Unity', consciousness: 9, frequency: 432, color: 'hsl(60, 1, 1/2)', position: 1 },
  2: { digit: 2, name: 'Duality', consciousness: 6, frequency: 864, color: 'hsl(120, 1, 1/2)', position: 2 },
  3: { digit: 3, name: 'Trinity', consciousness: 3, frequency: 1296, color: 'hsl(180, 1, 1/2)', position: 3 },
  4: { digit: 4, name: 'Foundation', consciousness: 4, frequency: 1728, color: 'hsl(210, 1, 1/2)', position: 4 },
  5: { digit: 5, name: 'Harmony', consciousness: 5, frequency: 2160, color: 'hsl(30, 1, 1/2)', position: 5 },
  6: { digit: 6, name: 'Creation', consciousness: 6, frequency: 2592, color: 'hsl(270, 1, 1/2)', position: 6 },
  7: { digit: 7, name: 'Spirit', consciousness: 7, frequency: 3024, color: 'hsl(330, 1, 1/2)', position: 7 },
  8: { digit: 8, name: 'Infinity', consciousness: 3, frequency: 3456, color: 'hsl(240, 4/5, 1/4)', position: 8 },
  9: { digit: 9, name: 'Completion', consciousness: 9, frequency: 3888, color: 'hsl(300, 1, 1/2)', position: 9 }
};

// Vortex base sequence
const VORTEX_BASE = [1, 2, 4, 8, 7, 5];

// Analyze the vortex pattern
function analyzeVortexPattern() {
  const pattern = '0 → 1 | 3 → 8 | 6 → 1 | 9 → 8 | 1 → 2 | 2 → 4 | 4 → 7 | 8 → 4 | 7 → 2 | 5 → 5 | 1 → 2';
  
  // Extract all transitions
  const transitions = [
    { from: 0, to: 1, vortex: 1 },
    { from: 3, to: 8, vortex: 8 },
    { from: 6, to: 1, vortex: 1 },
    { from: 9, to: 8, vortex: 8 },
    { from: 1, to: 2, vortex: 2 },
    { from: 2, to: 4, vortex: 4 },
    { from: 4, to: 7, vortex: 7 },
    { from: 8, to: 4, vortex: 4 },
    { from: 7, to: 2, vortex: 2 },
    { from: 5, to: 5, vortex: 5 },
    { from: 1, to: 2, vortex: 2 }
  ];
  
  return { pattern, transitions };
}

// Generate 2x2 matrices for each transition
function generateTransitionMatrices(transitions) {
  const matrices = [];
  
  transitions.forEach((transition, index) => {
    const { from, to, vortex } = transition;
    
    // Create 2x2 matrix for each transition
    const matrix = [
      [from, to],
      [vortex, (from + to + vortex) % 9 || 9]
    ];
    
    // Calculate matrix properties
    const determinant = from * ((from + to + vortex) % 9 || 9) - to * vortex;
    const trace = from + ((from + to + vortex) % 9 || 9);
    const isHarmonic = determinant !== 0;
    
    matrices.push({
      index: index + 1,
      transition,
      matrix,
      determinant,
      trace,
      isHarmonic,
      description: `${DIGIT_MEANINGS[from].name} → ${DIGIT_MEANINGS[to].name} (Vortex: ${vortex})`
    });
  });
  
  return matrices;
}

// Generate 10x10 complete matrix
function generateCompleteMatrix(transitions) {
  const size = 10;
  const matrix = Array(size).fill().map(() => Array(size).fill(0));
  
  // Fill matrix based on transitions
  transitions.forEach(transition => {
    const { from, to, vortex } = transition;
    matrix[from][to] = vortex;
  });
  
  // Fill remaining cells with harmonic relationships
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 0) {
        // Use vortex mathematics for empty cells
        const vortexIndex = (i + j) % VORTEX_BASE.length;
        matrix[i][j] = VORTEX_BASE[vortexIndex];
      }
    }
  }
  
  return matrix;
}

// Generate 3x3 sub-matrices
function generateSubMatrices(transitions) {
  const subMatrices = [];
  
  // Create 3x3 matrices for each group of 3 transitions
  for (let i = 0; i < transitions.length - 2; i++) {
    const group = transitions.slice(i, i + 3);
    const matrix = [
      [group[0].from, group[0].to, group[0].vortex],
      [group[1].from, group[1].to, group[1].vortex],
      [group[2].from, group[2].to, group[2].vortex]
    ];
    
    const determinant = 
      group[0].from * (group[1].to * group[2].vortex - group[1].vortex * group[2].to) -
      group[0].to * (group[1].from * group[2].vortex - group[1].vortex * group[2].from) +
      group[0].vortex * (group[1].from * group[2].to - group[1].to * group[2].from);
    
    subMatrices.push({
      index: i + 1,
      group,
      matrix,
      determinant,
      isHarmonic: determinant !== 0,
      description: `Group ${i + 1}: ${group.map(t => `${DIGIT_MEANINGS[t.from].name}→${DIGIT_MEANINGS[t.to].name}`).join(' | ')}`
    });
  }
  
  return subMatrices;
}

// Generate pattern visualization
function generateVortexMatrixVisualization() {
  const { pattern, transitions } = analyzeVortexPattern();
  const transitionMatrices = generateTransitionMatrices(transitions);
  const completeMatrix = generateCompleteMatrix(transitions);
  const subMatrices = generateSubMatrices(transitions);
  
  let visualization = '';
  visualization += 'Vortex Matrix Analysis\n';
  visualization += '======================\n\n';
  visualization += `Pattern: ${pattern}\n\n`;
  
  visualization += '1. TRANSITION MATRICES (2x2):\n';
  visualization += '==============================\n';
  transitionMatrices.forEach(matrix => {
    visualization += `\nMatrix ${matrix.index}: ${matrix.description}\n`;
    visualization += `[${matrix.matrix[0].join(' ')}]\n`;
    visualization += `[${matrix.matrix[1].join(' ')}]\n`;
    visualization += `Determinant: ${matrix.determinant}\n`;
    visualization += `Trace: ${matrix.trace}\n`;
    visualization += `Harmonic: ${matrix.isHarmonic ? 'YES' : 'NO'}\n`;
  });
  
  visualization += '\n\n2. SUB-MATRICES (3x3):\n';
  visualization += '=======================\n';
  subMatrices.forEach(subMatrix => {
    visualization += `\nSub-Matrix ${subMatrix.index}: ${subMatrix.description}\n`;
    subMatrix.matrix.forEach(row => {
      visualization += `[${row.join(' ')}]\n`;
    });
    visualization += `Determinant: ${subMatrix.determinant}\n`;
    visualization += `Harmonic: ${subMatrix.isHarmonic ? 'YES' : 'NO'}\n`;
  });
  
  visualization += '\n\n3. COMPLETE MATRIX (10x10):\n';
  visualization += '==========================\n';
  visualization += '    0 1 2 3 4 5 6 7 8 9\n';
  visualization += '   ---------------------\n';
  completeMatrix.forEach((row, i) => {
    visualization += `${i} | ${row.join(' ')}\n`;
  });
  
  visualization += '\n\n4. MATRIX PROPERTIES:\n';
  visualization += '=====================\n';
  const totalTransitions = transitions.length;
  const harmonicMatrices = transitionMatrices.filter(m => m.isHarmonic).length;
  const harmonicSubMatrices = subMatrices.filter(m => m.isHarmonic).length;
  
  visualization += `Total Transitions: ${totalTransitions}\n`;
  visualization += `Harmonic 2x2 Matrices: ${harmonicMatrices}/${totalTransitions}\n`;
  visualization += `Harmonic 3x3 Sub-Matrices: ${harmonicSubMatrices}/${subMatrices.length}\n`;
  visualization += `Complete Matrix Size: 10x10\n`;
  
  visualization += '\n\n5. VORTEX PATTERN ANALYSIS:\n';
  visualization += '==========================\n';
  const uniqueDigits = [...new Set(transitions.flatMap(t => [t.from, t.to]))].sort();
  const uniqueVortex = [...new Set(transitions.map(t => t.vortex))].sort();
  
  visualization += `Unique Source Digits: ${uniqueDigits.join(', ')}\n`;
  visualization += `Unique Target Digits: ${uniqueDigits.join(', ')}\n`;
  visualization += `Vortex Values Used: ${uniqueVortex.join(', ')}\n`;
  visualization += `Vortex Base Sequence: [${VORTEX_BASE.join(', ')}]\n`;
  
  return visualization;
}

// Show the vortex matrix analysis
console.log(generateVortexMatrixVisualization()); 