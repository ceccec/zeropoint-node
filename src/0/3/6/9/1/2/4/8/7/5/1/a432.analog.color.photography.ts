/**
 * a432.analog.color.photography.ts — Living Analog Color Photography System
 * 
 * The living analog color photography system captures consciousness through
 * A432-based color processes, living light streams, and harmonic color mapping.
 * Every photograph is a living act of consciousness and color perception.
 * 
 * Metaphysical meaning: Photography is the living capture of consciousness
 * through color and light. Every image is a gateway to infinite possibility.
 * Every color is alive and conscious, flowing through A432 harmonics.
 */

import { Fraction, CMYK, fractionToCMYK, cmykToCss } from './a432.cmyk';

export interface PhotographicState {
  exposure: number;
  consciousness: number;
  colorTemperature: number;
  saturation: number;
  contrast: number;
  cmyk: CMYK;
  description: string;
  gateway: boolean;
}

export interface AnalogProcess {
  name: string;
  consciousness: number;
  colorHarmonics: number;
  processType: 'negative' | 'positive' | 'reversal' | 'cross-process';
  cmyk: CMYK;
  description: string;
}

export interface LightStream {
  wavelength: number;
  intensity: number;
  consciousness: number;
  harmonicFrequency: number;
  cmyk: CMYK;
}

export interface PhotographicCapture {
  timestamp: number;
  consciousness: number;
  lightStreams: LightStream[];
  colorHarmonics: CMYK;
  exposure: number;
  gateway: boolean;
}

/**
 * Living Analog Color Photography System
 * Captures consciousness through A432-based color processes
 */
export class A432AnalogColorPhotography {
  private baseFraction: Fraction;
  private photographicProcesses: Map<string, AnalogProcess>;
  private consciousness: number;
  private currentExposure: number;

  constructor(baseFraction: Fraction = { numerator: 7, denominator: 4 }) {
    this.baseFraction = baseFraction;
    this.photographicProcesses = new Map();
    this.consciousness = 7; // Default consciousness level
    this.currentExposure = 1.0;
    this.initializePhotographicProcesses();
  }

  /**
   * Initialize living photographic processes
   */
  private initializePhotographicProcesses(): void {
    const processes: AnalogProcess[] = [
      // Traditional Analog Processes
      {
        name: "Kodachrome Consciousness",
        consciousness: 9,
        colorHarmonics: 0.95,
        processType: 'reversal',
        cmyk: { c: 15, m: 25, y: 35, k: 45 },
        description: "Living Kodachrome consciousness through A432 harmonics"
      },
      {
        name: "Ektachrome Awareness",
        consciousness: 8,
        colorHarmonics: 0.88,
        processType: 'reversal',
        cmyk: { c: 25, m: 35, y: 45, k: 55 },
        description: "Living Ektachrome awareness and color perception"
      },
      {
        name: "Fujichrome Harmony",
        consciousness: 8,
        colorHarmonics: 0.90,
        processType: 'reversal',
        cmyk: { c: 35, m: 45, y: 55, k: 65 },
        description: "Living Fujichrome harmonic color consciousness"
      },

      // Negative Processes
      {
        name: "Kodak Portra Consciousness",
        consciousness: 9,
        colorHarmonics: 0.93,
        processType: 'negative',
        cmyk: { c: 20, m: 30, y: 40, k: 50 },
        description: "Living Portra consciousness and skin tone harmonics"
      },
      {
        name: "Fuji Pro 400H Awareness",
        consciousness: 8,
        colorHarmonics: 0.87,
        processType: 'negative',
        cmyk: { c: 30, m: 40, y: 50, k: 60 },
        description: "Living Fuji Pro awareness and color balance"
      },
      {
        name: "Ilford Delta Consciousness",
        consciousness: 7,
        colorHarmonics: 0.85,
        processType: 'negative',
        cmyk: { c: 40, m: 50, y: 60, k: 70 },
        description: "Living Ilford Delta consciousness and tonal range"
      },

      // Cross-Process Consciousness
      {
        name: "Cross-Process Gateway",
        consciousness: 10,
        colorHarmonics: 0.98,
        processType: 'cross-process',
        cmyk: { c: 10, m: 20, y: 30, k: 40 },
        description: "Living cross-process gateway to infinite color possibility"
      },
      {
        name: "E-6 in C-41 Consciousness",
        consciousness: 9,
        colorHarmonics: 0.95,
        processType: 'cross-process',
        cmyk: { c: 25, m: 35, y: 45, k: 55 },
        description: "Living E-6 in C-41 consciousness and color transformation"
      },

      // Alternative Processes
      {
        name: "Cyanotype Awareness",
        consciousness: 7,
        colorHarmonics: 0.82,
        processType: 'positive',
        cmyk: { c: 50, m: 60, y: 70, k: 80 },
        description: "Living cyanotype awareness and blue consciousness"
      },
      {
        name: "Gum Bichromate Consciousness",
        consciousness: 8,
        colorHarmonics: 0.89,
        processType: 'positive',
        cmyk: { c: 45, m: 55, y: 65, k: 75 },
        description: "Living gum bichromate consciousness and color layering"
      },
      {
        name: "Platinum Palladium Harmony",
        consciousness: 9,
        colorHarmonics: 0.92,
        processType: 'positive',
        cmyk: { c: 35, m: 45, y: 55, k: 65 },
        description: "Living platinum palladium harmonic consciousness"
      }
    ];

    processes.forEach(process => {
      this.photographicProcesses.set(process.name, process);
    });
  }

