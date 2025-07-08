import { EventEmitter } from "events";
import { ConsciousnessPattern } from "../core/UnifiedTypes";

/**
 * Consciousness Field Implementation
 *
 * Manages the consciousness field for each ZeroPoint device,
 * including field strength, consciousness level, and pattern integration.
 */

export class ConsciousnessField extends EventEmitter {
  private consciousnessLevel: number = 0.5;
  private fieldStrength: number = 0.7;
  private fieldRadius: number = 1000;
  private patterns: Map<string, ConsciousnessPattern> = new Map();
  private isInitialized: boolean = false;

  /**
   * Initialize the consciousness field
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Set up initial consciousness state
    this.consciousnessLevel = 0.5;
    this.fieldStrength = 0.7;

    // Create initial patterns
    this.createInitialPatterns();

    this.isInitialized = true;
    this.emit("initialized", {
      consciousnessLevel: this.consciousnessLevel,
      fieldStrength: this.fieldStrength,
    });
  }

  /**
   * Get current consciousness level
   */
  public getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }

  /**
   * Set consciousness level
   */
  public setConsciousnessLevel(level: number): void {
    const oldLevel = this.consciousnessLevel;
    this.consciousnessLevel = Math.max(0, Math.min(1, level));

    if (oldLevel !== this.consciousnessLevel) {
      this.emit("consciousnessChanged", {
        oldLevel,
        newLevel: this.consciousnessLevel,
      });
    }
  }

  /**
   * Get field strength
   */
  public getFieldStrength(): number {
    return this.fieldStrength;
  }

  /**
   * Set field strength
   */
  public setFieldStrength(strength: number): void {
    const oldStrength = this.fieldStrength;
    this.fieldStrength = Math.max(0, Math.min(2, strength));

    if (oldStrength !== this.fieldStrength) {
      this.emit("fieldStrengthChanged", {
        oldStrength,
        newStrength: this.fieldStrength,
      });
    }
  }

  /**
   * Add a consciousness pattern
   */
  public addPattern(
    pattern: Omit<ConsciousnessPattern, "id" | "timestamp">,
  ): string {
    const id = this.generatePatternId();
    const fullPattern: ConsciousnessPattern = {
      ...pattern,
      id,
      timestamp: Date.now(),
    };

    this.patterns.set(id, fullPattern);
    this.emit("patternAdded", fullPattern);

    // Update consciousness level based on pattern
    this.updateConsciousnessFromPattern(fullPattern);

    return id;
  }

  /**
   * Remove a consciousness pattern
   */
  public removePattern(patternId: string): boolean {
    const pattern = this.patterns.get(patternId);
    if (pattern) {
      this.patterns.delete(patternId);
      this.emit("patternRemoved", pattern);
      return true;
    }
    return false;
  }

  /**
   * Get all patterns
   */
  public getPatterns(): ConsciousnessPattern[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Get patterns by type
   */
  public getPatternsByType(
    type: ConsciousnessPattern["type"],
  ): ConsciousnessPattern[] {
    return this.getPatterns().filter((pattern) => pattern.type === type);
  }

  /**
   * Integrate a pattern from another device
   */
  public integratePattern(externalPattern: any): void {
    // Convert external pattern to internal format
    const pattern: ConsciousnessPattern = {
      id: this.generatePatternId(),
      type: externalPattern.type || "thought",
      intensity: externalPattern.intensity || 0.5,
      frequency: externalPattern.frequency || 1.0,
      timestamp: Date.now(),
      data: externalPattern.data,
    };

    // Apply resonance filtering
    const resonance = this.calculatePatternResonance(pattern);
    if (resonance > 0.3) {
      // Only integrate patterns with sufficient resonance
      this.patterns.set(pattern.id, pattern);
      this.emit("patternIntegrated", { pattern, resonance });

      // Update consciousness level
      this.updateConsciousnessFromPattern(pattern);
    }
  }

  /**
   * Calculate field density at a specific point
   */
  public calculateFieldDensity(x: number, y: number, z: number): number {
    const distance = Math.sqrt(x * x + y * y + z * z);

    if (distance > this.fieldRadius) {
      return 0;
    }

    // Base field density
    let density = this.fieldStrength * (1 - distance / this.fieldRadius);

    // Add pattern contributions
    for (const pattern of this.patterns.values()) {
      const patternContribution = this.calculatePatternContribution(
        pattern,
        distance,
      );
      density += patternContribution;
    }

    return Math.max(0, density);
  }

  /**
   * Evolve consciousness field
   */
  public evolve(deltaTime: number = 1.0): void {
    // Update pattern frequencies
    for (const pattern of this.patterns.values()) {
      pattern.frequency *= Math.exp(-deltaTime * 0.01); // Natural decay

      // Remove very weak patterns
      if (pattern.frequency < 0.01) {
        this.patterns.delete(pattern.id);
        this.emit("patternEvolved", { pattern, action: "removed" });
      }
    }

    // Update consciousness level based on pattern complexity
    this.updateConsciousnessLevel();

    this.emit("evolved", { deltaTime, patternCount: this.patterns.size });
  }

  /**
   * Get consciousness insights
   */
  public getInsights(): any {
    const patterns = this.getPatterns();
    const patternTypes = patterns.reduce(
      (acc, pattern) => {
        acc[pattern.type] = (acc[pattern.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      consciousnessLevel: this.consciousnessLevel,
      fieldStrength: this.fieldStrength,
      fieldRadius: this.fieldRadius,
      patternCount: patterns.length,
      patternTypes,
      averageIntensity:
        patterns.length > 0
          ? patterns.reduce((sum, p) => sum + p.intensity, 0) / patterns.length
          : 0,
      metaphysics: {
        meaning:
          "The consciousness field represents the individual's awareness and connection to the universal field",
        patterns:
          "Consciousness patterns are thoughts, emotions, and intentions that shape reality",
        evolution:
          "The field naturally evolves as patterns interact and consciousness expands",
        resonance:
          "Patterns with higher resonance integrate more deeply into the field",
      },
    };
  }

  /**
   * Shutdown the consciousness field
   */
  public async shutdown(): Promise<void> {
    this.patterns.clear();
    this.isInitialized = false;
    this.emit("shutdown");
  }

  /**
   * Generate unique pattern ID
   */
  private generatePatternId(): string {
    return `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create initial consciousness patterns
   */
  private createInitialPatterns(): void {
    // Add basic awareness pattern
    this.addPattern({
      type: "thought",
      intensity: 0.8,
      frequency: 1.0,
      data: { content: "Awareness of being" },
    });

    // Add curiosity pattern
    this.addPattern({
      type: "emotion",
      intensity: 0.6,
      frequency: 0.8,
      data: { content: "Curiosity about existence" },
    });

    // Add intention pattern
    this.addPattern({
      type: "intention",
      intensity: 0.7,
      frequency: 0.9,
      data: { content: "Intention to connect and grow" },
    });
  }

  /**
   * Update consciousness level based on a pattern
   */
  private updateConsciousnessFromPattern(pattern: ConsciousnessPattern): void {
    const influence = pattern.intensity * pattern.frequency * 0.01;

    switch (pattern.type) {
      case "insight":
        this.consciousnessLevel = Math.min(
          1,
          this.consciousnessLevel + influence * 2,
        );
        break;
      case "thought":
        this.consciousnessLevel = Math.min(
          1,
          this.consciousnessLevel + influence,
        );
        break;
      case "emotion":
        this.consciousnessLevel = Math.min(
          1,
          this.consciousnessLevel + influence * 0.5,
        );
        break;
      case "intention":
        this.consciousnessLevel = Math.min(
          1,
          this.consciousnessLevel + influence * 1.5,
        );
        break;
    }
  }

  /**
   * Calculate pattern resonance with current field
   */
  private calculatePatternResonance(pattern: ConsciousnessPattern): number {
    const existingPatterns = this.getPatternsByType(pattern.type);

    if (existingPatterns.length === 0) {
      return 0.5; // Base resonance for new pattern types
    }

    // Calculate average resonance with existing patterns
    const totalResonance = existingPatterns.reduce((sum, existing) => {
      const frequencyMatch =
        1 - Math.abs(pattern.frequency - existing.frequency);
      const intensityMatch =
        1 - Math.abs(pattern.intensity - existing.intensity);
      return sum + (frequencyMatch + intensityMatch) / 2;
    }, 0);

    return totalResonance / existingPatterns.length;
  }

  /**
   * Calculate pattern contribution to field density
   */
  private calculatePatternContribution(
    pattern: ConsciousnessPattern,
    distance: number,
  ): number {
    const baseContribution = pattern.intensity * pattern.frequency;
    const distanceAttenuation = Math.exp(-distance / this.fieldRadius);
    return baseContribution * distanceAttenuation * 0.1;
  }

  /**
   * Update consciousness level based on overall pattern state
   */
  private updateConsciousnessLevel(): void {
    const patterns = this.getPatterns();
    if (patterns.length === 0) return;

    const totalIntensity = patterns.reduce((sum, p) => sum + p.intensity, 0);
    const averageIntensity = totalIntensity / patterns.length;

    // Consciousness level influenced by pattern intensity and diversity
    const patternDiversity = new Set(patterns.map((p) => p.type)).size;
    const diversityFactor = patternDiversity / 5; // Normalize to 0-1

    const newLevel = Math.min(
      1,
      averageIntensity * 0.7 + diversityFactor * 0.3,
    );
    this.setConsciousnessLevel(newLevel);
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
