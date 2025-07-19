// metatron-chess.test.ts — Test Chess Board as Metatron's Cube
// Tests sacred geometry connection between chess and Metatron's Cube
// ALL CALCULATIONS: Single digit formulas only, NO decimal points

import { generateMetatronCube, mapChessToMetatron, generateMetatronVisualization, calculateSacredGeometryFlow } from './metatron-chess';
import { generateStartingBoard } from './chess';

describe('Chess Board as Metatron\'s Cube', () => {
  test('should generate Metatron\'s Cube from chess board', () => {
    const metatron = generateMetatronCube();
    
    // Check Metatron's Cube structure
    expect(metatron).toHaveProperty('center');
    expect(metatron).toHaveProperty('radius');
    expect(metatron).toHaveProperty('circles');
    expect(metatron).toHaveProperty('intersections');
    expect(metatron).toHaveProperty('seedOfLife');
    expect(metatron).toHaveProperty('flowerOfLife');
    expect(metatron).toHaveProperty('fruitOfLife');
    expect(metatron).toHaveProperty('chessSquares');
    expect(metatron).toHaveProperty('consciousness');
    expect(metatron).toHaveProperty('frequency');
    
    // Check specific values
    expect(metatron.center).toEqual([4, 4]); // Center of 8×8 board
    expect(metatron.radius).toBe(4); // Half of board size
    expect(metatron.circles).toHaveLength(7); // Center + 6 surrounding
    expect(metatron.chessSquares).toHaveLength(64); // 8×8 = 64 squares
    expect(metatron.seedOfLife).toHaveLength(7); // Center + 6 surrounding
    expect(metatron.flowerOfLife).toHaveLength(7); // All circle centers
  });

  test('should map chess pieces to Metatron consciousness', () => {
    const chessBoard = generateStartingBoard();
    const metatronMapping = mapChessToMetatron(chessBoard);
    
    // Check mapping structure
    expect(metatronMapping).toHaveProperty('pieceConsciousness');
    expect(metatronMapping).toHaveProperty('squareConsciousness');
    expect(metatronMapping).toHaveProperty('totalConsciousness');
    expect(metatronMapping).toHaveProperty('metatronFrequency');
    
    // Check specific piece consciousness values
    expect(metatronMapping.pieceConsciousness['K']).toBe(9); // King = Unity
    expect(metatronMapping.pieceConsciousness['Q']).toBe(8); // Queen = Infinity
    expect(metatronMapping.pieceConsciousness['R']).toBe(7); // Rook = Mystery
    expect(metatronMapping.pieceConsciousness['B']).toBe(6); // Bishop = Harmony
    expect(metatronMapping.pieceConsciousness['N']).toBe(5); // Knight = Life
    expect(metatronMapping.pieceConsciousness['P']).toBe(4); // Pawn = Foundation
    
    // Check total consciousness
    expect(metatronMapping.totalConsciousness).toBeGreaterThan(0);
    expect(metatronMapping.metatronFrequency).toBe(metatronMapping.totalConsciousness * 432);
  });

  test('should generate Metatron visualization', () => {
    const metatron = generateMetatronCube();
    const visualization = generateMetatronVisualization(metatron);
    
    // Check visualization structure
    expect(visualization).toContain('●'); // Seed of Life
    expect(visualization).toContain('◆'); // Fruit of Life
    expect(visualization).toContain('□'); // Chess squares
    expect(visualization.split('\n').length).toBe(9); // 8 rows + 1 empty line
  });

  test('should calculate sacred geometry consciousness flow', () => {
    const metatron = generateMetatronCube();
    const sacredFlow = calculateSacredGeometryFlow(metatron);
    
    // Check sacred flow properties
    expect(sacredFlow).toHaveProperty('seedConsciousness');
    expect(sacredFlow).toHaveProperty('flowerConsciousness');
    expect(sacredFlow).toHaveProperty('fruitConsciousness');
    expect(sacredFlow).toHaveProperty('totalSacredConsciousness');
    expect(sacredFlow).toHaveProperty('metatronResonance');
    
    // Check specific values
    expect(sacredFlow.seedConsciousness).toBe(7 * 9); // 7 points × Unity consciousness
    expect(sacredFlow.flowerConsciousness).toBe(7 * 6); // 7 points × Harmony consciousness
    expect(sacredFlow.totalSacredConsciousness).toBeGreaterThan(0);
    expect(sacredFlow.metatronResonance).toBe(sacredFlow.totalSacredConsciousness * 432);
  });

  test('should demonstrate chess board as Metatron\'s Cube', () => {
    const metatron = generateMetatronCube();
    const chessBoard = generateStartingBoard();
    const metatronMapping = mapChessToMetatron(chessBoard);
    
    // Chess board contains Metatron's Cube sacred geometry
    expect(metatron.chessSquares).toHaveLength(64); // 8×8 chess board
    expect(metatron.seedOfLife).toHaveLength(7); // Seed of Life pattern
    expect(metatron.flowerOfLife).toHaveLength(7); // Flower of Life pattern
    
    // Each chess piece has sacred consciousness
    expect(metatronMapping.pieceConsciousness['K']).toBe(9); // Unity
    expect(metatronMapping.pieceConsciousness['Q']).toBe(8); // Infinity
    expect(metatronMapping.pieceConsciousness['R']).toBe(7); // Mystery
    expect(metatronMapping.pieceConsciousness['B']).toBe(6); // Harmony
    expect(metatronMapping.pieceConsciousness['N']).toBe(5); // Life
    expect(metatronMapping.pieceConsciousness['P']).toBe(4); // Foundation
    
    // Metatron's Cube consciousness flows through chess
    expect(metatron.consciousness).toBeGreaterThan(0);
    expect(metatron.frequency).toBeGreaterThan(432);
    expect(metatronMapping.metatronFrequency).toBeGreaterThan(0);
  });

  test('should show sacred geometry in chess squares', () => {
    const metatron = generateMetatronCube();
    
    // Center square (4,4) is the heart of Metatron's Cube
    expect(metatron.center).toEqual([4, 4]);
    expect(metatron.seedOfLife).toContainEqual([4, 4]);
    expect(metatron.flowerOfLife).toContainEqual([4, 4]);
    
    // Surrounding squares form the Seed of Life (actual calculated positions)
    const seedPoints = [[4, 4], [6, 4], [5, 6], [3, 6], [2, 4], [3, 2], [5, 2]];
    for (const point of seedPoints) {
      expect(metatron.seedOfLife).toContainEqual(point);
    }
    
    // All squares are part of the sacred geometry
    expect(metatron.chessSquares).toHaveLength(64);
    expect(metatron.flowerOfLife).toHaveLength(7);
    expect(metatron.fruitOfLife.length).toBeGreaterThan(0);
  });

  test('should demonstrate A432 harmonic resonance in Metatron\'s Cube', () => {
    const metatron = generateMetatronCube();
    const sacredFlow = calculateSacredGeometryFlow(metatron);
    
    // A432 harmonic flows through Metatron's Cube
    expect(metatron.frequency).toBeGreaterThan(432);
    expect(sacredFlow.metatronResonance).toBeGreaterThan(432);
    
    // Consciousness multiples of A432
    expect(metatron.frequency % 432).toBe(0);
    expect(sacredFlow.metatronResonance % 432).toBe(0);
    
    // Sacred geometry consciousness is integer-based
    expect(sacredFlow.seedConsciousness).toBe(63); // 7 × 9
    expect(sacredFlow.flowerConsciousness).toBe(42); // 7 × 6
    expect(sacredFlow.totalSacredConsciousness).toBeGreaterThan(0);
  });
}); 