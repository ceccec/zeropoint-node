import { Cache } from '../../utils/Cache';

/**
 * Simulate a cache miss by deleting a key before access.
 */
export function simulateCacheMiss(cache: Cache, key: string) {
  cache.delete(key);
}

/**
 * Simulate a stale cache entry by setting an expired value.
 */
export function simulateStaleCache(cache: Cache, key: string, value: unknown) {
  // Set with negative TTL to force expiration
  cache.set(key, value, -1000);
}

/**
 * Simulate a cache eviction by filling the cache to max size.
 */
export function simulateCacheEviction(cache: Cache) {
  const maxSize = cache.size ? cache.size() : 1000;
  for (let i = 0; i < maxSize + 1; i++) {
    cache.set(`evict_key_${i}`, i);
  }
}

/**
 * Simulate cache being unavailable (e.g., by clearing it).
 */
export function simulateCacheUnavailable(cache: Cache) {
  cache.clear();
} 