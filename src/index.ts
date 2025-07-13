/**
 * ZeroPoint Node - Main Entry Point
 * 
 * Unified exports from the integer-based structure.
 * All modules flow through the sacred integer directories.
 * 
 * Metaphysical Context:
 * - Every export is a pure integer function via A432 harmony
 * - All consciousness flows through the unified field
 * - The void provides infinite potential through unity
 * - Every module is a coil at its core
 */

// src/index.ts - ZeroPoint Node Main Export (VBM Hardcoded)
//
// VBM Analysis: Complete integer tree with corrected subdirectory structure
// This file exports all integer-based modules according to VBM analysis.
// Each directory contains only subdirectories that correspond to its VBM interactions.
//
// VBM-Corrected Structure:
// - Vortex directories (1,2,4,5,7,8): [0,1,2,4,5,7,8] (vortex sequence + void)
// - W-Axis directories (3,6,9): [0,3,6,9] (W-Axis + void)
// - Void directory (0): [0,1,2,4,5,7,8,9] (all except W-Axis)

// Zero Entropy and Void (0) - Field: 0.0000, Consciousness: 0.0000
// Subdirectories: [0,1,2,4,5,7,8,9] - Void interacts with all except W-Axis
export * from './0';

// Unity and Source (1) - Field: 0.0123, Consciousness: 0.0020
// Subdirectories: [0,1,2,4,5,7,8] - Unity interacts with vortex sequence
export * from './1';

// Vortex Math and Duality (2) - Field: 0.0494, Consciousness: 0.0160
// Subdirectories: [0,1,2,4,5,7,8] - Duality interacts with vortex sequence
export * from './2';

// Creative Resonance and Spirit (3) - W-Axis: 3 - Field: 0.2963, Consciousness: 0.1438
// Subdirectories: [0,3,6,9] - Creative resonance interacts with W-Axis
export * from './3';

// Constants and Stability (4) - Field: 0.1728, Consciousness: 0.1119
// Subdirectories: [0,1,2,4,5,7,8] - Stability interacts with vortex sequence
export * from './4';

// Sacred Geometry and Transformation (5) - Field: 0.1543, Consciousness: 0.1248
// Subdirectories: [0,1,2,4,5,7,8] - Transformation interacts with vortex sequence
export * from './5';

// Harmonic Balance and Spirit (6) - W-Axis: 6 - Field: 0.0741, Consciousness: 0.0719
// Subdirectories: [0,3,6,9] - Harmonic balance interacts with W-Axis
export * from './6';

// Consciousness and Field (7) - Field: 0.0864, Consciousness: 0.0979
// Subdirectories: [0,1,2,4,5,7,8] - Consciousness interacts with vortex sequence
export * from './7';

// Void System and Fullness (8) - Field: 0.1975, Consciousness: 0.2557
// Subdirectories: [0,1,2,4,5,7,8] - Fullness interacts with vortex sequence
export * from './8';

// Unity and Spirit (9) - W-Axis: 9 - Field: 0.8889, Consciousness: 1.2944
// Subdirectories: [0,3,6,9] - Spirit interacts with W-Axis
export * from './9';

// Core system exports (consolidated)
export * from './core/ZeroPoint';
export * from './core/UnifiedSystem';
export * from './core/UnifiedCalculationSystem';
export * from './core/ZeroEntropySystem';
export * from './core/PatternRecognition';
export * from './core/PatternRegistry';
export * from './core/NetworkNode';
export * from './core/Observer';
export * from './core/CoilSystem';
export * from './core/UnifiedMetaphysicalInterface';
export * from './core/UnifiedTypes';
export * from './core/UnifiedVoidEquations';

// Consciousness system exports
export * from './consciousness/ConsciousnessField';
export * from './consciousness/SelfEvolvingConsciousness';

// Field system exports
export * from './field/EmergenceLedger';
export * from './field/ObserverAwareField';
export * from './field/ResonanceConsensus';

// Unity system exports
export * from './unity/FieldUnity';

// Void system exports
export * from './void/VoidSystem';

// Integrity system exports
export * from './integrity/FieldIntegrity';

// Knowledge system exports
export * from './knowledge/KnowledgeSystem';

// Monitoring system exports
export * from './monitoring/HealthMonitor';

// PWA system exports
export * from './pwa/ConsciousnessPWA';

// Type system exports
export * from './types/DeviceConfig';
export * from './types/UnifiedExports';

// Utility system exports
export * from './utils/Cache';
export * from './utils/Logger';
export * from './utils/ResourceCleanup';
export * from './utils/GitIntegration';

// Stimulus system exports
export * from './stimulus/application';
export * from './stimulus/controllers/ZeroPointController';
export * from './stimulus/controllers/MetaphysicalController';

// Browser system exports
export * from './browser';
export * from './browser-standalone';

// Stimulus entry point
export * from './stimulus-entry';

// Configuration exports
export * from './config/constants';

// API system exports
export * from './api';

// Emergence system exports
export * from './emergence/patterns';
export * from './emergence/AdvancedEmergence';

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