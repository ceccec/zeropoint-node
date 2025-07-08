/**
 * Pattern Extraction Module
 * Exports extractLearningPatterns and addToPattern for analytics.
 */

function addToPattern(obj, key) {
  obj[key] = (obj[key] || 0) + 1;
}

function extractLearningPatterns(commit, patterns) {
  const message = commit.message.toLowerCase();
  if (message.includes('learning') || message.includes('learn')) {
    patterns.push({
      type: 'explicit_learning',
      commit: commit.hash,
      message: commit.message,
      date: commit.date
    });
  }
  if (message.includes('test') && message.includes('fix')) {
    patterns.push({
      type: 'test_driven_fix',
      commit: commit.hash,
      message: commit.message,
      date: commit.date
    });
  }
  if (message.includes('refactor') && message.includes('improve')) {
    patterns.push({
      type: 'iterative_improvement',
      commit: commit.hash,
      message: commit.message,
      date: commit.date
    });
  }
}

module.exports = { addToPattern, extractLearningPatterns }; 