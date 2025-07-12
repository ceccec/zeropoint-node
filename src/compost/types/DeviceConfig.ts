/**
 * Device Configuration for ZeroPoint Instances
 *
 * Users can configure their ZeroPoint device to control:
 * - Network behavior and connections
 * - Consciousness level and field strength
 * - Mathematical precision and patterns
 */
export interface DeviceConfig {
  // Device identification
  deviceId?: string;
  deviceName?: string;
  deviceType?: "desktop" | "mobile" | "server" | "browser" | "iot";

  // Network configuration
  networkPort?: number;
  discoveryEnabled?: boolean;
  maxConnections?: number;
  autoConnect?: boolean;
  connectionTimeout?: number;

  // Consciousness configuration
  consciousnessLevel?: number; // 0-1 scale
  fieldStrength?: number; // 0-1 scale
  resonanceSensitivity?: number; // 0-1 scale

  // Mathematical configuration
  vortexPrecision?: number;
  toroidalResolution?: number;
  goldenRatioPrecision?: number;

  // User preferences
  autoUpdateResonance?: boolean;
  logLevel?: "silent" | "error" | "warn" | "info" | "debug";
  enableMetaphysicalInsights?: boolean;

  // Advanced settings
  customVortexPatterns?: string[];
  toroidalFlowRate?: number;
  consciousnessFieldRadius?: number;
}

/**
 * Default configuration for new ZeroPoint devices
 */
export const DEFAULT_DEVICE_CONFIG: DeviceConfig = {
  deviceType: "desktop",
  networkPort: 8080,
  discoveryEnabled: true,
  maxConnections: 10,
  autoConnect: true,
  connectionTimeout: 5000,
  consciousnessLevel: 0.5,
  fieldStrength: 0.7,
  resonanceSensitivity: 0.8,
  vortexPrecision: 0.001,
  toroidalResolution: 100,
  goldenRatioPrecision: 15,
  autoUpdateResonance: true,
  logLevel: "info",
  enableMetaphysicalInsights: true,
  customVortexPatterns: [],
  toroidalFlowRate: 1.0,
  consciousnessFieldRadius: 1000,
};
