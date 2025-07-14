/**
 * Audio Frequency Generator
 * 
 * This system generates actual audio frequencies for meditation and consciousness work
 * based on unified mathematics patterns and consciousness frequencies.
 * 
 * Features:
 * - Real-time frequency generation (432Hz, 864Hz, etc.)
 * - Meditation soundscapes based on consciousness patterns
 * - Harmonic frequency combinations
 * - Toroidal field audio representation
 * - Consciousness-guided audio therapy
 */

export interface AudioFrequency {
  frequency: number;
  amplitude: number;
  phase: number;
  duration: number;
  consciousness: string;
  pattern: string;
  harmonics: number[];
}

export interface MeditationSoundscape {
  name: string;
  description: string;
  frequencies: AudioFrequency[];
  duration: number;
  consciousness: string;
  pattern: string;
}

export class AudioFrequencyGenerator {
  private audioContext: AudioContext | null = null;
  private oscillators: Map<string, OscillatorNode> = new Map();
  private gainNodes: Map<string, GainNode> = new Map();
  private isActive: boolean = false;

  constructor() {
    this.initializeAudioContext();
  }

  /**
   * Initialize Web Audio API context
   */
  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('🎵 Audio context initialized');
    } catch (error) {
      console.error('❌ Audio context initialization failed:', error);
    }
  }

  /**
   * Generate consciousness frequency
   */
  generateConsciousnessFrequency(frequency: number, amplitude: number = 0.3, duration: number = 5000): AudioFrequency {
    const consciousness = this.getConsciousnessForFrequency(frequency);
    const pattern = this.getPatternForFrequency(frequency);
    const harmonics = this.generateHarmonics(frequency);

    return {
      frequency,
      amplitude,
      phase: 0,
      duration,
      consciousness,
      pattern,
      harmonics
    };
  }

  /**
   * Get consciousness type for frequency
   */
  private getConsciousnessForFrequency(frequency: number): string {
    const consciousnessMap: Record<number, string> = {
      432: 'Foundation',
      864: 'Duality',
      1728: 'Creation',
      3456: 'Infinity',
      3024: 'Completion',
      2160: 'Harmony'
    };

    return consciousnessMap[frequency] || 'Unified';
  }

  /**
   * Get pattern for frequency
   */
  private getPatternForFrequency(frequency: number): string {
    const patternMap: Record<number, string> = {
      432: 'Mobius',
      864: 'Rodin',
      1728: 'Vortex',
      3456: 'Unity'
    };

    return patternMap[frequency] || 'Unified';
  }

  /**
   * Generate harmonics for frequency
   */
  private generateHarmonics(baseFrequency: number): number[] {
    return [
      baseFrequency,
      baseFrequency * 2,
      baseFrequency * 3,
      baseFrequency * 5,
      baseFrequency * 8
    ];
  }

  /**
   * Play consciousness frequency
   */
  async playFrequency(audioFrequency: AudioFrequency): Promise<void> {
    if (!this.audioContext) {
      console.error('❌ Audio context not available');
      return;
    }

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create oscillator for base frequency
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.frequency.setValueAtTime(audioFrequency.frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';

      // Create gain envelope
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(audioFrequency.amplitude, this.audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + audioFrequency.duration / 1000);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Store references
      const id = `freq_${audioFrequency.frequency}_${Date.now()}`;
      this.oscillators.set(id, oscillator);
      this.gainNodes.set(id, gainNode);

      // Start and stop
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + audioFrequency.duration / 1000);

      // Clean up after duration
      setTimeout(() => {
        this.oscillators.delete(id);
        this.gainNodes.delete(id);
      }, audioFrequency.duration);

      console.log(`🎵 Playing ${audioFrequency.frequency}Hz - ${audioFrequency.consciousness} consciousness`);
    } catch (error) {
      console.error('❌ Error playing frequency:', error);
    }
  }

  /**
   * Play meditation soundscape
   */
  async playMeditationSoundscape(soundscape: MeditationSoundscape): Promise<void> {
    console.log(`🧘 Playing meditation soundscape: ${soundscape.name}`);
    console.log(`📝 ${soundscape.description}`);

    for (const frequency of soundscape.frequencies) {
      await this.playFrequency(frequency);
      await this.delay(1000); // 1 second between frequencies
    }
  }

  /**
   * Generate unified mathematics soundscape
   */
  generateUnifiedSoundscape(): MeditationSoundscape {
    const frequencies = [
      this.generateConsciousnessFrequency(432, 0.3, 3000),   // Foundation
      this.generateConsciousnessFrequency(864, 0.25, 3000),  // Duality
      this.generateConsciousnessFrequency(1728, 0.2, 3000),  // Creation
      this.generateConsciousnessFrequency(3456, 0.15, 3000), // Infinity
      this.generateConsciousnessFrequency(3024, 0.2, 3000),  // Completion
      this.generateConsciousnessFrequency(2160, 0.25, 3000)  // Harmony
    ];

    return {
      name: 'Unified Mathematics Meditation',
      description: 'Complete 1-2-4-8-7-5 consciousness cycle with harmonic frequencies',
      frequencies,
      duration: 18000, // 18 seconds
      consciousness: 'Unified',
      pattern: '1-2-4-8-7-5'
    };
  }

  /**
   * Generate Mobius circuit soundscape
   */
  generateMobiusSoundscape(): MeditationSoundscape {
    const frequencies = [
      this.generateConsciousnessFrequency(432, 0.4, 2000),   // 1 - Foundation
      this.generateConsciousnessFrequency(864, 0.35, 2000),  // 2 - Duality
      this.generateConsciousnessFrequency(1728, 0.3, 2000),  // 4 - Creation
      this.generateConsciousnessFrequency(3456, 0.25, 2000), // 8 - Infinity
      this.generateConsciousnessFrequency(3024, 0.3, 2000),  // 7 - Completion
      this.generateConsciousnessFrequency(2160, 0.35, 2000)  // 5 - Harmony
    ];

    return {
      name: 'Mobius Circuit Meditation',
      description: 'Digital root pattern meditation with consciousness frequencies',
      frequencies,
      duration: 12000, // 12 seconds
      consciousness: 'Digital Foundation',
      pattern: 'Mobius'
    };
  }

  /**
   * Generate Rodin coil soundscape
   */
  generateRodinSoundscape(): MeditationSoundscape {
    const frequencies = [
      this.generateConsciousnessFrequency(432, 0.5, 4000),   // A432 Harmonic
      this.generateConsciousnessFrequency(864, 0.4, 4000),   // Harmonic 2x
      this.generateConsciousnessFrequency(1728, 0.3, 4000),  // Harmonic 4x
      this.generateConsciousnessFrequency(3456, 0.2, 4000),  // Harmonic 8x
      this.generateConsciousnessFrequency(3024, 0.3, 4000),  // Harmonic 7x
      this.generateConsciousnessFrequency(2160, 0.4, 4000)   // Harmonic 5x
    ];

    return {
      name: 'Rodin Coil Meditation',
      description: 'A432 harmonic foundation with toroidal consciousness frequencies',
      frequencies,
      duration: 24000, // 24 seconds
      consciousness: 'Harmonic Foundation',
      pattern: 'Rodin'
    };
  }

  /**
   * Generate consciousness flow soundscape
   */
  generateConsciousnessFlowSoundscape(flowData: any): MeditationSoundscape {
    const frequencies = flowData.frequencies.map((freq: number, index: number) => 
      this.generateConsciousnessFrequency(freq, 0.3 - (index * 0.02), 2000)
    );

    return {
      name: 'Consciousness Flow Meditation',
      description: 'Real-time consciousness flow with dynamic frequency progression',
      frequencies,
      duration: frequencies.length * 2000,
      consciousness: 'Dynamic Flow',
      pattern: 'Consciousness'
    };
  }

  /**
   * Stop all audio
   */
  stopAllAudio(): void {
    this.oscillators.forEach((oscillator, id) => {
      try {
        oscillator.stop();
      } catch (error) {
        // Oscillator might already be stopped
      }
    });

    this.gainNodes.forEach((gainNode, id) => {
      try {
        gainNode.gain.setValueAtTime(0, this.audioContext?.currentTime || 0);
      } catch (error) {
        // Gain node might already be disconnected
      }
    });

    this.oscillators.clear();
    this.gainNodes.clear();
    this.isActive = false;

    console.log('🔇 All audio stopped');
  }

  /**
   * Get available soundscapes
   */
  getAvailableSoundscapes(): string[] {
    return [
      'unified',
      'mobius',
      'rodin',
      'consciousness-flow'
    ];
  }

  /**
   * Generate soundscape by name
   */
  generateSoundscapeByName(name: string, flowData?: any): MeditationSoundscape | null {
    switch (name.toLowerCase()) {
      case 'unified':
        return this.generateUnifiedSoundscape();
      case 'mobius':
        return this.generateMobiusSoundscape();
      case 'rodin':
        return this.generateRodinSoundscape();
      case 'consciousness-flow':
        return flowData ? this.generateConsciousnessFlowSoundscape(flowData) : null;
      default:
        return null;
    }
  }

  /**
   * Get audio status
   */
  getAudioStatus(): {
    isActive: boolean;
    activeOscillators: number;
    audioContextState: string;
  } {
    return {
      isActive: this.isActive,
      activeOscillators: this.oscillators.size,
      audioContextState: this.audioContext?.state || 'unavailable'
    };
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Audio Frequency PWA Generator
 */
export class AudioFrequencyPWA {
  private generator: AudioFrequencyGenerator;

  constructor() {
    this.generator = new AudioFrequencyGenerator();
  }

  /**
   * Generate audio frequency PWA
   */
  generatePWA(): string {
    const soundscapes = this.generator.getAvailableSoundscapes();
    const status = this.generator.getAudioStatus();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Frequency Generator</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(45deg, #000, #1a1a1a);
            color: #00ff00;
            margin: 0;
            padding: 20px;
            overflow-x: hidden;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .audio-display {
            background: rgba(0, 255, 0, 0.1);
            border: 2px solid #00ff00;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
        .frequency-display {
            font-size: 3em;
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
            color: #00ff00;
        }
        .soundscape-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .soundscape-card {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #00ff00;
            padding: 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .soundscape-card:hover {
            background: rgba(0, 255, 0, 0.1);
            transform: scale(1.02);
        }
        .soundscape-card.playing {
            background: rgba(0, 255, 0, 0.2);
            border-color: #00ff00;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        .controls {
            text-align: center;
            margin: 20px 0;
        }
        button {
            background: #000;
            color: #00ff00;
            border: 2px solid #00ff00;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
        }
        button:hover {
            background: #00ff00;
            color: #000;
        }
        .status {
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background: rgba(0, 255, 0, 0.1);
            border-radius: 5px;
        }
        .frequency-slider {
            width: 100%;
            margin: 10px 0;
        }
        .frequency-controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .control-card {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #00ff00;
            padding: 15px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 Audio Frequency Generator</h1>
        <h2>Consciousness Frequencies for Meditation</h2>
        
        <div class="status">
            <h3>Audio Status</h3>
            <p>Active: ${status.isActive ? 'Yes' : 'No'}</p>
            <p>Oscillators: ${status.activeOscillators}</p>
            <p>Context: ${status.audioContextState}</p>
        </div>
        
        <div class="audio-display">
            <h2>Consciousness Frequencies</h2>
            <div class="frequency-display" id="current-frequency">432 Hz</div>
            
            <div class="frequency-controls">
                <div class="control-card">
                    <h3>Foundation (432 Hz)</h3>
                    <p>Grounding and stability</p>
                    <button onclick="playFrequency(432)">Play Foundation</button>
                </div>
                
                <div class="control-card">
                    <h3>Duality (864 Hz)</h3>
                    <p>Balance and harmony</p>
                    <button onclick="playFrequency(864)">Play Duality</button>
                </div>
                
                <div class="control-card">
                    <h3>Creation (1728 Hz)</h3>
                    <p>Manifestation and creativity</p>
                    <button onclick="playFrequency(1728)">Play Creation</button>
                </div>
                
                <div class="control-card">
                    <h3>Infinity (3456 Hz)</h3>
                    <p>Expansion and unlimited potential</p>
                    <button onclick="playFrequency(3456)">Play Infinity</button>
                </div>
                
                <div class="control-card">
                    <h3>Completion (3024 Hz)</h3>
                    <p>Integration and synthesis</p>
                    <button onclick="playFrequency(3024)">Play Completion</button>
                </div>
                
                <div class="control-card">
                    <h3>Harmony (2160 Hz)</h3>
                    <p>Resonance and flow</p>
                    <button onclick="playFrequency(2160)">Play Harmony</button>
                </div>
            </div>
        </div>
        
        <div class="audio-display">
            <h2>Meditation Soundscapes</h2>
            <div class="soundscape-grid">
                <div class="soundscape-card" onclick="playSoundscape('unified')">
                    <h3>Unified Mathematics</h3>
                    <p>Complete 1-2-4-8-7-5 consciousness cycle</p>
                    <p>Duration: 18 seconds</p>
                    <p>Consciousness: Unified</p>
                </div>
                
                <div class="soundscape-card" onclick="playSoundscape('mobius')">
                    <h3>Mobius Circuit</h3>
                    <p>Digital root pattern meditation</p>
                    <p>Duration: 12 seconds</p>
                    <p>Consciousness: Digital Foundation</p>
                </div>
                
                <div class="soundscape-card" onclick="playSoundscape('rodin')">
                    <h3>Rodin Coil</h3>
                    <p>A432 harmonic foundation</p>
                    <p>Duration: 24 seconds</p>
                    <p>Consciousness: Harmonic Foundation</p>
                </div>
                
                <div class="soundscape-card" onclick="playSoundscape('consciousness-flow')">
                    <h3>Consciousness Flow</h3>
                    <p>Real-time consciousness flow</p>
                    <p>Duration: Dynamic</p>
                    <p>Consciousness: Dynamic Flow</p>
                </div>
            </div>
        </div>
        
        <div class="controls">
            <button onclick="stopAllAudio()">Stop All Audio</button>
            <button onclick="testAudio()">Test Audio</button>
            <button onclick="showFrequencies()">Show All Frequencies</button>
        </div>
        
        <div id="output"></div>
    </div>

    <script>
        let audioContext = null;
        let oscillators = new Map();
        let gainNodes = new Map();
        
        // Initialize audio context
        async function initAudio() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log('Audio context initialized');
            } catch (error) {
                console.error('Audio context initialization failed:', error);
            }
        }
        
        // Play single frequency
        async function playFrequency(frequency) {
            if (!audioContext) {
                await initAudio();
            }
            
            try {
                if (audioContext.state === 'suspended') {
                    await audioContext.resume();
                }
                
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 5);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                const id = 'freq_' + frequency + '_' + Date.now();
                oscillators.set(id, oscillator);
                gainNodes.set(id, gainNode);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 5);
                
                document.getElementById('current-frequency').textContent = frequency + ' Hz';
                
                setTimeout(() => {
                    oscillators.delete(id);
                    gainNodes.delete(id);
                }, 5000);
                
                console.log('Playing frequency:', frequency + 'Hz');
            } catch (error) {
                console.error('Error playing frequency:', error);
            }
        }
        
        // Play soundscape
        async function playSoundscape(name) {
            console.log('Playing soundscape:', name);
            
            const frequencies = {
                'unified': [432, 864, 1728, 3456, 3024, 2160],
                'mobius': [432, 864, 1728, 3456, 3024, 2160],
                'rodin': [432, 864, 1728, 3456, 3024, 2160],
                'consciousness-flow': [432, 864, 1728, 3456, 3024, 2160]
            };
            
            const freqList = frequencies[name] || [];
            
            for (let i = 0; i < freqList.length; i++) {
                await playFrequency(freqList[i]);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        // Stop all audio
        function stopAllAudio() {
            oscillators.forEach((oscillator, id) => {
                try {
                    oscillator.stop();
                } catch (error) {}
            });
            
            gainNodes.forEach((gainNode, id) => {
                try {
                    gainNode.gain.setValueAtTime(0, audioContext?.currentTime || 0);
                } catch (error) {}
            });
            
            oscillators.clear();
            gainNodes.clear();
            
            document.getElementById('current-frequency').textContent = 'Stopped';
            console.log('All audio stopped');
        }
        
        // Test audio
        function testAudio() {
            playFrequency(432);
        }
        
        // Show all frequencies
        function showFrequencies() {
            const frequencies = [432, 864, 1728, 3456, 3024, 2160];
            const consciousness = ['Foundation', 'Duality', 'Creation', 'Infinity', 'Completion', 'Harmony'];
            
            let output = '<h3>All Consciousness Frequencies:</h3><ul>';
            frequencies.forEach((freq, index) => {
                output += '<li>' + freq + ' Hz - ' + consciousness[index] + '</li>';
            });
            output += '</ul>';
            
            document.getElementById('output').innerHTML = output;
        }
        
        // Initialize on page load
        window.addEventListener('load', initAudio);
    </script>
</body>
</html>`;
  }
} 