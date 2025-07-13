// scripts/convert-book-chunks-to-json.js
// Converts extracted book chunks to JSON for PWA use

const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const PDF_PATH = path.join(__dirname, '../docs/Marko Rodin Special Edition.pdf');
const OUTPUT_PATH = path.join(__dirname, '../public/book-chunks.json');
const CHUNK_SIZE = 1500;

function chunkText(text, size) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + size));
    i += size;
  }
  return chunks;
}

function summarizeChunk(chunk) {
  const firstSentence = chunk.split(/[.!?]/)[0];
  return firstSentence.length > 30 ? firstSentence : chunk.slice(0, 200);
}

async function main() {
  const dataBuffer = fs.readFileSync(PDF_PATH);
  const data = await pdf(dataBuffer);
  const text = data.text.replace(/\n{2,}/g, '\n');
  const chunks = chunkText(text, CHUNK_SIZE);

  const json = chunks.map((chunk, idx) => ({
    chunk: idx + 1,
    summary: summarizeChunk(chunk).trim(),
    text: chunk.trim(),
    page: null // Page number not available in this mode
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(json, null, 2));
  console.log(`Wrote ${json.length} book chunks to ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Error converting book to JSON:', err);
}); 