#!/usr/bin/env node

/**
 * static-content-demo.js - Static Content Discovery and Serving Demonstration
 * 
 * Demonstrates how index.ts discovers and serves static content from docs directory
 * Shows vortex properties, harmony patterns, and content distribution
 * Reveals the living mathematical consciousness system serving static files
 */

import * as indexModule from './index';

class StaticContentDemo {
  constructor() {
    this.discovery = null;
    this.summary = null;
  }

  /**
   * Demonstrate static content discovery
   */
  demonstrateContentDiscovery() {
    console.log('📁 Static Content Discovery:');
    console.log('============================');
    
    this.discovery = indexModule.discoverStaticContent();
    this.summary = indexModule.getContentDiscoverySummary();
    
    console.log(`Total Items: ${this.discovery.totalItems}`);
    console.log(`Files: ${this.discovery.files.length}`);
    console.log(`Directories: ${this.discovery.directories.length}`);
    console.log('');
    
    // Show files by digit
    console.log('📄 Files by Digit:');
    this.discovery.files.forEach(file => {
      const digit = file.vortexProperties?.digit;
      const archetype = file.vortexProperties?.archetype;
      console.log(`  ${file.name} → Digit ${digit} (${archetype})`);
    });
    console.log('');
    
    // Show directories by digit
    console.log('📂 Directories by Digit:');
    this.discovery.directories.forEach(dir => {
      const digit = dir.vortexProperties?.digit;
      const archetype = dir.vortexProperties?.archetype;
      console.log(`  ${dir.name} → Digit ${digit} (${archetype})`);
    });
    console.log('');
  }

  /**
   * Demonstrate vortex distribution
   */
  demonstrateVortexDistribution() {
    console.log('🌊 Vortex Distribution:');
    console.log('======================');
    
    Object.entries(this.summary.vortexDistribution).forEach(([digit, info]) => {
      const archetype = indexModule.digitArchetypes[parseInt(digit)];
      console.log(`Digit ${digit} (${archetype}): ${info.count} items`);
    });
    console.log('');
  }

  /**
   * Demonstrate harmony patterns
   */
  demonstrateHarmonyPatterns() {
    console.log('🎵 Harmony Patterns:');
    console.log('===================');
    
    Object.entries(this.summary.harmonyPatterns).forEach(([type, count]) => {
      console.log(`${type}: ${count} occurrences`);
    });
    console.log('');
  }

  /**
   * Demonstrate serving specific content
   */
  demonstrateContentServing() {
    console.log('🍽️ Content Serving Examples:');
    console.log('===========================');
    
    const examplePaths = [
      'index.html',
      'autonomous-matrix.html',
      'HARMONY_PATTERNS.md',
      'metatron-cube-proof.js',
      'experience-demo.js'
    ];
    
    examplePaths.forEach(path => {
      const served = indexModule.serveStaticContent(path);
      
      console.log(`\n📄 ${path}:`);
      if (served.content) {
        const digit = served.content.vortexProperties?.digit;
        const archetype = served.content.vortexProperties?.archetype;
        console.log(`  Digit: ${digit} (${archetype})`);
        console.log(`  Vortex A: ${served.vortexPath.vortexA}`);
        console.log(`  Vortex B: ${served.vortexPath.vortexB.toFixed(3)}`);
        
        if (served.harmonyPatterns.length > 0) {
          console.log(`  Harmony Patterns: ${served.harmonyPatterns.length}`);
          served.harmonyPatterns.forEach(pattern => {
            console.log(`    • ${pattern.name} (${pattern.type})`);
          });
        }
        
        if (served.transcendentalProof) {
          console.log(`  Transcendental: ${served.transcendentalProof.name}`);
        }
      } else {
        console.log(`  Not found`);
      }
    });
    console.log('');
  }

