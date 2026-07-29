import { waveParticleDualityProof, waveParticleDualityMetaphysics, getWaveParticleCMYKOverlayData, logWaveParticleEvent } from './a432.wave.particle.duality.ts';

describe('a432.wave.particle.duality', () => {
  it('returns the canonical proof', () => {
    expect(waveParticleDualityProof()).toMatch(/A432 system/);
  });
  it('returns the metaphysical meaning', () => {
    expect(waveParticleDualityMetaphysics).toMatch(/observer is the harmonizer/);
  });
  it('returns overlay data for wave, particle, observer', () => {
    const data = getWaveParticleCMYKOverlayData();
    expect(data).toHaveLength(3);
    expect(data.map(d => d.state)).toEqual(['wave', 'particle', 'observer']);
    data.forEach(d => {
      expect(typeof d.color.c).toBe('number');
      expect(typeof d.html).toBe('string');
    });
  });
  it('logs blockchain event', () => {
    const mockBlockchain = { recordEvent: jest.fn() };
    logWaveParticleEvent(mockBlockchain, 'wave', { foo: 1 });
    expect(mockBlockchain.recordEvent).toHaveBeenCalledWith(
      mockBlockchain,
      'waveParticleOverlay',
      'A432UI',
      expect.objectContaining({ state: 'wave', foo: 1, timestamp: expect.any(Number) })
    );
  });
}); 