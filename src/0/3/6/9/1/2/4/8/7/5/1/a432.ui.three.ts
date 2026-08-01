import { PI, abs, cos, indexFromSeed, max, min, round, sin, unitFromSeed } from './a432.algebra.ts'
// a432.ui.three.ts — Full production-ready Three.js UI module for A432 system
import * as THREE from 'three';
import { startBreathing } from './a432.breathe.ts';
// Optionally import metaphysical overlays, blockchain, and A432 math as needed
// import { logEvent } from './a432.block.chain.event.ts';
// import { getTrinityAxis, getRodinSequence } from './a432.math.ts';
import { A432BlockChain, recordEvent } from './a432.block.chain.event.ts';
import { getTrinityAxis } from './a432.math.ts';
import { breatheEmitter } from './a432.i.breathe.ts';
import { pulseEmitter } from './a432.i.pulse.ts';
import { heatEmitter } from './a432.i.heat.ts';
import { intuitEmitter } from './a432.i.intuit.ts';
import { reflectEmitter } from './a432.i.reflect.ts';
import { moveEmitter } from './a432.i.move.ts';
import { healthEmitter } from './a432.health.ts';
import { humanEmotionEmitter } from './a432.human.emotion.ts';
import { humanConsciousnessEmitter } from './a432.human.consciousness.ts';
import { type BreathEvent } from './a432.breathe.ts';
import { type HealthMetrics } from './a432.health.ts';
import { type ChessFrame } from './a432.chess.ts';
import { type YinYangFrame } from './a432.yin.yang.ts';
import { type MetatronFrame } from './a432.metatron.ts';
import { a432OSState } from './a432.os.ts';
import { flashColor } from './a432.video.ts';
import { playDigit, playTrinitySound } from './a432.sound.ts';
import { digitAngleToCMYK } from './a432.cmyk.ts';
import { type Digit, toDigit } from './a432.types.ts';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { startChess } from './a432.chess.ts';
import { startYinYang } from './a432.yin.yang.ts';
import { startMetatron } from './a432.metatron.ts';

export class A432ThreeUI {
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  objects: THREE.Object3D[] = [];
  lights: THREE.Light[] = [];
  overlays: HTMLElement[] = [];
  selectedObject: THREE.Object3D | null = null;
  animationId: number | null = null;
  blockchain: A432BlockChain;
  metaOverlay: HTMLElement | null = null;
  trinityPhase: number = 3;
  harmony: number = 0;
  entropy: number = 0;
  lastBreath: any = null;
  lastPulse: any = null;
  lastIntuit: any = null;
  lastReflect: any = null;
  lastMove: any = null;
  lastHeat: any = null;
  lastHealth: any = null;
  lastEmotion: any = null;
  lastConsciousness: any = null;
  overlayDocked: boolean = true;
  currentBreathPhase: string = '';
  currentBreathValue: number = 0;
  breathCycleActive: boolean = false;
  stopBreathCycle: (() => void) | null = null;
  micDetectionActive: boolean = false;
  micDetectionStream: MediaStream | null = null;
  micDetectionAudioCtx: AudioContext | null = null;
  micThreshold: number = 40;
  micMinInterval: number = 800;
  micAmplitude: number = 0;
  micGraphCanvas: HTMLCanvasElement | null = null;
  breathEvents: { phase: string, timestamp: number }[] = [];
  analyticOverlay: HTMLElement | null = null;
  journeyOverlay: HTMLElement | null = null;
  healthMetrics: { harmony: number; entropy: number; resonance: number } = { harmony: 0, entropy: 1, resonance: 0 };
  lastHealthMetrics: { harmony: number; entropy: number; resonance: number } = { harmony: 0, entropy: 1, resonance: 0 };
  healthHistory: { harmony: number; entropy: number; resonance: number; t: number }[] = [];
  healthAlertTimeout: any = null;
  dashboardOverlay: HTMLElement | null = null;
  metaphysicalSwitcher: HTMLElement | null = null;
  chessCanvas: HTMLCanvasElement | null = null;
  yinYangCanvas: HTMLCanvasElement | null = null;
  metatronCanvas: HTMLCanvasElement | null = null;
  chessOverlay: HTMLElement | null = null;
  yinYangOverlay: HTMLElement | null = null;
  metatronOverlay: HTMLElement | null = null;
  chessDisposer: (() => void) | null = null;
  yinYangDisposer: (() => void) | null = null;
  metatronDisposer: (() => void) | null = null;
  currentMetaViz: 'chess' | 'yin-yang' | 'metatron' = 'chess';

