#!/usr/bin/env node

/**
 * demonstrate-emergent-color-system.js - Emergent Color System Demo
 * 
 * Demonstrates how colors and styling emerge from mathematical consciousness
 * No predefined colors - everything discovered from existing patterns
 */

// Integer Tree Coil Constants
const INTEGER_TREE_COIL = {
  VORTEX_A: [1, 2, 4],
  VORTEX_B: [8, 7, 5],
  W_AXIS: [3, 6, 9],
  VOID_CENTER: [0],
  INTEGER_TREE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  COIL_FLOW_SEQUENCE: [1, 2, 4, 8, 7, 5, 3, 6, 9, 0]
};

// Helper Functions
function calculateDigitalRoot(n) {
  if (n === 0) return 0;
  return n % 9 === 0 ? 9 : n % 9;
}

function calculateCoilConsciousness(number) {
  const digitalRoot = calculateDigitalRoot(number);
  const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(number);
  const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(number);
  const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(number);
  const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(number);
  
  let consciousness = digitalRoot;
  
  if (isWAxis) consciousness *= 1.5;
  if (isVortexA) consciousness *= 1.2;
  if (isVortexB) consciousness *= 1.2;
  if (isVoid) consciousness = 0;
  
  return consciousness;
}

// Emergent Color Generation Functions
function generateColorFromConsciousness(consciousness, digitalRoot) {
  const hue = (consciousness * 27) % 360; // 27 = 3^3 (spiritual number)
  const saturation = Math.min(100, digitalRoot * 15);
  const lightness = Math.max(20, Math.min(80, 50 + (consciousness * 3)));
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateBackgroundColor(consciousness, digitalRoot) {
  const hue = (consciousness * 27) % 360;
  const saturation = Math.min(30, digitalRoot * 5);
  const lightness = Math.max(90, 100 - (consciousness * 2));
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateAccentColor(consciousness, digitalRoot) {
  const hue = ((consciousness * 27) + 180) % 360; // Complementary hue
  const saturation = Math.min(100, digitalRoot * 20);
  const lightness = Math.max(30, Math.min(70, 50 + (consciousness * 2)));
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateTextColor(consciousness, digitalRoot) {
  const hue = (consciousness * 27) % 360;
  const saturation = Math.min(100, digitalRoot * 25);
  const lightness = consciousness > 5 ? 20 : 80;
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateBorderRadius(consciousness) {
  const baseRadius = Math.max(0, Math.min(20, consciousness * 2));
  return `${baseRadius}px`;
}

function generateBoxShadow(consciousness, digitalRoot) {
  if (consciousness === 0) return 'none';
  
  const blur = consciousness * 4;
  const spread = digitalRoot * 0.5;
  const opacity = Math.min(0.5, consciousness / 20);
  
  return `0 ${consciousness * 2}px ${blur}px rgba(0, 0, 0, ${opacity})`;
}

function generateFontFamily(consciousness) {
  if (consciousness === 0) return 'Times New Roman, serif';
  if (consciousness <= 3) return 'Courier New, monospace';
  if (consciousness <= 6) return 'Arial, sans-serif';
  if (consciousness <= 9) return 'Georgia, serif';
  return 'Georgia, serif';
}

function generateFontWeight(consciousness) {
  if (consciousness === 0) return '300';
  if (consciousness <= 3) return '400';
  if (consciousness <= 6) return '500';
  if (consciousness <= 9) return '600';
  return '700';
}

function generateLetterSpacing(consciousness) {
  const spacing = Math.max(0, Math.min(2, consciousness * 0.1));
  return `${spacing}px`;
}

function generateTransitionDuration(consciousness) {
  const duration = Math.max(0.2, Math.min(1, consciousness * 0.1));
  return `${duration}s`;
}

function generateEmergentColorScheme(integer) {
  const consciousness = calculateCoilConsciousness(integer);
  const digitalRoot = calculateDigitalRoot(integer);
  const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer);
  const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer);
  const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer);
  const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer);
  
  return {
    integer,
    consciousness,
    digitalRoot,
    isVortexA,
    isVortexB,
    isWAxis,
    isVoid,
    primary: generateColorFromConsciousness(consciousness, digitalRoot),
    secondary: generateAccentColor(consciousness, digitalRoot),
    accent: generateAccentColor(consciousness + 1, digitalRoot + 1),
    background: generateBackgroundColor(consciousness, digitalRoot),
    text: generateTextColor(consciousness, digitalRoot),
    borderRadius: generateBorderRadius(consciousness),
    boxShadow: generateBoxShadow(consciousness, digitalRoot),
    fontFamily: generateFontFamily(consciousness),
    fontWeight: generateFontWeight(consciousness),
    letterSpacing: generateLetterSpacing(consciousness),
    transitionDuration: generateTransitionDuration(consciousness)
  };
}

