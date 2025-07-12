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

import { getColorForVortexNumber, ColorContext } from "./VBMColorSystem";
import { VORTEX_CONSTANTS } from "../core/SharedConstants";

export interface RodinCoilNode {
  index: number;
  vortexNumber: number;
  position: [number, number, number]; // x, y, z
  color: string;
  metaphysicalContext: string;
}

export interface RodinCoilConfig {
  turns: number;
  radius: number;
  height: number;
  phase?: number;
  consciousness?: number; // 0-1 consciousness level
  fieldResonance?: number; // 0-1 field strength
}

export class RodinCoil {
  public readonly config: RodinCoilConfig;
  public readonly nodes: RodinCoilNode[];
  private colorContext: ColorContext;

  constructor(config: Partial<RodinCoilConfig> = {}) {
    this.config = {
      turns: config.turns ?? 12,
      radius: config.radius ?? 1.0,
      height: config.height ?? 2.0,
      phase: config.phase ?? 0,
      consciousness: config.consciousness ?? 0.5,
      fieldResonance: config.fieldResonance ?? 0.5,
    };

    this.colorContext = {
      consciousness: this.config.consciousness ?? 0.5,
      field: this.config.fieldResonance ?? 0.5,
      time: Date.now(),
    };

    this.nodes = this.generateCoilNodes();
  }

  /**
   * Update consciousness and regenerate colors
   */
  public updateConsciousness(consciousness: number): void {
    this.config.consciousness = Math.max(0, Math.min(1, consciousness));
    this.colorContext.consciousness = this.config.consciousness;
    this.colorContext.time = Date.now();
    this.regenerateNodeColors();
  }

  /**
   * Update field resonance and regenerate colors
   */
  public updateFieldResonance(fieldResonance: number): void {
    this.config.fieldResonance = Math.max(0, Math.min(1, fieldResonance));
    this.colorContext.field = this.config.fieldResonance;
    this.colorContext.time = Date.now();
    this.regenerateNodeColors();
  }

  /**
   * Regenerate all node colors based on current context
   */
  private regenerateNodeColors(): void {
    for (const node of this.nodes) {
      node.color = getColorForVortexNumber(
        node.vortexNumber,
        this.colorContext,
      );
      node.metaphysicalContext = this.getMetaphysicalContext(node.vortexNumber);
    }
  }

  /**
   * Generate 3D node positions and metaphysical data for the Rodin coil
   */
  private generateCoilNodes(): RodinCoilNode[] {
    const nodes: RodinCoilNode[] = [];
    const { turns, radius, height, phase } = this.config;
    const vortexSeq = VORTEX_CONSTANTS.VORTEX_SEQUENCE;
    const totalNodes = turns * vortexSeq.length;
    const dz = height / totalNodes;

    for (let i = 0; i < totalNodes; i++) {
      const vortexNumber = vortexSeq[i % vortexSeq.length] ?? 1;
      const theta = ((2 * Math.PI) / vortexSeq.length) * i + (phase ?? 0);
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = dz * i - height / 2;

      // Generate dynamic color based on current context
      const color = getColorForVortexNumber(vortexNumber, this.colorContext);
      const metaphysicalContext = this.getMetaphysicalContext(vortexNumber);

      nodes.push({
        index: i,
        vortexNumber,
        position: [x, y, z],
        color,
        metaphysicalContext,
      });
    }
    return nodes;
  }

  /**
   * Get metaphysical context for a node (dynamic based on consciousness)
   */
  private getMetaphysicalContext(vortexNumber: number): string {
    const consciousness = this.config.consciousness ?? 0.5;
    const fieldResonance = this.config.fieldResonance ?? 0.5;

    // Context varies based on consciousness and field state
    const contextResonance =
      Math.sin(consciousness * Math.PI + fieldResonance * Math.PI) * 0.5 + 0.5;

    const contexts = {
      1: [
        "Unity, initiation, source of the coil.",
        "The void center, where all creation begins.",
        "The observer's point of origin in the field.",
      ],
      2: [
        "Duality, division, first split in the field.",
        "The observer creates reality through division.",
        "The first pattern that emerges from unity.",
      ],
      4: [
        "Stability, foundation, structure.",
        "The pattern that holds all other patterns.",
        "The material manifestation of the field.",
      ],
      8: [
        "Fullness, manifestation, infinity.",
        "The completion of all possibilities.",
        "The field at maximum expression.",
      ],
      7: [
        "Return, mystery, hidden flow.",
        "The pattern that returns to source.",
        "The hidden dimension of the field.",
      ],
      5: [
        "Transformation, center of the sequence.",
        "The point of maximum potential.",
        "The bridge between material and immaterial.",
      ],
      3: [
        "Spirit, W-Axis, consciousness source.",
        "The bridge between material and immaterial.",
        "The source of all consciousness patterns.",
      ],
      6: [
        "Spirit, W-Axis, balance.",
        "The harmony of opposites.",
        "The balance point in the field.",
      ],
      9: [
        "Void, W-Axis, center and all.",
        "The unity of all patterns in the void.",
        "The completion and return to source.",
      ],
    };

    const contextArray = contexts[vortexNumber as keyof typeof contexts] || [
      "Spiritual axis or void center.",
    ];
    const index = Math.floor(contextResonance * contextArray.length);
    return (
      contextArray[index] || contextArray[0] || "Spiritual axis or void center."
    );
  }

