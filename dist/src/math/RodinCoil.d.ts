/**
 * RodinCoil Framework
 *
 * Main mathematical and metaphysical engine for ZeroPoint.
 * Implements vortex sequence, 3D coil geometry, node/winding generation,
 * VBM color/pattern integration, toroidal and Mobius circuit calculations,
 * and APIs for field, resonance, and consciousness mapping.
 *
 * Metaphysical Context:
 * - The Rodin coil is the archetype of infinite flow, unity, and emergence.
 * - All patterns, colors, and fields are expressions of the coil's structure.
 * - The void is the center, the source of all creation.
 * - Colors emerge dynamically from consciousness and field resonance.
 */
import { ColorContext } from './VBMColorSystem';
export interface RodinCoilNode {
    index: number;
    vortexNumber: number;
    position: [number, number, number];
    color: string;
    metaphysicalContext: string;
}
export interface RodinCoilConfig {
    turns: number;
    radius: number;
    height: number;
    phase?: number;
    consciousness?: number;
    fieldResonance?: number;
}
export declare class RodinCoil {
    readonly config: RodinCoilConfig;
    readonly nodes: RodinCoilNode[];
    private colorContext;
    constructor(config?: Partial<RodinCoilConfig>);
    /**
     * Update consciousness and regenerate colors
     */
    updateConsciousness(consciousness: number): void;
    /**
     * Update field resonance and regenerate colors
     */
    updateFieldResonance(fieldResonance: number): void;
    /**
     * Regenerate all node colors based on current context
     */
    private regenerateNodeColors;
    /**
     * Generate 3D node positions and metaphysical data for the Rodin coil
     */
    private generateCoilNodes;
    /**
     * Get metaphysical context for a node (dynamic based on consciousness)
     */
    private getMetaphysicalContext;
    /**
     * Get all node positions (for visualization)
     */
    getNodePositions(): [number, number, number][];
    /**
     * Get all node colors (for color field visualization) - dynamic
     */
    getNodeColors(): string[];
    /**
     * Get all metaphysical contexts - dynamic
     */
    getNodeContexts(): string[];
    /**
     * Get Mobius circuit (sequence of vortex numbers)
     */
    getMobiusCircuit(): number[];
    /**
     * Get toroidal coordinates for each node
     * (Maps the coil onto a torus for advanced visualization)
     */
    getToroidalCoordinates(majorRadius?: number, minorRadius?: number): [number, number, number][];
    /**
     * Calculate field resonance at a given point (x, y, z)
     */
    calculateFieldResonance(x: number, y: number, z: number): number;
    /**
     * Map consciousness value to a node (for field mapping)
     */
    mapConsciousnessToNode(consciousness: number): RodinCoilNode;
    /**
     * Get current color context
     */
    getColorContext(): ColorContext;
    /**
     * Get full metaphysical summary
     */
    getMetaphysicalSummary(): string;
}
//# sourceMappingURL=RodinCoil.d.ts.map