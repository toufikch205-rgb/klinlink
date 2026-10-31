import type { Appointment } from '../types';

export const APPOINTMENTS_STORAGE_KEY = 'klinlink-bookings';

export function readAppointments(storage: Pick<Storage, 'getItem'> = window.localStorage): Appointment[] {
  try {
    const raw = storage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item, index): Appointment[] => {
      if (!item || typeof item !== 'object') return [];
      const value = item as Record<string, unknown>;
      // Keep records written by the original HTML app readable during migration.
      const doctorName = typeof value.doctorName === 'string' ? value.doctorName : value.doctor;
      const patientName = typeof value.patientName === 'string' ? value.patientName : value.name;
      if (typeof doctorName !== 'string' || typeof patientName !== 'string' ||
          typeof value.date !== 'string' || typeof value.time !== 'string') return [];
      return [{
        id: typeof value.id === 'string' ? value.id : `legacy-${index}-${value.date}-${value.time}`,
        doctorId: typeof value.doctorId === 'number' ? value.doctorId : 0,
        doctorName,
        specialty: typeof value.specialty === 'string' ? value.specialty : (typeof value.spec === 'string' ? value.spec : ''),
        clinic: typeof value.clinic === 'string' ? value.clinic : '',
        patientName,
        patientPhone: typeof value.patientPhone === 'string' ? value.patientPhone : (typeof value.phone === 'string' ? value.phone : ''),
        date: value.date,
        time: value.time,
        status: 'requested',
        createdAt: typeof value.createdAt === 'string' ? value.createdAt : '',
      }];
    });
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
