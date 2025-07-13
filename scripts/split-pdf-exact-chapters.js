#!/usr/bin/env node

/**
 * 📚 PDF Chapter Splitter - Exact Chapter Pages
 * 
 * This script splits the PDF using the exact chapter start pages provided.
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// Exact chapter start pages provided by user
const CHAPTER_START_PAGES = [7, 19, 43, 53, 63, 89, 107, 123, 143, 167, 181, 187, 201, 217, 241, 261, 273];

// Chapter titles based on table of contents
const CHAPTER_TITLES = [
  "THE_SPIRIT",
  "THE_SCIENCE", 
  "THE_NUMERICAL_FORMULA_OF_SPIRIT",
  "KINETIC_SHOCK_WAVES_OF_NINE",
  "HARMONIC_CASCADENCE",
  "DOUBLING_IS_AN_OPTICAL_ILLUSION",
  "BASE_TEN_MIRRORING",
  "SPIRES",
  "RODIN_COIL_TECHNOLOGY",
  "HARMONIC_ELECTRON_SHEAR",
  "ONLY_PERFECTION_EXISTS",
  "INFINITUM_MAGNIFICATION",
  "THREE_FAMILY_NUMBER_GROUP_PHASE_SHIFTS",
  "VBM_GREAT_PYRAMID_NUMBER_MAP",
  "NUMBER_ASSOCIATIONS",
  "SCIENCE_OF_BEING",
  "VBM_PEER_REVIEWS_AND_ENDORSEMENTS"
];

class PDFExactChapterSplitter {
  constructor() {
    this.outputDir = './split-pdfs/exact-chapters';
    this.ensureOutputDirectory();
  }

  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async splitByExactChapters(inputPath) {
    console.log(`📚 Splitting PDF by exact chapter pages: ${inputPath}`);
    
    try {
      const dataBuffer = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(dataBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      console.log(`📄 Total pages in PDF: ${pageCount}`);
      console.log(`📚 Chapter start pages: ${CHAPTER_START_PAGES.join(', ')}`);
      
      for (let i = 0; i < CHAPTER_START_PAGES.length; i++) {
        const chapterStart = CHAPTER_START_PAGES[i];
        const nextChapterStart = CHAPTER_START_PAGES[i + 1];
        const chapterEnd = nextChapterStart ? nextChapterStart - 1 : pageCount;
        
        // Adjust page ranges to actual PDF bounds
        const pageStart = Math.max(1, chapterStart) - 1; // PDF pages are 0-indexed
        const pageEnd = Math.min(pageCount - 1, chapterEnd - 1);
        
        if (pageStart <= pageEnd && pageStart < pageCount) {
          // Create new PDF for this chapter
          const newPdfDoc = await PDFDocument.create();
          const pages = await newPdfDoc.copyPages(pdfDoc, Array.from(
            { length: pageEnd - pageStart + 1 }, 
            (_, j) => pageStart + j
          ));
          
          pages.forEach(page => newPdfDoc.addPage(page));
          
          // Save chapter PDF
          const chapterTitle = CHAPTER_TITLES[i] || `Chapter_${i + 1}`;
          const outputPath = path.join(this.outputDir, `Chapter_${i + 1}_${chapterTitle}.pdf`);
          
          const pdfBytes = await newPdfDoc.save();
          fs.writeFileSync(outputPath, pdfBytes);
          
          console.log(`✅ Created: Chapter_${i + 1}_${chapterTitle}.pdf (Pages ${chapterStart}-${chapterEnd})`);
        } else {
          console.log(`⚠️ Skipping Chapter ${i + 1} - page range outside PDF bounds`);
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
    
    CHAPTER_START_PAGES.forEach((startPage, index) => {
      const nextStart = CHAPTER_START_PAGES[index + 1];
      const endPage = nextStart ? nextStart - 1 : 291;
      const title = CHAPTER_TITLES[index] || `Chapter_${index + 1}`;
      
      console.log(`${index + 1}. ${title.replace(/_/g, ' ')}`);
      console.log(`   File: Chapter_${index + 1}_${title}.pdf`);
      console.log(`   Pages: ${startPage}-${endPage}`);
      console.log('');
    });
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📚 PDF Chapter Splitter - Exact Chapter Pages

Usage:
  node split-pdf-exact-chapters.js <input-pdf>

Example:
  node split-pdf-exact-chapters.js "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf"
    `);
    return;
  }
  
  const inputPath = args[0];
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    return;
  }
  
  const splitter = new PDFExactChapterSplitter();
  
  try {
    await splitter.splitByExactChapters(inputPath);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { PDFExactChapterSplitter, CHAPTER_START_PAGES }; 