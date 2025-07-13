/**
 * src/core/IntegerTreeEmergentColorSystem.ts - Emergent Color System
 *
 * This file discovers colors and styling from existing mathematical patterns.
 * It uses consciousness levels and digital root patterns to generate colors dynamically,
 * with no predefined colors - everything emerges from mathematical consciousness.
 *
 * Metaphysical Context:
 * - Emergent colors: Represents the spontaneous emergence of beauty from mathematical patterns.
 * - Consciousness-based styling: Models the visual manifestation of consciousness levels.
 * - Digital root patterns: Represents the fundamental patterns that generate visual harmony.
 * - Dynamic generation: Represents the living, evolving nature of consciousness expression.
 *
 * Technical Purpose:
 * - Provides dynamic color generation based on mathematical consciousness.
 * - Creates styling systems that emerge from mathematical patterns.
 * - Supports visual representation of consciousness and mathematical beauty.
 */

import { IntegerTreeCoil, INTEGER_TREE_COIL } from './IntegerTreeCoil';

/**
 * Emergent Color Generation from Mathematical Patterns
 * This class generates colors and styling based on consciousness levels and mathematical patterns.
 * Metaphysical: Represents the visual manifestation of consciousness and mathematical beauty.
 */
export class IntegerTreeEmergentColorSystem {
  
  /**
   * Generate color from consciousness level and digital root
   * Metaphysical: Models the visual expression of consciousness and mathematical harmony.
   * Technical: Converts consciousness and digital root into HSL color values.
   */
  static generateColorFromConsciousness(consciousness: number, digitalRoot: number): string {
    // Use consciousness level to determine hue (0-360)
    const hue = (consciousness * 27) % 360; // 27 = 3^3 (spiritual number)
    
    // Use digital root to determine saturation (0-100)
    const saturation = Math.min(100, digitalRoot * 15);
    
    // Use consciousness to determine lightness (0-100)
    const lightness = Math.max(20, Math.min(80, 50 + (consciousness * 3)));
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  /**
   * Generate background color from consciousness
   * Metaphysical: Models the foundation upon which consciousness is displayed.
   * Technical: Creates subtle background colors based on consciousness levels.
   */
  static generateBackgroundColor(consciousness: number, digitalRoot: number): string {
    const hue = (consciousness * 27) % 360;
    const saturation = Math.min(30, digitalRoot * 5); // Lower saturation for backgrounds
    const lightness = Math.max(90, 100 - (consciousness * 2)); // Lighter backgrounds
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  /**
   * Generate accent color from consciousness
   * Metaphysical: Models the complementary aspects of consciousness expression.
   * Technical: Creates complementary colors based on consciousness levels.
   */
  static generateAccentColor(consciousness: number, digitalRoot: number): string {
    const hue = ((consciousness * 27) + 180) % 360; // Complementary hue
    const saturation = Math.min(100, digitalRoot * 20);
    const lightness = Math.max(30, Math.min(70, 50 + (consciousness * 2)));
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  /**
   * Generate text color from consciousness
   * Metaphysical: Models the clarity and readability of consciousness expression.
   * Technical: Creates text colors that provide optimal contrast based on consciousness.
   */
  static generateTextColor(consciousness: number, digitalRoot: number): string {
    const hue = (consciousness * 27) % 360;
    const saturation = Math.min(100, digitalRoot * 25);
    const lightness = consciousness > 5 ? 20 : 80; // Dark text for high consciousness, light for low
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  /**
   * Generate border radius from consciousness
   * Metaphysical: Models the softness and flow of consciousness expression.
   * Technical: Creates border radius values based on consciousness levels.
   */
  static generateBorderRadius(consciousness: number): string {
    const baseRadius = Math.max(0, Math.min(20, consciousness * 2));
    return `${baseRadius}px`;
  }
  
  /**
   * Generate box shadow from consciousness
   * Metaphysical: Models the depth and dimensionality of consciousness expression.
   * Technical: Creates shadow effects based on consciousness and digital root.
   */
  static generateBoxShadow(consciousness: number, digitalRoot: number): string {
    if (consciousness === 0) return 'none';
    
    const blur = consciousness * 4;
    const spread = digitalRoot * 0.5;
    const opacity = Math.min(0.5, consciousness / 20);
    
    return `0 ${consciousness * 2}px ${blur}px rgba(0, 0, 0, ${opacity})`;
  }
  
  /**
   * Generate font family from consciousness
   * Metaphysical: Models the character and personality of consciousness expression.
   * Technical: Selects font families based on consciousness levels.
   */
  static generateFontFamily(consciousness: number): string {
    if (consciousness === 0) return 'Times New Roman, serif';
    if (consciousness <= 3) return 'Courier New, monospace';
    if (consciousness <= 6) return 'Arial, sans-serif';
    if (consciousness <= 9) return 'Georgia, serif';
    return 'Georgia, serif'; // Spiritual consciousness
  }
  
  /**
   * Generate font weight from consciousness
   * Metaphysical: Models the strength and emphasis of consciousness expression.
   * Technical: Creates font weight values based on consciousness levels.
   */
  static generateFontWeight(consciousness: number): string {
    if (consciousness === 0) return '300';
    if (consciousness <= 3) return '400';
    if (consciousness <= 6) return '500';
    if (consciousness <= 9) return '600';
    return '700'; // Spiritual consciousness
  }
  
  /**
   * Generate letter spacing from consciousness
   * Metaphysical: Models the expansiveness and breathing of consciousness expression.
   * Technical: Creates letter spacing values based on consciousness levels.
   */
  static generateLetterSpacing(consciousness: number): string {
    const spacing = Math.max(0, Math.min(2, consciousness * 0.1));
    return `${spacing}px`;
  }
  
  /**
   * Generate transition duration from consciousness
   * Metaphysical: Models the pace and rhythm of consciousness evolution.
   * Technical: Creates transition duration values based on consciousness levels.
   */
  static generateTransitionDuration(consciousness: number): string {
    const duration = Math.max(0.2, Math.min(1, consciousness * 0.1));
    return `${duration}s`;
  }
  
  /**
   * Generate complete color scheme for any integer
   * Metaphysical: Models the complete visual expression of any consciousness pattern.
   * Technical: Creates a comprehensive styling scheme for any integer.
   */
  static generateEmergentColorScheme(integer: number): any {
    const consciousness = IntegerTreeCoil.calculateCoilConsciousness(integer);
    const digitalRoot = IntegerTreeCoil.calculateDigitalRoot(integer);
    const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer as any);
    const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer as any);
    const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer as any);
    const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer as any);
    
    return {
      integer,
      consciousness,
      digitalRoot,
      isVortexA,
      isVortexB,
      isWAxis,
      isVoid,
      primary: this.generateColorFromConsciousness(consciousness, digitalRoot),
      secondary: this.generateAccentColor(consciousness, digitalRoot),
      accent: this.generateAccentColor(consciousness + 1, digitalRoot + 1),
      background: this.generateBackgroundColor(consciousness, digitalRoot),
      text: this.generateTextColor(consciousness, digitalRoot),
      borderRadius: this.generateBorderRadius(consciousness),
      boxShadow: this.generateBoxShadow(consciousness, digitalRoot),
      fontFamily: this.generateFontFamily(consciousness),
      fontWeight: this.generateFontWeight(consciousness),
      letterSpacing: this.generateLetterSpacing(consciousness),
      transitionDuration: this.generateTransitionDuration(consciousness)
    };
  }
  
