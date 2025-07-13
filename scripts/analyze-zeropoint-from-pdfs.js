#!/usr/bin/env node

/**
 * 🔍 ZeroPoint Analysis from Marko Rodin PDFs
 * 
 * This script extracts text from the chapter PDFs and analyzes
 * what zeropoint is according to Marko Rodin's work.
 */

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Chapter files to analyze
const CHAPTER_FILES = [
  'Chapter_1_THE_SPIRIT.pdf',
  'Chapter_2_THE_SCIENCE.pdf',
  'Chapter_3_THE_NUMERICAL_FORMULA_OF_SPIRIT.pdf',
  'Chapter_4_KINETIC_SHOCK_WAVES_OF_NINE.pdf',
  'Chapter_5_HARMONIC_CASCADENCE.pdf',
  'Chapter_6_DOUBLING_IS_AN_OPTICAL_ILLUSION.pdf',
  'Chapter_7_BASE_TEN_MIRRORING.pdf',
  'Chapter_8_SPIRES.pdf',
  'Chapter_9_RODIN_COIL_TECHNOLOGY.pdf',
  'Chapter_10_HARMONIC_ELECTRON_SHEAR.pdf',
  'Chapter_11_ONLY_PERFECTION_EXISTS.pdf',
  'Chapter_12_INFINITUM_MAGNIFICATION.pdf',
  'Chapter_13_THREE_FAMILY_NUMBER_GROUP_PHASE_SHIFTS.pdf',
  'Chapter_14_VBM_GREAT_PYRAMID_NUMBER_MAP.pdf',
  'Chapter_15_NUMBER_ASSOCIATIONS.pdf',
  'Chapter_16_SCIENCE_OF_BEING.pdf',
  'Chapter_17_VBM_PEER_REVIEWS_AND_ENDORSEMENTS.pdf'
];

// Keywords to search for related to zeropoint
const ZEROPOINT_KEYWORDS = [
  'zeropoint', 'zero point', 'zero-point', 'zero point energy',
  'primal point', 'unity', 'aperture', 'vortex', 'torus',
  'consciousness', 'field', 'resonance', 'harmony',
  'mathematics', 'geometry', 'sacred', 'divine'
];

