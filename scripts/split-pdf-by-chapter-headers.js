#!/usr/bin/env node

/**
 * 📚 PDF Chapter Splitter - By Chapter Headers
 * 
 * This script finds actual chapter headers in the PDF text and splits at those points.
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

// Chapter headers to look for
const CHAPTER_HEADERS = [
  "THE SPIRIT",
  "THE SCIENCE", 
  "THE NUMERICAL FORMULA OF SPIRIT",
  "KINETIC SHOCK WAVES OF NINE",
  "HARMONIC CASCADENCE",
  "DOUBLING IS AN OPTICAL ILLUSION",
  "BASE TEN MIRRORING",
  "SPIRES",
  "RODIN COIL TECHNOLOGY",
  "HARMONIC ELECTRON SHEAR",
  "ONLY PERFECTION EXISTS",
  "INFINITUM MAGNIFICATION",
  "THREE FAMILY NUMBER GROUP PHASE SHIFTS",
  "VBM GREAT PYRAMID NUMBER MAP",
  "NUMBER ASSOCIATIONS",
  "SCIENCE OF BEING",
  "VBM PEER REVIEWS & ENDORSEMENTS"
];

class PDFChapterHeaderSplitter {
  constructor() {
    this.outputDir = './split-pdfs/accurate-chapters';
    this.ensureOutputDirectory();
  }

  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async splitByChapterHeaders(inputPath) {
    console.log(`📚 Splitting PDF by chapter headers: ${inputPath}`);
    
    try {
      // First, extract text to find chapter positions
      const dataBuffer = fs.readFileSync(inputPath);
      const data = await pdfParse(dataBuffer);
      
      console.log(`📄 Total pages: ${data.numpages}`);
      console.log(`📝 Text length: ${data.text.length} characters`);
      
      // Find chapter positions
      const chapters = this.findChapterPositions(data.text);
      console.log(`📚 Found ${chapters.length} chapters`);
      
      if (chapters.length === 0) {
        console.log('❌ No chapters found. Trying alternative approach...');
        return this.splitByAlternativeMethod(inputPath);
      }
      
      // Split PDF based on found chapters
      await this.splitPDFByChapters(inputPath, chapters);
      
      return chapters;
      
    } catch (error) {
      console.error('❌ Error processing PDF:', error.message);
      throw error;
    }
  }

  findChapterPositions(text) {
    const chapters = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toUpperCase();
      
      for (const header of CHAPTER_HEADERS) {
        if (line.includes(header) || line === header) {
          const pageNumber = this.estimatePageFromLineNumber(i, lines.length, 291);
          chapters.push({
            title: header,
            pageStart: pageNumber,
            lineNumber: i,
            foundText: line
          });
          console.log(`Found chapter: ${header} at page ~${pageNumber} (line: "${line}")`);
          break;
        }
      }
    }
    
    // Sort by page number and remove duplicates
    const uniqueChapters = [];
    const seenPages = new Set();
    
    chapters.sort((a, b) => a.pageStart - b.pageStart);
    
    for (const chapter of chapters) {
      if (!seenPages.has(chapter.pageStart)) {
        uniqueChapters.push(chapter);
        seenPages.add(chapter.pageStart);
      }
    }
    
    return uniqueChapters;
  }

  estimatePageFromLineNumber(lineNumber, totalLines, totalPages) {
    // Rough estimation: assume lines are distributed evenly across pages
    const linesPerPage = totalLines / totalPages;
    return Math.floor(lineNumber / linesPerPage) + 1;
  }

  async splitByAlternativeMethod(inputPath) {
    console.log('🔄 Using alternative chapter detection...');
    
    // Try to find chapters by looking for common patterns
    const dataBuffer = fs.readFileSync(inputPath);
    const data = await pdfParse(dataBuffer);
    
    const lines = data.text.split('\n');
    const chapters = [];
    
    // Look for lines that are all caps and contain chapter-like words
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const upperLine = line.toUpperCase();
      
      // Look for chapter indicators
      if (upperLine.includes('CHAPTER') || 
          upperLine.includes('THE ') ||
          (upperLine.length > 10 && upperLine.length < 50 && 
           upperLine === line && !line.includes(' '))) {
        
        const pageNumber = this.estimatePageFromLineNumber(i, lines.length, 291);
        chapters.push({
          title: line,
          pageStart: pageNumber,
          lineNumber: i,
          foundText: line
        });
        console.log(`Found potential chapter: "${line}" at page ~${pageNumber}`);
      }
    }
    
    if (chapters.length > 0) {
      await this.splitPDFByChapters(inputPath, chapters);
    }
    
    return chapters;
  }

  async splitPDFByChapters(inputPath, chapters) {
    console.log(`✂️ Splitting PDF into ${chapters.length} chapters`);
    
    try {
      const dataBuffer = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(dataBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        const nextChapter = chapters[i + 1];
        
        const pageStart = Math.max(0, chapter.pageStart - 1); // PDF pages are 0-indexed
        const pageEnd = nextChapter ? Math.min(pageCount - 1, nextChapter.pageStart - 2) : pageCount - 1;
        
        if (pageStart <= pageEnd && pageStart < pageCount) {
          // Create new PDF for this chapter
          const newPdfDoc = await PDFDocument.create();
          const pages = await newPdfDoc.copyPages(pdfDoc, Array.from(
            { length: pageEnd - pageStart + 1 }, 
            (_, i) => pageStart + i
          ));
          
          pages.forEach(page => newPdfDoc.addPage(page));
          
          // Save chapter PDF
          const safeTitle = chapter.title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_');
          const outputPath = path.join(this.outputDir, `Chapter_${i + 1}_${safeTitle}.pdf`);
          
          const pdfBytes = await newPdfDoc.save();
          fs.writeFileSync(outputPath, pdfBytes);
          
          console.log(`✅ Created: ${outputPath} (Pages ${chapter.pageStart}-${pageEnd + 1})`);
        }
      }
      
      console.log(`🎉 PDF splitting complete! Files saved in: ${this.outputDir}`);
      
    } catch (error) {
      console.error('❌ Error splitting PDF:', error.message);
      throw error;
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📚 PDF Chapter Splitter - By Chapter Headers

Usage:
  node split-pdf-by-chapter-headers.js <input-pdf>

Example:
  node split-pdf-by-chapter-headers.js "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf"
    `);
    return;
  }
  
  const inputPath = args[0];
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    return;
  }
  
  const splitter = new PDFChapterHeaderSplitter();
  
  try {
    await splitter.splitByChapterHeaders(inputPath);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { PDFChapterHeaderSplitter }; 