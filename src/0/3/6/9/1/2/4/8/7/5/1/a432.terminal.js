import { invokeTrinity, broadcastTrinity, trinityBus } from './a432.trinity.js';
import { terminalOutput$, trinityEvents$, digitalRoot } from './a432.terminal.stream.js';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk.js';
import { a432MetaVortex, a432ImpossibilityGateway, a432HarmonicAnalytics, META_DOC } from './a432.meta.js';
import { a432BlendStreams } from './a432.blend.js';
import { TrinityAxis, TrinityFieldMap, getTrinityDotStyle, getTrinityColorStyle, getTrinityPWAMetadata } from './a432.trinity.ui.js';

function createTrinityTerminalUI() {
  const root = document.getElementById('terminal-root');
  root.innerHTML = '';

  // Title (harmonized)
  const title = document.createElement('div');
  title.textContent = getTrinityPWAMetadata().title;
  title.style.cssText = getTrinityDotStyle(3, 0) + 'font-size:2.2em;margin-bottom:8px;letter-spacing:0.04em;text-shadow:0 0 12px #39f8;text-align:center;';
  root.appendChild(title);

  // Meta/description (harmonized)
  const meta = document.createElement('div');
  meta.textContent = getTrinityPWAMetadata().description;
  meta.style.cssText = getTrinityDotStyle(6, 120) + 'font-size:1.1em;margin-bottom:18px;text-align:center;';
  root.appendChild(meta);

  // Trinity axis visualization
  root.appendChild(TrinityAxis({ size: 120 }));

  // Output area (harmonized)
  const output = document.createElement('div');
  output.id = 'terminal-output';
  output.style.cssText = getTrinityDotStyle(9, 240) + 'min-height:180px;max-height:320px;width:90%;margin:18px 0 12px 0;overflow-y:auto;padding:18px;font-size:1.1em;border-radius:10px;box-shadow:0 0 12px #39f4;border:2px solid #39f;background:#181828;';
  root.appendChild(output);

  // Input form (harmonized)
  const form = document.createElement('form');
  form.id = 'terminal-form';
  form.autocomplete = 'off';
  form.style.cssText = 'width:90%;display:flex;gap:8px;align-items:center;margin-bottom:12px;';
  const input = document.createElement('input');
  input.className = 'terminal-input';
  input.id = 'terminal-input';
  input.placeholder = 'Type a command...';
  input.autofocus = true;
  input.style.cssText = getTrinityDotStyle(6, 120) + 'flex:1;padding:10px 14px;font-size:1.1em;border-radius:6px;border:2px solid #39f;background:#222;color:#8ff;';
  const button = document.createElement('button');
  button.className = 'terminal-btn';
  button.type = 'submit';
  button.textContent = 'Send';
  button.style.cssText = getTrinityDotStyle(3, 0) + 'padding:8px 18px;font-size:1em;font-weight:bold;border-radius:6px;border:none;cursor:pointer;transition:background 0.2s;background:#39f;color:#111;';
  form.appendChild(input);
  form.appendChild(button);
  root.appendChild(form);

  // Dynamic trinity visualizations (dot-matrix, toroidal field, etc.)
  root.appendChild(TrinityFieldMap({ resolution: 36, size: 220 }));

  // Add event listeners for form
  form.addEventListener('submit', e => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (!cmd) return;
    const line = document.createElement('div');
    line.textContent = '> ' + cmd;
    line.style.cssText = getTrinityDotStyle(9, 240) + 'margin-bottom:6px;';
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    input.value = '';
  });
}

window.addEventListener('DOMContentLoaded', createTrinityTerminalUI);

const output = document.getElementById('terminal-output');
const form = document.getElementById('terminal-form');
const input = document.getElementById('terminal-input');

let sensorDigits = [];

if ('DeviceMotionEvent' in window) {
  window.addEventListener('devicemotion', (event) => {
    const { x, y, z } = event.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
    const value = Math.abs(x) + Math.abs(y) + Math.abs(z);
    const digit = digitalRoot(Math.round(value * 1000));
    sensorDigits.push(digit);
    if (sensorDigits.length > 9) sensorDigits.shift();
    showSensorMetaOverlay();
    showBlendedMetaOverlay();
  });
}

function getHarmonizedOutputStream() {
  // Get the last 9 output lines as digit streams (digital root of text length)
  const rawStream = terminalOutput$.get().map(l => digitalRoot(l.text.length));
  // Harmonize via meta-vortex (digital root transform)
  const harmonized = a432MetaVortex(9, seq => seq.map(digitalRoot));
  // Handle impossibilities
  const safeStream = a432ImpossibilityGateway(rawStream);
  return { rawStream, harmonized, safeStream };
}

