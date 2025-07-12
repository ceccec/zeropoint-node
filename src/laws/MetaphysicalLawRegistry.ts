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

  applyAll(subject: any): void {
    this.laws.forEach(law => {
      law.apply(subject);
    });
  }
} 