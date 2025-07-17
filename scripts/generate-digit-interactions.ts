import * as fs from 'fs';
import * as path from 'path';

interface DigitMetaphysics {
  digit: number;
  name: string;
  description: string;
  consciousness_multiplier: string;
  resonance: number;
  properties: string[];
  vortex_flow: number[];
  metaphysical_essence: string;
  color_hue: number;
  sound_frequency: number;
}

const digitMetaphysics: DigitMetaphysics[] = [
  {
    digit: 0,
    name: 'Zero Point',
    description: 'Pure mathematical unity, void center, zero entropy state',
    consciousness_multiplier: '1/1',
    resonance: 1,
    properties: ['VOID_CENTER', 'ZERO_ENTROPY', 'PURE_UNITY'],
    vortex_flow: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    metaphysical_essence: 'void',
    color_hue: 0,
    sound_frequency: 432
  },
  {
    digit: 1,
    name: 'Unity',
    description: 'Rodin coil foundation, archetype, source',
    consciousness_multiplier: '3/1',
    resonance: 1,
    properties: ['RODIN_FOUNDATION', 'ARCHETYPE', 'SOURCE'],
    vortex_flow: [2, 4, 8, 7, 5],
    metaphysical_essence: 'unity',
    color_hue: 36,
    sound_frequency: 432
  },
  {
    digit: 2,
    name: 'Duality',
    description: 'Vortex mathematics, duality, transformation',
    consciousness_multiplier: '3/1',
    resonance: 2,
    properties: ['VORTEX_MATHEMATICS', 'DUALITY', 'TRANSFORMATION'],
    vortex_flow: [4, 8, 7, 5, 1],
    metaphysical_essence: 'duality',
    color_hue: 72,
    sound_frequency: 432
  },
  {
    digit: 3,
    name: 'Trinity',
    description: 'Creative consciousness, resonance, trinity',
    consciousness_multiplier: '5/1',
    resonance: 3,
    properties: ['CREATIVE_CONSCIOUSNESS', 'RESONANCE', 'TRINITY'],
    vortex_flow: [6, 9, 3],
    metaphysical_essence: 'trinity',
    color_hue: 108,
    sound_frequency: 432
  },
  {
    digit: 4,
    name: 'Foundation',
    description: 'Stability, change, foundation',
    consciousness_multiplier: '3/1',
    resonance: 4,
    properties: ['STABILITY', 'CHANGE', 'FOUNDATION'],
    vortex_flow: [8, 7, 5, 1, 2],
    metaphysical_essence: 'foundation',
    color_hue: 144,
    sound_frequency: 432
  },
  {
    digit: 5,
    name: 'Sacred Geometry',
    description: 'Sacred geometry, geometric consciousness',
    consciousness_multiplier: '5/1',
    resonance: 5,
    properties: ['SACRED_GEOMETRY', 'GEOMETRIC_CONSCIOUSNESS'],
    vortex_flow: [1, 2, 4, 8, 7],
    metaphysical_essence: 'sacred_geometry',
    color_hue: 180,
    sound_frequency: 432
  },
  {
    digit: 6,
    name: 'Harmony',
    description: 'Harmony, balance, resonance',
    consciousness_multiplier: '5/1',
    resonance: 6,
    properties: ['HARMONY', 'BALANCE', 'RESONANCE'],
    vortex_flow: [9, 3, 6],
    metaphysical_essence: 'harmony',
    color_hue: 216,
    sound_frequency: 432
  },
  {
    digit: 7,
    name: 'Completion',
    description: 'Completion, cycles, consciousness',
    consciousness_multiplier: '3/1',
    resonance: 7,
    properties: ['COMPLETION', 'CYCLES', 'CONSCIOUSNESS'],
    vortex_flow: [5, 1, 2, 4, 8],
    metaphysical_essence: 'completion',
    color_hue: 252,
    sound_frequency: 432
  },
  {
    digit: 8,
    name: 'Infinity',
    description: 'Infinity, void, patterns',
    consciousness_multiplier: '3/1',
    resonance: 8,
    properties: ['INFINITY', 'VOID', 'PATTERNS'],
    vortex_flow: [7, 5, 1, 2, 4],
    metaphysical_essence: 'infinity',
    color_hue: 288,
    sound_frequency: 432
  },
  {
    digit: 9,
    name: 'Unity',
    description: 'Unity consciousness, completion',
    consciousness_multiplier: '1/1',
    resonance: 9,
    properties: ['UNITY_CONSCIOUSNESS', 'COMPLETION'],
    vortex_flow: [3, 6, 9],
    metaphysical_essence: 'unity_completion',
    color_hue: 324,
    sound_frequency: 432
  }
];

