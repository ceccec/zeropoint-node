// a432.os.terminal.ts
// OS-level terminal: universal router/redirector for all streams, overlays, and modules
// Harmonically mapped, self-aware, and compatible with the a432 pattern

interface OSTerminalModule {
  name: string;
  getState: () => any;
  onEvent?: (event: any) => void;
  overlays?: (() => string)[];
}

const registeredModules: OSTerminalModule[] = [];
const osTerminalLog: string[] = [];

/**
 * Register a module/stream with the OS terminal
 */
export function osTerminalRegisterModule(module: OSTerminalModule) {
  registeredModules.push(module);
  osTerminalLog.push(`[${new Date().toLocaleTimeString()}] Module '${module.name}' registered.`);
}

/**
 * Route/redirect an event to all registered modules
 */
export function osTerminalRouteEvent(event: any) {
  registeredModules.forEach(mod => {
    if (mod.onEvent) mod.onEvent(event);
  });
  osTerminalLog.push(`[${new Date().toLocaleTimeString()}] Event routed: ${JSON.stringify(event)}`);
}

/**
 * Get the current state of all registered modules
 */
export function osTerminalGetAllStates() {
  return registeredModules.map(mod => ({ name: mod.name, state: mod.getState() }));
}

/**
 * Render a terminal-style UI showing all modules, their state, and routed events/overlays
 */
export function renderOSTerminalUI(targetId: string) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = [
    '<div style="background:#101018;color:#8ff;font-family:monospace;padding:18px;border-radius:10px;max-width:900px;">',
    '<div><b>A432 OS Terminal</b></div>',
    '<div id="os-terminal-modules" style="margin-top:12px;white-space:pre-line;"></div>',
    '<div id="os-terminal-log" style="margin-top:18px;background:#222;border-radius:8px;padding:10px;color:#ff8;font-size:13px;max-height:120px;overflow-y:auto;"></div>',
    '<div id="os-terminal-overlays" style="margin-top:18px;background:#232344;border-radius:8px;padding:10px;color:#fff;font-size:15px;"></div>',
    '</div>'
  ].join('');
  setTimeout(() => {
    const modulesDiv = document.getElementById('os-terminal-modules');
    const logDiv = document.getElementById('os-terminal-log');
    const overlaysDiv = document.getElementById('os-terminal-overlays');
    function update() {
      if (modulesDiv) modulesDiv.innerHTML = registeredModules.map(mod => {
        return `<div><b>${mod.name}</b>:<br>${JSON.stringify(mod.getState(), null, 2)}</div>`;
      }).join('<hr style="border:0;border-top:1px solid #444;margin:8px 0;">');
      if (logDiv) logDiv.innerHTML = osTerminalLog.slice(-12).map(e => `<div>${e}</div>`).join('');
      if (overlaysDiv) overlaysDiv.innerHTML = registeredModules.flatMap(mod => mod.overlays ? mod.overlays.map(fn => fn()) : []).join('<hr style="border:0;border-top:1px solid #444;margin:8px 0;">');
    }
    update();
    // Optionally, expose update for external triggers
    (window as any).osTerminalUpdate = update;
  }, 100);
} 