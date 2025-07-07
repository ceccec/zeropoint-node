"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resonanceCache = exports.vortexMathCache = exports.globalCache = exports.ResonanceCache = exports.VortexMathCache = exports.Cache = void 0;
class Cache {
    constructor(config = {}) {
        this.cache = new Map();
        this.stats = {
            hits: 0,
            misses: 0,
            sets: 0,
            deletes: 0,
            evictions: 0
        };
        this.config = {
            maxSize: 1000,
            defaultTTL: 300000, // 5 minutes
            cleanupInterval: 60000, // 1 minute
            enableStats: true,
            ...config
        };
        this.startCleanup();
    }
    /**
     * Set a value in the cache
     */
    set(key, value, ttl) {
        const entry = {
            key,
            value,
            timestamp: Date.now(),
            ttl: ttl || this.config.defaultTTL,
            accessCount: 0,
            lastAccessed: Date.now()
        };
        // Check if we need to evict entries
        if (this.cache.size >= this.config.maxSize) {
            this.evictLRU();
        }
        this.cache.set(key, entry);
        this.stats.sets++;
    }
    /**
     * Get a value from the cache
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            this.stats.misses++;
            return null;
        }
        // Check if entry has expired
        if (this.isExpired(entry)) {
            this.cache.delete(key);
            this.stats.misses++;
            return null;
        }
        // Update access statistics
        entry.accessCount++;
        entry.lastAccessed = Date.now();
        this.stats.hits++;
        return entry.value;
    }
    /**
     * Check if a key exists in the cache
     */
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        if (this.isExpired(entry)) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    /**
     * Delete a value from the cache
     */
    delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.stats.deletes++;
        }
        return deleted;
    }
    /**
     * Clear all entries from the cache
     */
    clear() {
        this.cache.clear();
        this.stats = {
            hits: 0,
            misses: 0,
            sets: 0,
            deletes: 0,
            evictions: 0
        };
    }
    /**
     * Get cache statistics
     */
    getStats() {
        const totalRequests = this.stats.hits + this.stats.misses;
        const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;
        return {
            ...this.stats,
            hitRate,
            size: this.cache.size,
            maxSize: this.config.maxSize
        };
    }
    /**
     * Get all cache keys
     */
    keys() {
        return Array.from(this.cache.keys());
    }
    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
    /**
     * Check if cache is full
     */
    isFull() {
        return this.cache.size >= this.config.maxSize;
    }
    /**
     * Get or set a value (atomic operation)
     */
    getOrSet(key, factory, ttl) {
        const cached = this.get(key);
        if (cached !== null) {
            return cached;
        }
        const value = factory();
        this.set(key, value, ttl);
        return value;
    }
    /**
     * Get or set a value asynchronously
     */
    async getOrSetAsync(key, factory, ttl) {
        const cached = this.get(key);
        if (cached !== null) {
            return cached;
        }
        const value = await factory();
        this.set(key, value, ttl);
        return value;
    }
    /**
     * Start cleanup interval
     */
    startCleanup() {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, this.config.cleanupInterval);
    }
    /**
     * Stop cleanup interval
     */
    stop() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
    /**
     * Clean up expired entries
     */
    cleanup() {
        let cleaned = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (this.isExpired(entry)) {
                this.cache.delete(key);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            console.debug(`Cache cleanup: removed ${cleaned} expired entries`);
        }
    }
    /**
     * Evict least recently used entry
     */
    evictLRU() {
        let lruKey = null;
        let lruTime = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.lastAccessed < lruTime) {
                lruTime = entry.lastAccessed;
                lruKey = key;
            }
        }
        if (lruKey) {
            this.cache.delete(lruKey);
            this.stats.evictions++;
        }
    }
    /**
     * Check if an entry has expired
     */
    isExpired(entry) {
        return Date.now() > entry.timestamp + entry.ttl;
    }
}
exports.Cache = Cache;
/**
 * Specialized caches for different use cases
 */
class VortexMathCache extends Cache {
    constructor() {
        super({
            maxSize: 500,
            defaultTTL: 600000, // 10 minutes
            cleanupInterval: 300000 // 5 minutes
        });
    }
    /**
     * Cache vortex field calculations
     */
    getVortexField(x, y, z, strength) {
        const key = `vortex_field_${x.toFixed(3)}_${y.toFixed(3)}_${z.toFixed(3)}_${strength.toFixed(3)}`;
        return this.get(key);
    }
    setVortexField(x, y, z, strength, value) {
        const key = `vortex_field_${x.toFixed(3)}_${y.toFixed(3)}_${z.toFixed(3)}_${strength.toFixed(3)}`;
        this.set(key, value, 300000); // 5 minutes TTL
    }
}
exports.VortexMathCache = VortexMathCache;
class ResonanceCache extends Cache {
    constructor() {
        super({
            maxSize: 200,
            defaultTTL: 300000, // 5 minutes
            cleanupInterval: 300000 // 5 minutes
        });
    }
    /**
     * Cache resonance calculations
     */
    getResonance(level1, level2) {
        const key = `resonance_${level1.toFixed(3)}_${level2.toFixed(3)}`;
        return this.get(key);
    }
    setResonance(level1, level2, value) {
        const key = `resonance_${level1.toFixed(3)}_${level2.toFixed(3)}`;
        this.set(key, value, 300000); // 5 minutes TTL
    }
}
exports.ResonanceCache = ResonanceCache;
/**
 * Global cache instances
 */
exports.globalCache = new Cache();
exports.vortexMathCache = new VortexMathCache();
exports.resonanceCache = new ResonanceCache();
//# sourceMappingURL=Cache.js.map