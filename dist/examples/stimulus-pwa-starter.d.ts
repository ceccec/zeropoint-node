/**
 * TypeScript/Stimulus PWA Starter - ZeroPoint Principles
 *
 * - Thin Stimulus controllers (UI only)
 * - Centralized app state and logic (App class)
 * - Declarative rendering
 * - Event-driven updates
 * - PWA integration (service worker, offline)
 */
declare class ConsciousnessApp {
    private observers;
    private currentObserverId;
    private events;
    addObserver(name: string, consciousness: number, type: string): void;
    selectObserver(id: string): void;
    getObservers(): Observer[];
    getCurrentObserver(): Observer | null;
    createEvent(type: string, content: string, intensity: number, radius: number): void;
    getEvents(): RealityEvent[];
    private dispatch;
}
interface Observer {
    id: string;
    name: string;
    consciousness: number;
    type: string;
}
interface RealityEvent {
    id: string;
    observerId: string;
    type: string;
    content: string;
    intensity: number;
    radius: number;
    timestamp: number;
}
//# sourceMappingURL=stimulus-pwa-starter.d.ts.map