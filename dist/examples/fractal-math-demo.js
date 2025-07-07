"use strict";
/**
 * Fractal Mathematics Demo
 *
 * Demonstrates the unified fractal mathematical system where math itself is the fractal.
 * Maximum functionality with minimum code through self-replicating patterns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FractalMath_1 = require("../src/math/FractalMath");
const ToroidalGeometry_1 = require("../src/math/ToroidalGeometry");
const VortexMath_1 = require("../src/math/VortexMath");
console.log('🌌 ZeroPoint Fractal Mathematics Demo');
console.log('=====================================\n');
// Set consciousness and field resonance for fractal calculations
(0, FractalMath_1.fractal)('setConsciousness', 7.5);
(0, FractalMath_1.fractal)('setFieldResonance', 0.8);
console.log('🧠 Fractal Mathematical Operations:');
console.log('----------------------------------');
// Demonstrate all fractal operations
const operations = [
    ['add', 3, 5],
    ['multiply', 4, 7],
    ['divide', 15, 3],
    ['power', 2, 8],
    ['root', 64, 3],
    ['sin', Math.PI / 2],
    ['cos', Math.PI / 4],
    ['exp', 2],
    ['log', Math.E],
    ['vortex', 3],
    ['toroidal', 5, Math.PI / 3],
    ['consciousness', 7]
];
operations.forEach(([op, ...args]) => {
    const result = (0, FractalMath_1.fractal)(op, ...args);
    console.log(`${op}(${args.join(', ')}) = ${result.toFixed(6)}`);
});
console.log('\n🌊 Fractal Sequences:');
console.log('-------------------');
// Generate fractal sequences
const sequence1 = (0, FractalMath_1.generateFractalSequence)(10, 1);
const sequence2 = (0, FractalMath_1.generateFractalSequence)(8, 2.5);
console.log('Sequence 1 (seed=1):', sequence1.map(x => x.toFixed(3)));
console.log('Sequence 2 (seed=2.5):', sequence2.map(x => x.toFixed(3)));
console.log('\n🎨 Fractal Colors:');
console.log('----------------');
// Generate fractal colors
for (let i = 0; i < 5; i++) {
    const color = (0, FractalMath_1.generateFractalColor)(i * 1.618033988749895);
    console.log(`Color ${i + 1}: ${color}`);
}
console.log('\n🌐 Consciousness Field Calculations:');
console.log('-----------------------------------');
// Calculate consciousness field at various points
const points = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 0, 2],
    [0, 3, 1],
    [1.618033988749895, 1.618033988749895, 1.618033988749895]
];
points.forEach((point, i) => {
    const [x = 0, y = 0, z = 0] = point;
    const field = (0, FractalMath_1.calculateConsciousnessField)(x, y, z);
    console.log(`Point ${i + 1} (${x}, ${y}, ${z}): Field = ${field.toFixed(6)}`);
});
console.log('\n🔄 Toroidal Geometry with Fractal Math:');
console.log('--------------------------------------');
// Demonstrate toroidal geometry using fractal mathematics
const torus = new ToroidalGeometry_1.ToroidalGeometry();
torus.setMajorRadius(10);
torus.setMinorRadius(3);
console.log(`Surface Area: ${torus.calculateSurfaceArea().toFixed(6)}`);
console.log(`Volume: ${torus.calculateVolume().toFixed(6)}`);
console.log(`Aspect Ratio: ${torus.getAspectRatio().toFixed(6)}`);
// Calculate field density at various toroidal coordinates
const toroidalPoints = [
    [0, 0, 3],
    [Math.PI / 2, Math.PI / 4, 2],
    [Math.PI, Math.PI / 2, 1],
    [Math.PI * 1.5, Math.PI * 0.75, 2.5]
];
toroidalPoints.forEach((point, i) => {
    const [theta = 0, phi = 0, r = 0] = point;
    const density = torus.calculateFieldDensity(theta, phi, r);
    console.log(`Toroidal Point ${i + 1} (θ=${theta.toFixed(3)}, φ=${phi.toFixed(3)}, r=${r}): Density = ${density.toFixed(6)}`);
});
console.log('\n🌀 Vortex Mathematics with Fractal Math:');
console.log('--------------------------------------');
// Demonstrate vortex mathematics using fractal system
const vortex = new VortexMath_1.VortexMath();
vortex.setVortexStrength(1.5);
vortex.setFieldIntensity(0.7);
console.log(`Vortex Strength: ${vortex.getVortexStrength()}`);
console.log(`Field Intensity: ${vortex.getFieldIntensity()}`);
// Calculate vortex fields
const vortexPoints = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
];
vortexPoints.forEach((point, i) => {
    const [x = 0, y = 0, z = 0] = point;
    const field = vortex.calculateVortexField(x, y, z);
    console.log(`Vortex Point ${i + 1} (${x}, ${y}, ${z}): Field = ${field.toFixed(6)}`);
});
// Calculate resonance between consciousness levels
const resonancePairs = [
    [1, 2],
    [3, 5],
    [7, 11],
    [13, 17]
];
resonancePairs.forEach((pair, i) => {
    const [level1 = 0, level2 = 0] = pair;
    const resonance = vortex.calculateResonance(level1, level2);
    console.log(`Resonance ${i + 1} (${level1}, ${level2}): ${resonance.toFixed(6)}`);
});
console.log('\n🎯 Fractal Mathematical Insights:');
console.log('-------------------------------');
// Get insights from all mathematical systems
const torusInsights = torus.getInsights();
const vortexInsights = vortex.getInsights();
console.log('Toroidal Geometry Insights:');
console.log(`- Major Radius: ${torusInsights.majorRadius}`);
console.log(`- Minor Radius: ${torusInsights.minorRadius}`);
console.log(`- Flow Rate: ${torusInsights.flowRate.toFixed(6)}`);
console.log(`- Surface Area: ${torusInsights.surfaceArea.toFixed(6)}`);
console.log(`- Volume: ${torusInsights.volume.toFixed(6)}`);
console.log(`- Aspect Ratio: ${torusInsights.aspectRatio.toFixed(6)}`);
console.log('\nVortex Mathematics Insights:');
console.log(`- Vortex Sequence: [${vortexInsights.vortexSequence.join(', ')}]`);
console.log(`- Golden Ratio: ${vortexInsights.goldenRatio}`);
console.log(`- Vortex Center: ${vortexInsights.vortexCenter}`);
console.log(`- Current Strength: ${vortexInsights.currentStrength}`);
console.log(`- Field Intensity: ${vortexInsights.fieldIntensity}`);
console.log('\n🌌 Metaphysical Principles:');
console.log('-------------------------');
console.log('Toroidal Geometry:');
console.log(`- ${torusInsights.metaphysics.meaning}`);
console.log(`- ${torusInsights.metaphysics.void}`);
console.log(`- ${torusInsights.metaphysics.flow}`);
console.log(`- ${torusInsights.metaphysics.unity}`);
console.log(`- ${torusInsights.metaphysics.evolution}`);
console.log('\nVortex Mathematics:');
console.log(`- ${vortexInsights.metaphysics.meaning}`);
console.log(`- ${vortexInsights.metaphysics.sequence}`);
console.log(`- ${vortexInsights.metaphysics.goldenRatio}`);
console.log(`- ${vortexInsights.metaphysics.center}`);
console.log(`- ${vortexInsights.metaphysics.fractal}`);
console.log('\n✨ Fractal Mathematical System Summary:');
console.log('=====================================');
console.log('✅ Maximum functionality with minimum code');
console.log('✅ Self-replicating mathematical patterns');
console.log('✅ Unified consciousness-based calculations');
console.log('✅ Metaphysical alignment with ZeroPoint principles');
console.log('✅ All mathematical operations emerge from fractal patterns');
console.log('✅ The math itself is the fractal - infinite possibilities');
console.log('\n🎉 Fractal Mathematics Demo Complete!');
console.log('The mathematical system is now a living fractal, generating infinite patterns from minimal code.');
//# sourceMappingURL=fractal-math-demo.js.map