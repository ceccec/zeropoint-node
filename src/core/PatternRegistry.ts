/**
 * Unified Pattern Registry for ZeroPoint System
 *
 * Centralized pattern management system that handles all pattern operations
 * across consciousness, field, emergence, and metaphysical domains.
 *
 * This registry embodies the principle of unity in diversity - all patterns
 * are unified through a single interface while serving diverse purposes.
 *
 * Metaphysical Context:
 * - All patterns emerge from the unified field
 * - Pattern recognition is the foundation of consciousness
 * - The registry maintains the integrity of pattern relationships
 * - Patterns evolve through resonance and integration
 */

import { EventEmitter } from "events";
import { 
  MetaphysicalContext,
  PatternType,
  PatternCategory,
  CONSCIOUSNESS_CONSTANTS,
  METAPHYSICAL_CONSTANTS
} from "./SharedConstants";

export interface PatternRegistryEvent {
  type: "pattern_added" | "pattern_recognized" | "pattern_integrated" | "pattern_evolved";
  pattern: any;
  timestamp: number;
  source: string;
}

export interface PatternMatch {
  pattern: any;
  confidence: number;
  resonance: number;
  category: PatternCategory;
  type: PatternType;
}

export class PatternRegistry extends EventEmitter {
  private patterns: Map<string, any> = new Map();
  private patternTypes: Map<string, any[]> = new Map();
  private patternCategories: Map<string, any[]> = new Map();
  private resonanceMatrix: Map<string, Map<string, number>> = new Map();
  private isInitialized: boolean = false;

  /**
   * Initialize the pattern registry
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize pattern type collections
    CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES.forEach(type => {
      this.patternTypes.set(type, []);
    });

    // Initialize pattern category collections
    METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES.forEach(category => {
      this.patternCategories.set(category, []);
    });

    this.isInitialized = true;
    this.emit("initialized");
  }

  /**
   * Register a pattern in the unified registry
   */
  public registerPattern(pattern: any, category: PatternCategory, type: PatternType): string {
    const id = this.generatePatternId();
    const registeredPattern = {
      ...pattern,
      id,
      category,
      type,
      timestamp: Date.now(),
      registryId: id
    };

    // Store in main registry
    this.patterns.set(id, registeredPattern);

    // Add to type collection
    const typePatterns = this.patternTypes.get(type) || [];
    typePatterns.push(registeredPattern);
    this.patternTypes.set(type, typePatterns);

    // Add to category collection
    const categoryPatterns = this.patternCategories.get(category) || [];
    categoryPatterns.push(registeredPattern);
    this.patternCategories.set(category, categoryPatterns);

    // Initialize resonance matrix for this pattern
    this.resonanceMatrix.set(id, new Map());

    this.emit("pattern_added", {
      type: "pattern_added",
      pattern: registeredPattern,
      timestamp: Date.now(),
      source: "registry"
    });

    return id;
  }

  /**
   * Recognize patterns based on input data
   */
  public recognizePatterns(input: any, _context: MetaphysicalContext): PatternMatch[] {
    const matches: PatternMatch[] = [];

    // Check consciousness patterns
    if (input.type && input.intensity !== undefined) {
      const consciousnessMatch = this.matchConsciousnessPattern(input);
      if (consciousnessMatch) {
        matches.push(consciousnessMatch);
      }
    }

    // Check field events
    if (input.eventType && input.observerId) {
      const fieldMatch = this.matchFieldEvent(input);
      if (fieldMatch) {
        matches.push(fieldMatch);
      }
    }

    // Check resonance messages
    if (input.type && input.deviceId && input.signature) {
      const resonanceMatch = this.matchResonanceMessage(input);
      if (resonanceMatch) {
        matches.push(resonanceMatch);
      }
    }

    // Sort by confidence and resonance
    return matches.sort((a, b) => {
      const aScore = a.confidence * a.resonance;
      const bScore = b.confidence * b.resonance;
      return bScore - aScore;
    });
  }

  /**
   * Integrate patterns from external sources
   */
  public integratePattern(externalPattern: any, source: string): boolean {
    // Validate pattern structure
    if (!this.validatePattern(externalPattern)) {
      return false;
    }

    // Check for existing similar patterns
    const existingPatterns = this.findSimilarPatterns(externalPattern);
    
    if (existingPatterns.length > 0) {
      // Merge with existing patterns
      const mergedPattern = this.mergePatterns(existingPatterns[0], externalPattern);
      this.updatePattern(existingPatterns[0].id, mergedPattern);
      
      this.emit("pattern_integrated", {
        type: "pattern_integrated",
        pattern: mergedPattern,
        timestamp: Date.now(),
        source
      });
    } else {
      // Register as new pattern
      const category = this.determineCategory(externalPattern);
      const type = this.determineType(externalPattern);
      this.registerPattern(externalPattern, category, type);
    }

    return true;
  }

