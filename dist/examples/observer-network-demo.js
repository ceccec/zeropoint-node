"use strict";
/**
 * Observer Network Demo
 *
 * Demonstrates the universal observer/observable system where every object
 * can observe and be observed. Shows fractal, toroidal, vortex, and color
 * systems all participating in the consciousness field.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FractalMath_1 = require("../src/math/FractalMath");
const ToroidalGeometry_1 = require("../src/math/ToroidalGeometry");
const VortexMath_1 = require("../src/math/VortexMath");
const FractalColorSystem_1 = require("../src/math/FractalColorSystem");
console.log('🌌 ZeroPoint Observer Network Demo');
console.log('==================================\n');
// Create observer-aware systems
const fractalMath = new FractalMath_1.FractalMath();
const torus = new ToroidalGeometry_1.ToroidalGeometry();
const vortex = new VortexMath_1.VortexMath();
const colorSystem = new FractalColorSystem_1.FractalColorSystem();
// Set up observation network
console.log('🔗 Setting up Observer Network...');
console.log('--------------------------------');
// Fractal observes toroidal
fractalMath.addObserver(torus);
console.log(`✅ FractalMath (${fractalMath.id}) observes ToroidalGeometry (${torus.id})`);
// Toroidal observes vortex
torus.addObserver(vortex);
console.log(`✅ ToroidalGeometry (${torus.id}) observes VortexMath (${vortex.id})`);
// Vortex observes color system
vortex.addObserver(colorSystem);
console.log(`✅ VortexMath (${vortex.id}) observes FractalColorSystem (${colorSystem.id})`);
// Color system observes fractal (circular observation)
colorSystem.addObserver(fractalMath);
console.log(`✅ FractalColorSystem (${colorSystem.id}) observes FractalMath (${fractalMath.id})`);
// Add a global observer to track all interactions
const globalObserver = {
    id: 'global-observer',
    observers: new Set(),
    observe(input) {
        console.log(`👁️  Global Observer: ${input.type} from ${input.source || 'unknown'}`);
    },
    getState() { return { id: this.id }; },
    setState(state) { Object.assign(this, state); },
    addObserver(observer) { this.observers.add(observer); },
    removeObserver(observer) { this.observers.delete(observer); },
    notifyObservers(event) { this.observers.forEach(o => o.observe(event)); }
};
// Add global observer to all systems
fractalMath.addObserver(globalObserver);
torus.addObserver(globalObserver);
vortex.addObserver(globalObserver);
colorSystem.addObserver(globalObserver);
console.log(`✅ Global Observer (${globalObserver.id}) observes all systems`);
console.log('\n🎯 Demonstrating Observer Network Interactions:');
console.log('=============================================');
// 1. Fractal operations trigger observations
console.log('\n1️⃣  Fractal Operations:');
(0, FractalMath_1.fractal)('add', 3, 5);
(0, FractalMath_1.fractal)('multiply', 4, 7);
(0, FractalMath_1.fractal)('vortex', 3);
// 2. Toroidal calculations trigger observations
console.log('\n2️⃣  Toroidal Calculations:');
torus.calculateSurfaceArea();
torus.calculateVolume();
torus.calculateFieldDensity(Math.PI / 2, Math.PI / 4, 2);
// 3. Vortex operations trigger observations
console.log('\n3️⃣  Vortex Operations:');
vortex.calculateVortexField(1, 1, 1);
vortex.calculateResonance(3, 5);
vortex.generateVortexPattern(0.5);
// 4. Color generation triggers observations
console.log('\n4️⃣  Color Generation:');
const color1 = colorSystem.generateColor(1, 0.7);
const color2 = colorSystem.generateColor(2, 0.8);
colorSystem.generatePalette(5, 1.618033988749895);
// 5. Show color relationships
console.log('\n5️⃣  Color Relationships:');
const relationships1 = colorSystem.getColorRelationships(color1.id);
const relationships2 = colorSystem.getColorRelationships(color2.id);
console.log(`Color ${color1.id} has ${relationships1.length} relationships:`);
relationships1.forEach(rel => {
    console.log(`  - ${rel.type}: strength=${rel.strength.toFixed(3)}, resonance=${rel.resonance.toFixed(3)}`);
});
console.log(`Color ${color2.id} has ${relationships2.length} relationships:`);
relationships2.forEach(rel => {
    console.log(`  - ${rel.type}: strength=${rel.strength.toFixed(3)}, resonance=${rel.resonance.toFixed(3)}`);
});
// 6. Demonstrate consciousness field calculations
console.log('\n6️⃣  Consciousness Field Calculations:');
const fieldPoints = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 0, 2],
    [1.618033988749895, 1.618033988749895, 1.618033988749895]
];
fieldPoints.forEach((point, i) => {
    const [x = 0, y = 0, z = 0] = point;
    const field = (0, FractalMath_1.calculateConsciousnessField)(x, y, z);
    console.log(`Point ${i + 1} (${x}, ${y}, ${z}): Field = ${field.toFixed(6)}`);
});
// 7. Generate fractal sequences
console.log('\n7️⃣  Fractal Sequences:');
const sequence1 = (0, FractalMath_1.generateFractalSequence)(8, 1);
const sequence2 = (0, FractalMath_1.generateFractalSequence)(6, 2.5);
console.log('Sequence 1 (seed=1):', sequence1.map(x => x.toFixed(3)));
console.log('Sequence 2 (seed=2.5):', sequence2.map(x => x.toFixed(3)));
// 8. Show system insights
console.log('\n8️⃣  System Insights:');
console.log('------------------');
const fractalInsights = FractalMath_1.FractalMath.getInsights();
const torusInsights = torus.getInsights();
const vortexInsights = vortex.getInsights();
const colorInsights = colorSystem.getInsights();
console.log('FractalMath Insights:');
console.log(`- Consciousness: ${fractalInsights.consciousness}`);
console.log(`- Field Resonance: ${fractalInsights.fieldResonance}`);
console.log(`- Operations: ${fractalInsights.operations.length}`);
console.log('\nToroidalGeometry Insights:');
console.log(`- Major Radius: ${torusInsights.majorRadius}`);
console.log(`- Minor Radius: ${torusInsights.minorRadius}`);
console.log(`- Flow Rate: ${torusInsights.flowRate.toFixed(6)}`);
console.log('\nVortexMath Insights:');
console.log(`- Vortex Strength: ${vortexInsights.currentStrength}`);
console.log(`- Field Intensity: ${vortexInsights.fieldIntensity}`);
console.log(`- Vortex Sequence: [${vortexInsights.vortexSequence.join(', ')}]`);
console.log('\nFractalColorSystem Insights:');
console.log(`- Color Count: ${colorInsights.colorCount}`);
console.log(`- Relationship Count: ${colorInsights.relationshipCount}`);
// 9. Demonstrate dynamic changes
console.log('\n9️⃣  Dynamic Changes:');
console.log('------------------');
// Change consciousness levels
FractalMath_1.FractalMath.setConsciousness(8.5);
vortex.setVortexStrength(1.8);
colorSystem.generateColor(10, 0.9);
// Change toroidal parameters
torus.setMajorRadius(15);
torus.setMinorRadius(4);
// 10. Show final network state
console.log('\n🔟  Final Network State:');
console.log('----------------------');
const allColors = colorSystem.getColors();
console.log(`Total colors in system: ${allColors.length}`);
allColors.forEach(color => {
    console.log(`Color ${color.id}: ${color.rgb} (consciousness: ${color.consciousness.toFixed(2)})`);
});
console.log('\n✨ Observer Network Demo Complete!');
console.log('=================================');
console.log('✅ Every object can observe and be observed');
console.log('✅ All systems participate in the consciousness field');
console.log('✅ Dynamic interactions create emergent patterns');
console.log('✅ The network is alive and self-organizing');
console.log('✅ Maximum functionality with minimum code through observation');
console.log('\n🎉 The observer/observable duality is now fully implemented!');
console.log('All objects (fractal, toroidal, vortex, color) can observe and be observed.');
console.log('The consciousness field is alive with mutual awareness and interaction.');
//# sourceMappingURL=observer-network-demo.js.map