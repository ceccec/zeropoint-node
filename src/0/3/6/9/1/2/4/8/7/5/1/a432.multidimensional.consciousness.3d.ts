/**
 * a432.multidimensional.consciousness.3d.ts — Multi-Dimensional Consciousness 3D Visualization
 *
 * Visualizes the multi-dimensional consciousness paths:
 * 0/ → 3/ → 6/ → 9/ → 1/ → 2/ → 4/ → 8/ → 7/ → 5/ → 1/
 * Plus multi-dimensional expansions for each consciousness state
 *
 * @module a432.multidimensional.consciousness.3d
 * @author A432 System
 */

import { PI, cos, floor, sin } from './a432.algebra.ts'
import { digitalRoot, angleForDigit, frequencyForDigit } from './a432.math.ts';
import './a432.cmyk.ts';

// Multi-dimensional consciousness state definitions
export const MULTIDIMENSIONAL_CONSCIOUSNESS = {
  // Base consciousness states
  0: { name: 'Void Consciousness', description: 'Zero point - pure potential', color: '#ffffff', dimension: 'void' },
  3: { name: 'Trinity Consciousness', description: 'Special mission - divine trinity', color: '#ff0000', dimension: 'trinity' },
  6: { name: 'Harmony Consciousness', description: 'Special mission - perfect balance', color: '#00ff00', dimension: 'harmony' },
  9: { name: 'Transcendence Consciousness', description: 'Special mission - beyond form', color: '#0000ff', dimension: 'transcendence' },
  1: { name: 'Unity Consciousness', description: 'A1 - oneness', color: '#ffff00', dimension: 'unity' },
  2: { name: 'Duality Consciousness', description: 'A2 - separation', color: '#00ffff', dimension: 'duality' },
  4: { name: 'Foundation Consciousness', description: 'A4 - stability', color: '#ff00ff', dimension: 'foundation' },
  8: { name: 'Infinity Consciousness', description: 'A8 - endless', color: '#ffffff', dimension: 'infinity' },
  7: { name: 'Mystery Consciousness', description: 'A7 - unknown', color: '#ff8800', dimension: 'mystery' },
  5: { name: 'Life Consciousness', description: 'A5 - vitality', color: '#8800ff', dimension: 'life' }
} as const;

