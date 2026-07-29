/**
 * A432 Multidimensional Navigation Map with Transurfing Integration
 * Living navigation system implementing the sequence /0\3\6\9/1\2\4\8/7/5/1\ as a spiral
 * Manages parts, gateways, vortexes, and opposites in consciousness evolution
 * Integrated with Vadim Zeland's Transurfing Reality principles
 */

import { abs, floor, max, min } from './a432.algebra.ts'
import { legacyDigitalRoot } from './a432.roots.ts'
export interface NavigationPart {
  digit: number;
  name: string;
  function: string;
  polarity: string;
  gateway: boolean;
  vortex: boolean;
  coordinates: { x: number; y: number; z: number };
  frequency: number;
  pendulumField: 'constructive' | 'destructive' | 'neutral'; // Transurfing pendulum type
}

export interface NavigationGateway {
  symbol: '/' | '\\';
  position: number;
  function: string;
  threshold: string;
  decision: string;
  pendulumResistance: number; // Digital root (1-9) - Transurfing resistance factor
  heartAlignmentRequired: number; // Minimum heart alignment needed to pass (0-9)
}

export interface NavigationVortex {
  digit: number;
  intensity: number;
  function: string;
  transformation: string;
  turbulence: number;
  pendulumInterference: number; // Transurfing pendulum interference level
}

export interface NavigationOpposite {
  pair: [number, number];
  tension: string;
  balance: string;
  fuel: string;
  pendulumHarmony: number; // Transurfing harmony between opposites
}

export interface SpiralNavigationState {
  currentPart: NavigationPart;
  currentGateway: NavigationGateway | null;
  currentVortex: NavigationVortex | null;
  spiralLevel: number;
  coordinates: { x: number; y: number; z: number };
  frequency: number;
  consciousness: string;
  heartAlignment: number; // Transurfing heart alignment (0-9)
  pendulumInterference: number; // Total pendulum interference
  transurfingPhase: 'sliding' | 'balancing' | 'transforming' | 'ascending'; // Current Transurfing phase
}

export class A432NavigationMap {
  private parts: Map<number, NavigationPart>;
  private gateways: NavigationGateway[];
  private vortexes: NavigationVortex[];
  private opposites: NavigationOpposite[];
  private currentState: SpiralNavigationState;
  private navigationHistory: SpiralNavigationState[];

  constructor() {
    this.parts = this.initializeParts();
    this.gateways = this.initializeGateways();
    this.vortexes = this.initializeVortexes();
    this.opposites = this.initializeOpposites();
    this.currentState = this.getInitialState();
    this.navigationHistory = [];
  }

