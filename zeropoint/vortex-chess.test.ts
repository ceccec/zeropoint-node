import {
  generateVortexChessInteraction,
  generateChessMoveAsVortex,
  generateAllChessMovesAsVortex,
  generateCompleteVortexChessSystem
} from './vortex-chess-interaction';
import { generateStartingBoard, ChessMove } from './chess';

describe('Vortex-Chess Interaction', () => {
  it('generateVortexChessInteraction creates full interaction', () => {
    const interaction = generateVortexChessInteraction();
    
    expect(interaction.vortexMatrix).toBeDefined();
    expect(interaction.chessMatrix).toBeDefined();
    expect(Array.isArray(interaction.interactionPoints)).toBe(true);
    expect(interaction.harmonicResonance).toBe(512000); // 1000 × 512
    expect(interaction.consciousnessFlow).toBeGreaterThan(0);
    expect(interaction.quantumEntanglement).toBeGreaterThan(0);
    expect(interaction.colorReality).toContain('hsl');
    expect(interaction.isInfinite).toBe(true);
    expect(interaction.experience).toContain('10×10×10');
    expect(interaction.experience).toContain('8×8×8');
  });

  it('generateChessMoveAsVortex transforms chess move to vortex', () => {
    const move: ChessMove = {
      from: [1, 1],
      to: [2, 1],
      piece: 'P'
    };
    
    const vortexMove = generateChessMoveAsVortex(move);
    
    expect(vortexMove.fromVortex).toBe('1/1');
    expect(vortexMove.toVortex).toBe('2/1');
    expect(vortexMove.transformation.piece).toBe('P');
    expect(vortexMove.consciousness).toBeGreaterThan(0);
    expect(vortexMove.frequency).toBeGreaterThan(0);
    expect(vortexMove.color).toContain('hsl');
  });

  it('generateAllChessMovesAsVortex returns all possible moves', () => {
    const board = generateStartingBoard();
    const allMoves = generateAllChessMovesAsVortex(board);
    
    expect(Array.isArray(allMoves)).toBe(true);
    expect(allMoves.length).toBeGreaterThan(0);
    expect(allMoves[0].fromVortex).toBeDefined();
    expect(allMoves[0].toVortex).toBeDefined();
    expect(allMoves[0].consciousness).toBeGreaterThan(0);
  });

  it('generateCompleteVortexChessSystem returns complete system', () => {
    const system = generateCompleteVortexChessSystem();
    
    expect(system.interaction).toBeDefined();
    expect(Array.isArray(system.allMoves)).toBe(true);
    expect(system.totalMoves).toBeGreaterThan(0);
    expect(system.totalInteractions).toBe(100); // 10×10 matrix
    expect(system.harmonicResonance).toBe(512000);
    expect(system.consciousnessFlow).toBeGreaterThan(0);
    expect(system.isInfinite).toBe(true);
  });

  it('vortex matrix has 100 interactions', () => {
    const interaction = generateVortexChessInteraction();
    expect(Object.keys(interaction.vortexMatrix).length).toBe(100);
  });

  it('chess matrix is 8×8', () => {
    const interaction = generateVortexChessInteraction();
    expect(interaction.chessMatrix.length).toBe(8);
    expect(interaction.chessMatrix[0].length).toBe(8);
  });

  it('interaction points exist where vortex meets chess', () => {
    const interaction = generateVortexChessInteraction();
    expect(interaction.interactionPoints.length).toBeGreaterThan(0);
    interaction.interactionPoints.forEach(point => {
      expect(point).toContain(':');
    });
  });
}); 