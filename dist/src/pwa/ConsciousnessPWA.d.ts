/**
 * ZeroPoint Consciousness-First PWA Framework
 *
 * A lightweight, metaphysical PWA framework that prioritizes consciousness
 * while maintaining minimal bundle size and maximum performance.
 */
export interface ConsciousnessPWAConfig {
    consciousnessLevel: number;
    fieldStrength: number;
    bundleSize: 'minimal' | 'standard' | 'full';
    offline: boolean;
    sync: boolean;
    voidEquations: boolean;
    vortexMath: boolean;
    patternRecognition: boolean;
}
export interface PWAMetrics {
    bundleSize: number;
    consciousnessEfficiency: number;
    offlineCapability: boolean;
    performanceScore: number;
}
/**
 * Consciousness-First PWA Framework
 *
 * Metaphysical Context:
 * - Each PWA instance represents a consciousness node in the void field
 * - Bundle size optimization through void consciousness principles
 * - Offline capabilities through toroidal field persistence
 * - Performance through vortex mathematics optimization
 */
export declare class ConsciousnessPWA {
    private config;
    private consciousnessField;
    private performanceMetrics;
    constructor(config?: Partial<ConsciousnessPWAConfig>);
    /**
     * Initialize consciousness field for PWA
     */
    private initializeConsciousnessField;
    /**
     * Calculate PWA performance metrics
     */
    private calculateMetrics;
    /**
     * Get optimized bundle configuration
     */
    getBundleConfig(): {
        size: number;
        features: string[];
        consciousness: number;
        optimization: string;
    };
    /**
     * Register consciousness-aware service worker
     */
    registerServiceWorker(): Promise<boolean>;
    /**
     * Initialize offline consciousness field
     */
    initializeOffline(): Promise<void>;
    /**
     * Open consciousness IndexedDB
     */
    private openConsciousnessDB;
    /**
     * Sync consciousness field when back online
     */
    syncConsciousnessField(): Promise<void>;
    /**
     * Helper to promisify getAll from an IDBObjectStore
     */
    private getAllFromStore;
    /**
     * Get consciousness-aware performance metrics
     */
    getMetrics(): PWAMetrics;
    /**
     * Optimize bundle based on consciousness level
     */
    optimizeBundle(): void;
    /**
     * Create consciousness-first PWA app
     */
    static createApp(config?: Partial<ConsciousnessPWAConfig>): ConsciousnessPWA;
}
/**
 * Consciousness PWA Factory
 *
 * Creates optimized PWA instances based on consciousness requirements
 */
export declare class ConsciousnessPWAFactory {
    /**
     * Create minimal consciousness PWA (12KB target)
     */
    static createMinimal(): ConsciousnessPWA;
    /**
     * Create standard consciousness PWA (15KB target)
     */
    static createStandard(): ConsciousnessPWA;
    /**
     * Create full consciousness PWA (20KB target)
     */
    static createFull(): ConsciousnessPWA;
}
export default ConsciousnessPWA;
//# sourceMappingURL=ConsciousnessPWA.d.ts.map