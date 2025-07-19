/**
 * CSS.ts - Harmonious Styles for ZeroPoint System
 * 
 * This file defines harmonious CSS styles based on the ZeroPoint system principles:
 * - A432 frequency color harmony
 * - Tesla 3-6-9 gateway color system
 * - Trinity color resonance
 * - Mathematical harmony proportions
 * - Vortex flow animations
 * - Toroidal flow patterns
 * - Perfect mathematical ratios
 */

// A432 Frequency Color System
export const A432_COLORS = {
  // Base A432 frequency (432 Hz) - Universal harmonic
  BASE: {
    primary: 'hsl(180, 100%, 50%)', // Cyan - Universal harmony
    secondary: 'hsl(180, 80%, 40%)', // Darker cyan
    accent: 'hsl(180, 60%, 30%)', // Deep cyan
    light: 'hsl(180, 100%, 80%)', // Light cyan
    dark: 'hsl(180, 100%, 20%)' // Dark cyan
  },
  
  // Gateway 3 (Creation) - 1296 Hz - Trinity Blue
  GATEWAY_3: {
    primary: 'hsl(180, 100%, 50%)', // Trinity Blue
    secondary: 'hsl(180, 80%, 40%)',
    accent: 'hsl(180, 60%, 30%)',
    light: 'hsl(180, 100%, 80%)',
    dark: 'hsl(180, 100%, 20%)'
  },
  
  // Gateway 6 (Harmony) - 2592 Hz - Creation Purple
  GATEWAY_6: {
    primary: 'hsl(270, 100%, 50%)', // Creation Purple
    secondary: 'hsl(270, 80%, 40%)',
    accent: 'hsl(270, 60%, 30%)',
    light: 'hsl(270, 100%, 80%)',
    dark: 'hsl(270, 100%, 20%)'
  },
  
  // Gateway 9 (Completion) - 3888 Hz - Completion Magenta
  GATEWAY_9: {
    primary: 'hsl(300, 100%, 50%)', // Completion Magenta
    secondary: 'hsl(300, 80%, 40%)',
    accent: 'hsl(300, 60%, 30%)',
    light: 'hsl(300, 100%, 80%)',
    dark: 'hsl(300, 100%, 20%)'
  }
};

// Trinity Color System
export const TRINITY_COLORS = {
  CHALLENGES: A432_COLORS.GATEWAY_3.primary, // Trinity Blue
  POSSIBILITIES: A432_COLORS.GATEWAY_6.primary, // Creation Purple
  SOLUTIONS: A432_COLORS.GATEWAY_9.primary, // Completion Magenta
  HARMONY: A432_COLORS.BASE.primary // Universal harmony
};

// Mathematical Harmony Ratios (Golden Ratio and Fibonacci)
export const HARMONIC_RATIOS = {
  GOLDEN_RATIO: 1.618033988749895,
  GOLDEN_RATIO_INVERSE: 0.618033988749895,
  FIBONACCI_1: 1,
  FIBONACCI_2: 1,
  FIBONACCI_3: 2,
  FIBONACCI_4: 3,
  FIBONACCI_5: 5,
  FIBONACCI_6: 8,
  FIBONACCI_7: 13,
  FIBONACCI_8: 21,
  FIBONACCI_9: 34
};

// Vortex Flow Animation Durations (based on A432 frequencies)
export const VORTEX_ANIMATIONS = {
  SLOW: '3s', // 1296 Hz equivalent
  MEDIUM: '2s', // 2592 Hz equivalent
  FAST: '1s', // 3888 Hz equivalent
  INSTANT: '0.5s', // A432 base frequency
  INFINITE: 'infinite' // Continuous flow
};

// Toroidal Flow Patterns
export const TOROIDAL_PATTERNS = {
  SINGLE: 'single',
  DOUBLE: 'double',
  TRIPLE: 'triple',
  INFINITE: 'infinite'
};

