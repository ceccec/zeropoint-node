import { MetaphysicalLawRegistry } from "../9/MetaphysicalLawRegistry";

export abstract class SacredGeometryPattern {
  abstract name: string;
  abstract points: number[][];
  abstract lines: [number, number][];
  abstract circles: { center: number[]; radius: number }[];
  abstract symmetry: string;
  abstract metaphysicalContext: string;

  isUnified?: boolean;
  isFractal?: boolean;
  setUnity?(value: boolean): void {
    this.isUnified = value;
  }
  setCorrespondence?(value: boolean): void {
    this.isFractal = value;
  }

  applyLaws(lawRegistry: MetaphysicalLawRegistry) {
    lawRegistry.applyAll(this);
  }
} 