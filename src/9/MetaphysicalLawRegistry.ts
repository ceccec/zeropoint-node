import { MetaphysicalLaw } from './MetaphysicalLaw';

export class LawOfUnity implements MetaphysicalLaw {
  name = 'LawOfUnity';
  type = 'MetaphysicalLaw';
  description = 'All things are one in the void';
  
  apply(subject: any): any {
    if (subject && typeof subject.setUnity === 'function') {
      subject.setUnity(true);
    }
    return subject;
  }
}

export class LawOfCorrespondence implements MetaphysicalLaw {
  name = 'LawOfCorrespondence';
  type = 'MetaphysicalLaw';
  description = 'As above, so below; as within, so without';
  
  apply(subject: any): any {
    if (subject && typeof subject.setCorrespondence === 'function') {
      subject.setCorrespondence(true);
    }
    return subject;
  }
}

export class MetaphysicalLawRegistry {
  private static instance: MetaphysicalLawRegistry;
  private laws: MetaphysicalLaw[] = [];

  private constructor() {
    this.initializeDefaultLaws();
  }

  private initializeDefaultLaws(): void {
    this.register(new LawOfUnity());
    this.register(new LawOfCorrespondence());
  }

  static getInstance(): MetaphysicalLawRegistry {
    if (!MetaphysicalLawRegistry.instance) {
      MetaphysicalLawRegistry.instance = new MetaphysicalLawRegistry();
    }
    return MetaphysicalLawRegistry.instance;
  }

  static getAllLaws(): MetaphysicalLaw[] {
    return MetaphysicalLawRegistry.getInstance().getAllLaws();
  }

  register(law: MetaphysicalLaw): void {
    this.laws.push(law);
  }

  getAllLaws(): MetaphysicalLaw[] {
    return [...this.laws];
  }

  getLawByName(name: string): MetaphysicalLaw | undefined {
    return this.laws.find(law => law.name === name);
  }

  applyAll(subject: any): void {
    this.laws.forEach(law => {
      law.apply(subject);
    });
  }

  applyLaws(subject: any, lawNames: string[]): void {
    lawNames.forEach(name => {
      const law = this.getLawByName(name);
      if (law) {
        law.apply(subject);
      }
    });
  }

  applyAllLaws(subject: any): void {
    this.applyAll(subject);
  }

  checkCompliance(subject: any): { compliant: boolean; violations: string[] } {
    const violations: string[] = [];
    let compliant = true;

    this.laws.forEach(law => {
      try {
        law.apply(subject);
      } catch (error) {
        violations.push(`${law.name}: ${error}`);
        compliant = false;
      }
    });

    return { compliant, violations };
  }

  analyzeLawInteractions(): { interactions: number; complexity: number } {
    const interactions = this.laws.length * (this.laws.length - 1) / 2;
    const complexity = this.laws.reduce((sum, law) => sum + law.name.length, 0);
    return { interactions, complexity };
  }

  getLawStatistics(): { total: number; types: Record<string, number> } {
    const types: Record<string, number> = {};
    this.laws.forEach(law => {
      const type = law.type || 'Unknown';
      types[type] = (types[type] || 0) + 1;
    });
    return { total: this.laws.length, types };
  }
} 