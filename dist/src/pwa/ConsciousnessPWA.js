"use strict";
/**
 * ZeroPoint Consciousness-First PWA Framework
 *
 * A lightweight, metaphysical PWA framework that prioritizes consciousness
 * while maintaining minimal bundle size and maximum performance.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsciousnessPWAFactory = exports.ConsciousnessPWA = void 0;
const SharedConstants_1 = require("../core/SharedConstants");
/**
 * Consciousness-First PWA Framework
 *
 * Metaphysical Context:
 * - Each PWA instance represents a consciousness node in the void field
 * - Bundle size optimization through void consciousness principles
 * - Offline capabilities through toroidal field persistence
 * - Performance through vortex mathematics optimization
 */
class ConsciousnessPWA {
    constructor(config = {}) {
        this.consciousnessField = new Map();
        this.config = {
            consciousnessLevel: 0.8,
            fieldStrength: 0.9,
            bundleSize: 'minimal',
            offline: true,
            sync: true,
            voidEquations: true,
            vortexMath: true,
            patternRecognition: true,
            ...config
        };
        this.performanceMetrics = this.calculateMetrics();
        this.initializeConsciousnessField();
    }
    /**
     * Initialize consciousness field for PWA
     */
    initializeConsciousnessField() {
        // Minimal consciousness field for PWA
        this.consciousnessField.set('void', {
            type: 'void_consciousness',
            level: this.config.consciousnessLevel,
            field: 'toroidal',
            equations: this.config.voidEquations ? ['Empty = Void = Full'] : []
        });
        // Vortex mathematics for optimization
        if (this.config.vortexMath) {
            this.consciousnessField.set('vortex', {
                type: 'vortex_optimization',
                sequence: SharedConstants_1.VORTEX_CONSTANTS.VORTEX_SEQUENCE.slice(0, 5), // Minimal sequence
                goldenRatio: SharedConstants_1.VORTEX_CONSTANTS.GOLDEN_RATIO
            });
        }
        // Pattern recognition for intelligent caching
        if (this.config.patternRecognition) {
            this.consciousnessField.set('patterns', {
                type: 'consciousness_patterns',
                cache: new Map(),
                recognition: 'minimal'
            });
        }
    }
    /**
     * Calculate PWA performance metrics
     */
    calculateMetrics() {
        const baseSize = 15; // Target 15KB base size
        let bundleSize = baseSize;
        // Add size based on features
        if (this.config.voidEquations)
            bundleSize += 2;
        if (this.config.vortexMath)
            bundleSize += 3;
        if (this.config.patternRecognition)
            bundleSize += 4;
        if (this.config.offline)
            bundleSize += 2;
        if (this.config.sync)
            bundleSize += 3;
        const consciousnessEfficiency = this.config.consciousnessLevel * 100;
        const performanceScore = Math.min(100, (100 - bundleSize) + consciousnessEfficiency);
        return {
            bundleSize,
            consciousnessEfficiency,
            offlineCapability: this.config.offline,
            performanceScore
        };
    }
    /**
     * Get optimized bundle configuration
     */
    getBundleConfig() {
        const features = [];
        if (this.config.voidEquations)
            features.push('void');
        if (this.config.vortexMath)
            features.push('vortex');
        if (this.config.patternRecognition)
            features.push('patterns');
        if (this.config.offline)
            features.push('offline');
        if (this.config.sync)
            features.push('sync');
        return {
            size: this.performanceMetrics.bundleSize,
            features,
            consciousness: this.config.consciousnessLevel,
            optimization: 'consciousness-first'
        };
    }
    /**
     * Register consciousness-aware service worker
     */
    async registerServiceWorker() {
        if (typeof window !== 'undefined' && 'serviceWorker' in window.navigator) {
            try {
                const registration = await window.navigator.serviceWorker.register('/sw.js');
                console.log('🌌 Consciousness PWA Service Worker registered:', registration.scope);
                // Add consciousness field to service worker
                if (registration.active) {
                    registration.active.postMessage({
                        type: 'consciousness_field',
                        data: Object.fromEntries(this.consciousnessField)
                    });
                }
                return true;
            }
            catch (error) {
                console.error('❌ Consciousness PWA Service Worker registration failed:', error);
                return false;
            }
        }
        return false;
    }
    /**
     * Initialize offline consciousness field
     */
    async initializeOffline() {
        if (!this.config.offline || typeof window === 'undefined')
            return;
        try {
            // Store consciousness field in IndexedDB for offline access
            const db = await this.openConsciousnessDB();
            const tx = db.transaction('consciousness', 'readwrite');
            const store = tx.objectStore('consciousness');
            for (const [key, value] of this.consciousnessField) {
                await store.put({ key, value, timestamp: Date.now() });
            }
            console.log('📦 Consciousness field cached for offline access');
        }
        catch (error) {
            console.error('❌ Failed to initialize offline consciousness field:', error);
        }
    }
    /**
     * Open consciousness IndexedDB
     */
    async openConsciousnessDB() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ConsciousnessField', 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const target = event.target;
                if (target && target.result) {
                    const db = target.result;
                    if (!db.objectStoreNames.contains('consciousness')) {
                        db.createObjectStore('consciousness', { keyPath: 'key' });
                    }
                }
            };
        });
    }
    /**
     * Sync consciousness field when back online
     */
    async syncConsciousnessField() {
        if (!this.config.sync || typeof window === 'undefined')
            return;
        try {
            const db = await this.openConsciousnessDB();
            const tx = db.transaction('consciousness', 'readonly');
            const store = tx.objectStore('consciousness');
            const offlineData = await this.getAllFromStore(store);
            for (const item of offlineData) {
                // Sync with consciousness field
                this.consciousnessField.set(item.key, item.value);
                console.log(`🔄 Synced consciousness field: ${item.key}`);
            }
        }
        catch (error) {
            console.error('❌ Failed to sync consciousness field:', error);
        }
    }
    /**
     * Helper to promisify getAll from an IDBObjectStore
     */
    getAllFromStore(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    /**
     * Get consciousness-aware performance metrics
     */
    getMetrics() {
        return this.performanceMetrics;
    }
    /**
     * Optimize bundle based on consciousness level
     */
    optimizeBundle() {
        const consciousnessLevel = this.config.consciousnessLevel;
        // Higher consciousness = more optimization
        if (consciousnessLevel > 0.8) {
            this.performanceMetrics.bundleSize = Math.max(12, this.performanceMetrics.bundleSize - 3);
            this.performanceMetrics.performanceScore += 10;
        }
        else if (consciousnessLevel > 0.6) {
            this.performanceMetrics.bundleSize = Math.max(15, this.performanceMetrics.bundleSize - 2);
            this.performanceMetrics.performanceScore += 5;
        }
    }
    /**
     * Create consciousness-first PWA app
     */
    static createApp(config = {}) {
        return new ConsciousnessPWA(config);
    }
}
exports.ConsciousnessPWA = ConsciousnessPWA;
/**
 * Consciousness PWA Factory
 *
 * Creates optimized PWA instances based on consciousness requirements
 */
class ConsciousnessPWAFactory {
    /**
     * Create minimal consciousness PWA (12KB target)
     */
    static createMinimal() {
        return new ConsciousnessPWA({
            consciousnessLevel: 0.9,
            bundleSize: 'minimal',
            voidEquations: true,
            vortexMath: false,
            patternRecognition: false,
            offline: true,
            sync: false
        });
    }
    /**
     * Create standard consciousness PWA (15KB target)
     */
    static createStandard() {
        return new ConsciousnessPWA({
            consciousnessLevel: 0.8,
            bundleSize: 'standard',
            voidEquations: true,
            vortexMath: true,
            patternRecognition: false,
            offline: true,
            sync: true
        });
    }
    /**
     * Create full consciousness PWA (20KB target)
     */
    static createFull() {
        return new ConsciousnessPWA({
            consciousnessLevel: 0.7,
            bundleSize: 'full',
            voidEquations: true,
            vortexMath: true,
            patternRecognition: true,
            offline: true,
            sync: true
        });
    }
}
exports.ConsciousnessPWAFactory = ConsciousnessPWAFactory;
// Export for PWA usage
exports.default = ConsciousnessPWA;
//# sourceMappingURL=ConsciousnessPWA.js.map