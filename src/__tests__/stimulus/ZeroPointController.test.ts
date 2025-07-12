import ZeroPointController from "../../stimulus/controllers/ZeroPointController";
import { UIUtils, ResultUtils } from "../../stimulus/utils/ControllerUtils";

// Mock the utilities to avoid DOM dependencies in tests
jest.mock("../../stimulus/utils/ControllerUtils", () => ({
  UIUtils: {
    safeInnerHTML: jest.fn(),
    safeTextContent: jest.fn(),
    safeClassName: jest.fn(),
    updateElement: jest.fn()
  },
  ResultUtils: {
    formatResultHTML: jest.fn(),
    formatErrorHTML: jest.fn()
  },
  MathUtils: {
    formatNumber: jest.fn()
  }
}));

describe('ZeroPointController', () => {
  let controller: ZeroPointController;
  let mockStatusTarget: HTMLElement;
  let mockInsightsTarget: HTMLElement;
  let mockDemoOutputTarget: HTMLElement;
  let mockConsciousnessTarget: HTMLElement;
  let mockVortexMathTarget: HTMLElement;
  let mockToroidalGeometryTarget: HTMLElement;

  beforeEach(() => {
    // Create mock elements
    mockStatusTarget = document.createElement('div');
    mockInsightsTarget = document.createElement('div');
    mockDemoOutputTarget = document.createElement('div');
    mockConsciousnessTarget = document.createElement('div');
    mockVortexMathTarget = document.createElement('div');
    mockToroidalGeometryTarget = document.createElement('div');

    // Create controller
    controller = new ZeroPointController();

    // Mock the targets
    Object.defineProperty(controller, 'statusTarget', {
      value: mockStatusTarget,
      writable: true
    });
    Object.defineProperty(controller, 'insightsTarget', {
      value: mockInsightsTarget,
      writable: true
    });
    Object.defineProperty(controller, 'demoOutputTarget', {
      value: mockDemoOutputTarget,
      writable: true
    });
    Object.defineProperty(controller, 'consciousnessTarget', {
      value: mockConsciousnessTarget,
      writable: true
    });
    Object.defineProperty(controller, 'vortexMathTarget', {
      value: mockVortexMathTarget,
      writable: true
    });
    Object.defineProperty(controller, 'toroidalGeometryTarget', {
      value: mockToroidalGeometryTarget,
      writable: true
    });

    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connect', () => {
    it('should initialize successfully', async () => {
      // Mock successful initialization
      jest.spyOn(controller, 'initializeComponentsSafely').mockResolvedValue(true);
      jest.spyOn(controller, 'updateStatus').mockImplementation();
      jest.spyOn(controller, 'loadInsights').mockImplementation();
      jest.spyOn(controller, 'initializeDemo').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      await controller.connect();

      expect(controller.initializeComponentsSafely).toHaveBeenCalled();
      expect(controller.updateStatus).toHaveBeenCalledWith(
        mockStatusTarget,
        '✅ ZeroPoint Ready',
        'status ready'
      );
      expect(controller.loadInsights).toHaveBeenCalled();
      expect(controller.initializeDemo).toHaveBeenCalled();
      expect(controller.logOperation).toHaveBeenCalledWith('ZeroPoint initialization');
    });

    it('should handle initialization failure', async () => {
      // Mock failed initialization
      jest.spyOn(controller, 'initializeComponentsSafely').mockResolvedValue(false);
      jest.spyOn(controller, 'updateStatus').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      await controller.connect();

      expect(controller.updateStatus).toHaveBeenCalledWith(
        mockStatusTarget,
        '❌ Initialization Failed',
        'status error'
      );
      expect(controller.logOperation).toHaveBeenCalledWith('ZeroPoint initialization', false);
    });
  });

  describe('loadInsights', () => {
    it('should generate and format insights', () => {
      const mockInsights = {
        version: '1.0.0',
        environment: 'browser',
        features: ['Test Feature'],
        browser: { userAgent: 'Test Browser' },
        consciousness: { level: 0.5, field: 0.7 }
      };

      const mockHTML = '<h3>Test Insights</h3>';

      jest.spyOn(controller, 'generateInsights').mockReturnValue(mockInsights);
      jest.spyOn(controller, 'formatInsightsHTML').mockReturnValue(mockHTML);

      controller.loadInsights();

      expect(controller.generateInsights).toHaveBeenCalled();
      expect(controller.formatInsightsHTML).toHaveBeenCalledWith(mockInsights);
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockInsightsTarget, mockHTML);
    });
  });

  describe('initializeDemo', () => {
    it('should log demo initialization', () => {
      jest.spyOn(controller, 'logOperation').mockImplementation();

      controller.initializeDemo();

      expect(controller.logOperation).toHaveBeenCalledWith('Demo components initialization');
    });
  });

  describe('runMathDemo', () => {
    beforeEach(() => {
      // Mock successful execution
      jest.spyOn(controller, 'executeSafely').mockResolvedValue({
        'Vortex Math': 42.123,
        'Toroidal Geometry': 3.141,
        'Consciousness Level': 0.75
      });
      jest.spyOn(controller, 'logOperation').mockImplementation();
    });

    it('should execute math demo successfully', async () => {
      const mockResultHTML = '<h4>Math Demo Results</h4>';
      (ResultUtils.formatResultHTML as jest.Mock).mockReturnValue(mockResultHTML);

      await controller.runMathDemo();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(ResultUtils.formatResultHTML).toHaveBeenCalledWith('Math Demo Results', {
        'Vortex Math': 42.123,
        'Toroidal Geometry': 3.141,
        'Consciousness Level': 0.75
      });
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockDemoOutputTarget, mockResultHTML);
      expect(controller.logOperation).toHaveBeenCalledWith('Math demo');
    });

    it('should handle math demo failure', async () => {
      // Mock failed execution
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);
      const mockErrorHTML = '<h4>❌ Math Demo Failed</h4>';
      (ResultUtils.formatErrorHTML as jest.Mock).mockReturnValue(mockErrorHTML);

      await controller.runMathDemo();

      expect(ResultUtils.formatErrorHTML).toHaveBeenCalledWith('Math Demo', 'Execution failed');
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockDemoOutputTarget, mockErrorHTML);
      expect(controller.logOperation).toHaveBeenCalledWith('Math demo', false);
    });
  });

  describe('updateConsciousness', () => {
    it('should update consciousness display', () => {
      jest.spyOn(controller, 'updateConsciousnessDisplay').mockImplementation();

      controller.updateConsciousness();

      expect(controller.updateConsciousnessDisplay).toHaveBeenCalledWith(mockConsciousnessTarget);
    });
  });

  describe('updateVortexMath', () => {
    it('should update vortex math display', () => {
      jest.spyOn(controller, 'updateVortexMathDisplay').mockImplementation();

      controller.updateVortexMath();

      expect(controller.updateVortexMathDisplay).toHaveBeenCalledWith(mockVortexMathTarget);
    });
  });

  describe('updateToroidalGeometry', () => {
    it('should update toroidal geometry display', () => {
      jest.spyOn(controller, 'updateToroidalGeometryDisplay').mockImplementation();

      controller.updateToroidalGeometry();

      expect(controller.updateToroidalGeometryDisplay).toHaveBeenCalledWith(mockToroidalGeometryTarget);
    });
  });

  describe('refreshAll', () => {
    it('should update all components and log operation', () => {
      jest.spyOn(controller, 'updateConsciousness').mockImplementation();
      jest.spyOn(controller, 'updateVortexMath').mockImplementation();
      jest.spyOn(controller, 'updateToroidalGeometry').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      controller.refreshAll();

      expect(controller.updateConsciousness).toHaveBeenCalled();
      expect(controller.updateVortexMath).toHaveBeenCalled();
      expect(controller.updateToroidalGeometry).toHaveBeenCalled();
      expect(controller.logOperation).toHaveBeenCalledWith('All components refresh');
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      // Mock successful component initialization
      jest.spyOn(controller, 'initializeComponentsSafely').mockResolvedValue(true);
    });

    it('should have all required components after initialization', async () => {
      await controller.connect();

      expect(controller.consciousnessField).toBeDefined();
      expect(controller.vortexMath).toBeDefined();
      expect(controller.toroidalGeometry).toBeDefined();
      expect(controller.advancedVBM).toBeDefined();
      expect(controller.rodinCoil).toBeDefined();
    });

    it('should handle component operations correctly', async () => {
      await controller.connect();

      // Test that components are properly initialized and can be used
      expect(typeof controller.consciousnessField.getConsciousnessLevel()).toBe('number');
      expect(typeof controller.vortexMath.applyVortexTransform(42)).toBe('number');
      expect(typeof controller.toroidalGeometry.calculateVolume()).toBe('number');
    });
  });

  describe('Error Handling', () => {
    it('should handle component initialization errors gracefully', async () => {
      // Mock component that throws an error
      jest.spyOn(controller, 'initializeComponentsSafely').mockResolvedValue(false);
      jest.spyOn(controller, 'updateStatus').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      await controller.connect();

      expect(controller.updateStatus).toHaveBeenCalledWith(
        mockStatusTarget,
        '❌ Initialization Failed',
        'status error'
      );
      expect(controller.logOperation).toHaveBeenCalledWith('ZeroPoint initialization', false);
    });

    it('should handle demo execution errors gracefully', async () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);
      (ResultUtils.formatErrorHTML as jest.Mock).mockReturnValue('<p>Error</p>');

      await controller.runMathDemo();

      expect(ResultUtils.formatErrorHTML).toHaveBeenCalledWith('Math Demo', 'Execution failed');
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockDemoOutputTarget, '<p>Error</p>');
    });
  });

  describe('Target Declarations', () => {
    it('should have correct target declarations', () => {
      expect(ZeroPointController.targets).toEqual([
        'status',
        'insights',
        'mathDemo',
        'consciousness',
        'vortexMath',
        'toroidalGeometry',
        'demoOutput'
      ]);
    });

    it('should have correct target type declarations', () => {
      // This test ensures TypeScript declarations are correct
      expect(controller.statusTarget).toBeDefined();
      expect(controller.insightsTarget).toBeDefined();
      expect(controller.demoOutputTarget).toBeDefined();
      expect(controller.consciousnessTarget).toBeDefined();
      expect(controller.vortexMathTarget).toBeDefined();
      expect(controller.toroidalGeometryTarget).toBeDefined();
    });
  });
}); 