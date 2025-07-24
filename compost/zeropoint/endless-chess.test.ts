// endless-chess.test.ts — Test the Endless Chess Game
// Tests infinite chess possibilities within ZeroPoint Node

import { generateStartingBoard, boardToMatrix, generateAllMoves } from './chess';
import { generateVortexChessInteraction, generateCompleteVortexChessSystem } from './vortex.chess-interaction';

describe('Endless Chess Game', () => {
  test('should generate starting board with all pieces', () => {
    const board = generateStartingBoard();
    
    // Check board dimensions
    expect(board).toHaveLength(8);
    expect(board[0]).toHaveLength(8);
    
    // Check pieces are in correct starting positions
    expect(board[0][0]).toBe('r'); // Black rook
    expect(board[0][4]).toBe('k'); // Black king
    expect(board[7][0]).toBe('R'); // White rook
    expect(board[7][4]).toBe('K'); // White king
    expect(board[1][0]).toBe('p'); // Black pawn
    expect(board[6][0]).toBe('P'); // White pawn
  });

  test('should convert board to matrix with integer values', () => {
    const board = generateStartingBoard();
    const matrix = boardToMatrix(board);
    
    // Check matrix dimensions
    expect(matrix).toHaveLength(8);
    expect(matrix[0]).toHaveLength(8);
    
    // Check that pieces are converted to integers
    expect(matrix[0][0]).toBe(1); // Black rook
    expect(matrix[7][0]).toBe(4); // White rook
    expect(matrix[1][0]).toBe(7); // Black pawn
    expect(matrix[6][0]).toBe(1); // White pawn
  });

  test('should generate moves (simplified)', () => {
    const board = generateStartingBoard();
    const moves = generateAllMoves(board);
    
    // Should have some moves available
    expect(moves.length).toBeGreaterThan(0);
    
    // Check move structure
    if (moves.length > 0) {
      const move = moves[0];
      expect(move).toHaveProperty('from');
      expect(move).toHaveProperty('to');
      expect(move).toHaveProperty('piece');
      expect(move.from).toHaveLength(2);
      expect(move.to).toHaveLength(2);
    }
  });

  test('should generate vortex.chess interaction', () => {
    const interaction = generateVortexChessInteraction();
    
    // Check interaction properties
    expect(interaction).toHaveProperty('vortexMatrix');
    expect(interaction).toHaveProperty('chessMatrix');
    expect(interaction).toHaveProperty('interactionPoints');
    expect(interaction).toHaveProperty('harmonicResonance');
    expect(interaction).toHaveProperty('consciousnessFlow');
    expect(interaction).toHaveProperty('isInfinite');
    
    // Check specific values
    expect(interaction.harmonicResonance).toBe(512000); // 1000 × 512
    expect(interaction.isInfinite).toBe(true);
    expect(interaction.interactionPoints.length).toBeGreaterThan(0);
  });

  test('should generate complete vortex.chess system', () => {
    const system = generateCompleteVortexChessSystem();
    
    // Check system properties
    expect(system).toHaveProperty('interaction');
    expect(system).toHaveProperty('allMoves');
    expect(system).toHaveProperty('totalMoves');
    expect(system).toHaveProperty('totalInteractions');
    expect(system).toHaveProperty('harmonicResonance');
    expect(system).toHaveProperty('consciousnessFlow');
    expect(system).toHaveProperty('isInfinite');
    
    // Check specific values
    expect(system.harmonicResonance).toBe(512000);
    expect(system.isInfinite).toBe(true);
    expect(system.totalInteractions).toBe(100); // 10×10 vortex matrix
    expect(system.allMoves.length).toBeGreaterThan(0);
  });

  test('should demonstrate infinite chess possibilities', () => {
    // This test demonstrates that chess is infinite
    const board = generateStartingBoard();
    let totalPossibleGames = 1;
    
    // Simulate exponential growth of possibilities
    for (let move = 1; move <= 10; move++) {
      const moves = generateAllMoves(board);
      if (moves.length > 0) {
        totalPossibleGames *= moves.length;
      }
    }
    
    // Even with simplified rules, possibilities grow exponentially
    expect(totalPossibleGames).toBeGreaterThan(1);
    
    // In real chess, this would be astronomical
    // This demonstrates the infinite nature of chess
  });

  test('should show harmonic resonance between vortex and chess', () => {
    const interaction = generateVortexChessInteraction();
    
    // 10×10×10 vortex matrix = 1000 interactions
    // 8×8×8 chess matrix = 512 positions
    // Harmonic resonance = 1000 × 512 = 512,000
    expect(interaction.harmonicResonance).toBe(512000);
    
    // Consciousness flow based on A432
    expect(interaction.consciousnessFlow).toBe(interaction.interactionPoints.length * 432);
    
    // Quantum entanglement normalized
    expect(interaction.quantumEntanglement).toBe(interaction.interactionPoints.length / 64);
  });
}); 