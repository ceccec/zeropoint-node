// a432.os.ml.ts — Self-contained ML logic
function observeEvents(events) {
  // Example: count event types
  const counts = {};
  events.forEach(e => { counts[e.type] = (counts[e.type] || 0) + 1; });
  return counts;
}
// Example usage:
// observeEvents([{ type: 'launch' }, { type: 'launch' }, { type: 'close' }]); 