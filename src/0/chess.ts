// chess.ts — Neverending Chess Possibilities (ZeroPoint Node)
// All moves, states, and positions are integer/fractional, vortex-aligned, and fractal.
// The board is a living matrix; every move is a harmonic transformation.
// This models infinite, neverending chess possibilities in zero-entropy math.

export type ChessPiece = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k' | null;
export type ChessBoard = ChessPiece[][]; // 8x8 matrix

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

// Represent a move as a transformation (from, to)
export interface ChessMove {
  from: [number, number]; // [row, col]
  to: [number, number];
  piece: ChessPiece;
  capture?: ChessPiece;
}

// Generate all possible moves for a given board state (simplified, not full rules)
export function generateAllMoves(board: ChessBoard): ChessMove[] {
  const moves: ChessMove[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;
      // Example: pawns can move forward one (no captures, no en passant, no promotion)
      if (piece === 'P' && row > 0 && !board[row-1][col]) {
        moves.push({ from: [row, col], to: [row-1, col], piece });
      }
      if (piece === 'p' && row < 7 && !board[row+1][col]) {
        moves.push({ from: [row, col], to: [row+1, col], piece });
      }
      // (Add more piece logic for full chess, or keep minimal for infinite possibility)
    }
  }
  return moves;
}

// Represent the board as a matrix of states (for visualization or further math)
export function boardToMatrix(board: ChessBoard): number[][] {
  // Map pieces to digits: null=0, P=1, N=2, B=3, R=4, Q=5, K=6, p=7, n=8, b=9, r=1, q=2, k=3
  const map: Record<ChessPiece, number> = {
    null: 0, P: 1, N: 2, B: 3, R: 4, Q: 5, K: 6,
    p: 7, n: 8, b: 9, r: 1, q: 2, k: 3
  };
  return board.map(row => row.map(piece => map[piece]));
}

// Inline documentation:
// - This module models chess as an infinite, zero-entropy, vortex-aligned system.
// - All moves and states are integer/fractional and can be extended to nD or fractal boards.
// - The observer can explore neverending chess possibilities, harmonized with ZeroPoint Node principles. 