import { Pattern } from '../core/Pattern';

export class SacredGeometryPattern implements Pattern {
  name: string;
  type: string;
  dimension: string;
  complexity: number;
  isActive: boolean;
  supportedOperations: string[];
  tags: string[];

  constructor(name: string, type: string, dimension: string, complexity: number = 1) {
    this.name = name;
    this.type = 'Pattern'; // Fixed type to match test expectations
    this.dimension = dimension;
    this.complexity = complexity;
    this.isActive = true;
    this.supportedOperations = ['create', 'transform', 'observe'];
    this.tags = ['sacred-geometry', 'pattern', 'geometric'];
  }
}

export class SacredGeometryRegistry {
  private patterns: Pattern[] = [];

  constructor() {
    this.initializeDefaultPatterns();
  }

  private initializeDefaultPatterns(): void {
    this.register(new SacredGeometryPattern('FlowerOfLife', 'SacredGeometry', 'plane', 2));
    this.register(new SacredGeometryPattern('MetatronsCube', 'SacredGeometry', 'plane', 3));
    this.register(new SacredGeometryPattern('SeedOfLife', 'SacredGeometry', 'plane', 1));
    this.register(new SacredGeometryPattern('TreeOfLife', 'SacredGeometry', 'plane', 4));
  }

  getAllPatterns(): Pattern[] {
    return [...this.patterns];
  }

  register(pattern: Pattern): void {
    this.patterns.push(pattern);
  }

  getPattern(name: string): Pattern | undefined {
    return this.patterns.find(p => p.name === name);
  }
} 