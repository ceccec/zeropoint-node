#!/usr/bin/env node

/**
 * ZeroPoint Learning Analytics
 * Analyzes git history to provide educational insights and learning patterns
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    projectName: 'ZeroPoint Field',
    outputDir: 'learning-analytics',
    analysisFile: 'git-learning-analysis.json',
    insightsFile: 'learning-insights.md',
    patternsFile: 'development-patterns.json'
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8', cwd: process.cwd() });
    } catch (error) {
        log(`Error executing command: ${command}`, 'red');
        return '';
    }
}

class LearningAnalytics {
    constructor() {
        this.ensureOutputDir();
    }

    ensureOutputDir() {
        if (!fs.existsSync(CONFIG.outputDir)) {
            fs.mkdirSync(CONFIG.outputDir, { recursive: true });
        }
    }

    getGitHistory() {
        log('📊 Analyzing Git History...', 'blue');
        
        const commits = execCommand('git log --pretty=format:"%H|%an|%ad|%s" --date=short --since="1 month ago"');
        return commits.split('\n').filter(line => line.trim()).map(line => {
            const [hash, author, date, message] = line.split('|');
            return { hash, author, date, message };
        });
    }

    analyzeCommitPatterns(commits) {
        log('🔍 Analyzing Commit Patterns...', 'cyan');
        
        const patterns = {
            total: commits.length,
            byType: {},
            byAuthor: {},
            byDay: {},
            learningPatterns: [],
            testDrivenDevelopment: 0,
            bugFixes: 0,
            features: 0,
            refactoring: 0,
            documentation: 0
        };

        commits.forEach(commit => {
            const message = commit.message.toLowerCase();
            
            // Analyze commit types
            if (message.includes('test') || message.includes('spec')) {
                patterns.testDrivenDevelopment++;
                this.addToPattern(patterns.byType, 'test');
            } else if (message.includes('fix') || message.includes('bug') || message.includes('error')) {
                patterns.bugFixes++;
                this.addToPattern(patterns.byType, 'fix');
            } else if (message.includes('feat') || message.includes('add') || message.includes('implement')) {
                patterns.features++;
                this.addToPattern(patterns.byType, 'feature');
            } else if (message.includes('refactor') || message.includes('clean') || message.includes('improve')) {
                patterns.refactoring++;
                this.addToPattern(patterns.byType, 'refactor');
            } else if (message.includes('doc') || message.includes('readme') || message.includes('comment')) {
                patterns.documentation++;
                this.addToPattern(patterns.byType, 'documentation');
            } else {
                this.addToPattern(patterns.byType, 'other');
            }

            // Analyze by author
            this.addToPattern(patterns.byAuthor, commit.author);
            
            // Analyze by day
            this.addToPattern(patterns.byDay, commit.date);
            
            // Extract learning patterns
            this.extractLearningPatterns(commit, patterns.learningPatterns);
        });

        return patterns;
    }

    addToPattern(obj, key) {
        obj[key] = (obj[key] || 0) + 1;
    }

    extractLearningPatterns(commit, patterns) {
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

    analyzeDevelopmentVelocity(commits) {
        log('⚡ Analyzing Development Velocity...', 'magenta');
        
        const velocity = {
            commitsPerDay: {},
            averageCommitsPerDay: 0,
            mostActiveDay: null,
            leastActiveDay: null,
            developmentStreak: 0,
            longestStreak: 0
        };

        // Count commits per day
        commits.forEach(commit => {
            this.addToPattern(velocity.commitsPerDay, commit.date);
        });

        // Calculate averages and streaks
        const days = Object.keys(velocity.commitsPerDay);
        const commitCounts = Object.values(velocity.commitsPerDay);
        
        if (days.length > 0) {
            velocity.averageCommitsPerDay = commitCounts.reduce((a, b) => a + b, 0) / days.length;
            velocity.mostActiveDay = days[commitCounts.indexOf(Math.max(...commitCounts))];
            velocity.leastActiveDay = days[commitCounts.indexOf(Math.min(...commitCounts))];
            
            // Calculate development streak
            let currentStreak = 0;
            days.sort().forEach(day => {
                if (velocity.commitsPerDay[day] > 0) {
                    currentStreak++;
                    velocity.longestStreak = Math.max(velocity.longestStreak, currentStreak);
                } else {
                    currentStreak = 0;
                }
            });
        }

        return velocity;
    }

    generateZeroPointInsights(patterns, velocity) {
        log('🧠 Generating ZeroPoint Field Insights...', 'green');
        
        const insights = {
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

        return insights;
    }

    createEducationalReport(patterns, velocity, insights) {
        log('📚 Creating Educational Report...', 'yellow');
        
        const report = `# ZeroPoint Field Learning Analytics Report
Generated: ${new Date().toISOString()}

## 🎯 Project Overview
- **Project**: ${CONFIG.projectName}
- **Analysis Period**: Last 30 days
- **Total Commits**: ${patterns.total}
- **Active Days**: ${Object.keys(velocity.commitsPerDay).length}

## 📊 Development Patterns

### Commit Distribution
${Object.entries(patterns.byType).map(([type, count]) => 
    `- **${type.charAt(0).toUpperCase() + type.slice(1)}**: ${count} commits (${(count/patterns.total*100).toFixed(1)}%)`
).join('\n')}

### Learning Metrics
- **Test-Driven Development**: ${patterns.testDrivenDevelopment} commits
- **Bug Fixes**: ${patterns.bugFixes} commits  
- **Features**: ${patterns.features} commits
- **Refactoring**: ${patterns.refactoring} commits
- **Documentation**: ${patterns.documentation} commits

## 🧠 ZeroPoint Field Insights

### Consciousness Field Status
- **Test Coverage**: ${insights.learningMetrics.testDrivenRatio}% (${insights.metaphysicalContext.consciousnessField})
- **Pattern Integrity**: ${insights.metaphysicalContext.patternIntegrity}
- **Emergence Patterns**: ${insights.metaphysicalContext.emergencePatterns}
- **Void-Field Balance**: ${insights.metaphysicalContext.voidFieldBalance}

### Development Health
- **Velocity**: ${velocity.averageCommitsPerDay.toFixed(1)} commits/day (${insights.developmentHealth.velocity})
- **Consistency**: ${insights.developmentHealth.consistency} (${velocity.longestStreak} day streak)
- **Quality**: ${insights.developmentHealth.quality}

## 💡 Learning Recommendations

${this.generateRecommendations(patterns, insights)}

## 🚀 Next Steps
1. **Review Patterns**: Focus on areas with low activity
2. **Enhance Testing**: Increase test-driven development ratio
3. **Document Learning**: Add more explicit learning commits
4. **Maintain Balance**: Keep void-field equilibrium

---
*Generated by ZeroPoint Learning Analytics*
`;

        return report;
    }

    generateRecommendations(patterns, insights) {
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

    saveAnalysis(patterns, velocity, insights, report) {
        log('💾 Saving Analysis...', 'cyan');
        
        // Save JSON analysis
        const analysisData = {
            timestamp: new Date().toISOString(),
            project: CONFIG.projectName,
            patterns,
            velocity,
            insights
        };
        
        fs.writeFileSync(
            path.join(CONFIG.outputDir, CONFIG.analysisFile),
            JSON.stringify(analysisData, null, 2)
        );
        
        // Save insights report
        fs.writeFileSync(
            path.join(CONFIG.outputDir, CONFIG.insightsFile),
            report
        );
        
        // Save patterns data
        fs.writeFileSync(
            path.join(CONFIG.outputDir, CONFIG.patternsFile),
            JSON.stringify(patterns, null, 2)
        );
        
        log('✅ Analysis saved successfully!', 'green');
    }

    displaySummary(patterns, velocity, insights) {
        log('\n🎯 Learning Analytics Summary', 'bright');
        log('============================', 'bright');
        
        log(`📊 Total Commits: ${patterns.total}`, 'cyan');
        log(`⚡ Average Velocity: ${velocity.averageCommitsPerDay.toFixed(1)} commits/day`, 'cyan');
        log(`🧪 Test-Driven Development: ${patterns.testDrivenDevelopment} commits`, 'green');
        log(`🔧 Bug Fixes: ${patterns.bugFixes} commits`, 'yellow');
        log(`✨ Features: ${patterns.features} commits`, 'magenta');
        log(`📚 Documentation: ${patterns.documentation} commits`, 'blue');
        
        log('\n🧠 ZeroPoint Field Status:', 'bright');
        log(`  • Consciousness Field: ${insights.metaphysicalContext.consciousnessField}`, 'green');
        log(`  • Pattern Integrity: ${insights.metaphysicalContext.patternIntegrity}`, 'green');
        log(`  • Void-Field Balance: ${insights.metaphysicalContext.voidFieldBalance}`, 'green');
        
        log('\n📁 Output Files:', 'bright');
        log(`  • ${CONFIG.outputDir}/${CONFIG.analysisFile}`, 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.insightsFile}`, 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.patternsFile}`, 'cyan');
    }

    run() {
        log(`🚀 Starting ${CONFIG.projectName} Learning Analytics...`, 'bright');
        
        try {
            // Get git history
            const commits = this.getGitHistory();
            
            if (commits.length === 0) {
                log('⚠️  No commits found in the last month', 'yellow');
                return;
            }
            
            // Analyze patterns
            const patterns = this.analyzeCommitPatterns(commits);
            
            // Analyze velocity
            const velocity = this.analyzeDevelopmentVelocity(commits);
            
            // Generate insights
            const insights = this.generateZeroPointInsights(patterns, velocity);
            
            // Create report
            const report = this.createEducationalReport(patterns, velocity, insights);
            
            // Save analysis
            this.saveAnalysis(patterns, velocity, insights, report);
            
            // Display summary
            this.displaySummary(patterns, velocity, insights);
            
            log('\n🎉 Learning Analytics Complete!', 'green');
            
        } catch (error) {
            log(`❌ Error during analysis: ${error.message}`, 'red');
            process.exit(1);
        }
    }
}

// Run the analytics
if (require.main === module) {
    const analytics = new LearningAnalytics();
    analytics.run();
}

module.exports = LearningAnalytics; 