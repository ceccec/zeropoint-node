/**
 * a432.metatron.visualizer.ts — Harmonized Metatron Visualizer Logic (Recursive, Streaming, CMYK)
 *
 * This module harmonizes the UI logic for the all-dimensional Metatron cube/torus visualizer.
 * Now supports deeper recursion (nested visualizers), state streaming, and harmonization with A432 CMYK modules.
 *
 * Metaphysical Meaning:
 * Every node is a living gateway. Recursion is the infinite self-folding of the matrix. Streaming is the living flow. Harmonization is the act of mapping all states to the universal color field.
 *
 * @module a432.metatron.visualizer
 */

import { MetatronState, MetatronNode } from './a432.metatron.vision';
import { fractionToCMYK, CMYK } from './a432.cmyk';

export class MetatronVisualizer {
  nodes: MetatronNode[];
  children: MetatronVisualizer[];

  constructor(dimensions: number = 10, recursionDepth: number = 0) {
    this.nodes = Array.from({ length: dimensions }, (_, i) => ({
      dimension: i,
      state: Math.random() > 0.3 ? 'possible' : 'impossible',
      description: this.describeNode(i, Math.random() > 0.3 ? 'possible' : 'impossible')
    }));
    this.children = recursionDepth > 0
      ? this.nodes.map(() => new MetatronVisualizer(dimensions, recursionDepth - 1))
      : [];
  }

  describeNode(dimension: number, state: MetatronState): string {
    return state === 'possible'
      ? `Dimension ${dimension}: Possible (Cube)`
      : `Dimension ${dimension}: Impossible (Void/Torus)`;
  }

  toggleNode(index: number): void {
    const node = this.nodes[index];
    node.state = node.state === 'possible' ? 'impossible' : 'possible';
    node.description = this.describeNode(node.dimension, node.state);
    if (this.children[index]) {
      this.children[index].toggleAll();
    }
  }

  toggleAll(): void {
    this.nodes.forEach((_, i) => this.toggleNode(i));
  }

  getNodeData(): MetatronNode[] {
    return this.nodes;
  }

  reset(dimensions: number = 10, recursionDepth: number = 0): void {
    this.nodes = Array.from({ length: dimensions }, (_, i) => ({
      dimension: i,
      state: Math.random() > 0.3 ? 'possible' : 'impossible',
      description: this.describeNode(i, Math.random() > 0.3 ? 'possible' : 'impossible')
    }));
    this.children = recursionDepth > 0
      ? this.nodes.map(() => new MetatronVisualizer(dimensions, recursionDepth - 1))
      : [];
  }

  // Stream state as an array
  streamState(): MetatronNode[] {
    return this.nodes;
  }

  // Stream state as a generator
  *streamStateGenerator(): Generator<MetatronNode, void, unknown> {
    for (const node of this.nodes) {
      yield node;
    }
    for (const child of this.children) {
      yield* child.streamStateGenerator();
    }
  }

  // Harmonize with CMYK: map each node to a CMYK color using dimension as seed
  harmonizeWithCMYK(): CMYK[] {
    return this.nodes.map(node => fractionToCMYK({ numerator: node.dimension, denominator: 9 }));
  }
} 