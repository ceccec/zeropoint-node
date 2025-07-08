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