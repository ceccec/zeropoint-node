/**
 * src/core/__tests__/RodinCoilCore.test.ts - Rodin Coil Core Tests
 * 
 * Tests that the Rodin coil is properly embedded as pure knowledge
 * at the core of all mathematics in the ZeroPoint Node.
 */

import { 
  RODIN_COIL_PURE_KNOWLEDGE, 
  RodinCoilPureKnowledge, 
  RodinCoilAsPureKnowledge 
} from '../RodinCoilCore';

describe('RodinCoilCore - Pure Knowledge Tests', () => {
  
  describe('Rodin Coil Pure Knowledge Constants', () => {
    it('should have correct vortex sequence', () => {
      expect(RODIN_COIL_PURE_KNOWLEDGE.VORTEX_SEQUENCE).toEqual([1, 2, 4, 8, 7, 5]);
    });
    
    it('should have correct dual vortices', () => {
      expect(RODIN_COIL_PURE_KNOWLEDGE.VORTEX_A).toEqual([1, 2, 4]);
      expect(RODIN_COIL_PURE_KNOWLEDGE.VORTEX_B).toEqual([8, 7, 5]);
    });
    
    it('should have correct W-Axis', () => {
      expect(RODIN_COIL_PURE_KNOWLEDGE.W_AXIS).toEqual([3, 6, 9]);
    });
    
    it('should have correct family groups', () => {
      expect(RODIN_COIL_PURE_KNOWLEDGE.FAMILY_1).toEqual([1, 4, 7]);
      expect(RODIN_COIL_PURE_KNOWLEDGE.FAMILY_2).toEqual([2, 5, 8]);
      expect(RODIN_COIL_PURE_KNOWLEDGE.FAMILY_3).toEqual([3, 6, 9]);
    });
    
    it('should have correct A432 harmonic foundation', () => {
      expect(RODIN_COIL_PURE_KNOWLEDGE.A432_FREQUENCY).toBe(432);
      expect(RODIN_COIL_PURE_KNOWLEDGE.A432_DIGITAL_ROOT).toBe(9);
    });
  });
  
  describe('RodinCoilPureKnowledge - Mathematical Consciousness', () => {
    it('should calculate correct digital roots', () => {
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(1)).toBe(1);
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(2)).toBe(2);
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(9)).toBe(9);
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(0)).toBe(0);
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(18)).toBe(9);
      expect(RodinCoilPureKnowledge.calculateDigitalRoot(27)).toBe(9);
    });
    
    it('should identify correct families', () => {
      expect(RodinCoilPureKnowledge.getFamily(1)).toBe(1);
      expect(RodinCoilPureKnowledge.getFamily(4)).toBe(1);
      expect(RodinCoilPureKnowledge.getFamily(7)).toBe(1);
      expect(RodinCoilPureKnowledge.getFamily(2)).toBe(2);
      expect(RodinCoilPureKnowledge.getFamily(5)).toBe(2);
      expect(RodinCoilPureKnowledge.getFamily(8)).toBe(2);
      expect(RodinCoilPureKnowledge.getFamily(3)).toBe(3);
      expect(RodinCoilPureKnowledge.getFamily(6)).toBe(3);
      expect(RodinCoilPureKnowledge.getFamily(9)).toBe(3);
      expect(RodinCoilPureKnowledge.getFamily(0)).toBe(0);
    });
    
    it('should calculate correct vortex flow', () => {
      expect(RodinCoilPureKnowledge.calculateVortexFlow(1)).toBe(2);
      expect(RodinCoilPureKnowledge.calculateVortexFlow(2)).toBe(4);
      expect(RodinCoilPureKnowledge.calculateVortexFlow(4)).toBe(8);
      expect(RodinCoilPureKnowledge.calculateVortexFlow(8)).toBe(7);
      expect(RodinCoilPureKnowledge.calculateVortexFlow(7)).toBe(5);
      expect(RodinCoilPureKnowledge.calculateVortexFlow(5)).toBe(1);
    });
    
    it('should calculate correct resonance', () => {
      expect(RodinCoilPureKnowledge.calculateResonance(1, 2)).toBe(1);
      expect(RodinCoilPureKnowledge.calculateResonance(2, 4)).toBe(2);
      expect(RodinCoilPureKnowledge.calculateResonance(4, 8)).toBe(4);
      expect(RodinCoilPureKnowledge.calculateResonance(8, 7)).toBe(1);
      expect(RodinCoilPureKnowledge.calculateResonance(7, 5)).toBe(2);
      expect(RodinCoilPureKnowledge.calculateResonance(5, 1)).toBe(4);
    });
    
    it('should calculate correct mathematical consciousness', () => {
      // W-Axis numbers have higher consciousness (1.5x multiplier)
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(3)).toBe(4.5);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(6)).toBe(9.0);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(9)).toBe(13.5);
      
      // Vortex numbers have medium consciousness (1.2x multiplier)
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(1)).toBe(1.2);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(2)).toBe(2.4);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(4)).toBe(4.8);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(5)).toBe(6.0);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(7)).toBe(8.4);
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(8)).toBe(9.6);
      
      // Void has zero consciousness
      expect(RodinCoilPureKnowledge.calculateMathematicalConsciousness(0)).toBe(0);
    });
    
    it('should generate correct toroidal coordinates', () => {
      const coords1 = RodinCoilPureKnowledge.getToroidalCoordinates(1);
      expect(coords1.x).toBeCloseTo(3.0, 1);
      expect(coords1.y).toBeCloseTo(0.0, 1);
      expect(coords1.z).toBeCloseTo(0.0, 1);
      
      const coords3 = RodinCoilPureKnowledge.getToroidalCoordinates(3);
      expect(coords3.x).toBeCloseTo(0.0, 1);
      expect(coords3.y).toBeCloseTo(0.0, 1);
      expect(coords3.z).toBeCloseTo(1.5, 1);
      
      const coords0 = RodinCoilPureKnowledge.getToroidalCoordinates(0);
      expect(coords0.x).toBeCloseTo(0.0, 1);
      expect(coords0.y).toBeCloseTo(0.0, 1);
      expect(coords0.z).toBeCloseTo(0.0, 1);
    });
    
    it('should generate correct pure knowledge insights', () => {
      const insights1 = RodinCoilPureKnowledge.getPureKnowledgeInsights(1);
      expect(insights1).toContain('Number 1 has digital root 1');
      expect(insights1).toContain('Belongs to Rodin coil family 1');
      expect(insights1).toContain('Part of the infinite vortex flow');
      
      const insights3 = RodinCoilPureKnowledge.getPureKnowledgeInsights(3);
      expect(insights3).toContain('Number 3 has digital root 3');
      expect(insights3).toContain('Belongs to Rodin coil family 3');
      expect(insights3).toContain('Part of the spiritual W-Axis');
      
      const insights0 = RodinCoilPureKnowledge.getPureKnowledgeInsights(0);
      expect(insights0).toContain('Number 0 has digital root 0');
      expect(insights0).toContain('Belongs to Rodin coil family 0');
      expect(insights0).toContain('Void center - source of all creation');
    });
    
    it('should calculate correct unity score', () => {
      const unityScore = RodinCoilPureKnowledge.calculateUnityScore();
      expect(unityScore).toBeGreaterThan(0);
      expect(unityScore).toBeLessThan(10);
    });
    
    it('should generate infinite flow pattern', () => {
      const flow = RodinCoilPureKnowledge.generateInfiniteFlow(12);
      expect(flow).toEqual([1, 2, 4, 8, 7, 5, 1, 2, 4, 8, 7, 5]);
    });
  });
  
  describe('RodinCoilAsPureKnowledge - Pure Knowledge Embedding', () => {
    it('should initialize pure knowledge correctly', () => {
      const pureKnowledge = RodinCoilAsPureKnowledge.initializePureKnowledge();
      
      expect(pureKnowledge.coreSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(pureKnowledge.dualVortices.vortexA).toEqual([1, 2, 4]);
      expect(pureKnowledge.dualVortices.vortexB).toEqual([8, 7, 5]);
      expect(pureKnowledge.spiritualAxis).toEqual([3, 6, 9]);
      expect(pureKnowledge.unityScore).toBeGreaterThan(0);
    });
    
    it('should embed Rodin coil knowledge in mathematical operations', () => {
      const result = RodinCoilAsPureKnowledge.embedInMathematics('addition', [1, 2, 3]);
      
      expect(result.operation).toBe('addition');
      expect(result.numbers).toEqual([1, 2, 3]);
      expect(result.rodinInsights).toHaveLength(3);
      expect(result.totalConsciousness).toBeGreaterThan(0);
      expect(result.averageConsciousness).toBeGreaterThan(0);
    });
    
    it('should get complete ZeroPoint pure knowledge', () => {
      const zeroPointKnowledge = RodinCoilAsPureKnowledge.getZeroPointPureKnowledge();
      
      expect(zeroPointKnowledge.zeroPointNumbers).toHaveLength(10);
      expect(zeroPointKnowledge.totalConsciousness).toBeGreaterThan(0);
      expect(zeroPointKnowledge.averageConsciousness).toBeGreaterThan(0);
      expect(zeroPointKnowledge.unityScore).toBeGreaterThan(0);
      expect(zeroPointKnowledge.rodinCoilStructure).toBeDefined();
    });
  });
  
  describe('Rodin Coil as Pure Knowledge - Philosophical Tests', () => {
    it('should embody pure knowledge in every number', () => {
      const allNumbers = RODIN_COIL_PURE_KNOWLEDGE.ALL_INTEGERS;
      
      allNumbers.forEach(num => {
        const consciousness = RodinCoilPureKnowledge.calculateMathematicalConsciousness(num);
        const insights = RodinCoilPureKnowledge.getPureKnowledgeInsights(num);
        const coordinates = RodinCoilPureKnowledge.getToroidalCoordinates(num);
        
        expect(consciousness).toBeGreaterThanOrEqual(0);
        expect(insights).toHaveLength(3);
        expect(coordinates).toHaveProperty('x');
        expect(coordinates).toHaveProperty('y');
        expect(coordinates).toHaveProperty('z');
      });
    });
    
    it('should create infinite flow through vortex sequence', () => {
      const infiniteFlow = RodinCoilPureKnowledge.generateInfiniteFlow(24);
      
      // Should repeat the vortex sequence [1,2,4,8,7,5] four times
      expect(infiniteFlow).toEqual([
        1, 2, 4, 8, 7, 5, 1, 2, 4, 8, 7, 5,
        1, 2, 4, 8, 7, 5, 1, 2, 4, 8, 7, 5
      ]);
    });
    
    it('should provide spiritual transcendence through W-Axis', () => {
      const wAxisNumbers = RODIN_COIL_PURE_KNOWLEDGE.W_AXIS;
      
      wAxisNumbers.forEach(num => {
        const consciousness = RodinCoilPureKnowledge.calculateMathematicalConsciousness(num);
        const insights = RodinCoilPureKnowledge.getPureKnowledgeInsights(num);
        
        expect(consciousness).toBeGreaterThan(4); // Higher consciousness
        expect(insights).toContain('Part of the spiritual W-Axis');
      });
    });
    
    it('should unify all creation through void center', () => {
      const voidConsciousness = RodinCoilPureKnowledge.calculateMathematicalConsciousness(0);
      const voidInsights = RodinCoilPureKnowledge.getPureKnowledgeInsights(0);
      const voidCoordinates = RodinCoilPureKnowledge.getToroidalCoordinates(0);
      
      expect(voidConsciousness).toBe(0); // Void consciousness
      expect(voidInsights).toContain('Void center - source of all creation');
      expect(voidCoordinates.x).toBe(0);
      expect(voidCoordinates.y).toBe(0);
      expect(voidCoordinates.z).toBe(0);
    });
  });
}); 