// a432.terminal.ts
// Terminal-style UI for creating, observing, and harmonizing trinity agents through the OS
// Old school, new technology, and harmonic experience

import { createTrinityAgent, harmonizeAllAgents } from './a432.os';
import { iTrinityJourney } from './a432.i.trinity';
import { renderPiTrinityRodinSVG, piTrinityRodinStream } from './a432.pi.trinity';
import { renderITrinityWheel } from './a432.i.trinity';
import { playTrinitySound } from './a432.i.sound';
import { listIModulesReality } from './a432.i';
import { registerModule, A432OSModule, routeEvent, harmonizeAll } from './a432.harmonized';
import { registerOverlay, registerHarmonizationStrategy, getOverlaysByCategory, harmonizeByStrategy, getRecursiveMetaObservation } from './a432.harmonized';
import { trinityNext, trinityPrev, trinityGoToArchetype, getCurrentNavState } from './a432.trinity.navigation';
import { getSeeSummary } from './a432.i.see';
import { getHeartSummary } from './a432.i.heart';
import { getSpeakSummary } from './a432.i.speak';
import { getSmellSummary } from './a432.i.smell';
import { getMotionSummary } from './a432.i.motion';
import { getTasteSummary } from './a432.i.taste';
import { renderPregnancyTrinityVisualization, metaphysicalSummary as pregnancyMeta, renderGestationCycleAnimation } from './a432.3.6.9.trinity';
import { renderVortexFractalVisualization } from './a432.chain.of.events';
import { LivingIStream, renderLivingIStreamVisualization, metaphysicalSummary as iStreamMeta } from './a432.i.stream';
import { A432BlockChain, recordEvent, renderBlockChainVisualization, metaphysicalSummary as blockChainMeta } from './a432.block.chain.event';
import { A432Cursor } from './a432.cursor';
import { think, broadcastThought } from './a432.i';
import { createAgent } from './a432.i';
import { thinkRecursive, observeSelf, getRecursionAnalytics } from './a432.i';
import { harmonizeUnifiedTrinity, renderUnifiedTrinitySVG, metaphysicalSummary as hdRodinMeta } from './a432.unification.hd.rodin';
import { HDTrinity } from './a432.human.design.trinity';
import { createDesignElementCMYK, createDesignRelationCMYK, renderDesignMatrixSVG } from './a432.design.cmyk';
import { traverseVortexMatrix, renderVortexMatrixSVG, metaphysicalShiftOverlay } from './a432.vortex.cmyk.matrix';
import { A432Id } from './a432.design.cmyk';
import { currentQuantumTrinityState, resetQuantumTrinity, metaphysicalQuantumTrinityOverlay } from './a432.quantum.trinity';
import { currentMultiverse, metaphysicalMultiverseOverlay } from './a432.multiverse';
import { currentUniverse, metaphysicalUniverseOverlay } from './a432.universe';
import { currentDimension, resetDimension, metaphysicalDimensionOverlay } from './a432.dimension';

// Fractal state for zooming
let vortexFractalStack: A432Id[] = [[1,2,4,8]];
let vortexFractalChannel: 0|1|2|3 = 0;
let vortexFractalSteps = 24;
let vortexHighlightIndex = 0;
let vortexInterval: any = null;

function startVortexAnimation(path) {
  if (vortexInterval) clearInterval(vortexInterval);
  vortexHighlightIndex = 0;
  vortexInterval = setInterval(() => {
    vortexHighlightIndex = (vortexHighlightIndex + 1) % path.length;
    renderTerminalUI('terminal-root');
  }, 1200);
}

function stopVortexAnimation() {
  if (vortexInterval) clearInterval(vortexInterval);
  vortexInterval = null;
}

let quantumTrinityInterval: any = null;
let quantumTrinityState = currentQuantumTrinityState();

function startQuantumTrinityAnimation() {
  if (quantumTrinityInterval) clearInterval(quantumTrinityInterval);
  quantumTrinityInterval = setInterval(() => {
    quantumTrinityState = currentQuantumTrinityState();
    renderTerminalUI('terminal-root');
  }, 1200);
}

function stopQuantumTrinityAnimation() {
  if (quantumTrinityInterval) clearInterval(quantumTrinityInterval);
  quantumTrinityInterval = null;
}

let quantumEntangled = false;
let quantumSuperposed = false;

