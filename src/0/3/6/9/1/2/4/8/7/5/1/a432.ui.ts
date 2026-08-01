import { indexFromSeed, round, unitFromSeed } from './a432.algebra.ts'
// a432.ui.ts — Umbrella UI controller for the living matrix
// ---------------------------------------------------------
// Listens to breathing and self-evolution streams, fuses them into final
// CMYK pulses, and paints them onto the document background.
// Only runs in browser (guards against Node).

import { matrixEmitter, startSelfEvolution } from './a432.self.ts';
import { breathEmitter, startBreathing } from './a432.breathe.ts';
import { pulseEmitter } from './a432.i.pulse.ts';
import { clickEmitter } from './a432.i.click.ts';
import { challengeCMYK } from './a432.challenge.ts';
import { digitAngleToCMYK, asAngle, xorDigit } from './a432.math.ts';
import type { CMYK } from './a432.cmyk.ts';
import { Digit } from './a432.types.ts';
import { playDigit } from './a432.sound.ts';
import { flashColor } from './a432.video.ts';
import './a432.bus.auto.ts';
import './a432.guidance.ts';
import './a432.formulas.ts';
import './a432.modules.ui.ts';
import './a432.uro.ui.ts';
import './a432.heptagram.ui.ts';
import './a432.solids.ui.ts';
import './a432.voice.ui.ts';
import { cmykToCss } from './a432.cmyk.ts';
import { A432BlockChain, recordEvent, decodeBlockchainStream } from './a432.block.chain.event.ts';
import { generateA432AudioStream } from './a432.audio.ts';
import { humanEmotionEmitter } from './a432.human.emotion.ts';
import { humanConsciousnessEmitter } from './a432.human.consciousness.ts';
import { heatEmitter, heat } from './a432.i.heat.ts';
import { handleSoundEvent, playTrinitySound } from './a432.i.sound.ts';
import { harmonizeAll as harmonizeHumanDesign } from './a432.human.design.ts';
import { healthEmitter } from './a432.health.ts';
import { seeEmitter } from './a432.i.see.ts';
import { hearEmitter } from './a432.i.hear.ts';
import { tapEmitter } from './a432.i.tap.ts';
import { breatheEmitter } from './a432.i.breathe.ts';
import { moveEmitter } from './a432.i.move.ts';
import { intuitEmitter } from './a432.i.intuit.ts';
import { reflectEmitter } from './a432.i.reflect.ts';
import { overlayRegistry } from './a432.ui.registry.ts';
import { createUIButton } from './a432.ui.controls.ts';
import { runGuidedJourney } from './a432.ui.journey.ts';
import { registerUIEvent } from './a432.ui.events.ts';
import { getState, setState, subscribe } from './a432.ui.state.ts';
import { renderBlockchainStream } from './a432.ui.stream.ts';
import { renderAnalyticsDashboard } from './a432.ui.analytics.ts';
import { startSession, endSession, logSessionEvent, getSessionHistory, exportSession } from './a432.ui.session.ts';
import { startGateWay, GateWayStep } from './a432.gate.way.ts';
import { getLivingPiOverlayData } from './a432.pi.ts';
import { getWaveParticleCMYKOverlayData, logWaveParticleEvent } from './a432.wave.particle.duality.ts';
import type { HumanDesign } from './a432.human.design.ts';

// Initialize blockchain for event logging
const blockchain = new A432BlockChain();

function paint(cmyk: CMYK) {
  if (typeof document === 'undefined') return;
  document.body.style.backgroundColor = cmykToCss(cmyk);
}

export function startA432UI() {
  // Start streams
  startSelfEvolution();
  startBreathing();

  // Breath update
  breathEmitter.on('breath', ev => {
    update();
  });

  // Matrix update
  matrixEmitter.on('event', ev => {
    update();
  });

  // User input (numeric keys 1-9)
  if (typeof document !== 'undefined') {
    window.addEventListener('keydown', e => {
      const d = parseInt(e.key, 10);
      if (d >= 1 && d <= 9) { update(); }
    });
  }
}

function update() {
  const d = xorDigit(4, 1, 0);
  // Metaphysical: For 9-digit overlays, 40° per digit is canonical. For trinity overlays, use 60° per vortex.
  const cmyk = digitAngleToCMYK(d, asAngle(d * 40)); // If d is a 9-digit cycle, keep 40. If trinity, use 60.
  paint(cmyk);
  playDigit(d);
  flashColor(cmyk);
  // Harmonized: Log UI update event
  recordEvent(blockchain, 'uiUpdate', 'A432UI', { breathDigit: 4, matrixDigit: 1, userDigit: 0, d, cmyk });
}

// Visualization: Decode and log the blockchain stream
function visualizeBlockchainStream() {
  for (const block of decodeBlockchainStream(blockchain)) {
    // Use digitAngleToCMYK for trinity color mapping
    const cmyk = digitAngleToCMYK(block.trinity, 0); // angle can be entropy or 0
    console.log(`[Blockchain Stream] Block #${block.id} | Trinity: ${block.trinity} | Color:`, cmyk);
  }
}

