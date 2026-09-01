/**
 * Vortex Based Mathematics (VBM) - TypeScript Implementation
 * Based on Marko Rodin's mathematical discoveries
 *
 * Wave 10: digitalRoot bridges to kernel legacy adapter (0→0).
 */

import { pathToFileURL } from 'node:url'
import { abs, pow } from './0/algebra.ts'
import { VORTEX_ORBIT, VORTEX_AXIS } from './0/index.ts'
import { legacyDigitalRoot } from './0/3/6/9/1/2/4/8/7/5/1/a432.roots.ts'

export class VortexMath {
    
    /**
     * Calculate the digital root of a number
     * Digital root is the recursive sum of digits until a single digit
     * Equivalent to: n === 0 ? 0 : 1 + (n - 1) % 9
     */
    static digitalRoot(n: number): number {
        return legacyDigitalRoot(abs(n))
    }

    /**
     * Fast digital root calculation using modular arithmetic
     */
    static digitalRootFast(n: number): number {
        return legacyDigitalRoot(abs(n))
    }

    /**
     * Generate the famous 1-2-4-8-7-5 doubling sequence (Mobius Circuit)
     * This is the core pattern in VBM - powers of 2 reduced to digital roots
     */
    static generateDoublingSequence(length: number = 12): number[] {
        const sequence: number[] = [];
        for (let i = 0; i < length; i++) {
            const powerOf2 = pow(2, i);
            sequence.push(this.digitalRoot(powerOf2));
        }
        return sequence;
    }

    /**
     * The core Mobius circuit — the kernel's VORTEX_ORBIT, not a second copy.
     *
     * This returned a literal, so it was one of 91 places in the tree holding
     * its own copy of a constant the kernel already exports. Bound rather than
     * retyped, it cannot drift from the definition.
     */
    static getMobiusCircuit(): number[] {
        return [...VORTEX_ORBIT];
    }

    /**
     * Generate the 3-6-9 "Spirit" pattern
     * These numbers form the higher dimensional control axis in VBM
     */
    static getSpiritNumbers(): number[] {
        return [...VORTEX_AXIS];
    }

    /**
     * Check if a number belongs to the Spirit numbers (3-6-9)
     */
    static isSpiritNumber(n: number): boolean {
        const dr = this.digitalRoot(n);
        return dr === 3 || dr === 6 || dr === 9;
    }

    /**
     * Generate the three family number groups according to VBM
     * Family 1: 1,4,7 (adding 3 repeatedly: 1+3=4, 4+3=7, 7+3=10→1)
     * Family 2: 2,5,8 (same pattern)  
     * Family 3: 3,6,9 (the "Spirit" family)
     */
    static getThreeFamilyGroups(): { family1: number[], family2: number[], family3: number[] } {
        return {
            family1: [1, 4, 7],
            family2: [2, 5, 8],
            family3: [...VORTEX_AXIS]
        };
    }

    /**
     * Determine which family a number belongs to
     */
    static getNumberFamily(n: number): 1 | 2 | 3 {
        const dr = this.digitalRoot(n);
        if ([1, 4, 7].includes(dr)) return 1;
        if ([2, 5, 8].includes(dr)) return 2;
        return 3; // [3, 6, 9]
    }

    /**
     * Generate polar number mates (numbers that add up to 9)
     * According to VBM: 1&8, 2&7, 4&5 are polar mates
     */
    static getPolarNumberMates(): Array<[number, number]> {
        return [[1, 8], [2, 7], [4, 5]];
    }

    /**
     * Find the polar mate of a number
     */
    static getPolarMate(n: number): number {
        const dr = this.digitalRoot(n);
        if (dr === 9 || dr === 0) return dr; // 9 and 0 are their own mates
        return 9 - dr;
    }

    /**
     * VBM Torus Number Map - maps numbers around a circle with 9 at the top
     * Returns the position (0-8) on the torus for a given number
     */
    static getTorusPosition(n: number): number {
        const dr = this.digitalRoot(n);
        if (dr === 9) return 0; // 9 is at the top (position 0)
        return dr; // 1-8 are at positions 1-8
    }

    /**
     * Calculate discrete number patterns for multiplication tables
     * Reduces all multiplication results to single digits
     */
    static generateDiscreteMultiplicationTable(size: number = 9): number[][] {
        const table: number[][] = [];
        for (let i = 1; i <= size; i++) {
            const row: number[] = [];
            for (let j = 1; j <= size; j++) {
                row.push(this.digitalRoot(i * j));
            }
            table.push(row);
        }
        return table;
    }

