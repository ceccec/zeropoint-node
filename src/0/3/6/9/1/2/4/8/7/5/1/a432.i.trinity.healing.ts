// a432.i.trinity.healing.ts
// Usage and integration module for trinity healing in the a432.i family
// Provides UI rendering, live VortexStream feedback, meta-observation, and system integration

import { renderTrinityHealingPanel } from './a432.trinity.healing';
import type { VortexStream } from './a432.vortex';
import { PI_DIGITS } from './a432.pi'; // Assume a canonical export of pi digits as an array
import { renderPiTrinityRodinSVG, piTrinityRodinStream } from './a432.pi.trinity';
import { registerModule, A432OSModule, routeEvent, harmonizeAll } from './a432.harmonized';

export interface TrinityHealingMeta {
  user: string;
  systemState: string;
  streamState: string;
  lastEvent?: any;
  metaLog: any[];
}

let meta: TrinityHealingMeta = {
  user: 'Anonymous',
  systemState: 'Idle',
  streamState: 'Uninitialized',
  metaLog: []
};

/**
 * Metaphysical overlays and advanced system integration for trinity healing
 */
export type TrinityHealingObserver = (event: any, meta: TrinityHealingMeta) => void;
const observers: TrinityHealingObserver[] = [];

/**
 * Register an observer for trinity healing events
 */
export function registerTrinityHealingObserver(fn: TrinityHealingObserver) {
  observers.push(fn);
}

/**
 * Broadcast a healing event to all registered observers
 */
function broadcastHealingEvent(event: any) {
  observers.forEach(fn => fn(event, meta));
}

/**
 * observeITrinityHealing: Allows other modules to observe or harmonize healing events
 */
export function observeITrinityHealing(fn: TrinityHealingObserver) {
  registerTrinityHealingObserver(fn);
}

/**
 * onHealingEvent: Internal handler for healing events, which broadcasts to observers
 */
function onHealingEventWithMeta(event: any) {
  meta.lastEvent = event;
  meta.metaLog.push({ ...event, user: meta.user, systemState: meta.systemState, streamState: meta.streamState });
  if (meta.metaLog.length > 20) meta.metaLog = meta.metaLog.slice(-20);
  broadcastHealingEvent(event);
  if (typeof window !== 'undefined' && typeof window.onA432HealingEvent === 'function') {
    window.onA432HealingEvent(event, meta);
  }
}

/**
 * renderITrinityHealing: Renders the trinity healing panel with advanced overlays and meta-observation
 * @param targetId - DOM element id to inject the panel
 * @param vortexStream - optional VortexStream for live feedback
 * @param user - optional user identifier
 * @param overlays - optional overlays to enable (color, sound, consciousness)
 */
