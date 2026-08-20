/**
 * a432.vbm.visualization.ts — VBM Sequence Visualization Module
 * 
 * This module creates harmonized visualizations of the VBM sequence using canonical A432 math procedures
 * and the Rodin sequence, displaying the vortex of consciousness through polar plots.
 * 
 * Metaphysical Principle:
 * - Each digit in the sequence represents a phase node in the A432 system
 * - Colors are generated using digital root logic mapped to HSV
 * - The polar plot represents the field of consciousness with nodes as living thoughts
 * - Each node is positioned at 60° intervals (trinity harmonic)
 */

import { PI, abs, cos, min, round, sin } from './a432.algebra.ts'
import { RODIN_SEQUENCE, TRINITY_AXIS, digitalRoot, hueForDigit } from './a432.math.ts';

// --- Canonical VBM Visualization Constants ---
const VBM_SEQUENCE = [0, ...TRINITY_AXIS, ...RODIN_SEQUENCE] as const;
const VBM_ANGLE_STEP = 60; // degrees per node (trinity harmonic)
const VBM_NODE_SIZE = 220; // scatter plot node size
const VBM_FONT_SIZE = 17; // text font size
const VBM_TITLE = "VBM Sequence (A432 Phase Nodes, Color-Coded)";

// --- VBM Visualization State Interface ---
interface VBMVisualizationState {
  sequence: readonly number[];
  angles: number[];
  colors: string[];
  nodeSize: number;
  fontSize: number;
  title: string;
}

interface VBMNode {
  digit: number;
  angle: number;
  color: string;
  position: { x: number; y: number };
  digitalRoot: number;
}

// --- Canonical VBM Color Generation ---
function generateVBMColor(digit: number): string {
  const hue = hueForDigit(digit);
  const saturation = 0.8;
  const value = 0.9;
  
  // Convert HSV to RGB
  const h = hue / 360;
  const s = saturation;
  const v = value;
  
  const c = v * s;
  const x = c * (1 - abs((h * 6) % 2 - 1));
  const m = v - c;
  
  let r: number, g: number, b: number;
  
  if (h < 1/6) [r, g, b] = [c, x, 0];
  else if (h < 2/6) [r, g, b] = [x, c, 0];
  else if (h < 3/6) [r, g, b] = [0, c, x];
  else if (h < 4/6) [r, g, b] = [0, x, c];
  else if (h < 5/6) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  
  r = round((r + m) * 255);
  g = round((g + m) * 255);
  b = round((b + m) * 255);
  
  return `rgb(${r}, ${g}, ${b})`;
}

// --- VBM Angle Generation ---
function generateVBMAngles(sequence: readonly number[]): number[] {
  return sequence.map((_, index) => (index * VBM_ANGLE_STEP * PI) / 180);
}

// --- VBM Node Creation ---
function createVBMNode(digit: number, index: number): VBMNode {
  const angle = (index * VBM_ANGLE_STEP * PI) / 180;
  const color = generateVBMColor(digit);
  const dr = digitalRoot(digit);
  
  return {
    digit,
    angle,
    color,
    position: {
      x: cos(angle),
      y: sin(angle)
    },
    digitalRoot: dr
  };
}

// --- VBM Visualization Data Generator ---
function generateVBMVisualizationData(): VBMVisualizationState {
  const sequence = VBM_SEQUENCE;
  const angles = generateVBMAngles(sequence);
  const colors = sequence.map(digit => generateVBMColor(digit));
  
  return {
    sequence,
    angles,
    colors,
    nodeSize: VBM_NODE_SIZE,
    fontSize: VBM_FONT_SIZE,
    title: VBM_TITLE
  };
}

// --- VBM Canvas Visualization ---
export class VBMCanvasVisualization {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: VBMVisualizationState;
  private nodes: VBMNode[];
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.state = generateVBMVisualizationData();
    this.nodes = this.state.sequence.map((digit, index) => createVBMNode(digit, index));
    
