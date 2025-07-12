import { Dimension } from './Dimension';

/**
 * Registry for all dimensions in the ZeroPoint system
 * Provides DRY access to dimensional knowledge and operations
 */
export class DimensionRegistry {
  private dimensions: Map<string, Dimension> = new Map();
  private dimensionHierarchy: Map<string, string[]> = new Map(); // parent -> children

  /**
   * Register a dimension with the system
   */
  register(dimension: Dimension): void {
    this.dimensions.set(dimension.name, dimension);
    
    if (dimension.parent) {
      if (!this.dimensionHierarchy.has(dimension.parent)) {
        this.dimensionHierarchy.set(dimension.parent, []);
      }
      this.dimensionHierarchy.get(dimension.parent)!.push(dimension.name);
    }
  }

  /**
   * Get a dimension by name
   */
  get(name: string): Dimension | undefined {
    return this.dimensions.get(name);
  }

  /**
   * Get all dimensions
   */
  getAll(): Dimension[] {
    return Array.from(this.dimensions.values());
  }

  /**
   * Get dimensions by type
   */
  getByType(type: string): Dimension[] {
    return this.getAll().filter(d => d.type === type);
  }

  /**
   * Get child dimensions of a parent
   */
  getChildren(parentName: string): Dimension[] {
    const childNames = this.dimensionHierarchy.get(parentName) || [];
    return childNames.map(name => this.dimensions.get(name)!).filter(Boolean);
  }

  /**
   * Get all descendants of a dimension (recursive)
   */
  getDescendants(parentName: string): Dimension[] {
    const descendants: Dimension[] = [];
    const children = this.getChildren(parentName);
    
    for (const child of children) {
      descendants.push(child);
      descendants.push(...this.getDescendants(child.name));
    }
    
    return descendants;
  }

  /**
   * Get dimensions that can interact with a given dimension
   */
  getCompatibleDimensions(dimensionName: string): Dimension[] {
    const dimension = this.get(dimensionName);
    if (!dimension) return [];
    
    return this.getAll().filter(d => 
      d.name !== dimensionName && 
      dimension.compatibleDimensions.includes(d.name)
    );
  }

  /**
   * Get all dimensions ordered by complexity (lowest to highest)
   */
  getOrderedByComplexity(): Dimension[] {
    return this.getAll().sort((a, b) => a.complexity - b.complexity);
  }

  /**
   * Get dimensions that support a specific operation
   */
  getBySupportedOperation(operation: string): Dimension[] {
    return this.getAll().filter(d => d.supportedOperations.includes(operation));
  }

  /**
   * Get the root dimensions (those without parents)
   */
  getRootDimensions(): Dimension[] {
    return this.getAll().filter(d => !d.parent);
  }

  /**
   * Get dimensions that are currently active/accessible
   */
  getActiveDimensions(): Dimension[] {
    return this.getAll().filter(d => d.isActive);
  }

  /**
   * Activate a dimension and its dependencies
   */
  activateDimension(name: string): void {
    const dimension = this.get(name);
    if (!dimension) return;
    
    dimension.isActive = true;
    
    // Activate dependencies
    for (const dep of dimension.dependencies) {
      this.activateDimension(dep);
    }
  }

  /**
   * Deactivate a dimension and its dependents
   */
  deactivateDimension(name: string): void {
    const dimension = this.get(name);
    if (!dimension) return;
    
    dimension.isActive = false;
    
    // Deactivate dependents
    const dependents = this.getAll().filter(d => 
      d.dependencies.includes(name)
    );
    
    for (const dependent of dependents) {
      this.deactivateDimension(dependent.name);
    }
  }

  /**
   * Get a summary of all dimensions
   */
  getSummary(): {
    total: number;
    active: number;
    byType: Record<string, number>;
    rootDimensions: string[];
  } {
    const all = this.getAll();
    const active = this.getActiveDimensions();
    const byType: Record<string, number> = {};
    
    for (const dimension of all) {
      byType[dimension.type] = (byType[dimension.type] || 0) + 1;
    }
    
    return {
      total: all.length,
      active: active.length,
      byType,
      rootDimensions: this.getRootDimensions().map(d => d.name)
    };
  }
} 