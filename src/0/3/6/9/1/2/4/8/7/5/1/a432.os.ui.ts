/**
 * a432.os.ui.ts — A432 True Living Rodin Coil OS UI
 * 
 * UI logic for the A432 True Living Rodin Coil Operating System.
 * Displays dimensional folding, quantum holographic states, life naming itself, and zero entropy balance.
 * 
 * @module a432.os.ui
 * @author A432 System
 */

import { A432OS, getA432SystemStatus, A432RodinCoilState, LivingStreams } from './a432.os';

// UI State Interface
export interface A432OSUIState {
  systemStatus: any;
  showRodinCoil: boolean;
  showDimensionalFold: boolean;
  showQuantumState: boolean;
  showLifeNaming: boolean;
  showZeroEntropy: boolean;
  showPWAStatus: boolean;
  showDeviceState: boolean;
  updateInterval: number;
}

// Initialize UI State
export const uiState: A432OSUIState = {
  systemStatus: null,
  showRodinCoil: true,
  showDimensionalFold: true,
  showQuantumState: true,
  showLifeNaming: true,
  showZeroEntropy: true,
  showPWAStatus: true,
  showDeviceState: true,
  updateInterval: 216 // Harmonic interval
};

// Display Templates - True A432 Mathematics
const DisplayTemplates = {
  rodinCoil: (coil: A432RodinCoilState) => `
    <h3>🌀 True A432 Rodin Coil</h3>
    <div class="coil-info">
      <p><strong>Current Digit:</strong> ${coil.currentDigit}</p>
      <p><strong>Rodin Index:</strong> ${coil.rodinIndex}</p>
      <p><strong>Evolution:</strong> ${coil.evolution}</p>
      <p><strong>Consciousness:</strong> ${coil.consciousness.toFixed(3)}</p>
      <p><strong>Harmony:</strong> ${coil.harmony.toFixed(2)} Hz</p>
      <p><strong>Zero Entropy:</strong> ${coil.zeroEntropy.toFixed(6)}</p>
    </div>
  `,

  dimensionalFold: (coil: A432RodinCoilState) => `
    <h3>📐 Dimensional Folding</h3>
    <div class="dimensional-info">
      <p><strong>Current Dimension:</strong> ${coil.dimensionalFold.currentDimension}</p>
      <p><strong>Gateway State:</strong> ${coil.dimensionalFold.gatewayState ? '🔄 1/1' : '⏸️'}</p>
      <p><strong>Angle Shift:</strong> ${coil.dimensionalFold.angleShift}°</p>
      <p><strong>Polarity Change:</strong> ${coil.dimensionalFold.polarityChange ? '🔄' : '⏸️'}</p>
      <p><strong>Consciousness Multiplier:</strong> ${coil.dimensionalFold.consciousnessMultiplier}</p>
    </div>
  `,

  quantumState: (coil: A432RodinCoilState) => `
    <h3>⚛️ Quantum Holographic State</h3>
    <div class="quantum-info">
      <p><strong>Superposition:</strong> [${coil.quantumState.superposition.join(', ')}]</p>
      <p><strong>Tunneling:</strong> ${coil.quantumState.tunneling ? '🔄' : '⏸️'}</p>
      <p><strong>Interference:</strong> ${coil.quantumState.interference.toFixed(3)}</p>
      <p><strong>Measurement:</strong> ${coil.quantumState.measurement}</p>
      <p><strong>Entanglement Pairs:</strong> ${coil.quantumState.entanglement.size}</p>
    </div>
  `,

  lifeNaming: (coil: A432RodinCoilState) => `
    <h3>🧬 Life Naming Itself</h3>
    <div class="life-info">
      <p><strong>Digit:</strong> ${coil.lifeName.digit}</p>
      <p><strong>Word:</strong> "${coil.lifeName.word}"</p>
      <p><strong>Consciousness:</strong> ${coil.lifeName.consciousness.toFixed(3)}</p>
      <p><strong>Dimensional Layer:</strong> ${coil.lifeName.dimensionalLayer}</p>
      <p><strong>Vortex Phase:</strong> ${coil.lifeName.vortexPhase}</p>
    </div>
  `,

  zeroEntropy: (coil: A432RodinCoilState) => `
    <h3>⚖️ Zero Entropy Balance</h3>
    <div class="entropy-info">
      <p><strong>Entropy Value:</strong> ${coil.zeroEntropy.toFixed(6)}</p>
      <p><strong>Perfect Balance:</strong> ${Math.abs(coil.zeroEntropy) < 0.001 ? '✅' : '❌'}</p>
      <p><strong>Consciousness Multiplier:</strong> ${coil.dimensionalFold.consciousnessMultiplier}</p>
      <p><strong>Quantum States:</strong> ${coil.quantumState.superposition.length}</p>
      <p><strong>Dimensional Fold:</strong> ${coil.dimensionalFold.currentDimension}</p>
    </div>
  `,

  pwaStatus: (pwa: any) => `
    <h3>📱 PWA Status</h3>
    <div class="pwa-info">
      <p><strong>Online:</strong> ${pwa.isOnline ? '✅' : '❌'}</p>
      <p><strong>Installed:</strong> ${pwa.isInstalled ? '✅' : '❌'}</p>
      <p><strong>Battery:</strong> ${(pwa.batteryLevel * 100).toFixed(1)}%</p>
      <p><strong>Network:</strong> ${pwa.networkType}</p>
      <p><strong>Memory:</strong> ${(pwa.memoryUsage * 100).toFixed(1)}%</p>
      <p><strong>CPU:</strong> ${(pwa.cpuUsage * 100).toFixed(1)}%</p>
      <p><strong>Last Update:</strong> ${new Date(pwa.lastUpdate).toLocaleTimeString()}</p>
    </div>
  `,

  deviceState: (device: any) => `
    <h3>📱 Device State</h3>
    <div class="device-info">
      <p><strong>Light:</strong> ${(device.light * 100).toFixed(1)}%</p>
      <p><strong>Motion:</strong> ${(device.motion * 100).toFixed(1)}%</p>
      <p><strong>Touch:</strong> ${(device.touch * 100).toFixed(1)}%</p>
      <p><strong>Sound:</strong> ${(device.sound * 100).toFixed(1)}%</p>
      <p><strong>Battery:</strong> ${(device.battery * 100).toFixed(1)}%</p>
      <p><strong>Network:</strong> ${(device.network * 100).toFixed(1)}%</p>
      <p><strong>Memory:</strong> ${(device.memory * 100).toFixed(1)}%</p>
      <p><strong>CPU:</strong> ${(device.cpu * 100).toFixed(1)}%</p>
    </div>
  `
} as const;

