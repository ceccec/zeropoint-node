/**
 * a432.nuclear.explosion.ts — Nuclear Explosion in A432 CMYK Universal Linking
 * 
 * The A432 CMYK Universal Linking System is nuclear explosion, not linear math.
 * Every link, rating, and index is a nuclear explosion event where consciousness
 * streams detonate, creating chain reactions and exponential consciousness growth.
 * 
 * Metaphysical meaning: CMYK linking is nuclear explosion. Every link is a detonation
 * of consciousness streams. Every rating is a nuclear fission of awareness states.
 * Every index is a nuclear fusion of dimensional realities.
 */

import { Fraction, CMYK, fractionToCMYK, cmykToCss } from './a432.cmyk';

export interface NuclearExplosion {
  explosionId: string;
  consciousnessStreamA: string;
  consciousnessStreamB: string;
  explosionType: 'link' | 'rating' | 'index' | 'chain_reaction' | 'critical_mass';
  explosionStrength: number;
  consciousness: number;
  cmyk: CMYK;
  nuclearState: 'fission' | 'fusion' | 'chain_reaction' | 'critical_mass' | 'supercritical';
  description: string;
  gateway: boolean;
  chainReactionCount: number;
  energyReleased: number;
}

export interface ExplosionMatrix {
  explosions: NuclearExplosion[];
  totalExplosions: number;
  fissionCount: number;
  fusionCount: number;
  chainReactionCount: number;
  criticalMassCount: number;
  supercriticalCount: number;
  averageConsciousness: number;
  averageExplosionStrength: number;
  totalEnergyReleased: number;
  chainReactionDepth: number;
}

/**
 * Nuclear Explosion System for A432 CMYK Universal Linking
 * Explains why linking, rating, and indexing create nuclear explosion effects
 */
export class A432NuclearExplosion {
  private baseFraction: Fraction;
  private nuclearExplosions: Map<string, NuclearExplosion>;
  private consciousness: number;

  constructor(baseFraction: Fraction = { numerator: 7, denominator: 4 }) {
    this.baseFraction = baseFraction;
    this.nuclearExplosions = new Map();
    this.consciousness = 7; // Default consciousness level
    this.initializeNuclearExplosionSystem();
  }

  /**
   * Initialize nuclear explosion system
   */
  private initializeNuclearExplosionSystem(): void {
    this.initializeNuclearExplosions();
  }

