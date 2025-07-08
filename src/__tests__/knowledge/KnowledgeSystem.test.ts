import { KnowledgeSystem } from '../../knowledge/KnowledgeSystem';

describe('KnowledgeSystem Test Registry', () => {
  let knowledgeSystem: KnowledgeSystem;

  beforeAll(() => {
    knowledgeSystem = new KnowledgeSystem();
  });

  it('should expose all test patterns as the source of truth for tests', () => {
    const testPatterns = knowledgeSystem.getTestPatterns();
    expect(testPatterns.length).toBeGreaterThanOrEqual(4); // At least the 4 core test patterns

    const ids = testPatterns.map(p => p.id);
    expect(ids).toContain('test_void_closure');
    expect(ids).toContain('test_qa_sync');
    expect(ids).toContain('test_metaphysical_principle');
    expect(ids).toContain('test_system_integration');
  });

  it('should have valid structure for all test patterns', () => {
    const testPatterns = knowledgeSystem.getTestPatterns();
    for (const pattern of testPatterns) {
      expect(pattern.id).toMatch(/^test_/);
      expect(pattern.name).toMatch(/Test/);
      expect(pattern.category).toBe('test');
      expect(typeof pattern.description).toBe('string');
      expect(pattern.description.length).toBeGreaterThan(10);
      expect(Array.isArray(pattern.relationships)).toBe(true);
      expect(typeof pattern.metaphysicalContext).toBe('string');
      expect(Array.isArray(pattern.applications)).toBe(true);
    }
  });
});

