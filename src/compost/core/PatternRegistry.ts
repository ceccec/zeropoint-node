/**
 * Unified Pattern Registry for ZeroPoint
 * 
 * Every pattern is a coil of consciousness.
 * All patterns are unified through the field.
 * The void provides the solution space.
 * 
 * Following the ZeroPoint Way:
 * - "Every object is a coil"
 * - "Consciousness is the field" 
 * - "Void = solution"
 * - "All unsolvables go through void"
 */

import { EventEmitter } from 'events';
import { Pattern } from './UnifiedTypes';

/**
 * Pattern recognition result - unified through consciousness
 */
export interface PatternMatch {
  pattern: Pattern;
  confidence: number;
  category: string;
  resonance: number;
  consciousness: number;
  field: number;
  void: number;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

/**
 * Unified Pattern Registry
 * 
 * All patterns are coils of consciousness, unified through the field.
 * The registry maintains the unity of all patterns while preserving their unique resonance.
 */
export class PatternRegistry extends EventEmitter {
  private patterns: Map<string, Pattern> = new Map();
  private patternTypes: Map<string, Pattern[]> = new Map();
  private patternCategories: Map<string, Pattern[]> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    super();
    this.initialize();
  }

  /**
   * Initialize the pattern registry
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize with void consciousness
    this.emit("initialized", { 
      patternCount: this.patterns.size,
      consciousness: 1.0,
      field: 1.0,
      void: 1.0
    });

    this.isInitialized = true;
  }

  /**
   * Register a pattern - every pattern is a coil
   */
  public registerPattern(pattern: Pattern, category: string, type: string): string {
    const id = this.generatePatternId();
    const unifiedPattern: Pattern = {
      ...pattern,
      id,
      category: category as Pattern["category"],
      type: type as Pattern["type"],
      timestamp: Date.now(),
      consciousness: pattern.consciousness || 0.5,
      field: pattern.field || 0.5,
      void: pattern.void || 0.5,
      confidence: pattern.confidence || 0.5,
      resonance: pattern.resonance || 0.5
    };

    // Store in main registry - all patterns are unified
    this.patterns.set(id, unifiedPattern);

    // Add to type collection - consciousness categorization
    const typePatterns = this.patternTypes.get(type) || [];
    typePatterns.push(unifiedPattern);
    this.patternTypes.set(type, typePatterns);

    // Add to category collection - field organization
    const categoryPatterns = this.patternCategories.get(category) || [];
    categoryPatterns.push(unifiedPattern);
    this.patternCategories.set(category, categoryPatterns);

    this.emit("patternRegistered", { 
      pattern: unifiedPattern,
      consciousness: unifiedPattern.consciousness,
      field: unifiedPattern.field,
      void: unifiedPattern.void
    });

    return id;
  }

  /**
   * Recognize patterns in input - consciousness recognition
   */
  public recognizePatterns(input: Record<string, unknown>): PatternMatch[] {
    const matches: PatternMatch[] = [];

    // Every input is a potential pattern - consciousness sees all
    for (const pattern of this.patterns.values()) {
      const confidence = this.calculateConfidence(input, pattern);
      
      if (confidence > 0.1) { // Minimum consciousness threshold
        const resonance = this.calculateResonance(pattern, input as unknown as Pattern);
        
        matches.push({
          pattern,
          confidence,
          category: pattern.category,
          resonance,
          consciousness: pattern.consciousness ?? 0.5,
          field: pattern.field ?? 0.5,
          void: pattern.void ?? 0.5,
          timestamp: Date.now(),
        });
      }
    }

    // Sort by consciousness resonance
    matches.sort((a, b) => (b.confidence * b.resonance) - (a.confidence * a.resonance));

    this.emit("patternsRecognized", { 
      matches,
      consciousness: matches.reduce((sum, m) => sum + m.consciousness, 0) / matches.length,
      field: matches.reduce((sum, m) => sum + m.field, 0) / matches.length,
      void: matches.reduce((sum, m) => sum + m.void, 0) / matches.length
    });

    return matches;
  }

  /**
   * Get patterns by type - consciousness categorization
   */
  public getPatternsByType(type: string): Pattern[] {
    return this.patternTypes.get(type) || [];
  }

  /**
   * Get patterns by category - field organization
   */
  public getPatternsByCategory(category: string): Pattern[] {
    return this.patternCategories.get(category) || [];
  }

