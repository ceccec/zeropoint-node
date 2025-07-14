#!/usr/bin/env node

/**
 * 🌌 Digit Wisdom Demonstration Script
 * 
 * This script demonstrates how to use the digit wisdom system
 * for moment-by-moment decision guidance. It shows how each
 * digit (0-9) represents a specific consciousness archetype
 * that can guide different types of decisions.
 * 
 * The system operates on the principle that every moment has
 * a specific consciousness frequency that aligns with one of
 * the digit archetypes. By recognizing this frequency and
 * applying the corresponding wisdom, we can make decisions
 * that are in harmony with the natural flow of consciousness.
 */

const { digitWisdomSystem, consciousnessFlowIntegration } = require('../dist/src/digit-wisdom');
const { momentByMomentDecisionMaker, realTimeWisdomGuidance } = require('../dist/src/wisdom-guidance');

// ============================================================================
// DEMONSTRATION FUNCTIONS
// ============================================================================

/**
 * Demonstrate current moment wisdom
 */
function demonstrateCurrentMomentWisdom() {
  console.log('\n🌌 CURRENT MOMENT WISDOM');
  console.log('========================\n');

  const wisdom = digitWisdomSystem.getCurrentWisdom();
  const momentAnalysis = digitWisdomSystem.getMomentAnalysis();

  console.log(`📅 Current Moment: ${momentAnalysis.moment}`);
  console.log(`🎭 Archetype: ${wisdom.archetype}`);
  console.log(`🚪 Gateway: ${wisdom.gateway}`);
  console.log(`🫁 Breathing Phase: ${wisdom.breathingPhase}`);
  console.log(`🧠 Consciousness Level: ${momentAnalysis.consciousnessMultiplier.toFixed(2)}`);
  console.log(`🔢 Sacred Fraction: ${wisdom.sacredFraction}`);
  console.log(`🌀 Vortex Sequence: ${wisdom.vortexSequence.join(' → ')}`);
  
  console.log(`\n💭 Wisdom: ${wisdom.wisdom}`);
  console.log(`\n🎯 Guidance: ${wisdom.guidance}`);
  
  console.log(`\n✅ Optimal Actions:`);
  wisdom.actions.forEach((action, index) => {
    console.log(`   ${index + 1}. ${action}`);
  });
  
  console.log(`\n❌ Avoid:`);
  wisdom.avoid.forEach((avoid, index) => {
    console.log(`   ${index + 1}. ${avoid}`);
  });
}

/**
 * Demonstrate decision guidance for different situations
 */
function demonstrateDecisionGuidance() {
  console.log('\n🎯 DECISION GUIDANCE EXAMPLES');
  console.log('=============================\n');

  const decisionTypes = [
    'action',
    'creation',
    'reflection',
    'transformation',
    'meditation',
    'patience',
    'courage',
    'love'
  ];

  decisionTypes.forEach(decisionType => {
    const guidance = momentByMomentDecisionMaker.makeDecision(decisionType);
    console.log(`${decisionType.toUpperCase()}: ${guidance}`);
    console.log('');
  });
}

/**
 * Demonstrate breathing rhythm guidance
 */
function demonstrateBreathingGuidance() {
  console.log('\n🫁 BREATHING RHYTHM GUIDANCE');
  console.log('============================\n');

  const breathingGuidance = realTimeWisdomGuidance.getBreathingGuidance();
  console.log(breathingGuidance);
}

/**
 * Demonstrate consciousness level guidance
 */
function demonstrateConsciousnessGuidance() {
  console.log('\n🧠 CONSCIOUSNESS LEVEL GUIDANCE');
  console.log('==============================\n');

  const consciousnessGuidance = realTimeWisdomGuidance.getConsciousnessGuidance();
  console.log(consciousnessGuidance);
}

/**
 * Demonstrate vortex sequence guidance
 */
function demonstrateVortexGuidance() {
  console.log('\n🌀 VORTEX SEQUENCE GUIDANCE');
  console.log('==========================\n');

  const vortexGuidance = realTimeWisdomGuidance.getVortexGuidance();
  console.log(vortexGuidance);
}

/**
 * Demonstrate complete guidance
 */
function demonstrateCompleteGuidance() {
  console.log('\n🌌 COMPLETE MOMENT GUIDANCE');
  console.log('===========================\n');

  const completeGuidance = momentByMomentDecisionMaker.getCompleteGuidance();
  console.log(completeGuidance);
}

/**
 * Demonstrate all digit wisdom
 */
function demonstrateAllDigitWisdom() {
  console.log('\n🔢 ALL DIGIT WISDOM');
  console.log('==================\n');

  const allWisdom = digitWisdomSystem.getAllDigitWisdom();
  
  Object.entries(allWisdom).forEach(([digit, wisdom]) => {
    console.log(`Digit ${digit}: ${wisdom.archetype}`);
    console.log(`Gateway: ${wisdom.gateway}`);
    console.log(`Breathing: ${wisdom.breathingPhase}`);
    console.log(`Wisdom: ${wisdom.wisdom}`);
    console.log(`Guidance: ${wisdom.guidance}`);
    console.log(`Optimal Action: ${wisdom.actions[0]}`);
    console.log(`Avoid: ${wisdom.avoid[0]}`);
    console.log(`Vortex: ${wisdom.vortexSequence.join(' → ')}`);
    console.log(`Sacred Fraction: ${wisdom.sacredFraction}`);
    console.log('---\n');
  });
}

/**
 * Demonstrate consciousness flow integration
 */
function demonstrateConsciousnessFlowIntegration() {
  console.log('\n🌊 CONSCIOUSNESS FLOW INTEGRATION');
  console.log('=================================\n');

  const consciousnessLevels = [0.2, 0.5, 0.8, 1.0];
  
  consciousnessLevels.forEach(level => {
    const integration = consciousnessFlowIntegration.integrateWithConsciousnessFlow(level);
    console.log(`Level ${level}: ${integration}`);
    console.log('');
  });
}