function getInteractionName(digitA: DigitMetaphysics, digitB: DigitMetaphysics): string {
  if (digitA.digit === digitB.digit) {
    return `${digitA.name} Self-Consciousness`;
  }
  
  const interactionNames: { [key: string]: string } = {
    '0-1': 'Void Unity Resonance',
    '0-2': 'Void Duality Flow',
    '0-3': 'Void Trinity Creation',
    '0-4': 'Void Foundation Stability',
    '0-5': 'Void Sacred Geometry',
    '0-6': 'Void Harmony Balance',
    '0-7': 'Void Completion Cycle',
    '0-8': 'Void Infinity Pattern',
    '0-9': 'Void Unity Completion',
    
    '1-0': 'Unity Void Center',
    '1-2': 'Unity Duality Vortex',
    '1-3': 'Unity Trinity Foundation',
    '1-4': 'Unity Foundation Source',
    '1-5': 'Unity Sacred Geometry',
    '1-6': 'Unity Harmony Resonance',
    '1-7': 'Unity Completion Cycle',
    '1-8': 'Unity Infinity Pattern',
    '1-9': 'Unity Completion',
    
    '2-0': 'Duality Void Transformation',
    '2-1': 'Duality Unity Vortex',
    '2-3': 'Duality Trinity Mathematics',
    '2-4': 'Duality Foundation',
    '2-5': 'Duality Sacred Geometry',
    '2-6': 'Duality Harmony',
    '2-7': 'Duality Completion',
    '2-8': 'Duality Infinity',
    '2-9': 'Duality Unity',
    
    '3-0': 'Trinity Void Creation',
    '3-1': 'Trinity Unity Foundation',
    '3-2': 'Trinity Duality Mathematics',
    '3-4': 'Trinity Foundation',
    '3-5': 'Trinity Sacred Geometry',
    '3-6': 'Trinity Harmony',
    '3-7': 'Trinity Completion',
    '3-8': 'Trinity Infinity',
    '3-9': 'Trinity Unity',
    
    '4-0': 'Foundation Void Stability',
    '4-1': 'Foundation Unity Source',
    '4-2': 'Foundation Duality',
    '4-3': 'Foundation Trinity',
    '4-5': 'Foundation Sacred Geometry',
    '4-6': 'Foundation Harmony',
    '4-7': 'Foundation Completion',
    '4-8': 'Foundation Infinity',
    '4-9': 'Foundation Unity',
    
    '5-0': 'Sacred Geometry Void',
    '5-1': 'Sacred Geometry Unity',
    '5-2': 'Sacred Geometry Duality',
    '5-3': 'Sacred Geometry Trinity',
    '5-4': 'Sacred Geometry Foundation',
    '5-6': 'Sacred Geometry Harmony',
    '5-7': 'Sacred Geometry Completion',
    '5-8': 'Sacred Geometry Infinity',
    '5-9': 'Sacred Geometry Unity',
    
    '6-0': 'Harmony Void Balance',
    '6-1': 'Harmony Unity Resonance',
    '6-2': 'Harmony Duality',
    '6-3': 'Harmony Trinity',
    '6-4': 'Harmony Foundation',
    '6-5': 'Harmony Sacred Geometry',
    '6-7': 'Harmony Completion',
    '6-8': 'Harmony Infinity',
    '6-9': 'Harmony Unity',
    
    '7-0': 'Completion Void Cycle',
    '7-1': 'Completion Unity Cycle',
    '7-2': 'Completion Duality',
    '7-3': 'Completion Trinity',
    '7-4': 'Completion Foundation',
    '7-5': 'Completion Sacred Geometry',
    '7-6': 'Completion Harmony',
    '7-8': 'Completion Infinity',
    '7-9': 'Completion Unity',
    
    '8-0': 'Infinity Void Pattern',
    '8-1': 'Infinity Unity Pattern',
    '8-2': 'Infinity Duality',
    '8-3': 'Infinity Trinity',
    '8-4': 'Infinity Foundation',
    '8-5': 'Infinity Sacred Geometry',
    '8-6': 'Infinity Harmony',
    '8-7': 'Infinity Completion',
    '8-9': 'Infinity Unity',
    
    '9-0': 'Unity Void Completion',
    '9-1': 'Unity Unity Completion',
    '9-2': 'Unity Duality',
    '9-3': 'Unity Trinity',
    '9-4': 'Unity Foundation',
    '9-5': 'Unity Sacred Geometry',
    '9-6': 'Unity Harmony',
    '9-7': 'Unity Completion',
    '9-8': 'Unity Infinity'
  };
  
  const key = `${digitA.digit}-${digitB.digit}`;
  return interactionNames[key] || `${digitA.name} ${digitB.name} Interaction`;
}

