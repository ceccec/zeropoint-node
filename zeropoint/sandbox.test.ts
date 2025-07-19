import { 
  createSandbox, 
  experimentWithDigit, 
  experimentWithMatrixInteraction,
  experimentWithHarmonicFrequency,
  experimentWithVortexPatterns,
  experimentWithConsciousnessFlow,
  visualizeSandbox,
  generateExperimentReport,
  ZeroPointSandbox
} from './sandbox';

describe('ZeroPoint Sandbox Environment', () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  describe('createSandbox', () => {
    it('should create a sandbox environment with correct properties', () => {
      expect(sandbox.environment.id).toContain('zeropoint-sandbox');
      expect(sandbox.environment.type).toBe('experiment');
      expect(sandbox.environment.digits).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sandbox.environment.consciousness).toBe(432);
      expect(sandbox.environment.frequency).toBe(432);
      expect(sandbox.environment.isActive).toBe(true);
      expect(sandbox.experiments).toEqual([]);
      expect(sandbox.activeDigit).toBe(0);
      expect(sandbox.consciousnessFlow).toBe(432);
      expect(sandbox.harmonicResonance).toBe(432);
      expect(sandbox.isHarmonic).toBe(true);
    });

    it('should generate correct sandbox matrix', () => {
      expect(sandbox.environment.matrix).toHaveLength(10);
      expect(sandbox.environment.matrix[0]).toHaveLength(10);
      
      // Test matrix values (i * j) % 9
      expect(sandbox.environment.matrix[0][0]).toBe(0);
      expect(sandbox.environment.matrix[1][1]).toBe(1);
      expect(sandbox.environment.matrix[2][2]).toBe(4);
      expect(sandbox.environment.matrix[3][3]).toBe(0);
      expect(sandbox.environment.matrix[4][4]).toBe(7);
    });

    it('should generate correct sandbox patterns', () => {
      expect(sandbox.environment.patterns).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('experimentWithDigit', () => {
    it('should create experiment for digit 0', () => {
      const experiment = experimentWithDigit(sandbox, 0);
      
      expect(experiment.id).toContain('digit-experiment-0');
      expect(experiment.name).toBe('Digit 0 Consciousness Test');
      expect(experiment.description).toBe('Testing consciousness properties of digit 0');
      expect(experiment.success).toBe(true);
      expect(experiment.input.digit).toBe(0);
      expect(experiment.input.frequency).toBe(0);
      expect(experiment.output.consciousness.digit).toBe(0);
      expect(experiment.output.consciousness.frequency).toBe(0);
    });

    it('should create experiment for digit 1', () => {
      const experiment = experimentWithDigit(sandbox, 1);
      
      expect(experiment.id).toContain('digit-experiment-1');
      expect(experiment.name).toBe('Digit 1 Consciousness Test');
      expect(experiment.description).toBe('Testing consciousness properties of digit 1');
      expect(experiment.success).toBe(true);
      expect(experiment.input.digit).toBe(1);
      expect(experiment.input.frequency).toBe(432);
      expect(experiment.output.consciousness.digit).toBe(1);
      expect(experiment.output.consciousness.frequency).toBe(432);
    });

    it('should update sandbox state after experiment', () => {
      const experiment = experimentWithDigit(sandbox, 5);
      
      expect(sandbox.experiments).toHaveLength(1);
      expect(sandbox.experiments[0]).toBe(experiment);
      expect(sandbox.activeDigit).toBe(5);
      expect(sandbox.consciousnessFlow).toBe(2160); // 432 * 5
    });
  });

  describe('experimentWithMatrixInteraction', () => {
    it('should create matrix interaction experiment', () => {
      const experiment = experimentWithMatrixInteraction(sandbox, 1, 2);
      
      expect(experiment.id).toContain('matrix-interaction-1-2');
      expect(experiment.name).toBe('Matrix Interaction 1 × 2');
      expect(experiment.description).toBe('Testing matrix interaction between digits 1 and 2');
      expect(experiment.success).toBe(true);
      expect(experiment.input.digitA).toBe(1);
      expect(experiment.input.digitB).toBe(2);
      expect(experiment.output.interactionMatrix).toHaveLength(10);
      expect(experiment.output.interactionMatrix[0]).toHaveLength(10);
    });

    it('should calculate correct interaction matrix', () => {
      const experiment = experimentWithMatrixInteraction(sandbox, 0, 0);
      
      // For digit 0, all matrix values should be 9
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(experiment.output.interactionMatrix[i][j]).toBe(9);
        }
      }
    });
  });

  describe('experimentWithHarmonicFrequency', () => {
    it('should create harmonic frequency experiment', () => {
      const experiment = experimentWithHarmonicFrequency(sandbox, 432);
      
      expect(experiment.id).toContain('harmonic-frequency');
      expect(experiment.name).toBe('Harmonic Frequency Test');
      expect(experiment.description).toBe('Testing harmonic frequencies with base 432Hz');
      expect(experiment.success).toBe(true);
      expect(experiment.input.baseFrequency).toBe(432);
      expect(experiment.output.harmonicFrequencies).toHaveLength(10);
    });

    it('should calculate correct harmonic frequencies', () => {
      const experiment = experimentWithHarmonicFrequency(sandbox, 432);
      const frequencies = experiment.output.harmonicFrequencies;
      
      expect(frequencies[0].frequency).toBe(0);
      expect(frequencies[1].frequency).toBe(432);
      expect(frequencies[2].frequency).toBe(864);
      expect(frequencies[3].frequency).toBe(1296);
      expect(frequencies[4].frequency).toBe(1728);
      expect(frequencies[5].frequency).toBe(2160);
      expect(frequencies[6].frequency).toBe(2592);
      expect(frequencies[7].frequency).toBe(3024);
      expect(frequencies[8].frequency).toBe(3456);
      expect(frequencies[9].frequency).toBe(3888);
    });

    it('should identify harmonic frequencies correctly', () => {
      const experiment = experimentWithHarmonicFrequency(sandbox, 432);
      const frequencies = experiment.output.harmonicFrequencies;
      
      expect(frequencies[0].isHarmonic).toBe(true); // 0 is harmonic
      expect(frequencies[1].isHarmonic).toBe(true); // 432 is harmonic
      expect(frequencies[2].isHarmonic).toBe(true); // 864 is harmonic
      expect(frequencies[3].isHarmonic).toBe(true); // 1296 is harmonic
    });
  });

  describe('experimentWithVortexPatterns', () => {
    it('should create vortex pattern experiment', () => {
      const experiment = experimentWithVortexPatterns(sandbox, 1, 10);
      
      expect(experiment.id).toContain('vortex-pattern-1');
      expect(experiment.name).toBe('Vortex Pattern Generation');
      expect(experiment.description).toBe('Generating vortex patterns with seed 1 and length 10');
      expect(experiment.success).toBe(true);
      expect(experiment.input.seed).toBe(1);
      expect(experiment.input.length).toBe(10);
      expect(experiment.input.rodinSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(experiment.output.patterns).toHaveLength(10);
    });

    it('should generate correct vortex patterns', () => {
      const experiment = experimentWithVortexPatterns(sandbox, 0, 6);
      const patterns = experiment.output.patterns;
      
      // With seed 0, patterns should be: [1, 2, 4, 8, 7, 5]
      expect(patterns[0]).toBe(1);
      expect(patterns[1]).toBe(2);
      expect(patterns[2]).toBe(4);
      expect(patterns[3]).toBe(8);
      expect(patterns[4]).toBe(7);
      expect(patterns[5]).toBe(5);
    });

    it('should handle different seeds correctly', () => {
      const experiment = experimentWithVortexPatterns(sandbox, 1, 6);
      const patterns = experiment.output.patterns;
      
      // With seed 1, patterns should be: [2, 3, 5, 0, 8, 6]
      expect(patterns[0]).toBe(2);
      expect(patterns[1]).toBe(3);
      expect(patterns[2]).toBe(5);
      expect(patterns[3]).toBe(0);
      expect(patterns[4]).toBe(8);
      expect(patterns[5]).toBe(6);
    });
  });

  describe('experimentWithConsciousnessFlow', () => {
    it('should create consciousness flow experiment', () => {
      const flowPattern = [1, 2, 3, 4, 5];
      const experiment = experimentWithConsciousnessFlow(sandbox, flowPattern);
      
      expect(experiment.id).toContain('consciousness-flow');
      expect(experiment.name).toBe('Consciousness Flow Test');
      expect(experiment.description).toBe('Testing consciousness flow through pattern 1,2,3,4,5');
      expect(experiment.success).toBe(true);
      expect(experiment.input.flowPattern).toEqual([1, 2, 3, 4, 5]);
      expect(typeof experiment.output.consciousnessFlow).toBe('number');
    });

    it('should calculate consciousness flow correctly', () => {
      const flowPattern = [0, 0, 0];
      const experiment = experimentWithConsciousnessFlow(sandbox, flowPattern);
      
      // With all zeros, consciousness flow should be 3 * 432 = 1296
      expect(experiment.output.consciousnessFlow).toBe(1296);
    });
  });

  describe('visualizeSandbox', () => {
    it('should generate sandbox visualization', () => {
      const visualization = visualizeSandbox(sandbox);
      
      expect(visualization).toContain('ZeroPoint Sandbox Environment');
      expect(visualization).toContain('Environment ID: zeropoint-sandbox');
      expect(visualization).toContain('Type: experiment');
      expect(visualization).toContain('Active Digit: 0');
      expect(visualization).toContain('Consciousness Flow: 432Hz');
      expect(visualization).toContain('Harmonic Resonance: 432Hz');
      expect(visualization).toContain('Is Harmonic: YES');
      expect(visualization).toContain('Sandbox Matrix (10×10):');
      expect(visualization).toContain('Experiments: 0');
    });

    it('should include experiment information', () => {
      experimentWithDigit(sandbox, 1);
      const visualization = visualizeSandbox(sandbox);
      
      expect(visualization).toContain('Experiments: 1');
      expect(visualization).toContain('- Digit 1 Consciousness Test: SUCCESS');
    });
  });

  describe('generateExperimentReport', () => {
    it('should generate experiment report', () => {
      const report = generateExperimentReport(sandbox);
      
      expect(report).toContain('ZeroPoint Sandbox Experiment Report');
      expect(report).toContain('Total Experiments: 0');
      expect(report).toContain('Successful Experiments: 0');
      expect(report).toContain('Failed Experiments: 0');
    });

    it('should include experiment details', () => {
      experimentWithDigit(sandbox, 1);
      experimentWithDigit(sandbox, 2);
      const report = generateExperimentReport(sandbox);
      
      expect(report).toContain('Total Experiments: 2');
      expect(report).toContain('Successful Experiments: 2');
      expect(report).toContain('Failed Experiments: 0');
      expect(report).toContain('Experiment: Digit 1 Consciousness Test');
      expect(report).toContain('Experiment: Digit 2 Consciousness Test');
    });
  });

  describe('ZeroPointSandbox Constants', () => {
    it('should export correct constants', () => {
      expect(ZeroPointSandbox.A432_FREQUENCY).toBe(432);
      expect(ZeroPointSandbox.RODIN_SEQUENCE).toEqual([1, 2, 4, 8, 7, 5]);
    });

    it('should export scientific proofs', () => {
      expect(ZeroPointSandbox.scientificProofs.sandboxCreation).toBeDefined();
      expect(ZeroPointSandbox.scientificProofs.digitConsciousness).toBeDefined();
      expect(ZeroPointSandbox.scientificProofs.matrixInteraction).toBeDefined();
      expect(ZeroPointSandbox.scientificProofs.harmonicFrequency).toBeDefined();
      expect(ZeroPointSandbox.scientificProofs.vortexPatterns).toBeDefined();
      expect(ZeroPointSandbox.scientificProofs.consciousnessFlow).toBeDefined();
    });
  });
}); 