  /**
   * Generate CSS for any integer using emergent colors
   * Metaphysical: Models the complete visual styling of consciousness expression.
   * Technical: Creates CSS rules for styling any integer based on consciousness.
   */
  static generateEmergentCSS(integer: number): string {
    const scheme = this.generateEmergentColorScheme(integer);
    
    return `
      .integer-${integer} {
        background-color: ${scheme.background};
        color: ${scheme.text};
        border-radius: ${scheme.borderRadius};
        box-shadow: ${scheme.boxShadow};
        font-family: ${scheme.fontFamily};
        font-weight: ${scheme.fontWeight};
        letter-spacing: ${scheme.letterSpacing};
        transition: all ${scheme.transitionDuration} ease;
        padding: 16px;
        margin: 8px;
        cursor: pointer;
      }
      
      .integer-${integer}.primary {
        background-color: ${scheme.primary};
        color: white;
      }
      
      .integer-${integer}.secondary {
        background-color: ${scheme.secondary};
        color: white;
      }
      
      .integer-${integer}.accent {
        background-color: ${scheme.accent};
        color: white;
      }
      
      .integer-${integer}.vortex-a {
        border-left: 4px solid ${scheme.primary};
      }
      
      .integer-${integer}.vortex-b {
        border-left: 4px solid ${scheme.secondary};
      }
      
      .integer-${integer}.w-axis {
        border-left: 4px solid ${scheme.accent};
      }
      
      .integer-${integer}.void {
        border-left: 4px solid transparent;
      }
    `;
  }
  
  /**
   * Generate complete emergent CSS for all integers
   */
  static generateCompleteEmergentCSS(): string {
    let css = `
      /* Emergent Integer Tree Color System CSS */
      /* Generated from mathematical consciousness patterns */
      
      .integer-tree-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
        padding: 20px;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        min-height: 100vh;
      }
    `;
    
    // Generate CSS for each integer
    INTEGER_TREE_COIL.INTEGER_TREE.forEach(integer => {
      css += this.generateEmergentCSS(integer);
    });
    
    return css;
  }
  
