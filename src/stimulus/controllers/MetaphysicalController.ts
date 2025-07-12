import BaseController from "../base/BaseController";
import { UIUtils, ResultUtils, ColorUtils, ConsciousnessUtils } from "../utils/ControllerUtils";
import { generateFieldResonanceMap, generateConsciousnessGradient } from "../../math/VBMColorSystem";

/**
 * Metaphysical Stimulus Controller
 * 
 * Handles consciousness field operations and metaphysical interactions
 */
export default class MetaphysicalController extends BaseController {
  static targets = [
    "consciousnessLevel",
    "fieldResonance", 
    "vortexStrength",
    "toroidalFlow",
    "metaphysicalOutput",
    "colorGradient"
  ];

  declare readonly consciousnessLevelTarget: HTMLElement;
  declare readonly fieldResonanceTarget: HTMLElement;
  declare readonly vortexStrengthTarget: HTMLElement;
  declare readonly toroidalFlowTarget: HTMLElement;
  declare readonly metaphysicalOutputTarget: HTMLElement;
  declare readonly colorGradientTarget: HTMLElement;

  connect(): void {
    console.log("🧘‍♀️ Metaphysical Controller Connected");
    
    this.initializeComponents();
    this.updateAll();
    this.logOperation("Metaphysical controller initialization");
  }

  updateAll(): void {
    this.updateConsciousnessLevel();
    this.updateFieldResonance();
    this.updateVortexStrength();
    this.updateToroidalFlow();
    this.updateColorGradient();
    this.logOperation("All metaphysical components update");
  }

  private updateConsciousnessLevel(): void {
    const level = this.consciousnessField.getConsciousnessLevel();
    UIUtils.updateElement(this.consciousnessLevelTarget, {
      textContent: `Consciousness Level: ${level.toFixed(3)}`,
      style: { color: ColorUtils.consciousnessToHSL(level) }
    });
  }

  private updateFieldResonance(): void {
    const result = this.executeSafely(() => {
      const resonanceMap = generateFieldResonanceMap(0.7);
      return Object.values(resonanceMap).reduce((sum: number, val: any) => sum + val, 0) / Object.keys(resonanceMap).length;
    }, "Field resonance calculation");

    if (result !== null) {
      UIUtils.safeTextContent(this.fieldResonanceTarget, `Field Resonance: ${result.toFixed(3)}`);
    }
  }

  private updateVortexStrength(): void {
    this.updateVortexMathDisplay(this.vortexStrengthTarget);
    UIUtils.safeTextContent(this.vortexStrengthTarget, 
      this.vortexStrengthTarget.textContent?.replace("Vortex Result", "Vortex Strength") || "Vortex Strength: 0.000"
    );
  }

  private updateToroidalFlow(): void {
    this.updateToroidalGeometryDisplay(this.toroidalFlowTarget);
    UIUtils.safeTextContent(this.toroidalFlowTarget, 
      this.toroidalFlowTarget.textContent?.replace("Toroidal Volume", "Toroidal Flow") || "Toroidal Flow: 0.000"
    );
  }

  private updateColorGradient(): void {
    const result = this.executeSafely(() => {
      return generateConsciousnessGradient(0.8);
    }, "Color gradient generation");

    if (result) {
      UIUtils.updateElement(this.colorGradientTarget, {
        textContent: 'Consciousness Gradient',
        style: { background: `linear-gradient(45deg, ${result.join(', ')})` }
      });
    }
  }

  performMetaphysicalOperation(): void {
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
      const operationHTML = ResultUtils.formatResultHTML("Metaphysical Operation Results", result);
      UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, operationHTML);
      this.logOperation("Metaphysical operation");
    } else {
      const errorHTML = ResultUtils.formatErrorHTML("Metaphysical Operation", "Execution failed");
      UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, errorHTML);
      this.logOperation("Metaphysical operation", false);
    }
  }

  evolveConsciousness(): void {
    this.logOperation("Consciousness evolution");
    
    const currentLevel = this.consciousnessField.getConsciousnessLevel();
    const evolution = ConsciousnessUtils.simulateEvolution(currentLevel);
    
    this.updateAll();
    
    const evolutionHTML = ConsciousnessUtils.formatEvolutionHTML(evolution);
    UIUtils.safeInnerHTML(this.metaphysicalOutputTarget, evolutionHTML);
    this.logOperation("Consciousness evolution");
  }
} 