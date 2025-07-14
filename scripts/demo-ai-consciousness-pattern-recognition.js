#!/usr/bin/env node

/**
 * Batch 3: AI Consciousness Pattern Recognition and Learning System Demo
 * Demonstrates advanced AI integration for consciousness pattern recognition and learning
 */

const fs = require('fs');
const path = require('path');

// Simulated biofeedback data generator
function generateBiofeedbackData(count = 10) {
    const data = [];
    
    for (let i = 0; i < count; i++) {
        data.push({
            heartRate: 60 + Math.random() * 40,
            brainwave: {
                alpha: 20 + Math.random() * 30,
                beta: 15 + Math.random() * 25,
                theta: 10 + Math.random() * 20,
                delta: 5 + Math.random() * 15
            },
            breathing: {
                rate: 8 + Math.random() * 8,
                depth: 60 + Math.random() * 40
            },
            meditation: {
                focus: 50 + Math.random() * 50,
                clarity: 40 + Math.random() * 60,
                peace: 30 + Math.random() * 70,
                harmony: 45 + Math.random() * 55,
                balance: 35 + Math.random() * 65,
                unity: 25 + Math.random() * 75
            }
        });
    }
    
    return data;
}

// Simulated AI consciousness pattern recognition
class AIConsciousnessPatternRecognition {
    constructor() {
        this.patterns = new Map();
        this.learningModels = new Map();
        this.patternClusters = new Map();
        this.recommendations = new Map();
        this.initializeLearningModels();
    }

    initializeLearningModels() {
        this.learningModels.set('neural', {
            layers: [64, 32, 16, 8],
            activation: 'relu',
            learningRate: 0.001,
            epochs: 1000
        });

        this.learningModels.set('clustering', {
            algorithm: 'kmeans',
            clusters: 8,
            iterations: 100,
            tolerance: 0.001
        });

        this.learningModels.set('recommendation', {
            algorithm: 'collaborative',
            similarity: 'cosine',
            topK: 5
        });
    }

    recognizePatterns(biofeedbackData) {
        const patterns = [];
        
        for (const data of biofeedbackData) {
            const pattern = this.analyzePattern(data);
            if (pattern) {
                patterns.push(pattern);
                this.patterns.set(pattern.id, pattern);
            }
        }

        return patterns;
    }

    analyzePattern(data) {
        const features = this.extractFeatures(data);
        const patternType = this.classifyPattern(features);
        
        if (patternType) {
            return {
                id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: patternType,
                features: features,
                confidence: this.calculateConfidence(features),
                timestamp: Date.now(),
                metadata: {
                    heartRate: data.heartRate,
                    brainwave: data.brainwave,
                    breathing: data.breathing,
                    meditation: data.meditation
                }
            };
        }

        return null;
    }

    extractFeatures(data) {
        return [
            data.heartRate / 100,
            data.brainwave.alpha / 100,
            data.brainwave.beta / 100,
            data.brainwave.theta / 100,
            data.brainwave.delta / 100,
            data.breathing.rate / 20,
            data.breathing.depth / 100,
            data.meditation.focus / 100,
            data.meditation.clarity / 100,
            data.meditation.peace / 100
        ];
    }

    classifyPattern(features) {
        const [hr, alpha, beta, theta, delta, br, bd, focus, clarity, peace] = features;
        
        if (alpha > 0.6 && theta > 0.4 && focus > 0.7) {
            return 'deep_meditation';
        } else if (beta > 0.5 && hr > 0.7 && clarity > 0.6) {
            return 'active_consciousness';
        } else if (delta > 0.5 && peace > 0.8 && bd > 0.6) {
            return 'deep_peace';
        } else if (alpha > 0.4 && beta > 0.4 && focus > 0.5) {
            return 'balanced_consciousness';
        } else if (theta > 0.6 && peace > 0.7) {
            return 'theta_meditation';
        }

        return 'unknown_pattern';
    }

