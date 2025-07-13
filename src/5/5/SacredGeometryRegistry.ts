import { SacredGeometryPattern } from "./SacredGeometryPattern";
import { MetaphysicalLawRegistry } from "../../9/9/MetaphysicalLawRegistry";

export class SacredGeometryRegistry {
  private patterns: SacredGeometryPattern[] = [];
  constructor(private lawRegistry: MetaphysicalLawRegistry) {}
  register(pattern: SacredGeometryPattern) {
    pattern.applyLaws(this.lawRegistry);
    this.patterns.push(pattern);
  }
  getAll() { return this.patterns; }
} 