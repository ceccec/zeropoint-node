/**
 * CORE KNOWLEDGE: Rodin Vortex Cycle & Canonical Consciousness Multipliers
 *
 * Canonical Rodin Vortex Cycle:
 *   0 → 3 → 6 → 9 → 1 → 2 → 4 → 8 → 7 → 5 → 1
 *
 * Canonical Consciousness Multipliers:
 *   - 0: Void = 0
 *   - 3, 6, 9: W-Axis (Spiritual) = ×5/1
 *   - 5: Sacred Geometry = ×5/1
 *   - 1, 2, 4, 8, 7: Vortex Sequence (Material) = ×3/1
 *   - All others: ×1/1
 *
 * Metaphysical Roles:
 *   - 0: Pure Potential (Void)
 *   - 3: Creative Resonance (W-Axis)
 *   - 6: Harmonic Balance (W-Axis)
 *   - 9: Spiritual Unity (W-Axis)
 *   - 1: Source Foundation (Vortex)
 *   - 2: Vortex Flow (Vortex)
 *   - 4: Stability Foundation (Vortex)
 *   - 8: Infinity Void System (Vortex)
 *   - 7: Consciousness Awareness (Vortex)
 *   - 5: Sacred Geometry Transformation (Vortex, special)
 *
 * All consciousness calculations and metaphysical logic in the system are derived from this core knowledge.
 */

