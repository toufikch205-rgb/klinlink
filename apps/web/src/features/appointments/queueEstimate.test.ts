import { describe, expect, it } from 'vitest';
import { getDemoQueueEstimate } from './queueEstimate';

describe('demo queue estimate', () => {
  it('matches the legacy estimate for the first and later appointments', () => {
    expect(getDemoQueueEstimate(0)).toEqual({ patientsAhead: 1, waitMinutes: 10 });
    expect(getDemoQueueEstimate(2)).toEqual({ patientsAhead: 3, waitMinutes: 20 });
  });

  it('normalizes invalid and negative positions safely', () => {
    expect(getDemoQueueEstimate(-4)).toEqual({ patientsAhead: 1, waitMinutes: 10 });
    expect(getDemoQueueEstimate(Number.NaN)).toEqual({ patientsAhead: 1, waitMinutes: 10 });
  });
});
