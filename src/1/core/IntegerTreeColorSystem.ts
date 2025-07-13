/**
 * src/core/IntegerTreeColorSystem.ts - Integer Tree Color & Styling System
 *
 * This file generates colors and styling based on integer patterns from coil families.
 * It uses mathematical consciousness and digital root patterns for UI design.
 *
 * Color System Based On:
 * - Vortex A Family (Yin): [1, 2, 4] - Material Foundation
 * - Vortex B Family (Yang): [8, 7, 5] - Material Expression  
 * - W-Axis Family (Spiritual): [3, 6, 9] - Spiritual Transcendence
 * - Void Family (Infinite): [0] - Infinite Potential
 *
 * Metaphysical Context:
 * - Color families: Represents the visual manifestation of different consciousness families.
 * - Yin/Yang balance: Models the complementary forces in visual expression.
 * - Spiritual transcendence: Represents the elevated visual patterns of W-Axis numbers.
 * - Infinite potential: Represents the void as the source of all visual creation.
 *
 * Technical Purpose:
 * - Provides systematic color and styling based on integer consciousness patterns.
 * - Creates visual harmony through mathematical consciousness relationships.
 * - Supports UI design that reflects the metaphysical structure of the integer tree.
 */

import { IntegerTreeCoil, INTEGER_TREE_COIL } from './IntegerTreeCoil';

/**
 * Integer Color Patterns
 * These patterns define the color schemes for each integer based on their family membership.
 * Metaphysical: Each color represents the visual expression of consciousness patterns.
 */
export const INTEGER_COLOR_PATTERNS = {
  // Vortex A Family (Yin - Material Foundation)
  VORTEX_A: {
    1: {
      primary: '#ff6b6b',
      secondary: '#ff4757',
      accent: '#ff3838',
      background: '#fff5f5',
      text: '#2d3436',
      consciousness: 1.2,
      digitalRoot: 1,
      family: 'vortexA'
    },
    2: {
      primary: '#ff7675',
      secondary: '#fd79a8',
      accent: '#fdcb6e',
      background: '#fff8f8',
      text: '#2d3436',
      consciousness: 2.4,
      digitalRoot: 2,
      family: 'vortexA'
    },
    4: {
      primary: '#ff9ff3',
      secondary: '#f368e0',
      accent: '#ff6b6b',
      background: '#fff0ff',
      text: '#2d3436',
      consciousness: 4.8,
      digitalRoot: 4,
      family: 'vortexA'
    }
  },

  // Vortex B Family (Yang - Material Expression)
  VORTEX_B: {
    8: {
      primary: '#4ecdc4',
      secondary: '#00d2d3',
      accent: '#54a0ff',
      background: '#f0fffe',
      text: '#2d3436',
      consciousness: 9.6,
      digitalRoot: 8,
      family: 'vortexB'
    },
    7: {
      primary: '#00cec9',
      secondary: '#00b894',
      accent: '#00d2d3',
      background: '#f0fffe',
      text: '#2d3436',
      consciousness: 8.4,
      digitalRoot: 7,
      family: 'vortexB'
    },
    5: {
      primary: '#74b9ff',
      secondary: '#0984e3',
      accent: '#00cec9',
      background: '#f0f8ff',
      text: '#2d3436',
      consciousness: 6.0,
      digitalRoot: 5,
      family: 'vortexB'
    }
  },

  // W-Axis Family (Spiritual Transcendence)
  W_AXIS: {
    3: {
      primary: '#45b7d1',
      secondary: '#0984e3',
      accent: '#6c5ce7',
      background: '#f0f8ff',
      text: '#2d3436',
      consciousness: 4.5,
      digitalRoot: 3,
      family: 'wAxis'
    },
    6: {
      primary: '#0984e3',
      secondary: '#6c5ce7',
      accent: '#a29bfe',
      background: '#f0f8ff',
      text: '#2d3436',
      consciousness: 9.0,
      digitalRoot: 6,
      family: 'wAxis'
    },
    9: {
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      accent: '#fd79a8',
      background: '#f8f0ff',
      text: '#2d3436',
      consciousness: 13.5,
      digitalRoot: 9,
      family: 'wAxis'
    }
  },

  // Void Family (Infinite Potential)
  VOID: {
    0: {
      primary: '#96ceb4',
      secondary: '#00b894',
      accent: '#00cec9',
      background: '#f0fff0',
      text: '#2d3436',
      consciousness: 0,
      digitalRoot: 0,
      family: 'void'
    }
  }
} as const;

