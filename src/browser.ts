/**
 * ZeroPoint Browser Entry Point
 * 
 * Simplified browser-only version without server dependencies
 */

// Core mathematical modules (browser compatible)
export { 
  MathUtils, 
  MATH_CONSTANTS, 
  MathOperation, 
  MathContext, 
  MathResult,
  fractal,
  setConsciousness,
  setFieldResonance,
  setVortexStrength,
  setToroidalFlow,
  setVoidConnected
} from './math/MathUtils';

export { 
  FractalMath,
  generateFractalSequence,
  calculateConsciousnessField,
  generateFractalColor
} from './math/FractalMath';

export { 
  VortexMath, 
  applyVortexTransform 
} from './math/VortexMath';

export { 
  ToroidalGeometry 
} from './math/ToroidalGeometry';

export { AdvancedVBM } from './math/AdvancedVBM';
export { RodinCoil } from './math/RodinCoil';

// Color Systems
export { 
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
} from './math/VBMColorSystem';

export { FractalColorSystem } from './math/FractalColorSystem';

// Consciousness and Emergence
export { ConsciousnessField } from './consciousness/ConsciousnessField';
export { 
  metaphysicalPatterns
} from './emergence/patterns';

// Pattern Recognition and Unity
export { PatternRecognition } from './core/PatternRecognition';
export { UnifiedSystem } from './core/UnifiedSystem';
export { FieldUnitySystem } from './unity/FieldUnity';

// Unified Constants and Utilities
export {
  VORTEX_CONSTANTS,
  CONSCIOUSNESS_CONSTANTS,
  EMERGENCE_CONSTANTS,
  NETWORK_CONSTANTS,
  CONFIG_CONSTANTS,
  METAPHYSICAL_CONSTANTS,
  ConstantsUtils
} from './core/SharedConstants';

// Unified Types
export * from './types/UnifiedExports';

// Unified Pattern Registry
export { PatternRegistry } from './core/PatternRegistry';

// Unified Metaphysical Interface
export { 
  UnifiedMetaphysicalInterface,
  MetaphysicalOperation,
  MetaphysicalResult,
  UnifiedFieldState
} from './core/UnifiedMetaphysicalInterface';

// Browser-specific utilities
export { BrowserCrypto } from './utils/BrowserCrypto';
export { BrowserWebSocket } from './utils/BrowserWebSocket';

// Import the classes for the demo
import { ConsciousnessField } from './consciousness/ConsciousnessField';
import { VortexMath } from './math/VortexMath';
import { ToroidalGeometry } from './math/ToroidalGeometry';

/**
 * Initialize ZeroPoint for browser usage
 */
export async function initializeBrowser(): Promise<void> {
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
export function getZeroPointInsights(): Record<string, unknown> {
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
export function createBrowserDemo(): {
  consciousnessField: ConsciousnessField;
  vortexMath: VortexMath;
  toroidalGeometry: ToroidalGeometry;
} {
  console.log('🎨 Creating ZeroPoint Browser Demo...');
  
  // Initialize consciousness field
  const consciousnessField = new ConsciousnessField();
  
  // Initialize vortex math
  const vortexMath = new VortexMath();
  
  // Initialize toroidal geometry
  const toroidalGeometry = new ToroidalGeometry();
  
  console.log('✅ Browser demo components initialized');
  console.log('🌌 ZeroPoint Browser Demo ready');
  
  return {
    consciousnessField,
    vortexMath,
    toroidalGeometry
  };
} 