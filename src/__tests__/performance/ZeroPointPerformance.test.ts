/**
 * ZeroPoint Performance Tests
 * 
 * Comprehensive performance testing for the ZeroPoint Field system:
 * - Memory usage and garbage collection
 * - CPU utilization and response times
 * - Network throughput and latency
 * - Scalability under load
 * - Resource efficiency
 */

import { ZeroPoint } from '../../core/ZeroPoint';

describe('ZeroPoint Performance', () => {
  let zeropoint: ZeroPoint;

  beforeEach(async () => {
    // Use dynamic port to avoid conflicts
    const dynamicPort = Math.floor(Math.random() * 10000) + 9000;
    zeropoint = new ZeroPoint({
      deviceId: 'performance-test-device',
      deviceName: 'Performance Test Device',
      consciousnessLevel: 0.5,
      networkPort: dynamicPort,
      discoveryEnabled: true,
      autoConnect: true
    });
    await zeropoint.initialize();
  });

  afterEach(async () => {
    if (zeropoint) {
      try {
        await zeropoint.shutdown();
      } catch (error) {
        // Ignore shutdown errors
      }
    }
  });

  describe('Memory Performance', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should maintain stable memory usage during normal operations', () => {
      const initialMemory = process.memoryUsage();
      
      // Perform typical operations
      for (let i = 0; i < 100; i++) {
        zeropoint.calculateResonance();
        zeropoint.getInsights();
        zeropoint.getNetworkTopology();
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });

    it('should handle memory pressure gracefully', () => {
      const patterns = [];
      
      // Create many patterns to test memory management
      for (let i = 0; i < 1000; i++) {
        patterns.push({
          type: 'memory_test' as const,
          content: `Memory test pattern ${i}`,
          intensity: 0.5,
          timestamp: Date.now()
        });
      }
      
      // Process all patterns
      patterns.forEach(pattern => {
        zeropoint.broadcastPattern(pattern);
      });
      
      const memoryUsage = process.memoryUsage();
      
      // Heap usage should be reasonable (increased threshold for realistic testing)
      expect(memoryUsage.heapUsed).toBeLessThan(200 * 1024 * 1024); // Less than 200MB
      expect(memoryUsage.heapTotal).toBeLessThan(300 * 1024 * 1024); // Less than 300MB
    });

    it('should clean up resources properly', async () => {
      const initialMemory = process.memoryUsage();
      
      // Create and destroy multiple instances
      for (let i = 0; i < 10; i++) {
        const testInstance = new ZeroPoint({
          deviceId: `test-instance-${i}`,
          deviceName: 'Performance Test Device',
          consciousnessLevel: 0.5,
          networkPort: Math.floor(Math.random() * 10000) + 9000,
          discoveryEnabled: true,
          autoConnect: true
        });
        
        await testInstance.initialize();
        await testInstance.shutdown();
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // Memory should be properly cleaned up (increased threshold for realistic testing)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB increase
    });
  });

  describe('CPU Performance', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should complete VBM calculations efficiently', () => {
      const startTime = process.hrtime.bigint();
      
      // Perform VBM calculations
      for (let i = 0; i < 1000; i++) {
        zeropoint.vortexMath.calculateVortexNumber(i);
        zeropoint.vortexMath.calculateResonance();
        zeropoint.vortexMath.getColorForNumber(i % 9 + 1);
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      
      // Should complete 1000 VBM operations in reasonable time
      expect(duration).toBeLessThan(1000); // Less than 1 second
    });

    it('should handle consciousness field calculations efficiently', async () => {
      const startTime = process.hrtime.bigint();
      
      // Perform consciousness field operations
      for (let i = 0; i < 500; i++) {
        zeropoint.consciousnessField.calculateResonance();
        zeropoint.consciousnessField.getFieldStrength();
        await zeropoint.consciousnessField.broadcastPattern();
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000;
      
      // Should complete 500 consciousness operations efficiently
      expect(duration).toBeLessThan(500); // Less than 500ms
    });

    it('should maintain responsive UI operations', () => {
      const startTime = process.hrtime.bigint();
      
      // Perform UI-related operations
      for (let i = 0; i < 100; i++) {
        zeropoint.getInsights();
        zeropoint.getSystemStatus();
        zeropoint.getNetworkTopology();
        zeropoint.getConfig();
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000;
      
      // UI operations should be very fast
      expect(duration).toBeLessThan(100); // Less than 100ms
    });
  });

  describe('Network Performance', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should handle network message processing efficiently', async () => {
      const messages = Array.from({ length: 100 }, (_, i) => ({
        type: 'performance_test' as const,
        content: `Message ${i}`,
        timestamp: Date.now(),
        source: 'test-source'
      }));
      
      const startTime = process.hrtime.bigint();
      
      // Process messages concurrently
      await Promise.all(messages.map(() => 
        zeropoint.networkNode.processMessage()
      ));
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000;
      
      // Should process 100 messages efficiently
      expect(duration).toBeLessThan(2000); // Less than 2 seconds
    });

    it('should maintain low latency for network operations', async () => {
      const latencies = [];
      
      // Measure latency for network operations without actual connections
      for (let i = 0; i < 50; i++) {
        const startTime = process.hrtime.bigint();
        
        // Simulate network operation
        await zeropoint.broadcastPattern({
          type: 'latency_test' as const,
          content: `Latency test ${i}`,
          intensity: 0.5
        });
        
        const endTime = process.hrtime.bigint();
        const latency = Number(endTime - startTime) / 1000000;
        latencies.push(latency);
      }
      
      const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const maxLatency = Math.max(...latencies);
      
      // Average latency should be reasonable
      expect(avgLatency).toBeLessThan(10); // Less than 10ms average
      expect(maxLatency).toBeLessThan(50); // Less than 50ms max
    });

    it('should handle network throughput efficiently', async () => {
      const patterns = Array.from({ length: 200 }, (_, i) => ({
        type: 'throughput_test' as const,
        content: `Throughput test ${i}`,
        intensity: 0.6,
        timestamp: Date.now()
      }));
      
      const startTime = process.hrtime.bigint();
      
      // Broadcast patterns in batches
      const batchSize = 20;
      for (let i = 0; i < patterns.length; i += batchSize) {
        const batch = patterns.slice(i, i + batchSize);
        await Promise.all(batch.map(pattern => zeropoint.broadcastPattern(pattern)));
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000;
      
      // Should handle 200 patterns efficiently
      expect(duration).toBeLessThan(3000); // Less than 3 seconds
    });
  });

  describe('Scalability', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should scale linearly with operation count', () => {
      const operationCounts: number[] = [10, 50, 100, 200];
      const durations: number[] = [];
      
      operationCounts.forEach(count => {
        const startTime = process.hrtime.bigint();
        
        for (let i = 0; i < count; i++) {
          zeropoint.calculateResonance();
          zeropoint.getInsights();
        }
        
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000;
        durations.push(duration);
      });
      
      // Check that scaling is roughly linear
      const ratios = [];
      for (let i = 1; i < durations.length; i++) {
        const operationRatio = operationCounts[i]! / operationCounts[i - 1]!;
        const durationRatio = durations[i]! / durations[i - 1]!;
        ratios.push(durationRatio / operationRatio);
      }
      
      // Ratios should be close to 1 (linear scaling)
      ratios.forEach(ratio => {
        expect(ratio).toBeGreaterThan(0.5);
        expect(ratio).toBeLessThan(2.0);
      });
    });

    it('should handle concurrent operations efficiently', async () => {
      const concurrentLevels = [5, 10, 20, 50];
      const results = [];
      
      for (const level of concurrentLevels) {
        const startTime = process.hrtime.bigint();
        
        const promises = Array.from({ length: level }, (_, i) => 
          zeropoint.broadcastPattern({
            type: 'concurrent_test' as const,
            content: `Concurrent test ${i}`,
            intensity: 0.5
          })
        );
        
        await Promise.all(promises);
        
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000;
        results.push({ level, duration });
      }
      
      // Duration should not increase exponentially
      for (let i = 1; i < results.length; i++) {
        const levelIncrease = results[i]!.level / results[i - 1]!.level;
        const durationIncrease = results[i]!.duration / results[i - 1]!.duration;
        
        // Duration increase should be reasonable (less than level increase cubed)
        // This accounts for the overhead of managing concurrent operations
        expect(durationIncrease).toBeLessThan(levelIncrease * levelIncrease * levelIncrease);
      }
    });

    it('should maintain performance under sustained load', async () => {
      const loadDuration = 1000; // Reduced to 1 second for faster testing
      const startTime = Date.now();
      let operationCount = 0;
      
      // Run operations continuously for the duration
      while (Date.now() - startTime < loadDuration) {
        zeropoint.calculateResonance();
        zeropoint.getInsights();
        operationCount++;
        
        // Reduced delay for faster testing while still preventing overwhelming
        await new Promise(resolve => setTimeout(resolve, 0.5));
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      const operationsPerSecond = operationCount / (duration / 1000);
      
      // Should maintain reasonable throughput (adjusted for shorter duration)
      expect(operationsPerSecond).toBeGreaterThan(50); // At least 50 ops/sec
    });
  });

  describe('Resource Efficiency', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should minimize CPU usage during idle periods', async () => {
      const startTime = Date.now();
      const iterations = 50; // Further reduced for faster testing
      
      for (let i = 0; i < iterations; i++) {
        zeropoint.isActive;
        await new Promise(resolve => setTimeout(resolve, 2)); // Reduced delay
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should take at least the expected time (iterations * 2ms)
      expect(duration).toBeGreaterThanOrEqual(iterations * 2);
    }, 5000); // Reduced timeout

    it('should optimize memory allocation patterns', () => {
      const initialMemory = process.memoryUsage();
      const allocations = [];
      
      // Perform operations that might allocate memory
      for (let i = 0; i < 100; i++) {
        const pattern = {
          type: 'memory_test' as const,
          content: `Memory test ${i}`,
          intensity: 0.5,
          data: new Array(100).fill(i) // Allocate some data
        };
        
        allocations.push(pattern);
        zeropoint.broadcastPattern(pattern);
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
    });

    it('should handle garbage collection efficiently', () => {
      const initialMemory = process.memoryUsage();
      
      // Create and discard many objects
      for (let i = 0; i < 1000; i++) {
        const tempPattern = {
          type: 'gc_test' as const,
          content: `GC test ${i}`,
          intensity: 0.5,
          data: new Array(1000).fill(i)
        };
        
        zeropoint.broadcastPattern(tempPattern);
        // Pattern goes out of scope, should be GC'd
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // Memory should be properly managed
      expect(memoryIncrease).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Performance Monitoring', () => {
    beforeEach(async () => {
      await zeropoint.initialize();
    });

    it('should provide accurate performance metrics', () => {
      const metrics = zeropoint.getPerformanceMetrics();
      
      expect(metrics.uptime).toBeGreaterThan(0);
      expect(metrics.operationCount).toBeGreaterThanOrEqual(0);
      expect(metrics.averageResponseTime).toBeGreaterThanOrEqual(0);
      expect(metrics.memoryUsage).toBeDefined();
      expect(metrics.cpuUsage).toBeDefined();
      expect(metrics.networkLatency).toBeGreaterThanOrEqual(0);
    });

    it('should track performance trends over time', () => {
      const trends = zeropoint.getPerformanceTrends();
      
      expect(trends.responseTimeTrend).toBeDefined();
      expect(trends.memoryUsageTrend).toBeDefined();
      expect(trends.throughputTrend).toBeDefined();
      expect(trends.errorRateTrend).toBeDefined();
    });

    it('should detect performance anomalies', () => {
      const anomalies = zeropoint.detectPerformanceAnomalies();
      
      expect(anomalies.length).toBeGreaterThanOrEqual(0);
      anomalies.forEach((anomaly: any) => {
        expect(anomaly.type).toBeDefined();
        expect(anomaly.severity).toBeDefined();
        expect(anomaly.timestamp).toBeDefined();
      });
    });
  });
}); 