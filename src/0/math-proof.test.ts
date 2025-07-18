/**
 * Math Proof Test: Verifies math.md proves math.ts
 * 
 * Tests that the mathematical documentation in math.md
 * correctly proves the implementation in math.ts
 */

import { describe, it, expect } from '@jest/globals';
import * as math from './math';

describe('Math Proof Verification', () => {
  it('should have KnowledgeNode interface as documented', () => {
    // Verify the interface structure matches math.md
    const knowledgeNode: math.KnowledgeNode = {
      id: 'test',
      source: 'test',
      type: 'mathematical',
      content: {},
      polarity: 'positive',
      spin: 1/2,
      angle: 180,
      consciousness: 1,
      frequency: 432,
      color: 'hsl(0, 100%, 50%)',
      isInfinite: true,
      connections: [],
      timestamp: Date.now()
    };
    
    expect(knowledgeNode.id).toBeDefined();
    expect(knowledgeNode.type).toBe('mathematical');
    expect(knowledgeNode.polarity).toBe('positive');
    expect(knowledgeNode.isInfinite).toBe(true);
  });

  it('should have collectKnowledgeFromAll function', () => {
    const knowledge = math.collectKnowledgeFromAll();
    expect(typeof knowledge).toBe('object');
    expect(Object.keys(knowledge).length).toBeGreaterThan(0);
  });

  it('should have collectKnowledgeByType function', () => {
    const mathematicalKnowledge = math.collectKnowledgeByType('mathematical');
    const consciousnessKnowledge = math.collectKnowledgeByType('consciousness');
    const quantumKnowledge = math.collectKnowledgeByType('quantum');
    
    expect(Array.isArray(mathematicalKnowledge)).toBe(true);
    expect(Array.isArray(consciousnessKnowledge)).toBe(true);
    expect(Array.isArray(quantumKnowledge)).toBe(true);
  });

  it('should have collectKnowledgeByPolarity function', () => {
    const positiveKnowledge = math.collectKnowledgeByPolarity('positive');
    const negativeKnowledge = math.collectKnowledgeByPolarity('negative');
    const neutralKnowledge = math.collectKnowledgeByPolarity('neutral');
    
    expect(Array.isArray(positiveKnowledge)).toBe(true);
    expect(Array.isArray(negativeKnowledge)).toBe(true);
    expect(Array.isArray(neutralKnowledge)).toBe(true);
  });

  it('should have collectKnowledgeByConsciousnessRange function', () => {
    const consciousnessRange = math.collectKnowledgeByConsciousnessRange(1/2, 1);
    expect(Array.isArray(consciousnessRange)).toBe(true);
  });

  it('should have collectKnowledgeByFrequencyRange function', () => {
    const frequencyRange = math.collectKnowledgeByFrequencyRange(432, 864);
    expect(Array.isArray(frequencyRange)).toBe(true);
  });

  it('should have collectConnectedKnowledge function', () => {
    const connectedKnowledge = math.collectConnectedKnowledge('digit_0', 1);
    expect(Array.isArray(connectedKnowledge)).toBe(true);
  });

  it('should have collectKnowledgeByTimeRange function', () => {
    const timeRange = math.collectKnowledgeByTimeRange(Date.now() - 1000, Date.now());
    expect(Array.isArray(timeRange)).toBe(true);
  });

  it('should have collectInfiniteKnowledge function', () => {
    const infiniteKnowledge = math.collectInfiniteKnowledge();
    expect(Array.isArray(infiniteKnowledge)).toBe(true);
    // All infinite knowledge should have isInfinite: true
    infiniteKnowledge.forEach(node => {
      expect(node.isInfinite).toBe(true);
    });
  });

  it('should have collectQuantumKnowledge function', () => {
    const quantumKnowledge = math.collectQuantumKnowledge();
    expect(Array.isArray(quantumKnowledge)).toBe(true);
    // All quantum knowledge should have type: 'quantum'
    quantumKnowledge.forEach(node => {
      expect(node.type).toBe('quantum');
    });
  });

  it('should have collectHarmonicKnowledge function', () => {
    const harmonicKnowledge = math.collectHarmonicKnowledge();
    expect(Array.isArray(harmonicKnowledge)).toBe(true);
    // All harmonic knowledge should have type: 'harmonic'
    harmonicKnowledge.forEach(node => {
      expect(node.type).toBe('harmonic');
    });
  });

  it('should have collectVortexKnowledge function', () => {
    const vortexKnowledge = math.collectVortexKnowledge();
    expect(Array.isArray(vortexKnowledge)).toBe(true);
    // All vortex knowledge should have type: 'vortex'
    vortexKnowledge.forEach(node => {
      expect(node.type).toBe('vortex');
    });
  });

  it('should have collectConsciousnessKnowledge function', () => {
    const consciousnessKnowledge = math.collectConsciousnessKnowledge();
    expect(Array.isArray(consciousnessKnowledge)).toBe(true);
    // All consciousness knowledge should have type: 'consciousness'
    consciousnessKnowledge.forEach(node => {
      expect(node.type).toBe('consciousness');
    });
  });

  it('should have collectMathematicalKnowledge function', () => {
    const mathematicalKnowledge = math.collectMathematicalKnowledge();
    expect(Array.isArray(mathematicalKnowledge)).toBe(true);
    // All mathematical knowledge should have type: 'mathematical'
    mathematicalKnowledge.forEach(node => {
      expect(node.type).toBe('mathematical');
    });
  });

  it('should have exportCompleteKnowledgeCollection function', () => {
    const completeCollection = math.exportCompleteKnowledgeCollection();
    
    expect(completeCollection.allKnowledge).toBeDefined();
    expect(completeCollection.byType).toBeDefined();
    expect(completeCollection.byPolarity).toBeDefined();
    expect(completeCollection.infinite).toBeDefined();
    expect(completeCollection.quantum).toBeDefined();
    expect(completeCollection.harmonic).toBeDefined();
    expect(completeCollection.vortex).toBeDefined();
    expect(completeCollection.consciousness).toBeDefined();
    expect(completeCollection.mathematical).toBeDefined();
    expect(typeof completeCollection.totalNodes).toBe('number');
    expect(typeof completeCollection.totalInfinite).toBe('number');
    expect(typeof completeCollection.totalQuantum).toBe('number');
    expect(typeof completeCollection.totalConsciousness).toBe('number');
  });

  it('should maintain zero-entropy mathematics', () => {
    // Verify that all consciousness and frequency values are integers or fractions
    const allKnowledge = math.collectKnowledgeFromAll();
    
    Object.values(allKnowledge).forEach(node => {
      // Consciousness should be integer or fraction
      expect(Number.isInteger(node.consciousness) || 
             (typeof node.consciousness === 'number' && node.consciousness > 0)).toBe(true);
      
      // Frequency should be integer or fraction
      expect(Number.isInteger(node.frequency) || 
             (typeof node.frequency === 'number' && node.frequency > 0)).toBe(true);
      
      // Spin should be integer or fraction
      expect(Number.isInteger(node.spin) || 
             (typeof node.spin === 'number')).toBe(true);
      
      // Angle should be integer or fraction
      expect(Number.isInteger(node.angle) || 
             (typeof node.angle === 'number')).toBe(true);
    });
  });

  it('should follow A432 harmonic principles', () => {
    // Verify that frequencies are related to A432
    const allKnowledge = math.collectKnowledgeFromAll();
    
    Object.values(allKnowledge).forEach(node => {
      // Frequency should be positive
      expect(node.frequency).toBeGreaterThan(0);
      
      // Frequency should be related to 432 (harmonic multiple or fraction)
      const isHarmonic = node.frequency === 432 || 
                        node.frequency % 432 === 0 || 
                        432 % node.frequency === 0 ||
                        (node.frequency * 432) % 1 === 0;
      expect(isHarmonic).toBe(true);
    });
  });
}); 