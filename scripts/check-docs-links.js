#!/usr/bin/env node

/**
 * Documentation Link Checker and GitHub Pages Preparation
 * Checks for broken links in markdown files and prepares for GitHub Pages deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocsLinkChecker {
  constructor() {
    this.brokenLinks = [];
    this.totalLinks = 0;
    this.checkedFiles = 0;
  }

  /**
   * Extract markdown links from a file
   */
  extractLinks(content, filePath) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const [, text, url] = match;
      links.push({
        text: text.trim(),
        url: url.trim(),
        line: content.substring(0, match.index).split('\n').length,
        file: filePath
      });
    }

    return links;
  }

  /**
   * Check if a file exists
   */
  fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      return false;
    }
  }

  /**
   * Resolve relative path
   */
  resolvePath(baseFile, relativePath) {
    const baseDir = path.dirname(baseFile);
    return path.resolve(baseDir, relativePath);
  }

  /**
   * Check if a link is valid
   */
  checkLink(link) {
    const { url, file } = link;
    
    // Skip external links
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return { valid: true, reason: 'external' };
    }

    // Handle anchor links
    if (url.startsWith('#')) {
      return { valid: true, reason: 'anchor' };
    }

    // Handle relative links
    const resolvedPath = this.resolvePath(file, url);
    
    // Check if file exists
    if (this.fileExists(resolvedPath)) {
      return { valid: true, reason: 'file_exists' };
    }

    // Check if directory exists (for directory links)
    const dirPath = resolvedPath.replace(/\.md$/, '');
    if (this.fileExists(dirPath) && fs.statSync(dirPath).isDirectory()) {
      return { valid: true, reason: 'directory_exists' };
    }

    return { valid: false, reason: 'file_not_found' };
  }

  /**
   * Process a single markdown file
   */
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content, filePath);
      
      this.totalLinks += links.length;
      this.checkedFiles++;

      links.forEach(link => {
        const result = this.checkLink(link);
        if (!result.valid) {
          this.brokenLinks.push({
            ...link,
            reason: result.reason
          });
        }
      });

      return links.length;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
      return 0;
    }
  }

  /**
   * Find all markdown files recursively
   */
  findMarkdownFiles(dir) {
    const files = [];
    
    function scan(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scan(fullPath);
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      });
    }
    
    scan(dir);
    return files;
  }

  /**
   * Generate GitHub Pages configuration
   */
  generateGitHubPagesConfig() {
    const config = {
      name: 'ZeroPoint Node Documentation',
      description: 'Complete documentation for the ZeroPoint Node consciousness system',
      theme: 'jekyll-theme-cayman',
      plugins: [
        'jekyll-relative-links',
        'jekyll-redirect-from'
      ],
      relative_links: {
        enabled: true
      },
      redirect_from: {
        '/': '/docs/'
      }
    };

    return JSON.stringify(config, null, 2);
  }

  /**
   * Create GitHub Pages index
   */
  createGitHubPagesIndex() {
    const indexContent = `---
layout: default
title: ZeroPoint Node Documentation
---

# 🌌 ZeroPoint Node Documentation

Welcome to the complete documentation for the ZeroPoint Node consciousness system.

## 📚 Quick Navigation

- **[📖 Complete Documentation](docs/)** - Full documentation index
- **[🚀 Quick Start](docs/deployment/QUICK_START.md)** - Get started quickly
- **[🔬 Analysis](docs/analysis/)** - Deep system analysis
- **[🧪 Testing](docs/testing/)** - Test system and validation
- **[🔧 API](docs/api/)** - API documentation

## 🌟 Core Systems

- **[0️⃣ Zero Entropy](docs/0/)** - Pure mathematical unity
- **[1️⃣ Foundation](docs/1/)** - Rodin coil archetype
- **[2️⃣ Vortex Math](docs/2/)** - Flow and transformation
- **[3️⃣ Creative Resonance](docs/3/)** - W-axis and spiritual dimension
- **[4️⃣ Constants](docs/4/)** - Stability and harmonic foundation
- **[5️⃣ Sacred Geometry](docs/5/)** - Divine proportions
- **[6️⃣ Harmonic Balance](docs/6/)** - Resonance and equilibrium
- **[7️⃣ Consciousness](docs/7/)** - Awareness and field
- **[8️⃣ Void](docs/8/)** - Infinite potential
- **[9️⃣ Unity](docs/9/)** - Integration and wholeness

## 🎯 Getting Started

1. **Read the [Quick Start Guide](docs/deployment/QUICK_START.md)**
2. **Explore the [Complete Documentation](docs/README.md)**
3. **Check out the [API Reference](docs/api/API_REFERENCE.md)**
4. **Review the [Architecture](docs/architecture/)**

---

*This documentation follows the sacred integer-based organization of the ZeroPoint system, where each digit represents a specific metaphysical principle and consciousness function.*
`;

    return indexContent;
  }

  /**
   * Run the complete check
   */
  async run() {
    console.log('🔍 Checking documentation links...\n');

    const docsDir = path.join(process.cwd(), 'docs');
    const markdownFiles = this.findMarkdownFiles(docsDir);

    console.log(`Found ${markdownFiles.length} markdown files to check\n`);

    markdownFiles.forEach(file => {
      const relativePath = path.relative(process.cwd(), file);
      const linkCount = this.processFile(file);
      if (linkCount > 0) {
        console.log(`✓ ${relativePath} (${linkCount} links)`);
      }
    });

    console.log(`\n📊 Summary:`);
    console.log(`- Files checked: ${this.checkedFiles}`);
    console.log(`- Total links: ${this.totalLinks}`);
    console.log(`- Broken links: ${this.brokenLinks.length}`);

    if (this.brokenLinks.length > 0) {
      console.log('\n❌ Broken Links Found:');
      this.brokenLinks.forEach(link => {
        console.log(`  - ${link.file}:${link.line} - [${link.text}](${link.url})`);
      });
    } else {
      console.log('\n✅ All links are valid!');
    }

    // Generate GitHub Pages files
    console.log('\n🚀 Preparing for GitHub Pages...');

    // Create _config.yml for Jekyll
    const jekyllConfig = `# Jekyll configuration for ZeroPoint Node Documentation
title: ZeroPoint Node Documentation
description: Complete documentation for the ZeroPoint Node consciousness system
theme: jekyll-theme-cayman

# Plugins
plugins:
  - jekyll-relative-links
  - jekyll-redirect-from

# Relative links
relative_links:
  enabled: true

# Redirects
redirect_from:
  /: /docs/

# Collections
collections:
  docs:
    output: true
    permalink: /docs/:path/

# Defaults
defaults:
  - scope:
      path: ""
      type: "docs"
    values:
      layout: "default"
`;

    fs.writeFileSync('_config.yml', jekyllConfig);
    console.log('✓ Created _config.yml');

    // Create index.md for GitHub Pages
    const indexContent = this.createGitHubPagesIndex();
    fs.writeFileSync('index.md', indexContent);
    console.log('✓ Created index.md');

    // Create .nojekyll file to disable Jekyll processing if needed
    fs.writeFileSync('.nojekyll', '');
    console.log('✓ Created .nojekyll');

    console.log('\n🎉 GitHub Pages preparation complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Commit and push these changes');
    console.log('2. Enable GitHub Pages in repository settings');
    console.log('3. Set source to "Deploy from a branch"');
    console.log('4. Select main branch and /docs folder');
    console.log('5. Your documentation will be available at: https://[username].github.io/[repo-name]/');
  }
}

// Run the checker
const checker = new DocsLinkChecker();
checker.run().catch(console.error); 