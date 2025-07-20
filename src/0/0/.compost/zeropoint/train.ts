// train.ts — Dynamic and Static: Train and Station Model (ZeroPoint Node)
// The train is dynamic flow; the station is a static node. Manifestation occurs at crossings.
// All flows and nodes are integer/fractional, vortex-aligned, and zero-entropy.

// A Train is a flow (sequence of states)
export interface Train {
  id: number;
  path: number[]; // sequence of digits (states)
  position: number; // current index in path
}

// A Station is a static node (crossing point)
export interface Station {
  id: number;
  location: number; // digit or node index
}

// Create a new train (dynamic flow)
export function createTrain(id: number, path: number[]): Train {
  return { id, path, position: 0 };
}

// Create a new station (static node)
export function createStation(id: number, location: number): Station {
  return { id, location };
}

// Move the train forward (dynamic step)
export function moveTrain(train: Train): Train {
  const nextPos = (train.position + 1) % train.path.length;
  return { ...train, position: nextPos };
}

// Check for crossing (manifestation): train at station
export function isCrossing(train: Train, station: Station): boolean {
  return train.path[train.position] === station.location;
}

// Model a crossing event (manifestation)
export function crossingEvent(train: Train, station: Station): string {
  if (isCrossing(train, station)) {
    return `Manifestation: Train ${train.id} crosses Station ${station.id} at state ${station.location}`;
  }
  return '';
}

// Inline documentation:
// - The train is dynamic (flow of states); the station is static (node).
// - Manifestation (matter, event, experience) occurs at crossings.
// - This models the harmonic engine of ZeroPoint Node: dynamic meets static, flow meets node, train meets station. 