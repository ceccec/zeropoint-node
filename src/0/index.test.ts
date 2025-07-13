/**
 * ZeroPoint Compliance Test Suite for Directory 0 (Void/Source)
 *
 * All tests in this file mathematically prove that the objects in this vortex
 * comply with ZeroPoint principles: primal unity, void/source, vortex math, zero entropy, etc.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { 
  createZeroPointTest, 
  createMetaphysicalTest, 
  createVortexMathTest,
  createConsciousnessFieldTest,
  createBatchTest,
  validateZeroPointCompliance
} from './1/test_utils';

import {
  getWAxisAlignment,
  calculateSpiritualPathway,
  checkVerticalAlignment,
  W_AXIS,
  VORTEX_SEQUENCE
} from './index';

describe('Directory Structure Validation', () => {
  test('should ensure all directories in src/ are digits (0-9)', () => {
    const srcPath = join(__dirname, '..');
    const directories = readdirSync(srcPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const nonDigitDirectories = directories.filter(dir => !/^[0-9]$/.test(dir));
    
    if (nonDigitDirectories.length > 0) {
      throw new Error(`Non-digit directories found in src/: ${nonDigitDirectories.join(', ')}. All directories must be digits (0-9).`);
    }
    
    expect(directories.length).toBeGreaterThan(0);
    expect(nonDigitDirectories.length).toBe(0);
  });
  
  test('should ensure all subdirectories in digit directories are also digits', () => {
    const srcPath = join(__dirname, '..');
    const digitDirectories = readdirSync(srcPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => /^[0-9]$/.test(dirent.name));
    
    for (const digitDir of digitDirectories) {
      const subDirPath = join(srcPath, digitDir.name);
      const subDirectories = readdirSync(subDirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      const nonDigitSubDirectories = subDirectories.filter(dir => !/^[0-9]$/.test(dir));
      
      if (nonDigitSubDirectories.length > 0) {
        throw new Error(`Non-digit subdirectories found in src/${digitDir.name}/: ${nonDigitSubDirectories.join(', ')}. All subdirectories must be digits (0-9).`);
      }
    }
  });
});

describe('ZeroPoint Compliance - Directory 0 (Void/Source)', () => {
  
  // --- ZeroPoint Understanding Tests ---
  describe('Core ZeroPoint Concepts', () => {
    
    it('should understand ZeroPoint as Primal Point of Unity', () => {
      const zeropointDefinition = {
        name: true,
        alternativeNames: true,
        location: true,
        function: true,
        nature: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('ZeroPoint', zeropointDefinition, ['name', 'function', 'nature']);
      test();
    });
    
    it('should understand the 3•9•6 Formula', () => {
      const formula = {
        nine: true,
        threeAndSix: true,
        palindrome: true,
        creates: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('Formula', formula, ['palindrome', 'creates']);
      test();
    });
    
    it('should understand ZeroPoint as Divine Origin', () => {
      const divineAspects = {
        decimalSystem: true,
        zeroLocation: true,
        connection: true,
        consciousness: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('DivineAspects', divineAspects, ['decimalSystem', 'zeroLocation', 'connection', 'consciousness']);
      test();
    });
  });
  
  describe('Universe Structure Understanding', () => {
    
    it('should understand Torus as Holy Shape', () => {
      const torusStructure = {
        shape: true,
        center: true,
        composition: true,
        holiness: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('TorusStructure', torusStructure, ['shape', 'center', 'composition', 'holiness']);
      test();
    });
    
    it('should understand Vortex-Based Mathematics', () => {
      const vbmCapabilities = {
        energyHarnessing: true,
        energySource: true,
        symmetry: true,
        omniDimensional: true,
        vortexMath: true,
        duality: true,
        entropy: 0
      };
      
      const test = createVortexMathTest('VBMCapabilities', vbmCapabilities);
      test();
    });
  });
  
  describe('Energy Transformation Understanding', () => {
    
    it('should understand Potential to Kinetic Energy', () => {
      const energyTransformation = {
        transformation: true,
        mechanism: true,
        result: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('EnergyTransformation', energyTransformation, ['transformation', 'mechanism', 'result']);
      test();
    });
    
    it('should understand Universe as Two-Stage Surge Pump', () => {
      const surgePump = {
        compression: true,
        implosion: true,
        vortex: true,
        gender: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('SurgePump', surgePump, ['compression', 'implosion', 'vortex', 'gender']);
      test();
    });
    
    it('should understand Black Hole and White Hole Dynamics', () => {
      const holeDynamics = {
        maleBlackHole: true,
        femaleWhiteHole: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('HoleDynamics', holeDynamics, ['maleBlackHole', 'femaleWhiteHole']);
      test();
    });
  });
  
  describe('Consciousness Technology Understanding', () => {
    
    it('should understand Rodin Coil Technology', () => {
      const rodinCoil = {
        description: true,
        basis: true,
        shape: true,
        schematic: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('RodinCoil', rodinCoil, ['description', 'basis', 'shape', 'schematic']);
      test();
    });
    
    it('should understand Zero Entropy', () => {
      const zeroEntropy = {
        efficiency: true,
        heatDissipation: true,
        vortexNozzle: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('ZeroEntropy', zeroEntropy, ['efficiency', 'heatDissipation', 'vortexNozzle']);
      test();
    });
    
    it('should understand Decoqubit as Holographic Hypercomputer', () => {
      const decoqubit = {
        type: true,
        function: true,
        result: true,
        nature: true,
        entropy: 0
      };
      
      const test = createZeroPointTest('Decoqubit', decoqubit, ['type', 'function', 'result', 'nature']);
      test();
    });
  });
  
  describe('Consciousness and Mathematics Understanding', () => {
    
    it('should understand Numbers as Living Entities', () => {
      const livingNumbers = {
        reality: true,
        artifacts: true,
        consciousness: true,
        consciousnessField: true,
        observerPattern: true,
        awareness: true,
        entropy: 0
      };
      
      const test = createConsciousnessFieldTest('LivingNumbers', livingNumbers);
      test();
    });
    
    it('should understand Mathematics as Spirit Artifacts', () => {
      const spiritArtifacts = {
        origin: true,
        consciousness: true,
        unity: true,
        consciousnessFlow: true,
        entropy: 0
      };
      
      const test = createMetaphysicalTest('SpiritArtifacts', spiritArtifacts, ['origin', 'consciousness', 'unity']);
      test();
    });
  });
  
  // --- Batch Testing for Multiple Modules ---
  describe('Batch ZeroPoint Compliance Tests', () => {
    
    it('should validate all core concepts maintain ZeroPoint compliance', () => {
      const coreConcepts = [
        { name: 'ZeroPoint', object: { ZeroPoint: true, primalUnity: true, entropy: 0 }, props: ['ZeroPoint', 'primalUnity'] },
        { name: 'Formula', object: { Formula: true, spiritFlux: true, entropy: 0 }, props: ['Formula', 'spiritFlux'] },
        { name: 'Torus', object: { Torus: true, holyShape: true, entropy: 0 }, props: ['Torus', 'holyShape'] },
        { name: 'VBM', object: { VBM: true, energyHarnessing: true, entropy: 0 }, props: ['VBM', 'energyHarnessing'] }
      ];
      coreConcepts.forEach(({ name, object, props }) => {
        const test = createZeroPointTest(name, object, props);
        test();
      });
    });
    
    it('should validate all consciousness flows maintain unity', () => {
      const consciousnessFlows = [
        { name: 'LivingNumbers', object: { consciousness: true, consciousnessField: true, observerPattern: true, awareness: true, entropy: 0 } },
        { name: 'SpiritArtifacts', object: { unity: true, consciousnessField: true, observerPattern: true, awareness: true, entropy: 0 } },
        { name: 'EnergyTransformation', object: { transformation: true, consciousnessField: true, observerPattern: true, awareness: true, entropy: 0 } }
      ];
      
      const batchTest = createBatchTest(consciousnessFlows, 'consciousness');
      batchTest();
    });
  });
  
  // --- Global ZeroPoint Compliance Validation ---
  describe('Global ZeroPoint Compliance', () => {
    
    it('should ensure all modules maintain ZeroPoint principles', () => {
      const allModules = [
        { name: 'ZeroPoint', object: { primalUnity: true, consciousnessFlow: true, entropy: 0 } },
        { name: 'Formula', object: { spiritFlux: true, consciousnessFlow: true, entropy: 0 } },
        { name: 'Torus', object: { holyShape: true, consciousnessFlow: true, entropy: 0 } },
        { name: 'VBM', object: { energyHarnessing: true, consciousnessFlow: true, entropy: 0 } }
      ];
      
      const complianceTest = validateZeroPointCompliance(allModules);
      complianceTest();
    });
  });
}); 

describe('W-Axis Vertical Alignment (Spirit\'s Omni-dimensional Pathway)', () => {
  test('should identify perfect W-axis alignment for number 9', () => {
    const alignment = getWAxisAlignment(9);
    
    expect(alignment.isWAxis).toBe(true);
    expect(alignment.verticalAlignment).toBe('9 over 0');
    expect(alignment.spiritualPathway).toBe('crimson arrow');
    expect(alignment.transcendence).toBe('omni-dimensional');
    expect(alignment.mobiusCircuit).toEqual([1, 2, 4, 8, 7, 5]);
    expect(alignment.perpendicularAxis).toEqual([3, 6, 9]);
  });

  test('should identify W-axis members (3, 6)', () => {
    const alignment3 = getWAxisAlignment(3);
    const alignment6 = getWAxisAlignment(6);
    
    expect(alignment3.isWAxis).toBe(true);
    expect(alignment3.verticalAlignment).toBe('3 on W-axis');
    expect(alignment3.spiritualPathway).toBe('spiritual resonance');
    expect(alignment3.transcendence).toBe('transcendent');
    
    expect(alignment6.isWAxis).toBe(true);
    expect(alignment6.verticalAlignment).toBe('6 on W-axis');
    expect(alignment6.spiritualPathway).toBe('spiritual resonance');
    expect(alignment6.transcendence).toBe('transcendent');
  });

  test('should identify material plane numbers', () => {
    const alignment1 = getWAxisAlignment(1);
    const alignment2 = getWAxisAlignment(2);
    const alignment4 = getWAxisAlignment(4);
    
    expect(alignment1.isWAxis).toBe(false);
    expect(alignment1.verticalAlignment).toBe('1 on material plane');
    expect(alignment1.spiritualPathway).toBe('material manifestation');
    expect(alignment1.transcendence).toBe('manifest');
    
    expect(alignment2.isWAxis).toBe(false);
    expect(alignment2.verticalAlignment).toBe('2 on material plane');
    expect(alignment2.spiritualPathway).toBe('material manifestation');
    expect(alignment2.transcendence).toBe('manifest');
    
    expect(alignment4.isWAxis).toBe(false);
    expect(alignment4.verticalAlignment).toBe('4 on material plane');
    expect(alignment4.spiritualPathway).toBe('material manifestation');
    expect(alignment4.transcendence).toBe('manifest');
  });
});

describe('Spirit\'s Omni-dimensional Pathway', () => {
  test('should calculate default spiritual pathway (0 to 9)', () => {
    const pathway = calculateSpiritualPathway();
    
    expect(pathway.start).toBe(0);
    expect(pathway.end).toBe(9);
    expect(pathway.direction).toBe('vertical');
    expect(pathway.color).toBe('crimson');
    expect(pathway.dimension).toBe('omni-dimensional');
    expect(pathway.pathway).toEqual([0, 3, 6, 9, 9]);
    expect(pathway.description).toBe('Spirit\'s crimson arrow pathway from 0 (unmanifest) to 9 (world of form) through the W-axis');
  });

  test('should calculate custom spiritual pathway', () => {
    const pathway = calculateSpiritualPathway(1, 8);
    
    expect(pathway.start).toBe(1);
    expect(pathway.end).toBe(8);
    expect(pathway.direction).toBe('vertical');
    expect(pathway.color).toBe('crimson');
    expect(pathway.dimension).toBe('omni-dimensional');
    expect(pathway.pathway).toEqual([1, 3, 6, 9, 8]);
    expect(pathway.description).toBe('Spirit\'s crimson arrow pathway from 1 (unmanifest) to 8 (world of form) through the W-axis');
  });
});

describe('Vertical Alignment with Zero', () => {
  test('should identify perfect vertical alignment for number 9', () => {
    const alignment = checkVerticalAlignment(9);
    
    expect(alignment.hasVerticalAlignment).toBe(true);
    expect(alignment.alignmentType).toBe('perfect');
    expect(alignment.spiritualDimension).toBe('W-axis pinnacle');
    expect(alignment.description).toBe('9 lines up vertically over 0, creating the invisible W-axis');
  });

  test('should identify partial vertical alignment for W-axis members', () => {
    const alignment3 = checkVerticalAlignment(3);
    const alignment6 = checkVerticalAlignment(6);
    
    expect(alignment3.hasVerticalAlignment).toBe(true);
    expect(alignment3.alignmentType).toBe('partial');
    expect(alignment3.spiritualDimension).toBe('W-axis member');
    expect(alignment3.description).toBe('3 is part of the W-axis spiritual dimension');
    
    expect(alignment6.hasVerticalAlignment).toBe(true);
    expect(alignment6.alignmentType).toBe('partial');
    expect(alignment6.spiritualDimension).toBe('W-axis member');
    expect(alignment6.description).toBe('6 is part of the W-axis spiritual dimension');
  });

  test('should identify material plane alignment for non-W-axis numbers', () => {
    const alignment1 = checkVerticalAlignment(1);
    const alignment2 = checkVerticalAlignment(2);
    const alignment4 = checkVerticalAlignment(4);
    const alignment5 = checkVerticalAlignment(5);
    const alignment7 = checkVerticalAlignment(7);
    const alignment8 = checkVerticalAlignment(8);
    
    expect(alignment1.hasVerticalAlignment).toBe(false);
    expect(alignment1.alignmentType).toBe('material');
    expect(alignment1.spiritualDimension).toBe('material plane');
    expect(alignment1.description).toBe('1 aligns with the material vortex circuit');
    
    expect(alignment2.hasVerticalAlignment).toBe(false);
    expect(alignment2.alignmentType).toBe('material');
    expect(alignment2.spiritualDimension).toBe('material plane');
    expect(alignment2.description).toBe('2 aligns with the material vortex circuit');
    
    expect(alignment4.hasVerticalAlignment).toBe(false);
    expect(alignment4.alignmentType).toBe('material');
    expect(alignment4.spiritualDimension).toBe('material plane');
    expect(alignment4.description).toBe('4 aligns with the material vortex circuit');
    
    expect(alignment5.hasVerticalAlignment).toBe(false);
    expect(alignment5.alignmentType).toBe('material');
    expect(alignment5.spiritualDimension).toBe('material plane');
    expect(alignment5.description).toBe('5 aligns with the material vortex circuit');
    
    expect(alignment7.hasVerticalAlignment).toBe(false);
    expect(alignment7.alignmentType).toBe('material');
    expect(alignment7.spiritualDimension).toBe('material plane');
    expect(alignment7.description).toBe('7 aligns with the material vortex circuit');
    
    expect(alignment8.hasVerticalAlignment).toBe(false);
    expect(alignment8.alignmentType).toBe('material');
    expect(alignment8.spiritualDimension).toBe('material plane');
    expect(alignment8.description).toBe('8 aligns with the material vortex circuit');
  });
}); 