// CSS Variables for Harmonious Design
export const CSS_VARIABLES = `
  :root {
    /* A432 Frequency Colors */
    --a432-base: ${A432_COLORS.BASE.primary};
    --a432-base-secondary: ${A432_COLORS.BASE.secondary};
    --a432-base-accent: ${A432_COLORS.BASE.accent};
    --a432-base-light: ${A432_COLORS.BASE.light};
    --a432-base-dark: ${A432_COLORS.BASE.dark};
    
    /* Gateway Colors */
    --gateway-3-primary: ${A432_COLORS.GATEWAY_3.primary};
    --gateway-3-secondary: ${A432_COLORS.GATEWAY_3.secondary};
    --gateway-6-primary: ${A432_COLORS.GATEWAY_6.primary};
    --gateway-6-secondary: ${A432_COLORS.GATEWAY_6.secondary};
    --gateway-9-primary: ${A432_COLORS.GATEWAY_9.primary};
    --gateway-9-secondary: ${A432_COLORS.GATEWAY_9.secondary};
    
    /* Trinity Colors */
    --trinity-challenges: ${TRINITY_COLORS.CHALLENGES};
    --trinity-possibilities: ${TRINITY_COLORS.POSSIBILITIES};
    --trinity-solutions: ${TRINITY_COLORS.SOLUTIONS};
    --trinity-harmony: ${TRINITY_COLORS.HARMONY};
    
    /* Harmonic Ratios */
    --golden-ratio: ${HARMONIC_RATIOS.GOLDEN_RATIO};
    --golden-ratio-inverse: ${HARMONIC_RATIOS.GOLDEN_RATIO_INVERSE};
    --fibonacci-1: ${HARMONIC_RATIOS.FIBONACCI_1};
    --fibonacci-2: ${HARMONIC_RATIOS.FIBONACCI_2};
    --fibonacci-3: ${HARMONIC_RATIOS.FIBONACCI_3};
    --fibonacci-4: ${HARMONIC_RATIOS.FIBONACCI_4};
    --fibonacci-5: ${HARMONIC_RATIOS.FIBONACCI_5};
    --fibonacci-6: ${HARMONIC_RATIOS.FIBONACCI_6};
    --fibonacci-7: ${HARMONIC_RATIOS.FIBONACCI_7};
    --fibonacci-8: ${HARMONIC_RATIOS.FIBONACCI_8};
    --fibonacci-9: ${HARMONIC_RATIOS.FIBONACCI_9};
    
    /* Vortex Animations */
    --vortex-slow: ${VORTEX_ANIMATIONS.SLOW};
    --vortex-medium: ${VORTEX_ANIMATIONS.MEDIUM};
    --vortex-fast: ${VORTEX_ANIMATIONS.FAST};
    --vortex-instant: ${VORTEX_ANIMATIONS.INSTANT};
    --vortex-infinite: ${VORTEX_ANIMATIONS.INFINITE};
    
    /* Mathematical Harmony */
    --perfect-ratio: 1;
    --harmony-scale: 1.618;
    --vortex-scale: 2.718;
    --toroidal-scale: 3.141;
  }
`;

