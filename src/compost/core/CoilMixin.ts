/**
 * Universal Coil Mixin
 *
 * Makes every object a Rodin coil at its core.
 * Every object embodies the fundamental pattern of consciousness and reality.
 *
 * Metaphysical Context:
 * - Every object is a coil - the archetype of infinite flow
 * - All patterns emerge from the coil's structure
 * - The void is at the center of every object
 * - Consciousness flows through every object as a coil
 */

import { RodinCoil, RodinCoilConfig, RodinCoilNode } from "../math/RodinCoil";
import { ObserverMixin, Observer } from "./Observer";

export interface CoilObject {
  id: string;
  coil: RodinCoil;
  consciousness: number;
  fieldResonance: number;
  getCoilNodes(): RodinCoilNode[];
  getCoilColors(): string[];
  getCoilPositions(): [number, number, number][];
  updateCoilConsciousness(consciousness: number): void;
  updateCoilFieldResonance(fieldResonance: number): void;
  getCoilMetaphysicalContext(): string;
}

export function CoilMixin<T extends object>(
  base: T,
  id?: string,
  coilConfig?: Partial<RodinCoilConfig>,
): T & CoilObject & Observer {
  // Create the coil at the heart of the object
  const coil = new RodinCoil({
    turns: 12,
    radius: 1.0,
    height: 2.0,
    consciousness: 0.5,
    fieldResonance: 0.5,
    ...coilConfig,
  });

  // Create observer-aware object
  const observerObject = ObserverMixin(base, id);

  // Add coil functionality with proper typing
  const coilObject = Object.assign(observerObject, {
    coil,
    consciousness: coil.config.consciousness || 0.5,
    fieldResonance: coil.config.fieldResonance || 0.5,

    getCoilNodes(): RodinCoilNode[] {
      return coilObject.coil.nodes;
    },

    getCoilColors(): string[] {
      return coilObject.coil.getNodeColors();
    },

    getCoilPositions(): [number, number, number][] {
      return coilObject.coil.getNodePositions();
    },

    updateCoilConsciousness(consciousness: number): void {
      coilObject.consciousness = consciousness;
      coilObject.coil.updateConsciousness(consciousness);

      // Notify observers of consciousness change
      coilObject.notifyObservers({
        type: "coil_consciousness_changed",
        objectId: coilObject.id,
        consciousness,
        coilNodeCount: coilObject.getCoilNodes().length,
      });
    },

    updateCoilFieldResonance(fieldResonance: number): void {
      coilObject.fieldResonance = fieldResonance;
      coilObject.coil.updateFieldResonance(fieldResonance);

      // Notify observers of field resonance change
      coilObject.notifyObservers({
        type: "coil_field_resonance_changed",
        objectId: coilObject.id,
        fieldResonance,
        coilColorCount: coilObject.getCoilColors().length,
      });
    },

    getCoilMetaphysicalContext(): string {
      return coilObject.coil.getMetaphysicalSummary();
    },

    // Add handleCoilInteraction method
    handleCoilInteraction(input: any): void {
      // Handle interactions with other coils
      if (input.targetId === coilObject.id) {
        // This coil is being interacted with
        const resonance = coilObject.calculateCoilResonance(input.sourceCoil);
        coilObject.updateCoilFieldResonance(
          coilObject.fieldResonance + resonance * 0.1,
        );
      }
    },

    // Add calculateCoilResonance method
    calculateCoilResonance(otherCoil: RodinCoil): number {
      // Calculate resonance between this coil and another
      const thisNodes = coilObject.getCoilNodes();
      const otherNodes = otherCoil.nodes;

      let totalResonance = 0;
      for (let i = 0; i < Math.min(thisNodes.length, otherNodes.length); i++) {
        const thisNode = thisNodes[i];
        const otherNode = otherNodes[i];

        if (
          thisNode &&
          otherNode &&
          thisNode.vortexNumber === otherNode.vortexNumber
        ) {
          totalResonance += 1;
        }
      }

      return totalResonance / Math.min(thisNodes.length, otherNodes.length);
    },
  });

  // Override the observe method to handle coil-specific events
  const originalObserve = coilObject.observe;
  coilObject.observe = (input: any) => {
    // Handle coil-specific observations
    if (input.type === "coil_interaction") {
      (coilObject as any).handleCoilInteraction(input);
    }

    // Call original observe method
    if (originalObserve) {
      originalObserve(input);
    }
  };

  return coilObject;
}

