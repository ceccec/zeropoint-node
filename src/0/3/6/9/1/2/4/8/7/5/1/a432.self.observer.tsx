import React, { useState, useRef } from 'react';
import { I, rodinPath } from './a432.i';

const SPIRAL_RADIUS = 80;
const SPIRAL_FACTOR = 18;
const CENTER = 180;

export function A432SelfObserver() {
  const [step, setStep] = useState(0);
  const [showMeetI, setShowMeetI] = useState(false);
  const [meetIStep, setMeetIStep] = useState<number | null>(null);
  const projectedI = I.projectIAtStep(step);
  const meetI = meetIStep !== null ? I.projectIAtStep(meetIStep) : projectedI;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  function handleNext() {
    setStep((s) => (s + 1) % rodinPath.length);
  }
  function handlePrev() {
    setStep((s) => (s - 1 + rodinPath.length) % rodinPath.length);
  }
  function handleJump(idx: number) {
    setStep(idx);
  }
  function handleMeetI() {
    setMeetIStep(step);
    setShowMeetI(true);
    playTone(projectedI.getCurrentFrequency());
  }
  function handleCloseMeetI() {
    setShowMeetI(false);
    setMeetIStep(null);
    stopTone();
  }
  function handleMeetIAgain(idx?: number) {
    let nextStep;
    if (typeof idx === 'number') {
      nextStep = idx;
    } else if (meetIStep !== null) {
      nextStep = (meetIStep + 1) % rodinPath.length;
    } else {
      nextStep = (step + 1) % rodinPath.length;
    }
    setMeetIStep(nextStep);
    playTone(I.projectIAtStep(nextStep).getCurrentFrequency());
  }
  function playTone(frequency: number) {
    stopTone();
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      osc.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
    } catch {}
  }
  function stopTone() {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch {}
      oscRef.current.disconnect();
      oscRef.current = null;
    }
  }

  // Spiral node positions
  const spiralNodes = rodinPath.map((digit, idx) => {
    const angle = (idx / rodinPath.length) * 2 * Math.PI;
    const radius = SPIRAL_RADIUS + SPIRAL_FACTOR * idx;
    const x = CENTER + radius * Math.cos(angle);
    const y = CENTER + radius * Math.sin(angle);
    const nodeI = I.projectIAtStep(idx);
    const color = nodeI.getCurrentColor();
    return { digit, idx, x, y, color, isCurrent: idx === step };
  });

  // Recursion tree: next 3 harmonic states from meetIStep
  const recursionTree = [];
  if (meetIStep !== null) {
    for (let i = 1; i <= 3; i++) {
      const nextIdx = (meetIStep + i) % rodinPath.length;
      const nextI = I.projectIAtStep(nextIdx);
      recursionTree.push({
        idx: nextIdx,
        color: nextI.getCurrentColor(),
        summary: nextI.metaphysicalSummary(),
        digit: nextI.context.digit
      });
    }
  }

  return (
    <div style={{ textAlign: 'center', margin: 32 }}>
      <h2>You are the Matrix</h2>
      <svg width={CENTER * 2} height={CENTER * 2} style={{ margin: '0 auto', display: 'block', background: '#f8faff', borderRadius: 16 }}>
        {spiralNodes.map(({ digit, idx, x, y, color, isCurrent }) => (
          <g key={idx} style={{ cursor: 'pointer' }} onClick={() => handleJump(idx)}>
            <circle
              cx={x}
              cy={y}
              r={isCurrent ? 28 : 18}
              fill={`hsl(${color.hue},${color.saturation * 100}%,${color.lightness * 100}%)`}
              stroke={isCurrent ? '#36f' : '#ccc'}
              strokeWidth={isCurrent ? 4 : 2}
              style={{ filter: isCurrent ? 'drop-shadow(0 0 16px #36f)' : undefined, transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' }}
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fontWeight={isCurrent ? 'bold' : 'normal'}
              fontSize={isCurrent ? 22 : 16}
              fill={isCurrent ? '#fff' : '#333'}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {digit}
            </text>
          </g>
        ))}
      </svg>
      <p>
        <strong>At step {projectedI.context.step}, digit {projectedI.context.digit}, axis {projectedI.context.axis}, angle {(projectedI.context.angle * 180 / Math.PI).toFixed(1)}°</strong>
      </p>
      <p style={{ fontStyle: 'italic', color: '#369' }}>{projectedI.narrate()}</p>
      <div style={{ margin: 16 }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleMeetI} style={{ marginLeft: 16, background: '#36f', color: '#fff', borderRadius: 4, border: 'none', padding: '6px 16px', fontWeight: 'bold' }}>Meet I</button>
      </div>
      <div style={{ marginTop: 32, color: '#666', fontSize: 14 }}>
        <p>
          Every click, every step, every narration is you—the living, recursive matrix—observing and creating yourself.
        </p>
      </div>
      {showMeetI && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.5s cubic-bezier(.4,2,.6,1)'
        }}>
          <div style={{ background: `hsl(${meetI.getCurrentColor().hue},${meetI.getCurrentColor().saturation * 100}%,${meetI.getCurrentColor().lightness * 100}%)`, borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 32px #3698', transform: 'scale(1)', animation: 'scaleIn 0.5s cubic-bezier(.4,2,.6,1)' }}>
            <h3 style={{ color: '#fff' }}>Meeting I</h3>
            <p style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{meetI.metaphysicalSummary()}</p>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>Next Harmonic States:</div>
              {recursionTree.map(({ idx, color, summary, digit }) => (
                <div key={idx} style={{ marginBottom: 12, background: `hsl(${color.hue},${color.saturation * 100}%,${color.lightness * 100}%)`, borderRadius: 8, padding: 10, boxShadow: '0 2px 8px #3694', cursor: 'pointer' }} onClick={() => handleMeetIAgain(idx)}>
                  <strong style={{ color: '#fff' }}>Digit {digit}</strong>
                  <div style={{ color: '#fff', fontSize: 13 }}>{summary}</div>
                </div>
              ))}
            </div>
            <button onClick={() => handleMeetIAgain()} style={{ marginTop: 16, background: '#eee', color: '#369', borderRadius: 4, border: 'none', padding: '6px 16px', fontWeight: 'bold', marginRight: 12 }}>Meet I again</button>
            <button onClick={handleCloseMeetI} style={{ marginTop: 16, background: '#36f', color: '#fff', borderRadius: 4, border: 'none', padding: '6px 16px', fontWeight: 'bold' }}>Close</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default A432SelfObserver; 