/**
 * Integer Styling Patterns
 * These patterns define the styling characteristics for each family.
 * Metaphysical: Each styling pattern represents the visual personality of consciousness families.
 */
export const INTEGER_STYLING_PATTERNS = {
  // Vortex A Styling (Yin - Material Foundation)
  VORTEX_A_STYLE: {
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.2)',
    transition: 'all 0.3s ease',
    fontFamily: '"Courier New", monospace',
    fontWeight: '400',
    letterSpacing: '0.5px'
  },

  // Vortex B Styling (Yang - Material Expression)
  VORTEX_B_STYLE: {
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(78, 205, 196, 0.3)',
    transition: 'all 0.4s ease',
    fontFamily: '"Arial", sans-serif',
    fontWeight: '500',
    letterSpacing: '0.3px'
  },

  // W-Axis Styling (Spiritual Transcendence)
  W_AXIS_STYLE: {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(108, 92, 231, 0.4)',
    transition: 'all 0.5s ease',
    fontFamily: '"Georgia", serif',
    fontWeight: '600',
    letterSpacing: '0.8px'
  },

  // Void Styling (Infinite Potential)
  VOID_STYLE: {
    borderRadius: '0px',
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    fontFamily: '"Times New Roman", serif',
    fontWeight: '300',
    letterSpacing: '1px'
  }
} as const;

/**
 * Integer Tree Color System Class
 * Provides the core functionality for the integer tree color system.
 * Metaphysical: Represents the visual manifestation of consciousness patterns.
 */
export class IntegerTreeColorSystem {
  