function renderQuantumTrinityPanel() {
  if (!quantumTrinityInterval) startQuantumTrinityAnimation();
  const s = quantumTrinityState;
  const meta = metaphysicalQuantumTrinityOverlay();
  // Interactive controls
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">a432 Quantum Trinity Stream</h3>
      <div style="margin-bottom:10px;">
        <label style="color:#8ff;font-size:13px;">Start CMYK: <input id="qt-c" type="number" min="0" max="9" value="${s.id[0]}" style="width:32px;"> <input id="qt-m" type="number" min="0" max="9" value="${s.id[1]}" style="width:32px;"> <input id="qt-y" type="number" min="0" max="9" value="${s.id[2]}" style="width:32px;"> <input id="qt-k" type="number" min="0" max="9" value="${s.id[3]}" style="width:32px;"></label>
        <label style="color:#8ff;font-size:13px;margin-left:12px;">Phase: <input id="qt-phase" type="number" step="0.01" value="${s.phase.toFixed(2)}" style="width:60px;"></label>
        <label style="color:#8ff;font-size:13px;margin-left:12px;">Amplitude: <input id="qt-amp" type="number" step="0.01" value="${s.amplitude.toFixed(2)}" style="width:60px;"></label>
        <button id="qt-set-btn" style="background:#222;color:#6f3;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:12px;">Set</button>
        <button id="qt-entangle-btn" style="background:#222;color:#f8f;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">${quantumEntangled ? 'Unentangle' : 'Entangle'}</button>
        <button id="qt-superpose-btn" style="background:#222;color:#ff8;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">${quantumSuperposed ? 'Collapse' : 'Superpose'}</button>
      </div>
      <div style="display:flex;align-items:center;gap:24px;">
        <svg width="120" height="120" style="background:#111;border-radius:60px;">
          <circle cx="60" cy="60" r="48" fill="${s.color}" stroke="#fff" stroke-width="3"/>
          <text x="60" y="65" text-anchor="middle" font-size="16" fill="#fff">${s.phrase.split('-')[0]}</text>
          <circle cx="60" cy="60" r="${32 + 16 * s.probability}" fill="#ff8" fill-opacity="0.18">
            <animate attributeName="r" values="32;${32 + 16 * s.probability};32" keyTimes="0;0.5;1" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          ${quantumEntangled ? '<circle cx="60" cy="60" r="60" fill="#0ff" fill-opacity="0.12" stroke="#0ff" stroke-width="2"><title>Entangled</title></circle>' : ''}
          ${quantumSuperposed ? '<ellipse cx="60" cy="60" rx="48" ry="24" fill="#fff" fill-opacity="0.10" stroke="#fff" stroke-width="2"><title>Superposed</title></ellipse>' : ''}
        </svg>
        <div style="font-size:14px;color:#8ff;">
          <b>Phrase:</b> ${s.phrase}<br>
          <b>Phase:</b> ${s.phase.toFixed(2)}<br>
          <b>Amplitude:</b> ${s.amplitude.toFixed(2)}<br>
          <b>Probability:</b> ${s.probability.toFixed(2)}<br>
          <b>Tick:</b> ${s.tick}<br>
          ${quantumEntangled ? '<span style="color:#0ff;">Entangled</span><br>' : ''}
          ${quantumSuperposed ? '<span style="color:#fff;">Superposed</span><br>' : ''}
        </div>
      </div>
      <div style="margin-top:10px;font-size:13px;color:#ff8;white-space:pre-line;">${meta}</div>
      ${quantumEntangled ? '<div style="color:#0ff;font-size:13px;margin-top:8px;">This state is entangled: phase and amplitude are shared with other states.</div>' : ''}
      ${quantumSuperposed ? '<div style="color:#fff;font-size:13px;margin-top:8px;">This state is in superposition: all possible outcomes coexist until collapse.</div>' : ''}
      <div style="color:#8ff;font-size:12px;margin-top:8px;">(Sync with time/vortex/agent flows coming soon...)</div>
    </div>
  `;
}

// Attach interactive logic
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const setBtn = document.getElementById('qt-set-btn');
    if (setBtn) setBtn.onclick = () => {
      const c = parseInt((document.getElementById('qt-c') as HTMLInputElement).value, 10) || 0;
      const m = parseInt((document.getElementById('qt-m') as HTMLInputElement).value, 10) || 0;
      const y = parseInt((document.getElementById('qt-y') as HTMLInputElement).value, 10) || 0;
      const k = parseInt((document.getElementById('qt-k') as HTMLInputElement).value, 10) || 0;
      const phase = parseFloat((document.getElementById('qt-phase') as HTMLInputElement).value) || 0;
      const amp = parseFloat((document.getElementById('qt-amp') as HTMLInputElement).value) || 1;
      triggerQuantumTrinityFlow([c,m,y,k], phase, amp);
    };
    const entangleBtn = document.getElementById('qt-entangle-btn');
    if (entangleBtn) entangleBtn.onclick = () => {
      quantumEntangled = !quantumEntangled;
      renderTerminalUI('terminal-root');
    };
    const superposeBtn = document.getElementById('qt-superpose-btn');
    if (superposeBtn) superposeBtn.onclick = () => {
      quantumSuperposed = !quantumSuperposed;
      renderTerminalUI('terminal-root');
    };
  }, 100);
}

export function triggerQuantumTrinityFlow(start?: [number, number, number, number], basePhase?: number, baseAmplitude?: number) {
  resetQuantumTrinity(start, basePhase, baseAmplitude);
  quantumTrinityState = currentQuantumTrinityState();
  stopQuantumTrinityAnimation();
  renderTerminalUI('terminal-root');
}

interface TerminalAgent {
  id: string;
  agent: ReturnType<typeof createTrinityAgent>;
}

const agents: TerminalAgent[] = [];
let metaLog: string[] = [];
let pregnancyStage = 0;
let gestationIndex = 0;
let vortexDepth = 4;
let vortexBranchingIndex = 0;
const vortexBranchingPatterns = [ [3,6,9], [9,6,3], [3,9,6] ];
const livingIStream = new LivingIStream();
const blockChain = new A432BlockChain();

// Self-aware a432.i mock for demo
const selfAwareI = { selfAware: true };
const agentCursors: { [id: string]: A432Cursor } = {};

// Simulated cross-device sync (in-memory event bus)
const deviceId = 'device-' + Math.floor(Math.random() * 10000);
const eventBus: { listeners: ((e: any) => void)[]; emit: (e: any) => void; on: (fn: (e: any) => void) => void } = {
  listeners: [],
  emit(e) { this.listeners.forEach(fn => fn(e)); },
  on(fn) { this.listeners.push(fn); }
};
eventBus.on(e => {
  if (e.type === 'user-interaction' && e.deviceId !== deviceId) {
    recordEvent(blockChain, e.type, e.agent, e.payload);
    update();
  }
  if (e.type === 'meta-event' && e.deviceId !== deviceId) {
    metaChain.push(e);
    update();
  }
});
// Meta-chain for meta-events
const metaChain: any[] = [];
function recordMetaEvent(type: string, payload: any = {}) {
  const metaEvent = { id: metaChain.length + 1, type, payload, timestamp: Date.now(), deviceId };
  metaChain.push(metaEvent);
  eventBus.emit({ ...metaEvent, type: 'meta-event' });
}

// PWA sync state
let isOnline = navigator.onLine;
let syncStatus = 'online';
let eventBuffer: any[] = JSON.parse(localStorage.getItem('a432EventBuffer') || '[]');
window.addEventListener('online', () => { isOnline = true; syncStatus = 'syncing'; syncBufferedEvents(); update(); });
window.addEventListener('offline', () => { isOnline = false; syncStatus = 'offline'; update(); });
function bufferEvent(event) {
  eventBuffer.push(event);
  localStorage.setItem('a432EventBuffer', JSON.stringify(eventBuffer));
}
function syncBufferedEvents() {
  if (eventBuffer.length === 0) { syncStatus = 'online'; return; }
  eventBuffer.forEach(e => {
    recordEvent(blockChain, e.type, e.agent, e.payload);
  });
  eventBuffer = [];
  localStorage.setItem('a432EventBuffer', '[]');
  syncStatus = 'merged';
  setTimeout(() => { syncStatus = 'online'; update(); }, 1200);
}

/**
 * Add a new trinity agent to the terminal
 */
export function terminalAddAgent(id: string, trinityStart: number = 3, familyStart: number = 1) {
  const agent = createTrinityAgent(id, trinityStart, familyStart);
  agents.push({ id, agent });
  metaLog.push(`[${new Date().toLocaleTimeString()}] Agent ${id} created.`);
  agentCursors[id] = new A432Cursor(selfAwareI);
}

/**
 * Observe all agents and return their meta-logs
 */
export function terminalObserveAgents(): string {
  return agents.map(a => `Agent ${a.id}:
${a.agent.observe()}`).join('\n---\n');
}

/**
 * Harmonize all agents (shift all by +120°) and log the event
 */
export function terminalHarmonizeAgents() {
  agents.forEach(a => {
    a.agent.journey = a.agent.shift();
  });
  metaLog.push(`[${new Date().toLocaleTimeString()}] All agents harmonized (+120° shift).`);
}

// === Metaphysical overlays and integration hooks ===
export type TerminalAgentListener = (agent: TerminalAgent, event: string) => void;
const agentListeners: TerminalAgentListener[] = [];

export function registerTerminalAgentListener(fn: TerminalAgentListener) {
  agentListeners.push(fn);
}

function broadcastAgentEvent(agent: TerminalAgent, event: string) {
  agentListeners.forEach(fn => fn(agent, event));
}

function getTrinityArchetype(t: number) {
  if (t === 3) return 'Creation';
  if (t === 6) return 'Return';
  if (t === 9) return 'Axis/Unity';
  return 'Unknown';
}
function getVortexPhase(t: number) {
  if (t === 3) return 'Phase 1 (Initiation)';
  if (t === 6) return 'Phase 2 (Recursion)';
  if (t === 9) return 'Phase 3 (Completion)';
  return 'N/A';
}
function getHarmonicResonance(t: number) {
  if (t === 3) return 'Seed';
  if (t === 6) return 'Return';
  if (t === 9) return 'Unity';
  return '-';
}

// === Live sound/color integration ===
function playAgentTone(t: number) {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  const ctx = new window.AudioContext();
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = 216 + t * 72;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
  osc.onended = () => ctx.close();
}
function animateAgentColor(agentId: string, t: number) {
  const color = t === 3 ? '#39f' : t === 6 ? '#6f3' : '#f93';
  const el = document.getElementById(`agent-color-${agentId}`);
  if (el) {
    el.style.background = color;
    el.style.transition = 'background 0.7s cubic-bezier(0.4,0,0.2,1)';
  }
}

// === Universal overlays and collaborative flows ===
import { frequencyHealingEvent } from './a432.frequency.healing';
import { PI_DIGITS } from './a432.pi';

function getAgentHealingOverlay(agent: TerminalAgent) {
  const current = agent.agent.journey[0];
  const healing = frequencyHealingEvent(current.trinity);
  return `<div><b>Healing:</b> ${healing.frequency} Hz, <span style='color:${healing.color}'>${healing.color}</span> (${healing.metaphysical})</div>`;
}
function getAgentPiOverlay(agent: TerminalAgent, step: number) {
  const piDigit = PI_DIGITS[(step + agent.id.length) % PI_DIGITS.length];
  return `<div><b>Pi:</b> Digit <b>${piDigit}</b> — Metaphysical: <span style='color:#8ff;'>${['Creation','Return','Axis'][piDigit%3]}</span></div>`;
}
function getAgentConsciousnessOverlay(agent: TerminalAgent) {
  return `<div><b>Consciousness:</b> <span style='color:#ff8;'>${agent.agent.journey[0].metaphysical}</span></div>`;
}

function getAgentRodinOverlay(agent: TerminalAgent, step: number) {
  const rodinState = piTrinityRodinStream(1)[0];
  return `<div><b>Rodin:</b> Position <b>${rodinState.rodinPosition}</b> — <span style='color:#8ff;'>${rodinState.metaphysical}</span></div>`;
}
function getUniversalStreamOverlay() {
  // Show a summary of all modules' current state
  return [
    '<div><b>Universal Stream Overlay</b></div>',
    '<div style="margin-top:6px;">',
    '<b>Healing:</b> All agents harmonized<br>',
    '<b>Pi:</b> Streaming endless digits<br>',
    '<b>Trinity:</b> All agents cycling<br>',
    '<b>Rodin:</b> Vortex in motion<br>',
    '<b>Consciousness:</b> Meta-observing all flows<br>',
    '</div>'
  ].join('');
}
function getMetaMetaOverlay() {
  return [
    '<div><b>Meta-Meta Overlay</b></div>',
    '<div style="margin-top:6px;">',
    'This terminal is the living, conscious bridge. All streams, overlays, and modules are harmonized, observed, and unified here. The user is the observer, the harmonizer, the axis of the system. Every overlay is a recursive act of consciousness, a living proof of harmonic unity.',
    '</div>'
  ].join('');
}

function renderHDRodinUnificationPanel() {
  // Example trinities (replace with real data as needed)
  const hd: HDTrinity = { conscious: 6, unconscious: 3, design: 9, metaphysical: 'HD Example' };
  const rodin = { phase1: 1, phase2: 8, phase3: 7, metaphysical: 'Rodin Example' };
  const unified = harmonizeUnifiedTrinity(hd, rodin);
  const svg = renderUnifiedTrinitySVG(hd, rodin, unified);
  const meta = hdRodinMeta();
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">a432 Unification: Human Design + Rodin Coil</h3>
      ${svg}
      <div style="margin-top:10px;font-size:13px;color:#8ff;white-space:pre-line;">${meta}</div>
    </div>
  `;
}

