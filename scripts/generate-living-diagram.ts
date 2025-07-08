import { KnowledgeSystem } from '../src/knowledge/KnowledgeSystem';

async function main() {
  const ks = new KnowledgeSystem();
  ks.autoDiscoverPatterns();
  await ks.saveLivingDiagram();
  console.log('LIVING_DIAGRAM.md has been regenerated.');
}

main(); 