    calculateConfidence(features) {
        const variance = this.calculateVariance(features);
        const mean = features.reduce((a, b) => a + b, 0) / features.length;
        const confidence = Math.max(0, 1 - variance / mean);
        return Math.min(1, Math.max(0, confidence));
    }

    calculateVariance(features) {
        const mean = features.reduce((a, b) => a + b, 0) / features.length;
        const variance = features.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / features.length;
        return variance;
    }

    clusterPatterns(patterns) {
        const clusters = new Map();
        
        for (const pattern of patterns) {
            const clusterId = this.findBestCluster(pattern, clusters);
            if (!clusters.has(clusterId)) {
                clusters.set(clusterId, []);
            }
            clusters.get(clusterId).push(pattern);
        }

        this.patternClusters = new Map();
        for (const [clusterId, clusterPatterns] of clusters) {
            this.patternClusters.set(clusterId, clusterPatterns.map(p => p.id));
        }

        return clusters;
    }

    findBestCluster(pattern, clusters) {
        let bestCluster = 'cluster_0';
        let bestSimilarity = 0;

        for (const [clusterId, clusterPatterns] of clusters) {
            if (clusterPatterns.length === 0) continue;
            
            const similarity = this.calculateClusterSimilarity(pattern, clusterPatterns);
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                bestCluster = clusterId;
            }
        }

        return bestCluster;
    }

    calculateClusterSimilarity(pattern, clusterPatterns) {
        let totalSimilarity = 0;
        
        for (const clusterPattern of clusterPatterns) {
            const similarity = this.calculatePatternSimilarity(pattern, clusterPattern);
            totalSimilarity += similarity;
        }

        return totalSimilarity / clusterPatterns.length;
    }

    calculatePatternSimilarity(pattern1, pattern2) {
        const features1 = pattern1.features;
        const features2 = pattern2.features;
        
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        
        for (let i = 0; i < features1.length; i++) {
            dotProduct += features1[i] * features2[i];
            norm1 += features1[i] * features1[i];
            norm2 += features2[i] * features2[i];
        }
        
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    generateRecommendations(patterns) {
        const recommendations = [];
        
        for (const pattern of patterns) {
            const recommendation = this.generatePatternRecommendation(pattern);
            if (recommendation) {
                recommendations.push(recommendation);
            }
        }

        this.recommendations.set('current', recommendations);
        return recommendations;
    }

    generatePatternRecommendation(pattern) {
        const { type, confidence } = pattern;
        
        const recommendations = {
            deep_meditation: {
                type: 'meditation_enhancement',
                action: 'Continue deep meditation',
                frequency: '432 Hz',
                duration: '20 minutes',
                confidence: confidence,
                reasoning: 'High alpha and theta waves indicate deep meditation state'
            },
            active_consciousness: {
                type: 'consciousness_activation',
                action: 'Engage in creative activities',
                frequency: '528 Hz',
                duration: '15 minutes',
                confidence: confidence,
                reasoning: 'High beta waves suggest active consciousness'
            },
            deep_peace: {
                type: 'peace_enhancement',
                action: 'Maintain peaceful state',
                frequency: '639 Hz',
                duration: '30 minutes',
                confidence: confidence,
                reasoning: 'High delta waves indicate deep peace'
            },
            balanced_consciousness: {
                type: 'balance_maintenance',
                action: 'Maintain balanced state',
                frequency: '741 Hz',
                duration: '25 minutes',
                confidence: confidence,
                reasoning: 'Balanced alpha and beta waves'
            },
            theta_meditation: {
                type: 'theta_enhancement',
                action: 'Deep theta meditation',
                frequency: '852 Hz',
                duration: '40 minutes',
                confidence: confidence,
                reasoning: 'High theta waves for deep meditation'
            }
        };

        return recommendations[type] || {
            type: 'general_guidance',
            action: 'Continue current practice',
            frequency: '396 Hz',
            duration: '15 minutes',
            confidence: confidence,
            reasoning: 'Unknown pattern, general guidance'
        };
    }

    getPatternStatistics() {
        const stats = {
            totalPatterns: this.patterns.size,
            patternTypes: new Map(),
            averageConfidence: 0,
            clusters: this.patternClusters.size,
            recommendations: this.recommendations.size
        };

        let totalConfidence = 0;
        for (const pattern of this.patterns.values()) {
            const count = stats.patternTypes.get(pattern.type) || 0;
            stats.patternTypes.set(pattern.type, count + 1);
            totalConfidence += pattern.confidence;
        }

        if (this.patterns.size > 0) {
            stats.averageConfidence = totalConfidence / this.patterns.size;
        }

        return stats;
    }
}

