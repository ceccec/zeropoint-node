"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("../base/BaseController"));
const ControllerUtils_1 = require("../utils/ControllerUtils");
const VBMColorSystem_1 = require("../../math/VBMColorSystem");
/**
 * Metaphysical Stimulus Controller
 *
 * Handles consciousness field operations and metaphysical interactions
 */
class MetaphysicalController extends BaseController_1.default {
    connect() {
        console.log("🧘‍♀️ Metaphysical Controller Connected");
        this.initializeComponents();
        this.updateAll();
        this.logOperation("Metaphysical controller initialization");
    }
    updateAll() {
        this.updateConsciousnessLevel();
        this.updateFieldResonance();
        this.updateVortexStrength();
        this.updateToroidalFlow();
        this.updateColorGradient();
        this.logOperation("All metaphysical components update");
    }
    updateConsciousnessLevel() {
        const level = this.consciousnessField.getConsciousnessLevel();
        ControllerUtils_1.UIUtils.updateElement(this.consciousnessLevelTarget, {
            textContent: `Consciousness Level: ${level.toFixed(3)}`,
            style: { color: ControllerUtils_1.ColorUtils.consciousnessToHSL(level) }
        });
    }
    async updateFieldResonance() {
        const result = this.executeSafely(() => {
            const resonanceMap = (0, VBMColorSystem_1.generateFieldResonanceMap)(0.7);
            return Object.values(resonanceMap).reduce((sum, val) => sum + val, 0) / Object.keys(resonanceMap).length;
        }, "Field resonance calculation");
        const value = result instanceof Promise ? await result : result;
        if (value !== null && value !== undefined) {
            ControllerUtils_1.UIUtils.safeTextContent(this.fieldResonanceTarget, `Field Resonance: ${value.toFixed(3)}`);
        }
    }
    updateVortexStrength() {
        this.updateVortexMathDisplay(this.vortexStrengthTarget);
        ControllerUtils_1.UIUtils.safeTextContent(this.vortexStrengthTarget, this.vortexStrengthTarget.textContent?.replace("Vortex Result", "Vortex Strength") || "Vortex Strength: 0.000");
    }
    updateToroidalFlow() {
        this.updateToroidalGeometryDisplay(this.toroidalFlowTarget);
        ControllerUtils_1.UIUtils.safeTextContent(this.toroidalFlowTarget, this.toroidalFlowTarget.textContent?.replace("Toroidal Volume", "Toroidal Flow") || "Toroidal Flow: 0.000");
    }
    async updateColorGradient() {
        const result = this.executeSafely(() => {
            return (0, VBMColorSystem_1.generateConsciousnessGradient)(0.8);
        }, "Color gradient generation");
        const value = result instanceof Promise ? await result : result;
        if (value) {
            ControllerUtils_1.UIUtils.updateElement(this.colorGradientTarget, {
                textContent: 'Consciousness Gradient',
                style: { background: `linear-gradient(45deg, ${value.join(', ')})` }
            });
        }
    }
    performMetaphysicalOperation() {
        this.logOperation("Metaphysical operation execution");
        const result = this.executeSafely(() => {
            // Perform advanced VBM operation (simplified)
            const vbmResult = { operation: 'consciousness', level: 0.7, result: 'metaphysical_computation' };
            // Perform Rodin coil operation (simplified)
            const coilResult = { pattern: [1, 2, 4, 8, 7, 5], resonance: 0.85 };
            return {
                "Advanced VBM": vbmResult,
                "Rodin Coil Pattern": coilResult
            };
        }, "Metaphysical operation");
        if (result) {
            const operationHTML = ControllerUtils_1.ResultUtils.formatResultHTML("Metaphysical Operation Results", result);
            ControllerUtils_1.UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, operationHTML);
            this.logOperation("Metaphysical operation");
        }
        else {
            const errorHTML = ControllerUtils_1.ResultUtils.formatErrorHTML("Metaphysical Operation", "Execution failed");
            ControllerUtils_1.UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, errorHTML);
            this.logOperation("Metaphysical operation", false);
        }
    }
    evolveConsciousness() {
        this.logOperation("Consciousness evolution");
        const currentLevel = this.consciousnessField.getConsciousnessLevel();
        const evolution = ControllerUtils_1.ConsciousnessUtils.simulateEvolution(currentLevel);
        this.updateAll();
        const evolutionHTML = ControllerUtils_1.ConsciousnessUtils.formatEvolutionHTML(evolution);
        ControllerUtils_1.UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, evolutionHTML);
        this.logOperation("Consciousness evolution");
    }
}
MetaphysicalController.targets = [
    "consciousnessLevel",
    "fieldResonance",
    "vortexStrength",
    "toroidalFlow",
    "metaphysicalOutput",
    "colorGradient"
];
exports.default = MetaphysicalController;