  /**
   * Initialize navigation parts (sectors of transformation) with Transurfing pendulum fields
   */
  private initializeParts(): Map<number, NavigationPart> {
    const parts = new Map<number, NavigationPart>();

    // Initiation Cluster: /0\3\6\9
    parts.set(0, {
      digit: 0,
      name: 'Void',
      function: 'Primordial Potential',
      polarity: 'Absence',
      gateway: false,
      vortex: false,
      coordinates: { x: 0, y: 0, z: 0 },
      frequency: 432,
      pendulumField: 'neutral' // Void is beyond pendulum influence
    });

    parts.set(3, {
      digit: 3,
      name: 'Awareness',
      function: 'Observer',
      polarity: 'Discernment',
      gateway: false,
      vortex: false,
      coordinates: { x: 3, y: 0, z: 0 },
      frequency: 432 * 3,
      pendulumField: 'constructive' // Awareness attracts constructive pendulums
    });

    parts.set(6, {
      digit: 6,
      name: 'Balance',
      function: 'Harmonizer',
      polarity: 'Integration',
      gateway: false,
      vortex: false,
      coordinates: { x: 6, y: 0, z: 0 },
      frequency: 432 * 6,
      pendulumField: 'constructive' // Balance harmonizes all pendulums
    });

    parts.set(9, {
      digit: 9,
      name: 'Completion',
      function: 'Vision',
      polarity: 'Fulfillment',
      gateway: false,
      vortex: false,
      coordinates: { x: 9, y: 0, z: 0 },
      frequency: 432 * 9,
      pendulumField: 'constructive' // Completion attracts highest harmony
    });

    // Genesis Cluster: /1\2\4\8
    parts.set(1, {
      digit: 1,
      name: 'Spark',
      function: 'Choice',
      polarity: 'Singular',
      gateway: false,
      vortex: false,
      coordinates: { x: 1, y: 1, z: 0 },
      frequency: 432 * 1,
      pendulumField: 'constructive' // Choice attracts constructive possibilities
    });

    parts.set(2, {
      digit: 2,
      name: 'Duality',
      function: 'Possibility',
      polarity: 'Dual',
      gateway: false,
      vortex: false,
      coordinates: { x: 2, y: 2, z: 0 },
      frequency: 432 * 2,
      pendulumField: 'neutral' // Duality balances constructive and destructive
    });

    parts.set(4, {
      digit: 4,
      name: 'Structure',
      function: 'Foundation',
      polarity: 'Stable',
      gateway: false,
      vortex: false,
      coordinates: { x: 4, y: 4, z: 0 },
      frequency: 432 * 4,
      pendulumField: 'constructive' // Structure provides stable foundation
    });

    parts.set(8, {
      digit: 8,
      name: 'Growth',
      function: 'Multiplication',
      polarity: 'Expansive',
      gateway: false,
      vortex: false,
      coordinates: { x: 8, y: 8, z: 0 },
      frequency: 432 * 8,
      pendulumField: 'constructive' // Growth attracts expansion pendulums
    });

    // Gateway and Vortex Cluster: /7/5/1\
    parts.set(7, {
      digit: 7,
      name: 'Gateway',
      function: 'Initiation',
      polarity: 'Liminal',
      gateway: true,
      vortex: false,
      coordinates: { x: 7, y: 7, z: 1 },
      frequency: 432 * 7,
      pendulumField: 'destructive' // Gateway disrupts old patterns
    });

    parts.set(5, {
      digit: 5,
      name: 'Vortex',
      function: 'Transformation',
      polarity: 'Turbulent',
      gateway: false,
      vortex: true,
      coordinates: { x: 5, y: 5, z: 2 },
      frequency: 432 * 5,
      pendulumField: 'destructive' // Vortex creates maximum disruption for transformation
    });

    return parts;
  }

