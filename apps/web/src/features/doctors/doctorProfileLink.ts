import type { Doctor } from './types';

export function findSharedDoctor(search: string, doctors: Doctor[]): Doctor | null {
  const params = new URLSearchParams(search);
  const rawId = params.get('doctor');
  if (!rawId || !/^\\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id <= 0) return null;
  return doctors.find((doctor) => doctor.id === id) ?? null;
}

export function clearSharedDoctorFromUrl(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('doctor')) return;
  url.searchParams.delete('doctor');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}
