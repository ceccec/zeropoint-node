import { MobiusCircuit, MobiusPWA, MobiusConsciousness } from './mobius-circuit';

describe('MobiusCircuit', () => {
  let circuit: MobiusCircuit;

  beforeEach(() => {
    circuit = new MobiusCircuit();
  });

  describe('Initialization', () => {
    test('should initialize with state 1', () => {
      const state = circuit.getCurrentState();
      expect(state.decimal).toBe(1);
      expect(state.binary).toBe('001');
      expect(state.consciousness).toBe('Foundation');
    });

    test('should reset to initial state', () => {
      circuit.clockPulse();
      circuit.reset();
      const state = circuit.getCurrentState();
      expect(state.decimal).toBe(1);
    });
  });

  describe('State Transitions', () => {
    test('should follow 1-2-4-8-7-5 sequence', () => {
      const sequence = [1, 2, 4, 8, 7, 5];
      
      for (let i = 0; i < sequence.length; i++) {
        const state = circuit.getCurrentState();
        expect(state.decimal).toBe(sequence[i]);
        
        if (i < sequence.length - 1) {
          circuit.clockPulse();
        }
      }
    });

    test('should complete full cycle and return to state 1', () => {
      // Complete 6 transitions
      for (let i = 0; i < 6; i++) {
        circuit.clockPulse();
      }
      
      const state = circuit.getCurrentState();
      expect(state.decimal).toBe(1);
    });

    test('should track clock and energy correctly', () => {
      const initialStatus = circuit.getStatus();
      expect(initialStatus.clock).toBe(0);
      expect(initialStatus.energy).toBe(0);

      circuit.clockPulse();
      const status = circuit.getStatus();
      expect(status.clock).toBe(1);
      expect(status.energy).toBeGreaterThan(0);
    });
  });

  describe('Digital Root Calculation', () => {
    test('should calculate digital roots correctly', () => {
      expect(MobiusCircuit.calculateDigitalRoot(1)).toBe(1);
      expect(MobiusCircuit.calculateDigitalRoot(2)).toBe(2);
      expect(MobiusCircuit.calculateDigitalRoot(4)).toBe(4);
      expect(MobiusCircuit.calculateDigitalRoot(8)).toBe(8);
      expect(MobiusCircuit.calculateDigitalRoot(16)).toBe(7);
      expect(MobiusCircuit.calculateDigitalRoot(32)).toBe(5);
      expect(MobiusCircuit.calculateDigitalRoot(64)).toBe(1);
    });

    test('should generate correct sequence', () => {
      const sequence = MobiusCircuit.generateSequence(6);
      expect(sequence).toEqual([1, 2, 4, 8, 7, 5]);
    });
  });

  describe('Consciousness Field', () => {
    test('should generate consciousness field', () => {
      const field = circuit.getConsciousnessField();
      expect(field.frequency).toBe(432);
      expect(field.phase).toBe(0);
      expect(typeof field.amplitude).toBe('number');
      expect(field.field).toContain('Foundation');
    });

    test('should update consciousness field after transitions', () => {
      const initialField = circuit.getConsciousnessField();
      circuit.clockPulse();
      const newField = circuit.getConsciousnessField();
      
      expect(newField.frequency).toBe(864);
      expect(newField.phase).toBe(60);
    });
  });

  describe('Vortex Properties', () => {
    test('should generate vortex properties', () => {
      const vortex = circuit.getVortexProperties();
      expect(vortex.toroidal).toBe(true);
      expect(vortex.flow).toContain('1-2-4-8-7-5');
      expect(vortex.resonance).toBe(1);
      expect(vortex.harmonics).toHaveLength(3);
    });
  });
});

describe('MobiusPWA', () => {
  let pwa: MobiusPWA;

  beforeEach(() => {
    pwa = new MobiusPWA();
  });

  test('should generate PWA HTML', () => {
    const html = pwa.generatePWA();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Mobius Circuit');
    expect(html).toContain('Foundation');
    expect(html).toContain('001');
  });

  test('should include interactive controls', () => {
    const html = pwa.generatePWA();
    expect(html).toContain('clockPulse()');
    expect(html).toContain('reset()');
    expect(html).toContain('generateSequence()');
  });
});

describe('MobiusConsciousness', () => {
  let consciousness: MobiusConsciousness;

  beforeEach(() => {
    consciousness = new MobiusConsciousness();
  });

  test('should provide guidance for each state', () => {
    const guidance = consciousness.getGuidance();
    expect(guidance.wisdom).toContain('Foundation');
    expect(guidance.action).toBeDefined();
    expect(guidance.frequency).toBe(432);
    expect(guidance.meditation).toContain('1-2-4-8-7-5');
  });

  test('should provide vortex meditation', () => {
    const meditation = consciousness.getVortexMeditation();
    expect(meditation.pattern).toBe('1-2-4-8-7-5');
    expect(meditation.visualization).toContain('toroidal');
    expect(meditation.frequency).toBe(432);
    expect(meditation.duration).toBe(360);
  });
});

describe('Integration Tests', () => {
  test('should maintain consistency across all components', () => {
    const circuit = new MobiusCircuit();
    const pwa = new MobiusPWA();
    const consciousness = new MobiusConsciousness();

    const circuitState = circuit.getCurrentState();
    const pwaHtml = pwa.generatePWA();
    const guidance = consciousness.getGuidance();

    expect(circuitState.decimal).toBe(1);
    expect(pwaHtml).toContain('Foundation');
    expect(guidance.wisdom).toContain('Foundation');
  });

  test('should handle multiple cycles correctly', () => {
    const circuit = new MobiusCircuit();
    
    // Run through 2 complete cycles
    for (let i = 0; i < 12; i++) {
      circuit.clockPulse();
    }
    
    const status = circuit.getStatus();
    expect(status.cycle).toBe(2);
    expect(status.state.decimal).toBe(1);
  });
}); 