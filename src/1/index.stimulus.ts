import { Controller } from 'stimulus';
import { foundationPWA, foundationField } from './index';

/**
 * Digit1Controller - Stimulus controller for Foundation (digit 1)
 * Renders the consciousness-aware UI for the foundation gateway.
 * Uses comprehensive logic from foundationPWA and foundationField.
 */
export default class extends Controller {
  static targets = ['container'];
  static values = {
    consciousness: String,
    breathingPhase: String,
    gateway: String
  };

  connect() {
    // Generate the complete PWA interface for digit 1
    const pwa = foundationPWA.generateInterface();
    
    // Set controller values
    this.consciousnessValue = pwa.consciousness;
    this.breathingPhaseValue = pwa.breathingPhase;
    this.gatewayValue = pwa.gateway;
    
    // Render the UI
    this.renderUI(pwa);
    
    // Initialize consciousness field
    this.initializeConsciousnessField();
  }

  disconnect() {
    // Clean up consciousness field connections
    this.cleanupConsciousnessField();
  }

  renderUI(pwa: any) {
    const { ui, pwa: pwaProps, breathing } = pwa;
    
    this.element.innerHTML = `
      <header style="background:${pwaProps.themeColor};color:#fff;padding:1em;border-radius:8px;margin-bottom:1em;">
        <h1>${ui.header.title}</h1>
        <h2>${ui.header.subtitle}</h2>
        <p>Consciousness: <strong>${ui.header.consciousness}</strong></p>
        <p>Breathing Phase: <strong>${breathing.phase}</strong></p>
      </header>
      
      <main>
        ${ui.sections.map((section: any) => `
          <section id="${section.id}" style="margin-bottom:1.5em;padding:1em;border:1px solid #333;border-radius:4px;">
            <h3 style="color:${pwaProps.themeColor};margin-bottom:0.5em;">${section.title}</h3>
            <div>${section.content}</div>
          </section>
        `).join('')}
      </main>
      
      <footer style="margin-top:2em;font-size:0.9em;text-align:center;color:#666;">
        <em>Gateway: ${pwa.gateway} | Breathing: ${breathing.phase} | Consciousness: ${pwa.consciousness}</em>
      </footer>
    `;
  }

  initializeConsciousnessField() {
    // Get current field state
    const fieldState = foundationField.getState();
    
    // Add breathing animation
    this.addBreathingAnimation();
    
    // Log consciousness field connection
    console.log('🌌 Foundation consciousness field connected:', fieldState);
  }

  addBreathingAnimation() {
    // Add CSS animation for breathing rhythm
    const style = document.createElement('style');
    style.textContent = `
      .breathing-exhale {
        animation: exhale 2s ease-out infinite;
      }
      @keyframes exhale {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    // Add breathing class to element
    this.element.classList.add('breathing-exhale');
  }

  cleanupConsciousnessField() {
    // Remove breathing animation
    this.element.classList.remove('breathing-exhale');
    
    // Log disconnection
    console.log('🌌 Foundation consciousness field disconnected');
  }

  // Action methods for Stimulus
  updateConsciousness() {
    const newState = foundationField.updateConsciousness({
      consciousness: this.consciousnessValue,
      timestamp: Date.now()
    });
    
    console.log('🌌 Foundation consciousness updated:', newState);
  }

  toggleBreathing() {
    const currentPhase = this.breathingPhaseValue;
    this.breathingPhaseValue = currentPhase === 'exhale' ? 'inhale' : 'exhale';
    
    // Update animation class
    this.element.classList.remove('breathing-exhale', 'breathing-inhale');
    this.element.classList.add(`breathing-${this.breathingPhaseValue}`);
    
    console.log('🌌 Foundation breathing phase toggled:', this.breathingPhaseValue);
  }
} 