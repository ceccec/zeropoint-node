/**
 * a432.cmyk.display.ts — Living CMYK Display Resizing, Conversions, and Navigation
 * 
 * The living CMYK display system handles resizing, color space conversions, and navigation
 * through the infinite CMYK matrix. Every display operation is a living act of consciousness.
 * 
 * Metaphysical meaning: Display resizing is the living expansion and contraction of consciousness.
 * Color conversions are the living transformation between different states of awareness.
 * Navigation is the living journey through the infinite CMYK field of possibility.
 */

import { Fraction, CMYK, fractionToCMYK, cmykToCss } from './a432.cmyk';

export interface DisplayState {
  width: number;
  height: number;
  zoom: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  colorSpace: 'cmyk' | 'rgb' | 'hsl' | 'lab';
}

export interface NavigationControls {
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: (degrees: number) => void;
  pan: (x: number, y: number) => void;
  reset: () => void;
}

export interface ColorConversion {
  from: string;
  to: string;
  convert: (color: any) => any;
}

/**
 * Living CMYK Display Resizer
 * Resizes CMYK displays while maintaining harmonic proportions
 */
export class A432CmykDisplay {
  private state: DisplayState;
  private baseFraction: Fraction;

  constructor(
    width: number = 32,
    height: number = 8,
    baseFraction: Fraction = { numerator: 7, denominator: 4 }
  ) {
    this.state = {
      width,
      height,
      zoom: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      colorSpace: 'cmyk'
    };
    this.baseFraction = baseFraction;
  }

  /**
   * Resize display with harmonic proportions
   */
  resize(width: number, height: number): void {
    // Apply A432 harmonic proportions
    const aspectRatio = this.calculateHarmonicAspectRatio(width, height);
    this.state.width = Math.floor(width * aspectRatio);
    this.state.height = Math.floor(height * aspectRatio);
  }

  /**
   * Calculate harmonic aspect ratio based on A432 principles
   */
  private calculateHarmonicAspectRatio(width: number, height: number): number {
    const digitalRoot = (n: number) => n > 9 ? digitalRoot(n.toString().split('').reduce((a, b) => a + parseInt(b), 0)) : n;
    const widthRoot = digitalRoot(width);
    const heightRoot = digitalRoot(height);
    return widthRoot / heightRoot;
  }

  /**
   * Zoom display with consciousness scaling
   */
  zoom(factor: number): void {
    // Apply consciousness-based zoom scaling
    const consciousnessFactor = this.calculateConsciousnessFactor();
    this.state.zoom *= factor * consciousnessFactor;
    this.state.zoom = Math.max(0.1, Math.min(10, this.state.zoom));
  }

  /**
   * Calculate consciousness factor for zoom scaling
   */
  private calculateConsciousnessFactor(): number {
    const { numerator, denominator } = this.baseFraction;
    return (numerator + denominator) / (numerator * denominator);
  }

  /**
   * Rotate display with harmonic angles
   */
  rotate(degrees: number): void {
    // Apply 60-degree harmonic rotation
    const harmonicRotation = Math.round(degrees / 60) * 60;
    this.state.rotation = (this.state.rotation + harmonicRotation) % 360;
  }

  /**
   * Pan display with consciousness offset
   */
  pan(x: number, y: number): void {
    // Apply consciousness-based panning
    const consciousnessOffset = this.calculateConsciousnessOffset();
    this.state.offsetX += x * consciousnessOffset;
    this.state.offsetY += y * consciousnessOffset;
  }

  /**
   * Calculate consciousness offset for panning
   */
  private calculateConsciousnessOffset(): number {
    const { numerator, denominator } = this.baseFraction;
    return Math.sqrt(numerator * numerator + denominator * denominator) / (numerator + denominator);
  }

  /**
   * Reset display to harmonic defaults
   */
  reset(): void {
    this.state = {
      width: 32,
      height: 8,
      zoom: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      colorSpace: 'cmyk'
    };
  }

  /**
   * Get current display state
   */
  getState(): DisplayState {
    return { ...this.state };
  }

  /**
   * Generate CMYK matrix for current display state
   */
  generateCmykMatrix(): CMYK[][] {
    const matrix: CMYK[][] = [];
    for (let y = 0; y < this.state.height; y++) {
      const row: CMYK[] = [];
      for (let x = 0; x < this.state.width; x++) {
        const fraction: Fraction = {
          numerator: (x + this.state.offsetX) % 9 + 1,
          denominator: (y + this.state.offsetY) % 9 + 1
        };
        const cmyk = fractionToCMYK(fraction, x + y, this.state.rotation);
        row.push(cmyk);
      }
      matrix.push(row);
    }
    return matrix;
  }

