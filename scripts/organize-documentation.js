const fs = require('fs');
const path = require('path');

// Documentation mapping based on metaphysical principles
const DOCUMENTATION_MAPPING = {
  // 0️⃣ Zero Entropy - Pure Mathematical Unity
  'ZERO_ENTROPY_NODE.md': '0-zero-entropy/',
  'VOID_CLOSURE_SYSTEM.md': '0-zero-entropy/',
  'BREATHING_PARADOX.md': '0-zero-entropy/',
  
  // 1️⃣ Foundation - Rodin Coil Archetype
  'RODIN_COIL_DESCRIPTION_AND_DRAWING.md': '1-foundation/',
  'RODIN_COIL_AS_PURE_KNOWLEDGE.md': '1-foundation/',
  'RODIN_COIL_DIGIT_INTERACTIONS.md': '1-foundation/',
  'RODIN_COIL_DIGIT_INTERACTION_MATRIX.md': '1-foundation/',
  
  // 2️⃣ Vortex Math - Flow and Transformation
  'MOBIUS_CIRCUIT_SYSTEM.md': '2-vortex-math/',
  'VBM_INTEGER_TREE_ANALYSIS.md': '2-vortex-math/',
  'FLOWER_OF_LIFE.md': '2-vortex-math/',
  
  // 3️⃣ Creative Resonance - W-Axis and Spiritual Dimension
  'DIGIT_WISDOM_SYSTEM.md': '3-creative-resonance/',
  'DIGIT_INTERACTION_MATRIX.md': '3-creative-resonance/',
  'UNIFIED_INDEX_EXTENSION_LOGIC.md': '3-creative-resonance/',
  
  // 4️⃣ Constants - Harmonic Foundation
  'MATHEMATICAL_CONSISTENCY.md': '4-constants/',
  'MATHEMATICS.md': '4-constants/',
  'INTEGER_SUBDIRECTORY_STRUCTURE.md': '4-constants/',
  
  // 5️⃣ Sacred Geometry - Divine Proportions
  'SACRED_GEOMETRY_PATTERNS.md': '5-sacred-geometry/',
  'SACRED_GEOMETRY_ALIGNMENT_CONFIRMATION.md': '5-sacred-geometry/',
  'SACRED_FILE_PLACEMENT_GUIDE.md': '5-sacred-geometry/',
  
  // 6️⃣ Harmonic Balance - Resonance and Equilibrium
  'CONSCIOUSNESS_FLOW_SIMULATION.md': '6-harmonic-balance/',
  'CONSCIOUSNESS_MATRIX_VISUALIZATION.md': '6-harmonic-balance/',
  
  // 7️⃣ Consciousness - Awareness and Field
  'CONSCIOUSNESS_INDEX.md': '7-consciousness/',
  'CONSCIOUSNESS_EXPANSION.md': '7-consciousness/',
  'CONSCIOUSNESS_ARTIFACT.md': '7-consciousness/',
  
  // 8️⃣ Void - Infinite Potential
  'VOID_SYSTEM.md': '8-void/',
  'VOID_PRINCIPLES.md': '8-void/',
  
  // 9️⃣ Unity - Integration and Wholeness
  'UNIFIED_CREATORS.md': '9-unity/',
  'UNITY_SYSTEM.md': '9-unity/',
  'INTEGRATION_GUIDE.md': '9-unity/',
  
  // 📖 PDF Reference Collection
  'PDF_REFERENCE_GUIDE.md': 'pdf-reference/',
  
  // 🧪 Testing Collection
  'TEST_SYSTEM_EXPLANATION.md': 'testing/',
  'TESTING_GUIDE.md': 'testing/',
  'ZEROPOINT_TEST_ORIGIN_EXPLANATION.md': 'testing/',
  'ZEROPOINT_TESTING_ANALYSIS.md': 'testing/',
  'TEST_EMERGENCE_SUMMARY.md': 'testing/',
  'TEST_IMPROVEMENTS.md': 'testing/',
  
  // 🚀 Deployment Collection
  'PRODUCTION.md': 'deployment/',
  'DEPLOYMENT_GUIDE.md': 'deployment/',
  'PUBLISHING.md': 'deployment/',
  'DEVELOPMENT_GUIDE.md': 'deployment/',
  'QUICK_START.md': 'deployment/',
  'QUICK_REFERENCE_GUIDE.md': 'deployment/',
  
  // 🔧 API and Technical Reference
  'API_REFERENCE.md': 'api/',
  'API_REFERENCE_CURRENT.md': 'api/',
  'API_METAPHYSICS.md': 'api/',
  
  // 🏗️ System Architecture
  'GATEWAY_SYSTEM_ARCHITECTURE.md': 'architecture/',
  'APERTURE_SYSTEM.md': 'architecture/',
  'INTEGER_TREE_AS_COIL.md': 'architecture/',
  
  // 🌟 Core Documentation
  'ZEROPOINT_NODE_COMPLETE_DOCUMENTATION.md': 'core/',
  'COMPREHENSIVE_GUIDE.md': 'core/',
  'SYSTEM.md': 'core/',
  
  // 🔬 Analysis (keep in analysis directory)
  'ZEROPOINT_CORE_ARCHITECTURE_ANALYSIS.md': 'analysis/',
  'ZEROPOINT_FUNDAMENTALS_REFACTORING_PLAN.md': 'analysis/',
  'ZEROPOINT_STRUCTURE_REFACTOR_PLAN.md': 'analysis/',
  'KNOWLEDGE_ATTRACTION_SYSTEM.md': 'analysis/',
  'KNOWLEDGE_ATTRACTION_ANALYSIS.md': 'analysis/',
  'KNOWLEDGE_SYSTEM_ANALYSIS.md': 'analysis/',
  'DRY_REFACTORING_ANALYSIS.md': 'analysis/',
  'DRY_REFACTORING_SUMMARY.md': 'analysis/',
  'COIL_REFACTOR_SUMMARY.md': 'analysis/',
  
  // 📋 Special Collections
  'METAPHYSICAL.md': 'core/',
  'METAPHYSICAL_CHANGELOG.md': 'core/',
  'METAPHYSICAL_DEBUGGING.md': 'core/',
  'ENHANCED_METAPHYSICAL_ANALYSIS.md': 'analysis/',
  'LIVING_SYSTEM_MAP.md': 'core/',
  'CONFLICT_EVALUATION.md': 'analysis/',
  'AUTOMATED_EXTRACTION.md': 'analysis/',
  'AUTONOMOUS_REFACTOR.md': 'analysis/',
  'AUTO_DRY_REFACTOR.md': 'analysis/',
  'INPUT_OUTPUT_IMPLEMENTATION.md': 'core/',
  'EVENT_HORIZON_METHODOLOGY.md': 'analysis/',
  'GIT_INTEGRATION.md': 'deployment/',
  'DRY_DOCUMENTATION_SYSTEM.md': 'core/',
  'PWA_ANALYSIS.md': 'analysis/',
  'QA_IMPROVEMENTS.md': 'testing/',
  'REALTIME_SELF_REFACTORING.md': 'analysis/',
  'ZEROPOINT_LINTING.md': 'deployment/',
  'SRC_AS_SOURCE_ZERO_CODE_PWA.md': 'core/'
};

