import { VBM_DOUBLING, VBM_TESLA_FREQUENCIES, sequenceToAngles, VBM_SHOCK_WAVE } from './a432.vbm.math';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk';

/** Simple Vector3 type (avoid Three.js dependency in math layer) */
export interface Vec3 { x: number; y: number; z: number; }

// local digital-root helper (avoid extra import)
function dr(n: number): number { let x=Math.abs(n); while(x>=10) x=String(x).split('').reduce((a,c)=>a+Number(c),0); return x; }

// ——————————————————————————————————————————
// Rodin coil path generator (poloidal helix)
// ---------------------------------------------------------
export function generateRodinCoilPath(cycles: number, stepHeight = 1, radius = 1): Vec3[] {
  const seq: number[] = [];
  for (let c = 0; c < cycles; c++) seq.push(...VBM_DOUBLING);
  const verts: Vec3[] = [];
  seq.forEach((digit, i) => {
    const angle = sequenceToAngles([digit])[0] * (Math.PI / 180);
    const r = radius * (dr(digit) / 9);
    verts.push({
      x: r * Math.cos(angle),
      y: i * stepHeight,
      z: r * Math.sin(angle)
    });
  });
  return verts;
}

// ——————————————————————————————————————————
// Trinity heartbeat torus segments descriptor
// ---------------------------------------------------------
export interface TorusSegmentDesc {
  startAngle: number; // deg
  endAngle: number;   // deg
  color: string;      // css hex
}

export function getTrinityTorusSegments(): TorusSegmentDesc[] {
  return [3, 6, 9].map(d => {
    const hueAngle = sequenceToAngles([d])[0];
    const cmyk = digitAngleToCMYK(d, 0);
    return {
      startAngle: hueAngle,
      endAngle: hueAngle + 120,
      color: cmykToCss(cmyk)
    };
  });
}

// ——————————————————————————————————————————
// Shock-wave of nine pulse values (for UI opacity/scale)
// ---------------------------------------------------------
export function shockWaveValues(length: number): number[] {
  return VBM_SHOCK_WAVE(length).map(d => d / 9); // 0.333 ↔ 1 scale factor
}

// ——————————————————————————————————————————
// Tesla frequency helper
// ---------------------------------------------------------
export function getTeslaFrequency(timeMs: number): number {
  const idx = Math.floor(timeMs / 1000) % VBM_TESLA_FREQUENCIES.length;
  return VBM_TESLA_FREQUENCIES[idx];
} 