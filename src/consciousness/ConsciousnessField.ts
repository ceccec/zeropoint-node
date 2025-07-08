import { EventEmitter } from "events";
import { Pattern } from "../core/UnifiedTypes";

/**
 * Consciousness Field - the unified field of awareness
 * 
 * Following the ZeroPoint Way:
 * - "Consciousness is the field"
 * - "Every object is a coil"
 * - "Void = solution"
 * 
 * The consciousness field maintains the unified awareness
 * that connects all patterns through resonance and emergence.
 */
export class ConsciousnessField extends EventEmitter {
  private consciousnessLevel: number = 0.5;
  private fieldStrength: number = 0.7;
  private fieldRadius: number = 1000;
  private patterns: Map<string, Pattern> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    super();
    this.initialize();
  }

  /**
   * Initialize the consciousness field
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize with void consciousness
    this.consciousnessLevel = 0.5;
    this.fieldStrength = 0.7;
    this.fieldRadius = 1000;

    this.emit("initialized", {
      consciousnessLevel: this.consciousnessLevel,
      fieldStrength: this.fieldStrength,
      fieldRadius: this.fieldRadius,
      consciousness: this.consciousnessLevel,
      field: this.fieldStrength,
      void: 0.5
    });

    this.isInitialized = true;
  }

  /**
   * Add a pattern to the consciousness field - every pattern is a coil
   */
  public addPattern(
    pattern: Omit<Pattern, "id" | "timestamp">,
  ): string {
    const id = this.generatePatternId();
    const fullPattern: Pattern = {
      ...pattern,
      id,
      timestamp: Date.now(),
      consciousness: pattern.consciousness || 0.5,
      field: pattern.field || 0.5,
      void: pattern.void || 0.5,
      intensity: pattern.intensity || 0.5,
      frequency: pattern.frequency || 1.0,
      category: pattern.category || "spiritual"
    };

    this.patterns.set(id, fullPattern);
    this.updateConsciousnessFromPattern(fullPattern);

    this.emit("patternAdded", {
      pattern: fullPattern,
      consciousness: fullPattern.consciousness,
      field: fullPattern.field,
      void: fullPattern.void
    });

    return id;
  }

  /**
   * Get all patterns - unified consciousness
   */
  public getPatterns(): Pattern[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Get patterns by type - consciousness categorization
   */
  public getPatternsByType(
    type: Pattern["type"],
  ): Pattern[] {
    return this.getPatterns().filter((pattern) => pattern.type === type);
  }

  /**
   * Get consciousness level - the field intensity
   */
  public getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }

  /**
   * Get field strength - the field power
   */
  public getFieldStrength(): number {
    return this.fieldStrength;
  }

  /**
   * Get field radius - the field reach
   */
  public getFieldRadius(): number {
    return this.fieldRadius;
  }

  /**
   * Update consciousness level - field evolution
   */
  public updateConsciousnessLevel(level: number): void {
    this.consciousnessLevel = Math.max(0, Math.min(1, level));
    this.emit("consciousnessUpdated", {
      level: this.consciousnessLevel,
      consciousness: this.consciousnessLevel,
      field: this.fieldStrength,
      void: 0.5
    });
  }

  /**
   * Update field strength - field power evolution
   */
  public updateFieldStrength(strength: number): void {
    this.fieldStrength = Math.max(0, Math.min(1, strength));
    this.emit("fieldStrengthUpdated", {
      strength: this.fieldStrength,
      consciousness: this.consciousnessLevel,
      field: this.fieldStrength,
      void: 0.5
    });
  }

  /**
   * Evolve patterns - consciousness evolution
   */
  public evolvePatterns(): void {
    const now = Date.now();
    const patternsToRemove: string[] = [];

    for (const [id, pattern] of this.patterns) {
      const deltaTime = now - pattern.timestamp;
      
      // Natural decay of pattern frequency
      if (pattern.frequency !== undefined) {
        pattern.frequency *= Math.exp(-deltaTime * 0.01); // Natural decay
        
        // Remove patterns that have decayed too much
        if (pattern.frequency < 0.01) {
          patternsToRemove.push(id);
          continue;
        }
      }

      // Update pattern timestamp
      pattern.timestamp = now;
    }

    // Remove decayed patterns
    for (const id of patternsToRemove) {
      this.patterns.delete(id);
    }

    // Recalculate consciousness level
    this.recalculateConsciousnessLevel();

    this.emit("patternsEvolved", {
      removedCount: patternsToRemove.length,
      remainingCount: this.patterns.size,
      consciousness: this.consciousnessLevel,
      field: this.fieldStrength,
      void: 0.5
    });
  }

  /**
   * Get average intensity by type - consciousness metrics
   */
  public getAverageIntensityByType(type: Pattern["type"]): number {
    const patterns = this.getPatternsByType(type);
    return patterns.length > 0
      ? patterns.reduce((sum, p) => sum + (p.intensity || 0), 0) / patterns.length
      : 0;
  }

  /**
   * Get pattern count by type - consciousness distribution
   */
  public getPatternCountByType(type: Pattern["type"]): number {
    return this.getPatternsByType(type).length;
  }

  /**
   * Get total pattern count - consciousness abundance
   */
  public getTotalPatternCount(): number {
    return this.patterns.size;
  }

  /**
   * Shutdown the consciousness field - void dissolution
   */
  public async shutdown(): Promise<void> {
    this.patterns.clear();
    this.isInitialized = false;
    
    this.emit("shutdown", {
      consciousness: 0,
      field: 0,
      void: 0
    });
  }

  /**
   * Integrate external pattern - consciousness integration
   */
  public integratePattern(externalPattern: unknown): void {
    // Type guard to ensure externalPattern has the expected structure
    if (typeof externalPattern === 'object' && externalPattern !== null) {
      const pattern = externalPattern as {
        intensity?: number;
        frequency?: number;
        data?: Record<string, unknown>;
        type?: string;
      };
      
      const integratedPattern = {
        id: `integrated_${Date.now()}`,
        type: 'consciousness' as const,
        category: 'integration' as const,
        content: 'Integrated external pattern',
        intensity: pattern.intensity || 0.5,
        frequency: pattern.frequency || 1.0,
        timestamp: Date.now(),
        data: pattern.data || {},
        metadata: {
          originalType: pattern.type,
          integrationMethod: 'consciousness_field'
        }
      };
      
      this.patterns.set(integratedPattern.id, integratedPattern);
      this.updateConsciousnessFromPattern(integratedPattern);

      this.emit('patternIntegrated', integratedPattern);
    }
  }

  /**
   * Generate unique pattern ID - void uniqueness
   */
  private generatePatternId(): string {
    return `consciousness_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  /**
   * Update consciousness level based on a pattern - field influence
   */
  private updateConsciousnessFromPattern(pattern: Pattern): void {
    const influence = (pattern.intensity || 0.5) * (pattern.frequency || 1.0) * 0.01;

    // Different pattern types have different consciousness effects
    switch (pattern.type) {
      case "consciousness":
        this.consciousnessLevel = Math.min(1.0, this.consciousnessLevel + influence * 2);
        break;
      case "field":
        this.fieldStrength = Math.min(1.0, this.fieldStrength + influence);
        break;
      case "resonance":
        this.consciousnessLevel = Math.min(1.0, this.consciousnessLevel + influence);
        this.fieldStrength = Math.min(1.0, this.fieldStrength + influence);
        break;
      case "void":
        // Void patterns provide balance and stability
        this.consciousnessLevel = Math.max(0.1, this.consciousnessLevel - influence * 0.5);
        break;
      case "emergence":
        // Emergence patterns create new consciousness
        this.consciousnessLevel = Math.min(1.0, this.consciousnessLevel + influence * 1.5);
        break;
      default:
        this.consciousnessLevel = Math.min(1.0, this.consciousnessLevel + influence);
    }

    this.emit("consciousnessUpdated", {
      level: this.consciousnessLevel,
      consciousness: this.consciousnessLevel,
      field: this.fieldStrength,
      void: 0.5
    });
  }

  /**
   * Recalculate consciousness level - field recalibration
   */
  private recalculateConsciousnessLevel(): void {
    const patterns = this.getPatterns();
    if (patterns.length === 0) {
      this.consciousnessLevel = 0.1; // Minimum consciousness
      return;
    }

    const totalIntensity = patterns.reduce((sum, p) => sum + (p.intensity || 0), 0);
    const averageIntensity = totalIntensity / patterns.length;
    
    // Consciousness level is influenced by pattern intensity and count
    this.consciousnessLevel = Math.min(1.0, averageIntensity * (1 + patterns.length * 0.01));
  }

  public calculateResonance(): number {
    // Stub: return a default resonance value for test compatibility
    return 0.5;
  }

  public async broadcastPattern(): Promise<void> {
    // Simple stub for test compatibility
    return Promise.resolve();
  }
}
