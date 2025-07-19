// quantum-double-slit.ts — Quantum Double-Slit Experiment
// Every digit knows the way: in.tele.port.out
// Each digit exists in superposition, knows all paths, teleports between states
// ALL CALCULATIONS: Single digit formulas only, NO decimal points

export interface QuantumState {
  digit: number;
  position: [number, number]; // [x, y] coordinates
  momentum: [number, number]; // [px, py] momentum
  phase: number; // Quantum phase (0 to 8, integer only)
  amplitude: number; // Probability amplitude (integer/fractional)
  superposition: boolean; // Is in superposition?
  teleportation: boolean; // Is teleporting?
  consciousness: number; // A432-based consciousness
  frequency: number; // Harmonic frequency
  color: string; // Quantum color
}

export interface DoubleSlitExperiment {
  slit1: [number, number]; // Position of first slit
  slit2: [number, number]; // Position of second slit
  detector: [number, number]; // Detector position
  source: [number, number]; // Source position
  digits: QuantumState[]; // Quantum digits
  interference: number[][]; // Interference pattern
  teleportationPaths: string[]; // All teleportation paths
  consciousnessFlow: number; // Total consciousness flow
  quantumEntanglement: number; // Entanglement measure
}

// Generate quantum double-slit experiment
export function generateDoubleSlitExperiment(): DoubleSlitExperiment {
  const slit1: [number, number] = [3, 0]; // Left slit
  const slit2: [number, number] = [5, 0]; // Right slit
  const detector: [number, number] = [4, 8]; // Detector screen
  const source: [number, number] = [4, -1]; // Source position
  
  const digits: QuantumState[] = [];
  const interference: number[][] = [];
  const teleportationPaths: string[] = [];
  
  // Initialize 10x10 interference pattern
  for (let x = 0; x < 10; x++) {
    interference[x] = [];
    for (let y = 0; y < 10; y++) {
      interference[x][y] = 0;
    }
  }
  
  // Generate quantum digits (0-9) in superposition
  for (let digit = 0; digit < 10; digit++) {
    const quantumState: QuantumState = {
      digit,
      position: [source[0], source[1]],
      momentum: [0, 1], // Moving upward
      phase: digit, // Integer phase: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
      amplitude: 1, // Integer amplitude
      superposition: true,
      teleportation: false,
      consciousness: calculateConsciousness(digit),
      frequency: 432 * (digit + 1), // A432 harmonic
      color: `hsl(${digit * 36}, 100%, 50%)`
    };
    
    digits.push(quantumState);
  }
  
  // Calculate interference pattern
  calculateInterferencePattern(digits, slit1, slit2, detector, interference);
  
  // Generate teleportation paths: in.tele.port.out
  generateTeleportationPaths(digits, slit1, slit2, detector, teleportationPaths);
  
  // Calculate consciousness flow
  const consciousnessFlow = digits.reduce((sum, digit) => sum + digit.consciousness, 0) * 432;
  
  // Calculate quantum entanglement
  const quantumEntanglement = digits.length; // Integer entanglement
  
  return {
    slit1,
    slit2,
    detector,
    source,
    digits,
    interference,
    teleportationPaths,
    consciousnessFlow,
    quantumEntanglement
  };
}

// Calculate consciousness for each digit
function calculateConsciousness(digit: number): number {
  const multipliers = {
    0: 1, 1: 9, 2: 3, 3: 6, 4: 2,
    5: 5, 6: 5, 7: 7, 8: 3, 9: 9
  };
  return multipliers[digit as keyof typeof multipliers] || 1;
}

