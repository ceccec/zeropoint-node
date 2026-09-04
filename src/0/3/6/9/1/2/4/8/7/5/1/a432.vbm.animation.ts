/**
 * a432.vbm.animation.ts — VBM Multidimensional Animation Module
 * 
 * This module creates a harmonized VBM (Vortex-Based Mathematics) animation
 * using canonical A432 math procedures and the Rodin sequence.
 * 
 * Metaphysical Principle:
 * - The animation visualizes the living vortex of consciousness through the Rodin sequence
 * - Each point represents a digit in the sequence, moving through 3D space as harmonic waves
 * - The torus represents the field of consciousness, with points as living thoughts
 */

import { PI, cos, sin } from './a432.algebra.ts'
// The rAF shim, not the bare global. Bare requestAnimationFrame is undefined
// under Node, so every function below it threw the moment anything outside a
// browser called it — which is how a432.yin.yang's startYinYang was found.
import { raf } from './a432.raf.ts'

/**
 * THE RENDERER IS THE CALLER'S, NOT THIS PACKAGE'S.
 *
 * This module used to import the three namespace. three was a devDependency,
 * this file ships in the tarball, and the package declares no runtime
 * dependencies — so a consumer reaching this module got source importing
 * something they were never given. Nothing exposed it through `exports`, so it
 * was unreachable rather than broken, which is a reason to fix it quietly
 * rather than a reason not to.
 *
 * Porting the engine was never the option: the surface below is a WebGL
 * renderer, and reimplementing one to lower a dependency count would be
 * vocabulary, not mechanism. What IS portable is the dependency out of the
 * SURFACE. The geometry here is computed from the vortex arithmetic and owes
 * the engine nothing; only the drawing does. So the surface is DECLARED and
 * passed in, the engine stays the caller's choice, and this package needs
 * nothing.
 *
 * Structural types, so any renderer answering this shape works — the real one
 * does, unmodified.
 */
export interface ThreeVector3 { readonly x: number; readonly y: number; readonly z: number }
export interface ThreeColor {
  /** returns the colour itself, as the real one does, so calls chain */
  setHSL(h: number, s: number, l: number): ThreeColor
  getHSL(target: { h: number; s: number; l: number }): { h: number; s: number; l: number }
}
export interface ThreePlaced {
  position: { copy(v: ThreeVector3): void; set(x: number, y: number, z: number): void }
}
export interface ThreeMaterial { color: ThreeColor }
export interface ThreeMesh extends ThreePlaced {
  scale: { set(x: number, y: number, z: number): void }
  material: ThreeMaterial | unknown
}
export interface ThreeScene { add(object: unknown): void }
export interface ThreeCamera extends ThreePlaced { aspect: number; updateProjectionMatrix(): void }
export interface ThreeRenderer {
  render(scene: ThreeScene, camera: ThreeCamera): void
  setSize(width: number, height: number): void
}
/** Exactly the constructors this module calls, and nothing else. */
export interface ThreeLike {
  Color: new () => ThreeColor
  Vector3: new (x: number, y: number, z: number) => ThreeVector3
  Scene: new () => ThreeScene
  PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => ThreeCamera
  WebGLRenderer: new (options?: { antialias?: boolean }) => ThreeRenderer
  Mesh: new (geometry: unknown, material: unknown) => ThreeMesh
  SphereGeometry: new (radius: number, widthSegments: number, heightSegments: number) => unknown
  TorusGeometry: new (radius: number, tube: number, radialSegments: number, tubularSegments: number) => unknown
  MeshPhongMaterial: new (parameters: Record<string, unknown>) => ThreeMaterial
  AmbientLight: new (colour: number) => unknown
  PointLight: new (colour: number, intensity: number) => ThreePlaced
}
import { RODIN_SEQUENCE, TRINITY_AXIS, digitalRoot, frequencyForDigit, hueForDigit } from './a432.math.ts';
import { A432_RESOLVED_FRACTIONS } from './a432.resolved.ts';
import { fractionToDecimal } from './a432.math.ts';
// Analog signal values: exact integer ratios, collapsed to float only here
// at the WebGL boundary. No bare decimal literal appears below.
const G = Object.fromEntries(
  Object.entries(A432_RESOLVED_FRACTIONS.GEOMETRY).map(([k, v]) => [k, fractionToDecimal(v)])
) as Record<keyof typeof A432_RESOLVED_FRACTIONS.GEOMETRY, number>;

