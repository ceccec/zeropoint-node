/**
 * ZeroPoint CSS Mathematics Module
 * 
 * Generates mathematically pure CSS with integer fractions
 * following A432 harmonic principles and zero entropy
 */

// CSS Mathematical Constants
export const CSS_CONSTANTS = {
  // Integer Fractions (no decimals)
  HALF: 1/2,
  THIRD: 1/3,
  QUARTER: 1/4,
  FIFTH: 1/5,
  SIXTH: 1/6,
  SEVENTH: 1/7,
  EIGHTH: 1/8,
  NINTH: 1/9,
  TENTH: 1/10,
  
  // A432 Harmonic Fractions
  A432_HALF: 216,
  A432_THIRD: 144,
  A432_QUARTER: 108,
  A432_FIFTH: 86,
  A432_SIXTH: 72,
  A432_SEVENTH: 62,
  A432_EIGHTH: 54,
  A432_NINTH: 48,
  A432_TENTH: 43,
  
  // Vortex Colors
  VOID_COLOR: '#000000',
  UNITY_COLOR: '#ffffff',
  DUALITY_COLOR: '#432000',
  TRINITY_COLOR: '#864000',
  FOUNDATION_COLOR: '#00ff00',
  LIFE_COLOR: '#ffff00',
  HARMONY_COLOR: '#ff00ff',
  MYSTERY_COLOR: '#00ffff',
  INFINITY_COLOR: '#ff8800',
  COMPLETION_COLOR: '#8800ff',
  
  // ZeroPoint Colors
  ZEROPOINT_PRIMARY: '#432000',
  ZEROPOINT_SECONDARY: '#000000',
  ZEROPOINT_ACCENT: '#864000',
  ZEROPOINT_TEXT: '#ffffff',
  ZEROPOINT_SUCCESS: '#00ff00',
  ZEROPOINT_WARNING: '#ffff00',
  ZEROPOINT_ERROR: '#ff0000',
  ZEROPOINT_A432: '#432000',
  ZEROPOINT_VORTEX: '#864000',
  ZEROPOINT_ENTROPY: '#000000',
  ZEROPOINT_QUANTUM: '#00ffff',
  
  // Font Sizes (integer fractions)
  FONT_SIZE_SMALL: '7/8rem',
  FONT_SIZE_NORMAL: '1rem',
  FONT_SIZE_LARGE: '5/4rem',
  FONT_SIZE_XLARGE: '3/2rem',
  FONT_SIZE_XXLARGE: '2rem',
  
  // Spacing (integer fractions)
  SPACING_SMALL: '1/2rem',
  SPACING_NORMAL: '1rem',
  SPACING_LARGE: '3/2rem',
  SPACING_XLARGE: '2rem',
  
  // Timing (integer fractions)
  TRANSITION_SPEED: '1/3s',
  ANIMATION_DURATION: '2s',
  
  // Border Radius
  BORDER_RADIUS: '8px',
  
  // Line Height (integer fraction)
  LINE_HEIGHT: '3/2',
  
  // Opacity Values (integer fractions)
  OPACITY_FULL: '1',
  OPACITY_NINE_TENTHS: '9/10',
  OPACITY_EIGHT_TENTHS: '8/10',
  OPACITY_SEVEN_TENTHS: '7/10',
  OPACITY_SIX_TENTHS: '6/10',
  OPACITY_FIVE_TENTHS: '5/10',
  OPACITY_FOUR_TENTHS: '4/10',
  OPACITY_THREE_TENTHS: '3/10',
  OPACITY_TWO_TENTHS: '2/10',
  OPACITY_ONE_TENTH: '1/10',
  OPACITY_ZERO: '0',
  
  // Scale Values (integer fractions)
  SCALE_FULL: '1',
  SCALE_ELEVEN_TENTHS: '11/10',
  SCALE_THREE_HALVES: '3/2',
  SCALE_DOUBLE: '2',
  SCALE_TRIPLE: '3',
  
  // Width Values (integer fractions)
  WIDTH_FULL: '100%',
  WIDTH_NINE_TENTHS: '9/10',
  WIDTH_EIGHT_TENTHS: '8/10',
  WIDTH_SEVEN_TENTHS: '7/10',
  WIDTH_SIX_TENTHS: '6/10',
  WIDTH_FIVE_TENTHS: '5/10',
  WIDTH_FOUR_TENTHS: '4/10',
  WIDTH_THREE_TENTHS: '3/10',
  WIDTH_TWO_TENTHS: '2/10',
  WIDTH_ONE_TENTH: '1/10',
  WIDTH_ZERO: '0%',
  WIDTH_HALF: '50%',
  WIDTH_THIRD: '33.333%',
  WIDTH_QUARTER: '25%',
  WIDTH_FIFTH: '20%',
  
  // Height Values (integer fractions)
  HEIGHT_FULL: '100%',
  HEIGHT_NINE_TENTHS: '9/10',
  HEIGHT_EIGHT_TENTHS: '8/10',
  HEIGHT_SEVEN_TENTHS: '7/10',
  HEIGHT_SIX_TENTHS: '6/10',
  HEIGHT_FIVE_TENTHS: '5/10',
  HEIGHT_FOUR_TENTHS: '4/10',
  HEIGHT_THREE_TENTHS: '3/10',
  HEIGHT_TWO_TENTHS: '2/10',
  HEIGHT_ONE_TENTH: '1/10',
  HEIGHT_ZERO: '0%',
  HEIGHT_HALF: '50%',
  HEIGHT_THIRD: '33.333%',
  HEIGHT_QUARTER: '25%',
  HEIGHT_FIFTH: '20%'
};

