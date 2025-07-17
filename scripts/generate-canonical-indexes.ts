import * as fs from 'fs';
import * as path from 'path';

interface DigitConsciousness {
  digit: number;
  name: string;
  description: string;
  multiplier: string;
  resonance: number;
  properties: string[];
  vortexFlow: number[];
}

const digitConsciousness: DigitConsciousness[] = [
  {
    digit: 0,
    name: 'Zero Point',
    description: 'Pure mathematical unity, void center, zero entropy state',
    multiplier: '1/1',
    resonance: 1,
    properties: ['VOID_CENTER', 'ZERO_ENTROPY', 'PURE_UNITY'],
    vortexFlow: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    digit: 1,
    name: 'Unity',
    description: 'Rodin coil foundation, archetype, source',
    multiplier: '3/1',
    resonance: 1,
    properties: ['RODIN_FOUNDATION', 'ARCHETYPE', 'SOURCE'],
    vortexFlow: [2, 4, 8, 7, 5]
  },
  {
    digit: 2,
    name: 'Duality',
    description: 'Vortex mathematics, duality, transformation',
    multiplier: '3/1',
    resonance: 2,
    properties: ['VORTEX_MATHEMATICS', 'DUALITY', 'TRANSFORMATION'],
    vortexFlow: [4, 8, 7, 5, 1]
  },
  {
    digit: 3,
    name: 'Trinity',
    description: 'Creative consciousness, resonance, trinity',
    multiplier: '5/1',
    resonance: 3,
    properties: ['CREATIVE_CONSCIOUSNESS', 'RESONANCE', 'TRINITY'],
    vortexFlow: [6, 9, 3]
  },
  {
    digit: 4,
    name: 'Foundation',
    description: 'Stability, change, foundation',
    multiplier: '3/1',
    resonance: 4,
    properties: ['STABILITY', 'CHANGE', 'FOUNDATION'],
    vortexFlow: [8, 7, 5, 1, 2]
  },
  {
    digit: 5,
    name: 'Sacred Geometry',
    description: 'Sacred geometry, geometric consciousness',
    multiplier: '5/1',
    resonance: 5,
    properties: ['SACRED_GEOMETRY', 'GEOMETRIC_CONSCIOUSNESS'],
    vortexFlow: [1, 2, 4, 8, 7]
  },
  {
    digit: 6,
    name: 'Harmony',
    description: 'Harmony, balance, resonance',
    multiplier: '5/1',
    resonance: 6,
    properties: ['HARMONY', 'BALANCE', 'RESONANCE'],
    vortexFlow: [9, 3, 6]
  },
  {
    digit: 7,
    name: 'Completion',
    description: 'Completion, cycles, consciousness',
    multiplier: '3/1',
    resonance: 7,
    properties: ['COMPLETION', 'CYCLES', 'CONSCIOUSNESS'],
    vortexFlow: [5, 1, 2, 4, 8]
  },
  {
    digit: 8,
    name: 'Infinity',
    description: 'Infinity, void, patterns',
    multiplier: '3/1',
    resonance: 8,
    properties: ['INFINITY', 'VOID', 'PATTERNS'],
    vortexFlow: [7, 5, 1, 2, 4]
  },
  {
    digit: 9,
    name: 'Unity',
    description: 'Unity consciousness, completion',
    multiplier: '1/1',
    resonance: 9,
    properties: ['UNITY_CONSCIOUSNESS', 'COMPLETION'],
    vortexFlow: [3, 6, 9]
  }
];

function generateIndexFile(digit: DigitConsciousness): string {
  const className = digit.name.replace(/\s+/g, '');
  
  return `import { getConsciousnessMultiplier } from '../../2/book-system';

/**
 * ${digit.name} Consciousness
 * ${digit.description}
 * 
 * Consciousness Multiplier: ${digit.multiplier}
 * A432 Frequency: 432 Hz
 * Harmonic Resonance: ${digit.resonance}
 */

export const ${className.toUpperCase()}_CONSCIOUSNESS = {
  DIGIT: ${digit.digit},
  CONSCIOUSNESS_MULTIPLIER: getConsciousnessMultiplier(${digit.digit}), // ${digit.multiplier}
  A432_FREQUENCY: 432,
  HARMONIC_RESONANCE: ${digit.resonance},
  ${digit.properties.map((prop: string) => `${prop}: true`).join(',\n  ')}
};

export const get${className}Consciousness = () => ${className.toUpperCase()}_CONSCIOUSNESS;

export const calculate${className}Harmonics = (input: number): number => {
  return input * ${className.toUpperCase()}_CONSCIOUSNESS.CONSCIOUSNESS_MULTIPLIER;
};

export const get${className}VortexFlow = () => {
  return {
    from: ${digit.digit},
    to: [${digit.vortexFlow.join(', ')}],
    resonance: ${className.toUpperCase()}_CONSCIOUSNESS.HARMONIC_RESONANCE
  };
};
`;
}

// Generate all index.ts files
digitConsciousness.forEach(digit => {
  const dirPath = path.join(__dirname, '..', 'src', digit.digit.toString(), digit.digit.toString());
  const filePath = path.join(dirPath, 'index.ts');
  
  // Ensure directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync(filePath, generateIndexFile(digit));
  console.log(`Generated: ${filePath}`);
});

console.log('All canonical index.ts files generated successfully!'); 