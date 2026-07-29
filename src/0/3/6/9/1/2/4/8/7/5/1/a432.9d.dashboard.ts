/**
 * a432.9d.dashboard.ts — Unified nine-dimensional metaphysical UI dashboard
 *
 * Visualizes all registered metaphysical modules (chess, yin-yang, metatron, flower of life, etc.)
 * as 9 nodes in a 3D scene. Each node runs its module's animation and analytic/metaphysical overlay.
 * User can navigate between dimensions. All code is DRY, modular, and ready for extension.
 */
import { abs, floor, round } from './a432.algebra.ts'
import * as THREE from 'three';
import { startChess, ChessFrame } from './a432.chess.ts';
import { startYinYang, YinYangFrame } from './a432.yin.yang.ts';
import { startMetatron, MetatronFrame } from './a432.metatron.ts';
import { startFlowerOfLife, FlowerOfLifeFrame } from './a432.flower.of.life.ts';
// ...import up to 9 modules as needed

function invertColor(hex: number): number {
  return 0xffffff ^ hex;
}

// Module registry
const modules = [
  {
    name: 'Chess',
    icon: '♟️',
    start: startChess,
    render3D: (frame: ChessFrame, mesh: THREE.Mesh, overlay: HTMLElement) => {
      let color = frame.polarity === 1 ? 0x00ff00 : frame.polarity === -1 ? 0xff0000 : 0x222244;
      let alert = '';
      // Anti-event: polarity 0 (division by n or void)
      if (frame.polarity === 0) {
        color = invertColor(color);
        alert = '<span style="color:#f0f">Anti-event: Polarity inversion (void)</span>';
      }
      overlay.innerHTML = `<b>Chess</b><br>File: ${frame.file} Rank: ${frame.rank}<br>Linear: ${frame.linear} Vortex: ${frame.vortex}<br>${alert}`;
      (mesh.material as THREE.MeshBasicMaterial).color.set(color);
    }
  },
  {
    name: 'Yin-Yang',
    icon: '☯️',
    start: startYinYang,
    render3D: (frame: YinYangFrame, mesh: THREE.Mesh, overlay: HTMLElement) => {
      let color = 0x00ffff;
      let alert = '';
      // Anti-event: angle near 180° (phase reversal)
      if (abs(frame.angle - 180) < 10) {
        color = invertColor(color);
        alert = '<span style="color:#f0f">Anti-event: Phase reversal (negative harmonic)</span>';
      }
      overlay.innerHTML = `<b>Yin-Yang</b><br>Pos: ${frame.positiveDigit} Neg: ${frame.negativeDigit}<br>Angle: ${round(frame.angle)}°<br>${alert}`;
      (mesh.material as THREE.MeshBasicMaterial).color.set(color);
    }
  },
  {
    name: 'Metatron',
    icon: '✡️',
    start: startMetatron,
    render3D: (frame: MetatronFrame, mesh: THREE.Mesh, overlay: HTMLElement) => {
      let color = 0xff00ff;
      let alert = '';
      // Anti-event: all node digits are the same (division by n)
      if (frame.nodes.every(n => n.digit === frame.nodes[0].digit)) {
        color = invertColor(color);
        alert = '<span style="color:#f0f">Anti-event: All nodes identical (division by n)</span>';
      }
      overlay.innerHTML = `<b>Metatron</b><br>Tick: ${frame.tick}<br>Nodes: ${frame.nodes.map(n => n.digit).join(', ')}<br>${alert}`;
      (mesh.material as THREE.MeshBasicMaterial).color.set(color);
    }
  },
  {
    name: 'Flower of Life',
    icon: '🌸',
    start: startFlowerOfLife,
    render3D: (frame: FlowerOfLifeFrame, mesh: THREE.Mesh, overlay: HTMLElement) => {
      let color = 0xffff00;
      let alert = '';
      // Anti-event: tick divisible by 9 (division by n)
      if (frame.tick % 9 === 0 && frame.tick !== 0) {
        color = invertColor(color);
        alert = '<span style="color:#f0f">Anti-event: Division by 9 (cycle reset)</span>';
      }
      overlay.innerHTML = `<b>Flower of Life</b><br>${frame.metaphysical}<br>${alert}`;
      (mesh.material as THREE.MeshBasicMaterial).color.set(color);
    }
  },
  // ...add up to 9 modules
];

let activeDimension = 0; // 0-8

export function show9DDashboard() {
  // 1. Setup Three.js scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 400;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(600, 600);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.left = '50vw';
  renderer.domElement.style.top = '50vh';
  renderer.domElement.style.transform = 'translate(-50%,-50%)';
  renderer.domElement.style.zIndex = '10060';
  document.body.appendChild(renderer.domElement);

  // 2. Create 9 nodes in a 3x3 grid
  const nodes: { mesh: THREE.Mesh, overlay: HTMLElement, disposer: (() => void) | null }[] = [];
  for (let i = 0; i < modules.length; i++) {
    const geometry = new THREE.SphereGeometry(40, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x222244 });
    const mesh = new THREE.Mesh(geometry, material);
    // Arrange in a 3x3 grid
    const x = ((i % 3) - 1) * 140;
    const y = (floor(i / 3) - 1) * 140;
    mesh.position.set(x, y, 0);
    scene.add(mesh);

    // Overlay for analytic/metaphysical info
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = `calc(50vw + ${x}px + 60px)`;
    overlay.style.top = `calc(50vh + ${y}px - 40px)`;
    overlay.style.zIndex = '10061';
    overlay.style.background = 'rgba(32,32,64,0.92)';
    overlay.style.color = '#fff';
    overlay.style.padding = '8px';
    overlay.style.borderRadius = '8px';
    overlay.style.fontFamily = 'monospace';
    overlay.style.minWidth = '120px';
    overlay.style.display = i === activeDimension ? 'block' : 'none';
    document.body.appendChild(overlay);

    nodes.push({ mesh, overlay, disposer: null });
  }

  // 3. Start each module’s stream and render to mesh/overlay
  modules.forEach((mod, i) => {
    nodes[i].disposer = mod.start((frame: any) => {
      mod.render3D(frame, nodes[i].mesh, nodes[i].overlay);
      nodes[i].overlay.style.display = i === activeDimension ? 'block' : 'none';
      (nodes[i].mesh.material as THREE.MeshBasicMaterial).color.set(i === activeDimension ? 0x00ffff : 0x222244);
    });
  });

  // 4. Navigation controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      activeDimension = (activeDimension + 1) % modules.length;
    } else if (e.key === 'ArrowLeft') {
      activeDimension = (activeDimension + modules.length - 1) % modules.length;
    }
    nodes.forEach((n, i) => {
      n.overlay.style.display = i === activeDimension ? 'block' : 'none';
      (n.mesh.material as THREE.MeshBasicMaterial).color.set(i === activeDimension ? 0x00ffff : 0x222244);
    });
  });

  // 5. Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // 6. Cleanup function
  return () => {
    renderer.domElement.remove();
    nodes.forEach(n => {
      n.overlay.remove();
      if (n.disposer) n.disposer();
    });
  };
} 