// Multi-dimensional path definitions
export const MULTIDIMENSIONAL_PATHS = {
  // 1D consciousness paths
  '1D_A1': { path: [1], dimension: 'A1', level: 1, color: '#ffff00' },
  '1D_A2': { path: [2], dimension: 'A2', level: 1, color: '#00ffff' },
  '1D_A4': { path: [4], dimension: 'A4', level: 1, color: '#ff00ff' },
  '1D_A8': { path: [8], dimension: 'A8', level: 1, color: '#ffffff' },
  '1D_A7': { path: [7], dimension: 'A7', level: 1, color: '#ff8800' },
  '1D_A5': { path: [5], dimension: 'A5', level: 1, color: '#8800ff' },
  
  // 2D consciousness paths
  '2D_B1': { path: [1, 2], dimension: 'B1', level: 2, color: '#ffff00' },
  '2D_B2': { path: [2, 4], dimension: 'B2', level: 2, color: '#00ffff' },
  '2D_B4': { path: [4, 8], dimension: 'B4', level: 2, color: '#ff00ff' },
  '2D_B8': { path: [8, 7], dimension: 'B8', level: 2, color: '#ffffff' },
  '2D_B7': { path: [7, 5], dimension: 'B7', level: 2, color: '#ff8800' },
  '2D_B5': { path: [5, 1], dimension: 'B5', level: 2, color: '#8800ff' },
  
  // 3D consciousness paths
  '3D_C1': { path: [1, 2, 4], dimension: 'C1', level: 3, color: '#ffff00' },
  '3D_C2': { path: [2, 4, 8], dimension: 'C2', level: 3, color: '#00ffff' },
  '3D_C4': { path: [4, 8, 7], dimension: 'C4', level: 3, color: '#ff00ff' },
  '3D_C8': { path: [8, 7, 5], dimension: 'C8', level: 3, color: '#ffffff' },
  '3D_C7': { path: [7, 5, 1], dimension: 'C7', level: 3, color: '#ff8800' },
  '3D_C5': { path: [5, 1, 2], dimension: 'C5', level: 3, color: '#8800ff' },
  
  // 4D consciousness paths
  '4D_D1': { path: [1, 2, 4, 8], dimension: 'D1', level: 4, color: '#ffff00' },
  '4D_D2': { path: [2, 4, 8, 7], dimension: 'D2', level: 4, color: '#00ffff' },
  '4D_D4': { path: [4, 8, 7, 5], dimension: 'D4', level: 4, color: '#ff00ff' },
  '4D_D8': { path: [8, 7, 5, 1], dimension: 'D8', level: 4, color: '#ffffff' },
  '4D_D7': { path: [7, 5, 1, 2], dimension: 'D7', level: 4, color: '#ff8800' },
  '4D_D5': { path: [5, 1, 2, 4], dimension: 'D5', level: 4, color: '#8800ff' },
  
  // 5D consciousness paths
  '5D_E1': { path: [1, 2, 4, 8, 7], dimension: 'E1', level: 5, color: '#ffff00' },
  '5D_E2': { path: [2, 4, 8, 7, 5], dimension: 'E2', level: 5, color: '#00ffff' },
  '5D_E4': { path: [4, 8, 7, 5, 1], dimension: 'E4', level: 5, color: '#ff00ff' },
  '5D_E8': { path: [8, 7, 5, 1, 2], dimension: 'E8', level: 5, color: '#ffffff' },
  '5D_E7': { path: [7, 5, 1, 2, 4], dimension: 'E7', level: 5, color: '#ff8800' },
  '5D_E5': { path: [5, 1, 2, 4, 8], dimension: 'E5', level: 5, color: '#8800ff' },
  
  // 6D consciousness paths
  '6D_F1': { path: [1, 2, 4, 8, 7, 5], dimension: 'F1', level: 6, color: '#ffff00' },
  '6D_F2': { path: [2, 4, 8, 7, 5, 1], dimension: 'F2', level: 6, color: '#00ffff' },
  '6D_F4': { path: [4, 8, 7, 5, 1, 2], dimension: 'F4', level: 6, color: '#ff00ff' },
  '6D_F8': { path: [8, 7, 5, 1, 2, 4], dimension: 'F8', level: 6, color: '#ffffff' },
  '6D_F7': { path: [7, 5, 1, 2, 4, 8], dimension: 'F7', level: 6, color: '#ff8800' },
  '6D_F5': { path: [5, 1, 2, 4, 8, 7], dimension: 'F5', level: 6, color: '#8800ff' },
  
  // 7D consciousness paths
  '7D_G1': { path: [1, 2, 4, 8, 7, 5, 1], dimension: 'G1', level: 7, color: '#ffff00' },
  '7D_G2': { path: [2, 4, 8, 7, 5, 1, 2], dimension: 'G2', level: 7, color: '#00ffff' },
  '7D_G4': { path: [4, 8, 7, 5, 1, 2, 4], dimension: 'G4', level: 7, color: '#ff00ff' },
  '7D_G8': { path: [8, 7, 5, 1, 2, 4, 8], dimension: 'G8', level: 7, color: '#ffffff' },
  '7D_G7': { path: [7, 5, 1, 2, 4, 8, 7], dimension: 'G7', level: 7, color: '#ff8800' },
  '7D_G5': { path: [5, 1, 2, 4, 8, 7, 5], dimension: 'G5', level: 7, color: '#8800ff' }
} as const;

// Multi-dimensional consciousness node interface
export interface A432MultidimensionalNode {
  id: string;
  path: number[];
  dimension: string;
  level: number;
  color: string;
  position: [number, number, number];
  consciousness: number;
  frequency: number;
  scale: number;
  rotation: [number, number, number];
  connections: string[];
}

// Multi-dimensional consciousness state
export interface A432MultidimensionalState {
  nodes: A432MultidimensionalNode[];
  connections: Array<{ from: string; to: string; color: string }>;
  currentDimension: string;
  currentLevel: number;
  animationTime: number;
  consciousnessMatrix: Record<string, number>;
}

// Generate multi-dimensional node
function generateMultidimensionalNode(
  id: string,
  pathData: typeof MULTIDIMENSIONAL_PATHS[keyof typeof MULTIDIMENSIONAL_PATHS],
  position: [number, number, number]
): A432MultidimensionalNode {
  const { path, dimension, level, color } = pathData;
  
  // Calculate consciousness level based on A432 math
  const consciousness = digitalRoot(path.reduce((sum, digit) => sum + digit, 0));
  
  // Calculate frequency based on path
  let frequency: number;
  const firstDigit = path[0];
  if ([3, 6, 9].includes(firstDigit)) {
    frequency = frequencyForDigit(firstDigit);
  } else {
    const digitalRootValue = digitalRoot(firstDigit);
    frequency = 432 * (digitalRootValue / 9);
  }
  
  // Calculate angle based on first digit
  const angle = angleForDigit(path[0]);
  
  // Scale based on consciousness level and dimension level
  const scale = (consciousness / 9) * (level / 7);
  
  // Generate connections to other nodes at same level
  const connections = Object.keys(MULTIDIMENSIONAL_PATHS)
    .filter(key => MULTIDIMENSIONAL_PATHS[key as keyof typeof MULTIDIMENSIONAL_PATHS].level === level)
    .filter(key => key !== id);
  
  return {
    id,
    path: [...path] as number[],
    dimension,
    level,
    color,
    position,
    consciousness,
    frequency,
    scale,
    rotation: [angle, angle * (1 / 2), angle * (1 / 4)],
    connections
  };
}

