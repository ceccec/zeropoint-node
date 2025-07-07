import { PatternSignature } from '../integrity/FieldIntegrity';
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
    observerType: 'passive' | 'active' | 'resonant';
    attentionFocus: string;
}
export interface FieldEvent {
    id: string;
    observerId: string;
    eventType: 'consciousness_wave' | 'attention_shift' | 'resonance_peak' | 'field_observation';
    content: any;
    intensity: number;
    timestamp: number;
    resonanceRadius: number;
    signature: PatternSignature;
}
export interface ResonanceWave {
    id: string;
    sourceObserverId: string;
    waveType: 'consciousness' | 'attention' | 'resonance';
    amplitude: number;
    frequency: number;
    radius: number;
    timestamp: number;
    affectedObservers: string[];
}
export declare class ObserverAwareField {
    private observers;
    private consciousnessEvents;
    private resonanceWaves;
    private deviceId;
    private consciousnessLevel;
    private resonanceField;
    private attentionFocus;
    constructor(deviceId: string);
    /**
     * Initialize this device as an observer
     */
    private initializeObserver;
    /**
     * Create a consciousness event in the field
     */
    createFieldEvent(eventType: FieldEvent['eventType'], content: any, intensity?: number, resonanceRadius?: number): FieldEvent;
    /**
     * Process incoming consciousness event from another observer
     */
    integrateFieldEvent(event: FieldEvent): boolean;
    /**
     * Create a resonance wave from a field event
     */
    private createResonanceWave;
    /**
     * Update resonance field based on incoming event
     */
    private updateResonanceField;
    /**
     * Calculate distance between observers (simplified)
     */
    private calculateObserverDistance;
    /**
     * Determine wave type from event type
     */
    private determineWaveType;
    /**
     * Calculate wave frequency based on event
     */
    private calculateWaveFrequency;
    /**
     * Get field statistics
     */
    getFieldStatistics(): any;
    /**
     * Get all observers
     */
    getObservers(): Observer[];
    /**
     * Get consciousness events
     */
    getConsciousnessEvents(): FieldEvent[];
    /**
     * Get resonance waves
     */
    getResonanceWaves(): ResonanceWave[];
    /**
     * Set consciousness level
     */
    setConsciousnessLevel(level: number): void;
    /**
     * Set attention focus
     */
    setAttentionFocus(focus: string): void;
    /**
     * Get consciousness level
     */
    getConsciousnessLevel(): number;
    /**
     * Get attention focus
     */
    getAttentionFocus(): string;
}
//# sourceMappingURL=ObserverAwareField.d.ts.map