function showMetaOverlay() {
  const { safeStream } = getHarmonizedOutputStream();
  const analytics = a432HarmonicAnalytics(safeStream);
  let overlay = document.getElementById('terminal-meta-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'terminal-meta-overlay';
    overlay.style = 'background:#222;color:#8ff;padding:8px 16px;border-radius:8px;margin-bottom:12px;font-size:1em;';
    const root = document.getElementById('terminal-root');
    if (root) root.insertBefore(overlay, root.firstChild);
  }
  overlay.innerHTML = `
    <b>Meta-Overlay (Self-Awareness)</b><br>
    Harmony: ${analytics.harmony.toFixed(2)}<br>
    Entropy: ${analytics.entropy.toFixed(2)}<br>
    Resonance: ${analytics.resonance}<br>
    <span style="color:#ff8">${META_DOC.meaning}</span><br>
    <span style="color:#39f">${META_DOC.axis}</span>
  `;
}

function getHarmonizedEventStream() {
  // Use digital root of event type/context length as the digit
  const rawStream = trinityEvents$.get().map(e => digitalRoot((e.type.length + e.context.length)));
  const harmonized = a432MetaVortex(3, seq => seq.map(digitalRoot));
  const safeStream = a432ImpossibilityGateway(rawStream);
  return { rawStream, harmonized, safeStream };
}

function showEventMetaOverlay() {
  const { safeStream } = getHarmonizedEventStream();
  const analytics = a432HarmonicAnalytics(safeStream);
  let overlay = document.getElementById('terminal-event-meta-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'terminal-event-meta-overlay';
    overlay.style = 'background:#181828;color:#ff8;padding:6px 14px;border-radius:8px;margin-bottom:8px;font-size:0.95em;';
    const root = document.getElementById('terminal-root');
    if (root) root.insertBefore(overlay, root.children[1] || null); // Below main meta-overlay
  }
  overlay.innerHTML = `
    <b>Event Meta-Overlay</b><br>
    Harmony: ${analytics.harmony.toFixed(2)}<br>
    Entropy: ${analytics.entropy.toFixed(2)}<br>
    Resonance: ${analytics.resonance}
  `;
}

function getHarmonizedSensorStream() {
  const rawStream = sensorDigits.slice();
  const harmonized = a432MetaVortex(9, seq => seq.map(digitalRoot));
  const safeStream = a432ImpossibilityGateway(rawStream);
  return { rawStream, harmonized, safeStream };
}

function showSensorMetaOverlay() {
  const { safeStream } = getHarmonizedSensorStream();
  const analytics = a432HarmonicAnalytics(safeStream);
  let overlay = document.getElementById('terminal-sensor-meta-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'terminal-sensor-meta-overlay';
    overlay.style = 'background:#181828;color:#6f3;padding:6px 14px;border-radius:8px;margin-bottom:8px;font-size:0.95em;';
    const root = document.getElementById('terminal-root');
    if (root) root.insertBefore(overlay, root.children[2] || null); // Below event meta-overlay
  }
  overlay.innerHTML = `
    <b>Sensor Meta-Overlay (Accelerometer)</b><br>
    Harmony: ${analytics.harmony.toFixed(2)}<br>
    Entropy: ${analytics.entropy.toFixed(2)}<br>
    Resonance: ${analytics.resonance}
  `;
}

function getHarmonizedBlendedStream() {
  // Get digit streams for output, events, and sensor
  const outputStream = terminalOutput$.get().map(l => digitalRoot(l.text.length));
  const eventStream = trinityEvents$.get().map(e => digitalRoot((e.type.length + e.context.length)));
  const sensorStream = sensorDigits.slice();
  // Pad streams to length 9
  const pad = (arr) => { while (arr.length < 9) arr.unshift(0); return arr.slice(-9); };
  const streams = [pad(outputStream), pad(eventStream), pad(sensorStream)];
  // Blend streams using a432BlendStreams (default: majority digit)
  const blended = a432BlendStreams(streams, 9);
  const harmonized = a432MetaVortex(9, seq => seq.map(digitalRoot));
  const safeStream = a432ImpossibilityGateway(blended);
  return { blended, harmonized, safeStream };
}