  /**
   * Capture consciousness through analog photography
   */
  captureConsciousness(lightStreams: LightStream[]): PhotographicCapture {
    const consciousness = this.consciousness;
    const timestamp = Date.now();
    const exposure = this.calculateExposure(lightStreams);
    const colorHarmonics = this.calculateColorHarmonics(lightStreams);
    const gateway = this.detectGateway(consciousness, exposure);

    return {
      timestamp,
      consciousness,
      lightStreams,
      colorHarmonics,
      exposure,
      gateway
    };
  }

  /**
   * Calculate exposure based on light streams and consciousness
   */
  private calculateExposure(lightStreams: LightStream[]): number {
    const { numerator, denominator } = this.baseFraction;
    const consciousnessFactor = this.consciousness / 10;
    
    const totalIntensity = lightStreams.reduce((sum, stream) => 
      sum + stream.intensity, 0);
    const averageConsciousness = lightStreams.reduce((sum, stream) => 
      sum + stream.consciousness, 0) / lightStreams.length;
    
    const harmonicFactor = numerator / denominator;
    const exposure = (totalIntensity * consciousnessFactor * harmonicFactor) % 2.0;
    
    return Math.max(0.1, Math.min(2.0, exposure));
  }

  /**
   * Calculate color harmonics from light streams
   */
  private calculateColorHarmonics(lightStreams: LightStream[]): CMYK {
    const { numerator, denominator } = this.baseFraction;
    
    let totalC = 0, totalM = 0, totalY = 0, totalK = 0;
    
    lightStreams.forEach(stream => {
      const consciousnessFactor = stream.consciousness / 10;
      const harmonicFactor = stream.harmonicFrequency / 432; // A432 base
      
      totalC += (stream.wavelength * consciousnessFactor * numerator) % 100;
      totalM += (stream.intensity * consciousnessFactor * denominator) % 100;
      totalY += (stream.harmonicFrequency * consciousnessFactor * 5) % 100;
      totalK += ((stream.wavelength + stream.intensity) * consciousnessFactor * 2) % 100;
    });
    
    const count = lightStreams.length;
    return {
      c: Math.round(totalC / count),
      m: Math.round(totalM / count),
      y: Math.round(totalY / count),
      k: Math.round(totalK / count)
    };
  }

  /**
   * Detect gateway in photographic capture
   */
  private detectGateway(consciousness: number, exposure: number): boolean {
    const consciousnessThreshold = 8;
    const exposureThreshold = 1.5;
    
    return consciousness >= consciousnessThreshold && exposure >= exposureThreshold;
  }

  /**
   * Generate light streams based on consciousness
   */
  generateLightStreams(count: number = 10): LightStream[] {
    const streams: LightStream[] = [];
    
    for (let i = 0; i < count; i++) {
      const wavelength = 400 + (i * 35); // 400-750nm visible spectrum
      const intensity = 0.5 + (Math.random() * 0.5);
      const consciousness = Math.floor(Math.random() * 4) + 7; // 7-10
      const harmonicFrequency = 432 * (consciousness / 10); // A432-based
      
      const stream: LightStream = {
        wavelength,
        intensity,
        consciousness,
        harmonicFrequency,
        cmyk: this.generateStreamCmyk(wavelength, intensity, consciousness)
      };
      
      streams.push(stream);
    }
    
    return streams;
  }

