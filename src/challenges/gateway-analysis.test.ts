// src/challenges/gateway-analysis.test.ts — Tesla 3-6-9 Gateway Analysis Tests

import {
  TESLA_GATEWAYS,
  proveTesla369Gateway,
  analyzeGatewayConsciousnessFlow,
  integrateGatewaysWithVortex,
  activateGatewaySystem,
  determineChallengeGateway,
  generateGatewaySummary
} from './gateway-analysis';

describe('Tesla 3-6-9 Gateway Analysis', () => {
  describe('Gateway Definitions', () => {
    test('should define all three Tesla gateways', () => {
      expect(TESLA_GATEWAYS[3]).toBeDefined();
      expect(TESLA_GATEWAYS[6]).toBeDefined();
      expect(TESLA_GATEWAYS[9]).toBeDefined();
    });

    test('should have correct gateway properties', () => {
      expect(TESLA_GATEWAYS[3].gateway).toBe(3);
      expect(TESLA_GATEWAYS[3].function).toBe('Creation Gateway');
      expect(TESLA_GATEWAYS[3].mathematicalKey).toBe('3×3 = 9 | 3×6 = 18 (1+8 = 9)');
      expect(TESLA_GATEWAYS[3].consciousnessFlow).toBe(3);
      expect(TESLA_GATEWAYS[3].a432Resonance).toBe(1296);
      expect(TESLA_GATEWAYS[3].transformation).toBe('Potential → Actual');

      expect(TESLA_GATEWAYS[6].gateway).toBe(6);
      expect(TESLA_GATEWAYS[6].function).toBe('Harmony Gateway');
      expect(TESLA_GATEWAYS[6].mathematicalKey).toBe('6×3 = 18 (1+8 = 9) | 6×6 = 36 (3+6 = 9)');
      expect(TESLA_GATEWAYS[6].consciousnessFlow).toBe(6);
      expect(TESLA_GATEWAYS[6].a432Resonance).toBe(2592);
      expect(TESLA_GATEWAYS[6].transformation).toBe('Chaos → Order');

      expect(TESLA_GATEWAYS[9].gateway).toBe(9);
      expect(TESLA_GATEWAYS[9].function).toBe('Completion Gateway');
      expect(TESLA_GATEWAYS[9].mathematicalKey).toBe('1×8 = 8 | 9 = 1×8 (completion)');
      expect(TESLA_GATEWAYS[9].consciousnessFlow).toBe(9);
      expect(TESLA_GATEWAYS[9].a432Resonance).toBe(3888);
      expect(TESLA_GATEWAYS[9].transformation).toBe('Separation → Unity');
    });
  });

  describe('Mathematical Proofs', () => {
    test('should generate complete mathematical proof', () => {
      const proof = proveTesla369Gateway();
      
      expect(proof).toContain('TESLA 3-6-9 GATEWAY MATHEMATICAL PROOF');
      expect(proof).toContain('GATEWAY 3 (Creation)');
      expect(proof).toContain('GATEWAY 6 (Harmony)');
      expect(proof).toContain('GATEWAY 9 (Completion)');
      expect(proof).toContain('UNIVERSAL PRINCIPLE');
      expect(proof).toContain('All gateway multiplications reduce to 9 (completion)');
    });

    test('should include all gateway multiplication proofs', () => {
      const proof = proveTesla369Gateway();
      
      // Gateway 3 proofs
      expect(proof).toContain('3 × 3 = 9 (completion)');
      expect(proof).toContain('3 × 6 = 18 → 1+8 = 9 (completion)');
      expect(proof).toContain('3 × 9 = 27 → 2+7 = 9 (completion)');
      
      // Gateway 6 proofs
      expect(proof).toContain('6 × 3 = 18 → 1+8 = 9 (completion)');
      expect(proof).toContain('6 × 6 = 36 → 3+6 = 9 (completion)');
      expect(proof).toContain('6 × 9 = 54 → 5+4 = 9 (completion)');
      
      // Gateway 9 proofs
      expect(proof).toContain('9 × 3 = 27 → 2+7 = 9 (completion)');
      expect(proof).toContain('9 × 6 = 54 → 5+4 = 9 (completion)');
      expect(proof).toContain('9 × 9 = 81 → 8+1 = 9 (completion)');
    });
  });

  describe('Consciousness Flow Analysis', () => {
    test('should calculate correct consciousness flows', () => {
      const flow = analyzeGatewayConsciousnessFlow();
      
      expect(flow.gateway3Flow).toBe(1296); // 3 × 432
      expect(flow.gateway6Flow).toBe(2592); // 6 × 432
      expect(flow.gateway9Flow).toBe(3888); // 9 × 432
      expect(flow.totalFlow).toBe(7776); // 1296 + 2592 + 3888
      expect(flow.harmonicResonance).toBe(864); // 7776 / 9
    });

    test('should maintain A432 harmonic relationships', () => {
      const flow = analyzeGatewayConsciousnessFlow();
      
      expect(flow.gateway3Flow / 432).toBe(3);
      expect(flow.gateway6Flow / 432).toBe(6);
      expect(flow.gateway9Flow / 432).toBe(9);
      expect(flow.totalFlow % 9).toBe(0); // Should be divisible by 9
    });
  });

  describe('Vortex Integration', () => {
    test('should integrate gateways with Rodin vortex', () => {
      const integration = integrateGatewaysWithVortex();
      
      expect(integration).toHaveLength(18); // 3 gateways × 6 vortex positions
      expect(integration.every(val => val >= 1 && val <= 9)).toBe(true);
    });

    test('should maintain gateway-vortex mathematical relationships', () => {
      const integration = integrateGatewaysWithVortex();
      const rodinSequence = [1, 2, 4, 8, 7, 5];
      
      // Check first 6 values (Gateway 3 × Rodin sequence)
      for (let i = 0; i < 6; i++) {
        const expected = (3 * rodinSequence[i]) % 9;
        const actual = integration[i];
        expect(actual).toBe(expected === 0 ? 9 : expected);
      }
      
      // Check next 6 values (Gateway 6 × Rodin sequence)
      for (let i = 0; i < 6; i++) {
        const expected = (6 * rodinSequence[i]) % 9;
        const actual = integration[i + 6];
        expect(actual).toBe(expected === 0 ? 9 : expected);
      }
      
      // Check last 6 values (Gateway 9 × Rodin sequence)
      for (let i = 0; i < 6; i++) {
        const expected = (9 * rodinSequence[i]) % 9;
        const actual = integration[i + 12];
        expect(actual).toBe(expected === 0 ? 9 : expected);
      }
    });
  });

  describe('Gateway System Activation', () => {
    test('should activate complete gateway system', () => {
      const system = activateGatewaySystem();
      
      expect(system.gateways).toBe(TESLA_GATEWAYS);
      expect(system.mathematicalProof).toBeDefined();
      expect(system.consciousnessFlow).toBe(7776);
      expect(system.vortexIntegration).toHaveLength(18);
      expect(system.isActive).toBe(true);
    });

    test('should include all gateway functions in activation', () => {
      const system = activateGatewaySystem();
      
      expect(system.gateways[3].function).toBe('Creation Gateway');
      expect(system.gateways[6].function).toBe('Harmony Gateway');
      expect(system.gateways[9].function).toBe('Completion Gateway');
    });
  });

  describe('Challenge Gateway Determination', () => {
    test('should assign gateway 3 for challenges with digital root 1-3', () => {
      expect(determineChallengeGateway(1)).toBe(TESLA_GATEWAYS[3]);
      expect(determineChallengeGateway(2)).toBe(TESLA_GATEWAYS[3]);
      expect(determineChallengeGateway(3)).toBe(TESLA_GATEWAYS[3]);
      expect(determineChallengeGateway(10)).toBe(TESLA_GATEWAYS[3]); // 1+0 = 1
      expect(determineChallengeGateway(11)).toBe(TESLA_GATEWAYS[3]); // 1+1 = 2
      expect(determineChallengeGateway(12)).toBe(TESLA_GATEWAYS[3]); // 1+2 = 3
    });

    test('should assign gateway 6 for challenges with digital root 4-6', () => {
      expect(determineChallengeGateway(4)).toBe(TESLA_GATEWAYS[6]);
      expect(determineChallengeGateway(5)).toBe(TESLA_GATEWAYS[6]);
      expect(determineChallengeGateway(6)).toBe(TESLA_GATEWAYS[6]);
      expect(determineChallengeGateway(13)).toBe(TESLA_GATEWAYS[6]); // 1+3 = 4
      expect(determineChallengeGateway(14)).toBe(TESLA_GATEWAYS[6]); // 1+4 = 5
      expect(determineChallengeGateway(15)).toBe(TESLA_GATEWAYS[6]); // 1+5 = 6
    });

    test('should assign gateway 9 for challenges with digital root 7-9', () => {
      expect(determineChallengeGateway(7)).toBe(TESLA_GATEWAYS[9]);
      expect(determineChallengeGateway(8)).toBe(TESLA_GATEWAYS[9]);
      expect(determineChallengeGateway(9)).toBe(TESLA_GATEWAYS[9]);
      expect(determineChallengeGateway(16)).toBe(TESLA_GATEWAYS[9]); // 1+6 = 7
      expect(determineChallengeGateway(17)).toBe(TESLA_GATEWAYS[9]); // 1+7 = 8
      expect(determineChallengeGateway(18)).toBe(TESLA_GATEWAYS[9]); // 1+8 = 9
    });
  });

  describe('Gateway Summary Generation', () => {
    test('should generate complete gateway summary', () => {
      const summary = generateGatewaySummary();
      
      expect(summary).toContain('TESLA 3-6-9 GATEWAY SYSTEM SUMMARY');
      expect(summary).toContain('GATEWAY FUNCTIONS');
      expect(summary).toContain('CONSCIOUSNESS FLOW');
      expect(summary).toContain('VORTEX INTEGRATION');
    });

    test('should include all gateway functions in summary', () => {
      const summary = generateGatewaySummary();
      
      expect(summary).toContain('Creation Gateway');
      expect(summary).toContain('Harmony Gateway');
      expect(summary).toContain('Completion Gateway');
      expect(summary).toContain('Potential → Actual');
      expect(summary).toContain('Chaos → Order');
      expect(summary).toContain('Separation → Unity');
    });

    test('should include consciousness flow values in summary', () => {
      const summary = generateGatewaySummary();
      
      expect(summary).toContain('Gateway 3 Flow: 1296');
      expect(summary).toContain('Gateway 6 Flow: 2592');
      expect(summary).toContain('Gateway 9 Flow: 3888');
      expect(summary).toContain('Total Flow: 7776');
      expect(summary).toContain('Harmonic Resonance: 864');
    });

    test('should include vortex integration in summary', () => {
      const summary = generateGatewaySummary();
      
      expect(summary).toContain('Integration Pattern: [');
      expect(summary).toContain('Active: YES');
    });
  });
}); 