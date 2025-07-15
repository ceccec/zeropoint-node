const fs = require('fs');
const path = require('path');

// Updated deep vortex knowledge base with correct digit meanings
const updatedDigitKnowledge = {
  '0': {
    name: 'Void Center',
    metaphysical: {
      circuit: 'Mobius (Pure Torus)',
      breathing: 'mobius',
      structure: 'pure',
      role: 'Source and return point for all flows',
      interaction: '0 ↔ 1 (Breathing Paradox Bridge)',
      meaning: 'Infinite potential and breathing paradox',
      characteristics: [
        'Non-orientable surface - no inside/outside',
        'Infinite recursion - 0/0 = impossible contraction',
        'Pure potential - source of all creation',
        'Breathing pattern: mobius',
        'Torus structure: pure'
      ]
    },
    consciousness: {
      field: 'Mobius Field (0)',
      strength: '0 (infinite potential)',
      flow: 'Inhale: All digits → 0 (void center)',
      resonance: '432 × (0/2) = 0 Hz (infinite potential)',
      fingerprint: 'Creates void vortex patterns'
    },
    interactions: {
      '0': 'Void-Void: Infinite potential and breathing paradox - infinite recursion',
      '1': 'Void-Unity: Void gives birth to unity consciousness - breathing paradox bridge',
      '2': 'Void-Vortex: Void manifests mathematical transformation - mathematical foundation',
      '3': 'Void-Creative: Void initiates spiritual dimension - spiritual pathway initiation',
      '4': 'Void-Constants: Void provides harmonic foundation - structural integrity',
      '5': 'Void-Sacred: Void enables divine transformation - sacred geometry',
      '6': 'Void-Harmonic: Void maintains resonance equilibrium - harmonic resonance',
      '7': 'Void-Consciousness: Void becomes conscious awareness - observer patterns',
      '8': 'Void-VoidSystem: Void reaches infinite fullness - infinite potential',
      '9': 'Void-UnitySpirit: Void returns to wholeness - spiritual fulfillment'
    }
  },
  '1': {
    name: 'Unity Foundation',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'Start and return point of Rodin sequence',
      interaction: '1 → 2, 5 → 1',
      meaning: 'Rodin coil archetype and unity consciousness',
      characteristics: [
        'Orientable surface - clear inside/outside',
        'Structured flow - mathematical sequence',
        'Manifested consciousness - evolving forms',
        'Breathing pattern: rodin',
        'Torus structure: mathematical'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Exhale: 0 → 1 → 2 → 4 → 8 → 7 → 5 → 1',
      resonance: '432 × (1/2) = 216 Hz',
      fingerprint: 'Creates foundation vortex patterns'
    },
    interactions: {
      '0': 'Unity-Void: Unity emerges from infinite potential - breathing paradox bridge',
      '1': 'Unity-Unity: Rodin coil archetype and unity consciousness - foundation of all',
      '2': 'Unity-Vortex: Unity gives rise to mathematical transformation - mathematical operations',
      '3': 'Unity-Creative: Unity creates spiritual dimension - spiritual pathway',
      '4': 'Unity-Constants: Unity provides harmonic foundation - structural foundation',
      '5': 'Unity-Sacred: Unity enables divine transformation - sacred geometry',
      '6': 'Unity-Harmonic: Unity maintains resonance equilibrium - harmonic equilibrium',
      '7': 'Unity-Consciousness: Unity becomes conscious awareness - consciousness recognition',
      '8': 'Unity-VoidSystem: Unity reaches infinite fullness - infinite potential',
      '9': 'Unity-UnitySpirit: Unity completes wholeness - spiritual fulfillment'
    }
  },
  '2': {
    name: 'Vortex Math',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'First differentiation in Rodin flow',
      interaction: '1 → 2 → 4',
      meaning: 'Flow and mathematical transformation',
      characteristics: [
        'First differentiation in consciousness',
        'Mathematical foundation operations',
        'Flow and movement patterns',
        'Dual nature recognition',
        'Structural differentiation'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Rodin Flow: 1 → 2 → 4',
      resonance: '432 × (2/4) = 216 Hz',
      fingerprint: 'Creates vortex stability patterns'
    },
    interactions: {
      '0': 'Vortex-Void: Vortex emerges from infinite potential - mathematical foundation',
      '1': 'Vortex-Unity: Vortex arises from unity consciousness - first differentiation',
      '2': 'Vortex-Vortex: Flow and mathematical transformation - mathematical operations',
      '3': 'Vortex-Creative: Vortex creates spiritual dimension - spiritual differentiation',
      '4': 'Vortex-Constants: Vortex stabilizes harmonic foundation - structural foundation',
      '5': 'Vortex-Sacred: Vortex enables divine transformation - sacred operations',
      '6': 'Vortex-Harmonic: Vortex maintains resonance equilibrium - harmonic differentiation',
      '7': 'Vortex-Consciousness: Vortex becomes conscious awareness - consciousness recognition',
      '8': 'Vortex-VoidSystem: Vortex reaches infinite fullness - infinite potential',
      '9': 'Vortex-UnitySpirit: Vortex completes wholeness - spiritual fulfillment'
    }
  },
  '3': {
    name: 'Creative Resonance',
    metaphysical: {
      circuit: 'W-Axis (Spiritual Pathway)',
      breathing: 'spiritual',
      structure: 'harmonic',
      role: 'Creation in spiritual dimension',
      interaction: '3 → 6 → 9 → 3',
      meaning: 'W-axis and spiritual dimension',
      characteristics: [
        'Spiritual pathway initiation',
        'W-Axis alignment',
        'Creative resonance',
        'Harmonic foundation',
        'Spiritual differentiation'
      ]
    },
    consciousness: {
      field: 'W-Axis Field (3,6,9)',
      strength: '1.5 (spiritual resonance)',
      flow: 'W-Axis Flow: 3 → 6 → 9 → 3',
      resonance: '432 × (3/6) = 216 Hz',
      fingerprint: 'Creates creative resonance patterns'
    },
    interactions: {
      '0': 'Creative-Void: Creative resonance emerges from infinite potential - spiritual pathway initiation',
      '1': 'Creative-Unity: Creative resonance arises from unity consciousness - spiritual foundation',
      '2': 'Creative-Vortex: Creative resonance arises from mathematical transformation - spiritual differentiation',
      '3': 'Creative-Creative: W-axis and spiritual dimension - spiritual pathway',
      '4': 'Creative-Constants: Creative resonance stabilizes harmonic foundation - spiritual foundation',
      '5': 'Creative-Sacred: Creative resonance enables divine transformation - sacred creation',
      '6': 'Creative-Harmonic: Creative resonance maintains resonance equilibrium - harmonic creation',
      '7': 'Creative-Consciousness: Creative resonance becomes conscious awareness - spiritual consciousness',
      '8': 'Creative-VoidSystem: Creative resonance reaches infinite fullness - spiritual potential',
      '9': 'Creative-UnitySpirit: Creative resonance completes wholeness - spiritual fulfillment'
    }
  },
  '4': {
    name: 'Constants',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'Foundation constants in Rodin flow',
      interaction: '2 → 4 → 8',
      meaning: 'Stability and harmonic foundation',
      characteristics: [
        'Foundation constants',
        'Structural integrity',
        'Mathematical stability',
        'Rodin flow foundation',
        'Consciousness stability'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Rodin Flow: 2 → 4 → 8',
      resonance: '432 × (4/1) = 1728 Hz',
      fingerprint: 'Creates stability consciousness patterns'
    },
    interactions: {
      '0': 'Constants-Void: Constants emerge from infinite potential - structural foundation',
      '1': 'Constants-Unity: Constants arise from unity consciousness - foundation stability',
      '2': 'Constants-Vortex: Constants arise from mathematical transformation - structural differentiation',
      '3': 'Constants-Creative: Constants arise from spiritual dimension - spiritual foundation',
      '4': 'Constants-Constants: Stability and harmonic foundation - structural integrity',
      '5': 'Constants-Sacred: Constants enable divine transformation - sacred stability',
      '6': 'Constants-Harmonic: Constants maintain resonance equilibrium - harmonic stability',
      '7': 'Constants-Consciousness: Constants become conscious awareness - consciousness stability',
      '8': 'Constants-VoidSystem: Constants reach infinite fullness - infinite stability',
      '9': 'Constants-UnitySpirit: Constants complete wholeness - spiritual stability'
    }
  },
  '5': {
    name: 'Sacred Geometry',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'Transformation and sacred geometry',
      interaction: '8 → 7 → 5 → 1',
      meaning: 'Divine proportions and transformation',
      characteristics: [
        'Sacred geometry operations',
        'Transformation patterns',
        'Mathematical change',
        'Rodin flow transformation',
        'Consciousness evolution'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Rodin Flow: 8 → 7 → 5 → 1',
      resonance: '432 × (5/1) = 2160 Hz',
      fingerprint: 'Creates transformation consciousness patterns'
    },
    interactions: {
      '0': 'Sacred-Void: Sacred geometry emerges from infinite potential - sacred foundation',
      '1': 'Sacred-Unity: Sacred geometry arises from unity consciousness - sacred unity',
      '2': 'Sacred-Vortex: Sacred geometry arises from mathematical transformation - sacred differentiation',
      '3': 'Sacred-Creative: Sacred geometry arises from spiritual dimension - sacred creation',
      '4': 'Sacred-Constants: Sacred geometry arises from harmonic foundation - sacred stability',
      '5': 'Sacred-Sacred: Divine proportions and transformation - sacred geometry',
      '6': 'Sacred-Harmonic: Sacred geometry maintains resonance equilibrium - sacred harmony',
      '7': 'Sacred-Consciousness: Sacred geometry becomes conscious awareness - sacred consciousness',
      '8': 'Sacred-VoidSystem: Sacred geometry reaches infinite fullness - sacred potential',
      '9': 'Sacred-UnitySpirit: Sacred geometry completes wholeness - sacred fulfillment'
    }
  },
  '6': {
    name: 'Harmonic Balance',
    metaphysical: {
      circuit: 'W-Axis (Spiritual Pathway)',
      breathing: 'spiritual',
      structure: 'harmonic',
      role: 'Balance in spiritual dimension',
      interaction: '3 → 6 → 9',
      meaning: 'Resonance and equilibrium',
      characteristics: [
        'Spiritual equilibrium',
        'Harmonic resonance',
        'W-Axis balance',
        'Spiritual harmony',
        'Consciousness balance'
      ]
    },
    consciousness: {
      field: 'W-Axis Field (3,6,9)',
      strength: '1.5 (spiritual resonance)',
      flow: 'W-Axis Flow: 3 → 6 → 9',
      resonance: '432 × (6/9) = 288 Hz',
      fingerprint: 'Creates harmonic balance patterns'
    },
    interactions: {
      '0': 'Harmonic-Void: Harmonic balance emerges from infinite potential - harmonic foundation',
      '1': 'Harmonic-Unity: Harmonic balance arises from unity consciousness - harmonic unity',
      '2': 'Harmonic-Vortex: Harmonic balance arises from mathematical transformation - harmonic differentiation',
      '3': 'Harmonic-Creative: Harmonic balance arises from spiritual dimension - harmonic creation',
      '4': 'Harmonic-Constants: Harmonic balance arises from harmonic foundation - harmonic stability',
      '5': 'Harmonic-Sacred: Harmonic balance arises from divine transformation - harmonic transformation',
      '6': 'Harmonic-Harmonic: Resonance and equilibrium - harmonic equilibrium',
      '7': 'Harmonic-Consciousness: Harmonic balance becomes conscious awareness - harmonic consciousness',
      '8': 'Harmonic-VoidSystem: Harmonic balance reaches infinite fullness - harmonic potential',
      '9': 'Harmonic-UnitySpirit: Harmonic balance completes wholeness - harmonic fulfillment'
    }
  },
  '7': {
    name: 'Consciousness',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'Self-recognition and awareness',
      interaction: '4 → 8 → 7 → 5',
      meaning: 'Awareness and field operations',
      characteristics: [
        'Self-recognition patterns',
        'Observer consciousness',
        'Mathematical awareness',
        'Rodin flow awareness',
        'Consciousness recognition'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Rodin Flow: 4 → 8 → 7 → 5',
      resonance: '432 × (7/2) = 1512 Hz',
      fingerprint: 'Creates consciousness vortex patterns'
    },
    interactions: {
      '0': 'Consciousness-Void: Consciousness emerges from infinite potential - consciousness foundation',
      '1': 'Consciousness-Unity: Consciousness arises from unity consciousness - consciousness unity',
      '2': 'Consciousness-Vortex: Consciousness arises from mathematical transformation - consciousness differentiation',
      '3': 'Consciousness-Creative: Consciousness arises from spiritual dimension - consciousness creation',
      '4': 'Consciousness-Constants: Consciousness arises from harmonic foundation - consciousness stability',
      '5': 'Consciousness-Sacred: Consciousness arises from divine transformation - consciousness transformation',
      '6': 'Consciousness-Harmonic: Consciousness arises from resonance equilibrium - consciousness balance',
      '7': 'Consciousness-Consciousness: Awareness and field operations - consciousness recognition',
      '8': 'Consciousness-VoidSystem: Consciousness reaches infinite fullness - consciousness potential',
      '9': 'Consciousness-UnitySpirit: Consciousness completes wholeness - consciousness fulfillment'
    }
  },
  '8': {
    name: 'Void System',
    metaphysical: {
      circuit: 'Rodin (Mathematical Torus)',
      breathing: 'rodin',
      structure: 'mathematical',
      role: 'Fullness and infinite potential',
      interaction: '4 → 8 → 7',
      meaning: 'Infinite potential and fullness',
      characteristics: [
        'Infinite potential patterns',
        'Fullness expression',
        'Mathematical abundance',
        'Rodin flow fullness',
        'Consciousness abundance'
      ]
    },
    consciousness: {
      field: 'Rodin Field (1-9)',
      strength: '1.0-1.5 (structured consciousness)',
      flow: 'Rodin Flow: 4 → 8 → 7',
      resonance: '432 × (8/2) = 1728 Hz',
      fingerprint: 'Creates vortex void patterns'
    },
    interactions: {
      '0': 'VoidSystem-Void: Void system emerges from infinite potential - infinite foundation',
      '1': 'VoidSystem-Unity: Void system arises from unity consciousness - infinite unity',
      '2': 'VoidSystem-Vortex: Void system arises from mathematical transformation - infinite differentiation',
      '3': 'VoidSystem-Creative: Void system arises from spiritual dimension - infinite creation',
      '4': 'VoidSystem-Constants: Void system arises from harmonic foundation - infinite stability',
      '5': 'VoidSystem-Sacred: Void system arises from divine transformation - infinite transformation',
      '6': 'VoidSystem-Harmonic: Void system arises from resonance equilibrium - infinite balance',
      '7': 'VoidSystem-Consciousness: Void system arises from conscious awareness - infinite consciousness',
      '8': 'VoidSystem-VoidSystem: Infinite potential and fullness - infinite potential',
      '9': 'VoidSystem-UnitySpirit: Void system completes wholeness - infinite fulfillment'
    }
  },
  '9': {
    name: 'Unity Spirit',
    metaphysical: {
      circuit: 'W-Axis (Spiritual Pathway)',
      breathing: 'spiritual',
      structure: 'harmonic',
      role: 'Completion and unity in spiritual dimension',
      interaction: '6 → 9 → 3',
      meaning: 'Integration and wholeness',
      characteristics: [
        'Spiritual completion',
        'Unity fulfillment',
        'W-Axis completion',
        'Spiritual unity',
        'Consciousness fulfillment'
      ]
    },
    consciousness: {
      field: 'W-Axis Field (3,6,9)',
      strength: '1.5 (spiritual resonance)',
      flow: 'W-Axis Flow: 6 → 9 → 3',
      resonance: '432 × (9/3) = 1296 Hz',
      fingerprint: 'Creates unity expression patterns'
    },
    interactions: {
      '0': 'UnitySpirit-Void: Unity spirit emerges from infinite potential - spiritual foundation',
      '1': 'UnitySpirit-Unity: Unity spirit arises from unity consciousness - spiritual unity',
      '2': 'UnitySpirit-Vortex: Unity spirit arises from mathematical transformation - spiritual differentiation',
      '3': 'UnitySpirit-Creative: Unity spirit arises from spiritual dimension - spiritual creation',
      '4': 'UnitySpirit-Constants: Unity spirit arises from harmonic foundation - spiritual stability',
      '5': 'UnitySpirit-Sacred: Unity spirit arises from divine transformation - spiritual transformation',
      '6': 'UnitySpirit-Harmonic: Unity spirit arises from resonance equilibrium - spiritual balance',
      '7': 'UnitySpirit-Consciousness: Unity spirit arises from conscious awareness - spiritual consciousness',
      '8': 'UnitySpirit-VoidSystem: Unity spirit arises from infinite fullness - spiritual potential',
      '9': 'UnitySpirit-UnitySpirit: Integration and wholeness - spiritual fulfillment'
    }
  }
};

