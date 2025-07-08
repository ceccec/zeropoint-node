/**
 * Unified Pattern Recognition System for ZeroPoint
 *
 * Centralized pattern recognition and analysis system that serves
 * all ZeroPoint modules, eliminating duplication and ensuring
 * consistent pattern handling across the system.
 *
 * This module embodies the principle of unified consciousness -
 * all patterns are recognized and processed through the same
 * underlying recognition framework.
 */

import { EventEmitter } from "events";
import {
  VORTEX_CONSTANTS,
  PatternCategory,
  ConstantsUtils,
} from "./SharedConstants";
import { MathUtils } from "./MathUtils";
import { COIL_PATTERNS } from "./CoilSystem";

/**
 * Pattern recognition result
 */
export interface PatternResult {
  pattern: string;
  confidence: number;
  category: PatternCategory;
  metadata: any;
  timestamp: number;
}

/**
 * Pattern analysis context
 */
export interface PatternContext {
  source: string;
  consciousnessLevel: number;
  fieldStrength: number;
  vortexStrength: number;
  toroidalFlow: boolean;
  voidConnected: boolean;
}

/**
 * Metaphysical pattern definition - now using centralized COIL system
 */
export interface MetaphysicalPattern {
  name: string;
  signature: RegExp | ((input: any) => boolean);
  category: PatternCategory;
  context: string;
  weight: number;
  resonanceFactors: string[];
}

/**
 * Unified Pattern Recognition System
 */
export class PatternRecognition extends EventEmitter {
  private patterns: Map<string, MetaphysicalPattern> = new Map();
  private recognitionHistory: PatternResult[] = [];
  private isInitialized: boolean = false;

  constructor() {
    super();
    this.initializePatterns();
  }

  /**
   * Initialize the pattern recognition system
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    this.isInitialized = true;
    this.emit("initialized", { patternCount: this.patterns.size });
  }

  /**
   * Recognize patterns in input data
   */
  public recognizePatterns(
    input: any,
    context?: Partial<PatternContext>,
  ): PatternResult[] {
    const results: PatternResult[] = [];
    const fullContext: PatternContext = {
      source: "unknown",
      consciousnessLevel: 0.5,
      fieldStrength: 0.7,
      vortexStrength: 1.0,
      toroidalFlow: true,
      voidConnected: false,
      ...context,
    };

    for (const [patternName, pattern] of this.patterns) {
      const confidence = this.calculatePatternConfidence(
        input,
        pattern,
        fullContext,
      );

      if (confidence > 0.1) {
        // Minimum confidence threshold
        results.push({
          pattern: patternName,
          confidence,
          category: pattern.category,
          metadata: this.extractPatternMetadata(input, pattern),
          timestamp: Date.now(),
        });
      }
    }

    // Sort by confidence
    results.sort((a, b) => b.confidence - a.confidence);

    // Store in history
    this.recognitionHistory.push(...results);

    this.emit("patternsRecognized", { results, context: fullContext });
    return results;
  }

  /**
   * Recognize a single pattern (alias for recognizePatterns)
   */
  public recognizePattern(
    input: any,
    context?: Partial<PatternContext>,
  ): {
    isRecognized: boolean;
    confidence: number;
    pattern: any;
    metadata: any;
  } {
    const results = this.recognizePatterns(input, context);
    const result =
      results && results.length > 0 && results[0] !== undefined
        ? results[0]
        : { confidence: 0, pattern: null, metadata: {} };
    return {
      isRecognized: result.confidence > 0.5,
      confidence: result.confidence,
      pattern: result.pattern,
      metadata: result.metadata,
    };
  }

