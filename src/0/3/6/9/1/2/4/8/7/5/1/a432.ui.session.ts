// a432.ui.session.ts — Session/history management for A432 UI
type SessionMeta = Record<string, unknown>;
type SessionEvent = { type: string; timestamp: number; data?: unknown };
type Session = { meta: SessionMeta; events: SessionEvent[]; start: number; end?: number };
const sessionHistory: Session[] = [];
let currentSession: Session | null = null;

export function startSession(meta: SessionMeta) {
  currentSession = { meta, events: [], start: Date.now() };
}

export function endSession() {
  if (currentSession) {
    currentSession.end = Date.now();
    sessionHistory.push(currentSession);
    currentSession = null;
  }
}

export function logSessionEvent(ev: SessionEvent) {
  if (currentSession) currentSession.events.push(ev);
}

export function getSessionHistory() {
  return sessionHistory;
}

export function exportSession(session: Session) {
  return JSON.stringify(session, null, 2);
} 