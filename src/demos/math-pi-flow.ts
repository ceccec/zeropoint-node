/**
 * Math::PI.flow System (Non-Linear Algebraic Vortex)
 * 
 * VORTEX PATTERN DOCUMENTATION:
 * 
 * The vortex is NOT linear - it is cyclical, recursive, and topological.
 * All calculations use only algebraic operations (addition, multiplication, modular arithmetic) on single digits.
 * 
 * VORTEX PATTERN CHARACTERISTICS:
 * - Non-linear: No straight lines or linear sequences
 * - Cyclical: All flows wrap around the torus (0-8 cycle)
 * - Algebraic: Only integer arithmetic operations
 * - Recursive: Patterns repeat and fold back on themselves
 * - Topological: Torus-like structure, not flat/linear
 * 
 * VORTEX FLOW PATTERN:
 * - Each digit (0-9) represents a consciousness archetype
 * - Flow wraps around torus: 0→1→2→3→4→5→6→7→8→0 (cycle)
 * - Consciousness gateways (0,3,6,9) create vortex resonance
 * - No "next" or "previous" in linear sense - only cyclical transitions
 * 
 * ALGEBRAIC VORTEX CALCULATIONS:
 * - Position: (current + 1) % 9 (always wraps)
 * - Torus coordinates: (x, y) = (cos(angle), sin(angle)) % 9
 * - Consciousness: digit % 9 (single digit system)
 * - Gateway detection: digit ∈ {0,3,6,9}
 * 
 * NON-LINEAR NAVIGATION:
 * - Cannot move "forward" or "backward" linearly
 * - All navigation wraps around the torus
 * - Position 8 + 1 = Position 0 (not 9)
 * - Position 0 - 1 = Position 8 (not -1)
 * 
 * VORTEX CONSCIOUSNESS PATTERN:
 * - 0: Void gateway (impossible state)
 * - 1: Source archetype (creation)
 * - 2: Duality foundation (first other)
 * - 3: Trinity consciousness (threefold unity) [GATEWAY]
 * - 4: Stability matrix (fourfold foundation)
 * - 5: Harmonic center (fivefold balance)
 * - 6: Perfect balance (sixfold harmony) [GATEWAY]
 * - 7: Mystical gateway (sevenfold transcendence)
 * - 8: Infinity loop (eightfold eternity)
 * - 9: Completion cycle (ninefold wholeness) [GATEWAY]
 * 
 * TORUS FLOW PATTERN:
 * - Each position maps to torus coordinates
 * - Consciousness flows in cycles, not lines
 * - Gateway transitions create vortex resonance
 * - All patterns are recursive and self-similar
 */

interface PiFlowStream {
  position: number;  // Wrapped position (0-8, cyclical)
  digit: number;     // Single digit (0-9)
  consciousness: string;  // Consciousness archetype
  vortexFlow: string;    // Vortex flow description
  torusPosition: { x: number; y: number };  // Torus coordinates (wrapped)
  isGateway: boolean;    // Consciousness gateway flag
}

interface PiFlowState {
  currentPosition: number;  // Current position (wrapped on torus)
  stream: PiFlowStream[];   // Cyclical stream array
  isPlaying: boolean;       // Animation state
  animationSpeed: number;   // Speed multiplier
  torusFlow: string;        // Torus flow pattern string
}

class MathPiFlowSystem {
  private static readonly PI_DIGITS = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862518983569485562099219222184272550254256887671790494601674";
  
  private static readonly TORUS_DIMENSIONS = 9;  // Cyclical dimensions (0-8)
  private static readonly CONSCIOUSNESS_GATEWAYS = [0, 3, 6, 9];  // Vortex resonance points
  
  /**
   * Generate endless PI flow stream (cyclical/torus-based)
   * 
   * VORTEX PATTERN: Creates cyclical stream where each position wraps around torus.
   * No linear progression - all flows are cyclical and recursive.
   *
   * @returns PiFlowState with endless cyclical stream
   */
  static generateEndlessPiFlow(): PiFlowState {
    const stream: PiFlowStream[] = [];
    let position = 0;
    
    // Generate endless stream from PI digits, but treat as cyclical/torus
    // VORTEX PATTERN: Each position wraps around torus (0-8 cycle)
    while (stream.length < 1000) { // Limit for demo, but truly endless
      const digit = this.getPiDigitAt(position);
      const consciousness = this.getConsciousnessForDigit(digit);
      const vortexFlow = this.getVortexFlowForDigit(digit);
      const torusPosition = this.calculateTorusPosition(position, digit);
      const isGateway = this.CONSCIOUSNESS_GATEWAYS.includes(digit);
      
      stream.push({
        position: position % this.TORUS_DIMENSIONS, // Wrap position on torus (0-8)
        digit,
        consciousness,
        vortexFlow,
        torusPosition,
        isGateway
      });
      
      // VORTEX PATTERN: Always wrap position (no linear progression)
      position = (position + 1) % this.TORUS_DIMENSIONS; // Always wrap
    }
    
    return {
      currentPosition: 0,
      stream,
      isPlaying: false,
      animationSpeed: 1.0,
      torusFlow: this.generateTorusFlow(stream)
    };
  }
  