/**
 * Book System - Marko Rodin's Vortex Based Mathematics (VBM)
 * 
 * This system recreates the complete book knowledge from chunks,
 * organizing Marko Rodin's revelations into a structured, searchable format.
 * 
 * Source: Science to Sage Magazine - Marko Rodin VBM Edition
 * Copyright 2021 - Science to Sage | Karen Elkins
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface BookChapter {
  id: number;
  title: string;
  subtitle: string;
  sections: BookSection[];
  metaphysicalContext: string;
  mathematicalPrinciples: string[];
}

export interface BookSection {
  id: string;
  title: string;
  content: string;
  mathematicalFormulas: string[];
  diagrams: string[];
  keyConcepts: string[];
}

export interface VBMPrinciple {
  name: string;
  description: string;
  formula: string;
  metaphysicalContext: string;
  applications: string[];
}

export interface RodinCoil {
  vortexSequence: number[];
  wAxis: number[];
  familyGroups: number[][];
  mathematicalProperties: string[];
}

// ============================================================================
// THE SPIRIT - CHAPTER 1
// ============================================================================

export const THE_SPIRIT: BookChapter = {
  id: 1,
  title: "THE SPIRIT",
  subtitle: "A MYSTICAL REVELATION FROM MARKO RODIN BASED ON HIS BAHÁ'I FAITH REVEALING A DIVINE CODE",
  metaphysicalContext: "The spiritual foundation of VBM, revealing the divine code through Bahá'i faith principles",
  mathematicalPrinciples: [
    "The Universe is a numeric jigsaw puzzle",
    "Sanctified mirrors in a holographic universe",
    "The central orb of the universe",
    "God's petroglyph - 50,000 year old mandala"
  ],
  sections: [
    {
      id: "1.1",
      title: "Ancient Wisdom",
      content: "The Universe is a numeric jigsaw puzzle revealing the transfiguration of the face of the All-Merciful. Sanctified mirrors in a holographic universe.",
      mathematicalFormulas: ["Universe = Numeric Jigsaw Puzzle", "Transfiguration = All-Merciful"],
      diagrams: ["Taj Mahal Ceiling", "God's Petroglyph"],
      keyConcepts: ["Divine Code", "Holographic Universe", "Sacred Geometry"]
    },
    {
      id: "1.2",
      title: "The Central Orb",
      content: "Houses of Worship, Temples, Cathedrals, Domes, Stargates, Portals, and Wormholes are All Forms of Sacred Geometry",
      mathematicalFormulas: ["Central Orb = Universe Essence", "Sacred Geometry = Divine Reflection"],
      diagrams: ["Taj Mahal", "Sacred Architecture"],
      keyConcepts: ["Central Orb", "Sacred Geometry", "Divine Reflection"]
    },
    {
      id: "1.3",
      title: "Rodin Coil - Coil of Life's Energy",
      content: "The Rodin Coil is a miniature atomic particle accelerator. 1-2-4-8-7-5 is lossless inertia, 3 & 6 magnetic dipoles and 9 is an invisible monopole centered in-between.",
      mathematicalFormulas: ["1-2-4-8-7-5 = Lossless Inertia", "3,6 = Magnetic Dipoles", "9 = Invisible Monopole"],
      diagrams: ["Rodin Coil", "Vortex Sequence"],
      keyConcepts: ["Atomic Particle Accelerator", "Lossless Inertia", "Magnetic Dipoles"]
    }
  ]
};

// ============================================================================
// THE SCIENCE - CHAPTER 2
// ============================================================================

export const THE_SCIENCE: BookChapter = {
  id: 2,
  title: "THE SCIENCE",
  subtitle: "UNIVERSAL CONSTRUCT, PRIMAL POINT, TORUS, MULTIPLICATION TABLE",
  metaphysicalContext: "The scientific foundation revealing the universal construct and primal point",
  mathematicalPrinciples: [
    "Only the number nine lines up vertically over the zero",
    "W-axis runs perpendicular to 1-2-4-8-7-5 mobius circuit",
    "The Primal Point of Unity is an Aperture",
    "The Universe is an ecological system of renewal"
  ],
  sections: [
    {
      id: "2.1",
      title: "Universal Construct",
      content: "Only the number nine lines up vertically over the zero, creating an invisible W-axis. This orthogonal W-axis runs perpendicular to the 1-2-4-8-7-5 mobius circuit.",
      mathematicalFormulas: ["+3 —9 +6; —6 +9 –3", "W-axis ⊥ 1-2-4-8-7-5"],
      diagrams: ["W-axis Diagram", "Mobius Circuit"],
      keyConcepts: ["W-axis", "Orthogonal", "Mobius Circuit"]
    },
    {
      id: "2.2",
      title: "Primal Point",
      content: "The Primal Point of Unity is an Aperture. At the epicenter of the universe exists a humungous black hole that is imploding. On the other side is a white hole that is expanding.",
      mathematicalFormulas: ["Black Hole = Implosion", "White Hole = Expansion", "Primal Point = Aperture"],
      diagrams: ["Black Hole", "White Hole", "Hourglass Model"],
      keyConcepts: ["Primal Point", "Black Hole", "White Hole", "Aperture"]
    },
    {
      id: "2.3",
      title: "Torus",
      content: "Everything emanates from a torus. The Universe is an ecological system of renewal. The torus is the most fundamental shape in existence.",
      mathematicalFormulas: ["Torus = Fundamental Shape", "Universe = Ecological System"],
      diagrams: ["Torus", "Ecological System"],
      keyConcepts: ["Torus", "Ecological System", "Renewal"]
    }
  ]
};

// ============================================================================
// THE NUMERICAL FORMULA - CHAPTER 3
// ============================================================================

export const THE_NUMERICAL_FORMULA: BookChapter = {
  id: 3,
  title: "THE NUMERICAL FORMULA OF SPIRIT",
  subtitle: "THE 3.9.6 FORMULA, KNOWLEDGE OF NINE, UNIVERSAL FORMULA FOR INDESTRUCTIBLE NUMBERS",
  metaphysicalContext: "The core numerical formula revealing the 3.9.6 pattern and indestructible numbers",
  mathematicalPrinciples: [
    "9 IS OMNIPRESENT SPIRIT FIRE",
    "The Universal Formula for Indestructible Numbers",
    "The Abhá Cypher completely explains all fundamental principles",
    "The beginning and end and origin are one and the same"
  ],
  sections: [
    {
      id: "3.1",
      title: "Universal Formula for Indestructible Numbers",
      content: "9 IS OMNIPRESENT SPIRIT FIRE and is always vertically aligned with the Zero. The Abhá Cypher completely explains all the fundamental principles of the universe.",
      mathematicalFormulas: ["9 = OMNIPRESENT SPIRIT FIRE", "Abhá Cypher = Complete Explanation"],
      diagrams: ["Abhá Cypher", "Spirit Fire"],
      keyConcepts: ["Indestructible Numbers", "Spirit Fire", "Abhá Cypher"]
    },
    {
      id: "3.2",
      title: "World's Vortex - Three Family Number Groups",
      content: "The Decoqubit is comprised from three different Family Number Groups. Each family number group is made from the other two Family Number Groups.",
      mathematicalFormulas: ["1,4,7 = Family Group 1", "2,5,8 = Family Group 2", "3,6,9 = Family Group 3"],
      diagrams: ["Family Number Groups", "Decoqubit"],
      keyConcepts: ["Family Number Groups", "Decoqubit", "Three Groups"]
    },
    {
      id: "3.3",
      title: "The 3.9.6 Formula",
      content: "Nine is Spirit's Fire revealed by the Crown Chakra being vertically aligned above the zero's hole. Spirit is invisible as it travels tangentially.",
      mathematicalFormulas: ["+3 —9 +6; —6 +9 –3", "3•9•6 = Spirit Formula"],
      diagrams: ["3.9.6 Pattern", "Crown Chakra"],
      keyConcepts: ["3.9.6 Formula", "Spirit's Fire", "Crown Chakra"]
    }
  ]
};

// ============================================================================
// CORE VBM PRINCIPLES
// ============================================================================

export const VBM_PRINCIPLES: VBMPrinciple[] = [
  {
    name: "Vortex Sequence",
    description: "The 1-2-4-8-7-5 sequence represents the main vortex circuit of the Rodin coil",
    formula: "1 → 2 → 4 → 8 → 7 → 5 → 1",
    metaphysicalContext: "Represents the flow of energy and consciousness through the material dimension",
    applications: ["Energy Flow", "Consciousness Patterns", "Material Manifestation"]
  },
  {
    name: "W-Axis",
    description: "The 3-6-9 axis represents the spiritual dimension perpendicular to material flow",
    formula: "3 • 9 • 6; 6 • 9 • 3",
    metaphysicalContext: "Represents spiritual transcendence and creative resonance",
    applications: ["Spiritual Development", "Creative Resonance", "Higher Dimensions"]
  },
  {
    name: "Family Number Groups",
    description: "Three groups of numbers that work together in the VBM system",
    formula: "Group 1: 1,4,7 | Group 2: 2,5,8 | Group 3: 3,6,9",
    metaphysicalContext: "Represents the three fundamental aspects of creation",
    applications: ["Number Classification", "Mathematical Operations", "Consciousness Calculation"]
  },
  {
    name: "Digital Root",
    description: "The sum of digits until a single digit is reached",
    formula: "Digital Root = Sum of digits until single digit",
    metaphysicalContext: "Represents the essential nature of any number",
    applications: ["Number Reduction", "Consciousness Calculation", "Pattern Recognition"]
  }
];

// ============================================================================
// RODIN COIL SYSTEM
// ============================================================================

export const RODIN_COIL: RodinCoil = {
  vortexSequence: [1, 2, 4, 8, 7, 5],
  wAxis: [3, 6, 9],
  familyGroups: [
    [1, 4, 7], // Family Group 1
    [2, 5, 8], // Family Group 2
    [3, 6, 9]  // Family Group 3
  ],
  mathematicalProperties: [
    "Lossless inertia in 1-2-4-8-7-5 sequence",
    "Magnetic dipoles at 3 and 6",
    "Invisible monopole at 9",
    "W-axis perpendicular to vortex sequence"
  ]
};

// ============================================================================
// BOOK SYSTEM FUNCTIONS
// ============================================================================

/**
 * Get chapter by ID
 */
