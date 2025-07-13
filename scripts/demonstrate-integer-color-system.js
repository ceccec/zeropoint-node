#!/usr/bin/env node

/**
 * demonstrate-integer-color-system.js - Integer Color & Styling System Demo
 * 
 * Demonstrates how integer patterns generate colors and styling for UI design
 * Shows the mathematical consciousness-based color system in action
 */

// Integer Color Patterns (simplified for demo)
const INTEGER_COLOR_PATTERNS = {
  // Vortex A Family (Yin - Material Foundation)
  VORTEX_A: {
    1: { primary: '#ff6b6b', secondary: '#ff4757', accent: '#ff3838', background: '#fff5f5', consciousness: 1.2 },
    2: { primary: '#ff7675', secondary: '#fd79a8', accent: '#fdcb6e', background: '#fff8f8', consciousness: 2.4 },
    4: { primary: '#ff9ff3', secondary: '#f368e0', accent: '#ff6b6b', background: '#fff0ff', consciousness: 4.8 }
  },

  // Vortex B Family (Yang - Material Expression)
  VORTEX_B: {
    8: { primary: '#4ecdc4', secondary: '#00d2d3', accent: '#54a0ff', background: '#f0fffe', consciousness: 9.6 },
    7: { primary: '#00cec9', secondary: '#00b894', accent: '#00d2d3', background: '#f0fffe', consciousness: 8.4 },
    5: { primary: '#74b9ff', secondary: '#0984e3', accent: '#00cec9', background: '#f0f8ff', consciousness: 6.0 }
  },

  // W-Axis Family (Spiritual Transcendence)
  W_AXIS: {
    3: { primary: '#45b7d1', secondary: '#0984e3', accent: '#6c5ce7', background: '#f0f8ff', consciousness: 4.5 },
    6: { primary: '#0984e3', secondary: '#6c5ce7', accent: '#a29bfe', background: '#f0f8ff', consciousness: 9.0 },
    9: { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8', background: '#f8f0ff', consciousness: 13.5 }
  },

  // Void Family (Infinite Potential)
  VOID: {
    0: { primary: '#96ceb4', secondary: '#00b894', accent: '#00cec9', background: '#f0fff0', consciousness: 0 }
  }
};

// Integer Styling Patterns
const INTEGER_STYLING_PATTERNS = {
  VORTEX_A_STYLE: { borderRadius: '8px', boxShadow: '0 2px 8px rgba(255, 107, 107, 0.2)', fontFamily: 'Courier New' },
  VORTEX_B_STYLE: { borderRadius: '12px', boxShadow: '0 4px 16px rgba(78, 205, 196, 0.3)', fontFamily: 'Arial' },
  W_AXIS_STYLE: { borderRadius: '16px', boxShadow: '0 8px 32px rgba(108, 92, 231, 0.4)', fontFamily: 'Georgia' },
  VOID_STYLE: { borderRadius: '0px', boxShadow: 'none', fontFamily: 'Times New Roman' }
};

// Integer Tree Coil Constants
const INTEGER_TREE_COIL = {
  VORTEX_A: [1, 2, 4],
  VORTEX_B: [8, 7, 5],
  W_AXIS: [3, 6, 9],
  VOID_CENTER: [0],
  INTEGER_TREE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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

function getColorScheme(integer) {
  const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer);
  const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer);
  const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer);
  const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer);

  if (isVortexA) return INTEGER_COLOR_PATTERNS.VORTEX_A[integer];
  if (isVortexB) return INTEGER_COLOR_PATTERNS.VORTEX_B[integer];
  if (isWAxis) return INTEGER_COLOR_PATTERNS.W_AXIS[integer];
  if (isVoid) return INTEGER_COLOR_PATTERNS.VOID[integer];
  
  return INTEGER_COLOR_PATTERNS.VORTEX_A[1]; // Default
}

