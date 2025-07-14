# QA Improvements: Golden Ratio Caching & Error Simulation

## Golden Ratio Caching

- **What:** Uses the golden ratio (φ ≈ 1.618) to configure cache size, TTL, and cleanup interval for test memoization.
- **Why:** Speeds up expensive, deterministic test calculations and ensures cache hit patterns are naturally distributed.
- **How:**
  - Use `getOrSetGolden(fnName, args, factory)` from `src/__tests__/utils/goldenRatioCache.ts` in your tests.
  - Example:
    ```ts
    import { getOrSetGolden } from '../utils/goldenRatioCache';
    const result = getOrSetGolden('digitalRoot', [42], () => vbm.digitalRoot(42));
    ```
  - The cache is pre-configured with φ-based size and TTL for optimal performance.

## Error Simulation Utilities

- **What:** Functions to simulate cache errors, evictions, and stale data for robust QA.
- **Why:** Ensures your system and tests handle cache-related errors gracefully and do not mask bugs.
- **How:**
  - Use from `src/__tests__/utils/errorSimulator.ts`:
    - `simulateCacheMiss(cache, key)`
    - `simulateStaleCache(cache, key, value)`
    - `simulateCacheEviction(cache)`
    - `simulateCacheUnavailable(cache)`
  - Example:
    ```ts
    import { simulateCacheMiss, simulateStaleCache } from '../utils/errorSimulator';
    simulateCacheMiss(goldenRatioCache, 'digitalRoot_42');
    simulateStaleCache(goldenRatioCache, 'digitalRoot_42', 99);
    ```

## Best Practices

- Use golden ratio caching for deterministic, expensive test operations.
- Always run a subset of tests with cache disabled or cleared to ensure correctness.
- Use error simulation utilities to test system resilience to cache failures.
- Document which tests rely on caching and why.

## Toggle

- You can enable/disable golden ratio caching or error simulation by importing or commenting out the relevant utility in your test files.
- For CI, consider running both cached and uncached test suites for full QA coverage. 