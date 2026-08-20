/**
 * VBM Demo - Practical examples of Vortex Based Mathematics in TypeScript
 * Demonstrates the key mathematical patterns and calculations
 */

import { PI } from './0/algebra.ts'
import { VortexMath, VBMNumberAnalyzer } from './vbm-math.ts';
import { AdvancedVBM, RodinCoilCalculator, VBMPatternAnalyzer } from './advanced-vbm.ts';

console.log("🌀 VORTEX BASED MATHEMATICS - TypeScript Implementation");
console.log("=".repeat(60));

// 1. Basic VBM Patterns Demo
console.log("\n📊 BASIC VBM PATTERNS");
console.log("-".repeat(30));

// Digital Root calculations
console.log("Digital Roots:");
[12345, 27, 108, 999].forEach(n => {
    console.log(`${n} → ${VortexMath.digitalRoot(n)}`);
});

// The famous Mobius Circuit
console.log("\n🔄 Mobius Circuit (1-2-4-8-7-5):");
const mobiusCircuit = VortexMath.getMobiusCircuit();
console.log("Pattern:", mobiusCircuit.join(" → "));

const doublingSequence = VortexMath.generateDoublingSequence(20);
console.log("Powers of 2 (digital roots):", doublingSequence.slice(0, 12).join(", "));

// Spirit Numbers (3-6-9)
console.log("\n✨ Spirit Numbers (3-6-9):");
const spiritNumbers = VortexMath.getSpiritNumbers();
console.log("Trinity:", spiritNumbers.join(" - "));

// Three Family Groups
console.log("\n👥 Three Family Groups:");
const families = VortexMath.getThreeFamilyGroups();
console.log(`Family 1: ${families.family1.join(", ")}`);
console.log(`Family 2: ${families.family2.join(", ")}`);
console.log(`Family 3: ${families.family3.join(", ")} (Spirit)`);

// 2. Advanced VBM Concepts Demo
console.log("\n🔬 ADVANCED VBM CONCEPTS");
console.log("-".repeat(30));

// Prime Squared Bases (Creation Equation)
console.log("Prime Numbers Squared (Creation Equation):");
const primeSquaredBases = AdvancedVBM.generatePrimeSquaredBases([3, 5, 7, 11]);
primeSquaredBases.forEach(({prime, squared, radix}) => {
    console.log(`${prime}² = ${squared} → Radix-${radix-1} system`);
});

// Rodin Coil Sequence
console.log("\n🧲 Rodin Coil Winding Sequence:");
const rodinSequence = AdvancedVBM.generateRodinCoilSequence();
console.log("Circle of Fifths:", rodinSequence.join(" → "));

// Harmonic Electron Shears
console.log("\n⚡ Harmonic Electron Shears:");
const shears = AdvancedVBM.calculateHarmonicShears();
Object.entries(shears).forEach(([key, value]) => {
    console.log(`${key.toUpperCase()}: ${value.value} (${value.calculation})`);
});

// 3. Practical Applications Demo
console.log("\n🛠️ PRACTICAL APPLICATIONS");
console.log("-".repeat(30));

// Number Analysis
console.log("Complete Number Analysis:");
const testNumbers = [27, 108, 432, 1728];
testNumbers.forEach(n => {
    const analysis = VBMNumberAnalyzer.analyzeNumber(n);
    console.log(`${n}: DR=${analysis.digitalRoot}, Family=${analysis.family}, ` +
                `Torus=${analysis.torusPosition}, Polar=${analysis.polarMate}, ` +
                `Spirit=${analysis.isSpiritNumber}`);
});

// Fibonacci VBM Analysis
console.log("\n📈 Fibonacci Sequence VBM Analysis:");
const fibVBM = VortexMath.fibonacciVBM(10).slice(0, 8);
fibVBM.forEach(({value, digitalRoot, family}) => {
    console.log(`Fib(${value.toString().padStart(4)}) → DR:${digitalRoot}, Family:${family}`);
});

// 4. Rodin Coil Calculator Demo
console.log("\n🔧 RODIN COIL CALCULATIONS");
console.log("-".repeat(30));

// Winding Positions
console.log("Rodin Coil Winding Positions (first 12 turns):");
const windingPositions = RodinCoilCalculator.calculateWindingPositions(12);
windingPositions.forEach(({turn, position, digitalRoot}) => {
    console.log(`Turn ${turn + 1}: Position ${position} (DR: ${digitalRoot})`);
});

// Magnetic Field Enhancement
console.log("\nMagnetic Field Enhancement:");
const enhancement = RodinCoilCalculator.calculateMagneticEnhancement(100);
console.log(`Conventional: ${enhancement.conventional} units`);
console.log(`Rodin Coil: ${enhancement.rodinCoil} units`);
console.log(`Enhancement: ${enhancement.percentageIncrease}% increase`);