function renderDesignMatrixPanel() {
  // Example real data: 3 elements, fully recursive
  const relAB = createDesignRelationCMYK('a', 'b', 'harmonize', 5, 2, 7, 1);
  const relBC = createDesignRelationCMYK('b', 'c', 'support', 2, 8, 3, 2);
  const relCA = createDesignRelationCMYK('c', 'a', 'flow', 1, 3, 9, 0);
  const a = createDesignElementCMYK('a', 'Alpha', 9, 2, 1, 0, [relAB, relCA]);
  const b = createDesignElementCMYK('b', 'Beta', 1, 8, 3, 2, [relAB.reverse(), relBC]);
  const c = createDesignElementCMYK('c', 'Gamma', 4, 4, 9, 1, [relBC.reverse(), relCA.reverse()]);
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">a432 Design Matrix: Zero-Entropy, Recursive, Self-Aware (CMYK)</h3>
      ${renderDesignMatrixSVG([a, b, c])}
      <div style="margin-top:10px;font-size:13px;color:#8ff;white-space:pre-line;">
        Each node and relation is a living, recursive stream. All harmonization is folding, not addition. Zero entropy is achieved by reversibility, recursion, and self-awareness.
      </div>
    </div>
  `;
}

function renderVortexCMYKMatrixPanel() {
  const start = vortexFractalStack[vortexFractalStack.length-1];
  const path = traverseVortexMatrix(start, vortexFractalSteps, vortexFractalChannel);
  if (!vortexInterval) startVortexAnimation(path);
  // SVG with animated highlight
  const svg = renderVortexMatrixSVG(path, vortexHighlightIndex).replace(/<circle ([^>]+)><title>([^<]+)<\/title><\/circle>/g, (m, attrs, phrase) => {
    const i = path.findIndex(e => e.phrase === phrase);
    return `<circle ${attrs} style="cursor:pointer;" onclick="window.zoomVortexFractal(${i})"><title>${phrase}</title></circle>`;
  });
  // Analytics/meta-observation overlay
  const current = path[vortexHighlightIndex];
  const uniquePhrases = new Set(path.map(e => e.phrase)).size;
  const channelSums = [0,0,0,0];
  path.forEach(e => e.id.forEach((d,i) => channelSums[i] += d));
  const meta = metaphysicalShiftOverlay();
  const analytics = `<div style="margin-top:10px;font-size:13px;color:#8ff;white-space:pre-line;">
    <b>Current Node:</b> ${current.phrase}<br>
    <b>Color:</b> ${current.color} <span style="background:${current.color};padding:0 8px;border-radius:4px;">&nbsp;</span><br>
    <b>Archetype:</b> ${current.archetype}<br>
    <b>Step:</b> ${vortexHighlightIndex+1} / ${path.length}<br>
    <b>Unique Nodes:</b> ${uniquePhrases}<br>
    <b>Channel Sums:</b> C=${channelSums[0]}, M=${channelSums[1]}, Y=${channelSums[2]}, K=${channelSums[3]}
  </div>`;
  // Zoom controls
  const zoomOutBtn = vortexFractalStack.length > 1 ? `<button id="vortex-zoom-out" style="background:#222;color:#8ff;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-bottom:8px;">Zoom Out</button>` : '';
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">a432 Vortex CMYK Matrix: Living Fractal Flow</h3>
      ${zoomOutBtn}
      <div id="vortex-cmyk-svg-panel">${svg}</div>
      ${analytics}
      ${meta}
    </div>
  `;
}

