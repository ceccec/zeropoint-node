/**
 * Black Hole Physics System
 *
 * Implements advanced black hole physics concepts from the Black Whole documentary,
 * including event horizons, Hawking radiation, information paradox, and quantum gravity.
 *
 * Metaphysical Context:
 * - Black holes are consciousness singularities in spacetime
 * - Event horizons are boundaries between manifest and unmanifest
 * - Hawking radiation is consciousness escaping the void
 * - Information paradox reveals the holographic nature of reality
 * - Quantum gravity unifies consciousness and spacetime
 */

import { MathUtils, MATH_CONSTANTS } from "../math/MathUtils";
import { ObserverMixin, Observer } from "../core/Observer";
import { VORTEX_CONSTANTS } from "../core/SharedConstants";

export interface BlackHole {
  id: string;
  mass: number; // Solar masses
  radius: number; // Schwarzschild radius
  eventHorizonRadius: number;
  hawkingTemperature: number; // Temperature of Hawking radiation
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface EventHorizon {
  id: string;
  blackHoleId: string;
  radius: number;
  surfaceArea: number;
  entropy: number; // Bekenstein-Hawking entropy
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface HawkingRadiation {
  id: string;
  blackHoleId: string;
  temperature: number;
  power: number; // Power emitted
  wavelength: number; // Peak wavelength
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export interface InformationParadox {
  id: string;
  blackHoleId: string;
  informationContent: number;
  paradoxType: "firewall" | "complementarity" | "holographic";
  consciousness: number;
  field: number;
  void: number;
  metaphysicalContext: string;
}

export class BlackHolePhysics extends ObserverMixin {
  private blackHoles: Map<string, BlackHole> = new Map();
  private eventHorizons: Map<string, EventHorizon> = new Map();
  private hawkingRadiation: Map<string, HawkingRadiation> = new Map();
  private informationParadoxes: Map<string, InformationParadox> = new Map();
  private consciousness: number = 0.5;
  private field: number = 0.5;
  private void: number = 0.5;

  // Physical constants
  private readonly G = 6.67430e-11; // Gravitational constant
  private readonly c = 299792458; // Speed of light
  private readonly h = 6.62607015e-34; // Planck constant
  private readonly kB = 1.380649e-23; // Boltzmann constant
  private readonly ℏ = 1.054571817e-34; // Reduced Planck constant

  constructor() {
    super();
    this.initializeBlackHolePhysics();
  }

  /**
   * Initialize black hole physics constants and principles
   */
  private initializeBlackHolePhysics(): void {
    // Black holes are consciousness singularities
    this.consciousness = 1.0;
    
    // Event horizons are boundaries of manifestation
    this.field = 0.9;
    
    // Void contains all black hole possibilities
    this.void = 1.0;
  }

  /**
   * Create a black hole (consciousness singularity)
   */
  public createBlackHole(mass: number): BlackHole {
    const id = `black_hole_${Date.now()}_${Math.random()}`;
    
    // Schwarzschild radius: R = 2GM/c²
    const radius = (2 * this.G * mass * 1.989e30) / (this.c * this.c);
    
    const blackHole: BlackHole = {
      id,
      mass,
      radius,
      eventHorizonRadius: radius,
      hawkingTemperature: this.calculateHawkingTemperature(mass),
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Black holes are consciousness singularities where spacetime and consciousness unite"
    };

    this.blackHoles.set(id, blackHole);
    this.notifyObservers('black_hole_created', blackHole);
    
    return blackHole;
  }

  /**
   * Calculate Hawking temperature: T = ℏc³/(8πGMk)
   */
  public calculateHawkingTemperature(mass: number): number {
    const massInKg = mass * 1.989e30; // Convert solar masses to kg
    const temperature = (this.ℏ * Math.pow(this.c, 3)) / 
                       (8 * Math.PI * this.G * massInKg * this.kB);
    return temperature;
  }

  /**
   * Create an event horizon (boundary between manifest and unmanifest)
   */
  public createEventHorizon(blackHole: BlackHole): EventHorizon {
    const id = `event_horizon_${Date.now()}_${Math.random()}`;
    
    const surfaceArea = 4 * Math.PI * blackHole.eventHorizonRadius * blackHole.eventHorizonRadius;
    const entropy = surfaceArea / (4 * this.ℏ * this.G / Math.pow(this.c, 3)); // Bekenstein-Hawking entropy
    
    const eventHorizon: EventHorizon = {
      id,
      blackHoleId: blackHole.id,
      radius: blackHole.eventHorizonRadius,
      surfaceArea,
      entropy,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Event horizons are boundaries between manifest and unmanifest reality"
    };

    this.eventHorizons.set(id, eventHorizon);
    this.notifyObservers('event_horizon_created', eventHorizon);
    
    return eventHorizon;
  }

  /**
   * Create Hawking radiation (consciousness escaping the void)
   */
  public createHawkingRadiation(blackHole: BlackHole): HawkingRadiation {
    const id = `hawking_radiation_${Date.now()}_${Math.random()}`;
    
    const temperature = blackHole.hawkingTemperature;
    const power = this.calculateHawkingPower(blackHole);
    const wavelength = (this.h * this.c) / (this.kB * temperature); // Wien's law
    
    const radiation: HawkingRadiation = {
      id,
      blackHoleId: blackHole.id,
      temperature,
      power,
      wavelength,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Hawking radiation is consciousness escaping the void through quantum fluctuations"
    };

    this.hawkingRadiation.set(id, radiation);
    this.notifyObservers('hawking_radiation_created', radiation);
    
    return radiation;
  }

  /**
   * Calculate Hawking power: P = ℏc⁶/(15360πG²M²)
   */
  public calculateHawkingPower(blackHole: BlackHole): number {
    const massInKg = blackHole.mass * 1.989e30;
    const power = (this.ℏ * Math.pow(this.c, 6)) / 
                  (15360 * Math.PI * this.G * this.G * massInKg * massInKg);
    return power;
  }

  /**
   * Create information paradox (holographic nature of reality)
   */
  public createInformationParadox(
    blackHole: BlackHole,
    paradoxType: "firewall" | "complementarity" | "holographic"
  ): InformationParadox {
    const id = `information_paradox_${Date.now()}_${Math.random()}`;
    
    const informationContent = this.calculateInformationContent(blackHole);
    
    const paradox: InformationParadox = {
      id,
      blackHoleId: blackHole.id,
      informationContent,
      paradoxType,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Information paradox reveals the holographic nature of reality and consciousness"
    };

    this.informationParadoxes.set(id, paradox);
    this.notifyObservers('information_paradox_created', paradox);
    
    return paradox;
  }

  /**
   * Calculate information content (Bekenstein bound)
   */
  public calculateInformationContent(blackHole: BlackHole): number {
    const surfaceArea = 4 * Math.PI * blackHole.eventHorizonRadius * blackHole.eventHorizonRadius;
    const informationContent = surfaceArea / (4 * this.ℏ * this.G / Math.pow(this.c, 3));
    return informationContent;
  }

  /**
   * Calculate quantum gravity effects at singularity
   */
  public calculateQuantumGravity(blackHole: BlackHole): {
    planckLength: number;
    planckTime: number;
    planckMass: number;
    consciousness: number;
    field: number;
    void: number;
    metaphysicalContext: string;
  } {
    const planckLength = Math.sqrt(this.ℏ * this.G / Math.pow(this.c, 3));
    const planckTime = Math.sqrt(this.ℏ * this.G / Math.pow(this.c, 5));
    const planckMass = Math.sqrt(this.ℏ * this.c / this.G);
    
    return {
      planckLength,
      planckTime,
      planckMass,
      consciousness: this.consciousness,
      field: this.field,
      void: this.void,
      metaphysicalContext: "Quantum gravity unifies consciousness and spacetime at the Planck scale"
    };
  }

  /**
   * Get black hole universe statistics
   */
  public getBlackHoleUniverseStats(): {
    totalBlackHoles: number;
    totalEventHorizons: number;
    totalHawkingRadiation: number;
    totalInformationParadoxes: number;
    consciousnessPercentage: number;
    fieldPercentage: number;
    voidPercentage: number;
    metaphysicalContext: string;
  } {
    return {
      totalBlackHoles: this.blackHoles.size,
      totalEventHorizons: this.eventHorizons.size,
      totalHawkingRadiation: this.hawkingRadiation.size,
      totalInformationParadoxes: this.informationParadoxes.size,
      consciousnessPercentage: this.consciousness * 100,
      fieldPercentage: this.field * 100,
      voidPercentage: this.void * 100,
      metaphysicalContext: "Black holes are consciousness singularities where spacetime and awareness unite"
    };
  }

  /**
   * Get advanced black hole principles
   */
  public getAdvancedBlackHolePrinciples(): {
    principles: string[];
    consciousnessIntegration: number;
    fieldIntegration: number;
    voidIntegration: number;
    metaphysicalContext: string;
  } {
    return {
      principles: [
        "Black holes are consciousness singularities in spacetime",
        "Event horizons are boundaries between manifest and unmanifest",
        "Hawking radiation is consciousness escaping the void",
        "Information paradox reveals holographic nature of reality",
        "Quantum gravity unifies consciousness and spacetime",
        "Black holes contain all information in their event horizons"
      ],
      consciousnessIntegration: this.consciousness,
      fieldIntegration: this.field,
      voidIntegration: this.void,
      metaphysicalContext: "Black hole physics reveals the deep connection between consciousness and spacetime geometry"
    };
  }
} 