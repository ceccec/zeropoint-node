/**
 * Controller Utilities for ZeroPoint Stimulus Controllers
 * 
 * Shared utilities and helper functions for controllers
 */

/**
 * Color utilities for consciousness-based color generation
 */
export class ColorUtils {
  /**
   * Generate HSL color based on consciousness level
   */
  static consciousnessToHSL(level: number): string {
    const hue = level * 360; // Map 0-1 to 0-360 degrees
    return `hsl(${hue}, 70%, 50%)`;
  }

  /**
   * Generate gradient from consciousness level
   */
  static consciousnessToGradient(level: number): string {
    const hue1 = level * 360;
    const hue2 = (level + 0.3) * 360;
    return `linear-gradient(45deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 50%))`;
  }

  /**
   * Apply consciousness-based color to element
   */
  static applyConsciousnessColor(element: HTMLElement, level: number): void {
    element.style.color = this.consciousnessToHSL(level);
  }
}

/**
 * Math operation utilities
 */
export class MathUtils {
  /**
   * Format number with consistent precision
   */
  static formatNumber(value: number, precision: number = 3): string {
    return value.toFixed(precision);
  }

  /**
   * Generate random number within range
   */
  static randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Clamp value between min and max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}

/**
 * UI update utilities
 */
export class UIUtils {
  /**
   * Safe innerHTML update with error handling
   */
  static safeInnerHTML(element: HTMLElement, content: string): void {
    try {
      element.innerHTML = content;
    } catch (error) {
      console.error("❌ InnerHTML update failed:", error);
      element.innerHTML = `<p>❌ Update failed: ${error}</p>`;
    }
  }

  /**
   * Safe textContent update with error handling
   */
  static safeTextContent(element: HTMLElement, content: string): void {
    try {
      element.textContent = content;
    } catch (error) {
      console.error("❌ TextContent update failed:", error);
      element.textContent = `❌ Update failed: ${error}`;
    }
  }

  /**
   * Safe className update with error handling
   */
  static safeClassName(element: HTMLElement, className: string): void {
    try {
      element.className = className;
    } catch (error) {
      console.error("❌ ClassName update failed:", error);
    }
  }

  /**
   * Update element with multiple properties safely
   */
  static updateElement(
    element: HTMLElement,
    updates: {
      innerHTML?: string;
      textContent?: string;
      className?: string;
      style?: Partial<CSSStyleDeclaration>;
    }
  ): void {
    try {
      if (updates.innerHTML !== undefined) {
        element.innerHTML = updates.innerHTML;
      }
      if (updates.textContent !== undefined) {
        element.textContent = updates.textContent;
      }
      if (updates.className !== undefined) {
        element.className = updates.className;
      }
      if (updates.style !== undefined) {
        Object.assign(element.style, updates.style);
      }
    } catch (error) {
      console.error("❌ Element update failed:", error);
    }
  }
}

/**
 * Operation result formatting utilities
 */
export class ResultUtils {
  /**
   * Format operation result as HTML
   */
  static formatResultHTML(title: string, results: Record<string, any>): string {
    const resultItems = Object.entries(results)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${this.formatValue(value)}</p>`)
      .join('');

    return `
      <h4>${title}</h4>
      ${resultItems}
      <p>✅ Operation completed successfully</p>
    `;
  }

  /**
   * Format value for display
   */
  private static formatValue(value: any): string {
    if (typeof value === 'number') {
      return value.toFixed(3);
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  /**
   * Format error result as HTML
   */
  static formatErrorHTML(operation: string, error: any): string {
    return `
      <h4>❌ ${operation} Failed</h4>
      <p>Error: ${error}</p>
    `;
  }
}

/**
 * Consciousness operation utilities
 */
export class ConsciousnessUtils {
  /**
   * Simulate consciousness evolution
   */
  static simulateEvolution(currentLevel: number): {
    previousLevel: number;
    evolution: number;
    newLevel: number;
  } {
    const evolution = Math.sin(Date.now() * 0.001) * 0.1; // Oscillating evolution
    const newLevel = MathUtils.clamp(currentLevel + evolution, 0, 1);
    
    return {
      previousLevel: currentLevel,
      evolution,
      newLevel
    };
  }

  /**
   * Format consciousness evolution result
   */
  static formatEvolutionHTML(evolution: {
    previousLevel: number;
    evolution: number;
    newLevel: number;
  }): string {
    return `
      <h4>Consciousness Evolution</h4>
      <p>Previous Level: ${MathUtils.formatNumber(evolution.previousLevel)}</p>
      <p>Evolution: ${MathUtils.formatNumber(evolution.evolution)}</p>
      <p>New Level: ${MathUtils.formatNumber(evolution.newLevel)}</p>
      <p>🧘‍♀️ Consciousness evolved</p>
    `;
  }
} 