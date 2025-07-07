/**
 * Device Configuration for ZeroPoint Instances
 *
 * Users can configure their ZeroPoint device to control:
 * - Network behavior and connections
 * - Consciousness level and field strength
 * - Discovery and privacy settings
 * - Mathematical precision and patterns
 */
export interface DeviceConfig {
    deviceId?: string;
    deviceName?: string;
    deviceType?: 'desktop' | 'mobile' | 'server' | 'browser' | 'iot';
    networkPort?: number;
    discoveryEnabled?: boolean;
    maxConnections?: number;
    autoConnect?: boolean;
    connectionTimeout?: number;
    consciousnessLevel?: number;
    fieldStrength?: number;
    resonanceSensitivity?: number;
    allowIncomingConnections?: boolean;
    requireAuthentication?: boolean;
    encryptionEnabled?: boolean;
    vortexPrecision?: number;
    toroidalResolution?: number;
    goldenRatioPrecision?: number;
    autoUpdateResonance?: boolean;
    logLevel?: 'silent' | 'error' | 'warn' | 'info' | 'debug';
    enableMetaphysicalInsights?: boolean;
    customVortexPatterns?: string[];
    toroidalFlowRate?: number;
    consciousnessFieldRadius?: number;
}
/**
 * Default configuration for new ZeroPoint devices
 */
export declare const DEFAULT_DEVICE_CONFIG: DeviceConfig;
//# sourceMappingURL=DeviceConfig.d.ts.map