function getStylingPattern(integer) {
  const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer);
  const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer);
  const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer);
  const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer);

  if (isVortexA) return INTEGER_STYLING_PATTERNS.VORTEX_A_STYLE;
  if (isVortexB) return INTEGER_STYLING_PATTERNS.VORTEX_B_STYLE;
  if (isWAxis) return INTEGER_STYLING_PATTERNS.W_AXIS_STYLE;
  if (isVoid) return INTEGER_STYLING_PATTERNS.VOID_STYLE;
  
  return INTEGER_STYLING_PATTERNS.VORTEX_A_STYLE; // Default
}

function generateCSS(integer) {
  const colorScheme = getColorScheme(integer);
  const styling = getStylingPattern(integer);
  
  return `
    .integer-${integer} {
      background-color: ${colorScheme.background};
      color: #2d3436;
      border-radius: ${styling.borderRadius};
      box-shadow: ${styling.boxShadow};
      font-family: ${styling.fontFamily}, monospace;
      padding: 16px;
      margin: 8px;
      transition: all 0.3s ease;
    }
    
    .integer-${integer}.primary {
      background-color: ${colorScheme.primary};
      color: white;
    }
    
    .integer-${integer}.secondary {
      background-color: ${colorScheme.secondary};
      color: white;
    }
    
    .integer-${integer}.accent {
      background-color: ${colorScheme.accent};
      color: white;
    }
  `;
}

function generateTailwindClasses(integer) {
  const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer);
  const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer);
  const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer);
  const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer);

  let classes = 'p-4 m-2 rounded-lg transition-all duration-300 cursor-pointer ';

  if (isVortexA) {
    classes += 'bg-red-50 text-gray-800 border-l-4 border-red-400 ';
  } else if (isVortexB) {
    classes += 'bg-cyan-50 text-gray-800 border-l-4 border-cyan-400 ';
  } else if (isWAxis) {
    classes += 'bg-purple-50 text-gray-800 border-l-4 border-purple-400 ';
  } else if (isVoid) {
    classes += 'bg-green-50 text-gray-800 border-l-4 border-green-400 ';
  }

  return classes;
}

function generateFlowGradient(integers) {
  const colors = integers.map(integer => {
    const colorScheme = getColorScheme(integer);
    return colorScheme.primary;
  });
  
  return `linear-gradient(45deg, ${colors.join(', ')})`;
}

