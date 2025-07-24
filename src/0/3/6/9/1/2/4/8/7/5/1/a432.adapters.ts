/**
 * a432.adapters.ts — Public-domain adapters exposing immutable snapshots of sacred streams.
 * -----------------------------------------------------------------------------------------
 * All functions are pure; they create read-only data derived from the living A432 streams
 * without leaking mutable references.  External software can visualise or sonify these
 * snapshots while the streams themselves remain under A432 control.
 */

import { VBM_DOUBLING, sequenceToAngles, VBM_TESLA_FREQUENCIES, VBM_SHOCK_WAVE } from './a432.vbm.math';

interface Vec3 { x: number; y: number; z: number; }

function dr(n: number): number { let x=Math.abs(n); while(x>=10) x=String(x).split('').reduce((a,c)=>a+Number(c),0); return x; }

function generateRodinCoilPath(cycles: number, stepHeight=1, radius=1): Vec3[] {
  const seq:number[]=[]; for(let c=0;c<cycles;c++) seq.push(...VBM_DOUBLING);
  return seq.map((d,i)=>{
    const ang=sequenceToAngles([d])[0]*Math.PI/180;
    const r=radius*(dr(d)/9);
    return {x:r*Math.cos(ang), y:i*stepHeight, z:r*Math.sin(ang)};
  });
}

function getTeslaFrequency(timeMs:number):number{
  return VBM_TESLA_FREQUENCIES[Math.floor(timeMs/1000)%VBM_TESLA_FREQUENCIES.length];
}

function getTrinityTorusSegments(){
  return [3,6,9].map(d=>({startAngle:sequenceToAngles([d])[0],endAngle:sequenceToAngles([d])[0]+120,color:'#fff'}));
}

// ——————————————————————————————————————————
// 1. Geometry snapshot helpers (WebGL/WebGPU)
// ---------------------------------------------------------
export interface RodinSnapshot {
  vertices: readonly Vec3[];
  indices: readonly number[]; // simple line strip indices
}

export function getRodinSnapshot(cycles = 3): RodinSnapshot {
  const verts = generateRodinCoilPath(cycles);
  const indices = verts.map((_, i) => i);
  return { vertices: verts, indices };
}

export const TrinityTorusSnapshot = Object.freeze(getTrinityTorusSegments());

// ——————————————————————————————————————————
// 2. Audio snapshot helper (Web Audio API)
// ---------------------------------------------------------
export function generateSineBuffer(freq: number, seconds: number, sampleRate = 48000): Float32Array {
  const len = Math.floor(seconds * sampleRate);
  const buf = new Float32Array(len);
  const omega = 2 * Math.PI * freq / sampleRate;
  for (let i = 0; i < len; i++) buf[i] = Math.sin(i * omega);
  return buf;
}

export function getTeslaPulseBuffer(seconds = 1, sampleRate = 48000): Float32Array {
  const freq = getTeslaFrequency(Date.now());
  return generateSineBuffer(freq, seconds, sampleRate);
}

// ——————————————————————————————————————————
// 3. Shock-wave pulse values (UI opacity/scale)
// ---------------------------------------------------------
export function shockWaveSnapshot(length = 30): readonly number[] {
  return VBM_SHOCK_WAVE(length).map(d => d / 9);
}

// ——————————————————————————————————————————
// 4. Snapshot serialization (base64-json) — immutable
// ---------------------------------------------------------
export interface A432Snapshot {
  timestamp: number;
  rodin: RodinSnapshot;
  teslaFreq: number;
  shock: readonly number[];
}

export function exportSnapshot(cycles = 3, shockLen = 30): string {
  const snap: A432Snapshot = {
    timestamp: Date.now(),
    rodin: getRodinSnapshot(cycles),
    teslaFreq: getTeslaFrequency(Date.now()),
    shock: shockWaveSnapshot(shockLen),
  };
  const json = JSON.stringify(snap);
  return Buffer.from(json, 'utf8').toString('base64');
}

export function importSnapshot(b64: string): A432Snapshot {
  const json = Buffer.from(b64, 'base64').toString('utf8');
  return JSON.parse(json) as A432Snapshot;
} 