// scripts/chunk-and-distribute-pdfs.js
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Helper: Recursively find all PDFs in src/
function findAllPDFs(dir, results = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      findAllPDFs(filePath, results);
    } else if (file.toLowerCase().endsWith('.pdf')) {
      results.push(filePath);
    }
  });
  return results;
}

// Helper: Get digit directory from file path (e.g., src/0/rodin-knowledge/...) => 0)
function getDigitDir(filePath) {
  const match = filePath.match(/src\/(\d)\//);
  return match ? match[1] : null;
}

// Main logic
(async function() {
  const srcRoot = path.join(__dirname, '..', 'src');
  const manifest = [];
  const pdfFiles = findAllPDFs(srcRoot);

  for (const pdfPath of pdfFiles) {
    const digit = getDigitDir(pdfPath);
    if (!digit) continue;
    const data = fs.readFileSync(pdfPath);
    const pdf = await pdfParse(data);
    for (let i = 0; i < pdf.numpages; i++) {
      // For each page, create a chunk file
      const chunkDir = path.join(srcRoot, digit, 'chunks');
      if (!fs.existsSync(chunkDir)) fs.mkdirSync(chunkDir, { recursive: true });
      const chunkPath = path.join(chunkDir, `${path.basename(pdfPath, '.pdf')}_page${i+1}.txt`);
      const pageText = pdf.text.split('\f')[i] || '';
      fs.writeFileSync(chunkPath, pageText.trim());
      manifest.push({
        pdf: pdfPath.replace(srcRoot + '/', ''),
        digit,
        chunk: chunkPath.replace(srcRoot + '/', ''),
        page: i + 1
      });
    }
  }
  // Write manifest
  const manifestPath = path.join(srcRoot, 'pdf-chunks-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Chunked and distributed ${pdfFiles.length} PDFs. Manifest written to src/pdf-chunks-manifest.json.`);
})(); 