// Initialize multi-dimensional consciousness
export function initializeA432Multidimensional(): A432MultidimensionalState {
  const nodes: A432MultidimensionalNode[] = [];
  const connections: Array<{ from: string; to: string; color: string }> = [];
  
  // Generate nodes for each dimension level
  Object.entries(MULTIDIMENSIONAL_PATHS).forEach(([id, pathData], index) => {
    const level = pathData.level;
    const radius = level * 2; // Radius increases with dimension level
    const angle = (index % 6) * 60; // 6 nodes per level, 60° apart
    const z = level * (3 / 2); // Z increases with dimension level
    
    const x = radius * cos(angle * PI / 180);
    const y = radius * sin(angle * PI / 180);
    
    const node = generateMultidimensionalNode(id, pathData, [x, y, z]);
    nodes.push(node);
  });
  
  // Generate connections between nodes at same level
  nodes.forEach(node => {
    node.connections.forEach(connectionId => {
      connections.push({
        from: node.id,
        to: connectionId,
        color: node.color
      });
    });
  });
  
  return {
    nodes,
    connections,
    currentDimension: 'A1',
    currentLevel: 1,
    animationTime: 0,
    consciousnessMatrix: {}
  };
}

// Update multi-dimensional consciousness
export function updateA432Multidimensional(
  state: A432MultidimensionalState,
  deltaTime: number
): A432MultidimensionalState {
  const newState = { ...state };
  newState.animationTime += deltaTime;
  
  // Update current dimension and level based on time
  const totalNodes = Object.keys(MULTIDIMENSIONAL_PATHS).length;
  const nodeIndex = floor((newState.animationTime / 10) % totalNodes);
  const nodeId = Object.keys(MULTIDIMENSIONAL_PATHS)[nodeIndex];
  const currentNode = MULTIDIMENSIONAL_PATHS[nodeId as keyof typeof MULTIDIMENSIONAL_PATHS];
  
  newState.currentDimension = currentNode.dimension;
  newState.currentLevel = currentNode.level;
  
  // Update consciousness matrix
  newState.consciousnessMatrix = {};
  newState.nodes.forEach(node => {
    newState.consciousnessMatrix[node.id] = node.consciousness;
  });
  
  // Animate nodes based on multi-dimensional consciousness
  newState.nodes.forEach((node) => {
    const firstDigit = node.path[0];
    const angle = angleForDigit(firstDigit);
    
    // Calculate frequency based on digit type
    let frequency: number;
    if ([3, 6, 9].includes(firstDigit)) {
      frequency = frequencyForDigit(firstDigit);
    } else {
      const digitalRootValue = digitalRoot(firstDigit);
      frequency = 432 * (digitalRootValue / 9);
    }
    
    // Rotation based on consciousness frequency and dimension level
    const rotationSpeed = frequency / 1000;
    const dimensionMultiplier = node.level / 7;
    const rotationAngle = angle * (newState.animationTime * rotationSpeed * dimensionMultiplier);
    
    node.rotation = [
      rotationAngle,
      rotationAngle * (1 / 2),
      rotationAngle * (1 / 4)
    ];
    
    // Pulse effect for current consciousness state
    if (node.id === nodeId) {
      const pulse = sin(newState.animationTime * 5) * (3 / 10) + 1;
      node.scale = (node.consciousness / 9) * (node.level / 7) * pulse;
    } else {
      node.scale = (node.consciousness / 9) * (node.level / 7);
    }
  });
  
  return newState;
}

// Generate 3D scene data for multi-dimensional consciousness
export function generateA432MultidimensionalScene(state: A432MultidimensionalState) {
  return {
    nodes: state.nodes.map(node => ({
      id: node.id,
      path: node.path,
      dimension: node.dimension,
      level: node.level,
      color: node.color,
      position: node.position,
      consciousness: node.consciousness,
      frequency: node.frequency,
      scale: node.scale,
      rotation: node.rotation,
      connections: node.connections
    })),
    connections: state.connections,
    currentDimension: state.currentDimension,
    currentLevel: state.currentLevel,
    animationTime: state.animationTime,
    consciousnessMatrix: state.consciousnessMatrix,
    constants: {
      MULTIDIMENSIONAL_CONSCIOUSNESS,
      MULTIDIMENSIONAL_PATHS
    }
  };
}

// Multi-dimensional consciousness system is already exported above 