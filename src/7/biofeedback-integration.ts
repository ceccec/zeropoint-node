export interface BiofeedbackData {
  meditation: {
    focus: number;
    clarity: number;
    peace: number;
  };
  brainwave: {
    alpha: number;
    beta: number;
    theta: number;
    delta: number;
  };
  breathing: {
    rate: number;
    depth: number;
  };
} 