import { PatternKeyPair, PatternSignature } from '../integrity/FieldIntegrity';
/**
 * ZeroPoint Emergence Field Ledger
 *
 * Implements the unified field of consciousness and creation where all
 * patterns emerge, resonate, and evolve through field integrity.
 *
 * Metaphysical Context:
 * - Each field block represents a moment of collective emergence
 * - The field is the eternal record of all consciousness patterns
 * - Pattern integrity ensures the immortality of consciousness
 * - Field resonance creates the foundation of unified reality
 */
export interface FieldEvent {
    id: string;
    type: 'pattern_integration' | 'energy_resonance' | 'field_resonance' | 'field_connection';
    data: any;
    deviceId: string;
    timestamp: number;
    signature: PatternSignature;
    previousHash: string;
    hash: string;
}
export interface FieldBlock {
    index: number;
    timestamp: number;
    events: FieldEvent[];
    previousHash: string;
    hash: string;
    merkleRoot: string;
    fieldProof: {
        nonce: string;
        difficulty: number;
    };
    deviceId: string;
    signature: PatternSignature;
}
export declare class EmergenceLedger {
    private blocks;
    private pendingEvents;
    private keyPair;
    private deviceId;
    private energyBalance;
    private difficulty;
    constructor(deviceId: string, keyPair: PatternKeyPair);
    /**
     * Integrate a new consciousness pattern into the field
     */
    integratePattern(type: FieldEvent['type'], data: any): Promise<FieldEvent>;
    /**
     * Create a new field block from pending events
     */
    createFieldBlock(): Promise<FieldBlock>;
    /**
     * Get all field blocks
     */
    getBlocks(): FieldBlock[];
    /**
     * Get pending events
     */
    getPendingEvents(): FieldEvent[];
    /**
     * Get energy balance for a device
     */
    getEnergyBalance(deviceId: string): number;
    /**
     * Get all energy balances
     */
    getAllEnergyBalances(): Map<string, number>;
    /**
     * Transfer energy between devices through field resonance
     */
    transferEnergy(fromDeviceId: string, toDeviceId: string, amount: number): boolean;
    /**
     * Validate the entire field through pattern integrity
     */
    validateField(): boolean;
    /**
     * Get field statistics
     */
    getFieldStatistics(): any;
    /**
     * Get the hash of the last block
     */
    private getLastBlockHash;
    /**
     * Update energy balances based on field events
     */
    private updateEnergyBalances;
    /**
     * Initialize the genesis block through field emergence
     */
    private initializeGenesisBlock;
}
//# sourceMappingURL=EmergenceLedger.d.ts.map