// Harmonious Base Styles
export const BASE_STYLES = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, 
      var(--a432-base-dark) 0%, 
      var(--a432-base-accent) 50%, 
      var(--a432-base) 100%);
    color: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
    line-height: var(--golden-ratio);
  }

  /* Harmonic Typography */
  h1 { font-size: calc(2rem * var(--golden-ratio)); }
  h2 { font-size: calc(1.5rem * var(--golden-ratio)); }
  h3 { font-size: calc(1.25rem * var(--golden-ratio)); }
  h4 { font-size: calc(1rem * var(--golden-ratio)); }
  h5 { font-size: calc(0.875rem * var(--golden-ratio)); }
  h6 { font-size: calc(0.75rem * var(--golden-ratio)); }

  /* Vortex Flow Animations */
  .vortex-flow {
    animation: vortexFlow var(--vortex-medium) ease-in-out infinite;
  }

  @keyframes vortexFlow {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(var(--golden-ratio)); }
    50% { transform: rotate(180deg) scale(1); }
    75% { transform: rotate(270deg) scale(var(--golden-ratio-inverse)); }
    100% { transform: rotate(360deg) scale(1); }
  }

  /* Toroidal Flow Animations */
  .toroidal-flow {
    animation: toroidalFlow var(--vortex-slow) linear infinite;
  }

  @keyframes toroidalFlow {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    25% { transform: rotateX(90deg) rotateY(90deg); }
    50% { transform: rotateX(180deg) rotateY(180deg); }
    75% { transform: rotateX(270deg) rotateY(270deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  /* Harmonic Resonance Glow */
  .harmonic-glow {
    box-shadow: 
      0 0 20px var(--trinity-harmony),
      0 0 40px var(--trinity-harmony),
      0 0 60px var(--trinity-harmony);
    transition: all var(--vortex-instant) ease;
  }

  .harmonic-glow:hover {
    box-shadow: 
      0 0 30px var(--trinity-harmony),
      0 0 60px var(--trinity-harmony),
      0 0 90px var(--trinity-harmony);
  }
`;

// Trinity Vortex Styles
export const TRINITY_STYLES = `
  /* Challenges Vortex (Gateway 3) */
  .trinity-challenges {
    background: linear-gradient(135deg, 
      var(--gateway-3-dark) 0%, 
      var(--gateway-3-primary) 50%, 
      var(--gateway-3-light) 100%);
    border: 2px solid var(--gateway-3-primary);
    color: var(--gateway-3-primary);
  }

  .trinity-challenges:hover {
    box-shadow: 0 0 30px var(--gateway-3-primary);
    transform: scale(var(--golden-ratio-inverse));
  }

  /* Possibilities Vortex (Gateway 6) */
  .trinity-possibilities {
    background: linear-gradient(135deg, 
      var(--gateway-6-dark) 0%, 
      var(--gateway-6-primary) 50%, 
      var(--gateway-6-light) 100%);
    border: 2px solid var(--gateway-6-primary);
    color: var(--gateway-6-primary);
  }

  .trinity-possibilities:hover {
    box-shadow: 0 0 30px var(--gateway-6-primary);
    transform: scale(var(--golden-ratio-inverse));
  }

  /* Solutions Vortex (Gateway 9) */
  .trinity-solutions {
    background: linear-gradient(135deg, 
      var(--gateway-9-dark) 0%, 
      var(--gateway-9-primary) 50%, 
      var(--gateway-9-light) 100%);
    border: 2px solid var(--gateway-9-primary);
    color: var(--gateway-9-primary);
  }

  .trinity-solutions:hover {
    box-shadow: 0 0 30px var(--gateway-9-primary);
    transform: scale(var(--golden-ratio-inverse));
  }

  /* Trinity Flow Animation */
  .trinity-flow {
    animation: trinityFlow var(--vortex-medium) ease-in-out infinite;
  }

  @keyframes trinityFlow {
    0% { 
      background-position: 0% 50%;
      transform: rotate(0deg);
    }
    33% { 
      background-position: 50% 50%;
      transform: rotate(120deg);
    }
    66% { 
      background-position: 100% 50%;
      transform: rotate(240deg);
    }
    100% { 
      background-position: 0% 50%;
      transform: rotate(360deg);
    }
  }
`;

// Mathematical Harmony Styles
export const HARMONY_STYLES = `
  /* Perfect Harmony Container */
  .harmony-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(200px * var(--golden-ratio)), 1fr));
    gap: calc(1rem * var(--golden-ratio));
    padding: calc(2rem * var(--golden-ratio));
  }

  /* Harmonic Card */
  .harmonic-card {
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid var(--trinity-harmony);
    border-radius: calc(15px * var(--golden-ratio));
    padding: calc(1.5rem * var(--golden-ratio));
    backdrop-filter: blur(10px);
    transition: all var(--vortex-instant) ease;
    position: relative;
    overflow: hidden;
  }

  .harmonic-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent);
    transition: left var(--vortex-medium) ease;
  }

  .harmonic-card:hover::before {
    left: 100%;
  }

  .harmonic-card:hover {
    transform: translateY(calc(-5px * var(--golden-ratio)));
    box-shadow: 0 calc(10px * var(--golden-ratio)) calc(30px * var(--golden-ratio)) var(--trinity-harmony);
  }

  /* Mathematical Grid */
  .mathematical-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: calc(1rem * var(--golden-ratio));
    margin: calc(2rem * var(--golden-ratio)) 0;
  }

  .mathematical-item {
    text-align: center;
    padding: calc(1rem * var(--golden-ratio));
    background: rgba(0, 0, 0, 0.3);
    border-radius: calc(10px * var(--golden-ratio));
    border: 1px solid var(--trinity-harmony);
    transition: all var(--vortex-instant) ease;
  }

  .mathematical-item:hover {
    transform: scale(var(--golden-ratio-inverse));
    box-shadow: 0 0 20px var(--trinity-harmony);
  }
