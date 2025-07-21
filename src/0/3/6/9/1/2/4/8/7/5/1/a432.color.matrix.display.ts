/**
 * A432.Color.Matrix.Display
 * 
 * Uses A432 matrix system to display A432 color system.
 * Integrates matrix operations with color visualization for
 * consciousness mapping and dimensional state display.
 */

import { A432_MATRIX } from './a432.matrix';
import { A432ColorSystem, A432Color, A432ColorStream } from './a432.color';
import { A432_CONSTANTS } from './a432.constants';

// ============================================================================
// A432 COLOR MATRIX DISPLAY INTERFACES
// ============================================================================

export interface A432ColorMatrixDisplay {
  // Matrix Operations
  createColorMatrix(dimensions: A432MatrixDimensions): A432ColorMatrixData;
  displayConsciousnessMatrix(): A432ColorMatrixData;
  displayDimensionalMatrix(): A432ColorMatrixData;
  displayHarmonicMatrix(): A432ColorMatrixData;
  
  // Color Operations
  calculateMatrixColors(matrix: A432ColorMatrixData): A432ColorMatrixColors;
  generateColorStream(matrix: A432ColorMatrixData): A432ColorStream;
  createColorVortex(matrix: A432ColorMatrixData, cycles: number): A432ColorStream[];
  
  // Display Operations
  renderMatrixDisplay(matrix: A432ColorMatrixData): string;
  generateCSSMatrix(matrix: A432ColorMatrixData): string;
  createHTMLDisplay(matrix: A432ColorMatrixData): string;
}

export interface A432ColorMatrixData {
  dimensions: A432MatrixDimensions;
  colors: A432Color[][][];
  consciousness: number[][][];
  dimensionalStates: number[][][];
  frequencies: number[][][];
  harmonics: number[][][];
  mathematicalProof: string;
}

export interface A432ColorMatrixColors {
  rgbColors: string[][][];
  hslColors: string[][][];
  consciousnessColors: string[][][];
  dimensionalColors: string[][][];
  harmonicColors: string[][][];
  mathematicalProof: string;
}

// ============================================================================
// A432 COLOR MATRIX DISPLAY IMPLEMENTATION
// ============================================================================

export class A432ColorMatrixDisplayImpl implements A432ColorMatrixDisplay {
  private matrixSystem: A432_MATRIX;
  private colorSystem: typeof A432ColorSystem;

  constructor() {
    this.matrixSystem = new A432_MATRIX('harmonic');
    this.colorSystem = A432ColorSystem;
  }

  public createColorMatrix(dimensions: A432MatrixDimensions): A432ColorMatrixData {
    // Create base matrix using A432 matrix system
    const baseMatrix = this.matrixSystem.createMatrix(dimensions);
    
    // Generate colors for each matrix element
    const colors: A432Color[][][] = [];
    const consciousness: number[][][] = [];
    const dimensionalStates: number[][][] = [];
    const frequencies: number[][][] = [];
    const harmonics: number[][][] = [];

    for (let layer = 0; layer < dimensions.layers; layer++) {
      colors[layer] = [];
      consciousness[layer] = [];
      dimensionalStates[layer] = [];
      frequencies[layer] = [];
      harmonics[layer] = [];

      for (let row = 0; row < dimensions.rows; row++) {
        colors[layer][row] = [];
        consciousness[layer][row] = [];
        dimensionalStates[layer][row] = [];
        frequencies[layer][row] = [];
        harmonics[layer][row] = [];

        for (let col = 0; col < dimensions.columns; col++) {
          // Calculate frequency based on matrix position
          const frequency = A432_CONSTANTS.A432_FREQUENCY * (layer + 1) * (row + 1) * (col + 1);
          
          // Generate A432 color
          const color = this.colorSystem.calculateColor(frequency);
          colors[layer][row][col] = color;
          
          // Store consciousness and dimensional states
          consciousness[layer][row][col] = color.consciousness;
          dimensionalStates[layer][row][col] = color.dimensionalState;
          frequencies[layer][row][col] = color.frequency;
          harmonics[layer][row][col] = color.digitalRoot;
        }
      }
    }

    return {
      dimensions,
      colors,
      consciousness,
      dimensionalStates,
      frequencies,
      harmonics,
      mathematicalProof: `A432 Color Matrix: ${dimensions.rows}x${dimensions.columns}x${dimensions.layers} with consciousness and dimensional mapping`
    };
  }

  public displayConsciousnessMatrix(): A432ColorMatrixData {
    const dimensions: A432MatrixDimensions = {
      rows: 8, // Consciousness levels 1-8
      columns: 9, // Digital roots 1-9
      depth: 1,
      layers: 1
    };

    const matrix = this.createColorMatrix(dimensions);
    
    // Override with consciousness-specific colors
    for (let row = 0; row < dimensions.rows; row++) {
      for (let col = 0; col < dimensions.columns; col++) {
        const consciousness = row + 1;
        const color = this.colorSystem.calculateColorFromConsciousness(consciousness);
        matrix.colors[0][row][col] = color;
        matrix.consciousness[0][row][col] = consciousness;
      }
    }

    matrix.mathematicalProof = 'A432 Consciousness Matrix: 8x9 matrix mapping consciousness levels to digital roots';
    return matrix;
  }