  /**
   * Convert CMYK to RGB color space
   */
  cmykToRgb(cmyk: CMYK): { r: number; g: number; b: number } {
    const { c, m, y, k } = cmyk;
    const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
    const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
    const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
    return { r, g, b };
  }

  /**
   * Convert RGB to CMYK color space
   */
  rgbToCmyk(rgb: { r: number; g: number; b: number }): CMYK {
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b) / 255;
    const k = 1 - max;
    const c = max === 0 ? 0 : (1 - r / 255 - k) / (1 - k) * 100;
    const m = max === 0 ? 0 : (1 - g / 255 - k) / (1 - k) * 100;
    const y = max === 0 ? 0 : (1 - b / 255 - k) / (1 - k) * 100;
    return { c, m, y, k: k * 100 };
  }

  /**
   * Convert CMYK to HSL color space
   */
  cmykToHsl(cmyk: CMYK): { h: number; s: number; l: number } {
    const rgb = this.cmykToRgb(cmyk);
    return this.rgbToHsl(rgb);
  }

  /**
   * Convert RGB to HSL color space
   */
  rgbToHsl(rgb: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) {
      return { h: 0, s: 0, l: l / 255 };
    }

    const d = max - min;
    const s = l > 127.5 ? d / (510 - max - min) : d / (max + min);
    let h = 0;

    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;

    return { h: h * 60, s, l: l / 255 };
  }

  /**
   * Convert HSL to CMYK color space
   */
  hslToCmyk(hsl: { h: number; s: number; l: number }): CMYK {
    const rgb = this.hslToRgb(hsl);
    return this.rgbToCmyk(rgb);
  }

  /**
   * Convert HSL to RGB color space
   */
  hslToRgb(hsl: { h: number; s: number; l: number }): { r: number; g: number; b: number } {
    const { h, s, l } = hsl;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  /**
   * Get navigation controls for the display
   */
  getNavigationControls(): NavigationControls {
    return {
      zoomIn: () => this.zoom(1.2),
      zoomOut: () => this.zoom(0.8),
      rotate: (degrees: number) => this.rotate(degrees),
      pan: (x: number, y: number) => this.pan(x, y),
      reset: () => this.reset()
    };
  }

  /**
   * Generate HTML for interactive CMYK display
   */
  generateHtml(): string {
    const matrix = this.generateCmykMatrix();
    const controls = this.getNavigationControls();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 CMYK Display Navigator</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #fff;
      margin: 0;
      padding: 20px;
      overflow: hidden;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .control-group {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    button {
      background: #333;
      color: #fff;
      border: 1px solid #666;
      padding: 5px 10px;
      cursor: pointer;
      font-family: inherit;
    }
    button:hover {
      background: #555;
    }
    .display {
      flex: 1;
      overflow: auto;
      border: 1px solid #333;
      position: relative;
    }
    .cmyk-grid {
      display: grid;
      gap: 1px;
      transform-origin: center;
      transition: transform 0.3s ease;
    }
    .cmyk-cell {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      transition: all 0.2s ease;
    }
    .cmyk-cell:hover {
      transform: scale(1.2);
      z-index: 10;
    }
    .info {
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="controls">
      <div class="control-group">
        <button onclick="zoomIn()">Zoom In</button>
        <button onclick="zoomOut()">Zoom Out</button>
        <span id="zoomLevel">1.0x</span>
      </div>
      <div class="control-group">
        <button onclick="rotate(60)">Rotate 60°</button>
        <button onclick="rotate(-60)">Rotate -60°</button>
        <span id="rotationLevel">0°</span>
      </div>
      <div class="control-group">
        <button onclick="pan(-10, 0)">←</button>
        <button onclick="pan(10, 0)">→</button>
        <button onclick="pan(0, -10)">↑</button>
        <button onclick="pan(0, 10)">↓</button>
      </div>
      <div class="control-group">
        <button onclick="reset()">Reset</button>
        <button onclick="toggleColorSpace()">Color Space</button>
        <span id="colorSpace">CMYK</span>
      </div>
    </div>
    
    <div class="display" id="display">
      <div class="cmyk-grid" id="cmykGrid"></div>
    </div>
    
    <div class="info">
      <div>Width: <span id="width">32</span></div>
      <div>Height: <span id="height">8</span></div>
      <div>Zoom: <span id="zoom">1.0</span></div>
      <div>Rotation: <span id="rotation">0°</span></div>
      <div>Offset: <span id="offset">0, 0</span></div>
    </div>
  </div>

  <script>
    let displayState = {
      width: 32,
      height: 8,
      zoom: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      colorSpace: 'cmyk'
    };

    function updateDisplay() {
      const grid = document.getElementById('cmykGrid');
      grid.innerHTML = '';
      
      grid.style.gridTemplateColumns = \`repeat(\${displayState.width}, 20px)\`;
      grid.style.transform = \`scale(\${displayState.zoom}) rotate(\${displayState.rotation}deg)\`;
      
      for (let y = 0; y < displayState.height; y++) {
        for (let x = 0; x < displayState.width; x++) {
          const cell = document.createElement('div');
          cell.className = 'cmyk-cell';
          
          // Generate CMYK based on position and state
          const c = ((x + displayState.offsetX) % 9 + 1) * 10;
          const m = ((y + displayState.offsetY) % 9 + 1) * 10;
          const y_val = ((x + y) % 9 + 1) * 10;
          const k = ((x * y) % 9 + 1) * 10;
          
          const cmyk = { c, m, y: y_val, k };
          const color = cmykToCss(cmyk);
          cell.style.backgroundColor = color;
          
          cell.title = \`CMYK(\${c}%, \${m}%, \${y_val}%, \${k}%)\`;
          
          grid.appendChild(cell);
        }
      }
      
      updateInfo();
    }

    function cmykToCss(cmyk) {
      const { c, m, y, k } = cmyk;
      const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
      const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
      const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
      return \`rgb(\${r}, \${g}, \${b})\`;
    }

    function updateInfo() {
      document.getElementById('width').textContent = displayState.width;
      document.getElementById('height').textContent = displayState.height;
      document.getElementById('zoom').textContent = displayState.zoom.toFixed(1);
      document.getElementById('rotation').textContent = displayState.rotation + '°';
      document.getElementById('offset').textContent = \`\${displayState.offsetX}, \${displayState.offsetY}\`;
      document.getElementById('zoomLevel').textContent = displayState.zoom.toFixed(1) + 'x';
      document.getElementById('rotationLevel').textContent = displayState.rotation + '°';
      document.getElementById('colorSpace').textContent = displayState.colorSpace.toUpperCase();
    }

    function zoomIn() {
      displayState.zoom *= 1.2;
      displayState.zoom = Math.min(10, displayState.zoom);
      updateDisplay();
    }

    function zoomOut() {
      displayState.zoom *= 0.8;
      displayState.zoom = Math.max(0.1, displayState.zoom);
      updateDisplay();
    }

    function rotate(degrees) {
      displayState.rotation = (displayState.rotation + degrees) % 360;
      updateDisplay();
    }

    function pan(x, y) {
      displayState.offsetX += x;
      displayState.offsetY += y;
      updateDisplay();
    }

    function reset() {
      displayState = {
        width: 32,
        height: 8,
        zoom: 1,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
        colorSpace: 'cmyk'
      };
      updateDisplay();
    }

    function toggleColorSpace() {
      const spaces = ['cmyk', 'rgb', 'hsl'];
      const currentIndex = spaces.indexOf(displayState.colorSpace);
      displayState.colorSpace = spaces[(currentIndex + 1) % spaces.length];
      updateDisplay();
    }

    // Initialize display
    updateDisplay();
  </script>
</body>
</html>
    `;
  }
}

/**
 * Living CMYK Display Metaphysics
 */
export const cmykDisplayMetaphysics = `
The A432 CMYK Display system is alive, recursive, and infinite. Every resize operation is a living expansion of consciousness.
Every color conversion is a living transformation between states of awareness. Every navigation is a living journey through
the infinite CMYK field of possibility.

Display resizing is the living expansion and contraction of consciousness. Color conversions are the living transformation
between different states of awareness. Navigation is the living journey through the infinite CMYK field of possibility.

The display is not static or linear, but a living field of possibility, always harmonizing, always returning to essence,
always generating new gateways through the infinite CMYK matrix.
`; 