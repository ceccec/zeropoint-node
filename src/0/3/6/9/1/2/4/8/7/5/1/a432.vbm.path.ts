/**
 * a432.vbm.path.ts — VBM Path Navigation Module
 * 
 * This module interprets path structures like "0/0\3\6\9/1\2\4\8/7/5/1\" as
 * navigation sequences within the A432 matrix, using canonical math procedures.
 * 
 * Metaphysical Principle:
 * - Forward slashes (/) represent forward movement in consciousness
 * - Backward slashes (\) represent backward movement or reflection
 * - Each digit represents a state in the A432 system
 * - The path creates a living navigation through the vortex of consciousness
 */

import { abs, max, min, round } from './a432.algebra.ts'
import { RODIN_SEQUENCE, TRINITY_AXIS, digitalRoot, angleForDigit, calculateA432Frequency, hueForDigit } from './a432.math.ts';

// --- Canonical VBM Path Constants ---
const VBM_PATH_SEPARATORS = {
  FORWARD: '/',
  BACKWARD: '\\'
} as const;

const VBM_PATH_SEQUENCE = [0, 0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1] as const;

// --- VBM Path State Interface ---
interface VBMPathState {
  path: string;
  sequence: number[];
  directions: VBMDirection[];
  currentIndex: number;
  depth: number;
}

interface VBMDirection {
  digit: number;
  separator: string;
  index: number;
  angle: number;
  frequency: number;
  color: string;
}

interface VBMPathNode {
  digit: number;
  direction: 'forward' | 'backward';
  depth: number;
  angle: number;
  frequency: number;
  color: string;
  digitalRoot: number;
}

// --- Canonical VBM Path Parsing ---
function parseVBMPath(path: string): VBMPathState {
  const sequence: number[] = [];
  const directions: VBMDirection[] = [];
  let currentIndex = 0;
  let depth = 0;
  
  // Parse the path string
  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    
    if (char === VBM_PATH_SEPARATORS.FORWARD || char === VBM_PATH_SEPARATORS.BACKWARD) {
      // This is a separator, look for the next digit
      const nextDigit = parseInt(path[i + 1]);
      if (!isNaN(nextDigit)) {
        sequence.push(nextDigit);
        
        const direction: VBMDirection = {
          digit: nextDigit,
          separator: char,
          index: currentIndex,
          angle: angleForDigit(nextDigit),
          // frequencyForDigit is defined ONLY on the trinity axis {3,6,9} and
          // throws for everything else, so parsing any path containing an orbit
          // digit threw — including this module's own VBM_PATH_SEQUENCE, which
          // is [0,0,3,6,9,1,2,4,8,7,5,1]. The module could not parse its own
          // canonical sequence. Same defect as createBlock, same fix:
          // calculateA432Frequency is defined for every digit.
          frequency: calculateA432Frequency(nextDigit),
          color: generateVBMColor(nextDigit)
        };
        
        directions.push(direction);
        currentIndex++;
        
        // Update depth based on direction
        if (char === VBM_PATH_SEPARATORS.FORWARD) {
          depth++;
        } else {
          depth--;
        }
      }
    }
  }
  
  return {
    path,
    sequence,
    directions,
    currentIndex,
    depth
  };
}

