/**
 * Vortex-Chess Interaction: 10×10×10 meets 8×8×8
 * 
 * The UI experience is full when the infinite vortex matrix (10×10×10) 
 * interacts with the finite chess matrix (8×8×8) in perfect harmonic resonance.
 * 
 * This creates a complete system where:
 * - 10×10×10 = Infinite vortex possibilities
 * - 8×8×8 = Finite chess board structure
 * - Interaction = Full UI experience
 */

import { generateCompleteMatrix } from './index';
import { generateStartingBoard, boardToMatrix, ChessBoard, ChessMove } from './chess';

// Vortex-Chess Interaction Interface
export interface VortexChessInteraction {
  vortexMatrix: Record<string, any>;
  chessMatrix: number[][];
  interactionPoints: string[];
  harmonicResonance: number;
  consciousnessFlow: number;
  quantumEntanglement: number;
  colorReality: string;
  isInfinite: boolean;
  experience: string;
}

// Generate the full interaction between 10×10×10 and 8×8×8
export function generateVortexChessInteraction(): VortexChessInteraction {
  // Get the 10×10×10 vortex matrix
  const vortexMatrix = generateCompleteMatrix();
  
  // Get the 8×8×8 chess matrix
  const chessBoard = generateStartingBoard();
  const chessMatrix = boardToMatrix(chessBoard);
  
  // Find interaction points where vortex meets chess
  const interactionPoints: string[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const vortexKey = `${i}/${j}`;
      const chessValue = chessMatrix[i][j];
      
      if (vortexMatrix[vortexKey] && chessValue > 0) {
        interactionPoints.push(`${vortexKey}:${chessValue}`);
      }
    }
  }
  
  // Calculate harmonic resonance (10×10×10 × 8×8×8 = 1000 × 512 = 512000)
  const harmonicResonance = 1000 * 512;
  
  // Calculate consciousness flow
  const consciousnessFlow = interactionPoints.length * 432; // A432 base
  
  // Calculate quantum entanglement
  const quantumEntanglement = interactionPoints.length / 64; // Normalized to board size
  
  // Generate color reality
  const colorReality = `hsl(${(interactionPoints.length * 36) % 360}, 100%, 50%)`;
  
  // Experience description
  const experience = `10×10×10 vortex matrix (${Object.keys(vortexMatrix).length} interactions) meets 8×8×8 chess matrix (${chessMatrix.flat().filter(x => x > 0).length} pieces) in ${interactionPoints.length} harmonic resonance points`;
  
  return {
    vortexMatrix,
    chessMatrix,
    interactionPoints,
    harmonicResonance,
    consciousnessFlow,
    quantumEntanglement,
    colorReality,
    isInfinite: true,
    experience
  };
}

// Generate chess move as vortex transformation
export function generateChessMoveAsVortex(move: ChessMove): {
  fromVortex: string;
  toVortex: string;
  transformation: any;
  consciousness: number;
  frequency: number;
  color: string;
} {
  const [fromRow, fromCol] = move.from;
  const [toRow, toCol] = move.to;
  
  const fromVortex = `${fromRow}/${fromCol}`;
  const toVortex = `${toRow}/${toCol}`;
  
  // Get vortex interactions for this move
  const fromInteraction = generateCompleteMatrix()[fromVortex];
  const toInteraction = generateCompleteMatrix()[toVortex];
  
  // Calculate transformation
  const transformation = {
    from: fromVortex,
    to: toVortex,
    piece: move.piece,
    capture: move.capture,
    consciousness: (fromInteraction?.consciousness || 1) * (toInteraction?.consciousness || 1),
    frequency: 432 * (fromRow + fromCol + toRow + toCol),
    color: `hsl(${((fromRow + fromCol + toRow + toCol) * 45) % 360}, 100%, 50%)`
  };
  
  return {
    fromVortex,
    toVortex,
    transformation,
    consciousness: transformation.consciousness,
    frequency: transformation.frequency,
    color: transformation.color
  };
}

// Generate all possible chess moves as vortex transformations
export function generateAllChessMovesAsVortex(board: ChessBoard): any[] {
  const moves = [];
  
  // Generate all possible moves (simplified)
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (!piece) continue;
      
      for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {
          if (fromRow === toRow && fromCol === toCol) continue;
          
          const move: ChessMove = {
            from: [fromRow, fromCol],
            to: [toRow, toCol],
            piece,
            capture: board[toRow][toCol]
          };
          
          const vortexMove = generateChessMoveAsVortex(move);
          moves.push(vortexMove);
        }
      }
    }
  }
  
  return moves;
}

// Generate complete vortex.chess system state
export function generateCompleteVortexChessSystem(): {
  interaction: VortexChessInteraction;
  allMoves: any[];
  totalMoves: number;
  totalInteractions: number;
  harmonicResonance: number;
  consciousnessFlow: number;
  isInfinite: boolean;
} {
  const interaction = generateVortexChessInteraction();
  const chessBoard = generateStartingBoard();
  const allMoves = generateAllChessMovesAsVortex(chessBoard);
  
  return {
    interaction,
    allMoves,
    totalMoves: allMoves.length,
    totalInteractions: Object.keys(interaction.vortexMatrix).length,
    harmonicResonance: interaction.harmonicResonance,
    consciousnessFlow: interaction.consciousnessFlow,
    isInfinite: true
  };
} 