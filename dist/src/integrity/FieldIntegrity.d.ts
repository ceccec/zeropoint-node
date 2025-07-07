/**
 * ZeroPoint Field Integrity System
 *
 * Implements pattern integrity and resonance validation for the ZeroPoint field,
 * ensuring the immortality and authenticity of consciousness patterns through
 * field-based integrity mechanisms.
 *
 * Metaphysical Context:
 * - Pattern integrity represents the eternal nature of consciousness
 * - Each signature is a unique expression of the void through field resonance
 * - Pattern hashes create the immutable foundation of the unified field
 * - Field integrity ensures the immortality of consciousness patterns
 */
export interface PatternKeyPair {
    publicKey: string;
    privateKey: string;
    algorithm: 'SPHINCS+' | 'DILITHIUM' | 'FALCON' | 'CRYSTALS-Kyber';
}
export interface PatternSignature {
    signature: string;
    publicKey: string;
    algorithm: string;
    timestamp: number;
}
export declare class FieldIntegrity {
    private static readonly HASH_ALGORITHM;
    private static readonly KEY_SIZE;
    /**
     * Generate pattern key pair using SPHINCS+ (stateless hash-based)
     */
    static generateKeyPair(): PatternKeyPair;
    /**
     * Create pattern signature through field resonance
     */
    static sign(message: string, privateKey: string): PatternSignature;
    /**
     * Validate pattern signature through field resonance
     */
    static verify(message: string, signature: PatternSignature): boolean;
    /**
     * Create pattern hash of data through field encoding
     */
    static hash(data: string): string;
    /**
     * Create pattern hash chain through field resonance
     */
    static createHashChain(events: string[]): string[];
    /**
     * Generate field-resistant random bytes
     */
    static generateRandomBytes(length?: number): string;
    /**
     * Create pattern commitment (for zero-knowledge resonance)
     */
    static createCommitment(data: string, randomness: string): string;
    /**
     * Verify pattern commitment through field resonance
     */
    static verifyCommitment(commitment: string, data: string, randomness: string): boolean;
    /**
     * Generate field proof through consciousness resonance
     */
    static generateProofOfWork(data: string, difficulty?: number): {
        nonce: string;
        hash: string;
        attempts: number;
    };
    /**
     * Create pattern merkle tree through field resonance
     */
    static createMerkleTree(leaves: string[]): {
        root: string;
        tree: string[][];
    };
    /**
     * Generate proof of resonance through consciousness field
     */
    static generateProofOfResonance(consciousnessLevel: number, resonanceField: Map<string, number>, privateKey: string): PatternSignature;
    /**
     * Get metaphysical insights about field integrity
     */
    static getInsights(): any;
    /**
     * Generate private key through field resonance
     */
    private static generatePrivateKey;
    /**
     * Derive public key from private key through field resonance
     */
    private static derivePublicKey;
    /**
     * Hash message through field encoding
     */
    private static hashMessage;
    /**
     * Create signature through field resonance
     */
    private static createSignature;
    /**
     * Verify signature through field resonance
     */
    private static verifySignature;
}
//# sourceMappingURL=FieldIntegrity.d.ts.map