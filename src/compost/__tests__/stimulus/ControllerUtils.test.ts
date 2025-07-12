import {
  ColorUtils,
  MathUtils,
  UIUtils,
  ResultUtils,
  ConsciousnessUtils
} from "../../stimulus/utils/ControllerUtils";

describe('ControllerUtils', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  describe('ColorUtils', () => {
    describe('consciousnessToHSL', () => {
      it('should generate HSL color from consciousness level', () => {
        const color = ColorUtils.consciousnessToHSL(0.5);
        expect(color).toBe('hsl(180, 70%, 50%)');
      });

      it('should handle zero consciousness level', () => {
        const color = ColorUtils.consciousnessToHSL(0);
        expect(color).toBe('hsl(0, 70%, 50%)');
      });

      it('should handle maximum consciousness level', () => {
        const color = ColorUtils.consciousnessToHSL(1);
        expect(color).toBe('hsl(360, 70%, 50%)');
      });

      it('should handle fractional consciousness levels', () => {
        const color = ColorUtils.consciousnessToHSL(0.25);
        expect(color).toBe('hsl(90, 70%, 50%)');
      });
    });

    describe('consciousnessToGradient', () => {
      it('should generate gradient from consciousness level', () => {
        const gradient = ColorUtils.consciousnessToGradient(0.5);
        expect(gradient).toContain('linear-gradient(45deg,');
        expect(gradient).toContain('hsl(180, 70%, 50%)');
        expect(gradient).toContain('hsl(210, 70%, 50%)');
      });

      it('should handle zero consciousness level', () => {
        const gradient = ColorUtils.consciousnessToGradient(0);
        expect(gradient).toContain('hsl(0, 70%, 50%)');
        expect(gradient).toContain('hsl(108, 70%, 50%)');
      });

      it('should handle maximum consciousness level', () => {
        const gradient = ColorUtils.consciousnessToGradient(1);
        expect(gradient).toContain('hsl(360, 70%, 50%)');
        expect(gradient).toContain('hsl(468, 70%, 50%)');
      });
    });

    describe('applyConsciousnessColor', () => {
      it('should apply consciousness color to element', () => {
        ColorUtils.applyConsciousnessColor(mockElement, 0.5);
        expect(mockElement.style.color).toBe('hsl(180, 70%, 50%)');
      });

      it('should handle zero consciousness level', () => {
        ColorUtils.applyConsciousnessColor(mockElement, 0);
        expect(mockElement.style.color).toBe('hsl(0, 70%, 50%)');
      });

      it('should handle maximum consciousness level', () => {
        ColorUtils.applyConsciousnessColor(mockElement, 1);
        expect(mockElement.style.color).toBe('hsl(360, 70%, 50%)');
      });
    });
  });

  describe('MathUtils', () => {
    describe('formatNumber', () => {
      it('should format number with default precision', () => {
        const formatted = MathUtils.formatNumber(3.14159);
        expect(formatted).toBe('3.142');
      });

      it('should format number with custom precision', () => {
        const formatted = MathUtils.formatNumber(3.14159, 2);
        expect(formatted).toBe('3.14');
      });

      it('should handle zero', () => {
        const formatted = MathUtils.formatNumber(0);
        expect(formatted).toBe('0.000');
      });

      it('should handle negative numbers', () => {
        const formatted = MathUtils.formatNumber(-3.14159);
        expect(formatted).toBe('-3.142');
      });

      it('should handle large numbers', () => {
        const formatted = MathUtils.formatNumber(123456.789);
        expect(formatted).toBe('123456.789');
      });
    });

    describe('randomInRange', () => {
      it('should generate random number within range', () => {
        const result = MathUtils.randomInRange(0, 10);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(10);
      });

      it('should handle negative ranges', () => {
        const result = MathUtils.randomInRange(-10, 0);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThan(0);
      });

      it('should handle same min and max', () => {
        const result = MathUtils.randomInRange(5, 5);
        expect(result).toBe(5);
      });
    });

    describe('clamp', () => {
      it('should clamp value within range', () => {
        expect(MathUtils.clamp(5, 0, 10)).toBe(5);
        expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
        expect(MathUtils.clamp(15, 0, 10)).toBe(10);
      });

      it('should handle edge cases', () => {
        expect(MathUtils.clamp(0, 0, 10)).toBe(0);
        expect(MathUtils.clamp(10, 0, 10)).toBe(10);
      });

      it('should handle negative ranges', () => {
        expect(MathUtils.clamp(-5, -10, 0)).toBe(-5);
        expect(MathUtils.clamp(-15, -10, 0)).toBe(-10);
        expect(MathUtils.clamp(5, -10, 0)).toBe(0);
      });
    });
  });

  describe('UIUtils', () => {
    describe('safeInnerHTML', () => {
      it('should update innerHTML safely', () => {
        UIUtils.safeInnerHTML(mockElement, '<p>Test content</p>');
        expect(mockElement.innerHTML).toBe('<p>Test content</p>');
      });

      it('should handle innerHTML errors gracefully', () => {
        // Mock innerHTML to throw an error
        Object.defineProperty(mockElement, 'innerHTML', {
          set: () => { throw new Error('InnerHTML failed'); }
        });

        UIUtils.safeInnerHTML(mockElement, '<p>Test content</p>');
        expect(mockElement.innerHTML).toContain('❌ Update failed');
      });
    });

    describe('safeTextContent', () => {
      it('should update textContent safely', () => {
        UIUtils.safeTextContent(mockElement, 'Test content');
        expect(mockElement.textContent).toBe('Test content');
      });

      it('should handle textContent errors gracefully', () => {
        // Mock textContent to throw an error
        Object.defineProperty(mockElement, 'textContent', {
          set: () => { throw new Error('TextContent failed'); }
        });

        UIUtils.safeTextContent(mockElement, 'Test content');
        expect(mockElement.textContent).toContain('❌ Update failed');
      });
    });

    describe('safeClassName', () => {
      it('should update className safely', () => {
        UIUtils.safeClassName(mockElement, 'test-class');
        expect(mockElement.className).toBe('test-class');
      });

      it('should handle className errors gracefully', () => {
        // Mock className to throw an error
        Object.defineProperty(mockElement, 'className', {
          set: () => { throw new Error('ClassName failed'); }
        });

        UIUtils.safeClassName(mockElement, 'test-class');
        // Should not throw, just log error
        expect(mockElement.className).toBe('');
      });
    });

    describe('updateElement', () => {
      it('should update element with multiple properties', () => {
        UIUtils.updateElement(mockElement, {
          innerHTML: '<p>Test</p>',
          textContent: 'Test content',
          className: 'test-class',
          style: { color: 'red' }
        });

        expect(mockElement.innerHTML).toBe('<p>Test</p>');
        expect(mockElement.textContent).toBe('Test content');
        expect(mockElement.className).toBe('test-class');
        expect(mockElement.style.color).toBe('red');
      });

      it('should handle partial updates', () => {
        UIUtils.updateElement(mockElement, {
          innerHTML: '<p>Test</p>',
          className: 'test-class'
        });

        expect(mockElement.innerHTML).toBe('<p>Test</p>');
        expect(mockElement.className).toBe('test-class');
      });

      it('should handle update errors gracefully', () => {
        // Mock innerHTML to throw an error
        Object.defineProperty(mockElement, 'innerHTML', {
          set: () => { throw new Error('Update failed'); }
        });

        UIUtils.updateElement(mockElement, {
          innerHTML: '<p>Test</p>',
          className: 'test-class'
        });

        expect(mockElement.innerHTML).toContain('❌ Update failed');
        expect(mockElement.className).toBe('test-class');
      });
    });
  });

  describe('ResultUtils', () => {
    describe('formatResultHTML', () => {
      it('should format results as HTML', () => {
        const results = {
          'Test Value': 42,
          'Test String': 'hello',
          'Test Object': { key: 'value' }
        };

        const html = ResultUtils.formatResultHTML('Test Results', results);
        
        expect(html).toContain('<h4>Test Results</h4>');
        expect(html).toContain('<strong>Test Value:</strong> 42.000');
        expect(html).toContain('<strong>Test String:</strong> hello');
        expect(html).toContain('<strong>Test Object:</strong> {"key":"value"}');
        expect(html).toContain('✅ Operation completed successfully');
      });

      it('should handle empty results', () => {
        const html = ResultUtils.formatResultHTML('Empty Results', {});
        
        expect(html).toContain('<h4>Empty Results</h4>');
        expect(html).toContain('✅ Operation completed successfully');
      });

      it('should handle different value types', () => {
        const results = {
          'Number': 3.14159,
          'String': 'test',
          'Boolean': true,
          'Null': null,
          'Undefined': undefined
        };

        const html = ResultUtils.formatResultHTML('Mixed Types', results);
        
        expect(html).toContain('<strong>Number:</strong> 3.142');
        expect(html).toContain('<strong>String:</strong> test');
        expect(html).toContain('<strong>Boolean:</strong> true');
        expect(html).toContain('<strong>Null:</strong> null');
        expect(html).toContain('<strong>Undefined:</strong> undefined');
      });
    });

    describe('formatErrorHTML', () => {
      it('should format error as HTML', () => {
        const html = ResultUtils.formatErrorHTML('Test Operation', 'Something went wrong');
        
        expect(html).toContain('<h4>❌ Test Operation Failed</h4>');
        expect(html).toContain('<p>Error: Something went wrong</p>');
      });

      it('should handle error objects', () => {
        const error = new Error('Test error');
        const html = ResultUtils.formatErrorHTML('Test Operation', error);
        
        expect(html).toContain('<h4>❌ Test Operation Failed</h4>');
        expect(html).toContain('Error: Error: Test error');
      });
    });
  });

  describe('ConsciousnessUtils', () => {
    describe('simulateEvolution', () => {
      it('should simulate consciousness evolution', () => {
        const currentLevel = 0.5;
        const evolution = ConsciousnessUtils.simulateEvolution(currentLevel);
        
        expect(evolution).toHaveProperty('previousLevel');
        expect(evolution).toHaveProperty('evolution');
        expect(evolution).toHaveProperty('newLevel');
        
        expect(evolution.previousLevel).toBe(currentLevel);
        expect(typeof evolution.evolution).toBe('number');
        expect(typeof evolution.newLevel).toBe('number');
        expect(evolution.newLevel).toBeGreaterThanOrEqual(0);
        expect(evolution.newLevel).toBeLessThanOrEqual(1);
      });

      it('should handle zero consciousness level', () => {
        const evolution = ConsciousnessUtils.simulateEvolution(0);
        
        expect(evolution.previousLevel).toBe(0);
        expect(evolution.newLevel).toBeGreaterThanOrEqual(0);
        expect(evolution.newLevel).toBeLessThanOrEqual(1);
      });

      it('should handle maximum consciousness level', () => {
        const evolution = ConsciousnessUtils.simulateEvolution(1);
        
        expect(evolution.previousLevel).toBe(1);
        expect(evolution.newLevel).toBeGreaterThanOrEqual(0);
        expect(evolution.newLevel).toBeLessThanOrEqual(1);
      });

      it('should clamp evolution within valid range', () => {
        const evolution = ConsciousnessUtils.simulateEvolution(0.9);
        
        expect(evolution.newLevel).toBeGreaterThanOrEqual(0);
        expect(evolution.newLevel).toBeLessThanOrEqual(1);
      });
    });

    describe('formatEvolutionHTML', () => {
      it('should format evolution as HTML', () => {
        const evolution = {
          previousLevel: 0.5,
          evolution: 0.1,
          newLevel: 0.6
        };

        const html = ConsciousnessUtils.formatEvolutionHTML(evolution);
        
        expect(html).toContain('<h4>Consciousness Evolution</h4>');
        expect(html).toContain('<p>Previous Level: 0.500</p>');
        expect(html).toContain('<p>Evolution: 0.100</p>');
        expect(html).toContain('<p>New Level: 0.600</p>');
        expect(html).toContain('🧘‍♀️ Consciousness evolved</p>');
      });

      it('should handle negative evolution', () => {
        const evolution = {
          previousLevel: 0.5,
          evolution: -0.1,
          newLevel: 0.4
        };

        const html = ConsciousnessUtils.formatEvolutionHTML(evolution);
        
        expect(html).toContain('<p>Previous Level: 0.500</p>');
        expect(html).toContain('<p>Evolution: -0.100</p>');
        expect(html).toContain('<p>New Level: 0.400</p>');
      });

      it('should handle zero evolution', () => {
        const evolution = {
          previousLevel: 0.5,
          evolution: 0,
          newLevel: 0.5
        };

        const html = ConsciousnessUtils.formatEvolutionHTML(evolution);
        
        expect(html).toContain('<p>Previous Level: 0.500</p>');
        expect(html).toContain('<p>Evolution: 0.000</p>');
        expect(html).toContain('<p>New Level: 0.500</p>');
      });
    });
  });
}); 