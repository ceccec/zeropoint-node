/**
 * Mobile PWA Optimization System
 * 
 * Provides comprehensive mobile optimization for the consciousness network,
 * including responsive design, touch controls, offline support, and mobile-specific features.
 * 
 * Features:
 * - Mobile-responsive design for all PWAs
 * - Touch-friendly meditation controls
 * - Progressive Web App features
 * - Mobile-optimized audio and visualization
 * - Gesture controls for consciousness exploration
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../2/math';


export interface MobileConfig {
  enableTouchControls: boolean;
  enableGestures: boolean;
  enableOfflineSupport: boolean;
  enableMobileAudio: boolean;
  enableMobileVisualization: boolean;
  enableHapticFeedback: boolean;
}

export interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch';
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
  scale?: number;
}

export interface MobileAudioConfig {
  sampleRate: number;
  bufferSize: number;
  enableLowLatency: boolean;
  enableCompression: boolean;
}

export interface MobileVisualizationConfig {
  enableWebGL: boolean;
  enableHardwareAcceleration: boolean;
  maxParticles: number;
  enableLOD: boolean;
}

export class MobilePWAOptimizer {
  private config: MobileConfig;
  private audioConfig: MobileAudioConfig;
  private visConfig: MobileVisualizationConfig;
  private gestureCallbacks: Map<string, (gesture: TouchGesture) => void> = new Map();

  constructor(config?: Partial<MobileConfig>) {
    this.config = {
      enableTouchControls: true,
      enableGestures: true,
      enableOfflineSupport: true,
      enableMobileAudio: true,
      enableMobileVisualization: true,
      enableHapticFeedback: true,
      ...config
    };

    this.audioConfig = {
      sampleRate: 44100,
      bufferSize: 2048,
      enableLowLatency: true,
      enableCompression: true
    };

    this.visConfig = {
      enableWebGL: true,
      enableHardwareAcceleration: true,
      maxParticles: 1000,
      enableLOD: true
    };
  }

  /**
   * Generate mobile-optimized CSS
   */
  generateMobileCSS(): string {
    return `
      /* Mobile PWA Optimizations */
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .mobile-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: linear-gradient(135deg, #0f2027, #2c5364);
        color: #fff;
      }
      
      .mobile-header {
        padding: env(safe-area-inset-top) 16px 16px;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      
      .mobile-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        padding-bottom: calc(16px + env(safe-area-inset-bottom));
      }
      
      .mobile-panel {
        background: rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .mobile-button {
        background: linear-gradient(135deg, #00ffc6, #00bfae);
        color: #222;
        border: none;
        border-radius: 12px;
        padding: 16px 24px;
        font-size: 16px;
        font-weight: 600;
        margin: 8px;
        cursor: pointer;
        transition: all 0.2s;
        min-height: 48px;
        touch-action: manipulation;
      }
      
      .mobile-button:active {
        transform: scale(0.95);
        background: linear-gradient(135deg, #00bfae, #00ffc6);
      }
      
      .mobile-button:disabled {
        opacity: 0.5;
        transform: none;
      }
      
      .mobile-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
        margin: 16px 0;
      }
      
      .mobile-slider {
        width: 100%;
        height: 40px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255,255,255,0.2);
        border-radius: 20px;
        outline: none;
        margin: 8px 0;
      }
      
      .mobile-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background: #00ffc6;
        cursor: pointer;
      }
      
      .mobile-slider::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background: #00ffc6;
        cursor: pointer;
        border: none;
      }
      
      .mobile-chart {
        width: 100%;
        height: 120px;
        background: rgba(0,0,0,0.3);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
      }
      
      .mobile-gesture-area {
        width: 100%;
        height: 200px;
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #00ffc6;
        border: 2px dashed rgba(0,255,198,0.3);
        margin: 16px 0;
      }
      
      .mobile-status {
        text-align: center;
        padding: 12px;
        background: rgba(0,255,198,0.1);
        border-radius: 8px;
        margin: 8px 0;
        font-size: 14px;
      }
      
      /* Landscape optimizations */
      @media (orientation: landscape) {
        .mobile-container {
          flex-direction: row;
        }
        
        .mobile-header {
          width: 200px;
          height: 100vh;
          overflow-y: auto;
        }
        
        .mobile-content {
          flex: 1;
          height: 100vh;
        }
      }
      
      /* High DPI displays */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .mobile-button {
          border-width: 0.5px;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .mobile-panel {
          background: rgba(0,0,0,0.3);
        }
      }
    `;
  }

  /**
   * Generate mobile-optimized JavaScript
   */
  generateMobileJS(): string {
    return `
      // Mobile PWA JavaScript
      class MobilePWA {
        constructor() {
          this.setupViewport();
          this.setupTouchControls();
          this.setupGestures();
          this.setupHapticFeedback();
          this.setupOfflineSupport();
        }
        
        setupViewport() {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (!viewport) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
            document.head.appendChild(meta);
          }
        }
        
        setupTouchControls() {
          // Prevent zoom on double-tap
          let lastTouchEnd = 0;
          document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
              event.preventDefault();
            }
            lastTouchEnd = now;
          }, false);
          
          // Prevent pull-to-refresh
          document.addEventListener('touchmove', (event) => {
            if (event.scale !== 1) {
              event.preventDefault();
            }
          }, { passive: false });
        }
        
        setupGestures() {
          let startX = 0, startY = 0, startTime = 0;
          let isLongPress = false;
          let longPressTimer = null;
          
          document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
            
            // Long press detection
            longPressTimer = setTimeout(() => {
              isLongPress = true;
              this.triggerGesture('long-press', startX, startY);
              this.hapticFeedback('medium');
            }, 500);
          });
          
          document.addEventListener('touchmove', (e) => {
            if (longPressTimer) {
              clearTimeout(longPressTimer);
              longPressTimer = null;
            }
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
              isLongPress = false;
            }
          });
          
          document.addEventListener('touchend', (e) => {
            if (longPressTimer) {
              clearTimeout(longPressTimer);
              longPressTimer = null;
            }
            
            if (!isLongPress) {
              const touch = e.changedTouches[0];
              const deltaX = touch.clientX - startX;
              const deltaY = touch.clientY - startY;
              const duration = Date.now() - startTime;
              
              if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
                // Swipe gesture
                const direction = Math.abs(deltaX) > Math.abs(deltaY) 
                  ? (deltaX > 0 ? 'right' : 'left')
                  : (deltaY > 0 ? 'down' : 'up');
                this.triggerGesture('swipe', touch.clientX, touch.clientY, deltaX, deltaY);
                this.hapticFeedback('light');
              } else if (duration < 300) {
                // Tap gesture
                this.triggerGesture('tap', touch.clientX, touch.clientY);
                this.hapticFeedback('light');
              }
            }
          });
        }
        
        setupHapticFeedback() {
          if ('vibrate' in navigator) {
            this.hapticFeedback = (type) => {
              switch (type) {
                case 'light': navigator.vibrate(10); break;
                case 'medium': navigator.vibrate(50); break;
                case 'heavy': navigator.vibrate(100); break;
              }
            };
          } else {
            this.hapticFeedback = () => {};
          }
        }
        
        setupOfflineSupport() {
          // Service Worker registration
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => {
                console.log('Service Worker registered');
              })
              .catch(error => {
                console.log('Service Worker registration failed:', error);
              });
          }
        }
        
        triggerGesture(type, x, y, deltaX = 0, deltaY = 0) {
          const gesture = { type, x, y, deltaX, deltaY };
          console.log('Gesture detected:', gesture);
          
          // Trigger custom events
          const event = new CustomEvent('mobile-gesture', { detail: gesture });
          document.dispatchEvent(event);
        }
        
        // Mobile audio optimization
        setupMobileAudio() {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 44100,
            latencyHint: 'interactive'
          });
          
          // Optimize for mobile
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }
          
          return audioContext;
        }
        
        // Mobile visualization optimization
        setupMobileVisualization(canvas) {
          const gl = canvas.getContext('webgl', {
            antialias: false,
            alpha: false,
            depth: true,
            stencil: false,
            powerPreference: 'high-performance'
          });
          
          if (gl) {
            // Optimize for mobile GPU
            gl.getExtension('WEBGL_lose_context');
            gl.getExtension('OES_standard_derivatives');
          }
          
          return gl;
        }
      }
      
      // Initialize mobile PWA
      const mobilePWA = new MobilePWA();
      
      // Global mobile utilities
      window.mobilePWA = mobilePWA;
    `;
  }

  /**
   * Generate mobile-optimized HTML template
   */
  generateMobileHTML(title: string, content: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="${title}">
  <meta name="theme-color" content="#0f2027">
  <title>${title}</title>
  <style>${this.generateMobileCSS()}</style>
</head>
<body>
  <div class="mobile-container">
    <div class="mobile-header">
      <h1>${title}</h1>
      <div class="mobile-status" id="mobile-status">Ready</div>
    </div>
    <div class="mobile-content">
      ${content}
    </div>
  </div>
  <script>${this.generateMobileJS()}</script>
</body>
</html>`;
  }

  /**
   * Generate mobile-optimized meditation interface
   */
  generateMobileMeditationHTML(): string {
    return this.generateMobileHTML('Mobile Meditation', `
      <div class="mobile-panel">
        <h2>🧘 Consciousness Meditation</h2>
        <div class="mobile-grid">
          <div class="mobile-panel">
            <h3>Audio Frequency</h3>
            <div class="mobile-slider" id="frequency-slider" min="432" max="864" value="432"></div>
            <div class="mobile-status">Frequency: <span id="freq-display">432</span> Hz</div>
            <button class="mobile-button" id="play-audio">Play Meditation</button>
          </div>
          
          <div class="mobile-panel">
            <h3>3D Visualization</h3>
            <div class="mobile-gesture-area" id="gesture-area">
              Touch to interact with consciousness patterns
            </div>
            <button class="mobile-button" id="toggle-vis">Toggle Visualization</button>
          </div>
        </div>
        
        <div class="mobile-panel">
          <h3>Biofeedback Integration</h3>
          <div class="mobile-chart" id="biofeedback-chart"></div>
          <div class="mobile-status">Heart Rate: <span id="hr-display">--</span> bpm | EEG: <span id="eeg-display">--</span> Hz</div>
          <button class="mobile-button" id="start-biofeedback">Start Biofeedback</button>
        </div>
        
        <div class="mobile-panel">
          <h3>Meditation Controls</h3>
          <div class="mobile-grid">
            <button class="mobile-button" id="foundation">Foundation (432 Hz)</button>
            <button class="mobile-button" id="duality">Duality (864 Hz)</button>
            <button class="mobile-button" id="creation">Creation (1728 Hz)</button>
            <button class="mobile-button" id="infinity">Infinity (3456 Hz)</button>
          </div>
        </div>
      </div>
    `);
  }

  /**
   * Get mobile configuration
   */
  getMobileConfig(): MobileConfig {
    return this.config;
  }

  /**
   * Get audio configuration
   */
  getAudioConfig(): MobileAudioConfig {
    return this.audioConfig;
  }

  /**
   * Get visualization configuration
   */
  getVisualizationConfig(): MobileVisualizationConfig {
    return this.visConfig;
  }
}

/**
 * Mobile PWA Generator
 */
export class MobilePWAGenerator {
  private optimizer: MobilePWAOptimizer;

  constructor() {
    this.optimizer = new MobilePWAOptimizer();
  }

  /**
   * Generate mobile meditation PWA
   */
  generateMobileMeditationPWA(): string {
    return this.optimizer.generateMobileMeditationHTML();
  }

  /**
   * Generate mobile biofeedback PWA
   */
  generateMobileBiofeedbackPWA(): string {
    return this.optimizer.generateMobileHTML('Mobile Biofeedback', `
      <div class="mobile-panel">
        <h2>🧬 Biofeedback Meditation</h2>
        <div class="mobile-grid">
          <div class="mobile-panel">
            <h3>Real-time Biofeedback</h3>
            <div class="mobile-chart" id="hr-chart"></div>
            <div class="mobile-status">Heart Rate: <span id="hr-val">--</span> bpm</div>
            <div class="mobile-chart" id="eeg-chart"></div>
            <div class="mobile-status">EEG: <span id="eeg-val">--</span> Hz</div>
            <button class="mobile-button" id="start-sim">Start Simulation</button>
          </div>
          
          <div class="mobile-panel">
            <h3>Audio Response</h3>
            <div class="mobile-status">Amplitude: <span id="audio-amp">--</span></div>
            <div class="mobile-status">Frequency: <span id="audio-freq">--</span> Hz</div>
            <button class="mobile-button" id="play-audio">Play Audio</button>
          </div>
        </div>
        
        <div class="mobile-panel">
          <h3>Visualization Response</h3>
          <div class="mobile-gesture-area" id="vis-area">
            Touch to interact with consciousness visualization
          </div>
          <div class="mobile-status">Color Intensity: <span id="vis-color">--</span></div>
          <div class="mobile-status">Animation Speed: <span id="vis-speed">--</span></div>
        </div>
      </div>
    `);
  }
} 