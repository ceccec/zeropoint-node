import BaseController from "../../stimulus/base/BaseController";
import { ConsciousnessField } from "../../consciousness/ConsciousnessField";
import { VortexMath } from "../../math/VortexMath";
import { ToroidalGeometry } from "../../math/ToroidalGeometry";
import { AdvancedVBM } from "../../math/AdvancedVBM";
import { RodinCoil } from "../../math/RodinCoil";

/**
 * Test BaseController
 * 
 * Tests the shared functionality provided by BaseController
 */
class TestController extends BaseController {
  static targets = ["test"];

  declare readonly testTarget: HTMLElement;

  // Expose protected methods for testing
  public testInitializeComponents(): void {
    this.initializeComponents();
  }

  public testExecuteSafely<T>(operation: () => T, errorMessage?: string): Promise<T | null> {
    return this.executeSafely(operation, errorMessage);
  }

  public testUpdateTargetSafely(target: HTMLElement, content: string, className?: string): void {
    this.updateTargetSafely(target, content, className);
  }

  public testGenerateInsights(): Record<string, any> {
    return this.generateInsights();
  }

  public testFormatInsightsHTML(insights: Record<string, any>): string {
    return this.formatInsightsHTML(insights);
  }

  public testUpdateStatus(target: HTMLElement, message: string, className: string): void {
    this.updateStatus(target, message, className);
  }

  public testLogOperation(operation: string, success: boolean = true): void {
    this.logOperation(operation, success);
  }
}

