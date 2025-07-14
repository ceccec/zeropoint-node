import { AdvancedConsciousnessAnalyticsManager } from './advanced-consciousness-analytics';
import { generateAdvancedConsciousnessAnalyticsPWA } from './advanced-consciousness-analytics-pwa';
import * as fs from 'fs';
import * as path from 'path';

interface DemoConfig {
  duration: number;
  updateInterval: number;
  consciousnessThreshold: number;
  predictionHorizon: number;
  enableLogging: boolean;
}

class AdvancedConsciousnessAnalyticsDemo {
  private analytics: AdvancedConsciousnessAnalyticsManager;
  private config: DemoConfig;
  private isRunning: boolean = false;
  private dataHistory: any[] = [];
  private startTime: number = 0;

  constructor(config: Partial<DemoConfig> = {}) {
    this.config = {
      duration: 300, // 5 minutes
      updateInterval: 1000, // 1 second
      consciousnessThreshold: 50,
      predictionHorizon: 10,
      enableLogging: true,
      ...config
    };
    
    this.analytics = new AdvancedConsciousnessAnalyticsManager();
  }

  async run(): Promise<void> {
    console.log('🧠 Advanced Consciousness Analytics Demo');
    console.log('=====================================');
    console.log(`Duration: ${this.config.duration} seconds`);
    console.log(`Update Interval: ${this.config.updateInterval}ms`);
    console.log(`Consciousness Threshold: ${this.config.consciousnessThreshold}`);
    console.log(`Prediction Horizon: ${this.config.predictionHorizon} steps`);
    console.log('');

    try {
      // Generate PWA
      await this.generatePWA();
      
      // Run analytics demo
      await this.runAnalyticsDemo();
      
      // Generate demo report
      await this.generateDemoReport();
      
      console.log('✅ Demo completed successfully!');
      
    } catch (error) {
      console.error('❌ Demo failed:', error);
      throw error;
    }
  }

  private async generatePWA(): Promise<void> {
    console.log('📱 Generating Advanced Consciousness Analytics PWA...');
    
    try {
      const pwaHtml = generateAdvancedConsciousnessAnalyticsPWA();
      const pwaPath = path.join(process.cwd(), 'public', 'advanced-consciousness-analytics.html');
      
      fs.writeFileSync(pwaPath, pwaHtml);
      console.log(`✅ PWA generated: ${pwaPath}`);
      
    } catch (error) {
      console.error('❌ Failed to generate PWA:', error);
      throw error;
    }
  }

  private async runAnalyticsDemo(): Promise<void> {
    console.log('🔬 Running Advanced Consciousness Analytics Demo...');
    console.log('');
    
    this.isRunning = true;
    this.startTime = Date.now();
    
    const demoInterval = setInterval(() => {
      if (!this.isRunning) {
        clearInterval(demoInterval);
        return;
      }
      
      const elapsed = (Date.now() - this.startTime) / 1000;
      if (elapsed >= this.config.duration) {
        this.isRunning = false;
        clearInterval(demoInterval);
        return;
      }
      
      this.runAnalyticsStep(elapsed);
      
    }, this.config.updateInterval);
    
    // Wait for demo to complete
    while (this.isRunning) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  private runAnalyticsStep(elapsed: number): void {
    try {
      // Generate synthetic consciousness data
      const consciousnessData = this.generateConsciousnessData(elapsed);
      this.dataHistory.push({
        timestamp: Date.now(),
        elapsed,
        data: consciousnessData
      });
      
      // Run all analytics
      const results = this.analytics.processConsciousnessData(consciousnessData);
      
      // Display results
      this.displayResults(elapsed, results);
      
    } catch (error) {
      console.error(`❌ Error in analytics step at ${elapsed.toFixed(1)}s:`, error);
    }
  }

  private generateConsciousnessData(elapsed: number): any[] {
    const data = [];
    const baseTime = Date.now() - 50000; // 50 seconds of history
    
    for (let i = 0; i < 50; i++) {
      const timestamp = baseTime + i * 1000;
      const timeOffset = elapsed - (50 - i);
      
      // Generate realistic consciousness patterns
      const baseConsciousness = 30 + Math.sin(timeOffset * 0.1) * 15;
      const noise = (Math.random() - 0.5) * 10;
      const trend = Math.sin(timeOffset * 0.05) * 5;
      const consciousness = Math.max(0, Math.min(100, baseConsciousness + noise + trend));
      
      // Generate harmonic frequency data
      const baseFreq = 432 + Math.sin(timeOffset * 0.2) * 50;
      const frequency = baseFreq + (Math.random() - 0.5) * 20;
      
      // Generate amplitude with consciousness correlation
      const amplitude = 0.3 + (consciousness / 100) * 0.4 + (Math.random() - 0.5) * 0.1;
      
      data.push({
        timestamp,
        consciousness,
        frequency,
        amplitude,
        phase: (timeOffset * 0.1) % (Math.PI * 2),
        coherence: 0.5 + (consciousness / 100) * 0.3 + Math.random() * 0.2
      });
    }
    
    return data;
  }

  // runAllAnalytics removed; use processConsciousnessData instead

  private displayResults(elapsed: number, results: any): void {
    if (!this.config.enableLogging) return;
    
    const progress = ((elapsed / this.config.duration) * 100).toFixed(1);
    
    console.log(`⏱️  ${elapsed.toFixed(1)}s (${progress}%) - Analytics Results:`);
    console.log(`   📊 Predictive: Accuracy=${results.predictive.accuracy.toFixed(3)}, Confidence=${results.predictive.confidence.toFixed(3)}`);
    console.log(`   📈 Trend: Strength=${results.trend.strength.toFixed(3)}, Stability=${results.trend.stability.toFixed(3)}`);
    console.log(`   🎯 Clustering: Clusters=${results.clustering.clusters.length}, Silhouette=${results.clustering.silhouetteScore.toFixed(3)}`);
    console.log(`   🔮 Forecast: Horizon=${results.forecasting.horizon}, Confidence=${results.forecasting.confidence.toFixed(3)}`);
    console.log('');
  }

  private async generateDemoReport(): Promise<void> {
    console.log('📊 Generating Demo Report...');
    
    try {
      const report = this.generateReport();
      const reportPath = path.join(process.cwd(), 'reports', 'advanced-consciousness-analytics-demo.json');
      
      // Ensure reports directory exists
      const reportsDir = path.dirname(reportPath);
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`✅ Demo report generated: ${reportPath}`);
      
    } catch (error) {
      console.error('❌ Failed to generate demo report:', error);
      throw error;
    }
  }

