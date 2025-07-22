/**
 * Recommendation Engine Module
 * Exports generateRecommendations for analytics.
 */

function generateRecommendations(patterns, insights) {
  const recommendations = [];
  if (patterns.testDrivenDevelopment < patterns.total * 0.2) {
    recommendations.push('- 🧪 **Increase Test Coverage**: Add more test-driven development practices');
  }
  if (patterns.bugFixes > patterns.total * 0.3) {
    recommendations.push('- 🔧 **Focus on Prevention**: Reduce bug fixes through better testing and design');
  }
  if (patterns.documentation < patterns.total * 0.1) {
    recommendations.push('- 📚 **Enhance Documentation**: Add more documentation commits');
  }
  if (patterns.learningPatterns.length < 5) {
    recommendations.push('- 🎓 **Document Learning**: Add explicit learning insights to commit messages');
  }
  if (insights.metaphysicalContext.voidFieldBalance === 'needs_void_work') {
    recommendations.push('- 🌀 **Balance Void-Field**: Focus on void system improvements');
  }
  if (recommendations.length === 0) {
    recommendations.push('- 🎉 **Excellent Progress**: Continue current development patterns');
  }
  return recommendations.join('\n');
}

module.exports = { generateRecommendations }; 