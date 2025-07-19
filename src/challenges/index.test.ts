// Test file for Challenge Cases
// Tests each challenge case implementation

import {
  CHALLENGE_REGISTRY,
  CHALLENGE_METADATA,
  getAllChallenges,
  getChallengesByCategory,
  getChallengeMetadata,
  getChallengeInstance,
  analyzeAllChallenges,
  getChallengeGuidance,
  getRelatedChallenges,
  getStrongestConnection,
  getNavigationPaths,
  analyzeMathematicalContinuity
} from './index';

describe('Challenge Cases', () => {
  describe('Challenge Registry', () => {
    test('should have all challenge cases registered', () => {
      const challenges = getAllChallenges();
      expect(challenges).toContain('wave_particle_duality');
      expect(challenges).toContain('quantum_entanglement');
      expect(challenges).toContain('observer_effect');
      expect(challenges).toHaveLength(9);
    });

    test('should have challenge instances for all registered challenges', () => {
      const challenges = getAllChallenges();
      challenges.forEach(challengeId => {
        const instance = getChallengeInstance(challengeId);
        expect(instance).toBeDefined();
        // Each challenge has its own create function
        const createFunction = challengeId === 'consciousness_origin' ? instance.createConsciousnessOriginChallenge :
                              challengeId === 'free_will' ? instance.createFreeWillChallenge :
                              challengeId === 'mathematical_platonism' ? instance.createMathematicalPlatonismChallenge :
                              challengeId === 'wave_particle_duality' ? instance.createWaveParticleDualityChallenge :
                              challengeId === 'quantum_entanglement' ? instance.createQuantumEntanglementChallenge :
                              challengeId === 'observer_effect' ? instance.createObserverEffectChallenge :
                              challengeId === 'zero_point_energy' ? instance.createZeroPointEnergyChallenge :
                              challengeId === 'mathematical_infinity' ? instance.createMathematicalInfinityChallenge :
                              challengeId === 'heisenberg_uncertainty' ? instance.createHeisenbergUncertaintyChallenge : null;
        expect(typeof createFunction).toBe('function');
      });
    });
  });

  describe('Challenge Metadata', () => {
    test('should have metadata for all challenges', () => {
      const challenges = getAllChallenges();
      challenges.forEach(challengeId => {
        const metadata = getChallengeMetadata(challengeId);
        expect(metadata).toBeDefined();
        expect(metadata.id).toBe(challengeId);
        expect(metadata.name).toBeDefined();
        expect(metadata.category).toBeDefined();
        expect(metadata.mathematicalFoundation).toBeDefined();
        expect(metadata.consciousnessFlow).toBeGreaterThan(0);
        expect(metadata.a432Resonance).toBeGreaterThan(0);
        expect(metadata.teslaCycle).toBeDefined();
        expect(metadata.rodinPosition).toBeGreaterThanOrEqual(0);
        expect(metadata.file).toBeDefined();
      });
    });

    test('should have valid consciousness flows (1-9)', () => {
      const challenges = getAllChallenges();
      challenges.forEach(challengeId => {
        const metadata = getChallengeMetadata(challengeId);
        expect(metadata.consciousnessFlow).toBeGreaterThanOrEqual(1);
        expect(metadata.consciousnessFlow).toBeLessThanOrEqual(9);
      });
    });

    test('should have valid A432 resonances (multiples of 432)', () => {
      const challenges = getAllChallenges();
      challenges.forEach(challengeId => {
        const metadata = getChallengeMetadata(challengeId);
        expect(metadata.a432Resonance % 432).toBe(0);
      });
    });
  });

  describe('Challenge Categories', () => {
    test('should categorize challenges correctly', () => {
      const absoluteFoundationChallenges = getChallengesByCategory('absolute_foundation');
      const quantumFoundationChallenges = getChallengesByCategory('quantum_foundation');
      const consciousnessFoundationChallenges = getChallengesByCategory('consciousness_foundation');
      
      expect(absoluteFoundationChallenges).toContain('consciousness_origin');
      expect(absoluteFoundationChallenges).toContain('free_will');
      expect(absoluteFoundationChallenges).toContain('mathematical_platonism');
      expect(quantumFoundationChallenges).toContain('wave_particle_duality');
      expect(quantumFoundationChallenges).toContain('quantum_entanglement');
      expect(consciousnessFoundationChallenges).toContain('observer_effect');
    });

    test('should return empty array for non-existent category', () => {
      const nonExistent = getChallengesByCategory('non_existent');
      expect(nonExistent).toEqual([]);
    });
  });

  describe('Challenge Analysis', () => {
    test('should analyze all challenges correctly', () => {
      const analysis = analyzeAllChallenges();
      
      expect(analysis.totalChallenges).toBe(9);
      expect(analysis.resolvedChallenges).toBe(9);
      expect(analysis.unresolvedChallenges).toBe(0);
      expect(analysis.switchActivations).toBe(9);
      expect(analysis.consciousnessFlows).toHaveLength(9);
      expect(analysis.a432Resonances).toHaveLength(9);
      expect(analysis.categories.absolute_foundation).toBe(3);
      expect(analysis.categories.quantum_foundation).toBe(3);
      expect(analysis.categories.consciousness_foundation).toBe(1);
      expect(analysis.categories.infinite_foundation).toBe(1);
      expect(analysis.categories.mathematical_foundation).toBe(1);
    });

    test('should have valid consciousness flows in analysis', () => {
      const analysis = analyzeAllChallenges();
      analysis.consciousnessFlows.forEach(flow => {
        expect(flow).toBeGreaterThanOrEqual(1);
        expect(flow).toBeLessThanOrEqual(9);
      });
    });

    test('should have valid A432 resonances in analysis', () => {
      const analysis = analyzeAllChallenges();
      analysis.a432Resonances.forEach(resonance => {
        expect(resonance % 432).toBe(0);
      });
    });
  });

  describe('Guidance System', () => {
    test('should provide guidance for wave-particle duality', () => {
      const guidance = getChallengeGuidance('wave_particle_duality');
      expect(guidance).toHaveLength(3);
      
      const targetIds = guidance.map(g => g.targetChallenge);
      expect(targetIds).toContain('heisenberg_uncertainty');
      expect(targetIds).toContain('quantum_entanglement');
      expect(targetIds).toContain('observer_effect');
      
      guidance.forEach(g => {
        expect(g.strength).toBeGreaterThanOrEqual(1);
        expect(g.strength).toBeLessThanOrEqual(9);
        expect(g.relationship).toBeDefined();
        expect(g.reason).toBeDefined();
      });
    });

    test('should provide guidance for quantum entanglement', () => {
      const guidance = getChallengeGuidance('quantum_entanglement');
      expect(guidance).toHaveLength(3);
      
      const targetIds = guidance.map(g => g.targetChallenge);
      expect(targetIds).toContain('black_hole_information');
      expect(targetIds).toContain('wave_particle_duality');
      expect(targetIds).toContain('multiverse');
    });

    test('should provide guidance for observer effect', () => {
      const guidance = getChallengeGuidance('observer_effect');
      expect(guidance).toHaveLength(3);
      
      const targetIds = guidance.map(g => g.targetChallenge);
      expect(targetIds).toContain('consciousness_origin');
      expect(targetIds).toContain('free_will');
      expect(targetIds).toContain('wave_particle_duality');
    });

    test('should get related challenges correctly', () => {
      const related = getRelatedChallenges('wave_particle_duality');
      expect(related).toHaveLength(3);
      expect(related).toContain('heisenberg_uncertainty');
      expect(related).toContain('quantum_entanglement');
      expect(related).toContain('observer_effect');
    });

    test('should get strongest connection correctly', () => {
      const strongest = getStrongestConnection('wave_particle_duality');
      expect(strongest).toBe('heisenberg_uncertainty'); // Strength 9
    });
  });

  describe('Navigation Paths', () => {
    test('should provide navigation paths', () => {
      const paths = getNavigationPaths();
      
      expect(paths.absolute_foundation).toContain('consciousness_origin');
      expect(paths.absolute_foundation).toContain('free_will');
      expect(paths.absolute_foundation).toContain('mathematical_platonism');
      expect(paths.quantum_foundation).toContain('wave_particle_duality');
      expect(paths.quantum_foundation).toContain('quantum_entanglement');
      expect(paths.quantum_foundation).toContain('heisenberg_uncertainty');
      expect(paths.consciousness_foundation).toContain('observer_effect');
      expect(paths.infinite_foundation).toEqual(['zero_point_energy']);
      expect(paths.mathematical_foundation).toEqual(['mathematical_infinity']);
    });
  });

  describe('Mathematical Continuity', () => {
    test('should analyze mathematical continuity for quantum path', () => {
      const quantumPath = ['wave_particle_duality', 'quantum_entanglement'];
      const continuity = analyzeMathematicalContinuity(quantumPath);
      
      expect(continuity.streamConsciousness).toEqual([3, 6]);
      expect(continuity.a432Harmonics).toEqual([1296, 2592]);
      expect(continuity.teslaCycles).toEqual(['creation', 'harmony']);
      expect(continuity.rodinPositions).toEqual([3, 0]);
      expect(continuity.continuity).toBe(true);
    });

    test('should analyze mathematical continuity for consciousness path', () => {
      const consciousnessPath = ['observer_effect'];
      const continuity = analyzeMathematicalContinuity(consciousnessPath);
      
      expect(continuity.streamConsciousness).toEqual([1]);
      expect(continuity.a432Harmonics).toEqual([432]);
      expect(continuity.teslaCycles).toEqual(['completion']);
      expect(continuity.rodinPositions).toEqual([1]);
      expect(continuity.continuity).toBe(false); // Single challenge
    });
  });

  describe('Individual Challenge Cases', () => {
    describe('Wave-Particle Duality', () => {
      test('should create challenge correctly', () => {
        const instance = getChallengeInstance('wave_particle_duality');
        const challenge = instance.createWaveParticleDualityChallenge();
        
        expect(challenge.id).toBe('wave_particle_duality');
        expect(challenge.name).toBe('Wave-Particle Duality');
        expect(challenge.confusion).toBe('Light behaves as both wave and particle simultaneously');
        expect(challenge.impossibility).toBe('How can one thing be two contradictory states?');
        expect(challenge.switch).toBe('Transform to stream consciousness flow');
        expect(challenge.solution).toContain('consciousness stream flowing through mathematical dimensions');
        expect(challenge.isResolved).toBe(true);
      });

      test('should create harmony correctly', () => {
        const instance = getChallengeInstance('wave_particle_duality');
        const harmony = instance.createWaveParticleHarmony();
        
        expect(harmony.id).toBe('wave_particle_harmony');
        expect(harmony.source).toBe('wave_particle_duality');
        expect(harmony.type).toBe('quantum');
        expect(harmony.consciousness).toBe(3);
        expect(harmony.frequency).toBe(1296);
        expect(harmony.switchActivated).toBe(true);
      });

      test('should analyze resolution correctly', () => {
        const instance = getChallengeInstance('wave_particle_duality');
        const resolution = instance.analyzeDualityResolution();
        
        expect(resolution.resolved).toBe(true);
        expect(resolution.consciousnessFlow).toBe(3);
        expect(resolution.a432Resonance).toBe(1296);
        expect(resolution.mathematicalReason).toBe('Stream consciousness flow resolves duality');
      });
    });

    describe('Quantum Entanglement', () => {
      test('should create challenge correctly', () => {
        const instance = getChallengeInstance('quantum_entanglement');
        const challenge = instance.createQuantumEntanglementChallenge();
        
        expect(challenge.id).toBe('quantum_entanglement');
        expect(challenge.name).toBe('Quantum Entanglement');
        expect(challenge.confusion).toBe('Particles separated by infinite distance instantly affect each other');
        expect(challenge.impossibility).toBe('How can information travel faster than light?');
        expect(challenge.switch).toBe('Transform to vortex impossibility reversal');
        expect(challenge.solution).toContain('vortex flows in the same mathematical dimension');
        expect(challenge.isResolved).toBe(true);
      });

      test('should create harmony correctly', () => {
        const instance = getChallengeInstance('quantum_entanglement');
        const harmony = instance.createEntanglementHarmony();
        
        expect(harmony.id).toBe('entanglement_harmony');
        expect(harmony.source).toBe('quantum_entanglement');
        expect(harmony.type).toBe('quantum');
        expect(harmony.consciousness).toBe(6);
        expect(harmony.frequency).toBe(2592);
        expect(harmony.switchActivated).toBe(true);
      });
    });

    describe('Observer Effect', () => {
      test('should create challenge correctly', () => {
        const instance = getChallengeInstance('observer_effect');
        const challenge = instance.createObserverEffectChallenge();
        
        expect(challenge.id).toBe('observer_effect');
        expect(challenge.name).toBe('Observer Effect');
        expect(challenge.confusion).toBe('Reality changes based on observation');
        expect(challenge.impossibility).toBe('How can consciousness affect physical reality?');
        expect(challenge.switch).toBe('Transform to A432 harmonic coordination');
        expect(challenge.solution).toContain('resonates at A432 and coordinates mathematical dimensions');
        expect(challenge.isResolved).toBe(true);
      });

      test('should create harmony correctly', () => {
        const instance = getChallengeInstance('observer_effect');
        const harmony = instance.createObserverHarmony();
        
        expect(harmony.id).toBe('observer_harmony');
        expect(harmony.source).toBe('observer_effect');
        expect(harmony.type).toBe('consciousness');
        expect(harmony.consciousness).toBe(1);
        expect(harmony.frequency).toBe(432);
        expect(harmony.switchActivated).toBe(true);
      });
    });
  });
}); 