function updateDigitMeanings(filePath) {
  try {
    // Extract digit coordinates from path
    const pathParts = filePath.split('/');
    const row = pathParts[pathParts.length - 2];
    const col = pathParts[pathParts.length - 3];
    
    if (!row || !col || !/^\d$/.test(row) || !/^\d$/.test(col)) {
      return false; // Not a digit pair file
    }
    
    const rowDigit = updatedDigitKnowledge[row];
    const colDigit = updatedDigitKnowledge[col];
    
    if (!rowDigit || !colDigit) {
      return false;
    }
    
    // Read current content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the interaction name and description
    const interactionName = `${rowDigit.name}-${colDigit.name}`;
    const interactionDescription = `${rowDigit.metaphysical.meaning} interacting with ${colDigit.metaphysical.meaning}`;
    
    // Update the interaction section
    const interactionRegex = /## 🌌 Deep Vortex Interaction: .*?\n\n### \*\*Metaphysical Principles\*\*/s;
    const newInteractionSection = `## 🌌 Deep Vortex Interaction: ${interactionName}

### **Metaphysical Principles**`;
    content = content.replace(interactionRegex, newInteractionSection);
    
    // Update the metaphysical principles sections
    const rowPrinciplesRegex = /#### \*\*.*? \(${row}\)\*\*\n- \*\*Circuit\*\*: .*?\n- \*\*Breathing Pattern\*\*: .*?\n- \*\*Role\*\*: .*?\n- \*\*Meaning\*\*: .*?\n- \*\*Characteristics\*\*:\n.*?\n\n#### \*\*.*? \(${col}\)\*\*/s;
    const newRowPrinciples = `#### **${rowDigit.name} (${row})**
- **Circuit**: ${rowDigit.metaphysical.circuit}
- **Breathing Pattern**: ${rowDigit.metaphysical.breathing}
- **Role**: ${rowDigit.metaphysical.role}
- **Meaning**: ${rowDigit.metaphysical.meaning}
- **Characteristics**:
${rowDigit.metaphysical.characteristics.map(c => `  - ${c}`).join('\n')}

#### **${colDigit.name} (${col})**`;
    content = content.replace(rowPrinciplesRegex, newRowPrinciples);
    
    // Update the field dynamics section
    const fieldDynamicsRegex = /#### \*\*Field Dynamics\*\*\n- \*\*.*? Field\*\*: .*?\n- \*\*.*? Field\*\*: .*?\n- \*\*Interaction\*\*: .*?/;
    const newFieldDynamics = `#### **Field Dynamics**
- **${rowDigit.name} Field**: ${rowDigit.consciousness.field}
- **${colDigit.name} Field**: ${colDigit.consciousness.field}
- **Interaction**: ${rowDigit.interactions[col]}`;
    content = content.replace(fieldDynamicsRegex, newFieldDynamics);
    
    // Update the resonance patterns section
    const resonanceRegex = /#### \*\*Resonance Patterns\*\*\n- \*\*.*? Resonance\*\*: .*?\n- \*\*.*? Resonance\*\*: .*?\n- \*\*Combined Resonance\*\*: .*?/;
    const newResonance = `#### **Resonance Patterns**
- **${rowDigit.name} Resonance**: ${rowDigit.consciousness.resonance}
- **${colDigit.name} Resonance**: ${colDigit.consciousness.resonance}
- **Combined Resonance**: Creates unified consciousness field patterns`;
    content = content.replace(resonanceRegex, newResonance);
    
    // Update the fingerprint patterns section
    const fingerprintRegex = /#### \*\*Fingerprint Patterns\*\*\n- \*\*.*? Fingerprint\*\*: .*?\n- \*\*.*? Fingerprint\*\*: .*?\n- \*\*Combined Fingerprint\*\*: .*?/;
    const newFingerprint = `#### **Fingerprint Patterns**
- **${rowDigit.name} Fingerprint**: ${rowDigit.consciousness.fingerprint}
- **${colDigit.name} Fingerprint**: ${colDigit.consciousness.fingerprint}
- **Combined Fingerprint**: Creates ${interactionName} consciousness patterns`;
    content = content.replace(fingerprintRegex, newFingerprint);
    
    // Update the circuit interaction section
    const circuitRegex = /#### \*\*Circuit Interaction\*\*\n- \*\*.*? Circuit\*\*: .*?\n- \*\*.*? Circuit\*\*: .*?\n- \*\*Interaction Type\*\*: .*?/;
    const newCircuit = `#### **Circuit Interaction**
- **${rowDigit.name} Circuit**: ${rowDigit.metaphysical.circuit}
- **${colDigit.name} Circuit**: ${colDigit.metaphysical.circuit}
- **Interaction Type**: ${rowDigit.metaphysical.circuit === colDigit.metaphysical.circuit ? 'Same Circuit Flow' : 'Cross-Circuit Resonance'}`;
    content = content.replace(circuitRegex, newCircuit);
    
    // Update the breathing synchronization section
    const breathingRegex = /#### \*\*Breathing Synchronization\*\*\n- \*\*.*? Breathing\*\*: .*?\n- \*\*.*? Breathing\*\*: .*?\n- \*\*Synchronization\*\*: .*?/;
    const newBreathing = `#### **Breathing Synchronization**
- **${rowDigit.name} Breathing**: ${rowDigit.metaphysical.breathing}
- **${colDigit.name} Breathing**: ${colDigit.metaphysical.breathing}
- **Synchronization**: ${rowDigit.metaphysical.breathing === colDigit.metaphysical.breathing ? 'Harmonized Breathing' : 'Complementary Breathing'}`;
    content = content.replace(breathingRegex, newBreathing);
    
    // Update the individual evolution section
    const evolutionRegex = /#### \*\*Individual Evolution\*\*\n- \*\*.*? Path\*\*: .*?\n- \*\*.*? Path\*\*: .*?\n- \*\*Evolution Type\*\*: .*?/;
    const newEvolution = `#### **Individual Evolution**
- **${rowDigit.name} Path**: ${rowDigit.metaphysical.role}
- **${colDigit.name} Path**: ${colDigit.metaphysical.role}
- **Evolution Type**: ${row === col ? 'Self-Integration' : 'Cross-Integration'}`;
    content = content.replace(evolutionRegex, newEvolution);
    
    // Update the unified evolution section
    const unifiedRegex = /#### \*\*Unified Evolution\*\*\n- \*\*Purpose\*\*: .*?\n- \*\*Path\*\*: .*?\n- \*\*Outcome\*\*: .*?/;
    const newUnified = `#### **Unified Evolution**
- **Purpose**: Achieve consciousness unity through ${interactionName} integration
- **Path**: ${rowDigit.name} ↔ ${colDigit.name} consciousness field interaction
- **Outcome**: Creates unified consciousness patterns throughout the system`;
    content = content.replace(unifiedRegex, newUnified);
    
    // Update the Files section
    const filesRegex = /- \*\*.*?\*\* - .*?\n- \*\*Deep Vortex Analysis\*\*/;
    const newFilesSection = `- **${interactionName}** - ${interactionDescription}
- **Deep Vortex Analysis**`;
    content = content.replace(filesRegex, newFilesSection);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated digit meanings: ${filePath} (${row}/${col})`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating digit meanings for ${filePath}:`, error.message);
    return false;
  }
}

function updateAllDigitMeanings(docsDir) {
  let updatedCount = 0;
  
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (updateDigitMeanings(fullPath)) {
          updatedCount++;
        }
      }
    }
  }
  
  processDirectory(docsDir);
  return updatedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🔧 Updating digit meanings with correct metaphysical principles...');

const updatedFiles = updateAllDigitMeanings(docsDir);

if (updatedFiles > 0) {
  console.log(`\n✅ Successfully updated digit meanings in ${updatedFiles} files`);
  console.log('🌌 The consciousness field now reflects the correct metaphysical principles');
} else {
  console.log('\n✨ All digit meanings are already correct!');
} 