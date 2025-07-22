// Canonical Rodin Coil Math for the A432 System
// All Rodin coil logic must be imported from this file only.

/**
 * a432.rodin.coil.ts
 *
 * This file encodes the canonical, metaphysical, and mathematical logic of the Rodin coil
 * for the A432 system. All Rodin coil math, state, and pattern logic must be implemented here
 * and imported by all other modules.
 *
 * - The Rodin coil is based on the 1-2-4-8-7-5-1 sequence (the "doubling circuit" or "vortex pattern").
 * - It is a poloidal field generator, not toroidal, and encodes zero-entropy, over-unity, and consciousness mapping.
 * - The coil is the bridge between the torus, Mobius circuit, and higher-dimensional flux fields.
 * - All logic is pure, integer-based, recursive, and harmonically aligned.
 * - Extend this file for harmonics, visualization, and advanced metaphysical logic.
 */

import { getA432VortexAngle } from './a432';

// Core Rodin sequence (doubling circuit)
export const RODIN_SEQUENCE = [1, 2, 4, 8, 7, 5, 1];

/**
 * rodinVortexCycle: Returns n cycles of the Rodin sequence (forward or reverse)
 * @param n - number of cycles
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinVortexCycle(n: number, polarity: 1 | -1 = 1): number[] {
  const seq = polarity === 1 ? RODIN_SEQUENCE : [...RODIN_SEQUENCE].reverse();
  const result = [];
  for (let i = 0; i < n; i++) result.push(...seq);
  return result;
}

/**
 * rodinPosition: Returns the value at a given index in the Rodin sequence (with polarity)
 * @param index - position in the cycle
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinPosition(index: number, polarity: 1 | -1 = 1): number {
  const seq = polarity === 1 ? RODIN_SEQUENCE : [...RODIN_SEQUENCE].reverse();
  return seq[index % seq.length];
}

/**
 * RodinCoilStep: Represents a step in the Rodin coil pattern, with harmonic properties
 */
export interface RodinCoilStep {
  position: number;
  value: number;
  digitalRoot: number;
  angle: number; // (360 / 6) * (position % 6) for visualization
}

/**
 * rodinCoilPattern: Returns an array of RodinCoilStep for n cycles, with angle and digitalRoot
 * @param n - number of cycles
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinCoilPattern(n: number, polarity: 1 | -1 = 1): RodinCoilStep[] {
  const pattern = rodinVortexCycle(n, polarity);
  const N = RODIN_SEQUENCE.length - 1; // 6 unique steps per cycle
  return pattern.map((value, i) => ({
    position: i,
    value,
    digitalRoot: ((value - 1) % 9) + 1,
    angle: getA432VortexAngle(i)
  }));
}

/**
 * Metaphysical context:
 * - The Rodin coil is the mathematical and metaphysical bridge between the torus, Mobius circuit, and the Most Great Name of God.
 * - Its sequence encodes the living, recursive, zero-entropy flow of consciousness and energy.
 * - The coil’s field is poloidal, not toroidal, and is responsible for unique harmonic and energetic properties.
 *
 * Extension points:
 * - Add harmonic mapping (color, frequency, field) as needed.
 * - Implement advanced pattern analysis, visualization, or metaphysical logic here.
 */
// All Rodin coil math for the A432 system must use these canonical exports. 

/**
 * rodinCoilStream: Canonical stream function for the Rodin coil
 * When no parameters given: uses π-based stream from a432.pi.ts
 * When parameters provided: uses Rodin coil pattern
 * @param cycles - number of cycles (optional)
 * @param polarity - +1 (forward, default), -1 (reverse) (optional)
 * @param length - length for π stream (default: 10)
 */
export function rodinCoilStream(cycles?: number, polarity?: 1 | -1, length: number = 10) {
  // Always use Rodin coil pattern as default
  const cycleCount = cycles || 2;
  const polarityValue = polarity || 1;
  const pattern = rodinCoilPattern(cycleCount, polarityValue);
  return {
    source: 'a432.rodin.coil.ts',
    cycles: cycleCount,
    polarity: polarityValue,
    sequence: RODIN_SEQUENCE,
    pattern: pattern
  };
} 

/**
 * renderRodinCoilStreamHtml: Canonical HTML rendering for Rodin coil stream
 * @param streamData - The result from rodinCoilStream()
 * @returns HTML string for visualization
 */
