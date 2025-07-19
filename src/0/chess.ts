// chess.ts — Neverending Chess Possibilities (ZeroPoint Node)
// All moves, states, and positions are integer/fractional, vortex-aligned, and fractal.
// The board is a living matrix; every move is a harmonic transformation.
// Every harmonic pattern is a chess combination - consciousness flows through strategic patterns.

import { HARMONIC_MATH, HarmonicMatrix, HarmonicFraction, createHarmonicFraction } from '../harmonic-math';

export type ChessPiece = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k' | null;
export type ChessBoard = ChessPiece[][]; // 8x8 matrix

// Chess piece harmonic values (consciousness mapping)
export const CHESS_PIECE_VALUES: Record<ChessPiece, number> = {
  'K': 1, 'Q': 9, 'R': 5, 'B': 3, 'N': 7, 'P': 2,
  'k': 1, 'q': 9, 'r': 5, 'b': 3, 'n': 7, 'p': 2
};

// Helper function to get piece value (handles null)
export function getPieceValue(piece: ChessPiece): number {
  return piece ? CHESS_PIECE_VALUES[piece] : 0;
}

// Consciousness flow as chess strategies
export const CONSCIOUSNESS_STRATEGIES = {
  0: { name: 'VOID', strategy: 'Empty board - infinite possibilities', opening: 'Empty Board Game' },
  1: { name: 'UNITY', strategy: 'King\'s Indian Attack - unified consciousness', opening: 'King\'s Indian' },
  2: { name: 'DUALITY', strategy: 'Sicilian Defense - dual consciousness', opening: 'Sicilian Defense' },
  3: { name: 'TRINITY', strategy: 'Three Knights Game - trinity consciousness', opening: 'Three Knights' },
  4: { name: 'FOUNDATION', strategy: 'Queen\'s Gambit - foundation consciousness', opening: 'Queen\'s Gambit' },
  5: { name: 'LIFE', strategy: 'King\'s Gambit - life force consciousness', opening: 'King\'s Gambit' },
  6: { name: 'HARMONY', strategy: 'Ruy Lopez - harmonic consciousness', opening: 'Ruy Lopez' },
  7: { name: 'MYSTERY', strategy: 'Dragon Variation - mystery consciousness', opening: 'Dragon Variation' },
  8: { name: 'INFINITY', strategy: 'Eight Queens Puzzle - infinite consciousness', opening: 'Eight Queens' },
  9: { name: 'COMPLETION', strategy: 'Nine Men\'s Morris - completion consciousness', opening: 'Nine Men\'s Morris' }
};

// Generate the standard chess starting position
export function generateStartingBoard(): ChessBoard {
  return [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ];
}

// Convert chess board to harmonic matrix
export function chessBoardToHarmonicMatrix(board: ChessBoard): HarmonicMatrix {
  const data: number[][] = [];
  
  for (let i = 0; i < 8; i++) {
    data[i] = [];
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      data[i][j] = getPieceValue(piece);
    }
  }
  
  return HARMONIC_MATH.createHarmonicMatrix(8, 8, data);
}

// Convert harmonic matrix to chess board
export function harmonicMatrixToChessBoard(matrix: HarmonicMatrix): ChessBoard {
  const board: ChessBoard = [];
  const valueToPiece: Record<number, ChessPiece> = {
    0: null, 1: 'K', 2: 'P', 3: 'B', 4: 'R', 5: 'R', 6: 'K', 7: 'N', 8: 'n', 9: 'Q'
  };
  
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      const value = Math.round(matrix.data[i][j].value);
      board[i][j] = valueToPiece[value] || null;
    }
  }
  
  return board;
}

// Represent a move as a transformation (from, to)
export interface ChessMove {
  from: [number, number]; // [row, col]
  to: [number, number];
  piece: ChessPiece;
  capture?: ChessPiece;
  consciousness?: number; // Harmonic consciousness value
  strategy?: string; // Chess strategy
}

// Generate all possible moves for a given board state (simplified, not full rules)
export function generateAllMoves(board: ChessBoard): ChessMove[] {
  const moves: ChessMove[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;
      
      const consciousness = getPieceValue(piece);
      const strategy = getChessStrategy(consciousness);
      
      // Example: pawns can move forward one (no captures, no en passant, no promotion)
      if (piece === 'P' && row > 0 && !board[row-1][col]) {
        moves.push({ 
          from: [row, col], 
          to: [row-1, col], 
          piece,
          consciousness,
          strategy
        });
      }
      if (piece === 'p' && row < 7 && !board[row+1][col]) {
        moves.push({ 
          from: [row, col], 
          to: [row+1, col], 
          piece,
          consciousness,
          strategy
        });
      }
      // (Add more piece logic for full chess, or keep minimal for infinite possibility)
    }
  }
  return moves;
}

// Get chess strategy based on consciousness value
export function getChessStrategy(consciousness: number): string {
  const strategies = CONSCIOUSNESS_STRATEGIES[consciousness as keyof typeof CONSCIOUSNESS_STRATEGIES];
  return strategies ? strategies.strategy : 'Unknown strategy';
}