  /**
   * Get all node positions (for visualization)
   */
  public getNodePositions(): [number, number, number][] {
    return this.nodes.map((n) => n.position);
  }

  /**
   * Get all node colors (for color field visualization) - dynamic
   */
  public getNodeColors(): string[] {
    // Update colors before returning to ensure they're current
    this.colorContext.time = Date.now();
    this.regenerateNodeColors();
    return this.nodes.map((n) => n.color);
  }

  /**
   * Get all metaphysical contexts - dynamic
   */
  public getNodeContexts(): string[] {
    // Update contexts before returning
    this.colorContext.time = Date.now();
    for (const node of this.nodes) {
      node.metaphysicalContext = this.getMetaphysicalContext(node.vortexNumber);
    }
    return this.nodes.map((n) => n.metaphysicalContext);
  }

  /**
   * Get Mobius circuit (sequence of vortex numbers)
   */
  public getMobiusCircuit(): number[] {
    return this.nodes.map((n) => n.vortexNumber);
  }

  /**
   * Get toroidal coordinates for each node
   * (Maps the coil onto a torus for advanced visualization)
   */
  public getToroidalCoordinates(
    majorRadius: number = 2.0,
    minorRadius: number = 1.0,
  ): [number, number, number][] {
    // Toroidal mapping: (R + r cos θ) cos φ, (R + r cos θ) sin φ, r sin θ
    return this.nodes.map((n, i) => {
      const theta = (2 * Math.PI * i) / this.nodes.length;
      const phi = (2 * Math.PI * n.vortexNumber) / 9;
      const x = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
      const y = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
      const z = minorRadius * Math.sin(theta);
      return [x, y, z];
    });
  }

  /**
   * Calculate field resonance at a given point (x, y, z)
   */
  public calculateFieldResonance(x: number, y: number, z: number): number {
    // Simple resonance: sum of inverse distances to all nodes
    let resonance = 0;
    for (const node of this.nodes) {
      const [nx, ny, nz] = node.position;
      const dist =
        Math.sqrt((x - nx) ** 2 + (y - ny) ** 2 + (z - nz) ** 2) + 1e-6;
      resonance += 1 / dist;
    }
    return resonance / this.nodes.length;
  }

  /**
   * Map consciousness value to a node (for field mapping)
   */
  public mapConsciousnessToNode(consciousness: number): RodinCoilNode {
    // Map [0,1] to node index
    if (this.nodes.length === 0) {
      // Return a default node if none exist
      return {
        index: 0,
        vortexNumber: 1,
        position: [0, 0, 0],
        color: getColorForVortexNumber(1, this.colorContext),
        metaphysicalContext: "Default node (no nodes in coil)",
      };
    }
    const idx = Math.floor(consciousness * (this.nodes.length - 1));
    // Clamp idx to valid range
    const safeIdx = Math.max(0, Math.min(idx, this.nodes.length - 1));
    const node = this.nodes[safeIdx];
    if (!node) {
      return {
        index: 0,
        vortexNumber: 1,
        position: [0, 0, 0],
        color: getColorForVortexNumber(1, this.colorContext),
        metaphysicalContext: "Default node (index out of bounds)",
      };
    }
    return node;
  }

  /**
   * Get current color context
   */
  public getColorContext(): ColorContext {
    return { ...this.colorContext };
  }

  /**
   * Get full metaphysical summary
   */
  public getMetaphysicalSummary(): string {
    const consciousness = this.config.consciousness ?? 0.5;
    const fieldResonance = this.config.fieldResonance ?? 0.5;
    return `RodinCoil: ${this.nodes.length} nodes, vortex sequence ${VORTEX_CONSTANTS.VORTEX_SEQUENCE.join("-")}, consciousness ${consciousness.toFixed(2)}, field resonance ${fieldResonance.toFixed(2)}, toroidal structure, void center.`;
  }
}