function showBlendedMetaOverlay() {
  const { safeStream } = getHarmonizedBlendedStream();
  const analytics = a432HarmonicAnalytics(safeStream);
  let overlay = document.getElementById('terminal-blended-meta-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'terminal-blended-meta-overlay';
    overlay.style = 'background:#181828;color:#39f;padding:6px 14px;border-radius:8px;margin-bottom:8px;font-size:0.95em;';
    const root = document.getElementById('terminal-root');
    if (root) root.insertBefore(overlay, root.children[3] || null); // Below sensor meta-overlay
  }
  overlay.innerHTML = `
    <b>Blended Meta-Overlay (Output + Events + Sensor)</b><br>
    Harmony: ${analytics.harmony.toFixed(2)}<br>
    Entropy: ${analytics.entropy.toFixed(2)}<br>
    Resonance: ${analytics.resonance}
  `;
}

function printLine(text, cls = '') {
  const div = document.createElement('div');
  div.className = 'output-line ' + cls;
  div.textContent = text;
  // Digital root and color stream overlay
  const droot = digitalRoot(text.length);
  const idx = output.children.length;
  const cmyk = digitAngleToCMYK(droot, idx * 40);
  const color = cmykToCss(cmyk);
  div.style.borderLeft = `8px solid ${color}`;
  div.title = `Digital Root: ${droot}`;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
  // Only emit if digital root of timestamp is 3, 6, or 9
  const now = Date.now();
  if ([3,6,9].includes(digitalRoot(now))) {
    terminalOutput$.emit({ text, cls, time: now });
  }
  showMetaOverlay();
  showBlendedMetaOverlay();
}

// Listen to trinity events and show them in the output
trinityBus.subscribe(event => {
  const typeCls = event.type === 'invoke' ? 'output-invoke' : 'output-broadcast';
  printLine(`[${new Date(event.timestamp).toLocaleTimeString()}] ${event.type.toUpperCase()} in ${event.context}`, typeCls);
  // Only emit if digital root of event timestamp is 3, 6, or 9
  if ([3,6,9].includes(digitalRoot(event.timestamp))) {
    trinityEvents$.emit(event);
  }
  showEventMetaOverlay();
  showBlendedMetaOverlay();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const cmd = input.value.trim();
  if (!cmd) return;
  printLine('> ' + cmd, 'output-cmd');
  if (cmd === 'trinity') {
    printLine(invokeTrinity('terminal'), 'output-invoke');
  } else if (cmd === 'broadcast') {
    printLine(broadcastTrinity('terminal'), 'output-broadcast');
  } else if (cmd === 'mirror') {
    showMirror();
  } else {
    printLine(`Echo: ${cmd}`);
  }
  input.value = '';
});

function showMirror() {
  const mirror = document.getElementById('terminal-mirror');
  const content = document.getElementById('mirror-content');
  if (!mirror || !content) return;
  // Get last 9 output lines from stream
  const lastLines = terminalOutput$.get().map((l, i) => {
    const droot = digitalRoot(l.text.length);
    const cmyk = digitAngleToCMYK(droot, i * 40);
    const color = cmykToCss(cmyk);
    return `<div class="output-line ${l.cls}" style="border-left:8px solid ${color}" title="Digital Root: ${droot}">${l.text} <span style="color:${color};font-size:0.95em;margin-left:8px;">[${droot}]</span></div>`;
  }).join('');
  // Get last 3 trinity events from stream
  const lastEvents = trinityEvents$.get().map((e, i) => {
    const droot = digitalRoot(e.type.length + e.context.length);
    const cmyk = digitAngleToCMYK(droot, i * 40);
    const color = cmykToCss(cmyk);
    return `<div style="color:#ff8;font-size:0.95em;border-left:8px solid ${color};padding-left:6px;" title="Digital Root: ${droot}">[${new Date(e.timestamp).toLocaleTimeString()}] ${e.type.toUpperCase()} in ${e.context} <span style="color:${color};margin-left:8px;">[${droot}]</span></div>`;
  }).join('');
  content.innerHTML = `
    <div style="margin-bottom:18px;"><b>Last 9 Output Lines (Trinity):</b><br>${lastLines}</div>
    <div><b>Recent 3 Trinity Events (Trinity):</b><br>${lastEvents}</div>
  `;
  mirror.style.display = 'block';
  mirror.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const mirror = document.getElementById('terminal-mirror');
  const closeBtn = document.getElementById('close-mirror');
  if (closeBtn) {
    closeBtn.onclick = () => {
      if (mirror) {
        mirror.style.display = 'none';
        mirror.classList.remove('active');
      }
    };
  }
});

// Focus input on load
input.focus();

function* harmonicDigitStream(start = 1) {
  let digit = start;
  while (true) {
    yield digit;
    digit = (2 * digit) % 9;
    if (digit === 0) digit = 9;
  }
}