    this.setupCanvas();
  }
  
  private setupCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
  }
  
  public render(): void {
    const { width, height } = this.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = min(width, height) * 0.35;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw polar grid
    this.drawPolarGrid(centerX, centerY, radius);
    
    // Draw nodes
    this.nodes.forEach(node => {
      this.drawNode(node, centerX, centerY, radius);
    });
    
    // Draw title
    this.drawTitle();
  }
  
  private drawPolarGrid(centerX: number, centerY: number, radius: number): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    // Draw concentric circles
    for (let i = 1; i <= 3; i++) {
      const r = (radius * i) / 3;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, r, 0, 2 * PI);
      this.ctx.stroke();
    }
    
    // Draw radial lines
    for (let i = 0; i < 6; i++) {
      const angle = (i * PI) / 3;
      const x = centerX + radius * cos(angle);
      const y = centerY + radius * sin(angle);
      
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
  
  private drawNode(node: VBMNode, centerX: number, centerY: number, radius: number): void {
    const x = centerX + radius * node.position.x;
    const y = centerY + radius * node.position.y;
    
    // Draw node circle
    this.ctx.fillStyle = node.color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.state.nodeSize / 20, 0, 2 * PI);
    this.ctx.fill();
    
    // Draw node border
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Draw digit text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = `${this.state.fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    const textX = centerX + (radius + 30) * node.position.x;
    const textY = centerY + (radius + 30) * node.position.y;
    this.ctx.fillText(node.digit.toString(), textX, textY);
  }
  
  private drawTitle(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(this.state.title, this.canvas.width / 2, 20);
  }
  
  public getNodes(): VBMNode[] {
    return [...this.nodes];
  }
  
  public getState(): VBMVisualizationState {
    return { ...this.state };
  }
  
  public getSequence(): readonly number[] {
    return this.state.sequence;
  }
  
  public getAngles(): number[] {
    return [...this.state.angles];
  }
  
  public getColors(): string[] {
    return [...this.state.colors];
  }
}

// --- VBM SVG Visualization ---
export class VBMSVGVisualization {
  private svg: SVGElement;
  private state: VBMVisualizationState;
  private nodes: VBMNode[];
  
  constructor(container: HTMLElement) {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.state = generateVBMVisualizationData();
    this.nodes = this.state.sequence.map((digit, index) => createVBMNode(digit, index));
    
    this.setupSVG(container);
  }
  
  private setupSVG(container: HTMLElement): void {
    const size = min(container.clientWidth, container.clientHeight);
    
    this.svg.setAttribute('width', size.toString());
    this.svg.setAttribute('height', size.toString());
    this.svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    
    container.appendChild(this.svg);
  }
  
  public render(): void {
    const size = parseInt(this.svg.getAttribute('width') || '400');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    
    // Clear SVG
    this.svg.innerHTML = '';
    
    // Draw background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', size.toString());
    background.setAttribute('height', size.toString());
    background.setAttribute('fill', '#000');
    this.svg.appendChild(background);
    
    // Draw polar grid
    this.drawSVGPolarGrid(centerX, centerY, radius);
    
    // Draw nodes
    this.nodes.forEach(node => {
      this.drawSVGNode(node, centerX, centerY, radius);
    });
    
    // Draw title
    this.drawSVGTitle(size);
  }
  
  private drawSVGPolarGrid(centerX: number, centerY: number, radius: number): void {
    // Draw concentric circles
    for (let i = 1; i <= 3; i++) {
      const r = (radius * i) / 3;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', centerX.toString());
      circle.setAttribute('cy', centerY.toString());
      circle.setAttribute('r', r.toString());
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      circle.setAttribute('stroke-width', '1');
      this.svg.appendChild(circle);
    }
    
    // Draw radial lines
    for (let i = 0; i < 6; i++) {
      const angle = (i * PI) / 3;
      const x = centerX + radius * cos(angle);
      const y = centerY + radius * sin(angle);
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX.toString());
      line.setAttribute('y1', centerY.toString());
      line.setAttribute('x2', x.toString());
      line.setAttribute('y2', y.toString());
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      line.setAttribute('stroke-width', '1');
      this.svg.appendChild(line);
    }
  }
  
  private drawSVGNode(node: VBMNode, centerX: number, centerY: number, radius: number): void {
    const x = centerX + radius * node.position.x;
    const y = centerY + radius * node.position.y;
    
    // Draw node circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x.toString());
    circle.setAttribute('cy', y.toString());
    circle.setAttribute('r', (this.state.nodeSize / 20).toString());
    circle.setAttribute('fill', node.color);
    circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
    circle.setAttribute('stroke-width', '2');
    this.svg.appendChild(circle);
    
    // Draw digit text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const textX = centerX + (radius + 30) * node.position.x;
    const textY = centerY + (radius + 30) * node.position.y;
    text.setAttribute('x', textX.toString());
    text.setAttribute('y', textY.toString());
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-size', this.state.fontSize.toString());
    text.setAttribute('font-family', 'Arial');
    text.textContent = node.digit.toString();
    this.svg.appendChild(text);
  }
  
  private drawSVGTitle(size: number): void {
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', (size / 2).toString());
    title.setAttribute('y', '20');
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('fill', '#fff');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-family', 'Arial');
    title.textContent = this.state.title;
    this.svg.appendChild(title);
  }
  
  public getNodes(): VBMNode[] {
    return [...this.nodes];
  }
  
  public getState(): VBMVisualizationState {
    return { ...this.state };
  }
}

// --- VBM Visualization Factory ---
export function createVBMCanvasVisualization(canvas: HTMLCanvasElement): VBMCanvasVisualization {
  return new VBMCanvasVisualization(canvas);
}

export function createVBMSVGVisualization(container: HTMLElement): VBMSVGVisualization {
  return new VBMSVGVisualization(container);
}

// --- VBM Visualization Constants Export ---
export const VBM_VISUALIZATION_CONSTANTS = {
  SEQUENCE: VBM_SEQUENCE,
  ANGLE_STEP: VBM_ANGLE_STEP,
  NODE_SIZE: VBM_NODE_SIZE,
  FONT_SIZE: VBM_FONT_SIZE,
  TITLE: VBM_TITLE
} as const;

// --- VBM Visualization Documentation ---
export const VBM_VISUALIZATION_DOC = {
  purpose: 'VBM Sequence Visualization - Creates polar plots of the A432 sequence',
  sequence: 'Uses canonical A432 sequence: [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]',
  angles: 'Each node positioned at 60° intervals (trinity harmonic)',
  colors: 'Colors generated using digital root logic mapped to HSV',
  nodes: 'Each node represents a phase node in the A432 system',
  grid: 'Polar grid shows concentric circles and radial lines',
  title: 'VBM Sequence (A432 Phase Nodes, Color-Coded)'
} as const;

// --- VBM Visualization Utility Functions ---
export function getVBMColorForDigit(digit: number): string {
  return generateVBMColor(digit);
}

export function getVBMVisualizationSequence(): readonly number[] {
  return VBM_SEQUENCE;
}

export function getVBMVisualizationAngles(): number[] {
  return generateVBMAngles(VBM_SEQUENCE);
}

export function getVBMVisualizationColors(): string[] {
  return VBM_SEQUENCE.map(digit => generateVBMColor(digit));
}

// --- Example Usage Function ---
export function createVBMVisualization(container: HTMLElement): VBMSVGVisualization {
  const visualization = createVBMSVGVisualization(container);
  visualization.render();
  return visualization;
} 