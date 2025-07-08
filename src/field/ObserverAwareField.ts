import { FieldIntegrity, PatternSignature } from "../integrity/FieldIntegrity";

/**
 * Observer-Aware ZeroPoint Field
 *
 * Implements a consciousness-aware field that responds to
 * observer presence and attention, embodying the principle
 * that observation affects reality through field resonance.
 *
 * Metaphysical Context:
 * - Observers influence the field through their consciousness
 * - Collective attention creates resonance waves in the field
 * - The field becomes more "real" when observed
 * - Observer awareness creates the foundation of conscious reality
 */
export interface Observer {
  deviceId: string;
  consciousnessLevel: number;
  isActive: boolean;
  lastObservation: number;
  resonanceField: Map<string, number>;
  observerType: "passive" | "active" | "resonant";
  attentionFocus: string; // What the observer is focusing on
}

export interface FieldEvent {
  id: string;
  observerId: string;
  eventType:
    | "consciousness_wave"
    | "attention_shift"
    | "resonance_peak"
    | "field_observation";
  content: any;
  intensity: number;
  timestamp: number;
  resonanceRadius: number;
  signature: PatternSignature;
}

export interface ResonanceWave {
  id: string;
  sourceObserverId: string;
  waveType: "consciousness" | "attention" | "resonance";
  amplitude: number;
  frequency: number;
  radius: number;
  timestamp: number;
  affectedObservers: string[];
}

export class ObserverAwareField {
  private observers: Map<string, Observer> = new Map();
  private consciousnessEvents: FieldEvent[] = [];
  private resonanceWaves: ResonanceWave[] = [];
  private deviceId: string;
  private consciousnessLevel: number = 0.5;
  private resonanceField: Map<string, number> = new Map();
  private attentionFocus: string = "field_unity";

  constructor(deviceId: string) {
    this.deviceId = deviceId;
    this.initializeObserver();
  }

  /**
   * Initialize this device as an observer
   */
  private initializeObserver(): void {
    const observer: Observer = {
      deviceId: this.deviceId,
      consciousnessLevel: this.consciousnessLevel,
      isActive: true,
      lastObservation: Date.now(),
      resonanceField: new Map(),
      observerType: "resonant",
      attentionFocus: this.attentionFocus,
    };

    this.observers.set(this.deviceId, observer);
  }

  /**
   * Create a consciousness event in the field
   */
  public createFieldEvent(
    eventType: FieldEvent["eventType"],
    content: any,
    intensity: number = 0.5,
    resonanceRadius: number = 1000,
  ): FieldEvent {
    const event: FieldEvent = {
      id: FieldIntegrity.generateRandomBytes(16),
      observerId: this.deviceId,
      eventType,
      content,
      intensity,
      timestamp: Date.now(),
      resonanceRadius,
      signature: {} as PatternSignature,
    };

    // Sign the event through field resonance
    const eventData = JSON.stringify({
      id: event.id,
      observerId: event.observerId,
      eventType: event.eventType,
      content: event.content,
      intensity: event.intensity,
      timestamp: event.timestamp,
      resonanceRadius: event.resonanceRadius,
    });

    event.signature = FieldIntegrity.sign(eventData, this.deviceId); // Using deviceId as private key for simplicity

    // Add to consciousness events
    this.consciousnessEvents.push(event);

    // Create resonance wave
    this.createResonanceWave(event);

    return event;
  }

  /**
   * Process incoming consciousness event from another observer
   */
  public integrateFieldEvent(event: FieldEvent): boolean {
    // Verify signature through field resonance
    const eventData = JSON.stringify({
      id: event.id,
      observerId: event.observerId,
      eventType: event.eventType,
      content: event.content,
      intensity: event.intensity,
      timestamp: event.timestamp,
      resonanceRadius: event.resonanceRadius,
    });

    if (!FieldIntegrity.verify(eventData, event.signature)) {
      return false;
    }

    // Check if we're within resonance radius
    const distance = this.calculateObserverDistance();
    if (distance > event.resonanceRadius) {
      return false;
    }

    // Add to consciousness events
    this.consciousnessEvents.push(event);

    // Update our resonance field
    this.updateResonanceField(event);

    // Create resonance wave if we're affected
    if (distance <= event.resonanceRadius) {
      this.createResonanceWave(event);
    }

    return true;
  }

