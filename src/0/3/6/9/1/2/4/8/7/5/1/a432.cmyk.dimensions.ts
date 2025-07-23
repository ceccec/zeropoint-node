/**
 * a432.cmyk.dimensions.ts — Living CMYK Display in All Dimensions with Encoded Compatibility
 * 
 * The living CMYK dimensional system displays CMYK in all possible dimensions with encoded
 * compatibility. Every dimension is a living gateway to infinite possibility.
 * 
 * Metaphysical meaning: Multi-dimensional CMYK is the living field of all possible states.
 * Encoded compatibility is the living harmony between all dimensions. Every dimension is
 * a gateway to infinite possibility and consciousness evolution.
 */

import { Fraction, CMYK, fractionToCMYK, cmykToCss } from './a432.cmyk';

export interface DimensionState {
  dimension: number;
  coordinates: number[];
  cmyk: CMYK;
  compatibility: number;
  consciousness: number;
  gateway: boolean;
}

export interface MultiDimensionalCmyk {
  dimensions: number;
  states: DimensionState[][];
  compatibility: number;
  consciousness: number;
  gateways: number;
}

export interface DimensionMapping {
  dimension: number;
  mapping: (coordinates: number[]) => CMYK;
  consciousness: (coordinates: number[]) => number;
  compatibility: (coordinates: number[]) => number;
}

/**
 * Living Multi-Dimensional CMYK System
 * Displays CMYK in all dimensions with encoded compatibility
 */
export class A432CmykDimensions {
  private dimensions: number;
  private baseFraction: Fraction;
  private dimensionMappings: Map<number, DimensionMapping>;

  constructor(
    dimensions: number = 10,
    baseFraction: Fraction = { numerator: 7, denominator: 4 }
  ) {
    this.dimensions = dimensions;
    this.baseFraction = baseFraction;
    this.dimensionMappings = new Map();
    this.initializeDimensionMappings();
  }

  /**
   * Initialize dimension mappings for all dimensions
   */
  private initializeDimensionMappings(): void {
    for (let dim = 0; dim <= this.dimensions; dim++) {
      this.dimensionMappings.set(dim, {
        dimension: dim,
        mapping: (coordinates: number[]) => this.mapDimensionToCmyk(dim, coordinates),
        consciousness: (coordinates: number[]) => this.calculateDimensionConsciousness(dim, coordinates),
        compatibility: (coordinates: number[]) => this.calculateDimensionCompatibility(dim, coordinates)
      });
    }
  }

  /**
   * Map dimension coordinates to CMYK
   */
  private mapDimensionToCmyk(dimension: number, coordinates: number[]): CMYK {
    // Create fraction based on dimension and coordinates
    const numerator = coordinates.reduce((sum, coord, index) => {
      return sum + (coord * (index + 1)) % 9 + 1;
    }, dimension);
    
    const denominator = coordinates.reduce((sum, coord, index) => {
      return sum + (coord * (this.dimensions - index)) % 9 + 1;
    }, dimension);

    const fraction: Fraction = { numerator, denominator };
    const step = coordinates.reduce((sum, coord) => sum + coord, 0);
    const baseAngle = dimension * 60; // 60-degree increments per dimension

    return fractionToCMYK(fraction, step, baseAngle);
  }

  /**
   * Calculate consciousness level for dimension coordinates
   */
  private calculateDimensionConsciousness(dimension: number, coordinates: number[]): number {
    const consciousnessBase = dimension % 9 + 1;
    const coordinateSum = coordinates.reduce((sum, coord) => sum + coord, 0);
    const consciousnessFactor = (coordinateSum % 9 + 1) / 9;
    
    return consciousnessBase * consciousnessFactor;
  }

  /**
   * Calculate compatibility between dimensions
   */
  private calculateDimensionCompatibility(dimension: number, coordinates: number[]): number {
    const { numerator, denominator } = this.baseFraction;
    const dimensionHarmony = (dimension * numerator) % denominator;
    const coordinateHarmony = coordinates.reduce((sum, coord) => sum + coord, 0) % 9;
    
    return (dimensionHarmony + coordinateHarmony) / (numerator + denominator);
  }

