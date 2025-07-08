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

export interface Observer {
  id: string;
  observe: (input: any) => void;
  getState: () => any;
  setState: (state: any) => void;
  addObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: (event: any) => void;
  observers: Set<Observer>;
}

export function ObserverMixin<T extends object>(
  base: T,
  id?: string,
): T & Observer {
  const observers = new Set<Observer>();
  return Object.assign(base, {
    id: id || (base as any).id || Math.random().toString(36).slice(2),
    observers,
    observe(input: any) {
      // Default: log observation
      if (typeof (base as any).onObserved === "function") {
        (base as any).onObserved(input);
      }
    },
    getState() {
      return { ...base };
    },
    setState(state: any) {
      Object.assign(base, state);
    },
    addObserver(observer: Observer) {
      observers.add(observer);
    },
    removeObserver(observer: Observer) {
      observers.delete(observer);
    },
    notifyObservers(event: any) {
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
  observe(input: any) {
    // Default: log observation
    this.onObserved(input);
  }
  onObserved(input: any) {
    // Override in subclass for custom behavior
    console.log(`Observer ${this.id} observed:`, input);
  }
  getState() {
    return { ...this };
  }
  setState(state: any) {
    Object.assign(this, state);
  }
  addObserver(observer: Observer) {
    this.observers.add(observer);
  }
  removeObserver(observer: Observer) {
    this.observers.delete(observer);
  }
  notifyObservers(event: any) {
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
