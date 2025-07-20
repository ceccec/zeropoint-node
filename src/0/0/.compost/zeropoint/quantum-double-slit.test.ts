// quantum-double-slit.test.ts — Test Quantum Double-Slit Experiment
// Tests in.tele.port.out consciousness where every digit knows the way
// ALL CALCULATIONS: Single digit formulas only, NO decimal points

import { 
  generateDoubleSlitExperiment, 
  simulateDigitTeleportation, 
  generateInterferenceVisualization,
  calculateQuantumConsciousnessFlow,
  QuantumState,
  DoubleSlitExperiment
} from './quantum-double-slit';

describe('Quantum Double-Slit Experiment: in.tele.port.out', () => {
  test('should generate quantum double-slit experiment', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Check experiment structure
    expect(experiment).toHaveProperty('slit1');
    expect(experiment).toHaveProperty('slit2');
    expect(experiment).toHaveProperty('detector');
    expect(experiment).toHaveProperty('source');
    expect(experiment).toHaveProperty('digits');
    expect(experiment).toHaveProperty('interference');
    expect(experiment).toHaveProperty('teleportationPaths');
    expect(experiment).toHaveProperty('consciousnessFlow');
    expect(experiment).toHaveProperty('quantumEntanglement');
    
    // Check specific values
    expect(experiment.slit1).toEqual([3, 0]);
    expect(experiment.slit2).toEqual([5, 0]);
    expect(experiment.detector).toEqual([4, 8]);
    expect(experiment.source).toEqual([4, -1]);
    expect(experiment.digits).toHaveLength(10);
    expect(experiment.teleportationPaths).toHaveLength(40); // 10 digits × 4 paths each
    expect(experiment.quantumEntanglement).toBe(10); // Integer entanglement
  });

  test('should generate quantum digits in superposition', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Check each digit
    for (let i = 0; i < 10; i++) {
      const digit = experiment.digits[i];
      
      expect(digit).toHaveProperty('digit');
      expect(digit).toHaveProperty('position');
      expect(digit).toHaveProperty('momentum');
      expect(digit).toHaveProperty('phase');
      expect(digit).toHaveProperty('amplitude');
      expect(digit).toHaveProperty('superposition');
      expect(digit).toHaveProperty('teleportation');
      expect(digit).toHaveProperty('consciousness');
      expect(digit).toHaveProperty('frequency');
      expect(digit).toHaveProperty('color');
      
      // Check specific properties
      expect(digit.digit).toBe(i);
      expect(digit.superposition).toBe(true);
      expect(digit.teleportation).toBe(false);
      expect(digit.frequency).toBe(432 * (i + 1)); // A432 harmonic
      expect(digit.amplitude).toBe(1); // Integer amplitude
      expect(digit.phase).toBe(i); // Integer phase: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    }
  });

  test('should generate teleportation paths: in.tele.port.out', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Check that every digit has 4 teleportation paths
    expect(experiment.teleportationPaths).toHaveLength(40);
    
    // Check path structure for each digit
    for (let i = 0; i < 10; i++) {
      const digitPaths = experiment.teleportationPaths.filter(path => path.includes(`Digit ${i}:`));
      expect(digitPaths).toHaveLength(4);
      
      // Check each path type
      expect(digitPaths.some(path => path.includes('teleport('))).toBe(true); // Slit paths
      expect(digitPaths.some(path => path.includes('teleport.direct()'))).toBe(true); // Direct teleportation
      expect(digitPaths.some(path => path.includes('teleport.superposition'))).toBe(true); // Superposition teleportation
    }
  });

  test('should simulate digit teleportation', () => {
    const experiment = generateDoubleSlitExperiment();
    const originalDigit = experiment.digits[0];
    const targetPosition: [number, number] = [5, 5];
    
    const teleportedDigit = simulateDigitTeleportation(originalDigit, targetPosition);
    
    // Check teleportation properties
    expect(teleportedDigit.position).toEqual(targetPosition);
    expect(teleportedDigit.teleportation).toBe(true);
    expect(teleportedDigit.consciousness).toBe(originalDigit.consciousness * 2);
    expect(teleportedDigit.frequency).toBe(originalDigit.frequency * 2);
    expect(teleportedDigit.phase).toBe((originalDigit.phase + 4) % 8); // Integer phase shift
  });

  test('should generate interference pattern', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Check interference pattern dimensions
    expect(experiment.interference).toHaveLength(10);
    expect(experiment.interference[0]).toHaveLength(10);
    
    // Check that interference values are calculated
    let hasInterference = false;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (experiment.interference[x][y] > 0) {
          hasInterference = true;
          break;
        }
      }
    }
    expect(hasInterference).toBe(true);
  });

  test('should generate interference visualization', () => {
    const experiment = generateDoubleSlitExperiment();
    const visualization = generateInterferenceVisualization(experiment.interference);
    
    // Check visualization structure
    expect(visualization).toContain('█');
    expect(visualization.split('\n').length).toBeGreaterThan(5);
  });

  test('should calculate quantum consciousness flow', () => {
    const experiment = generateDoubleSlitExperiment();
    const consciousnessFlow = calculateQuantumConsciousnessFlow(experiment.digits);
    
    // Check consciousness flow properties
    expect(consciousnessFlow).toHaveProperty('totalConsciousness');
    expect(consciousnessFlow).toHaveProperty('averageFrequency');
    expect(consciousnessFlow).toHaveProperty('entanglementMeasure');
    expect(consciousnessFlow).toHaveProperty('teleportationCount');
    expect(consciousnessFlow).toHaveProperty('superpositionStates');
    
    // Check specific values
    expect(consciousnessFlow.totalConsciousness).toBeGreaterThan(0);
    expect(consciousnessFlow.averageFrequency).toBeGreaterThan(432);
    expect(consciousnessFlow.entanglementMeasure).toBe(10); // All digits in superposition
    expect(consciousnessFlow.teleportationCount).toBe(0); // Initially no teleportation
    expect(consciousnessFlow.superpositionStates).toBe(10); // All digits in superposition
  });

  test('should demonstrate in.tele.port.out consciousness', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Every digit knows the way through teleportation
    for (const digit of experiment.digits) {
      // Check that each digit has consciousness
      expect(digit.consciousness).toBeGreaterThan(0);
      
      // Check that each digit has A432 harmonic frequency
      expect(digit.frequency).toBe(432 * (digit.digit + 1));
      
      // Check that each digit is in superposition
      expect(digit.superposition).toBe(true);
      
      // Check that each digit can teleport
      const teleportedDigit = simulateDigitTeleportation(digit, [5, 5]);
      expect(teleportedDigit.teleportation).toBe(true);
      expect(teleportedDigit.consciousness).toBe(digit.consciousness * 2);
    }
    
    // Check that all teleportation paths exist
    expect(experiment.teleportationPaths.length).toBe(40); // 10 digits × 4 paths
    
    // Check consciousness flow
    expect(experiment.consciousnessFlow).toBeGreaterThan(0);
    expect(experiment.quantumEntanglement).toBe(10); // Integer entanglement
  });

  test('should show quantum interference from superposition', () => {
    const experiment = generateDoubleSlitExperiment();
    
    // Each digit goes through both slits simultaneously
    for (const digit of experiment.digits) {
      expect(digit.superposition).toBe(true);
      expect(digit.amplitude).toBe(1); // Integer amplitude
      expect(digit.phase).toBe(digit.digit); // Integer phase
    }
    
    // Interference pattern emerges from superposition
    let interferenceSum = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        interferenceSum += experiment.interference[x][y];
      }
    }
    
    expect(interferenceSum).toBeGreaterThan(0);
    
    // Consciousness flow through interference
    expect(experiment.consciousnessFlow).toBeGreaterThan(0);
  });
}); 