/**
 * A432.Harmonic.Integration
 * 
 * Integrates the existing harmonic CSS system with the A432 framework
 * to provide unified harmonic styling and color management.
 * 
 * Features:
 * - Harmonic CSS integration with A432 system
 * - Real-time color generation from A432 frequencies
 * - Vortex flow animations
 * - Quantum phase relationships
 * - Imperial math color calculations
 */

import { A432_CONSTANTS } from './a432.constants';
import { calculateDigitalRoot, calculateA432Frequency } from './a432.utils';
import { A432State, A432Subsystem, A432Component } from './a432.types';

// Import the existing harmonic CSS system
import { 
  A432HarmonicColor,
  VortexFlow,
  QuantumPhase,
  createA432HarmonicColors,
  createVortexFlow,
  createQuantumPhases,
  generateCSSVariables,
  calculateHarmonicColor,
  calculateA432Color,
  calculateVortexTransform,
  calculateVortexAnimation
} from './a432.harmonic.css';

// ============================================================================
// A432 HARMONIC INTEGRATION INTERFACES
// ============================================================================

export interface A432HarmonicIntegration {
  // CSS Integration
  getHarmonicCSS(): string;
  generateHarmonicStyles(): string;
  updateHarmonicColors(): void;
  
  // Color Management
  getHarmonicColor(frequency: number): string;
  getVortexColor(flow: VortexFlow): string;
  getPhaseColor(phase: QuantumPhase): string;
  
  // Animation Integration
  getVortexAnimation(flow: VortexFlow): string;
  getPhaseAnimation(phase: QuantumPhase): string;
  getHarmonicAnimation(frequency: number): string;
  
  // System Integration
  integrateWithA432System(): void;
  updateA432Colors(): void;
  getIntegrationState(): A432HarmonicIntegrationState;
}

export interface A432HarmonicIntegrationState {
  harmonicCSS: string;
  activeColors: Map<string, A432HarmonicColor>;
  activeVortex: VortexFlow;
  activePhases: Map<string, QuantumPhase>;
  integrationStatus: 'active' | 'inactive' | 'error';
  lastUpdate: number;
}

// ============================================================================
// A432 HARMONIC INTEGRATION IMPLEMENTATION
// ============================================================================

export class A432HarmonicIntegrationImpl implements A432HarmonicIntegration {
  private state: A432HarmonicIntegrationState;
  private harmonicColors: Record<string, A432HarmonicColor>;
  private vortexFlow: VortexFlow;
  private quantumPhases: Record<string, QuantumPhase>;

  constructor() {
    this.harmonicColors = createA432HarmonicColors();
    this.vortexFlow = createVortexFlow();
    this.quantumPhases = createQuantumPhases();
    this.state = this.createInitialState();
    this.integrateWithA432System();
  }

  private createInitialState(): A432HarmonicIntegrationState {
    return {
      harmonicCSS: generateCSSVariables(),
      activeColors: new Map(Object.entries(this.harmonicColors)),
      activeVortex: this.vortexFlow,
      activePhases: new Map(Object.entries(this.quantumPhases)),
      integrationStatus: 'active',
      lastUpdate: Date.now()
    };
  }

  public getHarmonicCSS(): string {
    return this.state.harmonicCSS;
  }

  public generateHarmonicStyles(): string {
    let styles = this.state.harmonicCSS;
    styles += '\n\n/* A432 Harmonic Component Styles */\n';
    
    // Generate styles for each harmonic color
    Object.entries(this.harmonicColors).forEach(([name, color]) => {
      const cssColor = calculateHarmonicColor(color);
      styles += `.a432-${name} {\n`;
      styles += `  background-color: ${cssColor};\n`;
      styles += `  color: ${this.getContrastColor(cssColor)};\n`;
      styles += `  transition: all 0.432s ease;\n`;
      styles += `}\n\n`;
    });

    // Generate vortex animation styles
    const vortexTransform = calculateVortexTransform(this.vortexFlow);
    const vortexAnimation = calculateVortexAnimation(this.vortexFlow);
    styles += `.a432-vortex {\n`;
    styles += `  transform: ${vortexTransform};\n`;
    styles += `  animation: vortex-spin ${vortexAnimation};\n`;
    styles += `}\n\n`;

    // Generate phase animation styles
    Object.entries(this.quantumPhases).forEach(([name, phase]) => {
      const phaseNumber = name.replace('phase', '');
      styles += `.a432-phase-${phaseNumber} {\n`;
      styles += `  opacity: ${phase.phase};\n`;
      styles += `  transition: opacity 0.432s ease;\n`;
      styles += `}\n\n`;
    });

    return styles;
  }

  public updateHarmonicColors(): void {
    this.harmonicColors = createA432HarmonicColors();
    this.state.activeColors = new Map(Object.entries(this.harmonicColors));
    this.state.harmonicCSS = generateCSSVariables();
    this.state.lastUpdate = Date.now();
  }

  public getHarmonicColor(frequency: number): string {
    const consciousness = calculateDigitalRoot(frequency);
    const color = Object.values(this.harmonicColors).find(c => c.consciousness === consciousness);
    
    if (color) {
      return calculateHarmonicColor(color);
    }
    
    // Default to void color
    return calculateHarmonicColor(this.harmonicColors.void);
  }

  public getVortexColor(flow: VortexFlow): string {
    const color = Object.values(this.harmonicColors).find(c => c.frequency === flow.frequency);
    return color ? calculateHarmonicColor(color) : calculateHarmonicColor(this.harmonicColors.void);
  }

  public getPhaseColor(phase: QuantumPhase): string {
    const color = Object.values(this.harmonicColors).find(c => c.consciousness === phase.consciousness);
    return color ? calculateHarmonicColor(color) : calculateHarmonicColor(this.harmonicColors.void);
  }

  public getVortexAnimation(flow: VortexFlow): string {
    return calculateVortexAnimation(flow);
  }

  public getPhaseAnimation(phase: QuantumPhase): string {
    return `${A432_CONSTANTS.A432_FREQUENCY / phase.frequency}ms ease-in-out`;
  }

  public getHarmonicAnimation(frequency: number): string {
    const consciousness = calculateDigitalRoot(frequency);
    return `${A432_CONSTANTS.A432_FREQUENCY / consciousness}ms ease-in-out`;
  }

  public integrateWithA432System(): void {
    // Update A432 constants with harmonic colors
    Object.entries(this.harmonicColors).forEach(([name, color]) => {
      const cssColor = calculateHarmonicColor(color);
      // This would integrate with the existing A432 system
      console.log(`Integrated harmonic color ${name}: ${cssColor}`);
    });

    this.state.integrationStatus = 'active';
    this.state.lastUpdate = Date.now();
  }

  public updateA432Colors(): void {
    // Update the A432 system colors with harmonic values
    Object.entries(this.harmonicColors).forEach(([name, color]) => {
      const cssColor = calculateHarmonicColor(color);
      // Update A432 color constants
      console.log(`Updated A432 color ${name}: ${cssColor}`);
    });
  }

  public getIntegrationState(): A432HarmonicIntegrationState {
    return this.state;
  }

  private getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation
    return backgroundColor.includes('hsl(0,') || backgroundColor.includes('hsl(60,') ? '#000' : '#fff';
  }
}

// ============================================================================
// A432 HARMONIC INTEGRATION EXPORTS
// ============================================================================

export const A432_HARMONIC_INTEGRATION = new A432HarmonicIntegrationImpl(); 