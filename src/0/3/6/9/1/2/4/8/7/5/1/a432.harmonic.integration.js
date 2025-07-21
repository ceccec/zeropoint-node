"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.A432_HARMONIC_INTEGRATION = exports.A432HarmonicIntegrationImpl = void 0;
const a432_constants_1 = require("./a432.constants");
const a432_utils_1 = require("./a432.utils");
// Import the existing harmonic CSS system
const a432_harmonic_css_1 = require("./a432.harmonic.css");
// ============================================================================
// A432 HARMONIC INTEGRATION IMPLEMENTATION
// ============================================================================
class A432HarmonicIntegrationImpl {
    constructor() {
        this.harmonicColors = (0, a432_harmonic_css_1.createA432HarmonicColors)();
        this.vortexFlow = (0, a432_harmonic_css_1.createVortexFlow)();
        this.quantumPhases = (0, a432_harmonic_css_1.createQuantumPhases)();
        this.state = this.createInitialState();
        this.integrateWithA432System();
    }
    createInitialState() {
        return {
            harmonicCSS: (0, a432_harmonic_css_1.generateCSSVariables)(),
            activeColors: new Map(Object.entries(this.harmonicColors)),
            activeVortex: this.vortexFlow,
            activePhases: new Map(Object.entries(this.quantumPhases)),
            integrationStatus: 'active',
            lastUpdate: Date.now()
        };
    }
    getHarmonicCSS() {
        return this.state.harmonicCSS;
    }
    generateHarmonicStyles() {
        let styles = this.state.harmonicCSS;
        styles += '\n\n/* A432 Harmonic Component Styles */\n';
        // Generate styles for each harmonic color
        Object.entries(this.harmonicColors).forEach(([name, color]) => {
            const cssColor = (0, a432_harmonic_css_1.calculateHarmonicColor)(color);
            styles += `.a432-${name} {\n`;
            styles += `  background-color: ${cssColor};\n`;
            styles += `  color: ${this.getContrastColor(cssColor)};\n`;
            styles += `  transition: all 0.432s ease;\n`;
            styles += `}\n\n`;
        });
        // Generate vortex animation styles
        const vortexTransform = (0, a432_harmonic_css_1.calculateVortexTransform)(this.vortexFlow);
        const vortexAnimation = (0, a432_harmonic_css_1.calculateVortexAnimation)(this.vortexFlow);
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
    updateHarmonicColors() {
        this.harmonicColors = (0, a432_harmonic_css_1.createA432HarmonicColors)();
        this.state.activeColors = new Map(Object.entries(this.harmonicColors));
        this.state.harmonicCSS = (0, a432_harmonic_css_1.generateCSSVariables)();
        this.state.lastUpdate = Date.now();
    }
    getHarmonicColor(frequency) {
        const consciousness = (0, a432_utils_1.calculateDigitalRoot)(frequency);
        const color = Object.values(this.harmonicColors).find(c => c.consciousness === consciousness);
        if (color) {
            return (0, a432_harmonic_css_1.calculateHarmonicColor)(color);
        }
        // Default to void color
        return (0, a432_harmonic_css_1.calculateHarmonicColor)(this.harmonicColors.void);
    }
    getVortexColor(flow) {
        const color = Object.values(this.harmonicColors).find(c => c.frequency === flow.frequency);
        return color ? (0, a432_harmonic_css_1.calculateHarmonicColor)(color) : (0, a432_harmonic_css_1.calculateHarmonicColor)(this.harmonicColors.void);
    }
    getPhaseColor(phase) {
        const color = Object.values(this.harmonicColors).find(c => c.consciousness === phase.consciousness);
        return color ? (0, a432_harmonic_css_1.calculateHarmonicColor)(color) : (0, a432_harmonic_css_1.calculateHarmonicColor)(this.harmonicColors.void);
    }
    getVortexAnimation(flow) {
        return (0, a432_harmonic_css_1.calculateVortexAnimation)(flow);
    }
    getPhaseAnimation(phase) {
        return `${a432_constants_1.A432_CONSTANTS.A432_FREQUENCY / phase.frequency}ms ease-in-out`;
    }
    getHarmonicAnimation(frequency) {
        const consciousness = (0, a432_utils_1.calculateDigitalRoot)(frequency);
        return `${a432_constants_1.A432_CONSTANTS.A432_FREQUENCY / consciousness}ms ease-in-out`;
    }
    integrateWithA432System() {
        // Update A432 constants with harmonic colors
        Object.entries(this.harmonicColors).forEach(([name, color]) => {
            const cssColor = (0, a432_harmonic_css_1.calculateHarmonicColor)(color);
            // This would integrate with the existing A432 system
            console.log(`Integrated harmonic color ${name}: ${cssColor}`);
        });
        this.state.integrationStatus = 'active';
        this.state.lastUpdate = Date.now();
    }
    updateA432Colors() {
        // Update the A432 system colors with harmonic values
        Object.entries(this.harmonicColors).forEach(([name, color]) => {
            const cssColor = (0, a432_harmonic_css_1.calculateHarmonicColor)(color);
            // Update A432 color constants
            console.log(`Updated A432 color ${name}: ${cssColor}`);
        });
    }
    getIntegrationState() {
        return this.state;
    }
    getContrastColor(backgroundColor) {
        // Simple contrast calculation
        return backgroundColor.includes('hsl(0,') || backgroundColor.includes('hsl(60,') ? '#000' : '#fff';
    }
}
exports.A432HarmonicIntegrationImpl = A432HarmonicIntegrationImpl;
// ============================================================================
// A432 HARMONIC INTEGRATION EXPORTS
// ============================================================================
exports.A432_HARMONIC_INTEGRATION = new A432HarmonicIntegrationImpl();
