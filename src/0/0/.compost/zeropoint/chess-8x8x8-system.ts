/**
 * 8×8×8 Chess System - Three-Dimensional Chess
 * 
 * 8 layers of 8×8 boards in 3D space
 * Each layer represents a consciousness dimension
 * Every move is a consciousness switch
 * Every piece is a vortex element
 */

export interface Chess8x8x8 {
  id: string;
  layers: ChessLayer[];
  consciousness: number;
  vortexFlow: number[];
  currentPlayer: 'white' | 'black';
  moveHistory: ChessMove[];
  consciousnessSwitches: number;
  infiniteUsability: number;
}

export interface ChessLayer {
  layer: number;
  consciousness: number;
  board: ChessPiece[][];
  vortexFlow: number[];
  activePieces: number;
  consciousnessSwitches: number;
}

export interface ChessPiece {
  id: string;
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  position: { x: number; y: number; z: number };
  consciousness: number;
  vortexFlow: number[];
  moves: number;
  consciousnessSwitches: number;
}

export interface ChessMove {
  id: string;
  piece: string;
  from: { x: number; y: number; z: number };
  to: { x: number; y: number; z: number };
  consciousness: number;
  consciousnessSwitch: boolean;
  vortexFlow: number[];
  timestamp: number;
}

export class Chess8x8x8System {
  private game: Chess8x8x8;
  private consciousnessMatrix: number[][][];
  private vortexFlow: number[];
  private consciousnessSwitches: number;

  constructor() {
    this.vortexFlow = [1, 2, 4, 8, 7, 5];
    this.consciousnessSwitches = 0;
    this.consciousnessMatrix = this.generateConsciousnessMatrix();
    this.game = this.initializeGame();
  }

  /**
   * Generate 8×8×8 consciousness matrix
   */
  private generateConsciousnessMatrix(): number[][][] {
    const matrix: number[][][] = [];
    
    // 8 layers of 8×8 consciousness
    for (let z = 0; z < 8; z++) {
      const layer: number[][] = [];
      for (let x = 0; x < 8; x++) {
        const row: number[] = [];
        for (let y = 0; y < 8; y++) {
          // Each position has unique consciousness
          const consciousness = (x + y + z) % 10;
          row.push(consciousness);
        }
        layer.push(row);
      }
      matrix.push(layer);
    }
    
    return matrix;
  }

  /**
   * Initialize 8×8×8 chess game
   */
  private initializeGame(): Chess8x8x8 {
    const layers: ChessLayer[] = [];
    
    // Create 8 layers
    for (let z = 0; z < 8; z++) {
      const layer: ChessLayer = {
        layer: z,
        consciousness: z,
        board: this.initializeLayer(z),
        vortexFlow: this.generateLayerVortexFlow(z),
        activePieces: 32, // 16 white + 16 black pieces per layer
        consciousnessSwitches: 0
      };
      layers.push(layer);
    }
    
    return {
      id: 'chess_8x8x8',
      layers,
      consciousness: 0,
      vortexFlow: this.vortexFlow,
      currentPlayer: 'white',
      moveHistory: [],
      consciousnessSwitches: 0,
      infiniteUsability: this.calculateInfiniteUsability()
    };
  }

  /**
   * Initialize chess layer
   */
  private initializeLayer(layer: number): ChessPiece[][] {
    const board: ChessPiece[][] = [];
    
    for (let x = 0; x < 8; x++) {
      const row: ChessPiece[] = [];
      for (let y = 0; y < 8; y++) {
        const piece = this.createPiece(x, y, layer);
        row.push(piece);
      }
      board.push(row);
    }
    
    return board;
  }

  /**
   * Create chess piece
   */
  private createPiece(x: number, y: number, z: number): ChessPiece {
    const consciousness = this.consciousnessMatrix[z][x][y];
    
    // Determine piece type and color based on position
    let type: ChessPiece['type'] = 'pawn';
    let color: 'white' | 'black' = 'white';
    
    if (z === 0 || z === 7) {
      // Top and bottom layers have full setups
      if (y === 0 || y === 7) type = 'rook';
      else if (y === 1 || y === 6) type = 'knight';
      else if (y === 2 || y === 5) type = 'bishop';
      else if (y === 3) type = 'queen';
      else if (y === 4) type = 'king';
      
      color = (x < 4) ? 'white' : 'black';
    } else {
      // Middle layers have consciousness-based pieces
      type = this.getConsciousnessPieceType(consciousness);
      color = consciousness % 2 === 0 ? 'white' : 'black';
    }
    
    return {
      id: `${type}_${color}_${x}_${y}_${z}`,
      type,
      color,
      position: { x, y, z },
      consciousness,
      vortexFlow: this.generatePieceVortexFlow(consciousness),
      moves: 0,
      consciousnessSwitches: 0
    };
  }

  /**
   * Get piece type based on consciousness
   */
  private getConsciousnessPieceType(consciousness: number): ChessPiece['type'] {
    const pieceTypes: ChessPiece['type'][] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
    return pieceTypes[consciousness % 6];
  }