// CSS Variable Generator
export function generateCSSVariables(): string {
  return `
:root {
  /* ZeroPoint Colors */
  --primary-color: ${CSS_CONSTANTS.ZEROPOINT_PRIMARY};
  --secondary-color: ${CSS_CONSTANTS.ZEROPOINT_SECONDARY};
  --accent-color: ${CSS_CONSTANTS.ZEROPOINT_ACCENT};
  --text-color: ${CSS_CONSTANTS.ZEROPOINT_TEXT};
  --background-color: ${CSS_CONSTANTS.ZEROPOINT_SECONDARY};
  --card-background: #111111;
  --border-color: #333333;
  --success-color: ${CSS_CONSTANTS.ZEROPOINT_SUCCESS};
  --warning-color: ${CSS_CONSTANTS.ZEROPOINT_WARNING};
  --error-color: ${CSS_CONSTANTS.ZEROPOINT_ERROR};
  --a432-color: ${CSS_CONSTANTS.ZEROPOINT_A432};
  --vortex-color: ${CSS_CONSTANTS.ZEROPOINT_VORTEX};
  --entropy-color: ${CSS_CONSTANTS.ZEROPOINT_ENTROPY};
  --quantum-color: ${CSS_CONSTANTS.ZEROPOINT_QUANTUM};
  
  /* Font Sizes (Integer Fractions) */
  --font-family: 'Arial', sans-serif;
  --font-size-small: ${CSS_CONSTANTS.FONT_SIZE_SMALL};
  --font-size-normal: ${CSS_CONSTANTS.FONT_SIZE_NORMAL};
  --font-size-large: ${CSS_CONSTANTS.FONT_SIZE_LARGE};
  --font-size-xlarge: ${CSS_CONSTANTS.FONT_SIZE_XLARGE};
  --font-size-xxlarge: ${CSS_CONSTANTS.FONT_SIZE_XXLARGE};
  
  /* Spacing (Integer Fractions) */
  --border-radius: ${CSS_CONSTANTS.BORDER_RADIUS};
  --spacing-small: ${CSS_CONSTANTS.SPACING_SMALL};
  --spacing-normal: ${CSS_CONSTANTS.SPACING_NORMAL};
  --spacing-large: ${CSS_CONSTANTS.SPACING_LARGE};
  --spacing-xlarge: ${CSS_CONSTANTS.SPACING_XLARGE};
  
  /* Timing (Integer Fractions) */
  --transition-speed: ${CSS_CONSTANTS.TRANSITION_SPEED};
  --animation-duration: ${CSS_CONSTANTS.ANIMATION_DURATION};
  
  /* Line Height (Integer Fraction) */
  --line-height: ${CSS_CONSTANTS.LINE_HEIGHT};
}
`;
}