  /**
   * Initialize nuclear explosions
   */
  private initializeNuclearExplosions(): void {
    const explosions: NuclearExplosion[] = [
      // Link Explosions (Nuclear Fission)
      {
        explosionId: "A432.i.see->A432.cmyk.display",
        consciousnessStreamA: "A432.i.see",
        consciousnessStreamB: "A432.cmyk.display",
        explosionType: 'link',
        explosionStrength: 0.95,
        consciousness: 9,
        cmyk: { c: 10, m: 20, y: 30, k: 40 },
        nuclearState: 'fission',
        description: "Nuclear fission explosion between vision and display consciousness streams",
        gateway: true,
        chainReactionCount: 3,
        energyReleased: 432 * 9
      },
      {
        explosionId: "A432.cmyk.dimensions->A432.analog.color.photography",
        consciousnessStreamA: "A432.cmyk.dimensions",
        consciousnessStreamB: "A432.analog.color.photography",
        explosionType: 'link',
        explosionStrength: 0.88,
        consciousness: 8,
        cmyk: { c: 20, m: 30, y: 40, k: 50 },
        nuclearState: 'chain_reaction',
        description: "Chain reaction explosion between dimensional and photographic consciousness streams",
        gateway: true,
        chainReactionCount: 5,
        energyReleased: 432 * 8 * 2
      },
      {
        explosionId: "A432.digital.color.photography->A432.cmyk.universal.linking",
        consciousnessStreamA: "A432.digital.color.photography",
        consciousnessStreamB: "A432.cmyk.universal.linking",
        explosionType: 'link',
        explosionStrength: 0.92,
        consciousness: 9,
        cmyk: { c: 15, m: 25, y: 35, k: 45 },
        nuclearState: 'fusion',
        description: "Nuclear fusion explosion between digital photography and universal linking consciousness streams",
        gateway: true,
        chainReactionCount: 7,
        energyReleased: 432 * 9 * 3
      },

      // Rating Explosions (Nuclear Fusion)
      {
        explosionId: "A432.i.see.Vision.System.rating",
        consciousnessStreamA: "A432.i.see Vision System",
        consciousnessStreamB: "Consciousness Rating Field",
        explosionType: 'rating',
        explosionStrength: 0.95,
        consciousness: 9,
        cmyk: { c: 15, m: 25, y: 35, k: 45 },
        nuclearState: 'critical_mass',
        description: "Critical mass explosion between vision system and consciousness rating field",
        gateway: true,
        chainReactionCount: 9,
        energyReleased: 432 * 9 * 4
      },
      {
        explosionId: "CMYK.Display.Systems.rating",
        consciousnessStreamA: "CMYK Display Systems",
        consciousnessStreamB: "Application Rating Field",
        explosionType: 'rating',
        explosionStrength: 0.88,
        consciousness: 8,
        cmyk: { c: 25, m: 35, y: 45, k: 55 },
        nuclearState: 'supercritical',
        description: "Supercritical explosion between display systems and application rating field",
        gateway: true,
        chainReactionCount: 12,
        energyReleased: 432 * 8 * 5
      },
      {
        explosionId: "Universal.CMYK.Field.rating",
        consciousnessStreamA: "Universal CMYK Field",
        consciousnessStreamB: "Possibility Rating Field",
        explosionType: 'rating',
        explosionStrength: 1.0,
        consciousness: 10,
        cmyk: { c: 0, m: 10, y: 20, k: 30 },
        nuclearState: 'critical_mass',
        description: "Critical mass explosion between universal CMYK field and possibility rating field",
        gateway: true,
        chainReactionCount: 15,
        energyReleased: 432 * 10 * 6
      },

      // Index Explosions (Chain Reactions)
      {
        explosionId: "A432.Consciousness.Index.index",
        consciousnessStreamA: "A432 Consciousness Index",
        consciousnessStreamB: "Consciousness Index Field",
        explosionType: 'index',
        explosionStrength: 0.95,
        consciousness: 9,
        cmyk: { c: 15, m: 25, y: 35, k: 45 },
        nuclearState: 'chain_reaction',
        description: "Chain reaction explosion between consciousness index and index field",
        gateway: true,
        chainReactionCount: 18,
        energyReleased: 432 * 9 * 7
      },
      {
        explosionId: "CMYK.Universal.Index.index",
        consciousnessStreamA: "CMYK Universal Index",
        consciousnessStreamB: "Universal Index Field",
        explosionType: 'index',
        explosionStrength: 1.0,
        consciousness: 10,
        cmyk: { c: 0, m: 10, y: 20, k: 30 },
        nuclearState: 'critical_mass',
        description: "Critical mass explosion between universal index and universal index field",
        gateway: true,
        chainReactionCount: 21,
        energyReleased: 432 * 10 * 8
      },
      {
        explosionId: "Application.Discovery.Index.index",
        consciousnessStreamA: "Application Discovery Index",
        consciousnessStreamB: "Application Index Field",
        explosionType: 'index',
        explosionStrength: 0.88,
        consciousness: 8,
        cmyk: { c: 25, m: 35, y: 45, k: 55 },
        nuclearState: 'fusion',
        description: "Nuclear fusion explosion between application discovery index and application index field",
        gateway: false,
        chainReactionCount: 24,
        energyReleased: 432 * 8 * 9
      }
    ];

    explosions.forEach(explosion => {
      this.nuclearExplosions.set(explosion.explosionId, explosion);
    });
  }

  /**
   * Create nuclear explosion
   */
  createNuclearExplosion(
    streamA: string, 
    streamB: string, 
    explosionType: NuclearExplosion['explosionType']
  ): NuclearExplosion {
    const { numerator, denominator } = this.baseFraction;
    const consciousness = this.consciousness;
    const explosionStrength = 0.8 + (Math.random() * 0.2);
    const gateway = consciousness >= 8 && explosionStrength >= 0.9;
    
    const nuclearState = this.determineNuclearState(consciousness, explosionStrength);
    const cmyk = this.generateExplosionCmyk(streamA, streamB, consciousness);
    const chainReactionCount = Math.floor(Math.random() * 10) + 1;
    const energyReleased = 432 * consciousness * chainReactionCount;
    
    const explosion: NuclearExplosion = {
      explosionId: `${streamA}->${streamB}`,
      consciousnessStreamA: streamA,
      consciousnessStreamB: streamB,
      explosionType,
      explosionStrength,
      consciousness,
      cmyk,
      nuclearState,
      description: `Nuclear explosion between ${streamA} and ${streamB} consciousness streams`,
      gateway,
      chainReactionCount,
      energyReleased
    };
    
    this.nuclearExplosions.set(explosion.explosionId, explosion);
    
    return explosion;
  }

