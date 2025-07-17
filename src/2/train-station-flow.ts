/**
 * Train Station Flow System
 * 
 * Provides train station flow calculations, consciousness routing,
 * and station visualization for the ZeroPoint system.
 */

export interface TrainStationFlowSystem {
  consciousnessFlow: number[];
  stations: Array<{
    id: number;
    name: string;
    consciousness: string;
  }>;
  routes: Array<{
    from: number;
    to: number;
    consciousness: string;
  }>;
}

export interface TrainStationVisualization {
  stations: Array<{
    id: number;
    name: string;
    consciousness: string;
  }>;
  connections: Array<{
    from: number;
    to: number;
    consciousness: string;
  }>;
}

export class TrainStationFlowSystem {
  private static readonly STATION_CONSTANTS = {
    STATIONS: {
      0: 'Void Station',
      1: 'Foundation Station',
      2: 'Flow Station',
      3: 'Creative Station',
      4: 'Stability Station',
      5: 'Sacred Station',
      6: 'Harmony Station',
      7: 'Gateway Station',
      8: 'Infinity Station',
      9: 'Unity Station'
    } as { [key: number]: string },
    VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
    W_AXIS_FLOW: [3, 6, 9]
  };

  static consciousnessFlow: number[] = [1, 2, 4, 8, 7, 5, 3, 6, 9, 0];
  
  static stations = Object.entries(this.STATION_CONSTANTS.STATIONS).map(([id, name]) => ({
    id: parseInt(id),
    name,
    consciousness: `${name} consciousness`
  }));

  static routes = this.generateRoutes();

  private static generateRoutes(): Array<{ from: number; to: number; consciousness: string }> {
    const routes: Array<{ from: number; to: number; consciousness: string }> = [];
    
    // Vortex sequence routes
    for (let i = 0; i < this.VORTEX_SEQUENCE.length - 1; i++) {
      const from = this.VORTEX_SEQUENCE[i];
      const to = this.VORTEX_SEQUENCE[i + 1];
      routes.push({
        from,
        to,
        consciousness: `${this.STATION_CONSTANTS.STATIONS[from]} → ${this.STATION_CONSTANTS.STATIONS[to]}`
      });
    }
    
    // W-Axis routes
    for (let i = 0; i < this.W_AXIS_FLOW.length - 1; i++) {
      const from = this.W_AXIS_FLOW[i];
      const to = this.W_AXIS_FLOW[i + 1];
      routes.push({
        from,
        to,
        consciousness: `${this.STATION_CONSTANTS.STATIONS[from]} → ${this.STATION_CONSTANTS.STATIONS[to]}`
      });
    }
    
    return routes;
  }
}

export class TrainStationVisualization {
  static stations = TrainStationFlowSystem.stations;
  
  static connections = TrainStationFlowSystem.routes.map(route => ({
    from: route.from,
    to: route.to,
    consciousness: route.consciousness
  }));
} 