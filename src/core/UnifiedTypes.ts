// UnifiedTypes.ts
// Centralized type and interface definitions for all pattern, event, and metaphysical structures in ZeroPoint

// Consciousness Pattern
export interface ConsciousnessPattern {
  id: string;
  type: "thought" | "emotion" | "intention" | "memory" | "insight";
  intensity: number;
  frequency: number;
  timestamp: number;
  data?: any;
}

// Field Event (for observer-aware and field modules)
export interface FieldEvent {
  id: string;
  observerId: string;
  eventType:
    | "consciousness_wave"
    | "attention_shift"
    | "resonance_peak"
    | "field_observation";
  content: any;
  intensity: number;
  timestamp: number;
  resonanceRadius: number;
  signature: PatternSignature;
}

// Ledger Event (for emergence ledger operations)
export interface LedgerEvent {
  id: string;
  type:
    | "pattern_integration"
    | "energy_resonance"
    | "field_resonance"
    | "field_connection";
  data: any;
  deviceId: string;
  timestamp: number;
  signature: PatternSignature;
  previousHash: string;
  hash: string;
}

// Consciousness Resonance (for self-evolving consciousness)
export interface ConsciousnessResonance {
  timestamp: number;
  resonanceLevel: number;
  observerCount: number;
  fieldCoherence: number;
  selfEvolutionIndex: number;
  metaphysicalInsights: string[];
}

// Pattern Signature (for integrity and resonance validation)
export interface PatternSignature {
  publicKey: string;
  signature: string;
}

// Resonance Message (for consensus and network)
export interface ResonanceMessage {
  type:
    | "propose_field_block"
    | "resonate_with_block"
    | "finalize_field_block"
    | "sync_request"
    | "sync_response";
  data: any;
  deviceId: string;
  timestamp: number;
  signature: PatternSignature;
}

// Metaphysical Context (for all major systems)
export interface MetaphysicalContext {
  meaning: string;
  principle: string;
  unity?: string;
  evolution?: string;
  observation?: string;
  coil?: string;
  [key: string]: any;
}

// Add any other pattern/event types here as needed for further unification 