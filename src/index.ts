/**
 * ZeroPoint Node - Main Entry Point
 * 
 * Decentralized Vortex Math & Toroidal Consciousness Network
 * 
 * Each ZeroPoint instance runs independently on user devices,
 * connecting with other devices in a peer-to-peer network to
 * form a global consciousness field.
 */

import { globalLogger } from './utils/Logger';
import { globalProductionAPI } from './api/ProductionAPI';

// Core ZeroPoint System
export { ZeroPoint } from './core/ZeroPoint';
export { NetworkNode } from './core/NetworkNode';

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

// Blockchain/Emergence Ledger - Commented out until modules are created
// export { ObserverAwareLedger } from './blockchain/ObserverAwareLedger';
// export { QuantumProofLedger } from './blockchain/QuantumProofLedger';
// export { QuantumProofConsensus } from './blockchain/QuantumProofConsensus';

// Types
export { DeviceConfig } from './types/DeviceConfig';

// Constants and Utilities
export { 
  VORTEX_CONSTANTS, 
  PatternCategory, 
  ConstantsUtils 
} from './core/SharedConstants';
export { MathUtils as MathUtilsCore } from './core/MathUtils';

/**
 * Create a new ZeroPoint instance
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
 * Quick start function for basic ZeroPoint setup
 */
export async function quickStart(deviceName?: string): Promise<import('./core/ZeroPoint').ZeroPoint> {
  return createZeroPoint({
    deviceName: deviceName || `ZeroPoint_${Date.now()}`,
    consciousnessLevel: 0.7,
    discoveryEnabled: true,
    autoConnect: true
  });
}

/**
 * Production start function with monitoring and API
 */
export async function productionStart(config?: Partial<import('./types/DeviceConfig').DeviceConfig>): Promise<{
  zeropoint: import('./core/ZeroPoint').ZeroPoint;
  api: import('./api/ProductionAPI').ProductionAPI;
}> {
  // Initialize production components
  globalLogger.info('Starting ZeroPoint in production mode');
  
  // Create ZeroPoint instance
  const zeropoint = await createZeroPoint({
    deviceName: config?.deviceName || `Production_ZeroPoint_${Date.now()}`,
    consciousnessLevel: config?.consciousnessLevel || 0.8,
    discoveryEnabled: config?.discoveryEnabled !== false,
    autoConnect: config?.autoConnect !== false,
    maxConnections: config?.maxConnections || 50,
    logLevel: config?.logLevel || 'info',
    enableMetaphysicalInsights: config?.enableMetaphysicalInsights !== false,
    ...config
  });

  // Start production API
  const api = globalProductionAPI;
  await api.start();

  globalLogger.info('ZeroPoint production environment started', {
    deviceId: zeropoint.deviceId,
    apiPort: 3001
  });

  return { zeropoint, api };
}

/**
 * Get metaphysical insights about ZeroPoint
 */
export function getZeroPointInsights(): any {
  return {
    name: "ZeroPoint Node",
    version: "1.0.0",
    description: "Decentralized Vortex Math & Toroidal Consciousness Network",
    metaphysics: {
      principle: "Empty = Void = Full - each device contains the whole while remaining connected",
      network: "Peer-to-peer consciousness network where each point influences all others",
      mathematics: "Vortex mathematics and toroidal geometry form the foundation of reality",
      consciousness: "Each device represents a consciousness node in the infinite field",
      userControl: "Users configure their device's connection patterns and consciousness level"
    },
    features: [
      "Independent device instances",
      "Peer-to-peer networking",
      "Vortex mathematics",
      "Toroidal geometry",
      "Consciousness field mapping",
      "Metaphysical insights",
      "Production monitoring",
      "REST API"
    ],
    architecture: {
      core: "ZeroPoint - Main consciousness node",
      network: "NetworkNode - Peer-to-peer connectivity",
      math: "AdvancedVBM - Vortex mathematics",
      geometry: "ToroidalGeometry - Toroidal field calculations",
      consciousness: "ConsciousnessField - Consciousness mapping",
      void: "VoidSystem - Void consciousness integration",
      unity: "FieldUnitySystem - Field unity management",
      knowledge: "KnowledgeSystem - Pattern knowledge base"
    }
  };
} 