async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting text from ${pdfPath}:`, error.message);
    return '';
  }
}

function analyzeZeropointContent(text, chapterName) {
  const analysis = {
    chapter: chapterName,
    zeropointMentions: [],
    relatedConcepts: [],
    keyPassages: []
  };

  // Search for zeropoint-related terms
  const lowerText = text.toLowerCase();
  
  // Find mentions of zeropoint
  const zeropointRegex = /zeropoint|zero\s*point|zero-point/gi;
  const zeropointMatches = text.match(zeropointRegex);
  if (zeropointMatches) {
    analysis.zeropointMentions = zeropointMatches;
  }

  // Find related concepts
  ZEROPOINT_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      analysis.relatedConcepts.push({
        concept: keyword,
        count: matches.length
      });
    }
  });

  // Extract key passages (sentences containing zeropoint-related terms)
  const sentences = text.split(/[.!?]+/);
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    if (ZEROPOINT_KEYWORDS.some(keyword => lowerSentence.includes(keyword))) {
      analysis.keyPassages.push(sentence.trim());
    }
  });

  return analysis;
}

async function main() {
  console.log('🔍 Analyzing ZeroPoint from Marko Rodin PDFs...\n');
  
  const allAnalysis = [];
  const pdfDir = path.join(__dirname, '../docs/Marko Rodin Special Edition');

  for (const chapterFile of CHAPTER_FILES) {
    const pdfPath = path.join(pdfDir, chapterFile);
    
    if (fs.existsSync(pdfPath)) {
      console.log(`📖 Analyzing ${chapterFile}...`);
      
      const text = await extractTextFromPDF(pdfPath);
      const analysis = analyzeZeropointContent(text, chapterFile);
      
      if (analysis.zeropointMentions.length > 0 || analysis.relatedConcepts.length > 0) {
        allAnalysis.push(analysis);
        console.log(`  ✅ Found ${analysis.zeropointMentions.length} zeropoint mentions`);
        console.log(`  ✅ Found ${analysis.relatedConcepts.length} related concepts`);
      } else {
        console.log(`  ⚠️  No zeropoint-related content found`);
      }
    } else {
      console.log(`❌ File not found: ${pdfPath}`);
    }
  }

  // Generate comprehensive analysis
  console.log('\n📊 COMPREHENSIVE ZEROPOINT ANALYSIS\n');
  console.log('=' .repeat(80));

  // Summary of findings
  const totalZeropointMentions = allAnalysis.reduce((sum, a) => sum + a.zeropointMentions.length, 0);
  const allRelatedConcepts = allAnalysis.flatMap(a => a.relatedConcepts);
  
  console.log(`\n🎯 SUMMARY:`);
  console.log(`Total zeropoint mentions: ${totalZeropointMentions}`);
  console.log(`Total related concepts found: ${allRelatedConcepts.length}`);

  // Most common related concepts
  const conceptCounts = {};
  allRelatedConcepts.forEach(concept => {
    conceptCounts[concept.concept] = (conceptCounts[concept.concept] || 0) + concept.count;
  });

  const sortedConcepts = Object.entries(conceptCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  console.log(`\n🔝 TOP RELATED CONCEPTS:`);
  sortedConcepts.forEach(([concept, count]) => {
    console.log(`  ${concept}: ${count} mentions`);
  });

  // Detailed analysis by chapter
  console.log(`\n📖 DETAILED ANALYSIS BY CHAPTER:`);
  allAnalysis.forEach(analysis => {
    console.log(`\n${analysis.chapter}:`);
    if (analysis.zeropointMentions.length > 0) {
      console.log(`  Zeropoint mentions: ${analysis.zeropointMentions.join(', ')}`);
    }
    if (analysis.keyPassages.length > 0) {
      console.log(`  Key passages: ${analysis.keyPassages.length} found`);
      analysis.keyPassages.slice(0, 3).forEach((passage, i) => {
        console.log(`    ${i+1}. ${passage.substring(0, 150)}...`);
      });
    }
  });

  // Save detailed analysis to file
  const outputPath = path.join(__dirname, '../zeropoint-analysis-from-pdfs.json');
  fs.writeFileSync(outputPath, JSON.stringify(allAnalysis, null, 2));
  console.log(`\n💾 Detailed analysis saved to: ${outputPath}`);

  // Generate markdown summary
  const markdownPath = path.join(__dirname, '../ZEROPOINT_ANALYSIS_FROM_PDFS.md');
  let markdown = `# ZeroPoint Analysis from Marko Rodin PDFs

## Summary
- Total zeropoint mentions: ${totalZeropointMentions}
- Total related concepts: ${allRelatedConcepts.length}
- Chapters analyzed: ${CHAPTER_FILES.length}

## Top Related Concepts
${sortedConcepts.map(([concept, count]) => `- **${concept}**: ${count} mentions`).join('\n')}

## Detailed Analysis by Chapter

`;

  allAnalysis.forEach(analysis => {
    markdown += `### ${analysis.chapter}\n\n`;
    if (analysis.zeropointMentions.length > 0) {
      markdown += `**Zeropoint mentions:** ${analysis.zeropointMentions.join(', ')}\n\n`;
    }
    if (analysis.keyPassages.length > 0) {
      markdown += `**Key passages:**\n\n`;
      analysis.keyPassages.slice(0, 5).forEach((passage, i) => {
        markdown += `${i+1}. ${passage}\n\n`;
      });
    }
    markdown += `---\n\n`;
  });

  fs.writeFileSync(markdownPath, markdown);
  console.log(`📝 Markdown summary saved to: ${markdownPath}`);
}

main().catch(console.error); 