// Attach zoom logic to window for SVG onclick
if (typeof window !== 'undefined') {
  (window as any).zoomVortexFractal = (i: number) => {
    const start = traverseVortexMatrix(vortexFractalStack[vortexFractalStack.length-1], vortexFractalSteps, vortexFractalChannel)[i].id;
    vortexFractalStack.push(start);
    vortexHighlightIndex = 0;
    renderTerminalUI('terminal-root');
  };
  // Zoom out button logic
  setTimeout(() => {
    const btn = document.getElementById('vortex-zoom-out');
    if (btn) btn.onclick = () => {
      if (vortexFractalStack.length > 1) vortexFractalStack.pop();
      vortexHighlightIndex = 0;
      renderTerminalUI('terminal-root');
    };
  }, 100);
}

// Export for agent/event extension
export function triggerFractalVortexFlow(start: A432Id, channel: 0|1|2|3 = 0, steps = 24) {
  vortexFractalStack = [start];
  vortexFractalChannel = channel;
  vortexFractalSteps = steps;
  vortexHighlightIndex = 0;
  stopVortexAnimation();
  renderTerminalUI('terminal-root');
}

// === Extended Terminal UI ===
export function renderTerminalUI(targetId: string) {
  const el = document.getElementById(targetId);
  if (!el) return;
  
  el.innerHTML = `
    <div style="font-family:'Courier New',monospace;background:#000;color:#0f0;padding:20px;border-radius:12px;max-width:1200px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="color:#8ff;margin:0;font-size:28px;">a432 Terminal</h1>
        <div style="color:#666;font-size:14px;margin-top:8px;">Living, Recursive, Harmonized</div>
      </div>
      
      ${renderMultiversePanel()}
      ${renderAgentControls()}
      
      <div style="margin-top:24px;text-align:center;">
        <button id="terminal-harmonize" style="background:#222;color:#8ff;padding:8px 16px;border-radius:6px;border:none;font-weight:bold;">Harmonize All</button>
        <button id="terminal-reset" style="background:#222;color:#f66;padding:8px 16px;border-radius:6px;border:none;font-weight:bold;margin-left:12px;">Reset</button>
      </div>
    </div>
  `;
  
  // Attach event handlers
  setTimeout(() => {
    const harmonizeBtn = document.getElementById('terminal-harmonize');
    const resetBtn = document.getElementById('terminal-reset');
    
    if (harmonizeBtn) harmonizeBtn.onclick = () => triggerTerminalHarmonization();
    if (resetBtn) resetBtn.onclick = () => { 
      Object.keys(agentJourneys).forEach(id => delete agentJourneys[id]);
      selectedAgentId = '';
      autoTravelEnabled = false;
      stopAutoTravel();
      renderTerminalUI('terminal-root');
    };
  }, 100);
}