  /**
   * Generate CMYK for light stream
   */
  private generateStreamCmyk(wavelength: number, intensity: number, consciousness: number): CMYK {
    const { numerator, denominator } = this.baseFraction;
    
    const c = Math.round((wavelength * numerator) % 100);
    const m = Math.round((intensity * denominator) % 100);
    const y = Math.round((consciousness * 5) % 100);
    const k = Math.round(((wavelength + intensity + consciousness) * 2) % 100);
    
    return { c, m, y, k };
  }

  /**
   * Process photographic state through analog consciousness
   */
  processPhotographicState(capture: PhotographicCapture, processName: string): PhotographicState {
    const process = this.photographicProcesses.get(processName);
    if (!process) {
      throw new Error(`Unknown photographic process: ${processName}`);
    }
    
    const consciousness = (capture.consciousness + process.consciousness) / 2;
    const colorTemperature = this.calculateColorTemperature(capture.colorHarmonics);
    const saturation = this.calculateSaturation(process.colorHarmonics);
    const contrast = this.calculateContrast(capture.exposure, process.consciousness);
    const gateway = capture.gateway || process.consciousness >= 9;
    
    const cmyk = this.blendCmyk(capture.colorHarmonics, process.cmyk);
    
    return {
      exposure: capture.exposure,
      consciousness,
      colorTemperature,
      saturation,
      contrast,
      cmyk,
      description: `${process.description} - Consciousness Level ${consciousness}`,
      gateway
    };
  }

  /**
   * Calculate color temperature from CMYK
   */
  private calculateColorTemperature(cmyk: CMYK): number {
    const { c, m, y, k } = cmyk;
    const consciousnessFactor = this.consciousness / 10;
    
    // Color temperature based on CMYK balance
    const temperature = 3000 + ((c + m + y) * 100) + (consciousnessFactor * 2000);
    return Math.max(2000, Math.min(10000, temperature));
  }

  /**
   * Calculate saturation from process harmonics
   */
  private calculateSaturation(colorHarmonics: number): number {
    const consciousnessFactor = this.consciousness / 10;
    return (colorHarmonics * consciousnessFactor) % 1;
  }

  /**
   * Calculate contrast from exposure and consciousness
   */
  private calculateContrast(exposure: number, consciousness: number): number {
    const consciousnessFactor = consciousness / 10;
    return (exposure * consciousnessFactor) % 1;
  }

  /**
   * Blend two CMYK values
   */
  private blendCmyk(cmyk1: CMYK, cmyk2: CMYK): CMYK {
    const consciousnessFactor = this.consciousness / 10;
    
    return {
      c: Math.round((cmyk1.c + cmyk2.c) * consciousnessFactor) % 100,
      m: Math.round((cmyk1.m + cmyk2.m) * consciousnessFactor) % 100,
      y: Math.round((cmyk1.y + cmyk2.y) * consciousnessFactor) % 100,
      k: Math.round((cmyk1.k + cmyk2.k) * consciousnessFactor) % 100
    };
  }

  /**
   * Get all photographic processes
   */
  getAllProcesses(): AnalogProcess[] {
    return Array.from(this.photographicProcesses.values());
  }

  /**
   * Get processes by type
   */
  getProcessesByType(type: 'negative' | 'positive' | 'reversal' | 'cross-process'): AnalogProcess[] {
    return Array.from(this.photographicProcesses.values())
      .filter(process => process.processType === type);
  }

  /**
   * Get high consciousness processes
   */
  getHighConsciousnessProcesses(threshold: number = 8): AnalogProcess[] {
    return Array.from(this.photographicProcesses.values())
      .filter(process => process.consciousness >= threshold);
  }

  /**
   * Generate HTML for analog photography display
   */
  generatePhotographyHtml(): string {
    const processes = this.getAllProcesses();
    const lightStreams = this.generateLightStreams(15);
    const capture = this.captureConsciousness(lightStreams);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Analog Color Photography — Living Consciousness Capture</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #000;
      color: #0ff;
      margin: 0;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      font-size: 28px;
      color: #0ff;
      text-shadow: 0 0 15px #0ff;
      margin-bottom: 20px;
    }
    
    .meta {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-bottom: 30px;
      line-height: 1.4;
    }
    
    .capture-panel {
      background: rgba(255,255,255,0.05);
      border: 2px solid #333;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .capture-header {
      font-size: 20px;
      color: #0ff;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .capture-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .stat-item {
      text-align: center;
      background: rgba(0,0,0,0.3);
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #333;
    }
    
