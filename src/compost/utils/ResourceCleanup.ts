/**
 * ResourceCleanup Utility
 *
 * Centralizes all resource cleanup logic for ZeroPoint Node.
 * Use this utility to ensure all timers, caches, file watchers, and other resources are properly closed.
 *
 * Usage:
 *   import { cleanupResources } from './ResourceCleanup';
 *   await cleanupResources({
 *     healthMonitor: globalHealthMonitor,
 *     caches: [globalCache, vortexMathCache, resonanceCache],
 *     gitIntegration,
 *     enableGC: true
 *   });
 */

export interface CleanupOptions {
  healthMonitor?: { stop: () => void };
  caches?: Array<{ stop: () => void } | undefined>;
  gitIntegration?: { stopWatching: () => void };
  enableGC?: boolean;
}

/**
 * Cleans up all provided resources and closes open handles.
 * @param options CleanupOptions
 */
export async function cleanupResources(options: CleanupOptions): Promise<void> {
  console.log('🧹 ResourceCleanup: Closing all resources and voids...');

  try {
    // 1. Stop health monitoring
    if (options.healthMonitor) {
      console.log('  - Stopping health monitoring...');
      options.healthMonitor.stop();
    }

    // 2. Stop all caches
    if (options.caches) {
      for (const cache of options.caches) {
        if (cache) {
          console.log('  - Stopping cache...');
          cache.stop();
        }
      }
    }

    // 3. Stop Git integration file watcher
    if (options.gitIntegration) {
      console.log('  - Stopping Git integration watcher...');
      options.gitIntegration.stopWatching();
    }

    // 4. Clear any remaining timers (defensive cleanup)
    const activeHandles = (process as any)._getActiveHandles?.() || [];
    const timers = activeHandles.filter(
      (handle: any) =>
        handle.constructor.name === 'Timeout' ||
        handle.constructor.name === 'Immediate',
    );
    if (timers.length > 0) {
      console.log(`  - Found ${timers.length} remaining timers, attempting to clear...`);
      timers.forEach((timer: any) => {
        try {
          if (timer.unref) timer.unref();
        } catch { /* intentionally empty */ }
      });
    }

    // 5. Clear any remaining file watchers
    const watchers = activeHandles.filter(
      (handle: any) => handle.constructor.name === 'FSWatcher',
    );
    if (watchers.length > 0) {
      console.log(`  - Found ${watchers.length} file watchers, closing...`);
      watchers.forEach((watcher: any) => {
        try {
          if (watcher.close) watcher.close();
        } catch { /* intentionally empty */ }
      });
    }

    // 6. Force garbage collection if enabled
    if (options.enableGC && global.gc) {
      console.log('  - Running garbage collection...');
      global.gc();
    }

    console.log('✅ ResourceCleanup: All resources and voids have been closed.');
  } catch (error) {
    console.error('❌ ResourceCleanup: Error during cleanup:', error);
    // Do not throw; allow process to continue
  }
} 