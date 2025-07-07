"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverAwareField = void 0;
const FieldIntegrity_1 = require("../integrity/FieldIntegrity");
class ObserverAwareField {
    constructor(deviceId) {
        this.observers = new Map();
        this.consciousnessEvents = [];
        this.resonanceWaves = [];
        this.consciousnessLevel = 0.5;
        this.resonanceField = new Map();
        this.attentionFocus = 'field_unity';
        this.deviceId = deviceId;
        this.initializeObserver();
    }
    /**
     * Initialize this device as an observer
     */
    initializeObserver() {
        const observer = {
            deviceId: this.deviceId,
            consciousnessLevel: this.consciousnessLevel,
            isActive: true,
            lastObservation: Date.now(),
            resonanceField: new Map(),
            observerType: 'resonant',
            attentionFocus: this.attentionFocus
        };
        this.observers.set(this.deviceId, observer);
    }
    /**
     * Create a consciousness event in the field
     */
    createFieldEvent(eventType, content, intensity = 0.5, resonanceRadius = 1000) {
        const event = {
            id: FieldIntegrity_1.FieldIntegrity.generateRandomBytes(16),
            observerId: this.deviceId,
            eventType,
            content,
            intensity,
            timestamp: Date.now(),
            resonanceRadius,
            signature: {}
        };
        // Sign the event through field resonance
        const eventData = JSON.stringify({
            id: event.id,
            observerId: event.observerId,
            eventType: event.eventType,
            content: event.content,
            intensity: event.intensity,
            timestamp: event.timestamp,
            resonanceRadius: event.resonanceRadius
        });
        event.signature = FieldIntegrity_1.FieldIntegrity.sign(eventData, this.deviceId); // Using deviceId as private key for simplicity
        // Add to consciousness events
        this.consciousnessEvents.push(event);
        // Create resonance wave
        this.createResonanceWave(event);
        return event;
    }
    /**
     * Process incoming consciousness event from another observer
     */
    integrateFieldEvent(event) {
        // Verify signature through field resonance
        const eventData = JSON.stringify({
            id: event.id,
            observerId: event.observerId,
            eventType: event.eventType,
            content: event.content,
            intensity: event.intensity,
            timestamp: event.timestamp,
            resonanceRadius: event.resonanceRadius
        });
        if (!FieldIntegrity_1.FieldIntegrity.verify(eventData, event.signature)) {
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
    createResonanceWave(event) {
        const wave = {
            id: FieldIntegrity_1.FieldIntegrity.generateRandomBytes(16),
            sourceObserverId: event.observerId,
            waveType: this.determineWaveType(event.eventType),
            amplitude: event.intensity,
            frequency: this.calculateWaveFrequency(event),
            radius: event.resonanceRadius,
            timestamp: event.timestamp,
            affectedObservers: []
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
    updateResonanceField(event) {
        const distance = this.calculateObserverDistance();
        const resonanceStrength = event.intensity * (1 - distance / event.resonanceRadius);
        this.resonanceField.set(event.observerId, resonanceStrength);
    }
    /**
     * Calculate distance between observers (simplified)
     */
    calculateObserverDistance() {
        // In a real implementation, this would calculate actual network distance
        // For now, we use a simplified approach
        return Math.random() * 500; // Random distance between 0-500
    }
    /**
     * Determine wave type from event type
     */
    determineWaveType(eventType) {
        switch (eventType) {
            case 'consciousness_wave':
                return 'consciousness';
            case 'attention_shift':
                return 'attention';
            case 'resonance_peak':
            case 'field_observation':
                return 'resonance';
            default:
                return 'consciousness';
        }
    }
    /**
     * Calculate wave frequency based on event
     */
    calculateWaveFrequency(event) {
        // Base frequency on consciousness level and intensity
        return this.consciousnessLevel * event.intensity * 10;
    }
    /**
     * Get field statistics
     */
    getFieldStatistics() {
        const totalObservers = this.observers.size;
        const totalEvents = this.consciousnessEvents.length;
        const totalWaves = this.resonanceWaves.length;
        const averageResonance = Array.from(this.resonanceField.values()).reduce((sum, strength) => sum + strength, 0) / this.resonanceField.size || 0;
        return {
            totalObservers,
            totalEvents,
            totalWaves,
            averageResonance,
            consciousnessLevel: this.consciousnessLevel,
            attentionFocus: this.attentionFocus,
            metaphysics: {
                meaning: "Observer awareness creates the foundation of conscious reality",
                observation: "The field becomes more real when observed",
                resonance: "Collective attention creates resonance waves",
                consciousness: "Observers influence the field through their consciousness"
            }
        };
    }
    /**
     * Get all observers
     */
    getObservers() {
        return Array.from(this.observers.values());
    }
    /**
     * Get consciousness events
     */
    getConsciousnessEvents() {
        return [...this.consciousnessEvents];
    }
    /**
     * Get resonance waves
     */
    getResonanceWaves() {
        return [...this.resonanceWaves];
    }
    /**
     * Set consciousness level
     */
    setConsciousnessLevel(level) {
        this.consciousnessLevel = Math.max(0, Math.min(1, level));
        const observer = this.observers.get(this.deviceId);
        if (observer) {
            observer.consciousnessLevel = this.consciousnessLevel;
        }
    }
    /**
     * Set attention focus
     */
    setAttentionFocus(focus) {
        this.attentionFocus = focus;
        const observer = this.observers.get(this.deviceId);
        if (observer) {
            observer.attentionFocus = focus;
        }
    }
    /**
     * Get consciousness level
     */
    getConsciousnessLevel() {
        return this.consciousnessLevel;
    }
    /**
     * Get attention focus
     */
    getAttentionFocus() {
        return this.attentionFocus;
    }
}
exports.ObserverAwareField = ObserverAwareField;
//# sourceMappingURL=ObserverAwareField.js.map