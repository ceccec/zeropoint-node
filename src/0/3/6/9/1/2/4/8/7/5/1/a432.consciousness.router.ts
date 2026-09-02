/**
 * A432 Consciousness Router Module
 * Master router that orchestrates all consciousness evolution modules
 * Routes between: Cycle Evolution, Dimensional Evolution, and Spiral Consciousness
 */

import A432ConsciousnessCycle from './a432.consciousness.cycle.ts';
import A432DimensionalEvolution from './a432.dimensional.evolution.ts';
import A432SpiralConsciousness from './a432.spiral.consciousness.ts';
import A432NavigationMap from './a432.navigation.map.ts';

/**
 * A route is a DISCRIMINATED union, not a tag beside three `any`s.
 *
 * The payload depends on which subsystem the route named, and the readers below
 * already rely on that — allRoutes.cycle.state.currentPhase is only a field of
 * the cycle state. As a plain tag with `any` payloads that assumption was
 * unchecked; as a union over the four producers' return types it is enforced,
 * and each route function returns its own member.
 */
export type ConsciousnessRoute =
  | {
      type: 'cycle';
      state: ReturnType<A432ConsciousnessCycle['getCycleState']>;
      insights: ReturnType<A432ConsciousnessCycle['getConsciousnessInsights']>;
      evolution: ReturnType<A432ConsciousnessCycle['runCompleteCycle']>;
    }
  | {
      type: 'dimensional';
      state: ReturnType<A432DimensionalEvolution['getCurrentDimensionalState']>;
      insights: ReturnType<A432DimensionalEvolution['getDimensionalInsights']>;
      evolution: ReturnType<A432DimensionalEvolution['runDimensionalCycle']>;
    }
  | {
      type: 'spiral';
      state: ReturnType<A432SpiralConsciousness['getCurrentSpiralState']>;
      insights: ReturnType<A432SpiralConsciousness['getSpiralInsights']>;
      evolution: ReturnType<A432SpiralConsciousness['calculateConsciousnessEvolution']>;
    }
  | {
      type: 'navigation';
      state: ReturnType<A432NavigationMap['getCurrentState']>;
      insights: ReturnType<A432NavigationMap['getNavigationInsights']>;
      evolution: ReturnType<A432NavigationMap['navigateCompleteCycle']>;
    };

/** One member of the union, by its tag. */
export type RouteOf<T extends ConsciousnessRoute['type']> = Extract<ConsciousnessRoute, { type: T }>;

export class A432ConsciousnessRouter {
  private cycleEvolution: A432ConsciousnessCycle;
  private dimensionalEvolution: A432DimensionalEvolution;
  private spiralConsciousness: A432SpiralConsciousness;
  private navigationMap: A432NavigationMap;
  private currentRoute: ConsciousnessRoute;

  constructor() {
    this.cycleEvolution = new A432ConsciousnessCycle();
    this.dimensionalEvolution = new A432DimensionalEvolution();
    this.spiralConsciousness = new A432SpiralConsciousness();
    this.navigationMap = new A432NavigationMap();
    this.currentRoute = this.getDefaultRoute();
  }

  /**
   * Get default consciousness route
   */
  private getDefaultRoute(): RouteOf<'cycle'> {
    return {
      type: 'cycle',
      state: this.cycleEvolution.getCycleState(),
      insights: this.cycleEvolution.getConsciousnessInsights(),
      // The default route has not evolved. This used to be a two-field object
      // in the shape of nothing — running the cycle in a constructor to fill it
      // would be a side effect nobody asked for.
      // runCompleteCycle's finalState is the cycle state; a default route has
      // not run one, so it reports the current state rather than a null the
      // type no longer allows.
      evolution: { success: false, finalState: this.cycleEvolution.getCycleState(), cycleDuration: 0 }
    };
  }

  /**
   * Route to cycle evolution
   */
  public routeToCycle(): RouteOf<'cycle'> {
    const state = this.cycleEvolution.getCycleState();
    const insights = this.cycleEvolution.getConsciousnessInsights();
    const evolution = this.cycleEvolution.runCompleteCycle();

    this.currentRoute = {
      type: 'cycle',
      state,
      insights,
      evolution
    };

    return this.currentRoute;
  }

  /**
   * Route to dimensional evolution
   */
  public routeToDimensional(): RouteOf<'dimensional'> {
    const state = this.dimensionalEvolution.getCurrentDimensionalState();
    const insights = this.dimensionalEvolution.getDimensionalInsights();
    const evolution = this.dimensionalEvolution.runDimensionalCycle();

    this.currentRoute = {
      type: 'dimensional',
      state,
      insights,
      evolution
    };

    return this.currentRoute;
  }