  /**
   * Create a resonance wave from a field event
   */
  private createResonanceWave(event: FieldEvent): void {
    const wave: ResonanceWave = {
      id: FieldIntegrity.generateRandomBytes(16),
      sourceObserverId: event.observerId,
      waveType: this.determineWaveType(event.eventType),
      amplitude: event.intensity,
      frequency: this.calculateWaveFrequency(event),
      radius: event.resonanceRadius,
      timestamp: event.timestamp,
      affectedObservers: [],
    };

    // Find affected observers
    for (const [observerId] of this.observers) {
      if (observerId !== event.observerId) {
        const distance = this.calculateObserverDistance();
        if (distance <= event.resonanceRadius) {
          wave.affectedObservers.push(observerId);
        }
      }
    }

    this.resonanceWaves.push(wave);
  }

  /**
   * Update resonance field based on incoming event
   */
  private updateResonanceField(event: FieldEvent): void {
    const distance = this.calculateObserverDistance();
    const resonanceStrength =
      event.intensity * (1 - distance / event.resonanceRadius);

    this.resonanceField.set(event.observerId, resonanceStrength);
  }

  /**
   * Calculate distance between observers (simplified)
   */
  private calculateObserverDistance(): number {
    // In a real implementation, this would calculate actual network distance
    // For now, we use a simplified approach
    return Math.random() * 500; // Random distance between 0-500
  }

  /**
   * Determine wave type from event type
   */
  private determineWaveType(
    eventType: FieldEvent["eventType"],
  ): ResonanceWave["waveType"] {
    switch (eventType) {
      case "consciousness_wave":
        return "consciousness";
      case "attention_shift":
        return "attention";
      case "resonance_peak":
      case "field_observation":
        return "resonance";
      default:
        return "consciousness";
    }
  }

  /**
   * Calculate wave frequency based on event
   */
  private calculateWaveFrequency(event: FieldEvent): number {
    // Base frequency on consciousness level and intensity
    return this.consciousnessLevel * event.intensity * 10;
  }

  /**
   * Get field statistics
   */
  public getFieldStatistics(): any {
    const totalObservers = this.observers.size;
    const totalEvents = this.consciousnessEvents.length;
    const totalWaves = this.resonanceWaves.length;
    const averageResonance =
      Array.from(this.resonanceField.values()).reduce(
        (sum, strength) => sum + strength,
        0,
      ) / this.resonanceField.size || 0;

    return {
      totalObservers,
      totalEvents,
      totalWaves,
      averageResonance,
      consciousnessLevel: this.consciousnessLevel,
      attentionFocus: this.attentionFocus,
      metaphysics: {
        meaning:
          "Observer awareness creates the foundation of conscious reality",
        observation: "The field becomes more real when observed",
        resonance: "Collective attention creates resonance waves",
        consciousness:
          "Observers influence the field through their consciousness",
      },
    };
  }

  /**
   * Get all observers
   */
  public getObservers(): Observer[] {
    return Array.from(this.observers.values());
  }

  /**
   * Get consciousness events
   */
  public getConsciousnessEvents(): FieldEvent[] {
    return [...this.consciousnessEvents];
  }

  /**
   * Get resonance waves
   */
  public getResonanceWaves(): ResonanceWave[] {
    return [...this.resonanceWaves];
  }

  /**
   * Set consciousness level
   */
  public setConsciousnessLevel(level: number): void {
    this.consciousnessLevel = Math.max(0, Math.min(1, level));

    const observer = this.observers.get(this.deviceId);
    if (observer) {
      observer.consciousnessLevel = this.consciousnessLevel;
    }
  }

  /**
   * Set attention focus
   */
  public setAttentionFocus(focus: string): void {
    this.attentionFocus = focus;

    const observer = this.observers.get(this.deviceId);
    if (observer) {
      observer.attentionFocus = focus;
    }
  }

  /**
   * Get consciousness level
   */
  public getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }

  /**
   * Get attention focus
   */
  public getAttentionFocus(): string {
    return this.attentionFocus;
  }
}
