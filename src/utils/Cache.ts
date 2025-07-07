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
  defaultTTL: number; // milliseconds
  cleanupInterval: number; // milliseconds
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

export class Cache {
  private config: CacheConfig;
  private cache: Map<string, CacheEntry> = new Map();
  private stats: {
    hits: number;
    misses: number;
    sets: number;
    deletes: number;
    evictions: number;
  } = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    evictions: 0
  };
  private cleanupInterval?: NodeJS.Timeout;

  constructor(config: Partial<CacheConfig> = {}) {
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
  public set<T>(key: string, value: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
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
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

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
  public has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a value from the cache
   */
  public delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
    }
    return deleted;
  }

  /**
   * Clear all entries from the cache
   */
  public clear(): void {
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
  public getStats(): CacheStats {
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
  public keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * Check if cache is full
   */
  public isFull(): boolean {
    return this.cache.size >= this.config.maxSize;
  }

  /**
   * Get or set a value (atomic operation)
   */
  public getOrSet<T>(key: string, factory: () => T, ttl?: number): T {
    const cached = this.get<T>(key);
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
  public async getOrSetAsync<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key);
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
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Stop cleanup interval
   */
  public stop(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
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
  private evictLRU(): void {
    let lruKey: string | null = null;
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
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.timestamp + entry.ttl;
  }
}

/**
 * Specialized caches for different use cases
 */
export class VortexMathCache extends Cache {
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
  public getVortexField(x: number, y: number, z: number, strength: number): number | null {
    const key = `vortex_field_${x.toFixed(3)}_${y.toFixed(3)}_${z.toFixed(3)}_${strength.toFixed(3)}`;
    return this.get<number>(key);
  }

  public setVortexField(x: number, y: number, z: number, strength: number, value: number): void {
    const key = `vortex_field_${x.toFixed(3)}_${y.toFixed(3)}_${z.toFixed(3)}_${strength.toFixed(3)}`;
    this.set(key, value, 300000); // 5 minutes TTL
  }
}

export class ResonanceCache extends Cache {
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
  public getResonance(level1: number, level2: number): number | null {
    const key = `resonance_${level1.toFixed(3)}_${level2.toFixed(3)}`;
    return this.get<number>(key);
  }

  public setResonance(level1: number, level2: number, value: number): void {
    const key = `resonance_${level1.toFixed(3)}_${level2.toFixed(3)}`;
    this.set(key, value, 300000); // 5 minutes TTL
  }
}

/**
 * Global cache instances
 */
export const globalCache = new Cache();
export const vortexMathCache = new VortexMathCache();
export const resonanceCache = new ResonanceCache(); 