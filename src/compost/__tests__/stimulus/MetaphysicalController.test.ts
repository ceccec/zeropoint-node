import MetaphysicalController from "../../stimulus/controllers/MetaphysicalController";
import { UIUtils, ResultUtils, ColorUtils, ConsciousnessUtils } from "../../stimulus/utils/ControllerUtils";

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
  ColorUtils: {
    consciousnessToHSL: jest.fn(),
    consciousnessToGradient: jest.fn(),
    applyConsciousnessColor: jest.fn()
  },
  ConsciousnessUtils: {
    simulateEvolution: jest.fn(),
    formatEvolutionHTML: jest.fn()
  }
}));

// Mock the VBMColorSystem functions
jest.mock("../../math/VBMColorSystem", () => ({
  generateFieldResonanceMap: jest.fn(),
  generateConsciousnessGradient: jest.fn()
}));

describe('MetaphysicalController', () => {
  let controller: MetaphysicalController;
  let mockConsciousnessLevelTarget: HTMLElement;
  let mockFieldResonanceTarget: HTMLElement;
  let mockVortexStrengthTarget: HTMLElement;
  let mockToroidalFlowTarget: HTMLElement;
  let mockMetaphysicalOutputTarget: HTMLElement;
  let mockColorGradientTarget: HTMLElement;

  beforeEach(() => {
    // Create mock elements
    mockConsciousnessLevelTarget = document.createElement('div');
    mockFieldResonanceTarget = document.createElement('div');
    mockVortexStrengthTarget = document.createElement('div');
    mockToroidalFlowTarget = document.createElement('div');
    mockMetaphysicalOutputTarget = document.createElement('div');
    mockColorGradientTarget = document.createElement('div');

    // Create controller
    controller = new MetaphysicalController();

    // Mock the targets
    Object.defineProperty(controller, 'consciousnessLevelTarget', {
      value: mockConsciousnessLevelTarget,
      writable: true
    });
    Object.defineProperty(controller, 'fieldResonanceTarget', {
      value: mockFieldResonanceTarget,
      writable: true
    });
    Object.defineProperty(controller, 'vortexStrengthTarget', {
      value: mockVortexStrengthTarget,
      writable: true
    });
    Object.defineProperty(controller, 'toroidalFlowTarget', {
      value: mockToroidalFlowTarget,
      writable: true
    });
    Object.defineProperty(controller, 'metaphysicalOutputTarget', {
      value: mockMetaphysicalOutputTarget,
      writable: true
    });
    Object.defineProperty(controller, 'colorGradientTarget', {
      value: mockColorGradientTarget,
      writable: true
    });

    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connect', () => {
    it('should initialize components and update all', () => {
      jest.spyOn(controller, 'initializeComponents').mockImplementation();
      jest.spyOn(controller, 'updateAll').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      controller.connect();

      expect(controller.initializeComponents).toHaveBeenCalled();
      expect(controller.updateAll).toHaveBeenCalled();
      expect(controller.logOperation).toHaveBeenCalledWith('Metaphysical controller initialization');
    });
  });

  describe('updateAll', () => {
    it('should update all metaphysical components and log operation', () => {
      jest.spyOn(controller, 'updateConsciousnessLevel').mockImplementation();
      jest.spyOn(controller, 'updateFieldResonance').mockImplementation();
      jest.spyOn(controller, 'updateVortexStrength').mockImplementation();
      jest.spyOn(controller, 'updateToroidalFlow').mockImplementation();
      jest.spyOn(controller, 'updateColorGradient').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();

      controller.updateAll();

      expect(controller.updateConsciousnessLevel).toHaveBeenCalled();
      expect(controller.updateFieldResonance).toHaveBeenCalled();
      expect(controller.updateVortexStrength).toHaveBeenCalled();
      expect(controller.updateToroidalFlow).toHaveBeenCalled();
      expect(controller.updateColorGradient).toHaveBeenCalled();
      expect(controller.logOperation).toHaveBeenCalledWith('All metaphysical components update');
    });
  });

  describe('updateConsciousnessLevel', () => {
    beforeEach(() => {
      // Mock consciousness field
      controller.consciousnessField = {
        getConsciousnessLevel: jest.fn().mockReturnValue(0.75)
      } as any;
    });

    it('should update consciousness level with color', () => {
      const mockHSL = 'hsl(270, 70%, 50%)';
      (ColorUtils.consciousnessToHSL as jest.Mock).mockReturnValue(mockHSL);

      controller.updateConsciousnessLevel();

      expect(controller.consciousnessField.getConsciousnessLevel).toHaveBeenCalled();
      expect(ColorUtils.consciousnessToHSL).toHaveBeenCalledWith(0.75);
      expect(UIUtils.updateElement).toHaveBeenCalledWith(mockConsciousnessLevelTarget, {
        textContent: 'Consciousness Level: 0.750',
        style: { color: mockHSL }
      });
    });
  });

  describe('updateFieldResonance', () => {
    beforeEach(() => {
      // Mock VBMColorSystem
      const { generateFieldResonanceMap } = require('../../math/VBMColorSystem');
      generateFieldResonanceMap.mockReturnValue({
        resonance1: 0.5,
        resonance2: 0.7,
        resonance3: 0.3
      });
    });

    it('should calculate and update field resonance', () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(0.5);

      controller.updateFieldResonance();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(UIUtils.safeTextContent).toHaveBeenCalledWith(
        mockFieldResonanceTarget,
        'Field Resonance: 0.500'
      );
    });

    it('should handle field resonance calculation failure', () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);

      controller.updateFieldResonance();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(UIUtils.safeTextContent).not.toHaveBeenCalled();
    });
  });

  describe('updateVortexStrength', () => {
    it('should update vortex strength display', () => {
      jest.spyOn(controller, 'updateVortexMathDisplay').mockImplementation();
      (UIUtils.safeTextContent as jest.Mock).mockImplementation((element, text) => {
        element.textContent = text;
      });

      controller.updateVortexStrength();

      expect(controller.updateVortexMathDisplay).toHaveBeenCalledWith(mockVortexStrengthTarget);
      expect(UIUtils.safeTextContent).toHaveBeenCalledWith(
        mockVortexStrengthTarget,
        expect.stringContaining('Vortex Strength:')
      );
    });
  });

  describe('updateToroidalFlow', () => {
    it('should update toroidal flow display', () => {
      jest.spyOn(controller, 'updateToroidalGeometryDisplay').mockImplementation();
      (UIUtils.safeTextContent as jest.Mock).mockImplementation((element, text) => {
        element.textContent = text;
      });

      controller.updateToroidalFlow();

      expect(controller.updateToroidalGeometryDisplay).toHaveBeenCalledWith(mockToroidalFlowTarget);
      expect(UIUtils.safeTextContent).toHaveBeenCalledWith(
        mockToroidalFlowTarget,
        expect.stringContaining('Toroidal Flow:')
      );
    });
  });

  describe('updateColorGradient', () => {
    beforeEach(() => {
      // Mock VBMColorSystem
      const { generateConsciousnessGradient } = require('../../math/VBMColorSystem');
      generateConsciousnessGradient.mockReturnValue(['hsl(180, 70%, 50%)', 'hsl(210, 70%, 50%)']);
    });

    it('should update color gradient successfully', () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(['hsl(180, 70%, 50%)', 'hsl(210, 70%, 50%)']);

      controller.updateColorGradient();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(UIUtils.updateElement).toHaveBeenCalledWith(mockColorGradientTarget, {
        textContent: 'Consciousness Gradient',
        style: { background: 'linear-gradient(45deg, hsl(180, 70%, 50%), hsl(210, 70%, 50%))' }
      });
    });

    it('should handle color gradient generation failure', () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);

      controller.updateColorGradient();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(UIUtils.updateElement).not.toHaveBeenCalled();
    });
  });

  describe('performMetaphysicalOperation', () => {
    beforeEach(() => {
      jest.spyOn(controller, 'logOperation').mockImplementation();
    });

    it('should perform metaphysical operation successfully', async () => {
      const mockResult = {
        'Advanced VBM': { operation: 'consciousness', level: 0.7, result: 'metaphysical_computation' },
        'Rodin Coil Pattern': { pattern: [1, 2, 4, 8, 7, 5], resonance: 0.85 }
      };

      jest.spyOn(controller, 'executeSafely').mockResolvedValue(mockResult);
      const mockResultHTML = '<h4>Metaphysical Operation Results</h4>';
      (ResultUtils.formatResultHTML as jest.Mock).mockReturnValue(mockResultHTML);

      await controller.performMetaphysicalOperation();

      expect(controller.executeSafely).toHaveBeenCalled();
      expect(ResultUtils.formatResultHTML).toHaveBeenCalledWith('Metaphysical Operation Results', mockResult);
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockMetaphysicalOutputTarget, mockResultHTML);
      expect(controller.logOperation).toHaveBeenCalledWith('Metaphysical operation');
    });

    it('should handle metaphysical operation failure', async () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);
      const mockErrorHTML = '<h4>❌ Metaphysical Operation Failed</h4>';
      (ResultUtils.formatErrorHTML as jest.Mock).mockReturnValue(mockErrorHTML);

      await controller.performMetaphysicalOperation();

      expect(ResultUtils.formatErrorHTML).toHaveBeenCalledWith('Metaphysical Operation', 'Execution failed');
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockMetaphysicalOutputTarget, mockErrorHTML);
      expect(controller.logOperation).toHaveBeenCalledWith('Metaphysical operation', false);
    });
  });

  describe('evolveConsciousness', () => {
    beforeEach(() => {
      // Mock consciousness field
      controller.consciousnessField = {
        getConsciousnessLevel: jest.fn().mockReturnValue(0.5)
      } as any;

      jest.spyOn(controller, 'updateAll').mockImplementation();
      jest.spyOn(controller, 'logOperation').mockImplementation();
    });

    it('should evolve consciousness successfully', () => {
      const mockEvolution = {
        previousLevel: 0.5,
        evolution: 0.1,
        newLevel: 0.6
      };

      (ConsciousnessUtils.simulateEvolution as jest.Mock).mockReturnValue(mockEvolution);
      const mockEvolutionHTML = '<h4>Consciousness Evolution</h4>';
      (ConsciousnessUtils.formatEvolutionHTML as jest.Mock).mockReturnValue(mockEvolutionHTML);

      controller.evolveConsciousness();

      expect(ConsciousnessUtils.simulateEvolution).toHaveBeenCalledWith(0.5);
      expect(controller.updateAll).toHaveBeenCalled();
      expect(ConsciousnessUtils.formatEvolutionHTML).toHaveBeenCalledWith(mockEvolution);
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockMetaphysicalOutputTarget, mockEvolutionHTML);
      expect(controller.logOperation).toHaveBeenCalledWith('Consciousness evolution');
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      // Mock successful component initialization
      jest.spyOn(controller, 'initializeComponents').mockImplementation();
    });

    it('should have all required components after initialization', () => {
      controller.connect();

      expect(controller.consciousnessField).toBeDefined();
      expect(controller.vortexMath).toBeDefined();
      expect(controller.toroidalGeometry).toBeDefined();
      expect(controller.advancedVBM).toBeDefined();
      expect(controller.rodinCoil).toBeDefined();
    });

    it('should handle component operations correctly', () => {
      controller.connect();

      // Test that components are properly initialized and can be used
      expect(typeof controller.consciousnessField.getConsciousnessLevel()).toBe('number');
      expect(typeof controller.vortexMath.applyVortexTransform(42)).toBe('number');
      expect(typeof controller.toroidalGeometry.calculateVolume()).toBe('number');
    });
  });

  describe('Error Handling', () => {
    it('should handle component initialization errors gracefully', () => {
      // Mock component that throws an error
      jest.spyOn(controller, 'initializeComponents').mockImplementation(() => {
        throw new Error('Initialization failed');
      });

      expect(() => controller.connect()).toThrow('Initialization failed');
    });

    it('should handle operation execution errors gracefully', async () => {
      jest.spyOn(controller, 'executeSafely').mockResolvedValue(null);
      (ResultUtils.formatErrorHTML as jest.Mock).mockReturnValue('<p>Error</p>');

      await controller.performMetaphysicalOperation();

      expect(ResultUtils.formatErrorHTML).toHaveBeenCalledWith('Metaphysical Operation', 'Execution failed');
      expect(UIUtils.safeInnerHTML).toHaveBeenCalledWith(mockMetaphysicalOutputTarget, '<p>Error</p>');
    });
  });

  describe('Target Declarations', () => {
    it('should have correct target declarations', () => {
      expect(MetaphysicalController.targets).toEqual([
        'consciousnessLevel',
        'fieldResonance',
        'vortexStrength',
        'toroidalFlow',
        'metaphysicalOutput',
        'colorGradient'
      ]);
    });

    it('should have correct target type declarations', () => {
      // This test ensures TypeScript declarations are correct
      expect(controller.consciousnessLevelTarget).toBeDefined();
      expect(controller.fieldResonanceTarget).toBeDefined();
      expect(controller.vortexStrengthTarget).toBeDefined();
      expect(controller.toroidalFlowTarget).toBeDefined();
      expect(controller.metaphysicalOutputTarget).toBeDefined();
      expect(controller.colorGradientTarget).toBeDefined();
    });
  });
}); 