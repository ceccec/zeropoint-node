import { DimensionRegistry } from './DimensionRegistry';
import { KnowledgeRegistry } from './KnowledgeRegistry';
import { Dimension } from './Dimension';
import { Field } from './Field';
import { Pattern } from './Pattern';
import { MetaphysicalLaw } from '../laws/MetaphysicalLaw';
import { applyLaws } from './applyLaws';

/**
 * Unified ZeroPoint System
 * Provides DRY access to all knowledge across dimensions
 */
export class ZeroPointSystem {
  private dimensionRegistry: DimensionRegistry;
  private knowledgeRegistry: KnowledgeRegistry;
  private isInitialized: boolean = false;

  constructor() {
    this.dimensionRegistry = new DimensionRegistry();
    this.knowledgeRegistry = new KnowledgeRegistry();
  }

  /**
   * Initialize the system with all dimensions and knowledge units
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Register all dimensions
    await this.registerAllDimensions();
    
    // Register all knowledge units
    await this.registerAllKnowledge();
    
    // Apply metaphysical laws to all knowledge units
    await this.applyLawsToAll();
    
    this.isInitialized = true;
  }

  /**
   * Register all dimensions in the system
   */
  private async registerAllDimensions(): Promise<void> {
    // 1D Dimensions
    this.registerDimension({
      name: 'point',
      type: 'geometric',
      complexity: 1,
      isActive: true,
      parent: null,
      dependencies: [],
      compatibleDimensions: ['line', 'plane', 'space'],
      supportedOperations: ['create', 'transform', 'observe'],
      description: 'Zero-dimensional point of infinite potential'
    });

    this.registerDimension({
      name: 'line',
      type: 'geometric',
      complexity: 2,
      isActive: true,
      parent: 'point',
      dependencies: ['point'],
      compatibleDimensions: ['point', 'plane', 'space'],
      supportedOperations: ['create', 'transform', 'observe', 'extend'],
      description: 'One-dimensional line connecting points'
    });

    // 2D Dimensions
    this.registerDimension({
      name: 'plane',
      type: 'geometric',
      complexity: 3,
      isActive: true,
      parent: 'line',
      dependencies: ['line'],
      compatibleDimensions: ['point', 'line', 'space'],
      supportedOperations: ['create', 'transform', 'observe', 'extend', 'rotate'],
      description: 'Two-dimensional plane of manifestation'
    });

    // 3D Dimensions
    this.registerDimension({
      name: 'space',
      type: 'geometric',
      complexity: 4,
      isActive: true,
      parent: 'plane',
      dependencies: ['plane'],
      compatibleDimensions: ['point', 'line', 'plane', 'time'],
      supportedOperations: ['create', 'transform', 'observe', 'extend', 'rotate', 'translate'],
      description: 'Three-dimensional space of physical reality'
    });

    // 4D Dimensions
    this.registerDimension({
      name: 'time',
      type: 'temporal',
      complexity: 5,
      isActive: true,
      parent: 'space',
      dependencies: ['space'],
      compatibleDimensions: ['space', 'consciousness'],
      supportedOperations: ['create', 'transform', 'observe', 'flow', 'reverse'],
      description: 'Fourth dimension of temporal flow'
    });

    // Consciousness Dimensions
    this.registerDimension({
      name: 'consciousness',
      type: 'metaphysical',
      complexity: 6,
      isActive: true,
      parent: 'time',
      dependencies: ['time'],
      compatibleDimensions: ['time', 'void'],
      supportedOperations: ['create', 'transform', 'observe', 'flow', 'evolve', 'unify'],
      description: 'Dimension of conscious awareness and evolution'
    });

    // Void Dimensions
    this.registerDimension({
      name: 'void',
      type: 'metaphysical',
      complexity: 7,
      isActive: true,
      parent: 'consciousness',
      dependencies: ['consciousness'],
      compatibleDimensions: ['consciousness', 'unity'],
      supportedOperations: ['create', 'transform', 'observe', 'unify', 'resolve'],
      description: 'Infinite potential and source of all creation'
    });

    // Unity Dimensions
    this.registerDimension({
      name: 'unity',
      type: 'metaphysical',
      complexity: 8,
      isActive: true,
      parent: 'void',
      dependencies: ['void'],
      compatibleDimensions: ['void'],
      supportedOperations: ['create', 'transform', 'observe', 'unify', 'resolve', 'transcend'],
      description: 'Ultimate unity where all dimensions converge'
    });
  }