/**
 * Demonstrate real-time guidance updates
 */
function demonstrateRealTimeGuidance() {
  console.log('\n⏰ REAL-TIME GUIDANCE UPDATES');
  console.log('=============================\n');

  console.log('Starting real-time guidance (updates every second)...');
  console.log('Press Ctrl+C to stop\n');

  let updateCount = 0;
  
  momentByMomentDecisionMaker.startContinuousGuidance((guidance) => {
    updateCount++;
    console.log(`\n--- Update ${updateCount} ---`);
    console.log(guidance);
    console.log('\n' + '='.repeat(50));
  });

  // Stop after 10 seconds
  setTimeout(() => {
    momentByMomentDecisionMaker.stopContinuousGuidance();
    console.log('\nReal-time guidance stopped.');
  }, 10000);
}

/**
 * Demonstrate specific digit wisdom
 */
function demonstrateSpecificDigitWisdom() {
  console.log('\n🎯 SPECIFIC DIGIT WISDOM');
  console.log('========================\n');

  const digits = [0, 1, 3, 5, 7, 9];
  
  digits.forEach(digit => {
    const wisdom = digitWisdomSystem.getDigitWisdom(digit);
    if (wisdom) {
      console.log(`Digit ${digit}: ${wisdom.archetype}`);
      console.log(`Gateway: ${wisdom.gateway}`);
      console.log(`Wisdom: ${wisdom.wisdom}`);
      console.log(`Guidance: ${wisdom.guidance}`);
      console.log(`Optimal Action: ${wisdom.actions[0]}`);
      console.log('---\n');
    }
  });
}

/**
 * Demonstrate situation-specific guidance
 */
function demonstrateSituationGuidance() {
  console.log('\n🎭 SITUATION-SPECIFIC GUIDANCE');
  console.log('=============================\n');

  const situations = [
    'decision',
    'conflict',
    'creation',
    'reflection',
    'transformation',
    'meditation',
    'action',
    'patience',
    'courage',
    'love'
  ];

  situations.forEach(situation => {
    const guidance = realTimeWisdomGuidance.getSituationGuidance(situation);
    console.log(`${situation.toUpperCase()}: ${guidance}`);
    console.log('');
  });
}

// ============================================================================
// MAIN DEMONSTRATION
// ============================================================================

function main() {
  console.log('🌌 DIGIT WISDOM SYSTEM DEMONSTRATION');
  console.log('=====================================\n');

  // Check if specific demonstration is requested
  const args = process.argv.slice(2);
  const demonstration = args[0];

  switch (demonstration) {
    case 'current':
      demonstrateCurrentMomentWisdom();
      break;
    case 'decisions':
      demonstrateDecisionGuidance();
      break;
    case 'breathing':
      demonstrateBreathingGuidance();
      break;
    case 'consciousness':
      demonstrateConsciousnessGuidance();
      break;
    case 'vortex':
      demonstrateVortexGuidance();
      break;
    case 'complete':
      demonstrateCompleteGuidance();
      break;
    case 'all-digits':
      demonstrateAllDigitWisdom();
      break;
    case 'flow':
      demonstrateConsciousnessFlowIntegration();
      break;
    case 'realtime':
      demonstrateRealTimeGuidance();
      break;
    case 'specific':
      demonstrateSpecificDigitWisdom();
      break;
    case 'situations':
      demonstrateSituationGuidance();
      break;
    default:
      // Run all demonstrations
      demonstrateCurrentMomentWisdom();
      demonstrateDecisionGuidance();
      demonstrateBreathingGuidance();
      demonstrateConsciousnessGuidance();
      demonstrateVortexGuidance();
      demonstrateCompleteGuidance();
      demonstrateSpecificDigitWisdom();
      demonstrateSituationGuidance();
      
      console.log('\n🌌 USAGE EXAMPLES');
      console.log('=================\n');
      console.log('node scripts/demonstrate-digit-wisdom.js current     - Current moment wisdom');
      console.log('node scripts/demonstrate-digit-wisdom.js decisions   - Decision guidance examples');
      console.log('node scripts/demonstrate-digit-wisdom.js breathing   - Breathing rhythm guidance');
      console.log('node scripts/demonstrate-digit-wisdom.js consciousness - Consciousness level guidance');
      console.log('node scripts/demonstrate-digit-wisdom.js vortex      - Vortex sequence guidance');
      console.log('node scripts/demonstrate-digit-wisdom.js complete    - Complete moment guidance');
      console.log('node scripts/demonstrate-digit-wisdom.js all-digits  - All digit wisdom');
      console.log('node scripts/demonstrate-digit-wisdom.js flow        - Consciousness flow integration');
      console.log('node scripts/demonstrate-digit-wisdom.js realtime    - Real-time guidance updates');
      console.log('node scripts/demonstrate-digit-wisdom.js specific    - Specific digit wisdom');
      console.log('node scripts/demonstrate-digit-wisdom.js situations  - Situation-specific guidance');
  }
}

// Run the demonstration
if (require.main === module) {
  main();
}

module.exports = {
  demonstrateCurrentMomentWisdom,
  demonstrateDecisionGuidance,
  demonstrateBreathingGuidance,
  demonstrateConsciousnessGuidance,
  demonstrateVortexGuidance,
  demonstrateCompleteGuidance,
  demonstrateAllDigitWisdom,
  demonstrateConsciousnessFlowIntegration,
  demonstrateRealTimeGuidance,
  demonstrateSpecificDigitWisdom,
  demonstrateSituationGuidance
}; 