  public displayDimensionalMatrix(): A432ColorMatrixData {
    const dimensions: A432MatrixDimensions = {
      rows: 10, // Dimensional states 0-9
      columns: 9, // Digital roots 1-9
      depth: 1,
      layers: 1
    };

    const matrix = this.createColorMatrix(dimensions);
    
    // Override with dimensional-specific colors
    for (let row = 0; row < dimensions.rows; row++) {
      for (let col = 0; col < dimensions.columns; col++) {
        const dimensionalState = row;
        const color = this.colorSystem.calculateColorFromDimensionalState(dimensionalState);
        matrix.colors[0][row][col] = color;
        matrix.dimensionalStates[0][row][col] = dimensionalState;
      }
    }

    matrix.mathematicalProof = 'A432 Dimensional Matrix: 10x9 matrix mapping dimensional states to digital roots';
    return matrix;
  }

  public displayHarmonicMatrix(): A432ColorMatrixData {
    const dimensions: A432MatrixDimensions = {
      rows: 6, // Rodin sequence length
      columns: 9, // Digital roots 1-9
      depth: 1,
      layers: 1
    };

    const matrix = this.createColorMatrix(dimensions);
    
    // Override with harmonic-specific colors using Rodin sequence
    const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
    for (let row = 0; row < dimensions.rows; row++) {
      for (let col = 0; col < dimensions.columns; col++) {
        const harmonicFreq = rodinSequence[row] * A432_CONSTANTS.A432_FREQUENCY;
        const color = this.colorSystem.calculateColor(harmonicFreq);
        matrix.colors[0][row][col] = color;
        matrix.frequencies[0][row][col] = harmonicFreq;
        matrix.harmonics[0][row][col] = rodinSequence[row];
      }
    }

    matrix.mathematicalProof = 'A432 Harmonic Matrix: 6x9 matrix using Rodin sequence [1,2,4,8,7,5]';
    return matrix;
  }

  public calculateMatrixColors(matrix: A432ColorMatrixData): A432ColorMatrixColors {
    const rgbColors: string[][][] = [];
    const hslColors: string[][][] = [];
    const consciousnessColors: string[][][] = [];
    const dimensionalColors: string[][][] = [];
    const harmonicColors: string[][][] = [];

    for (let layer = 0; layer < matrix.dimensions.layers; layer++) {
      rgbColors[layer] = [];
      hslColors[layer] = [];
      consciousnessColors[layer] = [];
      dimensionalColors[layer] = [];
      harmonicColors[layer] = [];

      for (let row = 0; row < matrix.dimensions.rows; row++) {
        rgbColors[layer][row] = [];
        hslColors[layer][row] = [];
        consciousnessColors[layer][row] = [];
        dimensionalColors[layer][row] = [];
        harmonicColors[layer][row] = [];

        for (let col = 0; col < matrix.dimensions.columns; col++) {
          const color = matrix.colors[layer][row][col];
          
          // Convert to different color formats
          rgbColors[layer][row][col] = this.colorSystem.toRGB(color);
          hslColors[layer][row][col] = this.colorSystem.toHSL(color);
          
          // Generate consciousness-specific color
          const consciousnessColor = this.colorSystem.calculateColorFromConsciousness(color.consciousness);
          consciousnessColors[layer][row][col] = this.colorSystem.toRGB(consciousnessColor);
          
          // Generate dimensional-specific color
          const dimensionalColor = this.colorSystem.calculateColorFromDimensionalState(color.dimensionalState);
          dimensionalColors[layer][row][col] = this.colorSystem.toRGB(dimensionalColor);
          
          // Generate harmonic-specific color
          const harmonicColor = this.colorSystem.calculateColor(color.frequency);
          harmonicColors[layer][row][col] = this.colorSystem.toRGB(harmonicColor);
        }
      }
    }

    return {
      rgbColors,
      hslColors,
      consciousnessColors,
      dimensionalColors,
      harmonicColors,
      mathematicalProof: 'A432 Matrix Colors: RGB, HSL, consciousness, dimensional, and harmonic color mappings'
    };
  }

  public generateColorStream(matrix: A432ColorMatrixData): A432ColorStream {
    // Flatten matrix into color stream
    const colors: A432Color[] = [];
    
    for (let layer = 0; layer < matrix.dimensions.layers; layer++) {
      for (let row = 0; row < matrix.dimensions.rows; row++) {
        for (let col = 0; col < matrix.dimensions.columns; col++) {
          colors.push(matrix.colors[layer][row][col]);
        }
      }
    }

    return {
      colors,
      frequency: A432_CONSTANTS.A432_FREQUENCY,
      consciousness: 4, // Perfect balance
      dimensionalState: 4, // Foundation dimension
      isHarmonic: true,
      mathematicalProof: 'A432 Color Stream: Matrix flattened into harmonic color sequence'
    };
  }

