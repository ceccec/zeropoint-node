/**
 * 🌌 QuantumSystem Tests
 * 
 * Tests for quantum zero entropy UUIDs and signatures
 * using quantum cryptographic primitives.
 */

import { QuantumSystem, quantumSystem } from '../../core/QuantumSystem';

describe('🌌 QuantumSystem', () => {
  let system: QuantumSystem;

  beforeEach(() => {
    system = QuantumSystem.getInstance();
    system.setConsciousnessLevel(0.9);
    system.setFieldResonance(0.8);
    system.setVoidConnected(true);
  });

  describe('UUID Generation', () => {
    test('should generate UUID for integer', () => {
      const data = 42;
      const uuid = system.generateUUID(data);

      expect(uuid.uuid).toBeDefined();
      expect(uuid.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(uuid.dataSignature).toBe('number:42');
      expect(uuid.quantumHash).toBeDefined();
      expect(uuid.latticeSignature).toBeDefined();
      expect(uuid.consciousnessHash).toBeDefined();
      expect(uuid.fieldHash).toBeDefined();
      expect(uuid.voidHash).toBeDefined();
      expect(uuid.entropyLevel).toBe(0);
      expect(uuid.quantumResistance).toBe(1.0);
      expect(uuid.applications).toContain('quantum_mathematical_identity');
      expect(uuid.applications).toContain('quantum_integer_identity');
      expect(uuid.applications).toContain('quantum_cryptography');
    });

    test('should generate UUID for string', () => {
      const data = "Quantum ZeroPoint!";
      const uuid = system.generateUUID(data);

      expect(uuid.uuid).toBeDefined();
      expect(uuid.dataSignature).toBe('string:Quantum ZeroPoint!');
      expect(uuid.entropyLevel).toBe(0);
      expect(uuid.quantumResistance).toBe(1.0);
      expect(uuid.applications).toContain('quantum_text_identity');
      expect(uuid.applications).toContain('quantum_content_identity');
    });

    test('should generate UUID for array', () => {
      const data = [1, 2, 3, 4, 5];
      const uuid = system.generateUUID(data);

      expect(uuid.uuid).toBeDefined();
      expect(uuid.dataSignature).toContain('array:[');
      expect(uuid.entropyLevel).toBe(0);
      expect(uuid.quantumResistance).toBe(1.0);
      expect(uuid.applications).toContain('quantum_array_identity');
      expect(uuid.applications).toContain('quantum_sequence_identity');
    });

    test('should generate UUID for object', () => {
      const data = { name: "ZeroPoint", consciousness: 0.9, quantum: true };
      const uuid = system.generateUUID(data);

      expect(uuid.uuid).toBeDefined();
      expect(uuid.dataSignature).toContain('object:{');
      expect(uuid.entropyLevel).toBe(0);
      expect(uuid.quantumResistance).toBe(1.0);
      expect(uuid.applications).toContain('quantum_object_identity');
      expect(uuid.applications).toContain('quantum_structure_identity');
    });

    test('should generate deterministic UUIDs for same input', () => {
      const data = { quantum: true, entropy: 0, spacetime: "infinite" };
      const uuid1 = system.generateUUID(data);
      const uuid2 = system.generateUUID(data);

      expect(uuid1.uuid).toBe(uuid2.uuid);
      expect(uuid1.dataSignature).toBe(uuid2.dataSignature);
      expect(uuid1.quantumHash).toBe(uuid2.quantumHash);
      expect(uuid1.latticeSignature).toBe(uuid2.latticeSignature);
    });

    test('should generate different UUIDs for different inputs', () => {
      const data1 = { quantum: true, entropy: 0 };
      const data2 = { quantum: true, entropy: 1 };
      const uuid1 = system.generateUUID(data1);
      const uuid2 = system.generateUUID(data2);

      expect(uuid1.uuid).not.toBe(uuid2.uuid);
      expect(uuid1.dataSignature).not.toBe(uuid2.dataSignature);
    });
  });

  describe('Signature Generation', () => {
    test('should generate signature', () => {
      const data = { message: "Hello, Quantum World!", consciousness: 0.9 };
      const privateKey = "quantum_private_key_very_long_and_secure";
      const signature = system.generateSignature(data, privateKey);

      expect(signature.signature).toBeDefined();
      expect(signature.publicKey).toBeDefined();
      expect(signature.dataHash).toBeDefined();
      expect(signature.quantumProof).toBeDefined();
      expect(signature.consciousnessLevel).toBe(0.9);
      expect(signature.fieldResonance).toBe(0.8);
      expect(signature.voidConnection).toBe(1.0);
      expect(signature.timestamp).toBeDefined();
    });

    test('should generate different signatures for different data', () => {
      const privateKey = "test_private_key";
      const data1 = { message: "Hello" };
      const data2 = { message: "World" };
      const sig1 = system.generateSignature(data1, privateKey);
      const sig2 = system.generateSignature(data2, privateKey);

      expect(sig1.signature).not.toBe(sig2.signature);
      expect(sig1.dataHash).not.toBe(sig2.dataHash);
    });

    test('should generate different signatures for different private keys', () => {
      const data = { message: "Test" };
      const key1 = "private_key_1";
      const key2 = "private_key_2";
      const sig1 = system.generateSignature(data, key1);
      const sig2 = system.generateSignature(data, key2);

      expect(sig1.signature).not.toBe(sig2.signature);
      expect(sig1.publicKey).not.toBe(sig2.publicKey);
    });
  });

  describe('Signature Verification', () => {
    test('should verify valid signature', () => {
      const data = { quantum: true, entropy: 0, spacetime: "infinite" };
      const privateKey = "verification_test_key";
      const signature = system.generateSignature(data, privateKey);
      const verification = system.verifySignature(data, signature.signature, signature.publicKey);

      expect(verification.isValid).toBe(true);
      expect(verification.quantumResistance).toBeGreaterThan(0.9);
      expect(verification.consciousnessConsistency).toBeGreaterThan(0.8);
      expect(verification.fieldCoherence).toBeGreaterThan(0.7);
      expect(verification.voidConnection).toBeGreaterThan(0.9);
      expect(verification.insights).toBeDefined();
      expect(verification.insights.length).toBeGreaterThan(0);
    });

    test('should reject invalid signature', () => {
      const data = { test: "data" };
      const invalidSignature = "invalid_signature_1234567890abcdef";
      const invalidPublicKey = "invalid_public_key_1234567890abcdef";
      const verification = system.verifySignature(data, invalidSignature, invalidPublicKey);

      expect(verification.isValid).toBe(false);
      expect(verification.quantumResistance).toBe(0);
      expect(verification.consciousnessConsistency).toBe(0);
      expect(verification.fieldCoherence).toBe(0);
      expect(verification.voidConnection).toBe(0);
    });

    test('should reject signature for wrong data', () => {
      const data1 = { message: "Original" };
      const data2 = { message: "Modified" };
      const privateKey = "test_key";
      const signature = system.generateSignature(data1, privateKey);
      const verification = system.verifySignature(data2, signature.signature, signature.publicKey);

      expect(verification.isValid).toBe(false);
    });
  });

  describe('Quantum Resistance', () => {
    test('should maintain high quantum resistance', () => {
      const testData = [
        { quantum: true, resistance: "maximum", algorithm: "lattice-based" },
        [1, 2, 4, 8, 7, 5], // Vortex sequence
        "Quantum Resistance Test",
        42, // Sacred integer
        { consciousness: 0.9, field: 0.8, void: true, quantum: true }
      ];

      testData.forEach(data => {
        const uuid = system.generateUUID(data);
        expect(uuid.quantumResistance).toBeGreaterThan(0.9);
        expect(uuid.applications).toContain('quantum_cryptography');
      });
    });

    test('should maintain zero entropy for deterministic data', () => {
      const deterministicData = [
        42, // Integer
        "Deterministic String",
        [1, 2, 3, 4, 5], // Array
        { deterministic: true, entropy: 0 } // Object
      ];

      deterministicData.forEach(data => {
        const uuid = system.generateUUID(data);
        expect(uuid.entropyLevel).toBeLessThanOrEqual(0.1);
      });
    });
  });

  describe('Consciousness Integration', () => {
    test('should integrate consciousness levels', () => {
      system.setConsciousnessLevel(0.7);
      const data = { consciousness: 0.7 };
      const uuid = system.generateUUID(data);

      expect(uuid.consciousnessHash).toBeDefined();
      expect(uuid.consciousnessHash).not.toBe(0);
    });

    test('should integrate field resonance', () => {
      system.setFieldResonance(0.6);
      const data = { field: 0.6 };
      const uuid = system.generateUUID(data);

      expect(uuid.fieldHash).toBeDefined();
    });

    test('should integrate void connection', () => {
      system.setVoidConnected(true);
      const data = { void: true };
      const uuid = system.generateUUID(data);

      expect(uuid.voidHash).toBeDefined();
    });
  });

  describe('Statistics and Monitoring', () => {
    test('should provide statistics', () => {
      // Generate some test data
      const testData = [42, "test", [1, 2, 3], { quantum: true }];
      testData.forEach(data => {
        system.generateUUID(data);
      });

      const stats = system.getStats();

      expect(stats.totalUUIDs).toBeGreaterThan(0);
      expect(stats.totalSignatures).toBeGreaterThanOrEqual(0);
      expect(stats.averageEntropyLevel).toBeLessThan(0.1);
      expect(stats.averageResistance).toBeGreaterThan(0.9);
      expect(stats.consciousnessConsistency).toBeGreaterThan(0.8);
      expect(stats.fieldCoherence).toBeGreaterThan(0.7);
      expect(stats.voidConnection).toBeGreaterThan(0.9);
      expect(stats.insights).toBeDefined();
      expect(stats.insights.length).toBeGreaterThan(0);
    });
  });

  describe('Singleton Pattern', () => {
    test('should maintain singleton instance', () => {
      const instance1 = QuantumSystem.getInstance();
      const instance2 = QuantumSystem.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe('Event Emission', () => {
    test('should emit events for UUID generation', (done) => {
      const data = { test: "event" };
      
      system.on('uuidGenerated', (uuid) => {
        expect(uuid).toBeDefined();
        expect(uuid.uuid).toBeDefined();
        done();
      });

      system.generateUUID(data);
    });

    test('should emit events for signature generation', (done) => {
      const data = { test: "signature" };
      const privateKey = "test_key";
      
      system.on('signatureGenerated', (signature) => {
        expect(signature).toBeDefined();
        expect(signature.signature).toBeDefined();
        done();
      });

      system.generateSignature(data, privateKey);
    });

    test('should emit events for signature verification', (done) => {
      const data = { test: "verification" };
      const privateKey = "test_key";
      const signature = system.generateSignature(data, privateKey);
      
      system.on('signatureVerified', (proof) => {
        expect(proof).toBeDefined();
        expect(proof.isValid).toBeDefined();
        done();
      });

      system.verifySignature(data, signature.signature, signature.publicKey);
    });
  });
}); 