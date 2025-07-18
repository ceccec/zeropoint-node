#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read all WORD.md files
const wordsDir = path.join(__dirname, 'words');
const wordFiles = fs.readdirSync(wordsDir).filter(file => file.endsWith('.md') && file !== 'INDEX.md');

// Extract letters from a word
const extractLetters = (word) => {
  return word.replace('.md', '').split('').filter(letter => /[A-Za-z]/.test(letter));
};

// Generate individual LETTER.md files
const generateLetterFiles = (wordFile, wordIndex, totalWords) => {
  const wordPath = path.join(wordsDir, wordFile);
  const wordContent = fs.readFileSync(wordPath, 'utf8');
  const wordName = wordFile.replace('.md', '');
  const letters = extractLetters(wordName);
  
  const lettersDir = path.join(__dirname, 'letters', wordName);
  
  // Create letters directory for this word if it doesn't exist
  if (!fs.existsSync(lettersDir)) {
    fs.mkdirSync(lettersDir, { recursive: true });
  }
  
  letters.forEach((letter, letterIndex) => {
    const letterContent = generateLetterContent(letter, letterIndex + 1, letters.length, wordName, wordIndex, totalWords);
    const letterPath = path.join(lettersDir, `${letter}.md`);
    fs.writeFileSync(letterPath, letterContent);
    console.log(`Generated: ${wordName}/${letter}.md`);
  });
  
  return letters.length;
};

// Generate content for each LETTER.md file
const generateLetterContent = (letter, letterIndex, totalLetters, wordName, wordIndex, totalWords) => {
  const a432Value = (letterIndex * 432) % 9 || 9;
  const harmonicValue = (letterIndex * 432) % 432 || 432;
  const wordA432Value = (wordIndex * 432) % 9 || 9;
  
  return `# ${letter.toUpperCase()} Vortex System

## ${letter.toUpperCase()} Matrix

\`\`\`typescript
interface ${letter.toUpperCase()}Pattern {
  pattern: string;
  ${letter.toLowerCase()}: number;
  evolution: number;
  matrix: number[][];
  harmonic: number;
  word: string;
  position: number;
}

class ${letter.toUpperCase()}System {
  private ${letter.toLowerCase()}: ${letter.toUpperCase()}Pattern[];
  private matrix: number[][];
  private evolution: number;
  private word: string;
  
  constructor(word: string) {
    this.${letter.toLowerCase()} = [];
    this.matrix = this.initialize${letter.toUpperCase()}Matrix();
    this.evolution = ${harmonicValue}; // A432 harmonic
    this.word = word;
  }
  
  // Initialize ${letter.toLowerCase()} matrix
  private initialize${letter.toUpperCase()}Matrix(): number[][] {
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
  
  // Generate ${letter.toLowerCase()} pattern
  generate${letter.toUpperCase()}Pattern(pattern: string, ${letter.toLowerCase()}: number, evolution: number, position: number): ${letter.toUpperCase()}Pattern {
    const ${letter.toLowerCase()}Pattern: ${letter.toUpperCase()}Pattern = {
      pattern,
      ${letter.toLowerCase()},
      evolution,
      matrix: this.matrix,
      harmonic: this.calculateHarmonic(${letter.toLowerCase()}, evolution),
      word: this.word,
      position
    };
    this.${letter.toLowerCase()}.push(${letter.toLowerCase()}Pattern);
    return ${letter.toLowerCase()}Pattern;
  }
  
  // Calculate harmonic value
  private calculateHarmonic(${letter.toLowerCase()}: number, evolution: number): number {
    return (${letter.toLowerCase()} * evolution) % 9 || 9;
  }
}
\`\`\`

## ${letter.toUpperCase()} Flow System

\`\`\`typescript
class ${letter.toUpperCase()}FlowSystem {
  private ${letter.toLowerCase()}: ${letter.toUpperCase()}System;
  
  constructor(word: string) {
    this.${letter.toLowerCase()} = new ${letter.toUpperCase()}System(word);
  }
  
  // Process ${letter.toLowerCase()} flow
  process${letter.toUpperCase()}Flow(data: any, position: number): ${letter.toUpperCase()}Pattern {
    const pattern = this.extractPattern(data);
    const ${letter.toLowerCase()} = this.calculate${letter.toUpperCase()}(data);
    const evolution = this.calculateEvolution(data);
    
    return this.${letter.toLowerCase()}.generate${letter.toUpperCase()}Pattern(pattern, ${letter.toLowerCase()}, evolution, position);
  }
  
  private extractPattern(data: any): string {
    return "${letter.toLowerCase()}_pattern";
  }
  
  private calculate${letter.toUpperCase()}(data: any): number {
    return ${harmonicValue}; // A432 harmonic
  }
  
  private calculateEvolution(data: any): number {
    return ${a432Value}; // A432 evolution
  }
}
\`\`\`

## ${letter.toUpperCase()} Integration

\`\`\`typescript
class ${letter.toUpperCase()}Integration {
  private flow: ${letter.toUpperCase()}FlowSystem;
  private patterns: ${letter.toUpperCase()}Pattern[];
  
  constructor(word: string) {
    this.flow = new ${letter.toUpperCase()}FlowSystem(word);
    this.patterns = [];
  }
  
  // Integrate ${letter.toLowerCase()} system
  integrate${letter.toUpperCase()}(data: any, position: number): ${letter.toUpperCase()}Pattern {
    const pattern = this.flow.process${letter.toUpperCase()}Flow(data, position);
    this.patterns.push(pattern);
    return pattern;
  }
  
  // Get all ${letter.toLowerCase()} patterns
  getAll${letter.toUpperCase()}Patterns(): ${letter.toUpperCase()}Pattern[] {
    return this.patterns;
  }
}
\`\`\`

## ${letter.toUpperCase()} Vortex Matrix

The ${letter.toUpperCase()} vortex matrix represents:

1. **${letter.toUpperCase()} Generation** - Pattern ${letter.toLowerCase()} and evolution creation
2. **Harmonic Generation** - ${letter.toUpperCase()} harmonic and evolution calculations
3. **Matrix Evolution** - ${letter.toUpperCase()} matrix updates and calculations
4. **Pattern Recognition** - ${letter.toUpperCase()} pattern creation and storage
5. **Word Integration** - ${letter.toUpperCase()} integration within word context

Each ${letter.toLowerCase()} interaction generates:
- ${letter.toUpperCase()} pattern recognition and generation
- Evolution calculations and harmonic values
- Matrix updates and evolution
- ${letter.toUpperCase()} pattern storage and retrieval
- Word position and context awareness

The system operates as a continuous ${letter.toLowerCase()} vortex, generating ${letter.toUpperCase()} patterns through evolution and A432 harmonic resonance within the word context.

## Hologram Proof

This LETTER.md file is part ${letterIndex} of ${totalLetters} in the word "${wordName}" (word ${wordIndex} of ${totalWords}), proving that each letter contains the complete mathematical structure of the entire system. Each letter is a complete vortex system that reflects the whole BOOK through A432 harmonic mathematics.

**Letter**: ${letter.toUpperCase()}
**Letter Index**: ${letterIndex}/${totalLetters}
**Word**: ${wordName}
**Word Index**: ${wordIndex}/${totalWords}
**A432 Value**: ${a432Value}
**Harmonic Value**: ${harmonicValue}
**Word A432 Value**: ${wordA432Value}
**Letter Hologram Fraction**: ${letterIndex}/${totalLetters} = ${(letterIndex/totalLetters).toFixed(4)}
**Word Hologram Fraction**: ${wordIndex}/${totalWords} = ${(wordIndex/totalWords).toFixed(4)}
**Total Hologram Fraction**: ${letterIndex}/${totalLetters} × ${wordIndex}/${totalWords} = ${((letterIndex/totalLetters) * (wordIndex/totalWords)).toFixed(6)}
`;
};

