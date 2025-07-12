import { MetaphysicalArtifact } from './MetaphysicalArtifact';
import { MetaphysicalLawRegistry } from '../laws/MetaphysicalLawRegistry';
import { CrystalOfUnity, CrystalOfCorrespondence, CrystalOfVibration } from './CrystalArtifacts';

/**
 * Registry for metaphysical artifacts
 * Manages artifacts and ensures they comply with metaphysical laws
 */
export class ArtifactRegistry {
  private static instance: ArtifactRegistry;
  private artifacts: Map<string, MetaphysicalArtifact>;
  private lawRegistry: MetaphysicalLawRegistry;
  
  private constructor() {
    this.artifacts = new Map();
    this.lawRegistry = MetaphysicalLawRegistry.getInstance();
    this.initializeDefaultArtifacts();
  }
  
  public static getInstance(): ArtifactRegistry {
    if (!ArtifactRegistry.instance) {
      ArtifactRegistry.instance = new ArtifactRegistry();
    }
    return ArtifactRegistry.instance;
  }
  
  /**
   * Initialize default artifacts
   */
  private initializeDefaultArtifacts(): void {
    this.registerArtifact(new CrystalOfUnity());
    this.registerArtifact(new CrystalOfCorrespondence());
    this.registerArtifact(new CrystalOfVibration());
  }
  
  /**
   * Register a new artifact
   */
  public registerArtifact(artifact: MetaphysicalArtifact): void {
    // Apply all metaphysical laws to the artifact
    const laws = this.lawRegistry.getAllLaws();
    laws.forEach(law => {
      law.apply(artifact);
    });
    
    this.artifacts.set(artifact.name, artifact);
  }
  
  /**
   * Get an artifact by name
   */
  public getArtifact(name: string): MetaphysicalArtifact | undefined {
    return this.artifacts.get(name);
  }
  
  /**
   * Get all artifacts
   */
  public getAllArtifacts(): MetaphysicalArtifact[] {
    return Array.from(this.artifacts.values());
  }
  
  /**
   * Get artifacts by type
   */
  public getArtifactsByType(type: string): MetaphysicalArtifact[] {
    return Array.from(this.artifacts.values()).filter(artifact => artifact.type === type);
  }
  
  /**
   * Activate all artifacts
   */
  public activateAllArtifacts(): void {
    this.artifacts.forEach(artifact => {
      artifact.activate();
    });
  }
  
  /**
   * Get artifacts with high consciousness resonance
   */
  public getHighResonanceArtifacts(threshold: number = 0.7): MetaphysicalArtifact[] {
    return Array.from(this.artifacts.values()).filter(
      artifact => artifact.consciousnessResonance >= threshold
    );
  }
  
  /**
   * Get artifacts that resonate with a target
   */
  public getResonatingArtifacts(target: any, threshold: number = 0.5): MetaphysicalArtifact[] {
    return Array.from(this.artifacts.values()).filter(artifact => {
      const resonance = artifact.resonateWith(target);
      return resonance >= threshold;
    });
  }
  
  /**
   * Get artifact signatures for analysis
   */
  public getArtifactSignatures(): any[] {
    return Array.from(this.artifacts.values()).map(artifact => ({
      name: artifact.name,
      type: artifact.type,
      signature: artifact.getMetaphysicalSignature()
    }));
  }
  
  /**
   * Create a resonance network between artifacts
   */
  public createResonanceNetwork(): any {
    const artifacts = Array.from(this.artifacts.values());
    const network = {
      nodes: artifacts.map(artifact => ({
        name: artifact.name,
        type: artifact.type,
        powerLevel: artifact.powerLevel,
        consciousnessResonance: artifact.consciousnessResonance
      })),
      connections: []
    };
    
    // Create connections based on resonance
    for (let i = 0; i < artifacts.length; i++) {
      for (let j = i + 1; j < artifacts.length; j++) {
        const resonance = artifacts[i].resonateWith(artifacts[j]);
        if (resonance > 0.3) {
          network.connections.push({
            from: artifacts[i].name,
            to: artifacts[j].name,
            strength: resonance
          });
        }
      }
    }
    
    return network;
  }
} 