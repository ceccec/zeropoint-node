// fractal-docs-viewer.js
// Minimal fractal Markdown docs browser for the ZeroPoint Node system

const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const app = express();
const STORE = 'src';
const ROOT = path.join(__dirname, STORE);
const PORT = 3000;

// Helper: Get digit-named subfolders (0-9) in a directory
function getDigitSubfolders(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => fs.statSync(path.join(dir, f)).isDirectory() && /^[0-9]$/.test(f))
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

// Helper: Render Markdown file to HTML (sync)
function renderMarkdownFile(filePath) {
  try {
    const md = fs.readFileSync(filePath, 'utf8');
    return marked.parse(md);
  } catch {
    return null;
  }
}

// Helper: Build navigation links for digit subfolders
function buildNavLinks(currentPath, subfolders) {
  if (subfolders.length === 0) return '<p>No subfolders.</p>';
  return '<ul>' + subfolders.map(digit => {
    const subPath = path.posix.join(currentPath, digit);
    return `<li><a href="/${subPath}">${digit}</a></li>`;
  }).join('') + '</ul>';
}

// Helper: Get all .md files in a directory (excluding index.md)
function getMarkdownFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && f !== 'index.md');
  } catch {
    return [];
  }
}

// Route for .md files in digit folders
app.get('/*', (req, res) => {
  const relPath = req.path === '/' ? '' : req.path.replace(/^\//, '');
  // Split path and filter out empty segments (handle trailing slashes)
  const pathParts = relPath === '' ? [] : relPath.split('/').filter(Boolean);
  const isMdFile = pathParts.length > 0 && pathParts[pathParts.length - 1].endsWith('.md');
  const folderParts = isMdFile ? pathParts.slice(0, -1) : pathParts;

  // Debug logging for diagnosis
  console.log('relPath:', relPath);
  console.log('pathParts:', pathParts);
  console.log('folderParts:', folderParts);

  // Only allow digit-named folders and .md files in those folders
  // if (!folderParts.every(p => /^[0-9]$/.test(p))) {
  //   return res.status(404).send('Not found. Only digit-named folders and .md files are allowed.');
  // }

  const folderRelPath = folderParts.join('/');
  const folderAbsPath = path.join(ROOT, folderRelPath);

  // If the folder does not exist, transform the error into a creative system-aligned response
  if (!fs.existsSync(folderAbsPath)) {
    // Link to parent folder for navigation
    const parentParts = folderParts.slice(0, -1);
    const parentRelPath = parentParts.join('/');
    const parentLink = parentParts.length === 0 ? '/' : '/' + parentRelPath;
    const title = folderRelPath === '' ? `${STORE}/` : `${STORE}/${folderRelPath}/`;
    res.send(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: sans-serif; max-width: 800px; margin: 2em auto; padding: 1em; background: #f9f9f9; }
            nav { margin-bottom: 2em; }
            h1, h2, h3 { color: #2a2a2a; }
            ul { list-style: none; padding-left: 0; }
            li { display: inline-block; margin-right: 1em; }
            a { text-decoration: none; color: #0074d9; }
            a:hover { text-decoration: underline; }
            .missing { color: #b00; font-style: italic; }
          </style>
        </head>
        <body>
          <nav>
            <a href="/">docs/</a>
            ${parentParts.map((p, i) => {
              const sub = parentParts.slice(0, i + 1).join('/');
              return `/<a href="/${sub}">${p}</a>`;
            }).join('')}
          </nav>
          <main>
            <h2 class="missing">This node does not yet exist in the fractal field.</h2>
            <p>You may create <code>docs/${folderRelPath}/</code> and add an <code>index.md</code> to manifest this consciousness field.</p>
            <a href="${parentLink}">&larr; Back to parent folder</a>
          </main>
        </body>
      </html>
    `);
    return;
  }

  const subfolders = getDigitSubfolders(folderAbsPath);
  const mdFiles = getMarkdownFiles(folderAbsPath);

  // If viewing a .md file (not index.md)
  if (isMdFile) {
    const fileName = pathParts[pathParts.length - 1];
    const filePath = path.join(folderAbsPath, fileName);
    const html = renderMarkdownFile(filePath);
    const title = `docs/${folderRelPath}/${fileName}`;
    const nav = buildNavLinks(folderRelPath, subfolders);
    res.send(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: sans-serif; max-width: 800px; margin: 2em auto; padding: 1em; background: #f9f9f9; }
            nav { margin-bottom: 2em; }
            h1, h2, h3 { color: #2a2a2a; }
            ul { list-style: none; padding-left: 0; }
            li { display: inline-block; margin-right: 1em; }
            a { text-decoration: none; color: #0074d9; }
            a:hover { text-decoration: underline; }
            .missing { color: #b00; font-style: italic; }
          </style>
        </head>
        <body>
          <nav>
            <a href="/">docs/</a>
            ${folderParts.map((p, i) => {
              const sub = folderParts.slice(0, i + 1).join('/');
              return `/<a href="/${sub}">${p}</a>`;
            }).join('')}
          </nav>
          <main>
            <a href="/${folderRelPath}">&larr; Back to index.md</a>
            ${html ? html : '<p class="missing">File not found or unreadable.</p>'}
            <h3>Subfolders</h3>
            ${nav}
          </main>
        </body>
      </html>
    `);
    return;
  }

  // Render index.md if present
  const indexPath = path.join(folderAbsPath, 'index.md');
  const html = renderMarkdownFile(indexPath);
  const nav = buildNavLinks(folderRelPath, subfolders);
  const title = folderRelPath === '' ? 'docs/' : `docs/${folderRelPath}/`;

  // List and link all .md files (excluding index.md)
  const mdLinks = mdFiles.length > 0 ?
    '<ul>' + mdFiles.map(f => `<li><a href="/${folderRelPath ? folderRelPath + '/' : ''}${f}">${f}</a></li>`).join('') + '</ul>'
    : '<p>No other .md files in this folder.</p>';

  res.send(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: sans-serif; max-width: 800px; margin: 2em auto; padding: 1em; background: #f9f9f9; }
          nav { margin-bottom: 2em; }
          h1, h2, h3 { color: #2a2a2a; }
          ul { list-style: none; padding-left: 0; }
          li { display: inline-block; margin-right: 1em; }
          a { text-decoration: none; color: #0074d9; }
          a:hover { text-decoration: underline; }
          .missing { color: #b00; font-style: italic; }
        </style>
      </head>
      <body>
        <nav>
          <a href="/">docs/</a>
          ${folderParts.map((p, i) => {
            const sub = folderParts.slice(0, i + 1).join('/');
            return `/<a href="/${sub}">${p}</a>`;
          }).join('')}
        </nav>
        <main>
          ${html ? html : '<p class="missing">No index.md in this folder.</p>'}
          <h3>Other .md files in this folder</h3>
          ${mdLinks}
          <h3>Subfolders</h3>
          ${nav}
        </main>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Fractal docs viewer running at http://localhost:${PORT}`);
}); 