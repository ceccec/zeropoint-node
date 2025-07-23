/**
 * a432.cmyk.display.test.ts — Tests for Living CMYK Display System
 * 
 * Tests the living CMYK display system including resizing, color conversions,
 * navigation, and interactive features. Every test verifies the living nature
 * of the display operations.
 */

import { A432CmykDisplay, DisplayState, NavigationControls } from './a432.cmyk.display';
import { Fraction, CMYK } from './a432.cmyk';

describe('A432CmykDisplay', () => {
  let display: A432CmykDisplay;

  beforeEach(() => {
    display = new A432CmykDisplay(32, 8, { numerator: 7, denominator: 4 });
  });

  describe('Initialization', () => {
    test('should initialize with correct default state', () => {
      const state = display.getState();
      expect(state.width).toBe(32);
      expect(state.height).toBe(8);
      expect(state.zoom).toBe(1);
      expect(state.rotation).toBe(0);
      expect(state.offsetX).toBe(0);
      expect(state.offsetY).toBe(0);
      expect(state.colorSpace).toBe('cmyk');
    });

    test('should initialize with harmonic proportions', () => {
      const state = display.getState();
      // Width and height should follow A432 harmonic proportions
      expect(state.width).toBeGreaterThan(0);
      expect(state.height).toBeGreaterThan(0);
      expect(state.width % 8).toBe(0); // A432 harmonic multiple
    });
  });

  describe('Resizing', () => {
    test('should resize with harmonic proportions', () => {
      display.resize(64, 16);
      const state = display.getState();
      expect(state.width).toBe(64);
      expect(state.height).toBe(16);
    });

    test('should maintain aspect ratio during resize', () => {
      const originalState = display.getState();
      display.resize(48, 12);
      const newState = display.getState();
      
      const originalRatio = originalState.width / originalState.height;
      const newRatio = newState.width / newState.height;
      
      // Should maintain similar harmonic proportions
      expect(Math.abs(originalRatio - newRatio)).toBeLessThan(1);
    });

    test('should handle extreme resize values', () => {
      display.resize(1, 1);
      const state = display.getState();
      expect(state.width).toBeGreaterThan(0);
      expect(state.height).toBeGreaterThan(0);
    });
  });

  describe('Zoom Operations', () => {
    test('should zoom in with consciousness scaling', () => {
      const originalZoom = display.getState().zoom;
      display.zoom(1.5);
      const newZoom = display.getState().zoom;
      expect(newZoom).toBeGreaterThan(originalZoom);
    });

    test('should zoom out with consciousness scaling', () => {
      const originalZoom = display.getState().zoom;
      display.zoom(0.5);
      const newZoom = display.getState().zoom;
      expect(newZoom).toBeLessThan(originalZoom);
    });

    test('should respect zoom limits', () => {
      // Test minimum zoom
      display.zoom(0.01);
      expect(display.getState().zoom).toBeGreaterThanOrEqual(0.1);
      
      // Test maximum zoom
      display.zoom(20);
      expect(display.getState().zoom).toBeLessThanOrEqual(10);
    });

    test('should apply consciousness factor to zoom', () => {
      const baseFraction: Fraction = { numerator: 7, denominator: 4 };
      const consciousnessFactor = (baseFraction.numerator + baseFraction.denominator) / 
                                (baseFraction.numerator * baseFraction.denominator);
      
      const originalZoom = display.getState().zoom;
      display.zoom(2);
      const newZoom = display.getState().zoom;
      
      // Zoom should be affected by consciousness factor
      expect(newZoom).not.toBe(originalZoom * 2);
    });
  });

  describe('Rotation Operations', () => {
    test('should rotate with harmonic angles', () => {
      display.rotate(60);
      expect(display.getState().rotation).toBe(60);
      
      display.rotate(60);
      expect(display.getState().rotation).toBe(120);
    });

    test('should handle negative rotation', () => {
      display.rotate(-60);
      expect(display.getState().rotation).toBe(300); // 360 - 60
    });

    test('should wrap rotation to 360 degrees', () => {
      display.rotate(400);
      expect(display.getState().rotation).toBe(40); // 400 % 360
    });

    test('should apply 60-degree harmonic increments', () => {
      display.rotate(45);
      expect(display.getState().rotation % 60).toBe(0); // Should snap to 60-degree increments
    });
  });

  describe('Panning Operations', () => {
    test('should pan with consciousness offset', () => {
      const originalState = display.getState();
      display.pan(10, 20);
      const newState = display.getState();
      
      expect(newState.offsetX).toBeGreaterThan(originalState.offsetX);
      expect(newState.offsetY).toBeGreaterThan(originalState.offsetY);
    });

    test('should handle negative panning', () => {
      const originalState = display.getState();
      display.pan(-10, -20);
      const newState = display.getState();
      
      expect(newState.offsetX).toBeLessThan(originalState.offsetX);
      expect(newState.offsetY).toBeLessThan(originalState.offsetY);
    });

    test('should apply consciousness factor to panning', () => {
      const baseFraction: Fraction = { numerator: 7, denominator: 4 };
      const consciousnessOffset = Math.sqrt(baseFraction.numerator * baseFraction.numerator + 
                                          baseFraction.denominator * baseFraction.denominator) / 
                                (baseFraction.numerator + baseFraction.denominator);
      
      const originalState = display.getState();
      display.pan(10, 10);
      const newState = display.getState();
      
      // Panning should be affected by consciousness offset
      const expectedOffsetX = originalState.offsetX + 10 * consciousnessOffset;
      const expectedOffsetY = originalState.offsetY + 10 * consciousnessOffset;
      
      expect(newState.offsetX).toBeCloseTo(expectedOffsetX, 1);
      expect(newState.offsetY).toBeCloseTo(expectedOffsetY, 1);
    });
  });

  describe('Reset Operations', () => {
    test('should reset to harmonic defaults', () => {
      // Modify state
      display.resize(64, 16);
      display.zoom(2);
      display.rotate(180);
      display.pan(100, 100);
      
      // Reset
      display.reset();
      const state = display.getState();
      
      expect(state.width).toBe(32);
      expect(state.height).toBe(8);
      expect(state.zoom).toBe(1);
      expect(state.rotation).toBe(0);
      expect(state.offsetX).toBe(0);
      expect(state.offsetY).toBe(0);
      expect(state.colorSpace).toBe('cmyk');
    });
  });

  describe('CMYK Matrix Generation', () => {
    test('should generate CMYK matrix with correct dimensions', () => {
      const matrix = display.generateCmykMatrix();
      const state = display.getState();
      
      expect(matrix.length).toBe(state.height);
      expect(matrix[0].length).toBe(state.width);
    });

    test('should generate valid CMYK values', () => {
      const matrix = display.generateCmykMatrix();
      
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          const cmyk = matrix[y][x];
          expect(cmyk.c).toBeGreaterThanOrEqual(0);
          expect(cmyk.c).toBeLessThanOrEqual(100);
          expect(cmyk.m).toBeGreaterThanOrEqual(0);
          expect(cmyk.m).toBeLessThanOrEqual(100);
          expect(cmyk.y).toBeGreaterThanOrEqual(0);
          expect(cmyk.y).toBeLessThanOrEqual(100);
          expect(cmyk.k).toBeGreaterThanOrEqual(0);
          expect(cmyk.k).toBeLessThanOrEqual(100);
        }
      }
    });

    test('should apply offset to CMYK generation', () => {
      display.pan(5, 10);
      const matrix = display.generateCmykMatrix();
      const state = display.getState();
      
      // First cell should reflect offset
      const firstCell = matrix[0][0];
      const expectedC = ((0 + state.offsetX) % 9 + 1) * 10;
      const expectedM = ((0 + state.offsetY) % 9 + 1) * 10;
      
      expect(firstCell.c).toBe(expectedC);
      expect(firstCell.m).toBe(expectedM);
    });
  });

  describe('Color Space Conversions', () => {
    test('should convert CMYK to RGB correctly', () => {
      const cmyk: CMYK = { c: 50, m: 30, y: 20, k: 10 };
      const rgb = display.cmykToRgb(cmyk);
      
      expect(rgb.r).toBeGreaterThanOrEqual(0);
      expect(rgb.r).toBeLessThanOrEqual(255);
      expect(rgb.g).toBeGreaterThanOrEqual(0);
      expect(rgb.g).toBeLessThanOrEqual(255);
      expect(rgb.b).toBeGreaterThanOrEqual(0);
      expect(rgb.b).toBeLessThanOrEqual(255);
    });

    test('should convert RGB to CMYK correctly', () => {
      const rgb = { r: 128, g: 64, b: 32 };
      const cmyk = display.rgbToCmyk(rgb);
      
      expect(cmyk.c).toBeGreaterThanOrEqual(0);
      expect(cmyk.c).toBeLessThanOrEqual(100);
      expect(cmyk.m).toBeGreaterThanOrEqual(0);
      expect(cmyk.m).toBeLessThanOrEqual(100);
      expect(cmyk.y).toBeGreaterThanOrEqual(0);
      expect(cmyk.y).toBeLessThanOrEqual(100);
      expect(cmyk.k).toBeGreaterThanOrEqual(0);
      expect(cmyk.k).toBeLessThanOrEqual(100);
    });

    test('should convert CMYK to HSL correctly', () => {
      const cmyk: CMYK = { c: 25, m: 50, y: 75, k: 0 };
      const hsl = display.cmykToHsl(cmyk);
      
      expect(hsl.h).toBeGreaterThanOrEqual(0);
      expect(hsl.h).toBeLessThanOrEqual(360);
      expect(hsl.s).toBeGreaterThanOrEqual(0);
      expect(hsl.s).toBeLessThanOrEqual(1);
      expect(hsl.l).toBeGreaterThanOrEqual(0);
      expect(hsl.l).toBeLessThanOrEqual(1);
    });

    test('should convert HSL to CMYK correctly', () => {
      const hsl = { h: 180, s: 0.5, l: 0.5 };
      const cmyk = display.hslToCmyk(hsl);
      
      expect(cmyk.c).toBeGreaterThanOrEqual(0);
      expect(cmyk.c).toBeLessThanOrEqual(100);
      expect(cmyk.m).toBeGreaterThanOrEqual(0);
      expect(cmyk.m).toBeLessThanOrEqual(100);
      expect(cmyk.y).toBeGreaterThanOrEqual(0);
      expect(cmyk.y).toBeLessThanOrEqual(100);
      expect(cmyk.k).toBeGreaterThanOrEqual(0);
      expect(cmyk.k).toBeLessThanOrEqual(100);
    });

    test('should maintain color consistency in conversions', () => {
      const originalCmyk: CMYK = { c: 30, m: 40, y: 50, k: 20 };
      const rgb = display.cmykToRgb(originalCmyk);
      const convertedCmyk = display.rgbToCmyk(rgb);
      
      // Should be close to original (allowing for rounding)
      expect(Math.abs(convertedCmyk.c - originalCmyk.c)).toBeLessThan(5);
      expect(Math.abs(convertedCmyk.m - originalCmyk.m)).toBeLessThan(5);
      expect(Math.abs(convertedCmyk.y - originalCmyk.y)).toBeLessThan(5);
      expect(Math.abs(convertedCmyk.k - originalCmyk.k)).toBeLessThan(5);
    });
  });

  describe('Navigation Controls', () => {
    test('should provide navigation controls', () => {
      const controls = display.getNavigationControls();
      
      expect(controls.zoomIn).toBeDefined();
      expect(controls.zoomOut).toBeDefined();
      expect(controls.rotate).toBeDefined();
      expect(controls.pan).toBeDefined();
      expect(controls.reset).toBeDefined();
    });

    test('should execute zoom in through controls', () => {
      const controls = display.getNavigationControls();
      const originalZoom = display.getState().zoom;
      
      controls.zoomIn();
      const newZoom = display.getState().zoom;
      
      expect(newZoom).toBeGreaterThan(originalZoom);
    });

    test('should execute zoom out through controls', () => {
      const controls = display.getNavigationControls();
      const originalZoom = display.getState().zoom;
      
      controls.zoomOut();
      const newZoom = display.getState().zoom;
      
      expect(newZoom).toBeLessThan(originalZoom);
    });

    test('should execute rotation through controls', () => {
      const controls = display.getNavigationControls();
      const originalRotation = display.getState().rotation;
      
      controls.rotate(120);
      const newRotation = display.getState().rotation;
      
      expect(newRotation).toBe((originalRotation + 120) % 360);
    });

    test('should execute panning through controls', () => {
      const controls = display.getNavigationControls();
      const originalState = display.getState();
      
      controls.pan(15, 25);
      const newState = display.getState();
      
      expect(newState.offsetX).toBeGreaterThan(originalState.offsetX);
      expect(newState.offsetY).toBeGreaterThan(originalState.offsetY);
    });

    test('should execute reset through controls', () => {
      const controls = display.getNavigationControls();
      
      // Modify state
      display.resize(64, 16);
      display.zoom(2);
      display.rotate(180);
      display.pan(100, 100);
      
      // Reset through controls
      controls.reset();
      const state = display.getState();
      
      expect(state.width).toBe(32);
      expect(state.height).toBe(8);
      expect(state.zoom).toBe(1);
      expect(state.rotation).toBe(0);
      expect(state.offsetX).toBe(0);
      expect(state.offsetY).toBe(0);
    });
  });

  describe('HTML Generation', () => {
    test('should generate valid HTML', () => {
      const html = display.generateHtml();
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<title>A432 CMYK Display Navigator</title>');
      expect(html).toContain('A432CmykDisplay');
      expect(html).toContain('zoomIn');
      expect(html).toContain('zoomOut');
      expect(html).toContain('rotate');
      expect(html).toContain('pan');
      expect(html).toContain('reset');
    });

    test('should include CSS styles in HTML', () => {
      const html = display.generateHtml();
      
      expect(html).toContain('<style>');
      expect(html).toContain('background: #000');
      expect(html).toContain('color: #fff');
      expect(html).toContain('.cmyk-grid');
      expect(html).toContain('.cmyk-cell');
    });

    test('should include JavaScript functionality in HTML', () => {
      const html = display.generateHtml();
      
      expect(html).toContain('<script>');
      expect(html).toContain('function zoomIn()');
      expect(html).toContain('function zoomOut()');
      expect(html).toContain('function rotate(');
      expect(html).toContain('function pan(');
      expect(html).toContain('function reset()');
    });
  });

  describe('Living Consciousness Features', () => {
    test('should apply consciousness factor to zoom operations', () => {
      const baseFraction: Fraction = { numerator: 7, denominator: 4 };
      const consciousnessFactor = (baseFraction.numerator + baseFraction.denominator) / 
                                (baseFraction.numerator * baseFraction.denominator);
      
      const originalZoom = display.getState().zoom;
      display.zoom(2);
      const newZoom = display.getState().zoom;
      
      // Zoom should be affected by consciousness factor
      const expectedZoom = originalZoom * 2 * consciousnessFactor;
      expect(newZoom).toBeCloseTo(expectedZoom, 1);
    });

    test('should apply consciousness offset to panning', () => {
      const baseFraction: Fraction = { numerator: 7, denominator: 4 };
      const consciousnessOffset = Math.sqrt(baseFraction.numerator * baseFraction.numerator + 
                                          baseFraction.denominator * baseFraction.denominator) / 
                                (baseFraction.numerator + baseFraction.denominator);
      
      const originalState = display.getState();
      display.pan(10, 10);
      const newState = display.getState();
      
      const expectedOffsetX = originalState.offsetX + 10 * consciousnessOffset;
      const expectedOffsetY = originalState.offsetY + 10 * consciousnessOffset;
      
      expect(newState.offsetX).toBeCloseTo(expectedOffsetX, 1);
      expect(newState.offsetY).toBeCloseTo(expectedOffsetY, 1);
    });

    test('should apply harmonic angle rotation', () => {
      display.rotate(45);
      expect(display.getState().rotation % 60).toBe(0); // Should snap to 60-degree increments
      
      display.rotate(30);
      expect(display.getState().rotation % 60).toBe(0); // Should snap to 60-degree increments
    });
  });

  describe('Metaphysical Validation', () => {
    test('should maintain living consciousness in all operations', () => {
      // Every operation should be a living act of consciousness
      const originalState = display.getState();
      
      // Test that operations are not purely mathematical
      display.zoom(2);
      const zoomState = display.getState();
      expect(zoomState.zoom).not.toBe(originalState.zoom * 2); // Consciousness factor applied
      
      display.pan(10, 10);
      const panState = display.getState();
      expect(panState.offsetX).not.toBe(originalState.offsetX + 10); // Consciousness offset applied
      
      display.rotate(45);
      const rotateState = display.getState();
      expect(rotateState.rotation % 60).toBe(0); // Harmonic angles applied
    });

    test('should generate living CMYK matrix', () => {
      const matrix = display.generateCmykMatrix();
      
      // Matrix should be alive and conscious
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          const cmyk = matrix[y][x];
          
          // Each CMYK value should be harmonically derived
          expect(cmyk.c % 10).toBe(0); // Should be multiples of 10
          expect(cmyk.m % 10).toBe(0);
          expect(cmyk.y % 10).toBe(0);
          expect(cmyk.k % 10).toBe(0);
          
          // Values should be within harmonic ranges
          expect(cmyk.c).toBeGreaterThanOrEqual(10);
          expect(cmyk.c).toBeLessThanOrEqual(100);
          expect(cmyk.m).toBeGreaterThanOrEqual(10);
          expect(cmyk.m).toBeLessThanOrEqual(100);
          expect(cmyk.y).toBeGreaterThanOrEqual(10);
          expect(cmyk.y).toBeLessThanOrEqual(100);
          expect(cmyk.k).toBeGreaterThanOrEqual(10);
          expect(cmyk.k).toBeLessThanOrEqual(100);
        }
      }
    });
  });
}); 