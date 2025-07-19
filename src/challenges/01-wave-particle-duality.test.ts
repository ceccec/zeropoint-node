// Wave-Particle Duality Challenge Tests
// Tests all functions and mathematical harmony for wave-particle duality

import waveParticleDuality from './01-wave-particle-duality';

describe('Wave-Particle Duality Challenge', () => {
  describe('Challenge Creation', () => {
    test('should create wave-particle duality challenge correctly', () => {
      const challenge = waveParticleDuality.createWaveParticleDualityChallenge();
      
      expect(challenge.id).toBe('wave_particle_duality');
      expect(challenge.name).toBe('Wave-Particle Duality');
      expect(challenge.confusion).toBe('Light behaves as both wave and particle simultaneously');
      expect(challenge.impossibility).toBe('How can one thing be two contradictory states?');
      expect(challenge.switch).toBe('Transform to stream consciousness flow');
      expect(challenge.solution).toContain('consciousness stream flowing through mathematical dimensions');
      expect(challenge.isResolved).toBe(true);
    });

    test('should create wave-particle harmony correctly', () => {
      const harmony = waveParticleDuality.createWaveParticleHarmony();
      
      expect(harmony.id).toBe('wave_particle_harmony');
      expect(harmony.source).toBe('wave_particle_duality');
      expect(harmony.type).toBe('quantum');
      expect(harmony.content.wave).toBe(1);
      expect(harmony.content.particle).toBe(2);
      expect(harmony.content.consciousness).toBe(3);
      expect(harmony.polarity).toBe('neutral');
      expect(harmony.spin).toBe(1/3);
      expect(harmony.angle).toBe(3);
      expect(harmony.consciousness).toBe(3);
      expect(harmony.frequency).toBe(1296);
      expect(harmony.color).toBe('#ff0033');
      expect(harmony.isInfinite).toBe(true);
      expect(harmony.connections).toEqual(['wave_consciousness', 'particle_consciousness']);
      expect(harmony.rodinPosition).toBe(3);
      expect(harmony.teslaCycle).toBe('creation');
      expect(harmony.streamState).toBe(3);
      expect(harmony.isPossible).toBe(true);
      expect(harmony.isReversible).toBe(true);
      expect(harmony.mathematicalReason).toBe('Stream consciousness flow resolves duality');
      expect(harmony.switchActivated).toBe(true);
    });

    test('should analyze vortex correctly', () => {
      const vortex = waveParticleDuality.analyzeWaveParticleVortex();
      
      expect(vortex.forwardFlow.from).toBe(1);
      expect(vortex.forwardFlow.to).toBe(2);
      expect(vortex.forwardFlow.isPossible).toBe(true);
      expect(vortex.forwardFlow.consciousnessMultiplierA).toBe(3/2);
      expect(vortex.forwardFlow.consciousnessMultiplierB).toBe(2);
      expect(vortex.forwardFlow.resonance).toBe(3);
      expect(vortex.forwardFlow.mathematicalReason).toBe('Stream consciousness enables transformation');
      
      expect(vortex.reverseFlow.from).toBe(2);
      expect(vortex.reverseFlow.to).toBe(1);
      expect(vortex.reverseFlow.isPossible).toBe(true);
      expect(vortex.reverseFlow.consciousnessMultiplierA).toBe(2);
      expect(vortex.reverseFlow.consciousnessMultiplierB).toBe(3/2);
      expect(vortex.reverseFlow.resonance).toBe(3);
      expect(vortex.reverseFlow.mathematicalReason).toBe('Consciousness stream enables reverse transformation');
      
      expect(vortex.isReversible).toBe(true);
      expect(vortex.mathematicalGate).toBe('Consciousness stream flow gate');
    });
  });

  describe('Resolution Analysis', () => {
    test('should analyze duality resolution correctly', () => {
      const resolution = waveParticleDuality.analyzeDualityResolution();
      
      expect(resolution.resolved).toBe(true);
      expect(resolution.consciousnessFlow).toBe(3);
      expect(resolution.a432Resonance).toBe(1296);
      expect(resolution.mathematicalReason).toBe('Stream consciousness flow resolves duality');
    });

    test('should analyze duality vortex flow correctly', () => {
      const vortexFlow = waveParticleDuality.analyzeDualityVortexFlow();
      
      expect(vortexFlow.forwardFlow.isPossible).toBe(true);
      expect(vortexFlow.forwardFlow.mathematicalReason).toBe('Stream consciousness enables transformation');
      expect(vortexFlow.reverseFlow.isPossible).toBe(true);
      expect(vortexFlow.reverseFlow.mathematicalReason).toBe('Consciousness stream enables reverse transformation');
      expect(vortexFlow.isReversible).toBe(true);
    });

    test('should analyze duality harmonics correctly', () => {
      const harmonics = waveParticleDuality.analyzeDualityHarmonics();
      
      expect(harmonics.baseFrequency).toBe(432);
      expect(harmonics.consciousnessMultiplier).toBe(3);
      expect(harmonics.resultingFrequency).toBe(1296);
      expect(harmonics.harmonicResonance).toBe('Perfect third harmonic');
      expect(harmonics.wavelength).toBe(299792458 / 1296);
      expect(harmonics.period).toBe(1 / 1296);
      expect(harmonics.energy).toBe(6.62607015e-34 * 1296);
    });

    test('should analyze duality Tesla cycle correctly', () => {
      const teslaCycle = waveParticleDuality.analyzeDualityTeslaCycle();
      
      expect(teslaCycle.currentCycle).toBe('creation');
      expect(teslaCycle.cyclePhase).toBe('1/3 complete');
      expect(teslaCycle.nextPhase).toBe('harmony');
      expect(teslaCycle.transformation).toBe('Wave → Particle → Wave-Particle Unity');
      expect(teslaCycle.dimensionalFlow.creation).toBe('Wave manifestation');
      expect(teslaCycle.dimensionalFlow.harmony).toBe('Particle manifestation');
      expect(teslaCycle.dimensionalFlow.completion).toBe('Unified wave-particle consciousness');
    });

    test('should analyze duality Rodin vortex correctly', () => {
      const rodinVortex = waveParticleDuality.analyzeDualityRodinVortex();
      
      expect(rodinVortex.position).toBe(3);
      expect(rodinVortex.vortexValue).toBe(8);
      expect(rodinVortex.flowDirection).toBe('Forward');
      expect(rodinVortex.consciousnessDensity).toBe('Medium');
      expect(rodinVortex.spinRate).toBe(1/3);
      expect(rodinVortex.angularVelocity).toBe(3);
      expect(rodinVortex.consciousnessFlow).toBe(3/2);
      expect(rodinVortex.harmonicResonance).toBe(1296);
    });

    test('should analyze duality switch correctly', () => {
      const switchAnalysis = waveParticleDuality.analyzeDualitySwitch();
      
      expect(switchAnalysis.activated).toBe(true);
      expect(switchAnalysis.transformationType).toBe('Dimensional consciousness flow');
      expect(switchAnalysis.resolutionMethod).toBe('Stream consciousness integration');
      expect(switchAnalysis.mathematicalFoundation).toBe('Infinite consciousness field');
      expect(switchAnalysis.activationSteps).toHaveLength(5);
      expect(switchAnalysis.activationSteps[0]).toBe('Detection: Impossible wave-particle contradiction');
      expect(switchAnalysis.activationSteps[1]).toBe('Analysis: Consciousness stream flow analysis');
      expect(switchAnalysis.activationSteps[2]).toBe('Transformation: Dimensional switching activation');
      expect(switchAnalysis.activationSteps[3]).toBe('Resolution: Wave-particle unity through consciousness flow');
      expect(switchAnalysis.activationSteps[4]).toBe('Integration: Complete mathematical harmony');
    });

    test('should analyze duality resolution status correctly', () => {
      const resolutionStatus = waveParticleDuality.analyzeDualityResolutionStatus();
      
      expect(resolutionStatus.resolved).toBe(true);
      expect(resolutionStatus.switchActivated).toBe(true);
      expect(resolutionStatus.mathematicalIntegration).toBe('Complete');
      expect(resolutionStatus.harmonicResonance).toBe('Perfect');
      expect(resolutionStatus.vortexFlow).toBe('Stable');
      expect(resolutionStatus.confusionLevel).toBe(0);
      expect(resolutionStatus.impossibilityLevel).toBe(0);
      expect(resolutionStatus.consciousnessFlow).toBe(3);
      expect(resolutionStatus.mathematicalHarmony).toBe(100);
    });
  });

  describe('Navigation and Guidance', () => {
    test('should provide related challenges correctly', () => {
      const relatedChallenges = waveParticleDuality.RELATED_CHALLENGES;
      
      expect(relatedChallenges).toHaveLength(3);
      
      const heisenberg = relatedChallenges.find(c => c.id === 'heisenberg_uncertainty');
      expect(heisenberg).toBeDefined();
      expect(heisenberg?.strength).toBe(9);
      expect(heisenberg?.relationship).toBe('mathematical_foundation');
      expect(heisenberg?.reason).toBe('Uncertainty principle directly relates to wave-particle duality');
      
      const entanglement = relatedChallenges.find(c => c.id === 'quantum_entanglement');
      expect(entanglement).toBeDefined();
      expect(entanglement?.strength).toBe(8);
      expect(entanglement?.relationship).toBe('consciousness_flow');
      expect(entanglement?.reason).toBe('Both involve consciousness stream flow through mathematical dimensions');
      
      const observer = relatedChallenges.find(c => c.id === 'observer_effect');
      expect(observer).toBeDefined();
      expect(observer?.strength).toBe(7);
      expect(observer?.relationship).toBe('vortex_pattern');
      expect(observer?.reason).toBe('Observer effect determines wave vs particle manifestation');
    });

    test('should get next challenges correctly', () => {
      const nextChallenges = waveParticleDuality.getNextChallenges();
      
      expect(nextChallenges).toHaveLength(3);
      expect(nextChallenges).toContain('heisenberg_uncertainty');
      expect(nextChallenges).toContain('quantum_entanglement');
      expect(nextChallenges).toContain('observer_effect');
    });

    test('should get strongest connection correctly', () => {
      const strongest = waveParticleDuality.getStrongestConnection();
      
      expect(strongest).toBe('heisenberg_uncertainty'); // Strength 9
    });
  });

  describe('Mathematical Properties', () => {
    test('should have correct consciousness flow calculation', () => {
      const challenge = waveParticleDuality.createWaveParticleDualityChallenge();
      
      expect(challenge.consciousnessFlow).toBe(3);
      expect(challenge.a432Resonance).toBe(1296);
      expect(challenge.teslaCycle).toBe('creation');
      expect(challenge.rodinPosition).toBe(3);
    });

    test('should have correct A432 harmonic calculation', () => {
      const harmonics = waveParticleDuality.analyzeDualityHarmonics();
      
      expect(harmonics.resultingFrequency).toBe(432 * 3); // 1296
      expect(harmonics.resultingFrequency % 432).toBe(0); // Should be multiple of 432
    });

    test('should have correct Tesla cycle calculation', () => {
      const teslaCycle = waveParticleDuality.analyzeDualityTeslaCycle();
      
      expect(['creation', 'harmony', 'completion']).toContain(teslaCycle.currentCycle);
      expect(['creation', 'harmony', 'completion']).toContain(teslaCycle.nextPhase);
    });

    test('should have correct Rodin vortex calculation', () => {
      const rodinVortex = waveParticleDuality.analyzeDualityRodinVortex();
      
      expect(rodinVortex.position).toBeGreaterThanOrEqual(0);
      expect(rodinVortex.position).toBeLessThan(6);
      expect([1, 2, 4, 8, 7, 5]).toContain(rodinVortex.vortexValue);
    });
  });

  describe('Integration Tests', () => {
    test('should integrate all analysis functions correctly', () => {
      const challenge = waveParticleDuality.createWaveParticleDualityChallenge();
      const harmony = waveParticleDuality.createWaveParticleHarmony();
      const resolution = waveParticleDuality.analyzeDualityResolution();
      const harmonics = waveParticleDuality.analyzeDualityHarmonics();
      
      // All should have consistent consciousness flow
      expect(challenge.consciousnessFlow).toBe(harmony.consciousness);
      expect(challenge.consciousnessFlow).toBe(resolution.consciousnessFlow);
      expect(challenge.consciousnessFlow).toBe(harmonics.consciousnessMultiplier);
      
      // All should have consistent A432 resonance
      expect(challenge.a432Resonance).toBe(harmony.frequency);
      expect(challenge.a432Resonance).toBe(resolution.a432Resonance);
      expect(challenge.a432Resonance).toBe(harmonics.resultingFrequency);
      
      // All should be resolved
      expect(challenge.isResolved).toBe(true);
      expect(harmony.switchActivated).toBe(true);
      expect(resolution.resolved).toBe(true);
    });

    test('should maintain mathematical consistency across all functions', () => {
      const challenge = waveParticleDuality.createWaveParticleDualityChallenge();
      const harmony = waveParticleDuality.createWaveParticleHarmony();
      const vortex = waveParticleDuality.analyzeWaveParticleVortex();
      
      // Consciousness flow should be consistent
      expect(challenge.consciousnessFlow).toBe(3);
      expect(harmony.consciousness).toBe(3);
      expect(vortex.forwardFlow.resonance).toBe(3);
      
      // A432 resonance should be consistent
      expect(challenge.a432Resonance).toBe(1296);
      expect(harmony.frequency).toBe(1296);
      
      // Tesla cycle should be consistent
      expect(challenge.teslaCycle).toBe('creation');
      expect(harmony.teslaCycle).toBe('creation');
      
      // Rodin position should be consistent
      expect(challenge.rodinPosition).toBe(3);
      expect(harmony.rodinPosition).toBe(3);
    });
  });
}); 