#!/usr/bin/env node

// Test script to demonstrate error simulation
const { GoldenRatioCache } = require('./dist/src/__tests__/utils/goldenRatioCache');
const { ErrorSimulator } = require('./dist/src/__tests__/utils/errorSimulator');

console.log('🧪 Testing Error Simulation in ZeroPoint QA System\n');

// Initialize error simulator
const errorSimulator = new ErrorSimulator({
  cacheMissRate: 0.3,      // 30% cache miss rate
  staleDataRate: 0.2,      // 20% stale data rate
  evictionRate: 0.1,       // 10% eviction rate
  unavailabilityRate: 0.05 // 5% unavailability rate
});

// Initialize golden ratio cache with error simulation
const cache = new GoldenRatioCache();
cache.setErrorSimulator(errorSimulator);

console.log('📊 Error Simulation Configuration:');
console.log(`   Cache Miss Rate: ${errorSimulator.config.cacheMissRate * 100}%`);
console.log(`   Stale Data Rate: ${errorSimulator.config.staleDataRate * 100}%`);
console.log(`   Eviction Rate: ${errorSimulator.config.evictionRate * 100}%`);
console.log(`   Unavailability Rate: ${errorSimulator.config.unavailabilityRate * 100}%\n`);

// Test multiple golden ratio calculations
console.log('🔄 Testing Golden Ratio Calculations with Error Simulation:');
for (let i = 1; i <= 10; i++) {
  try {
    const result = cache.getGoldenRatio(i);
    console.log(`   Test ${i}: Golden ratio (${i} iterations) = ${result.toFixed(6)}`);
  } catch (error) {
    console.log(`   Test ${i}: ❌ Error - ${error.message}`);
  }
}

console.log('\n📈 Cache Statistics:');
console.log(`   Hits: ${cache.getStats().hits}`);
console.log(`   Misses: ${cache.getStats().misses}`);
console.log(`   Hit Rate: ${((cache.getStats().hits / (cache.getStats().hits + cache.getStats().misses)) * 100).toFixed(1)}%`);

console.log('\n✅ Error simulation test completed!');
console.log('   The system demonstrates resilience under various error conditions.');
console.log('   This improves QA coverage by testing error handling paths.'); 