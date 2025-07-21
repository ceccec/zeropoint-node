// a432.types.ts
// Shared interfaces and type definitions for the A432 framework

export interface A432State {
  name: string;
  frequency: number;
  consciousness: number;
  harmony: number;
  integration: number;
  evolution: number;
  proof: string;
}

export interface A432Subsystem {
  name: string;
  frequency: number;
  consciousness: number;
  harmony: number;
  integration: number;
  evolution: number;
  type: SubsystemType;
  proof: string;
}

export interface A432Component {
  name: string;
  frequency: number;
  consciousness: number;
  harmony: number;
  integration: number;
  evolution: number;
  type: ComponentType;
  proof: string;
}

export type SubsystemType =
  | 'TETRAHEDRON' | 'STAR' | 'FIELD' | 'HARMONIC'
  | 'SURFACE' | 'TWIST' | 'EDGE'
  | 'CAVITY' | 'WAVE' | 'MODE'
  | 'MOBIUS' | 'RODIN' | 'TESLA'
  | 'TOROIDAL' | 'MATRIX'
  | 'POSSIBILITY' | 'IMPOSSIBILITY'
  | 'PRIMARY' | 'SECONDARY' | 'RESONANT'
  | 'SPIRAL' | 'VORTEX'
  | 'COLOR' | 'STREAM' | 'AUDIO' | 'VIDEO'
  | 'IMPERIAL' | 'DECIMAL'
  | 'A432';

export type ComponentType =
  | 'TETRAHEDRON' | 'STAR' | 'FIELD' | 'HARMONIC'
  | 'SURFACE' | 'TWIST' | 'EDGE'
  | 'CAVITY' | 'WAVE' | 'MODE' | 'CYCLE'
  | 'MOBIUS_STRIP' | 'RODIN_COIL' | 'TESLA_COIL'
  | 'TOROIDAL' | 'MATRIX'
  | 'POSSIBILITY' | 'IMPOSSIBILITY'
  | 'PRIMARY_COIL' | 'SECONDARY_COIL' | 'RESONANT_COIL'
  | 'SPIRAL_COIL' | 'VORTEX_COIL'
  | 'COLOR' | 'STREAM' | 'AUDIO_STREAM' | 'VIDEO_STREAM'
  | 'IMPERIAL_BASE' | 'DECIMAL_BASE'
  | 'A432'; 