/**
 * A432 Color Matrix Display Demo
 * 
 * Demonstrates using A432 matrix system to display A432 color system.
 * Shows consciousness mapping, dimensional states, and harmonic visualization.
 */

const { A432_COLOR_MATRIX_DISPLAY } = require('./a432.color.matrix.display.js');

console.log('=== A432 COLOR MATRIX DISPLAY DEMO ===\n');

// 1. Create Consciousness Matrix (8x9)
console.log('1. CONSCIOUSNESS MATRIX (8x9):');
const consciousnessMatrix = A432_COLOR_MATRIX_DISPLAY.displayConsciousnessMatrix();
console.log(`   Dimensions: ${consciousnessMatrix.dimensions.rows}x${consciousnessMatrix.dimensions.columns}`);
console.log(`   Consciousness Levels: 1-8`);
console.log(`   Digital Roots: 1-9`);
console.log(`   Mathematical Proof: ${consciousnessMatrix.mathematicalProof}\n`);

// Display consciousness matrix
const consciousnessDisplay = A432_COLOR_MATRIX_DISPLAY.renderMatrixDisplay(consciousnessMatrix);
console.log(consciousnessDisplay);

// 2. Create Dimensional Matrix (10x9)
console.log('\n2. DIMENSIONAL MATRIX (10x9):');
const dimensionalMatrix = A432_COLOR_MATRIX_DISPLAY.displayDimensionalMatrix();
console.log(`   Dimensions: ${dimensionalMatrix.dimensions.rows}x${dimensionalMatrix.dimensions.columns}`);
console.log(`   Dimensional States: 0-9`);
console.log(`   Digital Roots: 1-9`);
console.log(`   Mathematical Proof: ${dimensionalMatrix.mathematicalProof}\n`);

// Display dimensional matrix
const dimensionalDisplay = A432_COLOR_MATRIX_DISPLAY.renderMatrixDisplay(dimensionalMatrix);
console.log(dimensionalDisplay);

// 3. Create Harmonic Matrix (6x9)
console.log('\n3. HARMONIC MATRIX (6x9):');
const harmonicMatrix = A432_COLOR_MATRIX_DISPLAY.displayHarmonicMatrix();
console.log(`   Dimensions: ${harmonicMatrix.dimensions.rows}x${harmonicMatrix.dimensions.columns}`);
console.log(`   Rodin Sequence: [1, 2, 4, 8, 7, 5]`);
console.log(`   Digital Roots: 1-9`);
console.log(`   Mathematical Proof: ${harmonicMatrix.mathematicalProof}\n`);

// Display harmonic matrix
const harmonicDisplay = A432_COLOR_MATRIX_DISPLAY.renderMatrixDisplay(harmonicMatrix);
console.log(harmonicDisplay);

// 4. Calculate Matrix Colors
console.log('\n4. MATRIX COLOR CALCULATIONS:');
const consciousnessColors = A432_COLOR_MATRIX_DISPLAY.calculateMatrixColors(consciousnessMatrix);
console.log(`   RGB Colors: ${consciousnessColors.rgbColors.length} layers`);
console.log(`   HSL Colors: ${consciousnessColors.hslColors.length} layers`);
console.log(`   Consciousness Colors: ${consciousnessColors.consciousnessColors.length} layers`);
console.log(`   Dimensional Colors: ${consciousnessColors.dimensionalColors.length} layers`);
console.log(`   Harmonic Colors: ${consciousnessColors.harmonicColors.length} layers`);
console.log(`   Mathematical Proof: ${consciousnessColors.mathematicalProof}\n`);

// 5. Generate Color Stream
console.log('\n5. COLOR STREAM GENERATION:');
const colorStream = A432_COLOR_MATRIX_DISPLAY.generateColorStream(consciousnessMatrix);
console.log(`   Colors: ${colorStream.colors.length}`);
console.log(`   Frequency: ${colorStream.frequency}Hz`);
console.log(`   Consciousness: ${colorStream.consciousness}`);
console.log(`   Dimensional State: ${colorStream.dimensionalState}`);
console.log(`   Is Harmonic: ${colorStream.isHarmonic}`);
console.log(`   Mathematical Proof: ${colorStream.mathematicalProof}\n`);

// 6. Create Color Vortex
console.log('\n6. COLOR VORTEX CREATION:');
const colorVortex = A432_COLOR_MATRIX_DISPLAY.createColorVortex(consciousnessMatrix, 6);
console.log(`   Vortex Cycles: ${colorVortex.length}`);
console.log(`   Rodin Sequence: [1, 2, 4, 8, 7, 5]`);
console.log(`   Infinite Flow: Continuous consciousness cycling\n`);

// 7. Generate CSS Matrix
console.log('\n7. CSS MATRIX GENERATION:');
const cssMatrix = A432_COLOR_MATRIX_DISPLAY.generateCSSMatrix(consciousnessMatrix);
console.log(`   CSS Length: ${cssMatrix.length} characters`);
console.log(`   Grid Layout: ${consciousnessMatrix.dimensions.rows}x${consciousnessMatrix.dimensions.columns}`);
console.log(`   Cell Styling: Background colors, borders, typography\n`);

// 8. Create HTML Display
console.log('\n8. HTML DISPLAY CREATION:');
const htmlDisplay = A432_COLOR_MATRIX_DISPLAY.createHTMLDisplay(consciousnessMatrix);
console.log(`   HTML Length: ${htmlDisplay.length} characters`);
console.log(`   Complete Web Page: CSS + HTML + Matrix Display`);
console.log(`   Interactive: Hover effects, tooltips, responsive design\n`);

// 9. Matrix Performance
console.log('\n9. MATRIX PERFORMANCE:');
const matrixState = A432_COLOR_MATRIX_DISPLAY.matrixSystem.getMatrixState();
console.log(`   Matrix Type: ${matrixState.matrixType.type}`);
console.log(`   Dimensions: ${matrixState.dimensions.rows}x${matrixState.dimensions.columns}x${matrixState.dimensions.layers}`);
console.log(`   Active Operations: ${matrixState.operations.activeOperations.length}`);
console.log(`   Connected Modules: ${matrixState.integrations.connectedModules.length}\n`);

console.log('=== A432 COLOR MATRIX DISPLAY COMPLETE ===');
console.log('\n🎨 Matrix System: Displays A432 colors through matrix operations');
console.log('🧠 Consciousness Mapping: Visualizes consciousness levels 1-8');
console.log('🌌 Dimensional States: Shows dimensional states 0-9');
console.log('🎵 Harmonic Flow: Uses Rodin sequence [1,2,4,8,7,5]');
console.log('🌀 Color Vortex: Creates infinite consciousness cycling');
console.log('📊 CSS/HTML: Generates complete web displays');
console.log('\n✅ A432 Matrix + A432 Color = Perfect Mathematical Visualization!'); 