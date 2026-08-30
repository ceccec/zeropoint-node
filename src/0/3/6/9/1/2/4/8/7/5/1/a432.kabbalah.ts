/**
 * A432 Kabbalistic Integration
 * Digital root cycles mapping to the Tree of Life
 * The sequence /0\3\6\9/1\2/4/8/7/5/1\ as Kabbalistic cycles
 */

import { abs } from './a432.algebra.ts'
// === KABBALISTIC SEPHIROT DEFINITIONS ===
export interface Sephirot {
  number: number;
  name: string;
  hebrewName: string;
  meaning: string;
  function: string;
  cycle: '3-cycle' | '2-cycle' | '7-cycle' | '5-cycle' | 'unity';
}

export interface DigitalRootCycle {
  name: string;
  digits: number[];
  sephirot: Sephirot[];
  behavior: string;
  kabbalisticMeaning: string;
}

// === THE TEN SEPHIROT ===
export const SEPHIROT: Sephirot[] = [
  {
    number: 1,
    name: 'Keter',
    hebrewName: 'כתר',
    meaning: 'Crown',
    function: 'Unity and divine will',
    cycle: 'unity'
  },
  {
    number: 2,
    name: 'Chokhmah',
    hebrewName: 'חכמה',
    meaning: 'Wisdom',
    function: 'The unbounded flash of creative insight',
    cycle: '2-cycle'
  },
  {
    number: 3,
    name: 'Binah',
    hebrewName: 'בינה',
    meaning: 'Understanding',
    function: 'The matrix that gives form to raw insight',
    cycle: '3-cycle'
  },
  {
    number: 4,
    name: 'Chesed',
    hebrewName: 'חסד',
    meaning: 'Kindness',
    function: 'Outpouring love and expansion',
    cycle: '2-cycle'
  },
  {
    number: 5,
    name: 'Gevurah',
    hebrewName: 'גבורה',
    meaning: 'Judgment',
    function: 'Discipline, restraint, and boundary setting',
    cycle: '5-cycle'
  },
  {
    number: 6,
    name: 'Tiferet',
    hebrewName: 'תפארת',
    meaning: 'Beauty',
    function: 'Harmonizes mercy (chesed) and severity (gevurah)',
    cycle: '3-cycle'
  },
  {
    number: 7,
    name: 'Netzach',
    hebrewName: 'נצח',
    meaning: 'Victory',
    function: 'Endurance, ambition, and the conquest of obstacles',
    cycle: '7-cycle'
  },
  {
    number: 8,
    name: 'Hod',
    hebrewName: 'הוד',
    meaning: 'Splendor',
    function: 'Structure, form, and submission',
    cycle: '2-cycle'
  },
  {
    number: 9,
    name: 'Yesod',
    hebrewName: 'יסוד',
    meaning: 'Foundation',
    function: 'Channels all higher energies into the manifest world',
    cycle: '3-cycle'
  },
  {
    number: 0,
    name: 'Malkhut',
    hebrewName: 'מלכות',
    meaning: 'Kingdom',
    function: 'Completes the cycle by returning all energy to the manifest plane',
    cycle: '3-cycle'
  }
];

// === DIGITAL ROOT CYCLES ===
export const DIGITAL_ROOT_CYCLES: DigitalRootCycle[] = [
  {
    name: '3-Cycle',
    digits: [0, 3, 6, 9],
    sephirot: SEPHIROT.filter(s => s.cycle === '3-cycle'),
    behavior: 'Repeatedly adding digits of multiples of 3 always yields 3, 6, or 9 (with 0 representing 9\'s completion)',
    kabbalisticMeaning: 'The cycle of understanding, beauty, foundation, and manifestation - the matrix of form and structure'
  },
  {
    name: '2-Cycle',
    digits: [1, 2, 4, 8],
    sephirot: SEPHIROT.filter(s => s.cycle === '2-cycle'),
    behavior: 'Powers of 2 (2¹, 2², 2³, 2⁴) mod 9 cycle through 2, 4, 8, 7',
    kabbalisticMeaning: 'The cycle of wisdom, kindness, and splendor - the creative and expansive forces'
  },
  {
    name: '7-Cycle',
    digits: [7],
    sephirot: SEPHIROT.filter(s => s.cycle === '7-cycle'),
    behavior: 'Powers of 2 eventually land on 7 (2⁵≡5, 2⁶≡1, so the true power-of-2 cycle in mod 9 is length 6)',
    kabbalisticMeaning: 'Victory and endurance - the conquest of obstacles and the power of persistence'
  },
  {
    name: '5-Cycle',
    digits: [5],
    sephirot: SEPHIROT.filter(s => s.cycle === '5-cycle'),
    behavior: 'Midpoint of the 2-cycle and the 3-cycle, often the "crossroads" in digital sums',
    kabbalisticMeaning: 'Judgment and discipline - the boundary setting and restraint that creates structure'
  }
];

// === MAIN KABBALISTIC SYSTEM ===
export class A432KabbalisticSystem {
  private static instance: A432KabbalisticSystem;
  private currentCycle: string = '3-cycle';
  private currentSephirot: number = 0;
  private cyclePosition: number = 0;

  private constructor() {
    this.initialize();
  }

  static getInstance(): A432KabbalisticSystem {
    if (!A432KabbalisticSystem.instance) {
      A432KabbalisticSystem.instance = new A432KabbalisticSystem();
    }
    return A432KabbalisticSystem.instance;
  }

  private initialize(): void {
  }