// Generate master index for all letters
const generateMasterIndex = (wordFiles) => {
  let totalLetters = 0;
  const wordStats = [];
  
  wordFiles.forEach((wordFile, wordIndex) => {
    const wordName = wordFile.replace('.md', '');
    const letters = extractLetters(wordName);
    totalLetters += letters.length;
    wordStats.push({
      word: wordName,
      letters: letters.length,
      wordIndex: wordIndex + 1
    });
  });
  
  const indexContent = `# LETTER Hologram Split Master Index

## Hologram Proof

This index contains all letters split from every WORD.md file, proving the holographic nature of the mathematical system at the letter level. Each letter contains the complete structure of the entire system.

## Word Statistics

${wordStats.map(stat => 
  `${stat.wordIndex}. **${stat.word}** - ${stat.letters} letters`
).join('\n')}

## Letter Breakdown

${wordStats.map(stat => {
  const letters = extractLetters(stat.word);
  return `### ${stat.word} (${stat.letters} letters)
${letters.map((letter, letterIndex) => 
  `- **[${letter}](./letters/${stat.word}/${letter}.md)** - Position ${letterIndex + 1}/${stat.letters}`
).join('\n')}`;
}).join('\n\n')}

## Hologram Mathematics

Each letter file contains:
- Complete TypeScript interface and class structure
- A432 harmonic calculations
- Vortex matrix operations
- Integration system
- Word context awareness
- Position tracking
- Hologram proof documentation

The entire BOOK is contained within each individual LETTER, proving the holographic nature of the mathematical system at the finest level.

## Total Statistics

- **Total Words**: ${wordFiles.length}
- **Total Letters**: ${totalLetters}
- **A432 Base**: 432 Hz
- **Word Hologram Fraction**: 1/${wordFiles.length}
- **Letter Hologram Fraction**: 1/${totalLetters}
- **Combined Hologram Fraction**: 1/${wordFiles.length} × 1/${totalLetters} = 1/${wordFiles.length * totalLetters}
`;
  
  const indexPath = path.join(__dirname, 'letters', 'MASTER_INDEX.md');
  fs.writeFileSync(indexPath, indexContent);
  console.log('Generated: letters/MASTER_INDEX.md');
};

// Main execution
const main = () => {
  console.log('Splitting every WORD.md into individual LETTER.md files...');
  
  let totalLetters = 0;
  
  wordFiles.forEach((wordFile, wordIndex) => {
    console.log(`\nProcessing word: ${wordFile}`);
    const letterCount = generateLetterFiles(wordFile, wordIndex + 1, wordFiles.length);
    totalLetters += letterCount;
  });
  
  generateMasterIndex(wordFiles);
  
  console.log(`\nLetter hologram split complete! Generated ${totalLetters} LETTER.md files.`);
  console.log('Each letter contains the complete mathematical structure of the BOOK.');
  console.log('This proves the holographic nature of the system at the letter level.');
  console.log(`Total words: ${wordFiles.length}, Total letters: ${totalLetters}`);
};

main(); 