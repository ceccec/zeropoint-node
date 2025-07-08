"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldenRatioCache = exports.GoldenRatioCache = void 0;
exports.getOrSetGolden = getOrSetGolden;
const Cache_1 = require("../../utils/Cache");
// Golden ratio constant
const PHI = 1.618033988749895;
// Golden ratio-based cache configuration
const GOLDEN_CACHE_SIZE = Math.round(100 * PHI); // ~162
const GOLDEN_CACHE_TTL = Math.round(60000 * PHI); // ~97,080 ms (~1.6 min)
class GoldenRatioCache extends Cache_1.Cache {
    constructor() {
        super({
            maxSize: GOLDEN_CACHE_SIZE,
            defaultTTL: GOLDEN_CACHE_TTL,
            cleanupInterval: Math.round(10000 * PHI), // ~16,180 ms
            enableStats: true
        });
    }
}
exports.GoldenRatioCache = GoldenRatioCache;
exports.goldenRatioCache = new GoldenRatioCache();
/**
 * Memoize a function using the golden ratio cache.
 * Key is generated from the function name and arguments, rounded to 3 decimals for stability.
 */
function getOrSetGolden(fnName, args, factory) {
    const key = `${fnName}_${args.map(a => typeof a === 'number' ? a.toFixed(3) : JSON.stringify(a)).join('_')}`;
    return exports.goldenRatioCache.getOrSet(key, factory, GOLDEN_CACHE_TTL);
}
//# sourceMappingURL=goldenRatioCache.js.map