    /**
     * VBM Enneagram mapping - connects the 1-2-4-8-7-5 pattern to the 9-point figure
     */
    static mapToEnneagram(sequence: number[]): Array<{value: number, position: number}> {
        return sequence.map(value => ({
            value,
            position: this.getTorusPosition(value)
        }));
    }

    /**
     * Check if a sequence follows the Mobius Circuit pattern
     */
    static isMobiusPattern(sequence: number[]): boolean {
        const mobiusPattern = this.getMobiusCircuit();
        if (sequence.length < mobiusPattern.length) return false;
        
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] !== mobiusPattern[i % mobiusPattern.length]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Generate the binary code triangulation pattern mentioned in VBM
     * Shows that binary is actually based on triangulation, not true binary
     */
    static generateBinaryTriangulation(length: number = 10): string[] {
        const pattern: string[] = [];
        for (let i = 0; i < length; i++) {
            const binary = i.toString(2);
            const digitalSum = this.digitalRoot(parseInt(binary.split('').join('')));
            pattern.push(`${i} -> ${binary} -> ${digitalSum}`);
        }
        return pattern;
    }

    /**
     * Calculate the VBM "shear" values for torus boundaries
     * According to VBM: Shear 1, Shear 4, Shear 7 are the three harmonic electron shears
     */
    static calculateTorusShears(): { shear1: number, shear4: number, shear7: number } {
        // In VBM, multiplying polar mates gives the shear value
        const mates = this.getPolarNumberMates();
        return {
            shear1: this.digitalRoot(mates[0][0] * mates[0][1]), // 1 * 8 = 8 -> 8
            shear4: this.digitalRoot(mates[2][0] * mates[2][1]), // 4 * 5 = 20 -> 2
            shear7: this.digitalRoot(mates[1][0] * mates[1][1])  // 2 * 7 = 14 -> 5
        };
    }

    /**
     * Generate the Fibonacci sequence and show its VBM patterns
     */
    static fibonacciVBM(length: number = 20): Array<{value: number, digitalRoot: number, family: number}> {
        const fib: number[] = [1, 1];
        while (fib.length < length) {
            fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
        }
        
        return fib.map(value => ({
            value,
            digitalRoot: this.digitalRoot(value),
            family: this.getNumberFamily(value)
        }));
    }

    /**
     * The VBM "Power of Ten" pattern - showing how powers relate to the torus
     */
    static powerOfTenPattern(maxPower: number = 10): Array<{power: number, value: number, digitalRoot: number}> {
        const pattern: Array<{power: number, value: number, digitalRoot: number}> = [];
        for (let i = 0; i <= maxPower; i++) {
            const value = pow(10, i);
            pattern.push({
                power: i,
                value,
                digitalRoot: this.digitalRoot(value)
            });
        }
        return pattern;
    }

    /**
     * Check if a number exhibits the "Nine Power" property (all multiples reduce to 9)
     */
    static checkNinePower(n: number, multipliers: number[] = [1,2,3,4,5,6,7,8,9]): boolean {
        return multipliers.every(mult => this.digitalRoot(n * mult) === 9);
    }

    /**
     * Generate the VBM "Decoqubit" pattern - the core holographic pattern
     * This represents the fundamental geometry according to VBM
     */
    static generateDecoqubit(): {
        mobiusCircuit: number[],
        spiritNumbers: number[],
        familyGroups: {family1: number[], family2: number[], family3: number[]},
        polarMates: Array<[number, number]>
    } {
        return {
            mobiusCircuit: this.getMobiusCircuit(),
            spiritNumbers: this.getSpiritNumbers(),
            familyGroups: this.getThreeFamilyGroups(),
            polarMates: this.getPolarNumberMates()
        };
    }

    /**
     * Calculate the "Most Great Name" numerical value according to VBM
     * Bahá = 2+1+5 = 8, but in VBM context: B=2, A=1, H=5
     */
    static calculateBahaValue(): number {
        const B = 2; // Male compression
        const A = 1; // The Hamza (glottal stop)
        const H = 5; // Female decompression
        return this.digitalRoot(B + A + H); // 2+1+5 = 8, but let's show the full calculation
    }

    /**
     * Demonstrate the VBM "Perfect Registration" concept
     * Shows how patterns overlap with perfect alignment
     */
    static demonstratePerfectRegistration(): {hidden: number[], visible: number[], combined: number[]} {
        const visible = this.getMobiusCircuit();
        const hidden = visible.map(n => this.getPolarMate(n));
        const combined = [];
        for (let i = 0; i < visible.length; i++) {
            combined.push(visible[i], hidden[i]);
        }
        return { hidden, visible, combined };
    }

