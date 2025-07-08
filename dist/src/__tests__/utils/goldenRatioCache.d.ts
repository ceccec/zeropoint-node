import { Cache } from '../../utils/Cache';
export declare class GoldenRatioCache extends Cache {
    constructor();
}
export declare const goldenRatioCache: GoldenRatioCache;
/**
 * Memoize a function using the golden ratio cache.
 * Key is generated from the function name and arguments, rounded to 3 decimals for stability.
 */
export declare function getOrSetGolden<T>(fnName: string, args: any[], factory: () => T): T;
//# sourceMappingURL=goldenRatioCache.d.ts.map