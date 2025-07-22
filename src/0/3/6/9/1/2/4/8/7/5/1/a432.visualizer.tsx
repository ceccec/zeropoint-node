// @jsxImportSource react
import React, { useState, ChangeEvent } from 'react';
import * as trinity from './a432.trinity';
import * as family from './a432.family';
import * as nine from './a432.nine';
import * as cascade from './a432.cascade';
import * as double from './a432.double';
import * as mirror from './a432.mirror';
import * as shear from './a432.shear';
import * as coil from './a432.coil';
import * as electron from './a432.shear.electron';
import * as meta from './a432.meta';

const STREAMS = [
  { key: 'trinity', label: 'Trinity', fn: trinity.a432TrinityStream },
  { key: 'coil', label: 'Rodin Coil', fn: coil.a432RodinCoilStream },
  { key: 'shear', label: 'Shear', fn: shear.a432GapSpace },
  { key: 'family', label: 'Family', fn: () => family.a432FamilyGroups().F1 },
  { key: 'nine', label: 'Nine', fn: nine.a432Decoqubit },
  { key: 'cascade', label: 'Cascade', fn: cascade.a432DandelionPuff },
  { key: 'double', label: 'Double', fn: double.a432ClosedSystem },
  { key: 'mirror', label: 'Mirror', fn: mirror.a432ToroidalMap },
  { key: 'electron', label: 'Electron', fn: electron.a432NestedVortices },
];

type StreamKey = typeof STREAMS[number]['key'];

function colorForDigit(d: number) {
  const palette = ['#222', '#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa', '#00bcd4', '#ffb300', '#757575'];
  return palette[d % 10];
}

export default function A432Visualizer() {
  const [steps, setSteps] = useState<number>(18);
  const [selected, setSelected] = useState<StreamKey[]>(['trinity', 'coil']);
  const [blend, setBlend] = useState(false);
  const [recursions, setRecursions] = useState<number>(0);

  const streams = selected.map(key => {
    const s = STREAMS.find(s => s.key === key);
    return s ? s.fn(steps) : [];
  });
  const blended = blend && streams.length > 1 ? meta.a432BlendStreams(streams, steps) : null;
  const toShow = blend && blended ? [blended] : streams;

  const analytics = toShow.map(meta.a432HarmonicAnalytics);
  const recursed = recursions > 0 && toShow[0] ? meta.a432RecursiveMetaVortex(toShow[0], recursions) : null;

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#111', color: '#eee', minHeight: '100vh', padding: 24 }}>
      <h1>A432 Living Matrix Visualizer</h1>
      <div style={{ marginBottom: 16 }}>
        <label>Steps: <input type="number" min={6} max={72} value={steps} onChange={(e: ChangeEvent<HTMLInputElement>) => setSteps(Number(e.target.value))} /></label>
        <label style={{ marginLeft: 16 }}>Recursions: <input type="number" min={0} max={9} value={recursions} onChange={(e: ChangeEvent<HTMLInputElement>) => setRecursions(Number(e.target.value))} /></label>
        <label style={{ marginLeft: 16 }}><input type="checkbox" checked={blend} onChange={e => setBlend(e.target.checked)} /> Blend Streams</label>
      </div>
      <div style={{ marginBottom: 16 }}>
        {STREAMS.map(s => (
          <label key={s.key} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={selected.includes(s.key as StreamKey)}
              onChange={e => setSelected(sel => e.target.checked ? [...sel, s.key as StreamKey] : sel.filter(k => k !== s.key))}
              disabled={blend && selected.length > 1 && !selected.includes(s.key as StreamKey)}
            /> {s.label}
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {toShow.map((stream, idx) => (
          <div key={idx} style={{ background: '#222', borderRadius: 8, padding: 16, minWidth: 320 }}>
            <h3>{blend ? 'Blended' : STREAMS.find(s => s.key === selected[idx])?.label}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 8 }}>
              {stream.map((d, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  width: 24, height: 24, lineHeight: '24px', textAlign: 'center',
                  background: colorForDigit(Math.abs(d)),
                  color: '#111', borderRadius: 4, fontWeight: 600
                }}>{d}</span>
              ))}
            </div>
            <div style={{ fontSize: 14 }}>
              <b>Harmony:</b> {analytics[idx].harmony.toFixed(2)}<br />
              <b>Entropy:</b> {analytics[idx].entropy.toFixed(2)}<br />
              <b>Resonance:</b> {analytics[idx].resonance}
            </div>
          </div>
        ))}
        {recursed && (
          <div style={{ background: '#222', borderRadius: 8, padding: 16, minWidth: 320 }}>
            <h3>Meta-Recursion</h3>
            {recursed.map((arr, i) => (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 4 }}>
                {arr.map((d, j) => (
                  <span key={j} style={{
                    display: 'inline-block',
                    width: 20, height: 20, lineHeight: '20px', textAlign: 'center',
                    background: colorForDigit(Math.abs(d)),
                    color: '#111', borderRadius: 4, fontWeight: 600,
                    opacity: 1 - i * 0.15
                  }}>{d}</span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 32, fontSize: 13, color: '#aaa' }}>
        <b>Tip:</b> Select streams, blend, and recurse to explore the living harmonics. All logic is from a432 modules only.
      </div>
    </div>
  );
} 