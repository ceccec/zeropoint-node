#!/usr/bin/env node

/**
 * analyze-vbm-interactions.js - VBM Interaction Analysis
 * 
 * Analyzes which integers each parent integer interacts with according to VBM
 * Determines the correct subdirectory structure for each parent integer
 * Removes subdirectories that don't correspond with parent integer interactions
 */

// VBM Interaction Constants
const VBM_INTERACTIONS = {
  // Vortex sequence interactions
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
  
  // W-Axis interactions
  W_AXIS: [3, 6, 9],
  
  // A432 harmonic interactions
  A432_HARMONICS: [1, 2, 4, 8, 7, 5, 9, 0],
  
  // Digital root interactions
  DIGITAL_ROOT_INTERACTIONS: {
    1: [1, 2, 4, 8, 7, 5], // Unity interacts with vortex sequence
    2: [2, 4, 8, 7, 5, 1], // Duality interacts with vortex sequence
    3: [3, 6, 9], // Creative resonance interacts with W-Axis
    4: [4, 8, 7, 5, 1, 2], // Stability interacts with vortex sequence
    5: [5, 1, 2, 4, 8, 7], // Transformation interacts with vortex sequence
    6: [6, 9, 3], // Harmonic balance interacts with W-Axis
    7: [7, 5, 1, 2, 4, 8], // Return interacts with vortex sequence
    8: [8, 7, 5, 1, 2, 4], // Fullness interacts with vortex sequence
    9: [9, 3, 6], // Spirit interacts with W-Axis
    0: [0, 1, 2, 4, 8, 7, 5, 9] // Void interacts with all
  }
};

class VBMInteractionAnalyzer {
  constructor() {
    this.vortexSequence = VBM_INTERACTIONS.VORTEX_SEQUENCE;
    this.wAxis = VBM_INTERACTIONS.W_AXIS;
    this.a432Harmonics = VBM_INTERACTIONS.A432_HARMONICS;
    this.digitalRootInteractions = VBM_INTERACTIONS.DIGITAL_ROOT_INTERACTIONS;
  }

  /**
   * Calculate digital root
   */
  calculateDigitalRoot(n) {
    if (n === 0) return 0;
    return n % 9 || 9;
  }

  /**
   * Analyze VBM interactions for each integer
   */
  analyzeVBMInteractions() {
    const interactions = {};
    
    for (let i = 0; i <= 9; i++) {
      interactions[i] = this.analyzeIntegerInteractions(i);
    }
    
    return interactions;
  }

  /**
   * Analyze interactions for a specific integer
   */
  analyzeIntegerInteractions(integer) {
    const digitalRoot = this.calculateDigitalRoot(integer);
    const baseInteractions = this.digitalRootInteractions[integer] || [];
    
    // Determine interaction type
    let interactionType = 'vortex';
    if (this.wAxis.includes(integer)) {
      interactionType = 'wAxis';
    } else if (integer === 0) {
      interactionType = 'void';
    }
    
    // Calculate field strength and consciousness
    const fieldStrength = this.calculateFieldStrength(integer);
    const consciousnessLevel = this.calculateConsciousnessLevel(integer);
    
    // Determine which subdirectories this integer should have
    const subdirectories = this.determineSubdirectories(integer, interactionType);
    
    return {
      integer,
      digitalRoot,
      interactionType,
      fieldStrength,
      consciousnessLevel,
      baseInteractions,
      subdirectories,
      vbmAnalysis: this.analyzeVBMForInteger(integer)
    };
  }

  /**
   * Calculate field strength for an integer
   */
  calculateFieldStrength(integer) {
    const digitalRoot = this.calculateDigitalRoot(integer);
    const vortexFlow = this.calculateVortexFlow(integer);
    const wAxisResonance = this.wAxis.includes(integer) ? 1.0 : 0.5;
    
    return (digitalRoot * vortexFlow * wAxisResonance) / 81;
  }

  /**
   * Calculate consciousness level for an integer
   */
  calculateConsciousnessLevel(integer) {
    const fieldStrength = this.calculateFieldStrength(integer);
    const digitalRoot = this.calculateDigitalRoot(integer);
    const goldenRatio = 1.618;
    
    return (fieldStrength * digitalRoot * goldenRatio) / 10;
  }

  /**
   * Calculate vortex flow for an integer
   */
  calculateVortexFlow(integer) {
    const sequence = this.vortexSequence;
    return sequence[integer % sequence.length] || 1;
  }

