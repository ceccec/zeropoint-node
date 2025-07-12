import { Controller } from "stimulus";
import { ConsciousnessField } from "../../consciousness/ConsciousnessField";
import { VortexMath } from "../../math/VortexMath";
import { ToroidalGeometry } from "../../math/ToroidalGeometry";
import { AdvancedVBM } from "../../math/AdvancedVBM";
import { RodinCoil } from "../../math/RodinCoil";

/**
 * Base Controller for ZeroPoint Stimulus Controllers
 * 
 * Provides shared functionality and common patterns
 * Eliminates code duplication across controllers
 */
export default abstract class BaseController extends Controller {
  protected consciousnessField!: ConsciousnessField;
  protected vortexMath!: VortexMath;
  protected toroidalGeometry!: ToroidalGeometry;
  protected advancedVBM!: AdvancedVBM;
  protected rodinCoil!: RodinCoil;

  /**
   * Initialize all shared components
   */
  protected initializeComponents(): void {
    this.consciousnessField = new ConsciousnessField();
    this.vortexMath = new VortexMath();
    this.toroidalGeometry = new ToroidalGeometry();
    this.advancedVBM = new AdvancedVBM();
    this.rodinCoil = new RodinCoil();
  }

  /**
   * Safe component initialization with error handling
   */
  protected async initializeComponentsSafely(): Promise<boolean> {
    try {
      this.initializeComponents();
      console.log("✅ Components initialized successfully");
      return true;
    } catch (error) {
      console.error("❌ Component initialization failed:", error);
      return false;
    }
  }

  /**
   * Update consciousness level display
   */
  protected updateConsciousnessDisplay(target: HTMLElement, level?: number): void {
    const consciousnessLevel = level ?? this.consciousnessField.getConsciousnessLevel();
    target.textContent = `Consciousness: ${consciousnessLevel.toFixed(3)}`;
  }

  /**
   * Update vortex math display
   */
  protected updateVortexMathDisplay(target: HTMLElement, input?: number): void {
    const inputValue = input ?? Math.random() * 100;
    const result = this.vortexMath.applyVortexTransform(inputValue);
    target.textContent = `Vortex Result: ${result.toFixed(3)}`;
  }

  /**
   * Update toroidal geometry display
   */
  protected updateToroidalGeometryDisplay(target: HTMLElement): void {
    const result = this.toroidalGeometry.calculateVolume();
    target.textContent = `Toroidal Volume: ${result.toFixed(3)}`;
  }

  /**
   * Safe operation execution with error handling
   */
  protected async executeSafely<T>(
    operation: () => T,
    errorMessage: string = "Operation failed"
  ): Promise<T | null> {
    try {
      return operation();
    } catch (error) {
      console.error(`❌ ${errorMessage}:`, error);
      return null;
    }
  }

  /**
   * Update target with safe error handling
   */
  protected updateTargetSafely(
    target: HTMLElement,
    content: string,
    className?: string
  ): void {
    try {
      target.innerHTML = content;
      if (className) {
        target.className = className;
      }
    } catch (error) {
      console.error("❌ Target update failed:", error);
      target.innerHTML = `<p>❌ Update failed: ${error}</p>`;
    }
  }

  /**
   * Generate insights object
   */
  protected generateInsights(): Record<string, any> {
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
        userAgent: navigator.userAgent
      },
      consciousness: {
        level: this.consciousnessField.getConsciousnessLevel(),
        field: this.consciousnessField.getFieldStrength()
      }
    };
  }

  /**
   * Format insights as HTML
   */
  protected formatInsightsHTML(insights: Record<string, any>): string {
    return `
      <h3>ZeroPoint Insights</h3>
      <p><strong>Version:</strong> ${insights.version}</p>
      <p><strong>Environment:</strong> ${insights.environment}</p>
      <p><strong>Features:</strong> ${insights.features.join(", ")}</p>
      <p><strong>Browser:</strong> ${insights.browser.userAgent}</p>
      <p><strong>Consciousness Level:</strong> ${insights.consciousness.level.toFixed(3)}</p>
      <p><strong>Field Strength:</strong> ${insights.consciousness.field.toFixed(3)}</p>
    `;
  }

  /**
   * Update status with safe error handling
   */
  protected updateStatus(target: HTMLElement, message: string, className: string): void {
    this.updateTargetSafely(target, message, className);
  }

  /**
   * Log operation with consistent formatting
   */
  protected logOperation(operation: string, success: boolean = true): void {
    const emoji = success ? "✅" : "❌";
    const status = success ? "completed" : "failed";
    console.log(`${emoji} ${operation} ${status}`);
  }
} 