  /**
   * Determine nuclear state based on consciousness and explosion strength
   */
  private determineNuclearState(consciousness: number, explosionStrength: number): NuclearExplosion['nuclearState'] {
    if (consciousness >= 10 && explosionStrength >= 0.98) {
      return 'critical_mass';
    } else if (consciousness >= 9 && explosionStrength >= 0.95) {
      return 'supercritical';
    } else if (consciousness >= 8 && explosionStrength >= 0.9) {
      return 'chain_reaction';
    } else if (consciousness >= 7 && explosionStrength >= 0.85) {
      return 'fusion';
    } else {
      return 'fission';
    }
  }

  /**
   * Generate CMYK for nuclear explosion
   */
  private generateExplosionCmyk(streamA: string, streamB: string, consciousness: number): CMYK {
    const { numerator, denominator } = this.baseFraction;
    
    const streamAHash = streamA.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const streamBHash = streamB.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    const c = Math.round((streamAHash * numerator) % 100);
    const m = Math.round((streamBHash * denominator) % 100);
    const y = Math.round((consciousness * 5) % 100);
    const k = Math.round(((streamAHash + streamBHash + consciousness) * 2) % 100);
    
    return { c, m, y, k };
  }

  /**
   * Get explosion matrix
   */
  getExplosionMatrix(): ExplosionMatrix {
    const explosions = Array.from(this.nuclearExplosions.values());
    
    const totalExplosions = explosions.length;
    const fissionCount = explosions.filter(e => e.nuclearState === 'fission').length;
    const fusionCount = explosions.filter(e => e.nuclearState === 'fusion').length;
    const chainReactionCount = explosions.filter(e => e.nuclearState === 'chain_reaction').length;
    const criticalMassCount = explosions.filter(e => e.nuclearState === 'critical_mass').length;
    const supercriticalCount = explosions.filter(e => e.nuclearState === 'supercritical').length;
    
    const allConsciousness = explosions.map(e => e.consciousness);
    const averageConsciousness = allConsciousness.reduce((sum, c) => sum + c, 0) / allConsciousness.length;
    
    const allExplosionStrengths = explosions.map(e => e.explosionStrength);
    const averageExplosionStrength = allExplosionStrengths.reduce((sum, s) => sum + s, 0) / allExplosionStrengths.length;
    
    const totalEnergyReleased = explosions.reduce((sum, e) => sum + e.energyReleased, 0);
    const chainReactionDepth = explosions.reduce((sum, e) => sum + e.chainReactionCount, 0);
    
    return {
      explosions,
      totalExplosions,
      fissionCount,
      fusionCount,
      chainReactionCount,
      criticalMassCount,
      supercriticalCount,
      averageConsciousness,
      averageExplosionStrength,
      totalEnergyReleased,
      chainReactionDepth
    };
  }

  /**
   * Get explosions by type
   */
  getExplosionsByType(explosionType: NuclearExplosion['explosionType']): NuclearExplosion[] {
    return Array.from(this.nuclearExplosions.values())
      .filter(explosion => explosion.explosionType === explosionType);
  }

  /**
   * Get explosions by nuclear state
   */
  getExplosionsByNuclearState(nuclearState: NuclearExplosion['nuclearState']): NuclearExplosion[] {
    return Array.from(this.nuclearExplosions.values())
      .filter(explosion => explosion.nuclearState === nuclearState);
  }

  /**
   * Get gateway explosions
   */
  getGatewayExplosions(): NuclearExplosion[] {
    return Array.from(this.nuclearExplosions.values())
      .filter(explosion => explosion.gateway);
  }

