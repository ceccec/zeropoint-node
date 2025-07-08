#!/usr/bin/env node

/**
 * ZeroPoint Learning Analytics
 * Analyzes git history to provide educational insights and learning patterns
 * Now includes live Git event monitoring for real-time learning
 *
 * Refactor Note (2024-07-08):
 * - Pattern extraction, insight generation, and recommendation logic are now modularized.
 *   See: ./learning-analytics/patternExtraction.js, insightGeneration.js, recommendationEngine.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import ZeroPoint modules for live Git integration
const { ZeroPoint } = require('../dist/src/core/ZeroPoint');
const { gitIntegration } = require('../dist/src/utils/GitIntegration');

// Import modularized pattern extraction, insight generation, and recommendation logic
const patternExtraction = require('../learning-analytics/patternExtraction');
const insightGeneration = require('../learning-analytics/insightGeneration');
const recommendationEngine = require('../learning-analytics/recommendationEngine');

// Configuration
const CONFIG = {
    projectName: 'ZeroPoint Field',
    outputDir: 'learning-analytics',
    analysisFile: 'git-learning-analysis.json',
    insightsFile: 'learning-insights.md',
    patternsFile: 'development-patterns.json',
    liveEventsFile: 'live-git-events.json'
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
        this.liveEvents = [];
        this.zeroPoint = null;
        this.isLiveMonitoring = false;
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
            patternExtraction.extractLearningPatterns(commit, patterns.learningPatterns);
        });

        return patterns;
    }

    addToPattern(obj, key) {
        obj[key] = (obj[key] || 0) + 1;
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

${recommendationEngine.generateRecommendations(patterns, insights)}

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

    /**
     * Start live Git event monitoring
     */
    async startLiveMonitoring() {
        if (this.isLiveMonitoring) return;
        
        try {
            log('🚀 Starting Live Git Event Monitoring...', 'cyan');
            
            // Initialize ZeroPoint for live Git integration
            this.zeroPoint = new ZeroPoint();
            await this.zeroPoint.initialize();
            
            // Subscribe to live Git events
            this.zeroPoint.onGitChange((event) => {
                this.handleLiveGitEvent(event);
            });
            
            this.isLiveMonitoring = true;
            log('✅ Live Git monitoring active', 'green');
            
        } catch (error) {
            log(`❌ Failed to start live monitoring: ${error.message}`, 'red');
        }
    }

    /**
     * Handle live Git events and update analysis
     */
    handleLiveGitEvent(event) {
        const timestamp = new Date().toISOString();
        const eventData = {
            timestamp,
            type: event.type,
            data: event.data
        };
        
        // Store live event
        this.liveEvents.unshift(eventData);
        if (this.liveEvents.length > 100) {
            this.liveEvents.pop(); // Keep only last 100 events
        }
        
        // Log the event
        log(`📝 Live Git Event: ${event.type} - ${JSON.stringify(event.data).substring(0, 100)}...`, 'yellow');
        
        // Update analysis in real-time
        this.updateLiveAnalysis(eventData);
        
        // Save live events to file
        this.saveLiveEvents();
    }

    /**
     * Update analysis based on live Git events
     */
    updateLiveAnalysis(eventData) {
        if (eventData.type === 'commit') {
            const commit = eventData.data;
            
            // Extract learning patterns from live commit
            const learningPattern = this.extractLearningPatternFromCommit(commit);
            if (learningPattern) {
                log(`🧠 Live Learning Pattern: ${learningPattern.type}`, 'magenta');
            }
            
            // Update velocity metrics
            this.updateVelocityMetrics(commit);
        }
    }

    /**
     * Extract learning patterns from a live commit
     */
    extractLearningPatternFromCommit(commit) {
        const message = commit.message.toLowerCase();
        
        if (message.includes('learning') || message.includes('learn')) {
            return {
                type: 'explicit_learning',
                commit: commit.hash,
                message: commit.message,
                timestamp: new Date().toISOString()
            };
        }
        
        if (message.includes('test') && message.includes('fix')) {
            return {
                type: 'test_driven_fix',
                commit: commit.hash,
                message: commit.message,
                timestamp: new Date().toISOString()
            };
        }
        
        if (message.includes('refactor') && message.includes('improve')) {
            return {
                type: 'iterative_improvement',
                commit: commit.hash,
                message: commit.message,
                timestamp: new Date().toISOString()
            };
        }
        
        return null;
    }

    /**
     * Update velocity metrics with live commit data
     */
    updateVelocityMetrics(commit) {
        const today = new Date().toISOString().split('T')[0];
        
        // This would update the velocity analysis in real-time
        // For now, we'll log the update
        log(`⚡ Velocity Update: New commit on ${today}`, 'blue');
    }

    /**
     * Save live events to file
     */
    saveLiveEvents() {
        const filePath = path.join(CONFIG.outputDir, CONFIG.liveEventsFile);
        fs.writeFileSync(filePath, JSON.stringify({
            timestamp: new Date().toISOString(),
            totalEvents: this.liveEvents.length,
            events: this.liveEvents
        }, null, 2));
    }

    /**
     * Get live Git status
     */
    async getLiveGitStatus() {
        if (!this.zeroPoint) return null;
        return await this.zeroPoint.getLiveGitStatus();
    }

    /**
     * Get recent commits
     */
    async getRecentCommits(n = 10) {
        if (!this.zeroPoint) return [];
        return await this.zeroPoint.getRecentCommits(n);
    }

    run() {
        log('🚀 Starting ZeroPoint Field Learning Analytics...', 'bright');
        
        // Run traditional analysis
        const commits = this.getGitHistory();
        const patterns = this.analyzeCommitPatterns(commits);
        const velocity = this.analyzeDevelopmentVelocity(commits);
        const insights = this.generateZeroPointInsights(patterns, velocity);
        const report = this.createEducationalReport(patterns, velocity, insights);
        
        this.saveAnalysis(patterns, velocity, insights, report);
        this.displaySummary(patterns, velocity, insights);
        
        // Start live monitoring
        this.startLiveMonitoring();
        
        log('✅ Analysis saved successfully!', 'green');
        log('📁 Output Files:', 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.analysisFile}`, 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.insightsFile}`, 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.patternsFile}`, 'cyan');
        log(`  • ${CONFIG.outputDir}/${CONFIG.liveEventsFile}`, 'cyan');
        
        log('\n🎉 Learning Analytics Complete!', 'bright');
    }
}

// Run the analytics
if (require.main === module) {
    const analytics = new LearningAnalytics();
    analytics.run();
}

module.exports = LearningAnalytics; 