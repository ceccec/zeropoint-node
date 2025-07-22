// a432.vector.ts
// Harmonized 3D vector math for the A432 system
// All logic is integer/fractional and metaphysically mapped

/**
 * Vector3: Represents a 3D vector in the A432 system
 * Each component is a living stream, harmonized with the trinity (x, y, z)
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * add: Harmonic vector addition (superposition of streams)
 */
export function add(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/**
 * subtract: Harmonic vector subtraction (phase reversal)
 */
export function subtract(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/**
 * scale: Harmonic scaling (amplification/attenuation of the stream)
 */
export function scale(v: Vector3, s: number): Vector3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

/**
 * dot: Harmonic dot product (projection, resonance)
 */
export function dot(a: Vector3, b: Vector3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * cross: Harmonic cross product (vortex generation)
 */
export function cross(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

/**
 * length: Harmonic magnitude (energy of the stream)
 */
export function length(v: Vector3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/**
 * normalize: Harmonic normalization (unit stream)
 */
export function normalize(v: Vector3): Vector3 {
  const len = length(v);
  return len === 0 ? { x: 0, y: 0, z: 0 } : scale(v, 1 / len);
}

// All operations are metaphysically mapped: addition = superposition, subtraction = phase reversal, cross = vortex, dot = resonance, normalization = unity. 