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
export interface ToroidalCoordinates {
    x: number;
    y: number;
    z: number;
}
export interface ToroidalField {
    strength: number;
    flowRate: number;
    consciousnessLevel: number;
    voidIntegration: number;
}
/**
 * Toroidal Geometry Class
 * Specialized toroidal operations built on unified MathUtils
 */
export declare class ToroidalGeometry {
    private static instance;
    private majorRadius;
    private minorRadius;
    private flowRate;
    private fieldDensity;
    constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): ToroidalGeometry;
    /**
     * Calculate surface area using unified math
     */
    calculateSurfaceArea(): number;
    /**
     * Calculate volume using unified math
     */
    calculateVolume(): number;
    /**
     * Convert Cartesian to toroidal coordinates using unified math
     */
    cartesianToToroidal(x: number, y: number, z: number): {
        theta: number;
        phi: number;
        r: number;
    };
    /**
     * Convert toroidal to Cartesian coordinates using unified math
     */
    toroidalToCartesian(theta: number, phi: number, r: number): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Calculate field density using unified math
     */
    calculateFieldDensity(theta: number, _phi: number, r: number): number;
    /**
     * Generate toroidal mesh coordinates using unified math
     */
    generateToroidalMesh(thetaSegments?: number, phiSegments?: number): Array<{
        x: number;
        y: number;
        z: number;
    }>;
    /**
     * Calculate toroidal flow velocity using unified math
     */
    calculateFlowVelocity(theta: number, phi: number): {
        vTheta: number;
        vPhi: number;
    };
    /**
     * Set flow rate using unified math
     */
    setFlowRate(rate: number): void;
    /**
     * Get flow rate (for backward compatibility)
     */
    getFlowRate(): number;
    /**
     * Get major radius (for backward compatibility)
     */
    getMajorRadius(): number;
    /**
     * Get minor radius (for backward compatibility)
     */
    getMinorRadius(): number;
    /**
     * Get aspect ratio (for backward compatibility)
     */
    getAspectRatio(): number;
    /**
     * Set major radius
     */
    setMajorRadius(radius: number): void;
    /**
     * Set minor radius
     */
    setMinorRadius(radius: number): void;
    /**
     * Calculate toroidal resonance frequency using unified math
     */
    calculateResonanceFrequency(mode?: number): number;
    /**
     * Generate toroidal field lines using unified math
     */
    generateFieldLines(count?: number): Array<Array<{
        x: number;
        y: number;
        z: number;
    }>>;
    /**
     * Get coil resonance for toroidal geometry
     */
    getCoilResonance(): number;
    getCoilPattern(): string;
    /**
     * Get toroidal insights
     */
    getInsights(): any;
}
//# sourceMappingURL=ToroidalGeometry.d.ts.map