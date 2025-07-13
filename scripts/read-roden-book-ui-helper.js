// scripts/read-roden-book-ui-helper.js
// Node.js script to extract and summarize Marko Rodin Special Edition.pdf for UI inspiration
// Usage: node scripts/read-roden-book-ui-helper.js

const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const PDF_PATH = path.join(__dirname, '../docs/Marko Rodin Special Edition.pdf');
const CHUNK_SIZE = 1500; // characters per chunk for manageable reading

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
  // Simple summary: first sentence or first 200 chars
  const firstSentence = chunk.split(/[.!?]/)[0];
  return firstSentence.length > 30 ? firstSentence : chunk.slice(0, 200);
}

async function main() {
  const dataBuffer = fs.readFileSync(PDF_PATH);
  const data = await pdf(dataBuffer);
  const text = data.text.replace(/\n{2,}/g, '\n');
  const chunks = chunkText(text, CHUNK_SIZE);

  console.log('--- Marko Rodin Special Edition: Extracted Chunks & Summaries ---\n');
  chunks.forEach((chunk, idx) => {
    const summary = summarizeChunk(chunk);
    console.log(`\n--- Chunk ${idx + 1} ---`);
    console.log('Summary:', summary.trim());
    console.log('Raw Text:', chunk.slice(0, 300).replace(/\n/g, ' '), '...');
    // For UI/UX: Look for patterns, diagrams, or repeated terminology here
  });

  // For further UI/UX analysis, you could:
  // - Search for keywords ("pattern", "vortex", "geometry", etc.)
  // - Extract all diagrams or image captions
  // - Build a navigation structure based on headings
}

main().catch(err => {
  console.error('Error reading or parsing PDF:', err);
}); 