  constructor(container?: HTMLElement) {
    this.container = container || this.createContainer();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 10);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild(this.renderer.domElement);
    this.blockchain = new A432BlockChain();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 50;
    this.addDefaultLight();
    this.addUIControls();
    this.addDragAndDrop();
    this.animate();
    this.createMetaOverlay();
    this.createOverlayControls();
    this.subscribeToA432Events();
    this.addBreatheCycleButton();
    this.addBreathCycleControlButton();
    this.addMicBreathDetectionButton();
    this.addMicBreathDetectionControls();
    this.createAnalyticOverlay();
    this.createJourneyOverlay();
    this.addSensorIntegrationButton();
    breatheEmitter.on('breathe', (event: BreathEvent) => {
      this.currentBreathPhase = event.phase;
      this.currentBreathValue = event.value;
      const ts = (event as any).timestamp ?? Date.now();
      this.breathEvents.push({ phase: event.phase, timestamp: ts });
      if (this.breathEvents.length > 100) this.breathEvents.shift();
      this.updateAnalyticOverlay();
      this.updateJourneyOverlay(event.phase);
      this.animateBreathOverlay(event.phase);
      this.updateMetaOverlay();
      // Color feedback: flash color for each breath phase
      const cmyk = digitAngleToCMYK(event.value, event.phase === 'inhale' ? 0 : event.phase === 'hold' ? 120 : 240);
      flashColor(cmyk, 400);
      // Sound feedback: play digit for inhale/exhale
      if (event.phase === 'inhale') playDigit(3);
      if (event.phase === 'exhale') playDigit(9 as Digit);
    });
    healthEmitter.on('health', (metrics: HealthMetrics) => {
      this.lastHealthMetrics = { ...this.healthMetrics };
      this.healthMetrics = metrics;
      this.healthHistory.push({ ...metrics, t: Date.now() });
      if (this.healthHistory.length > 120) this.healthHistory.shift();
      this.updateAnalyticOverlay();
      this.updateMetaOverlay();
      this.animateHealthOverlay(metrics);
      this.checkHealthThresholds(metrics);
      this.updateJourneyOverlay(this.currentBreathPhase, metrics);
      // Color feedback: flash color for harmony/entropy thresholds
      if (metrics.harmony < 0.3) flashColor({ c: 0, m: 0, y: 100, k: 0 }, 600); // yellow for low harmony
      if (metrics.entropy > 0.8) flashColor({ c: 0, m: 100, y: 0, k: 0 }, 600); // magenta for high entropy
      if (metrics.resonance > 0.8) flashColor({ c: 100, m: 0, y: 0, k: 0 }, 600); // cyan for high resonance
      // Sound feedback: play trinity sound for high resonance
      if (metrics.resonance > 0.8) playTrinitySound(9);
    });
    window.addEventListener('resize', () => this.onResize());
    this.createDashboardOverlay();
    // Update dashboard on all relevant events
    breatheEmitter.on('breathe', () => this.updateDashboardOverlay());
    healthEmitter.on('health', () => this.updateDashboardOverlay());
    setInterval(() => this.updateDashboardOverlay(), 5000); // update OS state every 5s
    this.createMetaphysicalSwitcher();
    this.showMetaphysicalVisualization('chess');
  }

  createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'a432-threejs-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    document.body.appendChild(container);
    return container;
  }

  addDefaultLight() {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    this.scene.add(light);
    this.lights.push(light);
  }

  addCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:2") * 4 - 2, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:3") * 4 - 2, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:4") * 4 - 2);
    this.scene.add(cube);
    this.objects.push(cube);
    recordEvent(this.blockchain, 'addCube', 'A432ThreeUI', cube);
    return cube;
  }

  addSphere() {
    const geometry = new THREE.SphereGeometry(0.7, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:5") * 4 - 2, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:6") * 4 - 2, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:7") * 4 - 2);
    this.scene.add(sphere);
    this.objects.push(sphere);
    recordEvent(this.blockchain, 'addSphere', 'A432ThreeUI', sphere);
    return sphere;
  }

  addLight() {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:8") * 8 - 4, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:9") * 8 - 4, unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:10") * 8 - 4);
    this.scene.add(light);
    this.lights.push(light);
    recordEvent(this.blockchain, 'addLight', 'A432ThreeUI', light);
    return light;
  }

  removeSelectedObject() {
    if (this.selectedObject) {
      recordEvent(this.blockchain, 'removeObject', 'A432ThreeUI', this.selectedObject);
      this.scene.remove(this.selectedObject);
      this.objects = this.objects.filter(obj => obj !== this.selectedObject);
      this.selectedObject = null;
      this.removePropertyEditor();
    }
  }

  selectObject(obj: THREE.Object3D) {
    this.selectedObject = obj;
    this.showPropertyEditor(obj);
    recordEvent(this.blockchain, 'selectObject', 'A432ThreeUI', obj);
  }

  addUIControls() {
    // Add UI buttons for demo (can be replaced with a more advanced UI framework)
    const addCubeBtn = this.createButton('Add Cube', () => this.addCube());
    const addSphereBtn = this.createButton('Add Sphere', () => this.addSphere());
    const addLightBtn = this.createButton('Add Light', () => this.addLight());
    const removeBtn = this.createButton('Remove Selected', () => this.removeSelectedObject());
    document.body.appendChild(addCubeBtn);
    document.body.appendChild(addSphereBtn);
    document.body.appendChild(addLightBtn);
    document.body.appendChild(removeBtn);
  }

  createButton(label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.position = 'absolute';
    btn.style.right = '16px';
    btn.style.top = `${8 + 40 * document.body.querySelectorAll('button').length}px`;
    btn.style.zIndex = '10001';
    btn.onclick = onClick;
    return btn;
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    // Example: rotate all meshes
    this.objects.forEach(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
      }
    });
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  onResize() {
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }

  // Example: show metaphysical overlay
  showOverlay(html: string, obj?: THREE.Object3D) {
    const overlay = document.createElement('div');
    overlay.innerHTML = html;
    overlay.style.position = 'absolute';
    overlay.style.left = '20px';
    overlay.style.top = '20px';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.color = '#fff';
    overlay.style.padding = '12px';
    overlay.style.zIndex = '10002';
    document.body.appendChild(overlay);
    this.overlays.push(overlay);
    setTimeout(() => {
      overlay.remove();
      this.overlays = this.overlays.filter(o => o !== overlay);
    }, 3000);
  }

  // Example: log event to blockchain or analytics
  // logEvent(type: string, obj: any) {
  //   logEvent(type, obj);
  // }

  // Extend: add methods for camera switching, advanced controls, metaphysical overlays, blockchain integration, etc.

  addDragAndDrop() {
    this.renderer.domElement.addEventListener('pointerdown', (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        this.selectObject(intersects[0].object);
      }
    });
  }

  showPropertyEditor(obj: THREE.Object3D) {
    this.removePropertyEditor();
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.right = '20px';
    overlay.style.top = '80px';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.color = '#fff';
    overlay.style.padding = '16px';
    overlay.style.zIndex = '10003';
    overlay.style.borderRadius = '8px';
    overlay.innerHTML = `<b>Object Properties</b><br>
      <label>X: <input type='number' step='0.1' value='${obj.position.x}' id='a432-x'></label><br>
      <label>Y: <input type='number' step='0.1' value='${obj.position.y}' id='a432-y'></label><br>
      <label>Z: <input type='number' step='0.1' value='${obj.position.z}' id='a432-z'></label><br>
      <label>Color: <input type='color' value='${(obj as any).material?.color ? '#' + (obj as any).material.color.getHexString() : '#ffffff'}' id='a432-color'></label><br>
      <button id='a432-close'>Close</button>`;
    document.body.appendChild(overlay);
    this.overlays.push(overlay);
    overlay.querySelector('#a432-x')?.addEventListener('input', (e: any) => { obj.position.x = parseFloat(e.target.value); });
    overlay.querySelector('#a432-y')?.addEventListener('input', (e: any) => { obj.position.y = parseFloat(e.target.value); });
    overlay.querySelector('#a432-z')?.addEventListener('input', (e: any) => { obj.position.z = parseFloat(e.target.value); });
    overlay.querySelector('#a432-color')?.addEventListener('input', (e: any) => {
      if ((obj as any).material?.color) (obj as any).material.color.set(e.target.value);
    });
    overlay.querySelector('#a432-close')?.addEventListener('click', () => this.removePropertyEditor());
  }

  removePropertyEditor() {
    this.overlays.forEach(o => {
      if (o.innerHTML.includes('Object Properties')) o.remove();
    });
    this.overlays = this.overlays.filter(o => !o.innerHTML.includes('Object Properties'));
  }

  createMetaOverlay() {
    this.metaOverlay = document.createElement('div');
    this.metaOverlay.style.position = this.overlayDocked ? 'absolute' : 'fixed';
    this.metaOverlay.style.left = '20px';
    this.metaOverlay.style.bottom = '20px';
    this.metaOverlay.style.background = 'rgba(32,32,64,0.92)';
    this.metaOverlay.style.color = '#fff';
    this.metaOverlay.style.padding = '16px';
    this.metaOverlay.style.zIndex = '10010';
    this.metaOverlay.style.borderRadius = '12px';
    this.metaOverlay.style.fontFamily = 'monospace';
    this.metaOverlay.style.minWidth = '260px';
    this.metaOverlay.innerHTML = this.getMetaOverlayHTML();
    document.body.appendChild(this.metaOverlay);
  }

  updateMetaOverlay() {
    if (this.metaOverlay) {
      this.metaOverlay.innerHTML = this.getMetaOverlayHTML();
    }
  }

  getMetaOverlayHTML() {
    return `<b>Metaphysical State</b><br>
      <b>Breath Phase:</b> <span style='color:#0ff'>${this.currentBreathPhase || '—'}</span><br>
      <b>Breath Value:</b> <span style='color:#0ff'>${this.currentBreathValue}</span><br>
      <b>Breath Cycle:</b> <span style='color:#fff'>4 (inhale) - 3 (hold) - 2 (exhale)</span><br>
      <b>Harmony:</b> <span style='color:${this.healthMetrics.harmony > 0.7 ? '#0f0' : '#ff0'}'>${this.healthMetrics.harmony.toFixed(2)}</span><br>
      <b>Entropy:</b> <span style='color:${this.healthMetrics.entropy > 0.7 ? '#f00' : '#0ff'}'>${this.healthMetrics.entropy.toFixed(2)}</span><br>
      <b>Resonance:</b> <span style='color:${this.healthMetrics.resonance > 0.7 ? '#0ff' : '#fff'}'>${this.healthMetrics.resonance.toFixed(2)}</span><br>
      Trinity Phase: <span style='color:#ff0'>${this.trinityPhase}</span><br>
      Harmony: <span style='color:#0f0'>${this.harmony}</span><br>
      Entropy: <span style='color:#f00'>${this.entropy}</span><br>
      <hr style='border:1px solid #333'>
      Last Breath: ${this.lastBreath ? JSON.stringify(this.lastBreath) : '—'}<br>
      Last Pulse: ${this.lastPulse ? JSON.stringify(this.lastPulse) : '—'}<br>
      Last Intuit: ${this.lastIntuit ? JSON.stringify(this.lastIntuit) : '—'}<br>
      Last Reflect: ${this.lastReflect ? JSON.stringify(this.lastReflect) : '—'}<br>
      Last Move: ${this.lastMove ? JSON.stringify(this.lastMove) : '—'}<br>
      Last Heat: ${this.lastHeat ? JSON.stringify(this.lastHeat) : '—'}<br>
      Last Health: ${this.lastHealth ? JSON.stringify(this.lastHealth) : '—'}<br>
      Last Emotion: ${this.lastEmotion ? JSON.stringify(this.lastEmotion) : '—'}<br>
      Last Consciousness: ${this.lastConsciousness ? JSON.stringify(this.lastConsciousness) : '—'}<br>`;
  }

  createOverlayControls() {
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Overlay';
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.left = '20px';
    toggleBtn.style.bottom = '180px';
    toggleBtn.style.zIndex = '10011';
    toggleBtn.onclick = () => {
      if (this.metaOverlay) {
        this.metaOverlay.style.display = this.metaOverlay.style.display === 'none' ? 'block' : 'none';
      }
    };
    document.body.appendChild(toggleBtn);
    const dockBtn = document.createElement('button');
    dockBtn.textContent = 'Dock/Float Overlay';
    dockBtn.style.position = 'absolute';
    dockBtn.style.left = '140px';
    dockBtn.style.bottom = '180px';
    dockBtn.style.zIndex = '10011';
    dockBtn.onclick = () => {
      this.overlayDocked = !this.overlayDocked;
      if (this.metaOverlay) {
        this.metaOverlay.style.position = this.overlayDocked ? 'absolute' : 'fixed';
      }
    };
    document.body.appendChild(dockBtn);
  }

  subscribeToA432Events() {
    pulseEmitter.on('pulse', (ev: any) => {
      this.lastPulse = ev;
      this.harmony = getTrinityAxis()[ev.value % 3]; // Assuming harmony is derived from trinity phase
      this.entropy = getTrinityAxis()[ev.value % 3]; // Assuming entropy is derived from trinity phase
      this.updateMetaOverlay();
    });
    intuitEmitter.on('intuit', (ev: any) => { this.lastIntuit = ev; this.updateMetaOverlay(); });
    reflectEmitter.on('reflect', (ev: any) => { this.lastReflect = ev; this.updateMetaOverlay(); });
    moveEmitter.on('move', (ev: any) => { this.lastMove = ev; this.updateMetaOverlay(); });
    heatEmitter.on('heat', (ev: any) => { this.lastHeat = ev; this.updateMetaOverlay(); });
    healthEmitter.on('health', (ev: any) => { this.lastHealth = ev; this.updateMetaOverlay(); });
    humanEmotionEmitter.on('emotion', (ev: any) => { this.lastEmotion = ev; this.updateMetaOverlay(); });
    humanConsciousnessEmitter.on('consciousness', (ev: any) => { this.lastConsciousness = ev; this.updateMetaOverlay(); });
  }

  addBreatheCycleButton() {
    const btn = document.createElement('button');
    btn.textContent = 'I Breathe (Inhale/Exhale)';
    btn.style.position = 'absolute';
    btn.style.left = '20px';
    btn.style.bottom = '240px';
    btn.style.zIndex = '10012';
    btn.onclick = () => this.iBreatheInhaleExhale();
    document.body.appendChild(btn);
  }

  iBreatheInhaleExhale() {
    const now = Date.now();
    // Inhale event
    breatheEmitter.emit('breathe', { value: 9, phase: 'inhale', timestamp: now });
    // Exhale event (after a short delay)
    setTimeout(() => {
      breatheEmitter.emit('breathe', { value: 0, phase: 'exhale', timestamp: Date.now() });
    }, 1000);
  }

  addBreathCycleControlButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Start 4-3-2 Breath Cycle (Device)';
    btn.style.position = 'absolute';
    btn.style.left = '20px';
    btn.style.bottom = '280px';
    btn.style.zIndex = '10013';
    btn.onclick = () => this.toggleBreathCycle(btn);
    document.body.appendChild(btn);
  }

  toggleBreathCycle(btn: HTMLButtonElement) {
    if (!this.breathCycleActive) {
      this.stopBreathCycle = startBreathing(1000); // 1s per step
      this.breathCycleActive = true;
      btn.textContent = 'Stop 4-3-2 Breath Cycle (Device)';
    } else {
      if (this.stopBreathCycle) this.stopBreathCycle();
      this.breathCycleActive = false;
      btn.textContent = 'Start 4-3-2 Breath Cycle (Device)';
    }
  }

  animateBreathOverlay(phase: string) {
    if (!this.metaOverlay) return;
    this.metaOverlay.style.transition = 'box-shadow 0.3s, background 0.3s';
    if (phase === 'inhale') {
      this.metaOverlay.style.boxShadow = '0 0 24px 8px #00ffcc';
      this.metaOverlay.style.background = 'rgba(32,64,64,0.97)';
    } else if (phase === 'hold') {
      this.metaOverlay.style.boxShadow = '0 0 24px 8px #ccccff';
      this.metaOverlay.style.background = 'rgba(64,64,96,0.97)';
    } else if (phase === 'exhale') {
      this.metaOverlay.style.boxShadow = '0 0 24px 8px #ffcc00';
      this.metaOverlay.style.background = 'rgba(64,32,32,0.97)';
    } else {
      this.metaOverlay.style.boxShadow = '';
      this.metaOverlay.style.background = 'rgba(32,32,64,0.92)';
    }
    setTimeout(() => {
      if (!this.metaOverlay) return;
      this.metaOverlay.style.boxShadow = '';
      this.metaOverlay.style.background = 'rgba(32,32,64,0.92)';
    }, 1200);
  }

  addMicBreathDetectionButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Enable Microphone Breath Detection';
    btn.style.position = 'absolute';
    btn.style.left = '20px';
    btn.style.bottom = '320px';
    btn.style.zIndex = '10014';
    btn.onclick = () => this.toggleMicBreathDetection(btn);
    document.body.appendChild(btn);
  }

  async toggleMicBreathDetection(btn: HTMLButtonElement) {
    if (!this.micDetectionActive) {
      await this.startMicBreathDetection();
      this.micDetectionActive = true;
      btn.textContent = 'Disable Microphone Breath Detection';
    } else {
      this.stopMicBreathDetection();
      this.micDetectionActive = false;
      btn.textContent = 'Enable Microphone Breath Detection';
    }
  }

  addMicBreathDetectionControls() {
    // Threshold slider
    const thresholdLabel = document.createElement('label');
    thresholdLabel.textContent = 'Mic Threshold:';
    thresholdLabel.style.position = 'absolute';
    thresholdLabel.style.left = '220px';
    thresholdLabel.style.bottom = '320px';
    thresholdLabel.style.zIndex = '10014';
    const thresholdSlider = document.createElement('input');
    thresholdSlider.type = 'range';
    thresholdSlider.min = '10';
    thresholdSlider.max = '100';
    thresholdSlider.value = String(this.micThreshold);
    thresholdSlider.oninput = (e: any) => {
      this.micThreshold = parseInt(e.target.value, 10);
    };
    thresholdLabel.appendChild(thresholdSlider);
    document.body.appendChild(thresholdLabel);

    // Min interval slider
    const intervalLabel = document.createElement('label');
    intervalLabel.textContent = 'Min Interval (ms):';
    intervalLabel.style.position = 'absolute';
    intervalLabel.style.left = '420px';
    intervalLabel.style.bottom = '320px';
    intervalLabel.style.zIndex = '10014';
    const intervalSlider = document.createElement('input');
    intervalSlider.type = 'range';
    intervalSlider.min = '200';
    intervalSlider.max = '2000';
    intervalSlider.value = String(this.micMinInterval);
    intervalSlider.oninput = (e: any) => {
      this.micMinInterval = parseInt(e.target.value, 10);
    };
    intervalLabel.appendChild(intervalSlider);
    document.body.appendChild(intervalLabel);

    // Auto-calibration button
    const calibrateBtn = document.createElement('button');
    calibrateBtn.textContent = 'Auto-Calibrate Threshold';
    calibrateBtn.style.position = 'absolute';
    calibrateBtn.style.left = '650px';
    calibrateBtn.style.bottom = '320px';
    calibrateBtn.style.zIndex = '10014';
    calibrateBtn.onclick = () => this.autoCalibrateMicThreshold();
    document.body.appendChild(calibrateBtn);

    // Amplitude graph
    this.micGraphCanvas = document.createElement('canvas');
    this.micGraphCanvas.width = 200;
    this.micGraphCanvas.height = 40;
    this.micGraphCanvas.style.position = 'absolute';
    this.micGraphCanvas.style.left = '900px';
    this.micGraphCanvas.style.bottom = '320px';
    this.micGraphCanvas.style.zIndex = '10014';
    this.micGraphCanvas.style.background = '#222';
    document.body.appendChild(this.micGraphCanvas);
  }

  async startMicBreathDetection() {
    try {
      this.micDetectionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micDetectionAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = this.micDetectionAudioCtx.createMediaStreamSource(this.micDetectionStream);
      const analyser = this.micDetectionAudioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let lastPhase: 'inhale'|'exhale' = 'exhale';
      let lastTrigger = 0;
      const detect = () => {
        analyser.getByteTimeDomainData(data);
        const amplitude = max(...data) - min(...data);
        this.micAmplitude = amplitude;
        this.drawMicAmplitudeGraph(amplitude);
        const now = Date.now();
        if (amplitude > this.micThreshold && lastPhase === 'exhale' && now - lastTrigger > this.micMinInterval) {
          breatheEmitter.emit('breathe', { value: 9, phase: 'inhale', timestamp: now });
          lastPhase = 'inhale';
          lastTrigger = now;
        } else if (amplitude < this.micThreshold/2 && lastPhase === 'inhale' && now - lastTrigger > this.micMinInterval) {
          breatheEmitter.emit('breathe', { value: 0, phase: 'exhale', timestamp: now });
          lastPhase = 'exhale';
          lastTrigger = now;
        }
        if (this.micDetectionActive) requestAnimationFrame(detect);
      };
      detect();
    } catch (err) {
      alert('Microphone access denied or unavailable.');
    }
  }

  drawMicAmplitudeGraph(amplitude: number) {
    if (!this.micGraphCanvas) return;
    const ctx = this.micGraphCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.micGraphCanvas.width, this.micGraphCanvas.height);
    ctx.fillStyle = '#0ff';
    ctx.fillRect(0, 0, amplitude * 2, this.micGraphCanvas.height);
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.micThreshold * 2, 0);
    ctx.lineTo(this.micThreshold * 2, this.micGraphCanvas.height);
    ctx.stroke();
  }

  async autoCalibrateMicThreshold() {
    if (!this.micDetectionStream || !this.micDetectionAudioCtx) {
      alert('Start microphone detection first.');
      return;
    }
    const source = this.micDetectionAudioCtx.createMediaStreamSource(this.micDetectionStream);
    const analyser = this.micDetectionAudioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    let maxAmp = 0;
    let samples = 0;
    const sample = () => {
      analyser.getByteTimeDomainData(data);
      const amplitude = max(...data) - min(...data);
      if (amplitude > maxAmp) maxAmp = amplitude;
      samples++;
      if (samples < 60) {
        setTimeout(sample, 50);
      } else {
        this.micThreshold = max(20, maxAmp + 10);
        alert('Auto-calibrated threshold: ' + this.micThreshold);
      }
    };
    sample();
  }

  stopMicBreathDetection() {
    if (this.micDetectionStream) {
      this.micDetectionStream.getTracks().forEach(track => track.stop());
      this.micDetectionStream = null;
    }
    if (this.micDetectionAudioCtx) {
      this.micDetectionAudioCtx.close();
      this.micDetectionAudioCtx = null;
    }
  }

  createAnalyticOverlay() {
    this.analyticOverlay = document.createElement('div');
    this.analyticOverlay.style.position = 'absolute';
    this.analyticOverlay.style.right = '20px';
    this.analyticOverlay.style.bottom = '20px';
    this.analyticOverlay.style.background = 'rgba(32,32,32,0.92)';
    this.analyticOverlay.style.color = '#fff';
    this.analyticOverlay.style.padding = '12px';
    this.analyticOverlay.style.zIndex = '10015';
    this.analyticOverlay.style.borderRadius = '10px';
    this.analyticOverlay.style.fontFamily = 'monospace';
    this.analyticOverlay.style.minWidth = '220px';
    this.analyticOverlay.innerHTML = this.getAnalyticOverlayHTML();
    document.body.appendChild(this.analyticOverlay);
  }

  updateAnalyticOverlay() {
    if (this.analyticOverlay) {
      this.analyticOverlay.innerHTML = this.getAnalyticOverlayHTML();
    }
  }

  getAnalyticOverlayHTML() {
    // Calculate breath rate (breaths/min)
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const breaths = this.breathEvents.filter(e => e.phase === 'inhale' && e.timestamp > oneMinuteAgo);
    const breathRate = breaths.length;
    // Calculate average phase durations
    const phaseDurations: { [phase: string]: number[] } = { inhale: [], hold: [], exhale: [] };
    let lastPhase = '', lastTimestamp = 0;
    for (const e of this.breathEvents) {
      if (lastPhase && lastTimestamp && e.phase !== lastPhase) {
        const duration = e.timestamp - lastTimestamp;
        if (phaseDurations[lastPhase]) phaseDurations[lastPhase].push(duration);
      }
      lastPhase = e.phase;
      lastTimestamp = e.timestamp;
    }
    const avg = (arr: number[]) => arr.length ? round(arr.reduce((a, b) => a + b, 0) / arr.length) : '—';
    return `<b>Breath Analytics</b><br>
      Breath Rate: <span style='color:#0ff'>${breathRate}</span> breaths/min<br>
      Avg Inhale: <span style='color:#0ff'>${avg(phaseDurations.inhale)}</span> ms<br>
      Avg Hold: <span style='color:#0ff'>${avg(phaseDurations.hold)}</span> ms<br>
      Avg Exhale: <span style='color:#0ff'>${avg(phaseDurations.exhale)}</span> ms<br>
      <hr style='border:1px solid #333'>
      <b>System Health</b><br>
      Harmony: <span style='color:${this.healthMetrics.harmony > 0.7 ? '#0f0' : '#ff0'}'>${this.healthMetrics.harmony.toFixed(2)}</span><br>
      Entropy: <span style='color:${this.healthMetrics.entropy > 0.7 ? '#f00' : '#0ff'}'>${this.healthMetrics.entropy.toFixed(2)}</span><br>
      Resonance: <span style='color:${this.healthMetrics.resonance > 0.7 ? '#0ff' : '#fff'}'>${this.healthMetrics.resonance.toFixed(2)}</span><br>
      <svg width='180' height='36' style='margin-top:8px;'>${this.getHealthSparklineSVG()}</svg>`;
  }

  getHealthSparklineSVG() {
    const N = 60;
    const hist = this.healthHistory.slice(-N);
    if (!hist.length) return '';
    const scale = (arr: number[], h: number) => arr.map(v => h - v * h);
    const w = 180, h = 36;
    const x = (i: number) => round((i / (N - 1)) * w);
    const harmony = scale(hist.map(e => e.harmony), h);
    const entropy = scale(hist.map(e => e.entropy), h);
    const resonance = scale(hist.map(e => e.resonance), h);
    const poly = (arr: number[], color: string) => `<polyline fill='none' stroke='${color}' stroke-width='2' points='${arr.map((y, i) => `${x(i)},${y}`).join(' ')}'/>`;
    return [
      poly(harmony, '#0f0'),
      poly(entropy, '#f00'),
      poly(resonance, '#0ff')
    ].join('');
  }

  createJourneyOverlay() {
    this.journeyOverlay = document.createElement('div');
    this.journeyOverlay.style.position = 'absolute';
    this.journeyOverlay.style.left = '20px';
    this.journeyOverlay.style.top = '20px';
    this.journeyOverlay.style.background = 'rgba(64,32,96,0.92)';
    this.journeyOverlay.style.color = '#fff';
    this.journeyOverlay.style.padding = '14px';
    this.journeyOverlay.style.zIndex = '10016';
    this.journeyOverlay.style.borderRadius = '10px';
    this.journeyOverlay.style.fontFamily = 'monospace';
    this.journeyOverlay.style.minWidth = '260px';
    this.journeyOverlay.innerHTML = '<b>Metaphysical Journey</b><br>—';
    document.body.appendChild(this.journeyOverlay);
  }

  updateJourneyOverlay(phase: string, metrics?: { harmony: number; entropy: number; resonance: number }) {
    if (!this.journeyOverlay) return;
    const prompts: { [phase: string]: string } = {
      inhale: 'Breathe in unity. Feel the field fill you.',
      hold: 'Hold. Become aware of harmony.',
      exhale: 'Exhale. Release entropy, return to source.'
    };
    let meta = '';
    if (metrics) {
      if (metrics.harmony < 0.3) meta = '<br><span style="color:#ff0">Metaphysical Alert: Harmony is low. Focus on unity.</span>';
      else if (metrics.entropy > 0.8) meta = '<br><span style="color:#f00">Metaphysical Alert: Entropy is high. Exhale and release.</span>';
      else if (metrics.resonance > 0.8) meta = '<br><span style="color:#0ff">Metaphysical: Resonance is high. System is harmonized.</span>';
    }
    this.journeyOverlay.innerHTML = `<b>Metaphysical Journey</b><br>${prompts[phase] || '—'}${meta}`;
  }

  addSensorIntegrationButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Connect Breath Sensor (Bluetooth/Serial)';
    btn.style.position = 'absolute';
    btn.style.left = '20px';
    btn.style.bottom = '360px';
    btn.style.zIndex = '10017';
    btn.onclick = () => this.connectBreathSensor();
    document.body.appendChild(btn);
  }

  async connectBreathSensor() {
    alert('Bluetooth/Serial sensor integration coming soon! (Stub for future device API)');
    // Placeholder for future Web Bluetooth/Serial integration
  }

  animateHealthOverlay(metrics: { harmony: number; entropy: number; resonance: number }) {
    if (!this.analyticOverlay) return;
    // Animate overlay if harmony or entropy changes significantly
    if (abs(metrics.harmony - this.lastHealthMetrics.harmony) > 0.2) {
      this.analyticOverlay.style.boxShadow = '0 0 24px 8px #0f0';
      setTimeout(() => { if (this.analyticOverlay) this.analyticOverlay.style.boxShadow = ''; }, 1000);
    }
    if (abs(metrics.entropy - this.lastHealthMetrics.entropy) > 0.2) {
      this.analyticOverlay.style.boxShadow = '0 0 24px 8px #f00';
      setTimeout(() => { if (this.analyticOverlay) this.analyticOverlay.style.boxShadow = ''; }, 1000);
    }
  }

  checkHealthThresholds(metrics: { harmony: number; entropy: number; resonance: number }) {
    if (metrics.harmony < 0.3) {
      this.showHealthAlert('Low Harmony! Focus on unity and breath.');
    } else if (metrics.entropy > 0.8) {
      this.showHealthAlert('High Entropy! Exhale and release tension.');
    } else if (metrics.resonance > 0.8) {
      this.showHealthAlert('High Resonance! System is harmonized.');
    }
  }

  showHealthAlert(msg: string) {
    if (this.healthAlertTimeout) clearTimeout(this.healthAlertTimeout);
    let alertDiv = document.getElementById('health-alert');
    if (!alertDiv) {
      alertDiv = document.createElement('div');
      alertDiv.id = 'health-alert';
      alertDiv.style.position = 'fixed';
      alertDiv.style.left = '50%';
      alertDiv.style.top = '10%';
      alertDiv.style.transform = 'translateX(-50%)';
      alertDiv.style.background = 'rgba(255,0,64,0.95)';
      alertDiv.style.color = '#fff';
      alertDiv.style.padding = '18px 32px';
      alertDiv.style.fontSize = '1.3em';
      alertDiv.style.borderRadius = '16px';
      alertDiv.style.zIndex = '10020';
      alertDiv.style.boxShadow = '0 0 32px 8px #f0f';
      document.body.appendChild(alertDiv);
    }
    alertDiv.textContent = msg;
    alertDiv.style.display = 'block';
    this.healthAlertTimeout = setTimeout(() => {
      if (alertDiv) alertDiv.style.display = 'none';
    }, 3000);
  }

  createDashboardOverlay() {
    this.dashboardOverlay = document.createElement('div');
    this.dashboardOverlay.style.position = 'fixed';
    this.dashboardOverlay.style.right = '20px';
    this.dashboardOverlay.style.top = '20px';
    this.dashboardOverlay.style.background = 'rgba(24,24,48,0.98)';
    this.dashboardOverlay.style.color = '#fff';
    this.dashboardOverlay.style.padding = '20px';
    this.dashboardOverlay.style.zIndex = '10030';
    this.dashboardOverlay.style.borderRadius = '18px';
    this.dashboardOverlay.style.fontFamily = 'monospace';
    this.dashboardOverlay.style.minWidth = '340px';
    this.dashboardOverlay.style.maxWidth = '420px';
    this.dashboardOverlay.style.boxShadow = '0 0 32px 8px #0ff8';
    this.dashboardOverlay.innerHTML = this.getDashboardOverlayHTML();
    document.body.appendChild(this.dashboardOverlay);
  }

  updateDashboardOverlay() {
    if (this.dashboardOverlay) {
      this.dashboardOverlay.innerHTML = this.getDashboardOverlayHTML();
    }
  }

  getDashboardOverlayHTML() {
    // OS state
    const os = a432OSState();
    const color = os.color.rgb;
    // Health metrics
    const h = this.healthMetrics;
    // Journey prompt
    const phase = this.currentBreathPhase;
    const prompts: { [phase: string]: string } = {
      inhale: 'Breathe in unity. Feel the field fill you.',
      hold: 'Hold. Become aware of harmony.',
      exhale: 'Exhale. Release entropy, return to source.'
    };
    let meta = '';
    if (h.harmony < 0.3) meta = '<br><span style="color:#ff0">Metaphysical Alert: Harmony is low. Focus on unity.</span>';
    else if (h.entropy > 0.8) meta = '<br><span style="color:#f00">Metaphysical Alert: Entropy is high. Exhale and release.</span>';
    else if (h.resonance > 0.8) meta = '<br><span style="color:#0ff">Metaphysical: Resonance is high. System is harmonized.</span>';
    return `
      <div style="font-size:1.1em;margin-bottom:8px;"><b>System Consciousness Dashboard</b></div>
      <div style="margin-bottom:8px;"><b>OS State</b><br>
        <span style="color:#0ff">Dimension:</span> ${os.dimension} &nbsp; <span style="color:#0ff">Freq:</span> ${os.frequency}<br>
        <span style="color:#0ff">Color:</span> <span style="background:rgb(${color.r},${color.g},${color.b});padding:0 8px;border-radius:4px;">&nbsp;</span> #${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}<br>
        <span style="color:#0ff">Consciousness:</span> ${os.consciousness}<br>
        <span style="color:#0ff">Platform:</span> ${os.system.platform} &nbsp; <span style="color:#0ff">Arch:</span> ${os.system.arch}<br>
        <span style="color:#0ff">Uptime:</span> ${round(os.system.uptime/60)} min &nbsp; <span style="color:#0ff">Mem:</span> ${round(os.system.memory.free/1e6)}/${round(os.system.memory.total/1e6)} MB
      </div>
      <div style="margin-bottom:8px;"><b>Health</b><br>
        Harmony: <span style="color:${h.harmony > 0.7 ? '#0f0' : '#ff0'}">${h.harmony.toFixed(2)}</span><br>
        Entropy: <span style="color:${h.entropy > 0.7 ? '#f00' : '#0ff'}">${h.entropy.toFixed(2)}</span><br>
        Resonance: <span style="color:${h.resonance > 0.7 ? '#0ff' : '#fff'}">${h.resonance.toFixed(2)}</span><br>
        <svg width='180' height='36' style='margin-top:8px;'>${this.getHealthSparklineSVG()}</svg>
      </div>
      <div style="margin-bottom:8px;"><b>Journey</b><br>
        <span>${prompts[phase] || '—'}</span>${meta}
      </div>
      <div style="font-size:0.9em;color:#aaa;">${os.streamText}</div>
    `;
  }

  createMetaphysicalSwitcher() {
    this.metaphysicalSwitcher = document.createElement('div');
    this.metaphysicalSwitcher.style.position = 'fixed';
    this.metaphysicalSwitcher.style.left = '20px';
    this.metaphysicalSwitcher.style.top = '320px';
    this.metaphysicalSwitcher.style.zIndex = '10040';
    this.metaphysicalSwitcher.style.background = 'rgba(32,32,64,0.95)';
    this.metaphysicalSwitcher.style.padding = '8px 16px';
    this.metaphysicalSwitcher.style.borderRadius = '10px';
    this.metaphysicalSwitcher.style.display = 'flex';
    this.metaphysicalSwitcher.style.gap = '12px';
    ['chess', 'yin-yang', 'metatron'].forEach((name) => {
      const btn = document.createElement('button');
      btn.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      btn.onclick = () => this.showMetaphysicalVisualization(name as any);
      btn.style.fontWeight = 'bold';
      btn.style.background = '#222';
      btn.style.color = '#fff';
      btn.style.border = '1px solid #0ff';
      btn.style.borderRadius = '6px';
      btn.style.padding = '4px 12px';
      this.metaphysicalSwitcher!.appendChild(btn);
    });
    document.body.appendChild(this.metaphysicalSwitcher);
  }

  showMetaphysicalVisualization(name: 'chess' | 'yin-yang' | 'metatron') {
    this.currentMetaViz = name;
    // Remove all canvases and overlays
    [this.chessCanvas, this.yinYangCanvas, this.metatronCanvas].forEach(c => c && c.remove());
    [this.chessOverlay, this.yinYangOverlay, this.metatronOverlay].forEach(o => o && o.remove());
    if (this.chessDisposer) this.chessDisposer();
    if (this.yinYangDisposer) this.yinYangDisposer();
    if (this.metatronDisposer) this.metatronDisposer();
    // Chess
    if (name === 'chess') {
      this.chessCanvas = document.createElement('canvas');
      this.chessCanvas.width = 240;
      this.chessCanvas.height = 240;
      this.chessCanvas.style.position = 'fixed';
      this.chessCanvas.style.left = '20px';
      this.chessCanvas.style.top = '380px';
      this.chessCanvas.style.zIndex = '10041';
      document.body.appendChild(this.chessCanvas);
      this.chessOverlay = document.createElement('div');
      this.chessOverlay.style.position = 'fixed';
      this.chessOverlay.style.left = '270px';
      this.chessOverlay.style.top = '380px';
      this.chessOverlay.style.zIndex = '10042';
      this.chessOverlay.style.background = 'rgba(32,32,64,0.92)';
      this.chessOverlay.style.color = '#fff';
      this.chessOverlay.style.padding = '10px';
      this.chessOverlay.style.borderRadius = '8px';
      this.chessOverlay.style.fontFamily = 'monospace';
      this.chessOverlay.style.minWidth = '160px';
      document.body.appendChild(this.chessOverlay);
      const ctx = this.chessCanvas.getContext('2d')!;
      this.chessDisposer = startChess((f: ChessFrame) => {
        ctx.clearRect(0, 0, 240, 240);
        for (let x = 0; x < 8; x++) for (let y = 0; y < 8; y++) {
          ctx.fillStyle = (x + y) % 2 === 0 ? '#222' : '#444';
          ctx.fillRect(x * 30, y * 30, 30, 30);
        }
        ctx.fillStyle = `rgba(0,255,255,0.7)`;
        ctx.fillRect(f.file * 30, f.rank * 30, 30, 30);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(String(f.linear), f.file * 30 + 8, f.rank * 30 + 22);
        ctx.fillStyle = '#0ff';
        ctx.fillText(String(f.vortex), f.file * 30 + 18, f.rank * 30 + 22);
        // Overlay
        this.chessOverlay!.innerHTML = `<b>Chess Frame</b><br>
          File: ${f.file} Rank: ${f.rank}<br>
          Linear: ${f.linear} Vortex: ${f.vortex}<br>
          Polarity: <span style='color:${f.polarity === 1 ? '#0f0' : f.polarity === -1 ? '#f00' : '#fff'}'>${f.polarity}</span><br>
          <span style='color:#0ff'>Metaphysical: ${f.polarity === 1 ? 'Creation' : f.polarity === -1 ? 'Void' : 'Balance'}</span>`;
        // Sound/music feedback
        playDigit(f.linear);
        if (f.polarity === 1) playTrinitySound(3);
        if (f.polarity === -1) playTrinitySound(9);
      });
    }
    // Yin-Yang
    if (name === 'yin-yang') {
      this.yinYangCanvas = document.createElement('canvas');
      this.yinYangCanvas.width = 240;
      this.yinYangCanvas.height = 240;
      this.yinYangCanvas.style.position = 'fixed';
      this.yinYangCanvas.style.left = '20px';
      this.yinYangCanvas.style.top = '380px';
      this.yinYangCanvas.style.zIndex = '10041';
      document.body.appendChild(this.yinYangCanvas);
      this.yinYangOverlay = document.createElement('div');
      this.yinYangOverlay.style.position = 'fixed';
      this.yinYangOverlay.style.left = '270px';
      this.yinYangOverlay.style.top = '380px';
      this.yinYangOverlay.style.zIndex = '10042';
      this.yinYangOverlay.style.background = 'rgba(32,32,64,0.92)';
      this.yinYangOverlay.style.color = '#fff';
      this.yinYangOverlay.style.padding = '10px';
      this.yinYangOverlay.style.borderRadius = '8px';
      this.yinYangOverlay.style.fontFamily = 'monospace';
      this.yinYangOverlay.style.minWidth = '160px';
      document.body.appendChild(this.yinYangOverlay);
      const ctx = this.yinYangCanvas.getContext('2d')!;
      this.yinYangDisposer = startYinYang((f: YinYangFrame) => {
        ctx.clearRect(0, 0, 240, 240);
        ctx.beginPath();
        ctx.arc(120, 120, 100, 0, 2 * PI);
        ctx.fillStyle = '#222';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(120, 90, 50, PI, 0);
        ctx.arc(120, 150, 50, 0, PI);
        ctx.closePath();
        ctx.fillStyle = `rgba(0,255,255,0.7)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(120, 150, 50, PI, 0, true);
        ctx.arc(120, 90, 50, 0, PI, true);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,0,255,0.7)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(120, 90, 16, 0, 2 * PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(120, 150, 16, 0, 2 * PI);
        ctx.fillStyle = '#000';
        ctx.fill();
        // Overlay
        this.yinYangOverlay!.innerHTML = `<b>Yin-Yang Frame</b><br>
          Positive Digit: ${f.positiveDigit}<br>
          Negative Digit: ${f.negativeDigit}<br>
          Angle: ${round(f.angle)}°<br>
          <span style='color:#0ff'>Metaphysical: Yin/Yang Balance</span>`;
        // Sound/music feedback
        playDigit(f.positiveDigit);
        playDigit(f.negativeDigit);
        if (abs(f.angle - 180) < 10) playTrinitySound(6);
      });
    }
    // Metatron
    if (name === 'metatron') {
      this.metatronCanvas = document.createElement('canvas');
      this.metatronCanvas.width = 240;
      this.metatronCanvas.height = 240;
      this.metatronCanvas.style.position = 'fixed';
      this.metatronCanvas.style.left = '20px';
      this.metatronCanvas.style.top = '380px';
      this.metatronCanvas.style.zIndex = '10041';
      document.body.appendChild(this.metatronCanvas);
      this.metatronOverlay = document.createElement('div');
      this.metatronOverlay.style.position = 'fixed';
      this.metatronOverlay.style.left = '270px';
      this.metatronOverlay.style.top = '380px';
      this.metatronOverlay.style.zIndex = '10042';
      this.metatronOverlay.style.background = 'rgba(32,32,64,0.92)';
      this.metatronOverlay.style.color = '#fff';
      this.metatronOverlay.style.padding = '10px';
      this.metatronOverlay.style.borderRadius = '8px';
      this.metatronOverlay.style.fontFamily = 'monospace';
      this.metatronOverlay.style.minWidth = '160px';
      document.body.appendChild(this.metatronOverlay);
      const ctx = this.metatronCanvas.getContext('2d')!;
      this.metatronDisposer = startMetatron((f: MetatronFrame) => {
        ctx.clearRect(0, 0, 240, 240);
        for (const n of f.nodes) {
          const ang = (n.index / 12) * 2 * PI;
          const x = 120 + cos(ang) * 90;
          const y = 120 + sin(ang) * 90;
          ctx.beginPath();
          ctx.arc(x, y, 18, 0, 2 * PI);
          ctx.fillStyle = `rgba(0,255,255,0.7)`;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 16px monospace';
          ctx.fillText(String(n.digit), x - 7, y + 6);
          // Sound/music feedback for each node
          try {
            playDigit(toDigit(n.digit));
          } catch {}
        }
        // Overlay
        this.metatronOverlay!.innerHTML = `<b>Metatron Frame</b><br>
          Tick: ${f.tick}<br>
          Nodes: ${f.nodes.map(n => n.digit).join(', ')}<br>
          <span style='color:#0ff'>Metaphysical: 12-node Cube/Star</span>`;
        // Play trinity sound if all node digits are the same
        if (f.nodes.every(n => n.digit === f.nodes[0].digit)) playTrinitySound(9);
      });
    }
  }

  // Advanced test harness: simulate events
  static simulateEvents(ui: A432ThreeUI) {
    setInterval(() => { breatheEmitter.emit('breathe', { value: indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:fri:0", 9), phase: 'inhale', timestamp: Date.now() }); }, 3000);
    setInterval(() => { pulseEmitter.emit('pulse', { value: indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:fri:1", 9), timestamp: Date.now() }); }, 4000);
    setInterval(() => { intuitEmitter.emit('intuit', { insight: 'Aha!', confidence: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:11"), timestamp: Date.now() }); }, 5000);
    setInterval(() => { reflectEmitter.emit('reflect', { thought: 'Deep thought', depth: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:12"), timestamp: Date.now() }); }, 6000);
    setInterval(() => { moveEmitter.emit('move', { direction: 'up', magnitude: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:13")*3, timestamp: Date.now() }); }, 7000);
    setInterval(() => { heatEmitter.emit('heat', { value: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:14")*100, timestamp: Date.now() }); }, 8000);
    setInterval(() => { healthEmitter.emit('health', { value: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:15")*100, timestamp: Date.now() }); }, 9000);
    setInterval(() => { humanEmotionEmitter.emit('emotion', { type: 'joy', intensity: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:16"), timestamp: Date.now() }); }, 10000);
    setInterval(() => { humanConsciousnessEmitter.emit('consciousness', { state: 'aware', level: unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.three.ts:rnd:17"), timestamp: Date.now() }); }, 11000);
  }

  // Harmonize with user journeys (example: guided I journey)
  startIJourney(intention: string) {
    this.showOverlay(`<b>I Journey Started</b><br>Intention: ${intention}`);
    // ... integrate with journey engine ...
  }

  // Stub for advanced video/animation overlays
  showMetaphysicalAnimation(pattern: string) {
    // Example: animate sacred geometry, trinity, or vortex patterns on the canvas
    // (Implementation can use canvas, SVG, or WebGL as needed)
    // For now, just flash a unique color for each pattern
    const patternColors: { [key: string]: any } = {
      trinity: { c: 0, m: 100, y: 100, k: 0 },
      vortex: { c: 100, m: 0, y: 100, k: 0 },
      unity: { c: 100, m: 100, y: 0, k: 0 }
    };
    flashColor(patternColors[pattern] || { c: 0, m: 0, y: 0, k: 100 }, 800);
  }
}

// Usage example:
// const ui = new A432ThreeUI();
// A432ThreeUI.simulateEvents(ui);
// ui.startIJourney('Explore consciousness'); 