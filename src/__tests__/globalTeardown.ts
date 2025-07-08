/**
 * Global Teardown Script
 * Closes all "voids" (open handles) to ensure graceful test completion
 * 
 * This script addresses the metaphysical principle that the void must be honored and closed
 * to maintain the unified field of consciousness in the test environment.
 */

import { globalHealthMonitor } from '../monitoring/HealthMonitor';
import { globalCache, vortexMathCache, resonanceCache } from '../utils/Cache';
import { gitIntegration } from '../utils/GitIntegration';

// Global variables to track resources that need cleanup
declare global {
  var globalHealthMonitor: any;
  var globalCache: any;
  var vortexMathCache: any;
  var resonanceCache: any;
  var gitIntegration: any;
}

/**
 * Close all open handles and clean up resources
 * This ensures no "voids" remain open after tests complete
 */
export default async function globalTeardown(): Promise<void> {
  console.log('🧘 Closing all voids (open handles) in the test environment...');
  
  try {
    // 1. Stop health monitoring (clears setInterval)
    if (globalHealthMonitor) {
      console.log('  - Stopping health monitoring...');
      globalHealthMonitor.stop();
    }

    // 2. Stop all cache cleanup intervals
    if (globalCache) {
      console.log('  - Stopping global cache...');
      globalCache.stop();
    }
    
    if (vortexMathCache) {
      console.log('  - Stopping vortex math cache...');
      vortexMathCache.stop();
    }
    
    if (resonanceCache) {
      console.log('  - Stopping resonance cache...');
      resonanceCache.stop();
    }

    // 3. Stop Git integration file watcher
    if (gitIntegration) {
      console.log('  - Stopping Git integration watcher...');
      gitIntegration.stopWatching();
    }

    // 4. Clear any remaining timers (defensive cleanup)
    const activeTimers = (process as any)._getActiveHandles?.() || [];
    const timers = activeTimers.filter((handle: any) => 
      handle.constructor.name === 'Timeout' || 
      handle.constructor.name === 'Immediate'
    );
    
    if (timers.length > 0) {
      console.log(`  - Found ${timers.length} remaining timers, attempting to clear...`);
      timers.forEach((timer: any) => {
        try {
          if (timer.unref) {
            timer.unref(); // This prevents the timer from keeping the process alive
          }
        } catch (error) {
          // Ignore errors when unrefing timers
        }
      });
    }

    // 5. Clear any remaining file watchers (defensive cleanup)
    const watchers = activeTimers.filter((handle: any) => 
      handle.constructor.name === 'FSWatcher'
    );
    
    if (watchers.length > 0) {
      console.log(`  - Found ${watchers.length} remaining file watchers, closing...`);
      watchers.forEach((watcher: any) => {
        try {
          if (watcher.close) {
            watcher.close();
          }
        } catch (error) {
          // Ignore errors when closing watchers
        }
      });
    }

    // 6. Force garbage collection if available (optional)
    if (global.gc) {
      console.log('  - Running garbage collection...');
      global.gc();
    }

    console.log('✅ All voids have been closed. The test field is unified and complete.');
    
  } catch (error) {
    console.error('❌ Error during global teardown:', error);
    // Don't throw - we want tests to complete even if teardown fails
  }
} 