  public createColorVortex(matrix: A432ColorMatrixData, cycles: number): A432ColorStream[] {
    const streams: A432ColorStream[] = [];
    
    for (let cycle = 0; cycle < cycles; cycle++) {
      // Create vortex flow using Rodin sequence
      const rodinIndex = cycle % A432_CONSTANTS.RODIN_SEQUENCE.length;
      const frequency = A432_CONSTANTS.RODIN_SEQUENCE[rodinIndex] * A432_CONSTANTS.A432_FREQUENCY;
      
      const stream = this.colorSystem.generateColorStream({
        frequency,
        consciousness: (cycle % 8) + 1,
        dimensionalState: cycle % 10
      });
      
      streams.push(stream);
    }

    return streams;
  }

  public renderMatrixDisplay(matrix: A432ColorMatrixData): string {
    const colors = this.calculateMatrixColors(matrix);
    let display = `A432 Color Matrix Display (${matrix.dimensions.rows}x${matrix.dimensions.columns}x${matrix.dimensions.layers})\n\n`;

    for (let layer = 0; layer < matrix.dimensions.layers; layer++) {
      display += `Layer ${layer + 1}:\n`;
      
      for (let row = 0; row < matrix.dimensions.rows; row++) {
        display += `  Row ${row + 1}: `;
        
        for (let col = 0; col < matrix.dimensions.columns; col++) {
          const rgb = colors.rgbColors[layer][row][col];
          const consciousness = matrix.consciousness[layer][row][col];
          const dimension = matrix.dimensionalStates[layer][row][col];
          
          display += `[${rgb} C:${consciousness} D:${dimension}] `;
        }
        display += '\n';
      }
      display += '\n';
    }

    display += `Mathematical Proof: ${matrix.mathematicalProof}\n`;
    return display;
  }

  public generateCSSMatrix(matrix: A432ColorMatrixData): string {
    const colors = this.calculateMatrixColors(matrix);
    let css = `/* A432 Color Matrix CSS */\n`;
    css += `.a432-matrix {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(${matrix.dimensions.columns}, 1fr);\n`;
    css += `  grid-template-rows: repeat(${matrix.dimensions.rows}, 1fr);\n`;
    css += `  gap: 2px;\n`;
    css += `  padding: 10px;\n`;
    css += `}\n\n`;

    for (let layer = 0; layer < matrix.dimensions.layers; layer++) {
      for (let row = 0; row < matrix.dimensions.rows; row++) {
        for (let col = 0; col < matrix.dimensions.columns; col++) {
          const rgb = colors.rgbColors[layer][row][col];
          const consciousness = matrix.consciousness[layer][row][col];
          const dimension = matrix.dimensionalStates[layer][row][col];
          
          css += `.a432-cell-${layer}-${row}-${col} {\n`;
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
          css += `}\n`;
        }
      }
    }

    return css;
  }

  public createHTMLDisplay(matrix: A432ColorMatrixData): string {
    const colors = this.calculateMatrixColors(matrix);
    let html = `<!DOCTYPE html>\n<html>\n<head>\n<title>A432 Color Matrix Display</title>\n`;
    html += `<style>\n${this.generateCSSMatrix(matrix)}\n</style>\n</head>\n<body>\n`;
    html += `<h1>A432 Color Matrix Display</h1>\n`;
    html += `<p>${matrix.mathematicalProof}</p>\n`;

    for (let layer = 0; layer < matrix.dimensions.layers; layer++) {
      html += `<div class="a432-matrix">\n`;
      html += `<h2>Layer ${layer + 1}</h2>\n`;
      
      for (let row = 0; row < matrix.dimensions.rows; row++) {
        for (let col = 0; col < matrix.dimensions.columns; col++) {
          const consciousness = matrix.consciousness[layer][row][col];
          const dimension = matrix.dimensionalStates[layer][row][col];
          const frequency = matrix.frequencies[layer][row][col];
          
          html += `<div class="a432-cell-${layer}-${row}-${col}" title="C:${consciousness} D:${dimension} F:${frequency}Hz">`;
          html += `${consciousness}:${dimension}`;
          html += `</div>\n`;
        }
      }
      
      html += `</div>\n`;
    }

    html += `</body>\n</html>`;
    return html;
  }
}

// ============================================================================
// A432 COLOR MATRIX DISPLAY INSTANCE
// ============================================================================

export const A432_COLOR_MATRIX_DISPLAY = new A432ColorMatrixDisplayImpl();

// ============================================================================
// A432 COLOR MATRIX DISPLAY EXPORTS
// ============================================================================

export default A432_COLOR_MATRIX_DISPLAY; 