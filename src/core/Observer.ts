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

// Define types for observer data
export type ObserverInput = Record<string, string | number | boolean | undefined>;
export type ObserverState = Record<string, string | number | boolean | undefined>;
export type ObserverEvent = Record<string, string | number | boolean | undefined>;

export interface Observer {
  id: string;
  observe: (input: ObserverInput) => void;
  getState: () => ObserverState;
  setState: (state: ObserverState) => void;
  addObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: (event: ObserverEvent) => void;
  observers: Set<Observer>;
}

export function ObserverMixin<T extends object>(
  base: T,
  id?: string,
): T & Observer {
  const observers = new Set<Observer>();
  return Object.assign(base, {
    id: id || (base as Record<string, unknown>)['id'] as string || Math.random().toString(36).slice(2),
    observers,
    observe(input: ObserverInput) {
      // Default: log observation
      if (typeof (base as Record<string, unknown>)['onObserved'] === "function") {
        (base as Record<string, unknown> & { onObserved: (input: ObserverInput) => void }).onObserved(input);
      }
    },
    getState(): ObserverState {
      return { ...base } as ObserverState;
    },
    setState(state: ObserverState) {
      Object.assign(base, state);
    },
    addObserver(observer: Observer) {
      observers.add(observer);
    },
    removeObserver(observer: Observer) {
      observers.delete(observer);
    },
    notifyObservers(event: ObserverEvent) {
      observers.forEach((o) => o.observe(event));
    },
  });
}

// Optionally, a base class version
export class ObserverBase implements Observer {
  id: string;
  observers: Set<Observer> = new Set();
  constructor(id?: string) {
    this.id = id || Math.random().toString(36).slice(2);
  }
  observe(input: ObserverInput) {
    // Default: log observation
    this.onObserved(input);
  }
  onObserved(input: ObserverInput) {
    // Override in subclass for custom behavior
    console.log(`Observer ${this.id} observed:`, input);
  }
  getState(): ObserverState {
    return { ...this } as unknown as ObserverState;
  }
  setState(state: ObserverState) {
    Object.assign(this, state);
  }
  addObserver(observer: Observer) {
    this.observers.add(observer);
  }
  removeObserver(observer: Observer) {
    this.observers.delete(observer);
  }
  notifyObservers(event: ObserverEvent) {
    this.observers.forEach((o) => o.observe(event));
  }
  /**
   * Get awareness level (base returns 0 and false)
   */
  public getAwareness(): { level: number; isActive: boolean } {
    return {
      level: 0,
      isActive: false,
    };
  }
}

// Concrete Observer class for ZeroPoint
export class ConcreteObserver extends ObserverBase {
  public awarenessLevel: number = 0.5;
  public isActive: boolean = true;

  constructor(id?: string) {
    super(id);
  }

  /**
   * Get awareness level
   */
  public override getAwareness(): { level: number; isActive: boolean } {
    return {
      level: this.awarenessLevel,
      isActive: this.isActive,
    };
  }
}