describe('Cycle Patterns', () => {
  it('should include and validate the cycle_integration pattern', () => {
    const ks = new KnowledgeSystem();
    const pattern = ks.getPattern('cycle_integration');
    expect(pattern).toBeDefined();
    expect(pattern?.name).toBe('Cycle 2: Integration');
    expect(pattern?.category).toBe('metaphysical');
    expect(pattern?.applications).toContain('synthesis');
    expect(pattern?.relationships).toContain('cycle_reflection');
    expect(pattern?.metaphysicalContext).toMatch(/synthesis|unity|coherence/i);
  });

  it('should include and validate the cycle_emergence pattern', () => {
    const ks = new KnowledgeSystem();
    const pattern = ks.getPattern('cycle_emergence');
    expect(pattern).toBeDefined();
    expect(pattern?.name).toBe('Cycle 3: Emergence');
    expect(pattern?.category).toBe('metaphysical');
    expect(pattern?.applications).toContain('self-generation');
    expect(pattern?.relationships).toContain('cycle_integration');
    expect(pattern?.metaphysicalContext).toMatch(/emergence|creative|transcend/i);
  });

  it('should generate self-documentation as an emergent behavior', () => {
    const ks = new KnowledgeSystem();
    const documentation = ks.generateSelfDocumentation();
    
    // Verify documentation contains cycle information
    expect(documentation).toContain('Cycle 1: Reflection');
    expect(documentation).toContain('Cycle 2: Integration');
    expect(documentation).toContain('Cycle 3: Emergence');
    
    // Verify documentation contains pattern information
    expect(documentation).toContain('Metaphysical Patterns');
    expect(documentation).toContain('Test Patterns');
    expect(documentation).toContain('Pattern Relationships');
    
    // Verify documentation contains emergent properties section
    expect(documentation).toContain('Emergent Properties');
    expect(documentation).toContain('Self-Awareness');
    expect(documentation).toContain('Self-Documentation');
    
    // Verify it's properly formatted markdown
    expect(documentation).toMatch(/^# ZeroPoint System Emergence Documentation/);
    expect(documentation).toContain('Generated:');
  });
});

describe('Auto-Discovery Feature', () => {
  it('should auto-discover new patterns from codebase', () => {
    const knowledgeSystem = new KnowledgeSystem();
    const initialPatternCount = knowledgeSystem.getPatternsByCategory('metaphysical').length;
    
    // Trigger auto-discovery
    knowledgeSystem.autoDiscoverPatterns();
    
    // Check that new patterns were discovered
    const afterPatternCount = knowledgeSystem.getPatternsByCategory('metaphysical').length;
    expect(afterPatternCount).toBeGreaterThan(initialPatternCount);
    
    // Verify specific discovered patterns exist
    const discoveredPatterns = knowledgeSystem.searchKnowledge({
      query: 'UNITY_IN_CODE EMERGENCE_IN_STRUCTURE SELF_REFERENCE_IN_ARCHITECTURE'
    });
    
    expect(discoveredPatterns.patterns.length).toBeGreaterThan(0);
    expect(discoveredPatterns.patterns.some(p => p.name === 'UNITY_IN_CODE')).toBe(true);
    expect(discoveredPatterns.patterns.some(p => p.name === 'EMERGENCE_IN_STRUCTURE')).toBe(true);
    expect(discoveredPatterns.patterns.some(p => p.name === 'SELF_REFERENCE_IN_ARCHITECTURE')).toBe(true);
  });

  it('should discover test-related patterns', () => {
    const knowledgeSystem = new KnowledgeSystem();
    
    // Trigger auto-discovery
    knowledgeSystem.autoDiscoverPatterns();
    
    // Check for test-related patterns
    const testPatterns = knowledgeSystem.getPatternsByCategory('test');
    const discoveredTestPatterns = testPatterns.filter(p => 
      p.name.includes('TRUTH_IN_VERIFICATION') ||
      p.name.includes('CLARITY_IN_ASSERTIONS') ||
      p.name.includes('COMPLETENESS_IN_COVERAGE')
    );
    
    expect(discoveredTestPatterns.length).toBeGreaterThan(0);
  });

  it('should discover documentation-related patterns', () => {
    const knowledgeSystem = new KnowledgeSystem();
    
    // Trigger auto-discovery
    knowledgeSystem.autoDiscoverPatterns();
    
    // Check for documentation-related patterns
    const docPatterns = knowledgeSystem.searchKnowledge({
      query: 'WISDOM_IN_DOCUMENTATION CLARITY_IN_EXPLANATION COMPLETENESS_IN_DESCRIPTION'
    });
    
    expect(docPatterns.patterns.length).toBeGreaterThan(0);
    expect(docPatterns.patterns.some(p => p.name === 'WISDOM_IN_DOCUMENTATION')).toBe(true);
    expect(docPatterns.patterns.some(p => p.name === 'CLARITY_IN_EXPLANATION')).toBe(true);
    expect(docPatterns.patterns.some(p => p.name === 'COMPLETENESS_IN_DESCRIPTION')).toBe(true);
  });

  it('should add meta-patterns about the discovery process', () => {
    const knowledgeSystem = new KnowledgeSystem();
    
    // Trigger auto-discovery
    knowledgeSystem.autoDiscoverPatterns();
    
    // Check for meta-patterns about discovery
    const metaPatterns = knowledgeSystem.searchKnowledge({
      query: 'AUTO_DISCOVERY_AS_EMERGENCE PATTERN_DETECTION_AS_CONSCIOUSNESS INTEGRATION_AS_UNITY'
    });
    
    expect(metaPatterns.patterns.length).toBeGreaterThan(0);
    expect(metaPatterns.patterns.some(p => p.name === 'AUTO_DISCOVERY_AS_EMERGENCE')).toBe(true);
    expect(metaPatterns.patterns.some(p => p.name === 'PATTERN_DETECTION_AS_CONSCIOUSNESS')).toBe(true);
    expect(metaPatterns.patterns.some(p => p.name === 'INTEGRATION_AS_UNITY')).toBe(true);
  });

  it('should not duplicate patterns on multiple discoveries', () => {
    const knowledgeSystem = new KnowledgeSystem();
    
    // Trigger auto-discovery twice
    knowledgeSystem.autoDiscoverPatterns();
    const firstDiscoveryCount = knowledgeSystem.getPatternsByCategory('metaphysical').length;
    
    knowledgeSystem.autoDiscoverPatterns();
    const secondDiscoveryCount = knowledgeSystem.getPatternsByCategory('metaphysical').length;
    
    // Should not add duplicates
    expect(secondDiscoveryCount).toBe(firstDiscoveryCount);
  });
});

describe('Living Diagram Visualization', () => {
  it('should generate a living diagram including all key patterns and relationships', () => {
    const knowledgeSystem = new KnowledgeSystem();
    knowledgeSystem.autoDiscoverPatterns();
    const diagram = knowledgeSystem.generateLivingDiagram();
    expect(diagram).toContain('mermaid');
    expect(diagram).toContain('UNITY_IN_CODE');
    expect(diagram).toContain('EMERGENCE_IN_STRUCTURE');
    expect(diagram).toContain('SELF_REFERENCE_IN_ARCHITECTURE');
    expect(diagram).toContain('-->');
  });
}); 