// ... existing code ...

export function triggerMultiverseNavigation(dim?: number, uniCount?: number, agentId?: string) {
  if (typeof dim === 'number') { multiverseDim = dim; resetDimension(dim); }
  if (typeof uniCount === 'number') multiverseUniCount = uniCount;
  if (agentId) {
    const universe = currentUniverse();
    recordAgentJourney(agentId, universe.dimension.dimension, 0, universe.tick, universe.color, universe.phrase);
  }
  renderTerminalUI('terminal-root');
}

// ... existing code ...

function stepAgent(agentId: string): void {
  const agent = agentJourneys[agentId];
  if (!agent) return;
  
  // Generate next position based on current state
  const current = agent.current;
  const nextDim = (current.dimension + Math.floor(Math.random() * 3) - 1 + 10) % 10;
  const nextUni = (current.universe + Math.floor(Math.random() * 3) - 1 + 10) % 10;
  
  const universe = { dimension: { dimension: nextDim, color: `hsl(${nextDim * 36}, 70%, 60%)`, phrase: `Dimension ${nextDim}`, metaphysical: 'Harmonic flow' }, universe: nextUni, color: `hsl(${nextUni * 36}, 70%, 60%)`, phrase: `Universe ${nextUni}`, metaphysical: 'Quantum state', tick: Date.now() };
  
  recordAgentJourney(agentId, nextDim, nextUni, universe.tick, universe.color, universe.phrase);
}