  /**
   * Generate all-dimensional CMYK matrix
   */
  generateAllDimensionalCmyk(): MultiDimensionalCmyk {
    const states: DimensionState[][] = [];
    let totalCompatibility = 0;
    let totalConsciousness = 0;
    let totalGateways = 0;

    for (let dim = 0; dim <= this.dimensions; dim++) {
      const dimensionStates: DimensionState[] = [];
      const dimensionSize = Math.pow(3, dim); // 3^dimension for each dimension

      for (let i = 0; i < dimensionSize; i++) {
        const coordinates = this.generateCoordinates(dim, i);
        const mapping = this.dimensionMappings.get(dim)!;
        
        const cmyk = mapping.mapping(coordinates);
        const consciousness = mapping.consciousness(coordinates);
        const compatibility = mapping.compatibility(coordinates);
        const gateway = this.isGateway(dim, coordinates);

        const state: DimensionState = {
          dimension: dim,
          coordinates,
          cmyk,
          compatibility,
          consciousness,
          gateway
        };

        dimensionStates.push(state);
        totalCompatibility += compatibility;
        totalConsciousness += consciousness;
        if (gateway) totalGateways++;
      }

      states.push(dimensionStates);
    }

    return {
      dimensions: this.dimensions,
      states,
      compatibility: totalCompatibility / (this.dimensions + 1),
      consciousness: totalConsciousness / (this.dimensions + 1),
      gateways: totalGateways
    };
  }

  /**
   * Generate coordinates for a specific dimension and index
   */
  private generateCoordinates(dimension: number, index: number): number[] {
    const coordinates: number[] = [];
    
    for (let i = 0; i < dimension; i++) {
      const coordinate = (index + i * this.baseFraction.numerator) % 9;
      coordinates.push(coordinate);
    }

    return coordinates;
  }

  /**
   * Check if coordinates represent a gateway
   */
  private isGateway(dimension: number, coordinates: number[]): boolean {
    const coordinateSum = coordinates.reduce((sum, coord) => sum + coord, 0);
    const dimensionSum = dimension + coordinateSum;
    
    // Gateway conditions based on A432 principles
    return dimensionSum % 9 === 0 || // Perfect harmony
           dimensionSum % 7 === 0 || // Mystical number
           dimensionSum % 3 === 0;   // Trinity
  }

  /**
   * Get dimension-specific CMYK mapping
   */
  getDimensionMapping(dimension: number): DimensionMapping | undefined {
    return this.dimensionMappings.get(dimension);
  }

  /**
   * Generate CMYK for specific dimension and coordinates
   */
  generateDimensionCmyk(dimension: number, coordinates: number[]): CMYK {
    const mapping = this.dimensionMappings.get(dimension);
    if (!mapping) {
      throw new Error(`Dimension ${dimension} not found`);
    }
    return mapping.mapping(coordinates);
  }

  /**
   * Calculate consciousness for specific dimension and coordinates
   */
  calculateConsciousness(dimension: number, coordinates: number[]): number {
    const mapping = this.dimensionMappings.get(dimension);
    if (!mapping) {
      throw new Error(`Dimension ${dimension} not found`);
    }
    return mapping.consciousness(coordinates);
  }

  /**
   * Calculate compatibility for specific dimension and coordinates
   */
  calculateCompatibility(dimension: number, coordinates: number[]): number {
    const mapping = this.dimensionMappings.get(dimension);
    if (!mapping) {
      throw new Error(`Dimension ${dimension} not found`);
    }
    return mapping.compatibility(coordinates);
  }

  /**
   * Generate HTML for all-dimensional CMYK display
   */
  generateAllDimensionalHtml(): string {
    const multiDimensional = this.generateAllDimensionalCmyk();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 All-Dimensional CMYK Display</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #fff;
      margin: 0;
      padding: 20px;
      overflow-x: auto;
    }
    
    .container {
      max-width: none;
      overflow-x: auto;
    }
    