describe('BaseController', () => {
  let controller: TestController;
  let mockElement: HTMLElement;

  beforeEach(() => {
    controller = new TestController();
    mockElement = document.createElement('div');
  });

  describe('Component Initialization', () => {
    it('should initialize all components correctly', () => {
      controller.testInitializeComponents();

      expect(controller.consciousnessField).toBeInstanceOf(ConsciousnessField);
      expect(controller.vortexMath).toBeInstanceOf(VortexMath);
      expect(controller.toroidalGeometry).toBeInstanceOf(ToroidalGeometry);
      expect(controller.advancedVBM).toBeInstanceOf(AdvancedVBM);
      expect(controller.rodinCoil).toBeInstanceOf(RodinCoil);
    });

    it('should initialize components safely with success', async () => {
      const result = await controller.initializeComponentsSafely();
      expect(result).toBe(true);
    });

    it('should handle initialization errors gracefully', async () => {
      // Mock a component that throws an error
      jest.spyOn(controller, 'initializeComponents').mockImplementation(() => {
        throw new Error('Initialization failed');
      });

      const result = await controller.initializeComponentsSafely();
      expect(result).toBe(false);
    });
  });

  describe('Display Updates', () => {
    beforeEach(() => {
      controller.testInitializeComponents();
    });

    it('should update consciousness display correctly', () => {
      controller.updateConsciousnessDisplay(mockElement);
      
      expect(mockElement.textContent).toMatch(/Consciousness: \d+\.\d{3}/);
    });

    it('should update consciousness display with custom level', () => {
      controller.updateConsciousnessDisplay(mockElement, 0.75);
      
      expect(mockElement.textContent).toBe('Consciousness: 0.750');
    });

    it('should update vortex math display correctly', () => {
      controller.updateVortexMathDisplay(mockElement);
      
      expect(mockElement.textContent).toMatch(/Vortex Result: \d+\.\d{3}/);
    });

    it('should update vortex math display with custom input', () => {
      controller.updateVortexMathDisplay(mockElement, 42);
      
      expect(mockElement.textContent).toMatch(/Vortex Result: \d+\.\d{3}/);
    });

    it('should update toroidal geometry display correctly', () => {
      controller.updateToroidalGeometryDisplay(mockElement);
      
      expect(mockElement.textContent).toMatch(/Toroidal Volume: \d+\.\d{3}/);
    });
  });

  describe('Safe Operations', () => {
    it('should execute operations safely with success', async () => {
      const operation = () => 42;
      const result = await controller.testExecuteSafely(operation, 'Test operation');
      
      expect(result).toBe(42);
    });

    it('should handle operation errors gracefully', async () => {
      const operation = () => {
        throw new Error('Operation failed');
      };
      
      const result = await controller.testExecuteSafely(operation, 'Test operation');
      
      expect(result).toBeNull();
    });

    it('should use default error message when none provided', async () => {
      const operation = () => {
        throw new Error('Operation failed');
      };
      
      const result = await controller.testExecuteSafely(operation);
      
      expect(result).toBeNull();
    });
  });

  describe('Target Updates', () => {
    it('should update target safely with content', () => {
      controller.testUpdateTargetSafely(mockElement, '<p>Test content</p>');
      
      expect(mockElement.innerHTML).toBe('<p>Test content</p>');
    });

    it('should update target safely with content and className', () => {
      controller.testUpdateTargetSafely(mockElement, '<p>Test content</p>', 'test-class');
      
      expect(mockElement.innerHTML).toBe('<p>Test content</p>');
      expect(mockElement.className).toBe('test-class');
    });

    it('should handle target update errors gracefully', () => {
      // Mock innerHTML to throw an error
      Object.defineProperty(mockElement, 'innerHTML', {
        set: () => { throw new Error('Update failed'); }
      });

      controller.testUpdateTargetSafely(mockElement, '<p>Test content</p>');
      
      expect(mockElement.innerHTML).toContain('❌ Update failed');
    });
  });

  describe('Insights Generation', () => {
    beforeEach(() => {
      controller.testInitializeComponents();
    });

    it('should generate insights with correct structure', () => {
      const insights = controller.testGenerateInsights();
      
      expect(insights).toHaveProperty('version');
      expect(insights).toHaveProperty('environment');
      expect(insights).toHaveProperty('features');
      expect(insights).toHaveProperty('browser');
      expect(insights).toHaveProperty('consciousness');
      
      expect(insights.version).toBe('1.0.0');
      expect(insights.environment).toBe('browser');
      expect(Array.isArray(insights.features)).toBe(true);
      expect(typeof insights.browser.userAgent).toBe('string');
      expect(typeof insights.consciousness.level).toBe('number');
      expect(typeof insights.consciousness.field).toBe('number');
    });

    it('should format insights as HTML correctly', () => {
      const insights = controller.testGenerateInsights();
      const html = controller.testFormatInsightsHTML(insights);
      
      expect(html).toContain('<h3>ZeroPoint Insights</h3>');
      expect(html).toContain(`<strong>Version:</strong> ${insights.version}`);
      expect(html).toContain(`<strong>Environment:</strong> ${insights.environment}`);
      expect(html).toContain(`<strong>Features:</strong> ${insights.features.join(", ")}`);
      expect(html).toContain(`<strong>Browser:</strong> ${insights.browser.userAgent}`);
      expect(html).toContain(`<strong>Consciousness Level:</strong> ${insights.consciousness.level.toFixed(3)}`);
      expect(html).toContain(`<strong>Field Strength:</strong> ${insights.consciousness.field.toFixed(3)}`);
    });
  });

  describe('Status Updates', () => {
    it('should update status correctly', () => {
      controller.testUpdateStatus(mockElement, '✅ Ready', 'status ready');
      
      expect(mockElement.innerHTML).toBe('✅ Ready');
      expect(mockElement.className).toBe('status ready');
    });

    it('should handle status update errors gracefully', () => {
      // Mock innerHTML to throw an error
      Object.defineProperty(mockElement, 'innerHTML', {
        set: () => { throw new Error('Status update failed'); }
      });

      controller.testUpdateStatus(mockElement, '✅ Ready', 'status ready');
      
      expect(mockElement.innerHTML).toContain('❌ Update failed');
    });
  });

  describe('Logging', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log successful operations', () => {
      controller.testLogOperation('Test operation', true);
      
      expect(consoleSpy).toHaveBeenCalledWith('✅ Test operation completed');
    });

    it('should log failed operations', () => {
      controller.testLogOperation('Test operation', false);
      
      expect(consoleSpy).toHaveBeenCalledWith('❌ Test operation failed');
    });
  });
}); 