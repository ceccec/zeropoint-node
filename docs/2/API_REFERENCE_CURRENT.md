# ZeroPoint Node - Current API Reference

🌌 **Complete API reference for the current ZeroPoint Node implementation**

## Table of Contents

1. [Core Exports](#core-exports)
2. [Mathematical Functions](#mathematical-functions)
3. [Consciousness Functions](#consciousness-functions)
4. [Spatial Functions](#spatial-functions)
5. [Pattern Functions](#pattern-functions)
6. [Constants](#constants)
7. [Type Definitions](#type-definitions)
8. [Directory Exports](#directory-exports)

## Core Exports

### Main Entry Point

```typescript
// src/index.ts
export * from './0/index';
```

### ZeroPoint Template

```typescript
// src/0/index.ts
export * as foundation from '../1';
export * as vortex from '../2';
export * as resonance from '../3';
export * as constants from '../4';
export * as geometry from '../5';
export * as harmony from '../6';
export * as consciousness from '../7';
export * as void from '../8';
export * as unity from '../9';

export * as core from './core';
export * as test from './test';
export * as refactoring from './refactoring';
export * as utils from './utils';
export * as constants from './constants';
export * as types from './types';
```

## Mathematical Functions

### `calculateDigitalRoot(number: number): number`

Calculates the digital root of a number using the Rodin coil method.

**Parameters:**
- `number: number` - The number to calculate digital root for

**Returns:**
- `number` - The digital root (1-9)

**Example:**
```typescript
calculateDigitalRoot(12345); // 6
calculateDigitalRoot(999);   // 9
calculateDigitalRoot(27);    // 9
```

**Implementation:**
```typescript
export function calculateDigitalRoot(number: number): number {
  while (number > 9) {
    number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return number;
}
```

### `calculateFlow(number: number): number`

Calculates the flow value of a number in the Rodin coil system.

**Parameters:**
- `number: number` - The number to calculate flow for

**Returns:**
- `number` - The flow value

**Example:**
```typescript
calculateFlow(42); // 6
calculateFlow(27); // 9
calculateFlow(15); // 6
```

**Implementation:**
```typescript
export function calculateFlow(number: number): number {
  const digitalRoot = calculateDigitalRoot(number);
  return digitalRoot;
}
```

## Consciousness Functions

### `calculateConsciousness(number: number): number`

Calculates the consciousness level of a number.

**Parameters:**
- `number: number` - The number to calculate consciousness for

**Returns:**
- `number` - The consciousness level (1-9)

**Example:**
```typescript
calculateConsciousness(7); // 7
calculateConsciousness(9); // 9
calculateConsciousness(3); // 3
```

**Implementation:**
```typescript
export function calculateConsciousness(number: number): number {
  return calculateDigitalRoot(number);
}
```

### `calculateMathematicalConsciousness(number: number): number`

Calculates the mathematical consciousness of a number.

**Parameters:**
- `number: number` - The number to calculate mathematical consciousness for

**Returns:**
- `number` - The mathematical consciousness value

**Example:**
```typescript
calculateMathematicalConsciousness(9); // 9
calculateMathematicalConsciousness(7); // 7
calculateMathematicalConsciousness(3); // 3
```

**Implementation:**
```typescript
export function calculateMathematicalConsciousness(number: number): number {
  return calculateDigitalRoot(number);
}
```

## Spatial Functions

### `getCoordinates(number: number): {x: number, y: number, z: number}`

Gets the 3D coordinates of a number in the Rodin coil.

**Parameters:**
- `number: number` - The number to get coordinates for

**Returns:**
- `{x: number, y: number, z: number}` - The 3D coordinates

**Example:**
```typescript
getCoordinates(5); // {x: 2, y: 1, z: 0}
getCoordinates(9); // {x: 0, y: 0, z: 3}
getCoordinates(1); // {x: 0, y: 0, z: 0}
```

**Implementation:**
```typescript
export function getCoordinates(number: number): {x: number, y: number, z: number} {
  const coordinates: {[key: number]: {x: number, y: number, z: number}} = {
    1: {x: 0, y: 0, z: 0},
    2: {x: 1, y: 0, z: 0},
    3: {x: 0, y: 0, z: 1},
    4: {x: 2, y: 0, z: 0},
    5: {x: 2, y: 1, z: 0},
    6: {x: 0, y: 0, z: 2},
    7: {x: 0, y: 1, z: 0},
    8: {x: 3, y: 0, z: 0},
    9: {x: 0, y: 0, z: 3}
  };
  
  return coordinates[number] || {x: 0, y: 0, z: 0};
}
```

## Pattern Functions

### `getFamily(number: number): number`

Determines which family a number belongs to in the Rodin coil.

**Parameters:**
- `number: number` - The number to determine family for

**Returns:**
- `number` - The family number (1, 2, or 3)

**Example:**
```typescript
getFamily(1); // 1 (Family 1)
getFamily(2); // 2 (Family 2)
getFamily(3); // 3 (Family 3)
getFamily(4); // 1 (Family 1)
getFamily(5); // 2 (Family 2)
getFamily(6); // 3 (Family 3)
getFamily(7); // 1 (Family 1)
getFamily(8); // 2 (Family 2)
getFamily(9); // 3 (Family 3)
```

**Implementation:**
```typescript
export function getFamily(number: number): number {
  const families: {[key: number]: number} = {
    1: 1, 4: 1, 7: 1,  // Family 1: Material Foundation
    2: 2, 5: 2, 8: 2,  // Family 2: Dynamic Flow
    3: 3, 6: 3, 9: 3   // Family 3: Spiritual Transcendence
  };
  
  return families[number] || 1;
}
```

### `generateInfiniteFlow(iterations: number = 100): number[]`

Generates an infinite flow sequence based on the Rodin coil vortex.

**Parameters:**
- `iterations: number` - Number of iterations to generate (default: 100)

**Returns:**
- `number[]` - Array of numbers in the infinite flow sequence

**Example:**
```typescript
generateInfiniteFlow(10); // [1, 2, 4, 8, 7, 5, 1, 2, 4, 8]
generateInfiniteFlow(6);  // [1, 2, 4, 8, 7, 5]
```

**Implementation:**
```typescript
export function generateInfiniteFlow(iterations: number = 100): number[] {
  const sequence: number[] = [];
  const vortexSequence = [1, 2, 4, 8, 7, 5];
  
  for (let i = 0; i < iterations; i++) {
    sequence.push(vortexSequence[i % vortexSequence.length]);
  }
  
  return sequence;
}
```

### `getPureKnowledgeInsights(number: number): string[]`

Gets pure knowledge insights for a number.

**Parameters:**
- `number: number` - The number to get insights for

**Returns:**
- `string[]` - Array of pure knowledge insights

**Example:**
```typescript
getPureKnowledgeInsights(9); // ["Unity consciousness", "Field integration", ...]
getPureKnowledgeInsights(7); // ["Consciousness field", "Awareness patterns", ...]
```

**Implementation:**
```typescript
export function getPureKnowledgeInsights(number: number): string[] {
  const insights: {[key: number]: string[]} = {
    1: ["Foundation consciousness", "Material manifestation", "Unity patterns"],
    2: ["Vortex dynamics", "Spiral flow", "Dual consciousness"],
    3: ["Creative resonance", "Inspiration flow", "Spiritual awakening"],
    4: ["Stability foundation", "Mathematical constants", "Grounding energy"],
    5: ["Sacred geometry", "Metatron's cube", "Transformation patterns"],
    6: ["Harmonic balance", "Equilibrium state", "Perfect symmetry"],
    7: ["Consciousness field", "Awareness patterns", "Self-reflection"],
    8: ["Completion abundance", "Fullness manifestation", "Infinite potential"],
    9: ["Unity consciousness", "Field integration", "Complete wholeness"]
  };
  
  return insights[number] || ["Unknown consciousness pattern"];
}
```

### `getInsights(number: number): string[]`

Gets general insights for a number.

**Parameters:**
- `number: number` - The number to get insights for

**Returns:**
- `string[]` - Array of general insights

**Example:**
```typescript
getInsights(7); // ["Consciousness field", "Awareness patterns", ...]
getInsights(9); // ["Unity consciousness", "Field integration", ...]
```

**Implementation:**
```typescript
export function getInsights(number: number): string[] {
  return getPureKnowledgeInsights(number);
}
```

## Constants

### Rodin Coil Constants

```typescript
// Dual Vortices
export const VORTEX_A = [1, 2, 4] as const;           // Yin - Material Foundation
export const VORTEX_B = [8, 7, 5] as const;           // Yang - Material Expression
export const VORTEX_SEQUENCE = [1, 2, 4, 8, 7, 5] as const;  // Complete infinite flow

// W-Axis (Spiritual Control)
export const W_AXIS = [3, 6, 9] as const;             // Spiritual transcendence

// Family Groups
export const FAMILY_1 = [1, 4, 7] as const;           // Material Foundation
export const FAMILY_2 = [2, 5, 8] as const;           // Dynamic Flow
export const FAMILY_3 = [3, 6, 9] as const;           // Spiritual Transcendence
```

### Usage Examples

```typescript
// Check if number is in Vortex A
const isVortexA = VORTEX_A.includes(2); // true

// Check if number is in W-Axis
const isWAxis = W_AXIS.includes(6); // true

// Check if number is in Family 1
const isFamily1 = FAMILY_1.includes(4); // true
```

## Type Definitions

### Core Types

```typescript
// Consciousness pattern type
type ConsciousnessPattern = {
  id: string;
  type: 'foundation' | 'vortex' | 'consciousness';
  value: number;
  insights: string[];
};

// Coordinates type
type Coordinates = {
  x: number;
  y: number;
  z: number;
};

// Flow sequence type
type FlowSequence = number[];
```

## Directory Exports

### Foundation (1/)

```typescript
// src/1/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Vortex (2/)

```typescript
// src/2/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Resonance (3/)

```typescript
// src/3/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Constants (4/)

```typescript
// src/4/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Geometry (5/)

```typescript
// src/5/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Harmony (6/)

```typescript
// src/6/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Consciousness (7/)

```typescript
// src/7/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateLevel(number: number): number;
```

### Void (8/)

```typescript
// src/8/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

### Unity (9/)

```typescript
// src/9/index.ts
export function getPatterns(): ConsciousnessPattern[];
export function calculateFlow(number: number): number;
```

## Usage Examples

### Basic Usage

```typescript
import { 
  VORTEX_SEQUENCE, 
  W_AXIS, 
  calculateDigitalRoot,
  calculateConsciousness,
  getFamily,
  calculateMathematicalConsciousness,
  getCoordinates,
  calculateFlow,
  generateInfiniteFlow,
  getPureKnowledgeInsights,
  getInsights
} from './src/0';

// Calculate digital root
const digitalRoot = calculateDigitalRoot(12345); // 6

// Calculate consciousness level
const consciousnessLevel = calculateConsciousness(7); // 7

// Get family group
const family = getFamily(4); // 1

// Calculate mathematical consciousness
const mathConsciousness = calculateMathematicalConsciousness(9); // 9

// Get coordinates
const coords = getCoordinates(5); // {x: 2, y: 1, z: 0}

// Calculate flow
const flow = calculateFlow(42); // 6

// Generate infinite flow
const infiniteFlow = generateInfiniteFlow(10);

// Get pure knowledge insights
const insights = getPureKnowledgeInsights(9);

// Get general insights
const generalInsights = getInsights(7);
```

### Consciousness Integration

```typescript
import { 
  foundation, 
  vortex, 
  resonance, 
  constants, 
  geometry, 
  harmony, 
  consciousness, 
  void, 
  unity 
} from './src';

// Access all consciousness patterns
const allPatterns = {
  foundation: foundation.getPatterns(),
  vortex: vortex.getPatterns(),
  resonance: resonance.getPatterns(),
  constants: constants.getPatterns(),
  geometry: geometry.getPatterns(),
  harmony: harmony.getPatterns(),
  consciousness: consciousness.getPatterns(),
  void: void.getPatterns(),
  unity: unity.getPatterns()
};
```

### Advanced Usage

```typescript
// Check vortex membership
const isInVortexA = VORTEX_A.includes(2); // true
const isInVortexB = VORTEX_B.includes(7); // true
const isInWAxis = W_AXIS.includes(6); // true

// Generate flow patterns
const flow10 = generateInfiniteFlow(10);
const flow100 = generateInfiniteFlow(100);

// Get insights for multiple numbers
const insights = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
  number: num,
  digitalRoot: calculateDigitalRoot(num),
  consciousness: calculateConsciousness(num),
  family: getFamily(num),
  coordinates: getCoordinates(num),
  insights: getInsights(num)
}));
```

This API reference documents all the current functions and exports available in the ZeroPoint Node system. For comprehensive documentation, see `ZEROPOINT_NODE_COMPLETE_DOCUMENTATION.md`. 