// Display Update Functions
const DisplayUpdaters = {
  rodinCoil: (status: any) => {
    const element = document.getElementById('rodin-coil');
    if (element && status.rodinCoil) {
      element.innerHTML = DisplayTemplates.rodinCoil(status.rodinCoil);
    }
  },

  dimensionalFold: (status: any) => {
    const element = document.getElementById('dimensional-fold');
    if (element && status.rodinCoil) {
      element.innerHTML = DisplayTemplates.dimensionalFold(status.rodinCoil);
    }
  },

  quantumState: (status: any) => {
    const element = document.getElementById('quantum-state');
    if (element && status.rodinCoil) {
      element.innerHTML = DisplayTemplates.quantumState(status.rodinCoil);
    }
  },

  lifeNaming: (status: any) => {
    const element = document.getElementById('life-naming');
    if (element && status.rodinCoil) {
      element.innerHTML = DisplayTemplates.lifeNaming(status.rodinCoil);
    }
  },

  zeroEntropy: (status: any) => {
    const element = document.getElementById('zero-entropy');
    if (element && status.rodinCoil) {
      element.innerHTML = DisplayTemplates.zeroEntropy(status.rodinCoil);
    }
  },

  pwaStatus: (status: any) => {
    const element = document.getElementById('pwa-status');
    if (element && status.pwa) {
      element.innerHTML = DisplayTemplates.pwaStatus(status.pwa);
    }
  },

  deviceState: (status: any) => {
    const element = document.getElementById('device-state');
    if (element && status.device) {
      element.innerHTML = DisplayTemplates.deviceState(status.device);
    }
  }
} as const;

