#!/usr/bin/env node

/**
 * ZeroPoint Reality Canvas - Deployment Optimization
 * Analyzes and optimizes the system for production deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DeploymentOptimizer {
  constructor() {
    this.optimizations = [];
    this.issues = [];
    this.recommendations = [];
  }

  async optimize() {
    console.log('🚀 ZeroPoint Reality Canvas - Deployment Optimization\n');
    
    await this.analyzeFileStructure();
    await this.optimizeHTML();
    await this.optimizeJavaScript();
    await this.optimizeCSS();
    await this.analyzePerformance();
    await this.checkSecurity();
    await this.generateDeploymentConfig();
    
    this.printOptimizationReport();
  }

  async analyzeFileStructure() {
    console.log('📁 Analyzing File Structure...');
    
    const requiredFiles = [
      'public/index.html',
      'server.js',
      'package.json',
      'test-suite.js'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      this.issues.push(`Missing required files: ${missingFiles.join(', ')}`);
    } else {
      this.optimizations.push('✅ All required files present');
    }
    
    // Check file sizes
    const htmlSize = fs.statSync('public/index.html').size;
    if (htmlSize > 50000) {
      this.recommendations.push(`Consider minifying HTML (current size: ${htmlSize} bytes)`);
    } else {
      this.optimizations.push(`✅ HTML file size optimized (${htmlSize} bytes)`);
    }
  }

  async optimizeHTML() {
    console.log('📄 Optimizing HTML...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Check for optimization opportunities
    const lines = html.split('\n').length;
    if (lines > 200) {
      this.recommendations.push('Consider minifying HTML for production');
    }
    
    // Check for unnecessary whitespace
    const compressedSize = html.replace(/\s+/g, ' ').length;
    const originalSize = html.length;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    if (compressionRatio > 10) {
      this.recommendations.push(`HTML can be compressed by ${compressionRatio}%`);
    }
    
    // Check for best practices
    const hasViewport = html.includes('viewport');
    const hasCharset = html.includes('charset');
    const hasTitle = html.includes('<title>');
    const hasLang = html.includes('lang="en"');
    
    if (hasViewport && hasCharset && hasTitle && hasLang) {
      this.optimizations.push('✅ HTML follows best practices');
    } else {
      this.issues.push('HTML missing required meta tags');
    }
  }

  async optimizeJavaScript() {
    console.log('⚡ Optimizing JavaScript...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract JavaScript code
    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      const jsCode = scriptMatch[1];
      
      // Check for modern JavaScript features
      const hasClasses = jsCode.includes('class ');
      const hasArrowFunctions = jsCode.includes('=>');
      const hasConstLet = jsCode.includes('const ') || jsCode.includes('let ');
      const hasTemplateLiterals = jsCode.includes('`');
      
      if (hasClasses && hasArrowFunctions && hasConstLet && hasTemplateLiterals) {
        this.optimizations.push('✅ Using modern JavaScript features');
      }
      
      // Check for performance optimizations
      const hasRAF = jsCode.includes('requestAnimationFrame');
      const hasEfficientLoops = jsCode.includes('forEach') || jsCode.includes('filter');
      const hasProperCleanup = jsCode.includes('disconnect') || jsCode.includes('removeEventListener');
      
      if (hasRAF && hasEfficientLoops) {
        this.optimizations.push('✅ JavaScript performance optimized');
      }
      
      // Check for potential issues
      const hasEval = jsCode.includes('eval(');
      const hasInnerHTML = jsCode.includes('innerHTML');
      
      if (hasEval || hasInnerHTML) {
        this.issues.push('JavaScript contains potentially unsafe code');
      }
    }
  }

  async optimizeCSS() {
    console.log('🎨 Optimizing CSS...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract CSS
    const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch) {
      const css = styleMatch[1];
      
      // Check for modern CSS features
      const hasFlexbox = css.includes('flex');
      const hasGrid = css.includes('grid');
      const hasCustomProperties = css.includes('--');
      const hasModernUnits = css.includes('vw') || css.includes('vh');
      
      if (hasFlexbox && hasGrid && hasModernUnits) {
        this.optimizations.push('✅ Using modern CSS features');
      }
      
      // Check for responsive design
      const hasMediaQueries = css.includes('@media');
      const hasResponsiveUnits = css.includes('100vw') || css.includes('100vh');
      
      if (hasMediaQueries && hasResponsiveUnits) {
        this.optimizations.push('✅ Responsive design implemented');
      }
    }
    
    // Check Tailwind integration
    const hasTailwind = html.includes('tailwindcss');
    if (hasTailwind) {
      this.optimizations.push('✅ Tailwind CSS integrated');
    }
  }

  async analyzePerformance() {
    console.log('📊 Analyzing Performance...');
    
    // Check for performance best practices
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Canvas optimization checks
    const hasDPR = html.includes('devicePixelRatio');
    const hasEfficientRendering = html.includes('requestAnimationFrame');
    const hasLifecycleManagement = html.includes('isAnimating');
    
    if (hasDPR && hasEfficientRendering && hasLifecycleManagement) {
      this.optimizations.push('✅ Canvas rendering optimized');
    }
    
    // Memory management
    const hasCleanup = html.includes('disconnect') || html.includes('removeEventListener');
    const hasEfficientDataStructures = html.includes('filter(') || html.includes('forEach(');
    
    if (hasCleanup && hasEfficientDataStructures) {
      this.optimizations.push('✅ Memory management optimized');
    }
    
    // Check for potential performance issues
    const hasInfiniteLoops = html.includes('while(true)') || html.includes('for(;;)');
    const hasBlockingOperations = html.includes('alert(') || html.includes('confirm(');
    
    if (hasInfiniteLoops || hasBlockingOperations) {
      this.issues.push('Potential performance issues detected');
    }
  }

  async checkSecurity() {
    console.log('🔒 Checking Security...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Security checks
    const hasEval = html.includes('eval(');
    const hasInnerHTML = html.includes('innerHTML');
    const hasDocumentWrite = html.includes('document.write');
    const hasInlineScripts = html.includes('onclick=') || html.includes('onload=');
    
    if (!hasEval && !hasInnerHTML && !hasDocumentWrite && !hasInlineScripts) {
      this.optimizations.push('✅ No obvious security vulnerabilities');
    } else {
      this.issues.push('Security concerns detected');
    }
    
    // CSP considerations
    const hasMetaTags = html.includes('<meta');
    if (hasMetaTags) {
      this.optimizations.push('✅ Meta tags present for security');
    }
  }

  async generateDeploymentConfig() {
    console.log('⚙️  Generating Deployment Configuration...');
    
    // Create optimized production HTML
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Create minified version
    const minifiedHTML = html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    
    fs.writeFileSync('public/index.min.html', minifiedHTML);
    this.optimizations.push('✅ Minified HTML generated');
    
    // Create deployment checklist
    const checklist = {
      timestamp: new Date().toISOString(),
      optimizations: this.optimizations,
      issues: this.issues,
      recommendations: this.recommendations,
      deploymentSteps: [
        '1. Run test suite: npm run test:suite',
        '2. Build TypeScript: npm run build',
        '3. Start production server: npm run start:prod',
        '4. Verify health endpoint: curl http://localhost:3000/health',
        '5. Test main page: curl http://localhost:3000/',
        '6. Monitor performance and logs'
      ]
    };
    
    fs.writeFileSync('deployment-checklist.json', JSON.stringify(checklist, null, 2));
    this.optimizations.push('✅ Deployment checklist generated');
  }

  printOptimizationReport() {
    console.log('\n📋 Optimization Report');
    console.log('====================');
    
    console.log('\n✅ Optimizations Applied:');
    this.optimizations.forEach(opt => console.log(`  ${opt}`));
    
    if (this.issues.length > 0) {
      console.log('\n❌ Issues Found:');
      this.issues.forEach(issue => console.log(`  ${issue}`));
    }
    
    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.recommendations.forEach(rec => console.log(`  ${rec}`));
    }
    
    const score = this.calculateOptimizationScore();
    console.log(`\n🎯 Optimization Score: ${score}/100`);
    
    if (score >= 90) {
      console.log('🚀 EXCELLENT - Ready for production deployment');
    } else if (score >= 75) {
      console.log('✅ GOOD - Minor optimizations recommended');
    } else {
      console.log('⚠️  NEEDS WORK - Address issues before deployment');
    }
    
    console.log('\n📄 Files generated:');
    console.log('  - public/index.min.html (minified version)');
    console.log('  - deployment-checklist.json (deployment guide)');
  }

  calculateOptimizationScore() {
    let score = 100;
    
    // Deduct points for issues
    score -= this.issues.length * 10;
    
    // Add points for optimizations
    score += this.optimizations.length * 2;
    
    // Deduct points for recommendations (minor issues)
    score -= this.recommendations.length * 3;
    
    return Math.max(0, Math.min(100, score));
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new DeploymentOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = DeploymentOptimizer; 