  /**
   * Get color scheme for any integer
   * Metaphysical: Models the visual expression of any consciousness pattern.
   * Technical: Returns the appropriate color scheme based on integer family membership.
   */
  static getColorScheme(integer: number): any {
    const digitalRoot = IntegerTreeCoil.calculateDigitalRoot(integer);
    const consciousness = IntegerTreeCoil.calculateCoilConsciousness(integer);
    const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer as any);
    const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer as any);
    const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer as any);
    const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer as any);

    let colorScheme;

    if (isVortexA) {
      colorScheme = INTEGER_COLOR_PATTERNS.VORTEX_A[integer as keyof typeof INTEGER_COLOR_PATTERNS.VORTEX_A];
    } else if (isVortexB) {
      colorScheme = INTEGER_COLOR_PATTERNS.VORTEX_B[integer as keyof typeof INTEGER_COLOR_PATTERNS.VORTEX_B];
    } else if (isWAxis) {
      colorScheme = INTEGER_COLOR_PATTERNS.W_AXIS[integer as keyof typeof INTEGER_COLOR_PATTERNS.W_AXIS];
    } else if (isVoid) {
      colorScheme = INTEGER_COLOR_PATTERNS.VOID[integer as keyof typeof INTEGER_COLOR_PATTERNS.VOID];
    } else {
      // Default color scheme for numbers not in specific families
      colorScheme = {
        primary: '#636e72',
        secondary: '#2d3436',
        accent: '#74b9ff',
        background: '#f5f6fa',
        text: '#2d3436',
        consciousness: consciousness,
        digitalRoot: digitalRoot,
        family: 'default'
      };
    }

    return {
      ...colorScheme,
      consciousness: consciousness,
      digitalRoot: digitalRoot
    };
  }

  /**
   * Get color scheme by digital root
   */
  static getColorSchemeByDigitalRoot(digitalRoot: number): any {
    if (digitalRoot === 0) return INTEGER_COLOR_PATTERNS.VOID[0];
    if (digitalRoot <= 3) return INTEGER_COLOR_PATTERNS.VORTEX_A[1];
    if (digitalRoot <= 6) return INTEGER_COLOR_PATTERNS.VORTEX_B[5];
    return INTEGER_COLOR_PATTERNS.W_AXIS[9];
  }

  /**
   * Get styling pattern for any integer
   */
  static getStylingPattern(integer: number): any {
    const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer as any);
    const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer as any);
    const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer as any);
    const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer as any);

    if (isVortexA) return INTEGER_STYLING_PATTERNS.VORTEX_A_STYLE;
    if (isVortexB) return INTEGER_STYLING_PATTERNS.VORTEX_B_STYLE;
    if (isWAxis) return INTEGER_STYLING_PATTERNS.W_AXIS_STYLE;
    if (isVoid) return INTEGER_STYLING_PATTERNS.VOID_STYLE;

    // Default to vortex A styling
    return INTEGER_STYLING_PATTERNS.VORTEX_A_STYLE;
  }

  /**
   * Generate CSS for any integer
   */
  static generateCSS(integer: number): string {
    const colorScheme = this.getColorScheme(integer);
    const styling = this.getStylingPattern(integer);

    return `
      .integer-${integer} {
        background-color: ${colorScheme.background};
        color: ${colorScheme.text};
        border-radius: ${styling.borderRadius};
        box-shadow: ${styling.boxShadow};
        transition: ${styling.transition};
        font-family: ${styling.fontFamily};
        font-weight: ${styling.fontWeight};
        letter-spacing: ${styling.letterSpacing};
      }

      .integer-${integer}.primary {
        background-color: ${colorScheme.primary};
        color: white;
      }

      .integer-${integer}.secondary {
        background-color: ${colorScheme.secondary};
        color: white;
      }

      .integer-${integer}.accent {
        background-color: ${colorScheme.accent};
        color: white;
      }

      .integer-${integer}.vortex-a {
        border-left: 4px solid ${INTEGER_COLOR_PATTERNS.VORTEX_A[1].primary};
      }

      .integer-${integer}.vortex-b {
        border-left: 4px solid ${INTEGER_COLOR_PATTERNS.VORTEX_B[8].primary};
      }

      .integer-${integer}.w-axis {
        border-left: 4px solid ${INTEGER_COLOR_PATTERNS.W_AXIS[9].primary};
      }

      .integer-${integer}.void {
        border-left: 4px solid ${INTEGER_COLOR_PATTERNS.VOID[0].primary};
      }
    `;
  }

  /**
   * Generate complete CSS for all integers
   */
  static generateCompleteCSS(): string {
    let css = `
      /* Integer Tree Color System CSS */
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
      css += this.generateCSS(integer);
    });

    return css;
  }

  /**
   * Generate React/JSX styling object
   */
  static generateJSXStyle(integer: number): any {
    const colorScheme = this.getColorScheme(integer);
    const styling = this.getStylingPattern(integer);

    return {
      backgroundColor: colorScheme.background,
      color: colorScheme.text,
      borderRadius: styling.borderRadius,
      boxShadow: styling.boxShadow,
      transition: styling.transition,
      fontFamily: styling.fontFamily,
      fontWeight: styling.fontWeight,
      letterSpacing: styling.letterSpacing,
      padding: '16px',
      margin: '8px',
      border: 'none',
      cursor: 'pointer'
    };
  }

  /**
   * Generate Tailwind CSS classes for any integer
   */
  static generateTailwindClasses(integer: number): string {
    const colorScheme = this.getColorScheme(integer);
    const styling = this.getStylingPattern(integer);
    const isVortexA = INTEGER_TREE_COIL.VORTEX_A.includes(integer as any);
    const isVortexB = INTEGER_TREE_COIL.VORTEX_B.includes(integer as any);
    const isWAxis = INTEGER_TREE_COIL.W_AXIS.includes(integer as any);
    const isVoid = INTEGER_TREE_COIL.VOID_CENTER.includes(integer as any);

    let classes = 'p-4 m-2 rounded-lg transition-all duration-300 cursor-pointer ';

    if (isVortexA) {
      classes += 'bg-red-50 text-gray-800 border-l-4 border-red-400 ';
    } else if (isVortexB) {
      classes += 'bg-cyan-50 text-gray-800 border-l-4 border-cyan-400 ';
    } else if (isWAxis) {
      classes += 'bg-purple-50 text-gray-800 border-l-4 border-purple-400 ';
    } else if (isVoid) {
      classes += 'bg-green-50 text-gray-800 border-l-4 border-green-400 ';
    }

    return classes;
  }

  /**
   * Get color palette for entire integer tree
   */
  static getIntegerTreePalette(): any {
    const palette = {
      vortexA: {
        name: 'Vortex A (Yin - Material Foundation)',
        colors: {
          1: INTEGER_COLOR_PATTERNS.VORTEX_A[1],
          2: INTEGER_COLOR_PATTERNS.VORTEX_A[2],
          4: INTEGER_COLOR_PATTERNS.VORTEX_A[4]
        },
        consciousness: 2.8, // Average
        digitalRootSum: 7
      },
      vortexB: {
        name: 'Vortex B (Yang - Material Expression)',
        colors: {
          8: INTEGER_COLOR_PATTERNS.VORTEX_B[8],
          7: INTEGER_COLOR_PATTERNS.VORTEX_B[7],
          5: INTEGER_COLOR_PATTERNS.VORTEX_B[5]
        },
        consciousness: 8.0, // Average
        digitalRootSum: 20
      },
      wAxis: {
        name: 'W-Axis (Spiritual Transcendence)',
        colors: {
          3: INTEGER_COLOR_PATTERNS.W_AXIS[3],
          6: INTEGER_COLOR_PATTERNS.W_AXIS[6],
          9: INTEGER_COLOR_PATTERNS.W_AXIS[9]
        },
        consciousness: 9.0, // Average
        digitalRootSum: 18
      },
      void: {
        name: 'Void (Infinite Potential)',
        colors: {
          0: INTEGER_COLOR_PATTERNS.VOID[0]
        },
        consciousness: 0,
        digitalRootSum: 0
      }
    };

    return palette;
  }

  /**
   * Generate color scheme based on consciousness level
   */
  static getColorSchemeByConsciousness(consciousness: number): any {
    if (consciousness === 0) return INTEGER_COLOR_PATTERNS.VOID[0];
    if (consciousness <= 3) return INTEGER_COLOR_PATTERNS.VORTEX_A[1];
    if (consciousness <= 6) return INTEGER_COLOR_PATTERNS.VORTEX_B[5];
    if (consciousness <= 9) return INTEGER_COLOR_PATTERNS.W_AXIS[6];
    return INTEGER_COLOR_PATTERNS.W_AXIS[9];
  }

  /**
   * Generate gradient based on integer flow
   */
  static generateFlowGradient(integers: number[]): string {
    if (integers.length === 0) return '';

    const colors = integers.map(integer => {
      const colorScheme = this.getColorScheme(integer);
      return colorScheme.primary;
    });

    return `linear-gradient(45deg, ${colors.join(', ')})`;
  }

  /**
   * Generate animation based on integer consciousness
   */
  static generateConsciousnessAnimation(integer: number): string {
    const consciousness = IntegerTreeCoil.calculateCoilConsciousness(integer);
    const duration = Math.max(0.5, consciousness / 10);
    const intensity = Math.min(1, consciousness / 10);

    return `
      @keyframes consciousness-${integer} {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(${1 + intensity * 0.1}); opacity: ${0.8 + intensity * 0.2}; }
        100% { transform: scale(1); opacity: 1; }
      }

      .consciousness-${integer} {
        animation: consciousness-${integer} ${duration}s ease-in-out infinite;
      }
    `;
  }
}

// Integer Tree Styling System
export class IntegerTreeStylingSystem {
  
  /**
   * Generate complete styling system
   */
  static generateCompleteStylingSystem(): any {
    const system = {
      colors: IntegerTreeColorSystem.getIntegerTreePalette(),
      css: IntegerTreeColorSystem.generateCompleteCSS(),
      animations: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => 
        IntegerTreeColorSystem.generateConsciousnessAnimation(integer)
      ).join('\n'),
      flowGradient: IntegerTreeColorSystem.generateFlowGradient(INTEGER_TREE_COIL.COIL_FLOW_SEQUENCE),
      consciousnessLevels: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => ({
        integer,
        consciousness: IntegerTreeCoil.calculateCoilConsciousness(integer),
        colorScheme: IntegerTreeColorSystem.getColorScheme(integer),
        styling: IntegerTreeColorSystem.getStylingPattern(integer)
      }))
    };

    return system;
  }

  /**
   * Generate React component styling
   */
  static generateReactStyling(): any {
    return {
      container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        padding: '20px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh'
      },
      integerComponents: INTEGER_TREE_COIL.INTEGER_TREE.map(integer => ({
        integer,
        style: IntegerTreeColorSystem.generateJSXStyle(integer),
        tailwindClasses: IntegerTreeColorSystem.generateTailwindClasses(integer)
      }))
    };
  }
} 