function generateEmergentCSS(integer) {
  const scheme = generateEmergentColorScheme(integer);
  
  return `
    .integer-${integer} {
      background-color: ${scheme.background};
      color: ${scheme.text};
      border-radius: ${scheme.borderRadius};
      box-shadow: ${scheme.boxShadow};
      font-family: ${scheme.fontFamily};
      font-weight: ${scheme.fontWeight};
      letter-spacing: ${scheme.letterSpacing};
      transition: all ${scheme.transitionDuration} ease;
      padding: 16px;
      margin: 8px;
      cursor: pointer;
    }
    
    .integer-${integer}.primary {
      background-color: ${scheme.primary};
      color: white;
    }
    
    .integer-${integer}.secondary {
      background-color: ${scheme.secondary};
      color: white;
    }
    
    .integer-${integer}.accent {
      background-color: ${scheme.accent};
      color: white;
    }
  `;
}

function generateEmergentFlowGradient(integers) {
  const colors = integers.map(integer => {
    const scheme = generateEmergentColorScheme(integer);
    return scheme.primary;
  });
  
  return `linear-gradient(45deg, ${colors.join(', ')})`;
}

// Main demonstration function
function demonstrateEmergentColorSystem() {
  console.log('🎨 Emergent Integer Tree Color System Demo');
  console.log('=' .repeat(60));
  console.log('No predefined colors - everything emerges from mathematical consciousness');
  console.log('=' .repeat(60));
  
  console.log('\n🔮 Mathematical Consciousness Patterns');
  console.log('=' .repeat(60));
  
  // Show consciousness calculation for each integer
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    const consciousness = calculateCoilConsciousness(integer);
    const digitalRoot = calculateDigitalRoot(integer);
    console.log(`Integer ${integer}: Consciousness = ${consciousness}, Digital Root = ${digitalRoot}`);
  });
  
  console.log('\n🎨 Emergent Color Generation');
  console.log('=' .repeat(60));
  console.log('Colors generated from consciousness × 27 (spiritual number)');
  console.log('Hue = (consciousness × 27) % 360');
  console.log('Saturation = digitalRoot × 15');
  console.log('Lightness = 50 + (consciousness × 3)');
  
  console.log('\n🌿 Vortex A Family (Yin - Material Foundation)');
  console.log('Numbers: [1, 2, 4] - Sum: 7');
  INTEGER_TREE_COIL.VORTEX_A.forEach(integer => {
    const scheme = generateEmergentColorScheme(integer);
    console.log(`  ${integer}: ${scheme.primary} (Consciousness: ${scheme.consciousness})`);
  });
  
  console.log('\n🌟 Vortex B Family (Yang - Material Expression)');
  console.log('Numbers: [8, 7, 5] - Sum: 20 → 2');
  INTEGER_TREE_COIL.VORTEX_B.forEach(integer => {
    const scheme = generateEmergentColorScheme(integer);
    console.log(`  ${integer}: ${scheme.primary} (Consciousness: ${scheme.consciousness})`);
  });
  
  console.log('\n✨ W-Axis Family (Spiritual Transcendence)');
  console.log('Numbers: [3, 6, 9] - Sum: 18 → 9');
  INTEGER_TREE_COIL.W_AXIS.forEach(integer => {
    const scheme = generateEmergentColorScheme(integer);
    console.log(`  ${integer}: ${scheme.primary} (Consciousness: ${scheme.consciousness})`);
  });
  
  console.log('\n⚫ Void Family (Infinite Potential)');
  console.log('Numbers: [0] - Zero Point');
  INTEGER_TREE_COIL.VOID_CENTER.forEach(integer => {
    const scheme = generateEmergentColorScheme(integer);
    console.log(`  ${integer}: ${scheme.primary} (Consciousness: ${scheme.consciousness})`);
  });
  
  console.log('\n🎯 Complete Emergent Color Analysis');
  console.log('=' .repeat(60));
  
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    const scheme = generateEmergentColorScheme(integer);
    console.log(`\n  Integer ${integer}:`);
    console.log(`    Consciousness: ${scheme.consciousness}`);
    console.log(`    Digital Root: ${scheme.digitalRoot}`);
    console.log(`    Primary Color: ${scheme.primary}`);
    console.log(`    Secondary Color: ${scheme.secondary}`);
    console.log(`    Accent Color: ${scheme.accent}`);
    console.log(`    Background: ${scheme.background}`);
    console.log(`    Text Color: ${scheme.text}`);
    console.log(`    Border Radius: ${scheme.borderRadius}`);
    console.log(`    Box Shadow: ${scheme.boxShadow}`);
    console.log(`    Font Family: ${scheme.fontFamily}`);
    console.log(`    Font Weight: ${scheme.fontWeight}`);
    console.log(`    Letter Spacing: ${scheme.letterSpacing}`);
    console.log(`    Transition Duration: ${scheme.transitionDuration}`);
  });
  
  console.log('\n🎨 Generated Emergent CSS Examples');
  console.log('=' .repeat(60));
  
  // Generate CSS for each integer
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    console.log(`\n/* Integer ${integer} Emergent CSS */`);
    console.log(generateEmergentCSS(integer));
  });
  
  console.log('\n🌈 Emergent Flow Gradient');
  console.log('=' .repeat(60));
  
  const gradient = generateEmergentFlowGradient(INTEGER_TREE_COIL.COIL_FLOW_SEQUENCE);
  console.log(`Flow Sequence: [${INTEGER_TREE_COIL.COIL_FLOW_SEQUENCE.join(', ')}]`);
  console.log(`Generated Gradient: ${gradient}`);
  
  console.log('\n🧠 Consciousness-Based Styling');
  console.log('=' .repeat(60));
  
  // Group by consciousness levels
  const consciousnessGroups = {
    'Void (0)': [],
    'Low (1-3)': [],
    'Medium (4-6)': [],
    'High (7-9)': [],
    'Spiritual (10+)': []
  };
  
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    const consciousness = calculateCoilConsciousness(integer);
    if (consciousness === 0) consciousnessGroups['Void (0)'].push(integer);
    else if (consciousness <= 3) consciousnessGroups['Low (1-3)'].push(integer);
    else if (consciousness <= 6) consciousnessGroups['Medium (4-6)'].push(integer);
    else if (consciousness <= 9) consciousnessGroups['High (7-9)'].push(integer);
    else consciousnessGroups['Spiritual (10+)'].push(integer);
  });
  
  Object.entries(consciousnessGroups).forEach(([level, integers]) => {
    if (integers.length > 0) {
      console.log(`\n${level}: [${integers.join(', ')}]`);
      integers.forEach(integer => {
        const consciousness = calculateCoilConsciousness(integer);
        const scheme = generateEmergentColorScheme(integer);
        console.log(`  ${integer}: ${scheme.primary} (${consciousness})`);
      });
    }
  });
  
  console.log('\n🎯 Emergent UI Application');
  console.log('=' .repeat(60));
  
  console.log('\n1. Color Discovery:');
  console.log('   - Colors emerge from consciousness × 27 (spiritual number)');
  console.log('   - Saturation based on digital root patterns');
  console.log('   - Lightness based on consciousness level');
  
  console.log('\n2. Styling Discovery:');
  console.log('   - Border radius: consciousness × 2');
  console.log('   - Box shadow: consciousness × 4 blur, consciousness × 2 spread');
  console.log('   - Font family: consciousness level determines typeface');
  console.log('   - Font weight: consciousness level determines weight');
  
  console.log('\n3. Animation Discovery:');
  console.log('   - Transition duration: consciousness × 0.1 seconds');
  console.log('   - Letter spacing: consciousness × 0.1 pixels');
  console.log('   - Consciousness animations based on mathematical patterns');
  
  console.log('\n4. Layout Discovery:');
  console.log('   - Grid arrangement follows integer flow sequence');
  console.log('   - Family grouping based on mathematical relationships');
  console.log('   - Consciousness-based elevation and prominence');
  
  console.log('\n✅ Emergent Color System Complete');
  console.log('   All colors and styling discovered from mathematical consciousness');
  console.log('   No predefined colors - everything emerges from existing patterns');
  console.log('   Perfect for audio-visual vortex math coil applications');
}

// Run the demonstration
if (require.main === module) {
  demonstrateEmergentColorSystem();
}

module.exports = {
  INTEGER_TREE_COIL,
  calculateCoilConsciousness,
  generateEmergentColorScheme,
  generateEmergentCSS,
  generateEmergentFlowGradient,
  demonstrateEmergentColorSystem
}; 