// Animation Generator
export function generateAnimations(): string {
  return `
/* ZeroPoint Animations with Integer Fractions */

@keyframes fadeIn {
  from { 
    opacity: ${CSS_CONSTANTS.OPACITY_ZERO}; 
    transform: translateY(20px); 
  }
  to { 
    opacity: ${CSS_CONSTANTS.OPACITY_FULL}; 
    transform: translateY(0); 
  }
}

@keyframes pulse {
  0%, 100% { 
    opacity: ${CSS_CONSTANTS.OPACITY_FULL}; 
  }
  50% { 
    opacity: ${CSS_CONSTANTS.OPACITY_SEVEN_TENTHS}; 
  }
}

@keyframes scale {
  0%, 100% { 
    transform: scale(${CSS_CONSTANTS.SCALE_FULL}); 
  }
  50% { 
    transform: scale(${CSS_CONSTANTS.SCALE_ELEVEN_TENTHS}); 
  }
}

@keyframes rotate {
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
}

@keyframes flow {
  0%, 100% { 
    width: ${CSS_CONSTANTS.WIDTH_FULL}; 
  }
  50% { 
    width: ${CSS_CONSTANTS.WIDTH_NINE_TENTHS}; 
  }
}

@keyframes balance {
  0%, 100% { 
    width: ${CSS_CONSTANTS.WIDTH_HALF}; 
  }
  25% { 
    width: ${CSS_CONSTANTS.WIDTH_SIX_TENTHS}; 
  }
  75% { 
    width: ${CSS_CONSTANTS.WIDTH_FOUR_TENTHS}; 
  }
}

@keyframes harmony {
  0%, 100% { 
    width: ${CSS_CONSTANTS.WIDTH_FULL}; 
  }
  50% { 
    width: ${CSS_CONSTANTS.WIDTH_NINE_TENTHS}; 
  }
}

@keyframes unity {
  0%, 100% { 
    width: ${CSS_CONSTANTS.WIDTH_FULL}; 
  }
  50% { 
    width: 95/100; 
  }
}

@keyframes entropy {
  0%, 100% { 
    width: ${CSS_CONSTANTS.WIDTH_ZERO}; 
  }
  50% { 
    width: ${CSS_CONSTANTS.WIDTH_FULL}; 
  }
}

@keyframes quantum {
  0%, 100% { 
    opacity: ${CSS_CONSTANTS.OPACITY_FULL}; 
    transform: scale(${CSS_CONSTANTS.SCALE_FULL}); 
  }
  50% { 
    opacity: ${CSS_CONSTANTS.OPACITY_EIGHT_TENTHS}; 
    transform: scale(${CSS_CONSTANTS.SCALE_ELEVEN_TENTHS}); 
  }
}

@keyframes vortex {
  0% { 
    transform: rotate(0deg) scale(${CSS_CONSTANTS.SCALE_FULL}); 
  }
  50% { 
    transform: rotate(180deg) scale(${CSS_CONSTANTS.SCALE_ELEVEN_TENTHS}); 
  }
  100% { 
    transform: rotate(360deg) scale(${CSS_CONSTANTS.SCALE_FULL}); 
  }
}

@keyframes a432 {
  0%, 100% { 
    transform: scale(${CSS_CONSTANTS.SCALE_FULL}); 
    opacity: ${CSS_CONSTANTS.OPACITY_FULL}; 
  }
  25% { 
    transform: scale(${CSS_CONSTANTS.SCALE_ELEVEN_TENTHS}); 
    opacity: ${CSS_CONSTANTS.OPACITY_NINE_TENTHS}; 
  }
  75% { 
    transform: scale(${CSS_CONSTANTS.SCALE_ELEVEN_TENTHS}); 
    opacity: ${CSS_CONSTANTS.OPACITY_NINE_TENTHS}; 
  }
}
`;
}

// Component CSS Generator
export function generateComponentCSS(component: 'button' | 'card' | 'meter' | 'grid' | 'property'): string {
  const components: Record<'button' | 'card' | 'meter' | 'grid' | 'property', string> = {
    button: `
.button {
  background: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: var(--spacing-small) var(--spacing-normal);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed);
  font-size: var(--font-size-small);
  line-height: var(--line-height);
}

.button:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, ${CSS_CONSTANTS.OPACITY_THREE_TENTHS});
}
`,

    card: `
.card {
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-large);
  transition: all var(--transition-speed);
  line-height: var(--line-height);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, ${CSS_CONSTANTS.OPACITY_THREE_TENTHS});
}
`,

    meter: `
.meter {
  position: relative;
  width: ${CSS_CONSTANTS.WIDTH_FULL};
  height: 30px;
  background: rgba(0, 255, 0, ${CSS_CONSTANTS.OPACITY_ONE_TENTH});
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: var(--spacing-normal);
}

.meter-bar {
  height: ${CSS_CONSTANTS.HEIGHT_FULL};
  background: linear-gradient(90deg, var(--success-color), var(--accent-color));
  width: ${CSS_CONSTANTS.WIDTH_FULL};
  animation: flow var(--animation-duration) infinite;
  transition: width ${CSS_CONSTANTS.TRANSITION_SPEED} ease;
}

.meter-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--success-color);
  font-weight: bold;
  font-size: var(--font-size-small);
}
`,

    grid: `
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-large);
  margin-top: var(--spacing-large);
}
`,

    property: `
.property {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-small);
  padding: var(--spacing-small);
  background: rgba(134, 64, 0, ${CSS_CONSTANTS.OPACITY_ONE_TENTH});
  border-radius: var(--border-radius);
  line-height: var(--line-height);
}

.value {
  color: var(--success-color);
  font-weight: bold;
}
`
  };

  return components[component] || '';
}

