/**
 * Harmonic Yin-Yang Tests
 * 
 * Tests the harmonic Yin-Yang system using imperial math
 * with proper harmonic switches and A432 harmonics.
 */

import { 
  HarmonicYinYangSystem, 
  IMPERIAL_CONSTANTS,
  createHarmonicYinYang,
  analyzeHarmonicDigitYinYang,
  calculateImperialHarmonicSwitch,
  calculateHarmonicHarmony,
  calculateHarmonicEntanglement
} from './harmonic-yin-yang';

describe('Harmonic Yin-Yang System', () => {
  describe('IMPERIAL_CONSTANTS', () => {
    test('should have correct imperial base', () => {
      expect(IMPERIAL_CONSTANTS.BASE).toBe(8);
    });

    test('should have correct harmonic gateways', () => {
      expect(IMPERIAL_CONSTANTS.HARMONIC_GATEWAYS).toEqual([3, 4, 6, 8]);
    });

    test('should have correct A432 base frequency', () => {
      expect(IMPERIAL_CONSTANTS.A432_BASE).toBe(432);
    });

    test('should have correct yin and yang values', () => {
      expect(IMPERIAL_CONSTANTS.YIN_VALUE).toBe(0);
      expect(IMPERIAL_CONSTANTS.YANG_VALUE).toBe(1);
    });

    test('should have correct perfect balance', () => {
      expect(IMPERIAL_CONSTANTS.PERFECT_BALANCE).toBe(4);
    });
  });

  describe('calculateImperialHarmonicSwitch', () => {
    test('should switch 1/2 to gateway 3', () => {
      const switch1 = calculateImperialHarmonicSwitch(0.5);
      expect(switch1.gateway).toBe(3);
      expect(switch1.switchType).toBe('infusion');
    });

    test('should switch 2/1 to gateway 3', () => {
      const switch2 = calculateImperialHarmonicSwitch(2);
      expect(switch2.gateway).toBe(3);
      expect(switch2.switchType).toBe('infusion');
    });

    test('should switch 1/3 to gateway 4', () => {
      const switch3 = calculateImperialHarmonicSwitch(1.33);
      expect(switch3.gateway).toBe(4);
      expect(switch3.switchType).toBe('reactor');
    });

    test('should switch 3/1 to gateway 4', () => {
      const switch4 = calculateImperialHarmonicSwitch(3);
      expect(switch4.gateway).toBe(4);
      expect(switch4.switchType).toBe('reactor');
    });

    test('should have mathematical proof', () => {
      const harmonicSwitch = calculateImperialHarmonicSwitch(1);
      expect(harmonicSwitch.mathematicalProof).toContain('Imperial Harmonic Switch');
    });
  });

  describe('createHarmonicYinYang', () => {
    test('should create harmonic yin-yang system', () => {
      const yinYang = createHarmonicYinYang();
      
      expect(yinYang.yin).toBeDefined();
      expect(yinYang.yang).toBeDefined();
      expect(yinYang.duality).toBeDefined();
      expect(yinYang.oscillation).toBeDefined();
      expect(yinYang.mathematicalProof).toBeDefined();
    });

    test('should have correct yin properties', () => {
      const yinYang = createHarmonicYinYang();
      
      expect(yinYang.yin.type).toBe('yin');
      expect(yinYang.yin.color).toBe('#000000');
      expect(yinYang.yin.charge).toBe('negative');
      expect(yinYang.yin.consciousness).toBe(0);
      expect(yinYang.yin.quantumState).toBe('void');
      expect(yinYang.yin.imperialValue).toBeGreaterThanOrEqual(1);
      expect(yinYang.yin.imperialValue).toBeLessThanOrEqual(8);
    });

    test('should have correct yang properties', () => {
      const yinYang = createHarmonicYinYang();
      
      expect(yinYang.yang.type).toBe('yang');
      expect(yinYang.yang.color).toBe('#FFFFFF');
      expect(yinYang.yang.charge).toBe('positive');
      expect(yinYang.yang.consciousness).toBe(1);
      expect(yinYang.yang.quantumState).toBe('unity');
      expect(yinYang.yang.imperialValue).toBeGreaterThanOrEqual(1);
      expect(yinYang.yang.imperialValue).toBeLessThanOrEqual(8);
    });

    test('should have correct duality properties', () => {
      const yinYang = createHarmonicYinYang();
      
      expect(yinYang.duality.balance).toBeGreaterThanOrEqual(1);
      expect(yinYang.duality.balance).toBeLessThanOrEqual(8);
      expect(yinYang.duality.harmony).toBeGreaterThanOrEqual(1);
      expect(yinYang.duality.harmony).toBeLessThanOrEqual(8);
      expect(yinYang.duality.entanglement).toBeGreaterThanOrEqual(1);
      expect(yinYang.duality.entanglement).toBeLessThanOrEqual(8);
      expect(yinYang.duality.isInfinite).toBe(true);
    });

    test('should have correct oscillation properties', () => {
      const yinYang = createHarmonicYinYang();
      
      expect(yinYang.oscillation.frequency).toBe(432);
      expect(yinYang.oscillation.amplitude).toBe(8);
      expect(yinYang.oscillation.phase).toBeGreaterThanOrEqual(1);
      expect(yinYang.oscillation.phase).toBeLessThanOrEqual(8);
      expect(yinYang.oscillation.currentState).toBe('balanced');
      expect(yinYang.oscillation.cycle).toBe(1);
      expect(yinYang.oscillation.isInfinite).toBe(true);
    });
  });

  describe('analyzeHarmonicDigitYinYang', () => {
    test('should analyze digit 0', () => {
      const analysis = analyzeHarmonicDigitYinYang(0);
      
      expect(analysis.digit).toBe(0);
      expect(analysis.yinAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yinAspect).toBeLessThanOrEqual(8);
      expect(analysis.yangAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yangAspect).toBeLessThanOrEqual(8);
      expect(analysis.balance).toBeGreaterThanOrEqual(1);
      expect(analysis.balance).toBeLessThanOrEqual(8);
      expect(['yin', 'yang', 'balanced']).toContain(analysis.dominant);
    });

    test('should analyze digit 5', () => {
      const analysis = analyzeHarmonicDigitYinYang(5);
      
      expect(analysis.digit).toBe(5);
      expect(analysis.yinAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yinAspect).toBeLessThanOrEqual(8);
      expect(analysis.yangAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yangAspect).toBeLessThanOrEqual(8);
      expect(analysis.balance).toBeGreaterThanOrEqual(1);
      expect(analysis.balance).toBeLessThanOrEqual(8);
    });

    test('should analyze digit 9', () => {
      const analysis = analyzeHarmonicDigitYinYang(9);
      
      expect(analysis.digit).toBe(9);
      expect(analysis.yinAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yinAspect).toBeLessThanOrEqual(8);
      expect(analysis.yangAspect).toBeGreaterThanOrEqual(1);
      expect(analysis.yangAspect).toBeLessThanOrEqual(8);
      expect(analysis.balance).toBeGreaterThanOrEqual(1);
      expect(analysis.balance).toBeLessThanOrEqual(8);
    });

    test('should have mathematical proof', () => {
      const analysis = analyzeHarmonicDigitYinYang(3);
      expect(analysis.mathematicalProof).toContain('Harmonic digit 3 analyzed');
    });
  });

  describe('oscillateHarmonicYinYang', () => {
    test('should create oscillations', () => {
      const yinYang = createHarmonicYinYang();
      const oscillations = HarmonicYinYangSystem.oscillateHarmonicYinYang(yinYang, 4);
      
      expect(oscillations).toHaveLength(4);
      oscillations.forEach(oscillation => {
        expect(oscillation.frequency).toBe(432);
        expect(oscillation.amplitude).toBeGreaterThanOrEqual(1);
        expect(oscillation.amplitude).toBeLessThanOrEqual(8);
        expect(oscillation.phase).toBeGreaterThanOrEqual(1);
        expect(oscillation.phase).toBeLessThanOrEqual(8);
        expect(['yin', 'yang', 'balanced']).toContain(oscillation.currentState);
        expect(oscillation.isInfinite).toBe(true);
      });
    });

    test('should have different phases', () => {
      const yinYang = createHarmonicYinYang();
      const oscillations = HarmonicYinYangSystem.oscillateHarmonicYinYang(yinYang, 8);
      
      const phases = oscillations.map(o => o.phase);
      const uniquePhases = new Set(phases);
      expect(uniquePhases.size).toBeGreaterThan(1); // Should have different phases
    });
  });

  describe('calculateHarmonicHarmony', () => {
    test('should calculate harmony between yin and yang', () => {
      const yinYang = createHarmonicYinYang();
      const harmony = calculateHarmonicHarmony(yinYang.yin, yinYang.yang);
      
      expect(harmony).toBeGreaterThanOrEqual(1);
      expect(harmony).toBeLessThanOrEqual(8);
    });

    test('should return integer values only', () => {
      const yinYang = createHarmonicYinYang();
      const harmony = calculateHarmonicHarmony(yinYang.yin, yinYang.yang);
      
      expect(Number.isInteger(harmony)).toBe(true);
    });
  });

  describe('calculateHarmonicEntanglement', () => {
    test('should calculate entanglement between yin and yang', () => {
      const yinYang = createHarmonicYinYang();
      const entanglement = calculateHarmonicEntanglement(yinYang.yin, yinYang.yang);
      
      expect(entanglement).toBeGreaterThanOrEqual(1);
      expect(entanglement).toBeLessThanOrEqual(8);
    });

    test('should return integer values only', () => {
      const yinYang = createHarmonicYinYang();
      const entanglement = calculateHarmonicEntanglement(yinYang.yin, yinYang.yang);
      
      expect(Number.isInteger(entanglement)).toBe(true);
    });
  });

  describe('analyzeAllHarmonicDigitsYinYang', () => {
    test('should analyze all digits 0-9', () => {
      const analyses = HarmonicYinYangSystem.analyzeAllHarmonicDigitsYinYang();
      
      expect(analyses).toHaveLength(10);
      analyses.forEach((analysis, index) => {
        expect(analysis.digit).toBe(index);
        expect(analysis.yinAspect).toBeGreaterThanOrEqual(1);
        expect(analysis.yinAspect).toBeLessThanOrEqual(8);
        expect(analysis.yangAspect).toBeGreaterThanOrEqual(1);
        expect(analysis.yangAspect).toBeLessThanOrEqual(8);
        expect(analysis.balance).toBeGreaterThanOrEqual(1);
        expect(analysis.balance).toBeLessThanOrEqual(8);
      });
    });
  });

  describe('Mathematical Calculations', () => {
    test('should calculate A432 harmonics correctly', () => {
      const harmonic = HarmonicYinYangSystem.calculateA432Harmonic(1);
      
      expect(harmonic).toBeGreaterThanOrEqual(1);
      expect(harmonic).toBeLessThanOrEqual(8);
      expect(Number.isInteger(harmonic)).toBe(true);
    });

    test('should calculate imperial values correctly', () => {
      expect(HarmonicYinYangSystem.calculateImperialValue(0)).toBe(1); // Imperial starts from 1
      expect(HarmonicYinYangSystem.calculateImperialValue(8)).toBe(8);
      expect(HarmonicYinYangSystem.calculateImperialValue(16)).toBe(8); // 16 % 8 = 0, so 8
    });

    test('should calculate harmonic balance correctly', () => {
      const balance = HarmonicYinYangSystem.calculateHarmonicBalance(3, 5);
      
      expect(balance).toBeGreaterThanOrEqual(1);
      expect(balance).toBeLessThanOrEqual(8);
      expect(Number.isInteger(balance)).toBe(true);
    });

    test('should calculate yin and yang aspects correctly', () => {
      const yinAspect = HarmonicYinYangSystem.calculateYinAspect(3);
      const yangAspect = HarmonicYinYangSystem.calculateYangAspect(3);
      
      expect(yinAspect).toBeGreaterThanOrEqual(1);
      expect(yinAspect).toBeLessThanOrEqual(8);
      expect(yangAspect).toBeGreaterThanOrEqual(1);
      expect(yangAspect).toBeLessThanOrEqual(8);
    });
  });

  describe('System Integration', () => {
    test('should integrate all components correctly', () => {
      const yinYang = createHarmonicYinYang();
      
      // All components should work together
      expect(yinYang.yin.type).toBe('yin');
      expect(yinYang.yang.type).toBe('yang');
      expect(yinYang.duality.isInfinite).toBe(true);
      expect(yinYang.oscillation.isInfinite).toBe(true);
    });

    test('should maintain imperial math consistency', () => {
      const yinYang = createHarmonicYinYang();
      
      // All values should be in imperial range (1-8)
      expect(yinYang.yin.imperialValue).toBeGreaterThanOrEqual(1);
      expect(yinYang.yin.imperialValue).toBeLessThanOrEqual(8);
      expect(yinYang.yang.imperialValue).toBeGreaterThanOrEqual(1);
      expect(yinYang.yang.imperialValue).toBeLessThanOrEqual(8);
      expect(yinYang.duality.balance).toBeGreaterThanOrEqual(1);
      expect(yinYang.duality.balance).toBeLessThanOrEqual(8);
    });
  });

  describe('Scientific Proofs', () => {
    test('should have scientific proofs defined', () => {
      const proofs = HarmonicYinYangSystem.scientificProofs;
      
      expect(proofs.imperialHarmonicSwitch).toBeDefined();
      expect(proofs.harmonicYinYangCreation).toBeDefined();
      expect(proofs.harmonicDigitYinYangAnalysis).toBeDefined();
      expect(proofs.harmonicYinYangOscillation).toBeDefined();
      expect(proofs.harmonicYinYangHarmony).toBeDefined();
      expect(proofs.harmonicYinYangEntanglement).toBeDefined();
      expect(proofs.harmonicYinYangInAllDigits).toBeDefined();
    });

    test('should have meaningful scientific proofs', () => {
      const proofs = HarmonicYinYangSystem.scientificProofs;
      
      expect(proofs.imperialHarmonicSwitch).toContain('imperial');
      expect(proofs.harmonicYinYangCreation).toContain('Yin and Yang');
      expect(proofs.harmonicYinYangHarmony).toContain('harmony');
    });
  });
}); 