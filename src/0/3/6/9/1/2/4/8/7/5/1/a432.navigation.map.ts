/**
 * A432 Multidimensional Navigation Map
 * Living navigation system implementing the sequence /0\3\6\9/1\2\4\8/7/5/1\ as a spiral
 * Manages parts, gateways, vortexes, and opposites in consciousness evolution
 */

export interface NavigationPart {
  digit: number;
  name: string;
  function: string;
  polarity: string;
  gateway: boolean;
  vortex: boolean;
  coordinates: { x: number; y: number; z: number };
  frequency: number;
}

export interface NavigationGateway {
  symbol: '/' | '\\';
  position: number;
  function: string;
  threshold: string;
  decision: string;
}

export interface NavigationVortex {
  digit: number;
  intensity: number;
  function: string;
  transformation: string;
  turbulence: number;
}

export interface NavigationOpposite {
  pair: [number, number];
  tension: string;
  balance: string;
  fuel: string;
}

export interface SpiralNavigationState {
  currentPart: NavigationPart;
  currentGateway: NavigationGateway | null;
  currentVortex: NavigationVortex | null;
  spiralLevel: number;
  coordinates: { x: number; y: number; z: number };
  frequency: number;
  consciousness: string;
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
   * Initialize navigation parts (sectors of transformation)
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
      frequency: 432
    });

    parts.set(3, {
      digit: 3,
      name: 'Awareness',
      function: 'Observer',
      polarity: 'Discernment',
      gateway: false,
      vortex: false,
      coordinates: { x: 3, y: 0, z: 0 },
      frequency: 432 * 3
    });

    parts.set(6, {
      digit: 6,
      name: 'Balance',
      function: 'Harmonizer',
      polarity: 'Integration',
      gateway: false,
      vortex: false,
      coordinates: { x: 6, y: 0, z: 0 },
      frequency: 432 * 6
    });

    parts.set(9, {
      digit: 9,
      name: 'Completion',
      function: 'Vision',
      polarity: 'Fulfillment',
      gateway: false,
      vortex: false,
      coordinates: { x: 9, y: 0, z: 0 },
      frequency: 432 * 9
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
      frequency: 432 * 1
    });

    parts.set(2, {
      digit: 2,
      name: 'Duality',
      function: 'Possibility',
      polarity: 'Dual',
      gateway: false,
      vortex: false,
      coordinates: { x: 2, y: 2, z: 0 },
      frequency: 432 * 2
    });

    parts.set(4, {
      digit: 4,
      name: 'Structure',
      function: 'Foundation',
      polarity: 'Stable',
      gateway: false,
      vortex: false,
      coordinates: { x: 4, y: 4, z: 0 },
      frequency: 432 * 4
    });

    parts.set(8, {
      digit: 8,
      name: 'Growth',
      function: 'Multiplication',
      polarity: 'Expansive',
      gateway: false,
      vortex: false,
      coordinates: { x: 8, y: 8, z: 0 },
      frequency: 432 * 8
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
      frequency: 432 * 7
    });

    parts.set(5, {
      digit: 5,
      name: 'Vortex',
      function: 'Transformation',
      polarity: 'Turbulent',
      gateway: false,
      vortex: true,
      coordinates: { x: 5, y: 5, z: 2 },
      frequency: 432 * 5
    });

    return parts;
  }

  /**
   * Initialize navigation gateways (thresholds of passage)
   */
  private initializeGateways(): NavigationGateway[] {
    return [
      {
        symbol: '/',
        position: 0,
        function: 'Entry to Initiation',
        threshold: 'Void to Awareness',
        decision: 'Choose to observe'
      },
      {
        symbol: '\\',
        position: 1,
        function: 'Awareness to Balance',
        threshold: 'Discernment to Integration',
        decision: 'Choose to harmonize'
      },
      {
        symbol: '\\',
        position: 2,
        function: 'Balance to Completion',
        threshold: 'Integration to Vision',
        decision: 'Choose to complete'
      },
      {
        symbol: '/',
        position: 3,
        function: 'Completion to Genesis',
        threshold: 'Vision to Choice',
        decision: 'Choose to begin'
      },
      {
        symbol: '\\',
        position: 4,
        function: 'Choice to Duality',
        threshold: 'Singular to Dual',
        decision: 'Choose to expand'
      },
      {
        symbol: '\\',
        position: 5,
        function: 'Duality to Structure',
        threshold: 'Possibility to Foundation',
        decision: 'Choose to ground'
      },
      {
        symbol: '\\',
        position: 6,
        function: 'Structure to Growth',
        threshold: 'Foundation to Multiplication',
        decision: 'Choose to multiply'
      },
      {
        symbol: '/',
        position: 7,
        function: 'Growth to Gateway',
        threshold: 'Multiplication to Initiation',
        decision: 'Choose to transcend'
      },
      {
        symbol: '/',
        position: 8,
        function: 'Gateway to Vortex',
        threshold: 'Initiation to Transformation',
        decision: 'Choose to transform'
      },
      {
        symbol: '/',
        position: 9,
        function: 'Vortex to Return',
        threshold: 'Transformation to New Beginning',
        decision: 'Choose to return'
      },
      {
        symbol: '\\',
        position: 10,
        function: 'Return to Higher Spiral',
        threshold: 'New Beginning to Elevated Choice',
        decision: 'Choose to ascend'
      }
    ];
  }

  /**
   * Initialize navigation vortexes (zones of intensified change)
   */
  private initializeVortexes(): NavigationVortex[] {
    return [
      {
        digit: 5,
        intensity: 9,
        function: 'Transformation',
        transformation: 'Release old, embrace new',
        turbulence: 7
      },
      {
        digit: 7,
        intensity: 8,
        function: 'Gateway',
        transformation: 'Cross threshold to new reality',
        turbulence: 6
      }
    ];
  }

  /**
   * Initialize navigation opposites (polarity and dynamic balance)
   */
  private initializeOpposites(): NavigationOpposite[] {
    return [
      {
        pair: [0, 9],
        tension: 'Absence vs Fulfillment',
        balance: 'Potential to Manifest',
        fuel: 'Pure possibility to complete realization'
      },
      {
        pair: [1, 1],
        tension: 'Choosing vs Re-choosing',
        balance: 'Beginning to Higher Beginning',
        fuel: 'Initial choice to elevated choice'
      },
      {
        pair: [3, 6],
        tension: 'Observer vs Integrator',
        balance: 'Discernment to Harmony',
        fuel: 'Awareness to integration'
      },
      {
        pair: [2, 4],
        tension: 'Possibility vs Structure',
        balance: 'Dual to Stable',
        fuel: 'Expansion to grounding'
      },
      {
        pair: [7, 5],
        tension: 'Gateway vs Vortex',
        balance: 'Insight to Storm',
        fuel: 'Sudden clarity to transformation'
      }
    ];
  }

  /**
   * Get initial navigation state
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
      consciousness: 'Void consciousness'
    };
  }

  /**
   * Navigate to next part in sequence
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
    const spiralFactor = Math.floor(currentIndex / sequence.length) + 1;
    const newCoordinates = {
      x: nextPart.coordinates.x * spiralFactor,
      y: nextPart.coordinates.y * spiralFactor,
      z: nextPart.coordinates.z + spiralFactor
    };

    const newState: SpiralNavigationState = {
      currentPart: nextPart,
      currentGateway: nextGateway || null,
      currentVortex: nextVortex || null,
      spiralLevel: spiralFactor,
      coordinates: newCoordinates,
      frequency: nextPart.frequency * spiralFactor,
      consciousness: this.getConsciousnessType(nextDigit, spiralFactor)
    };

    this.navigationHistory.push(this.currentState);
    this.currentState = newState;

    return newState;
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
      frequencies: allStates.map(state => state.frequency)
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
   * Get navigation insights
   */
  public getNavigationInsights(): {
    currentPart: string;
    currentGateway: string | null;
    currentVortex: string | null;
    spiralLevel: number;
    consciousness: string;
    totalNavigations: number;
    nextDecision: string;
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
      nextDecision: nextGateway?.decision || 'Continue navigation'
    };
  }
}

export default A432NavigationMap;