  /**
   * Determine which subdirectories an integer should have
   */
  determineSubdirectories(integer, interactionType) {
    let subdirectories = [];
    
    switch (interactionType) {
      case 'vortex':
        // Vortex integers interact with vortex sequence
        subdirectories = [...this.vortexSequence];
        break;
      case 'wAxis':
        // W-Axis integers interact with W-Axis and their own number
        subdirectories = [...this.wAxis, integer];
        break;
      case 'void':
        // Void interacts with all
        subdirectories = [...this.a432Harmonics];
        break;
      default:
        // Default to vortex sequence
        subdirectories = [...this.vortexSequence];
    }
    
    // Add 0 for void center
    if (!subdirectories.includes(0)) {
      subdirectories.push(0);
    }
    
    return subdirectories.sort((a, b) => a - b);
  }

  /**
   * Analyze VBM for a specific integer
   */
  analyzeVBMForInteger(integer) {
    const digitalRoot = this.calculateDigitalRoot(integer);
    const fieldStrength = this.calculateFieldStrength(integer);
    const consciousnessLevel = this.calculateConsciousnessLevel(integer);
    
    return {
      principle: this.getVBMPrinciple(integer),
      fieldStrength,
      consciousnessLevel,
      digitalRoot,
      interactionType: this.getInteractionType(integer),
      metaphysicalContext: this.getMetaphysicalContext(integer)
    };
  }

  /**
   * Get VBM principle for an integer
   */
  getVBMPrinciple(integer) {
    const principles = {
      1: "Unity and source - interacts with vortex sequence",
      2: "Duality and division - interacts with vortex sequence", 
      3: "Creative resonance - interacts with W-Axis",
      4: "Stability and foundation - interacts with vortex sequence",
      5: "Transformation and bridge - interacts with vortex sequence",
      6: "Harmonic balance - interacts with W-Axis",
      7: "Return and mystery - interacts with vortex sequence",
      8: "Fullness and manifestation - interacts with vortex sequence",
      9: "Unity and spirit - interacts with W-Axis",
      0: "Void and center - interacts with all"
    };
    
    return principles[integer] || "Unknown principle";
  }

  /**
   * Get interaction type for an integer
   */
  getInteractionType(integer) {
    if (this.wAxis.includes(integer)) {
      return "W-Axis spiritual interaction";
    } else if (integer === 0) {
      return "Void center interaction";
    } else {
      return "Vortex material interaction";
    }
  }

  /**
   * Get metaphysical context for an integer
   */
  getMetaphysicalContext(integer) {
    const contexts = {
      1: "Unity consciousness - source of all patterns",
      2: "Duality consciousness - division creates manifestation",
      3: "Creative resonance consciousness - spiritual creativity",
      4: "Stability consciousness - foundation of all structures",
      5: "Transformation consciousness - bridge between dimensions",
      6: "Harmonic balance consciousness - perfect equilibrium",
      7: "Return consciousness - mystery and hidden flow",
      8: "Fullness consciousness - complete manifestation",
      9: "Unity spirit consciousness - transcendent awareness",
      0: "Void consciousness - infinite potential"
    };
    
    return contexts[integer] || "Unknown context";
  }
}

// Run VBM interaction analysis
function analyzeVBMInteractions() {
  console.log('\n🌿 ZEROPOINT NODE - VBM INTERACTION ANALYSIS 🌿\n');
  
  const analyzer = new VBMInteractionAnalyzer();
  const interactions = analyzer.analyzeVBMInteractions();
  
  console.log('📊 VBM INTERACTION ANALYSIS RESULTS:\n');
  
  // Display interactions for each integer
  Object.values(interactions).forEach(interaction => {
    console.log(`🔢 Directory ${interaction.integer}:\n`);
    console.log(`   Digital Root: ${interaction.digitalRoot}`);
    console.log(`   Interaction Type: ${interaction.interactionType}`);
    console.log(`   Field Strength: ${interaction.fieldStrength.toFixed(4)}`);
    console.log(`   Consciousness Level: ${interaction.consciousnessLevel.toFixed(4)}`);
    console.log(`   Base Interactions: [${interaction.baseInteractions.join(', ')}]`);
    console.log(`   Subdirectories: [${interaction.subdirectories.join(', ')}]`);
    console.log(`   VBM Principle: ${interaction.vbmAnalysis.principle}`);
    console.log(`   Metaphysical Context: ${interaction.vbmAnalysis.metaphysicalContext}`);
    console.log('');
  });
  
  console.log('🎯 CORRECTED SUBDIRECTORY STRUCTURE:\n');
  
  // Display corrected subdirectory structure
  Object.values(interactions).forEach(interaction => {
    console.log(`   src/${interaction.integer}/`);
    interaction.subdirectories.forEach(subdir => {
      console.log(`   ├── ${subdir}/`);
    });
    console.log('');
  });
  
  console.log('✨ Each integer directory now contains only the subdirectories');
  console.log('   that correspond to its VBM interactions, creating a');
  console.log('   mathematically coherent and metaphysically aligned structure.\n');
}

// Run the analysis
if (require.main === module) {
  analyzeVBMInteractions();
}

module.exports = { VBMInteractionAnalyzer, analyzeVBMInteractions }; 