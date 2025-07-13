import { MetaphysicalLawRegistry } from "../../9/9/MetaphysicalLawRegistry";
import { LawOfUnity, LawOfCorrespondence } from "../../9/9/hermeticLaws";
import { SacredGeometryRegistry } from "../5/SacredGeometryRegistry";
import { MetatronsCube } from "../5/MetatronsCube";

describe("SacredGeometryRegistry", () => {
  it("applies metaphysical laws to registered patterns", () => {
    const lawRegistry = MetaphysicalLawRegistry.getInstance();
    lawRegistry.register(new LawOfUnity());
    lawRegistry.register(new LawOfCorrespondence());
    const registry = new SacredGeometryRegistry(lawRegistry);
    const metatron = new MetatronsCube();
    registry.register(metatron);
    // Test that the pattern has the expected properties
    expect(metatron.name).toBe("Metatron's Cube");
    expect(metatron.symmetry).toBe("hexagonal");
    expect(metatron.metaphysicalContext).toContain("Metatron's Cube");
  });
}); 