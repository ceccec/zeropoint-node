/**
 * Circuit-Digit Interaction Tests
 * 
 * Tests that the Mobius circuit (0/0) and Rodin coil circuit (1/1)
 * can operate simultaneously without collision.
 */

import { CircuitDigitInteraction } from './CircuitDigitInteraction';

describe('CircuitDigitInteraction', () => {
  let interaction: CircuitDigitInteraction;

  beforeEach(() => {
    interaction = new CircuitDigitInteraction();
  });

  describe('Simultaneous Circuit Operation', () => {
    test('should validate that circuits operate simultaneously without collision', () => {
      const result = interaction.validateSimultaneousOperation();
      
      expect(result.isSimultaneous).toBe(true);
      expect(result.collisionPoints).toHaveLength(0);
      expect(result.breathingParadoxActive).toBe(true);
      expect(result.vortexFlowActive).toBe(true);
      expect(result.spiritualFlowActive).toBe(true);
      expect(result.stabilityScore).toBeGreaterThanOrEqual(0.95);
    });

    test('should demonstrate breathing paradox cycle', () => {
      const cycle = interaction.getBreathingParadoxCycle();
      
      expect(cycle.inhale).toEqual(['0']);
      expect(cycle.exhale).toEqual(['0', '1', '2', '4', '8', '7', '5', '1']);
      expect(cycle.spiritual).toEqual(['3', '6', '9', '3']);
    });

    test('should show circuit field distribution for each digit', () => {
      // Test void center (0) - Mobius only
      const digit0 = interaction.getDigitCircuitFields('0');
      expect(digit0?.mobiusField).toBe(1.0);
      expect(digit0?.rodinField).toBe(0.0);
      expect(digit0?.wAxisField).toBe(0.0);

      // Test unity (1) - Rodin primary
      const digit1 = interaction.getDigitCircuitFields('1');
      expect(digit1?.mobiusField).toBe(0.0);
      expect(digit1?.rodinField).toBe(1.0);
      expect(digit1?.wAxisField).toBe(0.0);

      // Test creation spirit (3) - W-Axis primary
      const digit3 = interaction.getDigitCircuitFields('3');
      expect(digit3?.mobiusField).toBe(0.0);
      expect(digit3?.rodinField).toBe(0.0);
      expect(digit3?.wAxisField).toBe(1.5);
    });

    test('should validate no collisions between circuits', () => {
      const result = interaction.validateSimultaneousOperation();
      
      // No digit should have both Rodin and W-Axis fields active simultaneously
      // (except 0, which can have Mobius field)
      expect(result.collisionPoints).toHaveLength(0);
    });
  });

  describe('Circuit Interactions', () => {
    test('should have breathing paradox interactions', () => {
      const breathingInteractions = interaction.getDigitInteractions('0').filter(i => 
        i.interactionType === 'breathing'
      );
      
      expect(breathingInteractions).toHaveLength(2);
      
      const hasZeroToOne = breathingInteractions.some(i => 
        i.fromDigit === '0' && i.toDigit === '1'
      );
      const hasOneToZero = breathingInteractions.some(i => 
        i.fromDigit === '1' && i.toDigit === '0'
      );
      
      expect(hasZeroToOne).toBe(true);
      expect(hasOneToZero).toBe(true);
    });

    test('should have complete Rodin vortex flow', () => {
      const rodinSequence = ['1', '2', '4', '8', '7', '5'];
      
      for (let i = 0; i < rodinSequence.length; i++) {
        const from = rodinSequence[i];
        const to = rodinSequence[(i + 1) % rodinSequence.length];
        
        const hasInteraction = interaction.getDigitInteractions(from).some(i => 
          i.toDigit === to && i.interactionType === 'vortex'
        );
        
        expect(hasInteraction).toBe(true);
      }
    });

    test('should have complete W-Axis spiritual flow', () => {
      const wAxisSequence = ['3', '6', '9'];
      
      for (let i = 0; i < wAxisSequence.length; i++) {
        const from = wAxisSequence[i];
        const to = wAxisSequence[(i + 1) % wAxisSequence.length];
        
        const hasInteraction = interaction.getDigitInteractions(from).some(i => 
          i.toDigit === to && i.interactionType === 'spiritual'
        );
        
        expect(hasInteraction).toBe(true);
      }
    });
  });

  describe('Demonstration', () => {
    test('should provide comprehensive demonstration output', () => {
      const demonstration = interaction.demonstrateSimultaneousOperation();
      
      expect(demonstration).toContain('🌌 Circuit-Digit Interaction Demonstration');
      expect(demonstration).toContain('✅ Breathing Paradox Active: true');
      expect(demonstration).toContain('✅ Vortex Flow Active: true');
      expect(demonstration).toContain('✅ Spiritual Flow Active: true');
      expect(demonstration).toContain('✅ No Collisions: true');
      expect(demonstration).toContain('✅ Simultaneous Operation: PROVEN');
      
      console.log('\n' + demonstration);
    });
  });

  describe('Metaphysical Validation', () => {
    test('should validate that Mobius provides the field and Rodin provides the structure', () => {
      const digit0 = interaction.getDigitCircuitFields('0');
      const digit1 = interaction.getDigitCircuitFields('1');
      
      // Mobius (0) provides the field (pure potential)
      expect(digit0?.mobiusField).toBe(1.0);
      expect(digit0?.rodinField).toBe(0.0);
      
      // Rodin (1) provides the structure (manifested consciousness)
      expect(digit1?.mobiusField).toBe(0.0);
      expect(digit1?.rodinField).toBe(1.0);
    });

    test('should validate that W-Axis provides spiritual harmonics', () => {
      const digit3 = interaction.getDigitCircuitFields('3');
      const digit6 = interaction.getDigitCircuitFields('6');
      const digit9 = interaction.getDigitCircuitFields('9');
      
      // W-Axis digits have spiritual field strength
      expect(digit3?.wAxisField).toBe(1.5);
      expect(digit6?.wAxisField).toBe(1.5);
      expect(digit9?.wAxisField).toBe(1.5);
    });

    test('should validate breathing paradox as fundamental mechanism', () => {
      const result = interaction.validateSimultaneousOperation();
      
      // Breathing paradox must be active for simultaneous operation
      expect(result.breathingParadoxActive).toBe(true);
      
      // Both Mobius and Rodin circuits must be active
      expect(result.vortexFlowActive).toBe(true);
      
      // No collisions between circuits
      expect(result.collisionPoints).toHaveLength(0);
    });
  });
}); 