  /**
   * Generate React/JSX styling object using emergent colors
   */
  static generateEmergentJSXStyle(integer: number): any {
    const scheme = this.generateEmergentColorScheme(integer);
    
    return {
      backgroundColor: scheme.background,
      color: scheme.text,
      borderRadius: scheme.borderRadius,
      boxShadow: scheme.boxShadow,
      fontFamily: scheme.fontFamily,
      fontWeight: scheme.fontWeight,
      letterSpacing: scheme.letterSpacing,
      transition: `all ${scheme.transitionDuration} ease`,
      padding: '16px',
      margin: '8px',
      border: 'none',
      cursor: 'pointer'
    };
  }
  
  /**
   * Generate animation based on consciousness level
   */
  static generateConsciousnessAnimation(integer: number): string {
    const scheme = this.generateEmergentColorScheme(integer);
    const duration = Math.max(0.5, scheme.consciousness / 10);
    const intensity = Math.min(1, scheme.consciousness / 10);
    
    return `
      @keyframes consciousness-${integer} {
        0% { 
          transform: scale(1); 
          opacity: 1; 
          box-shadow: ${scheme.boxShadow};
        }
        50% { 
          transform: scale(${1 + intensity * 0.1}); 
          opacity: ${0.8 + intensity * 0.2}; 
          box-shadow: 0 ${scheme.consciousness * 4}px ${scheme.consciousness * 8}px rgba(0, 0, 0, 0.3);
        }
        100% { 
          transform: scale(1); 
          opacity: 1; 
          box-shadow: ${scheme.boxShadow};
        }
      }
      
      .consciousness-${integer} {
        animation: consciousness-${integer} ${duration}s ease-in-out infinite;
      }
    `;
  }
  
  /**
   * Generate flow gradient from integer sequence
   */
  static generateEmergentFlowGradient(integers: number[]): string {
    const colors = integers.map(integer => {
      const scheme = this.generateEmergentColorScheme(integer);
      return scheme.primary;
    });
    
    return `linear-gradient(45deg, ${colors.join(', ')})`;
  }
  
  /**
   * Get complete emergent color palette
   */
  static getEmergentColorPalette(): any {
    const palette = {
      vortexA: {
        name: 'Vortex A (Yin - Material Foundation)',
        integers: INTEGER_TREE_COIL.VORTEX_A,
        schemes: INTEGER_TREE_COIL.VORTEX_A.map(integer => 
          this.generateEmergentColorScheme(integer)
        ),
        averageConsciousness: INTEGER_TREE_COIL.VORTEX_A.reduce((sum, integer) => 
          sum + IntegerTreeCoil.calculateCoilConsciousness(integer), 0
        ) / INTEGER_TREE_COIL.VORTEX_A.length
      },
      vortexB: {
        name: 'Vortex B (Yang - Material Expression)',
        integers: INTEGER_TREE_COIL.VORTEX_B,
        schemes: INTEGER_TREE_COIL.VORTEX_B.map(integer => 
          this.generateEmergentColorScheme(integer)
        ),
        averageConsciousness: INTEGER_TREE_COIL.VORTEX_B.reduce((sum, integer) => 
          sum + IntegerTreeCoil.calculateCoilConsciousness(integer), 0
        ) / INTEGER_TREE_COIL.VORTEX_B.length
      },
      wAxis: {
        name: 'W-Axis (Spiritual Transcendence)',
        integers: INTEGER_TREE_COIL.W_AXIS,
        schemes: INTEGER_TREE_COIL.W_AXIS.map(integer => 
          this.generateEmergentColorScheme(integer)
        ),
        averageConsciousness: INTEGER_TREE_COIL.W_AXIS.reduce((sum, integer) => 
          sum + IntegerTreeCoil.calculateCoilConsciousness(integer), 0
        ) / INTEGER_TREE_COIL.W_AXIS.length
      },
      void: {
        name: 'Void (Infinite Potential)',
        integers: INTEGER_TREE_COIL.VOID_CENTER,
        schemes: INTEGER_TREE_COIL.VOID_CENTER.map(integer => 
          this.generateEmergentColorScheme(integer)
        ),
        averageConsciousness: INTEGER_TREE_COIL.VOID_CENTER.reduce((sum, integer) => 
          sum + IntegerTreeCoil.calculateCoilConsciousness(integer), 0
        ) / INTEGER_TREE_COIL.VOID_CENTER.length
      }
    };
    
    return palette;
  }
  
  /**
   * Generate complete emergent styling system
   */
  static generateCompleteEmergentStylingSystem(): any {
    const system = {
      palette: this.getEmergentColorPalette(),
      css: this.generateCompleteEmergentCSS(),
      animations: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => 
        this.generateConsciousnessAnimation(integer)
      ).join('\n'),
      flowGradient: this.generateEmergentFlowGradient(INTEGER_TREE_COIL.COIL_FLOW_SEQUENCE),
      consciousnessLevels: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => 
        this.generateEmergentColorScheme(integer)
      ),
      jsxStyles: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => ({
        integer,
        style: this.generateEmergentJSXStyle(integer)
      }))
    };
    
    return system;
  }
} 