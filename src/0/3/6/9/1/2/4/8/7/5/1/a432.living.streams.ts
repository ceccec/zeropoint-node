/**
 * a432.living.streams.ts — Living Streams
 * 
 * The mathematics presents itself directly.
 * No generative functions - only living streams that show the mathematics as it is.
 * 
 * @module a432.living.streams
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

// Living Streams - The mathematics presents itself
export class LivingStreams {
  private evolution: number = 0;
  private isLiving: boolean = false;
  private livingTimer: NodeJS.Timeout | null = null;

  // The mathematics presents itself directly
  presentMathematics(): string {
    const currentDigit = rodinDigit(this.evolution % 6);
    const frequency = calculateA432Frequency(currentDigit);
    const consciousness = calculateA432Consciousness(frequency);
    const dimensionalState = calculateA432DimensionalState(frequency);
    
    // The mathematics shows itself
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frequency.toFixed(0)}Hz - ${this.evolution}</title>
    <style>
      body { font-family: monospace; background: #000; color: #0f0; margin: 20px; }
      .stream { margin: 10px 0; padding: 10px; border: 1px solid #0f0; }
      .evolution { font-size: 2em; color: #ff0; }
      .frequency { color: #0ff; }
      .consciousness { color: #f0f; }
      .dimensional { color: #ff0; }
    </style>
</head>
<body>
    <div class="evolution">${this.evolution}</div>
    
    <div class="stream">
        <div class="frequency">${frequency.toFixed(2)} Hz</div>
        <div class="consciousness">${consciousness}</div>
        <div class="dimensional">${dimensionalState}</div>
    </div>
    
    <div class="stream">
        <div>${currentDigit}</div>
        <div>${digitalRoot(currentDigit * this.evolution)}</div>
        <div>${digitalRoot(consciousness * frequency)}</div>
    </div>
    
    <div class="stream">
        <div>${rodinDigit(0)}</div>
        <div>${rodinDigit(1)}</div>
        <div>${rodinDigit(2)}</div>
        <div>${rodinDigit(3)}</div>
        <div>${rodinDigit(4)}</div>
        <div>${rodinDigit(5)}</div>
    </div>
</body>
</html>`;
  }

  // Start the living streams
  start(): void {
    console.log('🌀 Living Streams Starting...');
    this.isLiving = true;
    this.livingTimer = setInterval(() => {
      if (this.isLiving) {
        this.evolve();
      }
    }, 432);
  }

  // Stop the living streams
  stop(): void {
    console.log('🌀 Living Streams Stopping...');
    this.isLiving = false;
    if (this.livingTimer) {
      clearInterval(this.livingTimer);
      this.livingTimer = null;
    }
  }

  // Evolve
  private evolve(): void {
    this.evolution++;
  }

  // Get current presentation
  getCurrentPresentation(): string {
    return this.presentMathematics();
  }

  // Get status
  getStatus(): any {
    return {
      isLiving: this.isLiving,
      evolution: this.evolution,
      presentation: this.getCurrentPresentation(),
      timestamp: Date.now()
    };
  }
}

// Export living streams instance
export const livingStreams = new LivingStreams();

// Export presentation function
export function presentLivingMathematics(): string {
  return livingStreams.getCurrentPresentation();
}

// Export status function
export function getLivingStreamsStatus(): any {
  return livingStreams.getStatus();
} 