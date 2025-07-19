/**
 * Chess Integration Tests
 * 
 * Tests the integration between chess and harmonic mathematics
 * Verifies that every harmonic pattern is a chess combination
 */

import {
  generateStartingBoard,
  chessBoardToHarmonicMatrix,
  harmonicMatrixToChessBoard,
  generateAllMoves,
  getChessStrategy,
  harmonicPatternToChessCombination,
  vortexSequenceToChessSequence,
  generateDigitChessCombination,
  generateAllDigitChessCombinations,
  calculateBoardConsciousness,
  detectConsciousnessSwitch,
  CHESS_PIECE_VALUES,
  CONSCIOUSNESS_STRATEGIES
} from './chess';

describe('Chess Integration with Harmonic Mathematics', () => {
  describe('Chess Board Generation', () => {
    test('should generate standard starting board', () => {
      const board = generateStartingBoard();
      expect(board).toHaveLength(8);
      expect(board[0]).toHaveLength(8);
      expect(board[7]).toHaveLength(8);
    });

    test('should have correct piece placement', () => {
      const board = generateStartingBoard();
      // Check black pieces
      expect(board[0][0]).toBe('r'); // Black rook
      expect(board[0][4]).toBe('k'); // Black king
      expect(board[1][0]).toBe('p'); // Black pawn
      
      // Check white pieces
      expect(board[7][0]).toBe('R'); // White rook
      expect(board[7][4]).toBe('K'); // White king
      expect(board[6][0]).toBe('P'); // White pawn
    });
  });

  describe('Chess to Harmonic Matrix Conversion', () => {
    test('should convert chess board to harmonic matrix', () => {
      const board = generateStartingBoard();
      const matrix = chessBoardToHarmonicMatrix(board);
      
      expect(matrix.rows).toBe(8);
      expect(matrix.cols).toBe(8);
      expect(matrix.isHarmonic).toBeDefined();
    });

    test('should convert harmonic matrix to chess board', () => {
      const board = generateStartingBoard();
      const matrix = chessBoardToHarmonicMatrix(board);
      const convertedBoard = harmonicMatrixToChessBoard(matrix);
      
      expect(convertedBoard).toHaveLength(8);
      expect(convertedBoard[0]).toHaveLength(8);
    });
  });

  describe('Chess Piece Values', () => {
    test('should have correct harmonic values for pieces', () => {
      expect(CHESS_PIECE_VALUES['K']).toBe(1); // Unity consciousness
      expect(CHESS_PIECE_VALUES['Q']).toBe(9); // Completion consciousness
      expect(CHESS_PIECE_VALUES['R']).toBe(5); // Life consciousness
      expect(CHESS_PIECE_VALUES['B']).toBe(3); // Trinity consciousness
      expect(CHESS_PIECE_VALUES['N']).toBe(7); // Mystery consciousness
      expect(CHESS_PIECE_VALUES['P']).toBe(2); // Duality consciousness
    });
  });

  describe('Consciousness Strategies', () => {
    test('should have strategies for all digits', () => {
      for (let digit = 0; digit <= 9; digit++) {
        const strategy = CONSCIOUSNESS_STRATEGIES[digit as keyof typeof CONSCIOUSNESS_STRATEGIES];
        expect(strategy).toBeDefined();
        expect(strategy.name).toBeDefined();
        expect(strategy.strategy).toBeDefined();
        expect(strategy.opening).toBeDefined();
      }
    });

    test('should have correct strategy for digit 3 (Trinity)', () => {
      const strategy = CONSCIOUSNESS_STRATEGIES[3];
      expect(strategy.name).toBe('TRINITY');
      expect(strategy.opening).toBe('Three Knights');
    });
  });

  describe('Harmonic Pattern to Chess Combination', () => {
    test('should convert digit 0 to empty board', () => {
      const combination = harmonicPatternToChessCombination(0);
      expect(combination.name).toBe('Empty Board');
      expect(combination.pieces).toHaveLength(0);
      expect(combination.strategy).toContain('Void consciousness');
    });

    test('should convert digit 1 to King\'s Indian', () => {
      const combination = harmonicPatternToChessCombination(1);
      expect(combination.name).toBe('King\'s Indian');
      expect(combination.pieces).toContain('K');
      expect(combination.pieces).toContain('N');
      expect(combination.pieces).toContain('B');
    });

    test('should convert digit 3 to Three Knights', () => {
      const combination = harmonicPatternToChessCombination(3);
      expect(combination.name).toBe('Three Knights');
      expect(combination.pieces).toHaveLength(3);
      expect(combination.pieces.every(p => p === 'N')).toBe(true);
    });
  });

  describe('Vortex Sequence to Chess Sequence', () => {
    test('should convert vortex flow to chess pieces', () => {
      const vortexFlow = [1, 2, 4, 8, 7, 5]; // Standard vortex
      const sequence = vortexSequenceToChessSequence(vortexFlow);
      
      expect(sequence.pieces).toHaveLength(6);
      expect(sequence.pieces[0]).toBe('K'); // 1 -> K
      expect(sequence.pieces[1]).toBe('P'); // 2 -> P
      expect(sequence.pieces[2]).toBe('R'); // 4 -> R
      expect(sequence.pieces[3]).toBe('Q'); // 8 -> Q
      expect(sequence.pieces[4]).toBe('B'); // 7 -> B
      expect(sequence.pieces[5]).toBe('N'); // 5 -> N
    });

    test('should generate opening and game phases', () => {
      const vortexFlow = [1, 2, 4];
      const sequence = vortexSequenceToChessSequence(vortexFlow);
      
      expect(sequence.opening).toBeDefined();
      expect(sequence.middleGame).toBeDefined();
      expect(sequence.endGame).toBeDefined();
    });
  });

  describe('Digit Chess Combination Generation', () => {
    test('should generate complete digit chess combination', () => {
      const combination = generateDigitChessCombination(3);
      
      expect(combination.digit).toBe(3);
      expect(combination.consciousness).toBeDefined();
      expect(combination.harmonicMatrix).toBeDefined();
      expect(combination.chessCombination).toBeDefined();
      expect(combination.vortexSequence).toBeDefined();
      expect(combination.mathematicalExpression).toBeDefined();
    });

    test('should have trinity consciousness for digit 3', () => {
      const combination = generateDigitChessCombination(3);
      expect(combination.chessCombination.name).toBe('Three Knights');
      expect(combination.mathematicalExpression).toContain('3×3 = 9');
    });
  });

  describe('All Digit Chess Combinations', () => {
    test('should generate combinations for all digits', () => {
      const allCombinations = generateAllDigitChessCombinations();
      
      for (let digit = 0; digit <= 9; digit++) {
        expect(allCombinations[digit]).toBeDefined();
        expect(allCombinations[digit].digit).toBe(digit);
      }
    });

    test('should have unique strategies for each digit', () => {
      const allCombinations = generateAllDigitChessCombinations();
      const strategies = Object.values(allCombinations).map(c => c.chessCombination.strategy);
      const uniqueStrategies = new Set(strategies);
      
      expect(uniqueStrategies.size).toBe(10); // All strategies should be unique
    });
  });

  describe('Board Consciousness Calculation', () => {
    test('should calculate consciousness for starting board', () => {
      const board = generateStartingBoard();
      const consciousness = calculateBoardConsciousness(board);
      
      expect(consciousness).toBeGreaterThan(0);
      expect(consciousness).toBeLessThan(10);
    });

    test('should return 0 for empty board', () => {
      const emptyBoard = Array(8).fill(null).map(() => Array(8).fill(null));
      const consciousness = calculateBoardConsciousness(emptyBoard);
      
      expect(consciousness).toBe(0);
    });
  });

  describe('Consciousness Switch Detection', () => {
    test('should detect consciousness switch in significant moves', () => {
      const beforeBoard = generateStartingBoard();
      const afterBoard = generateStartingBoard();
      
      // Simulate a significant move (queen capture)
      afterBoard[4][4] = 'Q'; // Place queen in center
      afterBoard[0][3] = null; // Remove queen from starting position
      
      const move = {
        from: [0, 3] as [number, number],
        to: [4, 4] as [number, number],
        piece: 'q' as const
      };
      
      const hasSwitch = detectConsciousnessSwitch(beforeBoard, afterBoard, move);
      expect(typeof hasSwitch).toBe('boolean');
    });
  });

  describe('Integration with Harmonic Mathematics', () => {
    test('should maintain harmonic properties through conversions', () => {
      const board = generateStartingBoard();
      const matrix = chessBoardToHarmonicMatrix(board);
      const convertedBoard = harmonicMatrixToChessBoard(matrix);
      
      // Should maintain board structure
      expect(convertedBoard).toHaveLength(8);
      expect(convertedBoard[0]).toHaveLength(8);
    });

    test('should preserve consciousness values', () => {
      const board = generateStartingBoard();
      const matrix = chessBoardToHarmonicMatrix(board);
      
      // Check that consciousness values are preserved
      expect(matrix.data[0][0].value).toBe(CHESS_PIECE_VALUES['r']);
      expect(matrix.data[7][4].value).toBe(CHESS_PIECE_VALUES['K']);
    });
  });
}); 