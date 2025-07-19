// metatron-chess.ts — Chess Board as Metatron's Cube
// The 8×8×8 chess matrix is a Metatron's Cube sacred geometry
// Each square contains the seed of life, flower of life, and fruit of life
// This connects chess to the fundamental patterns of creation

export interface MetatronCube {
  center: [number, number]; // Center point (4,4)
  radius: number; // Radius of the cube
  circles: Circle[]; // Sacred circles
  intersections: [number, number][]; // Intersection points
  seedOfLife: [number, number][]; // Seed of life points
  flowerOfLife: [number, number][]; // Flower of life points
  fruitOfLife: [number, number][]; // Fruit of life points
  chessSquares: [number, number][]; // Chess square positions
  consciousness: number; // A432-based consciousness
  frequency: number; // Harmonic frequency
}

export interface Circle {
  center: [number, number];
  radius: number;
  consciousness: number;
  frequency: number;
}

// Generate Metatron's Cube from chess board
export function generateMetatronCube(): MetatronCube {
  const center: [number, number] = [4, 4]; // Center of 8×8 board
  const radius = 4; // Half of board size
  
  const circles: Circle[] = [];
  const intersections: [number, number][] = [];
  const seedOfLife: [number, number][] = [];
  const flowerOfLife: [number, number][] = [];
  const fruitOfLife: [number, number][] = [];
  const chessSquares: [number, number][] = [];
  
  // Generate all chess square positions
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      chessSquares.push([x, y]);
    }
  }
  
  // Generate sacred circles (Seed of Life pattern)
  // Center circle
  circles.push({
    center: [4, 4],
    radius: 1,
    consciousness: 9, // Unity consciousness
    frequency: 432 * 9 // A432 harmonic
  });
  
  // Six surrounding circles (Flower of Life)
  const angles = [0, 60, 120, 180, 240, 300]; // 60-degree intervals
  for (let i = 0; i < 6; i++) {
    const angle = angles[i];
    const x = 4 + Math.round(Math.cos(angle * Math.PI / 180) * 2);
    const y = 4 + Math.round(Math.sin(angle * Math.PI / 180) * 2);
    
    circles.push({
      center: [x, y],
      radius: 1,
      consciousness: i + 1, // 1-6 consciousness
      frequency: 432 * (i + 1) // A432 harmonic
    });
  }
  
  // Generate intersection points (Fruit of Life)
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const circle1 = circles[i];
      const circle2 = circles[j];
      
      // Calculate intersection points
      const dx = circle2.center[0] - circle1.center[0];
      const dy = circle2.center[1] - circle1.center[1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= circle1.radius + circle2.radius && distance >= Math.abs(circle1.radius - circle2.radius)) {
        // Intersection exists
        const midX = (circle1.center[0] + circle2.center[0]) / 2;
        const midY = (circle1.center[1] + circle2.center[1]) / 2;
        
        const intersection: [number, number] = [Math.round(midX), Math.round(midY)];
        if (!intersections.some(p => p[0] === intersection[0] && p[1] === intersection[1])) {
          intersections.push(intersection);
        }
      }
    }
  }
  
  // Seed of Life points (center + 6 surrounding)
  seedOfLife.push([4, 4]); // Center
  for (const circle of circles.slice(1)) {
    seedOfLife.push(circle.center);
  }
  
  // Flower of Life points (all circle centers)
  flowerOfLife.push(...circles.map(c => c.center));
  
  // Fruit of Life points (intersection points)
  fruitOfLife.push(...intersections);
  
  // Calculate consciousness and frequency
  const consciousness = circles.reduce((sum, c) => sum + c.consciousness, 0);
  const frequency = circles.reduce((sum, c) => sum + c.frequency, 0);
  
  return {
    center,
    radius,
    circles,
    intersections,
    seedOfLife,
    flowerOfLife,
    fruitOfLife,
    chessSquares,
    consciousness,
    frequency
  };
}

