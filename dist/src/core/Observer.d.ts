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
export declare function ObserverMixin<T extends object>(base: T, id?: string): T & Observer;
export declare class ObserverBase implements Observer {
    id: string;
    observers: Set<Observer>;
    constructor(id?: string);
    observe(input: any): void;
    onObserved(input: any): void;
    getState(): this;
    setState(state: any): void;
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(event: any): void;
}
//# sourceMappingURL=Observer.d.ts.map