// Simulated AI consciousness learning system
class AIConsciousnessLearning {
    constructor() {
        this.learningData = new Map();
        this.learningAlgorithms = new Map();
        this.predictions = new Map();
        this.initializeLearningAlgorithms();
    }

    initializeLearningAlgorithms() {
        this.learningAlgorithms.set('supervised', {
            type: 'regression',
            algorithm: 'gradient_descent',
            features: 10,
            target: 'consciousness_state'
        });

        this.learningAlgorithms.set('unsupervised', {
            type: 'clustering',
            algorithm: 'kmeans',
            clusters: 8
        });

        this.learningAlgorithms.set('reinforcement', {
            type: 'q_learning',
            states: 64,
            actions: 8,
            learning_rate: 0.1
        });
    }

    trainModels(consciousnessData) {
        this.learningData.set('training', consciousnessData);
        
        this.trainSupervisedModel(consciousnessData);
        this.trainUnsupervisedModel(consciousnessData);
        this.trainReinforcementModel(consciousnessData);
    }

    trainSupervisedModel(data) {
        const model = this.learningAlgorithms.get('supervised');
        if (model) {
            model.epochs = Math.min(1000, data.length * 10);
            model.convergence = this.calculateConvergence(data);
        }
    }

    trainUnsupervisedModel(data) {
        const model = this.learningAlgorithms.get('unsupervised');
        if (model) {
            model.clusters = Math.min(8, Math.floor(data.length / 10));
            model.convergence = this.calculateConvergence(data);
        }
    }

    trainReinforcementModel(data) {
        const model = this.learningAlgorithms.get('reinforcement');
        if (model) {
            model.episodes = Math.min(1000, data.length * 5);
            model.convergence = this.calculateConvergence(data);
        }
    }

    calculateConvergence(data) {
        if (data.length === 0) return 0;
        
        const variance = this.calculateDataVariance(data);
        const convergence = Math.max(0, 1 - variance / data.length);
        return Math.min(1, convergence);
    }

    calculateDataVariance(data) {
        if (data.length === 0) return 0;
        
        const features = data.flatMap(d => Object.values(d)).filter(v => typeof v === 'number');
        if (features.length === 0) return 0;
        
        const mean = features.reduce((a, b) => a + b, 0) / features.length;
        const variance = features.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / features.length;
        return variance;
    }

    predictConsciousnessState(features) {
        const prediction = {
            state: this.classifyState(features),
            confidence: this.calculatePredictionConfidence(features),
            recommendations: this.generatePredictiveRecommendations(features),
            timestamp: Date.now()
        };

        this.predictions.set(`prediction_${Date.now()}`, prediction);
        return prediction;
    }

    classifyState(features) {
        const [alpha, beta, theta, delta, focus, clarity, peace, harmony, balance, unity] = features;
        
        if (alpha > 0.7 && theta > 0.5 && peace > 0.8) {
            return 'transcendental_consciousness';
        } else if (beta > 0.6 && focus > 0.7 && clarity > 0.6) {
            return 'active_consciousness';
        } else if (delta > 0.6 && peace > 0.7 && harmony > 0.6) {
            return 'deep_peace_consciousness';
        } else if (alpha > 0.5 && beta > 0.4 && balance > 0.6) {
            return 'balanced_consciousness';
        } else if (theta > 0.6 && unity > 0.7) {
            return 'unified_consciousness';
        }

        return 'normal_consciousness';
    }