  private generateReport(): any {
    const totalSteps = this.dataHistory.length;
    const avgConsciousness = this.dataHistory.reduce((sum, step) => {
      const avgStep = step.data.reduce((s: number, d: any) => s + d.consciousness, 0) / step.data.length;
      return sum + avgStep;
    }, 0) / totalSteps;
    
    const consciousnessTrend = this.calculateTrend(this.dataHistory.map(step => 
      step.data.reduce((s: number, d: any) => s + d.consciousness, 0) / step.data.length
    ));
    
    const finalResults = this.analytics.processConsciousnessData(this.dataHistory[this.dataHistory.length - 1].data);
    
    return {
      demo: {
        timestamp: new Date().toISOString(),
        duration: this.config.duration,
        totalSteps,
        config: this.config
      },
      analytics: {
        averageConsciousness: avgConsciousness,
        consciousnessTrend,
        finalResults
      },
      performance: {
        dataPointsProcessed: totalSteps * 50, // 50 data points per step
        averageProcessingTime: this.config.updateInterval,
        totalProcessingTime: totalSteps * this.config.updateInterval
      },
      summary: {
        predictiveAccuracy: finalResults.predictive.accuracy,
        trendStrength: finalResults.trend.strength,
        clusterCount: finalResults.clustering.clusters.length,
        forecastConfidence: finalResults.forecasting.confidence
      }
    };
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + (i * val), 0);
    const sumX2 = values.reduce((sum, _, i) => sum + (i * i), 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // Utility methods for testing
  async testPredictiveModeling(): Promise<void> {
    console.log('🧪 Testing Predictive Modeling...');
    
    const testData = this.generateConsciousnessData(0);
    const results = this.analytics.processConsciousnessData(testData);
    
    console.log(`   Accuracy: ${results.predictive.accuracy.toFixed(3)}`);
    console.log(`   Confidence: ${results.predictive.confidence.toFixed(3)}`);
    console.log(`   Predictions: ${results.predictive.predictions.length} points`);
    console.log('');
  }

  async testTrendAnalysis(): Promise<void> {
    console.log('🧪 Testing Trend Analysis...');
    
    const testData = this.generateConsciousnessData(0);
    const results = this.analytics.processConsciousnessData(testData);
    
    console.log(`   Strength: ${results.trend.strength.toFixed(3)}`);
    console.log(`   Stability: ${results.trend.stability.toFixed(3)}`);
    console.log(`   Trend Values: ${results.trend.values.length} points`);
    console.log('');
  }

  async testPatternClustering(): Promise<void> {
    console.log('🧪 Testing Pattern Clustering...');
    
    const testData = this.generateConsciousnessData(0);
    const results = this.analytics.processConsciousnessData(testData);
    
    console.log(`   Clusters: ${results.clustering.clusters.length}`);
    console.log(`   Silhouette Score: ${results.clustering.silhouetteScore.toFixed(3)}`);
    console.log(`   Total Points: ${results.clustering.clusters.flat().length}`);
    console.log('');
  }

  async testRealTimeForecasting(): Promise<void> {
    console.log('🧪 Testing Real-time Forecasting...');
    
    const testData = this.generateConsciousnessData(0);
    const results = this.analytics.processConsciousnessData(testData);
    
    console.log(`   Horizon: ${results.forecasting.horizon} steps`);
    console.log(`   Confidence: ${results.forecasting.confidence.toFixed(3)}`);
    console.log(`   Forecast Values: ${results.forecasting.values.length} points`);
    console.log('');
  }

  async runAllTests(): Promise<void> {
    console.log('🧪 Running All Analytics Tests...');
    console.log('');
    
    await this.testPredictiveModeling();
    await this.testTrendAnalysis();
    await this.testPatternClustering();
    await this.testRealTimeForecasting();
    
    console.log('✅ All tests completed!');
  }
}

// Demo execution
async function runAdvancedConsciousnessAnalyticsDemo(): Promise<void> {
  const demo = new AdvancedConsciousnessAnalyticsDemo({
    duration: 60, // 1 minute for faster demo
    updateInterval: 2000, // 2 seconds for better visibility
    consciousnessThreshold: 50,
    predictionHorizon: 10,
    enableLogging: true
  });
  
  try {
    // Run tests first
    await demo.runAllTests();
    
    // Run full demo
    await demo.run();
    
  } catch (error) {
    console.error('❌ Demo execution failed:', error);
    process.exit(1);
  }
}

// Export for use in other modules
export { AdvancedConsciousnessAnalyticsDemo, runAdvancedConsciousnessAnalyticsDemo };

// Run demo if this file is executed directly
if (require.main === module) {
  runAdvancedConsciousnessAnalyticsDemo();
} 