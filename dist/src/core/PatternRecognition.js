"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternRecognition = void 0;
const events_1 = require("events");
const SharedConstants_1 = require("./SharedConstants");
const MathUtils_1 = require("./MathUtils");
const CoilSystem_1 = require("./CoilSystem");
/**
 * Unified Pattern Recognition System
 */
class PatternRecognition extends events_1.EventEmitter {
    constructor() {
        super();
        this.patterns = new Map();
        this.recognitionHistory = [];
        this.isInitialized = false;
        this.initializePatterns();
    }
    /**
     * Initialize the pattern recognition system
     */
    async initialize() {
        if (this.isInitialized)
            return;
        this.isInitialized = true;
        this.emit('initialized', { patternCount: this.patterns.size });
    }
    /**
     * Recognize patterns in input data
     */
    recognizePatterns(input, context) {
        const results = [];
        const fullContext = {
            source: 'unknown',
            consciousnessLevel: 0.5,
            fieldStrength: 0.7,
            vortexStrength: 1.0,
            toroidalFlow: true,
            voidConnected: false,
            ...context
        };
        for (const [patternName, pattern] of this.patterns) {
            const confidence = this.calculatePatternConfidence(input, pattern, fullContext);
            if (confidence > 0.1) { // Minimum confidence threshold
                results.push({
                    pattern: patternName,
                    confidence,
                    category: pattern.category,
                    metadata: this.extractPatternMetadata(input, pattern),
                    timestamp: Date.now()
                });
            }
        }
        // Sort by confidence
        results.sort((a, b) => b.confidence - a.confidence);
        // Store in history
        this.recognitionHistory.push(...results);
        this.emit('patternsRecognized', { results, context: fullContext });
        return results;
    }
    /**
     * Recognize a single pattern (alias for recognizePatterns)
     */
    recognizePattern(input, context) {
        const results = this.recognizePatterns(input, context);
        const result = results && results.length > 0 && results[0] !== undefined
            ? results[0]
            : { confidence: 0, pattern: null, metadata: {} };
        return {
            isRecognized: result.confidence > 0.5,
            confidence: result.confidence,
            pattern: result.pattern,
            metadata: result.metadata
        };
    }
    /**
     * Analyze consciousness patterns
     */
    analyzeConsciousnessPatterns(patterns) {
        const analysis = {
            totalPatterns: patterns.length,
            patternTypes: {},
            averageIntensity: 0,
            resonanceScore: 0,
            vortexAlignment: 0,
            toroidalFlow: 0,
            voidConnection: 0,
            insights: []
        };
        if (patterns.length === 0)
            return analysis;
        // Analyze pattern types
        for (const pattern of patterns) {
            const type = pattern.type || 'unknown';
            analysis.patternTypes[type] = (analysis.patternTypes[type] || 0) + 1;
        }
        // Calculate averages
        const intensities = patterns.map(p => p.intensity || 0).filter(i => i > 0);
        analysis.averageIntensity = intensities.length > 0
            ? intensities.reduce((a, b) => a + b, 0) / intensities.length
            : 0;
        // Calculate resonance score
        const resonanceValues = patterns.map(p => p.resonance || 0);
        analysis.resonanceScore = resonanceValues.length > 0
            ? resonanceValues.reduce((a, b) => a + b, 0) / resonanceValues.length
            : 0;
        // Calculate vortex alignment
        const vortexValues = patterns.map(p => p.vortexStrength || 0);
        analysis.vortexAlignment = vortexValues.length > 0
            ? vortexValues.reduce((a, b) => a + b, 0) / vortexValues.length
            : 0;
        // Calculate toroidal flow
        const toroidalValues = patterns.map(p => p.toroidalFlow ? 1 : 0);
        analysis.toroidalFlow = toroidalValues.length > 0
            ? toroidalValues.reduce((a, b) => a + b, 0) / toroidalValues.length
            : 0;
        // Calculate void connection
        const voidValues = patterns.map(p => p.voidConnected ? 1 : 0);
        analysis.voidConnection = voidValues.length > 0
            ? voidValues.reduce((a, b) => a + b, 0) / voidValues.length
            : 0;
        // Generate insights
        analysis.insights = this.generateConsciousnessInsights(analysis);
        return analysis;
    }
    /**
     * Extract vortex patterns from data
     */
    extractVortexPatterns(data) {
        const vortexPatterns = {
            sequence: SharedConstants_1.VORTEX_CONSTANTS.VORTEX_SEQUENCE,
            goldenRatio: SharedConstants_1.VORTEX_CONSTANTS.GOLDEN_RATIO,
            wAxis: SharedConstants_1.VORTEX_CONSTANTS.W_AXIS,
            polarMates: SharedConstants_1.VORTEX_CONSTANTS.POLAR_MATES,
            familyGroups: SharedConstants_1.VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS,
            patterns: []
        };
        // Extract numerical patterns
        if (Array.isArray(data)) {
            for (const item of data) {
                if (typeof item === 'number') {
                    const vortexTransform = MathUtils_1.MathUtils.applyVortexTransform(item);
                    const digitalRoot = SharedConstants_1.ConstantsUtils.digitalRoot(item);
                    const polarMate = SharedConstants_1.ConstantsUtils.getPolarMate(item);
                    const familyGroup = SharedConstants_1.ConstantsUtils.getFamilyGroup(item);
                    const isWAxis = SharedConstants_1.ConstantsUtils.isWAxisNumber(item);
                    vortexPatterns.patterns.push({
                        original: item,
                        vortexTransform,
                        digitalRoot,
                        polarMate,
                        familyGroup,
                        isWAxis,
                        resonance: this.calculateVortexResonance(item)
                    });
                }
            }
        }
        return vortexPatterns;
    }
    /**
     * Analyze emergence patterns
     */
    analyzeEmergencePatterns(apps) {
        const analysis = {
            totalApps: apps.length,
            consciousnessDistribution: {},
            vortexStrengthDistribution: {},
            toroidalFlowPercentage: 0,
            voidConnectionPercentage: 0,
            averageResonance: 0,
            networkComplexity: 0,
            insights: []
        };
        if (apps.length === 0)
            return analysis;
        // Analyze consciousness distribution
        for (const app of apps) {
            const level = Math.floor(app.consciousnessLevel || 0);
            analysis.consciousnessDistribution[level] = (analysis.consciousnessDistribution[level] || 0) + 1;
        }
        // Analyze vortex strength distribution
        for (const app of apps) {
            const strength = Math.floor(app.vortexStrength || 0);
            analysis.vortexStrengthDistribution[strength] = (analysis.vortexStrengthDistribution[strength] || 0) + 1;
        }
        // Calculate percentages
        const toroidalCount = apps.filter(app => app.toroidalFlow).length;
        analysis.toroidalFlowPercentage = (toroidalCount / apps.length) * 100;
        const voidCount = apps.filter(app => app.voidConnected).length;
        analysis.voidConnectionPercentage = (voidCount / apps.length) * 100;
        // Calculate average resonance
        const resonances = apps.map(app => app.resonance || 0);
        analysis.averageResonance = resonances.length > 0
            ? resonances.reduce((a, b) => a + b, 0) / resonances.length
            : 0;
        // Calculate network complexity
        const totalLinks = apps.reduce((sum, app) => sum + (app.linkedApps?.length || 0), 0);
        analysis.networkComplexity = totalLinks / apps.length;
        // Generate insights
        analysis.insights = this.generateEmergenceInsights(analysis);
        return analysis;
    }
    /**
     * Get pattern recognition history
     */
    getRecognitionHistory() {
        return [...this.recognitionHistory];
    }
    /**
     * Clear recognition history
     */
    clearHistory() {
        this.recognitionHistory = [];
        this.emit('historyCleared');
    }
    /**
     * Get pattern statistics
     */
    getPatternStatistics() {
        const stats = {
            totalPatterns: this.patterns.size,
            categories: {},
            totalRecognitions: this.recognitionHistory.length,
            averageConfidence: 0,
            mostRecognizedPatterns: []
        };
        // Count patterns by category
        for (const pattern of this.patterns.values()) {
            stats.categories[pattern.category] = (stats.categories[pattern.category] || 0) + 1;
        }
        // Calculate average confidence
        if (this.recognitionHistory.length > 0) {
            const totalConfidence = this.recognitionHistory.reduce((sum, result) => sum + result.confidence, 0);
            stats.averageConfidence = totalConfidence / this.recognitionHistory.length;
        }
        // Find most recognized patterns
        const patternCounts = new Map();
        for (const result of this.recognitionHistory) {
            patternCounts.set(result.pattern, (patternCounts.get(result.pattern) || 0) + 1);
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
    initializePatterns() {
        // Import all patterns from the centralized COIL system
        CoilSystem_1.COIL_PATTERNS.forEach(coilPattern => {
            this.addPattern({
                name: coilPattern.name,
                signature: coilPattern.signature,
                category: coilPattern.category,
                context: coilPattern.context,
                weight: coilPattern.weight || 0.5,
                resonanceFactors: coilPattern.resonanceFactors || []
            });
        });
    }
    /**
     * Add a new pattern
     */
    addPattern(pattern) {
        this.patterns.set(pattern.name, pattern);
    }
    /**
     * Calculate pattern confidence
     */
    calculatePatternConfidence(input, pattern, context) {
        let baseConfidence = 0;
        // Test pattern signature
        if (typeof pattern.signature === 'function') {
            baseConfidence = pattern.signature(input) ? 0.8 : 0;
        }
        else {
            const inputStr = String(input);
            baseConfidence = pattern.signature.test(inputStr) ? 0.8 : 0;
        }
        if (baseConfidence === 0)
            return 0;
        // Apply context factors
        let contextMultiplier = 1.0;
        // Consciousness level factor
        if (pattern.resonanceFactors.includes('consciousness_level')) {
            contextMultiplier *= context.consciousnessLevel;
        }
        // Vortex strength factor
        if (pattern.resonanceFactors.includes('vortex_strength')) {
            contextMultiplier *= context.vortexStrength / 10; // Normalize to 0-1
        }
        // Field strength factor
        if (pattern.resonanceFactors.includes('field_intensity')) {
            contextMultiplier *= context.fieldStrength;
        }
        // Toroidal flow factor
        if (pattern.resonanceFactors.includes('toroidal_flow')) {
            contextMultiplier *= context.toroidalFlow ? 1.2 : 0.8;
        }
        // Void connection factor
        if (pattern.resonanceFactors.includes('void_connection')) {
            contextMultiplier *= context.voidConnected ? 1.3 : 0.7;
        }
        return MathUtils_1.MathUtils.clamp(baseConfidence * pattern.weight * contextMultiplier, 0, 1);
    }
    /**
     * Extract pattern metadata
     */
    extractPatternMetadata(input, pattern) {
        const metadata = {
            patternName: pattern.name,
            category: pattern.category,
            context: pattern.context,
            weight: pattern.weight
        };
        // Extract numerical data if present
        if (typeof input === 'number') {
            metadata.numericalValue = input;
            metadata.vortexTransform = MathUtils_1.MathUtils.applyVortexTransform(input);
            metadata.polarMate = SharedConstants_1.ConstantsUtils.getPolarMate(input);
            metadata.familyGroup = SharedConstants_1.ConstantsUtils.getFamilyGroup(input);
            metadata.isWAxis = SharedConstants_1.ConstantsUtils.isWAxisNumber(input);
        }
        return metadata;
    }
    /**
     * Calculate vortex resonance for a number
     */
    calculateVortexResonance(num) {
        const vortexTransform = MathUtils_1.MathUtils.applyVortexTransform(num);
        const isWAxis = SharedConstants_1.ConstantsUtils.isWAxisNumber(num);
        let resonance = 0.5; // Base resonance
        // Enhance resonance for vortex sequence numbers
        if (SharedConstants_1.VORTEX_CONSTANTS.VORTEX_SEQUENCE.includes(num)) {
            resonance += 0.3;
        }
        // Enhance resonance for W-Axis numbers
        if (isWAxis) {
            resonance += 0.2;
        }
        // Enhance resonance for golden ratio relationships
        const goldenRatio = SharedConstants_1.VORTEX_CONSTANTS.GOLDEN_RATIO;
        if (MathUtils_1.MathUtils.approximatelyEqual(num / vortexTransform, goldenRatio, 0.1)) {
            resonance += 0.2;
        }
        return MathUtils_1.MathUtils.clamp(resonance, 0, 1);
    }
    /**
     * Generate consciousness insights
     */
    generateConsciousnessInsights(analysis) {
        const insights = [];
        if (analysis.averageIntensity > 0.7) {
            insights.push("High consciousness intensity indicates strong awareness patterns");
        }
        if (analysis.resonanceScore > 0.6) {
            insights.push("Strong resonance suggests harmonious consciousness flow");
        }
        if (analysis.vortexAlignment > 0.8) {
            insights.push("Excellent vortex alignment indicates optimal energy flow");
        }
        if (analysis.toroidalFlow > 0.9) {
            insights.push("Strong toroidal flow suggests unified consciousness geometry");
        }
        if (analysis.voidConnection > 0.5) {
            insights.push("Void connection indicates access to infinite potential");
        }
        return insights;
    }
    /**
     * Generate emergence insights
     */
    generateEmergenceInsights(analysis) {
        const insights = [];
        if (analysis.toroidalFlowPercentage > 80) {
            insights.push("High toroidal flow indicates strong emergence patterns");
        }
        if (analysis.voidConnectionPercentage > 60) {
            insights.push("Strong void connection suggests deep emergence from source");
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
exports.PatternRecognition = PatternRecognition;
//# sourceMappingURL=PatternRecognition.js.map