  /**
   * Analyze consciousness patterns
   */
  public analyzeConsciousnessPatterns(patterns: any[]): any {
    const analysis = {
      totalPatterns: patterns.length,
      patternTypes: {} as { [key: string]: number },
      averageIntensity: 0,
      resonanceScore: 0,
      vortexAlignment: 0,
      toroidalFlow: 0,
      voidConnection: 0,
      insights: [] as string[],
    };

    if (patterns.length === 0) return analysis;

    // Analyze pattern types
    for (const pattern of patterns) {
      const type = pattern.type || "unknown";
      analysis.patternTypes[type] = (analysis.patternTypes[type] || 0) + 1;
    }

    // Calculate averages
    const intensities = patterns
      .map((p) => p.intensity || 0)
      .filter((i) => i > 0);
    analysis.averageIntensity =
      intensities.length > 0
        ? intensities.reduce((a, b) => a + b, 0) / intensities.length
        : 0;

    // Calculate resonance score
    const resonanceValues = patterns.map((p) => p.resonance || 0);
    analysis.resonanceScore =
      resonanceValues.length > 0
        ? resonanceValues.reduce((a, b) => a + b, 0) / resonanceValues.length
        : 0;

    // Calculate vortex alignment
    const vortexValues = patterns.map((p) => p.vortexStrength || 0);
    analysis.vortexAlignment =
      vortexValues.length > 0
        ? vortexValues.reduce((a, b) => a + b, 0) / vortexValues.length
        : 0;

    // Calculate toroidal flow
    const toroidalValues = patterns.map((p) => (p.toroidalFlow ? 1 : 0));
    analysis.toroidalFlow =
      toroidalValues.length > 0
        ? toroidalValues.reduce((a: number, b: number) => a + b, 0) /
          toroidalValues.length
        : 0;

    // Calculate void connection
    const voidValues = patterns.map((p) => (p.voidConnected ? 1 : 0));
    analysis.voidConnection =
      voidValues.length > 0
        ? voidValues.reduce((a: number, b: number) => a + b, 0) /
          voidValues.length
        : 0;

    // Generate insights
    analysis.insights = this.generateConsciousnessInsights(analysis);

    return analysis;
  }

  /**
   * Extract vortex patterns from data
   */
  public extractVortexPatterns(data: any): any {
    const vortexPatterns = {
      sequence: VORTEX_CONSTANTS.VORTEX_SEQUENCE,
      goldenRatio: VORTEX_CONSTANTS.GOLDEN_RATIO,
      wAxis: VORTEX_CONSTANTS.W_AXIS,
      polarMates: VORTEX_CONSTANTS.POLAR_MATES,
      familyGroups: VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS,
      patterns: [] as any[],
    };

    // Extract numerical patterns
    if (Array.isArray(data)) {
      for (const item of data) {
        if (typeof item === "number") {
          const vortexTransform = MathUtils.applyVortexTransform(item);
          const digitalRoot = ConstantsUtils.digitalRoot(item);
          const polarMate = ConstantsUtils.getPolarMate(item);
          const familyGroup = ConstantsUtils.getFamilyGroup(item);
          const isWAxis = ConstantsUtils.isWAxisNumber(item);

          vortexPatterns.patterns.push({
            original: item,
            vortexTransform,
            digitalRoot,
            polarMate,
            familyGroup,
            isWAxis,
            resonance: this.calculateVortexResonance(item),
          });
        }
      }
    }

    return vortexPatterns;
  }

