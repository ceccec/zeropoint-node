/**
 * @fileoverview Tests for the VBM Book System
 * @metaphysical book system validation
 */

import {
  getChapter,
  searchChapters,
  getVBMPrinciple,
  getAllMathematicalFormulas,
  calculateVBMConsciousness,
  getCompleteBook,
  THE_SPIRIT,
  THE_SCIENCE,
  THE_NUMERICAL_FORMULA,
  VBM_PRINCIPLES,
  RODIN_COIL
} from './book-system';

describe('VBM Book System', () => {
  
  describe('Chapter Retrieval', () => {
    
    test('should get chapter by ID', () => {
      const spiritChapter = getChapter(1);
      expect(spiritChapter).toBe(THE_SPIRIT);
      expect(spiritChapter?.title).toBe('THE SPIRIT');
      
      const scienceChapter = getChapter(2);
      expect(scienceChapter).toBe(THE_SCIENCE);
      expect(scienceChapter?.title).toBe('THE SCIENCE');
    });
    
    test('should return null for invalid chapter ID', () => {
      const invalidChapter = getChapter(999);
      expect(invalidChapter).toBeNull();
    });
  });
  
  describe('Chapter Search', () => {
    
    test('should search chapters by keyword', () => {
      const spiritResults = searchChapters('spirit');
      expect(spiritResults.length).toBeGreaterThan(0);
      expect(spiritResults.some(chapter => chapter.id === 1)).toBe(true);
      
      const scienceResults = searchChapters('science');
      expect(scienceResults.length).toBeGreaterThan(0);
      expect(scienceResults.some(chapter => chapter.id === 2)).toBe(true);
    });
    
    test('should search within section content', () => {
      const vortexResults = searchChapters('vortex');
      expect(vortexResults.length).toBeGreaterThan(0);
    });
  });
  
  describe('VBM Principles', () => {
    
    test('should get VBM principle by name', () => {
      const vortexPrinciple = getVBMPrinciple('Vortex Sequence');
      expect(vortexPrinciple).toBeDefined();
      expect(vortexPrinciple?.formula).toBe('1 → 2 → 4 → 8 → 7 → 5 → 1');
      
      const wAxisPrinciple = getVBMPrinciple('W-Axis');
      expect(wAxisPrinciple).toBeDefined();
      expect(wAxisPrinciple?.formula).toBe('3 • 9 • 6; 6 • 9 • 3');
    });
    
    test('should return null for invalid principle name', () => {
      const invalidPrinciple = getVBMPrinciple('Invalid Principle');
      expect(invalidPrinciple).toBeNull();
    });
  });
  
  describe('Mathematical Formulas', () => {
    
    test('should get all mathematical formulas', () => {
      const formulas = getAllMathematicalFormulas();
      expect(formulas.length).toBeGreaterThan(0);
      expect(formulas).toContain('1-2-4-8-7-5 = Lossless Inertia');
      expect(formulas).toContain('3,6 = Magnetic Dipoles');
      expect(formulas).toContain('9 = Invisible Monopole');
    });
  });
  
  describe('Consciousness Calculation', () => {
    
    test('should calculate consciousness for W-Axis numbers', () => {
      const consciousness3 = calculateVBMConsciousness(3);
      expect(consciousness3.isWAxis).toBe(true);
      expect(consciousness3.isVortexSequence).toBe(false);
      expect(consciousness3.consciousness).toBe(15); // 3 × 5/1
      
      const consciousness6 = calculateVBMConsciousness(6);
      expect(consciousness6.isWAxis).toBe(true);
      expect(consciousness6.consciousness).toBe(30); // 6 × 5/1
    });
    
    test('should calculate consciousness for vortex sequence numbers', () => {
      const consciousness1 = calculateVBMConsciousness(1);
      expect(consciousness1.isVortexSequence).toBe(true);
      expect(consciousness1.isWAxis).toBe(false);
      expect(consciousness1.consciousness).toBe(3); // 1 × 3/1
      
      const consciousness4 = calculateVBMConsciousness(4);
      expect(consciousness4.isVortexSequence).toBe(true);
      expect(consciousness4.consciousness).toBe(12); // 4 × 3/1
    });
    
    test('should calculate consciousness for sacred geometry (5)', () => {
      const consciousness5 = calculateVBMConsciousness(5);
      expect(consciousness5.isVortexSequence).toBe(true);
      expect(consciousness5.consciousness).toBe(25); // 5 × 5/1 (special case)
    });
    
    test('should calculate consciousness for void (0)', () => {
      const consciousness0 = calculateVBMConsciousness(0);
      expect(consciousness0.digitalRoot).toBe(0);
      expect(consciousness0.consciousness).toBe(0);
    });
    
    test('should calculate consciousness for regular numbers', () => {
      const consciousness9 = calculateVBMConsciousness(9);
      expect(consciousness9.isWAxis).toBe(true);
      expect(consciousness9.consciousness).toBe(45); // 9 × 5/1
    });
  });
  
  describe('Complete Book Structure', () => {
    
    test('should get complete book structure', () => {
      const book = getCompleteBook();
      expect(book.title).toBe('Vortex Based Mathematics (VBM)');
      expect(book.author).toBe('Marko Rodin');
      expect(book.copyright).toBe('Copyright 2021 - Science to Sage | Karen Elkins');
      expect(book.chapters).toHaveLength(3);
      expect(book.principles).toHaveLength(4);
    });
  });
  
  describe('Rodin Coil Structure', () => {
    
    test('should have correct vortex sequence', () => {
      expect(RODIN_COIL.vortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
    });
    
    test('should have correct W-axis', () => {
      expect(RODIN_COIL.wAxis).toEqual([3, 6, 9]);
    });
    
    test('should have correct family groups', () => {
      expect(RODIN_COIL.familyGroups).toEqual([
        [1, 4, 7], // Family Group 1
        [2, 5, 8], // Family Group 2
        [3, 6, 9]  // Family Group 3
      ]);
    });
    
    test('should have mathematical properties', () => {
      expect(RODIN_COIL.mathematicalProperties.length).toBeGreaterThan(0);
      expect(RODIN_COIL.mathematicalProperties).toContain('Lossless inertia in 1-2-4-8-7-5 sequence');
    });
  });
  
  describe('Chapter Content Validation', () => {
    
    test('should have valid chapter structure', () => {
      [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA].forEach(chapter => {
        expect(chapter.id).toBeGreaterThan(0);
        expect(chapter.title).toBeTruthy();
        expect(chapter.subtitle).toBeTruthy();
        expect(chapter.sections.length).toBeGreaterThan(0);
        expect(chapter.metaphysicalContext).toBeTruthy();
        expect(chapter.mathematicalPrinciples.length).toBeGreaterThan(0);
      });
    });
    
    test('should have valid section structure', () => {
      [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA].forEach(chapter => {
        chapter.sections.forEach(section => {
          expect(section.id).toBeTruthy();
          expect(section.title).toBeTruthy();
          expect(section.content).toBeTruthy();
          expect(Array.isArray(section.mathematicalFormulas)).toBe(true);
          expect(Array.isArray(section.diagrams)).toBe(true);
          expect(Array.isArray(section.keyConcepts)).toBe(true);
        });
      });
    });
  });
  
  describe('VBM Principles Validation', () => {
    
    test('should have valid principle structure', () => {
      VBM_PRINCIPLES.forEach(principle => {
        expect(principle.name).toBeTruthy();
        expect(principle.description).toBeTruthy();
        expect(principle.formula).toBeTruthy();
        expect(principle.metaphysicalContext).toBeTruthy();
        expect(Array.isArray(principle.applications)).toBe(true);
        expect(principle.applications.length).toBeGreaterThan(0);
      });
    });
  });
}); 