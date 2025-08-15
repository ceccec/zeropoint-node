// a432.ui.analytics.ts — Analytics/dashboard for A432 UI
type AnalyticsEvent = { type: string; time: number; [key: string]: unknown };
export function renderAnalyticsDashboard(container: HTMLElement, events: AnalyticsEvent[]) {
  container.innerHTML = '<h3>I Event Analytics</h3>';
  const summary = events.reduce((acc, ev) => {
    acc[ev.type] = (acc[ev.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  container.innerHTML += '<ul>' + Object.entries(summary).map(([type, count]) => `<li>${type}: ${count}</li>`).join('') + '</ul>';
  // Timeline
  container.innerHTML += '<h4>Timeline</h4><ul>' + events.map(ev => `<li>${new Date(ev.time).toLocaleTimeString()}: ${ev.type}</li>`).join('') + '</ul>';
  // Graph (simple bar chart)
  const max = Math.max(...Object.values(summary));
  container.innerHTML += '<h4>Event Frequency</h4><div style="display:flex;align-items:end;height:60px;">' + Object.entries(summary).map(([type, count]) => `<div style="width:40px;margin-right:8px;background:#0ff;height:${(count/max)*60}px;text-align:center;color:#222;">${count}<br><span style='font-size:10px;'>${type}</span></div>`).join('') + '</div>';
} 