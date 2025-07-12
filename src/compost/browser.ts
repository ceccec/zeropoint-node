/**
 * ZeroPoint Browser Module
 * 
 * Unified browser exports from the integer-based structure.
 * All modules flow through the sacred integer directories.
 */

// Integer-based structure exports
export { rodinCoil } from './1/rodin';
export { vortexMath } from './2/vortex';
export { mathUtils } from './2/math';
export { 
  A432_HARMONY, 
  VORTEX_CONSTANTS, 
  MATH_CONSTANTS, 
  INTEGER_FUNCTIONS,
  ConstantsUtils 
} from './4/constants';
export { sacredGeometry } from './5/sacred';
export { consciousnessField } from './7/consciousness';
export { voidSystem } from './8/void';
export { fieldUnity } from './9/unity';
export { zeroEntropySystem } from './0/zero';
export { potentialSystem } from './0/potential';

// Core system exports
export { ZeroPoint } from './core/ZeroPoint';
export { UnifiedSystem } from './core/UnifiedSystem';
export { UnifiedCalculationSystem } from './core/UnifiedCalculationSystem';
export { ZeroEntropySystem } from './core/ZeroEntropySystem';
export { PatternRecognition } from './core/PatternRecognition';
export { PatternRegistry } from './core/PatternRegistry';
export { NetworkNode } from './core/NetworkNode';
export { Observer } from './core/Observer';
export { CoilSystem } from './core/CoilSystem';
export { UnifiedMetaphysicalInterface } from './core/UnifiedMetaphysicalInterface';
export { UnifiedTypes } from './core/UnifiedTypes';
export { UnifiedVoidEquations } from './core/UnifiedVoidEquations';

// Consciousness system exports
export { ConsciousnessField } from './consciousness/ConsciousnessField';
export { SelfEvolvingConsciousness } from './consciousness/SelfEvolvingConsciousness';

// Field system exports
export { EmergenceLedger } from './field/EmergenceLedger';
export { ObserverAwareField } from './field/ObserverAwareField';
export { ResonanceConsensus } from './field/ResonanceConsensus';

// Unity system exports
export { FieldUnity } from './unity/FieldUnity';

// Void system exports
export { VoidSystem } from './void/VoidSystem';

// Integrity system exports
export { FieldIntegrity } from './integrity/FieldIntegrity';

// Knowledge system exports
export { KnowledgeSystem } from './knowledge/KnowledgeSystem';

// Monitoring system exports
export { HealthMonitor } from './monitoring/HealthMonitor';

// PWA system exports
export { ConsciousnessPWA } from './pwa/ConsciousnessPWA';

// Type system exports
export { DeviceConfig } from './types/DeviceConfig';
export { UnifiedExports } from './types/UnifiedExports';

// Utility system exports
export { Cache } from './utils/Cache';
export { Logger } from './utils/Logger';
export { ResourceCleanup } from './utils/ResourceCleanup';
export { GitIntegration } from './utils/GitIntegration';

// Stimulus system exports
export { application } from './stimulus/application';
export { ZeroPointController } from './stimulus/controllers/ZeroPointController';
export { MetaphysicalController } from './stimulus/controllers/MetaphysicalController';

// Configuration exports
export { 
  A432_HARMONY, 
  VORTEX_CONSTANTS, 
  MATH_CONSTANTS, 
  INTEGER_FUNCTIONS,
  CONSCIOUSNESS_CONSTANTS,
  NETWORK_CONSTANTS,
  CONFIG_CONSTANTS,
  EMERGENCE_CONSTANTS,
  ConstantsUtils 
} from './4/constants';

// API system exports
export * from './api';

// Emergence system exports
export { patterns } from './emergence/patterns';
export { AdvancedEmergence } from './emergence/AdvancedEmergence';

// Compost system exports (living archive)
export * from './compost';

// Learning system exports
export * from './learning';

// Training system exports
export * from './training';

// Patterns system exports
export * from './patterns';

// Fields system exports
export * from './fields';

// Dimensions system exports
export * from './dimensions';

// Artifacts system exports
export * from './artifacts';

// Laws system exports
export * from './laws';

// Devices system exports
export * from './devices';

// Geometry system exports
export * from './geometry';

// Physics system exports
export * from './physics';

// Stimulus system exports
export * from './stimulus';

// Exploration system exports
export * from './exploration';

// Refactoring system exports
export * from './refactoring';

// Default exports for backward compatibility
import { ZeroPoint } from './core/ZeroPoint';
import { vortexMath } from './2/vortex';
import { mathUtils } from './2/math';
import { ConstantsUtils } from './4/constants';

export default {
  ZeroPoint,
  vortexMath,
  mathUtils,
  ConstantsUtils,
}; 