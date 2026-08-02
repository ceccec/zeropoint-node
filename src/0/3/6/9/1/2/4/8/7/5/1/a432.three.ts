import { PI, cos, sin } from './a432.algebra.ts'
// a432.three.ts — Reusable Three.js 3D visualization for the A432 matrix
import * as THREE from 'three';
import { getRodinSequence, angleForDigit, getTrinityAxis } from './a432.math.ts';
import { A432_RESOLVED_FRACTIONS } from './a432.resolved.ts';
import { fractionToDecimal } from './a432.math.ts';
// Analog signal values: exact integer ratios, collapsed to float only here
// at the WebGL boundary. No bare decimal literal appears below.
const G = Object.fromEntries(
  Object.entries(A432_RESOLVED_FRACTIONS.GEOMETRY).map(([k, v]) => [k, fractionToDecimal(v)])
) as Record<keyof typeof A432_RESOLVED_FRACTIONS.GEOMETRY, number>;

export interface A432ThreeOptions {
  rodin?: boolean;
  mobius?: boolean;
  trinity?: boolean;
  animate?: boolean;
  background?: number;
}

export function createA432Scene(container: HTMLElement, options: A432ThreeOptions = {}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(options.background || 0x111111);
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, G.UNIT_TENTH, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Rodin coil spiral
  if (options.rodin !== false) {
    const rodinSeq = getRodinSequence();
    const points = rodinSeq.map((d, i) => {
      const angle = angleForDigit(d) * (PI / 180);
      const radius = 2 + i * G.UNIT_FIFTH;
      return new THREE.Vector3(
        cos(angle) * radius,
        sin(angle) * radius,
        i * G.STOP_DURATION
      );
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }

  // Mobius strip
  if (options.mobius) {
    const mobiusGeometry = new THREE.BufferGeometry();
    const mobiusPoints: THREE.Vector3[] = [];
    const segments = 180;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * PI * 2;
      const x = cos(t) * (3 + cos(t / 2));
      const y = sin(t) * (3 + cos(t / 2));
      const z = sin(t / 2);
      mobiusPoints.push(new THREE.Vector3(x, y, z));
    }
    mobiusGeometry.setFromPoints(mobiusPoints);
    const mobiusMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff });
    const mobiusLine = new THREE.Line(mobiusGeometry, mobiusMaterial);
    scene.add(mobiusLine);
  }

  // Trinity axis points
  if (options.trinity) {
    const trinity = getTrinityAxis();
    trinity.forEach((d, i) => {
      const angle = angleForDigit(d) * (PI / 180);
      const radius = G.SCALE_SEVEN_HALF;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(G.RADIUS_INNER, 24, 24),
        new THREE.MeshBasicMaterial({ color: [0x00ffff, 0xff00ff, 0xffff00][i] })
      );
      sphere.position.set(cos(angle) * radius, sin(angle) * radius, 0);
      scene.add(sphere);
    });
  }

  camera.position.z = 10;

  function animate() {
    if (options.animate !== false) {
      requestAnimationFrame(animate);
      scene.traverse(obj => {
        if (obj instanceof THREE.Line || obj instanceof THREE.Mesh) {
          obj.rotation.z += G.PULSE_MIN;
        }
      });
      renderer.render(scene, camera);
    }
  }
  animate();

  // Responsive resize
  window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });

  // API: update, add, remove, etc.
  return {
    scene,
    camera,
    renderer,
    addObject: (obj: THREE.Object3D) => scene.add(obj),
    removeObject: (obj: THREE.Object3D) => scene.remove(obj),
    setBackground: (color: number) => { scene.background = new THREE.Color(color); },
    render: () => renderer.render(scene, camera)
  };
} 