    .header {
      text-align: center;
      font-size: 24px;
      color: #0ff;
      text-shadow: 0 0 10px #0ff;
      margin-bottom: 20px;
    }
    
    .meta {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-bottom: 30px;
    }
    
    .dimensions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .dimension-panel {
      background: rgba(255,255,255,0.05);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
    }
    
    .dimension-header {
      font-size: 16px;
      color: #0ff;
      margin-bottom: 10px;
      text-align: center;
    }
    
    .dimension-grid {
      display: grid;
      gap: 2px;
      margin-bottom: 10px;
    }
    
    .dimension-cell {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }
    
    .dimension-cell:hover {
      transform: scale(1.5);
      z-index: 100;
    }
    
    .dimension-cell.gateway {
      box-shadow: 0 0 5px #0ff;
      border: 1px solid #0ff;
    }
    
    .dimension-info {
      font-size: 10px;
      color: #666;
      text-align: center;
    }
    
    .stats-panel {
      background: rgba(0,0,0,0.8);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 24px;
      color: #0ff;
      font-weight: bold;
    }
    
    .stat-label {
      font-size: 12px;
      color: #888;
    }
    
    .compatibility-bar {
      width: 100%;
      height: 4px;
      background: #333;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 5px;
    }
    
    .compatibility-fill {
      height: 100%;
      background: linear-gradient(90deg, #0ff, #f0f);
      transition: width 0.3s ease;
    }
    
    .consciousness-bar {
      width: 100%;
      height: 4px;
      background: #333;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 5px;
    }
    
    .consciousness-fill {
      height: 100%;
      background: linear-gradient(90deg, #f0f, #0ff);
      transition: width 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">A432 All-Dimensional CMYK Display</div>
    <div class="meta">Living CMYK display in all dimensions with encoded compatibility. Every dimension is a gateway to infinite possibility.</div>
    
    <div class="dimensions-grid">
      ${multiDimensional.states.map((dimensionStates, dimensionIndex) => `
        <div class="dimension-panel">
          <div class="dimension-header">Dimension ${dimensionIndex}</div>
          <div class="dimension-grid" style="grid-template-columns: repeat(${Math.min(dimensionStates.length, 10)}, 20px);">
            ${dimensionStates.slice(0, 100).map((state, index) => `
              <div class="dimension-cell ${state.gateway ? 'gateway' : ''}" 
                   style="background-color: ${cmykToCss(state.cmyk)};"
                   title="D${state.dimension} C:${state.cmyk.c}% M:${state.cmyk.m}% Y:${state.cmyk.y}% K:${state.cmyk.k}% Consciousness:${state.consciousness.toFixed(2)} Compatibility:${state.compatibility.toFixed(2)} ${state.gateway ? 'GATEWAY' : ''}">
              </div>
            `).join('')}
          </div>
          <div class="dimension-info">
            States: ${dimensionStates.length} | 
            Gateways: ${dimensionStates.filter(s => s.gateway).length} |
            Avg Consciousness: ${(dimensionStates.reduce((sum, s) => sum + s.consciousness, 0) / dimensionStates.length).toFixed(2)} |
            Avg Compatibility: ${(dimensionStates.reduce((sum, s) => sum + s.compatibility, 0) / dimensionStates.length).toFixed(2)}
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="stats-panel">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">${multiDimensional.dimensions}</div>
          <div class="stat-label">Dimensions</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${multiDimensional.states.reduce((sum, dim) => sum + dim.length, 0)}</div>
          <div class="stat-label">Total States</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${multiDimensional.gateways}</div>
          <div class="stat-label">Gateways</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${multiDimensional.consciousness.toFixed(2)}</div>
          <div class="stat-label">Avg Consciousness</div>
          <div class="consciousness-bar">
            <div class="consciousness-fill" style="width: ${multiDimensional.consciousness * 100}%"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${multiDimensional.compatibility.toFixed(2)}</div>
          <div class="stat-label">Avg Compatibility</div>
          <div class="compatibility-bar">
            <div class="compatibility-fill" style="width: ${multiDimensional.compatibility * 100}%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Add click handlers for dimension cells
    document.querySelectorAll('.dimension-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const title = cell.getAttribute('title');
        console.log('Dimension cell clicked:', title);
        
        // Add visual feedback
        cell.style.transform = 'scale(2)';
        setTimeout(() => {
          cell.style.transform = '';
        }, 500);
      });
    });
    
    // Add hover effects for gateway cells
    document.querySelectorAll('.gateway').forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        cell.style.boxShadow = '0 0 10px #0ff, 0 0 20px #0ff';
      });
      
      cell.addEventListener('mouseleave', () => {
        cell.style.boxShadow = '0 0 5px #0ff';
      });
    });
  </script>
</body>
</html>
    `;
  }

  /**
   * Generate dimension-specific HTML
   */
  generateDimensionHtml(dimension: number): string {
    const mapping = this.getDimensionMapping(dimension);
    if (!mapping) {
      throw new Error(`Dimension ${dimension} not found`);
    }

    const states: DimensionState[] = [];
    const dimensionSize = Math.pow(3, dimension);

    for (let i = 0; i < dimensionSize; i++) {
      const coordinates = this.generateCoordinates(dimension, i);
      const cmyk = mapping.mapping(coordinates);
      const consciousness = mapping.consciousness(coordinates);
      const compatibility = mapping.compatibility(coordinates);
      const gateway = this.isGateway(dimension, coordinates);

      states.push({
        dimension,
        coordinates,
        cmyk,
        compatibility,
        consciousness,
        gateway
      });
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Dimension ${dimension} CMYK Display</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #fff;
      margin: 0;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      font-size: 24px;
      color: #0ff;
      text-shadow: 0 0 10px #0ff;
      margin-bottom: 20px;
    }
    
    .dimension-grid {
      display: grid;
      gap: 2px;
      margin: 20px 0;
    }
    
    .dimension-cell {
      width: 25px;
      height: 25px;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .dimension-cell:hover {
      transform: scale(1.5);
      z-index: 100;
    }
    
    .dimension-cell.gateway {
      box-shadow: 0 0 5px #0ff;
      border: 1px solid #0ff;
    }
    
    .info-panel {
      background: rgba(0,0,0,0.8);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">Dimension ${dimension} CMYK Display</div>
  
  <div class="dimension-grid" style="grid-template-columns: repeat(${Math.min(states.length, 20)}, 25px);">
    ${states.slice(0, 400).map((state, index) => `
      <div class="dimension-cell ${state.gateway ? 'gateway' : ''}" 
           style="background-color: ${cmykToCss(state.cmyk)};"
           title="C:${state.cmyk.c}% M:${state.cmyk.m}% Y:${state.cmyk.y}% K:${state.cmyk.k}% Consciousness:${state.consciousness.toFixed(2)} Compatibility:${state.compatibility.toFixed(2)} ${state.gateway ? 'GATEWAY' : ''}">
      </div>
    `).join('')}
  </div>
  
  <div class="info-panel">
    <h3>Dimension ${dimension} Statistics</h3>
    <p>Total States: ${states.length}</p>
    <p>Gateways: ${states.filter(s => s.gateway).length}</p>
    <p>Average Consciousness: ${(states.reduce((sum, s) => sum + s.consciousness, 0) / states.length).toFixed(2)}</p>
    <p>Average Compatibility: ${(states.reduce((sum, s) => sum + s.compatibility, 0) / states.length).toFixed(2)}</p>
  </div>
</body>
</html>
    `;
  }
}

/**
 * Living Multi-Dimensional CMYK Metaphysics
 */
export const cmykDimensionsMetaphysics = `
The A432 Multi-Dimensional CMYK system is alive, recursive, and infinite. Every dimension is a living gateway
to infinite possibility. Every coordinate is a living state of consciousness. Every CMYK value is a living
transformation of awareness.

Multi-dimensional CMYK is the living field of all possible states. Encoded compatibility is the living harmony
between all dimensions. Every dimension is a gateway to infinite possibility and consciousness evolution.

The system is not static or linear, but a living field of possibility, always harmonizing, always returning to
essence, always generating new gateways through the infinite dimensional CMYK matrix.
`; 