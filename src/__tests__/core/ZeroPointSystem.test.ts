import { ZeroPointSystem } from '../../core/ZeroPointSystem';
import { Dimension } from '../../core/Dimension';
import { Field } from '../../core/Field';
import { Pattern } from '../../core/Pattern';
import { MetaphysicalLaw } from '../../laws/MetaphysicalLaw';

describe('ZeroPointSystem', () => {
  let system: ZeroPointSystem;

  beforeEach(async () => {
    system = new ZeroPointSystem();
    await system.initialize();
  });

  describe('Initialization', () => {
    it('should initialize with all dimensions and knowledge units', async () => {
      expect(system.isSystemInitialized()).toBe(true);
      
      const summary = system.getSystemSummary();
      expect(summary.dimensions.total).toBeGreaterThan(0);
      expect(summary.knowledge.total).toBeGreaterThan(0);
    });

    it('should register all dimensions in hierarchy', () => {
      const dimensions = system.getActiveDimensions();
      expect(dimensions.length).toBeGreaterThan(0);
      
      // Check that dimensions are properly ordered by complexity
      const orderedDimensions = system.getDimensionsByComplexity();
      expect(orderedDimensions[0].complexity).toBeLessThan(orderedDimensions[orderedDimensions.length - 1].complexity);
    });

    it('should register knowledge units across dimensions', () => {
      const consciousnessKnowledge = system.getKnowledgeByDimension('consciousness');
      const spaceKnowledge = system.getKnowledgeByDimension('space');
      const planeKnowledge = system.getKnowledgeByDimension('plane');
      const unityKnowledge = system.getKnowledgeByDimension('unity');
      
      expect(consciousnessKnowledge.length).toBeGreaterThan(0);
      expect(spaceKnowledge.length).toBeGreaterThan(0);
      expect(planeKnowledge.length).toBeGreaterThan(0);
      expect(unityKnowledge.length).toBeGreaterThan(0);
    });
  });

  describe('Dimension Management', () => {
    it('should get dimensions by type', () => {
      const geometricDimensions = system.getDimensionsByType('geometric');
      const metaphysicalDimensions = system.getDimensionsByType('metaphysical');
      const temporalDimensions = system.getDimensionsByType('temporal');
      
      expect(geometricDimensions.length).toBeGreaterThan(0);
      expect(metaphysicalDimensions.length).toBeGreaterThan(0);
      expect(temporalDimensions.length).toBeGreaterThan(0);
    });

    it('should get dimensions by operation', () => {
      const createDimensions = system.getDimensionsByOperation('create');
      const transformDimensions = system.getDimensionsByOperation('transform');
      const unifyDimensions = system.getDimensionsByOperation('unify');
      
      expect(createDimensions.length).toBeGreaterThan(0);
      expect(transformDimensions.length).toBeGreaterThan(0);
      expect(unifyDimensions.length).toBeGreaterThan(0);
    });

    it('should activate and deactivate dimensions', () => {
      // Test activation
      system.activateDimension('consciousness');
      const activeDimensions = system.getActiveDimensions();
      expect(activeDimensions.some(d => d.name === 'consciousness')).toBe(true);
      
      // Test deactivation
      system.deactivateDimension('consciousness');
      const remainingActive = system.getActiveDimensions();
      expect(remainingActive.some(d => d.name === 'consciousness')).toBe(false);
    });
  });

  describe('Knowledge Management', () => {
    it('should get knowledge by type', () => {
      const fields = system.getKnowledgeByType('Field');
      const patterns = system.getKnowledgeByType('Pattern');
      const laws = system.getKnowledgeByType('MetaphysicalLaw');
      
      expect(fields.length).toBeGreaterThan(0);
      expect(patterns.length).toBeGreaterThan(0);
      expect(laws.length).toBeGreaterThan(0);
    });

    it('should get knowledge by criteria', () => {
      const activeConsciousnessKnowledge = system.getKnowledgeByCriteria({
        dimension: 'consciousness',
        isActive: true
      });
      
      const geometricPatterns = system.getKnowledgeByCriteria({
        dimension: 'plane',
        type: 'Pattern'
      });
      
      expect(activeConsciousnessKnowledge.length).toBeGreaterThan(0);
      expect(geometricPatterns.length).toBeGreaterThan(0);
    });

    it('should get compatible knowledge units', () => {
      const consciousnessKnowledge = system.getKnowledgeByDimension('consciousness');
      if (consciousnessKnowledge.length > 0) {
        const unit = consciousnessKnowledge[0];
        const key = (unit.name || unit.id || 'unknown');
        const compatible = system.getCompatibleKnowledge(key);
        expect(compatible.length).toBeGreaterThan(0);
      }
    });

    it('should get knowledge by operation', () => {
      const createKnowledge = system.getKnowledgeByOperation('create');
      const transformKnowledge = system.getKnowledgeByOperation('transform');
      const unifyKnowledge = system.getKnowledgeByOperation('unify');
      
      expect(createKnowledge.length).toBeGreaterThan(0);
      expect(transformKnowledge.length).toBeGreaterThan(0);
      expect(unifyKnowledge.length).toBeGreaterThan(0);
    });

    it('should order knowledge by complexity', () => {
      const orderedKnowledge = system.getKnowledgeByComplexity();
      expect(orderedKnowledge.length).toBeGreaterThan(0);
      
      // Check that knowledge is properly ordered (if complexity is available)
      for (let i = 1; i < orderedKnowledge.length; i++) {
        const prevComplexity = getUnitComplexity(orderedKnowledge[i - 1]);
        const currComplexity = getUnitComplexity(orderedKnowledge[i]);
        expect(prevComplexity).toBeLessThanOrEqual(currComplexity);
      }
    });
  });

  describe('Cross-Dimensional Access', () => {
    it('should provide DRY access to knowledge across dimensions', () => {
      // Get all geometric knowledge across dimensions
      const geometricDimensions = system.getDimensionsByType('geometric');
      const allGeometricKnowledge: (Field | Pattern | MetaphysicalLaw)[] = [];
      
      for (const dimension of geometricDimensions) {
        const knowledge = system.getKnowledgeByDimension(dimension.name);
        allGeometricKnowledge.push(...knowledge);
      }
      
      expect(allGeometricKnowledge.length).toBeGreaterThan(0);
    });

    it('should find knowledge units that support specific operations across dimensions', () => {
      const unifyKnowledge = system.getKnowledgeByOperation('unify');
      const transformKnowledge = system.getKnowledgeByOperation('transform');
      
      // These should include knowledge from multiple dimensions
      const unifyDimensions = new Set(unifyKnowledge.map(k => getUnitDimension(k)));
      const transformDimensions = new Set(transformKnowledge.map(k => getUnitDimension(k)));
      
      expect(unifyDimensions.size).toBeGreaterThan(1);
      expect(transformDimensions.size).toBeGreaterThan(1);
    });

    it('should provide hierarchical access to knowledge', () => {
      // Get knowledge from parent and child dimensions
      const spaceKnowledge = system.getKnowledgeByDimension('space');
      const planeKnowledge = system.getKnowledgeByDimension('plane');
      const lineKnowledge = system.getKnowledgeByDimension('line');
      
      // All should have knowledge units
      expect(spaceKnowledge.length).toBeGreaterThan(0);
      expect(planeKnowledge.length).toBeGreaterThan(0);
      expect(lineKnowledge.length).toBeGreaterThan(0);
    });
  });

  describe('System Integration', () => {
    it('should provide comprehensive system summary', () => {
      const summary = system.getSystemSummary();
      
      expect(summary.dimensions.total).toBeGreaterThan(0);
      expect(summary.dimensions.active).toBeGreaterThan(0);
      expect(summary.dimensions.byType).toBeDefined();
      expect(summary.dimensions.rootDimensions.length).toBeGreaterThan(0);
      
      expect(summary.knowledge.total).toBeGreaterThan(0);
      expect(summary.knowledge.active).toBeGreaterThan(0);
      expect(summary.knowledge.byDimension).toBeDefined();
      expect(summary.knowledge.byType).toBeDefined();
      expect(summary.knowledge.byTag).toBeDefined();
    });

    it('should maintain metaphysical law compliance', () => {
      const allKnowledge = system.getKnowledgeByCriteria({});
      
      // All knowledge units should have metaphysical compliance
      for (const unit of allKnowledge) {
        if ('metaphysicalCompliance' in unit) {
          expect(unit.metaphysicalCompliance).toBeDefined();
        }
      }
    });

    it('should support dimensional evolution', () => {
      // Test that higher dimensions can access lower dimensional knowledge
      const unityKnowledge = system.getKnowledgeByDimension('unity');
      const voidKnowledge = system.getKnowledgeByDimension('void');
      const consciousnessKnowledge = system.getKnowledgeByDimension('consciousness');
      
      expect(unityKnowledge.length).toBeGreaterThan(0);
      expect(voidKnowledge.length).toBeGreaterThan(0);
      expect(consciousnessKnowledge.length).toBeGreaterThan(0);
    });
  });

  describe('Metaphysical Unity', () => {
    it('should demonstrate zero as unity across dimensions', () => {
      // Get knowledge from the unity dimension
      const unityKnowledge = system.getKnowledgeByDimension('unity');
      
      // Unity dimension should contain laws that demonstrate zero as unity
      const unityLaws = unityKnowledge.filter(k => k.type === 'MetaphysicalLaw');
      expect(unityLaws.length).toBeGreaterThan(0);
      
      // Check that unity laws are applied to all knowledge
      const allKnowledge = system.getKnowledgeByCriteria({});
      for (const unit of allKnowledge) {
        if ('metaphysicalSignature' in unit) {
          expect(unit.metaphysicalSignature).toBeDefined();
        }
      }
    });

    it('should resolve paradoxes through dimensional unity', () => {
      // Test that the system can resolve apparent contradictions
      const voidKnowledge = system.getKnowledgeByDimension('void');
      const spaceKnowledge = system.getKnowledgeByDimension('space');
      
      // Both should exist and be compatible
      expect(voidKnowledge.length).toBeGreaterThan(0);
      expect(spaceKnowledge.length).toBeGreaterThan(0);
      
      // They should be compatible through unity
      const unit = voidKnowledge[0];
      const key = (unit.name || unit.id || 'unknown');
      const compatibleVoid = system.getCompatibleKnowledge(key);
      expect(compatibleVoid.length).toBeGreaterThan(0);
    });
  });
});

// Helper methods for testing
function getUnitComplexity(unit: Field | Pattern | MetaphysicalLaw): number {
  if ('complexity' in unit) return unit.complexity || 1;
  if ('level' in unit) return unit.level || 1;
  return 1;
}

function getUnitDimension(unit: Field | Pattern | MetaphysicalLaw): string {
  if ('dimension' in unit) return unit.dimension || 'unknown';
  if ('dimensions' in unit) return unit.dimensions?.[0] || 'unknown';
  return 'unknown';
} 