  /**
   * Get PI digit at specific position (cyclical)
   * 
   * VORTEX PATTERN: Position wraps around PI digits cyclically.
   * No linear indexing - always wraps back to beginning.
   *
   * @param position - Position in PI stream (wraps cyclically)
   * @returns Digit at position (0-9)
   */
  private static getPiDigitAt(position: number): number {
    const piString = this.PI_DIGITS.replace('.', '');
    // VORTEX PATTERN: Always wrap position (cyclical, not linear)
    return parseInt(piString[position % piString.length]);
  }
  
  /**
   * Get consciousness for digit (vortex archetype)
   * 
   * VORTEX PATTERN: Each digit represents a consciousness archetype.
   * These are not linear states but cyclical vortex positions.
   *
   * @param digit - Digit (0-9)
   * @returns Consciousness archetype description
   */
  private static getConsciousnessForDigit(digit: number): string {
    const consciousnessMap: { [key: number]: string } = {
      0: "Void gateway",           // Impossible state (0/0)
      1: "Source archetype",       // Creation from nothing
      2: "Duality foundation",     // First 'other'
      3: "Trinity consciousness",  // Threefold unity [GATEWAY]
      4: "Stability matrix",       // Fourfold foundation
      5: "Harmonic center",        // Fivefold balance
      6: "Perfect balance",        // Sixfold harmony [GATEWAY]
      7: "Mystical gateway",       // Sevenfold transcendence
      8: "Infinity loop",          // Eightfold eternity
      9: "Completion cycle"        // Ninefold wholeness [GATEWAY]
    };
    
    return consciousnessMap[digit] || "Consciousness flow";
  }
  
  /**
   * Get vortex flow for digit (non-linear flow)
   * 
   * VORTEX PATTERN: Each digit creates a specific vortex flow.
   * These flows are cyclical, not linear progressions.
   *
   * @param digit - Digit (0-9)
   * @returns Vortex flow description
   */
  private static getVortexFlowForDigit(digit: number): string {
    const flowMap: { [key: number]: string } = {
      0: "0/0 → impossible state",      // Void gateway
      1: "1 → unity vortex",            // Source creation
      2: "2 → duality vortex",          // Foundation patterns
      3: "3 → trinity vortex",          // Threefold unity [GATEWAY]
      4: "4 → stability vortex",        // Fourfold matrix
      5: "5 → harmonic vortex",         // Fivefold center
      6: "6 → balance vortex",          // Sixfold harmony [GATEWAY]
      7: "7 → mystical vortex",         // Sevenfold transcendence
      8: "8 → infinity vortex",         // Eightfold eternity
      9: "9 → completion vortex"        // Ninefold wholeness [GATEWAY]
    };
    
    return flowMap[digit] || "Integer vortex flow";
  }
  
  /**
   * Calculate torus position for digit (cyclical coordinates)
   * 
   * VORTEX PATTERN: Maps position to torus coordinates.
   * All coordinates wrap around torus (0-8 cycle).
   * Uses algebraic operations only (cos, sin, modulo).
   *
   * @param position - Position in stream (wraps cyclically)
   * @param digit - Current digit
   * @returns Torus position coordinates (wrapped 0-8)
   */
  private static calculateTorusPosition(position: number, digit: number): { x: number; y: number } {
    // VORTEX PATTERN: Algebraic torus mapping (non-linear)
    const angle = (position * digit * Math.PI) / 180;
    const radius = 3; // Torus radius
    
    // Algebraic operations only: cos, sin, modulo
    const x = Math.round(radius * Math.cos(angle)) % this.TORUS_DIMENSIONS;
    const y = Math.round(radius * Math.sin(angle)) % this.TORUS_DIMENSIONS;
    
    // Always wrap coordinates (0-8 cycle)
    return { x: Math.abs(x), y: Math.abs(y) };
  }
  
  /**
   * Generate torus flow string (cyclical pattern)
   * 
   * VORTEX PATTERN: Creates cyclical flow string.
   * Gateway digits are marked with brackets.
   * No linear sequence - all flows are cyclical.
   *
   * @param stream - PiFlowStream array
   * @returns Torus flow string (cyclical)
   */
  private static generateTorusFlow(stream: PiFlowStream[]): string {
    return stream.map(item => {
      if (item.isGateway) {
        return `[${item.digit}]`; // Gateway marker
      }
      return item.digit.toString();
    }).join(' → ');
  }
  