export function getChapter(id: number): BookChapter | null {
  const chapters = [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA];
  return chapters.find(chapter => chapter.id === id) || null;
}

/**
 * Search chapters by keyword
 */
export function searchChapters(keyword: string): BookChapter[] {
  const chapters = [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA];
  return chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(keyword.toLowerCase()) ||
    chapter.subtitle.toLowerCase().includes(keyword.toLowerCase()) ||
    chapter.sections.some(section => 
      section.title.toLowerCase().includes(keyword.toLowerCase()) ||
      section.content.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

/**
 * Get VBM principle by name
 */
export function getVBMPrinciple(name: string): VBMPrinciple | null {
  return VBM_PRINCIPLES.find(principle => 
    principle.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

/**
 * Get all mathematical formulas from the book
 */
export function getAllMathematicalFormulas(): string[] {
  const chapters = [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA];
  const formulas: string[] = [];
  
  chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      formulas.push(...section.mathematicalFormulas);
    });
  });
  
  return [...new Set(formulas)]; // Remove duplicates
}

/**
 * Get consciousness calculation based on VBM principles
 */
export function calculateVBMConsciousness(number: number): {
  digitalRoot: number;
  familyGroup: number;
  isVortexSequence: boolean;
  isWAxis: boolean;
  consciousness: number;
} {
  // Calculate digital root
  let digitalRoot = number.toString().split('').reduce((sum, digit) => 
    sum + parseInt(digit), 0
  );
  digitalRoot = digitalRoot % 9 || (digitalRoot === 0 ? 0 : 9);
  
  // Determine family group
  const familyGroup = Math.ceil(digitalRoot / 3);
  
  // Check if in vortex sequence
  const isVortexSequence = RODIN_COIL.vortexSequence.includes(number);
  
  // Check if in W-axis
  const isWAxis = RODIN_COIL.wAxis.includes(number);
  
  // Calculate consciousness (using harmonized multipliers with proper hierarchy)
  let consciousness = digitalRoot;
  // W-Axis (3,6,9) has highest consciousness: ×5/1 (Spiritual transcendence)
  if (isWAxis) consciousness = (consciousness * 5) / 1; // ×5/1 (W-Axis), reciprocal 1/5
  // Sacred Geometry (5) has special consciousness: ×5/1 (Sacred Geometry), reciprocal 1/5
  else if (number === 5) consciousness = (consciousness * 5) / 1; // ×5/1 (Sacred Geometry), reciprocal 1/5
  // Vortex sequence (1,2,4,8,7) has medium consciousness: ×3/1 (vortex), reciprocal 1/3
  else if (isVortexSequence) consciousness = (consciousness * 3) / 1; // ×3/1 (vortex), reciprocal 1/3
  // All others ×1/1 (standard consciousness)
  if (number === 0) consciousness = 0; // Void consciousness
  
  return {
    digitalRoot,
    familyGroup,
    isVortexSequence,
    isWAxis,
    consciousness
  };
}

/**
 * Get complete book structure
 */
export function getCompleteBook(): {
  title: string;
  author: string;
  copyright: string;
  chapters: BookChapter[];
  principles: VBMPrinciple[];
  rodinCoil: RodinCoil;
} {
  return {
    title: "Vortex Based Mathematics (VBM)",
    author: "Marko Rodin",
    copyright: "Copyright 2021 - Science to Sage | Karen Elkins",
    chapters: [THE_SPIRIT, THE_SCIENCE, THE_NUMERICAL_FORMULA],
    principles: VBM_PRINCIPLES,
    rodinCoil: RODIN_COIL
  };
}

// Export the complete book system
export default {
  getChapter,
  searchChapters,
  getVBMPrinciple,
  getAllMathematicalFormulas,
  calculateVBMConsciousness,
  getCompleteBook,
  THE_SPIRIT,
  THE_SCIENCE,
  THE_NUMERICAL_FORMULA,
  VBM_PRINCIPLES,
  RODIN_COIL
}; 