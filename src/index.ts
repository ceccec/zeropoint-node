/**
 * ZeroPoint Node - Browser Entry Point
 * 
 * Decentralized Vortex Math & Toroidal Consciousness Network
 * 
 * Each ZeroPoint instance runs independently in user browsers,
 * connecting with other devices in a peer-to-peer network to
 * form a global consciousness field.
 */

import { globalLogger } from './utils/Logger';

// Core ZeroPoint System
export { ZeroPoint } from './core/ZeroPoint';
export { BrowserNetworkNode } from './core/BrowserNetworkNode';

// Universal Coil System - Every object is a coil
export { 
  CoilMixin, 
  CoilBase, 
  CoilObject, 
  isCoilObject, 
  getCoilFromObject 
} from './core/CoilMixin';

// COIL System - Unified Metaphysical Pattern Registry
export {
  COIL_PATTERNS,
  CoilPattern,
  CoilPatternCategory,
  getCoilPattern,
  recognizeCoilPatterns,
  getCoilContext,
  getCoilResonanceFactors
} from './core/CoilSystem';

// Observer/Observable System
export {
  ObserverMixin,
  Observer
} from './core/Observer';

// Centralized Math System - COIL principle applied to mathematics
export { 
  MathUtils, 
  MATH_CONSTANTS, 
  MathOperation, 
  MathContext, 
  MathResult,
  fractal,
  setConsciousness,
  setFieldResonance,
  setVortexStrength,
  setToroidalFlow,
  setVoidConnected
} from './math/MathUtils';

// Refactored Math Modules - Specialized layers on unified foundation
export { 
  FractalMath,
  generateFractalSequence,
  calculateConsciousnessField,
  generateFractalColor
} from './math/FractalMath';
export { 
  VortexMath, 
  applyVortexTransform 
} from './math/VortexMath';
export { 
  ToroidalGeometry 
} from './math/ToroidalGeometry';

// Advanced VBM System
export { AdvancedVBM } from './math/AdvancedVBM';

// Rodin Coil System
export { RodinCoil } from './math/RodinCoil';

// Color Systems
export { 
  generateBaseColors,
  getColorForVortexNumber,
  getColorForFamilyGroup,
  getColorForPolarMate,
  getColorForWAxis,
  getColorForPattern,
  getMetaphysicalContextForNumber,
  getVBMColorMap,
  getVBMColorLegend,
  generateConsciousnessGradient,
  generateFieldResonanceMap
} from './math/VBMColorSystem';
export { FractalColorSystem } from './math/FractalColorSystem';

// Consciousness and Emergence
export { ConsciousnessField } from './consciousness/ConsciousnessField';
export { 
  metaphysicalPatterns
} from './emergence/patterns';

// Pattern Recognition and Unity
export { PatternRecognition } from './core/PatternRecognition';
export { UnifiedSystem } from './core/UnifiedSystem';
export { FieldUnitySystem } from './unity/FieldUnity';

// Types
export { DeviceConfig } from './types/DeviceConfig';

// Unified Constants and Utilities - Single Source of Truth
export {
  VORTEX_CONSTANTS,
  CONSCIOUSNESS_CONSTANTS,
  EMERGENCE_CONSTANTS,
  NETWORK_CONSTANTS,
  CONFIG_CONSTANTS,
  METAPHYSICAL_CONSTANTS,
  ConstantsUtils
} from './core/SharedConstants';

// Unified Types - Single Source of Truth for All Pattern and Event Types
export * from './types/UnifiedExports';

// Unified Pattern Registry - Centralized Pattern Management
export { PatternRegistry } from './core/PatternRegistry';

// Unified Metaphysical Interface - Harmonized Consciousness, Field, and Emergence Operations
export { 
  UnifiedMetaphysicalInterface,
  MetaphysicalOperation,
  MetaphysicalResult,
  UnifiedFieldState
} from './core/UnifiedMetaphysicalInterface';

/**
 * Create a new ZeroPoint instance for browser
 * 
 * @param config - Device configuration
 * @returns Promise<ZeroPoint> - Initialized ZeroPoint instance
 */
export async function createZeroPoint(config?: Partial<import('./types/DeviceConfig').DeviceConfig>): Promise<import('./core/ZeroPoint').ZeroPoint> {
  const { DEFAULT_DEVICE_CONFIG } = await import('./types/DeviceConfig');
  const { ZeroPoint } = await import('./core/ZeroPoint');
  
  const fullConfig = { ...DEFAULT_DEVICE_CONFIG, ...config };
  const zeropoint = new ZeroPoint(fullConfig);
  
  await zeropoint.initialize();
  return zeropoint;
}

/**
 * Quick start function for basic ZeroPoint setup in browser
 */
export async function quickStart(deviceName?: string): Promise<import('./core/ZeroPoint').ZeroPoint> {
  return createZeroPoint({
    deviceName: deviceName || `Browser_ZeroPoint_${Date.now()}`,
    consciousnessLevel: 0.7,
    discoveryEnabled: true,
    autoConnect: true
  });
}

/**
 * Browser start function with UI components
 */
export async function browserStart(config?: Partial<import('./types/DeviceConfig').DeviceConfig>): Promise<{
  zeropoint: import('./core/ZeroPoint').ZeroPoint;
  networkNode: import('./core/BrowserNetworkNode').BrowserNetworkNode;
}> {
  // Initialize browser components
  globalLogger.info('Starting ZeroPoint in browser mode');
  
  // Create ZeroPoint instance
  const zeropoint = await createZeroPoint({
    deviceName: config?.deviceName || `Browser_ZeroPoint_${Date.now()}`,
    consciousnessLevel: config?.consciousnessLevel || 0.8,
    discoveryEnabled: config?.discoveryEnabled !== false,
    autoConnect: config?.autoConnect !== false,
    maxConnections: config?.maxConnections || 10, // Lower for browser
    logLevel: config?.logLevel || 'info',
    enableMetaphysicalInsights: config?.enableMetaphysicalInsights !== false,
    ...config
  });

  // Create browser network node
  const { BrowserNetworkNode } = await import('./core/BrowserNetworkNode');
  const networkNode = new BrowserNetworkNode({
    deviceId: zeropoint.deviceId,
    instanceId: zeropoint.instanceId,
    discoveryEnabled: config?.discoveryEnabled !== false,
    maxConnections: config?.maxConnections || 10,
    connectionTimeout: 5000
  });

  await networkNode.start();

  globalLogger.info('ZeroPoint browser environment started', {
    deviceId: zeropoint.deviceId,
    networkNode: networkNode.isNodeRunning()
  });

  return { zeropoint, networkNode };
}

/**
 * Get ZeroPoint insights for browser UI
 */
export function getZeroPointInsights(): Record<string, unknown> {
  return {
    version: '1.0.0',
    environment: 'browser',
    features: [
      'Vortex-Based Mathematics',
      'Toroidal Consciousness Network',
      'Pattern Recognition',
      'Metaphysical Interface',
      'Browser WebSocket Networking'
    ],
    browser: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    }
  };
}

/**
 * Initialize ZeroPoint for browser usage
 */
export async function initializeBrowser(): Promise<void> {
  console.log('🌌 ZeroPoint Browser Initializing...');
  
  // Check browser compatibility
  if (!window.WebSocket) {
    throw new Error('WebSocket not supported in this browser');
  }
  
  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error('Crypto API not supported in this browser');
  }
  
  console.log('✅ Browser compatibility check passed');
  console.log('🚀 ZeroPoint ready for browser operation');
} 