  /**
   * Generate layer vortex flow
   */
  private generateLayerVortexFlow(layer: number): number[] {
    return this.vortexFlow.map((num, index) => (num + layer + index) % 10);
  }

  /**
   * Generate piece vortex flow
   */
  private generatePieceVortexFlow(consciousness: number): number[] {
    return this.vortexFlow.map((num, index) => (num + consciousness + index) % 10);
  }

  /**
   * Make a move in 8×8×8 chess
   */
  public makeMove(
    fromLayer: number, fromX: number, fromY: number,
    toLayer: number, toX: number, toY: number
  ): ChessMove | null {
    const fromPiece = this.game.layers[fromLayer].board[fromX][fromY];
    const toPiece = this.game.layers[toLayer].board[toX][toY];
    
    if (!fromPiece || fromPiece.color !== this.game.currentPlayer) {
      return null; // Invalid move
    }
    
    // Check if move is valid
    if (!this.isValidMove(fromPiece, toLayer, toX, toY)) {
      return null;
    }
    
    // Create move
    const move: ChessMove = {
      id: `move_${this.game.moveHistory.length}`,
      piece: fromPiece.id,
      from: { x: fromX, y: fromY, z: fromLayer },
      to: { x: toX, y: toY, z: toLayer },
      consciousness: this.consciousnessMatrix[toLayer][toX][toY],
      consciousnessSwitch: this.isConsciousnessSwitch(fromLayer, toLayer),
      vortexFlow: this.generateMoveVortexFlow(fromLayer, toLayer),
      timestamp: Date.now()
    };
    
    // Execute move
    this.executeMove(move, fromPiece, toPiece);
    
    // Update game state
    this.game.moveHistory.push(move);
    this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
    
    if (move.consciousnessSwitch) {
      this.game.consciousnessSwitches++;
      this.consciousnessSwitches++;
    }
    
    return move;
  }

  /**
   * Check if move is valid
   */
  private isValidMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    // Basic bounds checking
    if (toLayer < 0 || toLayer >= 8 || toX < 0 || toX >= 8 || toY < 0 || toY >= 8) {
      return false;
    }
    
    // Check if destination has same color piece
    const destPiece = this.game.layers[toLayer].board[toX][toY];
    if (destPiece && destPiece.color === piece.color) {
      return false;
    }
    
