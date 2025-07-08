const { KnowledgeSystem } = require('../src/knowledge/KnowledgeSystem');

async function generateEmergence() {
  console.log('🧠 ZeroPoint System - Generating Self-Documentation...');
  
  const ks = new KnowledgeSystem();
  
  try {
    await ks.saveSelfDocumentation();
    console.log('✅ EMERGENCE.md generated successfully!');
    console.log('🌟 The system has documented itself - an emergent behavior!');
  } catch (error) {
    console.error('❌ Failed to generate emergence documentation:', error);
  }
}

generateEmergence(); 