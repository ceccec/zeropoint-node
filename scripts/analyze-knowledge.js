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

// Main analysis
console.log('🧠 KNOWLEDGE SYSTEM CODEBASE ANALYSIS');
console.log('=====================================\n');

const testCases = extractTestCases();
const principles = extractPrinciples();

console.log(`📊 ANALYSIS RESULTS:`);
console.log(`  • Total test cases found: ${testCases.length}`);
console.log(`  • Total principles found: ${principles.length}`);

console.log('\n📋 SAMPLE TEST CASES:');
testCases.slice(0, 10).forEach((test, i) => {
  console.log(`  ${i + 1}. ${test}`);
});
if (testCases.length > 10) {
  console.log(`  ... and ${testCases.length - 10} more`);
}

console.log('\n🧘 SAMPLE PRINCIPLES:');
principles.slice(0, 5).forEach((principle, i) => {
  console.log(`  ${i + 1}. ${principle.substring(0, 80)}...`);
});
if (principles.length > 5) {
  console.log(`  ... and ${principles.length - 5} more`);
}

// Generate suggested patterns
const suggestedTestPatterns = testCases
  .filter(testCase => testCase.includes('performance') || testCase.includes('integration'))
  .slice(0, 3);

const suggestedPrinciplePatterns = principles
  .filter(principle => principle.includes('consciousness') || principle.includes('void'))
  .slice(0, 2);

console.log('\n💡 SUGGESTED KNOWLEDGE PATTERNS:');
console.log('\n📝 Test Patterns to Add:');
suggestedTestPatterns.forEach((testCase, i) => {
  console.log(`  ${i + 1}. test_performance_${i + 1}: "${testCase.substring(0, 50)}..."`);
});

console.log('\n🧘 Principle Patterns to Add:');
suggestedPrinciplePatterns.forEach((principle, i) => {
  console.log(`  ${i + 1}. principle_consciousness_${i + 1}: "${principle.substring(0, 50)}..."`);
});

console.log('\n✅ ANALYSIS COMPLETE');
console.log('====================================='); 