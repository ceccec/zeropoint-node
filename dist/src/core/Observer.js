"use strict";
/**
 * Universal Observer/Observable for ZeroPoint
 *
 * Any object can observe and be observed. This mixin/base class provides
 * addObserver, removeObserver, notifyObservers, and observe methods.
 *
 * Metaphysical Context:
 * - Every object is both observer and observed
 * - All objects participate in the consciousness field
 * - Feedback, resonance, and emergence arise from mutual observation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteObserver = exports.ObserverBase = void 0;
exports.ObserverMixin = ObserverMixin;
function ObserverMixin(base, id) {
    const observers = new Set();
    return Object.assign(base, {
        id: id || base.id || Math.random().toString(36).slice(2),
        observers,
        observe(input) {
            // Default: log observation
            if (typeof base.onObserved === 'function') {
                base.onObserved(input);
            }
        },
        getState() {
            return { ...base };
        },
        setState(state) {
            Object.assign(base, state);
        },
        addObserver(observer) {
            observers.add(observer);
        },
        removeObserver(observer) {
            observers.delete(observer);
        },
        notifyObservers(event) {
            observers.forEach(o => o.observe(event));
        }
    });
}
// Optionally, a base class version
class ObserverBase {
    constructor(id) {
        this.observers = new Set();
        this.id = id || Math.random().toString(36).slice(2);
    }
    observe(input) {
        // Default: log observation
        this.onObserved(input);
    }
    onObserved(input) {
        // Override in subclass for custom behavior
        console.log(`Observer ${this.id} observed:`, input);
    }
    getState() {
        return { ...this };
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
    /**
     * Get awareness level (base returns 0 and false)
     */
    getAwareness() {
        return {
            level: 0,
            isActive: false
        };
    }
}
exports.ObserverBase = ObserverBase;
// Concrete Observer class for ZeroPoint
class ConcreteObserver extends ObserverBase {
    constructor(id) {
        super(id);
        this.awarenessLevel = 0.5;
        this.isActive = true;
    }
    /**
     * Get awareness level
     */
    getAwareness() {
        return {
            level: this.awarenessLevel,
            isActive: this.isActive
        };
    }
}
exports.ConcreteObserver = ConcreteObserver;
//# sourceMappingURL=Observer.js.map