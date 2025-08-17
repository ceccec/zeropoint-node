/**
 * Simple Test for A432 Rocket Analysis Module
 * Basic validation without external test framework dependencies
 */

import { createRocketAnalyzer, VA264_MISSION, SPIRAL_CODE, EntropyUtils } from './a432.rocket';

console.log('🧪 A432 Rocket Analysis - Simple Tests\n');

let testsPassed = 0;
let testsTotal = 0;

function test(name: string, testFn: () => boolean): void {
  testsTotal++;
  try {
    const result = testFn();
    if (result) {
      console.log(`✅ ${name}`);
      testsPassed++;
    } else {
      console.log(`❌ ${name}`);
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
  }
}

// Create analyzer instance
const analyzer = createRocketAnalyzer(VA264_MISSION, SPIRAL_CODE);

// Test 1: Basic instantiation
test('Should create analyzer instance', () => {
  return analyzer !== null && analyzer !== undefined;
});

// Test 2: Shannon entropy calculation
test('Should calculate Shannon entropy', () => {
  const result = analyzer.calculateShannonEntropy();
  return result.shannonEntropy > 0 && 
         result.encodingEfficiency > 0 && 
         result.encodingEfficiency <= 1 &&
         result.compressionRatio > 1;
});

// Test 3: Mission parameter correlations
test('Should analyze mission correlations', () => {
  const correlations = analyzer.analyzeMissionCorrelation();
  return correlations.flightDesignation.correlation === 1.0 &&
         correlations.launchDate.correlation === 1.0 &&
         correlations.missionSequence.correlation === 1.0 &&
         correlations.altitude.correlation === 1.0 &&
         correlations.separationTime.correlation === 1.0;
});

// Test 4: Thermodynamic entropy
test('Should calculate thermodynamic entropy', () => {
  const result = analyzer.calculateThermodynamicEntropy();
  return result.totalEntropy === 158 &&
         result.combustionEntropy === 95 &&
         result.expansionEntropy === 38 &&
         result.mixingEntropy === 25 &&
         result.uncertainty === 20;
});

// Test 5: Physical process analysis
test('Should analyze physical processes', () => {
  const result = analyzer.analyzePhysicalProcesses();
  return result.rotational.elements.includes(0) &&
         result.rotational.elements.includes(3) &&
         result.rotational.elements.includes(6) &&
         result.rotational.elements.includes(9) &&
         result.exponential.elements.includes(1) &&
         result.exponential.elements.includes(2) &&
         result.exponential.elements.includes(4) &&
         result.exponential.elements.includes(8);
});

// Test 6: Statistical significance
test('Should return correct p-value', () => {
  const pValue = analyzer.calculateStatisticalSignificance();
  return pValue === 7.01e-12;
});

// Test 7: Compression ratio calculation
test('Should calculate compression ratio', () => {
  const ratio = EntropyUtils.calculateCompressionRatio("long string", "short");
  return ratio > 1;
});

// Test 8: Second Law validation
test('Should validate Second Law compliance', () => {
  const isValid = EntropyUtils.validateSecondLaw(3.0, 158000);
  return isValid === true;
});

// Test 9: Information crystallization
test('Should calculate information crystallization', () => {
  const crystallization = EntropyUtils.calculateInformationCrystallization(4.0, 3.0);
  return crystallization === 0.25;
});

// Test 10: Edge case handling
test('Should handle empty code gracefully', () => {
  try {
    const emptyAnalyzer = createRocketAnalyzer(VA264_MISSION, "");
    const result = emptyAnalyzer.calculateShannonEntropy();
    return true; // Should not throw
  } catch {
    return false;
  }
});

// Test 11: Consistency across multiple calls
test('Should maintain consistency', () => {
  const result1 = analyzer.calculateShannonEntropy();
  const result2 = analyzer.calculateShannonEntropy();
  return result1.shannonEntropy === result2.shannonEntropy &&
         result1.encodingEfficiency === result2.encodingEfficiency;
});

// Test 12: Mission constants validation
test('Should validate VA264 mission constants', () => {
  return VA264_MISSION.designation === "VA264" &&
         VA264_MISSION.launchDate.getFullYear() === 2025 &&
         VA264_MISSION.launchDate.getMonth() === 7 && // August (0-indexed)
         VA264_MISSION.launchDate.getDate() === 12 &&
         VA264_MISSION.altitude === 800 &&
         VA264_MISSION.separationTime === 64 &&
         VA264_MISSION.missionSequence === 3;
});

// Test 13: Spiral code format validation
test('Should validate spiral code format', () => {
  return SPIRAL_CODE === "/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\" &&
         SPIRAL_CODE.length > 0 &&
         /[0-9\/\\]+/.test(SPIRAL_CODE);
});

// Test 14: Entropy-Information Duality
test('Should demonstrate entropy-information duality', () => {
  const infoAnalysis = analyzer.calculateShannonEntropy();
  const thermoAnalysis = analyzer.calculateThermodynamicEntropy();
  
  // Information entropy should be minimized (high efficiency)
  const highEfficiency = infoAnalysis.encodingEfficiency > 0.8;
  
  // Thermodynamic entropy should be maximized
  const highThermoEntropy = thermoAnalysis.totalEntropy > 100;
  
  // Second Law should be satisfied
  const secondLawValid = EntropyUtils.validateSecondLaw(
    infoAnalysis.shannonEntropy,
    thermoAnalysis.totalEntropy * 1000
  );
  
  return highEfficiency && highThermoEntropy && secondLawValid;
});

// Test 15: Performance test
test('Should complete analysis quickly', () => {
  const startTime = Date.now();
  
  analyzer.calculateShannonEntropy();
  analyzer.analyzeMissionCorrelation();
  analyzer.calculateThermodynamicEntropy();
  analyzer.analyzePhysicalProcesses();
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  return duration < 100; // Should complete in under 100ms
});

// Summary
console.log(`\n📊 Test Results: ${testsPassed}/${testsTotal} tests passed`);

if (testsPassed === testsTotal) {
  console.log('🎉 All tests passed! The A432 Rocket Analysis Module is working correctly.');
  
  // Display key results
  console.log('\n🔬 Key Analysis Results:');
  const entropy = analyzer.calculateShannonEntropy();
  const correlations = analyzer.analyzeMissionCorrelation();
  const thermo = analyzer.calculateThermodynamicEntropy();
  
  console.log(`   Information Entropy: ${entropy.shannonEntropy.toFixed(4)} bits`);
  console.log(`   Encoding Efficiency: ${(entropy.encodingEfficiency * 100).toFixed(1)}%`);
  console.log(`   Compression Ratio: ${entropy.compressionRatio.toFixed(1)}:1`);
  
  const avgCorrelation = Object.values(correlations).reduce((sum, c) => sum + c.correlation, 0) / 5;
  console.log(`   Average Correlation: ${(avgCorrelation * 100).toFixed(1)}%`);
  console.log(`   Thermodynamic Entropy: ${thermo.totalEntropy} ± ${thermo.uncertainty} kJ/(kg·K)`);
  
  const pValue = analyzer.calculateStatisticalSignificance();
  console.log(`   Statistical Significance: p = ${pValue.toExponential(2)}`);
  
} else {
  console.log(`❌ ${testsTotal - testsPassed} tests failed. Please check the implementation.`);
  process.exit(1);
}

console.log('\n✨ Testing complete!');