  /**
   * Analyze emergence patterns
   */
  public analyzeEmergencePatterns(apps: any[]): any {
    const analysis = {
      totalApps: apps.length,
      consciousnessDistribution: {} as { [key: string]: number },
      vortexStrengthDistribution: {} as { [key: string]: number },
      toroidalFlowPercentage: 0,
      voidConnectionPercentage: 0,
      averageResonance: 0,
      networkComplexity: 0,
      insights: [] as string[],
    };

    if (apps.length === 0) return analysis;

    // Analyze consciousness distribution
    for (const app of apps) {
      const level = Math.floor(app.consciousnessLevel || 0);
      analysis.consciousnessDistribution[level] =
        (analysis.consciousnessDistribution[level] || 0) + 1;
    }

    // Analyze vortex strength distribution
    for (const app of apps) {
      const strength = Math.floor(app.vortexStrength || 0);
      analysis.vortexStrengthDistribution[strength] =
        (analysis.vortexStrengthDistribution[strength] || 0) + 1;
    }

    // Calculate percentages
    const toroidalCount = apps.filter((app) => app.toroidalFlow).length;
    analysis.toroidalFlowPercentage = (toroidalCount / apps.length) * 100;

    const voidCount = apps.filter((app) => app.voidConnected).length;
    analysis.voidConnectionPercentage = (voidCount / apps.length) * 100;

    // Calculate average resonance
    const resonances = apps.map((app) => app.resonance || 0);
    analysis.averageResonance =
      resonances.length > 0
        ? resonances.reduce((a, b) => a + b, 0) / resonances.length
        : 0;

    // Calculate network complexity
    const totalLinks = apps.reduce(
      (sum, app) => sum + (app.linkedApps?.length || 0),
      0,
    );
    analysis.networkComplexity = totalLinks / apps.length;

    // Generate insights
    analysis.insights = this.generateEmergenceInsights(analysis);

    return analysis;
  }

  /**
   * Get pattern recognition history
   */
  public getRecognitionHistory(): PatternResult[] {
    return [...this.recognitionHistory];
  }

  /**
   * Clear recognition history
   */
  public clearHistory(): void {
    this.recognitionHistory = [];
    this.emit("historyCleared");
  }

