# 📚 PDF Chapter Splitting Guide

## Overview

This guide provides multiple methods to split large PDFs by chapters using command-line tools and scripts. The tools support various approaches from automatic text detection to manual chapter markers.

## 🛠️ Available Tools

### 1. **Simple Shell Script** (`scripts/split-pdf-simple.sh`)
- **Best for**: Quick splitting with command-line tools
- **Dependencies**: pdftk-java, poppler, qpdf
- **Methods**: Text extraction, page chunks, manual ranges

### 2. **Node.js Script** (`scripts/split-pdf-by-chapters.js`)
- **Best for**: Advanced text-based chapter detection
- **Dependencies**: pdf-lib, pdf-parse
- **Methods**: Pattern detection, table of contents extraction

## 📋 Installation

### Required Tools
```bash
# Install command-line tools
brew install pdftk-java poppler qpdf

# Install Node.js dependencies
npm install pdf-lib pdf-parse
```

## 🚀 Usage Methods

### Method 1: Equal Page Chunks (Recommended for Large PDFs)

Split PDF into equal-sized chunks for easier reading:

```bash
# Split into 50-page chunks
./scripts/split-pdf-simple.sh "book.pdf" chunks 50

# Split into 73-page chunks (as demonstrated with Marko Rodin PDF)
./scripts/split-pdf-simple.sh "book.pdf" chunks 73
```

**Benefits:**
- ✅ Works with any PDF
- ✅ No text extraction required
- ✅ Consistent file sizes
- ✅ Fast processing

### Method 2: Text-Based Chapter Detection

Extract text and find chapter patterns:

```bash
# Extract text and search for chapters
./scripts/split-pdf-simple.sh "book.pdf" extract
```

**Benefits:**
- ✅ Automatic chapter detection
- ✅ Preserves chapter structure
- ✅ Shows chapter locations

**Limitations:**
- ❌ Requires readable text in PDF
- ❌ May miss chapters if text is unclear
- ❌ Slower processing

### Method 3: Manual Chapter Ranges

Create a chapter ranges file and split accordingly:

```bash
# Create template
./scripts/split-pdf-simple.sh "book.pdf" template my_chapters.txt

# Edit the file with your chapter ranges
# Format: "Chapter Title: start_page-end_page"

# Split using the ranges file
./scripts/split-pdf-simple.sh "book.pdf" ranges my_chapters.txt
```

**Benefits:**
- ✅ Precise chapter boundaries
- ✅ Custom chapter titles
- ✅ Full control over splitting

**Limitations:**
- ❌ Requires manual page number identification
- ❌ Time-consuming for large documents

### Method 4: Advanced Node.js Script

Use the JavaScript version for more sophisticated detection:

```bash
# Text-based detection (default)
node scripts/split-pdf-by-chapters.js "book.pdf"

# Equal chunks
node scripts/split-pdf-by-chapters.js "book.pdf" chunks 50

# Table of contents extraction
node scripts/split-pdf-by-chapters.js "book.pdf" toc
```

## 📊 Chapter Range File Format

Create a text file with chapter ranges:

```txt
# Chapter Ranges File
# Format: "Chapter Title: start_page-end_page"

Introduction: 1-20
Chapter 1 - The Beginning: 21-50
Chapter 2 - The Middle: 51-80
Chapter 3 - The End: 81-100

# Comments start with #
# Empty lines are ignored
```

## 🔍 Chapter Detection Patterns

The tools automatically detect these chapter patterns:

### Text Patterns
- `Chapter 1`, `CHAPTER 1`
- `Part 1`, `PART 1`
- `1. Chapter Title`
- `Section 1`
- All-caps titles: `THE SPIRIT — CHAPTER 1`

### Number Patterns
- Sequential numbering: `1.`, `2.`, `3.`
- Chapter numbers: `Chapter 1`, `Chapter 2`
- Section numbers: `Section 1`, `Section 2`

## 📁 Output Structure

All split PDFs are saved to `./split-pdfs/` directory:

```
split-pdfs/
├── Chapter_1_Introduction.pdf
├── Chapter_2_The_Spirit.pdf
├── Chapter_3_The_Science.pdf
├── Chapter_4_The_Numerical_Formula.pdf
└── extracted_text.txt (if using text extraction)
```

