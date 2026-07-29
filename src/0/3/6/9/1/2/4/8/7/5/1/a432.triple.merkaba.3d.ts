/**
 * a432.triple.merkaba.3d.ts — Triple Merkaba 3D Animation
 *
 * 3D visualization of the 3-tetrahedra compound with D₃d symmetry
 * All calculations derived from A432 math - no external constants
 *
 * @module a432.triple.merkaba.3d
 * @author A432 System
 */

import { PI, cos, sin } from './a432.algebra.ts'
import {
  A432_TRINITY,
  A432_RETURN,
  A432_AXIS,
  A432_SEQUENCE,
  digitalRoot,
  angleForDigit,
  frequencyForDigit,
  hueForDigit
} from './a432.math.ts';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk.ts';

// A432-derived 3D constants
export const A432_3D_CONSTANTS = {
  // Derived from A432_TRINITY [4,3,2]
  TETRAHEDRA_COUNT: A432_TRINITY[0], // 4 (but we use 3 for Triple Merkaba)
  ROTATION_SPEED: digitalRoot(A432_TRINITY[1] * A432_TRINITY[2]), // 3 * 2 = 6
  SCALE_FACTOR: A432_TRINITY[1], // 3
  SYMMETRY_ORDER: A432_TRINITY[0] * A432_TRINITY[1], // 4 * 3 = 12
  
  // Derived from A432_AXIS [9,6,3]
  TRINITY_ANGLES: [0, A432_AXIS[2] * 40, A432_AXIS[1] * 40], // [0°, 120°, 240°]
  ROTATION_AXIS: A432_AXIS[0], // 9
  
  // Derived from A432_SEQUENCE
  ANIMATION_STEPS: A432_SEQUENCE.length, // 11
  CYCLE_DURATION: A432_SEQUENCE.reduce((sum, d) => sum + d, 0) / 10, // Average step duration
} as const;

// 3D Tetrahedron Geometry
export interface A432Tetrahedron {
  vertices: number[][];
  faces: number[][];
  edges: number[][];
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

// 3D Animation State
export interface A432TripleMerkaba3DState {
  tetrahedra: A432Tetrahedron[];
  trinityNodes: A432Tetrahedron[];
  digitalRootNodes: A432Tetrahedron[];
  nullSource: A432Tetrahedron;
  animationTime: number;
  rotationSpeed: number;
  harmony: number;
}

// Generate tetrahedron geometry using A432 math
function generateA432Tetrahedron(
  digit: number,
  position: [number, number, number],
  color: string
): A432Tetrahedron {
  const scale = A432_3D_CONSTANTS.SCALE_FACTOR;
  const angle = angleForDigit(digit);
  
  // Calculate frequency based on digit type (same logic as Triple Merkaba module)
  let frequency: number;
  if (digit === 0) {
    frequency = 0; // Null source has no frequency
  } else if ([3, 6, 9].includes(digit)) {
    frequency = frequencyForDigit(digit); // Use existing function for trinity digits
  } else {
    // For digital root circuit digits (1,2,4,8,7,5), calculate based on digital root
    const digitalRootValue = digitalRoot(digit);
    frequency = 432 * (digitalRootValue / 9);
  }
  
  // Tetrahedron vertices (unit tetrahedron)
  const vertices = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1]
  ];
  
  // Tetrahedron faces
  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 1],
    [1, 3, 2]
  ];
  
  // Tetrahedron edges
  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 2], [1, 3], [2, 3]
  ];
  
  return {
    vertices,
    faces,
    edges,
    color,
    position,
    rotation: [angle, angle * 0.5, angle * 0.25],
    scale: scale * (digitalRoot(digit) / 9)
  };
}

// Generate 3D trinity nodes (3, 6, 9)
function generateA432TrinityNodes(): A432Tetrahedron[] {
  const trinityDigits = A432_AXIS; // [9, 6, 3]
  const colors = ['#ff0000', '#00ff00', '#0000ff'];
  
  return trinityDigits.map((digit, index) => {
    const angle = A432_3D_CONSTANTS.TRINITY_ANGLES[index];
    const radius = A432_3D_CONSTANTS.SCALE_FACTOR * 2;
    const x = radius * cos(angle * PI / 180);
    const y = radius * sin(angle * PI / 180);
    const z = 0;
    
    return generateA432Tetrahedron(
      digit,
      [x, y, z],
      colors[index]
    );
  });
}