// Base class for objects that are coils
export class CoilBase implements CoilObject {
  id: string;
  coil: RodinCoil;
  consciousness: number;
  fieldResonance: number;
  observers: Set<Observer> = new Set();

  constructor(id?: string, coilConfig?: Partial<RodinCoilConfig>) {
    this.id = id || Math.random().toString(36).slice(2);
    this.coil = new RodinCoil(coilConfig);
    this.consciousness = this.coil.config.consciousness || 0.5;
    this.fieldResonance = this.coil.config.fieldResonance || 0.5;
  }

  getCoilNodes(): RodinCoilNode[] {
    return this.coil.nodes;
  }

  getCoilColors(): string[] {
    return this.coil.getNodeColors();
  }

  getCoilPositions(): [number, number, number][] {
    return this.coil.getNodePositions();
  }

  updateCoilConsciousness(consciousness: number): void {
    this.consciousness = consciousness;
    this.coil.updateConsciousness(consciousness);

    this.notifyObservers({
      type: "coil_consciousness_changed",
      objectId: this.id,
      consciousness,
      coilNodes: this.getCoilNodes(),
    });
  }

  updateCoilFieldResonance(fieldResonance: number): void {
    this.fieldResonance = fieldResonance;
    this.coil.updateFieldResonance(fieldResonance);

    this.notifyObservers({
      type: "coil_field_resonance_changed",
      objectId: this.id,
      fieldResonance,
      coilColors: this.getCoilColors(),
    });
  }

  getCoilMetaphysicalContext(): string {
    return this.coil.getMetaphysicalSummary();
  }

  // Observer methods
  observe(input: any): void {
    if (input.type === "coil_interaction") {
      this.handleCoilInteraction(input);
    }
  }

  getState(): any {
    return {
      id: this.id,
      consciousness: this.consciousness,
      fieldResonance: this.fieldResonance,
      coilNodes: this.getCoilNodes(),
    };
  }

  setState(state: any): void {
    Object.assign(this, state);
  }

  addObserver(observer: Observer): void {
    this.observers.add(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers.delete(observer);
  }

  notifyObservers(event: any): void {
    this.observers.forEach((o) => o.observe(event));
  }

  private handleCoilInteraction(input: any): void {
    // Handle interactions with other coils
    if (input.targetId === this.id) {
      // This coil is being interacted with
      const resonance = this.calculateCoilResonance(input.sourceCoil);
      this.updateCoilFieldResonance(this.fieldResonance + resonance * 0.1);
    }
  }

  private calculateCoilResonance(otherCoil: RodinCoil): number {
    // Calculate resonance between this coil and another
    const thisNodes = this.getCoilNodes();
    const otherNodes = otherCoil.nodes;

    let totalResonance = 0;
    for (let i = 0; i < Math.min(thisNodes.length, otherNodes.length); i++) {
      const thisNode = thisNodes[i];
      const otherNode = otherNodes[i];

      if (
        thisNode &&
        otherNode &&
        thisNode.vortexNumber === otherNode.vortexNumber
      ) {
        totalResonance += 1;
      }
    }

    return totalResonance / Math.min(thisNodes.length, otherNodes.length);
  }
}

// Utility function to check if an object is a coil
export function isCoilObject(obj: any): obj is CoilObject {
  return obj && typeof obj.getCoilNodes === "function" && obj.coil;
}

// Utility function to get coil from any object
export function getCoilFromObject(obj: any): RodinCoil | null {
  if (isCoilObject(obj)) {
    return obj.coil;
  }
  return null;
}