## 🎯 Best Practices

### For Large Academic PDFs
1. **Start with equal chunks**: `chunks 50` or `chunks 73`
2. **Extract text** to find chapter patterns
3. **Create manual ranges** for precise splitting
4. **Test with small sections** first

### For Books with Clear Chapters
1. **Use text extraction** to find chapters
2. **Create manual ranges** based on findings
3. **Split with precise ranges**

### For Scanned PDFs
1. **Use equal chunks** (text extraction won't work)
2. **Manual page counting** for chapter boundaries
3. **OCR first** if text extraction is needed

## 📈 Performance Tips

### Fast Processing
```bash
# Use equal chunks for speed
./scripts/split-pdf-simple.sh "large.pdf" chunks 100
```

### Accurate Chapters
```bash
# Extract text first to find chapters
./scripts/split-pdf-simple.sh "book.pdf" extract

# Then create manual ranges based on findings
./scripts/split-pdf-simple.sh "book.pdf" ranges chapters.txt
```

### Memory Efficient
```bash
# Process smaller chunks for large PDFs
./scripts/split-pdf-simple.sh "huge.pdf" chunks 25
```

## 🔧 Troubleshooting

### Common Issues

**"pdftk not found"**
```bash
brew install pdftk-java
```

**"pdftotext not found"**
```bash
brew install poppler
```

**"Permission denied"**
```bash
chmod +x scripts/split-pdf-simple.sh
```

**"File not found"**
- Check file path and name
- Use quotes for filenames with spaces
- Ensure file exists in specified location

### Error Solutions

**Text extraction fails**
- PDF may be scanned/image-based
- Use equal chunks instead
- Try OCR first if needed

**Chapter detection poor**
- PDF formatting may be inconsistent
- Use manual ranges
- Check extracted text for patterns

**Memory issues with large PDFs**
- Use smaller chunk sizes
- Process in sections
- Ensure sufficient disk space

## 📋 Example Workflow

### Complete Example: Marko Rodin PDF

```bash
# 1. Extract text to find chapters
./scripts/split-pdf-simple.sh "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf" extract

# 2. Check extracted text for chapter patterns
grep -n -i "chapter" ./split-pdfs/extracted_text.txt

# 3. Create chapter ranges file
cat > marko_chapters.txt << EOF
Introduction: 1-58
THE SPIRIT — CHAPTER 1: 59-131
THE SCIENCE — CHAPTER 2: 132-218
THE NUMERICAL FORMULA — CHAPTER 3: 219-291
EOF

# 4. Split using manual ranges
./scripts/split-pdf-simple.sh "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf" ranges marko_chapters.txt

# 5. Or use equal chunks for simplicity
./scripts/split-pdf-simple.sh "docs/Marko Rodin Special Edition/Marko Rodin Special Edition.pdf" chunks 73
```

## 🎉 Success Indicators

### ✅ Successful Split
- Files created in `./split-pdfs/`
- No error messages
- File sizes are reasonable
- Page counts match expectations

### ✅ Good Chapter Detection
- Chapter titles are meaningful
- Page ranges are logical
- No overlapping chapters
- All content is included

## 📚 Advanced Features

### Custom Chapter Patterns
Edit the scripts to add custom patterns:

```javascript
// In split-pdf-by-chapters.js
const customPatterns = [
  /^Chapter\s+\d+/i,
  /^Section\s+\d+/i,
  /^Part\s+\d+/i,
  /^Book\s+\d+/i
];
```

### Batch Processing
Process multiple PDFs:

```bash
for pdf in *.pdf; do
  ./scripts/split-pdf-simple.sh "$pdf" chunks 50
done
```

### Integration with Other Tools
Combine with other PDF tools:

```bash
# Compress after splitting
for pdf in split-pdfs/*.pdf; do
  qpdf --linearize "$pdf" "compressed_$pdf"
done
```

---

**Remember**: Start with equal chunks for large PDFs, then refine with text extraction and manual ranges for precise chapter splitting. The tools are designed to work with any PDF format and provide multiple approaches for different document types. 