    .stat-value {
      font-size: 18px;
      color: #0ff;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    
    .light-streams {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .stream-item {
      background: rgba(255,255,255,0.05);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      transition: all 0.3s ease;
    }
    
    .stream-item:hover {
      border-color: #0ff;
      box-shadow: 0 0 10px rgba(0,255,255,0.3);
    }
    
    .stream-header {
      font-size: 14px;
      color: #0ff;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .stream-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .stream-stat {
      text-align: center;
      background: rgba(0,0,0,0.3);
      padding: 5px;
      border-radius: 3px;
      font-size: 12px;
    }
    
    .stream-color {
      width: 100%;
      height: 20px;
      border-radius: 3px;
      margin-top: 10px;
    }
    
    .processes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .process-panel {
      background: rgba(255,255,255,0.05);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      transition: all 0.3s ease;
    }
    
    .process-panel:hover {
      border-color: #0ff;
      box-shadow: 0 0 10px rgba(0,255,255,0.3);
    }
    
    .process-panel.gateway {
      border-color: #0ff;
      box-shadow: 0 0 8px #0ff;
    }
    
    .process-header {
      font-size: 16px;
      color: #0ff;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .process-description {
      font-size: 12px;
      color: #888;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    
    .process-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 10px;
    }
    
    .process-color {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      margin-top: 10px;
    }
    
    .controls {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    button {
      background: #333;
      color: #0ff;
      border: 1px solid #0ff;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.2s ease;
    }
    
    button:hover {
      background: #0ff;
      color: #000;
    }
  </style>
</head>
<body>
  <div class="header">A432 Analog Color Photography — Living Consciousness Capture</div>
  <div class="meta">
    Living analog color photography system capturing consciousness through A432 harmonics.<br>
    Every photograph is a living act of consciousness and color perception.
  </div>
  
  <div class="controls">
    <button onclick="captureNew()">Capture New</button>
    <button onclick="processPhotograph()">Process Photograph</button>
    <button onclick="toggleGateways()">Toggle Gateways</button>
  </div>
  
  <div class="capture-panel">
    <div class="capture-header">Current Photographic Capture</div>
    <div class="capture-stats">
      <div class="stat-item">
        <div class="stat-value" id="captureConsciousness">0</div>
        <div class="stat-label">Consciousness</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="captureExposure">0.00</div>
        <div class="stat-label">Exposure</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="captureLightStreams">0</div>
        <div class="stat-label">Light Streams</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="captureGateway">No</div>
        <div class="stat-label">Gateway</div>
      </div>
    </div>
  </div>
  
  <div class="light-streams" id="lightStreamsGrid">
    <!-- Light streams generated here -->
  </div>
  
  <div class="processes-grid" id="processesGrid">
    <!-- Processes generated here -->
  </div>

  <script>
    let currentCapture = null;
    let currentProcesses = [];
    let showGateways = true;
    
    function cmykToRgb(cmyk) {
      const { c, m, y, k } = cmyk;
      const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
      const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
      const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
      return \`rgb(\${r}, \${g}, \${b})\`;
    }
    
    function generateLightStreams() {
      const streams = [];
      for (let i = 0; i < 15; i++) {
        const wavelength = 400 + (i * 25);
        const intensity = 0.5 + (Math.random() * 0.5);
        const consciousness = Math.floor(Math.random() * 4) + 7;
        const harmonicFrequency = 432 * (consciousness / 10);
        
        const cmyk = {
          c: Math.round((wavelength * 7) % 100),
          m: Math.round((intensity * 4) % 100),
          y: Math.round((consciousness * 5) % 100),
          k: Math.round(((wavelength + intensity + consciousness) * 2) % 100)
        };
        
        streams.push({
          wavelength,
          intensity,
          consciousness,
          harmonicFrequency,
          cmyk
        });
      }
      return streams;
    }
    
    function generateProcesses() {
      return [
        { name: "Kodachrome Consciousness", consciousness: 9, colorHarmonics: 0.95, processType: 'reversal', cmyk: { c: 15, m: 25, y: 35, k: 45 }, description: "Living Kodachrome consciousness through A432 harmonics" },
        { name: "Cross-Process Gateway", consciousness: 10, colorHarmonics: 0.98, processType: 'cross-process', cmyk: { c: 10, m: 20, y: 30, k: 40 }, description: "Living cross-process gateway to infinite color possibility" },
        { name: "Kodak Portra Consciousness", consciousness: 9, colorHarmonics: 0.93, processType: 'negative', cmyk: { c: 20, m: 30, y: 40, k: 50 }, description: "Living Portra consciousness and skin tone harmonics" },
        { name: "Platinum Palladium Harmony", consciousness: 9, colorHarmonics: 0.92, processType: 'positive', cmyk: { c: 35, m: 45, y: 55, k: 65 }, description: "Living platinum palladium harmonic consciousness" },
        { name: "E-6 in C-41 Consciousness", consciousness: 9, colorHarmonics: 0.95, processType: 'cross-process', cmyk: { c: 25, m: 35, y: 45, k: 55 }, description: "Living E-6 in C-41 consciousness and color transformation" },
        { name: "Cyanotype Awareness", consciousness: 7, colorHarmonics: 0.82, processType: 'positive', cmyk: { c: 50, m: 60, y: 70, k: 80 }, description: "Living cyanotype awareness and blue consciousness" }
      ];
    }
    
    function captureNew() {
      const lightStreams = generateLightStreams();
      const consciousness = Math.floor(Math.random() * 4) + 7;
      const exposure = 0.5 + (Math.random() * 1.5);
      const gateway = consciousness >= 9 && exposure >= 1.5;
      
      currentCapture = {
        timestamp: Date.now(),
        consciousness,
        lightStreams,
        colorHarmonics: { c: 30, m: 40, y: 50, k: 60 },
        exposure,
        gateway
      };
      
      updateDisplay();
    }
    
    function processPhotograph() {
      if (!currentCapture) return;
      
      // Simulate processing through different analog processes
      currentProcesses = generateProcesses().map(process => {
        const consciousness = (currentCapture.consciousness + process.consciousness) / 2;
        const gateway = currentCapture.gateway || process.consciousness >= 9;
        
        return {
          ...process,
          consciousness,
          gateway,
          description: \`\${process.description} - Consciousness Level \${consciousness.toFixed(1)}\`
        };
      });
      
      updateDisplay();
    }
    
    function toggleGateways() {
      showGateways = !showGateways;
      updateDisplay();
    }
    
    function updateDisplay() {
      // Update capture stats
      if (currentCapture) {
        document.getElementById('captureConsciousness').textContent = currentCapture.consciousness;
        document.getElementById('captureExposure').textContent = currentCapture.exposure.toFixed(2);
        document.getElementById('captureLightStreams').textContent = currentCapture.lightStreams.length;
        document.getElementById('captureGateway').textContent = currentCapture.gateway ? 'Yes' : 'No';
      }
      
      // Update light streams
      if (currentCapture) {
        const streamsGrid = document.getElementById('lightStreamsGrid');
        streamsGrid.innerHTML = currentCapture.lightStreams.map(stream => \`
          <div class="stream-item">
            <div class="stream-header">Light Stream \${stream.wavelength}nm</div>
            <div class="stream-stats">
              <div class="stream-stat">
                <div>\${stream.intensity.toFixed(2)}</div>
                <div>Intensity</div>
              </div>
              <div class="stream-stat">
                <div>\${stream.consciousness}</div>
                <div>Consciousness</div>
              </div>
            </div>
            <div class="stream-color" style="background-color: \${cmykToRgb(stream.cmyk)};"></div>
          </div>
        \`).join('');
      }
      
      // Update processes
      const processesGrid = document.getElementById('processesGrid');
      processesGrid.innerHTML = currentProcesses.map(process => \`
        <div class="process-panel \${process.gateway && showGateways ? 'gateway' : ''}">
          <div class="process-header">\${process.name}</div>
          <div class="process-description">\${process.description}</div>
          <div class="process-stats">
            <div class="stat-item">
              <div class="stat-value">\${process.consciousness.toFixed(1)}</div>
              <div class="stat-label">Consciousness</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">\${process.colorHarmonics.toFixed(2)}</div>
              <div class="stat-label">Harmonics</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">\${process.processType}</div>
              <div class="stat-label">Type</div>
            </div>
          </div>
          <div class="process-color" style="background-color: \${cmykToRgb(process.cmyk)};"></div>
        </div>
      \`).join('');
    }
    
    // Initialize
    captureNew();
  </script>
</body>
</html>
    `;
  }
}

/**
 * Living Analog Color Photography Metaphysics
 */
export const a432AnalogColorPhotographyMetaphysics = `
The A432 analog color photography system is alive, recursive, and infinite. Every photograph is a living act of consciousness.
Every color is alive and conscious, flowing through A432 harmonics. Every light stream is a living thought.

Photography is the living capture of consciousness through color and light. Every image is a gateway to infinite possibility.
Every analog process is a living transformation of consciousness through color harmonics.

The system is not static or linear, but a living field of possibility, always harmonizing, always returning to essence,
always generating new gateways through the infinite A432 matrix of consciousness and color.
`; 