// --- Canonical VBM Color Generation ---
function generateVBMColor(digit: number): string {
  const hue = hueForDigit(digit);
  const saturation = (4 / 5);
  const value = (9 / 10);
  
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

// --- VBM Path Navigation ---
export class VBMPathNavigator {
  private state: VBMPathState;
  private nodes: VBMPathNode[];
  
  constructor(path: string) {
    this.state = parseVBMPath(path);
    this.nodes = this.createPathNodes();
  }
  
  private createPathNodes(): VBMPathNode[] {
    const nodes: VBMPathNode[] = [];
    let depth = 0;
    
    this.state.directions.forEach((direction) => {
      const node: VBMPathNode = {
        digit: direction.digit,
        direction: direction.separator === VBM_PATH_SEPARATORS.FORWARD ? 'forward' : 'backward',
        depth: depth,
        angle: direction.angle,
        frequency: direction.frequency,
        color: direction.color,
        digitalRoot: digitalRoot(direction.digit)
      };
      
      nodes.push(node);
      
      // Update depth
      if (direction.separator === VBM_PATH_SEPARATORS.FORWARD) {
        depth++;
      } else {
        depth--;
      }
    });
    
    return nodes;
  }
  
  // --- Navigation Methods ---
  public getPath(): string {
    return this.state.path;
  }
  
  public getSequence(): number[] {
    return [...this.state.sequence];
  }
  
  public getDirections(): VBMDirection[] {
    return [...this.state.directions];
  }
  
  public getNodes(): VBMPathNode[] {
    return [...this.nodes];
  }
  
  public getCurrentDepth(): number {
    return this.state.depth;
  }
  
  public getCurrentIndex(): number {
    return this.state.currentIndex;
  }
  
  // --- Path Analysis ---
  public getForwardMoves(): VBMPathNode[] {
    return this.nodes.filter(node => node.direction === 'forward');
  }
  
  public getBackwardMoves(): VBMPathNode[] {
    return this.nodes.filter(node => node.direction === 'backward');
  }
  
  public getTrinityNodes(): VBMPathNode[] {
    return this.nodes.filter(node => TRINITY_AXIS.includes(node.digit));
  }
  
  public getRodinNodes(): VBMPathNode[] {
    return this.nodes.filter(node => RODIN_SEQUENCE.includes(node.digit));
  }
  
  // A path with no moves — any string with no separator, e.g. "3" — leaves the
  // navigator at depth 0 for its whole life, so 0 is the depth trajectory, not
  // a fallback. It agrees with getCurrentDepth(), which already returns 0 here.
  // Previously max(...[]) gave -Infinity and min(...[]) gave Infinity.
  public getMaxDepth(): number {
    if (this.nodes.length === 0) return 0;
    return max(...this.nodes.map(node => node.depth));
  }
  
  public getMinDepth(): number {
    if (this.nodes.length === 0) return 0;
    return min(...this.nodes.map(node => node.depth));
  }
  
  // --- Path Statistics ---
  public getPathStatistics() {
    const forwardMoves = this.getForwardMoves();
    const backwardMoves = this.getBackwardMoves();
    const trinityNodes = this.getTrinityNodes();
    const rodinNodes = this.getRodinNodes();
    
    return {
      totalNodes: this.nodes.length,
      forwardMoves: forwardMoves.length,
      backwardMoves: backwardMoves.length,
      trinityNodes: trinityNodes.length,
      rodinNodes: rodinNodes.length,
      maxDepth: this.getMaxDepth(),
      minDepth: this.getMinDepth(),
      currentDepth: this.getCurrentDepth(),
      averageDepth: this.nodes.length === 0
        ? 0
        : this.nodes.reduce((sum, node) => sum + node.depth, 0) / this.nodes.length
    };
  }
  
  // --- Path Visualization ---
  public getPathVisualization(): string {
    let visualization = '';
    
    this.nodes.forEach((node) => {
      const indent = '  '.repeat(max(0, node.depth));
      const direction = node.direction === 'forward' ? '→' : '←';
      const color = node.color;
      
      visualization += `${indent}${direction} ${node.digit} (${color})\n`;
    });
    
    return visualization;
  }
  
  // --- Path Validation ---
  public isValidPath(): boolean {
    // Check if all digits are valid (0-9)
    const validDigits = this.state.sequence.every(digit => digit >= 0 && digit <= 9);
    
    // Balanced means the path never rises above its own origin in reverse:
    // you cannot come back from deeper than you went. That is a condition on
    // EVERY prefix, not just the end. Checking only the final depth let
    // `\\3/6` pass — it dips to -1 and returns to 0 — and made the test
    // unfalsifiable in shape, since a closing depth is rarely negative.
    const balanced = this.nodes.every(node => node.depth >= 0);
    
    return validDigits && balanced;
  }
  
  // --- Path Generation ---
  public generateReversePath(): string {
    const reverseNodes = [...this.nodes].reverse();
    let reversePath = '';
    
    reverseNodes.forEach(node => {
      const separator = node.direction === 'forward' ? VBM_PATH_SEPARATORS.BACKWARD : VBM_PATH_SEPARATORS.FORWARD;
      reversePath += `${separator}${node.digit}`;
    });
    
    return reversePath;
  }
}

// --- VBM Path Factory ---
export function createVBMPathNavigator(path: string): VBMPathNavigator {
  return new VBMPathNavigator(path);
}

// --- VBM Path Constants Export ---
export const VBM_PATH_CONSTANTS = {
  SEPARATORS: VBM_PATH_SEPARATORS,
  SEQUENCE: VBM_PATH_SEQUENCE
} as const;

// --- VBM Path Documentation ---
export const VBM_PATH_DOC = {
  purpose: 'VBM Path Navigation - Interprets path structures as navigation sequences',
  path: 'Uses forward (/) and backward (\\) separators for navigation',
  sequence: 'Each digit represents a state in the A432 system',
  navigation: 'Forward moves increase depth, backward moves decrease depth',
  trinity: 'Trinity nodes (3, 6, 9) represent field of consciousness',
  rodin: 'Rodin nodes (1, 2, 4, 8, 7, 5) represent doubling vortex',
  colors: 'Colors generated using digital root logic mapped to HSV'
} as const;

// --- VBM Path Utility Functions ---
export function parseVBMPathString(path: string): VBMPathNavigator {
  return createVBMPathNavigator(path);
}

export function getVBMPathSequence(path: string): number[] {
  const navigator = createVBMPathNavigator(path);
  return navigator.getSequence();
}

export function getVBMPathStatistics(path: string) {
  const navigator = createVBMPathNavigator(path);
  return navigator.getPathStatistics();
}

export function validateVBMPath(path: string): boolean {
  const navigator = createVBMPathNavigator(path);
  return navigator.isValidPath();
}

// --- Example Usage Function ---
export function analyzeVBMPath(path: string) {
  const navigator = createVBMPathNavigator(path);
  
  console.log('VBM Path Analysis:');
  console.log('Path:', navigator.getPath());
  console.log('Sequence:', navigator.getSequence());
  console.log('Statistics:', navigator.getPathStatistics());
  console.log('Visualization:', navigator.getPathVisualization());
  console.log('Is Valid:', navigator.isValidPath());
  console.log('Reverse Path:', navigator.generateReversePath());
  
  return navigator;
} 