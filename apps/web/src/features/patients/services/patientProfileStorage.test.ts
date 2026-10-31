import { describe, expect, it } from 'vitest';
import { readPatientProfile, savePatientProfile, PATIENT_PROFILE_STORAGE_KEY } from './patientProfileStorage';

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

describe('patient profile storage', () => {
  it('reads the legacy profile shape', () => {
    const storage = memoryStorage({ [PATIENT_PROFILE_STORAGE_KEY]: JSON.stringify({ name: 'Amine', phone: '+213555', city: 'Oran' }) });
    expect(readPatientProfile(storage)).toEqual({ name: 'Amine', phone: '+213555', city: 'Oran' });
  });
  it('returns safe defaults for malformed data', () => {
    expect(readPatientProfile(memoryStorage({ [PATIENT_PROFILE_STORAGE_KEY]: 'nope' }))).toEqual({ name: '', phone: '', city: '' });
  });
  it('trims and persists profile fields', () => {
    const storage = memoryStorage();
    expect(savePatientProfile({ name: ' Lina ', phone: ' 0550 ', city: ' Oran ' }, storage)).toEqual({ name: 'Lina', phone: '0550', city: 'Oran' });
    expect(readPatientProfile(storage).name).toBe('Lina');
  });
});
