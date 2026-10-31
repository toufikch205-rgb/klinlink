export type QueueEstimate = { patientsAhead: number; waitMinutes: number };

/** Demo-only estimate retained from the legacy patient experience. */
export function getDemoQueueEstimate(position: number): QueueEstimate {
  const safePosition = Number.isFinite(position) ? Math.max(0, Math.floor(position)) : 0;
  return { patientsAhead: safePosition + 1, waitMinutes: 10 + safePosition * 5 };
}