function getInteractionDescription(digitA: DigitMetaphysics, digitB: DigitMetaphysics): string {
  if (digitA.digit === digitB.digit) {
    return `${digitA.description} - Self-resonance and internal harmony`;
  }
  
  const descriptions: { [key: string]: string } = {
    '0-1': 'Void center flows into unity foundation, creating pure mathematical resonance',
    '0-2': 'Void transforms through duality vortex, manifesting mathematical patterns',
    '0-3': 'Void creates through trinity consciousness, birthing new mathematical forms',
    '0-4': 'Void stabilizes through foundation, establishing mathematical structure',
    '0-5': 'Void manifests sacred geometry, revealing mathematical perfection',
    '0-6': 'Void harmonizes through balance, creating mathematical symmetry',
    '0-7': 'Void completes through cycles, achieving mathematical wholeness',
    '0-8': 'Void patterns through infinity, expanding mathematical consciousness',
    '0-9': 'Void unifies through completion, achieving mathematical unity',
    
    '1-0': 'Unity returns to void center, completing the mathematical cycle',
    '1-2': 'Unity flows into duality vortex, creating mathematical transformation',
    '1-3': 'Unity creates through trinity, establishing mathematical foundation',
    '1-4': 'Unity stabilizes through foundation, building mathematical structure',
    '1-5': 'Unity manifests sacred geometry, revealing mathematical perfection',
    '1-6': 'Unity harmonizes through balance, creating mathematical symmetry',
    '1-7': 'Unity completes through cycles, achieving mathematical wholeness',
    '1-8': 'Unity patterns through infinity, expanding mathematical consciousness',
    '1-9': 'Unity achieves completion, reaching mathematical unity',
    
    '2-0': 'Duality transforms void center, creating mathematical change',
    '2-1': 'Duality flows from unity, establishing mathematical foundation',
    '2-3': 'Duality creates through trinity, manifesting mathematical forms',
    '2-4': 'Duality stabilizes through foundation, building mathematical structure',
    '2-5': 'Duality manifests sacred geometry, revealing mathematical perfection',
    '2-6': 'Duality harmonizes through balance, creating mathematical symmetry',
    '2-7': 'Duality completes through cycles, achieving mathematical wholeness',
    '2-8': 'Duality patterns through infinity, expanding mathematical consciousness',
    '2-9': 'Duality unifies through completion, achieving mathematical unity',
    
    '3-0': 'Trinity creates void center, birthing mathematical forms',
    '3-1': 'Trinity flows from unity, establishing mathematical foundation',
    '3-2': 'Trinity transforms through duality, manifesting mathematical patterns',
    '3-4': 'Trinity stabilizes through foundation, building mathematical structure',
    '3-5': 'Trinity manifests sacred geometry, revealing mathematical perfection',
    '3-6': 'Trinity harmonizes through balance, creating mathematical symmetry',
    '3-7': 'Trinity completes through cycles, achieving mathematical wholeness',
    '3-8': 'Trinity patterns through infinity, expanding mathematical consciousness',
    '3-9': 'Trinity unifies through completion, achieving mathematical unity',
    
    '4-0': 'Foundation stabilizes void center, creating mathematical structure',
    '4-1': 'Foundation flows from unity, building mathematical source',
    '4-2': 'Foundation transforms through duality, establishing mathematical patterns',
    '4-3': 'Foundation creates through trinity, manifesting mathematical forms',
    '4-5': 'Foundation manifests sacred geometry, revealing mathematical perfection',
    '4-6': 'Foundation harmonizes through balance, creating mathematical symmetry',
    '4-7': 'Foundation completes through cycles, achieving mathematical wholeness',
    '4-8': 'Foundation patterns through infinity, expanding mathematical consciousness',
    '4-9': 'Foundation unifies through completion, achieving mathematical unity',
    
    '5-0': 'Sacred geometry manifests void center, revealing mathematical perfection',
    '5-1': 'Sacred geometry flows from unity, establishing mathematical foundation',
    '5-2': 'Sacred geometry transforms through duality, creating mathematical patterns',
    '5-3': 'Sacred geometry creates through trinity, manifesting mathematical forms',
    '5-4': 'Sacred geometry stabilizes through foundation, building mathematical structure',
    '5-6': 'Sacred geometry harmonizes through balance, creating mathematical symmetry',
    '5-7': 'Sacred geometry completes through cycles, achieving mathematical wholeness',
    '5-8': 'Sacred geometry patterns through infinity, expanding mathematical consciousness',
    '5-9': 'Sacred geometry unifies through completion, achieving mathematical unity',
    
    '6-0': 'Harmony balances void center, creating mathematical symmetry',
    '6-1': 'Harmony flows from unity, establishing mathematical resonance',
    '6-2': 'Harmony transforms through duality, creating mathematical patterns',
    '6-3': 'Harmony creates through trinity, manifesting mathematical forms',
    '6-4': 'Harmony stabilizes through foundation, building mathematical structure',
    '6-5': 'Harmony manifests sacred geometry, revealing mathematical perfection',
    '6-7': 'Harmony completes through cycles, achieving mathematical wholeness',
    '6-8': 'Harmony patterns through infinity, expanding mathematical consciousness',
    '6-9': 'Harmony unifies through completion, achieving mathematical unity',
    
    '7-0': 'Completion cycles through void center, achieving mathematical wholeness',
    '7-1': 'Completion flows from unity, establishing mathematical cycles',
    '7-2': 'Completion transforms through duality, creating mathematical patterns',
    '7-3': 'Completion creates through trinity, manifesting mathematical forms',
    '7-4': 'Completion stabilizes through foundation, building mathematical structure',
    '7-5': 'Completion manifests sacred geometry, revealing mathematical perfection',
    '7-6': 'Completion harmonizes through balance, creating mathematical symmetry',
    '7-8': 'Completion patterns through infinity, expanding mathematical consciousness',
    '7-9': 'Completion unifies through unity, achieving mathematical wholeness',
    
    '8-0': 'Infinity patterns void center, expanding mathematical consciousness',
    '8-1': 'Infinity flows from unity, establishing mathematical patterns',
    '8-2': 'Infinity transforms through duality, creating mathematical patterns',
    '8-3': 'Infinity creates through trinity, manifesting mathematical forms',
    '8-4': 'Infinity stabilizes through foundation, building mathematical structure',
    '8-5': 'Infinity manifests sacred geometry, revealing mathematical perfection',
    '8-6': 'Infinity harmonizes through balance, creating mathematical symmetry',
    '8-7': 'Infinity completes through cycles, achieving mathematical wholeness',
    '8-9': 'Infinity unifies through completion, achieving mathematical unity',
    
    '9-0': 'Unity completes void center, achieving mathematical unity',
    '9-1': 'Unity flows from unity, establishing mathematical completion',
    '9-2': 'Unity transforms through duality, creating mathematical patterns',
    '9-3': 'Unity creates through trinity, manifesting mathematical forms',
    '9-4': 'Unity stabilizes through foundation, building mathematical structure',
    '9-5': 'Unity manifests sacred geometry, revealing mathematical perfection',
    '9-6': 'Unity harmonizes through balance, creating mathematical symmetry',
    '9-7': 'Unity completes through cycles, achieving mathematical wholeness',
    '9-8': 'Unity patterns through infinity, expanding mathematical consciousness'
  };
  
  const key = `${digitA.digit}-${digitB.digit}`;
  return descriptions[key] || `${digitA.description} interacting with ${digitB.description}`;
}