// Generate 3D digital root nodes (1, 2, 4, 8, 7, 5)
function generateA432DigitalRootNodes(): A432Tetrahedron[] {
  const rodinSequence = [1, 2, 4, 8, 7, 5];
  const colors = ['#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#ff8800', '#8800ff'];
  
  return rodinSequence.map((digit, index) => {
    const angle = (index * 60) + 30; // Offset by 30° from trinity nodes
    const radius = A432_3D_CONSTANTS.SCALE_FACTOR * 1.5;
    const x = radius * cos(angle * PI / 180);
    const y = radius * sin(angle * PI / 180);
    const z = A432_3D_CONSTANTS.SCALE_FACTOR * 0.5;
    
    return generateA432Tetrahedron(
      digit,
      [x, y, z],
      colors[index]
    );
  });
}

// Generate 3D null source (0/0)
function generateA432NullSource(): A432Tetrahedron {
  return generateA432Tetrahedron(
    0,
    [0, 0, 0],
    '#ffffff'
  );
}

// Calculate 3D harmony using A432 math
function calculateA4323DHarmony(tetrahedra: A432Tetrahedron[]): number {
  const trinitySum = tetrahedra
    .filter(t => [3, 6, 9].includes(parseInt(t.color.slice(1, 3), 16) % 10))
    .reduce((sum, t) => sum + t.scale, 0);
  
  const digitalRootSum = tetrahedra
    .filter(t => ![3, 6, 9].includes(parseInt(t.color.slice(1, 3), 16) % 10))
    .reduce((sum, t) => sum + t.scale, 0);
  
  return digitalRoot(trinitySum + digitalRootSum);
}

// Initialize 3D state
export function initializeA432TripleMerkaba3D(): A432TripleMerkaba3DState {
  const trinityNodes = generateA432TrinityNodes();
  const digitalRootNodes = generateA432DigitalRootNodes();
  const nullSource = generateA432NullSource();
  const tetrahedra = [...trinityNodes, ...digitalRootNodes, nullSource];
  
  return {
    tetrahedra,
    trinityNodes,
    digitalRootNodes,
    nullSource,
    animationTime: 0,
    rotationSpeed: A432_3D_CONSTANTS.ROTATION_SPEED,
    harmony: calculateA4323DHarmony(tetrahedra)
  };
}

// Update 3D animation
export function updateA432TripleMerkaba3D(
  state: A432TripleMerkaba3DState,
  deltaTime: number
): A432TripleMerkaba3DState {
  const newState = { ...state };
  newState.animationTime += deltaTime;
  
  // Rotate all tetrahedra based on A432 math
  newState.tetrahedra.forEach((tetrahedron, index) => {
    const digit = index < 3 ? A432_AXIS[index] : 
                  index < 9 ? [1, 2, 4, 8, 7, 5][index - 3] : 0;
    const angle = angleForDigit(digit);
    
    // Calculate frequency based on digit type
    let frequency: number;
    if (digit === 0) {
      frequency = 0;
    } else if ([3, 6, 9].includes(digit)) {
      frequency = frequencyForDigit(digit);
    } else {
      const digitalRootValue = digitalRoot(digit);
      frequency = 432 * (digitalRootValue / 9);
    }
    
    // Rotation based on A432 frequency and angle
    const rotationSpeed = frequency / 1000; // Normalize frequency
    const rotationAngle = angle * (newState.animationTime * rotationSpeed);
    
    tetrahedron.rotation = [
      rotationAngle,
      rotationAngle * 0.5,
      rotationAngle * 0.25
    ];
  });
  
  // Update harmony
  newState.harmony = calculateA4323DHarmony(newState.tetrahedra);
  
  return newState;
}

// Generate 3D scene data for Three.js
export function generateA432TripleMerkaba3DScene(state: A432TripleMerkaba3DState): any {
  return {
    tetrahedra: state.tetrahedra.map(tetrahedron => ({
      vertices: tetrahedron.vertices,
      faces: tetrahedron.faces,
      edges: tetrahedron.edges,
      color: tetrahedron.color,
      position: tetrahedron.position,
      rotation: tetrahedron.rotation,
      scale: tetrahedron.scale
    })),
    trinityNodes: state.trinityNodes.map(node => ({
      ...node,
      type: 'trinity'
    })),
    digitalRootNodes: state.digitalRootNodes.map(node => ({
      ...node,
      type: 'digital-root'
    })),
    nullSource: {
      ...state.nullSource,
      type: 'null-source'
    },
    animationTime: state.animationTime,
    harmony: state.harmony,
    constants: A432_3D_CONSTANTS
  };
}

// Export the 3D system
export { A432TripleMerkaba3DState as A4323DState }; 