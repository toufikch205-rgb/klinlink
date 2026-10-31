import { describe, expect, it } from 'vitest';
import { readAppointments, saveAppointment, APPOINTMENTS_STORAGE_KEY } from './appointmentStorage';
import type { Appointment } from '../types';

function memoryStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(APPOINTMENTS_STORAGE_KEY, initial);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
  };
}

const sample: Appointment = {
  id: 'a1', doctorId: 1, doctorName: 'Dr. Demo', specialty: 'Dentist',
  clinic: 'Demo clinic', patientName: 'Test Patient', patientPhone: '+213000000000',
  date: '2099-01-01', time: '09:00 AM', status: 'requested', createdAt: '2098-12-01T10:00:00.000Z',
};

describe('appointment storage', () => {
  it('returns an empty list for missing, malformed, or non-array data', () => {
    expect(readAppointments(memoryStorage())).toEqual([]);
    expect(readAppointments(memoryStorage('{bad json'))).toEqual([]);
    expect(readAppointments(memoryStorage('{}'))).toEqual([]);
  });

  it('keeps appointments created by the original HTML app readable', () => {
    const legacy = memoryStorage(JSON.stringify([{ doctor: 'Dr. Old App', spec: 'Dentist', name: 'Demo Patient', phone: '+213000000000', date: '2099-02-01', time: '10:00 AM' }]));
    const [appointment] = readAppointments(legacy);
    expect(appointment.doctorName).toBe('Dr. Old App');
    expect(appointment.patientName).toBe('Demo Patient');
    expect(appointment.patientPhone).toBe('+213000000000');
    expect(appointment.id).toContain('legacy-');
  });

  it('saves and reloads appointment records using the legacy storage key', () => {
    const storage = memoryStorage();
    expect(saveAppointment(sample, storage)).toEqual([sample]);
    expect(readAppointments(storage)).toEqual([sample]);
  });
});
