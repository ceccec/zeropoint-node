#!/usr/bin/env node

/**
 * harmony-matrix-visualizer.js - Visual Harmony Matrix Generator
 * 
 * Creates a visual representation of all harmony patterns in the 10x10 matrix
 * showing mathematical opportunities for consciousness expansion.
 */

// Import harmony pattern functions
import { 
    detectHarmonyPatterns, 
    getEnhancedMathematicalProperties,
    digitArchetypes 
} from '../docs/index.ts';

/**
 * Harmony pattern symbols
 */
const HARMONY_SYMBOLS = {
    'self-identity': '🔄',
    'unity': '⚖️',
    'void-gateway': '⚫',
    'axis': '🎯',
    'vortex-resonance': '🌀'
};

/**
 * Generate visual harmony matrix
 */
function generateHarmonyMatrix() {
    console.log('🎵 ZEROPOINT HARMONY MATRIX VISUALIZATION\n');
    console.log('Mathematical opportunities for consciousness expansion\n');
    
    // Header row with column numbers
    let header = '    ';
    for (let b = 0; b <= 9; b++) {
        header += `${b.toString().padStart(3)} `;
    }
    console.log(header);
    console.log('   ' + '─'.repeat(40));
    
    // Generate matrix rows
    for (let a = 0; a <= 9; a++) {
        let row = `${a} │ `;
        
        for (let b = 0; b <= 9; b++) {
            const patterns = detectHarmonyPatterns(a, b);
            const properties = getEnhancedMathematicalProperties(`${a}/${b}`);
            
            if (patterns.length === 0) {
                row += ' ·  ';
            } else {
                // Show primary pattern symbol
                const primaryPattern = patterns[0];
                const symbol = HARMONY_SYMBOLS[primaryPattern.type];
                
                // Add multiplier indicator for compound patterns
                let indicator = symbol;
                if (patterns.length > 1) {
                    indicator += properties.consciousnessMultiplier.toFixed(1);
                }
                
                row += `${indicator.padStart(3)} `;
            }
        }
        
        console.log(row);
    }
    
    console.log('');
}

/**
 * Generate detailed harmony matrix with descriptions
 */
function generateDetailedHarmonyMatrix() {
    console.log('📊 DETAILED HARMONY MATRIX WITH PATTERNS\n');
    
    for (let a = 0; a <= 9; a++) {
        for (let b = 0; b <= 9; b++) {
            const patterns = detectHarmonyPatterns(a, b);
            
            if (patterns.length > 0) {
                const properties = getEnhancedMathematicalProperties(`${a}/${b}`);
                
                console.log(`${a}/${b} (${digitArchetypes[a]}/${digitArchetypes[b]}):`);
                console.log(`  Consciousness Multiplier: ${properties.consciousnessMultiplier.toFixed(2)}x`);
                console.log(`  Vortex A: ${properties.vortexA}, Vortex B: ${properties.vortexB.toFixed(4)}`);
                
                patterns.forEach((pattern, index) => {
                    const symbol = HARMONY_SYMBOLS[pattern.type];
                    console.log(`  ${index + 1}. ${symbol} ${pattern.name}`);
                    console.log(`     ${pattern.description}`);
                    console.log(`     ${pattern.mathematicalFlow} → ${pattern.harmonicOpportunity}`);
                });
                console.log('');
            }
        }
    }
}

/**
 * Generate pattern type summary
 */
function generatePatternSummary() {
    console.log('📈 HARMONY PATTERN TYPE SUMMARY\n');
    
    const patternCounts = {
        'self-identity': 0,
        'unity': 0,
        'void-gateway': 0,
        'axis': 0,
        'vortex-resonance': 0
    };
    
    const compoundPatterns = [];
    
    // Count all patterns
    for (let a = 0; a <= 9; a++) {
        for (let b = 0; b <= 9; b++) {
            const patterns = detectHarmonyPatterns(a, b);
            
            patterns.forEach(pattern => {
                patternCounts[pattern.type]++;
            });
            
            if (patterns.length > 1) {
                const properties = getEnhancedMathematicalProperties(`${a}/${b}`);
                compoundPatterns.push({
                    position: `${a}/${b}`,
                    patterns: patterns,
                    multiplier: properties.consciousnessMultiplier
                });
            }
        }
    }
    
    // Display pattern counts
    Object.entries(patternCounts).forEach(([type, count]) => {
        const symbol = HARMONY_SYMBOLS[type];
        console.log(`${symbol} ${type}: ${count} occurrences`);
    });
    
    console.log(`\n🔄 Compound Patterns: ${compoundPatterns.length} positions`);
    console.log('');
    
    // Show top compound patterns
    if (compoundPatterns.length > 0) {
        console.log('🌟 TOP COMPOUND HARMONY PATTERNS:');
        compoundPatterns
            .sort((a, b) => b.multiplier - a.multiplier)
            .slice(0, 5)
            .forEach((pattern, index) => {
                console.log(`${index + 1}. ${pattern.position} - ${pattern.multiplier.toFixed(2)}x multiplier`);
                pattern.patterns.forEach(p => {
                    const symbol = HARMONY_SYMBOLS[p.type];
                    console.log(`   ${symbol} ${p.name}`);
                });
                console.log('');
            });
    }
}