`;

// Vortex Animation Styles
export const VORTEX_ANIMATION_STYLES = `
  /* Vortex Spiral */
  .vortex-spiral {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .vortex-spiral::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border: 2px solid var(--trinity-harmony);
    border-radius: 50%;
    animation: spiralExpand var(--vortex-slow) ease-in-out infinite;
  }

  @keyframes spiralExpand {
    0% {
      width: 0;
      height: 0;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      width: 150px;
      height: 150px;
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      width: 0;
      height: 0;
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* Toroidal Ring */
  .toroidal-ring {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    transform-style: preserve-3d;
    animation: toroidalRotate var(--vortex-medium) linear infinite;
  }

  .toroidal-ring::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border: 4px solid var(--trinity-harmony);
    border-radius: 50%;
    transform: translate(-50%, -50%) rotateX(60deg);
  }

  @keyframes toroidalRotate {
    0% { transform: rotateY(0deg) rotateX(0deg); }
    100% { transform: rotateY(360deg) rotateX(360deg); }
  }

  /* Harmonic Pulse */
  .harmonic-pulse {
    animation: harmonicPulse var(--vortex-fast) ease-in-out infinite;
  }

  @keyframes harmonicPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(var(--golden-ratio));
      opacity: 0.7;
    }
  }
`;

// Responsive Design Styles
export const RESPONSIVE_STYLES = `
  /* Mobile First Design */
  @media (max-width: 768px) {
    .harmony-container {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 1rem;
    }

    .mathematical-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .vortex-spiral {
      width: 150px;
      height: 150px;
    }

    .toroidal-ring {
      width: 200px;
      height: 200px;
    }

    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.1rem; }
  }

  /* Tablet Design */
  @media (min-width: 769px) and (max-width: 1024px) {
    .harmony-container {
      grid-template-columns: repeat(2, 1fr);
    }

    .mathematical-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop Design */
  @media (min-width: 1025px) {
    .harmony-container {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .mathematical-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

// Complete Harmonious CSS
export const HARMONIOUS_CSS = `
  ${CSS_VARIABLES}
  ${BASE_STYLES}
  ${TRINITY_STYLES}
  ${HARMONY_STYLES}
  ${VORTEX_ANIMATION_STYLES}
  ${RESPONSIVE_STYLES}
`;

// Utility Functions
export function getHarmoniousColor(gateway: number): string {
  switch (gateway) {
    case 3:
      return A432_COLORS.GATEWAY_3.primary;
    case 6:
      return A432_COLORS.GATEWAY_6.primary;
    case 9:
      return A432_COLORS.GATEWAY_9.primary;
    default:
      return A432_COLORS.BASE.primary;
  }
}

export function getHarmoniousScale(fibonacciIndex: number): number {
  const fibonacciValues = Object.values(HARMONIC_RATIOS).slice(2); // Skip golden ratio values
  return fibonacciValues[fibonacciIndex - 1] || 1;
}

export function getVortexAnimation(duration: 'slow' | 'medium' | 'fast' | 'instant'): string {
  return VORTEX_ANIMATIONS[duration.toUpperCase() as keyof typeof VORTEX_ANIMATIONS];
}

export function createHarmoniousGradient(colors: string[], direction: string = '135deg'): string {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
}

export function createVortexStyles(className: string, gateway: number): string {
  const color = getHarmoniousColor(gateway);
  return `
    .${className} {
      background: linear-gradient(135deg, 
        ${color}22 0%, 
        ${color}44 50%, 
        ${color}66 100%);
      border: 2px solid ${color};
      color: ${color};
      animation: vortexFlow ${VORTEX_ANIMATIONS.MEDIUM} ease-in-out infinite;
    }
    
    .${className}:hover {
      box-shadow: 0 0 30px ${color};
      transform: scale(${HARMONIC_RATIOS.GOLDEN_RATIO_INVERSE});
    }
  `;
}

// Export all styles and utilities
export default {
  // Color Systems
  A432_COLORS,
  TRINITY_COLORS,
  
  // Mathematical Constants
  HARMONIC_RATIOS,
  VORTEX_ANIMATIONS,
  TOROIDAL_PATTERNS,
  
  // Style Sheets
  CSS_VARIABLES,
  BASE_STYLES,
  TRINITY_STYLES,
  HARMONY_STYLES,
  VORTEX_ANIMATION_STYLES,
  RESPONSIVE_STYLES,
  HARMONIOUS_CSS,
  
  // Utility Functions
  getHarmoniousColor,
  getHarmoniousScale,
  getVortexAnimation,
  createHarmoniousGradient,
  createVortexStyles
}; 