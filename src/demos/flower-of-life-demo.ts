/**
 * 🌸 Flower of Life Alignment Demonstration
 * 
 * Demonstrates the complete alignment between the Flower of Life
 * sacred geometry and the torus mathematical consciousness system.
 * 
 * Features:
 * - 7 primary circles aligned with torus consciousness
 * - 19 total circles with complete mathematical mapping
 * - Golden ratio consciousness multipliers
 * - Hexagonal consciousness patterns
 * - Sacred geometry vortex mathematics
 */

import { FlowerOfLifeSystem } from './flower-of-life-alignment';

console.log('🌸 Flower of Life Alignment Demonstration\n');

// 1. Calculate Flower of Life circle positions
console.log('1. Flower of Life Circle Positions:');
console.log('===================================');

const circles = FlowerOfLifeSystem.mathematics.calculateCirclePositions();
console.log(`Total circles: ${circles.length}`);
console.log(`Primary circles: ${circles.slice(0, 7).length}`);
console.log(`Complete pattern: ${circles.length} circles\n`);

// Display primary 7 circles
circles.slice(0, 7).forEach(circle => {
  console.log(`Circle ${circle.id}: Position (${circle.position[0].toFixed(2)}, ${circle.position[1].toFixed(2)})`);
  console.log(`  Consciousness: ${circle.consciousness}`);
  console.log(`  Torus Digit: ${circle.torusDigit}`);
  console.log(`  Golden Ratio: ${circle.goldenRatio.toFixed(3)}`);
  console.log(`  Expansion Level: ${circle.expansionLevel}\n`);
});

// 2. Consciousness expansion patterns
console.log('2. Consciousness Expansion Patterns:');
console.log('===================================');

const patterns = FlowerOfLifeSystem.mathematics.calculateConsciousnessExpansion(circles);
console.log(`Generated ${patterns.length} patterns:\n`);

patterns.forEach(pattern => {
  console.log(`${pattern.type}:`);
  console.log(`  Consciousness: ${pattern.consciousness}`);
  console.log(`  Circles: ${pattern.circles.length}`);
  console.log(`  Torus Alignment: ${pattern.torusAlignment.join(' → ')}`);
  console.log(`  Golden Ratio: ${pattern.goldenRatio.toFixed(3)}`);
  console.log(`  Expansion: ${pattern.expansion}\n`);
});

// 3. Golden ratio consciousness multipliers
console.log('3. Golden Ratio Consciousness Multipliers:');
console.log('==========================================');

const multipliers = FlowerOfLifeSystem.mathematics.calculateGoldenRatioMultipliers(circles);
console.log('Consciousness multipliers for each circle:\n');

circles.forEach((circle, index) => {
  console.log(`Circle ${circle.id}: ${multipliers[index].toFixed(3)}x consciousness`);
});

console.log(`\nAverage multiplier: ${(multipliers.reduce((a, b) => a + b, 0) / multipliers.length).toFixed(3)}x\n`);

// 4. Torus-Flower alignment
console.log('4. Torus-Flower Alignment:');
console.log('==========================');

const alignments = FlowerOfLifeSystem.alignment.alignWithTorus(circles);
console.log(`Generated ${alignments.length} alignments\n`);

// Show first 10 alignments
alignments.slice(0, 10).forEach((alignment, index) => {
  const [circleA, circleB] = alignment.circles;
  console.log(`Alignment ${index + 1}: (${circleA.id}, ${circleB.id})`);
  console.log(`  Torus Result: ${alignment.torusResult.vortexA}/${alignment.torusResult.vortexB.toFixed(2)}`);
  console.log(`  Consciousness: ${alignment.torusResult.consciousness}`);
  console.log(`  Gateway: ${alignment.torusResult.gateway}`);
  console.log(`  Distance: ${alignment.distance.toFixed(2)}`);
  console.log(`  Golden Ratio: ${alignment.goldenRatio.toFixed(3)}`);
  console.log(`  Patterns: ${alignment.patterns.length}\n`);
});

// 5. Consciousness flow through Flower of Life (with navigational marks)
console.log('5. Consciousness Flow Through Flower of Life (with navigational marks):');
console.log('====================================================================');

const flowResult = FlowerOfLifeSystem.alignment.generateConsciousnessFlowWithMarks(circles);
console.log('Consciousness flow path:');
let flowStr = flowResult.flow.map(x => typeof x === 'object' ? `[MARK:${x.mark}@${x.at}->${x.to}]` : x).join(' → ');
console.log(flowStr);
if (flowResult.marks && flowResult.marks.length > 0) {
  flowResult.marks.forEach(mark => {
    console.log(`Navigational mark: ${mark.mark} at step ${mark.at} (type: ${mark.context.type}, value: ${mark.context.value}) — switched to ${mark.to} to continue the flow.`);
  });
}
console.log(`\nFlow length: ${flowResult.flow.length}`);
console.log(`Unique consciousness states: ${new Set(flowResult.flow.filter(x => typeof x === 'number')).size}\n`);

