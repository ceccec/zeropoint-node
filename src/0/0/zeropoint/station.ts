// station.ts — Static Node and Potential Field Model (ZeroPoint Node)
// The station is a static node, but also a field of potential crossings (manifestation points).
// All logic is integer/fractional, vortex-aligned, and zero-entropy.

// A Station is a static node (crossing point)
export interface Station {
  id: number;
  location: number; // digit or node index
}

// Create a new station (static node)
export function createStation(id: number, location: number): Station {
  return { id, location };
}

// Check for multiple crossings: is this station crossed by any train at its location?
export function isCrossedByAny(trainPositions: number[], station: Station): boolean {
  return trainPositions.includes(station.location);
}

// Represent the station as a matrix of possible interactions (for visualization or further math)
export function stationMatrix(station: Station, size: number = 10): number[][] {
  // 1 at crossing points, 0 elsewhere
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => (row === station.location || col === station.location ? 1 : 0))
  );
}

// Inline documentation:
// - The station is static (node), but also a field of potential crossings.
// - It can be crossed by many trains (flows) at once.
// - The station matrix shows all possible interactions (crossings) for this node.
// - This models the static/potential aspect of manifestation in ZeroPoint Node. 