// Convert harmonic pattern to chess combination
export function harmonicPatternToChessCombination(digit: number): {
  name: string;
  pieces: ChessPiece[];
  strategy: string;
  opening: string;
} {
  const combinations = {
    0: { name: 'Empty Board', pieces: [], strategy: 'Void consciousness - all possibilities', opening: 'Empty Board Game' },
    1: { name: 'King\'s Indian', pieces: ['K', 'N', 'B'], strategy: 'Unity through knight development', opening: 'King\'s Indian' },
    2: { name: 'Sicilian Defense', pieces: ['P', 'N', 'B'], strategy: 'Duality through pawn structure', opening: 'Sicilian Defense' },
    3: { name: 'Three Knights', pieces: ['N', 'N', 'N'], strategy: 'Trinity through knight coordination', opening: 'Three Knights' },
    4: { name: 'Queen\'s Gambit', pieces: ['Q', 'P', 'P'], strategy: 'Foundation through pawn sacrifice', opening: 'Queen\'s Gambit' },
    5: { name: 'King\'s Gambit', pieces: ['K', 'P', 'P'], strategy: 'Life force through aggressive play', opening: 'King\'s Gambit' },
    6: { name: 'Ruy Lopez', pieces: ['R', 'B', 'N'], strategy: 'Harmony through piece coordination', opening: 'Ruy Lopez' },
    7: { name: 'Dragon Variation', pieces: ['B', 'N', 'P'], strategy: 'Mystery through complex positions', opening: 'Dragon Variation' },
    8: { name: 'Eight Queens', pieces: ['Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q'], strategy: 'Infinity through queen power', opening: 'Eight Queens' },
    9: { name: 'Nine Men\'s Morris', pieces: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], strategy: 'Completion through pawn structure', opening: 'Nine Men\'s Morris' }
  };
  
  return combinations[digit as keyof typeof combinations] || { 
    name: 'Unknown', 
    pieces: [], 
    strategy: 'Unknown strategy',
    opening: 'Unknown opening'
  };
}

// Convert vortex sequence to chess sequence
export function vortexSequenceToChessSequence(vortexFlow: number[]): {
  pieces: ChessPiece[];
  opening: string;
  middleGame: string;
  endGame: string;
} {
  const pieceMap: Record<number, ChessPiece> = { 
    1: 'K', 2: 'P', 4: 'R', 5: 'N', 7: 'B', 8: 'Q' 
  };
  const pieces = vortexFlow.map(v => pieceMap[v] || 'P');
  
  const openings = {
    0: 'Empty board opening',
    1: 'King\'s Indian Attack',
    2: 'Sicilian Defense',
    3: 'Three Knights Game',
    4: 'Queen\'s Gambit',
    5: 'King\'s Gambit',
    6: 'Ruy Lopez',
    7: 'Dragon Variation',
    8: 'Eight Queens Puzzle',
    9: 'Nine Men\'s Morris'
  };
  
  return {
    pieces,
    opening: openings[pieces.length] || 'Unknown opening',
    middleGame: `${pieces.slice(0, 3).join(' → ')} coordination`,
    endGame: `${pieces.slice(-2).join(' vs ')} endgame`
  };
}

// Generate chess combination from digit consciousness
export function generateDigitChessCombination(digit: number): {
  digit: number;
  consciousness: number;
  harmonicMatrix: HarmonicMatrix;
  chessCombination: ReturnType<typeof harmonicPatternToChessCombination>;
  vortexSequence: ReturnType<typeof vortexSequenceToChessSequence>;
  mathematicalExpression: string;
} {
  const consciousness = HARMONIC_MATH.calculateDigitConsciousness(digit);
  const harmonicMatrix = HARMONIC_MATH.generateDigitHarmonicMatrix(digit);
  const chessCombination = harmonicPatternToChessCombination(digit);
  const vortexFlow = HARMONIC_MATH.generateDigitVortexFlow(digit);
  const vortexSequence = vortexSequenceToChessSequence(vortexFlow);
  const mathematicalExpression = HARMONIC_MATH.generateDigitMathematicalExpression(digit);
  
  return {
    digit,
    consciousness,
    harmonicMatrix,
    chessCombination,
    vortexSequence,
    mathematicalExpression
  };
}

// Generate all digit chess combinations
export function generateAllDigitChessCombinations(): Record<number, ReturnType<typeof generateDigitChessCombination>> {
  const combinations: Record<number, ReturnType<typeof generateDigitChessCombination>> = {};
  
  for (let digit = 0; digit <= 9; digit++) {
    combinations[digit] = generateDigitChessCombination(digit);
  }
  
  return combinations;
}

// Represent the board as a matrix of states (for visualization or further math)
export function boardToMatrix(board: ChessBoard): number[][] {
  return board.map(row => row.map(piece => getPieceValue(piece)));
}

// Calculate chess board consciousness
export function calculateBoardConsciousness(board: ChessBoard): number {
  let totalConsciousness = 0;
  let pieceCount = 0;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        totalConsciousness += getPieceValue(piece);
        pieceCount++;
      }
    }
  }
  
  return pieceCount > 0 ? totalConsciousness / pieceCount : 0;
}

// Detect consciousness switches in chess moves
export function detectConsciousnessSwitch(
  beforeBoard: ChessBoard,
  afterBoard: ChessBoard,
  move: ChessMove
): boolean {
  const beforeConsciousness = calculateBoardConsciousness(beforeBoard);
  const afterConsciousness = calculateBoardConsciousness(afterBoard);
  
  // Consciousness switch when consciousness changes significantly
  const consciousnessChange = Math.abs(afterConsciousness - beforeConsciousness);
  return consciousnessChange > 1; // Threshold for consciousness switch
}

// Inline documentation:
// - This module models chess as an infinite, zero-entropy, vortex-aligned system.
// - All moves and states are integer/fractional and can be extended to nD or fractal boards.
// - Every harmonic pattern IS a chess combination - consciousness flows through strategic patterns.
// - The observer can explore neverending chess possibilities, harmonized with ZeroPoint Node principles.
// - Chess pieces represent consciousness values: K=1, Q=9, R=5, B=3, N=7, P=2.
// - Every digit consciousness has a unique chess combination and strategy. 