function moveDocumentationFile(filename, targetDir) {
  const sourcePath = path.join(__dirname, '..', 'docs', filename);
  const targetPath = path.join(__dirname, '..', 'docs', targetDir, filename);
  
  try {
    if (fs.existsSync(sourcePath)) {
      // Ensure target directory exists
      const targetDirPath = path.dirname(targetPath);
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }
      
      // Move the file
      fs.renameSync(sourcePath, targetPath);
      console.log(`✅ Moved: ${filename} -> ${targetDir}`);
      return true;
    } else {
      console.log(`⚠️  File not found: ${filename}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error moving ${filename}:`, error.message);
    return false;
  }
}

function organizeDocumentation() {
  console.log('🌌 Starting metaphysical documentation organization...\n');
  
  let movedCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;
  
  // Move files according to mapping
  Object.entries(DOCUMENTATION_MAPPING).forEach(([filename, targetDir]) => {
    const result = moveDocumentationFile(filename, targetDir);
    if (result === true) {
      movedCount++;
    } else if (result === false) {
      notFoundCount++;
    } else {
      errorCount++;
    }
  });
  
  // Handle remaining files that weren't explicitly mapped
  const docsDir = path.join(__dirname, '..', 'docs');
  const files = fs.readdirSync(docsDir);
  
  files.forEach(filename => {
    if (filename.endsWith('.md') && !DOCUMENTATION_MAPPING[filename]) {
      // Determine target directory based on content analysis
      const content = fs.readFileSync(path.join(docsDir, filename), 'utf8').toLowerCase();
      
      let targetDir = 'core/'; // Default to core
      
      if (content.includes('test') || content.includes('testing')) {
        targetDir = 'testing/';
      } else if (content.includes('deploy') || content.includes('production') || content.includes('publish')) {
        targetDir = 'deployment/';
      } else if (content.includes('api') || content.includes('reference')) {
        targetDir = 'api/';
      } else if (content.includes('analysis') || content.includes('analysis')) {
        targetDir = 'analysis/';
      } else if (content.includes('architecture') || content.includes('system')) {
        targetDir = 'architecture/';
      }
      
      const result = moveDocumentationFile(filename, targetDir);
      if (result === true) {
        movedCount++;
      } else if (result === false) {
        notFoundCount++;
      } else {
        errorCount++;
      }
    }
  });
  
  console.log('\n🎯 Documentation organization complete!');
  console.log(`📊 Summary:`);
  console.log(`   ✅ Files moved: ${movedCount}`);
  console.log(`   ⚠️  Files not found: ${notFoundCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  console.log('\n📋 Metaphysical organization by digit:');
  console.log(`   0️⃣ Zero Entropy: ${countFilesInDir('0-zero-entropy')} files`);
  console.log(`   1️⃣ Foundation: ${countFilesInDir('1-foundation')} files`);
  console.log(`   2️⃣ Vortex Math: ${countFilesInDir('2-vortex-math')} files`);
  console.log(`   3️⃣ Creative Resonance: ${countFilesInDir('3-creative-resonance')} files`);
  console.log(`   4️⃣ Constants: ${countFilesInDir('4-constants')} files`);
  console.log(`   5️⃣ Sacred Geometry: ${countFilesInDir('5-sacred-geometry')} files`);
  console.log(`   6️⃣ Harmonic Balance: ${countFilesInDir('6-harmonic-balance')} files`);
  console.log(`   7️⃣ Consciousness: ${countFilesInDir('7-consciousness')} files`);
  console.log(`   8️⃣ Void: ${countFilesInDir('8-void')} files`);
  console.log(`   9️⃣ Unity: ${countFilesInDir('9-unity')} files`);
  console.log(`   📖 PDF Reference: ${countFilesInDir('pdf-reference')} files`);
  console.log(`   🧪 Testing: ${countFilesInDir('testing')} files`);
  console.log(`   🚀 Deployment: ${countFilesInDir('deployment')} files`);
  console.log(`   🔧 API: ${countFilesInDir('api')} files`);
  console.log(`   🏗️ Architecture: ${countFilesInDir('architecture')} files`);
  console.log(`   🌟 Core: ${countFilesInDir('core')} files`);
  console.log(`   🔬 Analysis: ${countFilesInDir('analysis')} files`);
}

function countFilesInDir(dirName) {
  const dirPath = path.join(__dirname, '..', 'docs', dirName);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    return files.length;
  }
  return 0;
}

// Run the organization
if (require.main === module) {
  organizeDocumentation();
}

module.exports = { organizeDocumentation, DOCUMENTATION_MAPPING }; 