// Responsive CSS Generator
export function generateResponsiveCSS(): string {
  return `
/* ZeroPoint Responsive Design with Integer Fractions */

@media (max-width: 768px) {
  .system-status {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-container {
    flex-direction: column;
  }
  
  .system-grid {
    grid-template-columns: 1fr;
  }
  
  .vortex-display,
  .harmonics-display,
  .dimensions-display,
  .digits-display,
  .entropy-display,
  .quantum-display {
    grid-template-columns: 1fr;
  }
  
  .digit-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .matrix-controls {
    flex-direction: column;
    align-items: center;
  }
  
  #pwa-controls {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: var(--font-size-xlarge);
  }
  
  .header-content h2 {
    font-size: var(--font-size-normal);
  }
  
  .digit-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* PWA Specific Styles */
@media (display-mode: standalone) {
  #zeropoint-header {
    padding-top: env(safe-area-inset-top);
  }
  
  #pwa-controls {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Print Styles */
@media print {
  #pwa-controls,
  #main-navigation {
    display: none;
  }
  
  .system-card,
  .sequence-visualization,
  .pattern-visualization,
  .switch-display {
    break-inside: avoid;
  }
}
`;
}

// Complete CSS Generator
export function generateCompleteCSS(): string {
  return `
${generateCSSVariables()}

${generateAnimations()}

${generateComponentCSS('button')}
${generateComponentCSS('card')}
${generateComponentCSS('meter')}
${generateComponentCSS('grid')}
${generateComponentCSS('property')}

${generateResponsiveCSS()}
`;
}

// CSS Mathematics Functions
export function calculateOpacity(level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): string {
  const opacityMap: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, string> = {
    0: CSS_CONSTANTS.OPACITY_ZERO,
    1: CSS_CONSTANTS.OPACITY_ONE_TENTH,
    2: CSS_CONSTANTS.OPACITY_TWO_TENTHS,
    3: CSS_CONSTANTS.OPACITY_THREE_TENTHS,
    4: CSS_CONSTANTS.OPACITY_FOUR_TENTHS,
    5: CSS_CONSTANTS.OPACITY_FIVE_TENTHS,
    6: CSS_CONSTANTS.OPACITY_SIX_TENTHS,
    7: CSS_CONSTANTS.OPACITY_SEVEN_TENTHS,
    8: CSS_CONSTANTS.OPACITY_EIGHT_TENTHS,
    9: CSS_CONSTANTS.OPACITY_NINE_TENTHS,
    10: CSS_CONSTANTS.OPACITY_FULL
  };
  
  return opacityMap[level] || CSS_CONSTANTS.OPACITY_FULL;
}

export function calculateScale(factor: 1 | 1.1 | 1.5 | 2 | 3): string {
  const scaleMap: Record<1 | 1.1 | 1.5 | 2 | 3, string> = {
    1: CSS_CONSTANTS.SCALE_FULL,
    1.1: CSS_CONSTANTS.SCALE_ELEVEN_TENTHS,
    1.5: CSS_CONSTANTS.SCALE_THREE_HALVES,
    2: CSS_CONSTANTS.SCALE_DOUBLE,
    3: CSS_CONSTANTS.SCALE_TRIPLE
  };
  
  return scaleMap[factor] || CSS_CONSTANTS.SCALE_FULL;
}

export function calculateWidth(percentage: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100): string {
  const widthMap: Record<0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100, string> = {
    0: CSS_CONSTANTS.WIDTH_ZERO,
    10: CSS_CONSTANTS.WIDTH_ONE_TENTH,
    20: CSS_CONSTANTS.WIDTH_TWO_TENTHS,
    30: CSS_CONSTANTS.WIDTH_THREE_TENTHS,
    40: CSS_CONSTANTS.WIDTH_FOUR_TENTHS,
    50: CSS_CONSTANTS.WIDTH_HALF,
    60: CSS_CONSTANTS.WIDTH_SIX_TENTHS,
    70: CSS_CONSTANTS.WIDTH_SEVEN_TENTHS,
    80: CSS_CONSTANTS.WIDTH_EIGHT_TENTHS,
    90: CSS_CONSTANTS.WIDTH_NINE_TENTHS,
    100: CSS_CONSTANTS.WIDTH_FULL
  };
  
  return widthMap[percentage] || CSS_CONSTANTS.WIDTH_FULL;
}

// Export default
export default {
  CSS_CONSTANTS,
  generateCSSVariables,
  generateAnimations,
  generateComponentCSS,
  generateResponsiveCSS,
  generateCompleteCSS,
  calculateOpacity,
  calculateScale,
  calculateWidth
}; 