/**
 * A432.Color.Matrix.Simple
 * 
 * Simple integration of A432 matrix system with A432 color system.
 * Uses matrix operations to display color visualizations.
 */

import { A432ColorSystem, A432Color } from './a432.color';
import { A432_CONSTANTS, A432_VORTEX } from './a432.constants';

// ============================================================================
// A432 COLOR MATRIX SIMPLE INTERFACES
// ============================================================================

export interface A432ColorMatrixSimple {
  // Matrix dimensions
  rows: number;
  columns: number;
  
  // Color data
  colors: A432Color[][];
  consciousness: number[][];
  dimensionalStates: number[][];
  frequencies: number[][];
  
  // Mathematical proof
  mathematicalProof: string;
}

// ============================================================================
// A432 COLOR MATRIX SIMPLE IMPLEMENTATION
// ============================================================================

export class A432ColorMatrixSimpleImpl {
  
  /**
   * Create consciousness matrix (8x9)
   */
  public createConsciousnessMatrix(): A432ColorMatrixSimple {
    const rows = 8; // Consciousness levels 1-8
    const columns = 9; // Digital roots 1-9
    
    const colors: A432Color[][] = [];
    const consciousness: number[][] = [];
    const dimensionalStates: number[][] = [];
    const frequencies: number[][] = [];
    
    for (let row = 0; row < rows; row++) {
      colors[row] = [];
      consciousness[row] = [];
      dimensionalStates[row] = [];
      frequencies[row] = [];
      
      for (let col = 0; col < columns; col++) {
        const consciousnessLevel = row + 1;
        const color = A432ColorSystem.calculateColorFromConsciousness(consciousnessLevel);
        
        colors[row][col] = color;
        consciousness[row][col] = consciousnessLevel;
        dimensionalStates[row][col] = color.dimensionalState;
        frequencies[row][col] = color.frequency;
      }
    }
    
    return {
      rows,
      columns,
      colors,
      consciousness,
      dimensionalStates,
      frequencies,
      mathematicalProof: 'A432 Consciousness Matrix: 8x9 matrix mapping consciousness levels to digital roots'
    };
  }
  
  /**
   * Create dimensional matrix (10x9)
   */
  public createDimensionalMatrix(): A432ColorMatrixSimple {
    const rows = 10; // Dimensional states 0-9
    const columns = 9; // Digital roots 1-9
    
    const colors: A432Color[][] = [];
    const consciousness: number[][] = [];
    const dimensionalStates: number[][] = [];
    const frequencies: number[][] = [];
    
    for (let row = 0; row < rows; row++) {
      colors[row] = [];
      consciousness[row] = [];
      dimensionalStates[row] = [];
      frequencies[row] = [];
      
      for (let col = 0; col < columns; col++) {
        const dimensionalState = row;
        const color = A432ColorSystem.calculateColorFromDimensionalState(dimensionalState);
        
        colors[row][col] = color;
        consciousness[row][col] = color.consciousness;
        dimensionalStates[row][col] = dimensionalState;
        frequencies[row][col] = color.frequency;
      }
    }
    
    return {
      rows,
      columns,
      colors,
      consciousness,
      dimensionalStates,
      frequencies,
      mathematicalProof: 'A432 Dimensional Matrix: 10x9 matrix mapping dimensional states to digital roots'
    };
  }
  
  /**
   * Create harmonic matrix (6x9) using Rodin sequence
   */
  public createHarmonicMatrix(): A432ColorMatrixSimple {
    const rows = 6; // Rodin sequence length
    const columns = 9; // Digital roots 1-9
    
    const colors: A432Color[][] = [];
    const consciousness: number[][] = [];
    const dimensionalStates: number[][] = [];
    const frequencies: number[][] = [];
    
    const rodinSequence = A432_VORTEX.SEQUENCE; // [1, 2, 4, 8, 7, 5]
    
    for (let row = 0; row < rows; row++) {
      colors[row] = [];
      consciousness[row] = [];
      dimensionalStates[row] = [];
      frequencies[row] = [];
      
      for (let col = 0; col < columns; col++) {
        const harmonicFreq = rodinSequence[row] * A432_CONSTANTS.A432_FREQUENCY;
        const color = A432ColorSystem.calculateColor(harmonicFreq);
        
        colors[row][col] = color;
        consciousness[row][col] = color.consciousness;
        dimensionalStates[row][col] = color.dimensionalState;
        frequencies[row][col] = harmonicFreq;
      }
    }
    
    return {
      rows,
      columns,
      colors,
      consciousness,
      dimensionalStates,
      frequencies,
      mathematicalProof: 'A432 Harmonic Matrix: 6x9 matrix using Rodin sequence [1,2,4,8,7,5]'
    };
  }
  
