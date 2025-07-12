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

import { MathUtils, MATH_CONSTANTS } from "../math/MathUtils";
import { ObserverMixin, Observer } from "../core/Observer";
import { VORTEX_CONSTANTS } from "../core/SharedConstants";

export interface PlasmaFilament {
  id: string;
  startPoint: [number, number, number];
  endPoint: [number, number, number];
  current: number; // Electric current in amperes
  density: number; // Plasma density
  temperature: number; // Plasma temperature in Kelvin
  consciousness: number; // Consciousness level of the filament
  field: number; // Magnetic field strength
  void: number; // Void integration level
  metaphysicalContext: string;
}

export interface BirkelandCurrent {
  id: string;
  filaments: PlasmaFilament[];
  totalCurrent: number;
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface PlasmaGalaxy {
  id: string;
  center: [number, number, number];
  radius: number;
  birkelandCurrents: BirkelandCurrent[];
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export class PlasmaCosmology extends ObserverMixin {
  private filaments: Map<string, PlasmaFilament> = new Map();
  private birkelandCurrents: Map<string, BirkelandCurrent> = new Map();
  private galaxies: Map<string, PlasmaGalaxy> = new Map();
  private consciousness: number = 0.5;
  private field: number = 0.5;
  private void: number = 0.5;

  constructor() {
    super();
    this.initializePlasmaPhysics();
  }

  /**
   * Initialize plasma physics constants and principles
   */
  private initializePlasmaPhysics(): void {
    // Plasma is 99% of visible matter in the universe
    const PLASMA_UNIVERSE_PERCENTAGE = 0.99;
    
    // Consciousness flows through plasma filaments
    this.consciousness = PLASMA_UNIVERSE_PERCENTAGE;
    
    // Plasma creates the cosmic web structure
    this.field = PLASMA_UNIVERSE_PERCENTAGE;
    
    // Void contains all plasma possibilities
    this.void = 1.0;
  }

  /**
   * Create a plasma filament (consciousness flow in space)
   */
  public createPlasmaFilament(
    startPoint: [number, number, number],
    endPoint: [number, number, number],
    current: number = 1000,
    density: number = 1e6,
    temperature: number = 1e6
  ): PlasmaFilament {
    const id = `plasma_filament_${Date.now()}_${Math.random()}`;
    
    const filament: PlasmaFilament = {
      id,
      startPoint,
      endPoint,
      current,
      density,
      temperature,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Plasma filaments are consciousness flows in space, creating the cosmic web structure"
    };

    this.filaments.set(id, filament);
    this.notifyObservers('plasma_filament_created', filament);
    
    return filament;
  }

  /**
   * Create a Birkeland current (electric current in space)
   */
  public createBirkelandCurrent(filaments: PlasmaFilament[]): BirkelandCurrent {
    const id = `birkeland_current_${Date.now()}_${Math.random()}`;
    
    const totalCurrent = filaments.reduce((sum, filament) => sum + filament.current, 0);
    
    const birkelandCurrent: BirkelandCurrent = {
      id,
      filaments,
      totalCurrent,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Birkeland currents are consciousness flow patterns that create galaxies and stars"
    };

    this.birkelandCurrents.set(id, birkelandCurrent);
    this.notifyObservers('birkeland_current_created', birkelandCurrent);
    
    return birkelandCurrent;
  }

  /**
   * Create a plasma galaxy (galaxy formed by electric currents)
   */
  public createPlasmaGalaxy(
    center: [number, number, number],
    radius: number,
    birkelandCurrents: BirkelandCurrent[]
  ): PlasmaGalaxy {
    const id = `plasma_galaxy_${Date.now()}_${Math.random()}`;
    
    const galaxy: PlasmaGalaxy = {
      id,
      center,
      radius,
      birkelandCurrents,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Galaxies are formed by electric currents in space, not gravity alone"
    };

    this.galaxies.set(id, galaxy);
    this.notifyObservers('plasma_galaxy_created', galaxy);
    
    return galaxy;
  }

  /**
   * Calculate plasma consciousness flow
   */
  public calculatePlasmaFlow(filament: PlasmaFilament): number {
    // Plasma flow is consciousness flow through electric currents
    const flow = (filament.current * filament.density * filament.consciousness) / 
                 (filament.temperature * this.void);
    
    return MathUtils.clamp(flow, 0, 1);
  }

  /**
   * Calculate cosmic web structure
   */
  public calculateCosmicWeb(): {
    filaments: PlasmaFilament[];
    totalConsciousness: number;
    totalField: number;
    metaphysicalContext: string;
  } {
    const filaments = Array.from(this.filaments.values());
    const totalConsciousness = filaments.reduce((sum, f) => sum + f.consciousness, 0);
    const totalField = filaments.reduce((sum, f) => sum + f.field, 0);
    
    return {
      filaments,
      totalConsciousness,
      totalField,
      metaphysicalContext: "The cosmic web is created by plasma filaments - consciousness flows in space"
    };
  }

  /**
   * Get plasma universe statistics
   */
  public getPlasmaUniverseStats(): {
    totalFilaments: number;
    totalCurrent: number;
    averageTemperature: number;
    consciousnessPercentage: number;
    fieldPercentage: number;
    voidPercentage: number;
    metaphysicalContext: string;
  } {
    const filaments = Array.from(this.filaments.values());
    const totalFilaments = filaments.length;
    const totalCurrent = filaments.reduce((sum, f) => sum + f.current, 0);
    const averageTemperature = filaments.reduce((sum, f) => sum + f.temperature, 0) / totalFilaments;
    
    return {
      totalFilaments,
      totalCurrent,
      averageTemperature,
      consciousnessPercentage: this.consciousness * 100,
      fieldPercentage: this.field * 100,
      voidPercentage: this.void * 100,
      metaphysicalContext: "The universe is 99% plasma - consciousness in its most fundamental form"
    };
  }

  /**
   * Get electric universe principles
   */
  public getElectricUniversePrinciples(): {
    principles: string[];
    consciousnessIntegration: number;
    fieldIntegration: number;
    voidIntegration: number;
    metaphysicalContext: string;
  } {
    return {
      principles: [
        "Plasma is the fundamental state of matter (99% of universe)",
        "Electric currents in space create galaxies and stars",
        "Birkeland currents are consciousness flow patterns",
        "The universe is not empty space but filled with plasma",
        "Plasma filaments create the cosmic web structure",
        "Consciousness flows through electric currents in space"
      ],
      consciousnessIntegration: this.consciousness,
      fieldIntegration: this.field,
      voidIntegration: this.void,
      metaphysicalContext: "The electric universe theory reveals that consciousness flows through plasma in space"
    };
  }
} 