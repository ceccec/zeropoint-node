import { Dimension } from './Dimension';
import { Field } from './Field';
import { Pattern } from './Pattern';
import { MetaphysicalLaw } from '../laws/MetaphysicalLaw';

/**
 * Knowledge unit types that can be registered
 */
export type KnowledgeUnit = Field | Pattern | MetaphysicalLaw;

/**
 * Registry for all knowledge units across dimensions
 * Provides DRY access to patterns, fields, and laws by dimension
 */
export class KnowledgeRegistry {
  private knowledgeUnits: Map<string, KnowledgeUnit> = new Map();
  private dimensionIndex: Map<string, string[]> = new Map(); // dimension -> knowledge unit names
  private typeIndex: Map<string, string[]> = new Map(); // type -> knowledge unit names
  private tagIndex: Map<string, string[]> = new Map(); // tag -> knowledge unit names

  /**
   * Register a knowledge unit with the system
   */
  register(unit: KnowledgeUnit, dimension: string): void {
    const unitName = this.getUnitName(unit);
    this.knowledgeUnits.set(unitName, unit);
    
    // Index by dimension
    if (!this.dimensionIndex.has(dimension)) {
      this.dimensionIndex.set(dimension, []);
    }
    this.dimensionIndex.get(dimension)!.push(unitName);
    
    // Index by type
    const type = this.getUnitType(unit);
    if (!this.typeIndex.has(type)) {
      this.typeIndex.set(type, []);
    }
    this.typeIndex.get(type)!.push(unitName);
    
    // Index by tags
    const tags = this.getUnitTags(unit);
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, []);
      }
      this.tagIndex.get(tag)!.push(unitName);
    }
  }

  /**
   * Get a knowledge unit by name
   */
  get(name: string): KnowledgeUnit | undefined {
    return this.knowledgeUnits.get(name);
  }

  /**
   * Get all knowledge units
   */
  getAll(): KnowledgeUnit[] {
    return Array.from(this.knowledgeUnits.values());
  }

  /**
   * Get knowledge units by dimension
   */
  getByDimension(dimension: string): KnowledgeUnit[] {
    const unitNames = this.dimensionIndex.get(dimension) || [];
    return unitNames.map(name => this.knowledgeUnits.get(name)!).filter(Boolean);
  }

  /**
   * Get knowledge units by type
   */
  getByType(type: string): KnowledgeUnit[] {
    const unitNames = this.typeIndex.get(type) || [];
    return unitNames.map(name => this.knowledgeUnits.get(name)!).filter(Boolean);
  }

  /**
   * Get knowledge units by tag
   */
  getByTag(tag: string): KnowledgeUnit[] {
    const unitNames = this.tagIndex.get(tag) || [];
    return unitNames.map(name => this.knowledgeUnits.get(name)!).filter(Boolean);
  }

  /**
   * Get knowledge units that match multiple criteria
   */
  getByCriteria(criteria: {
    dimension?: string;
    type?: string;
    tags?: string[];
    complexity?: number;
    isActive?: boolean;
  }): KnowledgeUnit[] {
    let units = this.getAll();
    
    if (criteria.dimension) {
      units = units.filter(u => this.getUnitDimension(u) === criteria.dimension);
    }
    
    if (criteria.type) {
      units = units.filter(u => this.getUnitType(u) === criteria.type);
    }
    
    if (criteria.tags && criteria.tags.length > 0) {
      units = units.filter(u => {
        const unitTags = this.getUnitTags(u);
        return criteria.tags!.some(tag => unitTags.includes(tag));
      });
    }
    
    if (criteria.complexity !== undefined) {
      units = units.filter(u => this.getUnitComplexity(u) === criteria.complexity);
    }
    
    if (criteria.isActive !== undefined) {
      units = units.filter(u => this.getUnitActive(u) === criteria.isActive);
    }
    
    return units;
  }

  /**
   * Get knowledge units that are compatible with a given unit
   */
  getCompatibleUnits(unitName: string): KnowledgeUnit[] {
    const unit = this.get(unitName);
    if (!unit) return [];
    
    const unitTags = this.getUnitTags(unit);
    const unitType = this.getUnitType(unit);
    
    return this.getAll().filter(u => {
      if (u === unit) return false;
      
      const otherTags = this.getUnitTags(u);
      const otherType = this.getUnitType(u);
      
      // Check if they share tags or are of compatible types
      return unitTags.some(tag => otherTags.includes(tag)) ||
             this.areTypesCompatible(unitType, otherType);
    });
  }

  /**
   * Get knowledge units ordered by complexity
   */
  getOrderedByComplexity(): KnowledgeUnit[] {
    return this.getAll().sort((a, b) => 
      this.getUnitComplexity(a) - this.getUnitComplexity(b)
    );
  }

  /**
   * Get knowledge units that support a specific operation
   */
  getBySupportedOperation(operation: string): KnowledgeUnit[] {
    return this.getAll().filter(u => {
      const operations = this.getUnitOperations(u);
      return operations.includes(operation);
    });
  }

  /**
   * Get knowledge units that are currently active
   */
  getActiveUnits(): KnowledgeUnit[] {
    return this.getAll().filter(u => this.getUnitActive(u));
  }

  /**
   * Activate a knowledge unit and its dependencies
   */
  activateUnit(name: string): void {
    const unit = this.get(name);
    if (!unit) return;
    
    this.setUnitActive(unit, true);
    
    // Activate dependencies
    const dependencies = this.getUnitDependencies(unit);
    for (const dep of dependencies) {
      this.activateUnit(dep);
    }
  }

  /**
   * Deactivate a knowledge unit and its dependents
   */
  deactivateUnit(name: string): void {
    const unit = this.get(name);
    if (!unit) return;
    
    this.setUnitActive(unit, false);
    
    // Deactivate dependents
    const dependents = this.getAll().filter(u => {
      const deps = this.getUnitDependencies(u);
      return deps.includes(name);
    });
    
    for (const dependent of dependents) {
      this.deactivateUnit(this.getUnitName(dependent));
    }
  }

  /**
   * Get a summary of all knowledge units
   */
  getSummary(): {
    total: number;
    active: number;
    byDimension: Record<string, number>;
    byType: Record<string, number>;
    byTag: Record<string, number>;
  } {
    const all = this.getAll();
    const active = this.getActiveUnits();
    const byDimension: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byTag: Record<string, number> = {};
    
    for (const unit of all) {
      const dimension = this.getUnitDimension(unit);
      const type = this.getUnitType(unit);
      const tags = this.getUnitTags(unit);
      
      byDimension[dimension] = (byDimension[dimension] || 0) + 1;
      byType[type] = (byType[type] || 0) + 1;
      
      for (const tag of tags) {
        byTag[tag] = (byTag[tag] || 0) + 1;
      }
    }
    
    return {
      total: all.length,
      active: active.length,
      byDimension,
      byType,
      byTag
    };
  }

  // Helper methods to extract properties from knowledge units
  private getUnitName(unit: KnowledgeUnit): string {
    if ('name' in unit) return unit.name || 'unknown';
    if ('id' in unit) return unit.id || 'unknown';
    return 'unknown';
  }

  private getUnitType(unit: KnowledgeUnit): string {
    if ('type' in unit) return unit.type || unit.constructor.name;
    return unit.constructor.name;
  }

  private getUnitDimension(unit: KnowledgeUnit): string {
    if ('dimension' in unit) return unit.dimension || 'unknown';
    if ('dimensions' in unit && Array.isArray(unit.dimensions)) return unit.dimensions[0] || 'unknown';
    return 'unknown';
  }

  private getUnitTags(unit: KnowledgeUnit): string[] {
    if ('tags' in unit) return unit.tags || [];
    if ('categories' in unit) return unit.categories || [];
    return [];
  }

  private getUnitComplexity(unit: KnowledgeUnit): number {
    if ('complexity' in unit) return unit.complexity ?? 1;
    if ('level' in unit) return unit.level ?? 1;
    return 1;
  }

  private getUnitActive(unit: KnowledgeUnit): boolean {
    if ('isActive' in unit) return unit.isActive ?? true;
    if ('active' in unit) return unit.active ?? true;
    return true;
  }

  private setUnitActive(unit: KnowledgeUnit, active: boolean): void {
    if ('isActive' in unit) unit.isActive = active;
    if ('active' in unit) unit.active = active;
  }

  private getUnitOperations(unit: KnowledgeUnit): string[] {
    if ('supportedOperations' in unit) return unit.supportedOperations || [];
    if ('operations' in unit) return unit.operations || [];
    return [];
  }

  private getUnitDependencies(unit: KnowledgeUnit): string[] {
    if ('dependencies' in unit) return unit.dependencies || [];
    if ('requires' in unit) return unit.requires || [];
    return [];
  }

  private areTypesCompatible(type1: string, type2: string): boolean {
    // Define type compatibility rules
    const compatibilityMap: Record<string, string[]> = {
      'Field': ['Pattern', 'Law'],
      'Pattern': ['Field', 'Law'],
      'Law': ['Field', 'Pattern'],
      'MetaphysicalLaw': ['Field', 'Pattern'],
      'SacredGeometryPattern': ['Field', 'MetaphysicalLaw'],
      'ConsciousnessField': ['Pattern', 'MetaphysicalLaw']
    };
    
    return compatibilityMap[type1]?.includes(type2) || 
           compatibilityMap[type2]?.includes(type1) ||
           type1 === type2;
  }
} 