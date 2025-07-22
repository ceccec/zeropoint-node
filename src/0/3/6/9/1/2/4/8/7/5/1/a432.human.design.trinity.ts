// a432.human.design.trinity.ts
// Harmonizes Human Design knowledge as module trinities in the a432 system
// Each HD component (center, gate, channel, type, authority, profile) is a trinity, harmonized mathematically and metaphysically

import { metaphysicalSummary as chainMeta } from './a432.chain.of.events';

export interface HDTrinity {
  conscious: number;   // conscious design (integer/fractional)
  unconscious: number; // unconscious design
  design: number;      // body/vehicle
  metaphysical: string;
}

export function harmonizeHDTrinity(trinity: HDTrinity): HDTrinity {
  const harmonized = (trinity.conscious + trinity.unconscious + trinity.design) / 3;
  return {
    ...trinity,
    design: harmonized,
    metaphysical: `HDTrinity harmonized: conscious ${trinity.conscious}, unconscious ${trinity.unconscious}, design ${harmonized}`
  };
}

export interface HDCenterTrinity {
  input: number;
  process: number;
  output: number;
  metaphysical: string;
}

export function harmonizeCenterTrinity(center: HDCenterTrinity): HDCenterTrinity {
  const output = (center.input + center.process) / 2;
  return {
    ...center,
    output,
    metaphysical: `Center harmonized: input ${center.input}, process ${center.process}, output ${output}`
  };
}

export interface HDChart {
  centers: HDCenterTrinity[];
  gates: HDTrinity[];
  channels: HDTrinity[];
  type: HDTrinity;
  authority: HDTrinity;
  profile: HDTrinity;
  metaphysical: string;
}

export function harmonizeHDChart(chart: HDChart): HDChart {
  const harmonizedCenters = chart.centers.map(harmonizeCenterTrinity);
  const harmonizedGates = chart.gates.map(harmonizeHDTrinity);
  const harmonizedChannels = chart.channels.map(harmonizeHDTrinity);
  const harmonizedType = harmonizeHDTrinity(chart.type);
  const harmonizedAuthority = harmonizeHDTrinity(chart.authority);
  const harmonizedProfile = harmonizeHDTrinity(chart.profile);
  return {
    ...chart,
    centers: harmonizedCenters,
    gates: harmonizedGates,
    channels: harmonizedChannels,
    type: harmonizedType,
    authority: harmonizedAuthority,
    profile: harmonizedProfile,
    metaphysical: `HDChart harmonized: ${chainMeta()}`
  };
}

export function metaphysicalSummary() {
  return 'Human Design knowledge is harmonized as module trinities. Each center, gate, channel, type, authority, and profile is a trinity, harmonized mathematically and metaphysically, and integrated as a living stream in the a432 system.';
} 