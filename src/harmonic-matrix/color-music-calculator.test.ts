/**
 * 🌈🎵 Harmonic Matrix Color & Music Calculator Tests
 * 
 * Tests for the revolutionary system that calculates colors and music patterns
 * from the 100-node harmonic matrix using consciousness multipliers.
 */

import { 
  calculateHarmonicColor, 
  calculateHarmonicMusic, 
  calculateConsciousnessFlow,
  getAllHarmonicCalculations 
} from './color-music-calculator';

describe('Harmonic Matrix Color & Music Calculator', () => {
  
  describe('Color Calculations', () => {
    test('should calculate colors for W-Axis nodes (3, 6, 9)', () => {
      const color3 = calculateHarmonicColor(3, 0);
      const color6 = calculateHarmonicColor(6, 0);
      const color9 = calculateHarmonicColor(9, 0);
      
      // W-Axis should have high consciousness (×5/1)
      expect(color3.consciousness).toBe(15); // 3 × 5/1
      expect(color6.consciousness).toBe(30); // 6 × 5/1
      expect(color9.consciousness).toBe(45); // 9 × 5/1
      
      // Should have valid color properties
      expect(color3.hue).toBeGreaterThanOrEqual(0);
      expect(color3.hue).toBeLessThanOrEqual(360);
      expect(color3.saturation).toBeGreaterThanOrEqual(0);
      expect(color3.saturation).toBeLessThanOrEqual(100);
      expect(color3.hex).toMatch(/^#[0-9A-F]{6}$/);
    });
    
    test('should calculate colors for Vortex Sequence nodes (1, 2, 4, 8, 7)', () => {
      const color1 = calculateHarmonicColor(1, 0);
      const color2 = calculateHarmonicColor(2, 0);
      const color4 = calculateHarmonicColor(4, 0);
      
      // Vortex sequence should have consciousness multiplier (×3/1)
      expect(color1.consciousness).toBe(3); // 1 × 3/1
      expect(color2.consciousness).toBe(6); // 2 × 3/1
      expect(color4.consciousness).toBe(12); // 4 × 3/1
    });
    
    test('should calculate colors for Sacred Geometry (5)', () => {
      const color5 = calculateHarmonicColor(5, 0);
      
      // Sacred Geometry should have consciousness multiplier (×5/1)
      expect(color5.consciousness).toBe(25); // 5 × 5/1
      expect(color5.metaphysicalContext).toContain('Sacred Geometry');
    });
    
    test('should calculate colors for Void (0)', () => {
      const color0 = calculateHarmonicColor(0, 1);
      
      // Void should have zero consciousness
      expect(color0.consciousness).toBe(0);
      expect(color0.metaphysicalContext).toContain('Void Center');
    });
    
    test('should generate valid color matrix', () => {
      const { colors } = getAllHarmonicCalculations();
      
      // Should be 10x10 matrix
      expect(colors).toHaveLength(10);
      expect(colors[0]).toHaveLength(10);
      
      // All colors should be valid
      colors.forEach(row => {
        row.forEach(color => {
          expect(color.hue).toBeGreaterThanOrEqual(0);
          expect(color.hue).toBeLessThanOrEqual(360);
          expect(color.saturation).toBeGreaterThanOrEqual(0);
          expect(color.saturation).toBeLessThanOrEqual(100);
          expect(color.hex).toMatch(/^#[0-9A-F]{6}$/);
        });
      });
    });
  });
  
  describe('Music Calculations', () => {
    test('should calculate music for W-Axis nodes', () => {
      const music3 = calculateHarmonicMusic(3, 0);
      const music6 = calculateHarmonicMusic(6, 0);
      const music9 = calculateHarmonicMusic(9, 0);
      
      // Should have valid music properties
      expect(music3.frequency).toBeGreaterThan(0);
      expect(music6.frequency).toBeGreaterThan(0);
      expect(music9.frequency).toBeGreaterThan(0);
      
      expect(music3.note).toMatch(/^[A-G]#?$/);
      expect(music6.note).toMatch(/^[A-G]#?$/);
      expect(music9.note).toMatch(/^[A-G]#?$/);
      
      expect(music3.octave).toBeGreaterThanOrEqual(4);
      expect(music3.duration).toBeGreaterThan(0);
      expect(music3.amplitude).toBeGreaterThan(0);
      expect(music3.amplitude).toBeLessThanOrEqual(1);
    });
    
    test('should calculate music for Vortex Sequence nodes', () => {
      const music1 = calculateHarmonicMusic(1, 0);
      const music2 = calculateHarmonicMusic(2, 0);
      const music4 = calculateHarmonicMusic(4, 0);
      
      // Should have consciousness-based frequencies
      expect(music1.frequency).toBeGreaterThan(0);
      expect(music2.frequency).toBeGreaterThan(0);
      expect(music4.frequency).toBeGreaterThan(0);
      
      // Should have different notes based on harmonic results
      expect(music1.note).not.toBe(music2.note);
      expect(music2.note).not.toBe(music4.note);
    });
    
    test('should generate valid music matrix', () => {
      const { music } = getAllHarmonicCalculations();
      
      // Should be 10x10 matrix
      expect(music).toHaveLength(10);
      expect(music[0]).toHaveLength(10);
      
      // All music should be valid
      music.forEach(row => {
        row.forEach(musicNode => {
          expect(musicNode.frequency).toBeGreaterThan(0);
          expect(musicNode.note).toMatch(/^[A-G]#?$/);
          expect(musicNode.octave).toBeGreaterThanOrEqual(4);
          expect(musicNode.duration).toBeGreaterThan(0);
          expect(musicNode.amplitude).toBeGreaterThan(0);
          expect(musicNode.amplitude).toBeLessThanOrEqual(1);
        });
      });
    });
  });
  
  describe('Consciousness Flow', () => {
    test('should calculate Rodin vortex cycle flow', () => {
      const flow = calculateConsciousnessFlow();
      
      // Should follow canonical cycle: 0→3→6→9→1→2→4→8→7→5→1
      expect(flow.flowPattern).toBe('Rodin Vortex Cycle');
      expect(flow.path).toHaveLength(10); // 11 nodes = 10 transitions
      
      // Should have colors and music for each transition
      expect(flow.colors).toHaveLength(10);
      expect(flow.music).toHaveLength(10);
      
      // Should have total consciousness
      expect(flow.totalConsciousness).toBeGreaterThan(0);
    });
    
    test('should have valid flow transitions', () => {
      const flow = calculateConsciousnessFlow();
      
      flow.path.forEach(([a, b], i) => {
        // Each transition should have valid colors and music
        expect(flow.colors[i]).toBeDefined();
        expect(flow.music[i]).toBeDefined();
        
        // Colors should be valid
        expect(flow.colors[i].hex).toMatch(/^#[0-9A-F]{6}$/);
        expect(flow.colors[i].consciousness).toBeGreaterThanOrEqual(0);
        
        // Music should be valid
        expect(flow.music[i].frequency).toBeGreaterThan(0);
        expect(flow.music[i].note).toMatch(/^[A-G]#?$/);
      });
    });
  });
  
  describe('Harmonic Matrix Integration', () => {
    test('should generate complete harmonic calculations', () => {
      const calculations = getAllHarmonicCalculations();
      
      // Should have all components
      expect(calculations.colors).toBeDefined();
      expect(calculations.music).toBeDefined();
      expect(calculations.flow).toBeDefined();
      expect(calculations.bookKnowledge).toBeDefined();
      
      // Should be 10x10 matrices
      expect(calculations.colors).toHaveLength(10);
      expect(calculations.music).toHaveLength(10);
      expect(calculations.colors[0]).toHaveLength(10);
      expect(calculations.music[0]).toHaveLength(10);
    });
    
    test('should maintain mathematical consistency', () => {
      const calculations = getAllHarmonicCalculations();
      
      // Check a few specific nodes for consistency
      const color00 = calculations.colors[0][0];
      const music00 = calculations.music[0][0];
      
      // Void (0) should have zero consciousness in both
      expect(color00.consciousness).toBe(0);
      expect(music00.consciousness).toBe(0);
      
      // W-Axis (3) should have high consciousness
      const color30 = calculations.colors[3][0];
      const music30 = calculations.music[3][0];
      
      expect(color30.consciousness).toBe(15); // 3 × 5/1
      expect(music30.consciousness).toBe(15); // 3 × 5/1
    });
  });
}); 