// Field Type Comparison
const fieldComparison = RodinCoilCalculator.compareFieldTypes();
console.log(`\nField Types:`);
console.log(`Conventional: ${fieldComparison.conventional.type} - ${fieldComparison.conventional.description}`);
console.log(`Rodin Coil: ${fieldComparison.rodinCoil.type} - ${fieldComparison.rodinCoil.description}`);

// 5. Pattern Analysis Demo  
console.log("\n🔍 PATTERN ANALYSIS");
console.log("-".repeat(30));

// Analyze various sequences for VBM patterns
const sequences = {
    "Powers of 2": [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
    "Fibonacci": [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
    "Triangular Numbers": [1, 3, 6, 10, 15, 21, 28, 36, 45, 55],
    "Perfect Squares": [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
};

Object.entries(sequences).forEach(([name, sequence]) => {
    const analysis = VBMPatternAnalyzer.analyzeSequence(sequence);
    console.log(`\n${name}:`);
    console.log(`  Mobius Pattern: ${analysis.hasMobiusPattern ? "✓" : "✗"}`);
    console.log(`  Spirit Numbers: ${analysis.hasSpiritNumbers ? "✓" : "✗"}`);
    console.log(`  Dominant Family: ${analysis.dominantFamily}`);
    console.log(`  Period Length: ${analysis.periodicLength}`);
    console.log(`  Digital Roots: ${analysis.digitalRootSequence.slice(0, 8).join(", ")}...`);
});

// 6. Special VBM Properties Demo
console.log("\n🌟 SPECIAL VBM PROPERTIES");
console.log("-".repeat(30));

// Power of Nine demonstration
console.log("Power of Nine (all multiples reduce to 9):");
const powerOfNine = AdvancedVBM.demonstratePowerOfNine(10);
powerOfNine.slice(0, 6).forEach(({multiplier, product, digitalRoot, maintains9}) => {
    console.log(`9 × ${multiplier} = ${product} → ${digitalRoot} ${maintains9 ? "✓" : "✗"}`);
});

// Abhá Cypher (Most Great Name calculation)
console.log("\nAbhá Cypher (Most Great Name of God):");
const abhaCypher = AdvancedVBM.generateAbhaCypher();
console.log(`B(${abhaCypher.spiritMagnetometer[1]}) + A(${abhaCypher.spiritMagnetometer[0]}) + H(${abhaCypher.spiritMagnetometer[2]}) = ${abhaCypher.bahaValue}`);
console.log(`Cypher Pattern: ${abhaCypher.cypher}`);
console.log(`W-Axis (Spiritual Axis): ${abhaCypher.wAxis}`);

// Superfluid Mobius Circuit Properties
console.log("\nSuperfluid Mobius Circuit Properties:");
const superfluidity = AdvancedVBM.demonstrateSuperfluidity();
console.log(`Flow: ${superfluidity.flowDirection}`);
Object.entries(superfluidity.properties).forEach(([prop, value]) => {
    console.log(`  ${prop.charAt(0).toUpperCase() + prop.slice(1)}: ${value ? "✓" : "✗"}`);
});

// 7. Torus Geometry Demo
console.log("\n🍩 TORUS GEOMETRY");
console.log("-".repeat(30));

console.log("Torus Coordinates for key numbers:");
[1, 3, 9, 27].forEach(n => {
    const coords = AdvancedVBM.calculateTorusCoordinates(n);
    console.log(`${n}: (${coords.x.toFixed(3)}, ${coords.y.toFixed(3)}, ${coords.z.toFixed(3)}) ` +
                `θ=${(coords.theta * 180 / PI).toFixed(1)}° DR=${coords.digitalRoot}`);
});

console.log("\n🎯 VBM TypeScript Implementation Complete!");
console.log("All core mathematical patterns from Marko Rodin's work have been implemented.");
console.log("Use these classes to explore Vortex Based Mathematics in your applications!");

// Export usage examples
export const VBMDemoExamples = {
    basicPatterns: () => {
        console.log("Basic VBM patterns demonstration");
        console.log("Mobius Circuit:", VortexMath.getMobiusCircuit());
        console.log("Spirit Numbers:", VortexMath.getSpiritNumbers());
    },
    
    advancedCalculations: () => {
        console.log("Advanced VBM calculations");
        console.log("Rodin Coil Sequence:", AdvancedVBM.generateRodinCoilSequence());
        console.log("Harmonic Shears:", AdvancedVBM.calculateHarmonicShears());
    },
    
    numberAnalysis: (n: number) => {
        console.log(`Analyzing number ${n}:`);
        return VBMNumberAnalyzer.analyzeNumber(n);
    },
    
    patternAnalysis: (sequence: number[]) => {
        console.log("Analyzing sequence for VBM patterns:");
        return VBMPatternAnalyzer.analyzeSequence(sequence);
    }
};