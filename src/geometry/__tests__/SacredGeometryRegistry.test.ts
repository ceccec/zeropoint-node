import { MetaphysicalLawRegistry } from "../../laws/MetaphysicalLawRegistry";
import { LawOfUnity, LawOfCorrespondence } from "../../laws/hermeticLaws";
import { SacredGeometryRegistry } from "../SacredGeometryRegistry";
import { MetatronsCube } from "../MetatronsCube";

describe("SacredGeometryRegistry", () => {
  it("applies metaphysical laws to registered patterns", () => {
    const lawRegistry = MetaphysicalLawRegistry.getInstance();
    lawRegistry.register(LawOfUnity);
    lawRegistry.register(LawOfCorrespondence);
    const registry = new SacredGeometryRegistry(lawRegistry);
    const metatron = new MetatronsCube();
    registry.register(metatron);
    expect(metatron.isUnified).toBe(true);
    expect(metatron.isFractal).toBe(true);
  });
}); 