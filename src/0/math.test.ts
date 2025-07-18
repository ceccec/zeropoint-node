import {
  collectKnowledgeFromAll,
  collectKnowledgeByType,
  collectKnowledgeByPolarity,
  collectInfiniteKnowledge,
  collectQuantumKnowledge,
  collectHarmonicKnowledge,
  collectVortexKnowledge,
  collectConsciousnessKnowledge,
  collectMathematicalKnowledge,
  exportCompleteKnowledgeCollection
} from './math';

describe('Knowledge Collection', () => {
  it('collectKnowledgeFromAll returns knowledge', () => {
    const knowledge = collectKnowledgeFromAll();
    expect(typeof knowledge).toBe('object');
    expect(Object.keys(knowledge).length).toBeGreaterThan(0);
  });

  it('collectKnowledgeByType returns arrays', () => {
    const mathematical = collectKnowledgeByType('mathematical');
    const consciousness = collectKnowledgeByType('consciousness');
    const quantum = collectKnowledgeByType('quantum');
    
    expect(Array.isArray(mathematical)).toBe(true);
    expect(Array.isArray(consciousness)).toBe(true);
    expect(Array.isArray(quantum)).toBe(true);
  });

  it('collectKnowledgeByPolarity returns arrays', () => {
    const positive = collectKnowledgeByPolarity('positive');
    const negative = collectKnowledgeByPolarity('negative');
    const neutral = collectKnowledgeByPolarity('neutral');
    
    expect(Array.isArray(positive)).toBe(true);
    expect(Array.isArray(negative)).toBe(true);
    expect(Array.isArray(neutral)).toBe(true);
  });

  it('collectInfiniteKnowledge returns infinite states', () => {
    const infinite = collectInfiniteKnowledge();
    expect(Array.isArray(infinite)).toBe(true);
    infinite.forEach(node => {
      expect(node.isInfinite).toBe(true);
    });
  });

  it('collectQuantumKnowledge returns quantum states', () => {
    const quantum = collectQuantumKnowledge();
    expect(Array.isArray(quantum)).toBe(true);
  });

  it('collectHarmonicKnowledge returns harmonic states', () => {
    const harmonic = collectHarmonicKnowledge();
    expect(Array.isArray(harmonic)).toBe(true);
  });

  it('collectVortexKnowledge returns vortex states', () => {
    const vortex = collectVortexKnowledge();
    expect(Array.isArray(vortex)).toBe(true);
  });

  it('collectConsciousnessKnowledge returns consciousness states', () => {
    const consciousness = collectConsciousnessKnowledge();
    expect(Array.isArray(consciousness)).toBe(true);
  });

  it('collectMathematicalKnowledge returns mathematical states', () => {
    const mathematical = collectMathematicalKnowledge();
    expect(Array.isArray(mathematical)).toBe(true);
  });

  it('exportCompleteKnowledgeCollection returns complete system', () => {
    const complete = exportCompleteKnowledgeCollection();
    
    expect(complete.allKnowledge).toBeDefined();
    expect(complete.byType).toBeDefined();
    expect(complete.byPolarity).toBeDefined();
    expect(complete.infinite).toBeDefined();
    expect(complete.quantum).toBeDefined();
    expect(complete.harmonic).toBeDefined();
    expect(complete.vortex).toBeDefined();
    expect(complete.consciousness).toBeDefined();
    expect(complete.mathematical).toBeDefined();
    expect(typeof complete.totalNodes).toBe('number');
    expect(typeof complete.totalInfinite).toBe('number');
    expect(typeof complete.totalQuantum).toBe('number');
    expect(typeof complete.totalConsciousness).toBe('number');
  });
}); 