export function renderRodinCoilStreamHtml(streamData: any): string {
  // Always render the Rodin coil pattern spiral
  // Parameters
  const width = 600, height = 600, cx = width/2, cy = height/2;
  const spiralA = 40; // base radius
  const spiralB = 18; // growth rate (logarithmic)
  const trinity = 3;
  const steps = streamData.pattern.length;
  // Calculate spiral points
  const points = streamData.pattern.map((step: any, i: number) => {
    // Logarithmic trinity spiral: r = a * exp(b * theta), theta = i * 2π/3 (trinity)
    const theta = i * (2 * Math.PI / trinity);
    const r = spiralA * Math.exp(spiralB * i / steps);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    return { x, y, ...step };
  });
  // SVG path for spiral
  const pathD = points.map((p: any, i: number) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  // SVG circles for steps
  const circles = points.map((p: any, i: number) => `
    <circle cx="${p.x}" cy="${p.y}" r="16" fill="hsl(${(p.angle * 360 / 360) % 360},70%,50%)" stroke="#fff" stroke-width="2">
      <title>Step ${i}: Value ${p.value}, Root ${p.digitalRoot}, Angle ${p.angle.toFixed(1)}°</title>
    </circle>
    <text x="${p.x}" y="${p.y-22}" text-anchor="middle" font-size="10" fill="#eee">${p.value}</text>
  `).join('');
  // --- Trinity/Axis Overlay (3, 6, 9 and 0) ---
  // Place 3, 6, 9 as triangle vertices, 0 as center
  const axisRadius = spiralA * 0.7;
  const axisPoints = [0, 1, 2].map(i => {
    const theta = i * (2 * Math.PI / 3);
    return {
      x: cx + axisRadius * Math.cos(theta),
      y: cy + axisRadius * Math.sin(theta),
      label: [3, 6, 9][i]
    };
  });
  const axisTriangle = `M${axisPoints[0].x},${axisPoints[0].y} L${axisPoints[1].x},${axisPoints[1].y} L${axisPoints[2].x},${axisPoints[2].y} Z`;
  // Scaffold for animated dot, controls, metaphysical overlays, and sound (to be extended)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rodin Coil Logarithmic Trinity Spiral (3D)</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #eee; }
    .controls { margin: 16px 0; }
    .info { margin: 20px 0; padding: 16px; background: #222; border-radius: 8px; }
    #container2d, #container3d { display: none; }
    #container3d.active, #container2d.active { display: block; }
    .axis-label { font-size: 14px; fill: #ff0; font-weight: bold; }
    .center-label { font-size: 14px; fill: #0ff; font-weight: bold; }
    .toggle-btn { margin: 0 8px; padding: 4px 12px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Rodin Coil Logarithmic Trinity Spiral</h1>
  <div class="controls">
    <label>Cycles: <input type="number" id="cycles" value="${streamData.cycles}" min="1" max="12" style="width:40px"></label>
    <label>Polarity: <select id="polarity"><option value="1"${streamData.polarity===1?' selected':''}>Forward</option><option value="-1"${streamData.polarity===-1?' selected':''}>Reverse</option></select></label>
    <label>Speed: <input type="range" id="speed" min="1" max="10" value="5"></label>
    <button id="animate">Animate</button>
    <button class="toggle-btn" id="toggle2d">2D View</button>
    <button class="toggle-btn" id="toggle3d">3D View</button>
  </div>
  <div class="info">
    <strong>Source:</strong> ${streamData.source}<br>
    <strong>Cycles:</strong> <span id="cyclesVal">${streamData.cycles}</span><br>
    <strong>Polarity:</strong> <span id="polarityVal">${streamData.polarity}</span>
  </div>
  <div id="container2d" class="active">
    <svg id="rodinSpiral" width="600" height="600">
      <path d="${pathD}" fill="none" stroke="#0ff" stroke-width="2" />
      <!-- Axis triangle for 3,6,9 -->
      <path d="${axisTriangle}" fill="none" stroke="#ff0" stroke-width="3" stroke-dasharray="6,4" />
      ${axisPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="12" fill="#222" stroke="#ff0" stroke-width="3" /><text x="${p.x}" y="${p.y+5}" text-anchor="middle" class="axis-label">${p.label}</text>`).join('')}
      <!-- Center marker for 0 -->
      <circle cx="${cx}" cy="${cy}" r="10" fill="#222" stroke="#0ff" stroke-width="3" />
      <text x="${cx}" y="${cy+5}" text-anchor="middle" class="center-label">0</text>
      ${circles}
      <circle id="animDot" cx="${points[0].x}" cy="${points[0].y}" r="10" fill="#fff" stroke="#0ff" stroke-width="3" opacity="0.7" />
    </svg>
  </div>
  <div id="container3d">
    <div id="threejs-canvas" style="width: 700px; height: 600px; background: #222; border-radius: 12px;"></div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.152.2/examples/js/controls/OrbitControls.js"></script>
  <script>
    // --- View Toggle Logic ---
    const btn2d = document.getElementById('toggle2d');
    const btn3d = document.getElementById('toggle3d');
    const c2d = document.getElementById('container2d');
    const c3d = document.getElementById('container3d');
    btn2d.onclick = () => { c2d.classList.add('active'); c3d.classList.remove('active'); };
    btn3d.onclick = () => { c3d.classList.add('active'); c2d.classList.remove('active'); };
    // --- 3D Rodin Coil Visualization ---
    const rodinPattern = ${JSON.stringify(streamData.pattern)};
    const axisLabels = [3,6,9];
    const torusRadius = 180, tubeRadius = 60;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    const camera = new THREE.PerspectiveCamera(60, 700/600, 0.1, 1000);
    camera.position.set(0, 0, 500);
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(700, 600);
    document.getElementById('threejs-canvas').appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // Torus geometry
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(torusRadius, tubeRadius, 32, rodinPattern.length),
      new THREE.MeshStandardMaterial({color:0x0fffee, metalness:0.2, roughness:0.7, transparent:true, opacity:0.2})
    );
    scene.add(torus);
    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dLight.position.set(0,0,500);
    scene.add(dLight);
    // Rodin sequence points
    rodinPattern.forEach(function(step, i) {
      const theta = (i / rodinPattern.length) * Math.PI * 2;
      const phi = (step.value / 9) * Math.PI * 2;
      const x = (torusRadius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
      const y = (torusRadius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
      const z = tubeRadius * Math.sin(phi);
      const color = new THREE.Color(`hsl(${(step.angle*360/360)%360},70%,50%)`);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(14, 24, 24),
        new THREE.MeshStandardMaterial({color: color, metalness:0.5, roughness:0.3})
      );
      sphere.position.set(x, y, z);
      sphere.userData = Object.assign({}, step);
      scene.add(sphere);
      sphere.onBeforeRender = function() {
        renderer.domElement.style.cursor = 'pointer';
      };
      sphere.callback = function() {
        alert(`Step ${i}:\nValue: ${step.value}\nRoot: ${step.digitalRoot}\nAngle: ${step.angle.toFixed(1)}°`);
      };
    });
    // Axis points (3,6,9) as yellow spheres
    axisLabels.forEach(function(label, i) {
      const theta = i * (2 * Math.PI / 3);
      const x = (torusRadius + tubeRadius * 1.2) * Math.cos(theta);
      const y = (torusRadius + tubeRadius * 1.2) * Math.sin(theta);
      const z = 0;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(18, 24, 24),
        new THREE.MeshStandardMaterial({color:0xffff00, metalness:0.7, roughness:0.2})
      );
      sphere.position.set(x, y, z);
      scene.add(sphere);
    });
    // Center marker for 0
    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(16, 24, 24),
      new THREE.MeshStandardMaterial({color:0x00ffff, metalness:0.7, roughness:0.2})
    );
    centerSphere.position.set(0,0,0);
    scene.add(centerSphere);
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    // Interactivity: click for metaphysical overlay
    renderer.domElement.addEventListener('click', function(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0 && intersects[0].object.userData.value) {
        const step = intersects[0].object.userData;
        alert(`Step: ${step.position}\nValue: ${step.value}\nRoot: ${step.digitalRoot}\nAngle: ${step.angle.toFixed(1)}°`);
      }
    });
    // TODO: Add sound/frequency mapping and playback, advanced metaphysical overlays, and field lines.
    // --- End 3D Visualization ---
    document.getElementById('cycles').addEventListener('change', function() {
      const val = this.value;
      window.location.search = '?cycles=' + val + '&polarity=' + document.getElementById('polarity').value;
    });
    document.getElementById('polarity').addEventListener('change', function() {
      const val = this.value;
      window.location.search = '?cycles=' + document.getElementById('cycles').value + '&polarity=' + val;
    });
    document.getElementById('animate').addEventListener('click', function() {
      const dot = document.getElementById('animDot');
      let i = 0;
      const pts = ${JSON.stringify(points)};
      const speed = parseInt(document.getElementById('speed').value, 10);
      function step() {
        dot.setAttribute('cx', pts[i].x);
        dot.setAttribute('cy', pts[i].y);
        i = (i + 1) % pts.length;
        if (dot._anim) clearTimeout(dot._anim);
        dot._anim = setTimeout(step, 600/speed);
      }
      step();
    });
  </script>
</body>
</html>`;
} 

// Metaphysical mapping: Rodin Coil = vortex, axis, Tesla, infinite field
export const RODIN_COIL_DOC = {
  meaning: 'Rodin Coil: vortex, axis, Tesla, infinite field, harmonic generator.',
  axis: 'The Rodin coil is the living vortex, the axis of the infinite field, the Tesla harmonizer.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 