    calculatePredictionConfidence(features) {
        const variance = this.calculateVariance(features);
        const mean = features.reduce((a, b) => a + b, 0) / features.length;
        const confidence = Math.max(0, 1 - variance / mean);
        return Math.min(1, Math.max(0, confidence));
    }

    calculateVariance(features) {
        const mean = features.reduce((a, b) => a + b, 0) / features.length;
        const variance = features.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / features.length;
        return variance;
    }

    generatePredictiveRecommendations(features) {
        const recommendations = [];
        const [alpha, beta, theta, delta, focus, clarity, peace, harmony, balance, unity] = features;
        
        if (alpha > 0.6) {
            recommendations.push({
                type: 'alpha_enhancement',
                action: 'Maintain alpha state',
                frequency: '432 Hz',
                duration: '20 minutes'
            });
        }
        
        if (beta > 0.5) {
            recommendations.push({
                type: 'beta_optimization',
                action: 'Optimize beta activity',
                frequency: '528 Hz',
                duration: '15 minutes'
            });
        }
        
        if (theta > 0.5) {
            recommendations.push({
                type: 'theta_enhancement',
                action: 'Enhance theta state',
                frequency: '639 Hz',
                duration: '30 minutes'
            });
        }
        
        if (peace > 0.7) {
            recommendations.push({
                type: 'peace_maintenance',
                action: 'Maintain peaceful state',
                frequency: '741 Hz',
                duration: '25 minutes'
            });
        }
        
        return recommendations;
    }

    getLearningStatistics() {
        return {
            trainingDataSize: this.learningData.get('training')?.length || 0,
            algorithms: Array.from(this.learningAlgorithms.keys()),
            predictions: this.predictions.size,
            models: Object.fromEntries(this.learningAlgorithms)
        };
    }
}

// AI Consciousness Manager
class AIConsciousnessManager {
    constructor() {
        this.patternRecognition = new AIConsciousnessPatternRecognition();
        this.learningSystem = new AIConsciousnessLearning();
    }

    processConsciousnessData(biofeedbackData) {
        const patterns = this.patternRecognition.recognizePatterns(biofeedbackData);
        const clusters = this.patternRecognition.clusterPatterns(patterns);
        const recommendations = this.patternRecognition.generateRecommendations(patterns);
        
        const learningData = patterns.map(p => ({
            features: p.features,
            type: p.type,
            confidence: p.confidence,
            timestamp: p.timestamp
        }));
        
        this.learningSystem.trainModels(learningData);
        
        const predictions = this.learningSystem.predictConsciousnessState(
            biofeedbackData[0] ? this.extractFeatures(biofeedbackData[0]) : []
        );
        
        return {
            patterns,
            clusters,
            recommendations,
            predictions,
            statistics: {
                pattern: this.patternRecognition.getPatternStatistics(),
                learning: this.learningSystem.getLearningStatistics()
            }
        };
    }

    extractFeatures(data) {
        return [
            data.brainwave.alpha / 100,
            data.brainwave.beta / 100,
            data.brainwave.theta / 100,
            data.brainwave.delta / 100,
            data.meditation.focus / 100,
            data.meditation.clarity / 100,
            data.meditation.peace / 100,
            data.meditation.harmony / 100,
            data.meditation.balance / 100,
            data.meditation.unity / 100
        ];
    }
}

