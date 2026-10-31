import type { Appointment } from '../types';

export const APPOINTMENTS_STORAGE_KEY = 'klinlink-bookings';

export function readAppointments(storage: Pick<Storage, 'getItem'> = window.localStorage): Appointment[] {
  try {
    const raw = storage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Appointment =>
      Boolean(item && typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.doctorName === 'string' &&
        typeof item.date === 'string' &&
        typeof item.time === 'string' &&
        typeof item.patientName === 'string')
    );
  } catch {
    return [];
  }
}

export function saveAppointment(appointment: Appointment, storage: Pick<Storage, 'getItem' | 'setItem'> = window.localStorage): Appointment[] {
  const appointments = readAppointments(storage);
  const next = [...appointments, appointment];
  storage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function createAppointmentId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `appt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