    /**
     * Utility function to validate VBM patterns in any given sequence
     */
    static validateVBMSequence(sequence: number[]): {
        isMobius: boolean,
        containsSpirit: boolean,
        familyDistribution: {family1: number, family2: number, family3: number}
    } {
        const isMobius = this.isMobiusPattern(sequence);
        const containsSpirit = sequence.some(n => this.isSpiritNumber(n));
        
        const familyDistribution = {family1: 0, family2: 0, family3: 0};
        sequence.forEach(n => {
            const family = this.getNumberFamily(n);
            if (family === 1) familyDistribution.family1++;
            else if (family === 2) familyDistribution.family2++;
            else familyDistribution.family3++;
        });

        return { isMobius, containsSpirit, familyDistribution };
    }
}

// Example usage and tests
export class VBMExamples {
    static runAllExamples(): void {
        console.log("=== Vortex Based Mathematics - TypeScript Implementation ===\n");

        // 1. Digital Root Examples
        console.log("1. Digital Root Calculations:");
        const testNumbers = [12345, 9876, 123, 999, 0, 27, 108];
        testNumbers.forEach(n => {
            console.log(`Digital root of ${n}: ${VortexMath.digitalRoot(n)}`);
        });

        // 2. The famous doubling sequence
        console.log("\n2. The 1-2-4-8-7-5 Mobius Circuit:");
        const doublingSeq = VortexMath.generateDoublingSequence(15);
        console.log("Powers of 2 (digital roots):", doublingSeq);
        console.log("Core Mobius Circuit:", VortexMath.getMobiusCircuit());

        // 3. Spirit Numbers
        console.log("\n3. The 3-6-9 Trinity (Spirit Numbers):");
        console.log("Spirit numbers:", VortexMath.getSpiritNumbers());
        console.log("Is 27 a spirit number?", VortexMath.isSpiritNumber(27));
        console.log("Is 14 a spirit number?", VortexMath.isSpiritNumber(14));

        // 4. Three Family Groups
        console.log("\n4. Three Family Number Groups:");
        const families = VortexMath.getThreeFamilyGroups();
        console.log("Family 1 (1,4,7):", families.family1);
        console.log("Family 2 (2,5,8):", families.family2);
        console.log("Family 3 (3,6,9):", families.family3);

        // 5. Polar Number Mates
        console.log("\n5. Polar Number Mates:");
        const polarMates = VortexMath.getPolarNumberMates();
        polarMates.forEach(([a, b]) => {
            console.log(`${a} & ${b} = ${a + b} (polar mates)`);
        });

        // 6. Fibonacci VBM Analysis
        console.log("\n6. Fibonacci Sequence VBM Analysis:");
        const fibVBM = VortexMath.fibonacciVBM(12);
        fibVBM.forEach(({value, digitalRoot, family}) => {
            console.log(`Fib(${value}) -> DR:${digitalRoot}, Family:${family}`);
        });

        // 7. Decoqubit Structure
        console.log("\n7. Decoqubit Core Structure:");
        const decoqubit = VortexMath.generateDecoqubit();
        console.log("Complete Decoqubit pattern:", decoqubit);

        // 8. Perfect Registration Demo
        console.log("\n8. Perfect Registration (Hidden/Visible Patterns):");
        const registration = VortexMath.demonstratePerfectRegistration();
        console.log("Visible circuit:", registration.visible);
        console.log("Hidden circuit:", registration.hidden);
        console.log("Combined pattern:", registration.combined);
    }
}

// Additional utility types for VBM
export interface VBMNumber {
    value: number;
    digitalRoot: number;
    family: 1 | 2 | 3;
    torusPosition: number;
    polarMate: number;
    isSpiritNumber: boolean;
}

export class VBMNumberAnalyzer {
    static analyzeNumber(n: number): VBMNumber {
        return {
            value: n,
            digitalRoot: VortexMath.digitalRoot(n),
            family: VortexMath.getNumberFamily(n),
            torusPosition: VortexMath.getTorusPosition(n),
            polarMate: VortexMath.getPolarMate(n),
            isSpiritNumber: VortexMath.isSpiritNumber(n)
        };
    }

    static analyzeSequence(sequence: number[]): VBMNumber[] {
        return sequence.map(n => this.analyzeNumber(n));
    }
}

// Run examples if this file is executed directly
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if (isMainModule()) {
    VBMExamples.runAllExamples();
}