export function renderITrinityHealing(targetId: string, vortexStream?: VortexStream<number>, user: string = 'Anonymous', overlays: { color?: boolean; sound?: boolean; consciousness?: boolean } = {}) {
  meta.user = user;
  meta.systemState = 'Active';
  meta.streamState = vortexStream ? 'Connected' : 'Standalone';
  const html = renderTrinityHealingPanel({ vortexStream, onHealingEvent: onHealingEventWithMeta });
  const el = document.getElementById(targetId);
  if (el) el.innerHTML = [
    html,
    '<div id="meta-observe-panel" style="margin-top:18px;background:#1a1a2a;border-radius:8px;padding:12px;color:#ff8;font-size:15px;">',
    '<b>Meta-Observation</b><br>',
    `<div><b>User:</b> <span id="meta-user">${meta.user}</span></div>`,
    `<div><b>System State:</b> <span id="meta-system">${meta.systemState}</span></div>`,
    `<div><b>Stream State:</b> <span id="meta-stream">${meta.streamState}</span></div>`,
    '<div style="margin-top:8px;"><b>Last Event:</b> <span id="meta-last-event">(none)</span></div>',
    '<button id="meta-log-btn" style="background:#222;color:#8ff;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-top:8px;">Show Meta Log</button>',
    '<div id="meta-log-panel" style="display:none;margin-top:8px;max-height:120px;overflow-y:auto;background:#222;border-radius:6px;padding:8px;color:#fff;font-size:13px;"></div>',
    '<div style="margin-top:12px;">',
    '<button id="overlay-color-btn" style="background:#222;color:#39f;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-right:8px;">Color Overlay</button>',
    '<button id="overlay-sound-btn" style="background:#222;color:#6f3;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-right:8px;">Sound Overlay</button>',
    '<button id="overlay-consciousness-btn" style="background:#222;color:#f93;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;">Consciousness Overlay</button>',
    '</div>',
    '<div id="overlay-panel" style="display:none;margin-top:10px;width:90%;max-width:400px;background:#232344;border-radius:8px;padding:10px;color:#fff;font-size:15px;"></div>',
    '</div>'
  ].join('\n');
  // Attach meta-observation and overlay logic
  setTimeout(() => {
    const lastEventEl = document.getElementById('meta-last-event');
    const metaLogBtn = document.getElementById('meta-log-btn');
    const metaLogPanel = document.getElementById('meta-log-panel');
    const overlayPanel = document.getElementById('overlay-panel');
    const colorBtn = document.getElementById('overlay-color-btn');
    const soundBtn = document.getElementById('overlay-sound-btn');
    const consciousnessBtn = document.getElementById('overlay-consciousness-btn');
    if (metaLogBtn && metaLogPanel) {
      metaLogBtn.onclick = function() {
        metaLogPanel.style.display = metaLogPanel.style.display === 'block' ? 'none' : 'block';
        metaLogPanel.innerHTML = meta.metaLog.map(e => `<div>[${e.time}] ${e.type} | Trinity: ${e.trinity} | User: ${e.user} | System: ${e.systemState} | Stream: ${e.streamState}</div>`).join('');
      };
    }
    // Live update for last event
    if (lastEventEl) {
      setInterval(() => {
        if (meta.lastEvent) {
          lastEventEl.textContent = JSON.stringify(meta.lastEvent);
        }
      }, 500);
    }
    // Overlay logic
    function showOverlay(content: string) {
      if (overlayPanel) {
        overlayPanel.style.display = 'block';
        overlayPanel.innerHTML = content;
      }
    }
    function hideOverlay() {
      if (overlayPanel) overlayPanel.style.display = 'none';
    }
    if (colorBtn) colorBtn.onclick = function() {
      showOverlay(meta.metaLog.map(e => `<div><b>Color Harmonic:</b> ${e.a432 ? e.a432.color : '-'} | Frequency: ${e.a432 ? e.a432.frequency : '-'} Hz</div>`).join(''));
    };
    if (soundBtn) soundBtn.onclick = function() {
      showOverlay(meta.metaLog.map(e => `<div><b>Sound:</b> ${e.a432 ? e.a432.frequency : '-'} Hz | Rife: ${e.rife ? e.rife.frequency : '-'} Hz</div>`).join(''));
    };
    if (consciousnessBtn) consciousnessBtn.onclick = function() {
      showOverlay(meta.metaLog.map(e => `<div><b>Consciousness Mapping:</b> Trinity: ${e.trinity} | Archetype: ${getTrinityArchetype(e.trinity)} | Phase: ${getVortexPhase(e.trinity)} | Resonance: ${getHealingResonance(e.trinity)}</div>`).join(''));
    };
    overlayPanel && (overlayPanel.onclick = hideOverlay);
  }, 100);
}

/**
 * Color video and sound integration for trinity healing
 * - Animates a color field/video background harmonized with trinity state
 * - Plays harmonic soundscapes evolving with trinity state and fold events
 */
