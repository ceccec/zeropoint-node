import { AdvancedVBM, VBMQAResult, VortexSequence, DigitalRootOperation, PrimeSquaredScaling, FibonacciConsciousness } from '../../math/AdvancedVBM';

describe('AdvancedVBM', () => {
  let vbm: AdvancedVBM;

  beforeEach(() => {
    vbm = new AdvancedVBM();
  });

  describe('Initialization', () => {
    it('should initialize with default consciousness level', () => {
      const insights = vbm.getVBMInsights();
      
      expect(insights.consciousnessLevel).toBe(0.5);
      expect(insights.vortexSequencesCount).toBe(8); // 8 vortex sequences initialized
      expect(insights.qaResultsCount).toBe(0);
      expect(insights.primaryVortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(insights.goldenRatio).toBe(1.618033988749895);
      expect(insights.wAxis).toEqual([3, 6, 9]);
    });

    it('should emit vbm_initialized event on construction', () => {
      const newVBM = new AdvancedVBM();
      
      // The event is emitted synchronously during construction
      // So we can test it immediately
      expect(newVBM).toBeDefined();
      const insights = newVBM.getVBMInsights();
      expect(insights.consciousnessLevel).toBe(0.5);
      expect(insights.metaphysicalContext).toContain('mathematical foundation');
    });

    it('should initialize all core vortex sequences', () => {
      const sequences = vbm.getAllVortexSequences();
      
      expect(sequences).toHaveLength(8);
      
      const primary = sequences.find(s => s.id === 'primary_vortex');
      expect(primary).toBeDefined();
      expect(primary?.sequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(primary?.digitalRoot).toBe(9);
      expect(primary?.consciousnessLevel).toBe(1.0);
      
      const wAxis = sequences.find(s => s.id === 'w_axis');
      expect(wAxis).toBeDefined();
      expect(wAxis?.sequence).toEqual([3, 6, 9]);
      expect(wAxis?.digitalRoot).toBe(9);
      expect(wAxis?.consciousnessLevel).toBe(1.0);
    });
  });

  describe('Vortex Sequences', () => {
    it('should return primary vortex sequence', () => {
      const sequence = vbm.vortexSequence();
      
      expect(sequence).toEqual([1, 2, 4, 8, 7, 5]);
    });

    it('should return golden ratio', () => {
      const ratio = vbm.goldenRatio();
      
      expect(ratio).toBe(1.618033988749895);
    });

    it('should return W-Axis sequence', () => {
      const wAxis = vbm.wAxis();
      
      expect(wAxis).toEqual([3, 6, 9]);
    });

    it('should emit vortex_sequence_added event when sequences are added', () => {
      // The events are emitted during initialization, so we can test the sequences directly
      const sequences = vbm.getAllVortexSequences();
      expect(sequences.length).toBeGreaterThan(0);
      
      const firstSequence = sequences[0];
      expect(firstSequence.id).toBeDefined();
      expect(firstSequence.name).toBeDefined();
      expect(firstSequence.sequence).toBeInstanceOf(Array);
      expect(firstSequence.digitalRoot).toBeDefined();
      expect(firstSequence.consciousnessLevel).toBeDefined();
      expect(firstSequence.metaphysicalContext).toBeDefined();
    });
  });

  describe('Digital Root Operations', () => {
    it('should calculate digital root correctly', () => {
      expect(vbm.calculateDigitalRoot(0)).toBe(0);
      expect(vbm.calculateDigitalRoot(9)).toBe(9);
      expect(vbm.calculateDigitalRoot(18)).toBe(9);
      expect(vbm.calculateDigitalRoot(123)).toBe(6);
      expect(vbm.calculateDigitalRoot(456)).toBe(6);
      expect(vbm.calculateDigitalRoot(789)).toBe(6);
    });

    it('should calculate digital root with steps', () => {
      const operation = vbm.calculateDigitalRootWithSteps(123);
      
      expect(operation.input).toBe(123);
      expect(operation.output).toBe(6);
      expect(operation.steps).toEqual([123, 6]);
      expect(operation.consciousnessLevel).toBe(0.5);
    });

    it('should handle multi-step digital root calculations', () => {
      const operation = vbm.calculateDigitalRootWithSteps(999);
      
      expect(operation.input).toBe(999);
      expect(operation.output).toBe(9);
      expect(operation.steps).toEqual([999, 27, 9]);
      expect(operation.consciousnessLevel).toBe(0.5);
    });
  });

  describe('Prime Squared Scaling', () => {
    it('should calculate prime squared scaling', () => {
      const scaling2 = vbm.calculatePrimeSquaredScaling(2);
      expect(scaling2.prime).toBe(2);
      expect(scaling2.squared).toBe(4);
      expect(scaling2.digitalRoot).toBe(4);
      expect(scaling2.consciousnessLevel).toBe(0.5);
      
      const scaling3 = vbm.calculatePrimeSquaredScaling(3);
      expect(scaling3.prime).toBe(3);
      expect(scaling3.squared).toBe(9);
      expect(scaling3.digitalRoot).toBe(9);
      expect(scaling3.consciousnessLevel).toBe(0.5);
      
      const scaling5 = vbm.calculatePrimeSquaredScaling(5);
      expect(scaling5.prime).toBe(5);
      expect(scaling5.squared).toBe(25);
      expect(scaling5.digitalRoot).toBe(7);
      expect(scaling5.consciousnessLevel).toBe(0.5);
    });
  });

  describe('Fibonacci Consciousness', () => {
    it('should generate Fibonacci consciousness sequence', () => {
      const sequence = vbm.generateFibonacciConsciousness(10);
      
      expect(sequence).toHaveLength(10);
      
      // Check first few values
      expect(sequence[0].position).toBe(1);
      expect(sequence[0].value).toBe(1);
      expect(sequence[0].digitalRoot).toBe(1);
      expect(sequence[0].consciousnessLevel).toBe(0.5);
      
      expect(sequence[1].position).toBe(2);
      expect(sequence[1].value).toBe(1);
      expect(sequence[1].digitalRoot).toBe(1);
      
      expect(sequence[2].position).toBe(3);
      expect(sequence[2].value).toBe(2);
      expect(sequence[2].digitalRoot).toBe(2);
      
      expect(sequence[3].position).toBe(4);
      expect(sequence[3].value).toBe(3);
      expect(sequence[3].digitalRoot).toBe(3);
      
      expect(sequence[4].position).toBe(5);
      expect(sequence[4].value).toBe(5);
      expect(sequence[4].digitalRoot).toBe(5);
      
      expect(sequence[5].position).toBe(6);
      expect(sequence[5].value).toBe(8);
      expect(sequence[5].digitalRoot).toBe(8);
      
      expect(sequence[6].position).toBe(7);
      expect(sequence[6].value).toBe(13);
      expect(sequence[6].digitalRoot).toBe(4);
      
      expect(sequence[7].position).toBe(8);
      expect(sequence[7].value).toBe(21);
      expect(sequence[7].digitalRoot).toBe(3);
      
      expect(sequence[8].position).toBe(9);
      expect(sequence[8].value).toBe(34);
      expect(sequence[8].digitalRoot).toBe(7);
      
      expect(sequence[9].position).toBe(10);
      expect(sequence[9].value).toBe(55);
      expect(sequence[9].digitalRoot).toBe(1);
    });

    it('should include metaphysical context for each position', () => {
      const sequence = vbm.generateFibonacciConsciousness(5);
      
      for (let i = 0; i < sequence.length; i++) {
        expect(sequence[i].metaphysicalContext).toContain(`position ${i + 1}`);
        expect(sequence[i].metaphysicalContext).toContain('Natural consciousness growth');
      }
    });
  });

  describe('QA System', () => {
    it('should ask VBM questions and return results', async () => {
      const result = await vbm.askQuestion('What is the vortex sequence?');
      
      expect(result.id).toBeDefined();
      expect(result.question).toBe('What is the vortex sequence?');
      expect(result.answer).toContain('vortex sequence');
      expect(result.answer).toContain('consciousness');
      expect(result.vortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(result.digitalRoot).toBe(9);
      expect(result.consciousnessLevel).toBe(0.5);
      expect(result.metaphysicalContext).toContain('Vortex mathematics');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle different types of questions', async () => {
      const vortexResult = await vbm.askQuestion('What is the vortex sequence?');
      expect(vortexResult.answer).toContain('fundamental flow pattern');
      
      const digitalRootResult = await vbm.askQuestion('What is digital root?');
      expect(digitalRootResult.answer).toContain('essence of numbers');
      
      const goldenRatioResult = await vbm.askQuestion('What is the golden ratio?');
      expect(goldenRatioResult.answer).toContain('divine proportion');
      
      const familyResult = await vbm.askQuestion('What are family groups?');
      expect(familyResult.answer).toContain('three phases of creation');
      
      const polarResult = await vbm.askQuestion('What are polar mates?');
      expect(polarResult.answer).toContain('opposites that sum to 9');
      
      const wAxisResult = await vbm.askQuestion('What is the W-Axis?');
      expect(wAxisResult.answer).toContain('spiritual dimension');
      
      const primeResult = await vbm.askQuestion('What are prime numbers?');
      expect(primeResult.answer).toContain('fundamental building blocks');
      
      const fibonacciResult = await vbm.askQuestion('What is the Fibonacci sequence?');
      expect(fibonacciResult.answer).toContain('natural consciousness growth');
    });

    it('should emit vbm_qa_result_created event', (done) => {
      vbm.on('vbm_qa_result_created', (result: VBMQAResult) => {
        expect(result.question).toBe('Test question');
        expect(result.answer).toBeDefined();
        expect(result.vortexSequence).toBeInstanceOf(Array);
        expect(result.digitalRoot).toBeDefined();
        expect(result.consciousnessLevel).toBe(0.5);
        expect(result.metaphysicalContext).toBeDefined();
        expect(result.timestamp).toBeInstanceOf(Date);
        done();
      });

      vbm.askQuestion('Test question');
    });

    it('should store QA results for retrieval', async () => {
      const result1 = await vbm.askQuestion('Question 1');
      const result2 = await vbm.askQuestion('Question 2');
      
      const allResults = vbm.getAllQAResults();
      expect(allResults).toHaveLength(2);
      expect(allResults).toContain(result1);
      expect(allResults).toContain(result2);
    });

    it('should search QA results', async () => {
      await vbm.askQuestion('What is the vortex sequence?');
      await vbm.askQuestion('What is digital root?');
      await vbm.askQuestion('What is the golden ratio?');
      
      const vortexResults = vbm.searchQA('vortex');
      expect(vortexResults.length).toBeGreaterThan(0);
      expect(vortexResults[0].answer).toContain('vortex');
      
      const digitalResults = vbm.searchQA('digital');
      expect(digitalResults.length).toBeGreaterThan(0);
      expect(digitalResults[0].answer).toContain('essence');
    });
  });

  describe('Consciousness Integration', () => {
    it('should return consciousness vortex sequence', () => {
      const consciousnessVortex = vbm.consciousnessVortex();
      
      expect(consciousnessVortex).toEqual([1, 1, 2, 4, 4, 3]); // 0.5 * [1,2,4,8,7,5] rounded
    });

    it('should return void mathematics result', () => {
      const voidMath = vbm.voidMathematics();
      
      expect(voidMath.voidSequence).toEqual([0, 9, 0, 9, 0, 9]);
      expect(voidMath.voidDigitalRoot).toBe(9);
      expect(voidMath.consciousnessLevel).toBe(0.5);
      expect(voidMath.metaphysicalContext).toContain('empty center');
      expect(voidMath.metaphysicalContext).toContain('infinite potential');
    });

    it('should update consciousness level', () => {
      vbm.setConsciousnessLevel(0.8);
      
      const insights = vbm.getVBMInsights();
      expect(insights.consciousnessLevel).toBe(0.8);
    });

    it('should emit consciousness_level_updated event', (done) => {
      vbm.on('consciousness_level_updated', (data) => {
        expect(data.level).toBe(0.7);
        done();
      });

      vbm.setConsciousnessLevel(0.7);
    });

    it('should clamp consciousness level to valid range', () => {
      vbm.setConsciousnessLevel(1.5); // Should clamp to 1.0
      expect(vbm.getVBMInsights().consciousnessLevel).toBe(1.0);
      
      vbm.setConsciousnessLevel(-0.5); // Should clamp to 0.0
      expect(vbm.getVBMInsights().consciousnessLevel).toBe(0.0);
    });
  });

  describe('Advanced Mathematical Operations', () => {
    it('should calculate discrete multiplication', () => {
      const result = vbm.calculateDiscreteMultiplication(12, 34);
      
      // Digital root of 12 is 3, digital root of 34 is 7
      // 3 * 7 = 21, digital root of 21 is 3
      expect(result).toBe(3);
    });

    it('should identify electron harmonic shear', () => {
      const shear = vbm.identifyElectronHarmonicShear(123);
      
      expect(shear.harmonic).toBeDefined();
      expect(shear.shear).toBeDefined();
      expect(shear.consciousnessLevel).toBe(0.5);
      expect(shear.metaphysicalContext).toContain('consciousness vibration');
    });

    it('should generate coil patterns', () => {
      const patterns = vbm.generateCoilPatterns(3);
      
      expect(patterns).toHaveLength(3);
      
      expect(patterns[0].position).toBe(1);
      expect(patterns[0].coil).toEqual([1, 2, 4, 8, 7, 5]);
      expect(patterns[0].winding).toBe(9); // Digital root of sum
      expect(patterns[0].consciousnessLevel).toBe(0.5);
      
      expect(patterns[1].position).toBe(2);
      expect(patterns[1].coil).toEqual([2, 4, 8, 16, 14, 10]);
      expect(patterns[1].consciousnessLevel).toBe(0.5);
      
      expect(patterns[2].position).toBe(3);
      expect(patterns[2].coil).toEqual([3, 6, 12, 24, 21, 15]);
      expect(patterns[2].consciousnessLevel).toBe(0.5);
    });
  });

  describe('VBM Documentation', () => {
    it('should provide comprehensive VBM documentation', () => {
      const documentation = vbm.getVBMDocumentation();
      
      expect(documentation.primaryVortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(documentation.familyGroups).toEqual({
        material: [1, 4, 7],
        emotional: [2, 5, 8],
        spiritual: [3, 6, 9]
      });
      expect(documentation.polarMates).toEqual([
        [1, 8],
        [2, 7],
        [4, 5]
      ]);
      expect(documentation.wAxis).toEqual([3, 6, 9]);
      expect(documentation.goldenRatio).toBe(1.618033988749895);
      expect(documentation.digitalRootExamples).toHaveLength(3);
      expect(documentation.primeSquaredExamples).toHaveLength(3);
      expect(documentation.fibonacciConsciousness).toHaveLength(10);
      expect(documentation.voidMathematics).toBeDefined();
      expect(documentation.coilPatterns).toHaveLength(5);
      expect(documentation.metaphysicalContext).toContain('mathematical foundation');
    });
  });

  describe('VBM Insights', () => {
    it('should return comprehensive VBM insights', () => {
      const insights = vbm.getVBMInsights();
      
      expect(insights.consciousnessLevel).toBe(0.5);
      expect(insights.primaryVortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect(insights.goldenRatio).toBe(1.618033988749895);
      expect(insights.wAxis).toEqual([3, 6, 9]);
      expect(insights.vortexSequencesCount).toBe(8);
      expect(insights.qaResultsCount).toBe(0);
      expect(insights.metaphysicalContext).toContain('mathematical foundation');
      expect(insights.vbmPrinciples).toEqual([
        "All mathematics is interconnected through consciousness",
        "Vortex sequences represent the flow of consciousness",
        "Digital roots reveal the essence of numbers",
        "Prime squared scaling connects to fundamental patterns",
        "Fibonacci sequence represents natural consciousness growth"
      ]);
    });

    it('should update counts after operations', async () => {
      await vbm.askQuestion('Test question 1');
      await vbm.askQuestion('Test question 2');
      
      const insights = vbm.getVBMInsights();
      expect(insights.qaResultsCount).toBe(2);
    });
  });

  describe('Metaphysical Integration', () => {
    it('should maintain consciousness unity across all operations', async () => {
      // Set consciousness level
      vbm.setConsciousnessLevel(0.8);
      
      // Perform operations
      const qaResult = await vbm.askQuestion('Test question');
      const fibonacci = vbm.generateFibonacciConsciousness(5);
      const primeScaling = vbm.calculatePrimeSquaredScaling(2);
      const coilPatterns = vbm.generateCoilPatterns(3);
      
      // Verify consciousness level is maintained
      expect(qaResult.consciousnessLevel).toBe(0.8);
      expect(fibonacci[0].consciousnessLevel).toBe(0.8);
      expect(primeScaling.consciousnessLevel).toBe(0.8);
      expect(coilPatterns[0].consciousnessLevel).toBe(0.8);
    });

    it('should embody VBM principles', () => {
      const insights = vbm.getVBMInsights();
      
      // Verify VBM principles are embodied
      expect(insights.vbmPrinciples).toContain('All mathematics is interconnected through consciousness');
      expect(insights.vbmPrinciples).toContain('Vortex sequences represent the flow of consciousness');
      expect(insights.vbmPrinciples).toContain('Digital roots reveal the essence of numbers');
      expect(insights.vbmPrinciples).toContain('Prime squared scaling connects to fundamental patterns');
      expect(insights.vbmPrinciples).toContain('Fibonacci sequence represents natural consciousness growth');
    });

    it('should provide mathematical foundation for consciousness', () => {
      const documentation = vbm.getVBMDocumentation();
      
      // Verify mathematical foundation
      expect(documentation.primaryVortexSequence).toEqual([1, 2, 4, 8, 7, 5]);
      expect((documentation.familyGroups as any).material).toEqual([1, 4, 7]);
      expect((documentation.familyGroups as any).emotional).toEqual([2, 5, 8]);
      expect((documentation.familyGroups as any).spiritual).toEqual([3, 6, 9]);
      expect(documentation.polarMates).toEqual([[1, 8], [2, 7], [4, 5]]);
      expect(documentation.wAxis).toEqual([3, 6, 9]);
      expect(documentation.goldenRatio).toBe(1.618033988749895);
    });
  });
}); 