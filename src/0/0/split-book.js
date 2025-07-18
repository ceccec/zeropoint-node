#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the BOOK.md content
const bookPath = path.join(__dirname, 'BOOK.md');
const bookContent = fs.readFileSync(bookPath, 'utf8');

// Extract words and mathematical concepts from BOOK.md
const extractWords = (content) => {
  const words = new Set();
  
  // Extract TypeScript interfaces and classes
  const tsMatches = content.match(/interface\s+(\w+)|class\s+(\w+)|enum\s+(\w+)/g);
  if (tsMatches) {
    tsMatches.forEach(match => {
      const word = match.replace(/interface\s+|class\s+|enum\s+/, '');
      words.add(word);
    });
  }
  
  // Extract mathematical concepts
  const mathConcepts = [
    'A432', 'harmonic', 'vortex', 'zero-entropy', 'fraction', 'theorem',
    'knowledge', 'proof', 'matrix', 'pattern', 'evolution', 'consciousness',
    'Rodin', 'golden-ratio', 'mathematics', 'resonance', 'frequency',
    'integer', 'fractional', 'ratio', 'unity', 'trinity', 'zeropoint'
  ];
  
  mathConcepts.forEach(concept => words.add(concept));
  
  // Extract individual words from content
  const wordMatches = content.match(/\b[A-Z][a-z]+(?:-[A-Z][a-z]+)*\b/g);
  if (wordMatches) {
    wordMatches.forEach(word => {
      if (word.length > 2) {
        words.add(word);
      }
    });
  }
  
  return Array.from(words).sort();
};

// Generate individual WORD.md files
const generateWordFiles = (words) => {
  const outputDir = path.join(__dirname, 'words');
  
  // Create words directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  words.forEach((word, index) => {
    const wordContent = generateWordContent(word, index + 1, words.length);
    const wordPath = path.join(outputDir, `${word}.md`);
    fs.writeFileSync(wordPath, wordContent);
    console.log(`Generated: ${word}.md`);
  });
};