  /**
   * Initialize navigation gateways (thresholds of passage) with Transurfing resistance
   */
  private initializeGateways(): NavigationGateway[] {
    return [
      {
        symbol: '/',
        position: 0,
        function: 'Entry to Initiation',
        threshold: 'Void to Awareness',
        decision: 'Choose to observe',
        pendulumResistance: 1, // Minimal resistance from void
        heartAlignmentRequired: 1
      },
      {
        symbol: '\\',
        position: 1,
        function: 'Awareness to Balance',
        threshold: 'Discernment to Integration',
        decision: 'Choose to harmonize',
        pendulumResistance: 3, // Moderate resistance from awareness
        heartAlignmentRequired: 3
      },
      {
        symbol: '\\',
        position: 2,
        function: 'Balance to Completion',
        threshold: 'Integration to Vision',
        decision: 'Choose to complete',
        pendulumResistance: 6, // Higher resistance from balance
        heartAlignmentRequired: 6
      },
      {
        symbol: '/',
        position: 3,
        function: 'Completion to Genesis',
        threshold: 'Vision to Choice',
        decision: 'Choose to begin',
        pendulumResistance: 9, // Maximum resistance from completion
        heartAlignmentRequired: 9
      },
      {
        symbol: '\\',
        position: 4,
        function: 'Choice to Duality',
        threshold: 'Singular to Dual',
        decision: 'Choose to expand',
        pendulumResistance: 2, // Low resistance from choice
        heartAlignmentRequired: 2
      },
      {
        symbol: '\\',
        position: 5,
        function: 'Duality to Structure',
        threshold: 'Possibility to Foundation',
        decision: 'Choose to ground',
        pendulumResistance: 4, // Moderate resistance from duality
        heartAlignmentRequired: 4
      },
      {
        symbol: '\\',
        position: 6,
        function: 'Structure to Growth',
        threshold: 'Foundation to Multiplication',
        decision: 'Choose to multiply',
        pendulumResistance: 8, // High resistance from structure
        heartAlignmentRequired: 8
      },
      {
        symbol: '/',
        position: 7,
        function: 'Growth to Gateway',
        threshold: 'Multiplication to Initiation',
        decision: 'Choose to transcend',
        pendulumResistance: 7, // High resistance from growth
        heartAlignmentRequired: 7
      },
      {
        symbol: '/',
        position: 8,
        function: 'Gateway to Vortex',
        threshold: 'Initiation to Transformation',
        decision: 'Choose to transform',
        pendulumResistance: 5, // Moderate resistance from gateway
        heartAlignmentRequired: 5
      },
      {
        symbol: '/',
        position: 9,
        function: 'Vortex to Return',
        threshold: 'Transformation to New Beginning',
        decision: 'Choose to return',
        pendulumResistance: 9, // Maximum resistance from vortex
        heartAlignmentRequired: 9
      },
      {
        symbol: '\\',
        position: 10,
        function: 'Return to Higher Spiral',
        threshold: 'New Beginning to Elevated Choice',
        decision: 'Choose to ascend',
        pendulumResistance: 1, // Minimal resistance for return
        heartAlignmentRequired: 1
      }
    ];
  }

  /**
   * Initialize navigation vortexes (zones of intensified change) with Transurfing interference
   */
  private initializeVortexes(): NavigationVortex[] {
    return [
      {
        digit: 5,
        intensity: 9,
        function: 'Transformation',
        transformation: 'Release old, embrace new',
        turbulence: 7,
        pendulumInterference: 9 // Maximum interference in vortex
      },
      {
        digit: 7,
        intensity: 8,
        function: 'Gateway',
        transformation: 'Cross threshold to new reality',
        turbulence: 6,
        pendulumInterference: 7 // High interference in gateway
      }
    ];
  }

  /**
   * Initialize navigation opposites (polarity and dynamic balance) with Transurfing harmony
   */
  private initializeOpposites(): NavigationOpposite[] {
    return [
      {
        pair: [0, 9],
        tension: 'Absence vs Fulfillment',
        balance: 'Potential to Manifest',
        fuel: 'Pure possibility to complete realization',
        pendulumHarmony: 9 // Perfect harmony between void and completion
      },
      {
        pair: [1, 1],
        tension: 'Choosing vs Re-choosing',
        balance: 'Beginning to Higher Beginning',
        fuel: 'Initial choice to elevated choice',
        pendulumHarmony: 1 // Minimal harmony for same digit
      },
      {
        pair: [3, 6],
        tension: 'Observer vs Integrator',
        balance: 'Discernment to Harmony',
        fuel: 'Awareness to integration',
        pendulumHarmony: 9 // Perfect harmony (3+6=9)
      },
      {
        pair: [2, 4],
        tension: 'Possibility vs Structure',
        balance: 'Dual to Stable',
        fuel: 'Expansion to grounding',
        pendulumHarmony: 6 // Good harmony (2+4=6)
      },
      {
        pair: [7, 5],
        tension: 'Gateway vs Vortex',
        balance: 'Insight to Storm',
        fuel: 'Sudden clarity to transformation',
        pendulumHarmony: 3 // Moderate harmony (7+5=12, 1+2=3)
      }
    ];
  }