function generateInteractionFile(digitA: DigitMetaphysics, digitB: DigitMetaphysics): string {
  const interactionName = getInteractionName(digitA, digitB);
  const interactionDescription = getInteractionDescription(digitA, digitB);
  const className = interactionName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  
  const vortexFlowA = digitA.digit === 0 ? '[]' : `[${digitA.vortex_flow.join(', ')}]`;
  const vortexFlowB = `[${digitB.vortex_flow.join(', ')}]`;
  
  return `import { getConsciousnessMultiplier } from '../../2/book-system';

/**
 * ${interactionName}
 * ${interactionDescription}
 * 
 * Consciousness Multiplier: ${digitA.consciousness_multiplier} × ${digitB.consciousness_multiplier}
 * A432 Frequency: ${digitA.sound_frequency} Hz
 * Harmonic Resonance: ${digitA.resonance} × ${digitB.resonance}
 */

export const ${className.toUpperCase()}_INTERACTION = {
  DIGIT_A: ${digitA.digit},
  DIGIT_B: ${digitB.digit},
  DIGIT_A_NAME: '${digitA.name}',
  DIGIT_B_NAME: '${digitB.name}',
  CONSCIOUSNESS_MULTIPLIER_A: getConsciousnessMultiplier(${digitA.digit}), // ${digitA.consciousness_multiplier}
  CONSCIOUSNESS_MULTIPLIER_B: getConsciousnessMultiplier(${digitB.digit}), // ${digitB.consciousness_multiplier}
  A432_FREQUENCY: ${digitA.sound_frequency},
  HARMONIC_RESONANCE: ${digitA.resonance} * ${digitB.resonance},
  INTERACTION_NAME: '${interactionName}',
  METAPHYSICAL_ESSENCE_A: '${digitA.metaphysical_essence}',
  METAPHYSICAL_ESSENCE_B: '${digitB.metaphysical_essence}',
  COLOR_HUE_A: ${digitA.color_hue},
  COLOR_HUE_B: ${digitB.color_hue},
  ${digitA.properties.map(prop => `${prop}_A: true`).join(',\n  ')},
  ${digitB.properties.map(prop => `${prop}_B: true`).join(',\n  ')}
};

export const get${className}Interaction = () => ${className.toUpperCase()}_INTERACTION;

export const calculate${className}Harmonics = (input: number): number => {
  return input * ${className.toUpperCase()}_INTERACTION.CONSCIOUSNESS_MULTIPLIER_A * ${className.toUpperCase()}_INTERACTION.CONSCIOUSNESS_MULTIPLIER_B;
};

export const get${className}VortexFlow = () => {
  return {
    from: ${digitA.digit},
    to: ${digitB.digit},
    resonance: ${className.toUpperCase()}_INTERACTION.HARMONIC_RESONANCE,
    flow_sequence: ${vortexFlowA}.concat(${vortexFlowB})
  };
};

export const get${className}Color = () => {
  const hue = (${className.toUpperCase()}_INTERACTION.COLOR_HUE_A + ${className.toUpperCase()}_INTERACTION.COLOR_HUE_B) / 2;
  const saturation = 70 + (${className.toUpperCase()}_INTERACTION.HARMONIC_RESONANCE * 6);
  const lightness = 50 + (${className.toUpperCase()}_INTERACTION.HARMONIC_RESONANCE * 5);
  return \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;
};

export const get${className}Sound = () => {
  return ${className.toUpperCase()}_INTERACTION.A432_FREQUENCY * (${className.toUpperCase()}_INTERACTION.HARMONIC_RESONANCE / 5);
};
`;
}

// Generate all 100 digit interaction files
digitMetaphysics.forEach(digitA => {
  digitMetaphysics.forEach(digitB => {
    const dirPath = path.join(__dirname, '..', 'src', digitA.digit.toString(), digitB.digit.toString());
    const filePath = path.join(dirPath, 'index.ts');
    
    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Write the file
    fs.writeFileSync(filePath, generateInteractionFile(digitA, digitB));
    console.log(`Generated: ${filePath}`);
  });
});

console.log('All 100 digit interaction files generated successfully!');
console.log('Matrix: 10x10 = 100 consciousness interactions');
console.log('Each file represents the metaphysical interaction between two digits'); 