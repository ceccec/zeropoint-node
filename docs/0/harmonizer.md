# Harmonization System - Digit0 (Void/Source)

## Overview

The Harmonization System switches between `src` and `docs` whenever a task is completed or failed, ensuring perfect synchronization between code and documentation.

## Core Principles

### Task Completion Flow
1. **Task completes in current location** (src or docs)
2. **System records completion** with timestamp and details
3. **Automatic switch** to opposite location (src ↔ docs)
4. **Synchronization status** updated to 'pending'5Navigational marks** left for retracing

### Task Failure Flow
1k fails in current location** (src or docs)
2. **System records failure** with error details
3. **Automatic switch** to opposite location for recovery
4. **Synchronization status** updated to failed'
5. **Recovery marks** left for debugging

## System Components

### HarmonizationTask Interface
```typescript
interface HarmonizationTask[object Object]id: string;
  type: 'completion' | 'failure;
  source:src|docs;
  target:srcdocs';
  timestamp: number;
  details: any;
  marks: any[];
}
```

### HarmonizationState Interface
```typescript
interface HarmonizationState {
  currentLocation:src |docs';
  lastTask: HarmonizationTask | null;
  taskHistory: HarmonizationTask[];
  synchronizationStatus: 'synced' | 'pending' |failed;
}
```
## Usage Examples

### Manual Harmonization
```typescript
const harmonizer = new HarmonizationSystem();

// Record completion
harmonizer.recordCompletion('task_001, {
  type: code_refactor,
  files: [src/0/mathematics.ts'],
  timestamp: Date.now()
});

// Record failure
harmonizer.recordFailure('task_002', {
  type: 'build_error',
  error: 'TypeScript compilation failed',
  timestamp: Date.now()
});
```

### Autonomous Harmonization
```typescript
const autonomousHarmonizer = new AutonomousHarmonization();

// Start autonomous switching
autonomousHarmonizer.start();

// Stop autonomous switching
autonomousHarmonizer.stop();
```

## Navigation Marks

The system leaves navigational marks for retracing:

```typescript
{
  mark: 'location_switch,
  from: src,
  to: docs',
  timestamp: Date.now()
}
```

## Visualization

Generate harmonization visualization:

```typescript
const visualization = harmonizer.generateVisualization();
console.log(visualization);
```

Output:
```
🔄 Harmonization System Visualization

Current Location: docs
Synchronization Status: pending
Total Tasks: 5

Last Task:
- ID: task_001
- Type: completion
- Source: src
- Target: docs
- Timestamp:20240115000Z

Task History:
1 completion (src → docs)
2ailure (docs → src)
3 completion (src → docs)
4: completion (docs → src)5ailure (src → docs)
```

## Benefits

1. **Perfect Synchronization**: Code and docs always stay in sync
2. **Automatic Recovery**: Failed tasks trigger location switches
3. **Navigation Tracking**: Complete history of location switches
4. **Autonomous Operation**: Self-managing harmonization
5. **Visual Feedback**: Clear status and history visualization

## Integration

The Harmonization System integrates with:
- **Digit 0id/Source)**: Core harmonization logic
- **All digit directories**: Location switching between src/docs
- **Task management**: Completion/failure tracking
- **Navigation system**: Mark-based retracing 