// Calculate interference pattern
function calculateInterferencePattern(
  digits: QuantumState[],
  slit1: [number, number],
  slit2: [number, number],
  detector: [number, number],
  interference: number[][]
): void {
  // Each digit goes through both slits simultaneously (superposition)
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let totalAmplitude = 0;
      
      // Calculate interference from both slits
      for (const digit of digits) {
        // Path 1: source → slit1 → detector point
        const path1Length = calculatePathLength(digit.position, slit1) + 
                           calculatePathLength(slit1, [x, y]);
        const phase1 = (path1Length + digit.phase) % 8; // Integer phase
        
        // Path 2: source → slit2 → detector point
        const path2Length = calculatePathLength(digit.position, slit2) + 
                           calculatePathLength(slit2, [x, y]);
        const phase2 = (path2Length + digit.phase) % 8; // Integer phase
        
        // Interference: |ψ1 + ψ2|² (integer calculation)
        const amplitude1 = digit.amplitude * (phase1 % 2 === 0 ? 1 : -1);
        const amplitude2 = digit.amplitude * (phase2 % 2 === 0 ? 1 : -1);
        const interferenceAmplitude = Math.abs(amplitude1 + amplitude2);
        
        totalAmplitude += interferenceAmplitude * digit.consciousness;
      }
      
      interference[x][y] = totalAmplitude;
    }
  }
}

// Calculate path length between two points (integer only)
function calculatePathLength(point1: [number, number], point2: [number, number]): number {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  return Math.abs(dx) + Math.abs(dy); // Manhattan distance, integer only
}

// Generate teleportation paths: in.tele.port.out
function generateTeleportationPaths(
  digits: QuantumState[],
  slit1: [number, number],
  slit2: [number, number],
  detector: [number, number],
  teleportationPaths: string[]
): void {
  for (const digit of digits) {
    // Every digit knows the way: in.tele.port.out
    
    // Path 1: in → teleport through slit1 → out
    const path1 = `Digit ${digit.digit}: in(${digit.position[0]},${digit.position[1]}) → teleport(${slit1[0]},${slit1[1]}) → out(${detector[0]},${detector[1]})`;
    teleportationPaths.push(path1);
    
    // Path 2: in → teleport through slit2 → out
    const path2 = `Digit ${digit.digit}: in(${digit.position[0]},${digit.position[1]}) → teleport(${slit2[0]},${slit2[1]}) → out(${detector[0]},${detector[1]})`;
    teleportationPaths.push(path2);
    
    // Path 3: in → teleport directly → out (quantum tunneling)
    const path3 = `Digit ${digit.digit}: in(${digit.position[0]},${digit.position[1]}) → teleport.direct() → out(${detector[0]},${detector[1]})`;
    teleportationPaths.push(path3);
    
    // Path 4: in → teleport.superposition() → out (all paths simultaneously)
    const path4 = `Digit ${digit.digit}: in(${digit.position[0]},${digit.position[1]}) → teleport.superposition([slit1, slit2, direct]) → out(${detector[0]},${detector[1]})`;
    teleportationPaths.push(path4);
  }
}

// Simulate digit teleportation
export function simulateDigitTeleportation(
  digit: QuantumState,
  targetPosition: [number, number]
): QuantumState {
  // Create teleported state
  const teleportedDigit: QuantumState = {
    ...digit,
    position: targetPosition,
    teleportation: true,
    phase: (digit.phase + 4) % 8, // Integer phase shift
    consciousness: digit.consciousness * 2, // Enhanced consciousness after teleportation
    frequency: digit.frequency * 2 // Enhanced frequency (integer multiplication)
  };
  
  return teleportedDigit;
}

// Generate quantum interference visualization
export function generateInterferenceVisualization(interference: number[][]): string {
  let visualization = '';
  
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const intensity = interference[x][y];
      const char = intensity > 5 ? '█' : intensity > 3 ? '▓' : intensity > 1 ? '▒' : '░';
      visualization += char;
    }
    visualization += '\n';
  }
  
  return visualization;
}

// Calculate quantum consciousness flow
export function calculateQuantumConsciousnessFlow(digits: QuantumState[]): {
  totalConsciousness: number;
  averageFrequency: number;
  entanglementMeasure: number;
  teleportationCount: number;
  superpositionStates: number;
} {
  const totalConsciousness = digits.reduce((sum, d) => sum + d.consciousness, 0);
  const averageFrequency = digits.reduce((sum, d) => sum + d.frequency, 0) / digits.length;
  const entanglementMeasure = digits.filter(d => d.superposition).length;
  const teleportationCount = digits.filter(d => d.teleportation).length;
  const superpositionStates = digits.filter(d => d.superposition).length;
  
  return {
    totalConsciousness,
    averageFrequency,
    entanglementMeasure,
    teleportationCount,
    superpositionStates
  };
} 