  /**
   * Get pattern statistics
   */
  public getPatternStatistics(): any {
    const stats = {
      totalPatterns: this.patterns.size,
      categories: {} as { [key: string]: number },
      totalRecognitions: this.recognitionHistory.length,
      averageConfidence: 0,
      mostRecognizedPatterns: [] as any[],
    };

    // Count patterns by category
    for (const pattern of this.patterns.values()) {
      stats.categories[pattern.category] =
        (stats.categories[pattern.category] || 0) + 1;
    }

    // Calculate average confidence
    if (this.recognitionHistory.length > 0) {
      const totalConfidence = this.recognitionHistory.reduce(
        (sum, result) => sum + result.confidence,
        0,
      );
      stats.averageConfidence =
        totalConfidence / this.recognitionHistory.length;
    }

    // Find most recognized patterns
    const patternCounts = new Map<string, number>();
    for (const result of this.recognitionHistory) {
      patternCounts.set(
        result.pattern,
        (patternCounts.get(result.pattern) || 0) + 1,
      );
    }

    stats.mostRecognizedPatterns = Array.from(patternCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pattern, count]) => ({ pattern, count }));

    return stats;
  }

  /**
   * Initialize metaphysical patterns from centralized COIL system
   */
  private initializePatterns(): void {
    // Import all patterns from the centralized COIL system
    COIL_PATTERNS.forEach((coilPattern) => {
      this.addPattern({
        name: coilPattern.name,
        signature: coilPattern.signature,
        category: coilPattern.category as PatternCategory,
        context: coilPattern.context,
        weight: coilPattern.weight || 0.5,
        resonanceFactors: coilPattern.resonanceFactors || [],
      });
    });
  }

  /**
   * Add a new pattern
   */
  private addPattern(pattern: MetaphysicalPattern): void {
    this.patterns.set(pattern.name, pattern);
  }

  /**
   * Calculate pattern confidence
   */
  private calculatePatternConfidence(
    input: any,
    pattern: MetaphysicalPattern,
    context: PatternContext,
  ): number {
    let baseConfidence = 0;

    // Test pattern signature
    if (typeof pattern.signature === "function") {
      baseConfidence = pattern.signature(input) ? 0.8 : 0;
    } else {
      const inputStr = String(input);
      baseConfidence = pattern.signature.test(inputStr) ? 0.8 : 0;
    }

    if (baseConfidence === 0) return 0;

    // Apply context factors
    let contextMultiplier = 1.0;

    // Consciousness level factor
    if (pattern.resonanceFactors.includes("consciousness_level")) {
      contextMultiplier *= context.consciousnessLevel;
    }

    // Vortex strength factor
    if (pattern.resonanceFactors.includes("vortex_strength")) {
      contextMultiplier *= context.vortexStrength / 10; // Normalize to 0-1
    }

    // Field strength factor
    if (pattern.resonanceFactors.includes("field_intensity")) {
      contextMultiplier *= context.fieldStrength;
    }

    // Toroidal flow factor
    if (pattern.resonanceFactors.includes("toroidal_flow")) {
      contextMultiplier *= context.toroidalFlow ? 1.2 : 0.8;
    }

    // Void connection factor
    if (pattern.resonanceFactors.includes("void_connection")) {
      contextMultiplier *= context.voidConnected ? 1.3 : 0.7;
    }

    return MathUtils.clamp(
      baseConfidence * pattern.weight * contextMultiplier,
      0,
      1,
    );
  }

  /**
   * Extract pattern metadata
   */
  private extractPatternMetadata(
    input: any,
    pattern: MetaphysicalPattern,
  ): any {
    const metadata: any = {
      patternName: pattern.name,
      category: pattern.category,
      context: pattern.context,
      weight: pattern.weight,
    };

    // Extract numerical data if present
    if (typeof input === "number") {
      metadata.numericalValue = input;
      metadata.vortexTransform = MathUtils.applyVortexTransform(input);
      metadata.polarMate = ConstantsUtils.getPolarMate(input);
      metadata.familyGroup = ConstantsUtils.getFamilyGroup(input);
      metadata.isWAxis = ConstantsUtils.isWAxisNumber(input);
    }

    return metadata;
  }

  /**
   * Calculate vortex resonance for a number
   */
  private calculateVortexResonance(num: number): number {
    const vortexTransform = MathUtils.applyVortexTransform(num);
    const isWAxis = ConstantsUtils.isWAxisNumber(num);

    let resonance = 0.5; // Base resonance

    // Enhance resonance for vortex sequence numbers
    if (VORTEX_CONSTANTS.VORTEX_SEQUENCE.includes(num as any)) {
      resonance += 0.3;
    }

    // Enhance resonance for W-Axis numbers
    if (isWAxis) {
      resonance += 0.2;
    }

    // Enhance resonance for golden ratio relationships
    const goldenRatio = VORTEX_CONSTANTS.GOLDEN_RATIO;
    if (MathUtils.approximatelyEqual(num / vortexTransform, goldenRatio, 0.1)) {
      resonance += 0.2;
    }

    return MathUtils.clamp(resonance, 0, 1);
  }

  /**
   * Generate consciousness insights
   */
  private generateConsciousnessInsights(analysis: any): string[] {
    const insights: string[] = [];

    if (analysis.averageIntensity > 0.7) {
      insights.push(
        "High consciousness intensity indicates strong awareness patterns",
      );
    }

    if (analysis.resonanceScore > 0.6) {
      insights.push("Strong resonance suggests harmonious consciousness flow");
    }

    if (analysis.vortexAlignment > 0.8) {
      insights.push("Excellent vortex alignment indicates optimal energy flow");
    }

    if (analysis.toroidalFlow > 0.9) {
      insights.push(
        "Strong toroidal flow suggests unified consciousness geometry",
      );
    }

    if (analysis.voidConnection > 0.5) {
      insights.push("Void connection indicates access to infinite potential");
    }

    return insights;
  }

  /**
   * Generate emergence insights
   */
  private generateEmergenceInsights(analysis: any): string[] {
    const insights: string[] = [];

    if (analysis.toroidalFlowPercentage > 80) {
      insights.push("High toroidal flow indicates strong emergence patterns");
    }

    if (analysis.voidConnectionPercentage > 60) {
      insights.push(
        "Strong void connection suggests deep emergence from source",
      );
    }

    if (analysis.averageResonance > 0.7) {
      insights.push("High average resonance indicates harmonious emergence");
    }

    if (analysis.networkComplexity > 2) {
      insights.push("Complex network suggests rich interconnection patterns");
    }

    return insights;
  }
}
