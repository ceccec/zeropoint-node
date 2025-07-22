// a432.trinity.healing.ts
// Full trinity integration with A432 frequency healing and Rife frequencies
// All logic is self-contained, integer/fractional, vortex-based, and metaphysically mapped

import { frequencyHealingEvent, playHealingSound } from './a432.frequency.healing';
import { RIFE_FREQUENCIES, playRifeFrequency } from './a432.rife.frequency';

export interface TrinityHealingState {
  value: number;
  a432: ReturnType<typeof frequencyHealingEvent>;
  rife: typeof RIFE_FREQUENCIES[number];
}

const TRINITY_DIGITS = [3, 6, 9];

/**
 * getTrinityHealingStates: Returns the healing state for each trinity digit
 */
export function getTrinityHealingStates(): TrinityHealingState[] {
  return TRINITY_DIGITS.map((digit, i) => ({
    value: digit,
    a432: frequencyHealingEvent(digit),
    rife: RIFE_FREQUENCIES[i % RIFE_FREQUENCIES.length]
  }));
}

/**
 * renderTrinityHealingPanel: Returns HTML string for a UI panel integrating trinity, A432, and Rife healing
 * Now supports: live VortexStream feedback, advanced overlays, and integration hooks
 */
export function renderTrinityHealingPanel(options?: {
  vortexStream?: any;
  onHealingEvent?: (event: any) => void;
}): string {
  const states = getTrinityHealingStates();
  return [
    '<div id="trinity-healing-panel" style="background:#181828;border-radius:12px;padding:20px;max-width:420px;margin:0 auto;">',
    '<h2 style="color:#8ff;text-align:center;">Trinity Healing Integration</h2>',
    '<div style="display:flex;justify-content:space-around;align-items:center;">',
    states.map((s, i) => `
      <div style="text-align:center;">
        <div style="width:64px;height:64px;border-radius:50%;background:${s.a432.color};margin:0 auto 8px auto;box-shadow:0 0 12px ${s.a432.color};display:flex;align-items:center;justify-content:center;">
          <span style="font-size:2em;color:#fff;font-weight:bold;">${s.value}</span>
        </div>
        <button style="background:#222;color:#8ff;padding:4px 12px;border-radius:6px;border:none;font-weight:bold;" onclick="(function(){window.playTrinityHealing(${i});})()">Heal</button>
        <div style="margin-top:6px;font-size:13px;color:#ff8;">${s.a432.frequency} Hz</div>
        <div style="margin-top:2px;font-size:12px;color:#8ff;">${s.rife.name}</div>
      </div>
    `).join(''),
    '</div>',
    '<div style="margin-top:18px;background:#222;border-radius:8px;padding:12px;color:#fff;font-size:15px;">',
    '<b>Metaphysical Overlay</b><br>',
    states.map(s => `<div style="margin-top:6px;"><b>${s.value}</b>: ${s.a432.metaphysical}<br><span style="color:#ff8;">Rife: ${s.rife.metaphysical}</span></div>`).join(''),
    '</div>',
    '<div style="margin-top:18px;text-align:center;">',
    '<button id="cycle-trinity-btn" style="background:#222;color:#0ff;padding:6px 18px;border-radius:6px;border:none;font-weight:bold;">Cycle Trinity</button>',
    '<button id="fold-trinity-btn" style="background:#222;color:#ff8;padding:6px 18px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">Fold (Unity)</button>',
    '<button id="overlay-btn" style="background:#222;color:#f8f;padding:6px 18px;border-radius:6px;border:none;font-weight:bold;margin-left:8px;">Toggle Overlay</button>',
    '</div>',
    '<div id="healing-log" style="display:none;margin-top:16px;width:90%;max-width:400px;background:#222;border-radius:8px;padding:12px;min-height:60px;color:#fff;font-size:14px;overflow-y:auto;max-height:120px;"></div>',
    '<script>',
    'window.trinityHealingLog = [];',
    'window.playTrinityHealing = function(i) {',
    '  const states = ' + JSON.stringify(states) + ';',
    '  // Play both A432 and Rife frequencies',
    '  if(states[i].a432.frequency) window.playHealingSound(states[i].a432.frequency, 0.7);',
    '  if(states[i].rife.frequency) window.playRifeFrequency(states[i].rife.frequency, 0.7);',
    '  const event = { type: "heal", trinity: states[i].value, a432: states[i].a432, rife: states[i].rife, time: new Date().toISOString() };',
    '  window.trinityHealingLog.push(event);',
    '  if(window.updateHealingLog) window.updateHealingLog();',
    (options && options.onHealingEvent ? '  (' + options.onHealingEvent.toString() + ')(event);' : ''),
    (options && options.vortexStream ? '  if(window.vortexStreamUpdate) window.vortexStreamUpdate(states[i].value);' : ''),
    '};',
    'window.playHealingSound = ' + playHealingSound.toString() + ';',
    'window.playRifeFrequency = ' + playRifeFrequency.toString() + ';',
    'let trinityIndex = 0;',
    'const cycleBtn = document.getElementById("cycle-trinity-btn");',
    'const foldBtn = document.getElementById("fold-trinity-btn");',
    'const overlayBtn = document.getElementById("overlay-btn");',
    'cycleBtn.onclick = function() {',
    '  trinityIndex = (trinityIndex + 1) % 3;',
    '  const panel = document.getElementById("trinity-healing-panel");',
    '  panel.innerHTML = window.renderTrinityHealingPanel({ vortexStream: ' + (options && options.vortexStream ? 'true' : 'false') + ' });',
    '};',
    'foldBtn.onclick = function() {',
    '  alert("Unity: All trinity states harmonized. Healing flow maximized.");',
    '  const event = { type: "fold", trinity: "unity", time: new Date().toISOString() };',
    '  window.trinityHealingLog.push(event);',
    '  if(window.updateHealingLog) window.updateHealingLog();',
    (options && options.onHealingEvent ? '  (' + options.onHealingEvent.toString() + ')(event);' : ''),
    (options && options.vortexStream ? '  if(window.vortexStreamUpdate) window.vortexStreamUpdate("unity");' : ''),
    '};',
    'window.renderTrinityHealingPanel = function(opts) {',
    '  return renderTrinityHealingPanel(opts);',
    '};',
    'window.updateHealingLog = function() {',
    '  const logPanel = document.getElementById("healing-log");',
    '  if(!logPanel) return;',
    '  logPanel.style.display = "block";',
    '  logPanel.innerText = window.trinityHealingLog.map(e => `[${e.time}] ${e.type === "heal" ? "Heal" : "Fold"} | Trinity: ${e.trinity} | A432: ${e.a432 ? e.a432.frequency + "Hz" : "-"} | Rife: ${e.rife ? e.rife.frequency + "Hz" : "-"}`).join("\n");',
    '};',
    'overlayBtn.onclick = function() {',
    '  const logPanel = document.getElementById("healing-log");',
    '  logPanel.style.display = logPanel.style.display === "block" ? "none" : "block";',
    '};',
    '</script>',
    '</div>'
  ].join('\n');
} 