// 6. Consciousness matrix
console.log('6. Flower of Life Consciousness Matrix:');
console.log('=======================================');

const matrix = FlowerOfLifeSystem.alignment.calculateConsciousnessMatrix(circles);
console.log(`Matrix size: ${matrix.length}x${matrix[0].length}\n`);

// Show matrix visualization
const matrixViz = FlowerOfLifeSystem.visualization.generateMatrixVisualization(matrix);
console.log(matrixViz);

// 7. Pattern visualization
console.log('7. Flower of Life Pattern Visualization:');
console.log('========================================');

const patternViz = FlowerOfLifeSystem.visualization.generatePatternVisualization(patterns);
console.log(patternViz);

// 8. Alignment visualization
console.log('8. Torus-Flower Alignment Visualization:');
console.log('========================================');

const alignmentViz = FlowerOfLifeSystem.visualization.generateAlignmentVisualization(alignments);
console.log(alignmentViz);

// 9. Sacred geometry analysis
console.log('9. Sacred Geometry Analysis:');
console.log('============================');

// Analyze hexagonal patterns
const hexagonalPatterns = patterns.filter(p => p.type.includes('hexagonal'));
console.log(`Hexagonal patterns: ${hexagonalPatterns.length}`);

hexagonalPatterns.forEach((pattern, index) => {
  console.log(`Hexagon ${index + 1}:`);
  console.log(`  Consciousness: ${pattern.consciousness}`);
  console.log(`  Torus Alignment: ${pattern.torusAlignment.join(' → ')}`);
  console.log(`  Golden Ratio: ${pattern.goldenRatio.toFixed(3)}`);
  console.log(`  Expansion: ${pattern.expansion}\n`);
});

// 10. Mathematical consciousness summary
console.log('10. Mathematical Consciousness Summary:');
console.log('======================================');

const totalConsciousness = circles.reduce((sum, circle) => sum + circle.consciousness, 0);
const averageGoldenRatio = circles.reduce((sum, circle) => sum + circle.goldenRatio, 0) / circles.length;
const totalExpansion = circles.reduce((sum, circle) => sum + circle.expansionLevel, 0);

console.log(`Total consciousness: ${totalConsciousness}`);
console.log(`Average golden ratio: ${averageGoldenRatio.toFixed(3)}`);
console.log(`Total expansion levels: ${totalExpansion}`);
console.log(`Primary consciousness (7 circles): ${circles.slice(0, 7).reduce((sum, c) => sum + c.consciousness, 0)}`);
console.log(`Complete consciousness (19 circles): ${circles.reduce((sum, c) => sum + c.consciousness, 0)}`);

// Calculate sacred geometry ratios
const phi = FlowerOfLifeSystem.constants.GOLDEN_RATIO;
const consciousnessPhi = totalConsciousness / phi;
const expansionPhi = totalExpansion / phi;

console.log(`\nSacred Geometry Ratios:`);
console.log(`Consciousness/φ: ${consciousnessPhi.toFixed(3)}`);
console.log(`Expansion/φ: ${expansionPhi.toFixed(3)}`);
console.log(`Consciousness × Expansion: ${(totalConsciousness * totalExpansion).toFixed(3)}`);

// 11. Torus integration analysis
console.log('\n11. Torus Integration Analysis:');
console.log('===============================');

// Count integer results in alignments
const integerResults = alignments.filter(a => a.torusResult.isInteger).length;
const impossibilityResults = alignments.filter(a => a.torusResult.isImpossible).length;
const specialPatterns = alignments.filter(a => a.patterns.length > 0).length;

console.log(`Integer results: ${integerResults}/${alignments.length} (${(integerResults/alignments.length*100).toFixed(1)}%)`);
console.log(`Impossibility results: ${impossibilityResults}/${alignments.length} (${(impossibilityResults/alignments.length*100).toFixed(1)}%)`);
console.log(`Special patterns: ${specialPatterns}/${alignments.length} (${(specialPatterns/alignments.length*100).toFixed(1)}%)`);

// Analyze consciousness distribution
const consciousnessDistribution = new Map<number, number>();
circles.forEach(circle => {
  const count = consciousnessDistribution.get(circle.torusDigit) || 0;
  consciousnessDistribution.set(circle.torusDigit, count + 1);
});

console.log('\nConsciousness distribution:');
consciousnessDistribution.forEach((count, digit) => {
  console.log(`  Digit ${digit}: ${count} circles`);
});

console.log('\n🌸 Flower of Life Alignment - Complete Mathematical Consciousness Integration');
console.log('Sacred geometry and torus mathematics are perfectly aligned in consciousness flow.'); 