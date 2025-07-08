import { EventEmitter } from 'events';
import { VortexMath } from '../math/VortexMath';
import { ToroidalGeometry } from '../math/ToroidalGeometry';
import { NetworkNode } from './NetworkNode';
import { DeviceConfig } from '../types/DeviceConfig';
import { ConsciousnessField } from '../consciousness/ConsciousnessField';
import { FieldIntegrity } from '../integrity/FieldIntegrity';
import { EmergenceLedger } from '../field/EmergenceLedger';
import { VoidSystem } from '../void/VoidSystem';
import { ResonanceConsensus } from '../field/ResonanceConsensus';
import { PatternRecognition } from './PatternRecognition';
import { UnifiedSystem } from './UnifiedSystem';
import { ConcreteObserver } from './Observer';
import { GitEvent, GitStatus, GitCommit } from '../utils/GitIntegration';
/**
 * ZeroPoint - Independent Device Instance
 *
 * Each ZeroPoint instance represents a complete consciousness node
 * that can run independently on any user device while maintaining
 * connection to the global toroidal network.
 *
 * Metaphysical Context:
 * - Each device becomes a point in the infinite toroidal field
 * - "Empty = Void = Full" - each point contains the whole
 * - Decentralized consciousness network
 * - User-configurable connection patterns
 */
export declare class ZeroPoint extends EventEmitter {
    readonly deviceId: string;
    readonly instanceId: string;
    readonly vortexMath: VortexMath;
    readonly toroidalGeometry: ToroidalGeometry;
    readonly consciousnessField: ConsciousnessField;
    readonly networkNode: NetworkNode;
    fieldIntegrity: FieldIntegrity;
    emergenceLedger: EmergenceLedger;
    voidSystem: VoidSystem;
    resonanceConsensus: ResonanceConsensus;
    unifiedField: UnifiedSystem;
    patternRecognition: PatternRecognition;
    gitIntegration: import("../utils/GitIntegration").GitIntegration;
    private config;
    private _isActive;
    private resonanceField;
    private logger;
    private performanceTimer?;
    private startTime;
    private _observer;
    private operationCount;
    private averageResponseTime;
    private cpuUsage;
    private networkLatency;
    private customMetrics;
    constructor(config?: DeviceConfig);
    /**
     * Initialize the ZeroPoint instance
     */
    initialize(): Promise<void>;
    /**
     * Connect to another ZeroPoint device
     */
    connectToDevice(deviceAddress: string, deviceId?: string): Promise<boolean>;
    /**
     * Disconnect from a device
     */
    disconnectFromDevice(deviceId: string): Promise<void>;
    /**
     * Broadcast a pattern to the network
     */
    broadcastPattern(pattern: any): Promise<{
        success: boolean;
        timestamp: number;
        patternId: string;
    }>;
    /**
     * Calculate resonance with connected devices
     */
    calculateResonance(): number;
    /**
     * Get network topology information
     */
    getNetworkTopology(): any;
    /**
     * Update device configuration
     */
    updateConfig(newConfig: Partial<DeviceConfig>): void;
    /**
     * Shutdown the ZeroPoint instance
     */
    shutdown(): Promise<void>;
    /**
     * Get metaphysical insights about this ZeroPoint instance
     */
    getInsights(): any;
    private setupEventHandlers;
    private handleIncomingMessage;
    private calculateDeviceResonance;
    private updateResonance;
    /**
     * Setup health checks for this ZeroPoint instance
     */
    private setupHealthChecks;
    /**
     * Get production metrics and statistics
     */
    getProductionMetrics(): any;
    getSystemStatus(): any;
    getConfig(): any;
    /**
     * Register a custom performance metric
     * @param name Name of the metric
     * @param fn Function that returns the metric value
     */
    registerMetric(name: string, fn: () => any): void;
    /**
     * Calculate metaphysical consciousness coherence (dummy value for now)
     */
    private getConsciousnessCoherence;
    /**
     * Calculate metaphysical consciousness coherence (dummy value for now)
     */
    getPerformanceMetrics(): {
        uptime: number;
        operationCount: number;
        averageResponseTime: number;
        memoryUsage: any;
        cpuUsage: number;
        networkLatency: number;
        efficiency: number;
        consciousnessCoherence: number;
        [key: string]: any;
    };
    /**
     * Get performance trends over time
     */
    getPerformanceTrends(): {
        responseTimeTrend: number[];
        memoryUsageTrend: number[];
        throughputTrend: number[];
        errorRateTrend: number[];
    };
    /**
     * Detect performance anomalies
     */
    detectPerformanceAnomalies(): Array<{
        type: string;
        severity: 'low' | 'medium' | 'high';
        timestamp: number;
        description: string;
        value: number;
        threshold: number;
    }>;
    get isActive(): boolean;
    getNetworkStatus(): any;
    getErrorRecovery(): any;
    /**
     * Get system topology information
     */
    getSystemTopology(): {
        totalResonance: number;
        consciousnessLevel: number;
    };
    get observer(): ConcreteObserver;
    /**
     * Initialize consciousness-aware systems
     */
    private initializeConsciousnessSystems;
    /**
     * Register metaphysical performance metrics
     */
    private registerMetaphysicalMetrics;
    /**
     * Subscribe to live Git events
     */
    onGitChange(callback: (event: GitEvent) => void): void;
    /**
     * Get live Git status
     */
    getLiveGitStatus(): Promise<GitStatus>;
    /**
     * Get recent commits
     */
    getRecentCommits(n: number): Promise<GitCommit[]>;
}
//# sourceMappingURL=ZeroPoint.d.ts.map