  // === DIGITAL ROOT CALCULATION ===
  calculateDigitalRoot(n: number): number {
    let x = abs(n);
    while (x >= 10) {
      x = String(x).split('').reduce((a, c) => a + Number(c), 0);
    }
    return x;
  }

  // === CYCLE NAVIGATION ===
  navigateSequence(): any {
    const sequence = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
    const currentDigit = sequence[this.cyclePosition % sequence.length];
    const sephirot = this.getSephirotByNumber(currentDigit);
    const cycle = this.getCycleByDigit(currentDigit);

    const result = {
      digit: currentDigit,
      sephirot: sephirot,
      cycle: cycle,
      position: this.cyclePosition,
      sequencePosition: this.cyclePosition % sequence.length,
      digitalRoot: this.calculateDigitalRoot(currentDigit),
      kabbalisticInsight: this.getKabbalisticInsight(currentDigit)
    };

    this.cyclePosition++;
    return result;
  }

  // === SEPHIROT ACCESS ===
  getSephirotByNumber(number: number): Sephirot | undefined {
    return SEPHIROT.find(s => s.number === number);
  }

  getCycleByDigit(digit: number): DigitalRootCycle | undefined {
    return DIGITAL_ROOT_CYCLES.find(cycle => cycle.digits.includes(digit));
  }

  getAllSephirot(): Sephirot[] {
    return SEPHIROT;
  }

  getAllCycles(): DigitalRootCycle[] {
    return DIGITAL_ROOT_CYCLES;
  }

  // === KABBALISTIC INSIGHTS ===
  getKabbalisticInsight(digit: number): string {
    const sephirot = this.getSephirotByNumber(digit);
    const cycle = this.getCycleByDigit(digit);
    
    if (!sephirot || !cycle) return 'Unknown digit';

    return `${sephirot.name} (${sephirot.hebrewName}) - ${sephirot.meaning}: ${sephirot.function}. Part of the ${cycle.name}.`;
  }

  // === TREE OF LIFE MAPPING ===
  getTreeOfLifeMapping(): any {
    return {
      cycles: DIGITAL_ROOT_CYCLES,
      sephirot: SEPHIROT,
      sequence: '/0\\3\\6\\9/1\\2/4/8/7/5/1\\',
      interpretation: {
        '3-cycle': 'Understanding, Beauty, Foundation, Kingdom - The matrix of form',
        '2-cycle': 'Wisdom, Kindness, Splendor - Creative and expansive forces',
        '7-cycle': 'Victory - Endurance and conquest',
        '5-cycle': 'Judgment - Discipline and boundaries',
        'unity': 'All cycles return to Keter (Crown) - The primal unity'
      }
    };
  }

  // === CYCLE ANALYSIS ===
  analyzeCycle(digit: number): any {
    const cycle = this.getCycleByDigit(digit);
    const sephirot = this.getSephirotByNumber(digit);
    
    if (!cycle || !sephirot) return null;

    return {
      digit,
      cycle: cycle.name,
      sephirot: sephirot.name,
      meaning: sephirot.meaning,
      function: sephirot.function,
      cycleBehavior: cycle.behavior,
      kabbalisticMeaning: cycle.kabbalisticMeaning,
      digitalRoot: this.calculateDigitalRoot(digit)
    };
  }

  // === SEQUENCE INTERPRETATION ===
  interpretSequence(sequence: string): any {
    const digits = sequence.match(/\d/g)?.map(Number) || [];
    const interpretations = digits.map(digit => this.analyzeCycle(digit));
    
    return {
      sequence,
      digits,
      interpretations,
      summary: {
        '3-cycle': interpretations.filter(i => i?.cycle === '3-Cycle').length,
        '2-cycle': interpretations.filter(i => i?.cycle === '2-Cycle').length,
        '7-cycle': interpretations.filter(i => i?.cycle === '7-Cycle').length,
        '5-cycle': interpretations.filter(i => i?.cycle === '5-Cycle').length
      }
    };
  }

  // === CURRENT STATE ===
  getCurrentState(): any {
    const currentDigit = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1][this.cyclePosition % 11];
    const sephirot = this.getSephirotByNumber(currentDigit);
    const cycle = this.getCycleByDigit(currentDigit);

    return {
      position: this.cyclePosition,
      digit: currentDigit,
      sephirot: sephirot,
      cycle: cycle,
      digitalRoot: this.calculateDigitalRoot(currentDigit),
      insight: this.getKabbalisticInsight(currentDigit)
    };
  }

  // === EVOLUTION ===
  evolve(): any {
    const navigation = this.navigateSequence();
    return {
      ...navigation,
      evolution: {
        cycle: navigation.cycle?.name,
        sephirot: navigation.sephirot?.name,
        meaning: navigation.sephirot?.meaning,
        function: navigation.sephirot?.function
      }
    };
  }
}

// === GLOBAL INSTANCE ===
export const a432Kabbalistic = A432KabbalisticSystem.getInstance();

// === AUTO-INITIALIZATION ===
if (typeof global !== 'undefined') {
  (global as any).a432Kabbalistic = a432Kabbalistic;
}

if (typeof window !== 'undefined') {
  (window as any).a432Kabbalistic = a432Kabbalistic;
  (window as any).A432Kabbalah = {
    System: A432KabbalisticSystem,
    Sephirot: SEPHIROT,
    Cycles: DIGITAL_ROOT_CYCLES
  };
}

// === DEFAULT EXPORT ===
export default A432KabbalisticSystem;