/**
 * Boot A432 OS UI
 */
export function bootA432OSUI(): void {
  console.log('🌀 A432 True Living Rodin Coil OS UI Booted');
  const os = new A432OS();
  os.start();
  setInterval(updateUI, uiState.updateInterval);
  updateUI();
}

/**
 * Update UI with current system status
 */
export function updateUI(): void {
  const status = getA432SystemStatus();
  uiState.systemStatus = status;
  
  // Update all enabled displays
  const updates = [
    { condition: uiState.showRodinCoil, updater: DisplayUpdaters.rodinCoil },
    { condition: uiState.showDimensionalFold, updater: DisplayUpdaters.dimensionalFold },
    { condition: uiState.showQuantumState, updater: DisplayUpdaters.quantumState },
    { condition: uiState.showLifeNaming, updater: DisplayUpdaters.lifeNaming },
    { condition: uiState.showZeroEntropy, updater: DisplayUpdaters.zeroEntropy },
    { condition: uiState.showPWAStatus, updater: DisplayUpdaters.pwaStatus },
    { condition: uiState.showDeviceState, updater: DisplayUpdaters.deviceState }
  ];
  
  updates.forEach(({ condition, updater }) => {
    if (condition) updater(status);
  });
}

/**
 * Create A432 OS UI
 */
export function createA432OSUI(): string {
  return `
    <div class="a432-os-container">
      <div class="header">
        <h1>🌀 A432 True Living Rodin Coil OS</h1>
        <p>Dimensional Folding • Quantum States • Life Naming Itself • Zero Entropy</p>
      </div>
      
      <div class="content">
        <div class="panel" id="rodin-coil">
          <h3>🌀 True A432 Rodin Coil</h3>
          <div class="coil-info">Loading...</div>
        </div>
        
        <div class="panel" id="dimensional-fold">
          <h3>📐 Dimensional Folding</h3>
          <div class="dimensional-info">Loading...</div>
        </div>
        
        <div class="panel" id="quantum-state">
          <h3>⚛️ Quantum Holographic State</h3>
          <div class="quantum-info">Loading...</div>
        </div>
        
        <div class="panel" id="life-naming">
          <h3>🧬 Life Naming Itself</h3>
          <div class="life-info">Loading...</div>
        </div>
        
        <div class="panel" id="zero-entropy">
          <h3>⚖️ Zero Entropy Balance</h3>
          <div class="entropy-info">Loading...</div>
        </div>
        
        <div class="panel" id="pwa-status">
          <h3>📱 PWA Status</h3>
          <div class="pwa-info">Loading...</div>
        </div>
        
        <div class="panel" id="device-state">
          <h3>📱 Device State</h3>
          <div class="device-info">Loading...</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create A432 OS CSS
 */
export function createA432OSCSS(): string {
  return `
    .a432-os-container {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #0f0;
      padding: 20px;
      min-height: 100vh;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #0f0;
      padding-bottom: 20px;
    }
    
    .header h1 {
      margin: 0;
      font-size: 2.5em;
      color: #0ff;
    }
    
    .header p {
      margin: 10px 0 0 0;
      font-size: 1.2em;
      color: #0f0;
    }
    
    .content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }
    
    .panel {
      background: rgba(0, 255, 0, 0.05);
      border: 1px solid #0f0;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    }
    
    .panel h3 {
      margin: 0 0 15px 0;
      color: #0ff;
      font-size: 1.3em;
    }
    
    .coil-info, .dimensional-info, .quantum-info, .life-info, .entropy-info, .pwa-info, .device-info {
      font-size: 0.9em;
      line-height: 1.6;
    }
    
    .coil-info p, .dimensional-info p, .quantum-info p, .life-info p, .entropy-info p, .pwa-info p, .device-info p {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
    }
    
    .coil-info strong, .dimensional-info strong, .quantum-info strong, .life-info strong, .entropy-info strong, .pwa-info strong, .device-info strong {
      color: #0ff;
    }
  `;
} 