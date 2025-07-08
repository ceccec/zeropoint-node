/**
 * Global Teardown Script
 * Uses centralized ResourceCleanup utility to close all "voids" (open handles)
 * and ensure graceful test completion.
 *
 * Usage:
 *   export default globalTeardown;
 */

import { cleanupResources } from '../utils/ResourceCleanup';
import { globalHealthMonitor } from "../monitoring/HealthMonitor";
import { globalCache, vortexMathCache, resonanceCache } from "../utils/Cache";
import { gitIntegration } from "../utils/GitIntegration";
import { goldenRatioCache } from "./utils/goldenRatioCache";

// Global variables to track resources that need cleanup
declare global {
  const globalHealthMonitor: any;
  const globalCache: any;
  const vortexMathCache: any;
  const resonanceCache: any;
  const gitIntegration: any;
  const goldenRatioCache: any;
}

/**
 * Close all open handles and clean up resources
 * This ensures no "voids" remain open after tests complete
 */
export default async function globalTeardown(): Promise<void> {
  await cleanupResources({
    healthMonitor: globalHealthMonitor,
    caches: [globalCache, vortexMathCache, resonanceCache, goldenRatioCache],
    gitIntegration,
    enableGC: true
  });
}
