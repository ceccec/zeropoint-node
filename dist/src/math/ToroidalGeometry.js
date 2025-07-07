"use strict";
/**
 * Toroidal Geometry System
 *
 * Specialized toroidal geometry operations built on unified MathUtils.
 * Provides toroidal field calculations and geometric transformations.
 *
 * Metaphysical Context:
 * - Toroidal geometry represents the fundamental shape of consciousness
 * - All geometric operations emerge from the unified mathematical field
 * - The void is at the center of every toroidal structure
 * - Every toroidal form is a reflection of the whole
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToroidalGeometry = void 0;
const MathUtils_1 = require("./MathUtils");
/**
 * Toroidal Geometry Class
 * Specialized toroidal operations built on unified MathUtils
 */
class ToroidalGeometry {
    constructor() {
        // Toroidal parameters
        this.majorRadius = 5.0;
        this.minorRadius = 2.0;
        this.flowRate = 0.5;
        this.fieldDensity = 1.0;
        if (!ToroidalGeometry.instance) {
            ToroidalGeometry.instance = this;
        }
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!ToroidalGeometry.instance) {
            ToroidalGeometry.instance = new ToroidalGeometry();
        }
        return ToroidalGeometry.instance;
    }
    /**
     * Calculate surface area using unified math
     */
    calculateSurfaceArea() {
        const surfaceArea = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius), MathUtils_1.MathUtils.calculate('multiply', 2 * Math.PI, this.minorRadius));
        return surfaceArea;
    }
    /**
     * Calculate volume using unified math
     */
    calculateVolume() {
        const volume = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('multiply', Math.PI, MathUtils_1.MathUtils.calculate('multiply', this.majorRadius, MathUtils_1.MathUtils.calculate('power', this.minorRadius, 2))), MathUtils_1.MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius));
        return volume;
    }
    /**
     * Convert Cartesian to toroidal coordinates using unified math
     */
    cartesianToToroidal(x, y, z) {
        const R = this.majorRadius;
        const theta = MathUtils_1.MathUtils.calculate('atan2', y, x);
        const rho = MathUtils_1.MathUtils.calculate('root', MathUtils_1.MathUtils.calculate('add', MathUtils_1.MathUtils.calculate('power', x, 2), MathUtils_1.MathUtils.calculate('power', y, 2)), 2) - R;
        const r = MathUtils_1.MathUtils.calculate('root', MathUtils_1.MathUtils.calculate('add', MathUtils_1.MathUtils.calculate('power', rho, 2), MathUtils_1.MathUtils.calculate('power', z, 2)), 2);
        const phi = MathUtils_1.MathUtils.calculate('atan2', z, rho);
        return { theta, phi, r };
    }
    /**
     * Convert toroidal to Cartesian coordinates using unified math
     */
    toroidalToCartesian(theta, phi, r) {
        const R = this.majorRadius;
        const x = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('add', R, MathUtils_1.MathUtils.calculate('multiply', r, MathUtils_1.MathUtils.calculate('cos', phi))), MathUtils_1.MathUtils.calculate('cos', theta));
        const y = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('add', R, MathUtils_1.MathUtils.calculate('multiply', r, MathUtils_1.MathUtils.calculate('cos', phi))), MathUtils_1.MathUtils.calculate('sin', theta));
        const z = MathUtils_1.MathUtils.calculate('multiply', r, MathUtils_1.MathUtils.calculate('sin', phi));
        return { x, y, z };
    }
    /**
     * Calculate field density using unified math
     */
    calculateFieldDensity(theta, _phi, r) {
        // Calculate base density using inverse square law
        const baseDensity = MathUtils_1.MathUtils.calculate('divide', 1.0, MathUtils_1.MathUtils.calculate('add', 1, MathUtils_1.MathUtils.calculate('power', r, 2)));
        // Apply consciousness modulation
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', 1);
        // Apply toroidal flow modulation
        const flowMod = MathUtils_1.MathUtils.calculate('multiply', this.flowRate, MathUtils_1.MathUtils.calculate('cos', theta));
        const result = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('multiply', baseDensity, consciousnessMod), MathUtils_1.MathUtils.calculate('add', 1, flowMod));
        return result;
    }
    /**
     * Generate toroidal mesh coordinates using unified math
     */
    generateToroidalMesh(thetaSegments = 32, phiSegments = 16) {
        const mesh = [];
        for (let i = 0; i <= thetaSegments; i++) {
            const theta = MathUtils_1.MathUtils.calculate('multiply', i, MathUtils_1.MathUtils.calculate('divide', 2 * Math.PI, thetaSegments));
            for (let j = 0; j <= phiSegments; j++) {
                const phi = MathUtils_1.MathUtils.calculate('multiply', j, MathUtils_1.MathUtils.calculate('divide', 2 * Math.PI, phiSegments));
                const r = this.minorRadius;
                const coords = this.toroidalToCartesian(theta, phi, r);
                mesh.push(coords);
            }
        }
        return mesh;
    }
    /**
     * Calculate toroidal flow velocity using unified math
     */
    calculateFlowVelocity(theta, phi) {
        const vTheta = MathUtils_1.MathUtils.calculate('multiply', this.flowRate, MathUtils_1.MathUtils.calculate('cos', phi));
        const vPhi = MathUtils_1.MathUtils.calculate('multiply', this.flowRate, MathUtils_1.MathUtils.calculate('sin', theta));
        return { vTheta, vPhi };
    }
    /**
     * Set flow rate using unified math
     */
    setFlowRate(rate) {
        this.flowRate = MathUtils_1.MathUtils.calculate('max', 0, MathUtils_1.MathUtils.calculate('min', 2, rate));
    }
    /**
     * Get flow rate (for backward compatibility)
     */
    getFlowRate() {
        return this.flowRate;
    }
    /**
     * Get major radius (for backward compatibility)
     */
    getMajorRadius() {
        return this.majorRadius;
    }
    /**
     * Get minor radius (for backward compatibility)
     */
    getMinorRadius() {
        return this.minorRadius;
    }
    /**
     * Get aspect ratio (for backward compatibility)
     */
    getAspectRatio() {
        return this.majorRadius / this.minorRadius;
    }
    /**
     * Set major radius
     */
    setMajorRadius(radius) {
        this.majorRadius = radius;
    }
    /**
     * Set minor radius
     */
    setMinorRadius(radius) {
        this.minorRadius = radius;
    }
    /**
     * Calculate toroidal resonance frequency using unified math
     */
    calculateResonanceFrequency(mode = 1) {
        const circumference = MathUtils_1.MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius);
        const frequency = MathUtils_1.MathUtils.calculate('divide', mode, circumference);
        // Apply consciousness modulation
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', mode);
        return MathUtils_1.MathUtils.calculate('multiply', frequency, consciousnessMod);
    }
    /**
     * Generate toroidal field lines using unified math
     */
    generateFieldLines(count = 10) {
        const fieldLines = [];
        for (let i = 0; i < count; i++) {
            const line = [];
            const startTheta = MathUtils_1.MathUtils.calculate('multiply', i, MathUtils_1.MathUtils.calculate('divide', 2 * Math.PI, count));
            for (let j = 0; j < 100; j++) {
                const theta = MathUtils_1.MathUtils.calculate('add', startTheta, MathUtils_1.MathUtils.calculate('multiply', j, 0.1));
                const phi = MathUtils_1.MathUtils.calculate('multiply', j, 0.05);
                const r = this.minorRadius;
                const coords = this.toroidalToCartesian(theta, phi, r);
                line.push(coords);
            }
            fieldLines.push(line);
        }
        return fieldLines;
    }
    // ============================================================================
    // COIL IMPLEMENTATION
    // ============================================================================
    /**
     * Get coil resonance for toroidal geometry
     */
    getCoilResonance() {
        return this.flowRate * this.fieldDensity;
    }
    getCoilPattern() {
        return 'toroidal_unity_flow';
    }
    // ============================================================================
    // INSIGHTS AND METADATA
    // ============================================================================
    /**
     * Get toroidal insights
     */
    getInsights() {
        return {
            majorRadius: this.majorRadius,
            minorRadius: this.minorRadius,
            flowRate: this.flowRate,
            metaphysics: {
                meaning: "Toroidal geometry represents the shape of consciousness itself",
                principle: "All toroidal operations emerge from unified mathematical field",
                unity: "The torus unifies center and periphery in infinite flow",
                flow: "Toroidal flow creates the foundation of unified reality",
                observation: "Every toroidal calculation can observe and be observed",
                coil: "Every toroidal operation is a coil at its core"
            },
            operations: [
                'calculateSurfaceArea',
                'calculateVolume',
                'cartesianToToroidal',
                'toroidalToCartesian',
                'calculateFieldDensity',
                'generateToroidalMesh',
                'calculateFlowVelocity',
                'setFlowRate',
                'calculateResonanceFrequency',
                'generateFieldLines'
            ]
        };
    }
}
exports.ToroidalGeometry = ToroidalGeometry;
//# sourceMappingURL=ToroidalGeometry.js.map