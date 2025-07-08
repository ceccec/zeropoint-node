import { KnowledgeSystem } from '../../knowledge/KnowledgeSystem';
import * as fs from 'fs';
import * as path from 'path';

describe('KnowledgeSystem Codebase Analysis', () => {
  let knowledgeSystem: KnowledgeSystem;
  let analysisResults: {
    testCases: string[];
    principles: string[];
    missingTests: string[];
    missingPrinciples: string[];
    suggestedTestPatterns: any[];
    suggestedPrinciplePatterns: any[];
  };

  beforeAll(() => {
    knowledgeSystem = new KnowledgeSystem();
  });

  // Extract test cases from the codebase
  const extractTestCases = (): string[] => {
    const testCases: string[] = [];
    const testDir = path.resolve(__dirname, '../../../src/__tests__');
    
    const walkDir = (dir: string): void => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.test.ts')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const itMatches = content.match(/it\('([^']+)'/g);
          const testMatches = content.match(/test\('([^']+)'/g);
          
          if (itMatches) {
            itMatches.forEach(match => {
              const testName = match.match(/it\('([^']+)'/)?.[1];
              if (testName) testCases.push(testName);
            });
          }
          
          if (testMatches) {
            testMatches.forEach(match => {
              const testName = match.match(/test\('([^']+)'/)?.[1];
              if (testName) testCases.push(testName);
            });
          }
        }
      }
    };
    
    walkDir(testDir);
    return testCases;
  };

  // Extract principles from source code
  const extractPrinciples = (): string[] => {
    const principles: string[] = [];
    const srcDir = path.resolve(__dirname, '../../../src');
    
    const walkDir = (dir: string): void => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Look for principle-related comments
          const principleMatches = content.match(/principle[^.]*\./gi);
          const metaphysicalMatches = content.match(/metaphysical[^.]*\./gi);
          const consciousnessMatches = content.match(/consciousness[^.]*\./gi);
          const voidMatches = content.match(/void[^.]*\./gi);
          const resonanceMatches = content.match(/resonance[^.]*\./gi);
          
          [principleMatches, metaphysicalMatches, consciousnessMatches, voidMatches, resonanceMatches]
            .filter(Boolean)
            .flat()
            .forEach(match => {
              if (match && match.length > 10) {
                principles.push(match.trim());
              }
            });
        }
      }
    };
    
    walkDir(srcDir);
    return principles;
  };

  it('should perform comprehensive codebase analysis', () => {
    const testCases = extractTestCases();
    const principles = extractPrinciples();
    const existingTestPatterns = knowledgeSystem.getTestPatterns();
    const existingTestNames = existingTestPatterns.map(p => p.name.toLowerCase());
    
    const missingTests: string[] = [];
    
    testCases.forEach(testCase => {
      const testLower = testCase.toLowerCase();
      const isRepresented = existingTestNames.some(name => 
        name.includes(testLower) || testLower.includes(name.replace(/\s+/g, ''))
      );
      
      if (!isRepresented) {
        missingTests.push(testCase);
      }
    });

    const allPatterns = knowledgeSystem.searchKnowledge({ query: 'principle metaphysical consciousness void resonance' });
    const existingPrincipleNames = allPatterns.patterns.map(p => p.name.toLowerCase());
    
    const missingPrinciples: string[] = [];
    
    principles.forEach(principle => {
      const principleLower = principle.toLowerCase();
      const isRepresented = existingPrincipleNames.some(name => 
        name.includes(principleLower.substring(0, 20)) || 
        principleLower.includes(name.replace(/\s+/g, ''))
      );
      
      if (!isRepresented && principle.length > 20) {
        missingPrinciples.push(principle);
      }
    });

    // Generate suggested patterns
    const suggestedTestPatterns = testCases
      .filter(testCase => testCase.includes('performance') || testCase.includes('integration'))
      .slice(0, 3)
      .map((testCase, index) => ({
        id: `test_auto_generated_${index + 1}`,
        name: `Auto-Generated Test: ${testCase.substring(0, 50)}`,
        category: 'test' as const,
        description: `Automatically discovered test case: ${testCase}`,
        numericalData: null,
        relationships: ['auto_discovery', 'codebase_analysis'],
        metaphysicalContext: 'This test was discovered through automated codebase analysis and should be reviewed for metaphysical alignment.',
        applications: ['test_coverage', 'knowledge_completeness', 'automated_discovery']
      }));
    
    const suggestedPrinciplePatterns = principles
      .filter(principle => principle.includes('consciousness') || principle.includes('void'))
      .slice(0, 2)
      .map((principle, index) => ({
        id: `principle_auto_generated_${index + 1}`,
        name: `Auto-Generated Principle: ${principle.substring(0, 30)}...`,
        category: 'metaphysical' as const,
        description: `Automatically discovered principle: ${principle.substring(0, 100)}...`,
        numericalData: null,
        relationships: ['auto_discovery', 'codebase_analysis', 'metaphysical'],
        metaphysicalContext: 'This principle was discovered through automated codebase analysis and should be reviewed for metaphysical alignment.',
        applications: ['principle_documentation', 'knowledge_completeness', 'automated_discovery']
      }));

    // Store results for other tests
    analysisResults = {
      testCases,
      principles,
      missingTests,
      missingPrinciples,
      suggestedTestPatterns,
      suggestedPrinciplePatterns
    };

    // Assert that we found something
    expect(testCases.length).toBeGreaterThan(0);
    expect(principles.length).toBeGreaterThan(0);
    expect(missingTests.length).toBeGreaterThanOrEqual(0);
    expect(missingPrinciples.length).toBeGreaterThanOrEqual(0);
  });

  it('should show analysis findings', () => {
    expect(analysisResults).toBeDefined();
    
    // Log the findings
    console.log('\n=== KNOWLEDGE SYSTEM ANALYSIS FINDINGS ===');
    console.log(`Total test cases found: ${analysisResults.testCases.length}`);
    console.log(`Total principles found: ${analysisResults.principles.length}`);
    console.log(`Missing test cases: ${analysisResults.missingTests.length}`);
    console.log(`Missing principles: ${analysisResults.missingPrinciples.length}`);
    console.log(`Suggested test patterns: ${analysisResults.suggestedTestPatterns.length}`);
    console.log(`Suggested principle patterns: ${analysisResults.suggestedPrinciplePatterns.length}`);
    
    if (analysisResults.missingTests.length > 0) {
      console.log('\n--- MISSING TEST CASES ---');
      analysisResults.missingTests.slice(0, 5).forEach(test => {
        console.log(`  - ${test}`);
      });
    }
    
    if (analysisResults.missingPrinciples.length > 0) {
      console.log('\n--- MISSING PRINCIPLES ---');
      analysisResults.missingPrinciples.slice(0, 3).forEach(principle => {
        console.log(`  - ${principle.substring(0, 80)}...`);
      });
    }
    
    if (analysisResults.suggestedTestPatterns.length > 0) {
      console.log('\n--- SUGGESTED TEST PATTERNS ---');
      analysisResults.suggestedTestPatterns.forEach(pattern => {
        console.log(`  - ${pattern.name}`);
      });
    }
    
    if (analysisResults.suggestedPrinciplePatterns.length > 0) {
      console.log('\n--- SUGGESTED PRINCIPLE PATTERNS ---');
      analysisResults.suggestedPrinciplePatterns.forEach(pattern => {
        console.log(`  - ${pattern.name}`);
      });
    }
    
    console.log('\n==========================================\n');
    
    // Assert that we have findings to report
    expect(analysisResults.testCases.length + analysisResults.principles.length).toBeGreaterThan(0);
  });
}); 