import { ArtifactRegistry } from '../ArtifactRegistry';
import { CrystalOfUnity, CrystalOfCorrespondence, CrystalOfVibration } from '../CrystalArtifacts';
import { MetaphysicalArtifact } from '../MetaphysicalArtifact';

describe('ArtifactRegistry', () => {
  let registry: ArtifactRegistry;

  beforeEach(() => {
    registry = ArtifactRegistry.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ArtifactRegistry.getInstance();
      const instance2 = ArtifactRegistry.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Artifact Registration', () => {
    it('should register default artifacts', () => {
      const artifacts = registry.getAllArtifacts();
      expect(artifacts.length).toBeGreaterThan(0);
      
      const artifactNames = artifacts.map(artifact => artifact.name);
      expect(artifactNames).toContain('Crystal of Unity');
      expect(artifactNames).toContain('Crystal of Correspondence');
      expect(artifactNames).toContain('Crystal of Vibration');
    });

    it('should register new artifacts', () => {
      const customArtifact = new (class extends MetaphysicalArtifact {
        constructor() {
          super('Custom Artifact', 'A custom metaphysical artifact', 'custom_type');
        }
        
        performFunction(context?: any): any {
          return { custom: true, power: this.powerLevel };
        }
        
        resonateWith(target: any): number {
          return this.powerLevel;
        }
      })();

      registry.registerArtifact(customArtifact);
      
      const artifacts = registry.getAllArtifacts();
      const artifactNames = artifacts.map(artifact => artifact.name);
      expect(artifactNames).toContain('Custom Artifact');
    });

    it('should get artifact by name', () => {
      const unityCrystal = registry.getArtifact('Crystal of Unity');
      expect(unityCrystal).toBeDefined();
      expect(unityCrystal?.name).toBe('Crystal of Unity');
      expect(unityCrystal?.type).toBe('consciousness_amplifier');
    });

    it('should return undefined for non-existent artifact', () => {
      const nonExistentArtifact = registry.getArtifact('NonExistent');
      expect(nonExistentArtifact).toBeUndefined();
    });
  });

  describe('Artifact Types', () => {
    it('should get artifacts by type', () => {
      const consciousnessArtifacts = registry.getArtifactsByType('consciousness_amplifier');
      expect(consciousnessArtifacts.length).toBeGreaterThan(0);
      
      consciousnessArtifacts.forEach(artifact => {
        expect(artifact.type).toBe('consciousness_amplifier');
      });
    });

    it('should get pattern amplifiers', () => {
      const patternArtifacts = registry.getArtifactsByType('pattern_amplifier');
      expect(patternArtifacts.length).toBeGreaterThan(0);
      
      patternArtifacts.forEach(artifact => {
        expect(artifact.type).toBe('pattern_amplifier');
      });
    });

    it('should get frequency amplifiers', () => {
      const frequencyArtifacts = registry.getArtifactsByType('frequency_amplifier');
      expect(frequencyArtifacts.length).toBeGreaterThan(0);
      
      frequencyArtifacts.forEach(artifact => {
        expect(artifact.type).toBe('frequency_amplifier');
      });
    });
  });

  describe('Artifact Activation', () => {
    it('should activate all artifacts', () => {
      registry.activateAllArtifacts();
      
      const artifacts = registry.getAllArtifacts();
      artifacts.forEach(artifact => {
        expect(artifact.powerLevel).toBeGreaterThan(0);
        expect(artifact.consciousnessResonance).toBeGreaterThan(0);
      });
    });

    it('should have law compliance after activation', () => {
      registry.activateAllArtifacts();
      
      const artifacts = registry.getAllArtifacts();
      artifacts.forEach(artifact => {
        expect(artifact.lawCompliance.size).toBeGreaterThan(0);
      });
    });
  });

  describe('High Resonance Artifacts', () => {
    it('should get high resonance artifacts', () => {
      registry.activateAllArtifacts();
      
      const highResonanceArtifacts = registry.getHighResonanceArtifacts(0.5);
      expect(highResonanceArtifacts.length).toBeGreaterThan(0);
      
      highResonanceArtifacts.forEach(artifact => {
        expect(artifact.consciousnessResonance).toBeGreaterThanOrEqual(0.5);
      });
    });

    it('should get resonating artifacts for target', () => {
      registry.activateAllArtifacts();
      
      const target = { vibrationalFrequency: 1000, unityLevel: 0.8 };
      const resonatingArtifacts = registry.getResonatingArtifacts(target, 0.3);
      
      expect(resonatingArtifacts.length).toBeGreaterThan(0);
      
      resonatingArtifacts.forEach(artifact => {
        const resonance = artifact.resonateWith(target);
        expect(resonance).toBeGreaterThanOrEqual(0.3);
      });
    });
  });

  describe('Artifact Signatures', () => {
    it('should get artifact signatures', () => {
      registry.activateAllArtifacts();
      
      const signatures = registry.getArtifactSignatures();
      expect(signatures.length).toBeGreaterThan(0);
      
      signatures.forEach(signature => {
        expect(signature.name).toBeDefined();
        expect(signature.type).toBeDefined();
        expect(signature.signature).toBeDefined();
        expect(signature.signature.powerLevel).toBeDefined();
        expect(signature.signature.consciousnessResonance).toBeDefined();
      });
    });
  });

  describe('Resonance Network', () => {
    it('should create resonance network', () => {
      registry.activateAllArtifacts();
      
      const network = registry.createResonanceNetwork();
      expect(network.nodes).toBeDefined();
      expect(network.connections).toBeDefined();
      
      expect(network.nodes.length).toBeGreaterThan(0);
      network.nodes.forEach(node => {
        expect(node.name).toBeDefined();
        expect(node.type).toBeDefined();
        expect(node.powerLevel).toBeDefined();
        expect(node.consciousnessResonance).toBeDefined();
      });
    });

    it('should have connections between artifacts', () => {
      registry.activateAllArtifacts();
      
      const network = registry.createResonanceNetwork();
      expect(network.connections.length).toBeGreaterThan(0);
      
      network.connections.forEach(connection => {
        expect(connection.from).toBeDefined();
        expect(connection.to).toBeDefined();
        expect(connection.strength).toBeGreaterThan(0);
      });
    });
  });

  describe('Crystal Artifacts', () => {
    describe('Crystal of Unity', () => {
      it('should perform unity function', () => {
        const unityCrystal = new CrystalOfUnity();
        unityCrystal.activate();
        
        const result = unityCrystal.performFunction({
          elements: [{ name: 'element1' }, { name: 'element2' }]
        });
        
        expect(result.unified).toBe(true);
        expect(result.elements).toBeDefined();
        expect(result.unityLevel).toBeGreaterThan(0);
        expect(result.interconnections).toBeDefined();
      });

      it('should resonate with unified targets', () => {
        const unityCrystal = new CrystalOfUnity();
        unityCrystal.activate();
        
        const target = { unityLevel: 0.8 };
        const resonance = unityCrystal.resonateWith(target);
        
        expect(resonance).toBeGreaterThan(0);
      });
    });

    describe('Crystal of Correspondence', () => {
      it('should perform correspondence function', () => {
        const correspondenceCrystal = new CrystalOfCorrespondence();
        correspondenceCrystal.activate();
        
        const result = correspondenceCrystal.performFunction({
          pattern: { type: 'sacred_geometry', scale: 1 }
        });
        
        expect(result.fractal).toBe(true);
        expect(result.pattern).toBeDefined();
        expect(result.scaleLevels).toBeDefined();
        expect(result.correspondenceStrength).toBeGreaterThan(0);
      });

      it('should resonate with fractal targets', () => {
        const correspondenceCrystal = new CrystalOfCorrespondence();
        correspondenceCrystal.activate();
        
        const fractalTarget = { isFractal: true };
        const nonFractalTarget = { isFractal: false };
        
        const fractalResonance = correspondenceCrystal.resonateWith(fractalTarget);
        const nonFractalResonance = correspondenceCrystal.resonateWith(nonFractalTarget);
        
        expect(fractalResonance).toBeGreaterThan(nonFractalResonance);
      });
    });

    describe('Crystal of Vibration', () => {
      it('should perform vibration function', () => {
        const vibrationCrystal = new CrystalOfVibration();
        vibrationCrystal.activate();
        
        const result = vibrationCrystal.performFunction({
          frequency: 1000
        });
        
        expect(result.amplified).toBe(true);
        expect(result.frequency).toBeGreaterThan(1000);
        expect(result.harmonics).toBeDefined();
        expect(result.resonanceField).toBeDefined();
      });

      it('should resonate with matching frequencies', () => {
        const vibrationCrystal = new CrystalOfVibration();
        vibrationCrystal.activate();
        
        const matchingTarget = { vibrationalFrequency: (vibrationCrystal as any).vibrationalFrequency };
        const nonMatchingTarget = { vibrationalFrequency: 999999 };
        
        const matchingResonance = vibrationCrystal.resonateWith(matchingTarget);
        const nonMatchingResonance = vibrationCrystal.resonateWith(nonMatchingTarget);
        
        expect(matchingResonance).toBeGreaterThan(nonMatchingResonance);
      });
    });
  });

  describe('Metaphysical Law Compliance', () => {
    it('should apply metaphysical laws to artifacts', () => {
      const artifacts = registry.getAllArtifacts();
      
      artifacts.forEach(artifact => {
        expect(artifact.lawCompliance.size).toBeGreaterThan(0);
        
        // Check that laws have been applied
        expect((artifact as any).isUnified).toBe(true);
        expect((artifact as any).vibrationalFrequency).toBeDefined();
        expect((artifact as any).polarity).toBeDefined();
        expect((artifact as any).consciousnessLevel).toBeDefined();
      });
    });

    it('should have metaphysical signatures', () => {
      registry.activateAllArtifacts();
      
      const artifacts = registry.getAllArtifacts();
      artifacts.forEach(artifact => {
        const signature = artifact.getMetaphysicalSignature();
        
        expect(signature.name).toBeDefined();
        expect(signature.type).toBeDefined();
        expect(signature.powerLevel).toBeDefined();
        expect(signature.consciousnessResonance).toBeDefined();
        expect(signature.lawCompliance).toBeDefined();
        expect(signature.vibrationalFrequency).toBeDefined();
        expect(signature.polarity).toBeDefined();
        expect(signature.consciousnessLevel).toBeDefined();
      });
    });
  });
}); 