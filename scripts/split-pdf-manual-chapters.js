#!/usr/bin/env node

/**
 * 📚 PDF Chapter Splitter - Manual Chapter Boundaries
 * 
 * This script splits the PDF using manually determined chapter boundaries
 * based on the actual book structure and chapter headers.
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// Manual chapter boundaries based on actual book structure
const CHAPTERS = [
  { name: "Chapter_1_THE_SPIRIT", title: "THE SPIRIT", start: 1, end: 17 },
  { name: "Chapter_2_THE_SCIENCE", title: "THE SCIENCE", start: 18, end: 42 },
  { name: "Chapter_3_THE_NUMERICAL_FORMULA_OF_SPIRIT", title: "THE NUMERICAL FORMULA OF SPIRIT", start: 43, end: 48 },
  { name: "Chapter_4_KINETIC_SHOCK_WAVES_OF_NINE", title: "KINETIC SHOCK WAVES OF NINE", start: 49, end: 59 },
  { name: "Chapter_5_HARMONIC_CASCADENCE", title: "HARMONIC CASCADENCE", start: 60, end: 89 },
  { name: "Chapter_6_DOUBLING_IS_AN_OPTICAL_ILLUSION", title: "DOUBLING IS AN OPTICAL ILLUSION", start: 90, end: 102 },
  { name: "Chapter_7_BASE_TEN_MIRRORING", title: "BASE TEN MIRRORING", start: 103, end: 119 },
  { name: "Chapter_8_SPIRES", title: "SPIRES", start: 120, end: 140 },
  { name: "Chapter_9_RODIN_COIL_TECHNOLOGY", title: "RODIN COIL TECHNOLOGY", start: 141, end: 157 },
  { name: "Chapter_10_HARMONIC_ELECTRON_SHEAR", title: "HARMONIC ELECTRON SHEAR", start: 158, end: 167 },
  { name: "Chapter_11_ONLY_PERFECTION_EXISTS", title: "ONLY PERFECTION EXISTS", start: 168, end: 194 },
  { name: "Chapter_12_INFINITUM_MAGNIFICATION", title: "INFINITUM MAGNIFICATION", start: 195, end: 206 },
  { name: "Chapter_13_THREE_FAMILY_NUMBER_GROUP_PHASE_SHIFTS", title: "THREE FAMILY NUMBER GROUP PHASE SHIFTS", start: 207, end: 224 },
  { name: "Chapter_14_VBM_GREAT_PYRAMID_NUMBER_MAP", title: "VBM GREAT PYRAMID NUMBER MAP", start: 225, end: 237 },
  { name: "Chapter_15_NUMBER_ASSOCIATIONS", title: "NUMBER ASSOCIATIONS", start: 238, end: 285 },
  { name: "Chapter_16_SCIENCE_OF_BEING", title: "SCIENCE OF BEING", start: 286, end: 291 }
];

class PDFManualChapterSplitter {
  constructor() {
    this.outputDir = './split-pdfs/manual-chapters';
    this.ensureOutputDirectory();
  }

  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async splitByManualChapters(inputPath) {
    console.log(`📚 Splitting PDF by manual chapter boundaries: ${inputPath}`);
    
    try {
      const dataBuffer = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(dataBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      console.log(`📄 Total pages in PDF: ${pageCount}`);
      
      for (const chapter of CHAPTERS) {
        // Adjust page ranges to actual PDF bounds
        const pageStart = Math.max(1, chapter.start) - 1; // PDF pages are 0-indexed
        const pageEnd = Math.min(pageCount - 1, chapter.end - 1);
        
        if (pageStart <= pageEnd && pageStart < pageCount) {
          // Create new PDF for this chapter
          const newPdfDoc = await PDFDocument.create();
          const pages = await newPdfDoc.copyPages(pdfDoc, Array.from(
            { length: pageEnd - pageStart + 1 }, 
            (_, i) => pageStart + i
          ));
          
          pages.forEach(page => newPdfDoc.addPage(page));
          
          // Save chapter PDF
          const outputPath = path.join(this.outputDir, `${chapter.name}.pdf`);
          const pdfBytes = await newPdfDoc.save();
          fs.writeFileSync(outputPath, pdfBytes);
          
          console.log(`✅ Created: ${chapter.name}.pdf (Pages ${chapter.start}-${chapter.end})`);
        } else {
          console.log(`⚠️ Skipping ${chapter.name} - page range outside PDF bounds`);
        }
      }
      
      console.log(`🎉 PDF splitting complete! Files saved in: ${this.outputDir}`);
      this.generateChapterSummary();
      
    } catch (error) {
      console.error('❌ Error splitting PDF:', error.message);
      throw error;
    }
  }

  generateChapterSummary() {
    console.log('\n📊 Chapter Summary:');
    console.log('==================');
    
    CHAPTERS.forEach((chapter, index) => {
      console.log(`${index + 1}. ${chapter.title}`);
      console.log(`   File: ${chapter.name}.pdf`);
      console.log(`   Pages: ${chapter.start}-${chapter.end}`);
      console.log('');
    });
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📚 PDF Chapter Splitter - Manual Chapter Boundaries

Usage:
  node split-pdf-manual-chapters.js <input-pdf>

Example:
  node split-pdf-manual-chapters.js "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf"
    `);
    return;
  }
  
  const inputPath = args[0];
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    return;
  }
  
  const splitter = new PDFManualChapterSplitter();
  
  try {
    await splitter.splitByManualChapters(inputPath);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { PDFManualChapterSplitter, CHAPTERS }; 