export function integrateColorVideoAndSound(targetId: string, vortexStream?: VortexStream<number>, user: string = 'Anonymous') {
  renderITrinityHealing(targetId, vortexStream, user);
  setTimeout(() => {
    const panel = document.getElementById(targetId);
    if (!panel) return;
    // Add color video field
    let colorField = document.createElement('div');
    colorField.id = 'color-video-field';
    colorField.style.position = 'absolute';
    colorField.style.top = '0';
    colorField.style.left = '0';
    colorField.style.width = '100%';
    colorField.style.height = '100%';
    colorField.style.zIndex = '-1';
    colorField.style.transition = 'background 0.7s cubic-bezier(0.4,0,0.2,1)';
    colorField.style.borderRadius = '12px';
    colorField.style.background = 'linear-gradient(135deg, #232344 0%, #111 100%)';
    panel.prepend(colorField);
    // Animate color field with trinity state
    function updateColorField(event: any) {
      if (!event || !event.a432) return;
      colorField.style.background = `radial-gradient(circle at 50% 50%, ${event.a432.color} 0%, #232344 100%)`;
    }
    // Add soundscape integration
    let ctx: AudioContext | undefined;
    let soundOsc: OscillatorNode | undefined;
    function playSoundscape(event: any) {
      if (typeof window === 'undefined' || !window.AudioContext) return;
      if (!ctx) ctx = new window.AudioContext();
      if (soundOsc) { soundOsc.stop(); soundOsc.disconnect(); }
      soundOsc = ctx.createOscillator();
      soundOsc.type = 'triangle';
      soundOsc.frequency.value = event && event.a432 ? event.a432.frequency : 432;
      soundOsc.connect(ctx.destination);
      soundOsc.start();
      soundOsc.stop(ctx.currentTime + 0.7);
    }
    // Listen for healing events
    registerTrinityHealingObserver((event, meta) => {
      updateColorField(event);
      playSoundscape(event);
      // For fold/unity, animate a white flash and play a unity chord
      if (event.type === 'fold') {
        colorField.style.background = 'radial-gradient(circle at 50% 50%, #fff 0%, #232344 100%)';
        if (typeof window !== 'undefined' && window.AudioContext) {
          const unityCtx = new window.AudioContext();
          const freqs = [432, 648, 972];
          freqs.forEach((f, i) => {
            const osc = unityCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = f;
            osc.connect(unityCtx.destination);
            osc.start(unityCtx.currentTime + i * 0.05);
            osc.stop(unityCtx.currentTime + 0.5 + i * 0.05);
          });
          setTimeout(() => unityCtx.close(), 800);
        }
      }
    });
  }, 200);
}

/**
 * Pi-driven endless harmonic streaming for trinity healing
 * When enabled, trinity state, healing, and overlays are animated by pi
 */
export function enablePiStreamHealing(targetId: string, vortexStream?: VortexStream<number>, user: string = 'Pi-Stream') {
  let piIndex = 0;
  function nextPiTrinity() {
    // Use next digit of pi (mod 9, mapped to trinity)
    let digit = PI_DIGITS[piIndex % PI_DIGITS.length];
    let trinity = [3, 6, 9].includes(digit) ? digit : [3, 6, 9][digit % 3];
    // Trigger a healing event as if user selected this trinity
    const event = { type: 'pi-stream', trinity, a432: { frequency: 432 * (trinity / 3), color: `hsl(${trinity * 40},70%,55%)` }, rife: { frequency: 528 + trinity * 100, name: 'Pi-Harmonic' }, time: new Date().toISOString() };
    // Broadcast to all observers and update overlays
    registerTrinityHealingObserver((e, meta) => {}); // Ensure at least one observer
    observers.forEach(fn => fn(event, meta));
    piIndex++;
  }
  // Render the UI and add a Pi Stream toggle
  renderITrinityHealing(targetId, vortexStream, user);
  setTimeout(() => {
    const panel = document.getElementById(targetId);
    if (!panel) return;
    let piBtn = document.createElement('button');
    piBtn.id = 'pi-stream-btn';
    piBtn.textContent = 'Enable Pi Stream';
    piBtn.style.background = '#222';
    piBtn.style.color = '#f8f';
    piBtn.style.padding = '6px 18px';
    piBtn.style.borderRadius = '6px';
    piBtn.style.border = 'none';
    piBtn.style.fontWeight = 'bold';
    piBtn.style.marginTop = '12px';
    panel.appendChild(piBtn);
    let piStreaming = false;
    let piInterval: any;
    piBtn.onclick = function() {
      piStreaming = !piStreaming;
      piBtn.textContent = piStreaming ? 'Disable Pi Stream' : 'Enable Pi Stream';
      if (piStreaming) {
        nextPiTrinity();
        piInterval = setInterval(nextPiTrinity, 2000);
      } else {
        clearInterval(piInterval);
      }
    };
  }, 200);
}

