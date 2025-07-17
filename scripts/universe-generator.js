#!/usr/bin/env node

/**
 * 🌌 Universe Generator - Complete Vortex System
 * 
 * One small generator file that generates the entire universe:
 * - All digit interactions (0-9 x 0-9)
 * - All vortex A (integer) and vortex B (decimal) results
 * - All polarity switching (negative to positive)
 * - All naming patterns and consciousness flows
 * - All impossible to possible conversions
 */

const fs = require('fs');

// Digit archetype mapping
const digitHash = {
  0: ['Void', 'Pure potential, zero entropy'],
  1: ['Source', 'Origin, unity, initiation'],
  2: ['Vortex', 'Flow, transformation'],
  3: ['Resonance', 'Creation, harmony, trinity'],
  4: ['Math', 'Structure, foundation'],
  5: ['Center', 'Change, flow, balance'],
  6: ['Harmony', 'Balance, beauty, equilibrium'],
  7: ['Gateway', 'Mystery, transition, insight'],
  8: ['Infinity', 'Power, manifestation'],
  9: ['Axis', 'Completion, integration']
};

/**
 * Generate vortex A (integer result)
 * @param {number} a - First digit
 * @param {number} b - Second digit
 * @returns {number} Integer harmonic result
 */
function generateVortexA(a, b) {
  const sum = (parseInt(a, 10) + parseInt(b, 10)) % 9;
  return sum === 0 ? 9 : sum;
}

/**
 * Generate vortex B (decimal/inverse vortex result)
 * @param {number} a - First digit
 * @param {number} b - Second digit
 * @returns {number} Decimal inverse vortex result
 */
function generateVortexB(a, b) {
  const vortexA = generateVortexA(a, b);
  const decimal = (parseInt(a, 10) + parseInt(b, 10)) / vortexA;
  return decimal;
}

/**
 * Generate polarity switching (negative to positive)
 * @param {number} negative - Negative number
 * @returns {number} Positive vortex result
 */
function generatePolaritySwitch(negative) {
  const positive = negative % 9;
  return positive === 0 ? 9 : positive;
}

/**
 * Generate interaction name
 * @param {number} a - First digit
 * @param {number} b - Second digit
 * @returns {string} Interaction name
 */
function generateInteractionName(a, b) {
  const vortexA = generateVortexA(a, b);
  const nameA = digitHash[a] ? digitHash[a][0] : a;
  const nameB = digitHash[b] ? digitHash[b][0] : b;
  const nameC = digitHash[vortexA] ? digitHash[vortexA][0] : vortexA;
  return `${nameA}–${nameB}–${nameC} (${a}/${b}=${vortexA})`;
}

/**
 * Generate all universe interactions
 * @returns {Object} Complete universe data
 */
function generateUniverse() {
  const universe = {
    metadata: {
      title: 'Complete Vortex Universe',
      description: 'All possible digit interactions, vortex results, and consciousness flows',
      generated: new Date().toISOString(),
      totalInteractions: 100,
      totalResults: 200
    },
    digitArchetypes: digitHash,
    interactions: [],
    polaritySwitching: [],
    vortexSequences: [],
    consciousnessFlows: []
  };

  // Generate all digit interactions (0-9 x 0-9)
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const vortexA = generateVortexA(a, b);
      const vortexB = generateVortexB(a, b);
      const name = generateInteractionName(a, b);
      const archetypeA = digitHash[a] ? digitHash[a][0] : a;
      const archetypeB = digitHash[b] ? digitHash[b][0] : b;
      const archetypeC = digitHash[vortexA] ? digitHash[vortexA][0] : vortexA;

      universe.interactions.push({
        a,
        b,
        vortexA,
        vortexB: vortexB.toFixed(2),
        name,
        archetypes: {
          a: archetypeA,
          b: archetypeB,
          result: archetypeC
        },
        paths: {
          vortexA: `${a} → ${b} → ${vortexA}`,
          vortexB: `(${a} + ${b}) / ${vortexA} = ${vortexB.toFixed(2)}`
        },
        consciousness: {
          impossible: vortexB !== '1.00' && vortexB !== '0.00',
          walkable: Number.isInteger(vortexA),
          dimensional: vortexB !== '1.00'
        }
      });
    }
  }

  // Generate polarity switching (negative to positive)
  for (let negative = -9; negative <= -1; negative++) {
    const positive = generatePolaritySwitch(negative);
    const negativeArchetype = digitHash[Math.abs(negative)] ? digitHash[Math.abs(negative)][0] : Math.abs(negative);
    const positiveArchetype = digitHash[positive] ? digitHash[positive][0] : positive;

    universe.polaritySwitching.push({
      negative,
      positive,
      archetypes: {
        negative: negativeArchetype,
        positive: positiveArchetype
      },
      conversion: `${negative} → ${positive}`,
      consciousness: {
        impossible: true,
        walkable: true,
        conversion: 'negative to positive'
      }
    });
  }

  // Generate vortex sequences
  universe.vortexSequences = [
    {
      name: 'Primary Vortex',
      sequence: [1, 2, 4, 8, 7, 5],
      description: 'Main vortex consciousness flow'
    },
    {
      name: 'Control Sequence',
      sequence: [3, 6, 9],
      description: 'Control and axis digits'
    },
    {
      name: 'Complete Sequence',
      sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      description: 'Complete digit consciousness flow'
    }
  ];

  // Generate consciousness flows
  universe.consciousnessFlows = universe.interactions
    .filter(interaction => interaction.consciousness.walkable)
    .map(interaction => ({
      from: interaction.archetypes.a,
      to: interaction.archetypes.b,
      result: interaction.archetypes.result,
      vortexA: interaction.vortexA,
      vortexB: interaction.vortexB,
      path: interaction.paths.vortexA
    }));

  return universe;
}

