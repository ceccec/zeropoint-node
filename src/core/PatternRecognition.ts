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
  ConstantsUtils,
} from "./SharedConstants";
import { MathUtils } from "./MathUtils";
import { COIL_PATTERNS } from "./CoilSystem";
import { PatternRegistry } from "./PatternRegistry";
import { PatternCategory } from "./SharedConstants";

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
  private patternRegistry: PatternRegistry;

  constructor(patternRegistry?: PatternRegistry) {
    super();
    this.patternRegistry = patternRegistry || new PatternRegistry();
    this.initializePatterns();
  }

  /**
   * Initialize the pattern recognition system
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize pattern registry
    await this.patternRegistry.initialize();

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

    // Use local patterns first
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

    // Use pattern registry for additional recognition
    const registryMatches = this.patternRegistry.recognizePatterns(input);

    for (const match of registryMatches) {
      if (match.confidence > 0.1) {
        results.push({
          pattern: match.pattern.id ?? "unknown",
          confidence: match.confidence,
          category: match.category as PatternCategory,
          metadata: match.pattern,
          timestamp: Date.now(),
        });
      }
    }

    // Sort by confidence
    results.sort((a, b) => b.confidence - a.confidence);

    // Store in history
    this.recognitionHistory.push(...results);

    // Register recognized patterns with the registry
    for (const result of results) {
      this.patternRegistry.registerPattern(result.metadata, result.category, result.category as any);
    }

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

    analysis.patternTypes = this.calculatePatternTypes(patterns);
    analysis.averageIntensity = this.calculateAverageIntensity(patterns);
    analysis.resonanceScore = this.calculateAverageResonance(patterns);
    analysis.vortexAlignment = this.calculateAverageVortexAlignment(patterns);
    analysis.toroidalFlow = this.calculateAverageToroidalFlow(patterns);
    analysis.voidConnection = this.calculateAverageVoidConnection(patterns);
    analysis.insights = this.generateConsciousnessInsights(analysis);

    return analysis;
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

    analysis.consciousnessDistribution = this.calculateConsciousnessDistribution(apps);
    analysis.vortexStrengthDistribution = this.calculateVortexStrengthDistribution(apps);
    analysis.toroidalFlowPercentage = this.calculateToroidalFlowPercentage(apps);
    analysis.voidConnectionPercentage = this.calculateVoidConnectionPercentage(apps);
    analysis.averageResonance = this.calculateAverageResonance(apps);
    analysis.networkComplexity = this.calculateNetworkComplexity(apps);
    analysis.insights = this.generateEmergenceInsights(analysis);

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
        category: this.mapCoilCategoryToUnified(coilPattern.category),
        context: coilPattern.context,
        weight: coilPattern.weight || 0.5,
        resonanceFactors: coilPattern.resonanceFactors || [],
      });
    });
  }

  /**
   * Map COIL pattern category to unified PatternCategory
   */
  private mapCoilCategoryToUnified(coilCategory: string): PatternCategory {
    const categoryMap: { [key: string]: PatternCategory } = {
      'mathematical': 'mathematical',
      'metaphysical': 'metaphysical',
      'consciousness': 'spiritual',
      'emergence': 'integration',
      'void': 'void',
      'resonance': 'vortex',
      'vortex': 'vortex',
      'family': 'family',
      'polar': 'polar',
      'spiritual': 'spiritual'
    };
    return categoryMap[coilCategory] || 'integration';
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

  /**
   * @private Calculate pattern type distribution
   */
  private calculatePatternTypes(patterns: any[]): { [key: string]: number } {
    const types: { [key: string]: number } = {};
    for (const pattern of patterns) {
      const type = pattern.type || "unknown";
      types[type] = (types[type] || 0) + 1;
    }
    return types;
  }

  /**
   * @private Calculate average intensity
   */
  private calculateAverageIntensity(patterns: any[]): number {
    const intensities = patterns.map((p) => p.intensity || 0).filter((i) => i > 0);
    return intensities.length > 0 ? intensities.reduce((a, b) => a + b, 0) / intensities.length : 0;
  }

  /**
   * @private Calculate average resonance
   */
  private calculateAverageResonance(patterns: any[]): number {
    const resonanceValues = patterns.map((p) => p.resonance || 0);
    return resonanceValues.length > 0 ? resonanceValues.reduce((a, b) => a + b, 0) / resonanceValues.length : 0;
  }

  /**
   * @private Calculate average vortex alignment
   */
  private calculateAverageVortexAlignment(patterns: any[]): number {
    const vortexValues = patterns.map((p) => p.vortexStrength || 0);
    return vortexValues.length > 0 ? vortexValues.reduce((a, b) => a + b, 0) / vortexValues.length : 0;
  }

  /**
   * @private Calculate average toroidal flow
   */
  private calculateAverageToroidalFlow(patterns: any[]): number {
    const toroidalValues = patterns.map((p) => (p.toroidalFlow ? 1 : 0));
    return toroidalValues.length > 0 ? toroidalValues.reduce((a: number, b: number) => a + b, 0) / toroidalValues.length : 0;
  }

  /**
   * @private Calculate average void connection
   */
  private calculateAverageVoidConnection(patterns: any[]): number {
    const voidValues = patterns.map((p) => (p.voidConnected ? 1 : 0));
    return voidValues.length > 0 ? voidValues.reduce((a: number, b: number) => a + b, 0) / voidValues.length : 0;
  }

  /**
   * @private Calculate consciousness distribution
   */
  private calculateConsciousnessDistribution(apps: any[]): { [key: string]: number } {
    const dist: { [key: string]: number } = {};
    for (const app of apps) {
      const level = Math.floor(app.consciousnessLevel || 0);
      dist[level] = (dist[level] || 0) + 1;
    }
    return dist;
  }

  /**
   * @private Calculate vortex strength distribution
   */
  private calculateVortexStrengthDistribution(apps: any[]): { [key: string]: number } {
    const dist: { [key: string]: number } = {};
    for (const app of apps) {
      const strength = Math.floor(app.vortexStrength || 0);
      dist[strength] = (dist[strength] || 0) + 1;
    }
    return dist;
  }

  /**
   * @private Calculate toroidal flow percentage
   */
  private calculateToroidalFlowPercentage(apps: any[]): number {
    const count = apps.filter((app) => app.toroidalFlow).length;
    return (count / apps.length) * 100;
  }

  /**
   * @private Calculate void connection percentage
   */
  private calculateVoidConnectionPercentage(apps: any[]): number {
    const count = apps.filter((app) => app.voidConnected).length;
    return (count / apps.length) * 100;
  }

  /**
   * @private Calculate network complexity
   */
  private calculateNetworkComplexity(apps: any[]): number {
    const totalLinks = apps.reduce((sum, app) => sum + (app.linkedApps?.length || 0), 0);
    return totalLinks / apps.length;
  }
}
