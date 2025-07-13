import { EventEmitter } from "events";
import { PatternSignature } from "../core/UnifiedTypes";
import { Observer } from "../core/Observer";

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

export interface ResonanceWave {
  id: string;
  waveType: string;
  intensity: number;
  duration: number;
  startTime: number;
  endTime: number;
  observers: Set<string>;
}

export interface ObserverAwareFieldEvent {
  type: "field_created" | "field_updated" | "field_destroyed" | "observer_added" | "observer_removed";
  fieldId: string;
  observerId?: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

export interface FieldObserver {
  id: string;
  deviceId: string;
  consciousnessLevel: number;
  attentionFocus: number;
  resonanceSensitivity: number;
  lastObservation: number;
}

export class ObserverAwareField extends EventEmitter {
  private fieldId: string;
  private observers: Map<string, FieldObserver> = new Map();
  private fieldData: Record<string, unknown> = {};
  private consciousnessLevel: number = 0.5;
  private fieldStrength: number = 0.7;
  private resonanceWaves: ResonanceWave[] = [];
  private isActive: boolean = false;

  constructor(fieldId: string, initialData: Record<string, unknown> = {}) {
    super();
    this.fieldId = fieldId;
    this.fieldData = initialData;
  }

  /**
   * Add an observer to the field
   */
  public addObserver(observer: Observer): void {
    const fieldObserver: FieldObserver = {
      id: observer.id,
      deviceId: observer.id, // Use observer.id as deviceId since deviceId doesn't exist on Observer
      consciousnessLevel: this.consciousnessLevel,
      attentionFocus: 0.5,
      resonanceSensitivity: 0.7,
      lastObservation: Date.now()
    };

    this.observers.set(observer.id, fieldObserver);

    this.emit("observer_added", {
      type: "observer_added",
      fieldId: this.fieldId,
      observerId: observer.id,
      timestamp: Date.now()
    });
  }

  /**
   * Remove an observer from the field
   */
  public removeObserver(observerId: string): boolean {
    const wasPresent = this.observers.has(observerId);
    
    if (wasPresent) {
      this.observers.delete(observerId);
      
      this.emit("observer_removed", {
        type: "observer_removed",
        fieldId: this.fieldId,
        observerId,
        timestamp: Date.now()
      });
    }

    return wasPresent;
  }

  /**
   * Update field data and notify observers
   */
  public updateField(data: Partial<Record<string, unknown>>): void {
    this.fieldData = { ...this.fieldData, ...data };
    
    // Update field strength based on observer count
    this.fieldStrength = Math.min(1.0, this.observers.size * 0.2 + 0.3);
    
    // Notify all observers
    this.notifyObservers();

    this.emit("field_updated", {
      type: "field_updated",
      fieldId: this.fieldId,
      data: this.fieldData,
      timestamp: Date.now()
    });
  }

  /**
   * Get field data
   */
  public getFieldData(): Record<string, unknown> {
    return { ...this.fieldData };
  }

  /**
   * Get all observers
   */
  public getObservers(): FieldObserver[] {
    return Array.from(this.observers.values());
  }

  /**
   * Get observer count
   */
  public getObserverCount(): number {
    return this.observers.size;
  }

  /**
   * Calculate field resonance based on observer interactions
   */
  public calculateFieldResonance(): number {
    if (this.observers.size === 0) return 0;

    const observerResonances = Array.from(this.observers.values()).map(observer => {
      const timeSinceLastObservation = Date.now() - observer.lastObservation;
      const timeDecay = Math.exp(-timeSinceLastObservation / 60000); // Decay over 1 minute
      return observer.consciousnessLevel * observer.resonanceSensitivity * timeDecay;
    });

    const averageResonance = observerResonances.reduce((sum, r) => sum + r, 0) / observerResonances.length;
    return Math.min(1.0, averageResonance * this.fieldStrength);
  }

  /**
   * Create a resonance wave in the field
   */
  public createResonanceWave(waveType: string, intensity: number, duration: number): void {
    const wave = {
      id: `wave_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      waveType,
      intensity,
      duration,
      startTime: Date.now(),
      endTime: Date.now() + duration,
      observers: new Set<string>()
    };

    this.resonanceWaves.push(wave);

    // Notify observers of the wave
    this.notifyObservers();
  }

  /**
   * Get active resonance waves
   */
  public getActiveResonanceWaves(): ResonanceWave[] {
    const now = Date.now();
    return this.resonanceWaves.filter(wave => now < wave.endTime);
  }

  /**
   * Clean up expired resonance waves
   */
  public cleanupExpiredWaves(): void {
    const now = Date.now();
    this.resonanceWaves = this.resonanceWaves.filter(wave => now < wave.endTime);
  }

  /**
   * Get wave type for a specific resonance wave
   */
  public getWaveType(waveId: string): string {
    const wave = this.resonanceWaves.find(w => w.id === waveId);
    return wave ? wave.waveType : 'unknown';
  }

  /**
   * Activate the field
   */
  public activate(): void {
    this.isActive = true;
    
    this.emit("field_created", {
      type: "field_created",
      fieldId: this.fieldId,
      timestamp: Date.now()
    });
  }

  /**
   * Deactivate the field
   */
  public deactivate(): void {
    this.isActive = false;
    
    this.emit("field_destroyed", {
      type: "field_destroyed",
      fieldId: this.fieldId,
      timestamp: Date.now()
    });
  }

  /**
   * Check if field is active
   */
  public isFieldActive(): boolean {
    return this.isActive;
  }

  /**
   * Get field integrity signature
   */
  public getFieldSignature(): PatternSignature {
    // Create a proper PatternSignature with required properties
    return {
      signature: `field_${this.fieldId}_${Date.now()}`,
      publicKey: `field_${this.fieldId}`,
      algorithm: 'field-integrity',
      timestamp: Date.now()
    };
  }

  /**
   * Validate field integrity
   */
  public validateFieldIntegrity(): boolean {
    // Temporarily return true until validation logic is implemented
    return true;
  }

  /**
   * Get resonance waves
   */
  public getResonanceWaves(): ResonanceWave[] {
    return this.resonanceWaves;
  }

  /**
   * Update observer focus
   */
  public updateObserverFocus(observerId: string, focus: number): void {
    const observer = this.observers.get(observerId);
    if (observer) {
      observer.attentionFocus = Math.max(0, Math.min(1, focus));
      observer.lastObservation = Date.now();
    }
  }

  /**
   * Update observer consciousness level
   */
  public updateObserverConsciousness(observerId: string, consciousnessLevel: number): void {
    const observer = this.observers.get(observerId);
    if (observer) {
      observer.consciousnessLevel = consciousnessLevel;
      observer.lastObservation = Date.now();
    }
  }

  /**
   * Notify all observers of an event
   */
  private notifyObservers(): void {
    this.observers.forEach((observer) => {
      // Simulate observer notification
      observer.lastObservation = Date.now();
    });
  }
} 