/**
 * ZeroPoint Node - Main Entry Point
 *
 * Decentralized Vortex Math & Toroidal Consciousness Network
 *
 * Each ZeroPoint instance runs independently on user devices,
 * connecting with other devices in a peer-to-peer network to
 * form a global consciousness field.
 */
export { ZeroPoint } from './core/ZeroPoint';
export { NetworkNode } from './core/NetworkNode';
export { CoilMixin, CoilBase, CoilObject, isCoilObject, getCoilFromObject } from './core/CoilMixin';
export { COIL_PATTERNS, CoilPattern, CoilPatternCategory, getCoilPattern, recognizeCoilPatterns, getCoilContext, getCoilResonanceFactors } from './core/CoilSystem';
export { ObserverMixin, Observer } from './core/Observer';
export { MathUtils, MATH_CONSTANTS, MathOperation, MathContext, MathResult, fractal, setConsciousness, setFieldResonance, setVortexStrength, setToroidalFlow, setVoidConnected } from './math/MathUtils';
export { FractalMath, generateFractalSequence, calculateConsciousnessField, generateFractalColor } from './math/FractalMath';
export { VortexMath, applyVortexTransform } from './math/VortexMath';
export { ToroidalGeometry } from './math/ToroidalGeometry';
export { AdvancedVBM } from './math/AdvancedVBM';
export { RodinCoil } from './math/RodinCoil';
export { generateBaseColors, getColorForVortexNumber, getColorForFamilyGroup, getColorForPolarMate, getColorForWAxis, getColorForPattern, getMetaphysicalContextForNumber, getVBMColorMap, getVBMColorLegend, generateConsciousnessGradient, generateFieldResonanceMap } from './math/VBMColorSystem';
export { FractalColorSystem } from './math/FractalColorSystem';
export { ConsciousnessField } from './consciousness/ConsciousnessField';
export { metaphysicalPatterns } from './emergence/patterns';
export { PatternRecognition } from './core/PatternRecognition';
export { UnifiedSystem } from './core/UnifiedSystem';
export { FieldUnitySystem } from './unity/FieldUnity';
export { DeviceConfig } from './types/DeviceConfig';
export { VORTEX_CONSTANTS, PatternCategory, ConstantsUtils } from './core/SharedConstants';
export { MathUtils as MathUtilsCore } from './core/MathUtils';
/**
 * Create a new ZeroPoint instance
 *
 * @param config - Device configuration
 * @returns Promise<ZeroPoint> - Initialized ZeroPoint instance
 */
export declare function createZeroPoint(config?: Partial<import('./types/DeviceConfig').DeviceConfig>): Promise<import('./core/ZeroPoint').ZeroPoint>;
/**
 * Quick start function for basic ZeroPoint setup
 */
export declare function quickStart(deviceName?: string): Promise<import('./core/ZeroPoint').ZeroPoint>;
/**
 * Production start function with monitoring and API
 */
export declare function productionStart(config?: Partial<import('./types/DeviceConfig').DeviceConfig>): Promise<{
    zeropoint: import('./core/ZeroPoint').ZeroPoint;
    api: import('./api/ProductionAPI').ProductionAPI;
}>;
/**
 * Get metaphysical insights about ZeroPoint
 */
export declare function getZeroPointInsights(): any;
//# sourceMappingURL=index.d.ts.map