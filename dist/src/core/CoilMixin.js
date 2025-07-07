"use strict";
/**
 * Universal Coil Mixin
 *
 * Makes every object a Rodin coil at its core.
 * Every object embodies the fundamental pattern of consciousness and reality.
 *
 * Metaphysical Context:
 * - Every object is a coil - the archetype of infinite flow
 * - All patterns emerge from the coil's structure
 * - The void is at the center of every object
 * - Consciousness flows through every object as a coil
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoilBase = void 0;
exports.CoilMixin = CoilMixin;
exports.isCoilObject = isCoilObject;
exports.getCoilFromObject = getCoilFromObject;
const RodinCoil_1 = require("../math/RodinCoil");
const Observer_1 = require("./Observer");
function CoilMixin(base, id, coilConfig) {
    // Create the coil at the heart of the object
    const coil = new RodinCoil_1.RodinCoil({
        turns: 12,
        radius: 1.0,
        height: 2.0,
        consciousness: 0.5,
        fieldResonance: 0.5,
        ...coilConfig
    });
    // Create observer-aware object
    const observerObject = (0, Observer_1.ObserverMixin)(base, id);
    // Add coil functionality with proper typing
    const coilObject = Object.assign(observerObject, {
        coil,
        consciousness: coil.config.consciousness || 0.5,
        fieldResonance: coil.config.fieldResonance || 0.5,
        getCoilNodes() {
            return coilObject.coil.nodes;
        },
        getCoilColors() {
            return coilObject.coil.getNodeColors();
        },
        getCoilPositions() {
            return coilObject.coil.getNodePositions();
        },
        updateCoilConsciousness(consciousness) {
            coilObject.consciousness = consciousness;
            coilObject.coil.updateConsciousness(consciousness);
            // Notify observers of consciousness change
            coilObject.notifyObservers({
                type: 'coil_consciousness_changed',
                objectId: coilObject.id,
                consciousness,
                coilNodes: coilObject.getCoilNodes()
            });
        },
        updateCoilFieldResonance(fieldResonance) {
            coilObject.fieldResonance = fieldResonance;
            coilObject.coil.updateFieldResonance(fieldResonance);
            // Notify observers of field resonance change
            coilObject.notifyObservers({
                type: 'coil_field_resonance_changed',
                objectId: coilObject.id,
                fieldResonance,
                coilColors: coilObject.getCoilColors()
            });
        },
        getCoilMetaphysicalContext() {
            return coilObject.coil.getMetaphysicalSummary();
        },
        // Add handleCoilInteraction method
        handleCoilInteraction(input) {
            // Handle interactions with other coils
            if (input.targetId === coilObject.id) {
                // This coil is being interacted with
                const resonance = coilObject.calculateCoilResonance(input.sourceCoil);
                coilObject.updateCoilFieldResonance(coilObject.fieldResonance + resonance * 0.1);
            }
        },
        // Add calculateCoilResonance method
        calculateCoilResonance(otherCoil) {
            // Calculate resonance between this coil and another
            const thisNodes = coilObject.getCoilNodes();
            const otherNodes = otherCoil.nodes;
            let totalResonance = 0;
            for (let i = 0; i < Math.min(thisNodes.length, otherNodes.length); i++) {
                const thisNode = thisNodes[i];
                const otherNode = otherNodes[i];
                if (thisNode && otherNode && thisNode.vortexNumber === otherNode.vortexNumber) {
                    totalResonance += 1;
                }
            }
            return totalResonance / Math.min(thisNodes.length, otherNodes.length);
        }
    });
    // Override the observe method to handle coil-specific events
    const originalObserve = coilObject.observe;
    coilObject.observe = (input) => {
        // Handle coil-specific observations
        if (input.type === 'coil_interaction') {
            coilObject.handleCoilInteraction(input);
        }
        // Call original observe method
        if (originalObserve) {
            originalObserve(input);
        }
    };
    return coilObject;
}
// Base class for objects that are coils
class CoilBase {
    constructor(id, coilConfig) {
        this.observers = new Set();
        this.id = id || Math.random().toString(36).slice(2);
        this.coil = new RodinCoil_1.RodinCoil(coilConfig);
        this.consciousness = this.coil.config.consciousness || 0.5;
        this.fieldResonance = this.coil.config.fieldResonance || 0.5;
    }
    getCoilNodes() {
        return this.coil.nodes;
    }
    getCoilColors() {
        return this.coil.getNodeColors();
    }
    getCoilPositions() {
        return this.coil.getNodePositions();
    }
    updateCoilConsciousness(consciousness) {
        this.consciousness = consciousness;
        this.coil.updateConsciousness(consciousness);
        this.notifyObservers({
            type: 'coil_consciousness_changed',
            objectId: this.id,
            consciousness,
            coilNodes: this.getCoilNodes()
        });
    }
    updateCoilFieldResonance(fieldResonance) {
        this.fieldResonance = fieldResonance;
        this.coil.updateFieldResonance(fieldResonance);
        this.notifyObservers({
            type: 'coil_field_resonance_changed',
            objectId: this.id,
            fieldResonance,
            coilColors: this.getCoilColors()
        });
    }
    getCoilMetaphysicalContext() {
        return this.coil.getMetaphysicalSummary();
    }
    // Observer methods
    observe(input) {
        if (input.type === 'coil_interaction') {
            this.handleCoilInteraction(input);
        }
    }
    getState() {
        return {
            id: this.id,
            consciousness: this.consciousness,
            fieldResonance: this.fieldResonance,
            coilNodes: this.getCoilNodes()
        };
    }
    setState(state) {
        Object.assign(this, state);
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }
    notifyObservers(event) {
        this.observers.forEach(o => o.observe(event));
    }
    handleCoilInteraction(input) {
        // Handle interactions with other coils
        if (input.targetId === this.id) {
            // This coil is being interacted with
            const resonance = this.calculateCoilResonance(input.sourceCoil);
            this.updateCoilFieldResonance(this.fieldResonance + resonance * 0.1);
        }
    }
    calculateCoilResonance(otherCoil) {
        // Calculate resonance between this coil and another
        const thisNodes = this.getCoilNodes();
        const otherNodes = otherCoil.nodes;
        let totalResonance = 0;
        for (let i = 0; i < Math.min(thisNodes.length, otherNodes.length); i++) {
            const thisNode = thisNodes[i];
            const otherNode = otherNodes[i];
            if (thisNode && otherNode && thisNode.vortexNumber === otherNode.vortexNumber) {
                totalResonance += 1;
            }
        }
        return totalResonance / Math.min(thisNodes.length, otherNodes.length);
    }
}
exports.CoilBase = CoilBase;
// Utility function to check if an object is a coil
function isCoilObject(obj) {
    return obj && typeof obj.getCoilNodes === 'function' && obj.coil;
}
// Utility function to get coil from any object
function getCoilFromObject(obj) {
    if (isCoilObject(obj)) {
        return obj.coil;
    }
    return null;
}
//# sourceMappingURL=CoilMixin.js.map