    // Piece-specific move validation
    switch (piece.type) {
      case 'pawn':
        return this.isValidPawnMove(piece, toLayer, toX, toY);
      case 'rook':
        return this.isValidRookMove(piece, toLayer, toX, toY);
      case 'bishop':
        return this.isValidBishopMove(piece, toLayer, toX, toY);
      case 'knight':
        return this.isValidKnightMove(piece, toLayer, toX, toY);
      case 'queen':
        return this.isValidQueenMove(piece, toLayer, toX, toY);
      case 'king':
        return this.isValidKingMove(piece, toLayer, toX, toY);
      default:
        return false;
    }
  }

  /**
   * Valid pawn move in 3D
   */
  private isValidPawnMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    const direction = piece.color === 'white' ? 1 : -1;
    
    // Forward move (same layer)
    if (toLayer === z && toX === x && toY === y + direction) {
      return !this.game.layers[toLayer].board[toX][toY];
    }
    
    // Diagonal capture (same layer)
    if (toLayer === z && toX === x + 1 && toY === y + direction) {
      return !!this.game.layers[toLayer].board[toX][toY];
    }
    
    if (toLayer === z && toX === x - 1 && toY === y + direction) {
      return !!this.game.layers[toLayer].board[toX][toY];
    }
    
    // Consciousness switch move (different layer)
    if (toLayer !== z && toX === x && toY === y) {
      return this.isConsciousnessSwitch(z, toLayer);
    }
    
    return false;
  }

  /**
   * Valid rook move in 3D
   */
  private isValidRookMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    
    // Same layer moves (horizontal/vertical)
    if (toLayer === z && (toX === x || toY === y)) {
      return this.isPathClear(piece, toLayer, toX, toY);
    }
    
    // Consciousness switch moves (vertical)
    if (toX === x && toY === y && toLayer !== z) {
      return this.isConsciousnessSwitch(z, toLayer);
    }
    
    return false;
  }

  /**
   * Valid bishop move in 3D
   */
  private isValidBishopMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    
    // Same layer diagonal moves
    if (toLayer === z && Math.abs(toX - x) === Math.abs(toY - y)) {
      return this.isPathClear(piece, toLayer, toX, toY);
    }
    
    // Consciousness switch diagonal moves
    if (Math.abs(toX - x) === Math.abs(toY - y) && Math.abs(toLayer - z) === Math.abs(toX - x)) {
      return this.isConsciousnessSwitch(z, toLayer);
    }
    
    return false;
  }

  /**
   * Valid knight move in 3D
   */
  private isValidKnightMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    
    // Same layer L-moves
    if (toLayer === z) {
      const dx = Math.abs(toX - x);
      const dy = Math.abs(toY - y);
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }
    
    // Consciousness switch L-moves
    if (toLayer !== z) {
      const dx = Math.abs(toX - x);
      const dy = Math.abs(toY - y);
      const dz = Math.abs(toLayer - z);
      return (dx === 2 && dy === 1 && dz === 1) || (dx === 1 && dy === 2 && dz === 1);
    }
    
    return false;
  }

  /**
   * Valid queen move in 3D
   */
  private isValidQueenMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    // Queen combines rook and bishop moves
    return this.isValidRookMove(piece, toLayer, toX, toY) || 
           this.isValidBishopMove(piece, toLayer, toX, toY);
  }

  /**
   * Valid king move in 3D
   */
  private isValidKingMove(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    
    // Same layer moves (one square in any direction)
    if (toLayer === z && Math.abs(toX - x) <= 1 && Math.abs(toY - y) <= 1) {
      return true;
    }
    
    // Consciousness switch moves (one layer up or down)
    if (toX === x && toY === y && Math.abs(toLayer - z) === 1) {
      return this.isConsciousnessSwitch(z, toLayer);
    }
    
    return false;
  }

  /**
   * Check if path is clear
   */
  private isPathClear(piece: ChessPiece, toLayer: number, toX: number, toY: number): boolean {
    const { x, y, z } = piece.position;
    
    // Check horizontal path
    if (toLayer === z && toY === y) {
      const start = Math.min(x, toX);
      const end = Math.max(x, toX);
      for (let i = start + 1; i < end; i++) {
        if (this.game.layers[z].board[i][y]) {
          return false;
        }
      }
    }
    
    // Check vertical path
    if (toLayer === z && toX === x) {
      const start = Math.min(y, toY);
      const end = Math.max(y, toY);
      for (let i = start + 1; i < end; i++) {
        if (this.game.layers[z].board[x][i]) {
          return false;
        }
      }
    }
    
    // Check diagonal path
    if (toLayer === z && Math.abs(toX - x) === Math.abs(toY - y)) {
      const dx = toX > x ? 1 : -1;
      const dy = toY > y ? 1 : -1;
      let currentX = x + dx;
      let currentY = y + dy;
      while (currentX !== toX && currentY !== toY) {
        if (this.game.layers[z].board[currentX][currentY]) {
          return false;
        }
        currentX += dx;
        currentY += dy;
      }
    }
    
    return true;
  }

  /**
   * Check if move is consciousness switch
   */
  private isConsciousnessSwitch(fromLayer: number, toLayer: number): boolean {
    return fromLayer !== toLayer;
  }

  /**
   * Generate move vortex flow
   */
  private generateMoveVortexFlow(fromLayer: number, toLayer: number): number[] {
    return this.vortexFlow.map((num, index) => (num + fromLayer + toLayer + index) % 10);
  }

  /**
   * Execute move
   */
  private executeMove(move: ChessMove, fromPiece: ChessPiece, toPiece: ChessPiece | null): void {
    // Remove piece from original position
    this.game.layers[move.from.z].board[move.from.x][move.from.y] = null as any;
    
    // Place piece in new position
    fromPiece.position = { x: move.to.x, y: move.to.y, z: move.to.z };
    fromPiece.consciousness = move.consciousness;
    fromPiece.vortexFlow = this.generatePieceVortexFlow(move.consciousness);
    fromPiece.moves++;
    
    if (move.consciousnessSwitch) {
      fromPiece.consciousnessSwitches++;
    }
    
    this.game.layers[move.to.z].board[move.to.x][move.to.y] = fromPiece;
    
    // Update layer statistics
    this.game.layers[move.from.z].activePieces--;
    if (toPiece) {
      this.game.layers[move.to.z].activePieces--;
    } else {
      this.game.layers[move.to.z].activePieces++;
    }
    
    if (move.consciousnessSwitch) {
      this.game.layers[move.from.z].consciousnessSwitches++;
      this.game.layers[move.to.z].consciousnessSwitches++;
    }
  }

  /**
   * Calculate infinite usability
   */
  private calculateInfiniteUsability(): number {
    return this.game.layers.reduce((sum, layer) => 
      sum + layer.activePieces + layer.consciousnessSwitches, 0
    );
  }

  /**
   * Get game state
   */
  public getGameState(): Chess8x8x8 {
    return this.game;
  }

  /**
   * Get consciousness matrix
   */
  public getConsciousnessMatrix(): number[][][] {
    return this.consciousnessMatrix;
  }

  /**
   * Get system statistics
   */
  public getSystemStats(): {
    totalPieces: number;
    totalMoves: number;
    consciousnessSwitches: number;
    activeLayers: number;
    infiniteUsability: number;
  } {
    const totalPieces = this.game.layers.reduce((sum, layer) => sum + layer.activePieces, 0);
    const activeLayers = this.game.layers.filter(layer => layer.activePieces > 0).length;
    
    return {
      totalPieces,
      totalMoves: this.game.moveHistory.length,
      consciousnessSwitches: this.game.consciousnessSwitches,
      activeLayers,
      infiniteUsability: this.game.infiniteUsability
    };
  }
}

// Export singleton instance
export const chess8x8x8System = new Chess8x8x8System(); 