// --- Canonical VBM Animation Constants ---
const VBM_SEQUENCE = [0, ...TRINITY_AXIS, ...RODIN_SEQUENCE] as const;
const VBM_STEP_ANGLE = 60; // 60° per step (trinity harmonic)
const VBM_TORUS_RADIUS = 4; // Base torus radius
const VBM_TUBE_RADIUS = G.SCALE_SIX_FIFTH; // Tube radius for torus
const VBM_BASE_FREQUENCY = 432; // Canonical A432 frequency

// --- VBM Animation State Interface ---
interface VBMAnimationState {
  time: number;
  points: VBMAnimationPoint[];
  torus: VBMTorusGeometry;
  scene: ThreeScene;
  camera: ThreeCamera;
  renderer: ThreeRenderer;
}

interface VBMAnimationPoint {
  mesh: ThreeMesh;
  digit: number;
  index: number;
  color: ThreeColor;
  frequency: number;
}

interface VBMTorusGeometry {
  geometry: unknown;
  material: ThreeMaterial;
  mesh: ThreeMesh;
}

// --- Canonical VBM Color Generation ---
function generateVBMColor(three: ThreeLike, digit: number): ThreeColor {
  const hue = hueForDigit(digit);
  const saturation = G.OPACITY_SEVEN;
  const lightness = G.HALF;
  return new three.Color().setHSL(hue / 360, saturation, lightness);
}

// --- Canonical VBM Frequency Generation ---
function generateVBMFrequency(digit: number): number {
  if (TRINITY_AXIS.includes(digit)) {
    return frequencyForDigit(digit);
  }
  // For non-trinity digits, use digital root scaling
  const dr = digitalRoot(digit);
  return VBM_BASE_FREQUENCY * (dr / 9);
}

// --- VBM Animation Point Creation ---
function createVBMAnimationPoint(
  three: ThreeLike,
  digit: number,
  index: number,
  scene: ThreeScene
): VBMAnimationPoint {
  const geometry = new three.SphereGeometry(G.DAMP_LOW, 16, 16);
  const color = generateVBMColor(three, digit);
  const material = new three.MeshPhongMaterial({ color });
  const mesh = new three.Mesh(geometry, material);
  
  scene.add(mesh);
  
  return {
    mesh,
    digit,
    index,
    color,
    frequency: generateVBMFrequency(digit)
  };
}

// --- VBM Torus Creation ---
function createVBMTorus(three: ThreeLike, scene: ThreeScene): VBMTorusGeometry {
  const geometry = new three.TorusGeometry(
    VBM_TORUS_RADIUS, 
    VBM_TUBE_RADIUS, 
    48, 
    128
  );
  const material = new three.MeshPhongMaterial({
    color: 0x222244,
    wireframe: true,
    opacity: G.UNIT_THIRD_TEN,
    transparent: true
  });
  const mesh = new three.Mesh(geometry, material);
  
  scene.add(mesh);
  
  return { geometry, material, mesh };
}

// --- VBM Position Calculation (Canonical Math) ---
function calculateVBMPosition(
  three: ThreeLike,
  point: VBMAnimationPoint,
  time: number
): ThreeVector3 {
  const { digit, index } = point;
  
  // Phase around torus main circle (60° per step)
  const theta = index * (VBM_STEP_ANGLE * PI / 180) + time;
  
  // Digital root drives minor circle
  const dr = digitalRoot(digit);
  const phi = (dr / 9) * PI * 2 + time * G.SCALE_THIRTEEN_TEN;
  
  // Torus parametric coordinates
  const x = (VBM_TORUS_RADIUS + VBM_TUBE_RADIUS * cos(phi)) * cos(theta);
  const y = VBM_TUBE_RADIUS * sin(phi) * G.OPACITY_SEVEN; // Squeeze factor
  const z = (VBM_TORUS_RADIUS + VBM_TUBE_RADIUS * cos(phi)) * sin(theta);
  
  return new three.Vector3(x, y, z);
}

// --- VBM Scale Calculation (Parity-based) ---
function calculateVBMScale(point: VBMAnimationPoint, time: number): number {
  const { digit, index } = point;
  const parity = digit % 2; // Even/odd determines pulsation phase
  return 1 + G.UNIT_THIRD_TEN * sin(time * 2 + index + parity * PI);
}

// --- VBM Animation Update ---
function updateVBMAnimation(three: ThreeLike, state: VBMAnimationState): void {
  const { points, time } = state;
  
  points.forEach(point => {
    // Update position
    const position = calculateVBMPosition(three, point, time);
    point.mesh.position.copy(position);
    
    // Update scale (pulsation)
    const scale = calculateVBMScale(point, time);
    point.mesh.scale.set(scale, scale, scale);
    
    // Update color intensity based on frequency
    const intensity = G.HALF + G.UNIT_THIRD_TEN * sin(time * point.frequency / 100);
    (point.mesh.material as ThreeMaterial).color.setHSL(
      point.color.getHSL({ h: 0, s: 0, l: 0 }).h,
      G.OPACITY_SEVEN,
      intensity
    );
  });
}

