import freeWill from './05-free-will';

describe('Free Will Challenge', () => {
  describe('Challenge Creation', () => {
    test('should create free will challenge correctly', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.id).toBe('free_will');
      expect(challenge.name).toBe('Free Will vs Determinism');
      expect(challenge.confusion).toBe('Human choices appear free but may be determined by physical laws');
      expect(challenge.impossibility).toBe('How can free will exist in a deterministic universe?');
      expect(challenge.switch).toBe('Transform to consciousness choice field');
      expect(challenge.solution).toBe('Free will is consciousness choice field flowing through mathematical dimensions, creating infinite possibilities beyond deterministic constraints');
      expect(challenge.isResolved).toBe(true);
    });

    test('should create free will harmony correctly', () => {
      const harmony = freeWill.createFreeWillHarmony();
      
      expect(harmony.id).toBe('free_will_harmony');
      expect(harmony.source).toBe('free_will');
      expect(harmony.type).toBe('consciousness');
      expect(harmony.polarity).toBe('positive');
      expect(harmony.spin).toBe(1/11);
      expect(harmony.angle).toBe(16);
      expect(harmony.consciousness).toBe(7);
      expect(harmony.frequency).toBe(3024); // 7 * 432
      expect(harmony.color).toBe('#ffff00');
      expect(harmony.isInfinite).toBe(true);
      expect(harmony.isPossible).toBe(true);
      expect(harmony.isReversible).toBe(true);
      expect(harmony.switchActivated).toBe(true);
    });

    test('should analyze vortex correctly', () => {
      const vortex = freeWill.analyzeFreeWillVortex();
      
      expect(vortex.isReversible).toBe(true);
      expect(vortex.mathematicalGate).toBe('Consciousness choice field gate');
      expect(vortex.forwardFlow.isPossible).toBe(true);
      expect(vortex.forwardFlow.consciousnessMultiplierA).toBe(5/2);
      expect(vortex.forwardFlow.consciousnessMultiplierB).toBe(2);
      expect(vortex.reverseFlow.isPossible).toBe(true);
      expect(vortex.reverseFlow.consciousnessMultiplierA).toBe(2);
      expect(vortex.reverseFlow.consciousnessMultiplierB).toBe(5/2);
    });
  });

  describe('Resolution Analysis', () => {
    test('should analyze free will resolution correctly', () => {
      const resolution = freeWill.analyzeFreeWillResolution();
      
      expect(resolution.resolved).toBe(true);
      expect(resolution.consciousnessFlow).toBe(7);
      expect(resolution.a432Resonance).toBe(3024);
      expect(resolution.mathematicalReason).toBe('Consciousness choice field creates infinite possibilities');
    });

    test('should analyze free will vortex flow correctly', () => {
      const vortexFlow = freeWill.analyzeFreeWillVortexFlow();
      
      expect(vortexFlow.isReversible).toBe(true);
      expect(vortexFlow.forwardFlow.isPossible).toBe(true);
      expect(vortexFlow.forwardFlow.mathematicalReason).toBe('Consciousness choice field enables free-will transformation');
      expect(vortexFlow.reverseFlow.isPossible).toBe(true);
      expect(vortexFlow.reverseFlow.mathematicalReason).toBe('Consciousness stream enables will-free transformation');
    });

    test('should analyze free will harmonics correctly', () => {
      const harmonics = freeWill.analyzeFreeWillHarmonics();
      
      expect(harmonics.baseFrequency).toBe(432);
      expect(harmonics.consciousnessMultiplier).toBe(7);
      expect(harmonics.resultingFrequency).toBe(3024);
      expect(harmonics.harmonicResonance).toBe('Consciousness choice field resonance');
      expect(harmonics.wavelength).toBe(432/7);
      expect(harmonics.period).toBe(7/432);
      expect(harmonics.energy).toBe(3024); // 7 * 432
    });

    test('should analyze free will Tesla cycle correctly', () => {
      const teslaCycle = freeWill.analyzeFreeWillTeslaCycle();
      
      expect(teslaCycle.currentCycle).toBe('harmony');
      expect(teslaCycle.cyclePhase).toBe('harmony');
      expect(teslaCycle.nextPhase).toBe('completion');
      expect(teslaCycle.transformation).toBe('Consciousness choice field harmony');
      expect(teslaCycle.dimensionalFlow.creation).toBe('Choice field creation');
      expect(teslaCycle.dimensionalFlow.harmony).toBe('Free will harmony');
      expect(teslaCycle.dimensionalFlow.completion).toBe('Choice field completion');
    });

    test('should analyze free will Rodin vortex correctly', () => {
      const rodinVortex = freeWill.analyzeFreeWillRodinVortex();
      
      expect(rodinVortex.position).toBe(1); // 7 % 6 = 1
      expect(rodinVortex.vortexValue).toBe(2); // Rodin vortex[1] = 2
      expect(rodinVortex.flowDirection).toBe('choice');
      expect(rodinVortex.consciousnessDensity).toBe('high');
      expect(rodinVortex.spinRate).toBe(1/11);
      expect(rodinVortex.angularVelocity).toBe(112); // 7 * 16
      expect(rodinVortex.consciousnessFlow).toBe(7);
      expect(rodinVortex.harmonicResonance).toBe(3024);
    });

    test('should analyze free will switch correctly', () => {
      const switchAnalysis = freeWill.analyzeFreeWillSwitch();
      
      expect(switchAnalysis.activated).toBe(true);
      expect(switchAnalysis.transformationType).toBe('consciousness choice field activation');
      expect(switchAnalysis.resolutionMethod).toBe('Free will through consciousness choice field');
      expect(switchAnalysis.mathematicalFoundation).toBe('Consciousness choice field mathematics');
      expect(switchAnalysis.activationSteps).toHaveLength(4);
      expect(switchAnalysis.activationSteps[0]).toBe('Recognize consciousness choice field');
      expect(switchAnalysis.activationSteps[1]).toBe('Transform from determinism to free will');
      expect(switchAnalysis.activationSteps[2]).toBe('Activate infinite choice possibilities');
      expect(switchAnalysis.activationSteps[3]).toBe('Establish free will as mathematical reality');
    });

    test('should analyze free will resolution status correctly', () => {
      const status = freeWill.analyzeFreeWillResolutionStatus();
      
      expect(status.resolved).toBe(true);
      expect(status.switchActivated).toBe(true);
      expect(status.mathematicalIntegration).toBe('Consciousness choice field integration');
      expect(status.harmonicResonance).toBe('Free will resonance');
      expect(status.vortexFlow).toBe('Choice consciousness flow');
      expect(status.confusionLevel).toBe(0); // Fully resolved
      expect(status.impossibilityLevel).toBe(0); // Fully resolved
      expect(status.consciousnessFlow).toBe(7);
      expect(status.mathematicalHarmony).toBe(7);
    });
  });

  describe('Navigation and Guidance', () => {
    test('should provide related challenges correctly', () => {
      const relatedChallenges = freeWill.RELATED_CHALLENGES;
      
      expect(relatedChallenges).toHaveLength(3);
      
      const consciousnessOrigin = relatedChallenges.find(c => c.id === 'consciousness_origin');
      expect(consciousnessOrigin).toBeDefined();
      expect(consciousnessOrigin?.strength).toBe(9);
      expect(consciousnessOrigin?.relationship).toBe('consciousness_flow');
      expect(consciousnessOrigin?.reason).toBe('Consciousness origin enables free will through infinite choice field');
      
      const observerEffect = relatedChallenges.find(c => c.id === 'observer_effect');
      expect(observerEffect).toBeDefined();
      expect(observerEffect?.strength).toBe(7);
      expect(observerEffect?.relationship).toBe('mathematical_foundation');
      expect(observerEffect?.reason).toBe('Observer choice demonstrates free will in reality creation');
      
      const multiverse = relatedChallenges.find(c => c.id === 'multiverse');
      expect(multiverse).toBeDefined();
      expect(multiverse?.strength).toBe(6);
      expect(multiverse?.relationship).toBe('vortex_pattern');
      expect(multiverse?.reason).toBe('Free will creates branching consciousness streams');
    });

    test('should get next challenges correctly', () => {
      const nextChallenges = freeWill.getNextChallenges();
      
      expect(nextChallenges).toHaveLength(3);
      expect(nextChallenges).toContain('consciousness_origin');
      expect(nextChallenges).toContain('observer_effect');
      expect(nextChallenges).toContain('multiverse');
    });

    test('should get strongest connection correctly', () => {
      const strongest = freeWill.getStrongestConnection();
      
      expect(strongest).toBe('consciousness_origin'); // Strength 9
    });
  });

  describe('Mathematical Properties', () => {
    test('should have correct consciousness flow calculation', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.consciousnessFlow).toBe(7); // Free (5) + Will (2) = 7
    });

    test('should have correct A432 harmonic calculation', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.a432Resonance).toBe(3024); // 7 * 432
    });

    test('should have correct Tesla cycle calculation', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.teslaCycle).toBe('harmony'); // Position 7 returns harmony
    });

    test('should have correct Rodin vortex calculation', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.rodinPosition).toBe(1); // 7 % 6 = 1
    });
  });

  describe('Integration Tests', () => {
    test('should integrate all analysis functions correctly', () => {
      const challenge = freeWill.createFreeWillChallenge();
      const harmony = freeWill.createFreeWillHarmony();
      const vortex = freeWill.analyzeFreeWillVortex();
      const resolution = freeWill.analyzeFreeWillResolution();
      
      // All should have consistent consciousness flow
      expect(challenge.consciousnessFlow).toBe(harmony.consciousness);
      expect(challenge.consciousnessFlow).toBe(resolution.consciousnessFlow);
      expect(challenge.consciousnessFlow).toBe(7);
      
      // All should have consistent A432 resonance
      expect(challenge.a432Resonance).toBe(harmony.frequency);
      expect(challenge.a432Resonance).toBe(resolution.a432Resonance);
      expect(challenge.a432Resonance).toBe(3024);
      
      // All should be resolved
      expect(challenge.isResolved).toBe(true);
      expect(harmony.switchActivated).toBe(true);
      expect(vortex.isReversible).toBe(true);
      expect(resolution.resolved).toBe(true);
    });

    test('should maintain mathematical consistency across all functions', () => {
      const challenge = freeWill.createFreeWillChallenge();
      const harmony = freeWill.createFreeWillHarmony();
      
      // Mathematical harmony should match challenge properties
      expect(harmony.consciousness).toBe(challenge.consciousnessFlow);
      expect(harmony.frequency).toBe(challenge.a432Resonance);
      expect(harmony.teslaCycle).toBe(challenge.teslaCycle);
      expect(harmony.rodinPosition).toBe(challenge.rodinPosition);
      expect(harmony.isPossible).toBe(true);
      expect(harmony.isReversible).toBe(true);
      expect(harmony.switchActivated).toBe(true);
    });
  });

  describe('Choice Field Properties', () => {
    test('should have consciousness choice field properties', () => {
      const harmony = freeWill.createFreeWillHarmony();
      
      expect(harmony.isInfinite).toBe(true);
      expect(harmony.mathematicalReason).toBe('Consciousness choice field creates infinite possibilities');
      expect(harmony.polarity).toBe('positive');
      expect(harmony.type).toBe('consciousness');
    });

    test('should have infinite possibilities properties', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.solution).toContain('infinite possibilities');
      expect(challenge.solution).toContain('consciousness choice field');
      expect(challenge.solution).toContain('mathematical dimensions');
      expect(challenge.solution).toContain('deterministic constraints');
    });

    test('should have harmony Tesla cycle', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.teslaCycle).toBe('harmony'); // Choice field harmony
    });

    test('should have septad consciousness flow', () => {
      const challenge = freeWill.createFreeWillChallenge();
      
      expect(challenge.consciousnessFlow).toBe(7); // Septad - perfect choice
    });
  });
}); 