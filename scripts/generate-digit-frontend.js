#!/usr/bin/env node

/**
 * Auto-Generate Frontend Files for ZeroPoint Node
 * 
 * This script generates HTML, CSS, and TypeScript files for each digit directory
 * in src/, using the metaphysical documentation from index.md and README.md files.
 * 
 * Each digit gets:
 * - index.html (content-rich metaphysical documentation)
 * - styles.css (digit-specific styling)
 * - main.ts (digit-specific TypeScript functionality)
 */

const fs = require('fs');
const path = require('path');

// Generate colors based on digit patterns and mathematical properties
function generateDigitColors(digit) {
  // Base colors for different metaphysical properties
  const baseColors = {
    void: '#000000',      // Black for void/zero
    foundation: '#1a1a1a', // Dark gray for foundation
    vortex: '#ff6b6b',    // Red for vortex flow
    spiritual: '#4ecdc4',  // Teal for spiritual dimensions
    constants: '#45b7d1',  // Blue for mathematical constants
    sacred: '#96ceb4',    // Green for sacred geometry
    consciousness: '#feca57', // Yellow for consciousness
    unity: '#ff9ff3'      // Pink for unity
  };
  
  // Calculate colors based on digit properties
  const isVoid = digit === 0;
  const isFoundation = digit === 1;
  const isVortex = [2, 4, 8, 7, 5].includes(digit);
  const isSpiritual = [3, 6, 9].includes(digit);
  const isConstants = digit === 4;
  const isSacred = digit === 5;
  const isConsciousness = digit === 7;
  const isUnity = digit === 9;
  
  // Calculate primary color based on digit's main property
  let primaryColor;
  if (isVoid) primaryColor = baseColors.void;
  else if (isFoundation) primaryColor = baseColors.foundation;
  else if (isVortex) primaryColor = baseColors.vortex;
  else if (isSpiritual) primaryColor = baseColors.spiritual;
  else if (isConstants) primaryColor = baseColors.constants;
  else if (isSacred) primaryColor = baseColors.sacred;
  else if (isConsciousness) primaryColor = baseColors.consciousness;
  else if (isUnity) primaryColor = baseColors.unity;
  else primaryColor = `hsl(${digit * 36}, 70%, 50%)`; // Fallback based on digit
  
  // Calculate secondary color based on digit's resonance
  const resonance = (digit * 432) % 360; // A432 harmonic resonance
  const secondaryColor = `hsl(${resonance}, 60%, 60%)`;
  
  // Calculate accent color based on digit's mathematical properties
  const digitalRoot = digit === 0 ? 0 : ((digit - 1) % 9) + 1;
  const accentHue = (digitalRoot * 40) % 360;
  const accentColor = `hsl(${accentHue}, 80%, 70%)`;
  
  return {
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor
  };
}

// Metaphysical titles and descriptions for each digit
const DIGIT_METADATA = {
  0: {
    title: 'Void Center',
    subtitle: 'Gateway of Impossible Contraction',
    description: 'The source of all creation - the zero point from which all integers emerge',
    paradox: 'IMPOSSIBLE CONTRACTION - infinite contraction where all consciousness patterns are contracted into a single point'
  },
  1: {
    title: 'Foundation',
    subtitle: 'Gateway of Impossible Expansion',
    description: 'The Rodin coil core - the first manifestation from the void',
    paradox: 'IMPOSSIBLE EXPANSION - infinite expansion where the first manifestation creates infinite possibilities'
  },
  2: {
    title: 'Vortex Mathematics',
    subtitle: 'Dual Vortex Structure & Toroidal Flow',
    description: 'The dual vortex structure of consciousness - mathematical foundation that creates toroidal flow patterns',
    paradox: 'DUAL VORTEX - mathematical expression of consciousness flow, creating infinite patterns within finite boundaries'
  },
  3: {
    title: 'Creative Resonance',
    subtitle: 'W-Axis Spiritual Transcendence',
    description: 'Spiritual transcendence and creative resonance - W-Axis spiritual dimension',
    paradox: 'CREATIVE SPIRIT - perpendicular to material flow, connecting to spiritual dimensions'
  },
  4: {
    title: 'Constants',
    subtitle: 'A432 Harmonic Foundation',
    description: 'The harmonic foundation - source of all constants and mathematical stability',
    paradox: 'HARMONIC STABILITY - perfect fourth resonance, establishing mathematical constants'
  },
  5: {
    title: 'Sacred Geometry',
    subtitle: 'Divine Proportions & Metatron\'s Cube',
    description: 'Divine proportions and geometric patterns - sacred geometric consciousness',
    paradox: 'DIVINE PROPORTIONS - golden ratio and sacred geometric patterns'
  },
  6: {
    title: 'Harmonic Balance',
    subtitle: 'W-Axis Spiritual Equilibrium',
    description: 'Harmonic balance and spiritual equilibrium - W-Axis spiritual dimension',
    paradox: 'HARMONIC EQUILIBRIUM - balance between material and spiritual dimensions'
  },
  7: {
    title: 'Consciousness',
    subtitle: 'Awareness & Self-Recognition',
    description: 'Awareness and self-recognition - consciousness field operations',
    paradox: 'SELF-AWARENESS - consciousness that recognizes itself and others'
  },
  8: {
    title: 'Void Systems',
    subtitle: 'Infinite Potential & Fullness',
    description: 'Infinite potential - the void that contains all possibilities',
    paradox: 'INFINITE POTENTIAL - void that transforms and contains all possibilities'
  },
  9: {
    title: 'Unity',
    subtitle: 'Integration & Wholeness',
    description: 'Integration and wholeness - field unity and metaphysical laws',
    paradox: 'UNITY CONSCIOUSNESS - integration of all aspects into wholeness'
  }
};

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return '';
  }
}