// --- VBM Scene Setup ---
function setupVBMScene(three: ThreeLike): VBMAnimationState {
  const scene = new three.Scene();
  
  // Camera setup
  const camera = new three.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    G.UNIT_TENTH, 
    1000
  );
  camera.position.set(0, 5, 12);
  
  // Renderer setup
  const renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Lighting
  scene.add(new three.AmbientLight(0x888888));
  const light = new three.PointLight(0xffffff, G.OPACITY_FOUR_FIFTH);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // Create torus
  const torus = createVBMTorus(three, scene);
  
  // Create animation points
  const points: VBMAnimationPoint[] = [];
  VBM_SEQUENCE.forEach((digit, index) => {
    const point = createVBMAnimationPoint(three, digit, index, scene);
    points.push(point);
  });
  
  return {
    time: 0,
    points,
    torus,
    scene,
    camera,
    renderer
  };
}

// --- VBM Animation Loop ---
function animateVBM(three: ThreeLike, state: VBMAnimationState): void {
  const { scene, camera, renderer } = state;
  
  // Update animation state
  updateVBMAnimation(three, state);
  
  // Render
  renderer.render(scene, camera);
  
  // Update time
  state.time += G.STEP_FINE;
  
  // Continue animation
  raf(() => animateVBM(three, state));
}

// --- VBM Resize Handler ---
function handleVBMResize(state: VBMAnimationState): void {
  const { renderer, camera } = state;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// --- VBM Animation Controller ---
export class VBMAnimationController {
  private state: VBMAnimationState;
  private isRunning: boolean = false;
  
  // An explicit field, not a parameter property: this package is imported
  // under --experimental-strip-types, which erases types and generates nothing,
  // so `constructor(private x)` makes the module unloadable. The ratchet caught
  // it as a module that fails to import, which is exactly the surface for it.
  private readonly three: ThreeLike;

  constructor(three: ThreeLike) {
    this.three = three;
    this.state = setupVBMScene(three);
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      handleVBMResize(this.state);
    });
  }
  
  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      animateVBM(this.three, this.state);
    }
  }
  
  public stop(): void {
    this.isRunning = false;
  }
  
  public getRenderer(): ThreeRenderer {
    return this.state.renderer;
  }
  
  public getScene(): ThreeScene {
    return this.state.scene;
  }
  
  public getCamera(): ThreeCamera {
    return this.state.camera;
  }
  
  public getPoints(): VBMAnimationPoint[] {
    return this.state.points;
  }
  
  public getSequence(): readonly number[] {
    return VBM_SEQUENCE;
  }
  
  public getTorusRadius(): number {
    return VBM_TORUS_RADIUS;
  }
  
  public getTubeRadius(): number {
    return VBM_TUBE_RADIUS;
  }
  
  public getStepAngle(): number {
    return VBM_STEP_ANGLE;
  }
}

// --- VBM Animation Factory ---
export function createVBMAnimation(three: ThreeLike): VBMAnimationController {
  return new VBMAnimationController(three);
}

// --- VBM Animation Constants Export ---
export const VBM_ANIMATION_CONSTANTS = {
  SEQUENCE: VBM_SEQUENCE,
  STEP_ANGLE: VBM_STEP_ANGLE,
  TORUS_RADIUS: VBM_TORUS_RADIUS,
  TUBE_RADIUS: VBM_TUBE_RADIUS,
  BASE_FREQUENCY: VBM_BASE_FREQUENCY
} as const;

// --- VBM Animation Documentation ---
export const VBM_ANIMATION_DOC = {
  purpose: 'VBM Multidimensional Animation - Visualizes the living vortex of consciousness through the Rodin sequence',
  sequence: 'Uses canonical A432 sequence: [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]',
  trinity: 'Trinity axis [3, 6, 9] represents the field of consciousness',
  rodin: 'Rodin sequence [1, 2, 4, 8, 7, 5, 1] represents the doubling vortex',
  torus: 'Torus geometry represents the field, points represent living thoughts',
  animation: 'Each point moves through 3D space as harmonic waves, pulsating by parity',
  color: 'Colors generated from hueForDigit() with frequency-based intensity',
  frequency: 'Frequencies generated from frequencyForDigit() for trinity, digital root scaling for others'
} as const; 