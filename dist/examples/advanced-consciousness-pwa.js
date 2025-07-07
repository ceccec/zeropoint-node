"use strict";
/**
 * Advanced Consciousness PWA - ZeroPoint Principles
 *
 * Features:
 * A. Metaphysical Logic (void equations, resonance, unity)
 * B. Persistence (IndexedDB offline storage)
 * C. Network (WebSocket peer-to-peer)
 */
// ============================================================================
// A. METAPHYSICAL LOGIC
// ============================================================================
// Void Equations for paradox resolution
class VoidEquations {
    static resolveParadox(oppositeA, oppositeB) {
        const voidEquations = [
            'Empty = Void = Full',
            'False = Void = True',
            'Right = Void = Wrong',
            'Good = Void = Bad',
            'One = Void = Many',
            'Past = Void = Future'
        ];
        const equation = voidEquations[Math.floor(Math.random() * voidEquations.length)];
        return `${oppositeA} = Void = ${oppositeB} (${equation})`;
    }
    static calculateUnityScore(observers, events) {
        if (observers.length === 0)
            return 0;
        // Unity based on consciousness levels and event harmony
        const avgConsciousness = observers.reduce((sum, o) => sum + o.consciousness, 0) / observers.length;
        const eventHarmony = events.length > 0 ? events.reduce((sum, e) => sum + e.intensity, 0) / events.length : 0;
        return Math.min(1, (avgConsciousness + eventHarmony) / 2);
    }
}
// Resonance calculation between observers
class ResonanceCalculator {
    static calculateResonance(observerA, observerB) {
        const consciousnessDiff = Math.abs(observerA.consciousness - observerB.consciousness);
        const typeCompatibility = this.getTypeCompatibility(observerA.type, observerB.type);
        // Higher consciousness similarity and type compatibility = higher resonance
        return Math.max(0, 1 - consciousnessDiff) * typeCompatibility;
    }
    static getTypeCompatibility(typeA, typeB) {
        const compatibilityMatrix = {
            'active': { 'active': 0.8, 'passive': 0.6, 'resonant': 0.9 },
            'passive': { 'active': 0.6, 'passive': 0.7, 'resonant': 0.8 },
            'resonant': { 'active': 0.9, 'passive': 0.8, 'resonant': 1.0 }
        };
        return compatibilityMatrix[typeA]?.[typeB] || 0.5;
    }
}
// Pattern recognition in events
class PatternRecognition {
    static detectPatterns(events) {
        const patterns = [];
        // Detect recurring event types
        const typeCounts = events.reduce((counts, event) => {
            counts[event.type] = (counts[event.type] || 0) + 1;
            return counts;
        }, {});
        Object.entries(typeCounts).forEach(([type, count]) => {
            if (count >= 3) {
                patterns.push({
                    type: 'recurring_event',
                    name: `Recurring ${type}`,
                    description: `${type} events occur ${count} times`,
                    strength: Math.min(1, count / 10)
                });
            }
        });
        // Detect high-intensity clusters
        const highIntensityEvents = events.filter(e => e.intensity > 0.8);
        if (highIntensityEvents.length >= 2) {
            patterns.push({
                type: 'intensity_cluster',
                name: 'High Intensity Cluster',
                description: `${highIntensityEvents.length} high-intensity events detected`,
                strength: highIntensityEvents.length / 5
            });
        }
        return patterns;
    }
}
// ============================================================================
// B. PERSISTENCE (IndexedDB)
// ============================================================================
class ConsciousnessPersistence {
    constructor() {
        this.dbName = 'ConsciousnessField';
        this.version = 1;
    }
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Create object stores
                if (!db.objectStoreNames.contains('observers')) {
                    db.createObjectStore('observers', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('events')) {
                    db.createObjectStore('events', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('patterns')) {
                    db.createObjectStore('patterns', { keyPath: 'id' });
                }
            };
        });
    }
    async saveState(observers, events, patterns) {
        const db = await this.initDB();
        // Save observers
        const observerTx = db.transaction('observers', 'readwrite');
        const observerStore = observerTx.objectStore('observers');
        for (const observer of observers) {
            await observerStore.put(observer);
        }
        // Save events
        const eventTx = db.transaction('events', 'readwrite');
        const eventStore = eventTx.objectStore('events');
        for (const event of events) {
            await eventStore.put(event);
        }
        // Save patterns
        const patternTx = db.transaction('patterns', 'readwrite');
        const patternStore = patternTx.objectStore('patterns');
        for (const pattern of patterns) {
            await patternStore.put({ ...pattern, id: pattern.name });
        }
        console.log('📦 Consciousness field state saved to IndexedDB');
    }
    async loadState() {
        const db = await this.initDB();
        // Load observers
        const observerTx = db.transaction('observers', 'readonly');
        const observerStore = observerTx.objectStore('observers');
        const observers = await this.getAllFromStore(observerStore);
        // Load events
        const eventTx = db.transaction('events', 'readonly');
        const eventStore = eventTx.objectStore('events');
        const events = await this.getAllFromStore(eventStore);
        // Load patterns
        const patternTx = db.transaction('patterns', 'readonly');
        const patternStore = patternTx.objectStore('patterns');
        const patterns = await this.getAllFromStore(patternStore);
        console.log('📦 Consciousness field state loaded from IndexedDB');
        return { observers, events, patterns };
    }
    async getAllFromStore(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
// ============================================================================
// C. NETWORK (WebSocket Peer-to-Peer)
// ============================================================================
class ConsciousnessNetwork {
    constructor(app) {
        this.app = app;
        this.ws = null;
        this.peers = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    async connect(serverUrl = 'ws://localhost:8080') {
        try {
            this.ws = new WebSocket(serverUrl);
            this.ws.onopen = () => {
                console.log('🌐 Connected to consciousness network');
                this.reconnectAttempts = 0;
                this.sendState();
            };
            this.ws.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };
            this.ws.onclose = () => {
                console.log('🌐 Disconnected from consciousness network');
                this.attemptReconnect();
            };
            this.ws.onerror = (error) => {
                console.error('🌐 Network error:', error);
            };
        }
        catch (error) {
            console.error('🌐 Failed to connect:', error);
        }
    }
    sendState() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN)
            return;
        const state = {
            type: 'state_update',
            data: {
                observers: this.app.getObservers(),
                events: this.app.getEvents(),
                patterns: this.app.getPatterns(),
                unityScore: this.app.getUnityScore()
            }
        };
        this.ws.send(JSON.stringify(state));
    }
    handleMessage(message) {
        switch (message.type) {
            case 'state_update':
                this.mergeRemoteState(message.data);
                break;
            case 'peer_joined':
                this.addPeer(message.peer);
                break;
            case 'peer_left':
                this.removePeer(message.peerId);
                break;
        }
    }
    mergeRemoteState(remoteState) {
        // Merge observers using metaphysical logic
        remoteState.observers?.forEach((remoteObserver) => {
            const existing = this.app.getObservers().find(o => o.id === remoteObserver.id);
            if (!existing) {
                this.app.addObserver(remoteObserver.name, remoteObserver.consciousness, remoteObserver.type);
            }
        });
        // Merge events using void equations for conflict resolution
        remoteState.events?.forEach((remoteEvent) => {
            const existing = this.app.getEvents().find(e => e.id === remoteEvent.id);
            if (!existing) {
                this.app.createEvent(remoteEvent.type, remoteEvent.content, remoteEvent.intensity, remoteEvent.radius);
            }
        });
        console.log('🔄 Merged remote consciousness state');
    }
    addPeer(peer) {
        this.peers.set(peer.id, peer);
        console.log(`👥 Peer joined: ${peer.name}`);
    }
    removePeer(peerId) {
        this.peers.delete(peerId);
        console.log(`👥 Peer left: ${peerId}`);
    }
    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
            console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
            setTimeout(() => {
                this.connect();
            }, delay);
        }
    }
    getConnectedPeers() {
        return Array.from(this.peers.values());
    }
}
// ============================================================================
// ADVANCED CONSCIOUSNESS APP
// ============================================================================
class AdvancedConsciousnessApp {
    constructor() {
        this.observers = new Map();
        this.currentObserverId = null;
        this.events = [];
        this.patterns = [];
        this.persistence = new ConsciousnessPersistence();
        this.network = new ConsciousnessNetwork(this);
        this.loadState();
    }
    // Observer management
    addObserver(name, consciousness, type) {
        const id = `observer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const observer = { id, name, consciousness, type };
        this.observers.set(id, observer);
        if (!this.currentObserverId)
            this.currentObserverId = id;
        this.updatePatterns();
        this.saveState();
        this.dispatch('observers:changed');
    }
    selectObserver(id) {
        if (this.observers.has(id)) {
            this.currentObserverId = id;
            this.dispatch('observers:changed');
        }
    }
    getObservers() {
        return Array.from(this.observers.values());
    }
    getCurrentObserver() {
        return this.currentObserverId ? this.observers.get(this.currentObserverId) || null : null;
    }
    // Event management
    createEvent(type, content, intensity, radius) {
        if (!this.currentObserverId)
            return;
        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            observerId: this.currentObserverId,
            type,
            content,
            intensity,
            radius,
            timestamp: Date.now()
        };
        this.events.push(event);
        this.updatePatterns();
        this.saveState();
        this.dispatch('events:changed');
    }
    getEvents() {
        return this.events.filter(e => e.observerId === this.currentObserverId);
    }
    getAllEvents() {
        return this.events;
    }
    // Metaphysical features
    calculateResonance(observerAId, observerBId) {
        const observerA = this.observers.get(observerAId);
        const observerB = this.observers.get(observerBId);
        if (!observerA || !observerB)
            return 0;
        return ResonanceCalculator.calculateResonance(observerA, observerB);
    }
    resolveParadox(oppositeA, oppositeB) {
        return VoidEquations.resolveParadox(oppositeA, oppositeB);
    }
    getUnityScore() {
        return VoidEquations.calculateUnityScore(this.getObservers(), this.getAllEvents());
    }
    getPatterns() {
        return this.patterns;
    }
    updatePatterns() {
        this.patterns = PatternRecognition.detectPatterns(this.getAllEvents());
    }
    // Persistence
    async saveState() {
        try {
            await this.persistence.saveState(this.getObservers(), this.getAllEvents(), this.patterns);
        }
        catch (error) {
            console.error('❌ Failed to save state:', error);
        }
    }
    async loadState() {
        try {
            const state = await this.persistence.loadState();
            // Restore observers
            state.observers.forEach(observer => {
                this.observers.set(observer.id, observer);
                if (!this.currentObserverId)
                    this.currentObserverId = observer.id;
            });
            // Restore events
            this.events = state.events;
            // Restore patterns
            this.patterns = state.patterns;
            this.dispatch('observers:changed');
            this.dispatch('events:changed');
        }
        catch (error) {
            console.error('❌ Failed to load state:', error);
        }
    }
    // Network
    async connectToNetwork(serverUrl) {
        await this.network.connect(serverUrl);
    }
    getConnectedPeers() {
        return this.network.getConnectedPeers();
    }
    // Event dispatching
    dispatch(event) {
        document.dispatchEvent(new CustomEvent(event));
    }
}
// Expose advanced app globally
window.AdvancedConsciousnessApp = new AdvancedConsciousnessApp();
// Auto-connect to network when available
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        const app = window.AdvancedConsciousnessApp;
        app.connectToNetwork();
    });
}
//# sourceMappingURL=advanced-consciousness-pwa.js.map