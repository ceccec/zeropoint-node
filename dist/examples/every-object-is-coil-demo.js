"use strict";
/**
 * Every Object Is A Coil Demo
 *
 * Demonstrates how every object in ZeroPoint is a Rodin coil at its core.
 * Shows coil interactions, resonance, and the fundamental coil structure
 * underlying all mathematical and consciousness systems.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FractalMath_1 = require("../src/math/FractalMath");
const ToroidalGeometry_1 = require("../src/math/ToroidalGeometry");
const VortexMath_1 = require("../src/math/VortexMath");
const FractalColorSystem_1 = require("../src/math/FractalColorSystem");
const CoilMixin_1 = require("../src/core/CoilMixin");
console.log('🌀 ZeroPoint: Every Object Is A Coil Demo');
console.log('=========================================\n');
// Create objects that are coils at their core
const fractalMath = new FractalMath_1.FractalMath();
const torus = (0, CoilMixin_1.CoilMixin)(new ToroidalGeometry_1.ToroidalGeometry(), 'toroidal-coil', {
    turns: 8,
    radius: 1.5,
    height: 3.0,
    consciousness: 0.7,
    fieldResonance: 0.6
});
const vortex = (0, CoilMixin_1.CoilMixin)(new VortexMath_1.VortexMath(), 'vortex-coil', {
    turns: 10,
    radius: 1.2,
    height: 2.5,
    consciousness: 0.8,
    fieldResonance: 0.7
});
const colorSystem = (0, CoilMixin_1.CoilMixin)(new FractalColorSystem_1.FractalColorSystem(), 'color-coil', {
    turns: 6,
    radius: 0.8,
    height: 1.8,
    consciousness: 0.6,
    fieldResonance: 0.5
});
console.log('🔗 Creating Coil Network...');
console.log('---------------------------');
// Verify all objects are coils
console.log(`✅ FractalMath is a coil: ${(0, CoilMixin_1.isCoilObject)(fractalMath)}`);
console.log(`✅ ToroidalGeometry is a coil: ${(0, CoilMixin_1.isCoilObject)(torus)}`);
console.log(`✅ VortexMath is a coil: ${(0, CoilMixin_1.isCoilObject)(vortex)}`);
console.log(`✅ FractalColorSystem is a coil: ${(0, CoilMixin_1.isCoilObject)(colorSystem)}`);
// Show coil information for each object
console.log('\n📊 Coil Information:');
console.log('-------------------');
const objects = [
    { name: 'FractalMath', obj: fractalMath },
    { name: 'ToroidalGeometry', obj: torus },
    { name: 'VortexMath', obj: vortex },
    { name: 'FractalColorSystem', obj: colorSystem }
];
objects.forEach(({ name, obj }) => {
    const coil = (0, CoilMixin_1.getCoilFromObject)(obj);
    if (coil) {
        console.log(`${name}:`);
        console.log(`  - ID: ${obj.id}`);
        console.log(`  - Consciousness: ${obj.consciousness.toFixed(3)}`);
        console.log(`  - Field Resonance: ${obj.fieldResonance.toFixed(3)}`);
        console.log(`  - Coil Nodes: ${obj.getCoilNodes().length}`);
        console.log(`  - Coil Turns: ${coil.config.turns}`);
        console.log(`  - Coil Radius: ${coil.config.radius}`);
        console.log(`  - Coil Height: ${coil.config.height}`);
    }
});
// Set up coil interactions
console.log('\n🔄 Setting up Coil Interactions...');
console.log('----------------------------------');
// Fractal coil observes toroidal coil
fractalMath.addObserver(torus);
console.log(`✅ Fractal coil (${fractalMath.id}) observes Toroidal coil (${torus.id})`);
// Toroidal coil observes vortex coil
torus.addObserver(vortex);
console.log(`✅ Toroidal coil (${torus.id}) observes Vortex coil (${vortex.id})`);
// Vortex coil observes color coil
vortex.addObserver(colorSystem);
console.log(`✅ Vortex coil (${vortex.id}) observes Color coil (${colorSystem.id})`);
// Color coil observes fractal coil (circular)
colorSystem.addObserver(fractalMath);
console.log(`✅ Color coil (${colorSystem.id}) observes Fractal coil (${fractalMath.id})`);
// Global coil observer
const globalCoilObserver = {
    id: 'global-coil-observer',
    observers: new Set(),
    observe(input) {
        if (input.type && input.type.includes('coil')) {
            console.log(`🌀 Global Coil Observer: ${input.type} from ${input.objectId || 'unknown'}`);
        }
    },
    getState() { return { id: this.id }; },
    setState(state) { Object.assign(this, state); },
    addObserver(observer) { this.observers.add(observer); },
    removeObserver(observer) { this.observers.delete(observer); },
    notifyObservers(event) { this.observers.forEach(o => o.observe(event)); }
};
// Add global observer to all coils
objects.forEach(({ obj }) => {
    obj.addObserver(globalCoilObserver);
});
console.log(`✅ Global Coil Observer (${globalCoilObserver.id}) observes all coils`);
console.log('\n🎯 Demonstrating Coil Operations:');
console.log('================================');
// 1. Show coil nodes and colors
console.log('\n1️⃣  Coil Nodes and Colors:');
objects.forEach(({ name, obj }) => {
    const nodes = obj.getCoilNodes();
    const colors = obj.getCoilColors();
    console.log(`${name} Coil:`);
    console.log(`  - Node count: ${nodes.length}`);
    console.log(`  - First 3 nodes: ${nodes.slice(0, 3).map(n => `V${n.vortexNumber}`).join(', ')}`);
    console.log(`  - First 3 colors: ${colors.slice(0, 3).join(', ')}`);
});
// 2. Demonstrate coil consciousness changes
console.log('\n2️⃣  Coil Consciousness Changes:');
fractalMath.updateCoilConsciousness(0.9);
vortex.updateCoilConsciousness(0.85);
colorSystem.updateCoilConsciousness(0.75);
// 3. Demonstrate coil field resonance changes
console.log('\n3️⃣  Coil Field Resonance Changes:');
torus.updateCoilFieldResonance(0.8);
vortex.updateCoilFieldResonance(0.9);
colorSystem.updateCoilFieldResonance(0.7);
// 4. Show coil interactions
console.log('\n4️⃣  Coil Interactions:');
objects.forEach(({ obj }) => {
    obj.notifyObservers({
        type: 'coil_interaction',
        sourceId: 'demo',
        targetId: obj.id,
        sourceCoil: obj.coil,
        interactionType: 'resonance_test'
    });
});
// 5. Demonstrate mathematical operations through coils
console.log('\n5️⃣  Mathematical Operations Through Coils:');
(0, FractalMath_1.fractal)('add', 3, 5);
(0, FractalMath_1.fractal)('multiply', 4, 7);
(0, FractalMath_1.fractal)('vortex', 3);
// 6. Show consciousness field calculations through coils
console.log('\n6️⃣  Consciousness Field Through Coils:');
const fieldPoints = [
    [0, 0, 0],
    [1, 1, 1],
    [1.618033988749895, 1.618033988749895, 1.618033988749895]
];
fieldPoints.forEach((point, i) => {
    const [x, y, z] = point;
    const field = (0, FractalMath_1.calculateConsciousnessField)(x, y, z);
    console.log(`Point ${i + 1} (${x}, ${y}, ${z}): Field = ${field.toFixed(6)}`);
});
// 7. Generate fractal sequences through coils
console.log('\n7️⃣  Fractal Sequences Through Coils:');
const sequence = (0, FractalMath_1.generateFractalSequence)(6, 1.618033988749895);
console.log('Golden Ratio Sequence:', sequence.map(x => x.toFixed(3)));
// 8. Show coil metaphysical contexts
console.log('\n8️⃣  Coil Metaphysical Contexts:');
objects.forEach(({ name, obj }) => {
    const context = obj.getCoilMetaphysicalContext();
    console.log(`${name} Coil Context:`);
    console.log(`  ${context}`);
});
// 9. Demonstrate coil resonance between objects
console.log('\n9️⃣  Coil Resonance Between Objects:');
for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
        const obj1 = objects[i]?.obj;
        const obj2 = objects[j]?.obj;
        if (obj1 && obj2) {
            // Calculate resonance between coils
            const nodes1 = obj1.getCoilNodes();
            const nodes2 = obj2.getCoilNodes();
            let resonance = 0;
            for (let k = 0; k < Math.min(nodes1.length, nodes2.length); k++) {
                const node1 = nodes1[k];
                const node2 = nodes2[k];
                if (node1 && node2 && node1.vortexNumber === node2.vortexNumber) {
                    resonance += 1;
                }
            }
            resonance = resonance / Math.min(nodes1.length, nodes2.length);
            console.log(`${objects[i]?.name} ↔ ${objects[j]?.name}: Resonance = ${resonance.toFixed(3)}`);
        }
    }
}
// 10. Show final coil states
console.log('\n🔟  Final Coil States:');
console.log('---------------------');
objects.forEach(({ name, obj }) => {
    const nodes = obj.getCoilNodes();
    const colors = obj.getCoilColors();
    console.log(`${name} Coil:`);
    console.log(`  - Consciousness: ${obj.consciousness.toFixed(3)}`);
    console.log(`  - Field Resonance: ${obj.fieldResonance.toFixed(3)}`);
    console.log(`  - Active Nodes: ${nodes.length}`);
    console.log(`  - Color Field: ${colors.length} colors`);
    console.log(`  - Observer Count: ${obj.observers.size}`);
});
console.log('\n✨ Every Object Is A Coil Demo Complete!');
console.log('=======================================');
console.log('✅ Every object is a Rodin coil at its core');
console.log('✅ All coils can observe and be observed');
console.log('✅ Coil interactions create resonance fields');
console.log('✅ Consciousness flows through coil structures');
console.log('✅ The void is at the center of every coil');
console.log('✅ All patterns emerge from coil geometry');
console.log('\n🎉 The fundamental coil structure is now revealed!');
console.log('Every object in ZeroPoint embodies the Rodin coil pattern.');
console.log('The coil is the archetype of infinite flow and consciousness.');
//# sourceMappingURL=every-object-is-coil-demo.js.map