// Demo function
function runDemo() {
    console.log('\n🧠 Batch 3: AI Consciousness Pattern Recognition & Learning System Demo');
    console.log('=' .repeat(80));
    
    // Initialize AI system
    const aiManager = new AIConsciousnessManager();
    
    // Generate biofeedback data
    console.log('\n📊 Generating biofeedback data...');
    const biofeedbackData = generateBiofeedbackData(15);
    console.log(`✅ Generated ${biofeedbackData.length} biofeedback data points`);
    
    // Process consciousness data through AI systems
    console.log('\n🤖 Processing consciousness data through AI systems...');
    const results = aiManager.processConsciousnessData(biofeedbackData);
    
    // Display pattern recognition results
    console.log('\n🔍 Pattern Recognition Results:');
    console.log(`   • Total Patterns: ${results.patterns.length}`);
    console.log(`   • Pattern Types: ${new Set(results.patterns.map(p => p.type)).size}`);
    console.log(`   • Average Confidence: ${(results.statistics.pattern.averageConfidence * 100).toFixed(1)}%`);
    
    // Display pattern types
    const patternTypes = {};
    results.patterns.forEach(pattern => {
        patternTypes[pattern.type] = (patternTypes[pattern.type] || 0) + 1;
    });
    
    console.log('\n📈 Pattern Distribution:');
    Object.entries(patternTypes).forEach(([type, count]) => {
        console.log(`   • ${type.replace(/_/g, ' ').toUpperCase()}: ${count} patterns`);
    });
    
    // Display clustering results
    console.log('\n🎯 Clustering Results:');
    console.log(`   • Total Clusters: ${results.clusters.size}`);
    results.clusters.forEach((patterns, clusterId) => {
        console.log(`   • ${clusterId}: ${patterns.length} patterns`);
    });
    
    // Display recommendations
    console.log('\n💡 AI Recommendations:');
    results.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec.type.replace(/_/g, ' ').toUpperCase()}`);
        console.log(`      Action: ${rec.action}`);
        console.log(`      Frequency: ${rec.frequency} • Duration: ${rec.duration}`);
        console.log(`      Reasoning: ${rec.reasoning}`);
        console.log(`      Confidence: ${(rec.confidence * 100).toFixed(1)}%`);
        console.log('');
    });
    
    // Display learning system results
    console.log('\n🧠 Learning System Results:');
    console.log(`   • Training Data Size: ${results.statistics.learning.trainingDataSize}`);
    console.log(`   • Algorithms: ${results.statistics.learning.algorithms.join(', ')}`);
    console.log(`   • Predictions: ${results.statistics.learning.predictions}`);
    
    // Display prediction
    console.log('\n🔮 Consciousness State Prediction:');
    console.log(`   • State: ${results.predictions.state.replace(/_/g, ' ').toUpperCase()}`);
    console.log(`   • Confidence: ${(results.predictions.confidence * 100).toFixed(1)}%`);
    
    if (results.predictions.recommendations.length > 0) {
        console.log('\n   Predictive Recommendations:');
        results.predictions.recommendations.forEach((rec, index) => {
            console.log(`     ${index + 1}. ${rec.type.replace(/_/g, ' ').toUpperCase()}`);
            console.log(`        Action: ${rec.action}`);
            console.log(`        Frequency: ${rec.frequency} • Duration: ${rec.duration}`);
        });
    }
    
    // Display system statistics
    console.log('\n📊 System Statistics:');
    console.log(`   • Pattern Recognition: ${results.statistics.pattern.totalPatterns} patterns`);
    console.log(`   • Learning System: ${results.statistics.learning.trainingDataSize} training samples`);
    console.log(`   • Clusters: ${results.statistics.pattern.clusters}`);
    console.log(`   • Recommendations: ${results.statistics.pattern.recommendations}`);
    
    // Export system data
    const exportData = {
        patterns: results.patterns,
        clusters: Object.fromEntries(results.clusters),
        recommendations: results.recommendations,
        predictions: results.predictions,
        statistics: results.statistics,
        timestamp: Date.now()
    };
    
    const exportPath = path.join(__dirname, '../reports/ai-consciousness-pattern-recognition-report.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    console.log(`\n💾 System data exported to: ${exportPath}`);
    
    console.log('\n✅ Batch 3 AI Consciousness Pattern Recognition & Learning System Demo Complete!');
    console.log('\n🌐 PWA available at: http://localhost:3000/ai-consciousness-pattern-recognition.html');
}

// Run demo if called directly
if (require.main === module) {
    runDemo();
}

module.exports = { runDemo }; 