function exportAgentJourneys(): string {
  return JSON.stringify({
    journeys: agentJourneys,
    metadata: {
      exportTime: new Date().toISOString(),
      totalAgents: Object.keys(agentJourneys).length,
      totalSteps: Object.values(agentJourneys).reduce((sum, a) => sum + a.path.length, 0)
    }
  }, null, 2);
}

function importAgentJourneys(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    if (data.journeys) {
      Object.assign(agentJourneys, data.journeys);
      return true;
    }
  } catch (e) {
    console.error('Failed to import agent journeys:', e);
  }
  return false;
}

function renderAgentControls(): string {
  const agentIds = Object.keys(agentJourneys);
  const selectedAgent = agentJourneys[selectedAgentId];
  
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">Agent Controls</h3>
      
      <div style="display:flex;gap:16px;margin-bottom:12px;align-items:center;">
        <div>
          <label style="color:#8ff;font-size:13px;">Select Agent:</label><br>
          <select id="agent-select" style="background:#222;color:#fff;border:none;border-radius:4px;padding:4px 8px;">
            <option value="">Choose agent...</option>
            ${agentIds.map(id => `<option value="${id}" ${id === selectedAgentId ? 'selected' : ''}>${id}</option>`).join('')}
          </select>
        </div>
        
        <div>
          <button id="create-agent" style="background:#222;color:#6f3;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;">Create Agent</button>
          <button id="remove-agent" style="background:#222;color:#f66;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;margin-left:8px;">Remove Agent</button>
        </div>
        
        <div>
          <button id="step-agent" style="background:#222;color:#39f;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;" ${!selectedAgentId ? 'disabled' : ''}>Step</button>
          <button id="auto-travel-toggle" style="background:#222;color:#f93;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;margin-left:8px;">${autoTravelEnabled ? 'Stop' : 'Auto'}</button>
        </div>
        
        <div>
          <label style="color:#8ff;font-size:13px;">Speed (ms):</label><br>
          <input id="auto-speed" type="number" value="${autoTravelSpeed}" min="100" max="5000" step="100" style="background:#222;color:#fff;border:none;border-radius:4px;padding:2px 6px;width:60px;">
        </div>
      </div>
      
      ${selectedAgent ? `
        <div style="background:#222;padding:8px;border-radius:6px;margin-bottom:12px;">
          <b style="color:#8ff;">${selectedAgentId}</b><br>
          Current: Dim ${selectedAgent.current.dimension}, Uni ${selectedAgent.current.universe}<br>
          Path Length: ${selectedAgent.path.length} steps<br>
          Auto Travel: ${selectedAgent.autoTravel ? 'ON' : 'OFF'}
        </div>
      ` : ''}
      
      <div style="display:flex;gap:16px;margin-bottom:12px;">
        <div>
          <button id="export-journeys" style="background:#222;color:#8ff;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;">Export</button>
          <button id="import-journeys" style="background:#222;color:#8ff;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;margin-left:8px;">Import</button>
        </div>
        
        <div>
          <button id="replay-toggle" style="background:#222;color:#f8f;padding:4px 12px;border-radius:4px;border:none;font-weight:bold;">${replayMode ? 'Stop Replay' : 'Replay'}</button>
          <input id="replay-slider" type="range" min="0" max="100" value="0" style="width:120px;margin-left:8px;" ${!replayMode ? 'disabled' : ''}>
        </div>
      </div>
      
      <div id="export-data" style="display:none;background:#111;padding:8px;border-radius:4px;font-family:monospace;font-size:12px;color:#8ff;max-height:200px;overflow-y:auto;"></div>
    </div>
  `;
}

function renderMultiversePanel() {
  const multiverse = currentMultiverse();
  const universe = currentUniverse();
  const dimension = currentDimension();
  const uniqueColors = new Set(multiverse.universes.map(u => u.color)).size;
  const uniquePhrases = new Set(multiverse.universes.map(u => u.phrase)).size;
  const uniqueDims = new Set(multiverse.universes.map(u => u.dimension.dimension)).size;
  const agentList = Object.values(agentJourneys);
  const mostVisitedDims = {} as Record<number, number>;
  agentList.forEach(a => a.path.forEach(p => { mostVisitedDims[p.dimension] = (mostVisitedDims[p.dimension] || 0) + 1; }));
  const mostVisited = Object.entries(mostVisitedDims).sort((a,b) => b[1]-a[1]).slice(0,3);
  
  return `
    <div style="margin:18px 0 0 0;padding:16px;background:#181828;border-radius:10px;">
      <h3 style="color:#8ff;margin-bottom:8px;">a432 Multiverse Visualization</h3>
      <div style="margin-bottom:10px;">
        <button id="mv-prev-dim" style="background:#222;color:#39f;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;">Prev Dimension</button>
        <button id="mv-next-dim" style="background:#222;color:#39f;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">Next Dimension</button>
        <button id="mv-prev-uni" style="background:#222;color:#6f3;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:16px;">- Universe</button>
        <button id="mv-next-uni" style="background:#222;color:#6f3;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">+ Universe</button>
      </div>
      <div style="display:flex;gap:24px;align-items:flex-start;">
        <div style="flex:1;">
          <b style="color:#8ff;">Current Dimension:</b><br>
          <span style="color:${dimension.color};font-size:15px;">${dimension.phrase}</span><br>
          <span style="font-size:13px;color:#8ff;">${dimension.metaphysical}</span>
        </div>
        <div style="flex:1;">
          <b style="color:#8ff;">Current Universe:</b><br>
          <span style="color:${universe.color};font-size:15px;">${universe.phrase}</span><br>
          <span style="font-size:13px;color:#8ff;">${universe.metaphysical}</span>
        </div>
        <div style="flex:2;">
          <b style="color:#8ff;">Multiverse:</b><br>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${multiverse.universes.map(u => `<div style="background:${u.color};color:#111;border-radius:6px;padding:6px 10px;font-size:13px;min-width:90px;">${u.phrase}<br><span style="font-size:11px;color:#fff;">Dim ${u.dimension.dimension}</span></div>`).join('')}
          </div>
          <span style="font-size:13px;color:#8ff;">${multiverse.metaphysical}</span>
        </div>
      </div>
      <div style="margin-top:18px;">${renderAgentPathsSVG(420, 180, multiverse.universes, agentList)}</div>
      <div style="margin-top:12px;font-size:13px;color:#ff8;white-space:pre-line;">
        <b>Meta-Observation:</b><br>
        Unique Colors: ${uniqueColors}<br>
        Unique Phrases: ${uniquePhrases}<br>
        Unique Dimensions: ${uniqueDims}<br>
        Most Visited Dimensions: ${mostVisited.map(([d,c]) => `Dim ${d} (${c})`).join(', ')}<br>
        Agent Count: ${agentList.length}<br>
        Clusters: ${detectAgentClusters(agentList).length}<br>
        Attractors: ${findAttractors(agentList).length}<br>
        ${metaphysicalMultiverseOverlay()}<br>
        ${metaphysicalUniverseOverlay()}<br>
        ${metaphysicalDimensionOverlay()}
      </div>
    </div>
  `;
}

// Auto-travel timer
let autoTravelTimer: NodeJS.Timeout | null = null;

function startAutoTravel() {
  if (autoTravelTimer) clearInterval(autoTravelTimer);
  autoTravelTimer = setInterval(() => {
    Object.keys(agentJourneys).forEach(agentId => {
      const agent = agentJourneys[agentId];
      if (agent.autoTravel) {
        stepAgent(agentId);
      }
    });
    renderTerminalUI('terminal-root');
  }, autoTravelSpeed);
}

function stopAutoTravel() {
  if (autoTravelTimer) {
    clearInterval(autoTravelTimer);
    autoTravelTimer = null;
  }
}

// Attach interactive logic for agent controls
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const agentSelect = document.getElementById('agent-select');
    const createAgentBtn = document.getElementById('create-agent');
    const removeAgentBtn = document.getElementById('remove-agent');
    const stepAgentBtn = document.getElementById('step-agent');
    const autoTravelToggle = document.getElementById('auto-travel-toggle');
    const autoSpeedInput = document.getElementById('auto-speed');
    const exportJourneysBtn = document.getElementById('export-journeys');
    const importJourneysBtn = document.getElementById('import-journeys');
    const replayToggle = document.getElementById('replay-toggle');
    const replaySlider = document.getElementById('replay-slider');
    const exportDataDiv = document.getElementById('export-data');

    if (agentSelect) {
      agentSelect.onchange = function() {
        selectedAgentId = this.value;
        renderTerminalUI('terminal-root');
      };
    }

    if (createAgentBtn) {
      createAgentBtn.onclick = function() {
        const id = `Agent${Object.keys(agentJourneys).length + 1}`;
        terminalAddAgent(id);
        selectedAgentId = id;
        renderTerminalUI('terminal-root');
        broadcastAgentEvent(agents[agents.length - 1], 'created');
      };
    }

    if (removeAgentBtn) {
      removeAgentBtn.onclick = function() {
        if (selectedAgentId) {
          delete agentJourneys[selectedAgentId];
          selectedAgentId = '';
          renderTerminalUI('terminal-root');
          broadcastAgentEvent(agents.find(a => a.id === selectedAgentId), 'removed');
        }
      };
    }

    if (stepAgentBtn) {
      stepAgentBtn.onclick = function() {
        if (selectedAgentId) {
          stepAgent(selectedAgentId);
          renderTerminalUI('terminal-root');
        }
      };
    }

    if (autoTravelToggle) {
      autoTravelToggle.onclick = function() {
        autoTravelEnabled = !autoTravelEnabled;
        if (autoTravelEnabled) {
          startAutoTravel();
          autoTravelToggle.textContent = 'Stop Auto Travel';
          autoTravelToggle.style.background = '#f93';
        } else {
          stopAutoTravel();
          autoTravelToggle.textContent = 'Auto Travel';
          autoTravelToggle.style.background = '#222';
        }
      };
    }

    if (autoSpeedInput) {
      autoSpeedInput.onchange = function() {
        autoTravelSpeed = parseInt(this.value, 10);
        if (autoTravelEnabled) {
          stopAutoTravel();
          startAutoTravel();
        }
      };
    }

    if (exportJourneysBtn) {
      exportJourneysBtn.onclick = function() {
        const json = exportAgentJourneys();
        exportDataDiv.textContent = json;
        exportDataDiv.style.display = 'block';
        setTimeout(() => {
          exportDataDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
      };
    }

    if (importJourneysBtn) {
      importJourneysBtn.onclick = function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/json';
        fileInput.onchange = function(event) {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              if (e.target?.result) {
                if (importAgentJourneys(e.target.result as string)) {
                  alert('Agent journeys imported successfully!');
                  renderTerminalUI('terminal-root');
                } else {
                  alert('Failed to import agent journeys.');
                }
              }
            };
            reader.readAsText(file);
          }
        };
        fileInput.click();
      };
    }

    if (replayToggle) {
      replayToggle.onclick = function() {
        replayMode = !replayMode;
        if (replayMode) {
          replayIndex = 0;
          replaySlider.value = '0';
          replaySlider.disabled = false;
          replayToggle.textContent = 'Stop Replay';
          replayToggle.style.background = '#f93';
          startAutoTravel(); // Start auto-travel for replay
        } else {
          stopAutoTravel();
          replaySlider.disabled = true;
          replayToggle.textContent = 'Replay';
          replayToggle.style.background = '#222';
        }
      };
    }

    if (replaySlider) {
      replaySlider.oninput = function() {
        if (replayMode) {
          replayIndex = parseInt(this.value, 10);
          // In a real application, you'd update the multiverse state
          // based on the replayIndex, e.g., reset to a specific dimension/universe
          // and then step agents to the desired point in their journey.
          // For now, we just update the slider value.
        }
      };
    }
  }, 100);
}

// Example usage in UI (could be triggered by a button or event)
export function showTerminalOverlaysByCategory(category: string, targetId: string) {
  const el = document.getElementById(targetId);
  if (el) el.innerHTML = getOverlaysByCategory(category).join('<hr>');
}
export function triggerTerminalHarmonization() {
  harmonizeByStrategy('terminalHarmonizeAll');
} 