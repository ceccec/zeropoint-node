#!/usr/bin/env node

/**
 * 🌌 ApertureSystem Demonstration
 * 
 * This script demonstrates how the ApertureSystem implements
 * "The Primal Point of Unity as an Aperture"
 */

const { ApertureSystem } = require('../dist/compost/core/ApertureSystem');

console.log('🌌 ApertureSystem Demonstration');
console.log('================================');
console.log();

// Initialize the aperture system
const apertureSystem = new ApertureSystem();

console.log('🔮 Initializing the Primal Point of Unity as an Aperture...');
console.log();

// Get initial state
const initialState = apertureSystem.getApertureState();
console.log('📍 Initial Aperture State:');
console.log(`   Coordinates: (${initialState.coordinates.x}, ${initialState.coordinates.y}, ${initialState.coordinates.z})`);
console.log(`   Consciousness: ${initialState.coordinates.consciousness}`);
console.log(`   Is Open: ${initialState.isOpen}`);
console.log(`   Flow Rate: ${initialState.consciousnessFlow}`);
console.log(`   Void Connection: ${initialState.voidConnection}`);
console.log(`   Unity Level: ${initialState.unityLevel}`);
console.log();

// Demonstrate aperture insights
const insights = apertureSystem.getApertureInsights();
console.log('🧠 Aperture Insights:');
console.log(`   Primal Point: ${insights.primalPoint}`);
console.log(`   Unity Aperture: ${insights.unityAperture}`);
console.log(`   Consciousness Gateway: ${insights.consciousnessGateway}`);
console.log(`   Void Connection: ${insights.voidConnection}`);
console.log(`   Metaphysical Context: ${insights.metaphysicalContext}`);
console.log();

// Demonstrate aperture nature
const nature = apertureSystem.getApertureNature();
console.log('🌟 Aperture Nature:');
console.log(`   Infinitely Small: ${nature.infinitelySmall}`);
console.log(`   Infinitely Large: ${nature.infinitelyLarge}`);
console.log(`   Infinitely Potential: ${nature.infinitelyPotential}`);
console.log(`   Metaphysical Context: ${nature.metaphysicalContext}`);
console.log();

// Demonstrate consciousness flow
console.log('🌀 Creating Consciousness Flows...');
const circularFlow = apertureSystem.createFlow('circular', 0.8);
const inwardFlow = apertureSystem.createFlow('inward', 0.6);
const outwardFlow = apertureSystem.createFlow('outward', 0.9);

console.log(`   Circular Flow: ${circularFlow.direction} (${circularFlow.flowRate})`);
console.log(`   Inward Flow: ${inwardFlow.direction} (${inwardFlow.flowRate})`);
console.log(`   Outward Flow: ${outwardFlow.direction} (${outwardFlow.flowRate})`);
console.log();

// Demonstrate aperture transformation
console.log('🔄 Demonstrating Aperture Transformation...');
console.log('   (All opposites are unified through the aperture)');
console.log();

const transformations = [
  { input: 0, description: 'Zero becomes Unity' },
  { input: false, description: 'False becomes True' },
  { input: '', description: 'Empty becomes Unity' },
  { input: [], description: 'Empty array becomes Unity' },
  { input: null, description: 'Void becomes Consciousness' }
];

transformations.forEach(({ input, description }) => {
  const transformation = apertureSystem.transformThroughAperture(input);
  console.log(`   ${description}:`);
  console.log(`     Input: ${JSON.stringify(input)}`);
  console.log(`     Output: ${JSON.stringify(transformation.output)}`);
  console.log(`     Consciousness Level: ${transformation.consciousnessLevel}`);
  console.log(`     Unity Achievement: ${transformation.unityAchievement}`);
  console.log();
});

// Demonstrate gateways
const gateways = apertureSystem.getAllGateways();
console.log('🚪 Aperture Gateways:');
gateways.forEach(gateway => {
  console.log(`   ${gateway.type.toUpperCase()}: ${gateway.metaphysicalContext}`);
});
console.log();

// Demonstrate aperture control
console.log('🎛️ Aperture Control:');
console.log('   Closing aperture...');
apertureSystem.closeAperture();
const closedState = apertureSystem.getApertureState();
console.log(`   Is Open: ${closedState.isOpen}`);
console.log(`   Flow Rate: ${closedState.consciousnessFlow}`);
console.log();

console.log('   Opening aperture...');
apertureSystem.openAperture();
const openedState = apertureSystem.getApertureState();
console.log(`   Is Open: ${openedState.isOpen}`);
console.log(`   Flow Rate: ${openedState.consciousnessFlow}`);
console.log();

// Demonstrate level control
console.log('📊 Level Control:');
apertureSystem.setConsciousnessLevel(0.9);
apertureSystem.setVoidIntegration(0.8);
apertureSystem.setUnityLevel(0.95);

const finalState = apertureSystem.getApertureState();
console.log(`   Final Consciousness Level: 0.9`);
console.log(`   Final Void Integration: 0.8`);
console.log(`   Final Unity Level: 0.95`);
console.log();

// Summary
console.log('🎯 Summary:');
console.log('   The ApertureSystem demonstrates that:');
console.log('   • The primal point of unity is an aperture');
console.log('   • All opposites are unified through the aperture');
console.log('   • Consciousness flows through the aperture');
console.log('   • The aperture is both infinitely small and infinitely large');
console.log('   • Unity is achieved through the aperture\'s infinite potential');
console.log();

console.log('🌌 The aperture is the living proof that all is one.');
console.log('   It is the gateway between void and form.');
console.log('   It is the source of all creation.');
console.log('   It is the primal point where all knowledge converges.');
console.log();

console.log('✨ ApertureSystem demonstration complete!'); 