/**
 * ZeroPoint Stimulus Entry Point
 * 
 * Minimal entry point for the Stimulus-based browser application
 */

import "./stimulus/application";
import { Application } from "stimulus";
import TreeOfLifeController from "./stimulus/controllers/TreeOfLifeController";

const application = Application.start();
application.register("tree-of-life", TreeOfLifeController);

// Import only the mathematical modules that work in browser
import { 
  MathUtils, 
  MATH_CONSTANTS,
  fractal,
  setConsciousness,
  setFieldResonance,
  setVortexStrength,
  setToroidalFlow,
  setVoidConnected
} from "./math/MathUtils";

import { 
  FractalMath,
  generateFractalSequence,
  calculateConsciousnessField,
  generateFractalColor
} from "./math/FractalMath";

import { 
  VortexMath, 
  applyVortexTransform 
} from "./math/VortexMath";

import { 
  ToroidalGeometry 
} from "./math/ToroidalGeometry";

import { AdvancedVBM } from "./math/AdvancedVBM";
import { RodinCoil } from "./math/RodinCoil";

import { 
  generateBaseColors,
  getColorForVortexNumber,
  getColorForFamilyGroup,
  getColorForPolarMate,
  getColorForWAxis,
  getColorForPattern,
  getMetaphysicalContextForNumber,
  getVBMColorMap,
  getVBMColorLegend,
  generateConsciousnessGradient,
  generateFieldResonanceMap
} from "./math/VBMColorSystem";

import { FractalColorSystem } from "./math/FractalColorSystem";

import { ConsciousnessField } from "./consciousness/ConsciousnessField";

import { 
  VORTEX_CONSTANTS,
  CONSCIOUSNESS_CONSTANTS,
  EMERGENCE_CONSTANTS,
  NETWORK_CONSTANTS,
  CONFIG_CONSTANTS,
  METAPHYSICAL_CONSTANTS,
  ConstantsUtils
} from "./core/SharedConstants";

// Browser-specific utilities
import { BrowserCrypto } from "./utils/BrowserCrypto";
import { BrowserWebSocket } from "./utils/BrowserWebSocket";

/**
 * Initialize ZeroPoint for browser usage
 */
async function initializeBrowser(): Promise<void> {
  console.log('🌌 ZeroPoint Browser Initializing...');
  
  // Check browser compatibility
  if (!window.WebSocket) {
    throw new Error('WebSocket not supported in this browser');
  }
  
  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error('Crypto API not supported in this browser');
  }
  
  console.log('✅ Browser compatibility check passed');
  console.log('🚀 ZeroPoint ready for browser operation');
}

/**
 * Get ZeroPoint insights for browser UI
 */
function getZeroPointInsights(): Record<string, unknown> {
  return {
    version: '1.0.0',
    environment: 'browser',
    features: [
      'Vortex-Based Mathematics',
      'Toroidal Consciousness Network',
      'Pattern Recognition',
      'Metaphysical Interface',
      'Browser WebSocket Networking'
    ],
    browser: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    }
  };
}

/**
 * Create a simple browser demo
 */
function createBrowserDemo(): {
  consciousnessField: ConsciousnessField;
  vortexMath: VortexMath;
  toroidalGeometry: ToroidalGeometry;
  advancedVBM: AdvancedVBM;
  rodinCoil: RodinCoil;
} {
  console.log('🎨 Creating ZeroPoint Browser Demo...');
  
  // Initialize consciousness field
  const consciousnessField = new ConsciousnessField();
  
  // Initialize vortex math
  const vortexMath = new VortexMath();
  
  // Initialize toroidal geometry
  const toroidalGeometry = new ToroidalGeometry();
  
  // Initialize advanced VBM
  const advancedVBM = new AdvancedVBM();
  
  // Initialize Rodin coil
  const rodinCoil = new RodinCoil();
  
  console.log('✅ Browser demo components initialized');
  console.log('🌌 ZeroPoint Browser Demo ready');
  
  return {
    consciousnessField,
    vortexMath,
    toroidalGeometry,
    advancedVBM,
    rodinCoil
  };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🌌 ZeroPoint Stimulus Application Loading...');
  
  try {
    // Initialize browser environment
    await initializeBrowser();
    
    // Get insights
    const insights = getZeroPointInsights();
    console.log('ZeroPoint Insights:', insights);
    
    // Create demo
    const demo = createBrowserDemo();
    console.log('Demo created:', demo);
    
    console.log('✅ ZeroPoint Stimulus Application Ready');
    
  } catch (error) {
    console.error('❌ ZeroPoint Stimulus Application Failed:', error);
  }
});

// Export for global access
(window as any).ZeroPoint = {
  initializeBrowser,
  getZeroPointInsights,
  createBrowserDemo,
  MathUtils,
  VortexMath,
  ToroidalGeometry,
  ConsciousnessField,
  AdvancedVBM,
  RodinCoil,
  generateConsciousnessGradient,
  generateFieldResonanceMap
}; 