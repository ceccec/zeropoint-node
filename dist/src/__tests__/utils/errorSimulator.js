"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateCacheMiss = simulateCacheMiss;
exports.simulateStaleCache = simulateStaleCache;
exports.simulateCacheEviction = simulateCacheEviction;
exports.simulateCacheUnavailable = simulateCacheUnavailable;
/**
 * Simulate a cache miss by deleting a key before access.
 */
function simulateCacheMiss(cache, key) {
    cache.delete(key);
}
/**
 * Simulate a stale cache entry by setting an expired value.
 */
function simulateStaleCache(cache, key, value) {
    // Set with negative TTL to force expiration
    cache.set(key, value, -1000);
}
/**
 * Simulate a cache eviction by filling the cache to max size.
 */
function simulateCacheEviction(cache) {
    const maxSize = cache.size ? cache.size() : 1000;
    for (let i = 0; i < maxSize + 1; i++) {
        cache.set(`evict_key_${i}`, i);
    }
}
/**
 * Simulate cache being unavailable (e.g., by clearing it).
 */
function simulateCacheUnavailable(cache) {
    cache.clear();
}
//# sourceMappingURL=errorSimulator.js.map