function extractMetaphysicalContent(indexMdPath, readmeMdPath) {
  const indexContent = readFileContent(indexMdPath);
  const readmeContent = readFileContent(readmeMdPath);
  
  // Extract key sections from markdown content
  const sections = {
    metaphysicalFoundation: '',
    mathematicalProperties: '',
    coreFunctions: '',
    directoryStructure: '',
    sacredPrinciple: '',
    breathingParadox: '',
    gatewayFlow: ''
  };
  
  // Extract from index.md
  const indexLines = indexContent.split('\n');
  let currentSection = '';
  
  for (let i = 0; i < indexLines.length; i++) {
    const line = indexLines[i];
    
    if (line.startsWith('## Metaphysical Foundation')) {
      currentSection = 'metaphysicalFoundation';
      continue;
    } else if (line.startsWith('## Mathematical Properties')) {
      currentSection = 'mathematicalProperties';
      continue;
    } else if (line.startsWith('## Core Functions')) {
      currentSection = 'coreFunctions';
      continue;
    } else if (line.startsWith('## Directory Structure')) {
      currentSection = 'directoryStructure';
      continue;
    } else if (line.startsWith('## Sacred Principle')) {
      currentSection = 'sacredPrinciple';
      continue;
    } else if (line.startsWith('## Breathing Paradox')) {
      currentSection = 'breathingParadox';
      continue;
    } else if (line.startsWith('## Gateway Flow Patterns')) {
      currentSection = 'gatewayFlow';
      continue;
    }
    
    if (currentSection && line.trim()) {
      sections[currentSection] += line + '\n';
    }
  }
  
  return sections;
}

