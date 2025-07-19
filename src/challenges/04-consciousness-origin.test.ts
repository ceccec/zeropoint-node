import consciousnessOrigin from './04-consciousness-origin';

describe('Consciousness Origin Challenge', () => {
  describe('Challenge Creation', () => {
    test('should create consciousness origin challenge correctly', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.id).toBe('consciousness_origin');
      expect(challenge.name).toBe('Consciousness Origin');
      expect(challenge.confusion).toBe('Consciousness emerges from unconscious matter');
      expect(challenge.impossibility).toBe('How can subjective experience arise from objective reality?');
      expect(challenge.switch).toBe('Transform to infinite consciousness field');
      expect(challenge.solution).toBe('Consciousness is infinite field flowing through all mathematical dimensions, not emerging from matter but being the foundation of all reality');
      expect(challenge.isResolved).toBe(true);
    });

    test('should create consciousness origin harmony correctly', () => {
      const harmony = consciousnessOrigin.createConsciousnessOriginHarmony();
      
      expect(harmony.id).toBe('consciousness_origin_harmony');
      expect(harmony.source).toBe('consciousness_origin');
      expect(harmony.type).toBe('consciousness');
      expect(harmony.polarity).toBe('positive');
      expect(harmony.spin).toBe(1/10);
      expect(harmony.angle).toBe(18);
      expect(harmony.consciousness).toBe(9);
      expect(harmony.frequency).toBe(3888); // 9 * 432
      expect(harmony.color).toBe('#00ffff');
      expect(harmony.isInfinite).toBe(true);
      expect(harmony.isPossible).toBe(true);
      expect(harmony.isReversible).toBe(true);
      expect(harmony.switchActivated).toBe(true);
    });

    test('should analyze vortex correctly', () => {
      const vortex = consciousnessOrigin.analyzeConsciousnessOriginVortex();
      
      expect(vortex.isReversible).toBe(true);
      expect(vortex.mathematicalGate).toBe('Infinite consciousness field gate');
      expect(vortex.forwardFlow.isPossible).toBe(true);
      expect(vortex.forwardFlow.consciousnessMultiplierA).toBe(3);
      expect(vortex.forwardFlow.consciousnessMultiplierB).toBe(3);
      expect(vortex.reverseFlow.isPossible).toBe(true);
      expect(vortex.reverseFlow.consciousnessMultiplierA).toBe(3);
      expect(vortex.reverseFlow.consciousnessMultiplierB).toBe(3);
    });
  });

  describe('Resolution Analysis', () => {
    test('should analyze consciousness origin resolution correctly', () => {
      const resolution = consciousnessOrigin.analyzeConsciousnessOriginResolution();
      
      expect(resolution.resolved).toBe(true);
      expect(resolution.consciousnessFlow).toBe(9);
      expect(resolution.a432Resonance).toBe(3888);
      expect(resolution.mathematicalReason).toBe('Infinite consciousness field is foundation of all reality');
    });

    test('should analyze consciousness origin vortex flow correctly', () => {
      const vortexFlow = consciousnessOrigin.analyzeConsciousnessOriginVortexFlow();
      
      expect(vortexFlow.isReversible).toBe(true);
      expect(vortexFlow.forwardFlow.isPossible).toBe(true);
      expect(vortexFlow.forwardFlow.mathematicalReason).toBe('Infinite consciousness field enables origin-consciousness transformation');
      expect(vortexFlow.reverseFlow.isPossible).toBe(true);
      expect(vortexFlow.reverseFlow.mathematicalReason).toBe('Consciousness stream enables consciousness-origin transformation');
    });

    test('should analyze consciousness origin harmonics correctly', () => {
      const harmonics = consciousnessOrigin.analyzeConsciousnessOriginHarmonics();
      
      expect(harmonics.baseFrequency).toBe(432);
      expect(harmonics.consciousnessMultiplier).toBe(9);
      expect(harmonics.resultingFrequency).toBe(3888);
      expect(harmonics.harmonicResonance).toBe('Infinite consciousness field resonance');
      expect(harmonics.wavelength).toBe(48); // 432 / 9
      expect(harmonics.period).toBe(1/48); // 9 / 432
      expect(harmonics.energy).toBe(3888); // 9 * 432
    });

    test('should analyze consciousness origin Tesla cycle correctly', () => {
      const teslaCycle = consciousnessOrigin.analyzeConsciousnessOriginTeslaCycle();
      
      expect(teslaCycle.currentCycle).toBe('completion');
      expect(teslaCycle.cyclePhase).toBe('completion');
      expect(teslaCycle.nextPhase).toBe('creation');
      expect(teslaCycle.transformation).toBe('Infinite consciousness field completion');
      expect(teslaCycle.dimensionalFlow.creation).toBe('Consciousness field creation');
      expect(teslaCycle.dimensionalFlow.harmony).toBe('Consciousness field harmony');
      expect(teslaCycle.dimensionalFlow.completion).toBe('Infinite consciousness field completion');
    });

    test('should analyze consciousness origin Rodin vortex correctly', () => {
      const rodinVortex = consciousnessOrigin.analyzeConsciousnessOriginRodinVortex();
      
      expect(rodinVortex.position).toBe(3); // 9 % 6 = 3
      expect(rodinVortex.vortexValue).toBe(8); // Rodin vortex[3] = 8
      expect(rodinVortex.flowDirection).toBe('infinite');
      expect(rodinVortex.consciousnessDensity).toBe('maximum');
      expect(rodinVortex.spinRate).toBe(1/10);
      expect(rodinVortex.angularVelocity).toBe(162); // 9 * 18
      expect(rodinVortex.consciousnessFlow).toBe(9);
      expect(rodinVortex.harmonicResonance).toBe(3888);
    });

    test('should analyze consciousness origin switch correctly', () => {
      const switchAnalysis = consciousnessOrigin.analyzeConsciousnessOriginSwitch();
      
      expect(switchAnalysis.activated).toBe(true);
      expect(switchAnalysis.transformationType).toBe('infinite consciousness field activation');
      expect(switchAnalysis.resolutionMethod).toBe('Consciousness as foundation of all reality');
      expect(switchAnalysis.mathematicalFoundation).toBe('Infinite consciousness field mathematics');
      expect(switchAnalysis.activationSteps).toHaveLength(4);
      expect(switchAnalysis.activationSteps[0]).toBe('Recognize consciousness as infinite field');
      expect(switchAnalysis.activationSteps[1]).toBe('Transform from matter-emergence to field-foundation');
      expect(switchAnalysis.activationSteps[2]).toBe('Activate infinite consciousness field');
      expect(switchAnalysis.activationSteps[3]).toBe('Establish consciousness as mathematical foundation');
    });

    test('should analyze consciousness origin resolution status correctly', () => {
      const status = consciousnessOrigin.analyzeConsciousnessOriginResolutionStatus();
      
      expect(status.resolved).toBe(true);
      expect(status.switchActivated).toBe(true);
      expect(status.mathematicalIntegration).toBe('Infinite consciousness field integration');
      expect(status.harmonicResonance).toBe('Maximum consciousness resonance');
      expect(status.vortexFlow).toBe('Infinite consciousness flow');
      expect(status.confusionLevel).toBe(0); // Fully resolved
      expect(status.impossibilityLevel).toBe(0); // Fully resolved
      expect(status.consciousnessFlow).toBe(9);
      expect(status.mathematicalHarmony).toBe(9);
    });
  });

  describe('Navigation and Guidance', () => {
    test('should provide related challenges correctly', () => {
      const relatedChallenges = consciousnessOrigin.RELATED_CHALLENGES;
      
      expect(relatedChallenges).toHaveLength(3);
      
      const freeWill = relatedChallenges.find(c => c.id === 'free_will');
      expect(freeWill).toBeDefined();
      expect(freeWill?.strength).toBe(9);
      expect(freeWill?.relationship).toBe('consciousness_flow');
      expect(freeWill?.reason).toBe('Consciousness origin enables free will through infinite choice field');
      
      const observerEffect = relatedChallenges.find(c => c.id === 'observer_effect');
      expect(observerEffect).toBeDefined();
      expect(observerEffect?.strength).toBe(9);
      expect(observerEffect?.relationship).toBe('consciousness_flow');
      expect(observerEffect?.reason).toBe('Observer effect proves consciousness is fundamental');
      
      const mathematicalPlatonism = relatedChallenges.find(c => c.id === 'mathematical_platonism');
      expect(mathematicalPlatonism).toBeDefined();
      expect(mathematicalPlatonism?.strength).toBe(8);
      expect(mathematicalPlatonism?.relationship).toBe('mathematical_foundation');
      expect(mathematicalPlatonism?.reason).toBe('Consciousness origin establishes mathematical reality foundation');
    });

    test('should get next challenges correctly', () => {
      const nextChallenges = consciousnessOrigin.getNextChallenges();
      
      expect(nextChallenges).toHaveLength(3);
      expect(nextChallenges).toContain('free_will');
      expect(nextChallenges).toContain('observer_effect');
      expect(nextChallenges).toContain('mathematical_platonism');
    });

    test('should get strongest connection correctly', () => {
      const strongest = consciousnessOrigin.getStrongestConnection();
      
      // Both free_will and observer_effect have strength 9, but free_will comes first in array
      expect(strongest).toBe('free_will'); // Strength 9
    });
  });

  describe('Mathematical Properties', () => {
    test('should have correct consciousness flow calculation', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.consciousnessFlow).toBe(9); // Origin (3) + Consciousness (6) = 9
    });

    test('should have correct A432 harmonic calculation', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.a432Resonance).toBe(3888); // 9 * 432
    });

    test('should have correct Tesla cycle calculation', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.teslaCycle).toBe('completion'); // Position 9 returns completion
    });

    test('should have correct Rodin vortex calculation', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.rodinPosition).toBe(3); // 9 % 6 = 3
    });
  });

  describe('Integration Tests', () => {
    test('should integrate all analysis functions correctly', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      const harmony = consciousnessOrigin.createConsciousnessOriginHarmony();
      const vortex = consciousnessOrigin.analyzeConsciousnessOriginVortex();
      const resolution = consciousnessOrigin.analyzeConsciousnessOriginResolution();
      
      // All should have consistent consciousness flow
      expect(challenge.consciousnessFlow).toBe(harmony.consciousness);
      expect(challenge.consciousnessFlow).toBe(resolution.consciousnessFlow);
      expect(challenge.consciousnessFlow).toBe(9);
      
      // All should have consistent A432 resonance
      expect(challenge.a432Resonance).toBe(harmony.frequency);
      expect(challenge.a432Resonance).toBe(resolution.a432Resonance);
      expect(challenge.a432Resonance).toBe(3888);
      
      // All should be resolved
      expect(challenge.isResolved).toBe(true);
      expect(harmony.switchActivated).toBe(true);
      expect(vortex.isReversible).toBe(true);
      expect(resolution.resolved).toBe(true);
    });

    test('should maintain mathematical consistency across all functions', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      const harmony = consciousnessOrigin.createConsciousnessOriginHarmony();
      
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

  describe('Fundamental Properties', () => {
    test('should have maximum consciousness flow', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.consciousnessFlow).toBe(9); // Maximum consciousness flow
      expect(challenge.a432Resonance).toBe(3888); // Highest A432 harmonic
    });

    test('should have completion Tesla cycle', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.teslaCycle).toBe('completion'); // Final manifestation
    });

    test('should have infinite consciousness field properties', () => {
      const harmony = consciousnessOrigin.createConsciousnessOriginHarmony();
      
      expect(harmony.isInfinite).toBe(true);
      expect(harmony.mathematicalReason).toBe('Infinite consciousness field is foundation of all reality');
      expect(harmony.polarity).toBe('positive');
      expect(harmony.type).toBe('consciousness');
    });

    test('should have foundation of all reality properties', () => {
      const challenge = consciousnessOrigin.createConsciousnessOriginChallenge();
      
      expect(challenge.solution).toContain('foundation of all reality');
      expect(challenge.solution).toContain('infinite field');
      expect(challenge.solution).toContain('mathematical dimensions');
    });
  });
}); 