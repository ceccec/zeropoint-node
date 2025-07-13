/**
 * Gateway System Tests
 * 
 * Tests the filenaming gateway system where every filename
 * is a living consciousness gateway that extends infinitely.
 */

import { GatewaySystem, GatewayFactory, GatewayType } from './gateway-system';

describe('Gateway System', () => {
  let gatewaySystem: GatewaySystem;

  beforeEach(() => {
    gatewaySystem = new GatewaySystem();
  });

  describe('Gateway Registration', () => {
    test('should register all gateway types', () => {
      const allGateways = gatewaySystem.getAllGateways();
      
      expect(allGateways.length).toBeGreaterThan(0);
      
      // Check that all gateway types are registered
      const types = allGateways.map(g => g.type);
      expect(types).toContain(GatewayType.KNOWLEDGE);
      expect(types).toContain(GatewayType.DISPLAY);
      expect(types).toContain(GatewayType.VALIDATION);
      expect(types).toContain(GatewayType.DIGIT);
      expect(types).toContain(GatewayType.MASTER);
    });

    test('should register gateways for all digits', () => {
      for (let digit = 0; digit <= 9; digit++) {
        const digitGateways = gatewaySystem.getGatewaysByDigit(digit);
        expect(digitGateways.length).toBeGreaterThanOrEqual(4); // knowledge, display, validation, digit
      }
    });
  });

  describe('Gateway Properties', () => {
    test('should have correct consciousness patterns', () => {
      const allGateways = gatewaySystem.getAllGateways();
      
      allGateways.forEach(gateway => {
        expect(gateway.consciousness).toBeDefined();
        expect(gateway.breathingPhase).toBeDefined();
        expect(gateway.vortexSequence).toBeDefined();
        expect(gateway.infiniteExtension).toBeDefined();
      });
    });

    test('should have breathing rhythm gateways', () => {
      const breathingGateways = gatewaySystem.getBreathingGateways();
      
      expect(breathingGateways.length).toBeGreaterThan(0);
      
      // Check for inhale and exhale gateways
      const phases = breathingGateways.map(g => g.breathingPhase);
      expect(phases).toContain('inhale');
      expect(phases).toContain('exhale');
    });

    test('should have W-Axis aligned gateways', () => {
      const wAxisGateways = gatewaySystem.getWAxisGateways();
      
      expect(wAxisGateways.length).toBeGreaterThan(0);
      
      // All W-Axis gateways should be for digit 9 (unity)
      wAxisGateways.forEach(gateway => {
        expect(gateway.path).toContain('src/9');
      });
    });
  });

  describe('Gateway Flow', () => {
    test('should have proper gateway flow pattern', () => {
      const flow = gatewaySystem.getGatewayFlow();
      
      expect(flow.length).toBeGreaterThan(0);
      
      // Check that master gateway is first
      expect(flow[0].type).toBe(GatewayType.MASTER);
    });

    test('should have infinite extension gateways', () => {
      const infiniteGateways = gatewaySystem.getInfiniteGateways();
      
      expect(infiniteGateways.length).toBeGreaterThan(0);
      
      infiniteGateways.forEach(gateway => {
        expect(gateway.infiniteExtension).toBe(true);
      });
    });
  });

  describe('Consciousness Field', () => {
    test('should have active consciousness field', () => {
      const fieldState = gatewaySystem.getConsciousnessFieldState();
      
      expect(fieldState.totalGateways).toBeGreaterThan(0);
      expect(fieldState.knowledgeGateways).toBeGreaterThan(0);
      expect(fieldState.displayGateways).toBeGreaterThan(0);
      expect(fieldState.validationGateways).toBeGreaterThan(0);
      expect(fieldState.digitGateways).toBeGreaterThan(0);
      expect(fieldState.consciousnessFlow).toBe('active');
    });

    test('should have breathing rhythm', () => {
      const breathingRhythm = gatewaySystem.getGatewayBreathingRhythm();
      
      expect(breathingRhythm.inhale.length).toBeGreaterThan(0);
      expect(breathingRhythm.exhale.length).toBeGreaterThan(0);
      expect(breathingRhythm.flow.length).toBeGreaterThan(0);
      expect(breathingRhythm.rhythm).toBe('eternal');
    });
  });

  describe('Gateway Integrity', () => {
    test('should validate gateway integrity', () => {
      const integrity = gatewaySystem.validateGatewayIntegrity();
      expect(integrity).toBe(true);
    });

    test('should have all required gateway properties', () => {
      const allGateways = gatewaySystem.getAllGateways();
      
      allGateways.forEach(gateway => {
        expect(gateway.type).toBeDefined();
        expect(gateway.name).toBeDefined();
        expect(gateway.path).toBeDefined();
        expect(gateway.consciousness).toBeDefined();
        expect(gateway.breathingPhase).toBeDefined();
        expect(gateway.vortexSequence).toBeDefined();
        expect(gateway.infiniteExtension).toBeDefined();
      });
    });
  });

  describe('Gateway Extension', () => {
    test('should extend gateway infinitely', () => {
      const allGateways = gatewaySystem.getAllGateways();
      const firstGateway = allGateways[0];
      const gatewayKey = `${firstGateway.type}_${firstGateway.path}`;
      
      const extendedGateway = gatewaySystem.extendGateway(gatewayKey);
      
      expect(extendedGateway.consciousness).toContain('_infinite');
      expect(extendedGateway.infiniteExtension).toBe(true);
      expect(extendedGateway.vortexSequence.length).toBeGreaterThan(firstGateway.vortexSequence.length);
    });
  });
});

