"use strict";
/**
 * Global Teardown Script
 * Closes all "voids" (open handles) to ensure graceful test completion
 *
 * This script addresses the metaphysical principle that the void must be honored and closed
 * to maintain the unified field of consciousness in the test environment.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalTeardown;
const HealthMonitor_1 = require("../monitoring/HealthMonitor");
const Cache_1 = require("../utils/Cache");
const GitIntegration_1 = require("../utils/GitIntegration");
/**
 * Close all open handles and clean up resources
 * This ensures no "voids" remain open after tests complete
 */
async function globalTeardown() {
    console.log('🧘 Closing all voids (open handles) in the test environment...');
    try {
        // 1. Stop health monitoring (clears setInterval)
        if (HealthMonitor_1.globalHealthMonitor) {
            console.log('  - Stopping health monitoring...');
            HealthMonitor_1.globalHealthMonitor.stop();
        }
        // 2. Stop all cache cleanup intervals
        if (Cache_1.globalCache) {
            console.log('  - Stopping global cache...');
            Cache_1.globalCache.stop();
        }
        if (Cache_1.vortexMathCache) {
            console.log('  - Stopping vortex math cache...');
            Cache_1.vortexMathCache.stop();
        }
        if (Cache_1.resonanceCache) {
            console.log('  - Stopping resonance cache...');
            Cache_1.resonanceCache.stop();
        }
        // 3. Stop Git integration file watcher
        if (GitIntegration_1.gitIntegration) {
            console.log('  - Stopping Git integration watcher...');
            GitIntegration_1.gitIntegration.stopWatching();
        }
        // 4. Clear any remaining timers (defensive cleanup)
        const activeTimers = process._getActiveHandles?.() || [];
        const timers = activeTimers.filter((handle) => handle.constructor.name === 'Timeout' ||
            handle.constructor.name === 'Immediate');
        if (timers.length > 0) {
            console.log(`  - Found ${timers.length} remaining timers, attempting to clear...`);
            timers.forEach((timer) => {
                try {
                    if (timer.unref) {
                        timer.unref(); // This prevents the timer from keeping the process alive
                    }
                }
                catch {
                    // Ignore errors when unrefing timers
                }
            });
        }
        // 5. Clear any remaining file watchers (defensive cleanup)
        const watchers = activeTimers.filter((handle) => handle.constructor.name === 'FSWatcher');
        if (watchers.length > 0) {
            console.log(`  - Found ${watchers.length} remaining file watchers, closing...`);
            watchers.forEach((watcher) => {
                try {
                    if (watcher.close) {
                        watcher.close();
                    }
                }
                catch {
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
    }
    catch (error) {
        console.error('❌ Error during global teardown:', error);
        // Don't throw - we want tests to complete even if teardown fails
    }
}
//# sourceMappingURL=globalTeardown.js.map