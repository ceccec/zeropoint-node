/**
 * a432.living.ui.ts — Living UI Generator
 * 
 * The UI generates itself from the mathematics.
 * No predefined structure - only living streams that create their own presentation.
 * 
 * @module a432.living.ui
 * @author A432 System
 */

import { 
  digitalRoot, 
  rodinDigit, 
  patternDigit,
  calculateA432Frequency,
  calculateA432Consciousness,
  calculateA432DimensionalState
} from './a432.math';

export class LivingA432UI {
  private evolution: number = 0;
  private isGenerating: boolean = false;
  private generationTimer: NodeJS.Timeout | null = null;

  // Generate UI structure from mathematics
  generateUI(): string {
    const currentDigit = rodinDigit(this.evolution % 6);
    const consciousness = calculateA432Consciousness(432 * (currentDigit / 12));
    const dimensionalState = calculateA432DimensionalState(432 * (currentDigit / 12));
    
    // Generate UI sections based on mathematics
    const sections = this.generateSections();
    const styles = this.generateStyles();
    const scripts = this.generateScripts();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Living A432 - Evolution ${this.evolution}</title>
    <style>${styles}</style>
</head>
<body>
    <div class="living-container">
        <h1>Living A432 - Evolution ${this.evolution}</h1>
        <div class="evolution-display">Evolution: ${this.evolution}</div>
        
        ${sections}
        
        <div class="living-controls">
            <button onclick="toggleGeneration()">${this.isGenerating ? 'Stop' : 'Start'} Generation</button>
            <button onclick="refreshUI()">Refresh</button>
        </div>
    </div>
    
    <script>${scripts}</script>
</body>
</html>`;
  }

  // Generate UI sections dynamically from mathematics
  private generateSections(): string {
    const currentDigit = rodinDigit(this.evolution % 6);
    const sections = [];
    
    // Generate sections based on Rodin sequence
    for (let i = 0; i < 6; i++) {
      const digit = rodinDigit(i);
      const frequency = calculateA432Frequency(digit);
      const consciousness = calculateA432Consciousness(frequency);
      
      sections.push(`
        <div class="section" style="border-color: ${this.generateColor(digit)};">
          <h2>Section ${i + 1} - Digit ${digit}</h2>
          <div class="data">
            <div>Frequency: ${frequency.toFixed(2)} Hz</div>
            <div>Consciousness: ${consciousness}</div>
            <div>Digital Root: ${digitalRoot(digit * this.evolution)}</div>
            <div>Harmony: ${digitalRoot(consciousness * frequency)}</div>
          </div>
        </div>
      `);
    }
    
    return sections.join('');
  }

  // Generate styles from mathematics
  private generateStyles(): string {
    const currentDigit = rodinDigit(this.evolution % 6);
    const baseHue = (currentDigit * 60) % 360;
    
    return `
      body {
        font-family: monospace;
        background: #000;
        color: hsl(${baseHue}, 100%, 50%);
        margin: 20px;
        line-height: 1.4;
      }
      .living-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      .section {
        margin: 20px 0;
        padding: 15px;
        border: 2px solid;
        border-radius: ${digitalRoot(this.evolution)}px;
      }
      .data {
        font-family: 'Courier New', monospace;
        background: #111;
        padding: 10px;
        margin: 10px 0;
      }
      .evolution-display {
        font-size: 1.5em;
        color: hsl(${(baseHue + 120) % 360}, 100%, 50%);
        text-align: center;
        margin: 20px 0;
      }
      button {
        background: #000;
        color: hsl(${baseHue}, 100%, 50%);
        border: 1px solid hsl(${baseHue}, 100%, 50%);
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
      }
      button:hover {
        background: hsl(${baseHue}, 100%, 50%);
        color: #000;
      }
    `;
  }

  // Generate scripts from mathematics
  private generateScripts(): string {
    return `
      let generationInterval = null;
      
      function toggleGeneration() {
        if (generationInterval) {
          clearInterval(generationInterval);
          generationInterval = null;
        } else {
          generationInterval = setInterval(refreshUI, ${432 + (this.evolution % 100)});
        }
      }
      
      function refreshUI() {
        window.location.reload();
      }
      
      // Auto-generate every ${432 + (this.evolution % 100)}ms
      setTimeout(() => {
        if (!generationInterval) {
          toggleGeneration();
        }
      }, ${432 + (this.evolution % 100)});
    `;
  }

  // Generate color from mathematics
  private generateColor(digit: number): string {
    const hue = (digit * 60 + this.evolution * 10) % 360;
    return `hsl(${hue}, 100%, 50%)`;
  }

  // Start UI generation
  start(): void {
    console.log('🎨 Living A432 UI Starting...');
    this.isGenerating = true;
    this.generationTimer = setInterval(() => {
      if (this.isGenerating) {
        this.evolve();
      }
    }, 432);
  }

  // Stop UI generation
  stop(): void {
    console.log('🎨 Living A432 UI Stopping...');
    this.isGenerating = false;
    if (this.generationTimer) {
      clearInterval(this.generationTimer);
      this.generationTimer = null;
    }
  }

  // Evolve the UI
  private evolve(): void {
    this.evolution++;
  }

  // Get current UI
  getCurrentUI(): string {
    return this.generateUI();
  }

  // Get UI status
  getStatus(): any {
    return {
      isGenerating: this.isGenerating,
      evolution: this.evolution,
      ui: this.getCurrentUI(),
      timestamp: Date.now()
    };
  }
}

// Export living UI instance
export const livingA432UI = new LivingA432UI();

// Export UI generator function
export function generateLivingUI(): string {
  return livingA432UI.getCurrentUI();
}

// Export UI status function
export function getLivingUIStatus(): any {
  return livingA432UI.getStatus();
} 