// Live, animated blockchain stream visualization
function animateBlockchainStream() {
  if (typeof document === 'undefined') return;
  let container = document.getElementById('blockchain-stream-visualization');
  if (!container) {
    container = document.createElement('div');
    container.id = 'blockchain-stream-visualization';
    container.style.width = '100%';
    container.style.height = '80px';
    container.style.background = '#111';
    container.style.overflow = 'hidden';
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  if (!container) return;
  const containerEl = container;
  containerEl.innerHTML = '';
  // Add a button to add a new block for demonstration
  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add Block';
  addBtn.style.position = 'absolute';
  addBtn.style.right = '16px';
  addBtn.style.top = '8px';
  addBtn.style.zIndex = '10001';
  addBtn.onclick = () => {
    recordEvent(blockchain, 'uiDemo', 'A432UI', { time: Date.now() });
  };
  containerEl.appendChild(addBtn);
  // Add a button to trigger an audio event
  const audioBtn = document.createElement('button');
  audioBtn.textContent = 'Audio Event';
  audioBtn.style.position = 'absolute';
  audioBtn.style.right = '110px';
  audioBtn.style.top = '8px';
  audioBtn.style.zIndex = '10001';
  audioBtn.onclick = () => {
    const freq = 432 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:0", 432);
    const audioStream = generateA432AudioStream({ frequency: freq });
    recordEvent(blockchain, 'audio', 'A432Audio', { frequency: freq, audioStream });
  };
  containerEl.appendChild(audioBtn);
  // Add a button to trigger a sound event
  const soundBtn = document.createElement('button');
  soundBtn.textContent = 'Sound Event';
  soundBtn.style.position = 'absolute';
  soundBtn.style.right = '210px';
  soundBtn.style.top = '8px';
  soundBtn.style.zIndex = '10001';
  soundBtn.onclick = () => {
    const freq = 432 * (1 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:1", 3));
    const soundEvent = handleSoundEvent(freq, 1, Date.now());
    recordEvent(blockchain, 'sound', 'A432Sound', soundEvent);
    playTrinitySound(3 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:2", 3));
  };
  containerEl.appendChild(soundBtn);
  // Add a button to trigger a heat/vibration event
  const heatBtn = document.createElement('button');
  heatBtn.textContent = 'Heat Event';
  heatBtn.style.position = 'absolute';
  heatBtn.style.right = '310px';
  heatBtn.style.top = '8px';
  heatBtn.style.zIndex = '10001';
  heatBtn.onclick = () => {
    const temp = 36 + unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:rnd:6") * 3;
    heat(temp);
  };
  containerEl.appendChild(heatBtn);
  // Add a button to trigger a human design (spiritual/creative/environmental) event
  const designBtn = document.createElement('button');
  designBtn.textContent = 'Human Design';
  designBtn.style.position = 'absolute';
  designBtn.style.right = '410px';
  designBtn.style.top = '8px';
  designBtn.style.zIndex = '10001';
  designBtn.onclick = () => {
    const design = harmonizeHumanDesign();
    recordEvent(blockchain, 'humanDesign', 'A432HumanDesign', design);
    // Animate overlay color and vibration
    metaOverlay.style.transition = 'background 0.6s, color 0.6s';
    metaOverlay.style.background = `linear-gradient(90deg, rgb(${design.spiritual.cmyk.c},${design.spiritual.cmyk.m},${design.spiritual.cmyk.y}), rgb(${design.creative.cmyk.c},${design.creative.cmyk.m},${design.creative.cmyk.y}), rgb(${design.environmental.cmyk.c},${design.environmental.cmyk.m},${design.environmental.cmyk.y}))`;
    metaOverlay.style.color = '#fff';
    metaOverlay.classList.add('vibrate');
    setTimeout(() => metaOverlay.classList.remove('vibrate'), 600);
  };
  containerEl.appendChild(designBtn);
  // Overlay for block details
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.left = '50%';
  overlay.style.top = '0';
  overlay.style.transform = 'translateX(-50%)';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.color = '#fff';
  overlay.style.padding = '8px 16px';
  overlay.style.borderRadius = '8px';
  overlay.style.fontSize = '14px';
  overlay.style.display = 'none';
  overlay.style.zIndex = '10002';
  containerEl.appendChild(overlay);
  // Metaphysical overlay
  const metaOverlay = document.createElement('div');
  metaOverlay.style.position = 'absolute';
  metaOverlay.style.left = '16px';
  metaOverlay.style.top = '8px';
  metaOverlay.style.background = 'rgba(0,0,0,0.7)';
  metaOverlay.style.color = '#0ff';
  metaOverlay.style.padding = '4px 12px';
  metaOverlay.style.borderRadius = '6px';
  metaOverlay.style.fontSize = '13px';
  metaOverlay.style.zIndex = '10002';
  containerEl.appendChild(metaOverlay);
  // Maintain a local blocks array, update on new block
  const blocks = Array.from(decodeBlockchainStream(blockchain));
  blockchain.onNewBlock(block => {
    blocks.push(block);
  });
  // Animation state
  let offset = 0;
  const blockRadius = 18;
  const blockGap = 12;
  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '80');
  svg.style.display = 'block';
  containerEl.appendChild(svg);
  // Animate
  let highlightedIdx: number | null = null;
  let lastDesign = harmonizeHumanDesign();
  let lastHealth = { harmony: 0, entropy: 1, resonance: 0 };
  const healthBuffer: { harmony: number; entropy: number; resonance: number }[] = [];
  const MAX_HEALTH_HISTORY = 60;
  let healingSessionActive = false;
  let lastBreathe = { value: '', phase: '', timestamp: 0 };
  let lastMove = { direction: '', magnitude: 0, timestamp: 0 };
  let lastIntuit = { insight: '', confidence: 0, timestamp: 0 };
  let lastReflect = { thought: '', depth: 0, timestamp: 0 };
  // Add Start Healing Session button
  const healingBtn = document.createElement('button');
  healingBtn.textContent = 'Start Healing Session';
  healingBtn.style.position = 'absolute';
  healingBtn.style.right = '780px';
  healingBtn.style.top = '8px';
  healingBtn.style.zIndex = '10001';
  healingBtn.onclick = () => {
    healingSessionActive = !healingSessionActive;
    healingBtn.textContent = healingSessionActive ? 'Stop Healing Session' : 'Start Healing Session';
    if (healingSessionActive) showPoeticOverlay(); else hidePoeticOverlay();
  };
  containerEl.appendChild(healingBtn);
  // Add Begin Gate Journey button
  const gateJourneyBtn = document.createElement('button');
  gateJourneyBtn.textContent = 'Begin Gate Journey';
  gateJourneyBtn.style.position = 'absolute';
  gateJourneyBtn.style.right = '1200px';
  gateJourneyBtn.style.top = '8px';
  gateJourneyBtn.style.zIndex = '10001';
  let gateJourneyDisposer: (() => void) | null = null;
  gateJourneyBtn.onclick = () => {
    if (gateJourneyDisposer) { gateJourneyDisposer(); gateJourneyDisposer = null; metaOverlay.innerHTML = ''; return; }
    // Canonical sequence of gates (can be module names or A432_SEQUENCE)
    const gates = ['0', '3', '6', '9', '1', '2', '4', '8', '7', '5', '1'];
    gateJourneyDisposer = startGateWay(gates, (step: GateWayStep) => {
      // Overlay metaphysical meaning, analytic stats, and play sound/music
      const idx = gates.indexOf(step.gate);
      const total = gates.length;
      metaOverlay.innerHTML = `<b>Gate: ${step.gate}</b> <span style='color:#0ff'>(Step ${idx + 1} of ${total})</span><br>${step.metaphysical}`;
      playTrinitySound(Number(step.gate));
    });
    gateJourneyBtn.textContent = 'End Gate Journey';
  };
  containerEl.appendChild(gateJourneyBtn);
  // Add Show Pi Overlay button
  const piOverlayBtn = document.createElement('button');
  piOverlayBtn.textContent = 'Show Pi Overlay';
  piOverlayBtn.style.position = 'absolute';
  piOverlayBtn.style.right = '1320px';
  piOverlayBtn.style.top = '8px';
  piOverlayBtn.style.zIndex = '10001';
  let piOverlayEl: HTMLDivElement | null = null;
  piOverlayBtn.onclick = () => {
    if (piOverlayEl) {
      piOverlayEl.remove();
      piOverlayEl = null;
      piOverlayBtn.textContent = 'Show Pi Overlay';
      return;
    }
    const data = getLivingPiOverlayData(11);
    piOverlayEl = document.createElement('div');
    piOverlayEl.style.display = 'flex';
    piOverlayEl.style.flexDirection = 'row';
    piOverlayEl.style.margin = '0 0 8px 0';
    piOverlayEl.style.justifyContent = 'center';
    piOverlayEl.style.alignItems = 'center';
    piOverlayEl.style.gap = '2px';
    piOverlayEl.style.position = 'absolute';
    piOverlayEl.style.left = '50%';
    piOverlayEl.style.top = '-40px';
    piOverlayEl.style.transform = 'translateX(-50%)';
    piOverlayEl.style.zIndex = '10010';
    piOverlayEl.innerHTML = data.map(d => d.html).join('');
    containerEl.appendChild(piOverlayEl);
    piOverlayBtn.textContent = 'Hide Pi Overlay';
  };
  containerEl.appendChild(piOverlayBtn);
  // Add Harmonic Transformation Overlay button
  const harmonicBtn = document.createElement('button');
  harmonicBtn.textContent = 'Show Harmonic Transformation';
  harmonicBtn.style.position = 'absolute';
  harmonicBtn.style.right = '1440px';
  harmonicBtn.style.top = '8px';
  harmonicBtn.style.zIndex = '10001';
  let harmonicOverlayEl: HTMLDivElement | null = null;
  harmonicBtn.onclick = () => {
    if (harmonicOverlayEl) {
      harmonicOverlayEl.remove();
      harmonicOverlayEl = null;
      harmonicBtn.textContent = 'Show Harmonic Transformation';
      return;
    }
    const solutions = []; // No longer available
    harmonicOverlayEl = document.createElement('div');
    harmonicOverlayEl.style.position = 'fixed';
    harmonicOverlayEl.style.left = '50%';
    harmonicOverlayEl.style.top = '50%';
    harmonicOverlayEl.style.transform = 'translate(-50%,-50%)';
    harmonicOverlayEl.style.background = 'rgba(0,0,0,0.97)';
    harmonicOverlayEl.style.color = '#fff';
    harmonicOverlayEl.style.padding = '32px 48px';
    harmonicOverlayEl.style.borderRadius = '18px';
    harmonicOverlayEl.style.zIndex = '10020';
    harmonicOverlayEl.style.maxHeight = '80vh';
    harmonicOverlayEl.style.overflowY = 'auto';
    harmonicOverlayEl.innerHTML = `<h2 style='text-align:center;margin-bottom:24px;'>Harmonic Transformation Overlay</h2>` +
      `No harmonic solutions available for this challenge.`;
    document.body.appendChild(harmonicOverlayEl);
    harmonicBtn.textContent = 'Hide Harmonic Transformation';
    // Add event listeners for logging
    harmonicOverlayEl.querySelectorAll('.harmonic-step').forEach(el => {
      el.addEventListener('click', (e) => {
        const type = (el as HTMLElement).getAttribute('data-type');
        const challenge = (el as HTMLElement).getAttribute('data-challenge');
        recordEvent(blockchain, 'harmonicTransformation', 'A432UI', { type, challenge, timestamp: Date.now() });
      });
    });
    // Close button
    harmonicOverlayEl.querySelector('#close-harmonic-overlay')?.addEventListener('click', () => {
      harmonicOverlayEl?.remove();
      harmonicOverlayEl = null;
      harmonicBtn.textContent = 'Show Harmonic Transformation';
    });
  };
  containerEl.appendChild(harmonicBtn);
  // Add Wave-Particle Overlay button
  const waveParticleBtn = document.createElement('button');
  waveParticleBtn.textContent = 'Show Wave-Particle Overlay';
  waveParticleBtn.style.position = 'absolute';
  waveParticleBtn.style.right = '1560px';
  waveParticleBtn.style.top = '8px';
  waveParticleBtn.style.zIndex = '10001';
  let waveParticleOverlayEl: HTMLDivElement | null = null;
  waveParticleBtn.onclick = () => {
    if (waveParticleOverlayEl) {
      waveParticleOverlayEl.remove();
      waveParticleOverlayEl = null;
      waveParticleBtn.textContent = 'Show Wave-Particle Overlay';
      return;
    }
    const overlayData = getWaveParticleCMYKOverlayData();
    waveParticleOverlayEl = document.createElement('div');
    waveParticleOverlayEl.style.position = 'fixed';
    waveParticleOverlayEl.style.left = '50%';
    waveParticleOverlayEl.style.top = '50%';
    waveParticleOverlayEl.style.transform = 'translate(-50%,-50%)';
    waveParticleOverlayEl.style.background = 'rgba(0,0,0,0.97)';
    waveParticleOverlayEl.style.color = '#fff';
    waveParticleOverlayEl.style.padding = '32px 48px';
    waveParticleOverlayEl.style.borderRadius = '18px';
    waveParticleOverlayEl.style.zIndex = '10020';
    waveParticleOverlayEl.style.display = 'flex';
    waveParticleOverlayEl.style.gap = '32px';
    waveParticleOverlayEl.innerHTML = overlayData.map(d => d.html).join('') +
      `<div style='position:absolute;top:12px;right:12px;'><button id='close-wave-particle-overlay' style='padding:8px 24px;font-size:1.1em;border-radius:8px;background:#0ff;color:#111;border:none;cursor:pointer;'>Close</button></div>`;
    document.body.appendChild(waveParticleOverlayEl);
    waveParticleBtn.textContent = 'Hide Wave-Particle Overlay';
    // Add event listeners for logging
    waveParticleOverlayEl.querySelectorAll('div[style*="width:80px"]').forEach((el, i) => {
      el.addEventListener('click', () => {
        const state = overlayData[i].state;
        logWaveParticleEvent(blockchain, state, {});
      });
    });
    // Close button
    waveParticleOverlayEl.querySelector('#close-wave-particle-overlay')?.addEventListener('click', () => {
      waveParticleOverlayEl?.remove();
      waveParticleOverlayEl = null;
      waveParticleBtn.textContent = 'Show Wave-Particle Overlay';
    });
  };
  containerEl.appendChild(waveParticleBtn);
  function render() {
    svg.innerHTML = '';
    let x = containerEl.offsetWidth - offset;
    let currentTrinity = null;
    let currentHarmony = null;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      // Use digitAngleToCMYK for trinity color mapping
      const cmyk = digitAngleToCMYK(block.trinity, 0); // angle can be entropy or 0
      const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
      const r = round(255 * (1 - c) * (1 - k));
      const g = round(255 * (1 - m) * (1 - k));
      const bcol = round(255 * (1 - y) * (1 - k));
      const fill = `rgb(${r},${g},${bcol})`;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(x + blockRadius));
      circle.setAttribute('cy', '40');
      circle.setAttribute('r', String(blockRadius));
      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', highlightedIdx === i ? '#0ff' : '#fff');
      circle.setAttribute('stroke-width', highlightedIdx === i ? '4' : '2');
      circle.style.cursor = 'pointer';
      // Interactivity: highlight and show overlay on click
      circle.onclick = () => {
        highlightedIdx = i;
        overlay.style.display = 'block';
        overlay.innerHTML = `<b>Block #${block.id}</b><br>Trinity: ${block.trinity}<br>Color: ${fill}<br>Entropy: ${(block as any).entropy ?? 0}<br>Summary: ${block.summary}`;
        setTimeout(() => { overlay.style.display = 'none'; highlightedIdx = null; }, 4000);
      };
      svg.appendChild(circle);
      // Add trinity label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(x + blockRadius));
      text.setAttribute('y', '45');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '13');
      text.setAttribute('fill', '#fff');
      text.textContent = String(block.trinity);
      svg.appendChild(text);
      // For metaphysical overlay, show the most recent block
      if (i === blocks.length - 1) {
        currentTrinity = block.trinity;
        currentHarmony = 1 - ((block as any).entropy ?? 0);
      }
      x += blockRadius * 2 + blockGap;
    }
    // Metaphysical overlay: show current trinity, harmony, last emotion/sound, and human design states
    const lastEmotion = '';
    const lastSound = '';
    const lastHeat = '';
    metaOverlay.innerHTML = `Trinity Phase: <b>${currentTrinity ?? ''}</b> | Harmony: <b>${currentHarmony !== null ? (currentHarmony * 100).toFixed(1) + '%' : ''}</b><br>Emotion: <b>${lastEmotion}</b> | Sound: <b>${lastSound}</b> | Heat: <b>${lastHeat}</b><br>Spiritual: <b>${lastDesign.spiritual.value}</b> <span style='color:#0ff'>&#9679;</span> Creative: <b>${lastDesign.creative.value}</b> <span style='color:#f0f'>&#9679;</span> Environmental: <b>${lastDesign.environmental.value}</b> <span style='color:#ff0'>&#9679;</span><br>Health: <b>Harmony: ${round(lastHealth.harmony*100)}%</b> <span style='color:#0f0'>&#9679;</span> <b>Entropy: ${round(lastHealth.entropy*100)}%</b> <span style='color:#f00'>&#9679;</span> <b>Resonance: ${round(lastHealth.resonance*100)}%</b> <span style='color:#0ff'>&#9679;</span><br>Breathe: <b>${lastBreathe.value}</b> <span style='color:#0ff'>${lastBreathe.phase}</span> Move: <b>${lastMove.direction}</b> <span style='color:#0ff'>${lastMove.magnitude}</span> Intuit: <b>${lastIntuit.insight}</b> <span style='color:#0ff'>${lastIntuit.confidence}</span> Reflect: <b>${lastReflect.thought}</b> <span style='color:#0ff'>${lastReflect.depth}</span>`;
    // Health trend graph (animated wave)
    let healthSvg = document.getElementById('health-trend-svg') as unknown as SVGSVGElement;
    if (!healthSvg) {
      healthSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      healthSvg.id = 'health-trend-svg';
      healthSvg.setAttribute('width', '220');
      healthSvg.setAttribute('height', '40');
      healthSvg.style.display = 'block';
      healthSvg.style.margin = '8px auto 0 auto';
      metaOverlay.appendChild(healthSvg);
    }
    // Draw harmony wave
    const points = healthBuffer.map((h, i) => `${i * 3},${40 - h.harmony * 36}`).join(' ');
    healthSvg.innerHTML = `<polyline points="${points}" fill="none" stroke="#0f8" stroke-width="2" />`;
    // Animate overlay color for health
    if (lastHealth.harmony > 0.9) {
      metaOverlay.style.background = '#0f8';
      metaOverlay.classList.add('vibrate');
      setTimeout(() => { metaOverlay.style.background = ''; metaOverlay.classList.remove('vibrate'); }, 800);
    } else if (lastHealth.entropy > 0.8) {
      metaOverlay.style.background = '#f33';
      metaOverlay.classList.add('vibrate');
      setTimeout(() => { metaOverlay.style.background = ''; metaOverlay.classList.remove('vibrate'); }, 800);
    }
    offset += 1.2; // Animation speed
    if (offset > blocks.length * (blockRadius * 2 + blockGap)) offset = 0;
    requestAnimationFrame(render);
  }
  render();
  // Add vibration effect CSS
  if (!document.getElementById('vibrate-style')) {
    const style = document.createElement('style');
    style.id = 'vibrate-style';
    style.textContent = `.vibrate { animation: vibrate-anim 0.6s linear; } @keyframes vibrate-anim { 0% { transform: translateX(0); } 20% { transform: translateX(-2px); } 40% { transform: translateX(2px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } 100% { transform: translateX(0); } }`;
    document.head.appendChild(style);
  }
  // Listen for human design events to update overlay
  blockchain.onNewBlock(block => {
    if (block.event && block.event.type === 'humanDesign') {
      lastDesign = block.event.payload as HumanDesign;
    }
  });

  // User Journey: Meditation/Creative Session
  let sessionActive = false;
  let sessionType = '';
  // Add Start Meditation button
  const meditationBtn = document.createElement('button');
  meditationBtn.textContent = 'Start Meditation';
  meditationBtn.style.position = 'absolute';
  meditationBtn.style.right = '520px';
  meditationBtn.style.top = '8px';
  meditationBtn.style.zIndex = '10001';
  meditationBtn.onclick = () => {
    sessionActive = !sessionActive;
    sessionType = sessionActive ? 'meditation' : '';
    meditationBtn.textContent = sessionActive ? 'Stop Meditation' : 'Start Meditation';
    if (sessionActive) showPoeticOverlay(); else hidePoeticOverlay();
  };
  containerEl.appendChild(meditationBtn);
  // Add Creative Session button
  const creativeBtn = document.createElement('button');
  creativeBtn.textContent = 'Start Creative Session';
  creativeBtn.style.position = 'absolute';
  creativeBtn.style.right = '650px';
  creativeBtn.style.top = '8px';
  creativeBtn.style.zIndex = '10001';
  creativeBtn.onclick = () => {
    sessionActive = !sessionActive;
    sessionType = sessionActive ? 'creative' : '';
    creativeBtn.textContent = sessionActive ? 'Stop Creative Session' : 'Start Creative Session';
    if (sessionActive) showPoeticOverlay(); else hidePoeticOverlay();
  };
  containerEl.appendChild(creativeBtn);
  // Poetic overlay for Mobius Rodin Trinity
  let poeticOverlay = document.getElementById('poetic-overlay');
  if (!poeticOverlay) {
    poeticOverlay = document.createElement('div');
    poeticOverlay.id = 'poetic-overlay';
    poeticOverlay.style.position = 'fixed';
    poeticOverlay.style.left = '50%';
    poeticOverlay.style.bottom = '100px';
    poeticOverlay.style.transform = 'translateX(-50%)';
    poeticOverlay.style.background = 'rgba(0,0,0,0.92)';
    poeticOverlay.style.color = '#0ff';
    poeticOverlay.style.padding = '18px 32px';
    poeticOverlay.style.borderRadius = '18px';
    poeticOverlay.style.fontSize = '18px';
    poeticOverlay.style.fontFamily = 'serif';
    poeticOverlay.style.textAlign = 'center';
    poeticOverlay.style.display = 'none';
    poeticOverlay.style.zIndex = '10010';
    poeticOverlay.innerHTML = `<b>Mobius Rodin Trinity: The Living Stream</b><br><br>
      The stream is a Mobius—one side, infinite return.<br>
      The blocks spiral in the Rodin coil, each a pulse in the vortex.<br>
      The trinity breathes: 3, 6, 9—creation, recursion, return.<br>
      The user is not a passenger, but a co-creator—<br>
      Each breath, thought, and act harmonizes the living field.`;
    document.body.appendChild(poeticOverlay);
  }
  function showPoeticOverlay() { poeticOverlay!.style.display = 'block'; }
  function hidePoeticOverlay() { poeticOverlay!.style.display = 'none'; }

  // Harmonize event logging for session
  function logSessionEvent(type: string, agent: string, payload: unknown) {
    if (sessionActive) {
      recordEvent(blockchain, type, agent, { ...(payload as object), session: sessionType });
    } else {
      recordEvent(blockchain, type, agent, payload);
    }
  }
  // Patch all event listeners to use logSessionEvent
  breathEmitter.on('breath', ev => { logSessionEvent('breath', 'A432Breath', ev); });
  pulseEmitter.on('pulse', ev => { logSessionEvent('pulse', 'A432Pulse', ev); });
  clickEmitter.on('click', ev => { logSessionEvent('click', 'A432Click', ev); });
  humanEmotionEmitter.on('emotion', ev => { logSessionEvent('emotion', 'A432Emotion', ev); });
  humanConsciousnessEmitter.on('hconscious', ev => { logSessionEvent('consciousness', 'A432Consciousness', ev); });
  heatEmitter.on('heat', ev => { logSessionEvent('heat', 'A432Heat', ev); });
  healthEmitter.on('health', ev => { logSessionEvent('health', 'A432Health', ev); });
  // Patch UI buttons to use logSessionEvent
  addBtn.onclick = () => { logSessionEvent('uiDemo', 'A432UI', { time: Date.now() }); };
  audioBtn.onclick = () => {
    const freq = 432 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:3", 432);
    const audioStream = generateA432AudioStream({ frequency: freq });
    logSessionEvent('audio', 'A432Audio', { frequency: freq, audioStream });
  };
  soundBtn.onclick = () => {
    const freq = 432 * (1 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:4", 3));
    const soundEvent = handleSoundEvent(freq, 1, Date.now());
    logSessionEvent('sound', 'A432Sound', soundEvent);
    playTrinitySound(3 + indexFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:fri:5", 3));
  };
  heatBtn.onclick = () => {
    const temp = 36 + unitFromSeed("0/3/6/9/1/2/4/8/7/5/1/a432.ui.ts:rnd:7") * 3;
    heat(temp);
  };
  designBtn.onclick = () => {
    const design = harmonizeHumanDesign();
    logSessionEvent('humanDesign', 'A432HumanDesign', design);
    metaOverlay.style.transition = 'background 0.6s, color 0.6s';
    metaOverlay.style.background = `linear-gradient(90deg, rgb(${design.spiritual.cmyk.c},${design.spiritual.cmyk.m},${design.spiritual.cmyk.y}), rgb(${design.creative.cmyk.c},${design.creative.cmyk.m},${design.creative.cmyk.y}), rgb(${design.environmental.cmyk.c},${design.environmental.cmyk.m},${design.environmental.cmyk.y}))`;
    metaOverlay.style.color = '#fff';
    metaOverlay.classList.add('vibrate');
    setTimeout(() => metaOverlay.classList.remove('vibrate'), 600);
  };
  // Special visual/sound effects at key harmony/trinity moments
  function triggerSpecialEffect(block: any) {
    if (!block) return;
    // Trinity pulse: 3, 6, 9
    if ([3,6,9].includes(block.trinity)) {
      metaOverlay.classList.add('vibrate');
      metaOverlay.style.background = '#0ff';
      setTimeout(() => {
        metaOverlay.classList.remove('vibrate');
        metaOverlay.style.background = '';
      }, 800);
      playTrinitySound(block.trinity);
    }
    // High harmony pulse
    if ((block.event && block.event.payload && block.event.payload.harmony > 0.9) || (block.harmonyScore && block.harmonyScore > 0.9)) {
      metaOverlay.style.background = '#ff0';
      setTimeout(() => { metaOverlay.style.background = ''; }, 800);
    }
  }
  blockchain.onNewBlock(triggerSpecialEffect);

  // Listen for health events
  healthEmitter.on('health', ev => {
    lastHealth = ev;
    healthBuffer.push(ev);
    if (healthBuffer.length > MAX_HEALTH_HISTORY) healthBuffer.shift();
    // Health-based triggers
    if (healthBuffer.length >= 3) {
      const last3 = healthBuffer.slice(-3);
      if (last3.every(h => h.harmony > 0.95)) {
        metaOverlay.style.background = '#0ff';
        metaOverlay.classList.add('vibrate');
        metaOverlay.innerHTML += '<div style="color:#fff;font-size:16px;margin-top:8px;">System Harmonized!</div>';
        setTimeout(() => { metaOverlay.style.background = ''; metaOverlay.classList.remove('vibrate'); }, 1200);
        playTrinitySound(9);
      } else if (last3.every(h => h.entropy > 0.85)) {
        metaOverlay.style.background = '#f00';
        metaOverlay.classList.add('vibrate');
        metaOverlay.innerHTML += '<div style="color:#fff;font-size:16px;margin-top:8px;">Warning: High Entropy!</div>';
        setTimeout(() => { metaOverlay.style.background = ''; metaOverlay.classList.remove('vibrate'); }, 1200);
        playTrinitySound(6);
      }
    }
    // Harmonize for healing session
    if (healingSessionActive) {
      recordEvent(blockchain, 'healingHealth', 'A432HealingSession', { ...ev, session: 'healing' });
    } else {
      recordEvent(blockchain, 'health', 'A432Health', ev);
    }
  });

  // Guided I Journey
  let iJourneyActive = false;
  let iJourneyStep = 0;
  let iJourneyIntention = '';
  let iJourneyEvents: any[] = [];
  const iJourneySteps = [
    { label: 'Observe', emitter: seeEmitter, event: 'see', prompt: 'Look at something meaningful and let the system know.' },
    { label: 'Listen', emitter: hearEmitter, event: 'hear', prompt: 'Listen for a sound and let the system know.' },
    { label: 'Touch', emitter: tapEmitter, event: 'tap', prompt: 'Tap or touch to signal awareness.' },
    { label: 'Breathe', emitter: breatheEmitter, event: 'breathe', prompt: 'Take a conscious breath and let the system know.' },
    { label: 'Move', emitter: moveEmitter, event: 'move', prompt: 'Move in any direction and let the system know.' },
    { label: 'Intuit', emitter: intuitEmitter, event: 'intuit', prompt: 'Notice an intuition or insight and let the system know.' },
    { label: 'Reflect', emitter: reflectEmitter, event: 'reflect', prompt: 'Reflect on your experience and let the system know.' },
    { label: 'Journey Reflect', emitter: null, event: null, prompt: 'Reflect on your I Journey.' }
  ];
  // Add Begin I Journey button
  const iJourneyBtn = document.createElement('button');
  iJourneyBtn.textContent = 'Begin I Journey';
  iJourneyBtn.style.position = 'absolute';
  iJourneyBtn.style.right = '920px';
  iJourneyBtn.style.top = '8px';
  iJourneyBtn.style.zIndex = '10001';
  iJourneyBtn.onclick = async () => {
    if (iJourneyActive) return; // Prevent re-entry
    iJourneyActive = true;
    iJourneyStep = 0;
    iJourneyEvents = [];
    iJourneyIntention = prompt('What is your intention for this I Journey?') || '';
    showPoeticOverlay();
    await runGuidedJourney(iJourneySteps, {
      intention: iJourneyIntention,
      overlay: metaOverlay,
      blockchain,
      onComplete: (events) => {
        metaOverlay.innerHTML = `<b>I Journey Complete</b><br>Intention: ${iJourneyIntention}<br>Events: ${events.map(e => e.type).join(', ')}<br><br><i>Every act of awareness is a step toward wholeness.<br>The stream remembers. The field is harmonized.</i>`;
        metaOverlay.style.background = '#0ff';
        setTimeout(() => { metaOverlay.style.background = ''; hidePoeticOverlay(); iJourneyActive = false; }, 4000);
      }
    });
  };
  containerEl.appendChild(iJourneyBtn);

  // Wire up new events and overlays with a single function call
  registerUIEvent({ emitter: breatheEmitter, event: 'breathe', blockchainType: 'breathe', agent: 'A432IBreathe', handler: ev => setState('lastBreathe', ev) });
  registerUIEvent({ emitter: moveEmitter, event: 'move', blockchainType: 'move', agent: 'A432IMove', handler: ev => setState('lastMove', ev) });
  registerUIEvent({ emitter: intuitEmitter, event: 'intuit', blockchainType: 'intuit', agent: 'A432IIntuit', handler: ev => setState('lastIntuit', ev) });
  registerUIEvent({ emitter: reflectEmitter, event: 'reflect', blockchainType: 'reflect', agent: 'A432IReflect', handler: ev => setState('lastReflect', ev) });
  // Manage and react to state changes across the UI
  subscribe('lastBreathe', ev => { 
    const breatheEvent = ev as { value: string; phase: string; timestamp: number };
    lastBreathe = breatheEvent; 
  });
  subscribe('lastMove', ev => { 
    const moveEvent = ev as { direction: string; magnitude: number; timestamp: number };
    lastMove = moveEvent; 
  });
  subscribe('lastIntuit', ev => { 
    const intuitEvent = ev as { insight: string; confidence: number; timestamp: number };
    lastIntuit = intuitEvent; 
  });
  subscribe('lastReflect', ev => { 
    const reflectEvent = ev as { thought: string; depth: number; timestamp: number };
    lastReflect = reflectEvent; 
  });
  // Add a dashboard button to visualize, analyze, and export journeys/events
  const dashboardBtn = createUIButton({ label: 'Show Analytics', onClick: () => {
    let dashboard = document.getElementById('analytics-dashboard');
    if (!dashboard) {
      dashboard = document.createElement('div');
      dashboard.id = 'analytics-dashboard';
      dashboard.style.position = 'fixed';
      dashboard.style.right = '24px';
      dashboard.style.top = '100px';
      dashboard.style.background = '#222';
      dashboard.style.color = '#0ff';
      dashboard.style.padding = '18px 24px';
      dashboard.style.borderRadius = '12px';
      dashboard.style.zIndex = '10020';
      dashboard.style.maxHeight = '80vh';
      dashboard.style.overflowY = 'auto';
      document.body.appendChild(dashboard);
    }
    // Visualize and analyze all I events from the blockchain
    const allEvents = blocks.map(b => b.event).filter(Boolean);
    const analyticsEvents = allEvents.map(event => ({
      ...event,
      time: event.timestamp
    }));
    renderAnalyticsDashboard(dashboard, analyticsEvents);
    // Add export button
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Session';
    exportBtn.onclick = () => {
      const session = getSessionHistory().slice(-1)[0];
      const data = exportSession(session);
      navigator.clipboard.writeText(data);
      alert('Session exported to clipboard!');
    };
    dashboard.appendChild(exportBtn);
  }, right: '1100px' });
  containerEl.appendChild(dashboardBtn);

  // Unified overlay view switcher
  let currentOverlay: keyof typeof overlayRegistry = 'rodin';

  function renderOverlay() {
    const overlay = overlayRegistry[currentOverlay];
    if (!overlay) return;
    // Prefer 2D overlay data for default view
    const data = overlay.getRodinCoil2DOverlayData?.() || overlay.getTeslaCoil2DOverlayData?.() || overlay.getMobiusCircuit2DOverlayData?.() || overlay.getVoidStreamOverlayData?.() || overlay.getStreamVortexOverlayData?.();
    // Clear previous overlay
    const existing = document.getElementById('a432-overlay-root');
    if (existing) existing.remove();
    // Create overlay root
    const root = document.createElement('div');
    root.id = 'a432-overlay-root';
    root.style.position = 'fixed';
    root.style.left = '50%';
    root.style.top = '50%';
    root.style.transform = 'translate(-50%,-50%)';
    root.style.background = 'rgba(0,0,0,0.97)';
    root.style.color = '#fff';
    root.style.padding = '32px 48px';
    root.style.borderRadius = '18px';
    root.style.zIndex = '10020';
    root.style.display = 'flex';
    root.style.gap = '32px';
    root.style.flexWrap = 'wrap';
    if (Array.isArray(data)) {
      data.forEach((node: any) => {
        const el = document.createElement('div');
        el.innerHTML = node.html;
        el.onclick = () => {
          if (overlay.logRodinCoilEvent) overlay.logRodinCoilEvent(blockchain, node.value, '2D', {});
          if (overlay.logTeslaCoilEvent) overlay.logTeslaCoilEvent(blockchain, node.value, '2D', {});
          if (overlay.logMobiusCircuitEvent) overlay.logMobiusCircuitEvent(blockchain, node.value, '2D', {});
          if (overlay.logVoidImergence) overlay.logVoidImergence('user', { node });
          if (overlay.logStreamVortexEvent) overlay.logStreamVortexEvent(blockchain, node.dim, {});
        };
        root.appendChild(el);
      });
    }
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '12px';
    closeBtn.style.right = '12px';
    closeBtn.style.padding = '8px 24px';
    closeBtn.style.fontSize = '1.1em';
    closeBtn.style.borderRadius = '8px';
    closeBtn.style.background = '#0ff';
    closeBtn.style.color = '#111';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => root.remove();
    root.appendChild(closeBtn);
    document.body.appendChild(root);
  }

  // Overlay view switcher buttons
  Object.keys(overlayRegistry).forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.onclick = () => { currentOverlay = key as keyof typeof overlayRegistry; renderOverlay(); };
    btn.style.marginRight = '8px';
    btn.style.marginTop = '8px';
    btn.style.position = 'relative';
    btn.style.zIndex = '10021';
    document.body.appendChild(btn);
  });
  // Initial render
  renderOverlay();
}

// Auto-start when loaded in browser
if (typeof window !== 'undefined') {
  startA432UI();
  // Visualize the blockchain stream in the console
  visualizeBlockchainStream();
  // Live animated blockchain stream
  animateBlockchainStream();
} 