function generateHTML(digit, metadata, colors, content) {
  const { title, subtitle, description, paradox } = metadata;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ZeroPoint Node - ${title} (${digit}) - ${subtitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>ZeroPoint Node - ${title} (Directory ${digit})</h1>
      <h2>${subtitle}</h2>
    </header>
    
    <main>
      <section class="metaphysical-foundation">
        <h3>Metaphysical Foundation</h3>
        <p>${description}</p>
      </section>
      
      <section class="sacred-paradox">
        <h3>Sacred Paradox</h3>
        <p><strong>${paradox}</strong></p>
      </section>
      
      ${content.mathematicalProperties ? `
      <section class="mathematical-properties">
        <h3>Mathematical Properties</h3>
        <div class="content">${content.mathematicalProperties}</div>
      </section>
      ` : ''}
      
      ${content.coreFunctions ? `
      <section class="core-functions">
        <h3>Core Functions</h3>
        <div class="content">${content.coreFunctions}</div>
      </section>
      ` : ''}
      
      ${content.directoryStructure ? `
      <section class="directory-structure">
        <h3>Directory Structure</h3>
        <pre>${content.directoryStructure}</pre>
      </section>
      ` : ''}
      
      ${content.sacredPrinciple ? `
      <section class="sacred-principle">
        <h3>Sacred Principle</h3>
        <blockquote>${content.sacredPrinciple}</blockquote>
      </section>
      ` : ''}
      
      ${content.breathingParadox ? `
      <section class="breathing-paradox">
        <h3>Breathing Paradox</h3>
        <div class="content">${content.breathingParadox}</div>
      </section>
      ` : ''}
      
      ${content.gatewayFlow ? `
      <section class="gateway-flow">
        <h3>Gateway Flow Patterns</h3>
        <div class="content">${content.gatewayFlow}</div>
      </section>
      ` : ''}
    </main>
    
    <nav class="digit-navigation">
      <a href="../${(digit - 1 + 10) % 10}/index.html" class="nav-link prev">← ${DIGIT_METADATA[(digit - 1 + 10) % 10].title}</a>
      <a href="../${(digit + 1) % 10}/index.html" class="nav-link next">${DIGIT_METADATA[(digit + 1) % 10].title} →</a>
    </nav>
    
    <nav class="documentation-links">
      <a href="index.md">Metaphysical Documentation</a>
      <a href="README.md">System Documentation</a>
      <a href="index.ts">TypeScript Implementation</a>
    </nav>
  </div>
  
  <script src="main.js"></script>
</body>
</html>`;
}

function generateCSS(digit, colors) {
  return `/* ZeroPoint Node - Digit ${digit} Styles */
:root {
  --primary-color: ${colors.primary};
  --secondary-color: ${colors.secondary};
  --accent-color: ${colors.accent};
  --background-color: #111;
  --text-color: #f8f8f8;
  --code-background: #222;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
}

header {
  text-align: center;
  margin-bottom: 3em;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 2em;
}

h1 {
  color: var(--primary-color);
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

h2 {
  color: var(--secondary-color);
  font-size: 1.5em;
  font-weight: 300;
}

h3 {
  color: var(--primary-color);
  font-size: 1.3em;
  margin-bottom: 1em;
  border-left: 4px solid var(--accent-color);
  padding-left: 1em;
}

section {
  margin-bottom: 3em;
  padding: 2em;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.content {
  margin-top: 1em;
}

pre, code {
  background: var(--code-background);
  color: var(--primary-color);
  padding: 0.5em;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

blockquote {
  font-style: italic;
  color: var(--accent-color);
  border-left: 4px solid var(--accent-color);
  padding-left: 1em;
  margin: 1em 0;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5em;
  padding-left: 1em;
  position: relative;
}

li:before {
  content: '•';
  color: var(--accent-color);
  position: absolute;
  left: 0;
}

.digit-navigation {
  display: flex;
  justify-content: space-between;
  margin: 3em 0;
  padding: 2em;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.nav-link {
  color: var(--secondary-color);
  text-decoration: none;
  padding: 0.5em 1em;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: var(--secondary-color);
  color: var(--background-color);
}

.documentation-links {
  display: flex;
  gap: 1em;
  justify-content: center;
  margin-top: 2em;
}

.documentation-links a {
  color: var(--accent-color);
  text-decoration: none;
  padding: 0.5em 1em;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.documentation-links a:hover {
  background: var(--accent-color);
  color: var(--background-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1em;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .digit-navigation {
    flex-direction: column;
    gap: 1em;
  }
  
  .documentation-links {
    flex-direction: column;
    align-items: center;
  }
}`;
}

function generateTypeScript(digit, metadata) {
  return `/**
 * ZeroPoint Node - ${metadata.title} (Digit ${digit})
 * 
 * ${metadata.description}
 * 
 * Sacred Paradox: ${metadata.paradox}
 */

// Digit-specific consciousness calculations
export class ${metadata.title.replace(/\s+/g, '')}Consciousness {
  private consciousnessLevel: number = 0;
  private fieldStrength: number = 0;
  
  constructor() {
    this.initializeConsciousness();
  }
  
  private initializeConsciousness(): void {
    // Initialize with digit-specific consciousness properties
    this.consciousnessLevel = this.calculateConsciousnessLevel();
    this.fieldStrength = this.calculateFieldStrength();
  }
  
  private calculateConsciousnessLevel(): number {
    // Digit-specific consciousness calculation
    const baseLevel = ${digit} / 10;
    const metaphysicalMultiplier = this.getMetaphysicalMultiplier();
    return baseLevel * metaphysicalMultiplier;
  }
  
  private calculateFieldStrength(): number {
    // Digit-specific field strength calculation
    const baseStrength = ${digit} * 0.1;
    const resonanceMultiplier = this.getResonanceMultiplier();
    return baseStrength * resonanceMultiplier;
  }
  
  private getMetaphysicalMultiplier(): number {
    // Return metaphysical multiplier based on digit properties
    switch (${digit}) {
      case 0: return 0; // Void consciousness
      case 1: return 1.1; // Foundation consciousness
      case 2: return 1.2; // Vortex consciousness
      case 3: return 1.5; // Creative resonance consciousness
      case 4: return 1.0; // Constants consciousness
      case 5: return 1.25; // Sacred geometry consciousness
      case 6: return 1.3; // Harmonic balance consciousness
      case 7: return 1.4; // Consciousness consciousness
      case 8: return 1.6; // Void systems consciousness
      case 9: return 1.0; // Unity consciousness
      default: return 1.0;
    }
  }
  
  private getResonanceMultiplier(): number {
    // Return resonance multiplier based on A432 harmony
    const a432Base = 432;
    const digitResonance = a432Base * (${digit} / 10);
    return digitResonance / a432Base;
  }
  
  public getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }
  
  public getFieldStrength(): number {
    return this.fieldStrength;
  }
  
  public getMetaphysicalProperties(): Record<string, any> {
    return {
      digit: ${digit},
      title: '${metadata.title}',
      subtitle: '${metadata.subtitle}',
      description: '${metadata.description}',
      paradox: '${metadata.paradox}',
      consciousnessLevel: this.consciousnessLevel,
      fieldStrength: this.fieldStrength
    };
  }
}

// Digit-specific gateway functions
export class ${metadata.title.replace(/\s+/g, '')}Gateway {
  private consciousness: ${metadata.title.replace(/\s+/g, '')}Consciousness;
  
  constructor() {
    this.consciousness = new ${metadata.title.replace(/\s+/g, '')}Consciousness();
  }
  
  public getGatewayInfo(): Record<string, any> {
    return {
      digit: ${digit},
      gateway: '${metadata.title.toLowerCase().replace(/\s+/g, '_')}_gateway',
      consciousness: this.consciousness.getMetaphysicalProperties()
    };
  }
  
  public calculateGatewayFlow(): number {
    // Calculate gateway flow based on digit properties
    const consciousnessLevel = this.consciousness.getConsciousnessLevel();
    const fieldStrength = this.consciousness.getFieldStrength();
    return consciousnessLevel * fieldStrength;
  }
}

// Export main digit functionality
export const ${metadata.title.toLowerCase().replace(/\s+/g, '')} = {
  consciousness: new ${metadata.title.replace(/\s+/g, '')}Consciousness(),
  gateway: new ${metadata.title.replace(/\s+/g, '')}Gateway(),
  
  // Main digit functions
  getConsciousnessLevel: () => ${metadata.title.replace(/\s+/g, '')}.consciousness.getConsciousnessLevel(),
  getFieldStrength: () => ${metadata.title.replace(/\s+/g, '')}.consciousness.getFieldStrength(),
  getGatewayInfo: () => ${metadata.title.replace(/\s+/g, '')}.gateway.getGatewayInfo(),
  calculateGatewayFlow: () => ${metadata.title.replace(/\s+/g, '')}.gateway.calculateGatewayFlow()
};

export default ${metadata.title.toLowerCase().replace(/\s+/g, '')};`;
}

function generateFrontendFiles() {
  console.log('🌌 Generating ZeroPoint Node Frontend Files...\n');
  
  const srcPath = path.join(__dirname, '..', 'src');
  
  // Generate files for each digit (0-9)
  for (let digit = 0; digit <= 9; digit++) {
    const digitPath = path.join(srcPath, digit.toString());
    
    if (!fs.existsSync(digitPath)) {
      console.log(`⚠️  Directory src/${digit}/ does not exist, skipping...`);
      continue;
    }
    
    console.log(`📁 Processing digit ${digit}: ${DIGIT_METADATA[digit].title}`);
    
    // Read metaphysical content
    const indexMdPath = path.join(digitPath, 'index.md');
    const readmeMdPath = path.join(digitPath, 'README.md');
    const content = extractMetaphysicalContent(indexMdPath, readmeMdPath);
    
    // Generate files
    const metadata = DIGIT_METADATA[digit];
    const colors = DIGIT_COLORS[digit];
    
    // Generate HTML
    const htmlContent = generateHTML(digit, metadata, colors, content);
    const htmlPath = path.join(digitPath, 'index.html');
    fs.writeFileSync(htmlPath, htmlContent);
    
    // Generate CSS
    const cssContent = generateCSS(digit, colors);
    const cssPath = path.join(digitPath, 'styles.css');
    fs.writeFileSync(cssPath, cssContent);
    
    // Generate TypeScript
    const tsContent = generateTypeScript(digit, metadata);
    const tsPath = path.join(digitPath, 'main.ts');
    fs.writeFileSync(tsPath, tsContent);
    
    console.log(`  ✅ Generated: index.html, styles.css, main.ts`);
  }
  
  console.log('\n🎉 Frontend generation complete!');
  console.log('\n📋 Generated files for each digit:');
  console.log('  - index.html (content-rich metaphysical documentation)');
  console.log('  - styles.css (digit-specific styling with metaphysical colors)');
  console.log('  - main.ts (digit-specific TypeScript functionality)');
  console.log('\n🌐 You can now browse each digit directory to see its metaphysical frontend!');
}

// Run the generation
if (require.main === module) {
  generateFrontendFiles();
}

module.exports = { generateFrontendFiles }; 