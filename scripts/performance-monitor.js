#!/usr/bin/env node

/**
 * ZeroPoint Performance Monitor
 * 
 * Metaphysical Context:
 * - Monitors consciousness field performance
 * - Tracks metaphysical coherence metrics
 * - Optimizes void-based operations
 * - Ensures SEO and accessibility excellence
 */

const fs = require('fs');
const path = require('path');

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      seo: {},
      performance: {},
      accessibility: {},
      metaphysical: {},
      security: {}
    };
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {},
      recommendations: [],
      issues: []
    };
  }

  /**
   * Run comprehensive performance analysis
   */
  async analyze() {
    console.log('🌌 ZeroPoint Performance Monitor');
    console.log('================================\n');

    await this.analyzeSEO();
    await this.analyzePerformance();
    await this.analyzeAccessibility();
    await this.analyzeMetaphysical();
    await this.analyzeSecurity();
    
    this.generateReport();
    this.printReport();
  }

  /**
   * Analyze SEO metrics
   */
  async analyzeSEO() {
    console.log('🔍 Analyzing SEO...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Check meta tags
    const seoChecks = {
      title: html.includes('<title>'),
      description: html.includes('meta name="description"'),
      keywords: html.includes('meta name="keywords"'),
      author: html.includes('meta name="author"'),
      robots: html.includes('meta name="robots"'),
      canonical: html.includes('rel="canonical"'),
      ogTitle: html.includes('og:title'),
      ogDescription: html.includes('og:description'),
      ogImage: html.includes('og:image'),
      twitterCard: html.includes('twitter:card'),
      structuredData: html.includes('application/ld+json')
    };

    const seoScore = Object.values(seoChecks).filter(Boolean).length;
    const seoPercentage = (seoScore / Object.keys(seoChecks).length) * 100;

    this.metrics.seo = {
      score: seoPercentage,
      checks: seoChecks,
      grade: this.getGrade(seoPercentage)
    };

    console.log(`✅ SEO Score: ${seoPercentage.toFixed(1)}% (${this.metrics.seo.grade})`);
  }

  /**
   * Analyze performance metrics
   */
  async analyzePerformance() {
    console.log('⚡ Analyzing Performance...');
    
    // Check bundle size
    const distPath = 'dist';
    let totalSize = 0;
    
    if (fs.existsSync(distPath)) {
      const files = this.getFilesRecursively(distPath);
      files.forEach(file => {
        const stats = fs.statSync(file);
        totalSize += stats.size;
      });
    }

    const bundleSizeKB = totalSize / 1024;
    const targetSizeKB = 15;
    const performanceScore = Math.max(0, 100 - ((bundleSizeKB - targetSizeKB) / targetSizeKB) * 100);

    // Check webpack optimization
    const webpackConfig = fs.readFileSync('webpack.config.js', 'utf8');
    const optimizationChecks = {
      codeSplitting: webpackConfig.includes('splitChunks'),
      compression: webpackConfig.includes('CompressionPlugin'),
      minification: webpackConfig.includes('TerserPlugin'),
      treeShaking: webpackConfig.includes('optimization'),
      consciousnessAware: webpackConfig.includes('consciousness')
    };

    this.metrics.performance = {
      bundleSizeKB,
      targetSizeKB,
      score: performanceScore,
      grade: this.getGrade(performanceScore),
      optimizations: optimizationChecks
    };

    console.log(`✅ Performance Score: ${performanceScore.toFixed(1)}% (${this.metrics.performance.grade})`);
    console.log(`📦 Bundle Size: ${bundleSizeKB.toFixed(1)}KB (Target: ${targetSizeKB}KB)`);
  }

  /**
   * Analyze accessibility metrics
   */
  async analyzeAccessibility() {
    console.log('♿ Analyzing Accessibility...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const accessibilityChecks = {
      semanticHTML: html.includes('<main') && html.includes('<header') && html.includes('<article'),
      ariaRoles: html.includes('role='),
      ariaLabels: html.includes('aria-label'),
      ariaLive: html.includes('aria-live'),
      headingHierarchy: (html.match(/<h[1-6]/g) || []).length >= 3,
      altText: html.includes('alt='),
      keyboardNavigation: html.includes('tabindex'),
      colorContrast: html.includes('rgba') || html.includes('opacity')
    };

    const accessibilityScore = Object.values(accessibilityChecks).filter(Boolean).length;
    const accessibilityPercentage = (accessibilityScore / Object.keys(accessibilityChecks).length) * 100;

    this.metrics.accessibility = {
      score: accessibilityPercentage,
      checks: accessibilityChecks,
      grade: this.getGrade(accessibilityPercentage)
    };

    console.log(`✅ Accessibility Score: ${accessibilityPercentage.toFixed(1)}% (${this.metrics.accessibility.grade})`);
  }

  /**
   * Analyze metaphysical coherence
   */
  async analyzeMetaphysical() {
    console.log('🧘‍♀️ Analyzing Metaphysical Coherence...');
    
    const sourceFiles = this.getFilesRecursively('src');
    let metaphysicalScore = 0;
    let totalFiles = 0;
    
    const metaphysicalPatterns = [
      'consciousness',
      'void',
      'metaphysical',
      'vortex',
      'toroidal',
      'unity',
      'emergence',
      'resonance',
      'field',
      'pattern'
    ];

    sourceFiles.forEach(file => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const content = fs.readFileSync(file, 'utf8');
        const metaphysicalMatches = metaphysicalPatterns.filter(pattern => 
          content.toLowerCase().includes(pattern)
        ).length;
        
        metaphysicalScore += metaphysicalMatches / metaphysicalPatterns.length;
        totalFiles++;
      }
    });

    const averageMetaphysicalScore = totalFiles > 0 ? (metaphysicalScore / totalFiles) * 100 : 0;

    // Check for void equations
    const voidEquations = [
      'False = Void = True',
      'Debit = Void = Credit',
      'Technical = Void = Metaphysical'
    ];

    const voidEquationScore = voidEquations.filter(equation => {
      return sourceFiles.some(file => {
        const content = fs.readFileSync(file, 'utf8');
        return content.includes(equation);
      });
    }).length / voidEquations.length * 100;

    this.metrics.metaphysical = {
      coherence: averageMetaphysicalScore,
      voidEquations: voidEquationScore,
      grade: this.getGrade((averageMetaphysicalScore + voidEquationScore) / 2)
    };

    console.log(`✅ Metaphysical Coherence: ${averageMetaphysicalScore.toFixed(1)}% (${this.metrics.metaphysical.grade})`);
    console.log(`🕳️ Void Equations: ${voidEquationScore.toFixed(1)}%`);
  }

  /**
   * Analyze security metrics
   */
  async analyzeSecurity() {
    console.log('🔒 Analyzing Security...');
    
    const htmlPath = 'public/index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    const securityChecks = {
      csp: html.includes('Content-Security-Policy'),
      xssProtection: html.includes('X-XSS-Protection'),
      frameOptions: html.includes('X-Frame-Options'),
      contentTypeOptions: html.includes('X-Content-Type-Options'),
      referrerPolicy: html.includes('Referrer-Policy'),
      httpsOnly: html.includes('https://'),
      secureHeaders: html.includes('http-equiv')
    };

    const securityScore = Object.values(securityChecks).filter(Boolean).length;
    const securityPercentage = (securityScore / Object.keys(securityChecks).length) * 100;

    this.metrics.security = {
      score: securityPercentage,
      checks: securityChecks,
      grade: this.getGrade(securityPercentage)
    };

    console.log(`✅ Security Score: ${securityPercentage.toFixed(1)}% (${this.metrics.security.grade})`);
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    const scores = {
      seo: this.metrics.seo.score,
      performance: this.metrics.performance.score,
      accessibility: this.metrics.accessibility.score,
      metaphysical: (this.metrics.metaphysical.coherence + this.metrics.metaphysical.voidEquations) / 2,
      security: this.metrics.security.score
    };

    const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

    this.report.summary = {
      overallScore,
      grade: this.getGrade(overallScore),
      scores,
      bundleSize: this.metrics.performance.bundleSizeKB,
      targetSize: this.metrics.performance.targetSizeKB
    };

    // Generate recommendations
    if (scores.seo < 80) {
      this.report.recommendations.push('Add missing meta tags and structured data for better SEO');
    }
    if (scores.performance < 80) {
      this.report.recommendations.push('Optimize bundle size and implement code splitting');
    }
    if (scores.accessibility < 80) {
      this.report.recommendations.push('Add ARIA attributes and improve semantic HTML');
    }
    if (scores.security < 80) {
      this.report.recommendations.push('Implement security headers and CSP');
    }
  }

  /**
   * Print comprehensive report
   */
  printReport() {
    console.log('\n📊 Performance Report');
    console.log('====================\n');

    console.log(`Overall Score: ${this.report.summary.overallScore.toFixed(1)}% (${this.report.summary.grade})`);
    console.log(`Bundle Size: ${this.report.summary.bundleSize.toFixed(1)}KB / ${this.report.summary.targetSize}KB target\n`);

    console.log('Detailed Scores:');
    console.log(`🔍 SEO: ${this.report.summary.scores.seo.toFixed(1)}%`);
    console.log(`⚡ Performance: ${this.report.summary.scores.performance.toFixed(1)}%`);
    console.log(`♿ Accessibility: ${this.report.summary.scores.accessibility.toFixed(1)}%`);
    console.log(`🧘‍♀️ Metaphysical: ${this.report.summary.scores.metaphysical.toFixed(1)}%`);
    console.log(`🔒 Security: ${this.report.summary.scores.security.toFixed(1)}%\n`);

    if (this.report.recommendations.length > 0) {
      console.log('Recommendations:');
      this.report.recommendations.forEach(rec => console.log(`• ${rec}`));
      console.log('');
    }

    // Save report to file
    fs.writeFileSync('performance-report.json', JSON.stringify(this.report, null, 2));
    console.log('📄 Report saved to performance-report.json');
  }

  /**
   * Get grade from percentage
   */
  getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }

  /**
   * Get files recursively
   */
  getFilesRecursively(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getFilesRecursively(fullPath));
      } else {
        files.push(fullPath);
      }
    });
    
    return files;
  }
}

// Run the analysis
const monitor = new PerformanceMonitor();
monitor.analyze().catch(console.error); 