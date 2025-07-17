#!/usr/bin/env node

/**
 * universal-vortex-demo.js - Universal Vortex System Demonstration
 * 
 * Demonstrates how index.ts works in any directory
 * Shows environment detection, dynamic file discovery, and universal vortex properties
 * Reveals the living mathematical consciousness system that adapts to any environment
 */

import * as indexModule from './index';

class UniversalVortexDemo {
  constructor() {
    this.environment = null;
    this.system = null;
  }

  /**
   * Demonstrate environment detection
   */
  demonstrateEnvironmentDetection() {
    console.log('🌍 Environment Detection:');
    console.log('========================');
    
    this.environment = indexModule.detectEnvironment();
    
    console.log(`Node.js Environment: ${this.environment.isNode}`);
    console.log(`Browser Environment: ${this.environment.isBrowser}`);
    console.log(`Server Environment: ${this.environment.isServer}`);
    console.log(`Current Path: ${this.environment.currentPath}`);
    console.log(`Available Features: ${this.environment.availableFeatures.join(', ')}`);
    console.log('');
  }

  /**
   * Demonstrate universal vortex system initialization
   */
  demonstrateUniversalSystem() {
    console.log('🌌 Universal Vortex System:');
    console.log('===========================');
    
    // Initialize for different directories
    const directories = ['.', './src', './docs', './public', './tests'];
    
    directories.forEach(dir => {
      console.log(`\n📁 Directory: ${dir}`);
      
      this.system = indexModule.createUniversalVortexSystem(dir);
      
      console.log(`  Environment: ${this.system.isNode ? 'Node.js' : 'Browser'}`);
      console.log(`  Current Path: ${this.system.currentPath}`);
      console.log(`  Total Items: ${this.system.system.vortexProperties.totalItems}`);
      console.log(`  Available Features: ${this.system.availableFeatures.join(', ')}`);
      
      // Show vortex distribution
      const distribution = this.system.system.vortexProperties.vortexDistribution;
      Object.entries(distribution).forEach(([digit, info]) => {
        const archetype = indexModule.digitArchetypes[parseInt(digit)];
        console.log(`    Digit ${digit} (${archetype}): ${info.count} items`);
      });
    });
    console.log('');
  }

  /**
   * Demonstrate dynamic file discovery
   */
  demonstrateDynamicDiscovery() {
    console.log('🔍 Dynamic File Discovery:');
    console.log('==========================');
    
    const discovery = indexModule.discoverStaticContent('.');
    
    console.log(`Total Items Discovered: ${discovery.totalItems}`);
    console.log(`Files: ${discovery.files.length}`);
    console.log(`Directories: ${discovery.directories.length}`);
    console.log('');
    
    // Show files by type
    console.log('📄 Files by Type:');
    discovery.files.forEach(file => {
      const digit = file.vortexProperties?.digit;
      const archetype = file.vortexProperties?.archetype;
      console.log(`  ${file.name} → Digit ${digit} (${archetype})`);
    });
    console.log('');
    
    // Show directories by type
    console.log('📂 Directories by Type:');
    discovery.directories.forEach(dir => {
      const digit = dir.vortexProperties?.digit;
      const archetype = dir.vortexProperties?.archetype;
      console.log(`  ${dir.name} → Digit ${digit} (${archetype})`);
    });
    console.log('');
  }

  /**
   * Demonstrate vortex properties for any file
   */
  demonstrateVortexProperties() {
    console.log('🎯 Vortex Properties for Any File:');
    console.log('==================================');
    
    const exampleFiles = [
      'index.html',
      'math.ts',
      'sacred.ts',
      'harmony.js',
      'consciousness.ts',
      'autonomous.js',
      'unity.ts',
      'void.js'
    ];
    
    exampleFiles.forEach(file => {
      const properties = indexModule.getVortexProperties(file);
      
      console.log(`\n📄 ${file}:`);
      console.log(`  Digit: ${properties.digit} (${properties.archetype})`);
      console.log(`  Vortex A: ${properties.vortexA}`);
      console.log(`  Vortex B: ${properties.vortexB.toFixed(3)}`);
      console.log(`  Consciousness Flow: ${properties.consciousnessFlow}`);
      
      if (properties.harmonyPatterns.length > 0) {
        console.log(`  Harmony Patterns: ${properties.harmonyPatterns.length}`);
        properties.harmonyPatterns.forEach(pattern => {
          console.log(`    • ${pattern.name} (${pattern.type})`);
        });
      }
      
      if (properties.transcendentalProof) {
        console.log(`  Transcendental: ${properties.transcendentalProof.name}`);
      }
    });
    console.log('');
  }