  /**
   * Get initial navigation state with Transurfing parameters
   */
  private getInitialState(): SpiralNavigationState {
    const initialPart = this.parts.get(0)!;
    return {
      currentPart: initialPart,
      currentGateway: null,
      currentVortex: null,
      spiralLevel: 1,
      coordinates: initialPart.coordinates,
      frequency: initialPart.frequency,
      consciousness: 'Void consciousness',
      heartAlignment: 0, // Initial heart alignment
      pendulumInterference: 0, // No interference in void
      transurfingPhase: 'sliding' // Initial phase
    };
  }

  /**
   * Navigate to next part in sequence with Transurfing resistance calculation
   */
  public navigateToNext(): SpiralNavigationState {
    const sequence = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
    const currentIndex = sequence.indexOf(this.currentState.currentPart.digit);
    const nextIndex = (currentIndex + 1) % sequence.length;
    const nextDigit = sequence[nextIndex];

    const nextPart = this.parts.get(nextDigit)!;
    const nextGateway = this.gateways.find(g => g.position === nextIndex);
    const nextVortex = this.vortexes.find(v => v.digit === nextDigit);

    // Calculate new coordinates based on spiral progression
    const spiralFactor = floor(currentIndex / sequence.length) + 1;
    const newCoordinates = {
      x: nextPart.coordinates.x * spiralFactor,
      y: nextPart.coordinates.y * spiralFactor,
      z: nextPart.coordinates.z + spiralFactor
    };

    // Calculate Transurfing parameters
    const heartAlignment = this.calculateHeartAlignment(nextPart, nextGateway);
    const pendulumInterference = this.calculatePendulumInterference(nextPart, nextVortex);
    const transurfingPhase = this.determineTransurfingPhase(nextPart, heartAlignment);

    const newState: SpiralNavigationState = {
      currentPart: nextPart,
      currentGateway: nextGateway || null,
      currentVortex: nextVortex || null,
      spiralLevel: spiralFactor,
      coordinates: newCoordinates,
      frequency: nextPart.frequency * spiralFactor,
      consciousness: this.getConsciousnessType(nextDigit, spiralFactor),
      heartAlignment,
      pendulumInterference,
      transurfingPhase
    };

    this.navigationHistory.push(this.currentState);
    this.currentState = newState;

    return newState;
  }

  /**
   * Calculate heart alignment based on current part and gateway resistance
   */
  private calculateHeartAlignment(part: NavigationPart, gateway: NavigationGateway | undefined): number {
    let baseAlignment = this.currentState.heartAlignment;
    
    // Adjust based on pendulum field
    if (part.pendulumField === 'constructive') {
      baseAlignment = min(9, baseAlignment + 1);
    } else if (part.pendulumField === 'destructive') {
      baseAlignment = max(0, baseAlignment - 1);
    }
    
    // Apply gateway resistance
    if (gateway) {
      const resistance = gateway.pendulumResistance;
      baseAlignment = max(0, baseAlignment - resistance);
    }
    
    return this.calculateDigitalRoot(baseAlignment);
  }

  /**
   * Calculate pendulum interference based on current part and vortex
   */
  private calculatePendulumInterference(part: NavigationPart, vortex: NavigationVortex | undefined): number {
    let interference = 0;
    
    // Base interference from pendulum field
    if (part.pendulumField === 'destructive') {
      interference += 3;
    } else if (part.pendulumField === 'constructive') {
      interference += 1;
    }
    
    // Add vortex interference
    if (vortex) {
      interference += vortex.pendulumInterference;
    }
    
    return this.calculateDigitalRoot(interference);
  }

  /**
   * Determine current Transurfing phase
   */
  private determineTransurfingPhase(part: NavigationPart, heartAlignment: number): 'sliding' | 'balancing' | 'transforming' | 'ascending' {
    if (heartAlignment >= 7) {
      return 'ascending';
    } else if (heartAlignment >= 5) {
      return 'transforming';
    } else if (heartAlignment >= 3) {
      return 'balancing';
    } else {
      return 'sliding';
    }
  }