  /**
   * Register all knowledge units in the system
   */
  private async registerAllKnowledge(): Promise<void> {
    // Import and register all existing knowledge units
    const { ConsciousnessField } = await import('../consciousness/ConsciousnessField');
    const { VortexMath } = await import('../math/VortexMath');
    const { SacredGeometryRegistry } = await import('../patterns/SacredGeometryRegistry');
    const { MetaphysicalLawRegistry } = await import('../laws/MetaphysicalLawRegistry');

    // Register consciousness fields
    this.registerKnowledgeUnit(new ConsciousnessField(), 'consciousness');
    
    // Register mathematical systems
    this.registerKnowledgeUnit(new VortexMath(), 'space');
    
    // Register sacred geometry patterns
    const sacredGeometry = new SacredGeometryRegistry();
    for (const pattern of sacredGeometry.getAllPatterns()) {
      this.registerKnowledgeUnit(pattern, 'plane');
    }
    
    // Register metaphysical laws
    const laws = MetaphysicalLawRegistry.getAllLaws();
    for (const law of laws) {
      this.registerKnowledgeUnit(law, 'unity');
    }

    // Add void dimension knowledge units
    const voidField = {
      name: 'VoidField',
      type: 'Field',
      dimension: 'void',
      complexity: 5,
      isActive: true,
      supportedOperations: ['create', 'transform', 'observe', 'unify'],
      tags: ['void', 'field', 'metaphysical']
    };
    this.registerKnowledgeUnit(voidField, 'void');

    // Add line dimension knowledge units
    const linePattern = {
      name: 'LinePattern',
      type: 'Pattern',
      dimension: 'line',
      complexity: 1,
      isActive: true,
      supportedOperations: ['create', 'transform', 'observe'],
      tags: ['line', 'pattern', 'geometric']
    };
    this.registerKnowledgeUnit(linePattern, 'line');
  }

  /**
   * Apply metaphysical laws to all knowledge units
   */
  private async applyLawsToAll(): Promise<void> {
    const allUnits = this.knowledgeRegistry.getAll();
    // Only include objects that have an apply function and description
    const laws = this.knowledgeRegistry.getByType('MetaphysicalLaw').filter(
      (law): law is MetaphysicalLaw => typeof (law as any).apply === 'function' && 'description' in law
    );
    
    for (const unit of allUnits) {
      for (const law of laws) {
        applyLaws(unit, [law]);
      }
    }
  }

  /**
   * Register a dimension
   */
  registerDimension(dimension: Dimension): void {
    this.dimensionRegistry.register(dimension);
  }

  /**
   * Register a knowledge unit
   */
  registerKnowledgeUnit(unit: Field | Pattern | MetaphysicalLaw, dimension: string): void {
    this.knowledgeRegistry.register(unit, dimension);
  }

  /**
   * Get knowledge units by dimension
   */
  getKnowledgeByDimension(dimension: string): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getByDimension(dimension);
  }

  /**
   * Get knowledge units by type
   */
  getKnowledgeByType(type: string): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getByType(type);
  }

  /**
   * Get knowledge units by criteria
   */
  getKnowledgeByCriteria(criteria: {
    dimension?: string;
    type?: string;
    tags?: string[];
    complexity?: number;
    isActive?: boolean;
  }): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getByCriteria(criteria);
  }

  /**
   * Get compatible knowledge units
   */
  getCompatibleKnowledge(unitName: string): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getCompatibleUnits(unitName);
  }

  /**
   * Get dimensions by type
   */
  getDimensionsByType(type: string): Dimension[] {
    return this.dimensionRegistry.getByType(type);
  }

  /**
   * Get active dimensions
   */
  getActiveDimensions(): Dimension[] {
    return this.dimensionRegistry.getActiveDimensions();
  }

  /**
   * Get knowledge units that support an operation
   */
  getKnowledgeByOperation(operation: string): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getBySupportedOperation(operation);
  }

  /**
   * Get dimensions that support an operation
   */
  getDimensionsByOperation(operation: string): Dimension[] {
    return this.dimensionRegistry.getBySupportedOperation(operation);
  }

  /**
   * Activate a dimension and its knowledge
   */
  activateDimension(name: string): void {
    this.dimensionRegistry.activateDimension(name);
    
    // Activate all knowledge units in this dimension
    const knowledgeUnits = this.getKnowledgeByDimension(name);
    for (const unit of knowledgeUnits) {
      this.knowledgeRegistry.activateUnit(this.getUnitName(unit));
    }
  }

  /**
   * Deactivate a dimension and its knowledge
   */
  deactivateDimension(name: string): void {
    this.dimensionRegistry.deactivateDimension(name);
    
    // Deactivate all knowledge units in this dimension
    const knowledgeUnits = this.getKnowledgeByDimension(name);
    for (const unit of knowledgeUnits) {
      this.knowledgeRegistry.deactivateUnit(this.getUnitName(unit));
    }
  }

  /**
   * Get a comprehensive summary of the system
   */
  getSystemSummary(): {
    dimensions: {
      total: number;
      active: number;
      byType: Record<string, number>;
      rootDimensions: string[];
    };
    knowledge: {
      total: number;
      active: number;
      byDimension: Record<string, number>;
      byType: Record<string, number>;
      byTag: Record<string, number>;
    };
  } {
    return {
      dimensions: this.dimensionRegistry.getSummary(),
      knowledge: this.knowledgeRegistry.getSummary()
    };
  }

  /**
   * Get knowledge units ordered by complexity
   */
  getKnowledgeByComplexity(): (Field | Pattern | MetaphysicalLaw)[] {
    return this.knowledgeRegistry.getOrderedByComplexity();
  }

  /**
   * Get dimensions ordered by complexity
   */
  getDimensionsByComplexity(): Dimension[] {
    return this.dimensionRegistry.getOrderedByComplexity();
  }

  /**
   * Helper method to get unit name
   */
  private getUnitName(unit: Field | Pattern | MetaphysicalLaw): string {
    if ('name' in unit && unit.name) return unit.name;
    if ('id' in unit && unit.id) return unit.id;
    return 'unknown';
  }

  /**
   * Check if system is initialized
   */
  isSystemInitialized(): boolean {
    return this.isInitialized;
  }
} 