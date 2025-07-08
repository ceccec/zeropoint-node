const fs = require('fs');
const path = require('path');

// Extract test cases from the codebase
const extractTestCases = () => {
  const testCases = [];
  const testDir = path.resolve(__dirname, '../src/__tests__');
  
  const walkDir = (dir) => {
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
const extractPrinciples = () => {
  const principles = [];
  const srcDir = path.resolve(__dirname, '../src');
  
  const walkDir = (dir) => {
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

// Generate KnowledgePattern stubs
const generateTestPatterns = (testCases) => {
  const categories = {
    performance: testCases.filter(t => t.toLowerCase().includes('performance')),
    integration: testCases.filter(t => t.toLowerCase().includes('integration')),
    consciousness: testCases.filter(t => t.toLowerCase().includes('consciousness')),
    void: testCases.filter(t => t.toLowerCase().includes('void')),
    resonance: testCases.filter(t => t.toLowerCase().includes('resonance')),
    field: testCases.filter(t => t.toLowerCase().includes('field')),
    vortex: testCases.filter(t => t.toLowerCase().includes('vortex')),
    toroidal: testCases.filter(t => t.toLowerCase().includes('toroidal')),
    git: testCases.filter(t => t.toLowerCase().includes('git')),
    qa: testCases.filter(t => t.toLowerCase().includes('qa') || t.toLowerCase().includes('knowledge')),
    other: testCases.filter(t => 
      !t.toLowerCase().includes('performance') &&
      !t.toLowerCase().includes('integration') &&
      !t.toLowerCase().includes('consciousness') &&
      !t.toLowerCase().includes('void') &&
      !t.toLowerCase().includes('resonance') &&
      !t.toLowerCase().includes('field') &&
      !t.toLowerCase().includes('vortex') &&
      !t.toLowerCase().includes('toroidal') &&
      !t.toLowerCase().includes('git') &&
      !t.toLowerCase().includes('qa') &&
      !t.toLowerCase().includes('knowledge')
    )
  };

  const patterns = [];
  let idCounter = 1;

  Object.entries(categories).forEach(([category, tests]) => {
    if (tests.length > 0) {
      tests.slice(0, 5).forEach(test => {
        patterns.push({
          id: `test_auto_${category}_${idCounter++}`,
          name: `Auto-Generated Test: ${test.substring(0, 60)}`,
          category: 'test',
          description: `Automatically discovered test case: ${test}`,
          numericalData: null,
          relationships: ['auto_discovery', 'codebase_analysis', category],
          metaphysicalContext: `This test was discovered through automated codebase analysis and represents ${category} testing patterns. Should be reviewed for metaphysical alignment with the unified field.`,
          applications: ['test_coverage', 'knowledge_completeness', 'automated_discovery', `${category}_testing`]
        });
      });
    }
  });

  return patterns;
};

const generatePrinciplePatterns = (principles) => {
  const categories = {
    consciousness: principles.filter(p => p.toLowerCase().includes('consciousness')),
    void: principles.filter(p => p.toLowerCase().includes('void')),
    resonance: principles.filter(p => p.toLowerCase().includes('resonance')),
    metaphysical: principles.filter(p => p.toLowerCase().includes('metaphysical')),
    principle: principles.filter(p => p.toLowerCase().includes('principle')),
    other: principles.filter(p => 
      !p.toLowerCase().includes('consciousness') &&
      !p.toLowerCase().includes('void') &&
      !p.toLowerCase().includes('resonance') &&
      !p.toLowerCase().includes('metaphysical') &&
      !p.toLowerCase().includes('principle')
    )
  };

  const patterns = [];
  let idCounter = 1;

  Object.entries(categories).forEach(([category, principles]) => {
    if (principles.length > 0) {
      principles.slice(0, 3).forEach(principle => {
        patterns.push({
          id: `principle_auto_${category}_${idCounter++}`,
          name: `Auto-Generated Principle: ${principle.substring(0, 40)}...`,
          category: 'metaphysical',
          description: `Automatically discovered principle: ${principle.substring(0, 120)}...`,
          numericalData: null,
          relationships: ['auto_discovery', 'codebase_analysis', category, 'metaphysical'],
          metaphysicalContext: `This principle was discovered through automated codebase analysis and represents ${category} metaphysical concepts. Should be reviewed for alignment with the unified field theory.`,
          applications: ['principle_documentation', 'knowledge_completeness', 'automated_discovery', `${category}_understanding`]
        });
      });
    }
  });

  return patterns;
};

// Main generation
console.log('🧠 GENERATING KNOWLEDGE PATTERNS');
console.log('================================\n');

const testCases = extractTestCases();
const principles = extractPrinciples();

console.log(`📊 EXTRACTION RESULTS:`);
console.log(`  • Total test cases found: ${testCases.length}`);
console.log(`  • Total principles found: ${principles.length}`);

const testPatterns = generateTestPatterns(testCases);
const principlePatterns = generatePrinciplePatterns(principles);

console.log(`\n💡 GENERATED PATTERNS:`);
console.log(`  • Test patterns: ${testPatterns.length}`);
console.log(`  • Principle patterns: ${principlePatterns.length}`);

// Output the patterns in TypeScript format
console.log('\n📝 GENERATED KNOWLEDGE PATTERNS (TypeScript):');
console.log('// Auto-generated patterns to add to KnowledgeSystem.EXTRA_PATTERNS');
console.log('// Generated on:', new Date().toISOString());
console.log('');

testPatterns.forEach(pattern => {
  console.log(`{`);
  console.log(`  id: '${pattern.id}',`);
  console.log(`  name: '${pattern.name}',`);
  console.log(`  category: '${pattern.category}',`);
  console.log(`  description: '${pattern.description}',`);
  console.log(`  numericalData: null,`);
  console.log(`  relationships: [${pattern.relationships.map(r => `'${r}'`).join(', ')}],`);
  console.log(`  metaphysicalContext: '${pattern.metaphysicalContext}',`);
  console.log(`  applications: [${pattern.applications.map(a => `'${a}'`).join(', ')}]`);
  console.log(`},`);
  console.log('');
});

principlePatterns.forEach(pattern => {
  console.log(`{`);
  console.log(`  id: '${pattern.id}',`);
  console.log(`  name: '${pattern.name}',`);
  console.log(`  category: '${pattern.category}',`);
  console.log(`  description: '${pattern.description}',`);
  console.log(`  numericalData: null,`);
  console.log(`  relationships: [${pattern.relationships.map(r => `'${r}'`).join(', ')}],`);
  console.log(`  metaphysicalContext: '${pattern.metaphysicalContext}',`);
  console.log(`  applications: [${pattern.applications.map(a => `'${a}'`).join(', ')}]`);
  console.log(`},`);
  console.log('');
});

console.log('✅ GENERATION COMPLETE');
console.log('================================');
console.log(`\n💡 NEXT STEPS:`);
console.log(`  1. Review the generated patterns above`);
console.log(`  2. Copy the TypeScript code to KnowledgeSystem.EXTRA_PATTERNS`);
console.log(`  3. Run tests to validate the new patterns`);
console.log(`  4. Update QA knowledge base with new patterns`); 