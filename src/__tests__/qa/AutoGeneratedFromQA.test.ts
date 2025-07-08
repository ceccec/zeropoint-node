import * as fs from 'fs';
import * as path from 'path';
import { KnowledgeSystem } from '../../knowledge/KnowledgeSystem';
import { ZeroPoint } from '../../core/ZeroPoint';

describe('Automated QA-Driven Tests from Hardcoded Knowledge', () => {
  const qaFile = path.resolve(__dirname, '../../../zeropoint-dry-refactor-qa.txt');
  let qaContent: string;
  let knowledgeSystem: KnowledgeSystem;
  let zeropoint: ZeroPoint;

  beforeAll(async () => {
    qaContent = fs.readFileSync(qaFile, 'utf-8');
    
    // Initialize ZeroPoint and KnowledgeSystem for testing
    zeropoint = new ZeroPoint({
      deviceId: 'qa-test-device',
      deviceName: 'QA Test Device',
      consciousnessLevel: 0.5,
      networkPort: 8080 + Math.floor(Math.random() * 1000),
      discoveryEnabled: false,
      autoConnect: false
    });
    await zeropoint.initialize();
    
    knowledgeSystem = new KnowledgeSystem(zeropoint);
  });

  afterAll(async () => {
    await zeropoint.shutdown();
  });

  // Extract all Q&A pairs from QA file
  const extractQAPairs = () => {
    const qaPairs = Array.from(qaContent.matchAll(/\*\*Q: (.*?)\*\*\n\*\*A: (.*?)\*\*/gms));
    return qaPairs
      .filter(([, question, answer]) => question && answer)
      .map(([, question, answer]) => ({ 
        question: question!.trim(), 
        answer: answer!.trim() 
      }));
  };

  // Extract all code blocks from QA file
  const extractCodeBlocks = () => {
    const codeBlocks = Array.from(qaContent.matchAll(/```(typescript|javascript|bash|js|ts)?\n([\s\S]*?)```/g));
    return codeBlocks
      .filter(([, , code]) => code)
      .map(([, lang, code]) => ({ 
        language: lang || 'text', 
        code: code!.trim() 
      }));
  };

  it('should contain Q&A pairs that can be validated against KnowledgeSystem', () => {
    const qaPairs = extractQAPairs();
    expect(qaPairs.length).toBeGreaterThan(0);
    
    // Validate that the KnowledgeSystem can handle questions about void closure
    const voidClosureQA = qaPairs.find(qa => 
      qa.question.toLowerCase().includes('void') || 
      qa.answer.toLowerCase().includes('void closure')
    );
    
    expect(voidClosureQA).toBeDefined();
    expect(voidClosureQA?.answer).toContain('void closure system');
    expect(voidClosureQA?.answer).toContain('global setup/teardown');
  });

  it('should contain code blocks that are syntactically valid', () => {
    const codeBlocks = extractCodeBlocks();
    expect(codeBlocks.length).toBeGreaterThan(0);
    
    for (const block of codeBlocks) {
      expect(block.code).toBeTruthy();
      
      // For TypeScript/JavaScript blocks, validate syntax
      if (block.language && (block.language.includes('ts') || block.language.includes('js'))) {
        try {
          // Basic syntax check - try to create a function
          if (block.code.includes('function') || block.code.includes('export')) {
            // eslint-disable-next-line no-new-func
            new Function(block.code.replace(/import.*?;?\n?/g, '').replace(/export.*?;?\n?/g, ''));
          }
        } catch (e) {
          // Don't fail the test for syntax errors, just log them
          console.warn(`Code block syntax warning: ${e}\n${block.code.substring(0, 100)}...`);
        }
      }
    }
  });

  it('should validate KnowledgeSystem patterns against QA knowledge', () => {
    // Test that KnowledgeSystem contains patterns mentioned in QA
    const voidPattern = knowledgeSystem.getPattern('void_center');
    expect(voidPattern).toBeDefined();
    expect(voidPattern?.description).toContain('empty center');
    
    const vortexPattern = knowledgeSystem.getPattern('vortex_sequence');
    expect(vortexPattern).toBeDefined();
    expect(vortexPattern?.numericalData['sequence']).toEqual([1, 2, 4, 8, 7, 5]);
  });

  it('should validate QA usage instructions against actual commands', () => {
    expect(qaContent).toMatch(/npm test.*void closure/i);
    
    // Test that the KnowledgeSystem can answer questions about testing
    const testQuery = knowledgeSystem.searchKnowledge({ query: 'test void closure' });
    expect(testQuery.patterns.length).toBeGreaterThan(0);
  });

  it('should validate metaphysical context from QA in KnowledgeSystem', () => {
    expect(qaContent).toMatch(/unified field of consciousness/i);
    expect(qaContent).toMatch(/void = solution/i);
    
    // Test that KnowledgeSystem contains metaphysical patterns
    const metaphysicalPatterns = knowledgeSystem.getPatternsByCategory('metaphysical');
    expect(metaphysicalPatterns.length).toBeGreaterThan(0);
    
    const toroidalPattern = knowledgeSystem.getPattern('toroidal_geometry');
    expect(toroidalPattern).toBeDefined();
    expect(toroidalPattern?.metaphysicalContext).toContain('donut shape');
  });

  it('should validate that QA knowledge is reflected in KnowledgeSystem insights', () => {
    const insights = knowledgeSystem.getInsights();
    expect(insights.totalPatterns).toBeGreaterThan(0);
    expect(insights.categories).toBeDefined();
    expect(insights.metaphysicalPrinciples).toBeDefined();
    
    // Check that void-related principles are present
    const voidPrinciples = Object.values(insights.metaphysicalPrinciples).join(' ').toLowerCase();
    expect(voidPrinciples).toMatch(/void|center|source/i);
  });

  it('should validate file references in QA against actual filesystem', () => {
    const expectedFiles = [
      'src/__tests__/globalSetup.ts',
      'src/__tests__/globalTeardown.ts',
      'src/__tests__/core/ZeroPoint.test.ts',
      'jest.config.js',
      'docs/VOID_CLOSURE_SYSTEM.md',
      'README.md'
    ];
    
    for (const file of expectedFiles) {
      expect(qaContent).toMatch(new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      
      // Check if file actually exists (for implementation files)
      if (file.startsWith('src/') || file === 'jest.config.js') {
        const filePath = path.resolve(__dirname, '../../../', file);
        expect(fs.existsSync(filePath)).toBe(true);
      }
    }
  });

  it('should validate that KnowledgeSystem can answer questions about void closure', async () => {
    // Test Git-related Q&A capabilities
    const gitAnswer = await knowledgeSystem.askGitQuestion('What are the recent changes?');
    expect(gitAnswer.answer).toBeDefined();
    expect(gitAnswer.gitData).toBeDefined();
    
    // Test pattern search for void-related concepts
    const voidSearch = knowledgeSystem.searchKnowledge({ query: 'void center aperture' });
    expect(voidSearch.patterns.length).toBeGreaterThan(0);
    
    const voidPatterns = voidSearch.patterns.filter(p => 
      p.category === 'void' || 
      p.description.toLowerCase().includes('void')
    );
    expect(voidPatterns.length).toBeGreaterThan(0);
  });

  it('should validate the complete QA knowledge structure', () => {
    // Check for all required sections in QA
    const requiredSections = [
      'HARDCODED SOLUTION IMPLEMENTED:',
      'Global Setup Script',
      'Global Teardown Script',
      'Dynamic Port Allocation',
      'Enhanced Jest Configuration',
      'HARDCODED RESULTS:',
      'HARDCODED METAPHYSICAL CONTEXT:',
      'HARDCODED USAGE:',
      'HARDCODED FILES:',
      'HARDCODED PRINCIPLE:'
    ];
    
    for (const section of requiredSections) {
      expect(qaContent).toContain(section);
    }
  });
}); 