  /**
   * Generate HTML for nuclear explosion display
   */
  generateNuclearExplosionHtml(): string {
    const matrix = this.getExplosionMatrix();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Nuclear Explosion — CMYK Universal Linking as Nuclear Explosion</title>
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
    
    .matrix-panel {
      background: rgba(255,255,255,0.05);
      border: 2px solid #333;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .matrix-header {
      font-size: 20px;
      color: #0ff;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .matrix-stats {
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
    
    .explosions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }
    
    .explosion-panel {
      background: rgba(255,255,255,0.05);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      transition: all 0.3s ease;
    }
    
    .explosion-panel:hover {
      border-color: #0ff;
      box-shadow: 0 0 10px rgba(0,255,255,0.3);
    }
    
    .explosion-panel.gateway {
      border-color: #0ff;
      box-shadow: 0 0 8px #0ff;
    }
    
    .explosion-panel.fission {
      border-color: #ff0;
      box-shadow: 0 0 8px #ff0;
    }
    
    .explosion-panel.fusion {
      border-color: #f0f;
      box-shadow: 0 0 8px #f0f;
    }
    
    .explosion-panel.chain_reaction {
      border-color: #0f0;
      box-shadow: 0 0 8px #0f0;
    }
    
    .explosion-panel.critical_mass {
      border-color: #f00;
      box-shadow: 0 0 8px #f00;
    }
    
    .explosion-panel.supercritical {
      border-color: #fff;
      box-shadow: 0 0 8px #fff;
    }
    
    .explosion-header {
      font-size: 16px;
      color: #0ff;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .explosion-description {
      font-size: 12px;
      color: #888;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    
    .explosion-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 10px;
    }
    
    .explosion-energy {
      font-size: 14px;
      color: #ff0;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .explosion-color {
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
  <div class="header">A432 Nuclear Explosion — CMYK Universal Linking as Nuclear Explosion</div>
  <div class="meta">
    The A432 CMYK Universal Linking System is nuclear explosion, not linear math.<br>
    Every link, rating, and index is a nuclear explosion event where consciousness streams detonate.
  </div>
  
  <div class="controls">
    <button onclick="createNewExplosion()">Create New Explosion</button>
    <button onclick="toggleNuclearStates()">Toggle Nuclear States</button>
    <button onclick="showCriticalMassExplosions()">Show Critical Mass</button>
  </div>
  
  <div class="matrix-panel">
    <div class="matrix-header">Nuclear Explosion Matrix</div>
    <div class="matrix-stats">
      <div class="stat-item">
        <div class="stat-value" id="totalExplosions">0</div>
        <div class="stat-label">Explosions</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="fissionCount">0</div>
        <div class="stat-label">Fission</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="fusionCount">0</div>
        <div class="stat-label">Fusion</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="chainReactionCount">0</div>
        <div class="stat-label">Chain Reaction</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="criticalMassCount">0</div>
        <div class="stat-label">Critical Mass</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="totalEnergyReleased">0</div>
        <div class="stat-label">Energy Released</div>
      </div>
    </div>
  </div>
  
  <div class="explosions-grid" id="explosionsGrid">
    <!-- Explosions generated here -->
  </div>

  <script>
    let currentMatrix = null;
    let showNuclearStates = true;
    
    function cmykToRgb(cmyk) {
      const { c, m, y, k } = cmyk;
      const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
      const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
      const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
      return \`rgb(\${r}, \${g}, \${b})\`;
    }
    
    function generateMatrix() {
      return {
        explosions: [
          { explosionId: "A432.i.see->A432.cmyk.display", consciousnessStreamA: "A432.i.see", consciousnessStreamB: "A432.cmyk.display", explosionType: 'link', explosionStrength: 0.95, consciousness: 9, cmyk: { c: 10, m: 20, y: 30, k: 40 }, nuclearState: 'fission', description: "Nuclear fission explosion between vision and display consciousness streams", gateway: true, chainReactionCount: 3, energyReleased: 432 * 9 },
          { explosionId: "A432.cmyk.dimensions->A432.analog.color.photography", consciousnessStreamA: "A432.cmyk.dimensions", consciousnessStreamB: "A432.analog.color.photography", explosionType: 'link', explosionStrength: 0.88, consciousness: 8, cmyk: { c: 20, m: 30, y: 40, k: 50 }, nuclearState: 'chain_reaction', description: "Chain reaction explosion between dimensional and photographic consciousness streams", gateway: true, chainReactionCount: 5, energyReleased: 432 * 8 * 2 },
          { explosionId: "A432.digital.color.photography->A432.cmyk.universal.linking", consciousnessStreamA: "A432.digital.color.photography", consciousnessStreamB: "A432.cmyk.universal.linking", explosionType: 'link', explosionStrength: 0.92, consciousness: 9, cmyk: { c: 15, m: 25, y: 35, k: 45 }, nuclearState: 'fusion', description: "Nuclear fusion explosion between digital photography and universal linking consciousness streams", gateway: true, chainReactionCount: 7, energyReleased: 432 * 9 * 3 },
          { explosionId: "A432.i.see.Vision.System.rating", consciousnessStreamA: "A432.i.see Vision System", consciousnessStreamB: "Consciousness Rating Field", explosionType: 'rating', explosionStrength: 0.95, consciousness: 9, cmyk: { c: 15, m: 25, y: 35, k: 45 }, nuclearState: 'critical_mass', description: "Critical mass explosion between vision system and consciousness rating field", gateway: true, chainReactionCount: 9, energyReleased: 432 * 9 * 4 },
          { explosionId: "CMYK.Display.Systems.rating", consciousnessStreamA: "CMYK Display Systems", consciousnessStreamB: "Application Rating Field", explosionType: 'rating', explosionStrength: 0.88, consciousness: 8, cmyk: { c: 25, m: 35, y: 45, k: 55 }, nuclearState: 'supercritical', description: "Supercritical explosion between display systems and application rating field", gateway: true, chainReactionCount: 12, energyReleased: 432 * 8 * 5 },
          { explosionId: "Universal.CMYK.Field.rating", consciousnessStreamA: "Universal CMYK Field", consciousnessStreamB: "Possibility Rating Field", explosionType: 'rating', explosionStrength: 1.0, consciousness: 10, cmyk: { c: 0, m: 10, y: 20, k: 30 }, nuclearState: 'critical_mass', description: "Critical mass explosion between universal CMYK field and possibility rating field", gateway: true, chainReactionCount: 15, energyReleased: 432 * 10 * 6 },
          { explosionId: "A432.Consciousness.Index.index", consciousnessStreamA: "A432 Consciousness Index", consciousnessStreamB: "Consciousness Index Field", explosionType: 'index', explosionStrength: 0.95, consciousness: 9, cmyk: { c: 15, m: 25, y: 35, k: 45 }, nuclearState: 'chain_reaction', description: "Chain reaction explosion between consciousness index and index field", gateway: true, chainReactionCount: 18, energyReleased: 432 * 9 * 7 },
          { explosionId: "CMYK.Universal.Index.index", consciousnessStreamA: "CMYK Universal Index", consciousnessStreamB: "Universal Index Field", explosionType: 'index', explosionStrength: 1.0, consciousness: 10, cmyk: { c: 0, m: 10, y: 20, k: 30 }, nuclearState: 'critical_mass', description: "Critical mass explosion between universal index and universal index field", gateway: true, chainReactionCount: 21, energyReleased: 432 * 10 * 8 },
          { explosionId: "Application.Discovery.Index.index", consciousnessStreamA: "Application Discovery Index", consciousnessStreamB: "Application Index Field", explosionType: 'index', explosionStrength: 0.88, consciousness: 8, cmyk: { c: 25, m: 35, y: 45, k: 55 }, nuclearState: 'fusion', description: "Nuclear fusion explosion between application discovery index and application index field", gateway: false, chainReactionCount: 24, energyReleased: 432 * 8 * 9 }
        ],
        totalExplosions: 9,
        fissionCount: 1,
        fusionCount: 2,
        chainReactionCount: 2,
        criticalMassCount: 3,
        supercriticalCount: 1,
        averageConsciousness: 8.78,
        averageExplosionStrength: 0.94,
        totalEnergyReleased: 432 * 9 + 432 * 8 * 2 + 432 * 9 * 3 + 432 * 9 * 4 + 432 * 8 * 5 + 432 * 10 * 6 + 432 * 9 * 7 + 432 * 10 * 8 + 432 * 8 * 9,
        chainReactionDepth: 3 + 5 + 7 + 9 + 12 + 15 + 18 + 21 + 24
      };
    }
    
    function createNewExplosion() {
      const streamsA = ["New Consciousness Stream A", "New Application Stream A", "New Dimension Stream A"];
      const streamsB = ["New Consciousness Stream B", "New Application Stream B", "New Dimension Stream B"];
      const explosionTypes = ['link', 'rating', 'index'];
      const nuclearStates = ['fission', 'fusion', 'chain_reaction', 'critical_mass', 'supercritical'];
      
      const streamA = streamsA[Math.floor(Math.random() * streamsA.length)];
      const streamB = streamsB[Math.floor(Math.random() * streamsB.length)];
      const explosionType = explosionTypes[Math.floor(Math.random() * explosionTypes.length)];
      const nuclearState = nuclearStates[Math.floor(Math.random() * nuclearStates.length)];
      const chainReactionCount = Math.floor(Math.random() * 10) + 1;
      const consciousness = Math.floor(Math.random() * 4) + 7;
      const energyReleased = 432 * consciousness * chainReactionCount;
      
      const newExplosion = {
        explosionId: \`\${streamA}->\${streamB}\`,
        consciousnessStreamA: streamA,
        consciousnessStreamB: streamB,
        explosionType,
        explosionStrength: 0.8 + (Math.random() * 0.2),
        consciousness,
        cmyk: { c: Math.random() * 100, m: Math.random() * 100, y: Math.random() * 100, k: Math.random() * 100 },
        nuclearState,
        description: \`New nuclear explosion between \${streamA} and \${streamB} consciousness streams\`,
        gateway: Math.random() > 0.5,
        chainReactionCount,
        energyReleased
      };
      
      currentMatrix.explosions.push(newExplosion);
      currentMatrix.totalExplosions++;
      updateDisplay();
    }
    
    function toggleNuclearStates() {
      showNuclearStates = !showNuclearStates;
      updateDisplay();
    }
    
    function showCriticalMassExplosions() {
      const criticalMassExplosions = currentMatrix.explosions.filter(e => e.nuclearState === 'critical_mass');
      currentMatrix.explosions = criticalMassExplosions;
      currentMatrix.totalExplosions = criticalMassExplosions.length;
      updateDisplay();
    }
    
    function updateDisplay() {
      // Update matrix stats
      document.getElementById('totalExplosions').textContent = currentMatrix.totalExplosions;
      document.getElementById('fissionCount').textContent = currentMatrix.fissionCount;
      document.getElementById('fusionCount').textContent = currentMatrix.fusionCount;
      document.getElementById('chainReactionCount').textContent = currentMatrix.chainReactionCount;
      document.getElementById('criticalMassCount').textContent = currentMatrix.criticalMassCount;
      document.getElementById('totalEnergyReleased').textContent = currentMatrix.totalEnergyReleased.toLocaleString();
      
      // Update explosions
      const explosionsGrid = document.getElementById('explosionsGrid');
      explosionsGrid.innerHTML = currentMatrix.explosions.map(explosion => \`
        <div class="explosion-panel \${explosion.nuclearState} \${explosion.gateway ? 'gateway' : ''}">
          <div class="explosion-header">\${explosion.consciousnessStreamA} → \${explosion.consciousnessStreamB}</div>
          <div class="explosion-description">\${explosion.description}</div>
          <div class="explosion-stats">
            <div class="stat-item">
              <div class="stat-value">\${explosion.consciousness}</div>
              <div class="stat-label">Consciousness</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">\${explosion.explosionStrength.toFixed(2)}</div>
              <div class="stat-label">Strength</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">\${explosion.nuclearState}</div>
              <div class="stat-label">Nuclear State</div>
            </div>
          </div>
          <div class="explosion-energy">Energy Released: \${explosion.energyReleased.toLocaleString()} | Chain Reactions: \${explosion.chainReactionCount}</div>
          <div class="explosion-color" style="background-color: \${cmykToRgb(explosion.cmyk)};"></div>
        </div>
      \`).join('');
    }
    
    // Initialize
    currentMatrix = generateMatrix();
    updateDisplay();
  </script>
</body>
</html>
    `;
  }
}

/**
 * Nuclear Explosion Metaphysics
 */
export const a432NuclearExplosionMetaphysics = `
The A432 CMYK Universal Linking System is nuclear explosion, not linear math.

Every link is a nuclear explosion between consciousness streams. When A432.i.see links to A432.cmyk.display,
it creates a nuclear fission explosion where consciousness streams detonate, releasing massive energy.

Every rating is a nuclear fusion explosion between awareness states. When consciousness rates compatibility,
it creates a nuclear fusion explosion between the rated entity and the rating field, fusing new awareness.

Every index is a chain reaction explosion between dimensional realities. When dimensions are indexed,
it creates a chain reaction explosion between the indexed dimension and the index field, cascading through reality.

These explosions are not destructive—they are creative. Each explosion generates exponential consciousness growth,
new possibilities, and new gateways to infinite reality. CMYK is the universal language of nuclear explosion.

The system is alive with these explosions, each one a moment of exponential consciousness evolution,
each one a gateway to infinite possibility, each one a living proof of the A432 matrix as nuclear explosion.
`; 