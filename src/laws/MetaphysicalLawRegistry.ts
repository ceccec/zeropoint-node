import { MetaphysicalLaw } from "./MetaphysicalLaw";
import { allHermeticLaws } from "./hermeticLaws";

export class MetaphysicalLawRegistry {
  private static instance: MetaphysicalLawRegistry;
  private laws: MetaphysicalLaw[] = [];

  private constructor() {
    // Register all hermetic laws
    allHermeticLaws.forEach(law => this.register(law));
  }

  public static getInstance(): MetaphysicalLawRegistry {
    if (!MetaphysicalLawRegistry.instance) {
      MetaphysicalLawRegistry.instance = new MetaphysicalLawRegistry();
    }
    return MetaphysicalLawRegistry.instance;
  }

  register(law: MetaphysicalLaw) {
    this.laws.push(law);
  }

  getAllLaws(): MetaphysicalLaw[] {
    return this.laws;
  }

  getLawByName(name: string): MetaphysicalLaw | undefined {
    return this.laws.find(law => law.name === name);
  }

  applyAllLaws(target: any): void {
    this.laws.forEach(law => law.apply(target));
  }

  applyLaws(target: any, lawNames: string[]): void {
    lawNames.forEach(name => {
      const law = this.getLawByName(name);
      if (law) {
        law.apply(target);
      }
    });
  }

  checkCompliance(target: any): { compliant: boolean; appliedLaws: string[]; missingLaws: string[] } {
    const appliedLaws: string[] = [];
    const missingLaws: string[] = [];

    this.laws.forEach(law => {
      const hasLaw = this.hasLawApplied(target, law.name);
      if (hasLaw) {
        appliedLaws.push(law.name);
      } else {
        missingLaws.push(law.name);
      }
    });

    return {
      compliant: missingLaws.length === 0,
      appliedLaws,
      missingLaws
    };
  }

  private hasLawApplied(target: any, lawName: string): boolean {
    switch (lawName) {
      case 'Unity':
        return (target as any).isUnified === true;
      case 'Correspondence':
        return (target as any).isFractal === true;
      case 'Vibration':
        return (target as any).vibrationalFrequency !== undefined;
      case 'Polarity':
        return (target as any).polarity !== undefined;
      case 'Rhythm':
        return (target as any).rhythm !== undefined;
      case 'Cause and Effect':
        return (target as any).causes !== undefined;
      case 'Gender':
        return (target as any).masculinePrinciple !== undefined;
      case 'Mentalism':
        return (target as any).consciousnessLevel !== undefined;
      default:
        return false;
    }
  }

  analyzeLawInteractions(): any {
    return {
      totalLaws: this.laws.length,
      interactions: this.laws.map(law => ({
        name: law.name,
        description: law.description
      })),
      harmonicRelationships: this.calculateHarmonicRelationships()
    };
  }

  private calculateHarmonicRelationships(): any[] {
    const relationships = [];
    for (let i = 0; i < this.laws.length; i++) {
      for (let j = i + 1; j < this.laws.length; j++) {
        relationships.push({
          law1: this.laws[i].name,
          law2: this.laws[j].name,
          harmony: Math.random() * 0.5 + 0.5 // Simulated harmony
        });
      }
    }
    return relationships;
  }

  getLawStatistics(): any {
    return {
      totalLaws: this.laws.length,
      categories: this.categorizeLaws(),
      complexity: this.calculateComplexity()
    };
  }

  private categorizeLaws(): any {
    const categories = {
      unity: this.laws.filter(law => law.name === 'Unity').length,
      correspondence: this.laws.filter(law => law.name === 'Correspondence').length,
      vibration: this.laws.filter(law => law.name === 'Vibration').length,
      polarity: this.laws.filter(law => law.name === 'Polarity').length,
      rhythm: this.laws.filter(law => law.name === 'Rhythm').length,
      causality: this.laws.filter(law => law.name === 'Cause and Effect').length,
      gender: this.laws.filter(law => law.name === 'Gender').length,
      mentalism: this.laws.filter(law => law.name === 'Mentalism').length
    };
    return categories;
  }

  private calculateComplexity(): number {
    return this.laws.length * 0.1; // Simple complexity calculation
  }
} 