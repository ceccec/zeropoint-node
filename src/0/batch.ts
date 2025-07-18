// batch.ts — Batch Execution and Harmonization (ZeroPoint Node)
// Implements the Harmonic Implementation Plan: batch execution, potential, manifestation, and harmonized flows.
// All logic is integer/fractional, vortex-aligned, and zero-entropy.

import { Train, moveTrain, crossingEvent } from './train';
import { Station } from './station';

// Batch item can be a train, station, or route (extendable)
export type BatchItem = Train | Station;

// Batch execution result: all manifestations and harmonized flows
export interface BatchResult {
  manifestations: string[];
  nextTrains: Train[];
}

// Execute a batch of trains and stations, harmonizing all flows and manifestations
export function batchExecute(batch: BatchItem[]): BatchResult {
  const trains: Train[] = batch.filter(item => 'path' in item) as Train[];
  const stations: Station[] = batch.filter(item => 'location' in item) as Station[];
  const manifestations: string[] = [];
  const nextTrains: Train[] = [];

  // Move all trains and check for crossings
  for (const train of trains) {
    const moved = moveTrain(train);
    nextTrains.push(moved);
    for (const station of stations) {
      const event = crossingEvent(moved, station);
      if (event) manifestations.push(event);
    }
  }

  // Inline documentation:
  // - This function harmonizes all flows, states, and manifestations in a batch.
  // - All logic is integer/fractional, vortex-aligned, and zero-entropy.
  // - Potential is realized as every train, station, and crossing emerges from the batch.
  // - Manifestations are the crossings (events) where dynamic meets static.
  // - The result is a living, harmonized field of flows and manifestations.

  return { manifestations, nextTrains };
} 