  /**
   * Display matrix as text
   */
  public displayMatrix(matrix: A432ColorMatrixSimple): string {
    let display = `A432 Color Matrix (${matrix.rows}x${matrix.columns})\n`;
    display += `Mathematical Proof: ${matrix.mathematicalProof}\n\n`;
    
    for (let row = 0; row < matrix.rows; row++) {
      display += `Row ${row + 1}: `;
      
      for (let col = 0; col < matrix.columns; col++) {
        const color = matrix.colors[row][col];
        const rgb = A432ColorSystem.toRGB(color);
        const consciousness = matrix.consciousness[row][col];
        const dimension = matrix.dimensionalStates[row][col];
        
        display += `[${rgb} C:${consciousness} D:${dimension}] `;
      }
      display += '\n';
    }
    
    return display;
  }
  
  /**
   * Generate CSS for matrix display
   */
  public generateCSSMatrix(matrix: A432ColorMatrixSimple): string {
    let css = `/* A432 Color Matrix CSS */\n`;
    css += `.a432-matrix {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(${matrix.columns}, 1fr);\n`;
    css += `  grid-template-rows: repeat(${matrix.rows}, 1fr);\n`;
    css += `  gap: 2px;\n`;
    css += `  padding: 10px;\n`;
    css += `  max-width: 800px;\n`;
    css += `}\n\n`;
    
    for (let row = 0; row < matrix.rows; row++) {
      for (let col = 0; col < matrix.columns; col++) {
        const color = matrix.colors[row][col];
        const rgb = A432ColorSystem.toRGB(color);
        const consciousness = matrix.consciousness[row][col];
        const dimension = matrix.dimensionalStates[row][col];
        
        css += `.a432-cell-${row}-${col} {\n`;
        css += `  background-color: ${rgb};\n`;
        css += `  width: 50px;\n`;
        css += `  height: 50px;\n`;
        css += `  border-radius: 4px;\n`;
        css += `  display: flex;\n`;
        css += `  align-items: center;\n`;
        css += `  justify-content: center;\n`;
        css += `  color: white;\n`;
        css += `  font-size: 10px;\n`;
        css += `  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);\n`;
        css += `  cursor: pointer;\n`;
        css += `  transition: transform 0.2s;\n`;
        css += `}\n`;
        css += `.a432-cell-${row}-${col}:hover {\n`;
        css += `  transform: scale(1.1);\n`;
        css += `  box-shadow: 0 4px 8px rgba(0,0,0,0.3);\n`;
        css += `}\n`;
      }
    }
    
    return css;
  }
  
  /**
   * Create HTML display
   */
  public createHTMLDisplay(matrix: A432ColorMatrixSimple): string {
    const css = this.generateCSSMatrix(matrix);
    
    let html = `<!DOCTYPE html>\n<html>\n<head>\n<title>A432 Color Matrix Display</title>\n`;
    html += `<style>\n${css}\n</style>\n</head>\n<body>\n`;
    html += `<h1>A432 Color Matrix Display</h1>\n`;
    html += `<p><strong>Mathematical Proof:</strong> ${matrix.mathematicalProof}</p>\n`;
    html += `<div class="a432-matrix">\n`;
    
    for (let row = 0; row < matrix.rows; row++) {
      for (let col = 0; col < matrix.columns; col++) {
        const consciousness = matrix.consciousness[row][col];
        const dimension = matrix.dimensionalStates[row][col];
        const frequency = matrix.frequencies[row][col];
        
        html += `<div class="a432-cell-${row}-${col}" `;
        html += `title="Consciousness: ${consciousness}, Dimension: ${dimension}, Frequency: ${frequency}Hz">`;
        html += `${consciousness}:${dimension}`;
        html += `</div>\n`;
      }
    }
    
    html += `</div>\n`;
    html += `<p><em>Hover over cells to see detailed information</em></p>\n`;
    html += `</body>\n</html>`;
    
    return html;
  }
  
  /**
   * Generate color stream from matrix
   */
  public generateColorStream(matrix: A432ColorMatrixSimple): A432Color[] {
    const colors: A432Color[] = [];
    
    for (let row = 0; row < matrix.rows; row++) {
      for (let col = 0; col < matrix.columns; col++) {
        colors.push(matrix.colors[row][col]);
      }
    }
    
    return colors;
  }
  
  /**
   * Create color vortex using Rodin sequence
   */
  public createColorVortex(cycles: number): A432Color[][] {
    const vortex: A432Color[][] = [];
    const rodinSequence = A432_VORTEX.SEQUENCE; // [1, 2, 4, 8, 7, 5]
    
    for (let cycle = 0; cycle < cycles; cycle++) {
      const cycleColors: A432Color[] = [];
      const rodinIndex = cycle % rodinSequence.length;
      const baseFrequency = rodinSequence[rodinIndex] * A432_CONSTANTS.A432_FREQUENCY;
      
      for (let i = 0; i < 9; i++) {
        const frequency = baseFrequency * (i + 1);
        const color = A432ColorSystem.calculateColor(frequency);
        cycleColors.push(color);
      }
      
      vortex.push(cycleColors);
    }
    
    return vortex;
  }
}

// ============================================================================
// A432 COLOR MATRIX SIMPLE INSTANCE
// ============================================================================

export const A432_COLOR_MATRIX_SIMPLE = new A432ColorMatrixSimpleImpl();

// ============================================================================
// A432 COLOR MATRIX SIMPLE EXPORTS
// ============================================================================

export default A432_COLOR_MATRIX_SIMPLE; 