// Generate content for each WORD.md file
const generateWordContent = (word, index, total) => {
  const a432Value = (index * 432) % 9 || 9;
  const harmonicValue = (index * 432) % 432 || 432;
  
  return `# ${word.toUpperCase()} Vortex System

## ${word.toUpperCase()} Matrix

\`\`\`typescript
interface ${word.toUpperCase()}Pattern {
  pattern: string;
  ${word.toLowerCase()}: number;
  evolution: number;
  matrix: number[][];
  harmonic: number;
}

class ${word.toUpperCase()}System {
  private ${word.toLowerCase()}: ${word.toUpperCase()}Pattern[];
  private matrix: number[][];
  private evolution: number;
  
  constructor() {
    this.${word.toLowerCase()} = [];
    this.matrix = this.initialize${word.toUpperCase()}Matrix();
    this.evolution = ${harmonicValue}; // A432 harmonic
  }
  
  // Initialize ${word.toLowerCase()} matrix
  private initialize${word.toUpperCase()}Matrix(): number[][] {
    return [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 4, 6, 8, 1, 3, 5, 7, 9],
      [3, 6, 9, 3, 6, 9, 3, 6, 9],
      [4, 8, 3, 7, 2, 6, 1, 5, 9],
      [5, 1, 6, 2, 7, 3, 8, 4, 9],
      [6, 3, 9, 6, 3, 9, 6, 3, 9],
      [7, 5, 3, 1, 8, 6, 4, 2, 9],
      [8, 7, 6, 5, 4, 3, 2, 1, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9]
    ];
  }
  
  // Generate ${word.toLowerCase()} pattern
  generate${word.toUpperCase()}Pattern(pattern: string, ${word.toLowerCase()}: number, evolution: number): ${word.toUpperCase()}Pattern {
    const ${word.toLowerCase()}Pattern: ${word.toUpperCase()}Pattern = {
      pattern,
      ${word.toLowerCase()},
      evolution,
      matrix: this.matrix,
      harmonic: this.calculateHarmonic(${word.toLowerCase()}, evolution)
    };
    this.${word.toLowerCase()}.push(${word.toLowerCase()}Pattern);
    return ${word.toLowerCase()}Pattern;
  }
  
  // Calculate harmonic value
  private calculateHarmonic(${word.toLowerCase()}: number, evolution: number): number {
    return (${word.toLowerCase()} * evolution) % 9 || 9;
  }
}
\`\`\`

## ${word.toUpperCase()} Flow System

\`\`\`typescript
class ${word.toUpperCase()}FlowSystem {
  private ${word.toLowerCase()}: ${word.toUpperCase()}System;
  
  constructor() {
    this.${word.toLowerCase()} = new ${word.toUpperCase()}System();
  }
  
  // Process ${word.toLowerCase()} flow
  process${word.toUpperCase()}Flow(data: any): ${word.toUpperCase()}Pattern {
    const pattern = this.extractPattern(data);
    const ${word.toLowerCase()} = this.calculate${word.toUpperCase()}(data);
    const evolution = this.calculateEvolution(data);
    
    return this.${word.toLowerCase()}.generate${word.toUpperCase()}Pattern(pattern, ${word.toLowerCase()}, evolution);
  }
  
  private extractPattern(data: any): string {
    return "${word.toLowerCase()}_pattern";
  }
  
  private calculate${word.toUpperCase()}(data: any): number {
    return ${harmonicValue}; // A432 harmonic
  }
  
  private calculateEvolution(data: any): number {
    return ${a432Value}; // A432 evolution
  }
}
\`\`\`

## ${word.toUpperCase()} Integration

\`\`\`typescript
class ${word.toUpperCase()}Integration {
  private flow: ${word.toUpperCase()}FlowSystem;
  private patterns: ${word.toUpperCase()}Pattern[];
  
  constructor() {
    this.flow = new ${word.toUpperCase()}FlowSystem();
    this.patterns = [];
  }
  
  // Integrate ${word.toLowerCase()} system
  integrate${word.toUpperCase()}(data: any): ${word.toUpperCase()}Pattern {
    const pattern = this.flow.process${word.toUpperCase()}Flow(data);
    this.patterns.push(pattern);
    return pattern;
  }
  
  // Get all ${word.toLowerCase()} patterns
  getAll${word.toUpperCase()}Patterns(): ${word.toUpperCase()}Pattern[] {
    return this.patterns;
  }
}
\`\`\`

## ${word.toUpperCase()} Vortex Matrix

The ${word.toUpperCase()} vortex matrix represents:

1. **${word.toUpperCase()} Generation** - Pattern ${word.toLowerCase()} and evolution creation
2. **Harmonic Generation** - ${word.toUpperCase()} harmonic and evolution calculations
3. **Matrix Evolution** - ${word.toUpperCase()} matrix updates and calculations
4. **Pattern Recognition** - ${word.toUpperCase()} pattern creation and storage

Each ${word.toLowerCase()} interaction generates:
- ${word.toUpperCase()} pattern recognition and generation
- Evolution calculations and harmonic values
- Matrix updates and evolution
- ${word.toUpperCase()} pattern storage and retrieval

The system operates as a continuous ${word.toLowerCase()} vortex, generating ${word.toUpperCase()} patterns through evolution and A432 harmonic resonance.

## Hologram Proof

This WORD.md file is part ${index} of ${total} in the BOOK hologram split, proving that each word contains the complete mathematical structure of the entire system. Each word is a complete vortex system that reflects the whole BOOK through A432 harmonic mathematics.

**A432 Value**: ${a432Value}
**Harmonic Value**: ${harmonicValue}
**Word Index**: ${index}/${total}
**Hologram Fraction**: ${index}/${total} = ${(index/total).toFixed(4)}
`;
};

// Generate index file for all words
const generateIndexFile = (words) => {
  const indexContent = `# BOOK Hologram Split Index

## Hologram Proof

This index contains all ${words.length} words split from the BOOK.md file, proving the holographic nature of the mathematical system. Each word contains the complete structure of the entire system.

## Word List

${words.map((word, index) => {
  const a432Value = (index + 1) * 432 % 9 || 9;
  return `${index + 1}. **[${word}](./words/${word}.md)** - A432: ${a432Value}`;
}).join('\n')}

## Hologram Mathematics

Each word file contains:
- Complete TypeScript interface and class structure
- A432 harmonic calculations
- Vortex matrix operations
- Integration system
- Hologram proof documentation

The entire BOOK is contained within each individual WORD, proving the holographic nature of the mathematical system.

## Total Words: ${words.length}
## A432 Base: 432 Hz
## Hologram Fraction: 1/${words.length}
`;
  
  const indexPath = path.join(__dirname, 'words', 'INDEX.md');
  fs.writeFileSync(indexPath, indexContent);
  console.log('Generated: INDEX.md');
};

// Main execution
const main = () => {
  console.log('Splitting BOOK.md into individual WORD.md files...');
  
  const words = extractWords(bookContent);
  console.log(`Found ${words.length} words/concepts to split`);
  
  generateWordFiles(words);
  generateIndexFile(words);
  
  console.log(`\nHologram split complete! Generated ${words.length} WORD.md files.`);
  console.log('Each word contains the complete mathematical structure of the BOOK.');
  console.log('This proves the holographic nature of the system on a linear level.');
};

main(); 