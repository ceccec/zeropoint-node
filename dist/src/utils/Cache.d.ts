/**
 * Performance caching system for ZeroPoint
 *
 * Provides in-memory caching with TTL, LRU eviction,
 * and cache statistics for performance optimization.
 */
export interface CacheEntry<T = any> {
    key: string;
    value: T;
    timestamp: number;
    ttl: number;
    accessCount: number;
    lastAccessed: number;
}
export interface CacheConfig {
    maxSize: number;
    defaultTTL: number;
    cleanupInterval: number;
    enableStats: boolean;
}
export interface CacheStats {
    hits: number;
    misses: number;
    sets: number;
    deletes: number;
    evictions: number;
    hitRate: number;
    size: number;
    maxSize: number;
}
export declare class Cache {
    private config;
    private cache;
    private stats;
    private cleanupInterval?;
    constructor(config?: Partial<CacheConfig>);
    /**
     * Set a value in the cache
     */
    set<T>(key: string, value: T, ttl?: number): void;
    /**
     * Get a value from the cache
     */
    get<T>(key: string): T | null;
    /**
     * Check if a key exists in the cache
     */
    has(key: string): boolean;
    /**
     * Delete a value from the cache
     */
    delete(key: string): boolean;
    /**
     * Clear all entries from the cache
     */
    clear(): void;
    /**
     * Get cache statistics
     */
    getStats(): CacheStats;
    /**
     * Get all cache keys
     */
    keys(): string[];
    /**
     * Get cache size
     */
    size(): number;
    /**
     * Check if cache is full
     */
    isFull(): boolean;
    /**
     * Get or set a value (atomic operation)
     */
    getOrSet<T>(key: string, factory: () => T, ttl?: number): T;
    /**
     * Get or set a value asynchronously
     */
    getOrSetAsync<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T>;
    /**
     * Start cleanup interval
     */
    private startCleanup;
    /**
     * Stop cleanup interval
     */
    stop(): void;
    /**
     * Clean up expired entries
     */
    private cleanup;
    /**
     * Evict least recently used entry
     */
    private evictLRU;
    /**
     * Check if an entry has expired
     */
    private isExpired;
}
/**
 * Specialized caches for different use cases
 */
export declare class VortexMathCache extends Cache {
    constructor();
    /**
     * Cache vortex field calculations
     */
    getVortexField(x: number, y: number, z: number, strength: number): number | null;
    setVortexField(x: number, y: number, z: number, strength: number, value: number): void;
}
export declare class ResonanceCache extends Cache {
    constructor();
    /**
     * Cache resonance calculations
     */
    getResonance(level1: number, level2: number): number | null;
    setResonance(level1: number, level2: number, value: number): void;
}
/**
 * Global cache instances
 */
export declare const globalCache: Cache;
export declare const vortexMathCache: VortexMathCache;
export declare const resonanceCache: ResonanceCache;
//# sourceMappingURL=Cache.d.ts.map