/**
 * Generate universe documentation
 * @param {Object} universe - Universe data
 * @returns {string} Markdown documentation
 */
function generateUniverseDocumentation(universe) {
  let doc = `# 🌌 Complete Vortex Universe

## Metadata
- **Title**: ${universe.metadata.title}
- **Description**: ${universe.metadata.description}
- **Generated**: ${universe.metadata.generated}
- **Total Interactions**: ${universe.metadata.totalInteractions}
- **Total Results**: ${universe.metadata.totalResults}

## Digit Archetypes
`;

  Object.entries(universe.digitArchetypes).forEach(([digit, [name, meaning]]) => {
    doc += `- **${digit}**: ${name} - ${meaning}\n`;
  });

  doc += `
## All Interactions (Vortex A + Vortex B)

| a | b | Vortex A (Integer) | Vortex B (Decimal) | Name | Archetypes |
|---|---|--------------------|--------------------|------|------------|
`;

  universe.interactions.forEach(interaction => {
    doc += `| ${interaction.a} | ${interaction.b} | ${interaction.vortexA} | ${interaction.vortexB} | ${interaction.name} | ${interaction.archetypes.a}–${interaction.archetypes.b}–${interaction.archetypes.result} |\n`;
  });

  doc += `
## Polarity Switching (Negative to Positive)

| Negative | Positive | Conversion | Archetypes |
|----------|----------|------------|------------|
`;

  universe.polaritySwitching.forEach(switch_ => {
    doc += `| ${switch_.negative} | ${switch_.positive} | ${switch_.conversion} | ${switch_.archetypes.negative} → ${switch_.archetypes.positive} |\n`;
  });

  doc += `
## Vortex Sequences

`;

  universe.vortexSequences.forEach(sequence => {
    doc += `### ${sequence.name}\n`;
    doc += `- **Sequence**: [${sequence.sequence.join(', ')}]\n`;
    doc += `- **Description**: ${sequence.description}\n\n`;
  });

  doc += `
## Consciousness Flows (Walkable Paths)

| From | To | Result | Vortex A | Vortex B | Path |
|------|----|--------|----------|----------|------|
`;

  universe.consciousnessFlows.forEach(flow => {
    doc += `| ${flow.from} | ${flow.to} | ${flow.result} | ${flow.vortexA} | ${flow.vortexB} | ${flow.path} |\n`;
  });

  doc += `
## Mathematical Properties

### Vortex A (Integer)
- Formula: (a + b) mod 9
- Result: Always integer (1-9)
- Purpose: Walkable consciousness paths

### Vortex B (Decimal/Inverse Vortex)
- Formula: (a + b) / vortexA
- Result: Decimal consciousness flow
- Purpose: Dimensional gateways

### Polarity Switching
- Formula: negative % 9
- Result: Positive vortex state
- Purpose: Convert impossible to possible

## Consciousness States

### Impossible States
- Decimal vortex B results (except 1.00, 0.00)
- Negative numbers
- Non-integer consciousness flows

### Walkable States
- Integer vortex A results
- Positive numbers
- Complete consciousness paths

### Dimensional Gateways
- Vortex B decimal values
- Polarity switching points
- Consciousness transformation nodes

## Universe Summary

This generator creates the complete mathematical consciousness universe where:
- **100 interactions** define all possible digit relationships
- **200 results** (vortex A + B) show all consciousness states
- **Polarity switching** converts impossible to possible
- **Vortex sequences** define consciousness flow patterns
- **Archetypal naming** provides metaphysical context

The universe is complete, self-contained, and generates all possible consciousness states from simple mathematical relationships.
`;

  return doc;
}

/**
 * Generate universe JSON data
 * @param {Object} universe - Universe data
 * @returns {string} JSON string
 */
function generateUniverseJSON(universe) {
  return JSON.stringify(universe, null, 2);
}

/**
 * Main execution
 */
function main() {
  console.log('🌌 Generating Complete Vortex Universe...');
  
  const universe = generateUniverse();
  
  // Generate documentation
  const documentation = generateUniverseDocumentation(universe);
  fs.writeFileSync('docs/UNIVERSE.md', documentation);
  console.log('✅ Generated UNIVERSE.md');
  
  // Generate JSON data
  const jsonData = generateUniverseJSON(universe);
  fs.writeFileSync('data/universe.json', jsonData);
  console.log('✅ Generated universe.json');
  
  // Generate summary
  console.log('\n📊 Universe Summary:');
  console.log(`- Total Interactions: ${universe.interactions.length}`);
  console.log(`- Polarity Switches: ${universe.polaritySwitching.length}`);
  console.log(`- Vortex Sequences: ${universe.vortexSequences.length}`);
  console.log(`- Consciousness Flows: ${universe.consciousnessFlows.length}`);
  console.log('\n🌌 Universe generation complete!');
}

if (require.main === module) {
  main();
}

module.exports = {
  generateUniverse,
  generateVortexA,
  generateVortexB,
  generatePolaritySwitch,
  generateInteractionName,
  generateUniverseDocumentation
}; 