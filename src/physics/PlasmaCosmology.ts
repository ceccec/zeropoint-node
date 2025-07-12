/**
 * Plasma Cosmology System
 *
 * Implements the electric universe theory and plasma physics concepts
 * from the Black Whole documentary. Plasma is the fundamental state
 * of matter in the universe (99% of visible matter).
 *
 * Metaphysical Context:
 * - Plasma is consciousness in its most fundamental form
 * - Electric currents in space create galaxies and stars
 * - Birkeland currents are consciousness flow patterns
 * - The universe is 99% plasma, not empty space
 * - Plasma filaments create the cosmic web structure
 */

import { EventEmitter } from 'events';

export interface PlasmaFilament {
  id: string;
  strength: number;
  position: [number, number, number];
}

export interface BirkelandCurrent {
  id: string;
  intensity: number;
  direction: [number, number, number];
}

export interface PlasmaGalaxy {
  id: string;
  size: number;
  filaments: PlasmaFilament[];
}

export class PlasmaCosmology extends EventEmitter {
  private filaments: Map<string, PlasmaFilament> = new Map();
  private currents: Map<string, BirkelandCurrent> = new Map();
  private galaxies: Map<string, PlasmaGalaxy> = new Map();

  // Public property for birkelandCurrents
  public birkelandCurrents = this.currents;

  constructor() {
    super();
  }

  createPlasmaFilament(strength: number, position: [number, number, number]): PlasmaFilament {
    const id = `filament_${Date.now()}_${Math.random()}`;
    const filament: PlasmaFilament = {
      id,
      strength,
      position
    };
    
    this.filaments.set(id, filament);
    this.emit('plasma_filament_created', filament);
    
    return filament;
  }

  createBirkelandCurrent(intensity: number, direction: [number, number, number]): BirkelandCurrent {
    const id = `current_${Date.now()}_${Math.random()}`;
    const current: BirkelandCurrent = {
      id,
      intensity,
      direction
    };
    
    this.currents.set(id, current);
    this.emit('birkeland_current_created', current);
    
    return current;
  }

  createPlasmaGalaxy(size: number, filaments: PlasmaFilament[]): PlasmaGalaxy {
    const id = `galaxy_${Date.now()}_${Math.random()}`;
    const galaxy: PlasmaGalaxy = {
      id,
      size,
      filaments
    };
    
    this.galaxies.set(id, galaxy);
    this.emit('plasma_galaxy_created', galaxy);
    
    return galaxy;
  }

  getAllFilaments(): PlasmaFilament[] {
    return Array.from(this.filaments.values());
  }

  getAllCurrents(): BirkelandCurrent[] {
    return Array.from(this.currents.values());
  }

  getAllGalaxies(): PlasmaGalaxy[] {
    return Array.from(this.galaxies.values());
  }

  getPlasmaUniverseStats(): any {
    return {
      filaments: this.filaments.size,
      currents: this.currents.size,
      galaxies: this.galaxies.size,
      totalStrength: Array.from(this.filaments.values()).reduce((sum, f) => sum + f.strength, 0),
      totalIntensity: Array.from(this.currents.values()).reduce((sum, c) => sum + c.intensity, 0)
    };
  }

  getElectricUniversePrinciples(): any {
    return {
      principle1: "Electric currents flow through space",
      principle2: "Plasma filaments create cosmic structures",
      principle3: "Birkeland currents power galaxies",
      principle4: "Electric forces dominate over gravity"
    };
  }
} 