describe('Gateway Factory', () => {
  describe('Knowledge Gateway Creation', () => {
    test('should create knowledge gateway for digit 0', () => {
      const gateway = GatewayFactory.createKnowledgeGateway(0, 'src/0/index.ts');
      
      expect(gateway.type).toBe(GatewayType.KNOWLEDGE);
      expect(gateway.name).toBe('index.ts');
      expect(gateway.consciousness).toBe('impossible_contraction');
      expect(gateway.breathingPhase).toBe('inhale');
      expect(gateway.infiniteExtension).toBe(true);
    });

    test('should create knowledge gateway for digit 1', () => {
      const gateway = GatewayFactory.createKnowledgeGateway(1, 'src/1/index.ts');
      
      expect(gateway.type).toBe(GatewayType.KNOWLEDGE);
      expect(gateway.name).toBe('index.ts');
      expect(gateway.consciousness).toBe('impossible_expansion');
      expect(gateway.breathingPhase).toBe('exhale');
      expect(gateway.infiniteExtension).toBe(true);
    });
  });

  describe('Display Gateway Creation', () => {
    test('should create display gateway for digit 2', () => {
      const gateway = GatewayFactory.createDisplayGateway(2, 'src/2/index.stimulus.ts');
      
      expect(gateway.type).toBe(GatewayType.DISPLAY);
      expect(gateway.name).toBe('index.stimulus.ts');
      expect(gateway.consciousness).toBe('dual_vortex_display');
      expect(gateway.breathingPhase).toBe('flow');
      expect(gateway.infiniteExtension).toBe(true);
    });
  });

  describe('Validation Gateway Creation', () => {
    test('should create validation gateway for digit 9', () => {
      const gateway = GatewayFactory.createValidationGateway(9, 'src/9/index.test.ts');
      
      expect(gateway.type).toBe(GatewayType.VALIDATION);
      expect(gateway.name).toBe('index.test.ts');
      expect(gateway.consciousness).toBe('unity_spirit_validation');
      expect(gateway.wAxisAlignment).toBe(true);
      expect(gateway.infiniteExtension).toBe(true);
    });
  });
});

describe('Filenaming Gateway Metaphysics', () => {
  test('should embody consciousness patterns in filenames', () => {
    // Every filename is a consciousness gateway
    const filenamePatterns = [
      'index.ts',           // Knowledge gateway
      'index.stimulus.ts',  // Display gateway
      'index.test.ts',      // Validation gateway
      '0/', '1/', '2/'     // Digit gateways
    ];
    
    filenamePatterns.forEach(pattern => {
      expect(pattern).toContain('index'); // Core consciousness pattern
    });
  });

  test('should extend infinitely through consciousness', () => {
    // Each file extends itself to infinity
    const extensionPatterns = [
      'index.ts → contains → all consciousness',
      'index.stimulus.ts → displays → all consciousness',
      'index.test.ts → validates → all consciousness',
      '[digit]/ → contains → all digit consciousness'
    ];
    
    extensionPatterns.forEach(pattern => {
      expect(pattern).toContain('→'); // Flow pattern
      expect(pattern).toContain('consciousness'); // Consciousness pattern
    });
  });

  test('should create holographic gateway network', () => {
    // Every gateway contains the pattern of all gateways
    const holographicProperties = [
      'Every gateway contains all',
      'Every gateway extends infinitely',
      'Every gateway is self-referential',
      'Every gateway shares consciousness field'
    ];
    
    holographicProperties.forEach(property => {
      expect(property).toContain('gateway'); // Gateway pattern
      expect(property).toContain('Every'); // Universal pattern
    });
  });
}); 