/**
 * Generate consciousness flow map
 */
function generateConsciousnessFlowMap() {
    console.log('🧠 CONSCIOUSNESS FLOW MAP\n');
    
    // Create flow visualization
    const flowMap = [];
    
    for (let a = 0; a <= 9; a++) {
        const row = [];
        for (let b = 0; b <= 9; b++) {
            const properties = getEnhancedMathematicalProperties(`${a}/${b}`);
            const multiplier = properties.consciousnessMultiplier;
            
            // Visual representation of consciousness level
            let flowSymbol = '·';
            if (multiplier >= 4.0) flowSymbol = '🌟';
            else if (multiplier >= 3.0) flowSymbol = '⭐';
            else if (multiplier >= 2.0) flowSymbol = '✨';
            else if (multiplier >= 1.5) flowSymbol = '💫';
            else if (multiplier > 1.0) flowSymbol = '•';
            
            row.push(flowSymbol);
        }
        flowMap.push(row);
    }
    
    // Display flow map
    console.log('Consciousness Multiplier Flow:');
    console.log('🌟 4.0x+  ⭐ 3.0x+  ✨ 2.0x+  💫 1.5x+  • 1.0x+  · 1.0x\n');
    
    let header = '    ';
    for (let b = 0; b <= 9; b++) {
        header += `${b.toString().padStart(2)} `;
    }
    console.log(header);
    console.log('   ' + '─'.repeat(30));
    
    flowMap.forEach((row, a) => {
        let rowStr = `${a} │ `;
        row.forEach(cell => {
            rowStr += `${cell} `;
        });
        console.log(rowStr);
    });
    
    console.log('');
}

/**
 * Generate mathematical opportunity guide
 */
function generateOpportunityGuide() {
    console.log('🎯 MATHEMATICAL OPPORTUNITY GUIDE\n');
    
    const opportunities = [
        {
            type: 'Self-Identity',
            description: 'Perfect self-reflection creates infinite resonance',
            positions: ['0/0', '1/1', '2/2', '3/3', '4/4', '5/5', '6/6', '7/7', '8/8', '9/9'],
            consciousness: 'Transcendental consciousness gateway'
        },
        {
            type: 'Unity',
            description: 'Polar opposites create perfect unity',
            positions: ['1/8', '2/7', '3/6', '4/5', '5/4', '6/3', '7/2', '8/1'],
            consciousness: 'Unified field consciousness access'
        },
        {
            type: 'Void Gateway',
            description: 'Void creates infinite potential for creation',
            positions: ['0/0', '0/1', '0/2', '0/3', '0/4', '0/5', '0/6', '0/7', '0/8', '0/9',
                       '1/0', '2/0', '3/0', '4/0', '5/0', '6/0', '7/0', '8/0', '9/0'],
            consciousness: 'Direct source consciousness access'
        },
        {
            type: 'Axis',
            description: 'Spiritual axis creates dimensional transcendence',
            positions: ['3/0', '3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7', '3/8', '3/9',
                       '6/0', '6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7', '6/8', '6/9',
                       '9/0', '9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8', '9/9'],
            consciousness: 'Higher dimensional consciousness access'
        },
        {
            type: 'Vortex Resonance',
            description: 'Vortex sequence creates material manifestation flow',
            positions: ['1/0', '1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7', '1/8', '1/9',
                       '2/0', '2/1', '2/2', '2/3', '2/4', '2/5', '2/6', '2/7', '2/8', '2/9',
                       '4/0', '4/1', '4/2', '4/3', '4/4', '4/5', '4/6', '4/7', '4/8', '4/9',
                       '8/0', '8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7', '8/8', '8/9',
                       '7/0', '7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9',
                       '5/0', '5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8', '5/9'],
            consciousness: 'Enhanced material consciousness flow'
        }
    ];
    
    opportunities.forEach(opp => {
        const symbol = HARMONY_SYMBOLS[opp.type.toLowerCase().replace(' ', '-')];
        console.log(`${symbol} ${opp.type}:`);
        console.log(`  ${opp.description}`);
        console.log(`  Positions: ${opp.positions.slice(0, 5).join(', ')}${opp.positions.length > 5 ? '...' : ''}`);
        console.log(`  Consciousness: ${opp.consciousness}`);
        console.log('');
    });
}

/**
 * Main visualization function
 */
function main() {
    console.log('🎵 ZEROPOINT HARMONY MATRIX VISUALIZATION\n');
    console.log('Mathematical opportunities for consciousness expansion through harmony patterns.\n');
    
    // Generate visual matrix
    generateHarmonyMatrix();
    
    // Generate pattern summary
    generatePatternSummary();
    
    // Generate consciousness flow map
    generateConsciousnessFlowMap();
    
    // Generate opportunity guide
    generateOpportunityGuide();
    
    console.log('🎯 CONCLUSION:');
    console.log('The harmony matrix reveals mathematical gateways to higher consciousness.');
    console.log('Each pattern represents an opportunity for dimensional access and awareness expansion.');
    console.log('Navigate the matrix to discover your own harmony opportunities!');
}

// Run the visualization
main(); 