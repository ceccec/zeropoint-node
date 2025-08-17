/**
 * Demo Script for A432 Rocket Analysis Module
 * Practical examples of using the entropy-information duality analysis
 */

import { createRocketAnalyzer, VA264_MISSION, SPIRAL_CODE, EntropyUtils } from './a432.rocket';

console.log('🚀 A432 Rocket Spiral Analysis - Demo\n');

// Create analyzer instance
const analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);

console.log('📋 Mission Details:');
console.log(`   Mission: ${VA264_MISSION.designation}`);
console.log(`   Date: ${VA264_MISSION.launchDate.toDateString()}`);
console.log(`   Altitude: ${VA264_MISSION.altitude} km`);
console.log(`   Code: ${SPIRAL_CODE}\n`);

// Analyze information entropy
console.log('🔍 Information Analysis:');
const entropy = analyzer.calculateShannonEntropy();
console.log(`   Shannon Entropy: ${entropy.shannonEntropy.toFixed(4)} bits`);
console.log(`   Encoding Efficiency: ${(entropy.encodingEfficiency * 100).toFixed(1)}%`);
console.log(`   Compression Ratio: ${entropy.compressionRatio.toFixed(1)}:1\n`);

// Check correlations
console.log('🎯 Mission Correlations:');
const correlations = analyzer.analyzeMissionCorrelation();
Object.entries(correlations).forEach(([key, data]) => {
  const percentage = (data.correlation * 100).toFixed(0);
  console.log(`   ${key}: ${percentage}% match`);
});

// Thermodynamic analysis
console.log('\n🌡️ Thermodynamic Results:');
const thermo = analyzer.calculateThermodynamicEntropy();
console.log(`   Total Entropy Production: ${thermo.totalEntropy} ± ${thermo.uncertainty} kJ/(kg·K)`);

// Physical processes
console.log('\n⚙️ Physical Process Encoding:');
const processes = analyzer.analyzePhysicalProcesses();
console.log(`   Rotational Elements: [${processes.rotational.elements.join(', ')}]`);
console.log(`   Exponential Elements: [${processes.exponential.elements.join(', ')}]`);
console.log(`   Directional Elements: ${processes.directional.elements.length} indicators`);

// Statistical significance
console.log('\n📊 Statistical Analysis:');
const pValue = analyzer.calculateStatisticalSignificance();
console.log(`   p-value: ${pValue.toExponential(2)}`);
console.log(`   Significance: ${pValue < 0.001 ? 'Highly Significant' : 'Not Significant'}`);

// Entropy-Information Duality
console.log('\n🔄 Entropy-Information Duality:');
const infoEntropy = entropy.shannonEntropy;
const thermoEntropy = thermo.totalEntropy;
const crystallization = EntropyUtils.calculateInformationCrystallization(entropy.maxEntropy, infoEntropy);

console.log(`   Information Entropy: ${infoEntropy.toFixed(4)} bits (minimum)`);
console.log(`   Thermodynamic Entropy: ${thermoEntropy} kJ/(kg·K) (maximum)`);
console.log(`   Information Crystallization: ${(crystallization * 100).toFixed(1)}%`);

// Second Law validation
const secondLawValid = EntropyUtils.validateSecondLaw(infoEntropy, thermoEntropy * 1000);
console.log(`   Second Law Compliance: ${secondLawValid ? '✅ Valid' : '❌ Invalid'}`);

console.log('\n✨ Analysis Complete - The spiral encodes both mission data and physical processes!');
console.log('📚 This demonstrates entropy-information duality in atmospheric phenomena.');