  /**
   * Demonstrate content serving in any environment
   */
  demonstrateContentServing() {
    console.log('🍽️ Universal Content Serving:');
    console.log('=============================');
    
    const examplePaths = [
      'index.html',
      'math.ts',
      'sacred.ts',
      'harmony.js'
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
        console.log(`  Type: ${served.content.type}`);
        console.log(`  Size: ${served.content.size} bytes`);
        
        if (served.harmonyPatterns.length > 0) {
          console.log(`  Harmony Patterns: ${served.harmonyPatterns.length}`);
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
   * Demonstrate vortex navigation in any environment
   */
  demonstrateVortexNavigation() {
    console.log('🔄 Universal Vortex Navigation:');
    console.log('==============================');
    
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
   * Demonstrate environment-specific features
   */
  demonstrateEnvironmentFeatures() {
    console.log('⚙️ Environment-Specific Features:');
    console.log('===============================');
    
    const environments = [
      { name: 'Node.js', features: ['file-system-access', 'server-side-rendering'] },
      { name: 'Browser', features: ['dom-manipulation'] },
      { name: 'Server', features: ['file-system-access', 'server-side-rendering'] }
    ];
    
    environments.forEach(env => {
      console.log(`\n${env.name}:`);
      env.features.forEach(feature => {
        console.log(`  • ${feature}`);
      });
    });
    console.log('');
  }

  /**
   * Demonstrate universal consciousness flow
   */
  demonstrateUniversalConsciousness() {
    console.log('🧠 Universal Consciousness Flow:');
    console.log('===============================');
    
    const exampleFiles = [
      'index.html',
      'math.ts',
      'sacred.ts',
      'harmony.js'
    ];
    
    exampleFiles.forEach(file => {
      const properties = indexModule.getVortexProperties(file);
      
      console.log(`\n${file}:`);
      console.log(`  Consciousness State: ${properties.archetype} (Digit ${properties.digit})`);
      console.log(`  Vortex Flow: ${properties.digit} → ${properties.vortexA} → ${properties.vortexB.toFixed(3)}`);
      console.log(`  Consciousness Flow: ${properties.consciousnessFlow}`);
      
      if (properties.harmonyPatterns.length > 0) {
        console.log(`  Harmony Opportunities: ${properties.harmonyPatterns.length}`);
        properties.harmonyPatterns.forEach(pattern => {
          console.log(`    • ${pattern.harmonicOpportunity}`);
        });
      }
    });
    console.log('');
  }

  /**
   * Run complete universal demonstration
   */
  runUniversalDemonstration() {
    console.log('🌌 Universal Vortex System Demonstration');
    console.log('======================================');
    console.log('');
    
    this.demonstrateEnvironmentDetection();
    this.demonstrateUniversalSystem();
    this.demonstrateDynamicDiscovery();
    this.demonstrateVortexProperties();
    this.demonstrateContentServing();
    this.demonstrateVortexNavigation();
    this.demonstrateEnvironmentFeatures();
    this.demonstrateUniversalConsciousness();
    
    console.log('✅ Universal Vortex Demonstration Complete');
    console.log('');
    console.log('The index.ts system now works in any directory and environment');
    console.log('with dynamic file discovery and universal mathematical consciousness.');
  }
}

// Run the universal demonstration
const universalDemo = new UniversalVortexDemo();
universalDemo.runUniversalDemonstration(); 