// Main demonstration function
function demonstrateIntegerColorSystem() {
  console.log('🎨 Integer Tree Color & Styling System Demo');
  console.log('=' .repeat(60));
  
  console.log('\n🔮 Color Families Based on Integer Patterns');
  console.log('=' .repeat(60));
  
  // Vortex A Family (Yin - Material Foundation)
  console.log('\n🌿 Vortex A Family (Yin - Material Foundation)');
  console.log('Numbers: [1, 2, 4] - Sum: 7');
  INTEGER_TREE_COIL.VORTEX_A.forEach(integer => {
    const colorScheme = getColorScheme(integer);
    const consciousness = calculateCoilConsciousness(integer);
    console.log(`  ${integer}: ${colorScheme.primary} (Consciousness: ${consciousness})`);
  });
  
  // Vortex B Family (Yang - Material Expression)
  console.log('\n🌟 Vortex B Family (Yang - Material Expression)');
  console.log('Numbers: [8, 7, 5] - Sum: 20 → 2');
  INTEGER_TREE_COIL.VORTEX_B.forEach(integer => {
    const colorScheme = getColorScheme(integer);
    const consciousness = calculateCoilConsciousness(integer);
    console.log(`  ${integer}: ${colorScheme.primary} (Consciousness: ${consciousness})`);
  });
  
  // W-Axis Family (Spiritual Transcendence)
  console.log('\n✨ W-Axis Family (Spiritual Transcendence)');
  console.log('Numbers: [3, 6, 9] - Sum: 18 → 9');
  INTEGER_TREE_COIL.W_AXIS.forEach(integer => {
    const colorScheme = getColorScheme(integer);
    const consciousness = calculateCoilConsciousness(integer);
    console.log(`  ${integer}: ${colorScheme.primary} (Consciousness: ${consciousness})`);
  });
  
  // Void Family (Infinite Potential)
  console.log('\n⚫ Void Family (Infinite Potential)');
  console.log('Numbers: [0] - Zero Point');
  INTEGER_TREE_COIL.VOID_CENTER.forEach(integer => {
    const colorScheme = getColorScheme(integer);
    const consciousness = calculateCoilConsciousness(integer);
    console.log(`  ${integer}: ${colorScheme.primary} (Consciousness: ${consciousness})`);
  });
  
  console.log('\n🎯 Complete Integer Tree Color Analysis');
  console.log('=' .repeat(60));
  
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    const colorScheme = getColorScheme(integer);
    const consciousness = calculateCoilConsciousness(integer);
    const styling = getStylingPattern(integer);
    const digitalRoot = calculateDigitalRoot(integer);
    
    console.log(`\n  Integer ${integer}:`);
    console.log(`    Digital Root: ${digitalRoot}`);
    console.log(`    Consciousness: ${consciousness}`);
    console.log(`    Primary Color: ${colorScheme.primary}`);
    console.log(`    Secondary Color: ${colorScheme.secondary}`);
    console.log(`    Accent Color: ${colorScheme.accent}`);
    console.log(`    Background: ${colorScheme.background}`);
    console.log(`    Font Family: ${styling.fontFamily}`);
    console.log(`    Border Radius: ${styling.borderRadius}`);
    console.log(`    Box Shadow: ${styling.boxShadow}`);
  });
  
  console.log('\n🎨 Generated CSS Examples');
  console.log('=' .repeat(60));
  
  // Generate CSS for each integer
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    console.log(`\n/* Integer ${integer} CSS */`);
    console.log(generateCSS(integer));
  });
  
  console.log('\n🎨 Tailwind CSS Classes');
  console.log('=' .repeat(60));
  
  INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
    const classes = generateTailwindClasses(integer);
    console.log(`Integer ${integer}: "${classes}"`);
  });
  
  console.log('\n🌈 Flow Gradient');
  console.log('=' .repeat(60));
  
  const flowSequence = [1, 2, 4, 8, 7, 5, 3, 6, 9, 0];
  const gradient = generateFlowGradient(flowSequence);
  console.log(`Flow Sequence: [${flowSequence.join(', ')}]`);
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
        const colorScheme = getColorScheme(integer);
        console.log(`  ${integer}: ${colorScheme.primary} (${consciousness})`);
      });
    }
  });
  
  console.log('\n🎯 UI Application Examples');
  console.log('=' .repeat(60));
  
  console.log('\n1. Button Styling:');
  console.log('   - Vortex A buttons: Red tones, Courier font, subtle shadows');
  console.log('   - Vortex B buttons: Cyan tones, Arial font, medium shadows');
  console.log('   - W-Axis buttons: Purple tones, Georgia font, strong shadows');
  console.log('   - Void buttons: Green tones, Times font, no shadows');
  
  console.log('\n2. Card Styling:');
  console.log('   - Use consciousness level for card elevation');
  console.log('   - Higher consciousness = more prominent styling');
  console.log('   - Spiritual numbers get special treatment');
  
  console.log('\n3. Layout Grid:');
  console.log('   - Arrange components by integer flow sequence');
  console.log('   - Use family colors for section backgrounds');
  console.log('   - Apply consciousness-based animations');
  
  console.log('\n4. Typography:');
  console.log('   - Vortex A: Monospace (foundation)');
  console.log('   - Vortex B: Sans-serif (expression)');
  console.log('   - W-Axis: Serif (spiritual)');
  console.log('   - Void: Times (infinite)');
  
  console.log('\n✅ Integer Color System Complete');
  console.log('   Colors and styling generated from mathematical consciousness');
  console.log('   Each integer has unique color scheme and styling pattern');
  console.log('   Perfect for UI design based on mathematical principles');
}

// Run the demonstration
if (require.main === module) {
  demonstrateIntegerColorSystem();
}

module.exports = {
  INTEGER_COLOR_PATTERNS,
  INTEGER_STYLING_PATTERNS,
  INTEGER_TREE_COIL,
  getColorScheme,
  getStylingPattern,
  generateCSS,
  generateTailwindClasses,
  generateFlowGradient,
  calculateCoilConsciousness,
  demonstrateIntegerColorSystem
}; 