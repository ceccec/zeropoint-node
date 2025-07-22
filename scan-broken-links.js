// scan-broken-links.js
// Node.js script to crawl fractal docs viewer and report broken links

const cheerio = require('cheerio');

const BASE_URL = process.env.DOCS_URL || 'http://localhost:3000';
const MAX_DEPTH = 10;
const visited = new Set();
const brokenLinks = [];

// Helper: get fetch function (built-in or node-fetch)
async function getFetch() {
  if (typeof fetch === 'function') return fetch;
  return (await import('node-fetch')).default;
}

// Helper: Normalize and resolve URLs
function resolveUrl(base, href) {
  if (!href) return null;
  if (href.startsWith('http')) return href;
  if (href.startsWith('/')) return BASE_URL + href;
  return base.replace(/\/$/, '') + '/' + href.replace(/^\//, '');
}

// Helper: Should we follow this link?
function isValidLink(href) {
  // Only follow digit-folder or .md links
  return /^\/?([0-9]+(\/[0-9]+)*\/?(index\.md|[a-zA-Z0-9_-]+\.md)?)?$/.test(href);
}

async function crawl(url, depth, fetchFn) {
  if (depth > MAX_DEPTH || visited.has(url)) return;
  visited.add(url);
  try {
    const res = await fetchFn(url);
    if (!res.ok) {
      brokenLinks.push({ url, status: res.status });
      return;
    }
    const html = await res.text();
    const $ = cheerio.load(html);
    // Find all <a href="..."> links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!isValidLink(href)) return;
      const nextUrl = resolveUrl(url, href);
      if (nextUrl && !visited.has(nextUrl)) {
        crawl(nextUrl, depth + 1, fetchFn);
      }
    });
  } catch (err) {
    brokenLinks.push({ url, status: 'fetch error', error: err.message });
  }
}

(async () => {
  console.log(`Scanning for broken links at ${BASE_URL} ...`);
  const fetchFn = await getFetch();
  await crawl(BASE_URL + '/', 0, fetchFn);
  // Wait for all async crawls to finish
  setTimeout(() => {
    if (brokenLinks.length === 0) {
      console.log('No broken links found!');
    } else {
      console.log('Broken links:');
      brokenLinks.forEach(link => {
        console.log(`- ${link.url} [${link.status}]${link.error ? ' - ' + link.error : ''}`);
      });
    }
  }, 5000); // Wait 5s for all requests to finish
})(); 