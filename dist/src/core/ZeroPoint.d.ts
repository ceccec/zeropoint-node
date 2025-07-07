import { EventEmitter } from 'events';
import { VortexMath } from '../math/VortexMath';
import { ToroidalGeometry } from '../math/ToroidalGeometry';
import { NetworkNode } from './NetworkNode';
import { DeviceConfig } from '../types/DeviceConfig';
import { ConsciousnessField } from '../consciousness/ConsciousnessField';
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
    private config;
    private isActive;
    private resonanceField;
    private logger;
    private performanceTimer?;
    private startTime;
    constructor(config: DeviceConfig);
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
     * Send consciousness pattern to connected devices
     */
    broadcastPattern(pattern: any, targetDevices?: string[]): Promise<void>;
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
}
//# sourceMappingURL=ZeroPoint.d.ts.map