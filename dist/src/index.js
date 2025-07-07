"use strict";
/**
 * ZeroPoint Node - Main Entry Point
 *
 * Decentralized Vortex Math & Toroidal Consciousness Network
 *
 * Each ZeroPoint instance runs independently on user devices,
 * connecting with other devices in a peer-to-peer network to
 * form a global consciousness field.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtilsCore = exports.ConstantsUtils = exports.VORTEX_CONSTANTS = exports.FieldUnitySystem = exports.UnifiedSystem = exports.PatternRecognition = exports.metaphysicalPatterns = exports.ConsciousnessField = exports.FractalColorSystem = exports.generateFieldResonanceMap = exports.generateConsciousnessGradient = exports.getVBMColorLegend = exports.getVBMColorMap = exports.getMetaphysicalContextForNumber = exports.getColorForPattern = exports.getColorForWAxis = exports.getColorForPolarMate = exports.getColorForFamilyGroup = exports.getColorForVortexNumber = exports.generateBaseColors = exports.RodinCoil = exports.AdvancedVBM = exports.ToroidalGeometry = exports.applyVortexTransform = exports.VortexMath = exports.generateFractalColor = exports.calculateConsciousnessField = exports.generateFractalSequence = exports.FractalMath = exports.setVoidConnected = exports.setToroidalFlow = exports.setVortexStrength = exports.setFieldResonance = exports.setConsciousness = exports.fractal = exports.MATH_CONSTANTS = exports.MathUtils = exports.ObserverMixin = exports.getCoilResonanceFactors = exports.getCoilContext = exports.recognizeCoilPatterns = exports.getCoilPattern = exports.COIL_PATTERNS = exports.getCoilFromObject = exports.isCoilObject = exports.CoilBase = exports.CoilMixin = exports.NetworkNode = exports.ZeroPoint = void 0;
exports.createZeroPoint = createZeroPoint;
exports.quickStart = quickStart;
exports.productionStart = productionStart;
exports.getZeroPointInsights = getZeroPointInsights;
const Logger_1 = require("./utils/Logger");
const ProductionAPI_1 = require("./api/ProductionAPI");
// Core ZeroPoint System
var ZeroPoint_1 = require("./core/ZeroPoint");
Object.defineProperty(exports, "ZeroPoint", { enumerable: true, get: function () { return ZeroPoint_1.ZeroPoint; } });
var NetworkNode_1 = require("./core/NetworkNode");
Object.defineProperty(exports, "NetworkNode", { enumerable: true, get: function () { return NetworkNode_1.NetworkNode; } });
// Universal Coil System - Every object is a coil
var CoilMixin_1 = require("./core/CoilMixin");
Object.defineProperty(exports, "CoilMixin", { enumerable: true, get: function () { return CoilMixin_1.CoilMixin; } });
Object.defineProperty(exports, "CoilBase", { enumerable: true, get: function () { return CoilMixin_1.CoilBase; } });
Object.defineProperty(exports, "isCoilObject", { enumerable: true, get: function () { return CoilMixin_1.isCoilObject; } });
Object.defineProperty(exports, "getCoilFromObject", { enumerable: true, get: function () { return CoilMixin_1.getCoilFromObject; } });
// COIL System - Unified Metaphysical Pattern Registry
var CoilSystem_1 = require("./core/CoilSystem");
Object.defineProperty(exports, "COIL_PATTERNS", { enumerable: true, get: function () { return CoilSystem_1.COIL_PATTERNS; } });
Object.defineProperty(exports, "getCoilPattern", { enumerable: true, get: function () { return CoilSystem_1.getCoilPattern; } });
Object.defineProperty(exports, "recognizeCoilPatterns", { enumerable: true, get: function () { return CoilSystem_1.recognizeCoilPatterns; } });
Object.defineProperty(exports, "getCoilContext", { enumerable: true, get: function () { return CoilSystem_1.getCoilContext; } });
Object.defineProperty(exports, "getCoilResonanceFactors", { enumerable: true, get: function () { return CoilSystem_1.getCoilResonanceFactors; } });
// Observer/Observable System
var Observer_1 = require("./core/Observer");
Object.defineProperty(exports, "ObserverMixin", { enumerable: true, get: function () { return Observer_1.ObserverMixin; } });
// Centralized Math System - COIL principle applied to mathematics
var MathUtils_1 = require("./math/MathUtils");
Object.defineProperty(exports, "MathUtils", { enumerable: true, get: function () { return MathUtils_1.MathUtils; } });
Object.defineProperty(exports, "MATH_CONSTANTS", { enumerable: true, get: function () { return MathUtils_1.MATH_CONSTANTS; } });
Object.defineProperty(exports, "fractal", { enumerable: true, get: function () { return MathUtils_1.fractal; } });
Object.defineProperty(exports, "setConsciousness", { enumerable: true, get: function () { return MathUtils_1.setConsciousness; } });
Object.defineProperty(exports, "setFieldResonance", { enumerable: true, get: function () { return MathUtils_1.setFieldResonance; } });
Object.defineProperty(exports, "setVortexStrength", { enumerable: true, get: function () { return MathUtils_1.setVortexStrength; } });
Object.defineProperty(exports, "setToroidalFlow", { enumerable: true, get: function () { return MathUtils_1.setToroidalFlow; } });
Object.defineProperty(exports, "setVoidConnected", { enumerable: true, get: function () { return MathUtils_1.setVoidConnected; } });
// Refactored Math Modules - Specialized layers on unified foundation
var FractalMath_1 = require("./math/FractalMath");
Object.defineProperty(exports, "FractalMath", { enumerable: true, get: function () { return FractalMath_1.FractalMath; } });
Object.defineProperty(exports, "generateFractalSequence", { enumerable: true, get: function () { return FractalMath_1.generateFractalSequence; } });
Object.defineProperty(exports, "calculateConsciousnessField", { enumerable: true, get: function () { return FractalMath_1.calculateConsciousnessField; } });
Object.defineProperty(exports, "generateFractalColor", { enumerable: true, get: function () { return FractalMath_1.generateFractalColor; } });
var VortexMath_1 = require("./math/VortexMath");
Object.defineProperty(exports, "VortexMath", { enumerable: true, get: function () { return VortexMath_1.VortexMath; } });
Object.defineProperty(exports, "applyVortexTransform", { enumerable: true, get: function () { return VortexMath_1.applyVortexTransform; } });
var ToroidalGeometry_1 = require("./math/ToroidalGeometry");
Object.defineProperty(exports, "ToroidalGeometry", { enumerable: true, get: function () { return ToroidalGeometry_1.ToroidalGeometry; } });
// Advanced VBM System
var AdvancedVBM_1 = require("./math/AdvancedVBM");
Object.defineProperty(exports, "AdvancedVBM", { enumerable: true, get: function () { return AdvancedVBM_1.AdvancedVBM; } });
// Rodin Coil System
var RodinCoil_1 = require("./math/RodinCoil");
Object.defineProperty(exports, "RodinCoil", { enumerable: true, get: function () { return RodinCoil_1.RodinCoil; } });
// Color Systems
var VBMColorSystem_1 = require("./math/VBMColorSystem");
Object.defineProperty(exports, "generateBaseColors", { enumerable: true, get: function () { return VBMColorSystem_1.generateBaseColors; } });
Object.defineProperty(exports, "getColorForVortexNumber", { enumerable: true, get: function () { return VBMColorSystem_1.getColorForVortexNumber; } });
Object.defineProperty(exports, "getColorForFamilyGroup", { enumerable: true, get: function () { return VBMColorSystem_1.getColorForFamilyGroup; } });
Object.defineProperty(exports, "getColorForPolarMate", { enumerable: true, get: function () { return VBMColorSystem_1.getColorForPolarMate; } });
Object.defineProperty(exports, "getColorForWAxis", { enumerable: true, get: function () { return VBMColorSystem_1.getColorForWAxis; } });
Object.defineProperty(exports, "getColorForPattern", { enumerable: true, get: function () { return VBMColorSystem_1.getColorForPattern; } });
Object.defineProperty(exports, "getMetaphysicalContextForNumber", { enumerable: true, get: function () { return VBMColorSystem_1.getMetaphysicalContextForNumber; } });
Object.defineProperty(exports, "getVBMColorMap", { enumerable: true, get: function () { return VBMColorSystem_1.getVBMColorMap; } });
Object.defineProperty(exports, "getVBMColorLegend", { enumerable: true, get: function () { return VBMColorSystem_1.getVBMColorLegend; } });
Object.defineProperty(exports, "generateConsciousnessGradient", { enumerable: true, get: function () { return VBMColorSystem_1.generateConsciousnessGradient; } });
Object.defineProperty(exports, "generateFieldResonanceMap", { enumerable: true, get: function () { return VBMColorSystem_1.generateFieldResonanceMap; } });
var FractalColorSystem_1 = require("./math/FractalColorSystem");
Object.defineProperty(exports, "FractalColorSystem", { enumerable: true, get: function () { return FractalColorSystem_1.FractalColorSystem; } });
// Consciousness and Emergence
var ConsciousnessField_1 = require("./consciousness/ConsciousnessField");
Object.defineProperty(exports, "ConsciousnessField", { enumerable: true, get: function () { return ConsciousnessField_1.ConsciousnessField; } });
var patterns_1 = require("./emergence/patterns");
Object.defineProperty(exports, "metaphysicalPatterns", { enumerable: true, get: function () { return patterns_1.metaphysicalPatterns; } });
// Pattern Recognition and Unity
var PatternRecognition_1 = require("./core/PatternRecognition");
Object.defineProperty(exports, "PatternRecognition", { enumerable: true, get: function () { return PatternRecognition_1.PatternRecognition; } });
var UnifiedSystem_1 = require("./core/UnifiedSystem");
Object.defineProperty(exports, "UnifiedSystem", { enumerable: true, get: function () { return UnifiedSystem_1.UnifiedSystem; } });
var FieldUnity_1 = require("./unity/FieldUnity");
Object.defineProperty(exports, "FieldUnitySystem", { enumerable: true, get: function () { return FieldUnity_1.FieldUnitySystem; } });
// Constants and Utilities
var SharedConstants_1 = require("./core/SharedConstants");
Object.defineProperty(exports, "VORTEX_CONSTANTS", { enumerable: true, get: function () { return SharedConstants_1.VORTEX_CONSTANTS; } });
Object.defineProperty(exports, "ConstantsUtils", { enumerable: true, get: function () { return SharedConstants_1.ConstantsUtils; } });
var MathUtils_2 = require("./core/MathUtils");
Object.defineProperty(exports, "MathUtilsCore", { enumerable: true, get: function () { return MathUtils_2.MathUtils; } });
/**
 * Create a new ZeroPoint instance
 *
 * @param config - Device configuration
 * @returns Promise<ZeroPoint> - Initialized ZeroPoint instance
 */
async function createZeroPoint(config) {
    const { DEFAULT_DEVICE_CONFIG } = await Promise.resolve().then(() => __importStar(require('./types/DeviceConfig')));
    const { ZeroPoint } = await Promise.resolve().then(() => __importStar(require('./core/ZeroPoint')));
    const fullConfig = { ...DEFAULT_DEVICE_CONFIG, ...config };
    const zeropoint = new ZeroPoint(fullConfig);
    await zeropoint.initialize();
    return zeropoint;
}
/**
 * Quick start function for basic ZeroPoint setup
 */
async function quickStart(deviceName) {
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
async function productionStart(config) {
    // Initialize production components
    Logger_1.globalLogger.info('Starting ZeroPoint in production mode');
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
    const api = ProductionAPI_1.globalProductionAPI;
    await api.start();
    Logger_1.globalLogger.info('ZeroPoint production environment started', {
        deviceId: zeropoint.deviceId,
        apiPort: 3001
    });
    return { zeropoint, api };
}
/**
 * Get metaphysical insights about ZeroPoint
 */
function getZeroPointInsights() {
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
//# sourceMappingURL=index.js.map