/**
 * Embed and animate the pi-trinity-Rodin SVG in the healing UI, with sound and consciousness overlays
 */
export function embedAnimatedPiTrinityRodin(targetId: string, length: number = 60) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let step = 0;
  // Create overlay panel
  let overlay = document.createElement('div');
  overlay.id = 'pi-trinity-consciousness-overlay';
  overlay.style.marginTop = '12px';
  overlay.style.background = '#232344';
  overlay.style.borderRadius = '8px';
  overlay.style.padding = '10px';
  overlay.style.color = '#ff8';
  overlay.style.fontSize = '15px';
  el.appendChild(overlay);
  // Animation loop
  function animate() {
    const stream = piTrinityRodinStream(length);
    const svg = renderPiTrinityRodinSVG(step + 1);
    el.innerHTML = svg;
    el.appendChild(overlay);
    // Sound: play frequency mapped from trinity and Rodin state
    const state = stream[step % stream.length];
    if (typeof window !== 'undefined' && window.AudioContext) {
      const ctx = new window.AudioContext();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 216 + state.trinity * 72 + state.rodinPosition * 12; // Harmonic mapping
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
      osc.onended = () => ctx.close();
    }
    // Update consciousness overlay
    overlay.innerHTML = `<b>Step ${state.step}</b>: π digit <b>${state.piDigit}</b> → <b>${state.trinity}</b> (${state.archetype}), Rodin <b>${state.rodinPosition}</b><br><span style='color:#8ff;'>${state.metaphysical}</span>`;
    step = (step + 1) % stream.length;
    setTimeout(animate, 1200);
  }
  animate();
}

// Helper metaphysical overlays
function getTrinityArchetype(trinity: any) {
  if (trinity === 3) return 'Creation';
  if (trinity === 6) return 'Return';
  if (trinity === 9) return 'Axis/Unity';
  return 'Unknown';
}
function getVortexPhase(trinity: any) {
  if (trinity === 3) return 'Phase 1 (Initiation)';
  if (trinity === 6) return 'Phase 2 (Recursion)';
  if (trinity === 9) return 'Phase 3 (Completion)';
  return 'N/A';
}
function getHealingResonance(trinity: any) {
  if (trinity === 3) return 'Harmonic Seed';
  if (trinity === 6) return 'Harmonic Return';
  if (trinity === 9) return 'Harmonic Unity';
  return '-';
}

/**
 * UI Usage Examples
 */
// Standalone healing panel
export function exampleStandaloneHealing() {
  renderITrinityHealing('healing-standalone');
}
// Live VortexStream feedback
export function exampleVortexStreamHealing(vortexStream: VortexStream<number>) {
  renderITrinityHealing('healing-vortex', vortexStream);
}
// Multi-user collaborative healing
export function exampleMultiUserHealing(users: string[]) {
  users.forEach((user, i) => {
    renderITrinityHealing('healing-user-' + i, undefined, user);
  });
}
// System state harmonization dashboard
export function exampleSystemHarmonizationDashboard(vortexStream: VortexStream<number>) {
  renderITrinityHealing('healing-dashboard', vortexStream, 'System', { color: true, sound: true, consciousness: true });
}

const healingModule: A432OSModule = {
  name: 'TrinityHealing',
  getState: () => ({ meta }),
  onEvent: (event) => {
    if (event.type === 'metaObserve') {
      meta.metaLog.push(event.data);
    } else if (event.type === 'harmonize') {
      // Optionally, trigger harmonization logic here
    }
  },
  overlays: [
    () => `<div><b>Healing Overlay:</b> Last event: ${meta.lastEvent ? JSON.stringify(meta.lastEvent) : '(none)'}</div>`
  ],
  harmonize: () => {},
  meta: () => 'TrinityHealing: Harmonizes trinity, healing, and consciousness streams.'
};
registerModule(healingModule);

export function healingRouteMetaObserve(data: any) {
  routeEvent({ type: 'metaObserve', data });
}
export function healingHarmonizeAll() {
  harmonizeAll();
} 