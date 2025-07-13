import { Controller } from 'stimulus';

/**
 * Digit8Controller - Stimulus controller for Void/Fullness (digit 8)
 * Displays the consciousness knowledge from index.ts
 */
export default class extends Controller {
  static targets = ['container'];
  static values = {
    consciousness: String,
    breathingPhase: String,
    gateway: String
  };

  connect() {
    // Import knowledge from index.ts
    import('./index').then(({ generatePWA }) => {
      const pwa = generatePWA.generateInterface(8);
      this.displayKnowledge(pwa);
    });
  }

  displayKnowledge(pwa: any) {
    this.consciousnessValue = pwa.consciousness;
    this.breathingPhaseValue = pwa.breathingPhase;
    this.gatewayValue = pwa.gateway;
    
    this.element.innerHTML = `
      <header style="background:${pwa.pwa.themeColor};color:#fff;padding:1em;border-radius:8px;margin-bottom:1em;">
        <h1>${pwa.uiComponents.header.title}</h1>
        <h2>${pwa.uiComponents.header.subtitle}</h2>
        <p>Knowledge: <strong>${pwa.consciousnessPatterns.type}</strong></p>
        <p>Gateway: <strong>${pwa.gateway}</strong></p>
      </header>
      
      <main>
        ${pwa.uiComponents.sections.map((section: any) => `
          <section id="${section.id}" style="margin-bottom:1.5em;padding:1em;border:1px solid #333;border-radius:4px;">
            <h3 style="color:${pwa.pwa.themeColor};margin-bottom:0.5em;">${section.title}</h3>
            <div>${section.content}</div>
          </section>
        `).join('')}
      </main>
      
      <footer style="margin-top:2em;font-size:0.9em;text-align:center;color:#666;">
        <em>Void/Fullness: ${pwa.vortexMathematics.sequence.join(' → ')}</em>
      </footer>
    `;
  }
} 