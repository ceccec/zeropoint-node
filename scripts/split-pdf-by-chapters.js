#!/usr/bin/env node

/**
 * 📚 PDF Chapter Splitter
 * 
 * This script splits large PDFs by chapters using various methods:
 * 1. Text-based chapter detection
 * 2. Manual chapter markers
 * 3. Page-based splitting
 * 4. Table of contents extraction
 * 
 * Dependencies: pdf-lib, pdf-parse (for text extraction)
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

class PDFChapterSplitter {
  constructor() {
    this.outputDir = './split-pdfs';
    this.ensureOutputDirectory();
  }

  /**
   * Ensure output directory exists
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Split PDF by text-based chapter detection
   */
  async splitByTextDetection(inputPath, chapterPatterns = []) {
    console.log(`🔍 Analyzing PDF: ${inputPath}`);
    
    try {
      // Read the PDF
      const dataBuffer = fs.readFileSync(inputPath);
      const data = await pdfParse(dataBuffer);
      
      console.log(`📄 Total pages: ${data.numpages}`);
      console.log(`📝 Text length: ${data.text.length} characters`);
      
      // Default chapter patterns if none provided
      const patterns = chapterPatterns.length > 0 ? chapterPatterns : [
        /^Chapter\s+\d+/i,
        /^CHAPTER\s+\d+/i,
        /^\d+\.\s+[A-Z]/i,
        /^[A-Z][A-Z\s]+\d*$/i
      ];
      
      const chapters = this.detectChapters(data.text, patterns);
      console.log(`📚 Found ${chapters.length} potential chapters`);
      
      // Split PDF based on detected chapters
      await this.splitPDFByChapters(inputPath, chapters);
      
      return chapters;
      
    } catch (error) {
      console.error('❌ Error processing PDF:', error.message);
      throw error;
    }
  }

  /**
   * Detect chapters in text using patterns
   */
  detectChapters(text, patterns) {
    const chapters = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      for (const pattern of patterns) {
        if (pattern.test(line)) {
          chapters.push({
            title: line,
            pageStart: this.estimatePageFromLineNumber(i, lines.length),
            lineNumber: i,
            pattern: pattern.toString()
          });
          break;
        }
      }
    }
    
    return chapters;
  }

  /**
   * Estimate page number from line number
   */
  estimatePageFromLineNumber(lineNumber, totalLines) {
    // Rough estimation: assume 50 lines per page
    const linesPerPage = 50;
    return Math.floor(lineNumber / linesPerPage) + 1;
  }

  /**
   * Split PDF by manual chapter markers
   */
  async splitByManualMarkers(inputPath, chapterMarkers) {
    console.log(`📚 Splitting PDF with ${chapterMarkers.length} manual markers`);
    
    const chapters = [];
    for (let i = 0; i < chapterMarkers.length; i++) {
      const marker = chapterMarkers[i];
      const nextMarker = chapterMarkers[i + 1];
      
      chapters.push({
        title: marker.title,
        pageStart: marker.page,
        pageEnd: nextMarker ? nextMarker.page - 1 : null
      });
    }
    
    await this.splitPDFByChapters(inputPath, chapters);
    return chapters;
  }

  /**
   * Split PDF by equal page chunks
   */
  async splitByPageChunks(inputPath, pagesPerChunk = 50) {
    console.log(`📄 Splitting PDF into chunks of ${pagesPerChunk} pages`);
    
    const dataBuffer = fs.readFileSync(inputPath);
    const data = await pdfParse(dataBuffer);
    
    const chapters = [];
    const totalChunks = Math.ceil(data.numpages / pagesPerChunk);
    
    for (let i = 0; i < totalChunks; i++) {
      const pageStart = i * pagesPerChunk + 1;
      const pageEnd = Math.min((i + 1) * pagesPerChunk, data.numpages);
      
      chapters.push({
        title: `Chapter ${i + 1} (Pages ${pageStart}-${pageEnd})`,
        pageStart: pageStart,
        pageEnd: pageEnd
      });
    }
    
    await this.splitPDFByChapters(inputPath, chapters);
    return chapters;
  }

  /**
   * Split PDF by table of contents
   */
  async splitByTableOfContents(inputPath) {
    console.log(`📋 Attempting to extract table of contents`);
    
    try {
      const dataBuffer = fs.readFileSync(inputPath);
      const data = await pdfParse(dataBuffer);
      
      // Look for table of contents patterns
      const tocPatterns = [
        /Table of Contents/i,
        /Contents/i,
        /Index/i
      ];
      
      const lines = data.text.split('\n');
      let tocStart = -1;
      
      // Find TOC section
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (tocPatterns.some(pattern => pattern.test(line))) {
          tocStart = i;
          break;
        }
      }
      
      if (tocStart === -1) {
        console.log('⚠️ No table of contents found');
        return [];
      }
      
      // Extract chapter information from TOC
      const chapters = this.extractChaptersFromTOC(lines, tocStart);
      await this.splitPDFByChapters(inputPath, chapters);
      
      return chapters;
      
    } catch (error) {
      console.error('❌ Error extracting TOC:', error.message);
      return [];
    }
  }

  /**
   * Extract chapters from table of contents
   */
  extractChaptersFromTOC(lines, tocStart) {
    const chapters = [];
    
    for (let i = tocStart; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for chapter patterns in TOC
      if (/^\d+\.\s+[A-Z]/.test(line) || /^Chapter\s+\d+/i.test(line)) {
        const pageMatch = line.match(/(\d+)\s*$/);
        if (pageMatch) {
          chapters.push({
            title: line.replace(/\d+\s*$/, '').trim(),
            pageStart: parseInt(pageMatch[1])
          });
        }
      }
    }
    
    return chapters;
  }

  /**
   * Split PDF into separate files based on chapters
   */
  async splitPDFByChapters(inputPath, chapters) {
    console.log(`✂️ Splitting PDF into ${chapters.length} chapters`);
    
    try {
      const dataBuffer = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(dataBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        const nextChapter = chapters[i + 1];
        
        const pageStart = chapter.pageStart - 1; // PDF pages are 0-indexed
        const pageEnd = nextChapter ? nextChapter.pageStart - 2 : pageCount - 1;
        
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
      
      console.log(`🎉 PDF splitting complete! Files saved in: ${this.outputDir}`);
      
    } catch (error) {
      console.error('❌ Error splitting PDF:', error.message);
      throw error;
    }
  }

  /**
   * Generate chapter summary
   */
  generateChapterSummary(chapters) {
    console.log('\n📊 Chapter Summary:');
    console.log('==================');
    
    chapters.forEach((chapter, index) => {
      console.log(`${index + 1}. ${chapter.title}`);
      console.log(`   Pages: ${chapter.pageStart}${chapter.pageEnd ? `-${chapter.pageEnd}` : '+'}`);
      if (chapter.pattern) {
        console.log(`   Pattern: ${chapter.pattern}`);
      }
      console.log('');
    });
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📚 PDF Chapter Splitter

Usage:
  node split-pdf-by-chapters.js <input-pdf> [method] [options]

Methods:
  text     - Text-based chapter detection (default)
  manual   - Manual chapter markers
  chunks   - Equal page chunks
  toc      - Table of contents extraction

Examples:
  node split-pdf-by-chapters.js "Marko Rodin Special Edition.pdf"
  node split-pdf-by-chapters.js "book.pdf" chunks 25
  node split-pdf-by-chapters.js "book.pdf" manual
    `);
    return;
  }
  
  const inputPath = args[0];
  const method = args[1] || 'text';
  const options = args.slice(2);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    return;
  }
  
  const splitter = new PDFChapterSplitter();
  
  try {
    let chapters;
    
    switch (method) {
      case 'text':
        chapters = await splitter.splitByTextDetection(inputPath);
        break;
        
      case 'manual':
        console.log('📝 Manual chapter markers not implemented yet');
        console.log('Please use text detection or chunks method');
        return;
        
      case 'chunks':
        const pagesPerChunk = parseInt(options[0]) || 50;
        chapters = await splitter.splitByPageChunks(inputPath, pagesPerChunk);
        break;
        
      case 'toc':
        chapters = await splitter.splitByTableOfContents(inputPath);
        break;
        
      default:
        console.error(`❌ Unknown method: ${method}`);
        return;
    }
    
    splitter.generateChapterSummary(chapters);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { PDFChapterSplitter }; 