  /**
   * Get consciousness type for digit and spiral level
   */
  private getConsciousnessType(digit: number, spiralLevel: number): string {
    const baseTypes = [
      'Void consciousness',
      'Unity consciousness',
      'Duality consciousness',
      'Trinity consciousness',
      'Foundation consciousness',
      'Life consciousness',
      'Harmony consciousness',
      'Mystery consciousness',
      'Infinity consciousness',
      'Transcendence consciousness'
    ];

    const baseType = baseTypes[digit];
    return `${baseType} (Spiral ${spiralLevel})`;
  }

  /**
   * Get current navigation state
   */
  public getCurrentState(): SpiralNavigationState {
    return this.currentState;
  }

  /**
   * Get complete navigation map
   */
  public getNavigationMap(): {
    parts: NavigationPart[];
    gateways: NavigationGateway[];
    vortexes: NavigationVortex[];
    opposites: NavigationOpposite[];
    currentState: SpiralNavigationState;
    history: SpiralNavigationState[];
  } {
    return {
      parts: Array.from(this.parts.values()),
      gateways: this.gateways,
      vortexes: this.vortexes,
      opposites: this.opposites,
      currentState: this.currentState,
      history: this.navigationHistory
    };
  }

  /**
   * Get spiral visualization data
   */
  public getSpiralVisualization(): {
    coordinates: Array<{ x: number; y: number; z: number }>;
    parts: string[];
    gateways: number[];
    vortexes: number[];
    frequencies: number[];
    heartAlignments: number[]; // Transurfing heart alignments
    pendulumInterferences: number[]; // Transurfing pendulum interferences
  } {
    const allStates = [...this.navigationHistory, this.currentState];
    
    return {
      coordinates: allStates.map(state => state.coordinates),
      parts: allStates.map(state => state.currentPart.name),
      gateways: allStates
        .map((state, index) => state.currentGateway ? index : -1)
        .filter(index => index !== -1),
      vortexes: allStates
        .map((state, index) => state.currentVortex ? index : -1)
        .filter(index => index !== -1),
      frequencies: allStates.map(state => state.frequency),
      heartAlignments: allStates.map(state => state.heartAlignment),
      pendulumInterferences: allStates.map(state => state.pendulumInterference)
    };
  }

  /**
   * Navigate through complete sequence cycle
   */
  public navigateCompleteCycle(): SpiralNavigationState[] {
    const cycle = [];
    const sequenceLength = 11; // /0\3\6\9/1\2\4\8/7/5/1\

    for (let i = 0; i < sequenceLength; i++) {
      const state = this.navigateToNext();
      cycle.push(state);
    }

    return cycle;
  }

  /**
   * Get navigation insights with Transurfing parameters
   */
  public getNavigationInsights(): {
    currentPart: string;
    currentGateway: string | null;
    currentVortex: string | null;
    spiralLevel: number;
    consciousness: string;
    totalNavigations: number;
    nextDecision: string;
    heartAlignment: number;
    pendulumInterference: number;
    transurfingPhase: string;
  } {
    const nextGateway = this.gateways.find(g => 
      g.position === this.navigationHistory.length + 1
    );

    return {
      currentPart: this.currentState.currentPart.name,
      currentGateway: this.currentState.currentGateway?.function || null,
      currentVortex: this.currentState.currentVortex?.function || null,
      spiralLevel: this.currentState.spiralLevel,
      consciousness: this.currentState.consciousness,
      totalNavigations: this.navigationHistory.length,
      nextDecision: nextGateway?.decision || 'Continue navigation',
      heartAlignment: this.currentState.heartAlignment,
      pendulumInterference: this.currentState.pendulumInterference,
      transurfingPhase: this.currentState.transurfingPhase
    };
  }

  /**
   * Calculate digital root for Transurfing calculations
   */
  private calculateDigitalRoot(n: number): number {
    return legacyDigitalRoot(n)
  }
}

export default A432NavigationMap;
