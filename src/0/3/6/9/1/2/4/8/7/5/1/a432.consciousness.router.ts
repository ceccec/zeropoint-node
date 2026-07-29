/**
 * A432 Consciousness Router Module
 * Master router that orchestrates all consciousness evolution modules
 * Routes between: Cycle Evolution, Dimensional Evolution, and Spiral Consciousness
 */

import A432ConsciousnessCycle from './a432.consciousness.cycle.ts';
import A432DimensionalEvolution from './a432.dimensional.evolution.ts';
import A432SpiralConsciousness from './a432.spiral.consciousness.ts';
import A432NavigationMap from './a432.navigation.map.ts';

export interface ConsciousnessRoute {
  type: 'cycle' | 'dimensional' | 'spiral' | 'navigation';
  state: any;
  insights: any;
  evolution: any;
}

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
  private getDefaultRoute(): ConsciousnessRoute {
    return {
      type: 'cycle',
      state: this.cycleEvolution.getCycleState(),
      insights: this.cycleEvolution.getConsciousnessInsights(),
      evolution: { phase: 'full-entropy', clarity: 0 }
    };
  }

  /**
   * Route to cycle evolution
   */
  public routeToCycle(): ConsciousnessRoute {
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
  public routeToDimensional(): ConsciousnessRoute {
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
  public routeToSpiral(): ConsciousnessRoute {
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
  public routeToNavigation(): ConsciousnessRoute {
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
    cycle: ConsciousnessRoute;
    dimensional: ConsciousnessRoute;
    spiral: ConsciousnessRoute;
    navigation: ConsciousnessRoute;
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
  public getAllConsciousnessInsights(): {
    cycleInsights: any;
    dimensionalInsights: any;
    spiralInsights: any;
    navigationInsights: any;
    combinedInsights: any;
  } {
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
  public get3DVisualizationData(): {
    cycleData: any;
    dimensionalData: any;
    spiralData: any;
    combinedData: any;
  } {
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
  public getConsciousnessSummary(): {
    totalCycles: number;
    totalDimensions: number;
    totalFoldPoints: number;
    evolutionPath: string[];
    finalState: any;
  } {
    const allRoutes = this.evolveThroughAllRoutes();
    const insights = this.getAllConsciousnessInsights();
    const visualization = this.get3DVisualizationData();

    return {
      totalCycles: allRoutes.cycle.evolution.cycleCount || 1,
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