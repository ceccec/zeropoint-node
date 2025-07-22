/**
 * Insight Generation Module
 * Exports generateZeroPointInsights for analytics.
 */

function generateZeroPointInsights(patterns, velocity) {
  return {
    metaphysicalContext: {
      consciousnessField: patterns.testDrivenDevelopment > patterns.bugFixes ? 'strong' : 'developing',
      patternIntegrity: patterns.refactoring > 0 ? 'maintained' : 'needs_attention',
      emergencePatterns: patterns.features > 0 ? 'active' : 'stable',
      voidFieldBalance: patterns.bugFixes < patterns.total * 0.3 ? 'balanced' : 'needs_void_work'
    },
    learningMetrics: {
      testDrivenRatio: (patterns.testDrivenDevelopment / patterns.total * 100).toFixed(1),
      fixToFeatureRatio: patterns.features > 0 ? (patterns.bugFixes / patterns.features).toFixed(2) : 'N/A',
      documentationRatio: (patterns.documentation / patterns.total * 100).toFixed(1),
      learningPatterns: patterns.learningPatterns.length
    },
    developmentHealth: {
      velocity: velocity.averageCommitsPerDay > 1 ? 'active' : 'steady',
      consistency: velocity.longestStreak > 3 ? 'consistent' : 'intermittent',
      quality: patterns.bugFixes < patterns.total * 0.2 ? 'high' : 'improving'
    }
  };
}

module.exports = { generateZeroPointInsights }; 