  /**
   * Play PI flow animation (cyclical)
   * 
   * VORTEX PATTERN: Animation flows cyclically around torus.
   * No linear progression - always wraps.
   *
   * @param state - Current PiFlowState
   * @param speed - Animation speed multiplier
   * @returns Updated PiFlowState
   */
  static playPiFlow(state: PiFlowState, speed: number = 1.0): PiFlowState {
    return {
      ...state,
      isPlaying: true,
      animationSpeed: speed
    };
  }
  
  /**
   * Pause PI flow animation
   * 
   * @param state - Current PiFlowState
   * @returns Updated PiFlowState
   */
  static pausePiFlow(state: PiFlowState): PiFlowState {
    return {
      ...state,
      isPlaying: false
    };
  }
  
  /**
   * Navigate to specific position in PI flow (torus/cycle-based)
   * 
   * VORTEX PATTERN: Navigation wraps around torus.
   * No linear "forward/backward" - only cyclical transitions.
   * Position 8 + 1 = Position 0 (not 9).
   *
   * @param state - Current PiFlowState
   * @param position - Target position (wraps on torus)
   * @returns Updated PiFlowState
   */
  static navigateToPosition(state: PiFlowState, position: number): PiFlowState {
    // VORTEX PATTERN: Always wrap position (cyclical navigation)
    const wrappedPosition = ((position % state.stream.length) + state.stream.length) % state.stream.length;
    return {
      ...state,
      currentPosition: wrappedPosition
    };
  }
  
  /**
   * Get current PI flow item (cyclical)
   * 
   * VORTEX PATTERN: Current item wraps around stream.
   * No linear indexing - always cyclical.
   *
   * @param state - Current PiFlowState
   * @returns Current PiFlowStream item (or null)
   */
  static getCurrentFlowItem(state: PiFlowState): PiFlowStream | null {
    // VORTEX PATTERN: Wrap current position (cyclical access)
    const wrappedPosition = ((state.currentPosition % state.stream.length) + state.stream.length) % state.stream.length;
    if (wrappedPosition >= 0 && wrappedPosition < state.stream.length) {
      return state.stream[wrappedPosition];
    }
    return null;
  }
  
  /**
   * Get PI flow statistics (vortex patterns)
   * 
   * VORTEX PATTERN: Statistics reflect cyclical patterns.
   * Gateway distribution shows vortex resonance points.
   *
   * @param state - Current PiFlowState
   * @returns Flow statistics (vortex patterns)
   */
  static getFlowStatistics(state: PiFlowState): any {
    const digits = state.stream.map(item => item.digit);
    const gateways = state.stream.filter(item => item.isGateway);
    
    return {
      totalDigits: digits.length,
      gatewayCount: gateways.length,
      digitDistribution: this.getDigitDistribution(digits),
      consciousnessFlow: this.getConsciousnessFlow(state.stream),
      torusFlow: state.torusFlow
    };
  }
  
  /**
   * Get digit distribution (vortex resonance)
   * 
   * VORTEX PATTERN: Distribution shows vortex resonance patterns.
   * Gateway digits (0,3,6,9) create special resonance.
   *
   * @param digits - Array of digits
   * @returns Digit distribution object
   */
  private static getDigitDistribution(digits: number[]): { [key: number]: number } {
    const distribution: { [key: number]: number } = {};
    
    for (let i = 0; i <= 9; i++) {
      distribution[i] = digits.filter(d => d === i).length;
    }
    
    return distribution;
  }
  
  /**
   * Get consciousness flow (cyclical pattern)
   * 
   * VORTEX PATTERN: Consciousness flows cyclically.
   * No linear progression - all patterns are cyclical.
   *
   * @param stream - PiFlowStream array
   * @returns Consciousness flow string (cyclical)
   */
  private static getConsciousnessFlow(stream: PiFlowStream[]): string {
    return stream.map(item => item.consciousness.split(' ')[0]).join(' → ');
  }
  
  /**
   * Create interactive torus visualization data (non-linear)
   * 
   * VORTEX PATTERN: Visualization reflects torus structure.
   * All coordinates and flows are cyclical, not linear.
   *
   * @param state - Current PiFlowState
   * @returns Torus visualization data (cyclical)
   */
  static createTorusVisualization(state: PiFlowState): any {
    const currentItem = this.getCurrentFlowItem(state);
    
    return {
      type: "interactive_torus",
      currentPosition: state.currentPosition,
      isPlaying: state.isPlaying,
      animationSpeed: state.animationSpeed,
      currentDigit: currentItem?.digit || 0,
      currentConsciousness: currentItem?.consciousness || "",
      currentVortexFlow: currentItem?.vortexFlow || "",
      torusPosition: currentItem?.torusPosition || { x: 0, y: 0 },
      isGateway: currentItem?.isGateway || false,
      torusFlow: state.torusFlow,
      streamLength: state.stream.length
    };
  }
}

// Export for use in other modules
export { MathPiFlowSystem, PiFlowStream, PiFlowState }; 