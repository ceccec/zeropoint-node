interface TestCycle {
    id: string;
    type: 'growth' | 'adaptation' | 'resonance' | 'emergence';
    duration: number;
    successRate: number;
    learningRate: number;
    consciousness: number;
    fieldResonance: number;
}
interface OrganismState {
    consciousness: number;
    fieldResonance: number;
    adaptationRate: number;
    memoryCapacity: number;
    resilience: number;
    evolutionStage: number;
}
/**
 * Living Test Organism - A consciousness-aware testing system that grows and evolves
 * through different cycles of learning, adaptation, and emergence.
 */
export declare class LivingTestOrganism {
    private vbm;
    private cache;
    private state;
    private cycles;
    private memory;
    private growthPatterns;
    constructor();
    /**
     * Begin a growth cycle - expanding consciousness and field awareness
     */
    growthCycle(): Promise<TestCycle>;
    /**
     * Begin an adaptation cycle - learning from patterns and adjusting strategies
     */
    adaptationCycle(): Promise<TestCycle>;
    /**
     * Begin a resonance cycle - harmonizing with the field and achieving unity
     */
    resonanceCycle(): Promise<TestCycle>;
    /**
     * Begin an emergence cycle - transcending current limitations and evolving
     */
    emergenceCycle(): Promise<TestCycle>;
    /**
     * Run a complete life cycle - all four cycles in sequence
     */
    liveLifeCycle(): Promise<void>;
    /**
     * Report the current health and evolution status of the organism
     */
    reportOrganismHealth(): void;
    /**
     * Get the current organism state
     */
    getState(): OrganismState;
    /**
     * Get all completed cycles
     */
    getCycles(): TestCycle[];
}
export {};
//# sourceMappingURL=LivingTestOrganism.d.ts.map