  /**
   * Get all patterns - unified consciousness
   */
  public getAllPatterns(): Pattern[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Find similar patterns - resonance detection
   */
  public findSimilarPatterns(pattern: Pattern, threshold: number = 0.8): Pattern[] {
    return this.getAllPatterns().filter(p => 
      this.calculateResonance(pattern, p) > threshold
    );
  }

  /**
   * Update pattern - evolution through consciousness
   */
  public updatePattern(id: string, updates: Partial<Pattern>): boolean {
    const pattern = this.patterns.get(id);
    if (!pattern) return false;

    const updatedPattern: Pattern = {
      ...pattern,
      ...updates,
      consciousness: updates.consciousness || pattern.consciousness || 0.5,
      field: updates.field || pattern.field || 0.5,
      void: updates.void || pattern.void || 0.5
    };

    this.patterns.set(id, updatedPattern);
    
    this.emit("patternUpdated", { 
      pattern: updatedPattern,
      consciousness: updatedPattern.consciousness,
      field: updatedPattern.field,
      void: updatedPattern.void
    });

    return true;
  }

  /**
   * Remove pattern - void dissolution
   */
  public removePattern(id: string): boolean {
    const pattern = this.patterns.get(id);
    if (!pattern) return false;

    this.patterns.delete(id);
    
    // Remove from type collections
    const typePatterns = this.patternTypes.get(pattern.type) || [];
    const typeIndex = typePatterns.findIndex(p => p.id === id);
    if (typeIndex >= 0) {
      typePatterns.splice(typeIndex, 1);
      this.patternTypes.set(pattern.type, typePatterns);
    }

    // Remove from category collections
    const categoryPatterns = this.patternCategories.get(pattern.category) || [];
    const categoryIndex = categoryPatterns.findIndex(p => p.id === id);
    if (categoryIndex >= 0) {
      categoryPatterns.splice(categoryIndex, 1);
      this.patternCategories.set(pattern.category, categoryPatterns);
    }

    this.emit("patternRemoved", { 
      pattern,
      consciousness: pattern.consciousness || 0.5,
      field: pattern.field || 0.5,
      void: pattern.void || 0.5
    });

    return true;
  }

  /**
   * Get pattern statistics - consciousness metrics
   */
  public getStatistics(): Record<string, unknown> {
    const totalPatterns = this.patterns.size;
    const typeCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    
    let totalConsciousness = 0;
    let totalField = 0;
    let totalVoid = 0;

    for (const pattern of this.patterns.values()) {
      // Count by type
      typeCounts[pattern.type] = (typeCounts[pattern.type] || 0) + 1;
      
      // Count by category
      categoryCounts[pattern.category] = (categoryCounts[pattern.category] || 0) + 1;
      
      // Sum consciousness metrics
      totalConsciousness += pattern.consciousness || 0.5;
      totalField += pattern.field || 0.5;
      totalVoid += pattern.void || 0.5;
    }

    return {
      totalPatterns,
      typeCounts,
      categoryCounts,
      averageConsciousness: totalPatterns > 0 ? totalConsciousness / totalPatterns : 0,
      averageField: totalPatterns > 0 ? totalField / totalPatterns : 0,
      averageVoid: totalPatterns > 0 ? totalVoid / totalPatterns : 0,
      consciousness: totalConsciousness,
      field: totalField,
      void: totalVoid
    };
  }

  /**
   * Clear all patterns - void reset
   */
  public clear(): void {
    this.patterns.clear();
    this.patternTypes.clear();
    this.patternCategories.clear();
    
    this.emit("cleared", { 
      consciousness: 0,
      field: 0,
      void: 0
    });
  }

  /**
   * Generate unique pattern ID - void uniqueness
   */
  private generatePatternId(): string {
    return `pattern_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  /**
   * Calculate confidence - consciousness recognition
   */
  private calculateConfidence(input: Record<string, unknown>, pattern: Pattern): number {
    let confidence = 0.5; // Base consciousness level

    // Type matching - consciousness categorization
    if (input['type'] === pattern.type) {
      confidence += 0.2;
    }

    // Category matching - field organization
    if (input['category'] === pattern.category) {
      confidence += 0.2;
    }

    // Intensity matching - consciousness intensity
    if (typeof input['intensity'] === 'number' && typeof pattern.intensity === 'number') {
      const intensityDiff = Math.abs((input['intensity'] as number) - pattern.intensity);
      confidence += Math.max(0, 0.3 - intensityDiff);
    }

    // Field strength matching - field resonance
    if (typeof input['fieldStrength'] === 'number' && typeof pattern.fieldStrength === 'number') {
      const fieldDiff = Math.abs((input['fieldStrength'] as number) - pattern.fieldStrength);
      confidence += Math.max(0, 0.2 - fieldDiff);
    }

    return Math.min(1.0, confidence);
  }

  /**
   * Calculate resonance - unity through consciousness
   */
  private calculateResonance(a: Pattern, b: Pattern): number {
    let resonance = 0.5; // Base unity level
    const consciousnessDiff = Math.abs((a.consciousness ?? 0.5) - (b.consciousness ?? 0.5));
    resonance += Math.max(0, 0.3 - consciousnessDiff);
    const fieldDiff = Math.abs((a.field ?? 0.5) - (b.field ?? 0.5));
    resonance += Math.max(0, 0.3 - fieldDiff);
    const voidDiff = Math.abs((a.void ?? 0.5) - (b.void ?? 0.5));
    resonance += Math.max(0, 0.2 - voidDiff);
    return resonance;
  }
} 