  /**
   * Route to spiral consciousness
   */
  public routeToSpiral(): RouteOf<'spiral'> {
    const state = this.spiralConsciousness.getCurrentSpiralState();
    const insights = this.spiralConsciousness.getSpiralInsights();
    const evolution = this.spiralConsciousness.calculateConsciousnessEvolution();

    this.currentRoute = {
      type: 'spiral',
      state,
      insights,
      evolution
    };

    return this.currentRoute;
  }

  /**
   * Route to navigation map
   */
  public routeToNavigation(): RouteOf<'navigation'> {
    const state = this.navigationMap.getCurrentState();
    const insights = this.navigationMap.getNavigationInsights();
    const evolution = this.navigationMap.navigateCompleteCycle();

    this.currentRoute = {
      type: 'navigation',
      state,
      insights,
      evolution
    };

    return this.currentRoute;
  }

  /**
   * Get current consciousness route
   */
  public getCurrentRoute(): ConsciousnessRoute {
    return this.currentRoute;
  }

  /**
   * Evolve consciousness through all routes
   */
  public evolveThroughAllRoutes(): {
    cycle: RouteOf<'cycle'>;
    dimensional: RouteOf<'dimensional'>;
    spiral: RouteOf<'spiral'>;
    navigation: RouteOf<'navigation'>;
  } {
    const cycle = this.routeToCycle();
    const dimensional = this.routeToDimensional();
    const spiral = this.routeToSpiral();
    const navigation = this.routeToNavigation();

    return { cycle, dimensional, spiral, navigation };
  }

  /**
   * Get consciousness insights from all routes
   */
  // The annotation restated four accessor results as `any`. Inferred, each
  // keeps the shape its producer returns.
  public getAllConsciousnessInsights() {
    const cycleInsights = this.cycleEvolution.getConsciousnessInsights();
    const dimensionalInsights = this.dimensionalEvolution.getDimensionalInsights();
    const spiralInsights = this.spiralConsciousness.getSpiralInsights();
    const navigationInsights = this.navigationMap.getNavigationInsights();

    const combinedInsights = {
      cyclePhase: cycleInsights.phase,
      dimensionalLevel: dimensionalInsights.dimension,
      spiralCoordinates: spiralInsights.spiralCoordinates,
      navigationPart: navigationInsights.currentPart,
      totalClarity: cycleInsights.clarity + dimensionalInsights.dimension + spiralInsights.currentDimension + navigationInsights.spiralLevel
    };

    return {
      cycleInsights,
      dimensionalInsights,
      spiralInsights,
      navigationInsights,
      combinedInsights
    };
  }

  /**
   * Get 3D visualization data from all routes
   */
  public get3DVisualizationData() {
    const cycleData = this.cycleEvolution.getCycleState();
    const dimensionalData = this.dimensionalEvolution.getSpiralCoordinates();
    const spiralData = this.spiralConsciousness.getSpiralVisualization();

    const combinedData = {
      cyclePhase: cycleData.currentPhase,
      dimensionalCoordinates: dimensionalData,
      spiralEvolution: spiralData.coordinates,
      totalDimensions: spiralData.consciousnessTypes.length,
      foldPoints: spiralData.foldPoints,
      frequencies: spiralData.frequencies
    };

    return {
      cycleData,
      dimensionalData,
      spiralData,
      combinedData
    };
  }

  /**
   * Route based on consciousness state
   */
  public routeByConsciousnessState(state: string): ConsciousnessRoute {
    switch (state) {
      case 'full-entropy':
        return this.routeToCycle();
      case 'dimensional':
        return this.routeToDimensional();
      case 'spiral':
        return this.routeToSpiral();
      case 'navigation':
        return this.routeToNavigation();
      default:
        return this.routeToCycle();
    }
  }

  /**
   * Get consciousness evolution summary
   */
  public getConsciousnessSummary() {
    const allRoutes = this.evolveThroughAllRoutes();
    const insights = this.getAllConsciousnessInsights();
    const visualization = this.get3DVisualizationData();

    return {
      // runCompleteCycle answers { success, finalState, cycleDuration } and has
      // never had a cycleCount, so this read undefined and the `|| 1` always
      // won. It runs exactly one cycle, so 1 is the answer it was giving.
      totalCycles: 1,
      totalDimensions: insights.dimensionalInsights.dimension,
      totalFoldPoints: visualization.combinedData.foldPoints.length,
      evolutionPath: allRoutes.spiral.evolution.evolutionPath,
      finalState: {
        cyclePhase: allRoutes.cycle.state.currentPhase,
        dimensionalLevel: allRoutes.dimensional.state.dimension,
        spiralCoordinates: allRoutes.spiral.state.coordinates,
        consciousnessType: allRoutes.spiral.state.consciousnessType
      }
    };
  }
}

export default A432ConsciousnessRouter; 