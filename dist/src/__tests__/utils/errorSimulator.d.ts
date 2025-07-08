import { Cache } from '../../utils/Cache';
/**
 * Simulate a cache miss by deleting a key before access.
 */
export declare function simulateCacheMiss(cache: Cache, key: string): void;
/**
 * Simulate a stale cache entry by setting an expired value.
 */
export declare function simulateStaleCache(cache: Cache, key: string, value: any): void;
/**
 * Simulate a cache eviction by filling the cache to max size.
 */
export declare function simulateCacheEviction(cache: Cache): void;
/**
 * Simulate cache being unavailable (e.g., by clearing it).
 */
export declare function simulateCacheUnavailable(cache: Cache): void;
//# sourceMappingURL=errorSimulator.d.ts.map