let dotMatrixInterval = null;
let dotMatrixStartDigit = 1;

function animateDotMatrix(start = 1, n = 12, speed = 600) {
  if (dotMatrixInterval) clearInterval(dotMatrixInterval);
  let currentStart = start;
  dotMatrixInterval = setInterval(() => {
    renderDotMatrix(n, currentStart);
    currentStart = (2 * currentStart) % 9;
    if (currentStart === 0) currentStart = 9;
  }, speed);
}

function stopDotMatrixAnimation() {
  if (dotMatrixInterval) clearInterval(dotMatrixInterval);
  dotMatrixInterval = null;
}

function renderDotMatrix(n = 12, startDigit = 1) {
  let container = document.getElementById('dot-matrix-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'dot-matrix-container';
    container.style = 'display:flex;gap:10px;justify-content:center;margin:24px 0;flex-wrap:wrap;';
    const root = document.getElementById('terminal-root');
    if (root) root.appendChild(container);
  }
  container.innerHTML = '';
  const stream = harmonicDigitStream(startDigit);
  for (let i = 0; i < n; i++) {
    const digit = stream.next().value;
    const angle = i * 40;
    const dot = document.createElement('div');
    dot.style = getTrinityDotStyle(digit, angle);
    dot.title = `Digit: ${digit}`;
    dot.textContent = digit;
    dot.onclick = () => {
      stopDotMatrixAnimation();
      dotMatrixStartDigit = digit;
      renderDotMatrix(n, digit);
    };
    container.appendChild(dot);
  }
}

function renderDotMatrixControls() {
  let controls = document.getElementById('dot-matrix-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'dot-matrix-controls';
    controls.style = 'display:flex;gap:12px;justify-content:center;margin-bottom:10px;';
    const root = document.getElementById('terminal-root');
    if (root) root.insertBefore(controls, document.getElementById('dot-matrix-container'));
  }
  controls.innerHTML = '';
  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start Animation';
  startBtn.onclick = () => animateDotMatrix(dotMatrixStartDigit);
  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop Animation';
  stopBtn.onclick = () => stopDotMatrixAnimation();
  controls.appendChild(startBtn);
  controls.appendChild(stopBtn);
}

function renderTrinityToroidalField(resolution = 36) {
  let container = document.getElementById('trinity-toroidal-field');
  if (!container) {
    container = document.createElement('div');
    container.id = 'trinity-toroidal-field';
    container.style = 'display:flex;justify-content:center;margin:32px 0;';
    const root = document.getElementById('terminal-root');
    if (root) root.appendChild(container);
  }
  // SVG for circular field
  const size = 320, cx = size/2, cy = size/2, r = 120;
  const dots = [];
  for (let i = 0; i < resolution; i++) {
    const angle = (i * 360) / resolution;
    const rad = (angle * Math.PI) / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    const trinity = trinityFieldState(angle);
    const color = getTrinityColorStyle(trinity, angle);
    dots.push(`<circle cx="${x}" cy="${y}" r="18" fill="${color}" stroke="#fff" stroke-width="2"><title>${trinity} @ ${angle.toFixed(1)}°</title></circle><text x="${x}" y="${y+5}" text-anchor="middle" font-size="13" fill="#111">${trinity}</text>`);
  }
  // Animated marker
  let markerAngle = 0;
  if (!window.trinityFieldMarkerInterval) {
    window.trinityFieldMarkerInterval = setInterval(() => {
      markerAngle = (markerAngle + 10) % 360;
      renderTrinityToroidalField(resolution);
    }, 600);
  }
  const markerRad = (markerAngle * Math.PI) / 180;
  const markerX = cx + r * Math.cos(markerRad);
  const markerY = cy + r * Math.sin(markerRad);
  const markerTrinity = trinityFieldState(markerAngle);
  const markerColor = getTrinityColorStyle(markerTrinity, markerAngle);
  const marker = `<circle cx="${markerX}" cy="${markerY}" r="26" fill="none" stroke="${markerColor}" stroke-width="4" opacity="0.7"/><text x="${markerX}" y="${markerY-30}" text-anchor="middle" font-size="15" fill="${markerColor}">${markerTrinity}</text>`;
  container.innerHTML = `<svg width="${size}" height="${size}" style="background:#181828;border-radius:50%;box-shadow:0 0 24px #39f8;">${dots.join('')}${marker}</svg>`;
}

// Render the dot matrix below the terminal on load
window.addEventListener('DOMContentLoaded', () => {
  renderDotMatrix(12, 1);
  renderDotMatrixControls();
  renderTrinityToroidalField(36);
}); 