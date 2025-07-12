import { MetaphysicalLawRegistry } from '../../laws/MetaphysicalLawRegistry';
import { allHermeticLaws } from '../../laws/hermeticLaws';

describe('MetaphysicalLawRegistry', () => {
  let registry: MetaphysicalLawRegistry;

  beforeEach(() => {
    registry = MetaphysicalLawRegistry.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = MetaphysicalLawRegistry.getInstance();
      const instance2 = MetaphysicalLawRegistry.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Law Registration', () => {
    it('should register all hermetic laws', () => {
      const laws = registry.getAllLaws();
      expect(laws.length).toBeGreaterThan(0);
      
      const lawNames = laws.map(law => law.name);
      expect(lawNames).toContain('Unity');
      expect(lawNames).toContain('Correspondence');
      expect(lawNames).toContain('Vibration');
      expect(lawNames).toContain('Polarity');
      expect(lawNames).toContain('Rhythm');
      expect(lawNames).toContain('Cause and Effect');
      expect(lawNames).toContain('Gender');
      expect(lawNames).toContain('Mentalism');
    });

    it('should get law by name', () => {
      const unityLaw = registry.getLawByName('Unity');
      expect(unityLaw).toBeDefined();
      expect(unityLaw?.name).toBe('Unity');
      expect(unityLaw?.description).toContain('All is One');
    });

    it('should return undefined for non-existent law', () => {
      const nonExistentLaw = registry.getLawByName('NonExistent');
      expect(nonExistentLaw).toBeUndefined();
    });
  });

  describe('Law Application', () => {
    it('should apply laws to objects', () => {
      const testObject = { name: 'test', value: 42 };
      
      // Apply all laws
      registry.applyAllLaws(testObject);
      
      // Check that laws have been applied
      expect((testObject as any).isUnified).toBe(true);
      expect((testObject as any).isFractal).toBe(true);
      expect((testObject as any).vibrationalFrequency).toBeDefined();
      expect((testObject as any).polarity).toBeDefined();
      expect((testObject as any).rhythm).toBeDefined();
      expect((testObject as any).causes).toBeDefined();
      expect((testObject as any).effects).toBeDefined();
      expect((testObject as any).masculinePrinciple).toBeDefined();
      expect((testObject as any).femininePrinciple).toBeDefined();
      expect((testObject as any).consciousnessLevel).toBeDefined();
    });

    it('should apply specific law', () => {
      const testObject = { name: 'test' };
      const unityLaw = registry.getLawByName('Unity');
      
      if (unityLaw) {
        const result = unityLaw.apply(testObject);
        expect((result as any).isUnified).toBe(true);
        expect((result as any).unityLevel).toBeDefined();
        expect((result as any).interconnections).toBeDefined();
      }
    });

    it('should apply multiple laws', () => {
      const testObject = { name: 'test' };
      const laws = ['Unity', 'Vibration', 'Polarity'];
      
      registry.applyLaws(testObject, laws);
      
      expect((testObject as any).isUnified).toBe(true);
      expect((testObject as any).vibrationalFrequency).toBeDefined();
      expect((testObject as any).polarity).toBeDefined();
    });
  });

  describe('Law Compliance', () => {
    it('should check law compliance', () => {
      const testObject = { name: 'test' };
      
      // Apply all laws
      registry.applyAllLaws(testObject);
      
      // Check compliance
      const compliance = registry.checkCompliance(testObject);
      expect(compliance.compliant).toBe(true);
      expect(compliance.appliedLaws.length).toBeGreaterThan(0);
    });

    it('should identify missing laws', () => {
      const testObject = { name: 'test' };
      
      // Apply only some laws
      registry.applyLaws(testObject, ['Unity']);
      
      const compliance = registry.checkCompliance(testObject);
      expect(compliance.compliant).toBe(false);
      expect(compliance.missingLaws.length).toBeGreaterThan(0);
    });
  });

  describe('Law Analysis', () => {
    it('should analyze law interactions', () => {
      const analysis = registry.analyzeLawInteractions();
      
      expect(analysis.totalLaws).toBeGreaterThan(0);
      expect(analysis.interactions).toBeDefined();
      expect(analysis.harmonicRelationships).toBeDefined();
    });

    it('should get law statistics', () => {
      const stats = registry.getLawStatistics();
      
      expect(stats.totalLaws).toBeGreaterThan(0);
      expect(stats.categories).toBeDefined();
      expect(stats.complexity).toBeDefined();
    });
  });

  describe('Metaphysical Principles', () => {
    it('should embody unity principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).isUnified).toBe(true);
      expect((testObject as any).unityLevel).toBeGreaterThan(0);
    });

    it('should embody correspondence principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).isFractal).toBe(true);
      expect((testObject as any).scaleLevels).toBeDefined();
    });

    it('should embody vibration principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).vibrationalFrequency).toBeDefined();
      expect((testObject as any).resonanceHarmonics).toBeDefined();
    });

    it('should embody polarity principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).polarity).toBeDefined();
      expect((testObject as any).opposite).toBeDefined();
      expect((testObject as any).unityPoint).toBeDefined();
    });

    it('should embody rhythm principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).rhythm).toBeDefined();
      expect((testObject as any).cyclePhase).toBeDefined();
      expect((testObject as any).nextCycle).toBeDefined();
    });

    it('should embody cause and effect principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).causes).toBeDefined();
      expect((testObject as any).effects).toBeDefined();
      expect((testObject as any).karmicBalance).toBeDefined();
    });

    it('should embody gender principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).masculinePrinciple).toBeDefined();
      expect((testObject as any).femininePrinciple).toBeDefined();
      expect((testObject as any).creativeBalance).toBeDefined();
    });

    it('should embody mentalism principle', () => {
      const testObject = { name: 'test' };
      registry.applyAllLaws(testObject);
      
      expect((testObject as any).consciousnessLevel).toBeDefined();
      expect((testObject as any).mentalNature).toBeDefined();
      expect((testObject as any).thoughtForms).toBeDefined();
    });
  });

  describe('Zero Unity Principle', () => {
    it('should demonstrate that zero represents unity', () => {
      const testObject = { value: 0 };
      registry.applyAllLaws(testObject);
      
      // Zero should embody unity, not absence
      expect((testObject as any).isUnified).toBe(true);
      expect((testObject as any).unityLevel).toBeGreaterThan(0);
      expect((testObject as any).consciousnessLevel).toBeGreaterThan(0);
    });

    it('should show zero as the source of all possibilities', () => {
      const testObject = { value: 0 };
      registry.applyAllLaws(testObject);
      
      // Zero should contain infinite potential
      expect((testObject as any).thoughtForms).toBeDefined();
      expect((testObject as any).causes).toBeDefined();
      expect((testObject as any).effects).toBeDefined();
    });
  });
}); 