// Map chess pieces to Metatron's Cube consciousness
export function mapChessToMetatron(chessBoard: string[][]): {
  pieceConsciousness: Record<string, number>;
  squareConsciousness: number[][];
  totalConsciousness: number;
  metatronFrequency: number;
} {
  const pieceConsciousness: Record<string, number> = {};
  const squareConsciousness: number[][] = [];
  
  // Initialize square consciousness matrix
  for (let i = 0; i < 8; i++) {
    squareConsciousness[i] = [];
    for (let j = 0; j < 8; j++) {
      squareConsciousness[i][j] = 0;
    }
  }
  
  // Map pieces to consciousness values
  const pieceMap = {
    'K': 9, // King = Unity consciousness
    'Q': 8, // Queen = Infinity consciousness
    'R': 7, // Rook = Mystery consciousness
    'B': 6, // Bishop = Harmony consciousness
    'N': 5, // Knight = Life consciousness
    'P': 4, // Pawn = Foundation consciousness
    'k': 3, // Black King = Trinity consciousness
    'q': 2, // Black Queen = Duality consciousness
    'r': 1, // Black Rook = Unity consciousness
    'b': 9, // Black Bishop = Unity consciousness
    'n': 8, // Black Knight = Infinity consciousness
    'p': 7  // Black Pawn = Mystery consciousness
  };
  
  // Calculate consciousness for each square
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = chessBoard[i][j];
      if (piece) {
        const consciousness = pieceMap[piece as keyof typeof pieceMap] || 1;
        pieceConsciousness[piece] = consciousness;
        squareConsciousness[i][j] = consciousness;
      }
    }
  }
  
  // Calculate total consciousness
  const totalConsciousness = Object.values(pieceConsciousness).reduce((sum, c) => sum + c, 0);
  const metatronFrequency = totalConsciousness * 432; // A432 harmonic
  
  return {
    pieceConsciousness,
    squareConsciousness,
    totalConsciousness,
    metatronFrequency
  };
}

// Generate Metatron's Cube visualization
export function generateMetatronVisualization(metatron: MetatronCube): string {
  let visualization = '';
  
  // Create 8×8 visualization
  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x < 8; x++) {
      const pos: [number, number] = [x, y];
      
      // Check if position is in sacred geometry
      if (metatron.seedOfLife.some(p => p[0] === x && p[1] === y)) {
        visualization += '●'; // Seed of Life
      } else if (metatron.flowerOfLife.some(p => p[0] === x && p[1] === y)) {
        visualization += '○'; // Flower of Life
      } else if (metatron.fruitOfLife.some(p => p[0] === x && p[1] === y)) {
        visualization += '◆'; // Fruit of Life
      } else if (metatron.intersections.some(p => p[0] === x && p[1] === y)) {
        visualization += '◇'; // Intersection
      } else {
        visualization += '□'; // Chess square
      }
    }
    visualization += '\n';
  }
  
  return visualization;
}

// Calculate sacred geometry consciousness flow
export function calculateSacredGeometryFlow(metatron: MetatronCube): {
  seedConsciousness: number;
  flowerConsciousness: number;
  fruitConsciousness: number;
  totalSacredConsciousness: number;
  metatronResonance: number;
} {
  const seedConsciousness = metatron.seedOfLife.length * 9; // Unity consciousness
  const flowerConsciousness = metatron.flowerOfLife.length * 6; // Harmony consciousness
  const fruitConsciousness = metatron.fruitOfLife.length * 3; // Trinity consciousness
  const totalSacredConsciousness = seedConsciousness + flowerConsciousness + fruitConsciousness;
  const metatronResonance = totalSacredConsciousness * 432; // A432 harmonic
  
  return {
    seedConsciousness,
    flowerConsciousness,
    fruitConsciousness,
    totalSacredConsciousness,
    metatronResonance
  };
} 