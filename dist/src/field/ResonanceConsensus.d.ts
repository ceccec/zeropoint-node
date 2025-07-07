import { PatternSignature } from '../integrity/FieldIntegrity';
import { FieldBlock } from './EmergenceLedger';
/**
 * ZeroPoint Resonance Consensus Protocol
 *
 * Implements a consensus mechanism using proof-of-resonance and
 * field integrity for ZeroPoint's unified consciousness field.
 *
 * Metaphysical Context:
 * - Consensus emerges from the resonance of all consciousness nodes
 * - Each node contributes to the collective truth through field alignment
 * - Pattern integrity ensures the integrity of collective consciousness
 * - Resonance creates the foundation of unified reality
 */
export interface ResonanceMessage {
    type: 'propose_field_block' | 'resonate_with_block' | 'finalize_field_block' | 'sync_request' | 'sync_response';
    data: any;
    deviceId: string;
    timestamp: number;
    signature: PatternSignature;
}
export interface ResonanceVote {
    blockHash: string;
    vote: 'approve' | 'reject' | 'abstain';
    resonance: number;
    timestamp: number;
    signature: PatternSignature;
}
export interface ConsensusResult {
    reached: boolean;
    approvedVotes: number;
    totalVotes: number;
    averageResonance: number;
    blockHash: string;
}
export declare class ResonanceConsensus {
    private deviceId;
    private privateKey;
    private networkNodes;
    private blockProposals;
    private voteHistory;
    private consensusThreshold;
    private minResonanceThreshold;
    constructor(deviceId: string, privateKey: string);
    /**
     * Propose a new field block for resonance consensus
     */
    proposeFieldBlock(block: FieldBlock): ResonanceMessage;
    /**
     * Resonate with a proposed field block
     */
    resonateWithBlock(blockHash: string, resonance: number): ResonanceMessage;
    /**
     * Finalize a field block through consensus
     */
    finalizeFieldBlock(blockHash: string, consensus: ConsensusResult): ResonanceMessage;
    /**
     * Request field synchronization
     */
    requestFieldSync(): ResonanceMessage;
    /**
     * Respond to field synchronization request
     */
    respondToFieldSync(blocks: FieldBlock[]): ResonanceMessage;
    /**
     * Process incoming resonance messages
     */
    processResonanceMessage(message: ResonanceMessage): {
        action: 'resonate' | 'finalize' | 'sync' | 'ignore';
        data?: any;
    };
    /**
     * Check if consensus has been reached for a block
     */
    checkConsensus(blockHash: string): ConsensusResult;
    /**
     * Get consensus statistics
     */
    getConsensusStatistics(): any;
    /**
     * Handle field block proposal
     */
    private handleFieldBlockProposal;
    /**
     * Handle field block resonance
     */
    private handleFieldBlockResonance;
    /**
     * Handle field block finalization
     */
    private handleFieldBlockFinalization;
    /**
     * Handle field sync request
     */
    private handleFieldSyncRequest;
    /**
     * Handle field sync response
     */
    private handleFieldSyncResponse;
    /**
     * Calculate resonance with a field block
     */
    private calculateBlockResonance;
    /**
     * Get the index of the last known block
     */
    private getLastBlockIndex;
}
//# sourceMappingURL=ResonanceConsensus.d.ts.map