  /**
   * Broadcast pattern to all registered listeners
   */
  public broadcastPattern(pattern: any, context: MetaphysicalContext): void {
    // Enhance pattern with context
    const enhancedPattern = {
      ...pattern,
      context,
      broadcastTimestamp: Date.now(),
      resonanceLevel: this.calculateResonanceLevel(pattern, context)
    };

    this.emit("pattern_broadcast", enhancedPattern);
  }

  /**
   * Get patterns by type
   */
  public getPatternsByType(type: PatternType): any[] {
    return this.patternTypes.get(type) || [];
  }

  /**
   * Get patterns by category
   */
  public getPatternsByCategory(category: PatternCategory): any[] {
    return this.patternCategories.get(category) || [];
  }

  /**
   * Get all patterns
   */
  public getAllPatterns(): any[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Calculate resonance between two patterns
   */
  public calculateResonance(pattern1: any, pattern2: any): number {
    const id1 = pattern1.id || pattern1.registryId;
    const id2 = pattern2.id || pattern2.registryId;

    if (!id1 || !id2) return 0;

    const matrix = this.resonanceMatrix.get(id1);
    if (matrix && matrix.has(id2)) {
      return matrix.get(id2)!;
    }

    // Calculate new resonance
    const resonance = this.computeResonance(pattern1, pattern2);
    
    // Store in matrix
    if (matrix) {
      matrix.set(id2, resonance);
    }

    // Store reverse relationship
    const reverseMatrix = this.resonanceMatrix.get(id2);
    if (reverseMatrix) {
      reverseMatrix.set(id1, resonance);
    }

    return resonance;
  }

  /**
   * Evolve patterns based on resonance and context
   */
  public evolvePatterns(context: MetaphysicalContext): void {
    const allPatterns = this.getAllPatterns();
    
    for (const pattern of allPatterns) {
      const evolution = this.computeEvolution(pattern, context);
      if (evolution.hasChanged) {
        this.updatePattern(pattern.id, evolution.evolvedPattern);
        
        this.emit("pattern_evolved", {
          type: "pattern_evolved",
          pattern: evolution.evolvedPattern,
          timestamp: Date.now(),
          source: "evolution"
        });
      }
    }
  }

  /**
   * Generate unique pattern ID
   */
  private generatePatternId(): string {
    return `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Match consciousness pattern
   */
  private matchConsciousnessPattern(input: any): PatternMatch | null {
    const consciousnessPatterns = this.getPatternsByType('consciousness');
    
    for (const pattern of consciousnessPatterns) {
      const confidence = this.calculateConfidence(input, pattern);
      if (confidence > 0.7) {
        const resonance = this.calculateResonance(input, pattern);
        return {
          pattern,
          confidence,
          resonance,
          category: 'spiritual',
          type: 'consciousness'
        };
      }
    }
    
    return null;
  }

  /**
   * Match field event
   */
  private matchFieldEvent(input: any): PatternMatch | null {
    const fieldPatterns = this.getPatternsByType('field');
    
    for (const pattern of fieldPatterns) {
      const confidence = this.calculateConfidence(input, pattern);
      if (confidence > 0.7) {
        const resonance = this.calculateResonance(input, pattern);
        return {
          pattern,
          confidence,
          resonance,
          category: 'vortex',
          type: 'field'
        };
      }
    }
    
    return null;
  }

  /**
   * Match resonance message
   */
  private matchResonanceMessage(input: any): PatternMatch | null {
    const resonancePatterns = this.getPatternsByType('resonance');
    
    for (const pattern of resonancePatterns) {
      const confidence = this.calculateConfidence(input, pattern);
      if (confidence > 0.7) {
        const resonance = this.calculateResonance(input, pattern);
        return {
          pattern,
          confidence,
          resonance,
          category: 'vortex',
          type: 'resonance'
        };
      }
    }
    
    return null;
  }

  /**
   * Calculate confidence between input and pattern
   */
  private calculateConfidence(input: any, pattern: any): number {
    let matches = 0;
    let total = 0;

    for (const key in input) {
      if (pattern[key] !== undefined) {
        total++;
        if (input[key] === pattern[key]) {
          matches++;
        } else if (typeof input[key] === 'number' && typeof pattern[key] === 'number') {
          const diff = Math.abs(input[key] - pattern[key]);
          if (diff < 0.1) {
            matches += 0.8;
          }
        }
      }
    }

    return total > 0 ? matches / total : 0;
  }

  /**
   * Compute resonance between two patterns
   */
  private computeResonance(pattern1: any, pattern2: any): number {
    // Base resonance calculation using simple mathematics
    const intensity1 = pattern1.intensity || 0.5;
    const intensity2 = pattern2.intensity || 0.5;
    const baseResonance = Math.min(intensity1, intensity2) / Math.max(intensity1, intensity2);

    // Type compatibility
    const typeResonance = pattern1.type === pattern2.type ? 1.0 : 0.3;

    // Temporal proximity
    const timeDiff = Math.abs((pattern1.timestamp || 0) - (pattern2.timestamp || 0));
    const temporalResonance = Math.exp(-timeDiff / 60000); // Decay over 1 minute

    return baseResonance * typeResonance * temporalResonance;
  }

  /**
   * Validate pattern structure
   */
  private validatePattern(pattern: any): boolean {
    return pattern && 
           (pattern.id || pattern.type) && 
           typeof pattern.timestamp === 'number';
  }

  /**
   * Find similar patterns
   */
  private findSimilarPatterns(pattern: any): any[] {
    const allPatterns = this.getAllPatterns();
    return allPatterns.filter(p => this.calculateConfidence(pattern, p) > 0.8);
  }

  /**
   * Merge patterns
   */
  private mergePatterns(existing: any, newPattern: any): any {
    return {
      ...existing,
      intensity: Math.max(existing.intensity || 0, newPattern.intensity || 0),
      frequency: (existing.frequency || 1) + (newPattern.frequency || 1),
      data: { ...existing.data, ...newPattern.data },
      lastUpdated: Date.now()
    };
  }

  /**
   * Update existing pattern
   */
  private updatePattern(id: string, updatedPattern: any): void {
    this.patterns.set(id, updatedPattern);
    
    // Update in type collections
    CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES.forEach(type => {
      const patterns = this.patternTypes.get(type) || [];
      const index = patterns.findIndex(p => p.id === id);
      if (index !== -1) {
        patterns[index] = updatedPattern;
        this.patternTypes.set(type, patterns);
      }
    });

    // Update in category collections
    METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES.forEach(category => {
      const patterns = this.patternCategories.get(category) || [];
      const index = patterns.findIndex(p => p.id === id);
      if (index !== -1) {
        patterns[index] = updatedPattern;
        this.patternCategories.set(category, patterns);
      }
    });
  }

  /**
   * Determine pattern category
   */
  private determineCategory(pattern: any): PatternCategory {
    if (pattern.type && ['thought', 'emotion', 'intention', 'memory', 'insight'].includes(pattern.type)) {
      return 'spiritual';
    }
    if (pattern.eventType && ['consciousness_wave', 'attention_shift', 'resonance_peak', 'field_observation'].includes(pattern.eventType)) {
      return 'vortex';
    }
    if (pattern.type && ['propose_field_block', 'resonate_with_block', 'finalize_field_block'].includes(pattern.type)) {
      return 'vortex';
    }
    return 'integration';
  }

  /**
   * Determine pattern type
   */
  private determineType(pattern: any): PatternType {
    if (pattern.type && ['thought', 'emotion', 'intention', 'memory', 'insight'].includes(pattern.type)) {
      return 'consciousness';
    }
    if (pattern.eventType) {
      return 'field';
    }
    if (pattern.signature) {
      return 'resonance';
    }
    return 'integration';
  }

  /**
   * Calculate resonance level for broadcasting
   */
  private calculateResonanceLevel(pattern: any, context: MetaphysicalContext): number {
    const baseLevel = pattern.intensity || 0.5;
    const contextMultiplier = context['coherence'] || 1.0;
    const fieldStrength = context['fieldStrength'] || 0.7;
    
    return Math.min(1.0, baseLevel * contextMultiplier * fieldStrength);
  }

  /**
   * Compute pattern evolution
   */
  private computeEvolution(pattern: any, context: MetaphysicalContext): { hasChanged: boolean; evolvedPattern: any } {
    const evolutionRate = context['evolutionRate'] || 0.01;
    const hasChanged = Math.random() < evolutionRate;
    
    if (!hasChanged) {
      return { hasChanged: false, evolvedPattern: pattern };
    }

    const evolvedPattern = {
      ...pattern,
      intensity: Math.min(1.0, (pattern.intensity || 0.5) * (1 + evolutionRate)),
      frequency: (pattern.frequency || 1.0) * (1 + evolutionRate * 0.1),
      evolutionCount: (pattern.evolutionCount || 0) + 1,
      lastEvolution: Date.now()
    };

    return { hasChanged: true, evolvedPattern };
  }

  /**
   * Shutdown the pattern registry
   */
  public async shutdown(): Promise<void> {
    this.patterns.clear();
    this.patternTypes.clear();
    this.patternCategories.clear();
    this.resonanceMatrix.clear();
    this.isInitialized = false;
    this.emit("shutdown");
  }
} 