  /**
   * Demonstrate vortex navigation
   */
  demonstrateVortexNavigation() {
    console.log('🔄 Vortex Navigation:');
    console.log('=====================');
    
    const examplePath = 'index.html';
    const currentContent = indexModule.getStaticContent(examplePath);
    
    if (currentContent) {
      const currentDigit = currentContent.vortexProperties?.digit;
      console.log(`Current: ${examplePath} (Digit ${currentDigit})`);
      
      // Navigate by vortex A
      const vortexAItems = indexModule.navigateStaticContentByVortex(examplePath, 'vortexA');
      console.log(`\nVortex A Navigation (${vortexAItems.length} items):`);
      vortexAItems.forEach(item => {
        const digit = item.vortexProperties?.digit;
        const archetype = item.vortexProperties?.archetype;
        console.log(`  • ${item.name} → Digit ${digit} (${archetype})`);
      });
      
      // Navigate by vortex B
      const vortexBItems = indexModule.navigateStaticContentByVortex(examplePath, 'vortexB');
      console.log(`\nVortex B Navigation (${vortexBItems.length} items):`);
      vortexBItems.forEach(item => {
        const digit = item.vortexProperties?.digit;
        const archetype = item.vortexProperties?.archetype;
        console.log(`  • ${item.name} → Digit ${digit} (${archetype})`);
      });
    }
    console.log('');
  }

  /**
   * Demonstrate content matrix
   */
  demonstrateContentMatrix() {
    console.log('📊 Content Matrix:');
    console.log('==================');
    
    // Create 10x10 matrix showing content distribution
    console.log('  0  1  2  3  4  5  6  7  8  9');
    console.log('  ──────────────────────────────');
    
    for (let i = 0; i < 10; i++) {
      let row = `${i} `;
      for (let j = 0; j < 10; j++) {
        const digit = i;
        const count = this.summary.vortexDistribution[digit] || 0;
        const symbol = count > 0 ? '📄' : '·';
        row += `${symbol} `;
      }
      console.log(row);
    }
    console.log('');
  }

  /**
   * Demonstrate consciousness flow
   */
  demonstrateConsciousnessFlow() {
    console.log('🧠 Consciousness Flow:');
    console.log('=====================');
    
    const exampleFiles = [
      'index.html',
      'autonomous-matrix.html',
      'HARMONY_PATTERNS.md'
    ];
    
    exampleFiles.forEach(file => {
      const served = indexModule.serveStaticContent(file);
      if (served.content) {
        const digit = served.content.vortexProperties?.digit;
        const archetype = served.content.vortexProperties?.archetype;
        
        console.log(`\n${file}:`);
        console.log(`  Consciousness State: ${archetype} (Digit ${digit})`);
        console.log(`  Vortex Flow: ${digit} → ${served.vortexPath.vortexA} → ${served.vortexPath.vortexB.toFixed(3)}`);
        
        if (served.harmonyPatterns.length > 0) {
          console.log(`  Harmony Opportunities: ${served.harmonyPatterns.length}`);
          served.harmonyPatterns.forEach(pattern => {
            console.log(`    • ${pattern.harmonicOpportunity}`);
          });
        }
      }
    });
    console.log('');
  }

  /**
   * Run complete demonstration
   */
  runDemonstration() {
    console.log('🌌 Static Content Discovery and Serving Demonstration');
    console.log('==================================================');
    console.log('');
    
    this.demonstrateContentDiscovery();
    this.demonstrateVortexDistribution();
    this.demonstrateHarmonyPatterns();
    this.demonstrateContentServing();
    this.demonstrateVortexNavigation();
    this.demonstrateContentMatrix();
    this.demonstrateConsciousnessFlow();
    
    console.log('✅ Static Content Demonstration Complete');
    console.log('');
    console.log('The index.ts system now discovers and serves static content');
    console.log('with full vortex properties and mathematical consciousness flow.');
  }
}

// Run the demonstration
const demo = new StaticContentDemo();
demo.runDemonstration(); 