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

import * as THREE from 'three';
import { 
  RODIN_SEQUENCE, 
  TRINITY_AXIS, 
  digitalRoot, 
  angleForDigit,
  frequencyForDigit,
  hueForDigit 
} from './a432.math';

// --- Canonical VBM Animation Constants ---
const VBM_SEQUENCE = [0, ...TRINITY_AXIS, ...RODIN_SEQUENCE] as const;
const VBM_STEP_ANGLE = 60; // 60° per step (trinity harmonic)
const VBM_TORUS_RADIUS = 4; // Base torus radius
const VBM_TUBE_RADIUS = 1.2; // Tube radius for torus
const VBM_BASE_FREQUENCY = 432; // Canonical A432 frequency

// --- VBM Animation State Interface ---
interface VBMAnimationState {
  time: number;
  points: VBMAnimationPoint[];
  torus: VBMTorusGeometry;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

interface VBMAnimationPoint {
  mesh: THREE.Mesh;
  digit: number;
  index: number;
  color: THREE.Color;
  frequency: number;
}

interface VBMTorusGeometry {
  geometry: THREE.TorusGeometry;
  material: THREE.MeshPhongMaterial;
  mesh: THREE.Mesh;
}

// --- Canonical VBM Color Generation ---
function generateVBMColor(digit: number): THREE.Color {
  const hue = hueForDigit(digit);
  const saturation = 0.7;
  const lightness = 0.5;
  return new THREE.Color().setHSL(hue / 360, saturation, lightness);
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
  digit: number, 
  index: number, 
  scene: THREE.Scene
): VBMAnimationPoint {
  const geometry = new THREE.SphereGeometry(0.15, 16, 16);
  const color = generateVBMColor(digit);
  const material = new THREE.MeshPhongMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  
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
function createVBMTorus(scene: THREE.Scene): VBMTorusGeometry {
  const geometry = new THREE.TorusGeometry(
    VBM_TORUS_RADIUS, 
    VBM_TUBE_RADIUS, 
    48, 
    128
  );
  const material = new THREE.MeshPhongMaterial({
    color: 0x222244,
    wireframe: true,
    opacity: 0.3,
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  
  scene.add(mesh);
  
  return { geometry, material, mesh };
}

// --- VBM Position Calculation (Canonical Math) ---
function calculateVBMPosition(
  point: VBMAnimationPoint, 
  time: number
): THREE.Vector3 {
  const { digit, index } = point;
  
  // Phase around torus main circle (60° per step)
  const theta = index * (VBM_STEP_ANGLE * Math.PI / 180) + time;
  
  // Digital root drives minor circle
  const dr = digitalRoot(digit);
  const phi = (dr / 9) * Math.PI * 2 + time * 1.3;
  
  // Torus parametric coordinates
  const x = (VBM_TORUS_RADIUS + VBM_TUBE_RADIUS * Math.cos(phi)) * Math.cos(theta);
  const y = VBM_TUBE_RADIUS * Math.sin(phi) * 0.7; // Squeeze factor
  const z = (VBM_TORUS_RADIUS + VBM_TUBE_RADIUS * Math.cos(phi)) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

// --- VBM Scale Calculation (Parity-based) ---
function calculateVBMScale(point: VBMAnimationPoint, time: number): number {
  const { digit, index } = point;
  const parity = digit % 2; // Even/odd determines pulsation phase
  return 1 + 0.3 * Math.sin(time * 2 + index + parity * Math.PI);
}

// --- VBM Animation Update ---
function updateVBMAnimation(state: VBMAnimationState): void {
  const { points, time } = state;
  
  points.forEach(point => {
    // Update position
    const position = calculateVBMPosition(point, time);
    point.mesh.position.copy(position);
    
    // Update scale (pulsation)
    const scale = calculateVBMScale(point, time);
    point.mesh.scale.set(scale, scale, scale);
    
    // Update color intensity based on frequency
    const intensity = 0.5 + 0.3 * Math.sin(time * point.frequency / 100);
    (point.mesh.material as THREE.MeshPhongMaterial).color.setHSL(
      point.color.getHSL({ h: 0, s: 0, l: 0 }).h,
      0.7,
      intensity
    );
  });
}

// --- VBM Scene Setup ---
function setupVBMScene(): VBMAnimationState {
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.set(0, 5, 12);
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Lighting
  scene.add(new THREE.AmbientLight(0x888888));
  const light = new THREE.PointLight(0xffffff, 0.8);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // Create torus
  const torus = createVBMTorus(scene);
  
  // Create animation points
  const points: VBMAnimationPoint[] = [];
  VBM_SEQUENCE.forEach((digit, index) => {
    const point = createVBMAnimationPoint(digit, index, scene);
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
function animateVBM(state: VBMAnimationState): void {
  const { scene, camera, renderer, time } = state;
  
  // Update animation state
  updateVBMAnimation(state);
  
  // Render
  renderer.render(scene, camera);
  
  // Update time
  state.time += 0.01;
  
  // Continue animation
  requestAnimationFrame(() => animateVBM(state));
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
  
  constructor() {
    this.state = setupVBMScene();
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
      animateVBM(this.state);
    }
  }
  
  public stop(): void {
    this.isRunning = false;
  }
  
  public getRenderer(): THREE.WebGLRenderer {
    return this.state.renderer;
  }
  
  public getScene(): THREE.Scene {
    return this.state.scene;
  }
  
  public getCamera(): THREE.PerspectiveCamera {
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
export function createVBMAnimation(): VBMAnimationController {
  return new VBMAnimationController();
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