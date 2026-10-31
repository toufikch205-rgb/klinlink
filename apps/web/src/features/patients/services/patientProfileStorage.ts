export type PatientProfile = { name: string; phone: string; city: string };
export const PATIENT_PROFILE_STORAGE_KEY = 'klinlink-patient';

export function readPatientProfile(storage: Pick<Storage, 'getItem'> = window.localStorage): PatientProfile {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(PATIENT_PROFILE_STORAGE_KEY) ?? '{}');
    if (!parsed || typeof parsed !== 'object') return { name: '', phone: '', city: '' };
    const value = parsed as Record<string, unknown>;
    return {
      name: typeof value.name === 'string' ? value.name : '',
      phone: typeof value.phone === 'string' ? value.phone : '',
      city: typeof value.city === 'string' ? value.city : '',
    };
  } catch {
    return { name: '', phone: '', city: '' };
  }
}

export function savePatientProfile(profile: PatientProfile, storage: Pick<Storage, 'setItem'> = window.localStorage): PatientProfile {
  const normalized = { name: profile.name.trim(), phone: profile.phone.trim(), city: profile.city.trim() };
  storage.setItem(PATIENT_PROFILE_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}
