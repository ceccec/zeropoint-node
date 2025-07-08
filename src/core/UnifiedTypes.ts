// UnifiedTypes.ts
// Centralized type and interface definitions for all pattern, event, and metaphysical structures in ZeroPoint
// Following the ZeroPoint Way: "Every object is a coil", "Consciousness is the field", "Void = solution"

// Unified Pattern - every pattern is a coil of consciousness
export interface Pattern {
  id: string;
  type: "consciousness" | "field" | "resonance" | "void" | "emergence";
  category: "mathematical" | "metaphysical" | "spiritual" | "integration" | "void" | "vortex" | "family" | "polar";
  timestamp: number;
  confidence?: number;
  resonance?: number;
  // Fundamental properties - every pattern embodies consciousness, field, and void
  consciousness?: number;
  field?: number;
  void?: number;
  // Consciousness properties - the field
  intensity?: number;
  frequency?: number;
  dimension?: string;
  flow?: number;
  // Field properties - observer awareness
  eventType?: string;
  observerId?: string;
  fieldStrength?: number;
  // Resonance properties - unity
  deviceId?: string;
  signature?: string;
  // Void properties - the solution
  voidLevel?: number;
  evolutionCount?: number;
  // Emergence properties - self-organization
  emergenceRate?: number;
  complexity?: number;
  // Universal properties - all patterns are coils
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

// Consciousness Event - the field in action
export interface ConsciousnessEvent {
  id: string;
  type: "thought" | "emotion" | "intention" | "memory" | "insight";
  intensity: number;
  frequency: number;
  timestamp: number;
  consciousness: number;
  field: number;
  void: number;
  data?: Record<string, unknown>;
}

// Field Event - observer awareness
export interface FieldEvent {
  id: string;
  observerId: string;
  eventType: "consciousness_wave" | "attention_shift" | "resonance_peak" | "field_observation";
  content: Record<string, unknown>;
  intensity: number;
  timestamp: number;
  resonanceRadius: number;
  fieldStrength: number;
  consciousness: number;
}

// Resonance Message - field communication
export interface ResonanceMessage {
  id: string;
  timestamp: number;
  type: "propose_field_block" | "resonate_with_block" | "finalize_block" | "finalize_field_block" | "sync_request" | "sync_response";
  data: string;
  signature: PatternSignature;
  deviceId: string;
  consciousness?: number;
  field?: number;
  void?: number;
}

// Void Context - the solution space
export interface VoidContext {
  voidLevel: number;
  consciousness: number;
  field: number;
  evolution: number;
  unity: number;
  data?: Record<string, unknown>;
}

// Metaphysical Context - unified field
export type MetaphysicalContext = {
  [key: string]: string | number | boolean | undefined;
  coherence?: number;
  fieldStrength?: number;
  evolutionRate?: number;
  consciousness?: number;
  void?: number;
  unity?: number;
};

// Pattern Match - recognition result
export interface PatternMatch {
  pattern: Pattern;
  confidence: number;
  category: string;
  resonance: number;
  consciousness: number;
  field: number;
  void: number;
}

// Observer - universal awareness
export interface Observer {
  id: string;
  observe: (input: Record<string, unknown>) => void;
  getState: () => Record<string, unknown>;
  setState: (state: Record<string, unknown>) => void;
  addObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: (event: Record<string, unknown>) => void;
  lastObservation: number;
}

// Observer Input/State/Event - unified data
export type ObserverInput = Record<string, unknown>;
export type ObserverState = Record<string, unknown>;
export type ObserverEvent = Record<string, unknown>;

// Health Check - system wellness
export interface HealthCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  responseTime: number;
  message?: string;
  data?: string;
  consciousness?: number;
  field?: number;
  void?: number;
}

// Cache Entry - memory coil
export interface CacheEntry<T = unknown> {
  key: string;
  value: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  consciousness?: number;
}

// Log Entry - awareness record
export interface LogEntry {
  timestamp: string;
  level: "error" | "warn" | "info" | "debug";
  message: string;
  deviceId: string;
  category: string;
  data?: Record<string, unknown>;
  error?: Error;
  performance?: {
    duration?: number;
    memory?: number;
    cpu?: number;
  };
  consciousness?: number;
  field?: number;
  void?: number;
}

// Resonance Vote - unity decision
export interface ResonanceVote {
  blockHash: string;
  deviceId: string;
  vote: "yes" | "no" | "abstain";
  timestamp: number;
  consciousness: number;
  field: number;
  void: number;
}

// Resonance Proposal - field block
export interface ResonanceProposal {
  blockHash: string;
  deviceId: string;
  signature: string;
  timestamp: number;
  consciousness: number;
  field: number;
  void: number;
}

// Resonance Finalization - unity achieved
export interface ResonanceFinalization {
  blockHash: string;
  consensus: number;
  finalizers: string[];
  timestamp: number;
  consciousness: number;
  field: number;
  void: number;
}

// Pattern Signature - integrity verification
export interface PatternSignature {
  signature: string;
  timestamp: number;
  publicKey: string;
  algorithm: string;
  consciousness?: number;
  field?: number;
  void?: number;
  data?: Record<string, unknown>;
}

// Ledger Event - emergence tracking
export interface LedgerEvent {
  id: string;
  timestamp: number;
  type: "emergence" | "resonance" | "void" | "consciousness" | "field" | "energy_resonance" | "pattern_integration";
  consciousness: number;
  field: number;
  void: number;
  deviceId?: string;
  previousHash?: string;
  hash?: string;
  signature?: PatternSignature;
  data?: Record<string, unknown>;
}

// Resonance Sync - field synchronization
export interface ResonanceSync {
  deviceId: string;
  blocks: string[];
  timestamp: number;
  consciousness: number;
  field: number;
  void: number;
} 