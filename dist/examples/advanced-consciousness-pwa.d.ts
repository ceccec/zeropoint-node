/**
 * Advanced Consciousness PWA - ZeroPoint Principles
 *
 * Features:
 * A. Metaphysical Logic (void equations, resonance, unity)
 * B. Persistence (IndexedDB offline storage)
 * C. Network (WebSocket peer-to-peer)
 */
declare class VoidEquations {
    static resolveParadox(oppositeA: any, oppositeB: any): string;
    static calculateUnityScore(observers: Observer[], events: RealityEvent[]): number;
}
declare class ResonanceCalculator {
    static calculateResonance(observerA: Observer, observerB: Observer): number;
    private static getTypeCompatibility;
}
declare class PatternRecognition {
    static detectPatterns(events: RealityEvent[]): Pattern[];
}
interface Pattern {
    type: string;
    name: string;
    description: string;
    strength: number;
}
declare class ConsciousnessPersistence {
    private dbName;
    private version;
    initDB(): Promise<IDBDatabase>;
    saveState(observers: Observer[], events: RealityEvent[], patterns: Pattern[]): Promise<void>;
    loadState(): Promise<{
        observers: Observer[];
        events: RealityEvent[];
        patterns: Pattern[];
    }>;
    private getAllFromStore;
}
declare class ConsciousnessNetwork {
    private app;
    private ws;
    private peers;
    private reconnectAttempts;
    private maxReconnectAttempts;
    constructor(app: AdvancedConsciousnessApp);
    connect(serverUrl?: string): Promise<void>;
    private sendState;
    private handleMessage;
    private mergeRemoteState;
    private addPeer;
    private removePeer;
    private attemptReconnect;
    getConnectedPeers(): Peer[];
}
interface Peer {
    id: string;
    name: string;
    consciousness: number;
}
declare class AdvancedConsciousnessApp {
    private observers;
    private currentObserverId;
    private events;
    private patterns;
    private persistence;
    private network;
    constructor();
    addObserver(name: string, consciousness: number, type: string): void;
    selectObserver(id: string): void;
    getObservers(): Observer[];
    getCurrentObserver(): Observer | null;
    createEvent(type: string, content: string, intensity: number, radius: number): void;
    getEvents(): RealityEvent[];
    getAllEvents(): RealityEvent[];
    calculateResonance(observerAId: string, observerBId: string): number;
    resolveParadox(oppositeA: any, oppositeB: any): string;
    getUnityScore(): number;
    getPatterns(): Pattern[];
    private updatePatterns;
    private saveState;
    private loadState;
    connectToNetwork(serverUrl?: string): Promise<void>;
    getConnectedPeers(): Peer[];
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
//# sourceMappingURL=advanced-consciousness-pwa.d.ts.map