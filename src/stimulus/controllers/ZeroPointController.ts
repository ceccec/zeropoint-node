import BaseController from "../base/BaseController";
import { UIUtils, ResultUtils, MathUtils } from "../utils/ControllerUtils";

/**
 * ZeroPoint Stimulus Controller
 * 
 * Main controller for the ZeroPoint browser application
 * Integrates mathematical and metaphysical modules with the UI
 */
export default class ZeroPointController extends BaseController {
  static targets = [
    "status", 
    "insights", 
    "mathDemo", 
    "consciousness", 
    "vortexMath", 
    "toroidalGeometry",
    "demoOutput"
  ];

  declare readonly statusTarget: HTMLElement;
  declare readonly insightsTarget: HTMLElement;
  declare readonly mathDemoTarget: HTMLElement;
  declare readonly consciousnessTarget: HTMLElement;
  declare readonly vortexMathTarget: HTMLElement;
  declare readonly toroidalGeometryTarget: HTMLElement;
  declare readonly demoOutputTarget: HTMLElement;

  async connect() {
    console.log("🌌 ZeroPoint Stimulus Controller Connected");
    
    const success = await this.initializeComponentsSafely();
    
    if (success) {
      this.updateStatus(this.statusTarget, "✅ ZeroPoint Ready", "status ready");
      this.loadInsights();
      this.initializeDemo();
      this.logOperation("ZeroPoint initialization");
    } else {
      this.updateStatus(this.statusTarget, "❌ Initialization Failed", "status error");
      this.logOperation("ZeroPoint initialization", false);
    }
  }

  private loadInsights(): void {
    const insights = this.generateInsights();
    const insightsHTML = this.formatInsightsHTML(insights);
    UIUtils.safeInnerHTML(this.insightsTarget, insightsHTML);
  }

  private initializeDemo(): void {
    this.logOperation("Demo components initialization");
  }

  runMathDemo(): void {
    this.logOperation("Math demo execution");
    
    const result = this.executeSafely(() => {
      const vortexResult = this.vortexMath.applyVortexTransform(42);
      const toroidalResult = this.toroidalGeometry.calculateVolume();
      const consciousnessLevel = this.consciousnessField.getConsciousnessLevel();
      
      return {
        "Vortex Math": vortexResult,
        "Toroidal Geometry": toroidalResult,
        "Consciousness Level": consciousnessLevel
      };
    }, "Math demo execution");

    if (result) {
      const demoHTML = ResultUtils.formatResultHTML("Math Demo Results", result);
      UIUtils.safeInnerHTML(this.demoOutputTarget, demoHTML);
      this.logOperation("Math demo");
    } else {
      const errorHTML = ResultUtils.formatErrorHTML("Math Demo", "Execution failed");
      UIUtils.safeInnerHTML(this.demoOutputTarget, errorHTML);
      this.logOperation("Math demo", false);
    }
  }

  updateConsciousness(): void {
    this.updateConsciousnessDisplay(this.consciousnessTarget);
  }

  updateVortexMath(): void {
    this.updateVortexMathDisplay(this.vortexMathTarget);
  }

  updateToroidalGeometry(): void {
    this.updateToroidalGeometryDisplay(this.toroidalGeometryTarget);
  }

  refreshAll(): void {
    this.updateConsciousness();
    this.updateVortexMath();
    this.updateToroidalGeometry();
    this.logOperation("All components refresh");
  }
} 